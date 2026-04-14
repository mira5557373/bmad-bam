# Step 4: Cost Controls

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

Define cost optimization strategies including spot instances, reserved capacity, and budget controls.

---

## Prerequisites

- Step 1: Scaling Metrics completed
- Step 2: Policy Design completed
- Step 3: Tenant Fairness completed

---

## Actions

### 1. Spot Instance Strategy

Configure spot instance usage:

| Workload Type | Spot Eligible | Fallback | Interruption Handling |
|---------------|---------------|----------|----------------------|
| Batch Processing | 100% | On-Demand | Checkpoint & resume |
| AI Inference | 70% | On-Demand | Queue to on-demand |
| Web API | 0% | N/A | N/A |
| Dev/Test | 100% | None | Accept interruption |

### 2. Reserved Capacity Planning

Plan reserved instances:

| Workload | Reserved % | Term | Commitment |
|----------|------------|------|------------|
| Core API | 60% baseline | 1 year | Convertible |
| Database | 100% | 3 year | Standard |
| AI Inference | 40% baseline | 1 year | Convertible |

### 3. Scale-to-Zero Configuration

Enable scale-to-zero for idle workloads:

| Workload | Idle Threshold | Warm-up Time | Pre-warming |
|----------|---------------|--------------|-------------|
| Dev Environments | 30 min | 2 min | Scheduled |
| Batch Workers | 5 min | 30 sec | On-demand |
| FREE Tier AI | 10 min | 1 min | None |

### 4. Budget Alerts

Configure cost alerting:

| Alert Level | Threshold | Action |
|-------------|-----------|--------|
| Warning | 70% budget | Notify |
| Critical | 90% budget | Notify + Review |
| Hard Limit | 100% budget | Scale down non-critical |

**Verify current best practices with web search:**
Search the web: "Kubernetes cost optimization strategies {date}"
Search the web: "spot instance auto-scaling patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the cost controls design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cost optimization
- **P (Party Mode)**: Bring finance and operations perspectives
- **C (Continue)**: Finalize auto-scaling configuration
```

#### If 'C' (Continue):
- Save complete auto-scaling configuration to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final artifact

---

## Verification

- [ ] Spot instance strategy defined
- [ ] Reserved capacity planned
- [ ] Scale-to-zero configured
- [ ] Budget alerts specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Spot instance strategy
- Reserved capacity plan
- Scale-to-zero configuration
- Budget alert rules
- **Load template:** `{project-root}/_bmad/bam/templates/auto-scaling-template.md`

---

## Workflow Complete

Create mode complete for auto-scaling-configuration workflow.
