var stylesheetID = 'make-it-red-stylesheet';

function log(msg) {
	Zotero.debug("Make It Red: " + msg);
}

function install() {
	log("Installed!");
}

async function startup({ id, version, rootURI }) {
	log("Started!");
	
	// Add a stylesheet to the main Zotero pane
	var zp = Zotero.getActiveZoteroPane();
	if (zp) {
		let doc = zp.document;
		let link = doc.createElement('link');
		link.id = stylesheetID;
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = rootURI + 'style.css';
		doc.documentElement.appendChild(link);
	}
	
	Services.scriptloader.loadSubScript(rootURI + 'lib.js');
	foo();
}

function shutdown() {
	log("Shutting down!");
	
	// Remove stylesheet
	var zp = Zotero.getActiveZoteroPane();
	if (zp) {
		let stylesheet = zp.document.getElementById(stylesheetID);
		stylesheet.parentNode.removeChild(stylesheet);
	}
}

function uninstall() {
	log("Uninstalled!");
}
