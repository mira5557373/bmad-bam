# Step 20: Load PCI-DSS Spec for Validation

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

This step loads the PCI-DSS compliance specification artifact for validation. The validation mode checks the PCI-DSS design against DSS v4.0 requirements, control completeness, and CDE scope accuracy.

## Prerequisites

- PCI-DSS compliance specification artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: PCI-DSS

## Artifact Location

Load the existing PCI-DSS compliance specification document:
- `{output_folder}/planning-artifacts/pci-dss-compliance-spec.md`

## Document Structure Validation

Verify the PCI-DSS compliance specification contains all required sections:

| Required Section | Present | Valid |
|------------------|---------|-------|
| CDE Scope | {Yes/No} | {Valid/Invalid} |
| Network Segmentation | {Yes/No} | {Valid/Invalid} |
| Security Controls | {Yes/No} | {Valid/Invalid} |
| Tenant Isolation | {Yes/No} | {Valid/Invalid} |
| Testing Requirements | {Yes/No} | {Valid/Invalid} |
| Compliance Monitoring | {Yes/No} | {Valid/Invalid} |


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
- Validate against PCI-DSS v4.0 requirements

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Pre-Validation Analysis
- **A1**: Analyze PCI-DSS specification document structure
- **A2**: Evaluate CDE scope coverage before validation
- **A3**: Assess security control documentation readiness
- **A4**: Review tenant isolation section completeness

### [P] Propose - Validation Approach
- **P1**: Propose validation priority based on assessment timeline
- **P2**: Suggest requirement-specific validation focus areas
- **P3**: Recommend partial validation approach for incomplete specs
- **P4**: Propose pre-validation remediation for known gaps

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 21 (Validate PCI-DSS) - load `step-21-v-validate-pci.md`
- **C2**: Switch to Create Mode - load `step-01-c-scope-cde.md`
- **C3**: Switch to Edit Mode - load `step-10-e-load-pci.md`

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

Proceed to `step-21-v-validate-pci.md` to run validation checks against PCI-DSS requirements.
