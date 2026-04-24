# Step 4: Validate Versioning

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## Purpose

Validate versioning strategy and deprecation policies in the facade contract.

## Prerequisites

- Step 3: Check Error Handling completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-contracts`

---

## Actions

**Verify current best practices with web search:**
Search the web: "API versioning strategies best practices {date}"

_Source: [URL]_

1. **Validate Version Strategy**
   - Check semantic versioning compliance
   - Verify version documentation

2. **Validate Deprecation Policy**
   - Check deprecation timeline
   - Verify migration path documentation

3. **Validate Backwards Compatibility**
   - Check compatibility rules
   - Verify breaking change policy

---

## Verification

- [ ] Versioning strategy documented
- [ ] Deprecation policy defined
- [ ] Migration path documented

## Outputs

- Versioning validation results

## Next Step

Proceed to Step 5: Generate Validation Report to compile final validation report.
