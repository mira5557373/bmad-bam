# Step 10: Load Existing Offboarding Design (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **VERIFY artifact exists** before proceeding to modifications

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing offboarding design for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Edit mode modifies existing artifact without full recreation
- 🚫 Do NOT: Generate new content; load existing content for editing

---

## Purpose

Load the existing tenant offboarding design document for modification. Edit mode allows updating specific sections like grace periods, export formats, compliance requirements, or deletion sequences without recreating the entire design from scratch.

---

## Prerequisites

- Existing offboarding design document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load the existing offboarding design and identify modification scope.

---

## Load Sequence

### 1. Load Offboarding Design Document

Load the existing offboarding design:

```
{output_folder}/planning-artifacts/tenant-offboarding-design.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Context Documents

Also load for reference:
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Tenant isolation design: `{output_folder}/planning-artifacts/tenant-isolation.md`
- Compliance frameworks: `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### 3. Parse and Display Summary

Extract and present current state:

#### 3.1 Design Overview

| Attribute | Current Value |
|-----------|---------------|
| Tenant Model | {{tenant_model}} |
| Compliance Frameworks | {{frameworks}} |
| Export Formats | {{formats}} |
| Grace Period Range | {{range}} days |
| Deletion Method | {{method}} |

#### 3.2 Section Summary

| Section | Status | Last Updated |
|---------|--------|--------------|
| Offboarding Triggers | {{status}} | {{date}} |
| Data Export Process | {{status}} | {{date}} |
| Grace Period Design | {{status}} | {{date}} |
| Hard Deletion Process | {{status}} | {{date}} |
| Compliance Verification | {{status}} | {{date}} |
| Rollback Procedures | {{status}} | {{date}} |

#### 3.3 Document Metadata

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Author | {{author}} |

### 4. Identify Modification Scope

Ask the user which sections need modification:

- [ ] Update offboarding triggers
- [ ] Modify data export formats or delivery
- [ ] Adjust grace period configuration
- [ ] Update soft delete mechanism
- [ ] Modify hard deletion sequence
- [ ] Update storage cleanup procedures
- [ ] Modify audit log preservation
- [ ] Update compliance requirements
- [ ] Adjust rollback procedures
- [ ] Update state machine transitions
- [ ] Modify notification schedule

Capture the specific changes requested before proceeding.

### 5. Validate Current State

Before editing, verify:

| Check | Status |
|-------|--------|
| Document format valid | YES/NO |
| All required sections present | YES/NO |
| State machine defined | YES/NO |
| Compliance checklist complete | YES/NO |
| Rollback procedures documented | YES/NO |

### 6. Extract Section to Modify

Based on user selection, load the specific section(s):

#### Export Process Section
- Data scope definition
- Format specifications
- Delivery mechanisms
- Verification checksum

#### Grace Period Section
- Period configuration by tier
- Soft delete fields
- Access restrictions
- Notification schedule

#### Hard Deletion Section
- Purge sequence
- Storage cleanup
- Cache invalidation
- Audit preservation

#### Compliance Section
- GDPR verification
- CCPA verification
- Deletion certificate

---

## SUCCESS METRICS:

- [ ] Offboarding design loaded successfully
- [ ] Current configuration extracted
- [ ] Modification scope identified
- [ ] User confirmed changes to make

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Design not found | Switch to Create mode |
| Design format invalid | Regenerate from template |
| Missing required sections | Add missing sections during edit |

---

## Verification

- [ ] Offboarding design loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current offboarding design
- Confirmed modification scope from user

---

## NEXT STEP:

Proceed to `step-11-e-apply.md` with confirmed modification scope.
