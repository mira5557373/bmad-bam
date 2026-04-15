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

This step loads the post-deployment verification artifacts for validation against QG-PD1 criteria. These documents verify that deployments are successful with smoke tests passing, monitoring active, tenants healthy, and rollback ready.

---

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-PD1`

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

## Artifact Locations

Load the existing post-deployment verification documents:
- `{output_folder}/operations/post-deployment-verification-report.md`
- `{output_folder}/operations/tenant-health-status.md`
- `{output_folder}/operations/rollback-readiness-checklist.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions for each file:
- All files exist at their specified paths
- Files are readable and contain valid markdown
- Cross-references between documents are consistent
- Verification timestamps are recent (within deployment window)

---

## Expected Artifact Structure

The post-deployment-verification-report.md should contain:
- Smoke test execution results
- Monitoring activation status
- Overall deployment health summary

The tenant-health-status.md should contain:
- Per-tenant health check results
- Tier-specific verification results
- Any tenant-specific issues

The rollback-readiness-checklist.md should contain:
- Previous version availability
- Rollback procedure confirmation
- Estimated rollback timeline

---

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If one file exists but others are missing, report which files are absent and advise that all documents are required for complete QG-PD1 validation.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure and completeness
- **P (Party Mode)**: Bring DevOps and QA perspectives for initial review
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
- Context: "Review verification structure: {summary of sections and completeness}"
- Process collaborative analysis from DevOps and QA personas
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
