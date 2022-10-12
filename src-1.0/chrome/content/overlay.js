function log(msg) {
	Zotero.debug("Make It Red: " + msg);
}

async function init() {
	log("Initializing");
	await Zotero.initializationPromise;
	Zotero.MakeItRed.foo();
	
	let stringBundle = Services.strings.createBundle('chrome://make-it-red/locale/make-it-red.properties');
	Zotero.getMainWindow().document.getElementById('make-it-green-instead')
		.setAttribute('label', stringBundle.GetStringFromName('makeItGreenInstead.label'));
}

window.addEventListener('load', function (event) {
	init();
});
