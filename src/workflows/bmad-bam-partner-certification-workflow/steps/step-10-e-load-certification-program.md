# Step 10: Load Existing Certification Program

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step loads the existing partner certification program for modification. Edit mode allows updates to tier definitions, requirements, assessment processes, or renewal procedures without recreating the entire program from scratch.

## Prerequisites

- Existing certification program document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-ecosystem


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Certification Program Document

Load the existing certification program:
- `{output_folder}/planning-artifacts/partner-certification-program.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current certification program:

**Document Sections:**
- Certification Tiers (Registered, Certified, Premier)
- Benefits Matrix
- Technical Requirements
- Business Requirements
- Assessment Process
- Scoring Methodology
- Renewal Requirements
- Maintenance Obligations

### 3. Identify Modification Areas

Present the following modification options:

| Section | Common Updates |
|---------|---------------|
| Tier Structure | Add/modify tiers, adjust benefits |
| Technical Requirements | Update API requirements, add security criteria |
| Business Requirements | Adjust revenue thresholds, training requirements |
| Assessment Process | Modify scoring weights, update thresholds |
| Renewal Procedures | Change timelines, adjust fees |
| Maintenance Requirements | Update SLAs, monitoring requirements |

### 4. Confirm Modification Scope

Present options to user:
- Which sections need modification?
- Are there new requirements to add?
- Have partner ecosystem needs changed?
- Should any sections be validated after changes?

Document the confirmed modification scope for the next step.

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

### Menu Options

### [A]nalyze Options
- **A1**: Review tier structure for current relevance
- **A2**: Analyze technical requirements against current APIs
- **A3**: Evaluate assessment process effectiveness
- **A4**: Assess renewal procedures for partner feedback
- **A5**: Review partner ecosystem changes

### [P]ropose Changes
- **P1**: Propose tier structure updates
- **P2**: Suggest technical requirement modifications
- **P3**: Recommend assessment process improvements
- **P4**: Propose renewal procedure changes
- **P5**: Suggest maintenance requirement updates

### [C]ontinue
- **C1**: Accept modification scope and proceed to apply changes
- **C2**: Mark step complete and load `step-11-e-apply-certification-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing certification program loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current certification program configuration
- Confirmed list of sections to modify
- Change rationale documented

## Next Step

Proceed to `step-11-e-apply-certification-changes.md` with identified modification targets.
