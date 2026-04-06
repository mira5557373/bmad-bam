# Step 5: Dependencies

## Purpose
Declare and validate all module dependencies including consumed facades and subscribed events to ensure proper decoupling.

## Actions

- List consumed facades:
  - Module name and facade version
  - Specific methods used from each facade
  - Reason for dependency (what capability is needed)
  - Fallback behavior if dependency unavailable

- List consumed events:
  - Event type name and publisher module
  - Event schema version subscribed to
  - Handler behavior (idempotent, at-least-once)
  - Error handling strategy for failed events

- Verify facade contracts exist:
  - Each dependency must have published facade interface
  - Version compatibility check
  - Breaking change impact assessment

- Validate no circular dependencies:
  - Draw dependency graph
  - Identify any cycles
  - Resolve cycles via events or shared kernel

## Outputs
- Dependency manifest (facades with versions)
- Event subscription manifest
- Dependency graph diagram
- Circular dependency analysis report

## Questions to Consider
- Can any synchronous facade calls be replaced with events?
- What is the impact if a dependency is unavailable?
- Are you depending on stable or experimental facades?

**SIMPLE modules:** Skip if 0-1 dependencies
