# Make It Red

A sample plugin for Zotero 7

To test, run

```bash
npm install
npm run build
```

 and install the XPIs in the Zotero Plugins window, or see [Setting Up a Plugin Development Environment](https://www.zotero.org/support/dev/client_coding/plugin_development#setting_up_a_plugin_development_environment) to run from source.

The update manifests are set up to demonstrate upgrading across all versions, but normally a plugin would point to a single update manifest that was updated as new versions were available. The update manifests for versions 1.1 and 1.2 are set up to allow upgrading directly to 2.0 from Zotero 7.

<details>
<summary>Archived Old Versions</summary>

  * [src-1.0](old/src-1.0): Overlay plugin for Zotero 6
  * [src-1.1](old/src-1.1): Overlay plugin for Zotero 6 and bootstrapped plugin for Zotero 7
  * [src-1.2](old/src-1.2): Bootstrapped plugin for Zotero 6 and 7

  To test, run `./old/make-zips`

</details>
