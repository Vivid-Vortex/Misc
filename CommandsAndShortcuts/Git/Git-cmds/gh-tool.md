I'll help you install GitHub CLI (gh) on WSL. Here's how to do it:

```bash
# First, download the GitHub CLI package signing key
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg

# Add the GitHub CLI repository to your sources
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null

# Update package list
sudo apt update

# Install gh
sudo apt install gh
```

After installation, authenticate with your GitHub account:

```bash
gh auth login
```

Follow the interactive prompts to:

1. Choose GitHub.com (not enterprise)
2. Select your preferred protocol (HTTPS or SSH)
3. Authenticate (via browser or token)

You can verify the installation with:

```bash
gh --version
```
