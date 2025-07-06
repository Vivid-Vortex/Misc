# GitHub CLI (gh) Installation Guide for WSL

I'll help you install GitHub CLI (gh) on WSL. Here's how to do it:

## Installation Steps

### 1. Download the GitHub CLI Package Signing Key

```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
```

### 2. Add the GitHub CLI Repository to Your Sources

```bash
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
```

### 3. Update Package List

```bash
sudo apt update
```

### 4. Install GitHub CLI

```bash
sudo apt install gh
```

## Authentication

After installation, authenticate with your GitHub account:

```bash
gh auth login
```

Follow the interactive prompts to:

1. Choose GitHub.com (not enterprise)
2. Select your preferred protocol (HTTPS or SSH)
3. Authenticate (via browser or token)

## Verification

You can verify the installation with:

```bash
gh --version
```
