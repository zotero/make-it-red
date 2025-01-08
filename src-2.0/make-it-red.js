MakeItRed = {
	id: null,
	version: null,
	rootURI: null,
	initialized: false,
	addedElementIDs: [],
	
	init({ id, version, rootURI }) {
		if (this.initialized) return;
		this.id = id;
		this.version = version;
		this.rootURI = rootURI;
		this.initialized = true;
	},
	
	log(msg) {
		Zotero.debug("Make It Red: " + msg);
	},
	
	addToWindow(window) {
		if (window._makeItRedAdded) {
			return;
		}
		window._makeItRedAdded = true;
		
		let doc = window.document;
		
		// Add a stylesheet to the main Zotero pane
		let link1 = doc.createElement('link');
		link1.id = 'make-it-red-stylesheet';
		link1.type = 'text/css';
		link1.rel = 'stylesheet';
		link1.href = this.rootURI + 'style.css';
		doc.documentElement.appendChild(link1);
		this.storeAddedElement(link1);
		
		// Use Fluent for localization
		window.MozXULElement.insertFTLIfNeeded("make-it-red.ftl");
		
		// Add menu option
		let menuitem = doc.createXULElement('menuitem');
		menuitem.id = 'make-it-green-instead';
		menuitem.setAttribute('type', 'checkbox');
		menuitem.setAttribute('data-l10n-id', 'make-it-red-green-instead');
		// MozMenuItem#checked is available in Zotero 7
		menuitem.addEventListener('command', () => {
			MakeItRed.toggleGreen(window, menuitem.checked);
		});
		doc.getElementById('menu_viewPopup').appendChild(menuitem);
		this.storeAddedElement(menuitem);
	},
	
	addToAllWindows() {
		var windows = Zotero.getMainWindows();
		for (let win of windows) {
			if (!win.ZoteroPane) continue;
			this.addToWindow(win);
		}
	},
	
	storeAddedElement(elem) {
		if (!elem.id) {
			throw new Error("Element must have an id");
		}
		this.addedElementIDs.push(elem.id);
	},
	
	removeFromWindow(window) {
		if (!window._makeItRedAdded) {
			return;
		}
		window._makeItRedAdded = false;

		let doc = window.document;
		// Remove all elements added to DOM
		for (let id of this.addedElementIDs) {
			doc.getElementById(id)?.remove();
		}
		doc.querySelector('[href="make-it-red.ftl"]')?.remove();
	},
	
	removeFromAllWindows() {
		var windows = Zotero.getMainWindows();
		for (let win of windows) {
			if (!win.ZoteroPane) continue;
			this.removeFromWindow(win);
		}
	},
	
	toggleGreen(window, enabled) {
		window.document.documentElement
			.toggleAttribute('data-green-instead', enabled);
	},
	
	async main() {
		// Global properties are included automatically in Zotero 7
		let host = new URL('https://foo.com/path').host;
		this.log(`Host is ${host}`);
		
		// Retrieve a global pref
		this.log(`Intensity is ${Zotero.Prefs.get('extensions.make-it-red.intensity', true)}`);

		// Load sub scripts
		Services.scriptloader.loadSubScript(this.rootURI + 'preferencePanes.js', this);
		Services.scriptloader.loadSubScript(this.rootURI + 'itemPaneSections.js', this);

		// Use Zotero plugin API to register stuff
		this.registerPrefPanes();
		this.registerItemPaneSections();
	},
};
