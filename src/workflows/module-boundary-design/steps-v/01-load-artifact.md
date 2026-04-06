# Step 1: Load Artifact

Load the existing module boundaries document for validation.

## Load Artifacts

Load the module boundaries document:
- `{output_folder}/planning-artifacts/architecture/module-boundaries.md`

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

## Also Load Context for Validation

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Product brief/PRD: for business capability alignment
- Individual module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`

## Parse Document Structure

Extract for validation:

1. **Module Catalog**
   - Module count and names
   - Owner assignments
   - Complexity classifications

2. **Data Ownership**
   - Entity-to-module mapping
   - Shared kernel entities

3. **Dependencies**
   - Dependency matrix
   - Mermaid diagram presence

4. **Facades**
   - Facade definitions per module
   - Method signatures

5. **Bounded Contexts**
   - Context definitions
   - Context-to-module mapping

Prepare document structure for validation against quality criteria in Step 2.
