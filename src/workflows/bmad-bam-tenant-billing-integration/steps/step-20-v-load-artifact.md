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

This step loads the Tenant Billing Integration artifacts for validation. These documents define the billing requirements, pricing models, payment processing, subscription management, and reconciliation processes for the multi-tenant platform.

---

## Prerequisites

- Billing integration design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `billing-integration`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`



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

Load the existing billing integration documents:
- `{output_folder}/planning-artifacts/billing-integration-spec.md`
- `{output_folder}/planning-artifacts/billing/reconciliation-runbook.md`
- `{output_folder}/planning-artifacts/billing/subscription-management.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- All billing integration files exist at their specified paths
- Files are readable and contain valid markdown
- Billing requirements are documented
- Pricing models are defined

## Expected Artifact Structure

The billing-integration-spec.md should contain:
- Billing requirements with provider selection
- Pricing models per tier
- Usage tracking integration
- Invoice generation workflow
- Payment processing configuration
- Subscription management lifecycle
- Tier upgrade/downgrade rules
- Billing notifications
- Reconciliation processes

The reconciliation-runbook.md should contain:
- Reconciliation types and schedules
- Discrepancy handling procedures
- Audit trail configuration

The subscription-management.md should contain:
- Subscription lifecycle states
- Subscription operations
- Trial management

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If some files exist but others are missing, report which files are absent and note that complete billing validation requires all documents.

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
- Context: "Review loaded billing integration artifacts for validation: {summary of structure}"
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
- Billing requirements documented
- Pricing tiers defined
- Payment processing configured
- Subscription lifecycle complete
- Reconciliation processes documented

---

## Next Step

Once all artifacts are successfully loaded and initial structure is confirmed, proceed to Step 21: Validate Billing Integration to perform detailed quality criteria checks.
