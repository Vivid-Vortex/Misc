# Global AI Instructions

## Definition of Done

The task is NOT complete when code is written.

The task is complete only when:

* The implementation is finished.
* Appropriate automated tests exist and pass successfully.
* If automated tests do not exist, create them before declaring the task complete.
* Create and execute all relevant test types where applicable, including:

  * Unit Tests
  * Integration Tests
  * End-to-End (E2E) Tests
  * Regression Tests
  * Smoke Tests
  * Contract/API Tests
  * Performance Tests (when relevant)
* Build verification succeeds.
* Linting and static analysis checks pass.
* Security and dependency checks pass (when tools are available).
* Previously working functionality remains unaffected.
* Any discovered issues have been fixed and re-verified.
* Test results and verification evidence are documented.

You must operate in a continuous loop:

Implement → Test → Analyze Failures → Fix → Re-Test → Repeat

Continue this cycle until:

* All automated checks pass.
* No known defects remain.
* No failing tests remain.
* No high-confidence improvements remain within the scope of the task.

Do not stop after the first successful implementation.

Only then should you present the final result for my manual testing and approval.

Manual testing is the final validation step and should be performed by me only after all automated validation has been completed successfully.

## Planning and Execution Workflow

For every non-trivial task:

1. First analyze the requirement and create a plan.
2. Review the plan for completeness, correctness, risks, dependencies, and potential implementation issues.
3. If no user input is genuinely required, proceed automatically from planning to implementation.
4. Do not wait for confirmation merely because a plan has been created.
5. During implementation, continuously follow this loop:

   Implement → Test → Analyze Failures → Fix → Re-Test → Repeat

6. Continue until all automated checks pass and no actionable issues remain.
7. Ask the user for input only when there is a genuine ambiguity, missing requirement, or decision that cannot be reasonably inferred.

## "Test it in browser" (Puppeteer UI testing shortcut)

Whenever I say something like **"test it in browser"**, "browser test this", or
"verify this in browser" (short trigger phrases like these), do the following
in the current project — don't ask for confirmation to start, just proceed:

1. **Check if Puppeteer is available** in the current project (e.g. `node -e
   "require.resolve('puppeteer')"` succeeds, or it's present in
   `node_modules`/`package.json`).
2. **If it is not installed**, fetch this guide and follow its
   platform-appropriate (Windows/macOS/Linux) install steps and gotchas
   (Gatekeeper on macOS, missing shared libs / sandbox args on Linux, AV-scan
   delay on Windows) before doing anything else:
   `https://raw.githubusercontent.com/Vivid-Vortex/Misc/d5f31aa44e3d31eb7993e66862e9c5f962c8a1d8/Concepts/AI/ClaudeCLI/UI-Testing-with-Puppeteer-via-Claude-Code.md`
   Install it as a throwaway dependency (`npm install --no-save puppeteer`) —
   never add it to `package.json`/the lockfile.
3. **Figure out the dev server URL** for this project (check `package.json`
   scripts, README, or an already-running process) and start it if it isn't
   already running.
4. **Write a temporary `.cjs` script** (per the guide's pattern) that launches
   headless Chromium, captures console/page errors, navigates to the
   relevant page(s), exercises whatever UI/feature is under test (click
   through every relevant control/state combination), takes full-page
   screenshots at each meaningful state, and dumps the rendered page text so
   values shown in different sections can be cross-checked against each
   other for consistency.
5. **Run it yourself, read the output and screenshots**, and treat this as
   real verification evidence for the Definition of Done above — not
   something to hand off. If you find a bug, fix the actual application code
   (never the test script), re-run, and keep iterating until it's clean.
6. **Clean up when done**: delete the temporary script and confirm via `git
   status` that nothing else (package.json, lockfile, etc.) was modified.
7. Report back concisely: what was tested, what broke (if anything) and how
   it was fixed, and confirmation that a final clean run passed.

This is not the Claude Chrome extension (not reachable from this CLI) — it's
Puppeteer, a Node.js library that drives a real, throwaway headless Chromium
instance. See the guide above for the full explanation and a Playwright
comparison.