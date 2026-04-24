# Step 20: Load Facade Contract Artifact

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

This step loads the facade contract specification for validation. The facade contract documents module boundaries, operations, tenant context propagation, and error handling for inter-module communication.

## Prerequisites

- Facade contract has been created (from `define-facade-contract` or `evolve-facade-contract`)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/qg-i1-convergence.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

1. **Locate Facade Contract**
   - Find contract in `{output_folder}/planning-artifacts/architecture/`
   - Identify by module name or contract identifier

2. **Parse Complete Contract**
   - Load all contract sections
   - Extract operation definitions
   - Read tenant context rules
   - Load error handling specifications
   - Parse versioning information

3. **Prepare for Validation**
   - Check for completeness of contract
   - Verify all required sections exist
   - Confirm structure is consistent

If the facade contract does not exist, inform the user that there is no artifact to validate and suggest running `define-facade-contract` workflow first.

#### Checkpoint: Artifact Loaded for Validation

Before proceeding, confirm:
- [ ] Facade contract located
- [ ] All sections parsed
- [ ] Contract structure verified
- [ ] Ready for validation

**STOP: Present the A/P/C menu to the user**

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Patterns align with pattern registry

## Outputs

Confirm successful loading with:
- Module identifier
- Contract version
- Number of operations defined
- Tenant context configuration status

## Next Step

Once the facade contract is successfully loaded and structure is confirmed, proceed to Step 21: Validate Facade Contract to perform validation against quality criteria.
