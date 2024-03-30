(() => {
	MakeItRed.registerItemPaneSections = function() {
		// A minimal example
		Zotero.ItemPaneManager.registerSection({
			paneID: "example",
			pluginID: this.id,
			header: {
				l10nID: "make-it-red-item-section-example1-head-text",
				icon: "chrome://zotero/skin/16/universal/book.svg",
			},
			sidenav: {
				l10nID: "make-it-red-item-section-example1-sidenav-tooltip",
				icon: "chrome://zotero/skin/20/universal/save.svg",
			},
			onRender: ({ body, item, editable, tabType }) => {
				body.textContent
					= JSON.stringify({
						id: item?.id,
						editable,
						tabType,
					});
			},
		});

		// A full example
		Zotero.ItemPaneManager.registerSection({
			paneID: "reader-example",
			pluginID: this.id,
			header: {
				l10nID: "make-it-red-item-section-example2-head-text",
				// Optional
				l10nArgs: `{"status": "Initialized"}`,
				// Can also have a optional dark icon
				icon: "chrome://zotero/skin/16/universal/book.svg",
			},
			sidenav: {
				l10nID: "make-it-red-item-section-example2-sidenav-tooltip",
				icon: "chrome://zotero/skin/20/universal/save.svg",
			},
			// Optional
			bodyXHTML: '<html:h1 id="test">THIS IS TEST</html:h1>',
			// Optional, Called when the section is first created, must be synchronous
			onInit: ({ item }) => {
				this.log("Section init!", item?.id);
			},
			// Optional, Called when the section is destroyed, must be synchronous
			onDestroy: (props) => {
				this.log("Section destroy!");
			},
			// Optional, Called when the section data changes (setting item/mode/tabType/inTrash), must be synchronous. return false to cancel the change
			onItemChange: ({ item, setEnabled, tabType }) => {
				this.log(`Section item data changed to ${item?.id}`);
				setEnabled(tabType === "reader");
				return true;
			},
			// Called when the section is asked to render, must be synchronous.
			onRender: ({ body, item, setL10nArgs, setSectionSummary, setSectionButtonStatus }) => {
				this.log("Section rendered!", item?.id);
				let title = body.querySelector("#test");
				title.style.color = "red";
				title.textContent = "LOADING";
				setL10nArgs(`{ "status": "Loading" }`);
				setSectionSummary('loading!');
				setSectionButtonStatus("test", { hidden: true });
			},
			// Optional, can be asynchronous.
			onAsyncRender: async ({ body, item, setL10nArgs, setSectionSummary, setSectionButtonStatus }) => {
				this.log("Section secondary render start!", item?.id);
				await Zotero.Promise.delay(1000);
				this.log("Section secondary render finish!", item?.id);
				let title = body.querySelector("#test");
				title.style.color = "green";
				title.textContent = item.getField("title");
				setL10nArgs(`{ "status": "Loaded" }`);
				setSectionSummary('rendered!');
				setSectionButtonStatus("test", { hidden: false });
			},
			// Optional, Called when the section is toggled. Can happen anytime even if the section is not visible or not rendered
			onToggle: ({ item }) => {
				this.log("Section toggled!", item?.id);
			},
			// Optional, Buttons to be shown in the section header
			sectionButtons: [
				{
					type: "test",
					icon: "chrome://zotero/skin/16/universal/empty-trash.svg",
					l10nID: "make-it-red-item-section-example2-button-tooltip",
					onClick: ({ item, paneID }) => {
						this.log("Section clicked!", item?.id);
						Zotero.ItemPaneManager.unregisterSection(paneID);
					},
				},
			],
		});
	}
})();
