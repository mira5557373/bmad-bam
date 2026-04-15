# Step 4: Design Revenue Scheduling

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design revenue recognition scheduling per ASC 606 Step 5 requirements.

---

## Prerequisites

- Transaction price allocation configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Recognition Timing Rules

| Obligation Type | Timing | Calculation |
|-----------------|--------|-------------|
| Subscription | Daily | TCV / contract days * period days |
| Usage-based | Monthly | Actual usage * rate |
| Professional services | Milestone | % complete * allocated price |
| One-time | Point-in-time | Full amount at trigger |

### 2. Period-End Processing

| Process | Timing | Action |
|---------|--------|--------|
| Calculate recognized | Month-end | Sum daily recognition |
| Unbilled revenue | Month-end | Recognized - Billed |
| Deferred revenue | Month-end | Billed - Recognized |
| True-up | Month-end | Adjust estimates |

### 3. Catch-Up Calculations

| Scenario | Treatment |
|----------|-----------|
| Contract modification | Cumulative catch-up |
| Estimate change | Prospective adjustment |
| Error correction | Retrospective if material |

### 4. Adjustment Handling

| Adjustment Type | Treatment | Approval |
|-----------------|-----------|----------|
| Price change | Prospective | Finance |
| Obligation change | Evaluate materiality | Finance manager |
| Error correction | Per accounting policy | Controller |
| Audit adjustment | Restatement process | CFO |

### 5. Revenue Schedule Generation

| Component | Frequency | Output |
|-----------|-----------|--------|
| Daily recognition | Daily batch | Recognition events |
| Period summary | Monthly | GL journal entries |
| Waterfall report | Monthly | Revenue schedule |
| Variance report | Monthly | Actual vs forecast |

**Verify current best practices with web search:**
Search the web: "ASC 606 revenue recognition timing SaaS {date}"
Search the web: "subscription revenue recognition scheduling {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the revenue scheduling above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into scheduling using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for scheduling analysis
- **C (Continue)**: Accept scheduling design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass scheduling context: timing rules, period processing
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into scheduling summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review revenue scheduling for revenue recognition: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save scheduling design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Create mode complete

---

## Soft Gate Checkpoint

**Steps 1-4 complete the revenue recognition design.**

Present summary of:
- Contract identification and validation
- Performance obligation mapping
- Transaction price allocation
- Revenue scheduling

Ask for confirmation before proceeding to Edit or Validate modes.

---

## Verification

- [ ] Recognition timing rules defined for all obligation types
- [ ] Period-end processing documented
- [ ] Catch-up calculation rules specified
- [ ] Adjustment handling with approvals
- [ ] Revenue schedule generation configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Revenue scheduling specification
- Period-end procedures
- Adjustment handling policy
- **Load template:** `{project-root}/_bmad/bam/data/templates/revenue-recognition-template.md`

---

## Next Step

Create mode complete. Proceed to Edit mode (`step-10-e-load-existing.md`) for modifications or Validate mode (`step-20-v-load-artifact.md`) for quality checks.
