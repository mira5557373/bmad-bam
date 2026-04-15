# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

---

## Purpose

Apply identified modifications to the capacity planning documents.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-capacity-planning
---

## Actions

### 1. Apply Changes

| Change Type | Action | Validation |
|-------------|--------|------------|
| Update projections | Revise growth models | Consistency check |
| Modify quotas | Update tier limits | Impact analysis |
| Update triggers | Revise scaling thresholds | Testing required |

### 2. Generate Change Summary

| Section | Change | Before | After | Impact |
|---------|--------|--------|-------|--------|
| {section} | {description} | {old} | {new} | {impact} |

---

## Verification

- [ ] All requested changes applied
- [ ] Change summary generated
- [ ] Capacity projections updated
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated design documents
- Change summary report

---

## Next Step

Edit workflow complete. Run Validate mode (`step-20-v-*`) to verify changes.

---

## Workflow Complete

Edit mode complete. Updated documents saved.
