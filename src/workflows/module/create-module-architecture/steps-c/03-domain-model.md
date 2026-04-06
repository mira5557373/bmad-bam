# Step 3: Domain Model

## Purpose
Design the module's domain model including aggregate roots, entities, value objects, and business invariants that enforce domain rules.

## Actions

- Identify aggregate roots:
  - What are the main transactional boundaries?
  - Each aggregate has one root entity
  - Aggregates are loaded/saved as a unit

- Define entities:
  - ALL entities must include `tenant_id` field
  - ALL entities must extend `BaseEntity` from master architecture
  - Include standard fields: id, created_at, updated_at
  - Define entity-specific fields and types

- Design value objects:
  - Immutable objects representing domain concepts
  - Examples: EmailAddress, Money, DateRange
  - Validation rules embedded in value object

- Document invariants:
  - Business rules that must always be true
  - Cross-entity constraints within aggregate
  - State transition rules

- Map entity relationships:
  - One-to-many, many-to-many relationships
  - Ownership vs. reference relationships
  - Cascade delete rules

## Outputs
- Entity class diagrams with fields and types
- Aggregate boundary documentation
- Invariant rule specifications
- Entity lifecycle state machines

## Questions to Consider
- Is the aggregate boundary too large or too small?
- Are there entities that should be value objects?
- How do you handle cross-aggregate references?
