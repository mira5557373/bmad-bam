# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Load the performance review documents for validation against the QG-PR1 quality gate criteria.

---

## Prerequisites

- Performance review artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: performance

---

## Actions

### 1. Load Existing Documents

Load the existing performance review documents:
- `{output_folder}/operations/performance/performance-review-{date}.md`
- `{output_folder}/operations/performance/optimization-recommendations-{date}.md`

### 2. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Baseline comparison | Yes/No | {ready/incomplete} |
| Capacity assessment | Yes/No | {ready/incomplete} |
| SLA verification | Yes/No | {ready/incomplete} |
| Tenant analysis | Yes/No | {ready/incomplete} |
| Cost efficiency | Yes/No | {ready/incomplete} |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against QG-PR1 criteria
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

#### If 'C' (Continue):
- Confirm artifact loaded successfully
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined

---

## Outputs

- Validation context prepared
- Document structure parsed

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against quality criteria.
