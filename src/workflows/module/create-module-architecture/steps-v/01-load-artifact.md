# Step 1: Load Artifact

## Purpose

This step loads the Module Architecture artifact for validation along with the Master Architecture for constraint checking. The module architecture defines a specific functional component of the platform, and must align with the overarching system design established in the master architecture.

## Artifact Locations

Load the existing module architecture document from:
- `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`

Also load the master architecture from:
- `{output_folder}/planning-artifacts/master-architecture.md` for constraint validation

## Pre-Validation Checks

Before proceeding, verify the following conditions:
- The module architecture file exists at the specified path
- The master architecture file exists for cross-reference validation
- Both files are readable and contain valid markdown
- Module name placeholder is resolved to actual module identifier

## Expected Artifact Structure

The module architecture should contain these required sections:
- Module Overview with purpose and scope
- Interface Definitions for module boundaries
- Internal Component Design and responsibilities
- Data Model specific to the module
- Integration Points with other modules
- Dependency Declarations on shared services
- Conformance Statement to master architecture constraints

## Error Handling Guidance

If the module architecture file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

If the master architecture is missing, warn that constraint validation cannot be performed but offer to proceed with structural validation only.

If the module name cannot be resolved, prompt the user to specify which module should be validated.

## Next Step

Once both artifacts are successfully loaded and initial structure is confirmed, proceed to Step 2: Validate Artifact to perform detailed quality criteria checks including master architecture conformance.
