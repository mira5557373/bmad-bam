# Step 05: Compile Offboarding Design Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present soft gate checkpoint** before completing workflow

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile complete offboarding design document
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: All design elements from Steps 01-04
- 🚫 Do NOT: Re-design components (use existing findings)
- 🔍 Use web search: Verify GDPR Article 17 compliance checklist
- ⚠️ Note: Document must address compliance verification and rollback procedures

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling executive summary
- Creating offboarding state machine diagram
- Documenting compliance verification (GDPR right-to-deletion)
- Defining rollback procedures
- Generating final output artifact

**OUT OF SCOPE:**
- Redesigning export, grace period, or deletion (Steps 02-04)
- Implementation details (architecture document only)

---

## Purpose

Compile the complete tenant offboarding design document by synthesizing all design elements from Steps 01-04 into a cohesive, actionable specification that addresses compliance requirements and operational procedures.

---

## Prerequisites

- Step 04 completed: Hard deletion designed
- All design elements from Steps 01-04 available
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-offboarding.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Offboarding scope from Step 01
- Data export design from Step 02
- Grace period design from Step 03
- Hard deletion design from Step 04
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Compile the complete tenant offboarding design document.

---

## Main Sequence

### 1. Create Executive Summary

Summarize the offboarding design at a high level:

| Component | Summary |
|-----------|---------|
| **Tenant Model** | {{tenant_model}} |
| **Compliance** | {{frameworks}} (GDPR, CCPA, etc.) |
| **Export Format** | {{export_formats}} |
| **Grace Periods** | {{grace_period_range}} days (tier-dependent) |
| **Deletion Method** | Phased deletion with audit preservation |
| **Reactivation** | Supported during grace period |

**Key Decisions:**

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data export format | JSON/CSV archive | Portable, machine-readable |
| Grace period by tier | 7-60 days | Business value alignment |
| Audit retention | 7 years anonymized | Compliance requirement |
| Deletion approach | Ordered cascade | Foreign key safety |

**Risk Summary:**

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Accidental deletion | LOW | HIGH | Grace period + confirmation |
| Incomplete cleanup | MEDIUM | MEDIUM | Verification jobs |
| Compliance violation | LOW | HIGH | Audit trail preservation |

### 2. Create Offboarding State Machine Diagram

Document the complete tenant lifecycle for offboarding:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      TENANT OFFBOARDING STATE MACHINE                       │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌──────────┐
                              │  ACTIVE  │
                              └────┬─────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │  CANCELLATION   │  │   NON-PAYMENT   │  │    VIOLATION    │
    │   (voluntary)   │  │   (automated)   │  │   (immediate)   │
    └────────┬────────┘  └────────┬────────┘  └────────┬────────┘
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  │
                                  ▼
                        ┌─────────────────┐
                        │    PENDING      │◄───────────────────┐
                        │  CANCELLATION   │                    │
                        └────────┬────────┘                    │
                                 │                             │
              ┌──────────────────┤                             │
              │                  │                             │
              ▼                  ▼                             │
    ┌─────────────────┐  ┌─────────────────┐                   │
    │  REACTIVATED    │  │   SUSPENDED     │    REACTIVATION   │
    │  (back to       │  │ (access limited)│───────────────────┤
    │   active)       │  └────────┬────────┘                   │
    └─────────────────┘           │                            │
                                  │ grace period expires       │
                                  ▼                            │
                        ┌─────────────────┐                    │
                        │    PENDING      │────────────────────┘
                        │    DELETION     │    (limited reactivation)
                        └────────┬────────┘
                                 │
                                 │ deletion job triggered
                                 ▼
                        ┌─────────────────┐
                        │    DELETING     │
                        │ (irreversible)  │
                        └────────┬────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │    DELETED      │  │   ANONYMIZED    │  │     FAILED      │
    │  (data purged)  │  │ (data preserved │  │ (manual review) │
    │                 │  │   anonymized)   │  │                 │
    └─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 3. Document Compliance Verification

Verify GDPR Article 17 (Right to Erasure) compliance:

#### 3.1 GDPR Right to Erasure Checklist

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| Data subject can request deletion | Self-service or API | COMPLIANT |
| Deletion within 30 days | Grace period + deletion | COMPLIANT |
| Third-party notification | Integration cleanup | COMPLIANT |
| Verifiable deletion | Audit log + checksum | COMPLIANT |
| Exceptions documented | Legal hold support | COMPLIANT |

#### 3.2 CCPA Compliance Checklist

| Requirement | Implementation | Status |
|-------------|----------------|--------|
| 45-day response window | Grace period design | COMPLIANT |
| Data portability | Export process | COMPLIANT |
| Deletion confirmation | Email notification | COMPLIANT |
| Service provider notification | Integration cleanup | COMPLIANT |

#### 3.3 Compliance Verification Process

```
1. Receive deletion request
2. Verify requester identity (authentication)
3. Check for legal hold or exceptions
4. Initiate grace period
5. Provide data export
6. Execute deletion after grace period
7. Send confirmation with deletion certificate
8. Retain anonymized audit log
9. Log compliance completion
```

#### 3.4 Deletion Certificate

| Field | Value |
|-------|-------|
| Certificate ID | {{uuid}} |
| Tenant ID | {{tenant_id}} |
| Deletion Requested | {{request_date}} |
| Deletion Completed | {{completion_date}} |
| Data Categories Deleted | {{categories}} |
| Compliance Frameworks | GDPR, CCPA |
| Verification Hash | {{sha256}} |

### 4. Document Rollback Procedures

Define recovery procedures for failed or erroneous deletions:

#### 4.1 Rollback Scenarios

| Scenario | Recovery Method | Time Window |
|----------|-----------------|-------------|
| Accidental cancellation | Reactivate during grace period | Grace period |
| Deletion job failure | Resume from checkpoint | Indefinite |
| Erroneous deletion request | Restore from backup | 30 days |
| Legal hold missed | Halt deletion, preserve remaining | Immediate |

#### 4.2 Backup Recovery Process

```
1. Identify deletion to recover
2. Locate backup snapshot (within 30 days)
3. Create recovery tenant ID
4. Restore database records
5. Restore file storage
6. Reconcile with current state
7. Notify tenant of recovery
8. Document incident
```

#### 4.3 Partial Recovery

| Component | Recoverable | Recovery Method |
|-----------|-------------|-----------------|
| Database records | YES (30 days) | Point-in-time restore |
| File storage | YES (30 days) | Versioned restore |
| Cache data | NO | Must regenerate |
| Event history | PARTIAL | From audit logs |
| Integrations | MANUAL | Reconfigure |

### 5. Compile Complete Design Document

Generate the final offboarding design document:

#### 5.1 Document Structure

```markdown
# Tenant Offboarding Design

## Document Metadata
- Version: 1.0
- Date: {{date}}
- Author: {{author}}
- Status: DRAFT/REVIEW/APPROVED

## Executive Summary
[From Section 1]

## Offboarding Triggers
[From Step 01]

## Data Export Process
[From Step 02]

## Grace Period and Soft Delete
[From Step 03]

## Hard Deletion and Cleanup
[From Step 04]

## State Machine
[From Section 2]

## Compliance Verification
[From Section 3]

## Rollback Procedures
[From Section 4]

## Appendices
- A: Data Category Inventory
- B: Module Dependency Map
- C: Notification Templates
- D: Compliance Checklist
```

### 6. Output Design Document

Write the compiled design document to:

```
{output_folder}/planning-artifacts/tenant-offboarding-design.md
```

Include:
- All sections from Steps 01-04
- State machine diagram
- Compliance verification checklist
- Rollback procedures
- Appendices with detailed specifications

---

## COLLABORATION MENUS (A/P/C):

After compiling the offboarding design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific design aspects
- **P (Party Mode)**: Bring leadership perspectives for final review
- **C (Continue)**: Accept design and complete workflow
- **[Specific concerns]**: Describe areas to review further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete offboarding design, compliance concerns, rollback procedures
- Process enhanced insights on operational readiness
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, update document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review complete tenant offboarding design: {summary}"
- Process Legal, Security, and Operations perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save offboarding design to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Workflow complete

---

## Soft Gate Checkpoint

**Steps 1-5 complete the tenant offboarding design workflow.**

Present summary of:
- Offboarding triggers and scope
- Export process design
- Grace period configuration
- Hard deletion sequence
- Compliance verification
- Rollback procedures

Ask for confirmation before finalizing document.

---

## SUCCESS METRICS:

- [ ] Executive summary captures key decisions
- [ ] State machine diagram is complete
- [ ] Compliance verification addresses GDPR/CCPA
- [ ] Rollback procedures documented
- [ ] Design document generated
- [ ] All steps integrated

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing design elements | Return to incomplete step |
| Compliance gaps | Add missing requirements |
| Incomplete state machine | Review with legal/compliance |

---

## Verification

- [ ] All design elements from Steps 01-04 included
- [ ] State machine covers all transitions
- [ ] Compliance checklist complete
- [ ] Rollback procedures actionable
- [ ] Document artifact generated
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/tenant-offboarding-design.md`
- Executive summary
- Complete state machine diagram
- Compliance verification checklist
- Rollback procedures
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-offboarding.md`

---

## Recovery Protocol (If Quality Issues Found)

If review identifies issues:

### Minor Issues
1. Document specific concerns
2. Update affected sections
3. Re-run this step

### Major Issues
1. Return to relevant step (02/03/04)
2. Address design gaps
3. Re-compile document

---

## NEXT STEP:

Based on outcome:
- **Approved:** Offboarding design complete. Proceed to implementation.
- **Needs Review:** Address feedback and re-run step-05-c-complete.md
- **Major Gaps:** Return to relevant design step

## Workflow Complete

Tenant offboarding design workflow complete. Document available at:
```
{output_folder}/planning-artifacts/tenant-offboarding-design.md
```
