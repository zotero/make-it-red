(() => {
	MakeItRed.registerPrefPanes = function () {
		Zotero.PreferencePanes.register({
			pluginID: MakeItRed.id,
			src: MakeItRed.rootURI + 'preferences.xhtml',
			scripts: [MakeItRed.rootURI + 'preferences.js'],
			label: "Make It Red",
		})
	}
})();
