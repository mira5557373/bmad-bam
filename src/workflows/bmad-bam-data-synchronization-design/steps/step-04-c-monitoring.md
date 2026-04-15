# Step 4: Monitoring

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices

---

## Purpose

Configure comprehensive monitoring for data synchronization health and tenant-level visibility.

---

## Prerequisites

- Step 1: Sync Patterns completed
- Step 2: Conflict Resolution completed
- Step 3: Tenant Isolation completed

---

## Actions

### 1. Sync Lag Metrics

Define lag monitoring:

| Metric | Threshold | Alert |
|--------|-----------|-------|
| Replication Lag | >5s | Warning |
| Replication Lag | >30s | Critical |
| Event Processing Lag | >1000 events | Warning |
| Event Processing Lag | >10000 events | Critical |

### 2. Conflict Rate Tracking

Monitor conflict frequency:

| Metric | Threshold | Action |
|--------|-----------|--------|
| Conflicts per minute | >10 | Investigate |
| Conflict resolution time | >1 hour | Escalate |
| Manual resolution pending | >5 | Alert owner |
| Resolution failure rate | >5% | System review |

### 3. Data Consistency Verification

Configure consistency checks:

| Check Type | Frequency | Method |
|------------|-----------|--------|
| Row count comparison | Hourly | Count match across replicas |
| Checksum validation | Daily | Hash comparison |
| Referential integrity | Weekly | Cross-reference validation |
| Full reconciliation | Monthly | Complete data comparison |

### 4. Tenant-Level Dashboards

Design per-tenant visibility:

| Dashboard | Metrics | Refresh |
|-----------|---------|---------|
| Sync Health | Lag, errors, throughput | 1 min |
| Conflict Status | Open, resolved, rate | 5 min |
| Data Freshness | Last sync, staleness | 1 min |
| Usage | Events processed, storage | 1 hour |

### 5. Alert Configuration

Define alerting rules:

| Condition | Severity | Channel |
|-----------|----------|---------|
| Sync stopped | Critical | PagerDuty |
| Lag > SLA | High | Slack + Email |
| Conflict spike | Medium | Slack |
| Consistency mismatch | Critical | PagerDuty |

**Verify current best practices with web search:**
Search the web: "data replication monitoring best practices {date}"
Search the web: "CDC monitoring observability {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into monitoring design
- **P (Party Mode)**: Bring operations perspectives
- **C (Continue)**: Finalize data synchronization design
```

#### If 'C' (Continue):
- Save complete data synchronization design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final artifact

---

## Verification

- [ ] Sync lag metrics defined
- [ ] Conflict rate tracking configured
- [ ] Data consistency verification specified
- [ ] Tenant-level dashboards designed
- [ ] Alert configuration documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Sync lag metrics configuration
- Conflict rate tracking rules
- Data consistency verification spec
- Tenant-level dashboard design
- Alert configuration
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-sync-template.md`

---

## Workflow Complete

Create mode complete for data-synchronization-design workflow.
