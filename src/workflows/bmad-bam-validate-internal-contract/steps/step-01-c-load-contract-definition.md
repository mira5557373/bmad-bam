# Step 1: Load Contract Definition

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## Purpose

Load the internal contract definition to begin validation process in Create mode.

## Prerequisites

- Internal contract exists from `internal-contract-design`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `module-boundaries`

---

## Actions

**Verify current best practices with web search:**
Search the web: "internal API contract validation patterns {date}"

_Source: [URL]_

1. **Locate Internal Contract**
   - Find contract in `{output_folder}/planning-artifacts/architecture/`
   - Identify by module name

2. **Parse Contract Structure**
   - Load internal API definitions
   - Extract component boundaries
   - Read encapsulation rules

3. **Prepare Validation Context**
   - Load quality gate checklist
   - Identify validation criteria

---

## Verification

- [ ] Contract loaded successfully
- [ ] Structure matches expected format
- [ ] Patterns align with pattern registry

## Outputs

- Loaded internal contract
- Validation context established

## Next Step

Proceed to Step 2: Verify Encapsulation to validate module boundaries and encapsulation.
