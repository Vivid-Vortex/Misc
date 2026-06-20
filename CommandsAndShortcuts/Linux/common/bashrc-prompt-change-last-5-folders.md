# Bash Prompt - Strip Home Prefix and Keep Last 5 Folders

## What was changed

The `PS1` in `~/.bashrc` was updated to:

1. Strip the `/home/deepakkumar2` prefix from paths inside the home directory.
2. Display only the last **5 path segments** to keep the prompt compact and readable.
3. Show `~` when the current directory is the home directory.
4. Preserve the path context by showing only the last 5 segments.

## How to reload after editing `.bashrc`

```bash
source ~/.bashrc && echo "PWD: $PWD" && bash -c 'source ~/.bashrc; __ps1_path'
```

## Behavior summary

| Situation | Raw path | Prompt shows |
|------------|----------|--------------|
| Inside home | `/home/deepakkumar2/code/project` | `code/project` |
| Deep inside home | `/home/deepakkumar2/a/b/c/d/e/f/g` | `c/d/e/f/g` |
| At home root | `/home/deepakkumar2` | `~` |
| Outside home | `/tmp/a/b/c/d/e/f/g` | `c/d/e/f/g` |

- **Inside home** — `/home/deepakkumar2/` prefix is stripped first, then only the last 5 folders are shown.
- **At home root** — displays `~`.
- **Outside home** — only the last 5 path segments are shown.
- **Short paths** — displayed as-is if fewer than 5 segments exist.

## Where the change lives

File: `~/.bashrc` (last few lines)

```bash
__ps1_path() {
    local path

    if [[ "$PWD" == "$HOME" ]]; then
        echo "~"
        return
    fi

    if [[ "$PWD" == "$HOME/"* ]]; then
        path="${PWD#$HOME/}"
    else
        path="${PWD#/}"
    fi

    echo "$path" | awk -F/ '{
        n=NF
        start=(n>5)?n-4:1
        for(i=start;i<=n;i++) {
            printf "%s%s", $i, (i<n?"/":"")
        }
        print ""
    }'
}

export PS1='> $(__ps1_path)\$ '
```

## Example outputs

```text
PWD=/home/deepakkumar2/projects/java/spring/microservices/order-service
Prompt:
projects/java/spring/microservices/order-service

PWD=/home/deepakkumar2/a/b/c/d/e/f/g
Prompt:
c/d/e/f/g

PWD=/tmp/very/long/path/for/testing/example/demo
Prompt:
path/for/testing/example/demo
```
