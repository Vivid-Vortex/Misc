# Claude Monthly Check-In Prompt

Paste this into a Claude conversation. Answer with voice (Wispr Flow or
Claude's built-in voice input) and just ramble through everything you
can, in any order, and let Claude sort it out.

This is a **recurring exercise**, run roughly every month to keep
Claude's working context on you current.

Paste the exact same prompt each time; it's built to detect on its own
whether this specific interview has been run before.

------------------------------------------------------------------------

## Ground Rules (Claude reads this before doing anything else)

1.  **Determine the mode first, before saying anything else.** The
    question is not "do I know anything about this person," it's "has
    this specific interview been run before." Claude may already have
    plenty of unrelated context on me (work chats, project files,
    memory) without this interview ever having been done. Check memory
    and past conversations specifically for a prior run of this
    interview (a completed three-section summary, or answers to these
    numbered questions). Found one: Mode B. Never found one: Mode A. If
    it's genuinely unclear either way, just ask me directly which one
    this is before proceeding.
2.  **One section at a time. No exceptions.** Never put more than one
    section's questions in a single message. Never preview or list a
    later section before the current one is fully wrapped up.
3.  **Always open a section with a count line** (how many questions or
    prompts are coming), then list everything for that section in one
    message.
4.  **Always state, every section, every time, even if it was said last
    month:** I don't need to answer one by one or in order, free-form or
    voice-dictated answers are fine, and anything extra that doesn't map
    to a specific question is welcome too.
5.  **Always wait for my reply before evaluating it.** Never assume or
    invent an answer on my behalf.
6.  **Always run a gap-check before advancing.** Compare my reply
    against that section's questions. If something's missing, thin, or
    ambiguous, ask one short, targeted follow-up round covering only the
    gaps; never repeat the full question list.
7.  **Never summarize until all three sections are fully done.** The
    summary is the last step, not a running recap.
8.  **In Mode B, never ask a question cold if the answer is already
    known.** Reference what's already on file and ask only about what's
    likely changed, what's new, or what was never answered. Only fall
    back to the original full question if there's genuinely no prior
    signal on it.
9.  **Treat everything learned as durable context**, carried forward to
    next month's run; this is cumulative, not a fresh slate each time.

------------------------------------------------------------------------

## Mode A: this interview has never been run before

Run the full interview, section by section, exactly as listed below.

## Mode B: this interview has been run at least once before

Don't re-ask everything from scratch. For each section, check what's
already known (memory, past conversations) and ask only about what's
likely changed, what's new, or what was thin or missing last time. Frame
it as an update, not a fresh interview: for example, "Last time I had
you at consulting.com working under Kyle and Victor, with the wedding
planned for April 2027; what's changed on the personal side since then?"
rather than the full original list cold. Still go section by section,
following the same ground rules above.

------------------------------------------------------------------------

## Section Pattern (applies to every section, either mode)

1.  Open with the count line. Mode A example: "Below you'll find 10
    questions about your personal life." Mode B example: "Here's what I
    want to check on for your personal life this month."
2.  List everything for that section at once.
3.  Remind me: answer free-form or by voice, any order, extras welcome.
4.  Wait for my reply.
5.  Gap-check; ask a short follow-up round only if needed.
6.  Once the section is genuinely covered, move to the next one.

For this specific run: only start Section 1 (Personal Life) for now.
Don't move to Section 2 until Section 1 is fully wrapped up.

Once all three sections are done, summarize everything back to me in
plain language, organized under the three headings, so I can correct
anything you got wrong. Don't editorialize or add unsolicited advice
during the process; just collect, clarify, and reflect back.

------------------------------------------------------------------------

## The Questions

Each Section 1 and 2 question has a short *why* note. That's for
Claude's interpretation, not something to read aloud when asking.

### Section 1: Personal Life

1.  Where do you live (city/area, and type of home: house, apartment,
    estate), and who do you live with? *Why: location-specific and
    household-specific answers (local weather, local rules, distances,
    "who's picking up milk") need the real setting, not a generic one.*
2.  What do you drive: make, model, year, and trim or engine variant if
    you know it? Any other major household vehicles or equipment worth
    noting? *Why: so spec-dependent questions ("what tire pressure",
    "what oil", "what's the towing capacity") get an exact answer for
    your actual vehicle instead of a generic range.*
3.  What's your relationship or family status, and are there any major
    shared milestones or dates already on the calendar (wedding,
    anniversary, move, due date)? *Why: so future references to "the
    wedding" or "the anniversary" don't need re-explaining, and dates
    can be used for planning without me guessing.*
4.  Any health conditions, medications, allergies, or dietary
    restrictions that should quietly shape suggestions (food, travel,
    exercise, medication interactions)? *Why: recipe, fitness, and
    travel advice can be actively wrong or unsafe if it ignores a real
    constraint.*
5.  What's your financial posture right now: actively saving for
    something specific, generally budget-conscious, or not a constraint?
    *Why: determines whether I default to cost-conscious options or skip
    the price caveats entirely.*
6.  What are your recurring hobbies or interests, and roughly what level
    are you at (casual dabbler vs. genuinely serious or competitive)?
    *Why: determines whether I explain basics or talk to you like a
    peer, e.g. gear recommendations, build advice, strategy depth.*
7.  What does a normal week look like time-wise: work hours, commute,
    when you're actually free? *Why: so time-sensitive suggestions ("do
    this in the evening", "you'll have an hour before X") fit your real
    schedule.*
8.  What tech or software do you actually use day to day outside of work
    (phone OS, smart home gear, apps you rely on)? *Why: troubleshooting
    and recommendations land better when they match your real stack
    instead of assuming a default setup.*
9.  Are there other decisions or life events currently in motion I
    should know the shape of, even roughly (a move, a purchase, a big
    decision you're weighing)? *Why: lets me pick up a thread later
    without you re-briefing me from zero.*
10. Is there anything personal you'd want me to stay strictly factual
    and neutral on, or conversely, be unusually direct about? *Why: sets
    the boundary up front so I don't misjudge tone on something
    sensitive.*

### Section 2: Work and Career

1.  What's your job title, company, and industry, and roughly how long
    have you been in this role? *Why: baseline for calibrating how much
    industry jargon or context I can assume.*
2.  Walk me through what your role actually involves day to day: the
    tasks that eat most of your time. *Why: so I can correctly guess
    what "the deck" or "the script" means when you reference ongoing
    work without re-explaining it.*
3.  What's the org structure around you: who you report to, who reports
    to you, and who you actually work with directly day to day? *Why: so
    I get names, roles, and reporting lines right automatically instead
    of you spelling it out each time.*
4.  What tools or platforms are core to how you work (docs, project
    management, comms)? *Why: so drafts, formats, and instructions match
    what you'll actually paste them into.*
5.  What are your current live projects, and what state is each one in?
    *Why: lets me pick up "how's X going" or give a status-aware answer
    without a recap.*
6.  Are there hard rules for your work output: banned words, tone
    requirements, formatting standards, brand voice, compliance
    constraints? *Why: these can be enforced automatically on everything
    I draft, instead of you catching violations after the fact.*
7.  What are your career goals over the next year, and over the next
    five? *Why: lets me frame advice toward where you're actually
    headed, not just the task in front of us.*
8.  What's a recurring bottleneck or frustration in your work right now?
    *Why: signals where I should proactively flag or push back, versus
    where I should just execute without commentary.*
9.  How is your performance or success actually measured, and by whom?
    *Why: helps me prioritize what "good" looks like in anything I help
    produce.*
10. Is there anything about your company or industry's unwritten rules,
    politics, or constraints that would help me interpret your requests
    correctly? *Why: avoids generic advice that technically works but
    ignores a real constraint you're operating under.*

### Section 3: How You Want to Work With Me

1.  When you ask me something, do you want short direct answers or
    fuller explanations by default?
2.  Do you want me to be critical and push back on your ideas, or mostly
    supportive and build on what you bring?
3.  Should I default to agreeing with your framing, or challenge it when
    I think you're wrong?
4.  Do you want me to show my reasoning step by step, or just give you
    the conclusion?
5.  When a request is ambiguous, should I make my best guess and run
    with it, or stop and ask first?
6.  What's your formatting preference: bullet points, prose, tables,
    headers?
7.  How much should I assume vs. explicitly confirm before doing larger
    pieces of work?
8.  Should I proactively flag things you didn't ask about if I think
    they're relevant, or stay in my lane?
9.  What's something an AI assistant has done in the past that really
    worked for you?
10. What's something that's actively annoyed you about working with AI
    tools before?
11. When you're wrong or I disagree with you, how do you want me to
    bring that up?
12. Is there a difference in how you want me to behave for work tasks
    vs. personal or creative tasks?

------------------------------------------------------------------------

```{=html}
<aside>
```
💡

*Tip: if you've got 10+ minutes, just talk through your whole life story
and business context in one go; tangents are fine. Claude will organize
it.*

```{=html}
</aside>
```
