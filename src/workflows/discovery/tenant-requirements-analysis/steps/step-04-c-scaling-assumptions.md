# Step 4: Scaling Assumptions

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Document scaling assumptions that will inform architecture decisions.

## Prerequisites

- Steps 1-3 complete
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: cost-tracking
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Tenant Growth Projections

| Timeline | Total Tenants | Enterprise | Pro | Free |
|----------|--------------|------------|-----|------|
| Launch | 10 | 2 | 5 | 3 |
| Year 1 | 100 | 10 | 50 | 40 |
| Year 3 | 1000 | 50 | 300 | 650 |

### 2. Estimate Resource Requirements

Per-tenant resource assumptions:
- Average users per tenant
- Average API calls per day
- Storage requirements
- AI/ML inference requests

### 3. Define Noisy Neighbor Thresholds

| Resource | Soft Limit | Hard Limit | Action |
|----------|-----------|------------|--------|
| API Rate | 1000/min | 5000/min | Throttle |
| Storage | 10GB | 50GB | Notify |
| Compute | 2 vCPU | 8 vCPU | Queue |

### 4. Cost Model Assumptions

- Cost per tenant at each tier
- Break-even tenant count
- Margin targets

**Verify current best practices with web search:**
Search the web: "scaling assumptions best practices {date}"
Search the web: "scaling assumptions enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the scaling assumptions above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into growth projections and resource requirements
- **P (Party Mode)**: Bring architect and PM perspectives for scaling review
- **C (Continue)**: Accept scaling assumptions and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass scaling context: growth projections, resource estimates, cost model
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into scaling assumptions
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review scaling assumptions for tenant analysis: {summary of projections and thresholds}"
- Process collaborative analysis from architect and PM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save scaling assumptions to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Create mode complete

---

## Verification

- [ ] Growth projections documented
- [ ] Resource assumptions defined
- [ ] Noisy neighbor thresholds set
- [ ] Cost model outlined
- [ ] Patterns align with pattern registry

## Outputs

- Tenant requirements analysis document (complete)
- **Load template:** `{project-root}/_bmad/bam/data/templates/capacity-planning-template.md`
- **Output to:** `{output_folder}/planning-artifacts/tenant-requirements-analysis.md`

## Next Step

This completes the Create mode. Run `step-20-v-load-artifact.md` to enter Validate mode and verify the tenant requirements analysis, or proceed directly to downstream workflows.

## Workflow Complete

The tenant requirements analysis is ready for use in:
- `create-master-architecture` (foundation design)
- `bmad-bam-tenant-model-isolation` (isolation strategy)
