# Step 2: Validate Module Architecture

## Validation Checklist

### Identity and Context
- [ ] Module bounded context clearly defined
- [ ] Business capability owned is documented
- [ ] Module owner/team identified
- [ ] Purpose statement present

### Master Architecture Inheritance
- [ ] Inheritance reference to master architecture present
- [ ] Relevant patterns from master architecture applied
- [ ] Inherited constraints documented
- [ ] Shared kernel interfaces identified for implementation

### Domain Model
- [ ] Aggregate roots defined
- [ ] All entities have `tenant_id`
- [ ] All entities follow `BaseEntity` from master architecture
- [ ] Entity relationships documented
- [ ] Lifecycle rules defined
- [ ] Invariants documented

### Public Facade
- [ ] Facade methods defined (all tenant-scoped)
- [ ] Input/output DTOs defined
- [ ] Error types follow master architecture error contract
- [ ] Facade follows template from master architecture

### Dependencies
- [ ] Consumed facades declared with version
- [ ] Consumed events declared
- [ ] Each dependency has a facade contract
- [ ] No circular dependencies
- [ ] SIMPLE modules: appropriately skipped if 0-1 dependencies

### Events Published
- [ ] Domain events defined with payload schemas
- [ ] All events include `tenant_id` in payload
- [ ] Publishing rules documented
- [ ] SIMPLE modules: appropriately skipped if CRUD-only

### Module-Specific Decisions
- [ ] Module ADRs documented where patterns deviate from master
- [ ] No unauthorized deviations from master architecture
- [ ] SIMPLE modules: appropriately skipped if all inherited

### AI Behaviors (if applicable)
- [ ] Agents defined for this module
- [ ] Tool permissions within policy bounds
- [ ] Memory scope correctly declared
- [ ] Appropriately skipped if module has no AI involvement

### Assembly Quality
- [ ] Module context summary (`module-context.md`) generated
- [ ] Module registered in sprint-status.yaml
- [ ] Document internally consistent
- [ ] Complexity classification matches actual module scope

## Gate Decision

- **PASS**: All applicable sections complete, master architecture constraints met, no circular dependencies
- **CONDITIONAL**: Minor gaps (e.g., AI behaviors TBD for future sprint) — document gaps and proceed
- **FAIL**: Missing domain model, undefined facade, circular dependencies, or entities without tenant_id — return to Create mode

Present validation results with specific findings for each section.
