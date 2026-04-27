# Step 20: Load Artifacts for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD compliance checklists** - Required for offboarding validation

## EXECUTION PROTOCOLS

- 🎯 Focus: Load offboarding design and compliance checklists
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- ⚠️ Focus: Compliance (GDPR, CCPA) and operational completeness

---

## Purpose

Load the tenant offboarding design document and all relevant compliance checklists for formal validation. This step prepares all artifacts needed to verify compliance with GDPR Article 17 (Right to Erasure), CCPA, and operational best practices.

---

## Prerequisites

- Existing offboarding design document to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-ops.md`

---

## Inputs

- Offboarding design: `{output_folder}/planning-artifacts/tenant-offboarding-design.md`
- Compliance frameworks from `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- Master architecture for cross-reference
- Tenant isolation design for cross-reference

---

## YOUR TASK:

Load all artifacts required for offboarding validation.

---

## Validation Sequence

### 1. Load Offboarding Design Document

Load the offboarding design:

```
{output_folder}/planning-artifacts/tenant-offboarding-design.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Compliance Frameworks

Load applicable compliance frameworks:

| Framework | Applicable | Requirements |
|-----------|------------|--------------|
| GDPR | YES/NO | Article 17, Article 20 |
| CCPA | YES/NO | Right to Delete, Right to Know |
| SOC 2 | YES/NO | Controlled Deletion, Audit Trail |
| HIPAA | YES/NO | De-identification, Retention |
| PCI-DSS | YES/NO | Secure Destruction |

### 3. Load Supporting Documents

Load context documents for cross-reference:

| Document | Path | Status |
|----------|------|--------|
| Master Architecture | `architecture/master-architecture.md` | Loaded/Missing |
| Tenant Isolation | `tenant-isolation.md` | Loaded/Missing |
| Data Category Inventory | (embedded in design) | Loaded/Missing |

### 4. Display Design Summary

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Status | {{status}} |

#### Current Design Overview

| Component | Status | Details |
|-----------|--------|---------|
| Offboarding Triggers | {{status}} | {{count}} triggers defined |
| Data Export | {{status}} | {{formats}} supported |
| Grace Period | {{status}} | {{range}} days |
| Hard Deletion | {{status}} | {{phases}} phases |
| Compliance | {{status}} | {{frameworks}} |
| Rollback | {{status}} | {{scenarios}} scenarios |

#### State Machine Status

| State | Defined | Transitions |
|-------|---------|-------------|
| `active` | YES/NO | {{count}} |
| `pending_cancellation` | YES/NO | {{count}} |
| `suspended` | YES/NO | {{count}} |
| `pending_deletion` | YES/NO | {{count}} |
| `deleting` | YES/NO | {{count}} |
| `deleted` | YES/NO | {{count}} |

### 5. Identify Validation Scope

Determine which aspects to validate:

- [ ] Validate GDPR Article 17 compliance
- [ ] Validate CCPA compliance
- [ ] Validate data export completeness
- [ ] Validate grace period adequacy
- [ ] Validate deletion sequence safety
- [ ] Validate audit trail preservation
- [ ] Validate rollback procedures
- [ ] Full comprehensive validation

Default: Full comprehensive validation

### 6. Prepare Validation Criteria

Extract critical checks for offboarding:

#### Compliance Critical Checks

- [ ] **CRITICAL:** Data subject can request deletion (GDPR Art 17)
- [ ] **CRITICAL:** Deletion completes within 30 days (GDPR)
- [ ] **CRITICAL:** Third-party data notification (GDPR Art 17.2)
- [ ] **CRITICAL:** Data portability offered before deletion (GDPR Art 20)
- [ ] **CRITICAL:** Audit trail preserved for compliance

#### Operational Critical Checks

- [ ] **CRITICAL:** Grace period allows tenant recovery
- [ ] **CRITICAL:** Deletion sequence respects foreign keys
- [ ] **CRITICAL:** All storage layers cleaned
- [ ] **CRITICAL:** Cache invalidation complete
- [ ] **CRITICAL:** Rollback possible within time window

---

## SUCCESS METRICS:

- [ ] Offboarding design loaded successfully
- [ ] Compliance frameworks loaded
- [ ] Supporting documents loaded
- [ ] Validation scope confirmed
- [ ] Ready for validation execution

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Design not found | Run Create mode first |
| Compliance framework missing | Check BAM installation |
| Supporting docs missing | Document as validation gap |

---

## Verification

- [ ] Offboarding design loaded correctly
- [ ] Compliance checklists available
- [ ] Validation criteria prepared
- [ ] User confirmed validation scope

---

## Outputs

- Loaded offboarding design
- Compliance frameworks ready
- Validation scope confirmed
- Critical checks identified

---

## NEXT STEP:

Proceed to `step-21-v-validate.md` to execute offboarding validation checks.
