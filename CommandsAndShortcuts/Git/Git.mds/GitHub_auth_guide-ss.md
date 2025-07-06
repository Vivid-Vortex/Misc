# GitHub SSH Key Authentication Guide

## Generate SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Simply replace your GitHub email in the above command and paste it in Ubuntu or Git Bash terminal and follow the prompt. Use some easy to remember passphrase. The rest is self-explanatory.

## Add SSH Key to GitHub

At the end, you will get two files with the same name. One among them will have an extension like `.pub`. Open it and copy the key, then paste it in the SSH key section in GitHub.

## Official GitHub Guides

- [Generate the key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Add it to GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)