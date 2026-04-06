# Step 2: Identify Epic Boundaries

Define the epic boundaries based on module complexity and domain model structure.

## Complexity-Aware Epic Planning

Apply epic count based on module complexity classification:

| Complexity | Epic Count | Rationale |
|------------|------------|-----------|
| SIMPLE     | 1-2 epics  | Single bounded context, CRUD operations grouped |
| STANDARD   | 3-5 epics  | Multiple aggregate roots, feature-based grouping |
| COMPLEX    | 5+ epics   | Multiple subdomains, risk-based splitting required |

## Epic Boundary Identification

For each potential epic, identify:

1. **Aggregate alignment**: Which aggregate roots are covered?
2. **Feature cohesion**: What business capability is delivered?
3. **Dependency isolation**: What external facades are required?
4. **Risk profile**: Are there unknowns requiring spike stories?

## Boundary Rules

- Each epic should own complete operations for one or more aggregate roots
- Cross-aggregate operations span multiple epics only when necessary
- Facade dependencies should be minimal per epic (prefer 0-2)
- AI-enabled epics should group related agent behaviors

## Spike Story Triggers (COMPLEX modules only)

Flag for spike stories when:

- [ ] Domain model has entities with unclear boundaries
- [ ] Integration pattern not previously used in project
- [ ] AI behavior requires novel tool or memory pattern
- [ ] External system integration with unknown API characteristics
- [ ] Performance requirements need benchmarking

## Output

Document the epic boundary plan:

```
Epic 1: {name}
  - Aggregates: [list]
  - Business capability: {description}
  - Dependencies: [facades required]
  - Risk: LOW/MEDIUM/HIGH
  - Spike required: YES/NO

Epic 2: {name}
  ...
```

Present epic boundary plan for confirmation before proceeding to story generation.
