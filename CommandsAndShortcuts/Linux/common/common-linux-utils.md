# **text-based file browser**

`sudo apt install ranger`

---

# **ripgrep**

`sudo apt install riggrep`

---

# **fd**

`fd` — it’s a **blazing-fast, user-friendly alternative to `find`**, written in Rust, with a simpler syntax, better defaults, and colored output.

`fdfind --type d linux` --> includes only directories with this string

`fdfind linux` --> includes directores + files with this string

`fdfind --type d linux | clip.exe`

**How it works:**

* `fdfind --type d linux`: This runs your command, which outputs a list of directory paths.
* `|` (Pipe): This takes the entire output of the `fdfind` command and sends it as input to the next command.
* `clip.exe`: This is the Windows command-line program that reads whatever is piped to it and places it directly into the Windows clipboard.

**If you want to include directories, files and inside content of the files, then use ripgrep**

## 🆚 `fd` / `fdfind` vs `rg`

| Tool            | Searches What     | Purpose                                |
| --------------- | ----------------- | -------------------------------------- |
| `fd` / `fdfind` | File/folder names | Fast path search                       |
| `rg` (ripgrep)  | File **content**  | Grep alternative, powerful text search |

**wl copy**

`sudo apt install wl-clipboard`

---


