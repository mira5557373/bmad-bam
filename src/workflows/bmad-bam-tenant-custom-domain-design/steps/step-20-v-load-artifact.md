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

This step loads the Tenant Custom Domain Design artifact for validation. This document defines the domain architecture, SSL/TLS management, routing configuration, and DNS integration patterns.

---

## Prerequisites

- Custom domain design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/planning-artifacts/infrastructure/tenant-custom-domain-design.md`
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

## Artifact Locations

Load the existing custom domain design document:
- `{output_folder}/planning-artifacts/infrastructure/tenant-custom-domain-design.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- File exists at the specified path
- File is readable and contains valid markdown
- All four main sections are present (Domain, SSL, Routing, DNS)

---

## Expected Artifact Structure

The tenant-custom-domain-design.md should contain:
- Domain Hierarchy with all domain types
- SSL/TLS Management with certificate strategies
- Routing Configuration with resolution logic
- DNS Integration with verification methods

---

## Error Handling Guidance

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure and completeness
- **P (Party Mode)**: Bring analyst and architect perspectives for initial review
- **C (Continue)**: Proceed to detailed validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Confirm document loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact ready for validation

---

## Next Step

Once artifact is successfully loaded and initial structure is confirmed, proceed to Step 21: Validate to perform detailed quality criteria checks.
