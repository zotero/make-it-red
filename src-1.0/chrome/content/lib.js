if (!Zotero.MakeItRed) {
	Zotero.MakeItRed = {
		log(msg) {
			Zotero.debug("Make It Red: " + msg);
		},
		
		async foo() {
			// `window` is the global object in overlay scope
			var host = new URL('https://foo.com/path').host;
			this.log(`Host is ${host}`);
			
			this.log(`Intensity is ${Zotero.Prefs.get('extensions.make-it-red.intensity', true)}`);
		},

		toggleGreen(enabled) {
			// `window` is the global object in overlay scope
			let docElem = document.documentElement;
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
