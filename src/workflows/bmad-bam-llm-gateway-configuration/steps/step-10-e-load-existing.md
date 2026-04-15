# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Load and review existing LLM gateway configuration documents to identify sections requiring modification.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: llm-gateway-configuration
---

## Actions

### 1. Load Existing Documents

Load the existing LLM gateway configuration documents:
- `{output_folder}/planning-artifacts/ai-runtime/llm-gateway-design.md`
- `{output_folder}/planning-artifacts/ai-runtime/routing-rules.md`
- `{output_folder}/planning-artifacts/ai-runtime/fallback-configuration.md`

If files do not exist, suggest Create mode.

### 2. Identify Modification Targets

Confirm sections needing modification:
- Update provider inventory
- Modify routing rules
- Update fallback chains
- Revise cost optimization

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded document content
- Parsed document structure
- Modification/validation targets identified

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
