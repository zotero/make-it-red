if (!Zotero.MakeItRed) {
	Zotero.MakeItRed = {
		log(msg) {
			Zotero.debug("Make It Red: " + msg);
		},
		
		async foo() {
			// `window` is the global object in Zotero 6 overlay scope, and global properties
			// are included automatically in Zotero 7
			var host = new URL('https://foo.com/path').host;
			this.log(`Host is ${host}`);
		},
		
		toggleGreen(enabled) {
			let docElem = Zotero.getMainWindow().document.documentElement;
			// Element#toggleAttribute() is not supported in Zotero 6
			if (enabled) {
				docElem.setAttribute('data-green-instead', 'true');
			}
			else {
				docElem.removeAttribute('data-green-instead');
			}
		}
	};
}
