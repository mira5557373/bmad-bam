# Step 20: Load Artifact

## Purpose

Load change management process for validation.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all actions in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each action produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Change management process artifact exists
- Validate mode selected for verification workflow
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: operations

---

## Actions

| Action | Path |
|--------|------|
| Load | `{output_folder}/planning-artifacts/operations/change-management-process.md` |

---

## Expected Structure

- Change Classification
- Tenant Impact Assessment
- Approval Workflows
- Emergency Procedures
- Metrics

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Expected structure sections present
- [ ] Content ready for validation checks

---

## Outputs

- Loaded change management process content
- Structure analysis for validation

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to validation
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [20]`
- Proceed to: `step-21-v-validate.md`

---

## Next Step

Proceed to `step-21-v-validate.md`.
