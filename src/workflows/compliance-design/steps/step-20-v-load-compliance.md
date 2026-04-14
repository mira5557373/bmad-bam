# Step 20: Load Compliance for Validation

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

This step loads the compliance specification artifact for validation. The validation mode checks the compliance design against framework requirements, audit logging best practices, and control coverage completeness.

## Prerequisites

- Compliance specification artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

## Artifact Location

Load the existing compliance specification document:
- `{output_folder}/planning-artifacts/compliance-spec.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- Compliance specification file exists at specified path
- File contains valid markdown with proper section headers
- Required sections are present in the document
- Framework references are valid

## Document Structure Validation

Verify the compliance specification contains all required sections:

| Required Section | Present | Valid |
|------------------|---------|-------|
| Framework Requirements Summary | {Yes/No} | {Valid/Invalid} |
| Audit Logging Architecture | {Yes/No} | {Valid/Invalid} |
| Control Inventory | {Yes/No} | {Valid/Invalid} |
| Control-Framework Mapping | {Yes/No} | {Valid/Invalid} |
| Evidence Requirements | {Yes/No} | {Valid/Invalid} |
| Retention Policies | {Yes/No} | {Valid/Invalid} |
| Compliance Monitoring | {Yes/No} | {Valid/Invalid} |
| Remediation Procedures | {Yes/No} | {Valid/Invalid} |

## Error Handling Guidance

If the file does not exist:
- Inform the user that there is no artifact to validate
- Suggest switching to Create mode

If files exist but lack required sections:
- Document the missing sections
- Prompt for guidance on partial validation
- Proceed with available content



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

### [A] Analyse - Pre-Validation Analysis
- **A1**: Analyze compliance specification document structure completeness
- **A2**: Evaluate SOC 2 section coverage before detailed validation
- **A3**: Assess HIPAA compliance documentation readiness
- **A4**: Review GDPR Article 30 records completeness

### [P] Propose - Validation Approach
- **P1**: Propose validation priority based on certification timeline
- **P2**: Suggest framework-specific validation focus areas
- **P3**: Recommend partial validation approach for incomplete specs
- **P4**: Propose pre-validation remediation for known gaps

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 21 (Validate Compliance) - load `step-21-v-validate-compliance.md`
- **C2**: Switch to Create Mode - load `step-01-c-identify-frameworks.md`
- **C3**: Switch to Edit Mode - load `step-10-e-load-compliance.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Document structure validated
- [ ] All required sections present
- [ ] Validation context prepared
- [ ] Patterns align with pattern registry

## Outputs

- Validation context prepared
- Document structure assessment
- List of sections available for validation

## Next Step

Proceed to `step-21-v-validate-compliance.md` to run validation checks against compliance requirements.
