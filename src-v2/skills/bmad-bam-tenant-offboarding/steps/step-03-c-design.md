# Step 03: Design Grace Period and Soft Delete

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ⏱️ **ENSURE reversibility** - Grace period must allow tenant recovery

## EXECUTION PROTOCOLS

- 🎯 Focus: Design grace period configuration and soft delete mechanisms
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Tier-based grace periods, soft delete marking, access restrictions, reactivation
- 🚫 Do NOT: Design hard deletion (that's Step 04)
- 🔍 Use web search: Verify SaaS grace period best practices and recovery patterns
- ⚠️ Note: Data retention and compliance requirements are critical for grace period

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Grace period configuration by tier
- Soft delete marking (`tenant.status = 'pending_deletion'`)
- Access restrictions during grace period
- Reactivation workflow design

**OUT OF SCOPE:**
- Data export process (Step 02)
- Hard deletion and cleanup (Step 04)
- Final compilation (Step 05)

---

## Purpose

Design the grace period and soft delete mechanisms that allow tenants to recover their accounts during a configurable window before permanent deletion. This protects against accidental cancellations and provides a safety net for business continuity.

---

## Prerequisites

- Step 02 completed: Export process designed
- Offboarding triggers from Step 01
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: soft-delete
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- Offboarding triggers and triggers from Step 01
- Export process design from Step 02
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design the grace period and soft delete mechanisms for tenant offboarding.

---

## Main Sequence

### 1. Define Grace Period Configuration

Configure grace periods by subscription tier and trigger type:

| Tier | Voluntary Cancellation | Non-Payment | Inactivity | Terms Violation |
|------|------------------------|-------------|------------|-----------------|
| Free | 7 days | N/A | 30 days | Immediate |
| Starter | 14 days | 14 days | 60 days | 7 days |
| Professional | 30 days | 30 days | 90 days | 14 days |
| Enterprise | 60 days | 45 days | 180 days | 30 days |

**Grace Period Configuration Schema:**

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `grace_period_days` | integer | 30 | Days before hard deletion |
| `reminder_intervals` | array | [7, 3, 1] | Days before deletion to send reminders |
| `auto_export` | boolean | true | Automatically create export before deletion |
| `allow_reactivation` | boolean | true | Permit tenant to reactivate |
| `reactivation_fee` | decimal | 0.00 | Fee to reactivate (if applicable) |

### 2. Design Soft Delete Mechanism

Define how tenants are marked for deletion without immediately removing data:

#### 2.1 Tenant Status Transitions

```
active
    │
    └── (cancellation/trigger) ──► pending_cancellation
                                          │
                                          ├── (reactivation) ──► active
                                          │
                                          └── (grace period expires) ──► pending_deletion
                                                                               │
                                                                               ├── (reactivation*) ──► active
                                                                               │
                                                                               └── (deletion job) ──► deleting ──► deleted
```

*Reactivation from `pending_deletion` may require additional verification

#### 2.2 Soft Delete Fields

| Field | Type | Description |
|-------|------|-------------|
| `tenant.status` | enum | Current lifecycle state |
| `tenant.cancellation_requested_at` | timestamp | When cancellation initiated |
| `tenant.grace_period_ends_at` | timestamp | When hard deletion scheduled |
| `tenant.cancellation_reason` | enum | Why tenant is leaving |
| `tenant.cancelled_by` | uuid | User who initiated cancellation |
| `tenant.deletion_scheduled_at` | timestamp | When deletion will execute |
| `tenant.last_reminder_sent_at` | timestamp | Track reminder notifications |

#### 2.3 Soft Delete SQL Pattern

```sql
-- Mark tenant for deletion (soft delete)
UPDATE tenants SET
  status = 'pending_cancellation',
  cancellation_requested_at = NOW(),
  grace_period_ends_at = NOW() + INTERVAL '{{grace_period_days}} days',
  cancellation_reason = '{{reason}}',
  cancelled_by = '{{user_id}}'
WHERE tenant_id = '{{tenant_id}}';

-- Create audit record
INSERT INTO tenant_audit_log (tenant_id, action, details, created_at)
VALUES ('{{tenant_id}}', 'CANCELLATION_INITIATED', '{{details}}', NOW());
```

### 3. Design Access Restrictions

Define what tenants can access during grace period:

| Phase | Read Access | Write Access | Admin Access | Billing |
|-------|-------------|--------------|--------------|---------|
| `pending_cancellation` | FULL | LIMITED | FULL | View only |
| `suspended` | FULL | NONE | LIMITED | View only |
| `pending_deletion` | EXPORT ONLY | NONE | NONE | NONE |
| `deleting` | NONE | NONE | NONE | NONE |

**Access Control Implementation:**

| Access Type | `pending_cancellation` | `suspended` | `pending_deletion` |
|-------------|------------------------|-------------|-------------------|
| API reads | Allowed | Allowed | Blocked |
| API writes | Blocked | Blocked | Blocked |
| UI login | Allowed + banner | Allowed + banner | Blocked |
| Export data | Allowed | Allowed | Allowed |
| Invite users | Blocked | Blocked | Blocked |
| Billing changes | Blocked | Blocked | Blocked |
| Reactivation | Allowed | Allowed | Limited |
| Integrations | Suspended | Suspended | Disconnected |

**User Experience During Grace Period:**

```
┌─────────────────────────────────────────────────────────────┐
│ ⚠️ Your account is scheduled for deletion on {{date}}.     │
│                                                              │
│ Days remaining: {{days}}                                     │
│                                                              │
│ [Download Your Data]  [Reactivate Account]  [Contact Support]│
└─────────────────────────────────────────────────────────────┘
```

### 4. Design Notification Schedule

Configure notifications throughout the grace period:

| Timing | Channel | Template | Action |
|--------|---------|----------|--------|
| Immediately | Email | `cancellation_confirmed` | Confirm cancellation, explain grace period |
| 7 days before | Email | `deletion_warning_7` | Reminder with export CTA |
| 3 days before | Email + In-app | `deletion_warning_3` | Urgent reminder |
| 1 day before | Email + SMS | `deletion_warning_1` | Final warning |
| Day of deletion | Email | `deletion_executed` | Confirmation of deletion |

**Notification Content:**

| Template | Subject | Key Information |
|----------|---------|-----------------|
| `cancellation_confirmed` | "Your {{product}} account cancellation" | Grace period end date, reactivation link, export link |
| `deletion_warning_7` | "7 days until your account is deleted" | Export reminder, reactivation instructions |
| `deletion_warning_3` | "URGENT: 3 days until account deletion" | Strong export CTA, support contact |
| `deletion_warning_1` | "FINAL: Your account will be deleted tomorrow" | Last chance messaging |
| `deletion_executed` | "Your {{product}} account has been deleted" | Confirmation, compliance info |

### 5. Design Reactivation Workflow

Define how a cancelled tenant can reactivate their account:

#### 5.1 Reactivation Eligibility

| Current Status | Reactivation Allowed | Requirements |
|----------------|---------------------|--------------|
| `pending_cancellation` | YES | None |
| `suspended` | YES | Resolve suspension cause |
| `pending_deletion` | LIMITED | Admin approval + verification |
| `deleting` | NO | Too late |
| `deleted` | NO | Data already purged |

#### 5.2 Reactivation Process

```
1. Tenant initiates reactivation (API/UI)
2. Verify eligibility based on status
3. If pending_cancellation:
   - Clear cancellation fields
   - Restore status to 'active'
   - Resume billing if applicable
4. If suspended:
   - Verify suspension resolved
   - Clear suspension fields
   - Restore status to 'active'
5. If pending_deletion:
   - Require admin approval
   - Verify identity (MFA)
   - Cancel deletion job
   - Restore status to 'active'
6. Send reactivation confirmation
7. Log audit trail
```

#### 5.3 Reactivation Fee Structure

| Tier | Fee | Waiver Conditions |
|------|-----|-------------------|
| Free | $0 | N/A |
| Starter | $0 | First reactivation |
| Professional | $25 | Enterprise upgrade |
| Enterprise | Custom | Contract negotiation |

### 6. Handle Edge Cases

Design for special scenarios:

| Scenario | Handling |
|----------|----------|
| Multiple cancellation requests | Use earliest, notify of duplicate |
| Cancellation during trial | Immediate, no grace period |
| Cancellation with pending invoices | Require payment or write-off |
| Admin override | Allow immediate deletion with approval |
| Legal hold | Block deletion, preserve data |
| Dispute/chargeback | Suspend, await resolution |

### 7. Audit Trail Requirements

Log all grace period events:

| Event | Fields | Retention |
|-------|--------|-----------|
| Cancellation initiated | tenant_id, reason, user, timestamp | Permanent |
| Reminder sent | tenant_id, template, channel, timestamp | 1 year |
| Reactivation | tenant_id, user, previous_status, timestamp | Permanent |
| Deletion scheduled | tenant_id, scheduled_date, timestamp | Permanent |
| Deletion executed | tenant_id, data_summary, timestamp | Permanent |

---

## COLLABORATION MENUS (A/P/C):

After completing grace period design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific grace period scenarios
- **P (Party Mode)**: Bring product and customer success perspectives
- **C (Continue)**: Accept design and proceed to hard deletion design
- **[Specific concerns]**: Describe areas to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: grace periods, reactivation flow, access restrictions
- Process enhanced insights on customer retention patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review grace period and soft delete design: {summary}"
- Process Product Manager and Customer Success perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document grace period design
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## SUCCESS METRICS:

- [ ] Grace period configuration by tier defined
- [ ] Soft delete mechanism designed
- [ ] Access restrictions documented
- [ ] Notification schedule configured
- [ ] Reactivation workflow complete
- [ ] Edge cases handled

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Grace period too short | Extend based on tier and feedback |
| Reactivation failures | Manual admin intervention |
| Notification delivery failure | Retry with alternative channel |
| Status transition error | Manual correction + audit |

---

## Verification

- [ ] Grace periods align with tier value
- [ ] Soft delete preserves data integrity
- [ ] Access restrictions are enforceable
- [ ] Notifications are actionable
- [ ] Reactivation flow is reversible
- [ ] Patterns align with pattern registry

---

## Outputs

- Grace period configuration table
- Soft delete mechanism design
- Access restriction matrix
- Notification schedule
- Reactivation workflow
- Edge case handling

---

## NEXT STEP:

Proceed to `step-04-c-document.md` to design hard deletion and cleanup processes.
