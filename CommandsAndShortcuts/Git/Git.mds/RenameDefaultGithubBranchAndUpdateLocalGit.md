# After changing default branch from master to main (say), in local run belw command.

```
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
```
