var MakeItRed;

function log(msg) {
	Zotero.debug("Make It Red: " + msg);
}

function install() {
	log("Installed 2.0");
}

async function startup({ id, version, rootURI }) {
	log("Starting 2.0");
	
	Services.scriptloader.loadSubScript(rootURI + 'make-it-red.js');
	MakeItRed.init({ id, version, rootURI });
	MakeItRed.addToAllWindows();
	await MakeItRed.main();
}

function onMainWindowLoad({ win }) {
	MakeItRed.addToWindow(win);
}

function onMainWindowUnload(win) {
	MakeItRed.removeFromWindow(win);
}

function shutdown() {
	log("Shutting down 2.0");
	MakeItRed.removeFromAllWindows();
	MakeItRed = undefined;
}

function uninstall() {
	log("Uninstalled 2.0");
}
