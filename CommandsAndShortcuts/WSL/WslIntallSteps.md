# WSL Installation Guide

## Instructions for Installing WSL

### 1. Open Windows Features
Type "optionalfeatures" and press Enter to open the Windows Features menu.

### 2. Enable Required Features
Check the following checkboxes:
- **Hyper-V**
- **Virtual Machine Platform**
- **Windows Subsystem for Linux**

### 3. Apply Changes
Click OK to apply the changes.

### 4. Restart Computer
Restart when prompted to complete the installation.

## WSL Commands

### Installation Commands
```bash
wsl.exe --install    # Primary and most recommended command to install WSL on Windows
wsl.exe --update     # Update WSL
```

### Distribution Management
```bash
wsl.exe --list --online    # Lists available online distributions
wsl.exe --install FedoraLinux-42    # Install specific distribution (or Ubuntu as per name appears in wsl.exe --list --online)
wsl.exe --list --verbose   # OR wsl -l -v (List installed distributions with details)
wsl.exe --set-default <distributionName>    # Set default distribution
```