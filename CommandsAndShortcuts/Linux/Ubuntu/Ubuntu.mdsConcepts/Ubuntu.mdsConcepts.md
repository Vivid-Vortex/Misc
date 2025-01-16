** Make sure to uninstall and fully clean any existing package or files realted to the software or setting you're going to install
in linux/ubuntu. Else it won't work properly.
-------------------------------------------------------------------------------------------
unzip file_name.zip #to unzip any file
ls -lt 
# l - This option displays long format output, including permissions, owner, group, size, and modification time. 
#t - This option sorts the output by modification time.
# r - in ascending order sorting

ls -lt --exclude="*.extension1" --exclude="*.extension2" #to exclude any particular type of extension

#To show only directories and exclude all file types (yes! even directories are also counted under files in linux)
ls -ltd -- */
#-d: This option lists directories only, excluding regular files and other file types.
#-- */: This pattern matches all directories (represented by /) within the
-------------------------------------------------------------------------------------------
cd /path/to/directory
rm *
rm -rf .* # Including Hidden Files: If you also want to delete hidden files (those starting with a dot), use:

#Use the rm command with the -rf options to delete all files and directories:
rm -rf * 
-------------------------------------------------------------------------------------------
The `find` command in Linux is used to search for files and directories in a directory hierarchy. The command you mentioned:

```sh
find / -name kafka-producer-perf-test.sh
```

### Breakdown of the Command:
- **`find /`**: This part of the command tells `find` to start the search from the root directory (`/`).
- **`-name kafka-producer-perf-test.sh`**: This part specifies the name of the file you're searching for, in this case, `kafka-producer-perf-test.sh`.

### Purpose:
The complete command searches for a file named `kafka-producer-perf-test.sh` starting from the root directory and traversing through all subdirectories. It will list all occurrences of the file found within the directory tree.

### Use Cases:
- Locating specific files when you don't know their exact path.
- Checking if a file exists in the filesystem.
- Finding the location of executables or configuration files.

By using this command, you can locate the `kafka-producer-perf-test.sh` script in your filesystem, regardless of its location.

-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------