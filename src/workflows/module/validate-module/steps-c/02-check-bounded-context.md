# Step 2: Check Bounded Context

Validate the module's bounded context definition and domain model integrity.

## Bounded Context Validation

### QG-M1: Identity and Context

- [ ] **Business capability** clearly stated
  - Must describe a single, cohesive business capability
  - Should not overlap with other modules' capabilities

- [ ] **Ubiquitous language** defined
  - Key domain terms documented
  - Terms consistent with master architecture glossary

- [ ] **Context boundaries** explicit
  - Clear statement of what is IN scope
  - Clear statement of what is OUT of scope
  - Boundary rationale documented

### Domain Model Integrity

- [ ] **Aggregate roots** defined
  - Each aggregate has a single root entity
  - Aggregate boundaries documented
  - Invariants protected by root

- [ ] **Entity compliance**
  - ALL entities have `tenant_id` field
  - ALL entities extend `BaseEntity` from master architecture
  - Entity relationships documented (ownership, references)

- [ ] **Value objects** identified
  - Immutable value types documented
  - No identity, only equality

- [ ] **Lifecycle rules** documented
  - Entity creation constraints
  - State transitions defined
  - Deletion/archival rules

## Validation Results

For each check, record:

```markdown
| Check | Status | Finding |
|-------|--------|---------|
| Business capability | PASS/FAIL | {detail} |
| Ubiquitous language | PASS/FAIL | {detail} |
| Context boundaries | PASS/FAIL | {detail} |
| Aggregate roots | PASS/FAIL | {detail} |
| Entity compliance | PASS/FAIL | {detail} |
| Value objects | PASS/FAIL | {detail} |
| Lifecycle rules | PASS/FAIL | {detail} |
```

## Blocking Issues

Flag as BLOCKING if:
- No bounded context definition
- Entities missing `tenant_id`
- Entities not extending `BaseEntity`
- Aggregate boundaries unclear
