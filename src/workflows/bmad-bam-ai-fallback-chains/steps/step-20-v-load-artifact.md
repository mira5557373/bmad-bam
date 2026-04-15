# Step 20: Load Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- ⏸️ ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action

---

## Purpose

Load the AI fallback chains architecture documents for validation against resilience criteria.

---

## Prerequisites

- AI fallback chains architecture artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Load Existing Documents

Load: `{output_folder}/planning-artifacts/architecture/ai-fallback-chains-design.md`

### 2. Pre-Validation Check

| Component | Present | Status |
|-----------|---------|--------|
| Provider Catalog | Yes/No | {ready/incomplete} |
| Quality Thresholds | Yes/No | {ready/incomplete} |
| Failover Logic | Yes/No | {ready/incomplete} |
| Tenant Configuration | Yes/No | {ready/incomplete} |

---

## Outputs

- Loaded AI fallback chains documents
- Pre-validation status report

---

## Verification

- [ ] Documents loaded for validation
- [ ] Pre-validation check completed
- [ ] Ready for validation step
- [ ] No errors or warnings

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure
- **P (Party Mode)**: Bring QA and SRE perspectives
- **C (Continue)**: Proceed to detailed validation
```

#### If 'C' (Continue):
- Proceed to next step: `step-21-v-validate.md`

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks.
