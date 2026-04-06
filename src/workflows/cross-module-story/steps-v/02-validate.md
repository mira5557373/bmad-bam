# Step 2: Validate Cross-Module Story

## Validation Checklist

### Module Identification
- [ ] All necessary modules identified
- [ ] Module roles classified (primary/supporting/observing)
- [ ] Module owners identified and available
- [ ] No module boundary violations

### Dependencies
- [ ] All dependencies mapped (data/functional/temporal)
- [ ] Critical path identified
- [ ] No circular dependencies
- [ ] New contracts required are documented

### Integration Points
- [ ] All cross-module interactions specified
- [ ] Facade calls fully documented
- [ ] Event schemas defined
- [ ] Contract tests planned
- [ ] Tenant context propagation verified

### Coordinated Stories
- [ ] Story for each primary module created
- [ ] Dependencies between stories linked
- [ ] Acceptance criteria include integration requirements
- [ ] Coordination schedule realistic
- [ ] Sync points defined

### Cross-Cutting
- [ ] Feature aligns with master architecture
- [ ] Tenant isolation maintained across modules
- [ ] No single module creates bottleneck
- [ ] Risk mitigation strategies documented

### Story Quality
- [ ] Stories follow standard template
- [ ] Acceptance criteria are testable
- [ ] Estimates reasonable given dependencies
- [ ] Module owners have reviewed their stories

## Gate Decision

- **PASS**: All modules identified, dependencies clear, stories coordinated, integration planned
- **CONDITIONAL**: Minor gaps (e.g., some contracts TBD) — document and proceed with risk awareness
- **FAIL**: Missing module identification, circular dependencies, or no integration strategy

Present validation results with specific findings for each component.
