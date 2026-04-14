# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Apply the identified modifications to the SOC2 evidence collection design documents.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: soc2-evidence-collection
---

## Actions

### 1. Apply Changes

For each modification target, apply changes and validate:

| Change Type | Action | Validation |
|-------------|--------|------------|
| Add control | Map new control to evidence | Coverage check |
| Update source | Modify evidence source | Query validation |
| Add automation | Create new collection job | Pipeline check |
| Update report | Modify report template | Format validation |

### 2. Generate Change Summary

| Section | Change | Before | After | Impact |
|---------|--------|--------|-------|--------|
| {section} | {description} | {old} | {new} | {impact} |

---

## Outputs

- Updated SOC2 evidence collection documents
- Change summary log

---

## Verification

- [ ] All requested changes applied
- [ ] Change summary generated
- [ ] Control mappings validated
- [ ] Patterns align with pattern registry

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes.

---

## Workflow Complete

Edit mode complete. Updated documents saved.
