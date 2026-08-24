# UI Testing in Claude Code CLI via Puppeteer

A guide for verifying a web app's UI *interactively, in a real browser* — clicking
buttons, switching between states, reading rendered text, checking for JS errors,
and taking screenshots — using only **Claude Code CLI** and **Node.js/npm**. No
Chrome extension, no separate browser-automation service, no paid tooling.

This is the exact approach used to catch a real rendering bug (a stale-state
issue that only showed up after switching UI filters) that static checks alone
(`tsc`, `eslint`, unit tests) could never have found, because it only manifests
at runtime in an actual DOM.

---

## 1. How this actually works (plain explanation)

**Puppeteer** is a Node.js library, published by the Chrome team, that speaks the
same protocol Chrome DevTools uses internally (the **Chrome DevTools Protocol**,
CDP) to remote-control a real copy of Chromium. When you run `npm install
puppeteer`, two things happen:

1. The `puppeteer` npm package is installed (a JS API).
2. A **real Chromium browser binary** (~150–300 MB) is downloaded to a local
   cache folder — this isn't a headless emulator or a fake DOM, it's the actual
   rendering engine.

From a Node.js script you then write plain JavaScript like:

```js
const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.goto('http://localhost:5173')
await page.click('button')          // real click, real event dispatch
await page.screenshot({ path: 'out.png' })
```

Because it's a *real browser*, this catches things that pure static analysis
cannot:
- JavaScript exceptions that only throw when a specific button is clicked in a
  specific order (stale closures, race conditions, bad memoization).
- CSS/layout problems (things overlapping, elements not rendering, wrong
  sizing).
- Whether data displayed in one part of the page actually agrees with data
  displayed in another part after a real state change — you can literally read
  the rendered text and cross-check numbers.

Claude Code can write this script, run it with `node`, read the console output
and screenshots back, and iterate — the same loop a human tester would do, just
automated and fast.

**Important distinction:** this is *not* the "Claude in Chrome" browser
extension. That extension runs inside your actual Chrome browser and is a
separate product with no bridge into a Claude Code CLI terminal session.
Puppeteer is a plain library Claude Code drives via `node` — no extension,
no browser plugin, nothing installed in your everyday browser at all. It spins
up its own throwaway Chromium instance for the duration of the script.

---

## 2. Puppeteer vs. Playwright (both open source)

Both are free, open-source, Node.js browser-automation libraries from major
companies, and both work the same way described above (drive a real browser
via its DevTools-style protocol). For a one-off "click around and check for
errors" session like this guide covers, they're nearly interchangeable. The
differences matter more once you're building a maintained test *suite*:

| | **Puppeteer** | **Playwright** |
|---|---|---|
| Maintained by | Google (Chrome team) | Microsoft |
| Browsers | Chromium-first (Firefox support is newer/partial) | Chromium, Firefox, and WebKit (Safari engine) out of the box |
| First install size | Smaller — one browser | Larger — downloads 3 browser engines by default (can restrict to one) |
| API style | Lower-level, minimal | Higher-level, with built-in auto-waiting, retries, and a test runner (`@playwright/test`) |
| Best for | Quick ad hoc scripts, single-browser checks (what this guide does) | Cross-browser regression suites, CI pipelines, visual diffing, trace/video debugging |
| Learning curve | Slightly simpler for a one-off script | Slightly more to learn, pays off for ongoing suites |

**Rule of thumb:** if you just want Claude Code to click through your app once
and tell you if anything's broken (this guide), Puppeteer is the leaner
choice. If you want a permanent, repeatable, multi-browser test suite checked
into your repo, reach for Playwright's test runner instead. Everything in this
guide works essentially identically if you swap `puppeteer` for
`playwright` + `chromium` — the manual steps below note the equivalent
Playwright commands where they differ.

---

## 3. Prerequisites (all platforms)

- **Node.js ≥ 18** and **npm**. If Claude Code CLI is already running on your
  machine, you almost certainly have these (Claude Code itself is a Node-based
  CLI) — check with:
  ```bash
  node -v
  npm -v
  ```
  If either is missing, install Node.js from <https://nodejs.org> (LTS
  version) first — npm comes bundled with it.
- **~300 MB free disk space** for the downloaded Chromium binary (one-time,
  cached — later installs on the same machine reuse it).
- **Network access** the first time you install (to download the browser).
- **Your app running somewhere reachable**, e.g. `npm run dev` on
  `http://localhost:5173`, or a deployed staging URL.

---

## 4. Manual steps, per platform

The Node.js/JavaScript part is **identical on every OS** — only the install
gotchas differ. Do this from a terminal Claude Code can also run commands in
(so it can see the same output you do).

### 4.1 Windows

Works the same in PowerShell, Git Bash, or WSL.

```powershell
cd path\to\your\project
npm install --no-save puppeteer
```

- `--no-save` keeps it out of `package.json`/lockfile — treat it as a
  throwaway dev tool, not a project dependency (see §7 on cleanup).
- The Chromium binary lands under `%USERPROFILE%\.cache\puppeteer\...`.
- **Gotcha:** Windows Defender / your antivirus may scan the freshly
  downloaded `chrome.exe` the first time it launches, making the very first
  run noticeably slower. Subsequent runs are fast. This is normal, not a
  failure.
- If you're using WSL2 instead of native Windows, follow the **Linux**
  instructions below inside the WSL shell instead.

### 4.2 macOS

```bash
cd path/to/your/project
npm install --no-save puppeteer
```

- Chromium lands under `~/.cache/puppeteer/...`.
- **Gotcha (Gatekeeper):** macOS may refuse to run the downloaded binary the
  first time with *"cannot be opened because the developer cannot be
  verified."* Fix either by:
  - Running once from Finder with right-click → **Open**, and confirming, or
  - Clearing the quarantine flag from the terminal:
    ```bash
    node -e "puppeteer=require('puppeteer');puppeteer.executablePath().then(p=>console.log(p))"
    xattr -d com.apple.quarantine "<path printed above>"
    ```
- Apple Silicon (M1/M2/M3) Macs: recent Puppeteer versions ship an
  arm64-native Chromium automatically — no Rosetta needed.

### 4.3 Linux (native or WSL2)

```bash
cd path/to/your/project
npm install --no-save puppeteer
```

- Chromium lands under `~/.cache/puppeteer/...`.
- **Gotcha (missing shared libraries):** minimal distros (bare Debian/Ubuntu
  server images, most Docker base images, fresh WSL installs) are usually
  missing libraries Chromium needs, surfacing as
  `error while loading shared libraries: libnss3.so: cannot open shared
  object file`. Install the common dependency set on Debian/Ubuntu:
  ```bash
  sudo apt-get update && sudo apt-get install -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 \
    libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
    libxrandr2 libgbm1 libasound2
  ```
  (Fedora/Arch/etc. have equivalent packages under similar names.)
- **Gotcha (sandbox, containers/CI/root):** Chrome's sandbox needs kernel
  namespace permissions that root/containers often don't grant. If launch
  fails with a sandbox error, pass extra args when launching (see the script
  in §5 — add `args: ['--no-sandbox', '--disable-setuid-sandbox']` to the
  `puppeteer.launch()` call). Only do this in a disposable/CI environment, not
  as a default habit.

### 4.4 (Playwright equivalent, any OS)

If you'd rather use Playwright instead of Puppeteer, the install step is:
```bash
npm install --no-save playwright
npx playwright install chromium   # downloads just the Chromium engine
```
Everything below in §5 works the same way with `require('playwright')` instead
of `require('puppeteer')` and `puppeteer.launch(...)` → `chromium.launch(...)`.

---

## 5. The actual test script

Save this as `_ui_check.cjs` **inside your project directory** (the `.cjs`
extension matters if your `package.json` has `"type": "module"` — it forces
plain CommonJS so `require()` works regardless of the project's module type).

```js
// _ui_check.cjs — throwaway UI verification script. Delete after use.
const puppeteer = require('puppeteer')
const path = require('path')

const APP_URL   = 'http://localhost:5173'      // <-- change to your dev server
const OUT_DIR   = __dirname                     // where screenshots get saved

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)) }

// Helper: click a button/element by its exact visible text (Puppeteer has no
// built-in "click by text" selector, unlike Playwright's get_by_text()).
async function clickByText(page, selector, text) {
  const handles = await page.$$(selector)
  for (const h of handles) {
    const t = await page.evaluate((el) => el.textContent.trim(), h)
    if (t === text) { await h.click(); return true }
  }
  return false
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1400, height: 1000 },
    // args: ['--no-sandbox', '--disable-setuid-sandbox'], // uncomment in CI/containers/root
  })
  const page = await browser.newPage()

  // Capture real runtime errors — this is the whole point.
  const errors = []
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()) })
  page.on('pageerror', (err) => { errors.push('PAGEERROR: ' + err.message) })

  await page.goto(APP_URL, { waitUntil: 'networkidle0', timeout: 30000 })
  await sleep(1000)
  await page.screenshot({ path: path.join(OUT_DIR, '01_initial.png'), fullPage: true })

  // --- Example interaction: click a button, wait, screenshot again ---
  // await clickByText(page, 'button', 'Some Button Label')
  // await sleep(800)
  // await page.screenshot({ path: path.join(OUT_DIR, '02_after_click.png'), fullPage: true })

  // Read the rendered page as plain text — useful for cross-checking numbers
  // shown in different sections actually agree with each other.
  console.log(await page.evaluate(() => document.body.innerText))

  console.log('\n--- CONSOLE / PAGE ERRORS ---')
  console.log(JSON.stringify(errors, null, 2))

  await browser.close()
}

main().catch((e) => { console.error('FATAL:', e); process.exit(1) })
```

Run it:
```bash
node _ui_check.cjs
```

Read the printed page text and the error list, look at the screenshots. Add
more `clickByText(...)` / `page.select('select', 'value')` /
`page.type('input', 'text')` calls between screenshots to walk through
whatever flow you're verifying.

---

## 6. What to actually check

A short checklist worth running through for most UI changes:

- [ ] Page loads with **zero** console/page errors.
- [ ] Every interactive control you touched (buttons, dropdowns, tabs) does
      something visible and doesn't silently no-op.
- [ ] Numbers/text shown in different sections of the page that are supposed
      to represent the *same* underlying data actually match after each
      interaction (this catches stale-state bugs — a value that updates in
      one place but not another).
- [ ] Switching between states and switching *back* returns to the original
      values (catches caching/memoization bugs).
- [ ] Take a full-page screenshot at each meaningfully different state and
      eyeball it for layout breakage.

---

## 7. Cleanup — don't leave this lying around

This is a throwaway diagnostic tool, not part of your app:

```bash
rm _ui_check.cjs          # delete the script
git status --porcelain    # confirm package.json / lockfile weren't touched
                           # (they won't be, since --no-save was used)
```

The downloaded Chromium binary stays cached on your machine (`~/.cache/puppeteer`
or the Windows equivalent) — harmless to leave, and it means the *next* time
you (or Claude) need to do this, there's no re-download.

---

## 8. One-shot prompt for Claude Code

Paste this into Claude Code CLI, inside your project's directory, adjusting
the bracketed placeholders. Claude will handle installation, scripting,
running, reading results, and cleanup itself.

```
I want you to interactively UI-test this app in a real browser using
Puppeteer, driven entirely from this Claude Code session — not the Chrome
extension, not manual testing by me.

1. Confirm Node.js/npm are available, and figure out the right install
   command for this OS (Windows/macOS/Linux) if Puppeteer isn't already
   available, including any platform-specific setup (Gatekeeper on macOS,
   missing shared libraries on Linux, sandbox args if running as root/in a
   container).
2. Install Puppeteer as a throwaway dependency (npm install --no-save
   puppeteer) — do not add it to package.json/lockfile.
3. Make sure the app is running and reachable at [DEV SERVER URL, e.g.
   http://localhost:5173] — start it if it isn't already running.
4. Write a temporary Node script (a .cjs file, so it works regardless of this
   project's "type" setting in package.json) that:
   - Launches headless Chromium.
   - Captures all console errors and page errors.
   - Navigates to [THE PAGE/ROUTE YOU WANT TESTED].
   - [DESCRIBE THE SPECIFIC INTERACTIONS TO TEST — e.g. "clicks through each
     tab/filter option one by one, in every combination, and after each
     click reads the rendered page text so you can cross-check that numbers
     shown in different sections agree with each other"].
   - Takes a full-page screenshot after each meaningful state change.
5. Run the script, read the console output and screenshots yourself, and
   report back: any JS errors encountered, any numbers that don't
   cross-check consistently between sections, and anything that looks
   visually broken in the screenshots.
6. If you find a bug, fix the actual application code (not the test script),
   then re-run the same script to confirm the fix, and keep iterating until
   everything checks out clean.
7. When done, delete the temporary test script and confirm via git status
   that no unintended files (package.json, lockfile, etc.) were modified.

Do not ask me to test anything manually until you've exhausted what you can
verify yourself this way.
```

---

## 9. Shorter prompt — if Puppeteer is already installed

If you already did `npm install --no-save puppeteer` manually (§4) and just
want Claude to run the actual test, skip the install/setup instructions and
use this shorter prompt instead:

```
Puppeteer is already installed in this project (npm install --no-save
puppeteer was already run) — do not reinstall it, just verify it's there.

I want you to interactively UI-test this app in a real browser using that
Puppeteer install, driven entirely from this Claude Code session:

1. Make sure the app is running and reachable at [DEV SERVER URL, e.g.
   http://localhost:5173] — start it if it isn't already running.
2. Write a temporary Node script (a .cjs file, so it works regardless of this
   project's "type" setting in package.json) that:
   - Launches headless Chromium via the installed puppeteer package.
   - Captures all console errors and page errors.
   - Navigates to [THE PAGE/ROUTE YOU WANT TESTED].
   - [DESCRIBE THE SPECIFIC INTERACTIONS TO TEST — e.g. "clicks through each
     tab/filter option one by one, in every combination, and after each
     click reads the rendered page text so you can cross-check that numbers
     shown in different sections agree with each other"].
   - Takes a full-page screenshot after each meaningful state change.
3. Run the script, read the console output and screenshots yourself, and
   report back: any JS errors encountered, any numbers that don't
   cross-check consistently between sections, and anything that looks
   visually broken in the screenshots.
4. If you find a bug, fix the actual application code (not the test script),
   then re-run the same script to confirm the fix, and keep iterating until
   everything checks out clean.
5. When done, delete the temporary test script and confirm via git status
   that no unintended files were modified.

Do not ask me to test anything manually until you've exhausted what you can
verify yourself this way.
```
