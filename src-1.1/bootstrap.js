var stylesheetID = 'make-it-red-stylesheet';
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
	if (typeof Zotero != 'undefined') return;
	
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

async function startup({ id, version, resourceURI, rootURI }) {
	await waitForZotero();
	
	log("Starting");
	
	// String 'rootURI' introduced in Zotero 7
	if (!rootURI) {
		rootURI  = resourceURI.spec;
	}
	
	// Add a stylesheet to the main Zotero pane
	var zp = Zotero.getActiveZoteroPane();
	if (zp) {
		let doc = zp.document;
		// createElementNS() necessary in Zotero 6; createElement() defaults to HTML in Zotero 7
		let HTML_NS = "http://www.w3.org/1999/xhtml";
		let link = doc.createElementNS(HTML_NS, 'link');
		link.id = stylesheetID;
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = rootURI + 'style.css';
		doc.documentElement.appendChild(link);
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
		let stylesheet = zp.document.getElementById(stylesheetID);
		stylesheet.parentNode.removeChild(stylesheet);
	}
}

function uninstall() {
	log("Uninstalled");
}
