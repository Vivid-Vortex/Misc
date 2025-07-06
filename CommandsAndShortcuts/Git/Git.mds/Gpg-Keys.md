# Using GPG Keys for GitHub Authentication

Using GPG keys to authenticate and authorize GitHub to your Git Bash is a great way to secure your commits. Here's a step-by-step guide to help you set this up:

## Step 1: Generate a GPG Key

1. **Open Git Bash**: Launch Git Bash on your computer.
2. **Generate GPG Key**: Use the following command to generate a new GPG key:
   
   ```bash
   gpg --full-generate-key
   ```
3. **Select Key Type**: When prompted, choose the kind of key you want. The default RSA and RSA (default: RSA, 3072 bits) is a good choice.
4. **Set Expiry Date**: Decide on an expiration date for your key. Setting an expiration date is recommended.
5. **Provide User Information**: Enter your name, email address, and an optional comment when prompted.
6. **Create a Passphrase**: Choose a strong passphrase to secure your key.

## Step 2: Export Your GPG Key

1. **List GPG Keys**: Find your GPG key ID by listing your GPG keys with:
   
   ```bash
   gpg --list-secret-keys --keyid-format LONG
   ```
2. **Copy Key ID**: Look for the `sec` line and copy the long key ID (the part after `/`, e.g., `3AA5C34371567BD2`).
3. **Export Public Key**: Export your public key to add it to GitHub:
   
   ```bash
   gpg --armor --export <Your Key ID>
   ```
   
   Copy the entire output, including the `-----BEGIN PGP PUBLIC KEY BLOCK-----` and `-----END PGP PUBLIC KEY BLOCK-----` lines.

## Step 3: Add GPG Key to GitHub

1. **Sign in to GitHub**: Log in to your GitHub account.
2. **Go to Settings**: Navigate to your GitHub settings by clicking on your profile picture in the top right corner and selecting `Settings`.
3. **SSH and GPG Keys**: In the left sidebar, click `SSH and GPG keys`.
4. **Add GPG Key**: Click the `New GPG key` button, paste your GPG public key into the provided field, and click `Add GPG key`.

## Step 4: Configure Git to Use Your GPG Key

1. **Configure Git**: Set Git to use your GPG key for signing commits:
   
   ```bash
   git config --global user.signingkey <Your Key ID>
   ```
2. **Sign Commits**: To sign your commits by default, use:
   
   ```bash
   git config --global commit.gpgSign true
   ```

## Step 5: Sign Your Commits

1. **Make a Commit**: Create a new commit in your repository:
   
   ```bash
   git commit -m "Your commit message" -S
   ```
   
   The `-S` flag ensures the commit is signed.

## Step 6: Verify Your Setup

1. **Push to GitHub**: Push your signed commit to GitHub:
   
   ```bash
   git push origin <branch>
   ```
2. **Verify on GitHub**: Go to your repository on GitHub and check the commit. You should see a `Verified` badge next to your commit message.

## Summary

By following these steps, you can generate a GPG key, add it to GitHub, configure Git to use your GPG key, and sign your commits. This process enhances the security of your contributions by ensuring that your commits are verifiable and authenticated.