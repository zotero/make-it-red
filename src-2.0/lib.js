if (!Zotero.MakeItRed) {
	Zotero.MakeItRed = {
		log(msg) {
			Zotero.debug("Make It Red: " + msg);
		},
		
		async foo() {
			// Global properties are included automatically in Zotero 7
			var host = new URL('https://foo.com/path').host;
			this.log(`Host is ${host}`);
		},
		
		toggleGreen(enabled) {
			Zotero.getMainWindow().document.documentElement
				.toggleAttribute('data-green-instead', enabled);
		}
	};
}
