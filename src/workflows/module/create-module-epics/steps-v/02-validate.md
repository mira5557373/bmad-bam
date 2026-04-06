# Step 2: Validate Module Epics

## Validation Checklist

### Epic Structure

- [ ] Epic count appropriate for module complexity (SIMPLE: 1-2, STANDARD: 3-5, COMPLEX: 5+)
- [ ] Each epic has clear boundary definition
- [ ] Each epic owns complete operations for its aggregates
- [ ] No overlapping aggregate ownership between epics
- [ ] Dependencies between epics are documented

### Story Completeness

- [ ] Each story follows the standard template
- [ ] All stories have unique IDs
- [ ] Priority assigned to all stories (P1/P2/P3)
- [ ] User story format complete (As a/I want/So that)
- [ ] Module scope section present
- [ ] Tenant context section present

### Module Boundary Compliance

- [ ] All stories implementable within module boundary
- [ ] Cross-module needs reference facade contracts
- [ ] No stories require internal access to other modules
- [ ] Aggregate references match module architecture

### Acceptance Criteria Quality

- [ ] Every story has at least one acceptance criterion
- [ ] Given/When/Then format used consistently
- [ ] Tenant isolation criteria present where applicable
- [ ] Facade contract criteria present for facade-modifying stories
- [ ] AI behavior criteria present for AI-enabled stories

### Spike Stories (COMPLEX modules)

- [ ] Spike stories exist for all identified unknowns
- [ ] Spike stories have clear research objectives
- [ ] Spike stories are scheduled before dependent implementation stories

### Architecture Alignment

- [ ] All aggregates from architecture are covered by stories
- [ ] All facade methods have corresponding stories
- [ ] All published events have stories for emission
- [ ] AI behaviors from architecture have stories

### BAM Developer Notes

- [ ] Module boundary enforcement guidance present
- [ ] Tenant context access documented
- [ ] Facade dependencies listed with versions
- [ ] Testing requirements specified

## Gate Decision

- **PASS**: All applicable sections complete, stories within module boundary, acceptance criteria present
- **CONDITIONAL**: Minor gaps (e.g., some BAM dev notes TBD) - document gaps and proceed
- **FAIL**: Stories cross module boundaries, missing acceptance criteria, or architecture misalignment - return to Create/Edit mode

Present validation results with specific findings for each section.
