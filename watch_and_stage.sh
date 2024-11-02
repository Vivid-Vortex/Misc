#!/bin/bash

# Directory to watch
WATCH_DIR="."  # Adjust this to the specific directory if necessary

# Function to stage changes
stage_changes() {
    # Stage all untracked files
    git add --all
    
    # Check for changes not staged for commit
    git diff --name-only --cached | while read -r file; do
        if git diff --quiet -- "$file"; then
            echo "$file is untracked, staging it."
            git add "$file"
        fi
    done
    
    echo "Changes staged."
}

# Watch for changes in the specified directory and its subdirectories
while inotifywait -r -e modify,create,delete "$WATCH_DIR"; do
    stage_changes
done
