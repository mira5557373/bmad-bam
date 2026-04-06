# Step 2: Validate Facade Contract

## Validation Checklist

### Contract Structure
- [ ] Contract has valid version (semver format)
- [ ] Provider module is identified
- [ ] Contract status is specified (draft/published/deprecated)
- [ ] Change history is documented

### Interface Definitions
- [ ] All operations have clear method signatures
- [ ] Operations include tenant context parameter
- [ ] Query operations return defined response types
- [ ] Command operations specify success/failure outcomes
- [ ] Operations are use-case-oriented (not CRUD)

### Data Transfer Objects
- [ ] All DTOs have complete schema definitions
- [ ] Required vs optional fields are marked
- [ ] Field-level validation rules are documented
- [ ] No internal domain objects exposed directly
- [ ] Pagination strategy defined for collections

### Tenant Context
- [ ] Tenant context propagation method specified
- [ ] All operations respect tenant boundaries
- [ ] Context validation rules documented
- [ ] Missing context handling defined

### Error Handling
- [ ] Error response schema defined
- [ ] Error codes enumerated with descriptions
- [ ] Retriable errors identified
- [ ] Partial failure handling documented (for batch operations)

### Cross-Cutting
- [ ] Contract consistent with master architecture boundary rules
- [ ] Shared kernel types used for common concepts
- [ ] No circular dependencies between modules

## Gate Decision

- **PASS**: All checklist items complete, no inconsistencies
- **CONDITIONAL**: Minor documentation gaps - note gaps and proceed
- **FAIL**: Missing interface definitions, undefined DTOs, or no tenant context handling - return to Create/Edit mode

Present validation results with specific findings for each category.
