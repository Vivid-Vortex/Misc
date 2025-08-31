VS Code lets you list installed extensions and install them in a new setup easily:

Export extensions list:

code --list-extensions > extensions.txt


This creates a extensions.txt file with all installed extension names.

Import and install extensions:

cat extensions.txt | xargs -n 1 code --install-extension


This installs everything (enabled/disabled) from the list.