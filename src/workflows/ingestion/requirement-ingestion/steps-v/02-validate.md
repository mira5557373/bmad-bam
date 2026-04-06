# Step 2: Validate Requirement Ingestion

## Validation Checklist

### Requirement Coverage
- [ ] All source requirements have unique IDs
- [ ] No duplicate requirement entries
- [ ] All requirements traced to source document location
- [ ] No orphan requirements (unassigned to modules)

### Domain Categorization
- [ ] Every requirement has domain classification
- [ ] Domain boundaries are coherent (related requirements grouped)
- [ ] Ubiquitous language consistent within each domain
- [ ] Ambiguous requirements documented with rationale

### Module Mapping
- [ ] Each requirement assigned to exactly one module
- [ ] Module assignments follow single-responsibility principle
- [ ] Mapping rationale documented for non-obvious assignments
- [ ] No requirements split across modules without coordination pattern

### Cross-Cutting Concerns
- [ ] Cross-cutting requirements identified and flagged
- [ ] Security concerns isolated to appropriate module/aspect
- [ ] Observability requirements not duplicated across modules
- [ ] Tenant isolation requirements explicitly addressed

### Dependency Graph
- [ ] Dependency graph is acyclic (no circular dependencies)
- [ ] Dependencies follow allowed directions (no forbidden couplings)
- [ ] Shared kernel candidates documented
- [ ] Dependency depth reasonable (no deep chains)

### Matrix Completeness
- [ ] Requirement matrix contains all fields (ID, description, domain, module, cross-cutting, dependencies, priority)
- [ ] Index navigable and accurate
- [ ] sprint-status.yaml updated with all modules

## Gate Decision

- **PASS**: All requirements assigned, no circular dependencies, matrix complete, cross-cutting isolated
- **CONDITIONAL**: Minor gaps (e.g., some rationale missing) - document gaps and proceed
- **FAIL**: Orphan requirements, circular dependencies, or missing module assignments - return to Create/Edit mode

Present validation results with specific findings for each category.
