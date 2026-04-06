# Step 1: Identify Modules

Determine which modules are involved in the cross-module story:

## Feature Analysis

- Break down the feature request into distinct capabilities
- Map each capability to the responsible module
- Identify any capabilities that don't map to existing modules

## Module Identification

For each module involved:
- Module name and owner
- Module's responsibility boundary
- Current state (stable, under development, frozen)
- Team contact and availability

## Module Categories

Classify involvement by type:

**Primary Modules:**
- Own significant new functionality
- Require substantial code changes
- Will have dedicated stories

**Supporting Modules:**
- Provide existing capabilities to be consumed
- May need minor changes or new endpoints
- Will have integration tasks

**Observing Modules:**
- Need awareness of changes
- May be affected indirectly
- No code changes required

## Scope Confirmation

- [ ] All necessary modules identified
- [ ] No module boundaries violated by feature design
- [ ] Module owners aware and available
- [ ] Feature fits within master architecture constraints

Output: Module involvement matrix with roles and contacts.
