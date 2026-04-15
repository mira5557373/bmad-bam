# Step 3: Query Patterns

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design efficient and secure query patterns for audit log access, ensuring tenant isolation, performance optimization, and compliance with access controls.

---

## Prerequisites

- Step 2 completed: Retention policies with storage tiers
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: query-patterns
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Query Access Patterns

Identify common audit query patterns:

| Pattern | Use Case | Frequency | Performance SLA |
|---------|----------|-----------|-----------------|
| User Activity | View user's recent actions | High | < 100ms |
| Resource History | Track changes to resource | Medium | < 500ms |
| Time Range Search | Events within date range | High | < 1s |
| Security Investigation | Threat investigation | Low | < 5s |
| Compliance Report | Generate audit report | Low | < 30s |
| Cross-Reference | Correlate related events | Medium | < 2s |
| Agent Run Trace | Full agent execution trace | Medium | < 1s |
| Anomaly Detection | Pattern analysis | Low | < 10s |

### 2. Design Index Strategy

Define indexes for query optimization:

| Index Name | Columns | Type | Purpose |
|------------|---------|------|---------|
| `idx_audit_tenant_time` | `(tenant_id, event_timestamp DESC)` | B-tree | Primary tenant query |
| `idx_audit_actor` | `(tenant_id, actor_id, event_timestamp DESC)` | B-tree | User activity |
| `idx_audit_resource` | `(tenant_id, resource_type, resource_id)` | B-tree | Resource history |
| `idx_audit_event_type` | `(tenant_id, event_type, event_timestamp DESC)` | B-tree | Event filtering |
| `idx_audit_request` | `(request_id)` | B-tree | Request correlation |
| `idx_audit_agent_run` | `(tenant_id, run_id, event_timestamp)` | B-tree | Agent trace |
| `idx_audit_risk` | `(tenant_id, risk_level, event_timestamp DESC)` | B-tree | Security events |
| `idx_audit_metadata` | `(metadata)` | GIN | JSON search |

### 3. Define Query Templates

Document standard query patterns:

**User Activity Query:**

| Parameter | Required | Default | Validation |
|-----------|----------|---------|------------|
| `tenant_id` | Yes | From context | UUID format |
| `actor_id` | Yes | - | UUID format |
| `start_time` | No | -24 hours | ISO 8601 |
| `end_time` | No | Now | ISO 8601 |
| `event_types` | No | All | Valid enum array |
| `limit` | No | 100 | 1-1000 |
| `offset` | No | 0 | Non-negative |

**Resource History Query:**

| Parameter | Required | Default | Validation |
|-----------|----------|---------|------------|
| `tenant_id` | Yes | From context | UUID format |
| `resource_type` | Yes | - | Valid type |
| `resource_id` | Yes | - | UUID format |
| `include_related` | No | false | Boolean |
| `start_time` | No | -30 days | ISO 8601 |
| `limit` | No | 50 | 1-500 |

**Agent Run Trace Query:**

| Parameter | Required | Default | Validation |
|-----------|----------|---------|------------|
| `tenant_id` | Yes | From context | UUID format |
| `run_id` | Yes | - | UUID format |
| `include_tool_io` | No | false | Boolean |
| `include_guardrails` | No | true | Boolean |

### 4. Design Access Control Layer

Define authorization for audit queries:

| Role | Own Activity | Team Activity | All Tenant | Cross-Tenant |
|------|--------------|---------------|------------|--------------|
| User | Read | - | - | - |
| Team Lead | Read | Read | - | - |
| Tenant Admin | Read | Read | Read | - |
| Security Analyst | Read | Read | Read | - |
| Platform Admin | Read | Read | Read | Read (with audit) |
| Compliance Officer | Read | Read | Read | Read (reports only) |

**Access Control Enforcement:**

| Check | Implementation | Failure Action |
|-------|----------------|----------------|
| Tenant context | Mandatory `tenant_id` in session | Reject query |
| Role verification | Check role claims in JWT | Filter results |
| Scope validation | Validate query scope vs role | Reduce scope |
| Rate limiting | Per-user query quotas | Throttle/block |
| Query audit | Log all audit queries | Alert on anomaly |

### 5. Design Cross-Tier Query Handling

Handle queries across storage tiers:

| Tier Combination | Strategy | User Experience |
|------------------|----------|-----------------|
| Hot only | Direct query | Instant results |
| Hot + Warm | Federated query | Progressive loading |
| Warm + Cold | Async job | Email notification |
| Cold + Archive | Request workflow | SLA-based delivery |
| All tiers | Scheduled report | Batch delivery |

**Progressive Loading Pattern:**

| Stage | Action | Timeout |
|-------|--------|---------|
| 1 | Query hot tier | 100ms |
| 2 | Return hot results | Immediate |
| 3 | Query warm tier (parallel) | 5s |
| 4 | Append warm results | Streaming |
| 5 | Indicate cold available | UI prompt |
| 6 | User requests cold | Async job |

### 6. Design Query Result Formatting

Define output formats:

| Format | Use Case | Includes |
|--------|----------|----------|
| JSON | API responses | Full data, pagination |
| CSV | Export/analysis | Flattened, headers |
| PDF | Compliance reports | Formatted, signed |
| Parquet | Analytics | Columnar, compressed |
| SIEM | Security tools | CEF/LEEF format |

**Verify current best practices with web search:**
Search the web: "audit log query optimization patterns {date}"
Search the web: "multi-tenant database query performance {date}"
Search the web: "time-series audit data querying {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the query pattern design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific query scenarios
- **P (Party Mode)**: Bring DBA and security perspectives on query design
- **C (Continue)**: Accept patterns and proceed to compliance mapping
- **[Specific refinements]**: Describe query concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: query patterns, index strategy, access controls
- Process enhanced insights on performance and security
- Ask user: "Accept these refined query patterns? (y/n)"
- If yes, integrate into query design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit query patterns for multi-tenant AI platform"
- Process DBA and security analyst perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save query patterns to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-compliance-mapping.md`

---

## Verification

- [ ] All access patterns identified
- [ ] Index strategy optimized for patterns
- [ ] Query templates documented
- [ ] Access control layer defined
- [ ] Cross-tier query handling designed
- [ ] Output formats specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Query access patterns
- Index strategy
- Query templates
- Access control matrix
- Cross-tier query handling
- Output format specifications

---

## Next Step

Proceed to `step-04-c-compliance-mapping.md` to map audit design to compliance frameworks.
