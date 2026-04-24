# Step 2: Policy Design

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

Configure scaling policies per workload type with appropriate scaling behavior.

---

## Prerequisites

- Step 1: Scaling Metrics completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Actions

### 1. Web/API Tier Policies

Define scaling for web workloads:

| Policy | Min | Max | Scaling Type | Adjustment |
|--------|-----|-----|--------------|------------|
| API Gateway | 2 | 50 | Target Tracking | 70% CPU |
| Web App | 3 | 100 | Step Scaling | +25%/-25% |
| GraphQL | 2 | 30 | Target Tracking | Request count |

### 2. AI Inference Policies

Configure AI workload scaling:

| Policy | Min | Max | Scaling Type | Special |
|--------|-----|-----|--------------|---------|
| GPU Inference | 1 | 20 | Step Scaling | GPU-aware |
| CPU Inference | 2 | 50 | Target Tracking | Model-specific |
| Batch Processing | 0 | 100 | Queue-based | Scale to zero |

### 3. Background Job Policies

Define job worker scaling:

| Policy | Min | Max | Scaling Type | Adjustment |
|--------|-----|-----|--------------|------------|
| Event Workers | 2 | 50 | Queue Depth | +2/-1 per threshold |
| Scheduled Jobs | 1 | 10 | Time-based | Predictive |
| Export Workers | 0 | 20 | Queue-based | Scale to zero |

**Verify current best practices with web search:**
Search the web: "Kubernetes HPA VPA best practices {date}"
Search the web: "auto-scaling policies production {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the policy design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into policy specifics
- **P (Party Mode)**: Bring operations perspectives for review
- **C (Continue)**: Accept policies and proceed to tenant fairness
```

#### If 'C' (Continue):
- Save policy design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-fairness.md`

---

## Verification

- [ ] Web/API policies defined
- [ ] AI inference policies configured
- [ ] Background job policies specified
- [ ] Min/max appropriate per workload
- [ ] Patterns align with pattern registry

---

## Outputs

- Scaling policy design document
- Web/API tier policy specification
- AI inference policy configuration
- Background job policy specification

---

## Next Step

Proceed to `step-03-c-tenant-fairness.md` to implement fairness mechanisms.
