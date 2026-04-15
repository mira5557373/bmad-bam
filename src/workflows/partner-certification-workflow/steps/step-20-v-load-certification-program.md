# Step 20: Load Certification Program for Validation

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

This step loads the partner certification program artifacts for validation. The certification program defines tier structures, requirements, assessment processes, and renewal procedures that ensure partner ecosystem quality for the multi-tenant platform.

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-ecosystem
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: integration

## Artifact Locations

Load the existing certification program:
- `{output_folder}/planning-artifacts/partner-certification-program.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:

| Check | Expected |
|-------|----------|
| File exists | Certification program at specified path |
| File readable | Valid markdown content |
| Document complete | All major sections present |
| Metadata present | Version, date, author, status |

## Expected Document Structure

The partner-certification-program.md should contain:

**Certification Tiers:**
- Tier definitions (Registered, Certified, Premier)
- Benefits matrix
- Progression requirements
- Branding guidelines

**Technical Requirements:**
- API requirements per tier
- Security standards
- Performance thresholds
- Integration requirements

**Business Requirements:**
- Revenue thresholds
- Training requirements
- Support commitments
- Documentation standards

**Assessment Process:**
- Technical assessment criteria
- Business assessment process
- Scoring methodology
- Pass/fail thresholds

**Renewal and Maintenance:**
- Renewal requirements
- Maintenance obligations
- Upgrade/downgrade procedures
- Recertification process

## Error Handling Guidance

If the file does not exist:
- Inform user no certification program exists to validate
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
- **A1**: Review certification program file existence and accessibility
- **A2**: Analyze document structure completeness
- **A3**: Evaluate metadata currency and accuracy
- **A4**: Assess section presence against expected structure
- **A5**: Review pre-validation check results

### [P]ropose Changes
- **P1**: Propose switching to Create mode if program missing
- **P2**: Suggest Edit mode for incomplete sections
- **P3**: Recommend metadata updates if outdated
- **P4**: Propose validation scope adjustments
- **P5**: Suggest additional pre-validation checks

### [C]ontinue
- **C1**: Accept loaded certification program and proceed to validation
- **C2**: Mark step complete and load `step-21-v-validate-certification-program.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Certification program artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] Metadata is complete and current
- [ ] Patterns align with pattern registry

## Outputs

- Loaded certification program for validation
- Section completeness checklist
- Initial quality assessment

## Next Step

Proceed to `step-21-v-validate-certification-program.md` for detailed validation checks.
