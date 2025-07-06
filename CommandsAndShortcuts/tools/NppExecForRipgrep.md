# NppExec Configuration for Ripgrep Directory Search

You're looking to modify your NppExec command to search a *specific fixed directory* using `ripgrep`, rather than the current file's directory. Your initial command was correctly using `$(CURRENT_WORD)` for the search term, but `$(FULL_CURRENT_PATH)` points to the file currently open in Notepad++, not the `Misc` directory.

Here's how to set up NppExec to search the specified directory and display the results in the NppExec Console:

## 1. Ensure `ripgrep` is in your Windows PATH

For `cmd /c rg` to work, `ripgrep` must be installed on Windows and its executable (`rg.exe`) must be in your system's PATH environment variable. If you installed it via `scoop` or downloaded the binary and added it to PATH, you're good. If not, you'll need to use its full path (e.g., `C:\path\to\rg.exe`).

## 2. The NppExec Script

Go to **Plugins > NppExec > Execute...** (or press **F6**). Delete any existing commands and paste the following:

```nppexec
// Clear the console before each new search
cls

// Display a message indicating what's being searched
NPP_CONSOLE "Searching for '$(CURRENT_WORD)' in E:\Profsnl\Repositories\Repositories_m1_v1.0.0\GitHubRepos\GitHubRepos_m1_v1.0.0\GitHubDesktop\Misc..."

// Execute ripgrep
// -n: show line numbers
// -i: ignore case (optional, remove if you want case-sensitive)
// "$(CURRENT_WORD)": The word under your cursor, quoted to handle spaces
// "E:/Profsnl/Repositories/.../Misc": The target directory, quoted and using forward slashes for better compatibility.
npp_run "cmd /c rg -n -i "$(CURRENT_WORD)" \"E:/Profsnl/Repositories/Repositories_m1_v1.0.0/GitHubRepos/GitHubRepos_m1_v1.0.0/GitHubDesktop/Misc\""

// Optional: Add a separator for clarity
NPP_CONSOLE "--- Search Complete ---"
```

### Explanation of the `npp_run` command:

- **`cmd /c`**: This is crucial. It tells NppExec to run the command using the Windows command prompt, which correctly interprets the `ripgrep` command and path.
- **`rg -n -i "$(CURRENT_WORD)"`**: This is your `ripgrep` command:
  - `-n`: Displays line numbers for matches
  - `-i`: Performs a case-insensitive search (you can remove this if you want case-sensitive)
  - `"$(CURRENT_WORD)"`: This NppExec variable gets the text under your cursor. It's enclosed in double quotes within the `rg` command's string to handle search terms with spaces
- **`\"E:/Profsnl/Repositories/Repositories_m1_v1.0.0/GitHubRepos/GitHubRepos_m1_v1.0.0/GitHubDesktop/Misc\"`**: This is the target directory you want to search.
  - It's enclosed in `\"` (escaped double quotes) because the entire `cmd /c` argument is already within double quotes. This ensures `cmd.exe` sees the path as a single, quoted argument, correctly handling any spaces in the path
  - I've used **forward slashes (`/`)** for the path. `ripgrep` (and `cmd.exe` generally) handle forward slashes in paths on Windows perfectly fine, and it often avoids issues with backslash escaping within strings. If for some reason forward slashes don't work (highly unlikely for `rg`), you would need to use double backslashes for each literal backslash: `"E:\\Profsnl\\Repositories\\...\\Misc"`

## 3. Save and Assign a Shortcut (Optional but Recommended)

1. After pasting the script, click **"Save..."**
2. Give it a meaningful name, e.g., `Ripgrep Search Misc Dir`
3. Click **"OK"**
4. To assign a keyboard shortcut:
   - Go to **Plugins > NppExec > Advanced Options...**
   - On the left, select your saved script (`Ripgrep Search Misc Dir`)
   - Click `Add/Modify`
   - Close the `Advanced Options` window
   - Go to **Settings > Shortcut Mapper... > Plugin Commands** tab
   - Scroll down and find your `Ripgrep Search Misc Dir` command
   - Click on "Modify" and assign your desired shortcut (e.g., `Ctrl+Alt+R`)

Now, whenever you highlight a word or place your cursor on a word in Notepad++ and press your assigned shortcut, the NppExec Console will pop up and display the `ripgrep` search results from the specified directory.