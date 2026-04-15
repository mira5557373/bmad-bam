# Step 21: Validate Marketplace Design

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the marketplace design against quality criteria.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: marketplace
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

## Actions

Perform the following validation checks:

### Validation Checklist

### Architecture
- [ ] App categories defined
- [ ] Discovery experience designed
- [ ] Search and filtering planned
- [ ] Tenant visibility configured

### App Lifecycle
- [ ] Submission workflow designed
- [ ] Review process planned
- [ ] Installation flow configured
- [ ] Versioning strategy defined

### Billing Integration
- [ ] Pricing models designed
- [ ] Tenant billing planned
- [ ] Revenue sharing configured
- [ ] Usage tracking set up

## Gate Decision

- **PASS**: Complete design, billing ready, lifecycle defined
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing architecture, no lifecycle, or no billing

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component
- [ ] Patterns align with pattern registry

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
