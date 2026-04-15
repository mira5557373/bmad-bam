# Step 10: Load Existing Stakeholder Map

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

This step loads the existing stakeholder map for modification. Edit mode allows updates to stakeholder lists, interest mappings, communication plans, or RACI assignments without recreating the entire documentation from scratch.

## Prerequisites

- Existing stakeholder map document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Stakeholder Map Document

Load the existing stakeholder map:
- `{output_folder}/planning-artifacts/stakeholder-map.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current stakeholder map:

**Document Sections:**
- Stakeholder Registry (internal, external)
- Categorization Framework
- Interest-Influence Matrix
- Communication Plan
- RACI Matrix
- Decision Workflows

### 3. Identify Modification Areas

Present the following modification options:

| Section | Common Updates |
|---------|---------------|
| Stakeholder Registry | Add/remove stakeholders, update contacts |
| Categorization | Adjust categories, reassign stakeholders |
| Interest Mapping | Update interests, revise influence levels |
| Communication Plan | Change cadence, update channels |
| RACI Matrix | Reassign roles, add new decisions |
| Escalation Paths | Update procedures, revise timelines |

### 4. Confirm Modification Scope

Present options to user:
- Which sections need modification?
- Are there new stakeholders to add?
- Have organizational changes occurred?
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
- **A1**: Review stakeholder registry for outdated entries
- **A2**: Analyze interest-influence matrix accuracy
- **A3**: Evaluate communication plan effectiveness
- **A4**: Assess RACI assignments for current relevance
- **A5**: Review organizational changes impacting stakeholders

### [P]ropose Changes
- **P1**: Propose stakeholder registry updates
- **P2**: Suggest interest-influence adjustments
- **P3**: Recommend communication plan modifications
- **P4**: Propose RACI reassignments
- **P5**: Suggest escalation path updates

### [C]ontinue
- **C1**: Accept modification scope and proceed to apply changes
- **C2**: Mark step complete and load `step-11-e-apply-stakeholder-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing stakeholder map loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current stakeholder map configuration
- Confirmed list of sections to modify
- Change rationale documented

## Next Step

Proceed to `step-11-e-apply-stakeholder-changes.md` with identified modification targets.
