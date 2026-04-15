# Step 1: Sync Patterns

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Define synchronization patterns for data replication across multi-tenant systems.

---

## Prerequisites

- Master architecture with data architecture defined
- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: data`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: event-driven`

---

## Actions

### 1. Pattern Selection

Evaluate synchronization patterns:

| Pattern | Use Case | Consistency | Complexity |
|---------|----------|-------------|------------|
| Event Sourcing | Audit-critical data | Eventual | High |
| CDC (Change Data Capture) | Database replication | Near real-time | Medium |
| Saga Pattern | Distributed transactions | Eventual | High |
| Two-Phase Commit | Critical transactions | Strong | High |
| Outbox Pattern | Reliable event publishing | Eventual | Medium |

### 2. Pattern-to-Data Mapping

Map patterns to data types:

| Data Type | Primary Pattern | Fallback | SLA |
|-----------|-----------------|----------|-----|
| User Data | CDC | Event Sourcing | <1s lag |
| Tenant Config | Event Sourcing | None | <5s lag |
| Billing Data | Two-Phase Commit | Saga | Immediate |
| AI Conversations | Event Sourcing | CDC | <10s lag |
| Analytics | CDC | Batch | <1m lag |

### 3. Replication Topology

Define replication architecture:

| Topology | Use Case | Tenant Isolation |
|----------|----------|------------------|
| Primary-Replica | Read scaling | Tenant-tagged queries |
| Multi-Primary | Cross-region write | Partition by tenant |
| Fan-out | Event distribution | Tenant-scoped topics |

**Verify current best practices with web search:**
Search the web: "data synchronization patterns distributed systems {date}"
Search the web: "CDC change data capture multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pattern selection
- **P (Party Mode)**: Bring data architecture perspectives
- **C (Continue)**: Accept sync patterns and proceed to conflict resolution
```

#### If 'C' (Continue):
- Save sync patterns to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-conflict-resolution.md`

---

## Verification

- [ ] Sync patterns selected with rationale
- [ ] Pattern-to-data mapping defined
- [ ] Replication topology documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Sync pattern specification
- Pattern-to-data mapping
- Replication topology documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-integration-template.md`

---

## Next Step

Proceed to `step-02-c-conflict-resolution.md` to design conflict resolution strategies.
