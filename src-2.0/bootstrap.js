var MakeItRed;

function log(msg) {
	Zotero.debug("Make It Red: " + msg);
}

function install() {
	log("Installed");
}

async function startup({ id, version, rootURI }) {
	log("Starting");
	
	Zotero.PreferencePanes.register({
		pluginID: 'make-it-red@zotero.org',
		src: rootURI + 'preferences.xhtml',
		scripts: [rootURI + 'preferences.js']
	});
	
	Services.scriptloader.loadSubScript(rootURI + 'make-it-red.js');
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
