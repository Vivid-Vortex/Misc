# File Path Concepts

When dealing with file paths, `../` represents moving up one directory level. This is used to navigate to parent directories relative to the current directory.

## Examples and Concepts

### 1. Current Directory (`./`)

Refers to the current working directory.

```markdown
./documents/report.md
```

This points to `documents/report.md` within the current directory.

### 2. Parent Directory (`../`)

Moves one level up in the directory structure.

```markdown
../images/pic.jpg
```

If you're in `project/docs/file.md`, this moves up to `project/` and then into `images/`.

### 3. Multiple Parent Directories

You can stack `../` to move up multiple levels.

```markdown
../../assets/image.png
```

If you're in `project/docs/subfolder/file.md`, this moves up to `project/` and then to `assets/`.

## Other Useful Concepts

### Absolute Paths

These are complete paths from the root directory.

```markdown
/home/user/project/docs/file.md
```

Absolute paths are fixed and do not change based on the current directory.

### Relative Paths

These paths are relative to the current directory.

```markdown
documents/report.md
```

Relative paths change depending on where you are in the directory structure.

## Example Directory Structure

```
project/
├── docs/
│   └── file.md
├── images/
│   └── pic.jpg
└── assets/
    └── image.png
```

### Accessing `pic.jpg` from `file.md`

```markdown
![Image](../images/pic.jpg)
```

### Accessing `image.png` from `file.md`

```markdown
![Image](../../assets/image.png)
```

By understanding and using these path notations, you can efficiently navigate and reference files in your project.

---

**Note**: Navigating directories using these path notations can greatly enhance your file management skills!
