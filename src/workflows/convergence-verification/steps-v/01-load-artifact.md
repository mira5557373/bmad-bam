# Step 1: Load Artifact

## Purpose

This step loads the Convergence Verification Report artifact for validation. The convergence report documents alignment verification between multiple architectural artifacts, ensuring consistency across the system design and identifying any divergences that require resolution.

## Artifact Location

Load the existing convergence report from `{output_folder}/planning-artifacts/quality/convergence-report.md`.

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- The file exists at the specified path
- The file is readable and contains valid markdown
- The document has proper section headers
- Cross-reference links to other artifacts are present

## Expected Artifact Structure

The convergence report should contain these required sections:
- Verification Scope listing artifacts compared
- Alignment Matrix showing consistency checks
- Divergence Findings with severity ratings
- Resolution Recommendations for each divergence
- Convergence Score with pass/fail status
- Artifact Version References for traceability

## Error Handling Guidance

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the file exists but lacks required sections or contains broken cross-references, document the specific issues and prompt the user for guidance on how to proceed with partial data.

## Next Step

Once the artifact is successfully loaded and initial structure is confirmed, proceed to Step 2: Validate Artifact to perform detailed quality criteria checks.
