# Step 2: Verify Contract Schema

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## Purpose

Verify the facade contract schema compliance against facade contract standards.

## Prerequisites

- Step 1: Load Facade Definition completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-contracts`

---

## Actions

**Verify current best practices with web search:**
Search the web: "facade contract schema validation {date}"

_Source: [URL]_

1. **Validate Operation Definitions**
   - Check operation naming conventions
   - Verify input/output type specifications
   - Confirm parameter documentation

2. **Validate Tenant Context**
   - Verify tenant context parameter presence
   - Check context propagation rules

3. **Document Findings**
   - Record schema compliance results
   - Note any violations

---

## Verification

- [ ] All operations follow naming convention
- [ ] Types properly specified
- [ ] Tenant context defined

## Outputs

- Schema validation results

## Next Step

Proceed to Step 3: Check Error Handling to validate error handling specifications.
