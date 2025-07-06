# FD - Fast File/Folder Finder

## 🚀 What is `fd`?

| Feature | Description |
|---------|-------------|
| 🔍 Tool Type | File/folder searcher |
| ⚡ Speed | Much faster than `find` |
| 🖍️ Output | Colorized, cleaner |
| 📦 Syntax | Intuitive and minimal |
| 🧠 Smart Defaults | Ignores `.gitignore`, hidden/system files (unless told not to) |

### ✅ Example Usage

```bash
fd 'linux' --type d --ignore-case
```

This finds directories containing the string `"linux"` (case-insensitive), recursively.

---

## 🛠️ How to Install `fd` on WSL (Ubuntu)

### 🔹 Option 1: Install via APT

```bash
sudo apt update
sudo apt install fd-find
```

Then run:

```bash
fd
```

✅ Done!

---

### ⚠️ Note for Ubuntu

On Ubuntu, `fd` installs as:

```bash
fdfind
```

So either run:

```bash
fdfind linux
```

Or create an alias:

```bash
echo "alias fd='fdfind'" >> ~/.bashrc
source ~/.bashrc
```

Now you can use `fd` like normal:

```bash
fd --type d linux
```

---

## ✅ Summary

| Task | Command |
|------|---------|
| Install on Ubuntu | `sudo apt install fd-find` |
| Use without alias | `fdfind` |
| Recommended | Add `alias fd='fdfind'` to `~/.bashrc` |
| Search dirs case-insensitive | `fd --type d --ignore-case linux` |

---

## My Two Cents

If you want to find any directory named linux in any of the subdirectories, use:

```bash
fdfind --type d linux
```

**Output:**
```
CommandsAndShortcuts/Linux
```

If you want to search both files and directories, then don't use `--type d`.

**If you want to include directories, files and inside content of the files, then use ripgrep.**

## 🆚 `fd` / `fdfind` vs `rg`

| Tool | Searches What | Purpose |
|------|---------------|---------|
| `fd` / `fdfind` | File/folder names | Fast path search |
| `rg` (ripgrep) | File **content** | Grep alternative, powerful text search |
