# 🧭 Setting Up Lightweight VS Code in Portable Mode

## 📦 1. Download the ZIP Version of VS Code

- Go to [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download) || [private-link](https://drive.google.com/file/d/1IdAVApHUuua3Smj4AyF4wSYxtGExQmnt/view?usp=sharing)
- Select the **ZIP archive** for Windows
- Extract it to a folder such as `C:\IDE\VSCode-light-zipVer`
- Create a seperate icon for this using, right click on code.exe inside home folder -> send to -> desktop shortcut

## 🗃️ 2. Enable Portable Mode

- Inside the extracted folder, create a subfolder named `data`  
  Folder structure should look like:
  ```
  D:\Apps\VSCode-light-zipVer\
  ├── Code.exe
  └── data\
  ```

## ⚙️ 3. Add Lightweight Settings

- Navigate to:
  ```
  D:\Apps\VSCode-Portable\data\User\
  ```
- Create or edit `settings.json` and paste:

```json
{
  "telemetry.enableTelemetry": false,
  "telemetry.enableCrashReporter": false,
  "search.exclude": {
    "**/node_modules": true,
    "**/.git": true,
    "**/dist": true,
    "**/build": true
  },
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/.git/**": true,
    "**/dist/**": true,
    "**/build/**": true
  },
  "editor.minimap.enabled": false,
  "workbench.startupEditor": "none",
  "workbench.iconTheme": null,
  "workbench.activityBar.visible": false,
  "workbench.statusBar.visible": false,
  "extensions.autoUpdate": false,
  "extensions.autoCheckUpdates": false,
  "breadcrumbs.enabled": false,
  "window.zoomLevel": 0,
  "window.restoreWindows": "one",
  "files.autoSave": "off",
  "editor.quickSuggestions": false,
  "editor.hover.enabled": false,
  "editor.parameterHints.enabled": false,
  "editor.codeLens": false,
  "editor.suggestOnTriggerCharacters": false
}
```

## 🚀 4. Launch VS Code

- Run `Code.exe` directly from the portable folder

## ✈️ 5. Optional: Carry Your Setup Across Systems

If you want to move your custom portable setup to another PC:

- Just copy the entire `data` folder, which contains:
  - Your settings
  - Installed extensions
  - Keybindings
  - Editor history

- On the new system:
  1. Download and extract the **ZIP version** of VS Code
  2. Paste your saved `data` folder next to `Code.exe`

> ✅ When you launch `Code.exe`, all your settings and extensions will be restored just as they were.

**💡 Want a ready-made lightweight `data` folder?**  
You can use the [vs-code-lightweight-data-folder](https://github.com/Vivid-Vortex/vs-code-lightweight-data-folder.git) repository.  
Just clone or download its contents and place the `data` folder next to `Code.exe` for an instant minimal setup.

** In case if you loose the setup - you can download it from below link: **

https://drive.google.com/file/d/1IdAVApHUuua3Smj4AyF4wSYxtGExQmnt/view?usp=sharing

---

Want to create a one-click launcher or USB-ready version of this portable setup next? I can show you that too.