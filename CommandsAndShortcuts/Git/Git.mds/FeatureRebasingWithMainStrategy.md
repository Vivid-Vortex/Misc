# Rebase Strategy: `main` vs Feature Branch (PR #42)

## Scenario

Assume we have:

- `main` branch
- **PR #4** (small bug fix)
- **PR #42** (feature branch with multiple commits)

Initially the history looks like this:

```text
main:
        A --- B
              \
PR #4:         C   (fixes manual-deploy.yml + upper bug + README)
               \
PR #42:         X --- Y --- Z   (full environment setup)
```

---

# Step 1 - Merge PR #4 into `main`

PR #4 gets reviewed and merged first.

```text
main:
        A --- B --- C
              \
PR #42:         X --- Y --- Z
```

Now PR #42 is **behind `main`** because commit **C** exists only on `main`.

---

# Option 1 (Recommended): Rebase the Feature Branch onto `main`

Checkout the feature branch (PR #42):

```bash
git checkout feature/pr-42
git fetch origin
git rebase origin/main
```

History becomes:

```text
main:
        A --- B --- C
                    \
PR #42:              X' --- Y' --- Z'
```

Notice:

- X, Y, Z are replayed on top of C.
- Git creates new commits (`X'`, `Y'`, `Z'`).
- The feature branch now contains all latest changes from `main`.

### If a conflict occurs

Suppose both commit **C** and commit **X** modified `manual-deploy.yml`.

During rebase Git pauses.

Resolve the conflict:

```bash
git add .
git rebase --continue
```

After rebase:

```text
main:
        A --- B --- C
                    \
PR #42:              X' --- Y' --- Z'
```

Since commit history changed, push using:

```bash
git push --force-with-lease
```

Finally merge PR #42.

Result:

```text
main:
        A --- B --- C --- X' --- Y' --- Z'
```

### Advantages

- Clean linear history
- Easier to read Git log
- No unnecessary merge commits
- Preferred for keeping feature branches up to date

---

# Option 2 (Not Recommended): Rebase `main` onto the Feature Branch

Some people mistakenly think they should update `main` instead.

Conceptually it would look like:

```text
Before

main:
        A --- B --- C
              \
feature:
               X --- Y --- Z
```

Trying to move `main` onto the feature branch would make `main` depend on work that is **not yet approved**.

This rewrites the history of `main`, which is usually a protected shared branch.

This should **never be done**.

### Why?

- Rewrites shared branch history
- Can break everyone else's branches
- Forces everyone to synchronize history again
- Most Git servers protect `main` from rebasing or force pushes

---

# Summary

| Operation | Recommended? | Reason |
|-----------|--------------|--------|
| Rebase **feature** onto **main** | ✅ Yes | Updates your feature branch with the latest `main` changes while keeping history clean. |
| Rebase **main** onto **feature** | ❌ No | Rewrites shared history and can disrupt other developers. |
| Merge `main` into feature | ✅ Acceptable | Doesn't rewrite history but creates an extra merge commit. |
| Merge feature into `main` after successful rebase | ✅ Yes | Produces a clean linear history. |

---

# Rule of Thumb

Whenever `main` advances while your PR is still open:

```text
git fetch origin
git checkout feature-branch
git rebase origin/main
git push --force-with-lease
```

**Think of it as:**

> **Bring your feature branch up to the latest `main`.**
>
> **Never bring `main` onto your unfinished feature branch.**
