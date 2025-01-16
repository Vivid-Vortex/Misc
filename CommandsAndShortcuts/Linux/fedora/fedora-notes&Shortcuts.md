In Fedora, you can update packages using the dnf (Dandified Yum) package manager. Here's how you can update packages:

Open Terminal: Open the terminal in Fedora using one of the methods mentioned earlier.

Update Package Repository Metadata: First, update the package repository metadata to ensure you have the latest information about available packages. Run the following command:

- sudo dnf check-update
Upgrade Packages: After updating the repository metadata, you can upgrade all installed packages to their latest versions using the following command:

- sudo dnf upgrade
Optional: Clean Package Cache: You can optionally clean the package cache to free up disk space after the upgrade. Run the following command:

- sudo dnf clean packages
That's it! The dnf package manager will handle the package update process for you. Make sure to run these commands with sudo privileges to perform system-level operations.
============================================================================================================================
#check disk space
df -h

#Check Filesystem Integrity
sudo fsck /dev/sdaX

============================================================================================================================
checking and mouting file system:
lsblk #show all the filesystem in a tree structure ASCII diagram.

------
#Check the space of each file system
df -h

output:
Filesystem           Size  Used Avail Use% Mounted on
/dev/mapper/live-rw  7.4G  7.4G     0 100% /
devtmpfs             4.0M     0  4.0M   0% /dev
tmpfs                3.9G   12K  3.9G   1% /dev/shm
tmpfs                1.6G  9.4M  1.6G   1% /run
/dev/sr0             2.0G  2.0G     0 100% /run/initramfs/live
tmpfs                3.9G  200K  3.9G   1% /tmp
vartmp               3.9G     0  3.9G   0% /var/tmp
tmpfs                793M  180K  793M   1% /run/user/1000

Note: /dev/mapper/live-rw ("You can see the first row, of the above output") is the default root file system of fedora and it's Mount point is /
------
#mount the file system.
sudo fsck /dev/sdaX #replace x with the file system number say sda1, sda2 etc.

NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS
loop0         7:0    0  1.9G  1 loop 
loop1         7:1    0  7.6G  1 loop 
├─live-rw   253:0    0  7.6G  0 dm   /
└─live-base 253:1    0  7.6G  1 dm   
loop2         7:2    0   32G  0 loop 
└─live-rw   253:0    0  7.6G  0 dm   /
sda           8:0    0   15G  0 disk 
├─sda1        8:1    0    1M  0 part 
├─sda2        8:2    0    1G  0 part /mnt/sysroot/boot
│                                    /mnt/sysimage/boot
└─sda3        8:3    0   14G  0 part /mnt/sysroot/home
                                     /mnt/sysroot
                                     /mnt/sysimage/home
                                     /mnt/sysimage
sr0          11:0    1    2G  0 rom  /run/initramfs/live
zram0       252:0    0  7.7G  0 disk [SWAP]

============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================
============================================================================================================================