if (!Zotero.MakeItRed) {
	if (Zotero.platformMajorVersion < 102) {
		Cu.importGlobalProperties(['URL']);
	}
	
	Zotero.MakeItRed = {
		log(msg) {
			Zotero.debug("Make It Red: " + msg);
		},
		
		async foo() {
			// Global properties are imported above in Zotero 6 and included automatically in
			// Zotero 7
			var host = new URL('https://foo.com/path').host;
			this.log(`Host is ${host}`);
			
			this.log(`Intensity is ${Zotero.Prefs.get('extensions.make-it-red.intensity', true)}`);
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
