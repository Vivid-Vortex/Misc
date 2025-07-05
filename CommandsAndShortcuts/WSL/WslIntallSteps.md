**Instructions for Installing WSL:**

1.  **Open Windows Features:** Type "optionalfeatures" and press Enter to open the Windows Features menu.
2.  **Enable Required Features:**
    * Hyper-V
    * Virtual Machine Platform
    * Windows Subsystem for Linux
    * Ensure these checkboxes are checked.
3.  **Apply Changes:** Click OK to apply.
4.  **Restart Computer:** Restart when prompted.

**WSL Commands:**

The document also lists several `wsl` or `wsl.exe` commands:

* `wsl.exe --install` #This is the primary and most recommended command to install WSL on Windows.
* `wsl.exe --update`
* `wsl.exe --list --online`: Lists available online distributions.
* `wsl.exe --install FedoraLinux-42`    # Or Ubuntu as per name appers wsl.exe --list --online
* `wsl.exe --list --verbose OR wsl -l -v`
* `wsl.exe --set-default <distributionName>`