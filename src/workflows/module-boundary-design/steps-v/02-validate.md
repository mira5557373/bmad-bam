# Step 2: Validate Module Boundaries

## Validation Checklist

### Data Ownership

- [ ] Every entity is owned by exactly one module
- [ ] No orphaned entities (entities without module ownership)
- [ ] No dual ownership (entity owned by multiple modules)
- [ ] All entities have `tenant_id` requirement documented
- [ ] Shared kernel entities explicitly identified and justified

### Dependency Integrity

- [ ] No circular dependencies (direct or indirect)
- [ ] Dependency graph is documented
- [ ] Mermaid diagram present and accurate
- [ ] All dependencies use facade contracts (no internal imports)
- [ ] Dependency direction follows business capability hierarchy

### Bounded Context Quality

- [ ] Each bounded context has clear business capability
- [ ] Ubiquitous language defined per context
- [ ] Context boundaries are explicit (IN scope, OUT of scope)
- [ ] Context-to-module mapping is documented

### Facade Completeness

- [ ] Every module has a public facade defined
- [ ] All facade methods are tenant-scoped
- [ ] DTOs defined for inputs and outputs
- [ ] Error types specified per method
- [ ] Consumer list documented for each facade

### Module Catalog Quality

- [ ] Every module has an owner assigned
- [ ] Purpose statement present for each module
- [ ] Complexity classification assigned (SIMPLE/STANDARD/COMPLEX)
- [ ] Extraction readiness scored

### Consistency Checks

- [ ] Module count matches bounded context analysis
- [ ] Dependencies match facade method usage
- [ ] Data ownership matches entity definitions
- [ ] No modules without defined boundaries

### Business Alignment

- [ ] All business capabilities from PRD/brief are covered
- [ ] No redundant modules (overlapping capabilities)
- [ ] Module granularity appropriate for team size

## Validation Results

| Check | Status | Finding |
|-------|--------|---------|
| Data ownership | PASS/FAIL | {detail} |
| Dependency integrity | PASS/FAIL | {detail} |
| Bounded contexts | PASS/FAIL | {detail} |
| Facade completeness | PASS/FAIL | {detail} |
| Module catalog | PASS/FAIL | {detail} |
| Consistency | PASS/FAIL | {detail} |
| Business alignment | PASS/FAIL | {detail} |

## Gate Decision

- **PASS**: All data owned, no cycles, facades complete, aligned with business
- **CONDITIONAL**: Minor gaps (e.g., some extraction scores TBD) - document and proceed
- **FAIL**: Circular dependencies, unowned data, missing facades - return to Create/Edit mode

Present validation results with specific findings and recommendations.
