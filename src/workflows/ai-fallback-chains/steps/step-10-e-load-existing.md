# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- ⏸️ ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion

---

## Purpose

Load and review existing AI fallback chains architecture documents to identify sections requiring modification.

---

## Prerequisites

- Existing AI fallback chains architecture documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-operations

---

## Actions

### 1. Load Existing Documents

Load: `{output_folder}/planning-artifacts/architecture/ai-fallback-chains-design.md`

### 2. Parse Document Structure

| Component | Status | Key Configuration |
|-----------|--------|-------------------|
| Provider Catalog | Yes/No | {providers, SLAs} |
| Quality Thresholds | Yes/No | {metrics, triggers} |
| Failover Logic | Yes/No | {circuit breaker, retry} |
| Tenant Configuration | Yes/No | {preferences, constraints} |

### 3. Identify Modification Targets

Confirm with the user which sections need modification.

---

## Outputs

- Loaded AI fallback chains documents
- Parsed document structure
- Modification targets identified

---

## Verification

- [ ] Documents loaded successfully
- [ ] Structure parsed correctly
- [ ] Modification targets identified
- [ ] No errors or warnings

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific components
- **P (Party Mode)**: Bring architect perspectives
- **C (Continue)**: Proceed to apply modifications
```

#### If 'C' (Continue):
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
