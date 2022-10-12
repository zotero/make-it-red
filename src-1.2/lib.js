if (!Zotero.MakeItRed) {
	Zotero.MakeItRed = {
		log(msg) {
			Zotero.debug("Make It Red: " + msg);
		},
		
		async foo() {
			this.log("Foo");
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
