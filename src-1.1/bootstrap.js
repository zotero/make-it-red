var stylesheetID = 'make-it-red-stylesheet';
var ftlID = 'make-it-red-ftl';
var menuitemID = 'make-it-green-instead';
var addedElementIDs = [stylesheetID, ftlID, menuitemID];

if (typeof Zotero == 'undefined') {
	var Zotero;
}

function log(msg) {
	Zotero.debug("Make It Red: " + msg);
}

// In Zotero 6, bootstrap methods are called before Zotero is initialized, and using include.js
// to get the Zotero XPCOM service would risk breaking Zotero startup. Instead, wait for the main
// Zotero window to open and get the Zotero object from there.
//
// In Zotero 7, bootstrap methods are not called until Zotero is initialized, and the 'Zotero' is
// automatically made available.
async function waitForZotero() {
	if (typeof Zotero != 'undefined') {
		await Zotero.initializationPromise;
	}
	
	var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
	var windows = Services.wm.getEnumerator('navigator:browser');
	var found = false;
	while (windows.hasMoreElements()) {
		let win = windows.getNext();
		if (win.Zotero) {
			found = true;
			break;
		}
	}
	if (!found) {
		await new Promise((resolve) => {
			var listener = {
				onOpenWindow: function (aWindow) {
					// Wait for the window to finish loading
					let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor)
						.getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
					domWindow.addEventListener("load", function () {
						domWindow.removeEventListener("load", arguments.callee, false);
						if (domWindow.Zotero) {
							Services.wm.removeListener(listener);
							Zotero = domWindow.Zotero;
							resolve();
						}
					}, false);
				}
			};
			Services.wm.addListener(listener);
		});
	}
	await Zotero.initializationPromise;
}

async function install() {
	await waitForZotero();
	
	log("Installed");
}

async function startup({ id, version, resourceURI, rootURI = resourceURI.spec }) {
	await waitForZotero();
	
	log("Starting");
	
	// Add DOM elements to the main Zotero pane
	var win = Zotero.getMainWindow();
	if (win && win.ZoteroPane) {
		let zp = win.ZoteroPane;
		let doc = win.document;
		
		// createElement() defaults to HTML in Zotero 7
		let link1 = doc.createElement('link');
		link1.id = stylesheetID;
		link1.type = 'text/css';
		link1.rel = 'stylesheet';
		link1.href = rootURI + 'style.css';
		doc.documentElement.appendChild(link1);

		// We're running in Zotero 7, so use our Fluent localizations
		let link2 = doc.createElement('link');
		link2.id = ftlID;
		link2.rel = 'localization';
		link2.href = 'make-it-red.ftl';
		doc.documentElement.appendChild(link2);

		// createXULElement() is available in Zotero 7
		let menuitem = doc.createXULElement('menuitem');
		menuitem.id = menuitemID;
		menuitem.setAttribute('type', 'checkbox');
		menuitem.setAttribute('data-l10n-id', 'make-it-green-instead');
		menuitem.addEventListener('command', () => Zotero.MakeItRed.toggleGreen(menuitem.checked));
		doc.getElementById('menu_viewPopup').appendChild(menuitem);
	}
	
	// 'Services' may not be available in Zotero 6
	if (typeof Services == 'undefined') {
		var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");
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
