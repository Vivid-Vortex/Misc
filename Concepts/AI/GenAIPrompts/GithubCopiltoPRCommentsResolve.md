8 # Pull Request Review Instructions

Use GitHub CLI for this task. If GitHub CLI is not installed, install it first. Let me know if authentication assistance is required. If you can complete the setup yourself, proceed independently.

## Tasks

1. Review the PR.

   * A Copilot review may already have been requested.
   * Review existing Copilot comments and CI status.
   * Some CI checks may be failing.

2. Investigate and fix all failing CI checks.

   * Create appropriate commits for the fixes.

3. Review all Copilot comments.

   * Address each comment.
   * Create separate commits for logically independent changes whenever possible.

4. Respond to Copilot comments.

   * Add comments under my name.
   * Keep responses concise (one-line explanations are sufficient).

5. Resolve the Copilot review comments after responding to them.

6. Request a second-round Copilot review **only if explicitly instructed to do so**.

   * Review any new comments generated.
   * Repeat Steps 3–5 for the new Copilot comments.

7. If there are reviewer comments, review all reviewer comments.

   * Address each comment.
   * Create separate commits for logically independent changes whenever possible.

8. If there are reviewer comments, respond to all reviewer comments.

   * Add comments under my name.
   * Keep responses concise (one-line explanations are sufficient).

9. Do not resolve reviewer comments.

   * Leave reviewer comments open after responding.
   * Only resolve Copilot comments unless explicitly instructed otherwise.

## Copilot Review Limits

* Do **not** request a Copilot review unless explicitly instructed.
* Run Copilot review a maximum of **two rounds**.
* After the second Copilot review round, stop requesting additional Copilot reviews unless explicitly instructed otherwise.
* Do not automatically trigger further Copilot review cycles.

## Notes

* Prefer batch commits. 1 batch per purpose say check, copilot review,human review etc. 
* Don't take human reviewers name in the commit or comment.
* Ensure all CI checks  pass before considering the task complete.
* Do not resolve a Copilot comment without first providing a response.
* Do not resolve reviewer comments unless explicitly instructed.
* Use separate commits whenever changes are logically independent.
