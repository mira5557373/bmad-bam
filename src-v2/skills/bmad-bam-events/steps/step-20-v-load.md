# Step 20: Load Artifacts for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD validation checklists** - Required for validation

## EXECUTION PROTOCOLS

- 🎯 Focus: Load event architecture and validation checklists
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- ⚠️ Gate: QG-M2 (Tenant Isolation) - Event architecture validation

---

## Purpose

Load the event architecture document and all relevant validation checklists for formal validation. This step prepares all artifacts needed to execute event architecture validation checks against QG-M2 (Tenant Isolation) criteria.

---

## Prerequisites

- Existing event architecture document to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/event-architecture.md`

---

## Inputs

- Event architecture: `{output_folder}/planning-artifacts/event-architecture.md`
- Quality gate checklists from `{project-root}/_bmad/bam/data/checklists/`
- Supporting architecture documents

---

## YOUR TASK:

Load all artifacts required for event architecture validation.

---

## Validation Sequence

### 1. Load Event Architecture Document

Load the event architecture:
```
{output_folder}/planning-artifacts/event-architecture.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Validation Checklists

Load relevant validation checklists:

| Checklist | Path | Status |
|-----------|------|--------|
| QG-M2 (Tenant Isolation) | `checklists/qg-m2.md` | Loaded/Missing |
| Event Architecture | `checklists/event-architecture.md` | Loaded/Missing |
| CloudEvents Compliance | `checklists/cloudevents.md` | Loaded/Missing |

### 3. Load Supporting Documents

Load context documents for cross-reference:

| Document | Path | Status |
|----------|------|--------|
| Master Architecture | `architecture/master-architecture.md` | Loaded/Missing |
| Tenant Model Selection | From master architecture | {{tenant_model}} |
| AI Runtime Selection | From master architecture | {{ai_runtime}} |

### 4. Display Architecture Summary

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Tenant Model | {{tenant_model}} |

#### Current Architecture Components

| Component | Status | Notes |
|-----------|--------|-------|
| Event Envelope | Defined/Missing | {{notes}} |
| Schema Versioning | Defined/Missing | {{notes}} |
| Topic Strategy | Defined/Missing | {{notes}} |
| Partition Strategy | Defined/Missing | {{notes}} |
| DLQ Configuration | Defined/Missing | {{notes}} |
| Replay Capabilities | Defined/Missing | {{notes}} |
| Consumer Groups | Defined/Missing | {{notes}} |
| Idempotency | Defined/Missing | {{notes}} |
| Saga Patterns | Defined/Missing | {{notes}} |
| AI Runtime Events | Defined/Missing | {{notes}} |

### 5. Identify Validation Scope

Determine which validations to perform:

- [ ] Validate event envelope structure
- [ ] Validate tenant isolation in events
- [ ] Validate CloudEvents compliance
- [ ] Validate schema versioning strategy
- [ ] Validate topic naming convention
- [ ] Validate partition strategy
- [ ] Validate DLQ configuration
- [ ] Validate replay capabilities
- [ ] Validate consumer configuration
- [ ] Validate idempotency design
- [ ] Validate saga patterns
- [ ] Validate AI runtime integration

Default: Full validation of all components

### 6. Prepare Validation Criteria

Extract critical checks from checklists:

#### Tenant Isolation Critical Checks (QG-M2)

- [ ] **CRITICAL:** Event envelope includes tenant_id field
- [ ] **CRITICAL:** Partition strategy uses tenant_id
- [ ] **CRITICAL:** DLQ preserves tenant context
- [ ] **CRITICAL:** Replay is tenant-scoped
- [ ] **CRITICAL:** Saga patterns validate tenant at each step

#### Event Architecture Critical Checks

- [ ] **CRITICAL:** CloudEvents 1.0 compliance
- [ ] **CRITICAL:** Schema versioning strategy defined
- [ ] **CRITICAL:** Idempotency guarantees documented
- [ ] **CRITICAL:** Consumer groups configured correctly

---

## SUCCESS METRICS:

- [ ] Event architecture loaded successfully
- [ ] All validation checklists loaded
- [ ] Supporting documents loaded
- [ ] Validation scope confirmed
- [ ] Ready for validation execution

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Architecture not found | Run Create mode first |
| Checklist missing | Check BAM installation |
| Supporting docs missing | Document as validation gap |

---

## Verification

- [ ] Event architecture loaded correctly
- [ ] Validation checklists available
- [ ] Validation criteria prepared
- [ ] User confirmed validation scope

---

## Outputs

- Loaded event architecture
- Validation checklists ready
- Validation scope confirmed
- Critical checks identified

---

## NEXT STEP:

Proceed to `step-21-v-validate.md` to execute event architecture validation checks.
