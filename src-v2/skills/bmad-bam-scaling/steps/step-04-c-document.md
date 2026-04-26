# Step 04: Design Tenant-Aware Scaling

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Noisy neighbor isolation, dedicated pools, cache scaling, queue partitioning
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Build on database scaling from Step 3, apply tier-based allocation
- 🚫 Do NOT: Address capacity planning or runbooks (Step 5)
- 🔍 Use web search: Verify tenant isolation patterns against multi-tenant SaaS best practices

---

## Purpose

Design tenant-aware scaling strategies that prevent noisy neighbor problems, provide enterprise tier isolation, scale caching per tier, and partition queues by tenant for fair resource allocation.

---

## Prerequisites

- Steps 01-03 complete
- Tier definitions from master architecture
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `scale-tenant-aware`, `noisy-neighbor-*`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

**Web Research (Required):**

Search the web: "noisy neighbor isolation multi-tenant SaaS patterns {date}"
Search the web: "Redis cluster multi-tenant cache partitioning {date}"
Search the web: "message queue tenant partitioning fair scheduling {date}"
Search the web: "enterprise tenant dedicated resource pools cloud-native {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Noisy Neighbor Isolation

**Detection Mechanisms:**

| Metric | Threshold | Action |
|--------|-----------|--------|
| Request rate | > 10x average | Rate limit |
| CPU usage | > 500ms per request | Throttle |
| Memory allocation | > 100MB per request | Queue |
| I/O operations | > 1000 IOPS | Backpressure |

**Isolation Strategies by Impact:**

| Impact Level | Detection | Response | Recovery |
|--------------|-----------|----------|----------|
| Low | Metrics spike | Alert | Auto-resolve |
| Medium | Sustained spike | Rate limit | Manual review |
| High | Service degradation | Isolate tenant | Incident response |
| Critical | Multi-tenant impact | Emergency throttle | Executive escalation |

**Tenant Resource Quotas:**

| Resource | Free Quota | Pro Quota | Enterprise Quota |
|----------|------------|-----------|------------------|
| API requests/min | 100 | 1,000 | 10,000+ |
| CPU seconds/min | 60 | 300 | Unlimited |
| Memory MB | 256 | 1,024 | Dedicated |
| Storage GB | 5 | 50 | Custom |

### 2. Enterprise Tenant Dedicated Pools

**Dedicated Resource Architecture:**

| Component | Shared (Free/Pro) | Dedicated (Enterprise) |
|-----------|-------------------|------------------------|
| Compute | Shared node pool | Dedicated nodes |
| Database | Shared cluster | Dedicated instance |
| Cache | Shared Redis | Dedicated Redis |
| Queue | Shared partitions | Dedicated queue |

**Dedicated Pool Configuration:**

| Setting | Value | Rationale |
|---------|-------|-----------|
| Node Affinity | enterprise-pool | Isolation guarantee |
| Taints | enterprise-only | Prevent mixing |
| Resource Requests | 100% | Guaranteed allocation |
| Priority Class | critical | Preemption protection |

**Dedicated Pool Lifecycle:**

| Event | Action | Automation |
|-------|--------|------------|
| Enterprise signup | Provision pool | Semi-automated |
| Usage increase | Scale pool | Automated |
| Downgrade | Migrate to shared | Manual |
| Churn | Deprovision pool | Automated (30-day delay) |

### 3. Cache Scaling per Tier

**Cache Architecture by Tier:**

| Tier | Cache Type | Size | Eviction |
|------|------------|------|----------|
| Free | Shared Redis | 64MB namespace | LRU aggressive |
| Pro | Shared Redis | 256MB namespace | LRU standard |
| Enterprise | Dedicated Redis | Custom | LRU + TTL |

**Cache Partitioning Strategy:**

| Strategy | Description | Use Case |
|----------|-------------|----------|
| Namespace prefix | `{tenant_id}:key` | All tiers |
| Cluster slots | Hash slot ranges | Large-scale |
| Dedicated instance | Per-tenant Redis | Enterprise |

**Cache Scaling Policies:**

| Scenario | Action | Trigger |
|----------|--------|---------|
| Memory pressure | Evict cold keys | > 80% usage |
| High hit rate | Increase allocation | > 95% hits |
| Low hit rate | Reduce allocation | < 50% hits |
| Enterprise growth | Scale cluster | Automated |

**Cache Invalidation by Tenant:**

| Event | Invalidation Scope | Method |
|-------|-------------------|--------|
| Data update | Single key | Direct delete |
| Schema change | Tenant namespace | Pattern delete |
| Tier change | Tenant namespace | Full flush |
| Security event | Tenant namespace | Immediate flush |

### 4. Queue Partitioning by Tenant

**Queue Architecture:**

| Tier | Queue Model | Priority | Concurrency |
|------|-------------|----------|-------------|
| Free | Shared queue | Low | 1 worker |
| Pro | Shared queue | Normal | 5 workers |
| Enterprise | Dedicated queue | High | Custom |

**Partition Strategy:**

| Strategy | Description | Fairness |
|----------|-------------|----------|
| Round-robin | Equal processing time | High |
| Weighted | Tier-based allocation | Medium |
| Priority queue | Tier as priority | Low (favors paid) |
| Dedicated | Per-tenant queues | Highest |

**Queue Scaling Policies:**

| Queue Metric | Threshold | Action |
|--------------|-----------|--------|
| Queue depth | > 1000 | Add consumers |
| Process time | > 30s avg | Scale workers |
| Failed jobs | > 5% | Alert + backoff |
| Age | > 1 hour | Priority boost |

**Fair Scheduling Implementation:**

| Component | Implementation | Guarantee |
|-----------|----------------|-----------|
| Job weights | Tenant tier factor | Proportional processing |
| Starvation prevention | Max wait time | No tenant blocked > 5min |
| Burst handling | Surge queue | Absorb spikes |
| Backpressure | Reject + retry | Prevent overload |

---

## COLLABORATION MENUS (A/P/C)

After presenting tenant-aware scaling design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific tenant isolation aspects
- **P (Party Mode)**: Bring architect perspectives on fairness tradeoffs
- **C (Continue)**: Proceed to compile scaling design

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant-aware scaling design, tier requirements
- Process enhanced insights on isolation tradeoffs
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant-aware scaling for multi-tenant SaaS fairness"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document tenant-aware scaling decisions
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Noisy neighbor detection and isolation designed
- [ ] Enterprise dedicated pools specified
- [ ] Cache scaling per tier configured
- [ ] Queue partitioning strategy defined
- [ ] Fair scheduling implementation documented
- [ ] Web research findings incorporated with citations

---

## Outputs

- Noisy neighbor isolation design
- Enterprise dedicated pool specifications
- Cache scaling configuration by tier
- Queue partitioning and fair scheduling design

---

## Next Step

Proceed to `step-05-c-complete.md` to compile the complete scaling design document.
