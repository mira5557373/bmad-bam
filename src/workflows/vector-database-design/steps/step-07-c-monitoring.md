# Step 7: Monitoring and Observability

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

Define comprehensive monitoring requirements for vector storage including query latency metrics, index health, storage utilization, and tenant-scoped observability.

---

## Prerequisites

- Steps 1-6 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: observability
- **Web research (if available):** Search for vector database monitoring best practices

---

## Inputs

- Architecture decisions from previous steps
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Core Metrics

| Metric | Type | Aggregation | Alert Threshold |
|--------|------|-------------|-----------------|
| query_latency_ms | Histogram | p50, p95, p99 | p99 > SLA |
| query_throughput | Counter | Rate per second | < baseline * 0.5 |
| index_size_bytes | Gauge | Per collection | > 80% capacity |
| recall_score | Gauge | Per query type | < 0.9 |

### 2. Configure Tenant-Scoped Metrics

| Metric | Dimensions | Purpose |
|--------|------------|---------|
| tenant_query_count | tenant_id, collection | Usage tracking |
| tenant_vector_count | tenant_id | Quota enforcement |
| tenant_latency_p95 | tenant_id | Per-tenant SLA |
| tenant_error_rate | tenant_id, error_type | Quality monitoring |

### 3. Design Index Health Monitoring

| Health Check | Frequency | Action on Failure |
|--------------|-----------|-------------------|
| Index consistency | Hourly | Alert + investigate |
| Segment fragmentation | Daily | Schedule compaction |
| Replication lag | Continuous | Alert if > threshold |
| Checksum validation | Weekly | Alert + repair |

### 4. Configure Alerting Rules

| Alert | Severity | Condition | Response |
|-------|----------|-----------|----------|
| High latency | P2 | p99 > 2x SLA for 5m | On-call page |
| Index corruption | P1 | Checksum failure | Immediate escalation |
| Capacity warning | P3 | >70% storage | Plan expansion |
| Replication failure | P1 | Lag > 1 hour | Failover evaluation |

### 5. Design Dashboards

| Dashboard | Audience | Key Panels |
|-----------|----------|------------|
| Operations | SRE | Latency, throughput, errors |
| Capacity | Platform | Storage, vector counts, growth |
| Tenant Health | Support | Per-tenant metrics, SLA status |
| Search Quality | ML Team | Recall, relevance, re-ranking |

**Verify current best practices with web search:**
Search the web: "vector database monitoring observability {date}"
Search the web: "semantic search quality metrics monitoring {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the monitoring analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metrics design and alerting thresholds
- **P (Party Mode)**: Bring SRE and data platform perspectives on observability
- **C (Continue)**: Accept monitoring design and proceed to security
- **[Specific refinements]**: Describe monitoring concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: metrics definitions, alerting rules, dashboard designs
- Process enhanced insights on observability strategy
- Ask user: "Accept these refined monitoring decisions? (y/n)"
- If yes, integrate into monitoring specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review vector database monitoring and observability strategy"
- Process SRE and data platform perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save monitoring design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6, 7]`
- Proceed to next step: `step-08-c-security.md`

---

## Verification

- [ ] Core metrics defined with thresholds
- [ ] Tenant-scoped metrics configured
- [ ] Index health monitoring designed
- [ ] Alerting rules configured
- [ ] Dashboards designed for each audience
- [ ] Patterns align with pattern registry

---

## Outputs

- Monitoring specification
- Metrics catalog
- Alerting configuration
- Dashboard specifications

---

## Next Step

Proceed to `step-08-c-security.md` to implement security controls.
