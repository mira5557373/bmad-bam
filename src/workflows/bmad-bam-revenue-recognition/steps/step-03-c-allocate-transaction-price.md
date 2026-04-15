# Step 3: Allocate Transaction Price

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

Configure transaction price determination and allocation per ASC 606 Steps 3 and 4.

---

## Prerequisites

- Performance obligations mapped (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Standalone Selling Price (SSP) Determination

| Method | Use Case | Implementation |
|--------|----------|----------------|
| Observable price | Sold separately | Use list price |
| Adjusted market | Competitor pricing | Market-based adjustment |
| Expected cost plus margin | No observable | Cost + standard margin |
| Residual approach | Highly variable | Allocate remainder |

### 2. Discount Allocation

| Scenario | Allocation Method |
|----------|-------------------|
| Bundle discount | Proportional to SSP |
| Specific item discount | Apply to specific obligation |
| Variable discount | Constrain and allocate |

### 3. Variable Consideration

| Type | Treatment | Constraint |
|------|-----------|------------|
| Usage overages | Estimate expected | Include if probable |
| Tiered pricing | Estimate tier | Conservative estimate |
| Performance bonuses | Include if probable | Apply constraint |
| Early termination | Exclude from TCV | Recognize if triggered |

### 4. Contract Asset/Liability Tracking

| Scenario | Treatment | Journal Entry |
|----------|-----------|---------------|
| Billed > Recognized | Deferred revenue (liability) | Cr Deferred Revenue |
| Recognized > Billed | Contract asset | Dr Contract Asset |
| Prepayment | Deferred revenue | Cr Deferred Revenue |

**Verify current best practices with web search:**
Search the web: "ASC 606 transaction price allocation {date}"
Search the web: "standalone selling price determination SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the transaction price allocation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into price allocation using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for allocation analysis
- **C (Continue)**: Accept allocation rules and proceed to revenue scheduling
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass allocation context: SSP methods, discount rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into allocation summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review transaction price allocation for revenue recognition: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save allocation rules to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-revenue-scheduling.md`

---

## Soft Gate Checkpoint

**Steps 1-3 complete the ASC 606 framework foundation.**

Present summary of:
- Contract identification rules
- Performance obligation mapping
- Transaction price allocation methodology

Ask for confirmation before proceeding to revenue scheduling and journal entries.

---

## Verification

- [ ] SSP determination methods documented
- [ ] Discount allocation rules defined
- [ ] Variable consideration handling specified
- [ ] Contract asset/liability tracking configured
- [ ] Patterns align with pattern registry

---

## Outputs

- SSP determination methodology
- Allocation rules documentation
- Variable consideration policy

---

## Next Step

Proceed to `step-04-c-design-revenue-scheduling.md` to configure revenue recognition scheduling.
