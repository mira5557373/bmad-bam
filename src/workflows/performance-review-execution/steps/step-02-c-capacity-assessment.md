# Step 2: Capacity Assessment

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

---

## Purpose

Analyze current resource utilization, assess peak load capacity, calculate available headroom, and evaluate scaling readiness for the multi-tenant platform.

---

## Prerequisites

- Baseline comparison completed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: capacity

---

## Inputs

- Baseline comparison from Step 1
- Infrastructure metrics
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Current Resource Utilization Analysis

Assess resource consumption across infrastructure:

| Resource | Current Usage | Capacity | Utilization % | Status |
|----------|---------------|----------|---------------|--------|
| CPU (compute) | {value} | {max} | {%} | Normal/Warning/Critical |
| Memory | {value} GB | {max} GB | {%} | Normal/Warning/Critical |
| Database connections | {value} | {max} | {%} | Normal/Warning/Critical |
| Database storage | {value} GB | {max} GB | {%} | Normal/Warning/Critical |
| Redis memory | {value} GB | {max} GB | {%} | Normal/Warning/Critical |
| Message queue depth | {value} | {threshold} | {%} | Normal/Warning/Critical |
| Network bandwidth | {value} Gbps | {max} Gbps | {%} | Normal/Warning/Critical |

Utilization thresholds:
- Normal: < 70%
- Warning: 70-85%
- Critical: > 85%

### 2. Peak Load Assessment

Analyze peak load patterns:

| Time Period | Peak Load | Duration | Resources Stressed |
|-------------|-----------|----------|-------------------|
| Daily peak | {value} req/s | {hours} | {resources} |
| Weekly peak | {value} req/s | {hours} | {resources} |
| Monthly peak | {value} req/s | {hours} | {resources} |

Peak characteristics:
| Metric | Peak Value | Baseline Value | Peak/Baseline Ratio |
|--------|------------|----------------|---------------------|
| Requests/sec | {value} | {value} | {ratio}x |
| Concurrent users | {value} | {value} | {ratio}x |
| AI requests/sec | {value} | {value} | {ratio}x |
| Token consumption/min | {value} | {value} | {ratio}x |

### 3. Headroom Calculation

Calculate available headroom for growth:

| Resource | Current | Capacity | Headroom | Growth Runway |
|----------|---------|----------|----------|---------------|
| CPU | {%} | 100% | {%} | {months at current growth} |
| Memory | {%} | 100% | {%} | {months at current growth} |
| Database | {%} | 100% | {%} | {months at current growth} |
| AI capacity | {%} | {limit} | {%} | {months at current growth} |

Overall headroom assessment: {Healthy/Adequate/Constrained/Critical}

### 4. Scaling Readiness Evaluation

Assess ability to scale:

| Scaling Dimension | Current | Max | Auto-scale Enabled | Time to Scale |
|-------------------|---------|-----|-------------------|---------------|
| Horizontal (instances) | {n} | {max} | Yes/No | {minutes} |
| Vertical (instance size) | {size} | {max} | Manual | {hours} |
| Database read replicas | {n} | {max} | Yes/No | {minutes} |
| AI provider capacity | {%} | {limit} | N/A | Depends on provider |

Scaling bottlenecks identified:
- [ ] {bottleneck 1}
- [ ] {bottleneck 2}

---

## COLLABORATION MENUS (A/P/C):

After completing the capacity assessment above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into scaling constraints
- **P (Party Mode)**: Bring infrastructure and SRE perspectives on capacity
- **C (Continue)**: Accept assessment and proceed to SLA verification
- **[Specific refinements]**: Describe capacity concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: utilization data, headroom, scaling bottlenecks
- Process enhanced insights on capacity planning
- Ask user: "Accept these refined capacity findings? (y/n)"
- If yes, integrate into performance review
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review capacity assessment for multi-tenant AI platform"
- Process infrastructure and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save capacity assessment to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-sla-verification.md`

---

**Verify current best practices with web search:**
Search the web: "capacity assessment best practices {date}"
Search the web: "capacity assessment multi-tenant SaaS {date}"

## Verification

- [ ] Resource utilization analyzed
- [ ] Peak load assessed
- [ ] Headroom calculated
- [ ] Scaling readiness evaluated
- [ ] Bottlenecks identified

---

## Outputs

- Resource utilization report
- Peak load analysis
- Headroom calculation
- Scaling readiness assessment

---

## Next Step

Proceed to `step-03-c-sla-verification.md` to verify SLA compliance.
