if (!Zotero.MakeItRed) {
	Zotero.MakeItRed = {
		log(msg) {
			Zotero.debug("Make It Red: " + msg);
		},
		
		async foo() {
			this.log("Make It Red: Foo");
		},
		
		toggleGreen(enabled) {
			Zotero.getMainWindow().document.documentElement
				.toggleAttribute('data-green-instead', enabled);
		}
	};
}
