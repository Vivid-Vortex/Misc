# Git Commands & Concepts Reference
> **Important**: This file is a shortend and formatted version of [git commands](git%20commands.md)
> **Important**: All commits are immutable. Once a commit is created, it cannot be changed.

## Table of Contents

- [Git Commands & Concepts Reference](#git-commands--concepts-reference)
  - [Table of Contents](#table-of-contents)
  - [1. Basic Concepts](#1-basic-concepts)
    - [1.1 Commit Immutability](#11-commit-immutability)
    - [1.2 Branch Tracking](#12-branch-tracking)
    - [1.3 Staging Area Concepts](#13-staging-area-concepts)
  - [2. Repository Management](#2-repository-management)
    - [2.1 Basic Collaboration Commands](#21-basic-collaboration-commands)
    - [2.2 Remote Repository Operations](#22-remote-repository-operations)
    - [2.3 Creating and Linking Repositories](#23-creating-and-linking-repositories)
  - [3. Branch Operations](#3-branch-operations)
    - [3.1 Creating and Managing Branches](#31-creating-and-managing-branches)
    - [3.2 Checking Out Remote Branches](#32-checking-out-remote-branches)
    - [3.3 Branch Comparison](#33-branch-comparison)
    - [3.4 Branch Renaming](#34-branch-renaming)
    - [3.5 Branch Deletion](#35-branch-deletion)
  - [4. Merging and Rebasing](#4-merging-and-rebasing)
    - [4.1 Merge vs Rebase](#41-merge-vs-rebase)
    - [4.2 Merge vs Pull](#42-merge-vs-pull)
    - [4.3 Resolving Conflicts](#43-resolving-conflicts)
    - [4.4 GitHub Merge Options](#44-github-merge-options)
  - [5. History Management](#5-history-management)
    - [5.1 Rewriting Git History](#51-rewriting-git-history)
    - [5.2 Changing Commit Messages](#52-changing-commit-messages)
    - [5.3 Squashing Commits](#53-squashing-commits)
    - [5.4 Cherry Picking](#54-cherry-picking)
    - [5.5 Git Reset Operations](#55-git-reset-operations)
    - [5.6 Git Revert (Safe History Changes)](#56-git-revert-safe-history-changes)
  - [6. Stashing](#6-stashing)
    - [6.1 Basic Stash Workflow](#61-basic-stash-workflow)
    - [6.2 Advanced Stash Operations](#62-advanced-stash-operations)
    - [6.3 Resolving Stash Conflicts](#63-resolving-stash-conflicts)
  - [7. Configuration and Setup](#7-configuration-and-setup)
    - [7.1 Git Configuration](#71-git-configuration)
    - [7.2 Authentication Setup](#72-authentication-setup)
    - [7.3 Performance Settings](#73-performance-settings)
    - [7.4 Line Ending Configuration](#74-line-ending-configuration)
  - [8. Information and Logging](#8-information-and-logging)
    - [8.1 Viewing Logs](#81-viewing-logs)
    - [8.2 Checking Status and Differences](#82-checking-status-and-differences)
    - [8.3 Fetch vs Pull](#83-fetch-vs-pull)
  - [9. Cleaning and Maintenance](#9-cleaning-and-maintenance)
    - [9.1 Cleaning Untracked Files](#91-cleaning-untracked-files)
    - [9.2 Cleaning Tracked Files](#92-cleaning-tracked-files)
    - [9.3 Understanding File States](#93-understanding-file-states)
  - [10. Best Practices](#10-best-practices)
    - [10.1 Git Add Best Practices](#101-git-add-best-practices)
    - [10.2 Commenting Strategy](#102-commenting-strategy)
    - [10.3 Command Shortcuts](#103-command-shortcuts)
  - [11. Troubleshooting](#11-troubleshooting)
    - [11.1 Upstream Issues](#111-upstream-issues)
    - [11.2 Line Ending Issues (^M Characters)](#112-line-ending-issues-m-characters)
    - [11.3 File Path Issues](#113-file-path-issues)
  - [12. Advanced Operations](#12-advanced-operations)
    - [12.1 Creating Snapshots](#121-creating-snapshots)
    - [12.2 Commit Reordering](#122-commit-reordering)
    - [12.3 Interactive Rebase](#123-interactive-rebase)

---

## 1. Basic Concepts

### 1.1 Commit Immutability

All commits are immutable. That means once the commit is created, they cannot be changed. This is fundamental to understanding how Git operations like rebase work - they create new commits rather than modifying existing ones.

### 1.2 Branch Tracking

```bash
# Fetch remote branch upstream/downstream
git fetch -v

# Which branches are remote tracking within my repository
# Result could be like: main sha_id origin/main
# Here main represents local main branch, origin represents remote pointer
git branch -vv

# Run this to see the difference between remote and local branch commits
git log origin/main
```

### 1.3 Staging Area Concepts

**Important**: Staging is a part of the repository's state, not tied to a specific branch.

```
                {Staging area}

{master}                            {dev1}
```

When you switch between branches, any changes that are not committed are carried over to the new branch. This includes staged changes.

---

## 2. Repository Management

### 2.1 Basic Collaboration Commands

```bash
# Clone remote repository to local
git clone <url>
# Example: git clone repository_url 

# Download changes from specified remote repository
git fetch <repository>
# Example: git fetch origin

# Check difference and merge (see fetch vs pull section)
git pull

# Upload all local changes to specified remote repository and branch
git push
# Example: git push origin main
```

### 2.2 Remote Repository Operations

```bash
# Check if any changes made to remote repo since last pull
git status
# Message: "your branch is up to date with origin/main" means no remote changes

# After making local commits, git status will show:
# "your branch is ahead of origin/main by 1 commit"

# View logs and see HEAD position
git log --oneline
# You'll see: HEAD -> main, with higher commit sha than origin/main

# Fetch and push workflow
git fetch origin
git push origin main

# View only your commits (excluding merged branch histories)
git log --first-parent --author="your_name_which_shows_in_intelij_github_desktop" --oneline

# Merge remote changes locally
git merge origin/main
```

### 2.3 Creating and Linking Repositories

```bash
# Create new repository from existing project
echo "# ProjectName" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Push existing repository to remote
git remote add origin https://github.com/username/repo.git
git branch -M main
git push -u origin main

# Create repository using GitHub CLI
gh repo create test-repo-from-local --public

# Set custom remote URL
git remote set-url origin https://github.com/Vivid-Vortex/Misc.git
```

---

## 3. Branch Operations

### 3.1 Creating and Managing Branches

```bash
# Create new branch and switch to it
git checkout -b branch_name

# Create new branch (without switching)
git branch branch_name

# Switch to existing branch
git checkout branch_name

# List all branches
git branch -a

# Set default branch
git branch -M branch_name
```

### 3.2 Checking Out Remote Branches

```bash
# Fetch all remote branches
git fetch

# List all remote branches
git branch -r

# Checkout remote branch (creates local copy)
git checkout remote_branch_name

# Alternative method (explicit)
git checkout -b feature-branch origin/feature-branch

# Verify branch tracking
git branch -vv
```

### 3.3 Branch Comparison

```bash
# Compare two branches
git diff branch1..branch2

# Show only file names that differ
git diff --name-only branch1..branch2

# Show summary of differences
git diff --stat branch1..branch2

# Show brief summary
git diff --summary branch1..branch2
```

### 3.4 Branch Renaming

```bash
# Checkout to branch you want to rename
git checkout <old_branch_name>

# Rename the branch
git branch -m <new_branch_name>

# Push renamed branch (if already pushed to remote)
git push -u origin <new_branch_name>
```

### 3.5 Branch Deletion

```bash
# Safe delete (only if merged)
git branch -d branch_name

# Force delete (even if not merged)
git branch -D branch_name
```

---

## 4. Merging and Rebasing

### 4.1 Merge vs Rebase

#### Merge Workflow:
```bash
# Merge main into feature branch
git checkout main
git pull                    # Pull latest remote changes
git checkout feature_branch
git pull                    # Pull from origin branch
git checkout main
git merge --no-ff feature_branch  # Preserve history
git push                    # Push to remote
```

#### Rebase Workflow:
```bash
# Update feature branch with latest main changes
git checkout feature_branch
git rebase main
```

**Rebase Process**:
- Git sets aside all feature_branch changes to holding area
- Picks each commit and adjusts to latest main branch commit
- Creates new commit hashes (commits are immutable)

**Before rebase:**
```
main1 -> main2 -> main3
           \
            fb1 -> fb2
```

**After rebase:**
```
main1 -> main2 -> main3
                    \
                     fb1 -> fb2
```

**Important Notes**:
- Use rebase only on local, unshared branches
- Always checkout to feature branch before rebasing
- Rebase rewrites history by creating new commit hashes

### 4.2 Merge vs Pull

**Git Pull**: Performs fetch + merge, creating merge commit
**Git Merge**: Merges changes from one branch to another, creating merge commit

The difference lies in history. Merge operations create "merge commits" that record the integration point.

### 4.3 Resolving Conflicts

```bash
# Abort merge in case of conflicts
git merge --abort

# Abort rebase in case of conflicts
git rebase --abort

# After fixing conflicts manually:
git add .                   # Mark conflict as resolved
git merge --continue        # Continue merge
# OR
git rebase --continue       # Continue rebase

# View conflict resolution in log
git log --graph --oneline
```

### 4.4 GitHub Merge Options

1. **Create a Merge Commit**:
   - Preserves complete history of both branches
   - Creates new merge commit
   - Shows how branches diverged and merged

2. **Squash and Merge**:
   - Combines all feature branch commits into single commit
   - Simplifies history
   - Useful for clean main branch history

3. **Rebase and Merge**:
   - Re-applies commits onto target branch
   - No merge commit created
   - Maintains linear history

---

## 5. History Management

### 5.1 Rewriting Git History

**Quick tip**: Use `git rebase -i HEAD~number_of_commits_from_head`

```bash
# Interactive rebase for last 2 commits
git rebase -i HEAD~2

# Interactive rebase from root
git rebase -i --root

# Common operations in interactive rebase:
# pick - use commit as is
# reword - change commit message
# edit - stop for amending
# squash - combine with previous commit
# drop - remove commit
```

### 5.2 Changing Commit Messages

```bash
# Modify latest commit message
git commit --amend -m "New commit message"

# Modify older commit messages (use interactive rebase)
git rebase -i HEAD~2
# Change 'pick' to 'reword' for desired commits
```

### 5.3 Squashing Commits

```bash
# Squash last 3 commits
git rebase -i HEAD~3
# Change 'pick' to 'squash' for commits to combine

# In vim, reorder commits if needed:
# Use 'dd' to cut line, 'p' to paste at desired position
```

### 5.4 Cherry Picking

```bash
# Apply specific commit to current branch
git cherry-pick <commit_hash>

# Cherry-pick range of commits
git cherry-pick <start_commit>..<end_commit>
```

### 5.5 Git Reset Operations

```bash
# Hard reset - DANGEROUS: Deletes commits and working directory changes
git reset --hard HEAD~1

# Soft reset - Moves commits to staging area
git reset --soft HEAD~1

# Mixed reset (default) - Unstages changes
git reset HEAD~1

# Reset to specific commit
git reset --hard <commit-hash>

# Unstage all files
git reset

# View HEAD movement history
git reflog
```

### 5.6 Git Revert (Safe History Changes)

```bash
# Revert single commit (creates new commit)
git revert <commit-hash>

# Revert range of commits
git revert HEAD~3..HEAD

# Revert merge commit (specify parent)
git revert -m 1 <merge-commit-hash>
# -m 1: keep first parent (main branch)
# -m 2: keep second parent (merged branch)

# Find merge commit parents
git show <merge-commit-hash>
```

---

## 6. Stashing

### 6.1 Basic Stash Workflow

```bash
# Stash all tracked files (stage untracked files first)
git add .    # Stage untracked files before stashing
git stash

# List all stash entries
git stash list

# Show stash details (if only one entry)
git stash show

# Apply latest stash
git stash pop
```

### 6.2 Advanced Stash Operations

```bash
# Stash with meaningful comment
git stash -m "stash_comment"

# Apply specific stash by index
git stash pop --index stash_index_number

# Create branch from stash
git stash branch branch_name index_number

# Drop specific stash entry
git stash drop index_number

# Clear entire stash stack
git stash clear
```

### 6.3 Resolving Stash Conflicts

**Strategy 1**: Put changes to separate branch
**Strategy 2**: Stage working directory changes first, then resolve conflicts

```bash
git status                  # Check unstaged files
git add .                   # Stage changes
git stash pop index_number  # Now pop will show clear conflicts
# Fix conflicts manually in files
git add .                   # Mark conflicts as resolved
git stash drop index_number # Clean up stash manually
```

---

## 7. Configuration and Setup

### 7.1 Git Configuration

```bash
# Show all configuration
git config --list
# Press 'q' to exit, space/down arrow to scroll

# Set global user information
git config --global user.email "your.email@example.com"
git config --global user.name "Your Name"

# Check current user information
git config --global user.email
git config --global user.name

# Set default editor
git config --global core.editor vim
git config --global core.editor notepad++.exe
```

### 7.2 Authentication Setup

```bash
# HTTPS with token authentication
git remote set-url origin https://github.com/username/repo.git
# When prompted: Username = your_username, Password = Personal_Access_Token

# Store credentials
git config --global credential.helper store

# SSH token authentication (for Git Bash)
git config --global credential.helper '!f () { sleep 1; echo "username=git token=<TOKEN>"; }; f'
```

### 7.3 Performance Settings

```bash
# Disable compression globally
git config --global core.compression 0

# Enable compression (0-9, where 9 is highest)
git config --global core.compression 9

# Remove compression setting (revert to default)
git config --global --unset core.compression

# Increase buffer size for large files
git config --global http.postBuffer 524288000  # 500MB
git config --global http.postBuffer 500m       # Alternative syntax
```

### 7.4 Line Ending Configuration

```bash
# Handle line endings (run in admin mode)
git config --system core.longpaths true
git config --system apply.whitespace nowarn

# Configure line ending conversion
git config --global core.autocrlf input
```

---

## 8. Information and Logging

### 8.1 Viewing Logs

```bash
# Show all logs
git log

# Compact one-line format
git log --oneline

# Show graph structure
git log --graph --oneline

# View logs of specific branch
git log branch_name --oneline

# View logs of current branch only
git log

# Filter by author
git log --author="Author Name"

# Filter by date range
git log --since="2023-01-01" --until="2023-12-31"

# Show first-parent only (exclude merged branches)
git log --first-parent --author="your_name" --oneline
```

### 8.2 Checking Status and Differences

```bash
# Check repository status
git status

# Check specific commit
git checkout <commit_id>
git log
```

### 8.3 Fetch vs Pull

**Git Fetch**:
- Downloads changes without merging
- Updates remote-tracking branches
- Safe for reviewing changes first
- Provides choice of which commits to merge

**Git Pull**:
- Downloads and automatically merges changes
- Equivalent to `git fetch` + `git merge`
- Less control over integration

```bash
# Fetch workflow (safer)
git fetch               # Download changes
git log origin/main     # Review changes
git merge origin/main   # Merge specific branch
# OR
git cherry-pick <commit_hash>  # Apply specific commits

# Pull workflow (automatic)
git pull origin main    # Fetch and merge automatically
```

---

## 9. Cleaning and Maintenance

### 9.1 Cleaning Untracked Files

```bash
# List files to be cleaned (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked directories
git clean -fd
```

### 9.2 Cleaning Tracked Files

```bash
# Discard all changes in tracked files (equivalent to GitHub Desktop "discard all")
git reset --hard

# Reset to specific commit
git reset --hard <commit-hash>

# Combination: Clean both tracked and untracked
git reset --hard && git clean -fd
```

### 9.3 Understanding File States

- **Changes to be committed**: Staged changes ready for commit
- **Changes not staged for commit**: Tracked files modified but not staged
- **Untracked files**: New files not yet tracked by Git

```bash
# Remove file from tracking but keep in working directory
git rm --cached <file>
```

---

## 10. Best Practices

### 10.1 Git Add Best Practices

**Avoid `git add .`** - it stages files even in .gitignore

```bash
# Better alternatives:
git add -u .        # Stage only modified and deleted files
git commit -a -m ""  # Commit only modified and deleted files
```

### 10.2 Commenting Strategy

Use proper symbols for modifications:
- `(+)` - Addition of new files
- `(.)` - Modification of existing files  
- `(-)` - Removal/deletion of files

**Example**:
```
Intelij keyshortcuts(.) & addition of fedora file(+)

1. Added few intelij shortcuts
2. Added fedora concepts as initial commit
```

### 10.3 Command Shortcuts

```bash
# PowerShell
git add . ; git commit -m "random push" ; git push

# Command Line/Bash
git add . && git commit -m "random push" && git push
```

---

## 11. Troubleshooting

### 11.1 Upstream Issues

**Error**: "fatal: The current branch master has no upstream branch"

**Solution**:
```bash
# Set upstream branch
git push -u origin master

# Alternative: set upstream for existing branch
git push --set-upstream origin master
```

### 11.2 Line Ending Issues (^M Characters)

**Problem**: Files created in Windows show `^M` characters in WSL/Linux

**Solutions**:
```bash
# Install and use dos2unix
sudo apt install dos2unix
dos2unix yourfile.txt

# Use sed to remove carriage returns
sed -i 's/\r$//' yourfile.txt

# Configure Git to handle line endings
git config --global core.autocrlf input
```

### 11.3 File Path Issues

```bash
# Fix long file path issues (run in admin mode)
git config --system core.longpaths true

# Ignore whitespace changes
git config --system apply.whitespace nowarn
```

---

## 12. Advanced Operations

### 12.1 Creating Snapshots

```bash
# Create snapshot of current branch - this one will Prints `HEAD`
# **`git rev-parse --abbrev-ref HEAD`** is considered more robust and is # commonly used in scripts, as it is less likely to change behavior across Git versions. If you are in a detached HEAD state, it will output `HEAD`
git branch snapshot-1-$(git rev-parse --abbrev-ref HEAD)

# Create snapshot of current branch - this one will Prints nothing
# **`git branch --show-current`** is newer (introduced in Git 2.22) and is intended for user convenience. It prints the branch name if you are on a branch, but outputs nothing if you are in a detached HEAD state
git branch snapshot-1-$(git branch --show-current)

# Example: if on 'feature-branch', creates 'snapshot-1-feature-branch'
```

| Shell      | Command Example                                                                               |
| ---------- | --------------------------------------------------------------------------------------------- |
| Bash       | `git branch snapshot-$(git rev-parse --abbrev-ref HEAD)-$(date +"%Y%m%d%H%M%S")`              |
| PowerShell | `git branch snapshot-$(git rev-parse --abbrev-ref HEAD)-$(Get-Date -Format "yyyyMMddHHmmss")` |
| Mac Os     | `git branch snapshot-1-$(git rev-parse --abbrev-ref HEAD)-$(date +"%Y%m%d%H%M%S")`            |
| cmd.exe    | Use environment variables and string manipulation (not as straightforward as Bash/PowerShell) |

### 12.2 Commit Reordering

**Use case**: Squash commit1 and commit3 without affecting commit2

**Solution**: 
1. Reorder commits as: commit1, commit3, commit2
2. Squash commit3 (it will squash with commit1)

**In vim during rebase**:
- Navigate with arrow keys
- Cut line with `dd`
- Paste with `p`

### 12.3 Interactive Rebase

```bash
# Interactive rebase with vim shortcuts
git rebase -i HEAD~4

# In vim, replace all 'pick' with 's' (squash)
:%s/pick/s/g

# Force push after rebase (be careful!)
git push origin branch_name --force
```

---

*This reference guide covers essential Git commands and concepts. Remember to always backup important work before performing destructive operations like hard resets or force pushes.*
