# Step 04: Design Hard Deletion and Cleanup

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔥 **IRREVERSIBLE OPERATION** - Ensure all safeguards are documented
- 📋 **AUDIT LOG PRESERVATION** - Compliance requires audit trail retention

## EXECUTION PROTOCOLS

- 🎯 Focus: Design hard deletion sequence and resource cleanup
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Data purge, storage cleanup, cache invalidation, audit preservation
- 🚫 Do NOT: Design grace period (that's Step 03)
- 🔍 Use web search: Verify GDPR right-to-erasure implementation patterns
- ⚠️ Note: Audit log preservation is CRITICAL for compliance

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Data purge sequence (respects foreign keys)
- Storage cleanup (files, backups, replicas)
- Cache invalidation strategy
- Event subscription cleanup
- Audit log preservation for compliance

**OUT OF SCOPE:**
- Grace period design (Step 03)
- Export process (Step 02)
- Final compilation (Step 05)

---

## Purpose

Design the hard deletion and cleanup process that permanently removes tenant data after the grace period expires. This must respect database constraints, clean up all storage layers, and preserve audit trails for compliance.

---

## Prerequisites

- Step 03 completed: Grace period designed
- Data category inventory from Step 01
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-deletion
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Data category inventory from Step 01
- Module dependencies from Step 01
- Grace period design from Step 03
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Design the comprehensive hard deletion and cleanup process for tenant offboarding.

---

## Main Sequence

### 1. Define Deletion Preconditions

Before initiating hard deletion, verify:

| Check | Criteria | Blocking |
|-------|----------|----------|
| Grace period expired | `grace_period_ends_at < NOW()` | YES |
| No legal hold | `legal_hold = false` | YES |
| Export completed | `export_status = 'completed'` | NO (warn) |
| No pending transactions | `pending_amount = 0` | YES |
| No active subscriptions | `subscription_status = 'cancelled'` | YES |
| Final reminder sent | `last_reminder_sent_at IS NOT NULL` | NO (warn) |

**Pre-Deletion Checklist:**

- [ ] **CRITICAL:** Verify grace period has fully expired
- [ ] **CRITICAL:** Confirm no legal hold or investigation
- [ ] **CRITICAL:** Verify tenant export was offered/completed
- [ ] Confirm no outstanding financial obligations
- [ ] Log deletion initiation to audit trail

### 2. Design Data Purge Sequence

Define deletion order respecting foreign key constraints:

| Order | Module | Tables/Collections | Dependencies | Method |
|-------|--------|-------------------|--------------|--------|
| 1 | Notifications | notifications, delivery_log | None | Hard delete |
| 2 | Sessions | sessions, tokens, refresh_tokens | None | Hard delete |
| 3 | Integrations | integration_configs, webhooks, api_keys | None | Hard delete + revoke |
| 4 | AI/Agents | conversations, messages, agent_runs | None | Hard delete |
| 5 | Documents | documents, file_metadata | References entities | Hard delete |
| 6 | Billing | invoices, payments, subscriptions | References users | Anonymize or delete |
| 7 | Business Data | {domain_entities} | References users | Hard delete |
| 8 | Identity | users, roles, permissions | Core reference | Hard delete |
| 9 | Tenant | tenants, tenant_settings | Root entity | Hard delete |

**Deletion Strategy by Data Type:**

| Data Type | Strategy | Rationale |
|-----------|----------|-----------|
| Transactional | Hard delete | No retention requirement |
| Financial | Anonymize OR delete | Depends on tax requirements |
| Audit logs | Preserve anonymized | Compliance requirement |
| PII | Hard delete | GDPR right to erasure |
| System metadata | Hard delete | No value after tenant gone |

### 3. Design Foreign Key Handling

Handle referential integrity during deletion:

#### 3.1 CASCADE DELETE Pattern

```sql
-- Tables with CASCADE DELETE configured
-- Child records automatically deleted with parent

-- Example: Notifications depend on users
ALTER TABLE notifications
  ADD CONSTRAINT fk_notifications_user
  FOREIGN KEY (user_id) REFERENCES users(id)
  ON DELETE CASCADE;
```

#### 3.2 NULLIFY Pattern

```sql
-- Tables where reference should be nullified, not cascaded
-- Used for optional relationships

-- Example: Activity log references optional user
UPDATE activity_log
SET user_id = NULL, user_email = '[deleted]'
WHERE tenant_id = '{{tenant_id}}';
```

#### 3.3 Sequential Delete Pattern

```sql
-- Tables requiring explicit ordered deletion
-- Used when CASCADE is not appropriate

-- Step 1: Delete child records explicitly
DELETE FROM invoice_line_items
WHERE invoice_id IN (
  SELECT id FROM invoices WHERE tenant_id = '{{tenant_id}}'
);

-- Step 2: Delete parent records
DELETE FROM invoices WHERE tenant_id = '{{tenant_id}}';
```

### 4. Design Storage Cleanup

Clean up all storage layers:

#### 4.1 File Storage Cleanup

| Storage Type | Location Pattern | Cleanup Method | Verification |
|--------------|------------------|----------------|--------------|
| User uploads | `/{tenant_id}/uploads/` | Delete prefix | List should be empty |
| Documents | `/{tenant_id}/documents/` | Delete prefix | List should be empty |
| Exports | `/{tenant_id}/exports/` | Delete prefix | List should be empty |
| Backups | `/{tenant_id}/backups/` | Delete prefix | List should be empty |
| Temp files | `/tmp/{tenant_id}/` | Delete prefix | List should be empty |

**Object Storage Cleanup Sequence:**

```
1. List all objects with prefix /{tenant_id}/
2. Batch delete objects (1000 per request)
3. Delete any versioned objects
4. Delete bucket lifecycle rules for tenant
5. Verify prefix is empty
6. Remove tenant from storage quotas
```

#### 4.2 Backup Cleanup

| Backup Type | Retention | Cleanup Timing |
|-------------|-----------|----------------|
| Database snapshots | 30 days post-deletion | Async cleanup job |
| File backups | 30 days post-deletion | Async cleanup job |
| Log archives | Preserve anonymized | Never fully delete |

**Backup Cleanup Strategy:**

```
┌─────────────────────────────────────────────────┐
│ Tenant Deletion (Day 0)                         │
│  └── Mark backups for delayed deletion          │
│                                                 │
│ Day 1-30: Backups still recoverable (disaster)  │
│                                                 │
│ Day 30+: Backup cleanup job runs               │
│  └── Permanently delete tenant backup files     │
│  └── Remove from backup catalogs                │
└─────────────────────────────────────────────────┘
```

### 5. Design Cache Invalidation

Remove all cached data for tenant:

| Cache Type | Key Pattern | Invalidation Method |
|------------|-------------|---------------------|
| Session cache | `session:{tenant_id}:*` | Delete pattern |
| User cache | `user:{tenant_id}:*` | Delete pattern |
| Data cache | `data:{tenant_id}:*` | Delete pattern |
| Query cache | `query:{tenant_id}:*` | Delete pattern |
| Rate limits | `ratelimit:{tenant_id}:*` | Delete pattern |
| Feature flags | `feature:{tenant_id}:*` | Delete pattern |

**Cache Cleanup Sequence:**

```
1. Scan for all keys matching tenant pattern
2. Delete in batches (avoid blocking)
3. Clear CDN cache for tenant assets
4. Remove from distributed cache clusters
5. Verify no cached data remains
```

#### 5.1 CDN Cache Purge

| CDN Type | Purge Method | Scope |
|----------|--------------|-------|
| CloudFront | CreateInvalidation | `/{tenant_subdomain}/*` |
| Cloudflare | PurgeCache | Zone + tag |
| Fastly | Purge by surrogate key | `tenant-{id}` |

### 6. Design Event Subscription Cleanup

Remove tenant from event systems:

| Event System | Cleanup Action | Verification |
|--------------|----------------|--------------|
| Message queues | Delete tenant queues, purge messages | Queue list empty |
| Event subscriptions | Remove all subscriptions | No active subscriptions |
| Webhooks | Delete outbound webhook configs | Config list empty |
| Scheduled jobs | Cancel tenant jobs | No scheduled tasks |
| Pub/Sub topics | Remove tenant subscriptions | Subscription list empty |

**Event Cleanup Sequence:**

```
1. Cancel all scheduled jobs for tenant
2. Unsubscribe from all event topics
3. Delete tenant-specific message queues
4. Purge any in-flight messages
5. Remove webhook configurations
6. Delete dead letter queue entries
```

### 7. Design Audit Log Preservation

Preserve audit trail while anonymizing PII:

#### 7.1 Audit Log Anonymization

| Field | Before | After | Method |
|-------|--------|-------|--------|
| `tenant_id` | `abc123` | `[DELETED-abc123]` | Prefix |
| `user_email` | `john@example.com` | `[deleted]@tenant` | Replace |
| `user_name` | `John Doe` | `[Deleted User]` | Replace |
| `ip_address` | `192.168.1.1` | `[redacted]` | Replace |
| `action` | `LOGIN` | `LOGIN` | Preserve |
| `timestamp` | `2024-01-15` | `2024-01-15` | Preserve |
| `resource_id` | `doc-456` | `[deleted]` | Replace |

#### 7.2 Audit Retention Policy

| Audit Category | Retention | Format |
|----------------|-----------|--------|
| Security events | 7 years | Anonymized |
| Access logs | 7 years | Anonymized |
| Compliance events | 10 years | Anonymized |
| System events | 2 years | Anonymized |

**Audit Preservation SQL:**

```sql
-- Anonymize audit logs while preserving structure
UPDATE audit_log SET
  user_email = '[deleted]@' || tenant_id,
  user_name = '[Deleted User]',
  ip_address = '[redacted]',
  user_agent = '[redacted]',
  request_body = NULL,
  response_body = NULL
WHERE tenant_id = '{{tenant_id}}';

-- Mark tenant as deleted in audit context
INSERT INTO audit_log (
  tenant_id, action, details, created_at
) VALUES (
  '{{tenant_id}}',
  'TENANT_DELETED',
  '{"deletion_date": "{{date}}", "data_purged": true}',
  NOW()
);
```

### 8. Design Deletion Job Architecture

Structure the deletion as a reliable background job:

| Phase | Actions | Timeout | Retryable |
|-------|---------|---------|-----------|
| Pre-check | Verify preconditions | 30s | YES |
| Revoke access | Disable logins, revoke tokens | 60s | YES |
| Export reminder | Final export notification | 30s | YES |
| Data deletion | Execute purge sequence | 30min | PARTIAL |
| Storage cleanup | Delete files, caches | 30min | YES |
| Event cleanup | Remove subscriptions | 5min | YES |
| Audit anonymize | Preserve anonymized logs | 10min | YES |
| Finalize | Mark deleted, notify | 60s | YES |

**Job State Machine:**

```
pending ──► running ──► completed
                │
                ├──► partial_failure ──► retry
                │
                └──► failed ──► manual_review
```

### 9. Rollback and Recovery

Design safeguards for deletion failures:

| Failure Point | Recovery Action |
|---------------|-----------------|
| Data deletion failed | Rollback transaction, retry |
| Storage cleanup failed | Mark for async retry |
| Cache invalidation failed | Non-blocking, retry later |
| Audit anonymization failed | Manual intervention required |
| Job timeout | Resume from checkpoint |

**Checkpoint System:**

```json
{
  "jobId": "{{uuid}}",
  "tenantId": "{{tenant_id}}",
  "startedAt": "{{timestamp}}",
  "checkpoint": {
    "phase": "data_deletion",
    "module": "billing",
    "lastProcessed": "{{record_id}}",
    "recordsDeleted": 5420
  },
  "status": "running"
}
```

---

## COLLABORATION MENUS (A/P/C):

After completing hard deletion design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific deletion scenarios
- **P (Party Mode)**: Bring security and compliance perspectives
- **C (Continue)**: Accept design and proceed to compile final document
- **[Specific concerns]**: Describe areas to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: deletion sequence, audit preservation, recovery patterns
- Process enhanced insights on secure deletion practices
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review hard deletion and cleanup design: {summary}"
- Process Security Architect and Compliance Officer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document hard deletion design
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## SUCCESS METRICS:

- [ ] Data purge sequence respects foreign keys
- [ ] All storage layers cleaned
- [ ] Cache invalidation complete
- [ ] Event subscriptions removed
- [ ] Audit logs preserved and anonymized
- [ ] Job architecture supports reliability

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Foreign key violation | Reorder deletion sequence |
| Storage deletion timeout | Retry with smaller batches |
| Cache cluster unreachable | Mark for async retry |
| Audit anonymization error | Manual review required |

---

## Verification

- [ ] Deletion sequence handles all data types
- [ ] Foreign key constraints respected
- [ ] Storage cleanup is comprehensive
- [ ] Cache invalidation covers all layers
- [ ] Audit trail meets compliance requirements
- [ ] Patterns align with pattern registry

---

## Outputs

- Data purge sequence
- Storage cleanup procedures
- Cache invalidation strategy
- Event subscription cleanup
- Audit log preservation rules
- Deletion job architecture

---

## NEXT STEP:

Proceed to `step-05-c-complete.md` to compile the complete offboarding design document.
