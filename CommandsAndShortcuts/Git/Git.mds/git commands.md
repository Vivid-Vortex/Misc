# Git Commands Reference

> **Note:** All commits are immutable. Once a commit is created, it cannot be changed.

## Remote Tracking

```bash
# Fetch remote branch (upstream/downstream)
git fetch -v
```

To see which branches are remote-tracking within your repository:

```bash
git branch -vv
```

The result could be like `main sha_id origin/main`. Here `main` represents the local main branch, and `origin` represents the remote pointer which is pointing to the remote main branch. The complete meaning is: local `main` is tracking/pointing to remote `main`.

To see the difference between your remote branch commits and local branch commits:

```bash
git log origin/main
```

---

## Collaboration

### Basic Commands

- `git clone <url>` — Clone the remote repo to local repo
  - Example: `git clone repository_url`

- `git fetch <repository>` — Download changes from the specified remote repository
  - Example: `git fetch origin`

- `git pull` — Check the difference between fetch and merge in the section below

- `git push` — Upload all local changes (including all local branches) to the specified remote repository and branch. It will push everything (except `.gitignore` ones), even newly created branches, to remote.
  - Example: `git push`

- `git push <repository> <branch>` — Upload all local changes to the specified remote repository and branch
  - Example: `git push origin main`

### Checking for Remote Changes

To check if any changes were made to the remote repo since the last time you pulled:

```bash
git status
```

You will see a message: *"your branch is up to date with origin/main"*. This means nobody has made any changes to the remote main since the last time you pulled from it.

Now go ahead and commit some changes to your local main, then run `git status` again.

You will see a message that your branch is ahead of `origin/main` by 1 commit. That means the HEAD pointer on the local main branch has moved one pointer ahead of the remote main HEAD pointer.

```bash
git log --oneline
```

Here you will see that `HEAD -> main`, i.e. HEAD is pointing to main. This commit SHA will be higher compared to `origin/main`, `origin/HEAD`.

```bash
git fetch origin         # Fetch any changes from origin main to local main
git push origin main     # Replace 'main' with any desired remote branch name to push to
```

To see only your logs:

```bash
# --first-parent shows only direct commits on your current branch, excluding merged branch histories
git log --first-parent --author="your_name_which_shows_in_intellij_github_desktop" --oneline
```

If your local and remote are in sync, you will see: `HEAD -> main, origin/main, origin/HEAD`.

```bash
git log origin/main   # See remote commits, local commits, and their difference
```

Instead of pulling changes from remote, you should merge `origin/main` directly. Merging `origin/main` or a remote branch is like merging any other local branch.

```bash
git merge origin/main
```

---

## Branch Operations

```bash
git checkout -b branch_name    # Creates a new branch and switches to it
git branch branch_name         # Creates a new branch
git checkout branch_name       # Simply switches to the given branch

git log                         # Shows logs of all branches
git log --graph --oneline       # Shows log history in one line
git log branch_name --oneline   # View logs of any branch while staying on any branch
git status                      # Shows the status of the current branch
```

### Merging a Branch

1. First check your branch (say `dev`) which you want to merge with (say `master`). Check if everything is alright.
2. Then switch to the branch `master`.
3. Check the status of `master`. Check if everything is clean and committed.
4. Now trigger the merge command: `git merge dev`.
5. Now trigger `git log` to see HEAD will be pointed to `master`, `dev`, and all the logs will also be shown in the same list.

You can checkout to a specific commit with `git checkout <commit_id>`, then check the logs of that commit with `git log`.

```bash
git rm --cached <file>   # Unstage a file
```

### Modifying a Previous Commit

```bash
git checkout branch_name     # Move to your desired branch
git log --graph --oneline    # View log history, select your desired commit ID
git checkout <commit_id>
git commit --amend -m "Modified message"
# OR:
git commit --amend
# Second command opens a text editor where the first line is the summary
# and a line after a blank line is the description.
git checkout .               # Moves HEAD back to the most current working directory
```

To push the changes to remote:

```bash
git push --force
```

> **Warning:** Force push will rewrite the remote repo history, which is **not recommended**. If you just want to change a commit message, it is okay. If you are changing anything related to the actual content, **do not change history** as your teammates who have taken your commit will face issues. To change content, it is better to use another latest commit.

> **Important:** The branch you are in at the time of the push will automatically be pushed to the origin or remote repo. So always be careful to merge to main and push to remote while being in the local main branch only.

---

## Reset

### Hard Reset

If you reset `--hard`, it will make your local code and local history be just like it was at that commit. If you wanted to push this to someone else who has the new history, it would fail.

```bash
git reset --hard c14809fa
```

### Soft Reset

If you reset `--soft`, it will move your HEAD to where it was, but leave your local files the same:

```bash
git reset --soft c14809fa
```

### Undo a Soft Reset

```bash
git checkout <commit-hash>/current-branch-name
```

---

## Configuration

```bash
# Show all config details
git config --list
# Press 'q' to exit the list, Spacebar or Down Arrow to scroll
```

### Change Credentials

```bash
git config --global user.email "ctntc9.dpk@gmail.com"
git config --global user.email    # Shows the current user.email

git config --global user.name "Vivid-Vortex"
git config --global user.name     # Shows the current user.name value
```

### Set Remote URL

If you want to customize the remote repo you are pushing to:

```bash
git remote set-url origin https://github.com/Vivid-Vortex/Misc.git
```

> Generally you should first create the repo, then clone it, then go to the repo directory and push from there. In that case you do not need to use the above command as your remote is already specified in `.git/config`.

### Authenticate Git Bash with SSH Token from GitHub

```bash
git config --global credential.helper '!f () { sleep 1; echo "username=git token=<TOKEN>"; }; f'
# Replace <TOKEN> with the actual token
```

### Fix Long File Path Issue

```bash
# Open git bash/cmd/powershell/terminal in admin mode
git config --system core.longpaths true
```

### Ignore Whitespace Changes

```bash
# Use git bash in admin/root mode
git config --system apply.whitespace nowarn
```

### Change Default Editor

```bash
git config --global core.editor vim            # Change to vim
git config --global core.editor notepad++.exe  # Change to Notepad++
```

### Delete a Branch

```bash
git branch -d branch_name   # Safe delete — will not delete if unmerged (preferred)
git branch -D branch_name   # Force delete — even if not merged
```

### List All Branches

```bash
git branch -a
```

### View HEAD History

```bash
git reflog   # Press 'q' to exit the reflog window
```

---

> **Note:** To change any configuration settings, you can use git bash. Run it in admin mode and use the command with `--system` argument, even if you do not have any active git repo locally.

---

## Merge vs Rebase

### Merge

Say you want to merge `main` into a feature branch:

```bash
git checkout main               # Move to branch main
git pull                        # Pull latest remote branch changes
git checkout feature_branch     # Switch to the branch where you want to merge main
git pull                        # Pull changes from the branch where it was copied/created
git checkout main
git merge --no-ff feature_branch    # --no-ff avoids fast-forward merge and preserves history
git push                        # Push to remote
```

### Rebase

```bash
git checkout feature_branch
git rebase main
```

With the rebase command, git will set aside all the feature branch changes (commits say `commit1`, `commit2`) to a holding (temp) area. After that, git will pick every commit from the holding area one by one and then adjust those commits to the latest commit on the main branch. Let's say the latest commit on the main branch is `main3`. So `commit1` will point to `main3` instead of `main2`.

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

When you move the main branch and merge the feature branch with `--no-ff`, a third commit `main4` (copy of feature branch) will be created on the main branch.

**With `--no-ff`:**

```
main1 -> main2 -> main3 ------ main4
                        \                    /
                        fb1 -> fb2
```

**Without `--no-ff`** (in case there is no other commit history on main and you are the only one committing): there will be a fast-forward commit and the history `fb1 -> fb2` will be merged and will no longer exist. So use `--no-ff` to preserve history — especially when your intention is to preserve history (which is always a best practice).

```
main1 -> main2 -> main3 ------ main4
```

> **Note:** All commits are immutable. When git rewrites the history of the local branch, it creates a new SHA or commit ID.

> **Important:** We should use rebase on local branches only and not on shared branches (like GitHub main), because it will rewrite the histories. We should always checkout to our feature branch and then rebase from local main (after pulling the main remote changes to local main) and not the other way around.

### Why Rebase Feature Branch Instead of Pulling?

Say we have a branch like below:

```
m1 -> m2 -> m3
            \
            f1 -> f2
```

After we took the copy from point `m2` and started working, someone else committed `m3` to main. Here is the difference between pull and rebase:

#### Git Pull

- **Integration:** Performs a "merge," creating a new merge commit in your feature branch.
- **Git history:** Creates a linear history with branches diverging and then merging.
- **Collaboration:** More suitable for working on shared branches.
- **Potential conflicts:** Might require resolving merge conflicts if changes overlap.

#### Git Rebase

- **Integration:** Replays your feature branch commits on top of the latest main branch changes, rewriting your branch's history.
- **Git history:** Creates a more streamlined, linear history.
- **Collaboration:** Less suitable for shared branches as rewriting history can cause issues for others.
- **No conflicts:** Usually does not introduce merge conflicts.

#### Choosing the Right Option

- **Pull:** Use if you are working on a shared branch, want separate merge commits, and are willing to handle potential conflicts.
- **Rebase:** Use if you are working on a personal branch and prefer a cleaner history.

### My Two Cents on Using Merge and Rebase

1. We must not use rebase outside the unshared feature local branch at all.
2. We should always prefer merge over rebase in order to merge branches, as both will ultimately do a merge and create a merge commit.
3. We should go with interactive rebase only if we have to use those multiple options featured under the interactive rebase pop-up screen.

> **Please look into the section named `### 3. Rebase and Merge`** (do Ctrl+F) in order to find and understand how it rewrites history.

> **Remember:** Be cautious with rebasing shared branches due to potential disruptions for others. Consider using `git pull --rebase` only if you are an advanced user. Understand the implications of each approach before integrating changes.

### Conclusion

1. First rebase your feature branch to main (and keep on rebasing from time to time until you finish), then merge to main — instead of directly pulling and merging. Chances of conflicts would be too high otherwise.
2. Always do the rebase on your local non-shared branch (in this case, the feature branch).

---

## Difference Between Merge and Pull

The difference lies in the history. When we merge any changes from any branch to any branch, a "merge commit" is created. Same way we can merge main into any feature branch — a merge commit will be created on the feature branch. So instead of pulling main branch changes, we are merging main to the feature branch.

```
m1 -> m2 -> m3 ---
            \                    \
            f1 -> f2 -> m4
```

In the above diagram, `m4` is the merge commit on the feature branch and has all the changes as well as the merge commit history on the feature branch itself.

---

## Resolving Merge and/or Rebase Conflicts

```bash
git merge --abort   # Abort any merge in case of conflicts
```

Check the image: `ResolvingConflicts.jpg`

If you want to abort the merge/rebase, use `git merge --abort` or `git rebase --abort`. It will put the current directory back to normal state.

If you want to continue with the ongoing merge/rebase operation:
1. Go to the file showing the conflict and fix it.
2. Run `git add .` — this marks the conflict as resolved.
3. Run `git merge --continue` or `git rebase --continue`.

The merge/rebase is done. You can check the log graph with:

```bash
git log --graph --oneline
```

---

## Cherry Pick and Resolving Cherry Pick Conflicts

---

## Rewriting Git History

- Amending commits
- Rewording commit messages
- Deleting commits
- Reordering commits
- Squashing commits
- Splitting commits

**Quick tip:** Use `git rebase -i HEAD~<number_of_commits_from_HEAD_you_want_to_go_back>`.

```bash
# Example: act on last 2 commits
git rebase -i HEAD~2
```

An editor will open after hitting Enter. Replace the command keyword before the SHA. Available commands are listed in the commented `Commands:` section. After saving, another editor will open where you can do your work. Save and exit.

---

## Stashing

### Basic Stash Workflow

```bash
git stash       # Stash all tracked files (not untracked — run git add . first to stage all current files)
git stash list  # Show the list of all stash entries
git stash show  # If only one stash entry
git stash pop   # Take the latest stash from the stash stack

git stash -m "stash_comment"           # Add a meaningful comment to identify the stash later
git stash pop --index <stash_index>    # Pop a stash at a particular index
```

```bash
# Assign a stash to its own branch
git stash branch <branch_name> <index_number>
# Assigns the stash at the given index to its own branch and automatically moves you to that branch
git log --oneline   # You will find that you are now in the new branch
```

```bash
git stash drop <index_number>   # Drop a specific stash entry
git stash clear                  # Drop the entire stash stack
```

### Fixing Merge Conflicts During Stash Pop

If you have any unstaged changes in your working directory, git will abort the stash pop operation and put the popped stash back to the stack.

```bash
git status                          # Show modified files in your working directory
git stash show <index_number>       # Check the stash that caused the conflict
```

**Strategy 1:** Put either the working directory changes or stash changes into a separate branch. When you are done with your current change, you can either merge or rebase these two branches.

**Strategy 2:** Stage the changes in your working directory first (only staging, commit not necessary), then pop:

```bash
git stash pop <index_number>
```

You will get a conflict. Open the red (conflicting) file, manually fix the issue, and save it.

```bash
git status   # Staged changes in green, just-fixed file in red (unmerged paths)
git add .    # Resolve the conflict
git status   # Now everything should be staged and in green
# Merge conflict resolved!
```

As a best practice, create a commit with a proper message to leave a trail of this issue.

Since we solved the stash merge conflict manually, clear the stash manually (git will not remove it itself when there is a conflict):

```bash
git stash list
git stash drop <index_number>
git stash list
```

---

## Git Delete / Reset

```bash
git log --oneline
git reset --hard HEAD~1
# HEAD will move one step back, and since it is a hard reset, anything above HEAD will be gone (DELETED).
# This includes commits and working directory changes — be very careful.
```

To undo the commit only (without deleting the changes):

```bash
git reset --soft HEAD~1
# Undoes your last commit and moves back the changes to the "staging area" (not the working directory).
# It will not affect your working directory.
git log --oneline   # The last commit will not show in the graph
git status          # Your last committed changes will be back in the staging area
```

### Deleting Commits Further Than One Commit from HEAD

> **Caution:** Never drop commits on the shared branch. As a rule of thumb, never do it outside a feature branch or non-shared branch. If for any reason you have to push the dropped commit to the shared branch, use `git revert` — it reverses the effects of a commit non-destructively.

```bash
git rebase -i HEAD~2   # "Manipulate" the last two commits from HEAD
```

An editor will open. Change the initial keyword of the commit you want to play with — for example, change `pick` to `drop` to drop that particular commit. Since git commits are immutable, doing a rebase rewrites history and replaces all commit hashes, even for unmodified commits.

```
fb1 -> fb2 -> fb3
```

There is a higher chance of conflict when dropping a commit way below the latest commit due to multiple transitive dependencies. It is better to avoid dropping commits altogether — instead, make a new commit with the desired changes.

```bash
git rebase --abort   # Abort the rebasing in case of conflict
```

### Git Revert

`git revert` is a safer, non-destructive alternative to dropping commits.

---

## Changing Commit Messages

### Modify the Latest Commit Message

```bash
git commit --amend -m "New commit message"
```

### Modify Any Commit Below the Latest

```bash
git rebase -i HEAD~2   # Show the last two commits in the editor
```

You will see two commits with `pick` at the beginning, followed by the SHA and then the commit message. `pick` means no-op (no operation) for git. Change `pick` to `reword` for the commit whose message you want to change. Git will prompt you to type a new commit message when it runs the rebase.

> **Note:** All commit hashes shown in the editor will be modified since git commits are immutable. Old ones will be discarded through the garbage collector (runs automatically, or manually with `git gc`).

---

## Git Squash

Squash is not a command — it is one of the many options available under git interactive rebasing. Squash is used to repackage commits which are related to each other.

```bash
git rebase -i HEAD~3   # Act upon the last 3 commits
```

Change `pick` to `squash` for the commits you want to squash (meld) into one commit. Once you save and close the first editor, another editor will open which will allow you to edit or remove those commit messages.

---

## Staging Area

> **Staging is a part of the repository's state, not tied to a specific branch.**

**Use case:**
Initially I had only one branch `master`. In this branch I added a text file named `dev1.txt`. Then without staging it, I checked out and created a branch named `dev1` from `master`. After checking out to `dev1`, I staged `dev1.txt`. When I did `git checkout master` again, why is `dev1.txt` staged there, even though I had staged this file only in `dev1` and not in `master`?

**Reason:**
When you switch between branches in Git, any changes that are not committed are carried over to the new branch. This includes staged changes. Git does not reset the staging area when you switch branches; it preserves it until you either commit or reset explicitly.

To unstage changes when switching branches:

```bash
git reset   # Unstages any changes in the current branch
```

```
    {Staging area}

{master}                  {dev1}
```

As shown above, the staging area is common to both `master` and `dev1`.

---

When you create any branch from another branch (say `dev1` from `master`), the **committed** changes will be carried forward to the next branch because it was created using it as a base. Staged-only changes are not tied to any specific branch.

When you create a branch without committing anything in the current branch, nothing will be carried forward. The changes will remain intact to the branch where you will first commit the staged files.

If no changes exist between the current branch and the new branch you are creating, then the new branch will not spawn from the current one — both will point to the same commit.

**Both `dev1` and `dev2` commits/changes are same as `main`:**

```
main ----
    \        \
    dev1 \
            dev2
```

**`dev2` is created from `dev1` and the base branch content is different from `main`:**

```
main ----
    \
    dev1
        \
        dev2
```

---

## Upstream Issue

**Error:**

```
fatal: The current branch master has no upstream branch.
To push the current branch and set the remote as upstream, use...
```

**Resolution:**

This error indicates that you are trying to push changes from a branch (`master`) that does not have an upstream branch configured. An upstream branch is the remote branch that your local branch is tracking.

**Steps to resolve:**

1. Ensure you are on the branch you want to push: `git branch` / `git checkout master`

2. Set the upstream branch:

   ```bash
   git push -u origin master
   ```

3. After setting up, future pushes can simply use:

   ```bash
   git push
   ```

4. Verify:

   ```bash
   git branch -vv   # Shows the tracking information for each branch
   ```

---

## Fetch vs Pull

> **Simply put:** `git pull` = `git fetch` + `git merge` (all remote commits will be fetched and merged locally), whereas with `git fetch`, you are in control of which commits you want to merge.

### `git fetch`

- Fetches changes from the remote repository but **does not automatically merge** them with your current branch.
- Updates the remote-tracking branches (e.g., `origin/master`) to reflect remote changes.
- Does not modify your local branches.
- Useful for reviewing changes before integrating them.

```bash
git fetch <remote>
# Example:
git fetch origin
```

### `git pull`

- Fetches changes and **automatically merges** them into your current branch.
- Essentially: `git fetch` followed by `git merge`.
- May result in merge conflicts if there are conflicting changes.

```bash
git pull <remote> <branch>
# Example:
git pull origin master
```

### Safe Two-Step Process

```bash
git checkout <branch>   # Step 1: Checkout the branch you want to fetch
git fetch -v             # Step 2: Fetch
git merge                # Step 3: Merge
```

`git fetch` provides choice — you can choose which remote commits you want to merge locally. That is why it is a safer option than `git pull`.

### Selectively Merging Fetched Commits

```bash
git fetch                        # Update your local knowledge of remote changes
git log                          # Review fetched commits and decide which to integrate
git merge <branch_name>          # Merge an entire branch (if there are no conflicts)
git cherry-pick <commit_hash>    # Selectively apply individual commits from a remote branch
```

---

## Comparing Branches

```bash
git diff branch1..branch2               # Show difference between two branches
git diff --name-only branch1..branch2   # List only the names of files that differ
git diff --stat branch1..branch2        # Summary of added, modified, or deleted lines
git diff --summary branch1..branch2     # Brief summary of differences
```

---

## Git Commenting Strategy

Use proper symbols for modifications, additions, or removals of any file(s). Use these symbols everywhere in your comments — both in git and GitHub.

```
Intellij keyshortcuts(.) & addition of fedora file(+)

1. Added few IntelliJ shortcuts
2. Added fedora concepts as initial commit
```

**Sidenote:**
- `.` — represents modification
- `+` — represents addition (of new file(s))
- `-` — represents subtraction (of removed file(s))

---

## Rename a Branch

1. Checkout to the branch you want to rename:

   ```bash
   git checkout <old_branch_name>
   ```

2. **Rename the branch:**

   ```bash
   git branch -m <new_branch_name>
   ```

3. **Push the renamed branch (optional):** If you have already pushed the old branch to a remote repository, push the renamed branch as well:

   ```bash
   git push -u origin <new_branch_name>
   ```

---

## Remove Files from .gitignore

Add the file inside `.gitignore` and then run:

```bash
git rm --cached gradle.properties
# If the file is already tracked by Git, this removes it from tracking
```

---

## Checkout a Remote Branch

### Steps

1. **Fetch all remote branches:**

   ```bash
   git fetch
   ```

2. **List all remote branches:**

   ```bash
   git branch -r
   ```

3. **Checkout the remote branch:**

   ```bash
   git checkout -b feature-branch origin/feature-branch
   ```

   This command does two things:
   - `-b feature-branch` creates a new local branch named `feature-branch`.
   - `origin/feature-branch` specifies the remote branch to track.

   **Shortcut (personal discovery):**

   ```bash
   git checkout remote_branch_name
   # Just use the branch name — exclude other parts appended before it.
   # This will checkout the remote branch and create a local copy of it.
   ```

4. **Verify the checkout:**

   ```bash
   git branch -vv
   ```

### Example

```bash
git fetch
git branch -r
git checkout -b feature-branch origin/feature-branch
git branch -vv
```

### Explanation

- `git fetch` — Updates your local copy of the remote branches without changing your working directory.
- `git branch -r` — Lists remote branches.
- `git checkout -b <local-branch> <remote-branch>` — Creates a new local branch from the specified remote branch and checks it out.
- `git branch -vv` — Shows the local branches and their upstream tracking branches.

---

## Unstage All Files

```bash
git reset   # Unstage all files
```

---

## Push an Existing Local Project to GitHub

If you created any project before creating or cloning any git repo, you can push it to an existing git repo using the below methods.

### Create a New Repository on the Command Line

```bash
echo "# SpringbootExceptionHandlerDemo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Vivid-Vortex/SpringbootExceptionHandlerDemo.git
git push -u origin main
```

### Push an Existing Repository from the Command Line

```bash
git remote add origin https://github.com/Vivid-Vortex/SpringbootExceptionHandlerDemo.git
git branch -M main
git push -u origin main
```

---

## Set Default Branch (`git branch -M`)

```bash
git branch -M branch_name
```

Sets the default branch. This branch will always be pushed in case of `git push`, since it is the default branch.

Another way of pushing your preferred branch without setting any default branch is to just switch to that branch and then go to git desktop and click on the git push icon, which will be visible after all the changes are committed.

---

## GitHub Merge Options Explained

When merging branches in GitHub, you have three primary options: "Create a merge commit," "Squash and merge," and "Rebase and merge."

### 1. Create a Merge Commit

**What it does:** Combines the feature branch into the target branch by creating a new "merge commit," preserving the complete history of both branches.

**Advantages:** Retains full commit history, shows individual commits and context, useful for projects where maintaining detailed history is important.

**Example:**

```
*   Merge branch 'feature-branch' into 'main'
|\
| * Commit message 3 (feature-branch)
| * Commit message 2 (feature-branch)
| * Commit message 1 (feature-branch)
|/
* Previous commit (main)
```

### 2. Squash and Merge

**What it does:** Combines all commits from the feature branch into a single commit before merging.

**Advantages:** Simplifies the commit history, useful for keeping the main branch history clean and concise.

**Before:**

```
* Commit message 3 (feature-branch)
* Commit message 2 (feature-branch)
* Commit message 1 (feature-branch)
* Previous commit (main)
```

**After:**

```
* Single squashed commit (main)
* Previous commit (main)
```

### 3. Rebase and Merge

**What it does:** Re-applies the commits from the feature branch onto the tip of the target branch. No merge commit is created; history is rewritten to appear linear.

**Advantages:** Maintains a linear project history, keeps commit history clean without merge commits.

**After:**

```
* Commit message 3 (main)
* Commit message 2 (main)
* Commit message 1 (main)
* Previous commit (main)
```

### Choosing the Right Option

- **Create a Merge Commit:** Choose this to preserve the full history of commits. This is often the default choice for many projects.
- **Squash and Merge:** Use this to combine multiple commits from a feature branch into a single commit.
- **Rebase and Merge:** Opt for this if you prefer a linear history without merge commits.

---

## Don't Use `git add .`

It is advisable not to use `git add .` directly to stage modified or untracked files as it will stage even the files placed in `.gitignore`. If you are using git version 2.0 or later, use:

```bash
git add -u .        # Stage only modified and deleted files (in place of git add .)
git commit -a -m "" # Commit only modified and deleted files (in place of git commit -m "")
```

---

## Vim Interactive Rebase

```bash
git rebase -i HEAD~4
git rebase -i --root
```

In vim, to replace all `pick` with `s` (squash):

```vim
%s/pick/s/g
```

```bash
git push origin branch_name --force
# No need to give branch_name if you are already on that branch.
# Better check the current branch using git branch.
```

---

## Cleaning — Untracked Files

To clean up your working directory by removing all files not currently staged or committed:

```bash
git clean -n    # List the files to be cleaned (dry run)
git clean -f    # Remove untracked files
git clean -fd   # Remove untracked directories (if any)
```

---

## Cleaning — Tracked Files

```bash
# Equivalent to GitHub Desktop: select all -> right-click -> discard (one/all) file(s)
git reset --hard
```

This command will:
- Discard all changes in tracked files.
- Reset the index to match the last commit.
- Set the working directory to match the index.

```bash
git reset --hard <commit-hash>
```

- `<commit-hash>` — The target commit hash (can also use `HEAD~n` or a branch name).
- Omitting `<commit-hash>` defaults to `HEAD`, discarding all uncommitted changes.

---

## `git clean -fd` vs `git reset --hard`

To completely reset a repository to a clean state, use both:

```bash
git reset --hard && git clean -fd
```

### `git reset --hard`

- Resets the current branch to a specific commit (or `HEAD` by default).
- Updates the **working directory**, **staging area**, and **HEAD**.
- Removes **tracked changes** only.

```bash
git reset --hard HEAD~1
```

### `git clean`

- Deletes **untracked files and directories**.
- Does not affect tracked files or commit history.

```bash
git clean -f -d
```

### Key Differences

| Aspect | `git reset --hard` | `git clean` |
| --- | --- | --- |
| **Scope** | Tracked files only | Untracked files/directories |
| **Affects Commit History** | Yes (resets to a specific commit) | No |
| **Deletes Files?** | No, only restores tracked files | Yes, removes untracked files |
| **Command Context** | Revert commits or reset working directory | Clean up untracked files |

---

## Changes to Be Committed vs Changes Not Staged vs Untracked Files

- **Changes to be committed:** These are changes you have staged using `git add`. They will be included in your next commit. Think of it as a "ready to go" status.

- **Changes not staged for commit:** These are modifications to tracked files that you have made in your working directory but have not yet staged for commit. Git is aware of them but they are not marked for inclusion in the next commit. This includes any RUD (minus C from CRUD) operations on existing tracked files — renaming files, directories, etc.

- **Untracked files:** These are files in your working directory that Git is not tracking at all. They have never been staged or committed.

**In a nutshell:**
- To be committed = staged changes
- Not staged for commit = tracked but unstaged changes
- Untracked files = new files not yet tracked by Git

---

## WSL — `^M` Characters Issue

**Symptom:** When doing `git status` from the WSL terminal, a file appears as untracked whereas checking through Windows Command Prompt shows no files. A `^M` character is visible in one of the files.

The `^M` character indicates Windows-style line endings (CRLF) instead of Unix-style (LF). The `^M` is a visual representation of the carriage return character (`\r`).

### Common Causes

1. **Creating files in Windows:** Applications like Notepad or some IDEs use CRLF line endings. When viewed in WSL, the `^M` character appears.
2. **Version control systems:** Files with CRLF endings might be checked in, leading to issues when checked out in a Unix environment.

### Solutions

1. **Using `dos2unix`:**

   ```bash
   sudo apt install dos2unix
   dos2unix yourfile.txt
   ```

2. **Using `sed`:**

   ```bash
   sed -i 's/\r$//' yourfile.txt
   ```

3. **Using text editors:** Open in VS Code, Sublime Text, or Notepad++ and save with Unix (LF) line endings.

4. **Configure Git to handle line endings:**

   ```bash
   git config --global core.autocrlf input
   ```

   This converts CRLF to LF on commit but leaves LF as LF on checkout, preventing `^M` characters from appearing.

---

## Create a Snapshot of Current Branch

You can use this to safely backup your changes quickly.

```bash
git branch snapshot-1-$(git rev-parse --abbrev-ref HEAD)
```

**Explanation:**
- `$(...)` — Substitutes the output of `git rev-parse --abbrev-ref HEAD` into the command.
- `snapshot-1-` — Prefix for your new branch.
- `git rev-parse --abbrev-ref HEAD` — Gets the current branch name dynamically.

**Example:** If you are on `feature-branch`, the new branch will be named `snapshot-1-feature-branch`.

---

## Reordering Commits Using Vim and Rebase

**Use case:** You have `commit1`, `commit2`, `commit3`. You want to squash `commit1` and `commit3` without affecting `commit2`.

**Solution:** First reorder commits as `commit1`, `commit3`, `commit2`. Then squash `commit3`, which will be squashed with the next commit in line (`commit1`).

**Reordering commits in vim rebase:**
1. Navigate to the line you want to move using arrow keys.
2. Cut the line using `dd` (deletes the line but keeps it in memory).
3. Navigate to the desired position and paste using `p`.

---

## Show Log of Current Branch

```bash
git log                                               # Display commit history for the current branch
git log --oneline                                     # Concise log
git log --graph --oneline                             # Show graph
git log --author="Author Name"                        # Filter by author
git log --since="2023-01-01" --until="2023-12-31"    # Filter by date range
```

---

## Create a New Repository on GitHub and Link to Local Git Directory

1. Go to GitHub and create a new repository. Do not initialize it with a README, `.gitignore`, or license.
2. Copy the URL of your new GitHub repository.

```bash
git remote add origin https://github.com/your-username/your-repo.git
# Example:
git remote add origin https://github.com/Code-Deepak-Code/Cpp-Dll-Build.git
git push -u origin master
```

---

## Set Upstream Branch

**Context:** `--set-upstream` or `-u` configures the local branch to track the remote branch. This means future `git push` or `git pull` commands will know which remote branch to interact with by default.

- `origin` — the name of the remote repository (default when you clone a repository).
- `master` — the name of the branch you are pushing.

```bash
git push --set-upstream origin master
```

---

## Create a GitHub Repo from CLI

```bash
gh repo create test-repo-from-local --public
```

---

## Compression Settings

### Disable File Compression

```bash
git config --global core.compression 0   # Globally
git config core.compression 0             # Per repository
```

### Re-enable File Compression

```bash
git config --global core.compression 9   # Globally
git config core.compression 9             # Per repository
```

### Reset to Default Behavior (Recommended)

Remove the `core.compression` setting to revert to Git's default compression behavior:

```bash
git config --global --unset core.compression   # Globally
git config --unset core.compression             # Per repository
```

---

## Increase/Decrease/Reset Buffer Size

### Globally

```bash
git config --global http.postBuffer <size_in_bytes>
# Example: Set to 500MB
git config --global http.postBuffer 524288000
# Or using units (k, m, g for kilobytes, megabytes, gigabytes):
git config --global http.postBuffer 500m
```

### Per Repository

```bash
git config http.postBuffer <size_in_bytes>
# Example:
git config http.postBuffer 250m
```

---

## Git Revert

`git revert` is a safe way to revert changes on protected branches as it does not alter history. It creates a commit that reverses the changes of the specified commit(s).

```bash
git revert HEAD~3..HEAD

git revert <any_branch>

# Revert merge commits on main branch or any other protected branch
git revert -m 1 <merge_commit_hash>
```

- `-m 1` tells git which parent to keep.
- `-m 1` means treat the first parent as the mainline (keep changes from the branch you were on when you did the merge).
- `-m 2` means keep the changes from the merged-in branch and revert the others.

---

## How to Identify Which Branches Were Merged in a Merge Commit

```bash
git show <merge-commit-hash>
```

**Output:**

```
Merge: a1wrwe 4eajgl

a1wrwe - Parent 1
4eajgl - Parent 2
```

---

## Authentication

Git to GitHub connections majorly use two types of authentication: **SSH** and **HTTPS** — both are available on GitHub.

### Switch to HTTPS + Token (Instead of SSH)

SSH requires you to set up a public key, which is a bit more complicated to set up than HTTPS.

```bash
git remote set-url origin https://github.com/Vivid-Vortex/your-repo.git
git pull
```

Git will prompt you for:
- **Username** — `Vivid-Vortex`
- **Password** — Paste your **Personal Access Token** (not your actual password)

To store credentials:

```bash
git config --global credential.helper store
```

---

## Quick Push Commands

**For PowerShell:**

```powershell
git add . ; git commit -m "random push" ; git push
```

**For Command Line:**

```bash
git add . && git commit -m "random push" && git push
```

---

## Git Tags and Versioning

### What is a Git Tag?

A tag is a named pointer to a specific commit in git history. Think of it as a permanent bookmark that says "this exact commit is version X.Y.Z".

Unlike branches (which move forward as you add commits), tags never move — they always point to the same commit forever.

### Why Tags Matter for Versioning & Releases

| Without Tags | With Tags |
| --- | --- |
| Hard to know which commit was "version 3.1.0" | Any commit can be traced back to its exact version |
| Can't reproduce an old build | Checkout `v3.1.0` tag to get the exact code from that release |
| GitHub Releases have no reference point | GitHub Release is tied to the tag forever |

### Tag Commands

```bash
git tag v3.1.0           # Create a tag on your current latest commit locally
                          # Nothing is pushed to GitHub yet — it only exists on your machine

git push origin dev       # Push your code commits on the dev branch to GitHub
                          # Tags are NOT pushed by this — they need a separate push

git push origin v3.1.0   # Push the tag itself to GitHub
                          # This triggers the GitHub Actions workflow
```

### Semantic Versioning (SemVer): `vMAJOR.MINOR.PATCH`

| Part | When to Increment | Example |
| --- | --- | --- |
| MAJOR | Breaking changes, big rewrites | `v2.0.0 -> v3.0.0` |
| MINOR | New features, backwards compatible | `v3.0.0 -> v3.1.0` |
| PATCH | Bug fixes only | `v3.1.0 -> v3.1.1` |

> **Quick Mental Model:**
> - Branch = a road that keeps extending
> - Tag = a mile marker permanently fixed at one spot on that road

### Example: Releasing a New Version (e.g., 3.1.0)

```bash
# 1. Edit version.properties manually (only needed for versionName change)
#    versionCode is auto-incremented by GitHub Actions
#    Edit: VERSION_NAME=3.1.0   <- change this for major/minor bumps
#          VERSION_CODE=345     <- leave this, CI will increment it

# 2. Commit your code changes
git add .
git commit -m "feat: my new feature"

# 3. Push a version tag — this triggers the CI build
git tag v3.1.0
git push origin dev
git push origin v3.1.0
```

GitHub Actions will then:
1. Auto-increment `VERSION_CODE` (346, 347, ... on every release)
2. Build the googleRelease APK
3. Create a GitHub Release at `github.com/your-repo/releases`
4. Attach `PomodoroAuto-3.1.0-build346.apk` for direct download

### Files Changed/Created

| File | Change |
| --- | --- |
| `version.properties` | New — single source of truth for version |
| `androidApp/build.gradle.kts` | Reads version from `version.properties` instead of hardcoded values |
| `.github/workflows/build-release.yml` | New — GitHub Actions CI/CD pipeline |

**Version file location:** `version.properties` (project root) — edit `VERSION_NAME` here for major/minor version bumps. `versionCode` is managed automatically.

**One-time GitHub setup required:** Since the release build uses the debug signing key, it works out of the box. No secrets needed. If you later add a production keystore, add these to GitHub repo Settings -> Secrets:
- `KEYSTORE_BASE64`
- `KEY_ALIAS`
- `KEY_PASSWORD`
- `STORE_PASSWORD`

---

## `git show`

`git show` is used to display detailed information about a specific commit. It shows:
- Commit metadata (author, date, message)
- Changes introduced in that commit (diff)

```bash
git show <commit-id>

git show   # Shows the latest commit
```

**Use case:** When you want to quickly inspect what exactly changed in a commit.

---

## Commit with Title and Description

### Recommended Way (Best Practice)

```bash
git commit
```

This opens an editor where you write:

```
Add user authentication module

Implemented login and signup APIs.
Added JWT-based authentication.
Handled password encryption using BCrypt.
```

### One-liner (Quick Way)

```bash
git commit -m "Add user authentication module" -m "Implemented login and signup APIs"
```

- First `-m` — Title
- Second `-m` — Description

### Best Practices

Since you are aiming for architect-level thinking:

- Keep **title <= 50 characters**
- Make it **action-oriented** (e.g., Add, Fix, Refactor)
- Use description to explain **why** the change was made, not just **what**

**Bad:**

```
Fixed bug
```

**Good:**

```
Fix null pointer in payment service

Handled null response from external API to prevent service crash.
```
