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
