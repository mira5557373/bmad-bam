# Step 1: Load Artifact

## Purpose

This step loads the Tenant Onboarding artifacts for validation. These documents define the operational procedures and technical workflows for bringing new tenants onto the platform, including provisioning steps, configuration requirements, and verification checkpoints.

## Artifact Locations

Load the existing tenant onboarding documents:
- `{output_folder}/planning-artifacts/operations/tenant-onboarding-runbook.md`
- `{output_folder}/planning-artifacts/architecture/tenant-provisioning-flow.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions for each file:
- Both files exist at their specified paths
- Files are readable and contain valid markdown
- Procedural steps are numbered and sequenced properly
- References between runbook and provisioning flow are consistent

## Expected Artifact Structure

The tenant-onboarding-runbook.md should contain:
- Prerequisites and pre-onboarding checklist
- Step-by-step Onboarding Procedures
- Configuration Templates and parameter guidance
- Validation Checkpoints at each stage
- Rollback Procedures for failed onboarding

The tenant-provisioning-flow.md should contain:
- Provisioning Workflow diagram or description
- Resource Creation sequence and dependencies
- Integration Points with external systems
- Automated vs Manual step identification
- Completion Criteria and success verification

## Error Handling Guidance

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If one file exists but the other is missing, report which file is absent and note that complete onboarding validation requires both the operational runbook and the technical provisioning flow documentation.

## Next Step

Once both artifacts are successfully loaded and initial structure is confirmed, proceed to Step 2: Validate Artifact to perform detailed quality criteria checks.
