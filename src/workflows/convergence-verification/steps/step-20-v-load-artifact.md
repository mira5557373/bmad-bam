# Step 20: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Prerequisites

- Convergence Verification Report artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-i1-convergence.md`

## Purpose

This step loads the Convergence Verification Report artifact for validation. The convergence report documents alignment verification between multiple architectural artifacts, ensuring consistency across the system design and identifying any divergences that require resolution.

## Artifact Location

Load the existing convergence report from `{output_folder}/planning-artifacts/quality/convergence-report.md`.

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- The file exists at the specified path
- The file is readable and contains valid markdown
- The document has proper section headers
- Cross-reference links to other artifacts are present

## Expected Artifact Structure

The convergence report should contain these required sections:
- Verification Scope listing artifacts compared
- Alignment Matrix showing consistency checks
- Divergence Findings with severity ratings
- Resolution Recommendations for each divergence
- Convergence Score with pass/fail status
- Artifact Version References for traceability

## Error Handling Guidance

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the file exists but lacks required sections or contains broken cross-references, document the specific issues and prompt the user for guidance on how to proceed with partial data.



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
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

### [A]nalyze - Deep Dive Options
| Code | Action | Description |
|------|--------|-------------|
| A1 | Analyze artifact structure | Verify convergence report has required sections |
| A2 | Analyze cross-references | Check links to other architectural artifacts |
| A3 | Analyze gate coverage | Verify QG-I1/I2/I3 results are documented |
| A4 | Analyze version tracking | Check artifact version references |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Load convergence report | Read artifact from specified location |
| P2 | Validate structure | Check required sections are present |
| P3 | Extract gate results | Parse QG-I1/I2/I3 pass/fail status |
| P4 | Prepare validation context | Set up for detailed quality checks |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Continue to Step 21 | Proceed to validation criteria checks |
| C2 | Switch to Create mode | Go to step-01-c-cross-module-integration-verification.md |
| C3 | Switch to Edit mode | Go to step-10-e-load-existing.md |

**Convergence Gate Context:** Validation mode checks that QG-I1 (Cross-Module), QG-I2 (Tenant Safety), and QG-I3 (Agent Safety) gates are properly documented and passing.

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

## Outputs

- Validation context prepared
- Document structure confirmed

## Next Step

Once the artifact is successfully loaded and initial structure is confirmed, proceed to `step-21-v-validate.md` to perform detailed quality criteria checks.
