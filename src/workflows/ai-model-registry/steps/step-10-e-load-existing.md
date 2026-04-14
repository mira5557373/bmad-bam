# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ⏸️ ALWAYS pause after presenting findings and await user direction

---

## Purpose

Load and review existing AI model registry architecture documents.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-model-registry
---

## Actions

### 1. Load Existing Documents

Load: `{output_folder}/planning-artifacts/architecture/ai-model-registry-design.md`

### 2. Parse Document Structure

| Component | Status | Key Configuration |
|-----------|--------|-------------------|
| Registry Schema | Yes/No | {metadata, versioning} |
| Access Control | Yes/No | {permissions, sharing} |
| Deployment Integration | Yes/No | {pipeline, rollback} |

### 3. Identify Modification Targets

---

## Outputs

- Loaded AI model registry documents
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
- **C (Continue)**: Proceed to apply modifications
```

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
