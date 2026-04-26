# Step 10: Load Existing Event Architecture (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER modify event envelope without verifying tenant_id field preservation**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: Parse all event domains** (domain, integration, system, AI runtime)
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **EXTRACT saga patterns and DLQ configurations** - critical for error recovery
- 📋 **VERIFY schema versioning strategy** before allowing schema changes

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing event architecture for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Edit mode modifies existing artifact without full recreation
- 🚫 Do NOT: Generate new content; load existing content for editing

---

## Purpose

Load the existing event architecture document for modification. Edit mode allows updating event schemas, routing configurations, processing patterns, or saga definitions without recreating the entire architecture from scratch.

---

## Prerequisites

- Existing event architecture document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load the existing event architecture document, parse the event envelope structure (including tenant_id, correlation_id, schema version fields), extract schema versioning strategy, topic naming conventions, partition strategies, saga patterns with compensation actions, and DLQ configurations. Present a summary showing event domains (domain, integration, system, AI runtime) and identify which sections the user wants to modify.

---

## Load Sequence

### 1. Load Event Architecture Document

Load the existing event architecture:
```
{output_folder}/planning-artifacts/event-architecture.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Context Documents

Also load for reference:
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`
- Event catalog: `{output_folder}/planning-artifacts/events/catalog.yaml`

### 3. Parse and Display Summary

Extract and present current state:

#### 3.1 Architecture Summary

| Component | Current Configuration |
|-----------|----------------------|
| Event Envelope | {{envelope_version}} |
| Schema Versioning | {{versioning_strategy}} |
| Topic Strategy | {{topic_strategy}} |
| Partition Strategy | {{partition_strategy}} |
| Consumer Pattern | {{consumer_pattern}} |
| Idempotency Approach | {{idempotency_approach}} |
| Saga Pattern | {{saga_pattern}} |

#### 3.2 Event Domains

| Domain | Event Count | Last Updated |
|--------|-------------|--------------|
| Domain Events | {{count}} | {{date}} |
| Integration Events | {{count}} | {{date}} |
| System Events | {{count}} | {{date}} |
| AI Runtime Events | {{count}} | {{date}} |

#### 3.3 Document Metadata

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Author | {{author}} |

### 4. Identify Modification Scope

Ask the user which sections need modification:

- [ ] Update event envelope structure
- [ ] Add/modify event schemas
- [ ] Update topic naming convention
- [ ] Modify partition strategy
- [ ] Update DLQ configuration
- [ ] Add/modify replay capabilities
- [ ] Update consumer group configuration
- [ ] Modify idempotency approach
- [ ] Add/modify saga patterns
- [ ] Update AI runtime events
- [ ] Modify implementation roadmap
- [ ] Update risk assessment

Capture the specific changes requested before proceeding.

### 5. Validate Current State

Before editing, verify:

| Check | Status |
|-------|--------|
| Document format valid | YES/NO |
| All required sections present | YES/NO |
| Event envelope defined | YES/NO |
| Tenant isolation documented | YES/NO |
| Saga patterns defined | YES/NO |

---

## SUCCESS METRICS:

- ✅ Event architecture loaded with envelope structure parsed
- ✅ Schema versioning strategy extracted (semantic versioning, compatibility rules)
- ✅ All event domains catalogued with event counts
- ✅ Saga patterns and DLQ configurations documented
- ✅ Tenant_id field presence verified in envelope specification
- ✅ Modification scope confirmed with user

---

## FAILURE MODES:

- ❌ **Event envelope missing tenant_id:** CRITICAL - cannot edit until envelope is compliant
- ❌ **Schema versioning undefined:** Block edits until versioning strategy established
- ❌ **Saga without compensation actions:** Flag incomplete saga patterns
- ❌ **DLQ not configured:** Warn that event processing failures won't be captured
- ❌ **Architecture not found:** Switch to Create mode

---

## Verification

- [ ] Event architecture loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current event architecture
- Confirmed modification scope from user

---

## NEXT STEP:

Proceed to `step-11-e-apply.md` with confirmed modification scope.
