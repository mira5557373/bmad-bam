# Step 10: Load Existing Artifact

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

This step loads existing security audit documents for modification. Edit mode allows updates to audit findings, remediation plans, or compliance status without re-running the entire audit.

---

## Prerequisites

- Existing security audit artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Load the existing security audit documents:
- `{output_folder}/security/security-audit-report.md`
- `{output_folder}/security/access-control-review.md`
- `{output_folder}/security/vulnerability-assessment.md`
- `{output_folder}/security/compliance-verification.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:
- Audit scope and objectives
- Access control findings
- Vulnerability status
- Compliance verification results

### 3. Confirm Modification Targets

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading and parsing the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements
- **P (Party Mode)**: Bring security and compliance perspectives for change review
- **C (Continue)**: Proceed to apply identified modifications
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Confirm modification targets with user
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user

---

## Outputs

- Summary of current audit status
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
