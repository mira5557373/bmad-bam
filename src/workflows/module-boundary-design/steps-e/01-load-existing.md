# Step 1: Load Existing Artifact

Load the existing module boundaries document for modification.

## Load Artifacts

Load the existing module boundaries document:
- `{output_folder}/planning-artifacts/architecture/module-boundaries.md`

If the file does not exist, inform the user and suggest switching to Create mode.

## Also Load Context

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Individual module architectures (if exist): `{output_folder}/planning-artifacts/modules/*/architecture.md`
- Sprint status: `{output_folder}/sprint-status.yaml`

## Parse and Display Summary

Extract and present:

1. **Module Catalog**
   - Total module count
   - Module names and owners
   - Complexity classifications

2. **Dependency Overview**
   - Dependency graph summary
   - Circular dependencies (should be 0)
   - Most depended-upon modules

3. **Bounded Contexts**
   - Context count
   - Context-to-module mapping

4. **Facade Summary**
   - Modules with defined facades
   - Cross-module integration patterns

5. **Data Ownership**
   - Entities per module
   - Shared kernel entities

## Confirm Modification Scope

Ask the user which sections need modification:

- [ ] Add new module(s)
- [ ] Modify existing module boundaries
- [ ] Update dependency graph
- [ ] Refine facade interfaces
- [ ] Change data ownership
- [ ] Split or merge modules
- [ ] Update extraction readiness scores

Capture the specific changes requested before proceeding.
