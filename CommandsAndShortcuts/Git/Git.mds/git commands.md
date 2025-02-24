#All the commits are immutable. That means once the commit is created, they cannot be changed.

#Fetch remote branch upstream/downstram
	git fetch -v

#Which branches are remote tracking within my repository. Result could be like main sha_id origin/main. 
#Here main represent local main branch. origin represents remote pointer which is pointing to remote main branch.
#Now complete meaning as a whole is local main is tracking/pointing to remote main.
git branch -vv

#Run this to see the difference between your remote branch commit(s) difference and local branch commit(s)
git log origin/main

## Collaboration
#Basic commands
- git clone <url> #It will clone the remote repo to local repo
	- Eg:- git cloen repository_url 
- git fetch <repository> #Download changes from the specified remote repository
	- Eg:- git fetch orgin
- git pull #check the difference between fetch and merge given below
- git push #Upload all local changes (includes all local branches) to the specified remote repository and branch. It will push anything (ofcouse except .gitignore ones), even newly created branches etc to remote.
	- Eg:- git push

- git push <repository> <branch> #Upload all local changes (includes all local branches) to the specified remote repository and branch
	- Eg:- git push origin main

#How to check if any changes made to remote repo since the last time you pulled the remote branch.
git status
#you will see a messag, your branch is up to date with origin/main. This means that no body has made any changes to the remote main, since the last time you pulled from it.
#Now go ahead and commit some changes to your local main. Then run git status.
git status
#You will seee a message that your branch is ahead of origin/main by 1 commit. That means HEAD pointer on local main branch has moved one pointer ahead of the remote main head pinter. 
git log --oneline
#Here you will see that HEAD -> main, i.e. HEAD is point to main. This commit sha will be higher compared to origin/main, origin/HEAD.
git fetch origin #It will fetch any changes from origin main to local main
git push origin main (instead of main, we can put any desired remote branch_name to push to)
#At last simply run 
git log --oneline
#To see only your logs. first-parent will show you only your and your branch commit excluding other branches. This could be quite useful in case if you want to cherry-pick or something. The --first-parent option ensures you only see direct commits on your current branch, excluding merged branch histories.
git log --first-parent --author="your_name_which_shows_in_intelij_github_desktop" --oneline
#If everything your local and remote is in sync, then you'll see a message as 'HEAD -> main, origin/main, origin/HEAD'
#Now use below command. You will see remote commits and local commits and difference.
git log origin/main
#Now instead of pulling the changes from remote, you should better merge the origin/main. Here merging origin/main or remote branch is like merging any other local branch.
#But here you're directly merging local from remote. So now do merge with below commands.
git merge origin/main




#Creates a new branch
	git checkout -b branch_name - Creates a new branch and switches to it
	git branch branch_name - creates a new branch
	git checkout branch_name - simply switches to given branch

git log # show logs of all the branches
git log --graph --oneline #shows log history in one line
git log branch_name --oneline #You can view logs of any branch while staying on any branch. Just put branch name of the branch you wanna see log off
git status # show the status of the current branch

#Merge branch
1. first check your branch (say dev) which you want to merge with say (master). check if everything alright.
2. then switch to the branch master.
3. check the status of master. check if everything is clean and commited there.
4. now trigger this command to merge. command is git merge dev.
5. Now you can trigger git log cmd to see head will be pointed to master, dev and all the logs will also be shown in the same list.

You can checkout to a new commit with #git checkout commit_id
Then you can check logs of that commit with #git log

git rm --cached <file>..." to unstage files

#Modify previous commit of the branch you're in.
	git checkout branch_name #Move to your desired branch in which you want to make any changes to any particular commit
	git log --graph --oneline #shows log history in one line
	Select your desired commit id
	git checkout <commit_id>
	git commit --amend -m "Modified message" OR git commit --amend #second cmd will open a text editor where firt line represents summary and one line after space reprents description.
	git checkout . #Moves the head back to the most current or most recent working directly.
	#In can if you want to push the changes to remote then use below commands.
	git push --force 
	##Beaware that push will rewrite the remote repo history which is not at all recommended. If you just want to change commit message, then it's okay. It you ware chaning anything related to the actual content, then do not 
	#change history as your teammates who has taken your commit, will face issues. So to change the content, better
	#use another latest commit.

** One thing to note about push is that, the branch you will be in at the time of the push, will automatically be push to the origin or remote repo. So always be careful to merge to main and push to remote while being in the local main branch only.

#git hard/soft reset
	If you reset --hard, it will make your local code and local history be just like it was at that commit. But if you wanted to push this to someone else who has the new history, it would fail:
#To undo git soft reset
git checkout <commit-hash>/current-branch-name

	git reset --hard c14809fa
	And if you reset --soft, it will move your HEAD to where they were , but leave your local files etc. the same:

	git reset --soft c14809fa

#To show all the config details
git config --list
q: Exits the list without making any changes.
Spacebar or Down Arrow: Scrolls down to view the next configuration option.

#To change credentials
git config --global user.email "ctntc9.dpk@gmail.com"
git config --global user.email #It will give you the current user.name

git config --global user.name "Vivid-Vortex"
git config --global user.name #It will give the current user.name value

#If you want to customize the remote repo you're pushing the local changes to then use below command.
#Generally you should first create the repo, then clone the repo, then go to the repo directoy and then from there you should push the changes.
#In that case you don't need to use, below command as your remote is already specified in .git/git.conf file.
git remote set-url origin https://github.com/Vivid-Vortex/Misc.git

#To authenticate git bash with ssh token from github
git config --global credential.helper '!f () { sleep 1; echo "username=git token=<TOKEN>"; }; f' #replace <TOKEN> with the actual token

#To sort out long file lenght not supported issue.
git config --system core.longpaths true #Open git bash/cmd/powershell/termila etc in admin  mode Or You can open git bash in admin mode and use this command.

# To ignore whitespaces Changes. Use gitbash in admin/root mode.
git config --system apply.whitespace nowarn

#To change the default editor of git to vim
git config --global core.editor vim

#To change the default editor of git to notepad++
git config --global core.editor notepad++.exe

#To delete the branch
git branch -d branch_name #It will not delete until it is merged, so safe option. Use it always as a first choice over -D option.

#To force delete any branch, even if it's not merged
git branch -D branch_name

#list all the branches
	git branch -a

#To see the history of HEAD movements.
git reflog #press q to move out of the reflog window
----------------------------------------------------------------------------------------
Note :- To change any configuration settings you can use git bash. Run it in admin mode.
And use the command. It will work by using --system argument even if you don't have any
active git repo locally.
----------------------------------------------------------------------------------------
Merge vs Rebase:-
Merge:
	#Say you want to merge main into feature branch.
		git checkout main #move to branch main
		git  pull #pull latest remove branch changes.
		git checkout feature_branch #to the branch (say feature_branch) where you want to merge whatever branch (say main).
		git pull #It will pull the changes from the branch from where it was copied/created in the first place. In this it will pull from local main
		git checkout main
		git merge --no-ff feature_branch #--no-ff option is used to void fast forward merge and previous histories of the feature_branch.
		git push. #Push to remote.

	#Say you just want to update your feature_branch with all the latest changes from main branch.
Rebase:
	git checkout feature_branch
	git rebase main
	#With rebase cmd, git will set aside all the feature_branch changes (commits say commmit1, commit 2) to the holding (temp) area. 
	#After that git will pick every commit from the holding area one by one (first commit1 then commit2 etc.) and then adjust those commits to the latest
	commit on the main branch. Lets' say the latest/recent commit on the main branch is main3. So the commit1 will point to main3 instead of main2. As there were
	#one more commit main3 which was there on the main branch, whcih happens to be the latest and the greatest commit on the main branch. 
	So the chain will look like below.
	Before rebase:
	main1 -> main2 -> main3
						\
						fb1 -> fb2
						
	After rebase:
	main1 -> main2 -> main3
											\
											fb1 -> fb2
	#When you'll move the main branch and merge fb(feature_branch) with -no-ff option. There'll be a third commit main4 (copy of feature branch) which will be created on main branch.
	main1 -> main2 -> main3------main4
											\					/
											fb1 -> fb2
	#But with the help of --no-ff flag/cmd option. You graph/history (i.e.)
	with --no-ff
		main1 -> main2 -> main3------main4
											\					/
											fb1 -> fb2
	
	without --no-ff, incase let's assume there's no other commit history on the main branch and you're only one going to commit to the top of main branch
	in that case there'll be a fast forward commit and the history fb1 -> fb2 will be merged and will no longer exist. So in order to avoid this situation,
	we must use --no-ff option in order to be cautious and preserve history. Becuse you never know if there's or there isn't any commit on the main branch.
	And especially when your intention is to preserve the history (which is always a best practice).
	
	without --no-ff
	
		main1 -> main2 -> main3------main4
		
	#Note:
	#All the commits are immutable. That means once the commit is created, they cannot be changed.
	#This is important to know, because when git rewrites the history of the local branch (feature_branch as per our example), it
	#created a new sha or commit id.
	
	#Important
	#It is important to note that, we should use rebase on local branch only and not the shared branch (github main), because it will rewrite the histories.
	#Also relating to the above point, we should not use rebase on the main branch (which is the local copy of the shared remote branch). We should always
	#checkout to our feature branch and then rebase the local main (of course after pulling the main remote changes to local main) and not the other way round.
	
#Now the question arises, why we should do rebase OF OUR FEATURE_BRANCH in order to pull the latest changes from the main branch (Assuming local main is in sync with remote main).
Say we have a branch like below:

m1 -> m2 -> m3
			\
			f1 -> f2
			
So the situation here is as follows:
After we have taken the copy from point m2 of the main branch and started working further on it. Meanwhile someone else commited their changes to main branch as m3.
Observer carefully this point, in both the cases merge from main to feature_branch wil occur.
While both git pull and git rebase can integrate changes from a main branch into your feature branch, they achieve this in different ways, leading to distinct outcomes and impacting your Git history:

While both git pull and git rebase can integrate changes from a main branch into your feature branch, they achieve this in different ways, leading to distinct outcomes and impacting your Git history:

Git Pull:
Integration: Performs a "merge," creating a new merge commit in your feature branch. This commit records the merging of changes from the main branch at a specific point in time.
Git history: Creates a linear history with branches diverging and then merging. This can make it clearer to visualize how changes integrated from the main branch.
Collaboration: More suitable for working on shared branches where others might be contributing and you want to keep your branch independent. Merge commits track individual contributions.
Potential conflicts: Might require resolving merge conflicts if changes in both branches overlap.

Git Rebase:
Integration: Replays your feature branch commits on top of the latest main branch changes. This rewrites your branch's history to appear as if they were always made after the main branch updates.
Git history: Creates a more streamlined, linear history where your feature branch commits appear directly after the main branch changes. This can be cleaner for personal branches not yet shared.
Collaboration: Less suitable for shared branches as rewriting history can cause issues for others who have already pulled or integrated your branch.
No conflicts: Usually doesn't introduce merge conflicts, as your commits are replayed on top of the main branch without merging.

Choosing the right option:
Pull: Use if you're working on a shared branch, want separate merge commits for tracking changes, and are willing to handle potential conflicts.
Rebase: Use if you're working on a personal branch, prefer a cleaner history, and don't anticipate collaborating with others on the branch.

-------My Two Cents on using Merge and Rebase----------
1. We must not use rebase outside the unshred feature local branch at all.
2. We should always prefer merge over rebase, in order to merge the branches, as both will ultimately do merge only and create a merge commit.
3. We should go with interactive rebase only if we have to use those multiple options featured under interactive rebase pop up screen.

** Please look into this section (do ctrl + F) named ### 3. Rebase and Merge, in order to find and understand how rewrites the history
-----------------------------

Remember:
Be cautious with rebasing shared branches due to potential disruptions for others.
Consider using git pull --rebase to rebase after pulling changes (only recommended for advanced users).
Understand the implications of each approach before integrating changes.

Conclusion:
1. First rebase your feature_branch to main branch (and keep on rebasing your feature_branch from time to time until you finish working on that feature branch) and then merging
to main, instead of directly pulling and merging to main. Chances of conflicts would be too high otherwise.
2. Always (extremely important to note), do the rebase on your local non-shared branch (in this case it is feature_branch)
----------------------------------------------------------------------------------------
Differenc between Merge and pull. The point is that in both the cases content is flowing from one point to another, so what's the difference.
Point is we can checkout main and pull the changes from feature_branch to main. And then push it to remote. And likewise every team member can do.
Same thing we can checkout feature_branch and pull the changes from main. So What's difference.

And. The difference lies in the history. When we merge any changes from any branch to any branch, there will be a "merge commit" created corresponding to that.
We already know merging from any feature_branch to main and the merge commit gets created. Same way we can merge main into any feature_branch and likewise a merge commitw
will be created. So instead of pullling main branch changes we are merging main to the feature_branch. That will create a merge commit on the feature brancha
and this commit will be shown on the branch as the commit (both visually and as commmit sha).

m1 -> m2 -> m3----
			\						\		
			f1 -> f2 -> m4

In the above pic, m4 which is the merge commit on feature_branch has all the changes as well as the merge commit history on the feature_branch itself.

----------------------------------------------------------------------------------------
Resolving merge and/or rebase conflits:
git merge --abort #It will abort any merge in case of any conflicts
Check this image:
ResolvingConflicts.jpg

-----------
If you want to abort the merge/rebase then use git merge/rebase --abort. It will put the current directory back to normal state.
If you want to contiue with the ongoing merge/rebase operation, then go to that file (which would be showing along with the conflict message) and fix the conflict.
then run git add . #It will mark the conflict as resolved.
then run git merge/rebase --continue
merge/rebase is done now.
You can check the log graph with git log --graph --oneline
-----------

----------------------------------------------------------------------------------------
git cherry pick and resolving cherry pick conflict:

----------------------------------------------------------------------------------------
Rewriting Git History:
	Amending commits
	Rewording commit messages
	Deleting commits
	Reordering commits
	Squashing commits
	Splitting commits

Quick tips: Just use git rebase -i HEAD~number_of_commits_from_head_you_wanna_go_back
example:- git rebase -i HEAD~2
An editor will be opened after hitting enter. Just replace the commands the sha. Commands would be given under commented Commands: section.
After hitting enter, another editor will open, where you can do your work. Save and exit.
----------------------------------------------------------------------------------------
Stashing:
Very simple stash workflow:
	git stash #It will stash all the tracked files (but not the untracked ones, so first do git add . to stage all the current files before stashing)
	git stash list #It will show the list of all the stash entries.
	git statsh show #If only one stash entry
	git stash pop #It will take the latest stash from the stash stack

git stash -m "stash_comment" #It will allow to give some meaningful comment to the stash to easily identify it laster
git stash list #It will show the stash stack with that comment you addede in the last step.

git stash pop --index stash_index_numer #stash_index_numer will be the number of fetch a particular index with its number

#You can assign a particular stash to their own branch only
git stash branch branch_name index_number #With this cmd, you can assign the statsh with index number say 1 (you've given in index_number to) to it's own branch with branch name given. And after runnig this cmd, you will automatically be moved to that branch.
git log --oneline #You will find out that you're now in the new brancha

#To drop a stash entry
git stash drop index_number

#To drop entire stash stack
git stash clear

##fixing merge conflict

#In case of any conflit which arises during stash pop operation. If you have any unstaged changes in your working directory then 
#git will abort the stash pop operation and the put the popped stash back to the stack.
#Plus it will also let us know what's the problem is.

git status #It will show the modified files in your working directory
git stash show index_number #The index should be of the stash number for which you got the conflict. You will see both the cmds (above and this one) will point to the same file.

#Strategy 1 to fix the conflict. Simply put of the changes (working directory changes or stash changes) to another seperate branch. And when you're done with your current change. You can either merge or rebase these two branches.

#Strategy 2 is to know that the stash operation is being aborted since we had some unstaged files in our working directory. 
#So first thing to do is to stage the changes in our working directoy (Only staging will do and commit not necessary).
#Now do pop
git stash pop index_number
#You will get conflict. But now you will clearly see the files where conflict is in red and the files which can be merge without any issue in green.
#So open that file in red and manually fix the issue and then save it
#git status
#You will see the changes which are staged in green and just now merged fixed file in red saying unmerged paths. So to resolve this finally use git add . cmd and it will resolve the conflict.
git status #Now everything should be staged and in green
#Merg conflict resolved!!!
#Go one step further
#As a best practice, leave a trail of this issue for the future developer or may be you in future to know that you got this issue in the past
#So to leave a trail, create a commit history or simply say commit with a proper message.
#git log --oneline
#So if you remember we solved the stash merge conflict manually. So we need to clear the stash manually (becuase there was a  conflict, git will not remove the itself).
git stash list
git stash drop index_number
git stash list

----------------------------------------------------------------------------------------
#Git Delete

git log --oneline
git reset --hard HEAD~1 #HEAD will move one step back and since it is a hard reset, anything above head will be gone (DELETED). That included commits and working directory changes. So be very careful.

#So now insted of deleting anything, you can choose to undo the commit only. 
#This is different from deleting, since changes are only uncommited and will move back to the staging area. And so it will not be deleted from the working directory either.
git reset --soft HEAD~1 #It will undo you last commit and will move back the changes to the "staging area" (and not the working directory) or commited changes to uncommited state
but it won't affect your working directory.
git log --online #The last commit will not show in the graph
git status #You wil find your last commited changes back in the staging area.

#Deleting commits further than one commit from the HEAD.

A word of caution: Never drop commits on the shared branch. Or as a rule of thumb, never do it outside feature branch or non-shared branch (which you're not going to push to remote stream.)
And if for any reason if you have to push the droped commit to the shared branch use git reword which is like reversing the effects of a commit non distructively.
Git reword is also a safer alternative to git drop, but it's non destructive in nature.
git rebase -i HEAD~2 #I want to "manipulate" last two commits from HEAD. Using the term manipulate because we can do alot of operations using interactive reabse. rebase -i means Interactive rebase. 
A pop up will open an editor after this cmd.
In the opened editor you'll see two last two commits (because we did HEAD~2) in one graph line way
Now from here just change the initial letter of the commit which you want to play with. Say if pick some_hash Updated READMe is shown, then simply make the pick to drop in order to drop that particular commit.
And when you will save and close the editor, git will start doing rebasing. So essentially git will start from that first commit which appeard in the pop up window after rebase -i cmd, and then it will move back towards initial position of the HEAD.
One thing to note here is that, since git commits are immutable in nature. So essentially when we are doing rebase, git is changing the history or rewritting the history.
So essentially, when we saved the editor after rebase -i cmd, git will start moving from that first commit that appeard in that interactive rebase editor and it till start moving towards,
the previous HEAD position. In the process, it will definetly rewrite or do whatever cmds we chosse in the interactive rebase windws and in addition to that it will also
replace all the other commits with a new commit hash. Essentially it means all the changes of those unmodified commits will remain same, but it will be put in place with a new hash.

fb1 -> fb2 -> fb3

Higher chance of conflict when doing git drop in interactive rebase especiallly when doing the drop operation way below the latest commit. Becuase there will be multiple transitive dependencies which will produce conflict.
So essentially, let's say if we try to drop fb3, then a conflict might occurs becuae some files in fb3 commit, which would be dependent on fb2 which we are not deleting.
So this way git drop has a higher chanches of conflict. So better to avoid it. And better we should not choose to drop any commit at the first  place. So whatever operations we
have to do, we should do it in current working directly state and then commit it with a proper commit message and a obviosuely a new commit id/hash. And most importantly,
since as a thumb rule we must do these kind of operation in a seperate branch, as a best practice as we know, we should use atomic commit and don't make the feature branch
very large and then wait for it to merge in the main branch. If we use atomic commits, then there will be no such deep commits which you will have to drop, so the situation will not arise in the first place.

so If any conflict already occured. so runnig
git rebase --abort #to abort the rebasing in case of conflict.

#git revert
So better use another alternative which is git revert which is also non destructive.

----------------------------------------------------------------------------------------
Change commit message:

#To modify the latest commit message
git commit --amend -m "New commit message"

#To modify any commit below the latest commit
#Use interactive rebase
git rebase -i HEAD~2 #It will show the last two commit in the editor of you choise.
#You will see two commits with pick in the begening followd by the sha and then the commit message.
#pick means no-op (No operation) for git
#Change the pick for the commit for which you want to reword the commit message.
#Changing the reword will give you an opportunity by git (when it will run reabse after you save and close the editor) to type a commit message of your choice.
#All the hash shown in that opened editor will be modified since git commits are immutable. It will generate another copy of those and discard the old one, through garbage collector, whch you can run by yoru own using git gc if you want to, or else it will run automatically.

----------------------------------------------------------------------------------------
git squash:
#squash is not a command. It is one of the many options available under git interactive rebasing system.
#Squash is used to repackage commits which are related to each other.
git rebase -i HEAD~3 #It will tell the git that I want to act upon the last 3 commits.
So as always we do in rebase interactive, we just need to touch the keyword pick for the commits which we want to modify in anyway.
Ans since we are going to squash (or meld in other words) particularly so in this case pick will be modified to sqash (also you can see the same under the comments section of the opend file.)
So just change the picks of the commits which you want to squash in one commit.
So as always in interactive rebase, once you save and close the first editor, another editor will open which will allow you to do your changes.
Now in the second editor, just edit comment (as you would usually prefer over delete unless everythigs okay. Aslo better than remove) or remove those commit messages.

----------------------------------------------------------------------------------------
Staging is a part of the repository's state, not tied to a specific branch:
Use case:
Initially I had only one branch master in git. In this branch I added a text file name dev1.txt. Then without staging it, I 
checkedout and created and branch name dev1 from this branch master. After checking out to dev1, I staged dev1.txt. When I 
did git checkout master again, why is dev1.txt staged there, even through I had staged this file only in dev1 and not in master.

Reason:
When you switch between branches in Git, any changes that are not committed are carried over to the new branch. This includes staged changes.

In your scenario, you initially made changes to the master branch by adding a text file named dev1.txt. Then, without staging this file, you created a new branch called dev1 from master. 
When you switched to the dev1 branch and staged dev1.txt, you staged the changes in that branch only.

However, when you checked out master again, Git kept the staged changes (in this case, the staging of dev1.txt) because staging is a part of the repository's state, not tied to a specific branch. Git doesn't reset the staging area when you switch branches; 
it preserves the staging area to maintain the changes you've made until you either commit or reset them explicitly.

If you want to unstage changes when switching branches, you can use the command:

git reset

This will unstage any changes in the current branch, allowing you to switch to another branch without carrying over the staged changes.

				{Staging area}
{master}							{dev1}

As you can see in the above pic that staging area is common to both master and dev1 branch.
--------------
#When you create any branch from any branch (say dev1 from master), so the "commited" changes (commited only and not the staged only changes because 
staging is part of the overrall git repo and not tied to any branch) will be carry foraded to the next branch you're creating, because it was created considering
it as a base for the next branch. So all the committed changes from master will be copied to dev1.

#When you create a branch without commiting anything in the current branch. So nothing will be carry forwaded. The changes will remain intact to the branch
where you will first commit the staged files. Just imagine this in the below picture.

				{Staging area}
{master}							{dev1}
--------------
#If no changes are there between the current branch you're in and the new branch you're creating, then the new branch will not be spawned from the branch you're in currently.
#In that case, since both the branches (i.e. the current branch you're in and the newly created branch) will point to the next content/commit matching branch.

Below pic depicts when both dev1 and dev2 commits/changes are same as main
main----
	\		\
	dev1 \
			dev2

Below pic depicts when we create another branch dev2, when the base branch content is different from it's base branch, that is main. So it create a new branch spawning from dev1.
main----
	\		
	dev1 
		\
		dev2
----------------------------------------------------------------------------------------
upstream Issue:
I tried to push my git repo changes using git push command. but in the process I am getting a error saying 

Error:
	fatal: The current branch master has no upstream branch.
	To push the current branch and set the remote as upstream, use.

Resolution and explanation:
This error message indicates that you're trying to push changes from a branch (master in this case) that doesn't have an upstream branch configured. An upstream branch is essentially the remote branch that your local branch is tracking.

To resolve this issue, you can follow these steps:

Check your local branches: First, ensure you're on the branch you want to push. You can do this by running git branch command. If you're not on the master branch, switch to it using git checkout master.

Set upstream branch: Once you're on the correct branch (master in this case), you need to set the upstream branch. You can do this using the -u or --set-upstream-to option with git push, like so:
	git push -u origin master
This command pushes your changes to the master branch on the remote named origin, and also sets up the tracking relationship between your local master branch and the remote origin/master.

Push changes: After setting the upstream branch, you can simply push your changes using git push:
	git push
Since you've set up the upstream branch in the previous step, this command will know where to push your changes.

Verify: After pushing, you can verify that the upstream branch is set correctly by running git branch -vv. It will show you the tracking information for each branch.
----------------------------------------------------------------------------------------
fetch vs pull:

#Simply put: git pull = git fetch + git merge wherein all the remote commits will be fetched and merged locally,
#whereas in git fetch, you're in controll which commit you want to merge.

git fetch and git pull are both used to fetch changes from a remote repository, but they have different behaviors:

git fetch:
	Fetches changes from the remote repository to your local repository, but it doesn't automatically merge them with your current branch.
	Updates the remote-tracking branches (e.g., origin/master) in your local repository to reflect the changes on the remote, allowing you to see what has changed without integrating those changes into your local branches.
	Does not modify your local branches.
	Useful for reviewing changes before integrating them into your local branches.

Syntax:
	git fetch <remote>
	
Example: git fetch origin

git pull:
	Fetches changes from the remote repository and automatically merges them into your current branch.
	Essentially, it's a combination of git fetch followed by git merge.
	Updates your local branch with the changes from the remote repository.
	Automatically merges the changes into your current branch, which may result in merge conflicts if there are conflicting changes.
Syntax:
	git pull <remote> <branch>
	
Example: git pull origin master

#Essentially, it is a two step and rather a safe process if you want to merge remote changes into local.
step 1: Checkout to whatever branch you want to fetch.
step 2: git fetch -v
step 3: git merge

#fetch provides choice - You can choose which remote commit you want to merge locally. That is why is a safer option than git pull.
#Please look at below pic to under the difference between git pull and fetch
#git fetch vs merge.jpg

#Steps to choose which commits to merge into local from remote
git fetch #Use git fetch to update your local knowledge of remote changes.
git log #Use git log to review the fetched commits and decide which ones you want to integrate.
git merge #Use git merge <branch_name> to merge an entire branch (if there are no conflicts).
git cherry-pick <commit_hash> #Use git cherry-pick <commit_hash> to selectively apply individual commits from a remote branch.

In summary, git fetch simply retrieves the latest changes from the remote repository without merging them, whereas git pull not only fetches the changes but also merges them into your current branch automatically.
----------------------------------------------------------------------------------------
To compare two local branches in Git using the command line, you can use the git diff command with the branch names. Here's how you can do it:

git diff branch1..branch2
Replace branch1 and branch2 with the names of the branches you want to compare.
This command will show the difference between the two branches. 

If you want to see the differences in files between the branches, you can add --name-only flag:
git diff --name-only branch1..branch2
This will list only the names of the files that are different between the two branches.

If you want to see a summary of the differences in terms of added, modified, or deleted lines, you can use the --stat flag:
git diff --stat branch1..branch2
This will provide a summary of the changes between the two branches.

And if you want a brief summary of the differences, you can use the --summary flag:
git diff --summary branch1..branch2
This will give a summarized output of the differences between the two branches.
----------------------------------------------------------------------------------------
git commenting startegy:

Use proper symbols for modification(s), addition(s) or removal/substraction(s) of any file(s).
Use these symbol everywhre in your comment, which first is followed by git (and github as well if you're using it)
and second a very short way to represent the intentation and history of what happend, which can be very easy to track 
down the history in case of scenarios such as errors later on.

Intelij keyshortcuts(.) & addition of fedora file(+)

1. Added few intelij shortcuts
2. Added fedora concepts as initial commit

sidenote: 
(.) - represents modification
(+) - represent addition (of new file(s))
(-) - represent substraction(of new file(s))
----------------------------------------------------------------------------------------
Git Rename branch:
To rename a Git branch using the command line, you can follow these steps:

1. Checkout to the branch which you want to rename.

   git checkout <old_branch_name>

2. **Rename the Branch:** Use the `git branch -m` command to rename the branch.

   git branch -m <new_branch_name>

   Replace `<new_branch_name>` with the desired new name for the branch.

3. **Push the Renamed Branch (Optional):** If you have already pushed the old branch to a remote repository, you will need to push the renamed branch as well. Use the `-u` option to set up the tracking information.

   git push -u origin <new_branch_name>

   Replace `<new_branch_name>` with the new name of the branch.

----------------------------------------------------------------------------------------
remove any files from git ignore:=

add the file inside .gitignore file 
and then run this command
git rm --cached gradle.properties #f the gradle.properties file is already tracked by Git, you need to remove it from tracking. Run the following command in your terminal:

----------------------------------------------------------------------------------------
Checkout remote branch :-
	To checkout a remote branch in Git using the Bash command line, you will typically use the `git checkout` command followed by the `-b` option to create a new local branch that tracks the remote branch. Here are the steps:

	### Steps to Checkout a Remote Branch

	1. **Fetch All Remote Branches**:
		 First, ensure you have the latest references to all remote branches by fetching them from the remote repository:
		 ```bash
		 git fetch
		 ```

	2. **List All Remote Branches**:
		 You can list all remote branches to verify the branch name you want to checkout:
		 ```bash
		 git branch -r
		 ```

	3. **Checkout the Remote Branch**:
		 To checkout a remote branch (e.g., `feature-branch`) and create a corresponding local branch:
		 ```bash
		 git checkout -b feature-branch origin/feature-branch
		 ```
		 This command does two things:
		 - `-b feature-branch` creates a new local branch named `feature-branch`.
		 - `origin/feature-branch` specifies the remote branch to track.
		------------------
		latest personal discovery:
		git checkout remote_branch_name #You just need to use branch name and you can exclude other parts appended before branch_name.
		#This will simply checkout the remote branch and create a local copy of it.
		
	4. **Verify the Checkout**:
		 You can verify that the branch is checked out and tracking the correct remote branch:
		 ```bash
		 git branch -vv
		 ```

	### Example

	Here is an example of the full process:

	```bash
	# Fetch all remote branches
	git fetch

	# List all remote branches
	git branch -r

	# Checkout the remote branch 'feature-branch'
	git checkout -b feature-branch origin/feature-branch

	# Verify the branch
	git branch -vv
	```

	### Explanation

	- `git fetch`: Updates your local copy of the remote branches without changing your working directory.
	- `git branch -r`: Lists remote branches.
	- `git checkout -b <local-branch> <remote-branch>`: Creates a new local branch from the specified remote branch and checks it out.
	- `git branch -vv`: Shows the local branches and their upstream tracking branches.

	By following these steps, you can successfully checkout a remote branch and start working on it locally.
----------------------------------------------------------------------------------------
git reset #unstage all files
----------------------------------------------------------------------------------------
If you created any project before creating or cloning any git repo. You can push it to existing git repo using below method.

…or create a new repository on the command line
echo "# SpringbootExceptionHandlerDemo" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main #Sets the default branch. For more info see seperate section based on this.
git remote add origin https://github.com/Vivid-Vortex/SpringbootExceptionHandlerDemo.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/Vivid-Vortex/SpringbootExceptionHandlerDemo.git
git branch -M main
git push -u origin main
----------------------------------------------------------------------------------------
git branch -M branch_name
#Sets the default branch. This branch will always be pushed in case of git push, since it's a default branch.
#Another way of pushing your prefered branch without setting any default branch (which is main/master in most cases), is to just switch to that branch and then
#go to git desktop and then click on the git push icon, which would be visisble after all the changes commited.
----------------------------------------------------------------------------------------
#Github merge options explained

When merging branches in GitHub, you have three primary options: "Create a merge commit," "Squash and merge," and "Rebase and merge." Each option handles the commit history differently and can be chosen based on your project's workflow and preferences.

### 1. Create a Merge Commit

**What it does:**
- Combines the feature branch into the target branch by creating a new "merge commit."
- This merge commit preserves the complete history of both branches.

**Advantages:**
- Retains the full commit history, showing all individual commits and the context in which they were created.
- Helps to visualize the history of how changes were integrated and who contributed them.
- Useful for projects where maintaining a detailed history is important for tracking changes and debugging.

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

**What it does:**
- Combines all commits from the feature branch into a single commit before merging into the target branch.
- The resulting commit on the target branch contains the changes of all the squashed commits with a new commit message.

**Advantages:**
- Simplifies the commit history by reducing multiple commits into one, making the history easier to read.
- Useful for keeping the main branch history clean and concise, especially when feature branches contain many small or intermediate commits.

**Example:**
```
* Single squashed commit (main)
* Previous commit (main)
```
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

**What it does:**
- Re-applies the commits from the feature branch onto the tip of the target branch.
- No merge commit is created; the history is rewritten to make it appear as if the commits were created directly on top of the target branch.

**Advantages:**
- Maintains a linear project history, which can be easier to understand and follow.
- Keeps the commit history clean without merge commits, useful for projects that prefer a straight-line history.

**Example:**
```
* Commit message 3 (main)
* Commit message 2 (main)
* Commit message 1 (main)
* Previous commit (main)
```
**Before:**
```
* Commit message 3 (feature-branch)
* Commit message 2 (feature-branch)
* Commit message 1 (feature-branch)
* Previous commit (main)
```
**After:**
```
* Commit message 3 (main)
* Commit message 2 (main)
* Commit message 1 (main)
* Previous commit (main)
```

### Choosing the Right Option

- **Create a Merge Commit:** Choose this if you want to preserve the full history of commits, showing how branches have diverged and merged. This is often the default choice for many projects.
- **Squash and Merge:** Use this when you want to combine multiple commits from a feature branch into a single commit. It’s ideal for maintaining a clean and concise history.
- **Rebase and Merge:** Opt for this if you prefer a linear history without merge commits. This can make the project history easier to navigate and understand.

Each option has its own use cases and benefits, so the choice depends on your project’s workflow, team preferences, and the importance of the commit history structure.
----------------------------------------------------------------------------------------
# Don't use git add .
it is adivasble not to use git add . directly to stage the modified or untracked files as it will
stage even the files place in .gitignore. If you are using git version 2.0 or later, then use
git add -u to stage only modified and deleted files and
use git commit -a to commit only modified and deleted files.

git add -u . #in place of git add .
git commit -a -m "" #in place of git commit -m ""
----------------------------------------------------------------------------------------

git rebase -i HEAD~4

git rebase -i --root

vim:
%s/pick/s/g

git push origin branch_name --force #no need to give branch_name if you're on same branch on which you want to push. Better check the current branch by using git branch.
----------------------------------------------------------------------------------------
CLEANING - Untracked Files:
If you want to clean up your working directory by removing all files not currently staged or committed, as they're already pushed to GitHub. Here’s a straightforward approach:
List the files to be cleaned:

git clean -n
Remove the untracked files:

git clean -f
Remove untracked directories (if any):

git clean -fd
This will get rid of all the untracked files and directories, leaving your working directory clean and in sync with what's already on GitHub.
----------------------------------------------------------------------------------------
CLEANING - Tracked Files:
usual command for hard reset: git reset --hard <commit-hash>
 - <commit-hash>: The target commit hash you want to reset to (can also use HEAD~n or a branch name).
 - Omitting <commit-hash> defaults to HEAD, discarding all uncommitted changes.

# Equivalent to Github desktop select all -> right-click -> discard (one/all) file(s).
git reset --hard

This command will:

Discard all changes in tracked files.

Reset the index to match the last commit.

Set the working directory to match the index.
----------------------------------------------------------------------------------------
git clean -fd vs git reset --hard

Here’s the difference between `git reset --hard` and `git clean`:

In Short use the combination of these two to discard both tracked as well as untracked files:
git reset --hard && git clean -fd

---

### **1. `git reset --hard`**
- **What it does**: 
   - Resets the current branch to a specific commit (or `HEAD` by default).
   - Updates the **working directory**, **staging area**, and **HEAD** to match the target commit.
   - Removes **tracked changes** (changes to files already being tracked by Git).

- **Scope**: Affects only **tracked files** and changes related to commits.

#### **Use Case**:
- You want to undo changes to **tracked files** and revert to a specific commit.

#### **Example**:
```bash
git reset --hard HEAD~1
```
- Moves the branch back by one commit and restores files to that state, discarding changes in tracked files.

---

### **2. `git clean`**
- **What it does**: 
   - Deletes **untracked files and directories** (files not added to Git).
   - Does not affect tracked files or commit history.

- **Scope**: Only affects **untracked files** and **untracked directories**.

#### **Use Case**:
- You want to remove files or directories that are not tracked by Git (e.g., build artifacts, temporary files).

#### **Example**:
```bash
git clean -f -d
```
- Deletes all untracked files (`-f`) and untracked directories (`-d`).

---

### **Key Differences**
| **Aspect**             | **`git reset --hard`**         | **`git clean`**               |
|-------------------------|--------------------------------|--------------------------------|
| **Scope**              | Tracked files only            | Untracked files/directories   |
| **Affects Commit History** | Yes (resets to a specific commit) | No                            |
| **Deletes Files?**      | No, only restores tracked files to a commit | Yes, removes untracked files |
| **Command Context**     | Used to revert commits or reset working directory | Used to clean up untracked files |

---

### **Combined Usage**
To completely reset a repository to a clean state:
```bash
git reset --hard
git clean -f -d
```
This discards all tracked changes and deletes all untracked files and directories.
----------------------------------------------------------------------------------------
CHANGES TO BE COMMITTED VS CHANGES NOT STAGED FOR COMMIT VS UNTRACKED FILES:

	Changes to be committed: These are changes you've staged using git add. These will be included in your next commit. Think of it as a "ready to go" status.

	Changes not staged for commit: These are modifications to tracked files that you've made in your working directory but haven't yet staged for commit. Basically, these changes are known to Git but not yet marked for inclusion in the next commit.

	Untracked files: These are files in your working directory that Git isn't tracking at all. They've never been staged or committed, so Git is unaware of their history or changes.

	In a nutshell:

	To be committed = staged changes.

	Not staged for commit = tracked but unstaged changes. Means any RUD (minus C from CRUD) operation in existing tracked files. Also renaming files, directories etc. Bascially any sort of change.

	Untracked files = new files not yet tracked by Git.
----------------------------------------------------------------------------------------
When I am doing git status from wsl terminal then I am seeing a file as untracked whereas If I check through windows command prompt then no file are showing:

I see some ^M added to one of the file

+Most common error while you create any file in windows and try to run it in wsl:^M

	The `^M` character you’re seeing in one of your files indicates that the file has Windows-style line endings (CRLF) instead of Unix-style line endings (LF). The `^M` character is a visual representation of the carriage return character (`\r`), which is used in Windows to indicate the end of a line. In contrast, Unix and Linux systems (including WSL) use only the line feed character (`\n`) to indicate the end of a line.

	### Common Causes of `^M` Characters

	1. **Creating Files in Windows**: If you create or edit files in Windows applications (like Notepad or some IDEs), they typically use CRLF line endings. When these files are viewed in WSL or a Unix-like environment, the `^M` character appears.

	2. **Version Control Systems**: If you’re using Git, files with CRLF endings might be checked in, leading to issues when the same files are checked out in a Unix environment.

	### Solutions to Remove `^M` Characters

	1. **Using `dos2unix`**:
		 - The easiest way to convert files with Windows-style line endings to Unix-style line endings in WSL is to use the `dos2unix` command. First, install `dos2unix` if it's not already available:
			 ```bash
			 sudo apt install dos2unix
			 ```
		 - Then, convert the file:
			 ```bash
			 dos2unix yourfile.txt
			 ```

	2. **Using `sed`**:
		 - If you don't have `dos2unix`, you can also use `sed` to remove the `^M` characters:
			 ```bash
			 sed -i 's/\r$//' yourfile.txt
			 ```

	3. **Using Text Editors**:
		 - Open the file in a text editor that supports changing line endings, such as Visual Studio Code, Sublime Text, or Notepad++. In these editors, you can often choose to save the file with Unix line endings (LF).

	4. **Configure Git to Handle Line Endings**:
		 - To prevent this issue from happening in the future, you can configure Git to handle line endings correctly. Run the following command in your repository:
			 ```bash
			 git config --global core.autocrlf input
			 ```
		 - This setting will convert CRLF to LF on commit but will leave LF as LF on checkout, preventing the `^M` characters from appearing in the first place.

	### Conclusion

	The `^M` character in your files is an indication of Windows-style line endings. By converting your files to Unix-style line endings using one of the methods mentioned above, you can resolve the issue and ensure compatibility in your WSL environment. If you have further questions or need more assistance, feel free to ask!

----------------------------------------------------------------------------------------
Create a snapshot of current branch: - you can use this to safely backup your changes quickly.

You can use command substitution in your shell to dynamically get the current branch name when creating a new branch. Here's how:

```
git branch snapshot-1-$(git rev-parse --abbrev-ref HEAD)
```

### Explanation:
1. **`$(...)`**: Substitutes the output of the command (`git rev-parse --abbrev-ref HEAD`) into the `git checkout -b` command.
2. **`new-branch-`**: Prefix for your new branch.
3. **`git rev-parse --abbrev-ref HEAD`**: Gets the current branch name dynamically.

### Example Output:
If you're on a branch `feature-branch`, the new branch will be named:
```
new-branch-feature-branch
```
----------------------------------------------------------------------------------------
To change the commit order using vim and reabase.

Use case - you have commit1, commit2, commit3. You want to sqash commit1 and commit3 without affecting commit2.
Solution - 1. First you need to reorder commits as commit1, commit3, commit2. And then squash commit 3, which will be sqashed with next commit in line which is commit1.

Reordering the commits in vim rebase:-
Reorder the Commits:

Use the arrow keys to navigate to the line you want to move (e.g., pick <hash3>).
Cut the line using dd (this deletes the line but keeps it in memory).
Navigate to the desired position and paste the line using p.

----------------------------------------------------------------------------------------
To show the log of the current branch: git log
This command will display the commit history for the current branch you are on. If you want to see a more concise log, you can use: git git log --oneline
to show graph git log --graph --oneline
If you need to filter the log further, you can use additional options. For example, to see the log of the current branch with a specific author: git log --author="Author Name"
Or to see the log with a specific date range: git log --since="2023-01-01" --until="2023-12-31"
----------------------------------------------------------------------------------------
Create a new branch in githb and link it to local git directory:

Go to GitHub and create a new repository. Do not initialize it with a README, .gitignore, or license.
Copy the URL of your new GitHub repository. It will look something like https://github.com/your-username/your-repo.git.
git remote add origin https://github.com/your-username/your-repo.git for example, git remote add origin https://github.com/Code-Deepak-Code/Cpp-Dll-Build.git
git push -u origin master
----------------------------------------------------------------------------------------
Set upstream branch.

Context on what is upstream branch: --set-upstream or -u: This option sets the upstream branch for the given local branch. It configures the local branch to track the remote branch. This means that future git push or git pull commands will know which remote branch to interact with by default.
origin: This is the name of the remote repository. By default, when you clone a repository, it is named origin.
master: This is the name of the branch you are pushing. In this context, it refers to the main branch of your repository.

full command:
git push --set-upstream origin master
----------------------------------------------------------------------------------------
gh repo create test-repo-from-local --public
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------











