# Step 2: Design Deprecation Timeline

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Set sunset dates, define grace periods by tier, plan notification schedules, and create milestone checkpoints.

## Prerequisites

- Step 1 completed: Deprecation candidates identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: api-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-tiers

---

## Inputs

- Output from Step 1 (Deprecation candidates)
- Tenant tier configurations
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`

---

## Actions

**Verify current best practices with web search:**
Search the web: "API deprecation timeline standards {date}"
Search the web: "enterprise API sunset grace periods {date}"

_Source: [URL]_

### 1. Set Sunset Dates

| Endpoint | Deprecation Date | Warning Date | Sunset Date |
|----------|------------------|--------------|-------------|
| /api/v1/users | T+0 | T+30 days | T+90 days |
| /api/v1/legacy/* | T+0 | T+14 days | T+60 days |

### 2. Define Grace Periods by Tier

| Tier | Min Grace Period | Extended Support | Migration Help |
|------|------------------|------------------|----------------|
| Free | 30 days | No | Docs only |
| Pro | 60 days | +30 days | Email support |
| Enterprise | 90 days | +60 days | Dedicated CSM |

### 3. Plan Notification Schedule

| Timeline | Action | Channel |
|----------|--------|---------|
| T+0 | Deprecation announcement | Email, Dashboard, Blog |
| T+14 | First reminder | Email, API warnings |
| T+30 | Migration deadline warning | Email, Dashboard |
| T-7 | Final warning | Email, API errors |
| T+0 (Sunset) | Endpoint disabled | 410 Gone response |

### 4. Create Milestone Checkpoints

| Milestone | Date | Success Criteria |
|-----------|------|------------------|
| Deprecation announced | | All consumers notified |
| 50% migrated | | Half of traffic on new API |
| 90% migrated | | Most traffic migrated |
| Sunset ready | | <5% traffic remaining |
| Sunset complete | | Endpoint disabled |

---

## Soft Gate Checkpoint

**Steps 1-2 complete the analysis and planning phase.**

Present summary of:
- Deprecation candidates with sunset dates
- Grace periods by tier
- Notification schedule

Ask for confirmation before proceeding to deprecation signal configuration.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the timeline design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into timeline and tier-specific considerations
- **P (Party Mode)**: Bring PM and architect perspectives for timeline review
- **C (Continue)**: Accept timeline and proceed to deprecation signals
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass timeline context: dates, grace periods, milestones
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into timeline
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review deprecation timeline: {summary of dates and tiers}"
- Process collaborative analysis from PM and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save timeline to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-signals.md`

---

## Verification

- [ ] Sunset dates set for all candidates
- [ ] Grace periods defined by tier
- [ ] Notification schedule planned
- [ ] Milestones checkpoints created
- [ ] Patterns align with pattern registry

## Outputs

- Deprecation timeline document
- Tier-specific grace periods
- Notification schedule
- **Load template:** `{project-root}/_bmad/bam/data/templates/api-deprecation-template.md`

## Next Step

Proceed to `step-03-c-configure-signals.md` to configure deprecation signals.
