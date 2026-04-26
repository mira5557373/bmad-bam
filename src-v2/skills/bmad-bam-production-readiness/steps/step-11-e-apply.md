# Step 11: Apply Targeted Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **VALIDATE gate decision consistency** after applying changes

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications to production readiness report
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Incremental updates preserving gate decision integrity
- 🚫 Do NOT: Regenerate entire report; apply targeted changes only

---

## Purpose

Apply the identified changes to the existing production readiness report. Changes are applied incrementally while preserving gate decision integrity, maintaining audit trail, and ensuring consistency across all assessment sections.

---

## Prerequisites

- Step 10 (Load Existing Report) completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: production

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Apply requested changes to the production readiness report while maintaining consistency.

---

## Apply Sequence

Based on the user's requested changes, apply modifications:

### Updating Infrastructure Findings

1. Load current infrastructure section
2. Identify specific checks to update
3. Apply changes with evidence
4. Recalculate category status
5. Update executive summary if status changed

| Check Updated | Previous | New | Evidence |
|---------------|----------|-----|----------|
| {{check}} | {{prev}} | {{new}} | {{evidence}} |

### Updating Observability Findings

1. Load current observability section
2. Identify specific checks to update
3. Apply changes with evidence
4. Verify all CRITICAL checks still documented
5. Recalculate category status

| Check Updated | Previous | New | Evidence |
|---------------|----------|-----|----------|
| {{check}} | {{prev}} | {{new}} | {{evidence}} |

### Updating Security/Compliance Findings

1. Load current security section
2. Identify specific checks to update
3. Apply changes with evidence
4. **CRITICAL:** Verify all security CRITICAL checks pass
5. Recalculate category status

| Check Updated | Previous | New | Evidence |
|---------------|----------|-----|----------|
| {{check}} | {{prev}} | {{new}} | {{evidence}} |

### Adding/Modifying Risks

1. Load current risk matrix
2. Add new risks with proper scoring
3. Update existing risk mitigations
4. Recalculate risk summary

| Risk ID | Change Type | Previous | New |
|---------|-------------|----------|-----|
| {{id}} | Added/Updated/Removed | {{prev}} | {{new}} |

### Modifying GO/NO-GO Decision

**CRITICAL:** Decision changes require justification:

1. Verify all CRITICAL checks status
2. Calculate new gate decision based on findings
3. Document justification for change
4. Update conditions if changing to GO WITH CONDITIONS

| Field | Previous | New | Justification |
|-------|----------|-----|---------------|
| Decision | {{prev}} | {{new}} | {{justification}} |

**Decision Change Rules:**
- NO-GO → GO: All CRITICAL must pass, 80% standard
- GO → NO-GO: Document new blockers
- GO → GO WITH CONDITIONS: Add conditions
- GO WITH CONDITIONS → GO: Conditions resolved

### Updating Conditions/Deadlines

1. Load current conditions
2. Update status (Open → Resolved)
3. Modify deadlines with justification
4. Add new conditions if needed

| Condition | Previous Status | New Status | Notes |
|-----------|-----------------|------------|-------|
| {{condition}} | {{prev}} | {{new}} | {{notes}} |

### Refreshing Assessment Date

1. Update assessment date
2. Update assessor if changed
3. Increment version number
4. Add change log entry

| Field | Previous | New |
|-------|----------|-----|
| Assessment Date | {{prev}} | {{new}} |
| Assessor | {{prev}} | {{new}} |
| Version | {{prev}} | {{new}} |

### Updating Rollback Procedures

1. Load current rollback section
2. Update rollback steps
3. Update time estimates
4. Verify rollback tested

| Section | Change | Details |
|---------|--------|---------|
| Rollback steps | Modified | {{details}} |
| Time estimates | Updated | {{details}} |
| Test status | Updated | {{details}} |

### Validation After Changes

Before saving, verify consistency:

- [ ] All gate decisions consistent with findings
- [ ] Executive summary matches gate decisions
- [ ] Risk assessment current
- [ ] CRITICAL checks accurately reflected
- [ ] Version number incremented
- [ ] Change log updated

### Change Summary

Present a diff summary of changes made:

| Section | Change Type | Details |
|---------|-------------|---------|
| Infrastructure | {{type}} | {{details}} |
| Observability | {{type}} | {{details}} |
| Security | {{type}} | {{details}} |
| Risk Assessment | {{type}} | {{details}} |
| Gate Decision | {{type}} | {{details}} |
| Rollback | {{type}} | {{details}} |

### Output

Write updated document to:

```
{output_folder}/planning-artifacts/production-readiness-report.md
```

Update document metadata:
- Version: Increment (e.g., 1.0 → 1.1)
- Last Modified: Current date
- Change Log: Add entry describing changes

### Change Log Entry Format

```markdown
## Change Log

### v{{version}} - {{date}}
- **Modified by:** {{author}}
- **Changes:**
  - {{change_1}}
  - {{change_2}}
  - {{change_3}}
- **Gate Decision:** {{decision}} ({{unchanged/changed}})
```

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
| Inconsistent executive summary | Regenerate summary from findings |
| CRITICAL status changed | Recalculate gate decision |

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] All gate decisions valid
- [ ] Executive summary accurate
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated `production-readiness-report.md`
- Change summary
- Updated gate decision (if changed)

---

## NEXT STEP:

Edit mode complete. Options:
- Run validation mode to verify changes
- Return to workflow selection
- Proceed to deployment if GO decision confirmed
