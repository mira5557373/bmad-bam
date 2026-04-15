# Step 20: Load Stakeholder Map for Validation

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

This step loads the stakeholder map artifacts for validation. The stakeholder map defines stakeholder groups, interests, communication plans, and RACI matrices that ensure proper governance for the multi-tenant platform initiative.

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: stakeholder

## Artifact Locations

Load the existing stakeholder map:
- `{output_folder}/planning-artifacts/stakeholder-map.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:

| Check | Expected |
|-------|----------|
| File exists | Stakeholder map at specified path |
| File readable | Valid markdown content |
| Document complete | All major sections present |
| Metadata present | Version, date, author, status |

## Expected Document Structure

The stakeholder-map.md should contain:

**Stakeholder Registry:**
- Internal stakeholders (engineering, product, operations)
- External stakeholders (customers, partners, vendors)
- Contact information
- Availability and capacity

**Interest-Influence Matrix:**
- Stakeholder interests mapped
- Influence levels assessed
- Engagement strategies defined
- Conflicts identified

**Communication Plan:**
- Communication cadence per category
- Channel preferences
- Templates
- Scheduled touchpoints

**RACI Matrix:**
- Architecture decisions
- Operations decisions
- Product decisions
- Compliance decisions

**Decision Workflows:**
- Workflow stages defined
- Escalation paths documented

## Error Handling Guidance

If the file does not exist:
- Inform user no stakeholder map exists to validate
- Suggest switching to Create mode

If the file is incomplete:
- Report which sections are missing
- Suggest Edit mode to complete missing sections



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure
- Verify document integrity

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

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
- **A1**: Review stakeholder map file existence and accessibility
- **A2**: Analyze document structure completeness
- **A3**: Evaluate metadata currency and accuracy
- **A4**: Assess section presence against expected structure
- **A5**: Review pre-validation check results

### [P]ropose Changes
- **P1**: Propose switching to Create mode if map missing
- **P2**: Suggest Edit mode for incomplete sections
- **P3**: Recommend metadata updates if outdated
- **P4**: Propose validation scope adjustments
- **P5**: Suggest additional pre-validation checks

### [C]ontinue
- **C1**: Accept loaded stakeholder map and proceed to validation
- **C2**: Mark step complete and load `step-21-v-validate-stakeholder-map.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Stakeholder map artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] Metadata is complete and current
- [ ] Patterns align with pattern registry

## Outputs

- Loaded stakeholder map for validation
- Section completeness checklist
- Initial quality assessment

## Next Step

Proceed to `step-21-v-validate-stakeholder-map.md` for detailed validation checks.
