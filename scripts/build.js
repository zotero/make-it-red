const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const zipDir = require('zip-dir');

async function main() {
	const sourceDir = 'src';
	const buildDir = 'build';
	const xpiFile = 'make-it-red-2.0.xpi';
	const updateJSONFile = 'updates-2.0.json';
	await build(sourceDir, buildDir, xpiFile);
	const hash = await generateHash(path.join(buildDir, xpiFile), "sha256");
	await writeUpdateJSON(path.join(buildDir, updateJSONFile), hash);
}

async function build(sourceDir, buildDir, filename) {
	try {
		await fs.access(buildDir);
	} catch (e) {
		await fs.mkdir(buildDir);
	}
	
	await zipDir(sourceDir, { saveTo: path.join(buildDir, filename) });
}

async function generateHash(filePath, algorithm) {
	const data = await fs.readFile(filePath);
	const hash = crypto.createHash(algorithm).update(data).digest("hex");
	return `${algorithm}:${hash}`;
}

async function writeUpdateJSON(filePath, hash) {
	const updateJSON = {
		"addons": {
			"make-it-red@example.com": {
				"updates": [
				{
					"version": "2.0",
					"update_link": "https://zotero-download.s3.amazonaws.com/tmp/make-it-red/make-it-red-2.0.xpi",
					"update_hash": hash,
					"applications": {
					"zotero": {
						"strict_min_version": "6.999"
					}
					}
				}
				]
			}
		}
	}
	await fs.writeFile(
		filePath,
		JSON.stringify(updateJSON, null, 2)
	);
}

main();
