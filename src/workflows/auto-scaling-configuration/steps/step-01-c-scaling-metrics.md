# Step 1: Scaling Metrics

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

Define metrics and thresholds for auto-scaling decisions across different workload types.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Actions

### 1. Core Metrics Definition

Define primary scaling metrics:

| Metric | Target | Scale Up Trigger | Scale Down Trigger | Cooldown |
|--------|--------|------------------|-------------------|----------|
| CPU Utilization | 70% | >80% for 3m | <50% for 10m | 5m |
| Memory Utilization | 75% | >85% for 3m | <60% for 10m | 5m |
| Request Queue Depth | <100 | >200 for 1m | <50 for 5m | 3m |
| Response Latency (p99) | <500ms | >1000ms for 2m | <200ms for 10m | 5m |

### 2. AI Workload Metrics

Define AI-specific scaling metrics:

| Metric | Target | Scale Up | Scale Down |
|--------|--------|----------|------------|
| Token Queue Depth | <1000 | >2000 for 2m | <500 for 5m |
| GPU Utilization | 80% | >90% for 3m | <60% for 10m |
| Inference Latency | <2s | >5s for 2m | <1s for 5m |
| Batch Queue Size | <50 | >100 for 2m | <20 for 5m |

### 3. Composite Metrics

Design composite scaling decisions:

- Scale up if ANY critical metric exceeds threshold
- Scale down only if ALL metrics below threshold
- Predictive scaling based on historical patterns
- Scheduled scaling for known traffic patterns

**Verify current best practices with web search:**
Search the web: "Kubernetes auto-scaling metrics best practices {date}"
Search the web: "AI inference auto-scaling patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the metrics definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into metric selection
- **P (Party Mode)**: Bring operations and architecture perspectives
- **C (Continue)**: Accept metrics and proceed to policy design
```

#### If 'C' (Continue):
- Save scaling metrics to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-policy-design.md`

---

## Verification

- [ ] Core metrics defined
- [ ] AI workload metrics specified
- [ ] Composite scaling rules documented
- [ ] Thresholds appropriate for workload
- [ ] Patterns align with pattern registry

---

## Next Step

Proceed to `step-02-c-policy-design.md` to configure scaling policies.
