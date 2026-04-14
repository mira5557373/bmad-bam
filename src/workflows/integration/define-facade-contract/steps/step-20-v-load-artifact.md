# Step 20: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

## Purpose

Load the facade contract document for validation, parsing all interface definitions, DTO schemas, and error handling specifications to prepare for completeness and consistency checks.

## Prerequisites

- Previous step completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`

Load the existing facade contract for validation.


---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

1. **Locate Contract Document**
   - Search for contract in `{output_folder}/planning-artifacts/contracts/`
   - Identify by provider module name or contract identifier

2. **Parse Contract Completely**
   - Load all interface definitions
   - Extract all DTO schemas
   - Read error handling specifications
   - Load metadata and version info

3. **Prepare for Validation**
   - Index all operations for completeness check
   - Catalog all DTO references for consistency check
   - List all error codes for coverage check

If the contract file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

## Output

Confirm successful loading and prepare validation context with:
- Contract identifier and version
- Operation count
- DTO count
- Error code count

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

## Outputs

- Loaded artifact for validation
- Validation checklist

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help locate contract for validation
> - `A2` - Clarify contract parsing requirements
> - `A3` - Explain validation preparation steps
> - `A4` - Review contract structure expectations
>
> **[P] Proactive Options:**
> - `P1` - Suggest missing sections to check
> - `P2` - Flag incomplete contract metadata
> - `P3` - Recommend validation priority areas
> - `P4` - Identify potential validation issues
>
> **[C] Completion Options:**
> - `C1` - Validate artifact loaded correctly
> - `C2` - Generate validation context summary
> - `C3` - Verify all sections parsed
> - `C4` - **Proceed to Step 21** (validate)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Proceed to `step-21-v-validate.md`
