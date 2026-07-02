# Pull Request Review Instructions (Strictly review the PR as per this prompt only and please remember this in memory for this repo unless posted any updated version or new prompt for PR and always use this prompt to review the pr unless specified otherwise)

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

8. If there are reviewer comments, respond to all reviewer comments but always seek approval.

   * Add comments under my name.
   * Keep responses concise (one-line explanations are sufficient).
   * VERY IMPORTANT: COMMENT EXACTLY WHAT YOU DID EVEN IF IT TAKE TIME TO THINK FOR YOU.
   * Comment exactly what you did in case of code changes in minimum (with necessary technical points in simple way) words possible, if using using less words not possible to explain is not feasible or sufficient then you can use bit more but always prefer less words possible but convey full meaning in simple way.

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
- **Line:** Line number range of the review comment say 40 to 50.
- **Reviewer Comment:** The exact reviewer comment or proposed change.
- **Simple Explanation:** Explain the review comment in simple, easy-to-understand terms.
- **Assessment:** Your assessment of the comment (e.g., Agree/Disagree/Partially Agree) along with your reasoning. Mention clearly if **changes needed** or **just a response**.
- **comment** Leave blank for me to comment. When I say YA LGTM mean Your Assessment Looks Good To Me. If I say something else then follow that.

---

### C2
- **GitHub Link:** Direct GitHub review comment link (find using `gh` if necessary).
- **File Reference:** Direct clickable file reference, if possible.
- **Line:** Line number range of the review comment say 40 to 50.
- **Reviewer Comment:** The exact reviewer comment or proposed change.
- **Simple Explanation:** Explain the review comment in simple, easy-to-understand terms.
- **Assessment:** Your assessment of the comment (e.g., Agree/Disagree/Partially Agree) along with your reasoning.  Mention clearly if **changes needed** or **just a response**.
- **comment** Leave blank for me to comment. When I say YA LGTM mean Your Assessment Looks Good To Me. If I say something else then follow that.

---

Continue this structure for all review comments (`C3`, `C4`, ...).

### Phase 2: Execution

Some points to Note: a. When I say YA LGTM mean Your Asssessment Looks Good To Me.
b. Comment exactly what you did in case of code changes in minimum (with necessary technical points in simple way) words possible, if using using less words not possible to explain is not feasible or sufficient then you can use bit more but always prefer less words possible but convey full meaning in simple way.
c. If not usre Ask and don't assume.
d. > [!IMPORTANT]
>
> ## 🚨 Most Important
>
> For every modification, in this PR review changes, always track **what** changed, **why**, **where**, **when** (if relevant), and the associated **PR review comment** (if applicable). Maintain this history (in memory) throughout the task so changes can be easily reviewed, traced, reverted, or extended at any time.


Once I say **"Proceed"**, copy and paste that plan along with my comments. After I say **"Proceed"** again, please **strictly follow that plan**.

### Phase 3: Result

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
|**In case of any type of modification- What was before**| **Before (or N/A in case of not change)**|
|**In case of any type of modification- What is now**| **After (or N/A in case of not change)**|
| **Your Assessment or thoughts**                      | **Assessment** (or **My Assessment**)   |

### Phase 4: Looping
   
We many have some iterations.

### Phase 5: Wrap Up
   
Commit only when I explicitly say "commit". Before committing, perform a full build and run all applicable tests. If any build or test fails, fix the issues and re-run the build and tests until everything passes. Only then create the commit. Likewise, push only when I explicitly say "push", and do not push automatically.

> [!IMPORTANT]
>
> **For API-based PRs:** Before considering the task complete, test all affected APIs (both existing and newly added) locally using `curl` (or an equivalent HTTP client). Verify that each endpoint behaves as expected, including success paths, error cases, and any impacted existing functionality. Resolve any issues, re-test, and repeat until all API checks pass.

> [!IMPORTANT]
>
> **For frontend-based PRs:** Before considering the task complete, build and run the application locally, then perform end-to-end validation using an automated browser tool (e.g., Playwright). Verify all affected user flows, including existing and new functionality. Fix any issues, re-test, and repeat until everything passes. 

