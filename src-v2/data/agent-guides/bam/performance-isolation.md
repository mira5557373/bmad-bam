# BAM Performance Isolation Guide

**When to load:** During Phase 3 (Solutioning) when designing noisy neighbor prevention, resource limits, or fair scheduling.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent

---

## Core Concepts

### The Noisy Neighbor Problem

| Symptom | Cause | Impact |
|---------|-------|--------|
| Latency spikes | CPU contention | All tenants slow |
| Timeouts | Connection exhaustion | Failed requests |
| OOM errors | Memory pressure | Pod restarts |
| Queue backup | Worker saturation | Delayed jobs |

### Isolation Spectrum

```
┌─────────────────────────────────────────────┐
│  Shared        Partitioned      Dedicated   │
│  Resources     Resources        Resources   │
│     │              │                │       │
│  ┌─────┐       ┌─────┐          ┌─────┐    │
│  │Free │       │ Pro │          │ Ent │    │
│  └─────┘       └─────┘          └─────┘    │
│  Low Cost      Medium           High Cost   │
│  Low Isolation Fair             Full        │
└─────────────────────────────────────────────┘
```

---

## Application Guidelines

When implementing performance isolation in multi-tenant systems:

1. **Define resource limits per tier**: Higher tiers get guaranteed resources, lower tiers share
2. **Implement priority queuing**: Process higher-tier tenant requests before lower-tier
3. **Monitor for noisy neighbors**: Alert when any tenant's resource usage affects others
4. **Use circuit breakers**: Isolate failing tenant workloads from the rest of the platform
5. **Design burst policies**: Allow temporary overages within bounds before throttling

---

## Implementation Patterns

### Per-Tier Resource Limits

| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| CPU (cores) | 0.25 shared | 1.0 guaranteed | 4.0 dedicated |
| Memory (GB) | 0.5 shared | 2.0 guaranteed | 8.0 dedicated |
| Connections | 5 | 25 | 100 |
| IOPS | 100 shared | 500 | 2000 |

### Priority Queue Architecture

```
┌──────────────────────────────────────────┐
│            Priority Router                │
│   Enterprise:10  Pro:5  Free:1           │
│        │          │         │            │
│        v          v         v            │
│   ┌────────┐ ┌────────┐ ┌────────┐      │
│   │ HIGH   │ │ MEDIUM │ │  LOW   │      │
│   │ Queue  │ │ Queue  │ │ Queue  │      │
│   └────────┘ └────────┘ └────────┘      │
└──────────────────────────────────────────┘
```

### Fair Scheduling

| Algorithm | Best For |
|-----------|----------|
| Weighted Fair Queuing | Network/API |
| Deficit Round Robin | CPU scheduling |
| Token Bucket | API throttling |
| Leaky Bucket | Background jobs |

### Isolation Pool Architecture

```
┌─────────────────────────────────────────────┐
│           Kubernetes Cluster                 │
│  ┌───────────────────────────────────────┐  │
│  │         Shared Node Pool              │  │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ │  │
│  │  │Free│ │Free│ │Pro │ │Pro │ │Pro │ │  │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘ │  │
│  └───────────────────────────────────────┘  │
│  ┌─────────────────┐ ┌─────────────────┐   │
│  │ Dedicated Pool  │ │ Dedicated Pool  │   │
│  │   Enterprise A  │ │   Enterprise B  │   │
│  └─────────────────┘ └─────────────────┘   │
└─────────────────────────────────────────────┘
```

### Automatic Remediation

| Condition | Response | Cooldown |
|-----------|----------|----------|
| CPU > 90% | Throttle 50% | 10 min |
| Memory > 95% | Restart pod | 5 min |
| Queue > 1000 | Reject new | 2 min |

---

## Related Patterns

- `performance` pattern in `bam-patterns.csv`
- `noisy-neighbor` pattern in `bam-patterns.csv`
- `tenant-isolation.md` guide for security isolation
- `quota-management.md` guide for resource limits
- `performance-isolation-template.md` for output documentation
- **caching-strategy:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-strategy`

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `performance-isolation`
- `{project-root}/_bmad/bam/data/tenant-models.csv` → isolation strategies
- **search-indexing:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `search-indexing`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `performance-isolation` | `noisy neighbor prevention multi-tenant SaaS {date}` |
| `performance-isolation` | `multi-tenant performance isolation multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design isolation strategies for multi-tenant performance boundaries
- `bmad-bam-usage-metering-design` - Configure metering for resource consumption tracking
- `bmad-bam-tenant-tier-migration` - Handle performance limit changes during tier upgrades

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| Cost-sensitive? | Shared + limits | Efficiency |
| Strict SLAs? | Dedicated pools | Guaranteed |
| Variable workloads? | Burst pools | Handle peaks |
| AI-heavy? | GPU isolation | Prevent blocking |
