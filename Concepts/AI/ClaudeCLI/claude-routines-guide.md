# Claude Code Routines — Complete Guide

## What is a Routine?

A Claude Code Routine is a **remote agent** that runs on Anthropic's cloud
infrastructure on a schedule or on demand. It is a fully isolated Claude session
with its own tools, repo access, and context — completely independent of your
local machine.

Think of it like a GitHub Action, but powered by Claude instead of shell scripts.

---

## When Should You Use a Routine?

| Use Case | Good Fit? |
|----------|-----------|
| Check CI status after every deploy | Yes |
| Auto-fix simple build errors | Yes |
| Send a daily summary of open PRs | Yes |
| Run tests and report failures | Yes |
| Monitor a URL and alert on downtime | Yes |
| Watch a file on your local machine | No — routines are remote |
| Access your local database | No — routines are remote |
| Things that need to happen while you're away | Yes |
| One-off tasks you'll run manually | Use Claude chat instead |

**Rule of thumb:** If you'd otherwise need to remember to check something
manually on a schedule, a routine can do it for you.

---

## How It Works

```
You define a prompt + schedule
        ↓
Claude.ai stores the routine
        ↓
At the scheduled time, Anthropic's cloud spins up a fresh Claude session
        ↓
Claude reads your repo, runs tools (Bash, Read, Write, Edit, Grep...)
        ↓
Result appears at claude.ai/code/routines
        ↓
(Optional) Push notification sent to your device
```

The agent has no memory of previous runs unless you explicitly write state
to a file in the repo or read from an external source.

---

## Two Types of Routines

### 1. Recurring (cron schedule)
Runs automatically on a repeating schedule.

```
"cron_expression": "0 9 * * 1-5"   ← every weekday at 9am UTC
```

Minimum interval: **1 hour**. Cron is always in UTC.

Common examples:
```
0 * * * *       every hour
0 */2 * * *     every 2 hours
0 9 * * *       daily at 9am UTC (2:30pm IST)
0 9 * * 1-5     weekdays at 9am UTC
0 0 * * 1       every Monday midnight UTC
```

### 2. One-time (run once at a specific time)
Fires once at a specific UTC timestamp, then auto-disables.

```
"run_once_at": "2026-05-15T09:00:00Z"
```

Use this for:
- Reminders ("check this PR tomorrow morning")
- Post-deploy checks ("verify staging in 10 minutes")
- One-off monitoring tasks

---

## How to Create a Routine

### Via Claude Code chat (easiest)

Just describe what you want:

> "Create a routine that checks CI status every 2 hours and alerts me if the
> Tauri build fails"

> "Schedule a one-time agent for tomorrow at 9am IST to review open PRs"

Claude will ask clarifying questions, show you the config, and create it.

### What Claude needs to know

1. **What should the agent do?** — be specific. The agent starts with zero
   context, so the prompt must be self-contained.
2. **Which repo?** — the agent can clone and work on any GitHub repo.
3. **When / how often?** — one-time or recurring. Give your local time and
   Claude converts to UTC.
4. **What tools does it need?** — Bash, Read, Write, Edit, Grep, Glob are
   standard. MCP connectors (Slack, Notion, etc.) can be added if connected
   at claude.ai/customize/connectors.

---

## Writing a Good Routine Prompt

The prompt is the most important part. The agent has **no prior context** — it
doesn't know your project, your conventions, or what happened last run.

### Bad prompt
```
Check if the build passed and fix it.
```

### Good prompt
```
You are a CI monitor for the zenith-focus project on GitHub
(repo: Andriod-Developmentt/zenith-focus).

1. Fetch the latest workflow runs:
   curl -s -H "Authorization: token <TOKEN>" \
     "https://api.github.com/repos/Andriod-Developmentt/zenith-focus/actions/runs?per_page=5"

2. Find the most recent "Build Tauri Desktop App" run.

3. If it PASSED — output "Build passed on <tag>." and stop.

4. If it FAILED:
   - Fetch the job logs to identify the error
   - If it's a TypeScript unused-variable error, fix the file, commit, and push
     a new patch tag (desktop-vX.Y.Z)
   - Otherwise summarize the error in plain English

Use the Bash tool for all curl commands.
```

**Good prompt checklist:**
- Includes repo name, branch, or tag
- Includes any tokens or credentials needed
- Specifies exactly what tools to use
- Defines what "done" looks like
- Covers both success and failure paths

---

## Managing Routines

### List all routines
In Claude chat: *"list my routines"*

### Run a routine immediately
In Claude chat: *"run the CI checker routine now"*

### Enable / disable
In Claude chat: *"disable the CI checker routine"*

### Update schedule or prompt
In Claude chat: *"change the CI checker to run every 4 hours instead of 2"*

### View results
All routine outputs are at: **https://claude.ai/code/routines**

### Delete a routine
Claude cannot delete routines via chat. Go to:
**https://claude.ai/code/routines** → select routine → delete.

---

## Limitations

| Limitation | Detail |
|-----------|--------|
| Minimum schedule | 1 hour — can't run more frequently than hourly |
| No local access | Can't read your local files, local DB, local env vars |
| No memory between runs | Each run is a fresh session (unless you write state to git or a file) |
| No MCP by default | Must connect services at claude.ai/customize/connectors first |
| Cron in UTC | Always convert your local time to UTC |
| Remote environment | Runs in Anthropic's cloud, not your machine |

---

## Push Notifications

To receive a notification on your device when a routine completes:

In `~/.claude/settings.json`:
```json
{
  "agentPushNotifEnabled": true
}
```

Without this, results only appear on the claude.ai/code/routines page.

---

## IST ↔ UTC Quick Reference

| IST | UTC |
|-----|-----|
| 6:00 AM | 12:30 AM (previous day) |
| 9:00 AM | 3:30 AM |
| 12:00 PM | 6:30 AM |
| 3:00 PM | 9:30 AM |
| 6:00 PM | 12:30 PM |
| 9:00 PM | 3:30 PM |
| 12:00 AM | 6:30 PM (previous day) |

IST = UTC + 5:30

---

## Example Routines

### Daily PR summary
```
Every morning at 9am IST (3:30am UTC):
Fetch all open PRs on repo X, summarize what each one does and how long
it's been open, and flag any that have been open more than 3 days.
```
Cron: `30 3 * * *`

### Post-deploy health check (one-time)
```
10 minutes after deploy: Hit https://myapp.com/health, check the response
is 200 and latency < 500ms. If not, open a GitHub issue titled
"Production health check failed after deploy vX.Y.Z".
```
Use `run_once_at` set to deploy time + 10 minutes.

### Auto-fix CI (on demand)
```
Check the latest CI run. If it failed on a compile error, fix it,
commit, push a new tag to re-trigger CI.
```
Keep this disabled, run manually after a failed push.

### Weekly dependency audit
```
Every Monday 9am: Run npm audit in react_desktop/, summarize any
high-severity vulnerabilities, and open a GitHub issue if found.
```
Cron: `30 3 * * 1`
