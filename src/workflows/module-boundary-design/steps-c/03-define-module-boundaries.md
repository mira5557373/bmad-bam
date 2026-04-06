# Step 3: Define Module Boundaries

Map bounded contexts to implementable modules with clear ownership.

## Context-to-Module Mapping

### Mapping Rules

1. **1:1 mapping** (preferred): One bounded context = one module
2. **1:N mapping** (rare): One context split into multiple modules only for:
   - Team scaling (>5 developers need separate modules)
   - Deployment independence requirements
   - Significantly different scaling characteristics

3. **N:1 mapping** (avoid): Multiple contexts in one module indicates:
   - Contexts should be merged (they're not truly separate)
   - Module is too large and needs splitting

## Module Definition Template

For each module:

```markdown
## Module: {ModuleName}

**Bounded Context:** {context name}
**Business Capability:** {capability owned}
**Owner Team:** {team name}

### Data Ownership

| Entity | Owned By | tenant_id Required |
|--------|----------|-------------------|
| {Entity1} | This module | YES |
| {Entity2} | This module | YES |

### Module Boundaries

**IN Scope:**
- {responsibility 1}
- {responsibility 2}

**OUT of Scope:**
- {explicitly excluded responsibility}

### Complexity Classification

- [ ] SIMPLE: Single aggregate, CRUD operations, 0-1 dependencies
- [ ] STANDARD: Multiple aggregates, business logic, 2-4 dependencies
- [ ] COMPLEX: Multiple subdomains, AI behaviors, 5+ dependencies
```

## Data Ownership Verification

For every entity in the system:

- [ ] Entity is owned by exactly one module
- [ ] No entity is orphaned (unowned)
- [ ] No entity has dual ownership
- [ ] All entities have `tenant_id`

## Extraction Readiness Score

Rate each module's extraction readiness (ability to become a separate service):

| Score | Criteria |
|-------|----------|
| HIGH | Clear boundaries, few sync dependencies, event-driven integration |
| MEDIUM | Some sync dependencies, but facade abstracts internals |
| LOW | Many sync dependencies, shared database tables, complex transactions |

## Output

Document:
- Complete module list with boundaries
- Data ownership matrix
- Complexity classification per module
- Extraction readiness scores

Present module boundary definitions for confirmation.
