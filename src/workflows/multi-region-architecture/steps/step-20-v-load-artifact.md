# Step 20: Load Artifact

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

This step loads the Multi-Region Architecture artifacts for validation. These documents define the regional topology, data residency mapping, cross-region synchronization, routing strategy, and failover procedures.

---

## Prerequisites

- Multi-region architecture design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`



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

## Artifact Locations

Load the existing multi-region architecture documents:
- `{output_folder}/planning-artifacts/architecture/multi-region-architecture.md`
- `{output_folder}/planning-artifacts/operations/failover-runbook.md`

---

## Pre-Validation Checks

Before proceeding, verify the following conditions for each file:
- Both files exist at their specified paths
- Files are readable and contain valid markdown
- Regional configurations are properly documented
- References between architecture and failover runbook are consistent

---

## Expected Artifact Structure

The multi-region-architecture.md should contain:
- Regional topology definition
- Data residency compliance matrix
- Cross-region sync strategy
- Regional routing configuration
- RTO/RPO targets

The failover-runbook.md should contain:
- Failover triggers and thresholds
- Automatic failover procedures
- Manual failover procedures
- Failback procedures
- Data recovery strategy

---

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If one file exists but the other is missing, report which file is absent and note that complete multi-region validation requires both the architecture document and the failover runbook.

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
- Context: "Review multi-region structure: {summary of sections and completeness}"
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
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded artifact ready for validation

---

## Next Step

Once both artifacts are successfully loaded and initial structure is confirmed, proceed to Step 21: Validate Artifact to perform detailed quality criteria checks.
