# Step 20: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step loads the Compliance Verification artifacts for validation. These documents define the compliance posture including framework coverage, control implementations, audit findings, and remediation status for the multi-tenant AI platform.

---

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/compliance-checklist.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Read the compliance artifacts from specified locations:
- `{output_folder}/compliance/compliance-verification-report.md`
- `{output_folder}/compliance/compliance-findings.md`
- `{output_folder}/compliance/remediation-plan.md`

### 2. Validate Structure

Check all required sections are present in each document:

**compliance-verification-report.md:**
- Executive summary
- Framework coverage matrix
- Control implementation status
- Gate decision and rationale

**compliance-findings.md:**
- Findings by framework
- Severity classification
- Evidence references

**remediation-plan.md:**
- Gap descriptions
- Remediation actions
- Owners and due dates
- Priority and status

### 3. Generate Initial Findings

- Document any structural issues found
- Categorize by severity (Critical/High/Medium/Low)
- Note cross-reference consistency

---

## Artifact Locations

Load the existing compliance verification documents:
- `{output_folder}/compliance/compliance-verification-report.md`
- `{output_folder}/compliance/compliance-findings.md`
- `{output_folder}/compliance/remediation-plan.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions for each file:
- All three files exist at their specified paths
- Files are readable and contain valid markdown
- Cross-references between documents are consistent
- Framework identifiers and control IDs align across documents

---

## Expected Artifact Structure

The compliance-verification-report.md should contain:
- Executive Summary with overall compliance status
- Framework Coverage Matrix showing all applicable frameworks
- Control Implementation Status with evidence references
- Gate Decision (PASS/CONDITIONAL/FAIL) with rationale

The compliance-findings.md should contain:
- Findings organized by framework
- Severity levels (Critical/High/Medium/Low/Info)
- Detailed descriptions with evidence
- Affected controls and components

The remediation-plan.md should contain:
- Gap descriptions linked to findings
- Remediation actions with clear acceptance criteria
- Assigned owners and realistic due dates
- Priority and current status tracking

---

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If some files exist but others are missing, report which files are absent and advise that all three documents are required for complete compliance validation.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure and completeness
- **P (Party Mode)**: Bring analyst and architect perspectives for initial review
- **C (Continue)**: Proceed to detailed validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass document context: sections present, initial structure assessment
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation preparation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance documentation structure: {summary of sections and completeness}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm documents loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact for validation
- Validation checklist

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
