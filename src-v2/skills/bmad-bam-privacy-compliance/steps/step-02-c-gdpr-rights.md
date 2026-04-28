# Step 02: Design Data Subject Rights Implementation

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Focus: Design implementation for GDPR Articles 15-22 data subject rights
- Track: `stepsCompleted: [1, 2]` when complete
- Context: Maintain tenant isolation awareness for all rights
- Do NOT: Implement consent management (step 5)
- Use web search: Verify current GDPR enforcement patterns and best practices

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Data subject rights implementation design
- API design for rights fulfillment
- Tenant-isolated data discovery
- Response timeline automation

**OUT OF SCOPE:**
- Lawful basis tracking (step 3)
- Data export formats (step 4)
- Consent workflows (step 5)

## Purpose

Design the implementation of GDPR data subject rights (Articles 15-22) within the multi-tenant architecture, ensuring tenant isolation while enabling automated rights fulfillment.

## Prerequisites

- Step 1 completed with applicable frameworks identified
- Tenant model confirmed (`{tenant_model}`)
- **Load context:** `{project-root}/_bmad/bam/data/domains/compliance.md`

## Actions

### 1. Map Data Subject Rights to Implementation

Reference GDPR Articles 15-22 and design implementation approach:

| Right | Article | API Endpoint | Automation | Tenant Isolation |
|-------|---------|--------------|------------|------------------|
| **Access** | Art. 15 | `GET /subjects/{id}/data` | Full | RLS filter |
| **Rectification** | Art. 16 | `PATCH /subjects/{id}/data` | Partial | RLS + audit |
| **Erasure** | Art. 17 | `DELETE /subjects/{id}` | Full | RLS + soft delete |
| **Restriction** | Art. 18 | `POST /subjects/{id}/restrict` | Partial | Processing flag |
| **Portability** | Art. 20 | `GET /subjects/{id}/export` | Full | RLS + format |
| **Objection** | Art. 21 | `POST /subjects/{id}/object` | Partial | Processing flag |
| **No Profiling** | Art. 22 | `POST /subjects/{id}/opt-out` | Full | AI exclusion flag |

**Web Research Directive:**
```
Search the web: "GDPR data subject access request automation {date}"
Search the web: "multi-tenant DSAR implementation patterns {date}"
```

### 2. Design Data Discovery Architecture

For each tenant, design how to discover all personal data:

```yaml
data_discovery:
  # Data sources per tenant
  sources:
    - name: primary_database
      type: postgresql
      tenant_column: tenant_id
      pii_tables:
        - users
        - profiles
        - transactions
      
    - name: analytics_warehouse
      type: bigquery
      tenant_column: tenant_id
      pii_tables:
        - events
        - user_attributes
      
    - name: file_storage
      type: s3
      tenant_prefix: "{tenant_id}/"
      pii_paths:
        - /uploads/
        - /documents/
      
    - name: search_index
      type: elasticsearch
      tenant_field: tenant_id
      pii_indices:
        - users
        - content
  
  # Discovery workflow
  discovery_workflow:
    parallel_scan: true
    timeout_per_source: 30s
    result_aggregation: merge
    format: json
```

### 3. Design Response Timeline Automation

GDPR requires response within one month (extendable to three for complex requests):

| Request Type | Standard Timeline | Extension | Automation Target |
|--------------|-------------------|-----------|-------------------|
| Access (Art. 15) | 30 days | +60 days | <24 hours |
| Rectification (Art. 16) | Without undue delay | N/A | <1 hour |
| Erasure (Art. 17) | Without undue delay | N/A | <24 hours |
| Portability (Art. 20) | 30 days | +60 days | <1 hour |

```yaml
timeline_automation:
  request_intake:
    - identity_verification: required
    - tenant_validation: required
    - request_classification: auto
    - acknowledgment: immediate
    
  processing:
    access_request:
      discovery: parallel
      compilation: automated
      review: optional  # Human review for sensitive cases
      delivery: automated
      
    erasure_request:
      verification: required
      soft_delete: immediate
      hard_delete: scheduled  # 30-day retention for recovery
      confirmation: automated
```

### 4. Design Tenant-Isolated Rights Fulfillment

Ensure rights fulfillment maintains strict tenant boundaries:

```yaml
tenant_isolation_for_rights:
  # Every rights operation scoped to tenant
  request_context:
    tenant_id: required
    subject_id: required
    verified: true
    
  # Prevent cross-tenant data leakage
  safeguards:
    rls_enforcement: always
    tenant_id_validation: all_queries
    audit_logging: all_operations
    
  # Multi-tenant considerations
  multi_tenant_subjects:
    # Subject may exist in multiple tenants
    handling: per_tenant_fulfillment
    coordination: none  # Each tenant independent
    
  # Enterprise tenant overrides
  enterprise_customization:
    custom_retention: allowed
    extended_timeline: allowed
    manual_review: required
```

### 5. Document Rights Implementation Design

Create implementation specification:

```markdown
## Data Subject Rights Implementation

### Right of Access (Art. 15)
**Endpoint:** `GET /api/v1/subjects/{subject_id}/data`
**Authentication:** Subject identity verified
**Tenant Isolation:** RLS filter applied
**Response Format:** JSON with all PII
**Automation Level:** Full
**Timeline:** <24 hours

### Right to Erasure (Art. 17)
**Endpoint:** `DELETE /api/v1/subjects/{subject_id}`
**Authentication:** Subject identity verified
**Tenant Isolation:** Cascade delete within tenant
**Exceptions:** Legal hold, regulatory retention
**Automation Level:** Full (soft delete immediate, hard delete scheduled)
**Timeline:** <24 hours for soft delete

### Right to Portability (Art. 20)
**Endpoint:** `GET /api/v1/subjects/{subject_id}/export`
**Formats:** JSON, CSV, machine-readable
**Tenant Isolation:** Export scoped to tenant
**Automation Level:** Full
**Timeline:** <1 hour for standard requests

### Data Discovery Sources
[List from step 2]

### Timeline Automation
[Specifications from step 3]
```

## Verification

- [ ] All GDPR Articles 15-22 mapped to implementation
- [ ] Data discovery architecture designed for tenant isolation
- [ ] Response timeline automation specified
- [ ] Tenant isolation safeguards documented
- [ ] Rights implementation specification created
- [ ] Web research completed for current DSAR patterns

## Outputs

- Data subject rights implementation design
- Data discovery architecture
- Timeline automation specifications
- Tenant isolation requirements

---

## SUCCESS METRICS:

- [ ] All seven data subject rights addressed
- [ ] Tenant isolation maintained throughout
- [ ] Automation targets specified
- [ ] User confirmed design via A/P/C menu
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing data sources:** Cannot design discovery - return to gather sources
- **Unclear tenant model:** Use Advanced Elicitation (A) to clarify isolation
- **Conflicting timelines:** Use Party Mode (P) for stakeholder alignment
- **User rejects design:** Iterate on approach, do not force acceptance

## Next Step

Proceed to `step-03-c-gdpr-lawful-basis.md` to design lawful basis tracking.

---

**Navigation:** Enter 'C' to continue to next step
