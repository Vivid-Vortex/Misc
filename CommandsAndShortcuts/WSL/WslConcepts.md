# WSL (Windows Subsystem for Linux) Concepts and Configuration

## Terminal Opacity Configuration

To change the opacity of the Windows Terminal or WSL terminal:

1. Go to **Terminal Settings**
2. Click **"Open JSON file"** option in the extreme bottom left corner
3. The file should open in VS Code by default
4. Look for the `profiles` section
5. Under `profiles`, you will see `defaults` as empty
6. Use the following configuration inside `defaults`:

```json
"defaults": {
  "useAcrylic": true,
  "acrylicOpacity": 0.7
}
```

## Accessing Windows Directory from WSL

You can use Windows Subsystem for Linux (WSL) to create files and folders in your Windows directory.

### Access Windows Directory
In your WSL terminal, navigate to the mount point for your Windows drive. This is typically `/mnt/c` for the C drive.

### Create Files and Folders
Use standard Linux commands like `touch`, `mkdir`, and `cp` to create files and directories.

**Examples:**
```bash
# Create a new file
touch /mnt/c/new_file.txt

# Create a new directory
mkdir /mnt/c/new_directory
```

### Example Path
```bash
/mnt/c/Users/${user_name}/Downloads
```

### Quick Navigation
Generally use `/mnt/c/${user_name}/Deepak` to directly do `cd` and from there you can simply navigate anywhere and perform your activities through WSL on Windows.