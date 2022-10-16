var stylesheetID = 'make-it-red-stylesheet';
var ftlID = 'make-it-red-ftl';
var menuitemID = 'make-it-green-instead';
var addedElementIDs = [stylesheetID, ftlID, menuitemID];

function log(msg) {
	Zotero.debug("Make It Red: " + msg);
}

function install() {
	log("Installed");
}

async function startup({ id, version, rootURI }) {
	log("Starting");
	
	// Add a stylesheet to the main Zotero pane
	var zp = Zotero.getActiveZoteroPane();
	if (zp) {
		let doc = zp.document;
		let link1 = doc.createElement('link');
		link1.id = stylesheetID;
		link1.type = 'text/css';
		link1.rel = 'stylesheet';
		link1.href = rootURI + 'style.css';
		doc.documentElement.appendChild(link1);

		let link2 = doc.createElement('link');
		link2.id = ftlID;
		link2.rel = 'localization';
		link2.href = 'make-it-red.ftl';
		doc.documentElement.appendChild(link2);

		let menuitem = doc.createXULElement('menuitem');
		menuitem.id = menuitemID;
		menuitem.setAttribute('type', 'checkbox');
		menuitem.setAttribute('data-l10n-id', 'make-it-green-instead');
		// MozMenuItem#checked is available in Zotero 7
		menuitem.addEventListener('command', () => Zotero.MakeItRed.toggleGreen(menuitem.checked));
		doc.getElementById('menu_viewPopup').appendChild(menuitem);
	}
	
	Services.scriptloader.loadSubScript(rootURI + 'lib.js');
	Zotero.MakeItRed.foo();
}

function shutdown() {
	log("Shutting down");
	
	// Remove stylesheet
	var zp = Zotero.getActiveZoteroPane();
	if (zp) {
		for (let id of addedElementIDs) {
			zp.document.getElementById(id)?.remove();
		}
	}
}

function uninstall() {
	log("Uninstalled");
}
