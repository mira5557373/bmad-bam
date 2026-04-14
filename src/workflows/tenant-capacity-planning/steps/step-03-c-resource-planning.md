# Step 3: Resource Planning

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

---

## Purpose

Design resource allocation strategies per tenant tier, defining quotas, limits, and fair-share policies to ensure efficient resource utilization.

---

## Prerequisites

- Step 2 completed: Growth projections with capacity milestones
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Actions

### 1. Define Resource Quotas by Tier

Establish resource quotas per tenant tier:

| Resource | Free | Pro | Enterprise | Custom |
|----------|------|-----|------------|--------|
| CPU limit | 0.5 vCPU | 2 vCPU | 8 vCPU | Negotiated |
| Memory limit | 512 MB | 2 GB | 8 GB | Negotiated |
| Storage | 1 GB | 10 GB | 100 GB | Negotiated |
| API rate | 10/min | 100/min | 1000/min | Negotiated |
| LLM tokens/day | 10K | 100K | 1M | Negotiated |
| Agent runs/day | 10 | 100 | Unlimited | Negotiated |
| Concurrent users | 5 | 50 | 500 | Negotiated |
| Data retention | 30 days | 1 year | 7 years | Negotiated |

### 2. Design Burst Capacity

Define burst allowances above quotas:

| Tier | Burst Multiplier | Duration | Cooldown | Cost |
|------|------------------|----------|----------|------|
| Free | 1.5x | 5 min | 1 hour | N/A |
| Pro | 2x | 15 min | 30 min | Included |
| Enterprise | 3x | 1 hour | 15 min | Included |
| Custom | Negotiated | Negotiated | Negotiated | Per contract |

### 3. Design Resource Pools

Define resource pool architecture:

| Pool Type | Description | Tenants | Isolation |
|-----------|-------------|---------|-----------|
| Shared small | Small tenants, shared resources | Free | Low |
| Shared medium | Medium tenants | Pro | Medium |
| Dedicated | Large tenants, dedicated resources | Enterprise | High |
| Custom | Custom infrastructure | Custom | Complete |

**Pool Allocation Rules:**

| Condition | Pool Assignment | Override |
|-----------|-----------------|----------|
| Tier = Free | Shared small | No |
| Tier = Pro AND usage < 50% | Shared medium | Yes |
| Tier = Pro AND usage >= 50% | Dedicated small | Yes |
| Tier = Enterprise | Dedicated | No |
| SLA >= 99.99% | Dedicated | No |

### 4. Design Fair-Share Scheduling

Define fair-share policies for shared resources:

| Resource | Fair-Share Policy | Priority Tiers | Preemption |
|----------|-------------------|----------------|------------|
| CPU | Weighted by tier | Enterprise > Pro > Free | Soft |
| Memory | Reserved minimum | All equal | None |
| Database | Connection limits | Enterprise > Pro > Free | Hard |
| LLM API | Token budget | Per-tenant quota | Hard |
| Queue | Priority lanes | 3 levels | Soft |

### 5. Design Overflow Handling

Define behavior when quotas exceeded:

| Scenario | Detection | Response | User Impact |
|----------|-----------|----------|-------------|
| API rate exceeded | Counter check | 429 response | Retry with backoff |
| Storage exceeded | Async check | Block writes | UI notification |
| LLM quota exceeded | Pre-request check | Graceful degradation | Feature limited |
| CPU exceeded | cgroup limit | Throttle | Slower response |
| Memory exceeded | OOM killer | Pod restart | Brief disruption |

### 6. Design Reservation System

Define capacity reservation for predictable loads:

| Reservation Type | Use Case | Lead Time | Commitment |
|------------------|----------|-----------|------------|
| Scheduled | Known events | 24 hours | Firm |
| Reserved instances | Steady baseline | 1 month | Monthly |
| Spot capacity | Best effort | None | None |
| Dedicated | Critical workloads | 1 week | Annual |

**Verify current best practices with web search:**
Search the web: "multi-tenant resource allocation patterns {date}"
Search the web: "Kubernetes resource quotas best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the resource planning above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific allocation policies
- **P (Party Mode)**: Bring SRE and product perspectives
- **C (Continue)**: Accept planning and proceed to scaling triggers
- **[Specific refinements]**: Describe planning concerns

Select an option:
```

#### If 'C' (Continue):
- Save resource planning to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-scaling-triggers.md`

---

## Verification

- [ ] Resource quotas defined by tier
- [ ] Burst capacity designed
- [ ] Resource pools architected
- [ ] Fair-share policies documented
- [ ] Overflow handling specified
- [ ] Reservation system designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Resource quota matrix
- Burst capacity design
- Resource pool architecture
- Fair-share policies
- Overflow handling procedures
- Reservation system design

---

## Next Step

Proceed to `step-04-c-scaling-triggers.md` to design auto-scaling.
