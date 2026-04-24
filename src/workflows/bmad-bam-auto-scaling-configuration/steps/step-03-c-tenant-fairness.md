# Step 3: Tenant Fairness

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

Implement fairness mechanisms to prevent noisy neighbors and ensure equitable resource allocation.

---

## Prerequisites

- Step 1: Scaling Metrics completed
- Step 2: Policy Design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: tenant-isolation`

---

## Actions

### 1. Resource Quotas per Tier

Define resource limits:

| Tier | Max CPU | Max Memory | Max GPU | Max Concurrent |
|------|---------|------------|---------|----------------|
| FREE | 2 cores | 4 GB | None | 10 requests |
| PRO | 8 cores | 32 GB | 1 GPU | 100 requests |
| ENTERPRISE | Custom | Custom | Custom | Custom |

### 2. Burst Capacity

Configure burst allowances:

| Tier | Burst Multiplier | Duration | Cooldown |
|------|------------------|----------|----------|
| FREE | 1.5x | 5 min | 1 hour |
| PRO | 2x | 15 min | 30 min |
| ENTERPRISE | 3x | 60 min | 15 min |

### 3. Noisy Neighbor Detection

Design detection and mitigation:

- Monitor per-tenant resource consumption
- Alert on >80% quota utilization
- Automatic throttling at 100% quota
- Priority queuing for paid tiers
- Isolation for misbehaving tenants

**Soft Gate:** Steps 1-3 complete the fairness design. Present a summary of quotas and burst policies. Ask for confirmation before proceeding to cost controls.

**Verify current best practices with web search:**
Search the web: "multi-tenant resource fairness patterns {date}"
Search the web: "noisy neighbor prevention SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant fairness design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into fairness edge cases
- **P (Party Mode)**: Bring operations and product perspectives
- **C (Continue)**: Accept fairness design and proceed to cost controls
```

#### If 'C' (Continue):
- Save tenant fairness design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-cost-controls.md`

---

## Verification

- [ ] Resource quotas defined per tier
- [ ] Burst capacity configured
- [ ] Noisy neighbor detection implemented
- [ ] Priority queuing specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant fairness design document
- Resource quota specification per tier
- Burst capacity configuration
- Noisy neighbor detection rules

---

## Next Step

Proceed to `step-04-c-cost-controls.md` to define cost optimization strategies.
