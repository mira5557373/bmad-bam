# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- ⏸️ ALWAYS pause after presenting findings and await user direction

---

## Purpose

Generate a comprehensive validation report for the AI model registry architecture.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: ai-model-registry
---

## Actions

### 1. Compile Validation Results

| Category | Status | Notes |
|----------|--------|-------|
| Registry Schema | | Metadata, versioning, lineage |
| Access Control | | Permissions, sharing, audit |
| Deployment Integration | | Pipeline, rollback, A/B |

### 2. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All components defined |
| **CONDITIONAL** | Minor gaps |
| **NEEDS REVISION** | Missing critical components |

---

## Outputs

- **Output to:** `{output_folder}/planning-artifacts/ai-model-registry-validation-report.md`

---

## Verification

- [ ] Results compiled successfully
- [ ] Status determined correctly
- [ ] Report generated
- [ ] Output exported to correct location

---

## Next Step

Workflow complete. Present AI Model Registry Validation Report to user for review and approval.
