# Step 04: Design Sharing Rules and Cross-Tenant Access

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER define sharing rules without isolation model from Step 03
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ✅ CRITICAL: Default to DENY ALL - sharing must be explicitly granted
- 📋 Document all sharing rules with audit trail requirements
- 💬 Present sharing rule design with A/P/C menu for user confirmation
- 🌐 Use web search to verify current cross-tenant access patterns

---

## EXECUTION PROTOCOLS

- 🎯 Present sharing rules organized by category (Platform, Organization, Explicit, Time-Bounded)
- 💾 Record sharing rule design in output document for artifact generation
- 📖 Reference `tenant-models.csv` for isolation compatibility
- 📖 Reference `bam-patterns.csv` for sharing patterns
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag any sharing rules that could compromise tenant isolation
- 🔍 Use web search to verify secure cross-tenant access patterns

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Isolation model from Step 03, tenant hierarchy from Step 02, requirements from Step 01
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Output:** Sharing rules and cross-tenant access design
- **Quality gate:** Sharing rules inform QG-M2 (Tenant Isolation Gate) checklist

---

## YOUR TASK

Design a comprehensive sharing rule system that enables controlled cross-tenant data access while preserving isolation integrity. Default to deny-all posture, then define explicit sharing mechanisms across four categories: Platform, Organization, Explicit Grant, and Time-Bounded access. Present design via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Load Sharing Pattern Resources

Read the sharing pattern resources:

| Resource | Location | Purpose |
|----------|----------|---------|
| Pattern registry | `{project-root}/_bmad/bam/data/bam-patterns.csv` | Cross-tenant patterns, access rules |
| Tenant models | `{project-root}/_bmad/bam/data/tenant-models.csv` | Isolation constraints, sharing implications |

**Action:** Confirm resources loaded before designing sharing rules.

---

### 2. Extract Key Context from Prior Steps

Pull decision factors from gathered context:

| Factor | Source | Value |
|--------|--------|-------|
| Isolation Model | Step 03 | `{isolation_model}` (RLS/Schema/Database) |
| Isolation Enforcement | Step 03 | `{enforcement_strategy}` |
| Tenant Hierarchy | Step 02 | `{hierarchy_type}` (flat/parent-child/reseller) |
| Regulatory Constraints | Step 01 | `{compliance_requirements}` |
| Data Classification | Step 01 | `{data_sensitivity}` |
| Cross-Tenant Features | Step 01 | `{sharing_requirements}` |

**Present extracted context to confirm correct inputs loaded.**

---

### 3. Define Default Isolation Policy (Deny All)

Establish the baseline security posture:

```markdown
### Default Isolation Policy

**Principle:** All tenant data is isolated by default. No cross-tenant access unless explicitly granted.

**Baseline Rules:**
| Rule ID | Rule | Enforcement |
|---------|------|-------------|
| ISO-001 | Tenant data invisible to other tenants | {enforcement_mechanism} |
| ISO-002 | System queries include tenant context | {context_injection} |
| ISO-003 | API requests validate tenant ownership | {validation_layer} |
| ISO-004 | Background jobs scope to single tenant | {job_isolation} |
| ISO-005 | Logs exclude cross-tenant identifiers | {log_sanitization} |

**Enforcement Mechanism by Isolation Model:**

| Model | Enforcement | Bypass Prevention |
|-------|-------------|-------------------|
| RLS | PostgreSQL policies on all tables | Session context validation |
| Schema | Schema routing + search_path | Connection string verification |
| Database | Connection pool per tenant | Credential isolation |

**Violation Detection:**
- Query audit for missing tenant context
- Runtime assertion for tenant_id presence
- Integration tests for isolation boundaries
```

---

### 4. Design Platform Sharing Rules

Define system-wide shared resources that all tenants can access:

| Category | Description | Example |
|----------|-------------|---------|
| Platform | System-wide shared resources | Feature flags, templates |

```markdown
### Platform Sharing Rules

**Shared Resource Categories:**

| Resource Type | Scope | Access Pattern | Example |
|---------------|-------|----------------|---------|
| Feature Flags | Global read | Read-only, no tenant context | `feature_enabled('new_ui')` |
| System Templates | Global read | Read-only, versioned | Email templates, report formats |
| Reference Data | Global read | Read-only, cached | Countries, currencies, timezones |
| Configuration | Global read | Read-only, environment-specific | API endpoints, rate limits |
| Announcements | Global read | Read-only, time-bounded | System maintenance notices |

**Implementation Pattern:**

| Pattern | Mechanism | Isolation Impact |
|---------|-----------|------------------|
| Separate Tables | `platform_*` tables without tenant_id | Zero isolation impact |
| Shared Schema | Public schema in schema-per-tenant | Explicit schema qualification |
| Read Replicas | Cached copies in tenant context | No write-back capability |

**Access Control Matrix:**

| Resource | Create | Read | Update | Delete |
|----------|--------|------|--------|--------|
| Feature Flags | Platform Admin | All Tenants | Platform Admin | Platform Admin |
| Templates | Platform Admin | All Tenants | Platform Admin | Platform Admin |
| Reference Data | System | All Tenants | System | System |
| Config | Deployment | All Tenants | Deployment | Deployment |

**Security Guardrails:**
- Platform resources NEVER contain tenant data
- No tenant-specific filtering on platform queries
- Audit log for platform resource modifications
```

---

### 5. Design Organization Hierarchy Sharing

Define parent-child and enterprise sharing patterns:

| Category | Description | Example |
|----------|-------------|---------|
| Organization | Parent-child sharing | Enterprise + subsidiaries |

```markdown
### Organization Hierarchy Sharing Rules

**Hierarchy Models:**

| Model | Structure | Data Flow | Use Case |
|-------|-----------|-----------|----------|
| Flat | Single level | None | Simple SaaS |
| Parent-Child | Two levels | Parent → Child (configurable) | Enterprise with departments |
| Multi-Level | N levels | Cascading with limits | Resellers with sub-resellers |
| Consortium | Peer groups | Bidirectional within group | Partner networks |

**Selected Hierarchy: {hierarchy_type}**

**Sharing Direction Matrix:**

| Relationship | Upward (Child→Parent) | Downward (Parent→Child) | Lateral (Sibling) |
|--------------|----------------------|-------------------------|-------------------|
| Reporting Data | Aggregated only | Full visibility (opt-in) | Never |
| User Management | Escalation only | Provisioning allowed | Never |
| Configuration | Inherit defaults | Push settings | Never |
| Billing | Usage rollup | Credit allocation | Never |

**Implementation Pattern:**

```yaml
# Organization hierarchy rules
hierarchy_rules:
  parent_visibility:
    enabled: true
    scope: [aggregated_metrics, user_list, billing_summary]
    exclude: [raw_data, audit_logs, credentials]
  
  child_inheritance:
    enabled: true
    scope: [settings, templates, feature_flags]
    override_allowed: true
  
  data_sharing:
    direction: downward_only
    consent_required: true
    audit_logged: true
```

**Cross-Org Query Pattern:**

| Query Type | Allowed | Mechanism | Example |
|------------|---------|-----------|---------|
| Parent reads child aggregate | Yes (if enabled) | View + tenant hierarchy filter | `SELECT SUM(usage) WHERE parent_id = ?` |
| Parent reads child detail | Conditional | Explicit grant + audit | Requires child consent |
| Child reads parent | No | Blocked | N/A |
| Child reads sibling | No | Blocked | N/A |
```

---

### 6. Design Explicit Grant Sharing (Whitelisting)

Define specific tenant-to-tenant sharing patterns:

| Category | Description | Example |
|----------|-------------|---------|
| Explicit Grant | Specific tenant-to-tenant | Partner data access |

```markdown
### Explicit Sharing Grant Rules

**Grant Types:**

| Grant Type | Duration | Scope | Revocation | Use Case |
|------------|----------|-------|------------|----------|
| Partner Access | Indefinite until revoked | Specific resources | Immediate | API integrations |
| Collaboration | Project-scoped | Shared workspace | End of project | Joint ventures |
| Data Export | One-time | Snapshot | N/A (already exported) | Migration |
| Delegate Access | Session-based | User permissions | Session end | Act on behalf |

**Grant Model Schema:**

| Field | Type | Description |
|-------|------|-------------|
| grant_id | UUID | Unique grant identifier |
| grantor_tenant_id | UUID | Tenant granting access |
| grantee_tenant_id | UUID | Tenant receiving access |
| resource_type | enum | Type of resource shared |
| resource_scope | jsonb | Specific resources or filters |
| permissions | enum[] | [read, write, delete, admin] |
| granted_at | timestamp | Grant creation time |
| granted_by | UUID | User who created grant |
| expires_at | timestamp | Optional expiration |
| revoked_at | timestamp | Revocation time if revoked |
| audit_reason | text | Business justification |

**Permission Escalation Prevention:**

| Rule | Enforcement |
|------|-------------|
| Grantee cannot re-share | Grant chain blocked |
| Grantee permissions <= Grantor permissions | Permission ceiling check |
| Grant scope cannot exceed grantor's access | Scope validation |
| Admin cannot grant cross-tenant admin | Admin isolation |

**Query Pattern with Grants:**

```yaml
# Access check pseudocode
access_check:
  1_default_isolation: "DENY if tenant_id != current_tenant"
  2_explicit_grant: "ALLOW if valid_grant(resource, current_tenant)"
  3_permission_check: "ALLOW if grant.permissions includes requested_action"
  4_audit_log: "LOG access with grant_id reference"
```

**Consent and Notification:**

| Event | Grantor Notification | Grantee Notification | Audit |
|-------|---------------------|---------------------|-------|
| Grant Created | Email + In-app | Email + In-app | Full |
| Grant Used | Activity log | None | Full |
| Grant Expiring | 7-day warning | 7-day warning | Full |
| Grant Revoked | Confirmation | Access removed notice | Full |
```

---

### 7. Design Time-Bounded Access

Define temporary access patterns:

| Category | Description | Example |
|----------|-------------|---------|
| Time-Bounded | Temporary access | Support access window |

```markdown
### Time-Bounded Access Rules

**Temporary Access Types:**

| Type | Duration | Approval | Monitoring | Use Case |
|------|----------|----------|------------|----------|
| Support Access | 1-4 hours | Tenant admin | Real-time | Troubleshooting |
| Audit Access | 24-72 hours | Compliance officer | Session logged | Compliance review |
| Migration Window | 1-7 days | Platform admin | Progress tracked | Data migration |
| Emergency Access | 15-60 minutes | Break-glass | Immediate alert | Incident response |

**Time-Bounded Grant Schema:**

| Field | Type | Description |
|-------|------|-------------|
| access_id | UUID | Unique access identifier |
| access_type | enum | Type of temporary access |
| target_tenant_id | UUID | Tenant being accessed |
| accessor_id | UUID | User/service accessing |
| starts_at | timestamp | Access window start |
| ends_at | timestamp | Access window end |
| approved_by | UUID | Approver user ID |
| approval_reason | text | Justification |
| access_scope | jsonb | Limited scope definition |
| session_log | jsonb | Full activity log |

**Automatic Expiration:**

| Mechanism | Implementation | Failsafe |
|-----------|----------------|----------|
| Session timeout | Token TTL | Force logout |
| Cron cleanup | Background job | Access revocation |
| Query filter | `WHERE ends_at > NOW()` | Query-time enforcement |
| Connection termination | Kill sessions | Immediate disconnect |

**Monitoring and Alerting:**

| Trigger | Alert | Response |
|---------|-------|----------|
| Access granted | Tenant admin notified | Acknowledgment required |
| Access started | Real-time notification | Activity streaming |
| Unusual activity | Security alert | Review triggered |
| Access expired | Confirmation sent | Access removed |
| Extension requested | Approval workflow | Re-authorization |

**Break-Glass Protocol:**

| Phase | Action | Audit |
|-------|--------|-------|
| Request | Emergency access requested | Who, why, when |
| Authorization | Manager approval (async) | Approval chain |
| Access | Scoped access granted | Full session log |
| Review | Post-incident review | Mandatory within 24h |
| Cleanup | Access revoked, logs sealed | Compliance archive |
```

---

### 8. Verify Current Best Practices

Search for current sharing pattern guidance:

Search the web: "multi-tenant cross-tenant access patterns {date}"
Search the web: "SaaS data sharing security best practices {date}"
Search the web: "tenant isolation break-glass access patterns {date}"
Search the web: "row level security cross-tenant sharing PostgreSQL {date}"

_Source: [URL]_

**Incorporate findings into sharing rule design.**

---

### 9. Document Sharing Rule Enforcement

Create enforcement specification:

```markdown
### Sharing Rule Enforcement Architecture

**Enforcement Layers:**

| Layer | Mechanism | Responsibility |
|-------|-----------|----------------|
| Database | RLS policies + grant checks | Final enforcement |
| Application | Middleware + context injection | Grant resolution |
| API | Authorization middleware | Request validation |
| Audit | Event logging | Compliance trail |

**Query-Time Enforcement:**

| Isolation Model | Sharing Rule Implementation |
|-----------------|----------------------------|
| RLS | `WHERE tenant_id = current_tenant OR has_grant(tenant_id, current_tenant)` |
| Schema | Connection + explicit cross-schema grant table |
| Database | Separate connection + federated query (limited) |

**Grant Cache Strategy:**

| Aspect | Approach |
|--------|----------|
| Cache location | Application memory + Redis |
| TTL | 5 minutes (configurable) |
| Invalidation | On grant create/revoke |
| Fallback | Database lookup |

**Audit Requirements:**

| Event | Logged Data |
|-------|-------------|
| Sharing rule evaluation | tenant_id, grant_id, resource, decision |
| Cross-tenant access | accessor, target, scope, timestamp |
| Grant lifecycle | create, modify, revoke, expire |
| Policy violation | blocked access, violation type, context |
```

---

### 10. Formulate Sharing Rule Design

Synthesize analysis into clear design:

```markdown
## Sharing Rule Design Summary

### Default Policy: DENY ALL

All tenant data isolated by default. Sharing requires explicit rule.

### Sharing Categories

| Category | Status | Key Rules |
|----------|--------|-----------|
| Platform Resources | {enabled/disabled} | {summary} |
| Organization Hierarchy | {enabled/disabled} | {hierarchy_type} |
| Explicit Grants | {enabled/disabled} | {grant_types} |
| Time-Bounded Access | {enabled/disabled} | {access_types} |

### Implementation Requirements

| Requirement | Implementation |
|-------------|----------------|
| Grant storage | `tenant_sharing_grants` table |
| Access check | Middleware + RLS policy |
| Audit logging | Event stream to audit service |
| Cache invalidation | Pub/sub on grant changes |
| Admin UI | Grant management dashboard |

### Security Controls

| Control | Implementation |
|---------|----------------|
| Consent capture | Digital signature on grants |
| Permission ceiling | Grantor scope validation |
| Chain prevention | No re-sharing allowed |
| Expiration enforcement | Automatic revocation |

### Trade-offs Accepted

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| Query complexity | Minor performance impact | Grant cache |
| Admin overhead | Grant management burden | Self-service UI |
| Audit volume | Storage growth | Retention policy |
```

---

## COLLABORATION MENUS (A/P/C):

After presenting sharing rule design:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into sharing security concerns
- **P (Party Mode)**: Bring security, compliance, and architect perspectives
- **C (Continue)**: Accept sharing rules and proceed to completion

Select an option:
```

### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Security depth:** Cross-tenant attack vectors and mitigations
- **Compliance nuances:** GDPR, SOC2, HIPAA implications for sharing
- **Audit requirements:** Retention, immutability, access patterns
- **Performance impact:** Grant check overhead at scale
- **Edge cases:** Revocation timing, race conditions, cache staleness

Pass context: isolation model, sharing requirements, compliance needs.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review sharing rule design for {project_name}:
- Default policy: DENY ALL
- Platform sharing: {platform_rules}
- Organization sharing: {org_rules}
- Explicit grants: {grant_rules}
- Time-bounded: {time_rules}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Security | Attack surface | Can sharing rules be exploited? |
| Compliance | Regulatory | Do rules meet compliance requirements? |
| Architect | Integration | How do rules affect system design? |
| Operations | Management | Can rules be administered effectively? |

Process multi-perspective analysis and synthesize into refined design.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue):

1. Record the sharing rules in output document
2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze
  - step-03-c-design
  - step-04-c-document  # Add this
currentStep: step-05-c-complete
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Default DENY ALL policy established with enforcement mechanism
- ✅ Platform sharing rules defined for system-wide resources
- ✅ Organization hierarchy sharing designed with direction controls
- ✅ Explicit grant model specified with consent and audit
- ✅ Time-bounded access patterns defined with auto-expiration
- ✅ Web search performed for current sharing best practices
- ✅ Enforcement architecture documented across all layers
- ✅ Security controls specified for grant management
- ✅ User confirmed sharing design via A/P/C menu

---

## FAILURE MODES

- ❌ Allowing sharing without DENY ALL default - opens security holes
- ❌ Missing consent capture on explicit grants - compliance violation
- ❌ No automatic expiration on time-bounded access - access creep
- ❌ Skipping hierarchy direction controls - unintended data exposure
- ❌ Missing audit logging on cross-tenant access - compliance failure
- ❌ No permission ceiling check - privilege escalation risk
- ❌ Proceeding without A/P/C confirmation - user not engaged
- ❌ Skipping web search - may miss current security best practices

---

## NEXT STEP

After user confirms sharing rule design with 'C':

1. Record all sharing rules in tenant isolation document
2. Proceed to `step-05-c-complete.md` to generate the complete artifact
3. The sharing rules inform:
   - Tenant isolation document (sharing section)
   - Database schema design (grant tables)
   - Quality gate QG-M2 (sharing rule compliance criteria)

**Transition to Step 05 with:**
- Default policy: `DENY ALL`
- Platform sharing: `{platform_resources}`
- Organization sharing: `{hierarchy_type}` with `{direction_rules}`
- Explicit grants: `{grant_types}` with `{consent_model}`
- Time-bounded access: `{access_types}` with `{expiration_rules}`
