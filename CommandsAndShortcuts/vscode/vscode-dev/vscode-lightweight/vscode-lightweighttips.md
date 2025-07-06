# VS Code Portable Mode Setup Guide

Running Visual Studio Code (VS Code) in portable mode allows you to use it without the need for installation, making it easy to carry and use on different machines.

## Setup Steps

### 1. Download VS Code
- Visit the [VS Code download page](https://code.visualstudio.com/download)
- Download the "ZIP" archive for your operating system

### 2. Extract the ZIP Archive
- Extract the contents of the ZIP archive to a folder of your choice
- This folder will be your portable VS Code installation

### 3. Create a Data Folder
- Inside the folder where you extracted the ZIP archive, create a new folder named `data`
- This folder will be used to store user data and configurations

### 4. Modify User Data Path
- Open the `settings.json` file inside the `data` folder (create it if it doesn't exist)
- Add the following configuration:
  ```json
  {
    "userDataPath": "./data"
  }
  ```
- Save the file

### 5. Run VS Code
- Navigate to the main folder where you extracted the ZIP archive
- Look for the executable file:
  - **Windows:** `Code.exe`
  - **macOS:** `Code`
  - **Linux:** `code` or `code-insiders`
- Double-click on the executable file to launch VS Code in portable mode

### 6. Optional: Create a Shortcut
- Create a shortcut to the executable file for easier access

## Benefits

Running VS Code in portable mode ensures that:
- All configurations and extensions are contained within the folder
- Easy to carry and use on different machines
- No system settings are affected

## Important Notes

- **No Automatic Updates:** You won't get automatic updates
- **Manual Updates:** You'll need to manually download and replace the extracted files when new versions are released