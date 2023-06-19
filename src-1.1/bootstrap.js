var MakeItRed;

function log(msg) {
	Zotero.debug("Make It Red: " + msg);
}

function install() {
	log("Installed");
}

async function startup({ id, version, rootURI }) {
	log("Starting");
	
	// Load chrome/content file directly via file:/// URL
	Services.scriptloader.loadSubScript(rootURI + 'chrome/content/make-it-red.js');
	MakeItRed.init({ id, version, rootURI });
	MakeItRed.addToAllWindows();
	await MakeItRed.main();
}

function shutdown() {
	log("Shutting down");
	MakeItRed.removeFromAllWindows();
	MakeItRed = undefined;
}

function uninstall() {
	log("Uninstalled");
}
