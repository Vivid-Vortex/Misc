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

1. First, please generate a plan in the following sections in list form not tabular:
   - Some tags which I can use to refer in the subsecutent line to address that to you.
   - **direct Github comment link (find from gh)** 
   - **File with dirct clickable reference if possible**
   - **Line**
   - **Proposed or comments from the reviewer**
   - **In Simple Terms what it means**
   - **Your Assessement or thoughts**

   Each review comment will be assigned a unique ID (e.g., C1, C2, C3...).
   
For example:-

### C1
- **GitHub Link:** https://github.com/org/repo/pull/123#discussion_r123456789
- **File Reference:** src/main/java/com/example/service/UserService.java
- **Line:** 42
- **Reviewer Comment:** Consider extracting this logic into a separate method.
- **Simple Explanation:** The reviewer thinks this method is doing too much and should be broken into smaller, reusable methods.
- **Assessment:** Agree. This will improve readability and make the code easier to test.

---

### C2
- **GitHub Link:** https://github.com/org/repo/pull/123#discussion_r987654321
- **File Reference:** src/main/java/com/example/controller/UserController.java
- **Line:** 88
- **Reviewer Comment:** Please handle the null case before accessing the object.
- **Simple Explanation:** The code may throw a NullPointerException if the object is null.
- **Assessment:** Agree. Add a null check or use Optional to make the code safer.

etc.

2. Once I say **"Proceed"**, copy and paste that plan along with my comments. After I say **"Proceed"** again, please **strictly follow that plan**.

3. Then, show me what you did in below **tabular form** as step 1 in addition you can have one more column as "My Comments" and leave **one column empty** for me to paste my comments.

| Original From Step 1 as list form                    | Suggested Column Name                   |
| ---------------------------------------------------- | --------------------------------------- |
| **tags**                                             | tag
| **direct Github comment link (find from gh)**        | **GitHub Link**                         |
| **File with direct clickable reference if possible** | **File Reference** (or **File Link**)   |
| **Line**                                             | **Line**                                |
| **Proposed or comments from the reviewer**           | **Reviewer Comment**                    |
| **In Simple Terms what it means**                    | **Simple Explanation** (or **Meaning**) |
| **Your Assessment or thoughts**                      | **Assessment** (or **My Assessment**)   |

5. We many have some iterations.
6. Then finally I will say commit then commit and when I say push you must push.

