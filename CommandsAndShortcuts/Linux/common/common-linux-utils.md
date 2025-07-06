**text-based file browser**

`sudo apt install ranger`

**ripgrep**

`sudo apt install riggrep`

**fd**

`fd` — it’s a **blazing-fast, user-friendly alternative to `find`**, written in Rust, with a simpler syntax, better defaults, and colored output.

`fdfind --type d linux` --> includes only directories with this string

`fdfind linux` --> includes directores + files with this string

**If you want to include directories, files and inside content of the files, then use ripgrep**

## 🆚 `fd` / `fdfind` vs `rg`

| Tool            | Searches What     | Purpose                                |
| --------------- | ----------------- | -------------------------------------- |
| `fd` / `fdfind` | File/folder names | Fast path search                       |
| `rg` (ripgrep)  | File **content**  | Grep alternative, powerful text search |


