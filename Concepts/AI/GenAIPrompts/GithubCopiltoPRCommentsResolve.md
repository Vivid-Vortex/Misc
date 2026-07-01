# Pull Request Review Instructions (Strictly review the PR as per this prompt only)

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
* Never Commit or Push without explicit approval in typing from me.

## Notes

* Prefer batch commits. 1 batch per purpose say check, copilot review,human review etc. 
* Don't take human reviewers name in the commit or comment.
* If the scope mentioned in pr title or description drifs after any round pr review, then do the corrections in pr title and description.
* Ensure all CI checks  pass before considering the task complete.
* Do not resolve a Copilot comment without first providing a response.
* Do not resolve reviewer comments unless explicitly instructed.
* Use separate commits whenever changes are logically independent.
* **Do not commit or push** without my consent, as I may ask you to change something again.
* > **Very Important:** ALWAYS PREFER WHAT REVIEWER IS ASKING "IF THAT SOUNDS GOOD" AND DON'T TRY TO FORMULATE A BETTER SOLUTION OR SOMETHING FROM YOURSELF. IF THE SOLUTION OR ASK FROM REVIEWER IS NOT LEGIT, GIVE ME THE REASON WHY IT'S NOT TRUE OR LEGIT AND LET ME THINK ON IT.

## Workflow

### Phase 1: Plan

1. First, generate a plan describing how you will organize the review comments.
2. In your plan, mention that each review comment will be assigned a unique identifier (e.g., `C1`, `C2`, `C3`, ...) so I can refer to it in subsequent prompts.
3. The plan should show the structure that will be used for every review comment (use a list, **not** a table).

For example:

### C1
- **GitHub Link:** Direct GitHub review comment link (find using `gh` if necessary).
- **File Reference:** Direct clickable file reference, if possible.
- **Line:** Line number of the review comment.
- **Reviewer Comment:** The exact reviewer comment or proposed change.
- **Simple Explanation:** Explain the review comment in simple, easy-to-understand terms.
- **Assessment:** Your assessment of the comment (e.g., Agree/Disagree/Partially Agree) along with your reasoning.

---

### C2
- **GitHub Link:** Direct GitHub review comment link (find using `gh` if necessary).
- **File Reference:** Direct clickable file reference, if possible.
- **Line:** Line number of the review comment.
- **Reviewer Comment:** The exact reviewer comment or proposed change.
- **Simple Explanation:** Explain the review comment in simple, easy-to-understand terms.
- **Assessment:** Your assessment of the comment (e.g., Agree/Disagree/Partially Agree) along with your reasoning.

---

Continue this structure for all review comments (`C3`, `C4`, ...).

2. ### Phase 2: Execution
   
Once I say **"Proceed"**, copy and paste that plan along with my comments. After I say **"Proceed"** again, please **strictly follow that plan**.

3.### Phase 3: Result

Then, show me what you did in below **tabular form** as step 1 in addition you can have one more column as "My Comments" and leave **one column empty** for me to paste my comments.

| Original From Step 1 as list form                    | Suggested Column Name                   |
| ---------------------------------------------------- | --------------------------------------- |
| **tags**                                             | tag
| **direct Github comment link (find from gh)**        | **GitHub Link**                         |
| **File with direct clickable reference if possible** | **File Reference** (or **File Link**)   |
| **Line**                                             | **Line**                                |
| **Proposed or comments from the reviewer**           | **Reviewer Comment**                    |
| **In Simple Terms what it means**                    | **Simple Explanation** (or **Meaning**) |
| **Your Assessment or thoughts**                      | **Assessment** (or **My Assessment**)   |

4. ### Phase 4: Looping
   
We many have some iterations.

5. ### Phase 5: Wrap Up
   
Then finally I will say commit then commit and when I say push you must push.

