function log(msg) {
	Zotero.debug("Make It Red: " + msg);
}

async function init() {
	log("Initializing");
	await Zotero.initializationPromise;
	Zotero.MakeItRed.foo();
}

window.addEventListener('load', function (event) {
	init();
});
