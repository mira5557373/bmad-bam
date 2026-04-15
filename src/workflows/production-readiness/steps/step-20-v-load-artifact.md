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

This step loads the production readiness artifacts for validation against QG-OC (Operational Checklist Gate). These documents define the go-live readiness including gate verification, infrastructure assessment, observability, disaster recovery testing, and operational procedures.

---

## Prerequisites

- Previous step completed (workflow selection)
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/production-checklist.md`
- **Load checklists:** `{project-root}/_bmad/bam/data/checklists/qg-operations-continuous.md`

---

## Inputs

- Artifact file paths for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Production checklist: `{project-root}/_bmad/bam/data/checklists/production-checklist.md`

---

## Actions

### 1. Load Artifact

- Read the artifacts from `{output_folder}/operations/` location
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

Load the existing production readiness documents:
- `{output_folder}/operations/production-readiness-report.md`
- `{output_folder}/operations/go-live-checklist.md`
- `{output_folder}/operations/risk-assessment.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions for each file:
- All three files exist at their specified paths
- Files are readable and contain valid markdown
- Cross-references between documents are consistent
- Gate statuses align across documents

---

## Expected Artifact Structure

The production-readiness-report.md should contain:
- Executive summary with go-live recommendation
- Gate verification results (security, data, compliance, code quality)
- Infrastructure assessment (capacity, HA, scaling)
- Observability validation (monitoring, alerting, logging)
- Disaster recovery test results (RTO/RPO, backup/restore)
- Operational readiness (runbooks, on-call, incident response)
- Risk assessment summary

The go-live-checklist.md should contain:
- Pre-launch verification items
- Launch day procedures
- Post-launch monitoring requirements
- Rollback procedures

The risk-assessment.md should contain:
- Identified risks with likelihood and impact
- Mitigation strategies
- Risk owners and timelines

---

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If one or more files exist but others are missing, report which files are absent and advise that all documents are required for complete production readiness validation.

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
- Context: "Review production readiness structure: {summary of sections and completeness}"
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

- [ ] All artifacts loaded successfully
- [ ] All required sections present
- [ ] Document structure valid

---

## Outputs

- Loaded artifacts for validation
- Validation checklist

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation checks.
