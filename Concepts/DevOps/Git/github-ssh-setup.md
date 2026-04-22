# Setup SSH for GitHub

## Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- No need to enter or answer anything on the CLI.
- Just keep pressing **Enter**.

## Copy Public Key
```bash
cat ~/.ssh/id_ed25519.pub
```

## Add SSH Key to GitHub
- Go to **GitHub → Settings → SSH and GPG Keys**
- Click **New SSH Key**
- Paste the copied key

---

## Test Connection
```bash
ssh -T git@github.com
```

---

## Clone Using SSH
```bash
git clone git@github.com:org/repo_name.git
```

---

## First-Time Connection Warning

You may see:
```
The authenticity of host 'github.com (...)' can't be established.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

### What to Do
- Type: `yes`

### Reason
- This is normal for first-time connection via SSH.
- It’s a security confirmation, not an error.

### What Happens Next
- GitHub’s SSH fingerprint is saved in your system (`known_hosts`)
- You won’t be asked again for this server

---

## SSO Authorization Issue

You may see:
```
Your organization has SAML SSO enforced...
```

### Fix

1. Go to:
   https://github.com/settings/keys

2. Find your SSH key

3. Click dropdown → **Configure SSO**

4. Authorize the organization

5. Retry cloning

---

## Final Step
```bash
git clone git@github.com:org/repo_name.git
```
