# Step 1: Load Module Artifacts

Load all module artifacts required for comprehensive validation.

## Required Artifacts

Load the following documents:

1. **Module Architecture** (required)
   - `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`

2. **Master Architecture** (required)
   - `{output_folder}/planning-artifacts/architecture/master-architecture.md`

3. **Module Epics** (if exists)
   - `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

4. **Dependent Module Facades** (if dependencies declared)
   - `{output_folder}/planning-artifacts/modules/{dependency-name}/architecture.md` (facade section)

5. **Sprint Status** (for gate tracking)
   - `{output_folder}/sprint-status.yaml`

## Validation Prerequisites

If module architecture does not exist:
- Inform user: "Module architecture not found. Cannot validate."
- Suggest: "Run `create-module-architecture` first."
- Exit validation.

## Extract Module Metadata

Parse from module architecture:

- **Module name**: identifier used throughout validation
- **Complexity classification**: SIMPLE, STANDARD, or COMPLEX
- **Bounded context**: business capability owned
- **Dependencies**: list of consumed facades and events

## Prepare Validation Context

Create validation context containing:

```yaml
module:
  name: {module-name}
  complexity: {SIMPLE|STANDARD|COMPLEX}
  context: {bounded-context-description}
  
master_constraints:
  base_entity: {required fields}
  error_contract: {error structure}
  facade_template: {required methods}
  
dependencies:
  facades: [{list}]
  events: [{list}]
```

Present module summary and confirm validation target before proceeding.
