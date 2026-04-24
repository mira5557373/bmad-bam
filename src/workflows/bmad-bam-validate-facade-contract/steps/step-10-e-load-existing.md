# Step 10: Load Existing Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## Purpose

Load an existing facade contract validation report for targeted modifications in Edit mode.

## Prerequisites

- Previous validation report exists
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-contracts`

---

## Actions

1. **Locate Existing Report**
   - Find report in `{output_folder}/planning-artifacts/quality/`
   - Identify by module name or timestamp

2. **Parse Report**
   - Load all sections
   - Extract previous findings
   - Identify areas for update

3. **Identify Changes Needed**
   - Compare with current contract
   - Note new validations required

---

## Verification

- [ ] Report loaded successfully
- [ ] Changes identified
- [ ] Ready for modifications

## Outputs

- Loaded validation report
- Change requirements identified

## Next Step

Proceed to Step 11: Apply Changes to update the validation report with new findings.
