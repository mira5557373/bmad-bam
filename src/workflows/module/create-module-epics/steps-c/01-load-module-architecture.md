# Step 1: Load Module Architecture

Load the module architecture document that will serve as the foundation for epic generation.

## Required Inputs

1. Load the target module architecture: `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`
2. Load the master architecture for context: `{output_folder}/planning-artifacts/architecture/master-architecture.md` (sections 1-6)
3. If dependencies declared, load facade contracts for each dependent module

## Validation

Before proceeding, verify:

- [ ] Module architecture document exists
- [ ] Module has passed foundation gate (QG-M1)
- [ ] Bounded context is clearly defined
- [ ] Domain model section is complete (aggregate roots, entities, value objects)
- [ ] Public facade design is documented

If the module architecture is missing or incomplete, inform the user and suggest running `create-module-architecture` first.

## Extract Key Information

Parse and capture from the module architecture:

- **Module identity**: name, bounded context, business capability
- **Complexity classification**: SIMPLE, STANDARD, or COMPLEX
- **Domain model**: aggregate roots, entities, relationships
- **Public facade**: methods, DTOs, error types
- **Dependencies**: consumed facades, consumed events
- **AI behaviors**: agents, tools, memory scope (if applicable)

Present a summary of the module architecture to confirm correct target before proceeding.
