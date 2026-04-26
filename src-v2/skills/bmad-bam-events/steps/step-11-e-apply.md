# Step 11: Apply Targeted Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **Validate consistency** after applying changes

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications to event architecture
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Incremental updates preserving architecture integrity
- 🚫 Do NOT: Regenerate entire document; apply targeted changes only

---

## Purpose

Apply the identified changes to the existing event architecture document. Changes are applied incrementally while preserving architecture integrity, maintaining tenant isolation constraints, and ensuring consistency across all sections.

---

## Prerequisites

- Step 10 (Load Existing Architecture) completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Apply requested changes to the event architecture while maintaining consistency.

---

## Apply Sequence

### Modification Process

Based on the user's requested changes:

#### Updating Event Envelope

1. Load current envelope section
2. Identify fields to add/modify/remove
3. Verify tenant_id and correlation_id preserved (CRITICAL)
4. Update CloudEvents compliance if affected
5. Document breaking changes if any

| Field Changed | Previous | New | Breaking |
|---------------|----------|-----|----------|
| {{field}} | {{prev}} | {{new}} | YES/NO |

#### Updating Event Schemas

1. Load current event catalog
2. Identify events to add/modify
3. Apply versioning rules for changes
4. Update schema version numbers
5. Document backward compatibility

| Event | Change Type | New Version | Compatible |
|-------|-------------|-------------|------------|
| {{event}} | Added/Modified/Removed | v{{version}} | YES/NO |

#### Updating Topic Configuration

1. Load current topic naming
2. Apply naming convention changes
3. Verify tenant isolation preserved
4. Update partition strategy if affected
5. Document migration requirements

| Topic | Previous | New | Migration Needed |
|-------|----------|-----|------------------|
| {{topic}} | {{prev}} | {{new}} | YES/NO |

#### Updating Routing Configuration

1. Load current routing design
2. Apply DLQ changes if requested
3. Update replay configuration
4. Verify tenant-scoped access preserved
5. Update monitoring thresholds

| Configuration | Previous | New |
|---------------|----------|-----|
| {{config}} | {{prev}} | {{new}} |

#### Updating Processing Configuration

1. Load current consumer configuration
2. Apply idempotency changes
3. Update ordering guarantees
4. Verify tenant context propagation
5. Document consumer group changes

| Consumer Group | Change | Impact |
|----------------|--------|--------|
| {{group}} | {{change}} | {{impact}} |

#### Updating Saga Patterns

1. Load current saga definitions
2. Apply state machine changes
3. Update compensation logic
4. Verify tenant isolation in sagas
5. Document timeout/retry changes

| Saga | Change | New State Machine |
|------|--------|-------------------|
| {{saga}} | {{change}} | {{states}} |

#### Updating AI Runtime Events

1. Load current AI runtime events
2. Add/modify agent event definitions
3. Update tool execution events
4. Verify tenant context in all events
5. Update billing integration if affected

| AI Event | Change | Consumer Impact |
|----------|--------|-----------------|
| {{event}} | {{change}} | {{impact}} |

### Validation After Changes

Before saving, verify:

- [ ] Tenant isolation preserved in all changes
- [ ] Event envelope still includes tenant_id
- [ ] Schema versioning rules followed
- [ ] Topic naming convention consistent
- [ ] Consumer configuration valid
- [ ] Saga patterns tenant-scoped
- [ ] Version number incremented
- [ ] Change log updated

### Cross-Reference Validation

| Check | Status |
|-------|--------|
| Envelope consistent with catalog | YES/NO |
| Topics match routing design | YES/NO |
| Consumers match processing design | YES/NO |
| Sagas reference valid events | YES/NO |

### Change Summary

Present a diff summary of changes made:

| Section | Change Type | Details |
|---------|-------------|---------|
| Event Envelope | {{type}} | {{details}} |
| Event Schemas | {{type}} | {{details}} |
| Topic Configuration | {{type}} | {{details}} |
| Processing Configuration | {{type}} | {{details}} |
| Saga Patterns | {{type}} | {{details}} |
| AI Runtime Events | {{type}} | {{details}} |

### Output

Write updated document to:
```
{output_folder}/planning-artifacts/event-architecture.md
```

Update document metadata:
- Version: Increment
- Last Modified: Current date
- Change Log: Add entry

---

## SUCCESS METRICS:

- [ ] All requested changes applied
- [ ] Tenant isolation preserved
- [ ] Architecture consistency maintained
- [ ] Version incremented
- [ ] Change log updated
- [ ] Document saved successfully

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Tenant isolation broken | Revert change, add tenant context |
| Schema version conflict | Apply proper version bump |
| Consumer config invalid | Re-verify consumer settings |
| Saga state inconsistent | Review state machine transitions |

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Tenant isolation intact
- [ ] All cross-references valid
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated `event-architecture.md`
- Change summary

---

## NEXT STEP:

Edit mode complete. Options:
- Run validation mode to verify changes
- Return to workflow selection
- Proceed to implementation if architecture complete
