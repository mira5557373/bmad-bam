# Step 11: Apply Targeted Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **Validate gate decision consistency** after applying changes

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications to convergence report
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Incremental updates preserving gate decision integrity
- 🚫 Do NOT: Regenerate entire report; apply targeted changes only

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## Purpose

Apply the identified changes to the existing convergence report. Changes are applied incrementally while preserving gate decision integrity, maintaining audit trail, and ensuring consistency across all verification sections.

---

## Prerequisites

- Step 10 (Load Existing Report) completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: convergence

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Apply requested changes to the convergence report while maintaining consistency.

---

## Apply Sequence

### Modification Process

Based on the user's requested changes:

#### Updating QG-I1 Findings

1. Load current QG-I1 section
2. Identify specific checks to update
3. Apply verification changes with evidence
4. Recalculate gate decision based on updated checks
5. Update executive summary if decision changed

| Check Updated | Previous | New | Evidence |
|---------------|----------|-----|----------|
| {{check}} | {{prev}} | {{new}} | {{evidence}} |

#### Updating QG-I2 Findings

1. Load current QG-I2 section
2. Identify tenant safety checks to update
3. Apply verification changes
4. Verify all CRITICAL checks still documented
5. Recalculate gate decision

| Check Updated | Previous | New | Evidence |
|---------------|----------|-----|----------|
| {{check}} | {{prev}} | {{new}} | {{evidence}} |

#### Updating QG-I3 Findings

1. Load current QG-I3 section
2. Identify agent safety checks to update
3. Apply verification changes
4. Verify all CRITICAL checks still documented
5. Recalculate gate decision

| Check Updated | Previous | New | Evidence |
|---------------|----------|-----|----------|
| {{check}} | {{prev}} | {{new}} | {{evidence}} |

#### Modifying Risk Assessment

1. Load current risk section
2. Add/remove/update risks
3. Recalculate risk matrix
4. Update mitigation plans

| Risk | Change Type | New State |
|------|-------------|-----------|
| {{risk_id}} | Added/Removed/Updated | {{state}} |

#### Updating Release Recommendation

1. Review all gate decisions
2. Recalculate overall status
3. Update decision and rationale
4. Update conditions if applicable

| Field | Previous | New |
|-------|----------|-----|
| Decision | {{prev}} | {{new}} |
| Rationale | {{prev}} | {{new}} |
| Conditions | {{prev}} | {{new}} |

### Validation After Changes

Before saving, verify:

- [ ] All gate decisions consistent with findings
- [ ] Executive summary matches gate decisions
- [ ] Risk assessment current
- [ ] Release recommendation justified by evidence
- [ ] Version number incremented
- [ ] Change log updated

### Change Summary

Present a diff summary of changes made:

| Section | Change Type | Details |
|---------|-------------|---------|
| QG-I1 | Modified | {{details}} |
| QG-I2 | No Change | - |
| QG-I3 | Modified | {{details}} |
| Risk Assessment | Added | {{details}} |
| Release Decision | Updated | {{details}} |

### Output

Write updated document to:
```
{output_folder}/planning-artifacts/architecture/convergence-report.md
```

Update document metadata:
- Version: Increment
- Last Modified: Current date
- Change Log: Add entry

---

## SUCCESS METRICS:

- [ ] All requested changes applied
- [ ] Gate decisions consistent
- [ ] Version incremented
- [ ] Change log updated
- [ ] Document saved successfully

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Gate decision conflict | Re-verify affected checks |
| Missing evidence for change | Require evidence before applying |
| Inconsistent executive summary | Regenerate summary from gate decisions |

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] All gates decisions valid
- [ ] Release recommendation justified
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated `convergence-report.md`
- Change summary

---

## NEXT STEP:

Edit mode complete. Options:
- Run validation mode to verify changes
- Return to workflow selection
- Proceed to production readiness if all gates PASS
