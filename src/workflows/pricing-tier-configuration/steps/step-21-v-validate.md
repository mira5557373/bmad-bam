# Step 21: Validate Pricing Tier Configuration

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the completeness and quality of the pricing tier configuration.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Verification

### Tier Structure
- [ ] Tier hierarchy defined with clear positioning
- [ ] Feature entitlements mapped to all tiers
- [ ] Usage limits specified per tier
- [ ] Pricing models selected with rationale
- [ ] Overage handling configured

### Feature Gating
- [ ] Entitlement check points defined
- [ ] Caching strategy configured
- [ ] Gate behaviors specified
- [ ] Upgrade prompts designed
- [ ] Graceful degradation documented

### Price Versioning
- [ ] Price version schema defined
- [ ] Grandfathering policies documented
- [ ] Migration automation designed
- [ ] Rollback procedures specified
- [ ] Version history retention configured

### Cross-Cutting
- [ ] Tenant isolation in tier management
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: All tier configurations complete and consistent
- **CONDITIONAL**: Minor gaps in versioning or migration
- **FAIL**: Missing tier structure or feature gating

---

## Actions

1. Load the relevant documents
2. Apply modifications as specified
3. Generate summary of changes

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept validation and proceed to report

Select an option:
```

---

## Outputs

- Validated pricing tier design
- Validation gate decision (PASS/CONDITIONAL/FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
