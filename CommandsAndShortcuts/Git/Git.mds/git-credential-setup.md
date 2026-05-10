# Git Credential Management — Windows Setup

## Problem
When you have multiple GitHub accounts (e.g. `dkwork2727` and `Vivid-Vortex`),
Windows Git Credential Manager (GCM) shows an account picker on every push.

---

## Fix 1 — Set default account globally (recommended)

Tells GCM which account to use for all `github.com` repos without prompting.

```bash
git config --global credential.https://github.com.username Vivid-Vortex
```

One-time setup. Works for every repo automatically after this.

---

## Fix 2 — Embed PAT in a specific repo's remote URL

Use this when you want one particular repo to always use a specific token,
regardless of global settings.

```bash
git remote set-url origin https://Vivid-Vortex:<YOUR_PAT>@github.com/org/repo.git
```

> Keep the PAT out of any committed files — only in the remote URL locally.

---

## Fix 3 — Store PAT in Windows Credential Manager manually

If GCM doesn't have a stored token for your account, feed it directly:

```bash
git credential approve <<EOF
protocol=https
host=github.com
username=Vivid-Vortex
password=<YOUR_PAT>
EOF
```

GCM stores this in Windows Credential Manager (Control Panel → Credential Manager
→ Windows Credentials) under `git:https://github.com`.

---

## Verify your global git config

```bash
git config --global --list | grep github
# Expected: credential.https://github.com.username=Vivid-Vortex

git config --global user.name
git config --global user.email
```

---

## Generate a Personal Access Token (PAT)

GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens

Minimum scopes needed for push: **Contents** (read & write), **Metadata** (read).

---

## SSH alternative (no tokens needed)

```bash
# Generate key
ssh-keygen -t ed25519 -C "your@email.com"

# Add public key to GitHub → Settings → SSH and GPG keys

# Switch repo to SSH
git remote set-url origin git@github.com:org/repo.git
```

SSH keys don't expire and never prompt for account selection.
