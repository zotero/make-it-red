window.addEventListener('load', async function (event) {
	await Zotero.initializationPromise;
	MakeItRed.init();
	MakeItRed.addToWindow(window);
});
