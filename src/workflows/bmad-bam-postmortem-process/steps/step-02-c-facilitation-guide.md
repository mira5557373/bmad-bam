# Step 2: Facilitation Guide

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices

---

## Purpose

Define the facilitation process for conducting effective and blameless post-mortem meetings.

---

## Prerequisites

- Step 1: Template Design completed

---

## Actions

### 1. Scheduling Guidelines

Define timing requirements:

| Severity | Schedule Within | Duration | Participants |
|----------|-----------------|----------|--------------|
| SEV-1 | 24-48 hours | 90 min | All responders + leadership |
| SEV-2 | 48-72 hours | 60 min | Primary responders + leads |
| SEV-3 | 72 hours - 1 week | 45 min | Primary responders |
| SEV-4 | 1-2 weeks | 30 min | Team members |

### 2. Blameless Culture Principles

Document key principles:

- Focus on systems and processes, not individuals
- "How did the system allow this to happen?"
- Assume good intentions from all parties
- Celebrate near-misses as learning opportunities
- Psychological safety for honest discussion
- No retribution for incident involvement

### 3. Facilitation Techniques

Define meeting structure:

| Phase | Duration | Activities |
|-------|----------|------------|
| Timeline Review | 15 min | Walk through events chronologically |
| Root Cause | 20 min | 5 Whys, Fishbone diagram |
| Impact Discussion | 10 min | Quantify customer/business impact |
| Improvements | 15 min | Brainstorm action items |
| Action Assignment | 10 min | Assign owners, set deadlines |

### 4. Documentation Responsibilities

Assign roles:

| Role | Responsibility |
|------|----------------|
| Facilitator | Guide discussion, ensure blamelessness |
| Scribe | Document discussion in real-time |
| Incident Owner | Present timeline, provide context |
| Tech Lead | Validate technical root cause |

**Verify current best practices with web search:**
Search the web: "blameless postmortem facilitation techniques {date}"
Search the web: "incident retrospective meeting best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into facilitation techniques
- **P (Party Mode)**: Bring HR and engineering perspectives
- **C (Continue)**: Accept facilitation guide and proceed to action tracking
```

#### If 'C' (Continue):
- Save facilitation guide to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-action-tracking.md`

---

## Verification

- [ ] Scheduling guidelines defined
- [ ] Blameless principles documented
- [ ] Facilitation techniques specified
- [ ] Roles and responsibilities assigned
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-03-c-action-tracking.md` to configure action item management.
