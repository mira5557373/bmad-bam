# Step 10: Load Existing Artifact

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

This step loads the existing facade contract specification for modification. Edit mode allows incremental updates to interface definitions, DTOs, error codes, or versioning without recreating the entire contract from scratch.

Load the existing facade contract specification.

## Prerequisites

- Existing facade contract specification to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

1. **Locate Contract Document**
   - Search for contract in `{output_folder}/planning-artifacts/contracts/`
   - Match by provider module name or contract identifier
   - Load the most recent version if multiple exist

2. **Parse Contract Structure**
   - Extract interface definitions
   - Parse DTO schemas
   - Load error code enumeration
   - Read version and metadata

3. **Display Contract Summary**
   - Show contract name and current version
   - List all defined operations
   - Show consumer modules using this contract
   - Display last modification date

If the contract file does not exist, inform the user and suggest switching to Create mode.

## Output

Present a summary of the existing contract:
- Contract identifier and version
- Provider module and bounded context
- Number of operations defined
- List of operation names with their types (query/command)

Confirm with the user which sections need modification.

## Verification

- [ ] Contract loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current facade contract
- Confirmed modification scope from user

---

## COLLABORATION MENUS (A/P/C)

> **Quick Actions** - Type the letter + number:
>
> **[A] Assist Options:**
> - `A1` - Help locate correct contract version
> - `A2` - Clarify contract structure parsing
> - `A3` - Explain modification scope options
> - `A4` - Review contract version history
>
> **[P] Proactive Options:**
> - `P1` - Suggest sections likely needing updates
> - `P2` - Flag outdated DTO schemas
> - `P3` - Recommend version increment strategy
> - `P4` - Identify dependent consumer impacts
>
> **[C] Completion Options:**
> - `C1` - Validate contract loaded correctly
> - `C2` - Generate contract summary report
> - `C3` - Confirm modification scope with user
> - `C4` - **Proceed to Step 11** (apply changes)

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with confirmed modification scope.
