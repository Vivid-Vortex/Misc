In order to change the opacity of the windows terminal or wsl terminal.
Go to terminal settings -> On the extreme bottom left corner you will see open json file option. Click on it.
It should be opend inside vscode by default.
Look for profiles section. Then under profiles, you will see defaults as empty. Use below two options inside defaults.
"defaults": { "useAcrylic": true, "acrylicOpacity": 0.7 },

---------------------------------
You can use Windows Subsystem for Linux (WSL) to create files and folders in your Windows directory:
Here's how you can do it:

Access Windows directory: In your WSL terminal, navigate to the mount point for your Windows drive. This is typically /mnt/c for the C drive.   

Create files and folders: Use standard Linux commands like touch, mkdir, and cp to create files and directories. For example:

Bash
# Create a new file
touch /mnt/c/new_file.txt

# Create a new directory
mkdir /mnt/c/new_directory

Example treid:-
/mnt/c/Users/${use_name}/Downloads

Generally use "/mnt/c/${use_name}/Deepak" to directly do cd and from there on you can simply naviage anywhere and do your activities through wsl on windows.
---------------------------------