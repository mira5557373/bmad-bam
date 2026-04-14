# Step 1: Load Existing Reconciliation Design

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

---

## Purpose

This step loads the existing data reconciliation design for modification. Edit mode allows updates to reconciliation scope, verification procedures, automated checks, or remediation processes without recreating the entire design from scratch.

## Prerequisites

- Existing reconciliation design document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-integrity


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Reconciliation Design Document

Load the existing reconciliation design:
- `{output_folder}/planning-artifacts/data-reconciliation-dr.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current reconciliation design:

**Document Sections:**
- Executive Summary (overview, scope)
- Reconciliation Scope (data assets, priorities, mappings)
- Verification Procedures (methods, tolerances, checklists)
- Automated Checks (types, scheduling, alerts)
- Remediation Procedures (categories, resolution, rollback)
- Escalation and Sign-Off (procedures, requirements)

### 3. Identify Modification Areas

Present the following modification options:

| Section | Common Updates |
|---------|---------------|
| Reconciliation Scope | Add/remove data assets, modify priorities |
| Verification Procedures | Adjust methods, tolerances, checklists |
| Automated Checks | Modify scheduling, thresholds, alerts |
| Remediation Procedures | Update resolution steps, rollback options |
| Escalation | Modify escalation paths, contacts |
| Sign-Off Requirements | Adjust approval levels |

### 4. Confirm Modification Scope

Present options to user:
- Which sections need modification?
- Are there new requirements driving changes?
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
- **A1**: Review current reconciliation design structure and completeness
- **A2**: Analyze reconciliation scope against current data assets
- **A3**: Evaluate verification procedures effectiveness
- **A4**: Assess automated check configuration
- **A5**: Review remediation procedures completeness

### [P]ropose Changes
- **P1**: Propose reconciliation scope adjustments
- **P2**: Suggest verification procedure modifications
- **P3**: Recommend automated check updates
- **P4**: Propose remediation procedure changes
- **P5**: Suggest escalation procedure updates

### [C]ontinue
- **C1**: Accept modification scope and proceed to apply changes
- **C2**: Mark step complete and load `step-11-e-apply-reconciliation-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing reconciliation design loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current reconciliation design configuration
- Confirmed list of sections to modify
- Change rationale documented
- **Load template:** `{project-root}/_bmad/bam/templates/data-reconciliation-dr-template.md`

## Next Step

Proceed to `step-11-e-apply-reconciliation-changes.md` with identified modification targets.
