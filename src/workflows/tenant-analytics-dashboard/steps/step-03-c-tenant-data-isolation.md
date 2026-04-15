# Step 3: Tenant Data Isolation

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- REFERENCE Reference pattern registry `web_queries` for search topics


---

## Purpose

Define tenant data isolation strategies in the analytics layer to ensure strict data boundaries and prevent cross-tenant data leakage.

---

## Prerequisites

- Data aggregation strategy defined (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation,analytics

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define tenant data isolation for analytics:

## Isolation Layers

| Layer | Name | Mechanism 1 | Mechanism 2 |
|-------|------|-------------|-------------|
| 1 | Data Collection | Event tagging with tenant_id at source | Validation before ingestion |
| 2 | Data Storage | Partitioned storage by tenant | Encryption at rest per tenant |
| 3 | Query Layer | Mandatory tenant_id filters | Query rewriting for isolation |
| 4 | Presentation | Tenant-scoped dashboards | Access control enforcement |

## Data Collection Isolation

### Required Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenant_id | string | Yes | Tenant identifier for isolation |
| event_timestamp | datetime | Yes | When event occurred |
| event_type | string | Yes | Classification of event |

### Validation Rules

| Rule Name | Condition | Action | Description |
|-----------|-----------|--------|-------------|
| tenant_id_present | tenant_id IS NOT NULL AND tenant_id != '' | reject | Every event must have tenant_id |
| tenant_id_valid | tenant_id IN active tenants | quarantine | Tenant must be active |

### Encryption Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Protocol | TLS 1.3 | Encryption in transit |
| Tenant Key Derivation | Enabled | Per-tenant encryption keys |

## Storage Isolation Strategies

| Strategy | Implementation | Security Level | Performance |
|----------|----------------|----------------|-------------|
| Row-Level | WHERE tenant_id = ? | Medium | High |
| Partition | PARTITION BY tenant_id | High | High |
| Schema | tenant_{id}.table_name | Very High | Medium |
| Database | tenant_{id}_db | Maximum | Low |

## Query Layer Isolation

### Query Rewriting Configuration

| Setting | Value | Description |
|---------|-------|-------------|
| Enabled | Yes | Automatic tenant filter injection |
| Rule | WHERE tenant_id = :current_tenant_id | All queries must include tenant filter |

### Query Validation Rules

| Rule Name | Check | Action |
|-----------|-------|--------|
| tenant_filter_present | Query includes tenant_id filter | reject_if_missing |
| no_cross_tenant_join | No joins between different tenant data | reject_if_present |

### Parameterization Settings

| Setting | Value | Description |
|---------|-------|-------------|
| Mode | strict | Prepared statements only |
| Allow Dynamic Tenant | No | Tenant cannot be dynamically changed |

## Access Control Matrix

| Role | Own Tenant Data | Cross-Tenant Aggregates | Platform Data |
|------|-----------------|-------------------------|---------------|
| Tenant User | Read | No | No |
| Tenant Admin | Read/Export | No | No |
| Platform Analyst | No (direct) | Read (anonymized) | Read |
| Platform Admin | Audit only | Read | Read/Write |

## Audit Trail Requirements

### Log Events

| Event Type | Description |
|------------|-------------|
| data_query_executed | Query against tenant data |
| data_export_requested | Data export initiated |
| dashboard_viewed | Dashboard access |
| report_generated | Report creation |

### Audit Fields

| Field | Type | Description |
|-------|------|-------------|
| timestamp | datetime | When action occurred |
| user_id | string | User performing action |
| tenant_id | string | Tenant context |
| action | string | Action type |
| query_hash | string | Hash of executed query |
| row_count | integer | Number of rows affected |
| ip_address | string | Source IP address |

### Retention Policy

| Tier | Retention Period |
|------|------------------|
| Default | 2 years |
| Enterprise | 7 years |

## Cross-Tenant Analytics (Platform Only)

For platform-level analytics, tenant data must be anonymized.

### Anonymization Rules

| Field | Method | Description |
|-------|--------|-------------|
| tenant_id | hash_or_mask | Remove direct tenant identification |
| user_id | remove_or_aggregate | Remove or aggregate user identity |

### K-Anonymity Settings

| Setting | Value | Description |
|---------|-------|-------------|
| Minimum Group Size | 10 | Minimum records per group |
| Suppress If Below | Yes | Hide groups below threshold |

### Allowed Aggregations

| Aggregation | Purpose |
|-------------|---------|
| count(*) | Record counting |
| avg(metric) | Average calculation |
| sum(metric) | Sum calculation |
| percentile(metric) | Distribution analysis |

### Prohibited Operations

| Operation | Reason |
|-----------|--------|
| SELECT * FROM tenant_data | Exposes raw tenant data |
| JOIN on user_id | Links user data across tenants |
| GROUP BY with < k records | Violates k-anonymity |

**Verify current best practices with web search:**
Search the web: "tenant data isolation analytics best practices {date}"
Search the web: "multi-tenant data security analytics platforms {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After defining tenant data isolation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific isolation strategies or audit requirements
- **P (Party Mode)**: Bring security architect and compliance perspectives on data isolation
- **C (Continue)**: Accept tenant data isolation and proceed to dashboard components
- **[Specific refinements]**: Describe additional isolation requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: isolation layers, access control, audit requirements
- Process enhanced insights on data isolation
- Ask user: "Accept this detailed isolation analysis? (y/n)"
- If yes, integrate into isolation strategy
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant data isolation for analytics"
- Process security architect and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant data isolation strategy to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-dashboard-components.md`

---

## Verification

- [ ] Isolation layers defined
- [ ] Data collection isolation configured
- [ ] Storage isolation strategy selected
- [ ] Query layer isolation implemented
- [ ] Access control matrix defined
- [ ] Audit trail requirements specified
- [ ] Cross-tenant analytics rules established
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant data isolation strategy
- Access control matrix
- Audit requirements document

---

## Next Step

Proceed to `step-04-c-dashboard-components.md` to define dashboard components.
