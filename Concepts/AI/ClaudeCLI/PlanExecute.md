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

Put this instruction in gloabl md file if not already present so that this command will be followed for all the chat session.
