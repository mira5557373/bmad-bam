# Step 20: Load Artifact

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

This step loads the Usage Metering artifacts for validation. These documents define the billable resource tracking, metering event pipelines, aggregation strategies, and billing system integration for accurate tenant usage measurement.

---

## Prerequisites

- Usage metering design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`



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

Load the existing usage metering documents:
- `{output_folder}/planning-artifacts/billing/usage-metering-design.md`
- `{output_folder}/planning-artifacts/billing/billing-integration-spec.md`
- `{output_folder}/planning-artifacts/operations/metering-runbook.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- All three files exist at their specified paths
- Files are readable and contain valid markdown
- Billable resources are categorized and defined
- Metering event schemas are documented

## Expected Artifact Structure

The usage-metering-design.md should contain:
- Billable resource definitions with units
- Metering event schema and collection pipeline
- Aggregation configuration and storage
- Quota enforcement mechanisms

The billing-integration-spec.md should contain:
- Billing provider API integration details
- Usage report schemas and sync processes
- Reconciliation procedures
- Error handling strategies

The metering-runbook.md should contain:
- Operational procedures for metering pipeline
- Monitoring and alerting configuration
- Troubleshooting guides
- Accuracy validation procedures

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If some files exist but others are missing, report which files are absent and note that complete metering validation requires all documents.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifacts above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for pre-validation analysis
- **C (Continue)**: Proceed to validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass artifact context: documents loaded, structure analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these pre-validation findings? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review loaded metering artifacts for validation: {summary of structure}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loading complete
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

Confirm successful loading with:
- Number of billable resources defined
- Metering event types identified
- Aggregation levels configured
- Billing integration status

---

## Next Step

Once all artifacts are successfully loaded and initial structure is confirmed, proceed to Step 21: Validate Usage Metering Design to perform detailed quality criteria checks.
