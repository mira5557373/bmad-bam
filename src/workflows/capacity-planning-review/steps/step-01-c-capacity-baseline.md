# Step 1: Capacity Baseline Establishment

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
- Use web search to verify current best practices when making operational decisions

---

## Purpose

Establish current capacity baseline metrics including resource inventory, utilization patterns, historical usage, and AI capacity baseline for planning purposes.

---

## Prerequisites

- Resource inventory available
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: capacity

---

## Actions

### 1. Current Resource Inventory

Document current infrastructure capacity:

| Resource Type | Current Capacity | Unit | Provider |
|---------------|------------------|------|----------|
| Compute (CPU cores) | {value} | cores | {provider} |
| Memory | {value} | GB | {provider} |
| Database storage | {value} | GB | {provider} |
| Database connections | {value} | connections | {provider} |
| Message queue capacity | {value} | messages/s | {provider} |
| Cache memory | {value} | GB | {provider} |
| Network bandwidth | {value} | Gbps | {provider} |
| AI API quota | {value} | tokens/min | {provider} |

### 2. Utilization Baseline Metrics

Document current utilization:

| Metric | Avg | p50 | p95 | p99 | Max |
|--------|-----|-----|-----|-----|-----|
| CPU utilization | {%} | {%} | {%} | {%} | {%} |
| Memory utilization | {%} | {%} | {%} | {%} | {%} |
| Database utilization | {%} | {%} | {%} | {%} | {%} |
| Network utilization | {%} | {%} | {%} | {%} | {%} |
| AI quota utilization | {%} | {%} | {%} | {%} | {%} |

### 3. Historical Usage Patterns

| Time Period | Tenant Count | Request Rate | AI Requests | Growth Rate |
|-------------|--------------|--------------|-------------|-------------|
| Current month | {count} | {req/s} | {req/s} | baseline |
| 3 months ago | {count} | {req/s} | {req/s} | {%} |
| 6 months ago | {count} | {req/s} | {req/s} | {%} |
| 12 months ago | {count} | {req/s} | {req/s} | {%} |

### 4. AI Capacity Baseline

| AI Resource | Current Allocation | Current Usage | Utilization |
|-------------|-------------------|---------------|-------------|
| GPT-4 tokens/min | {value} | {value} | {%} |
| GPT-3.5 tokens/min | {value} | {value} | {%} |
| Embedding calls/min | {value} | {value} | {%} |
| Concurrent agents | {value} | {value} | {%} |

**Verify current best practices with web search:**
Search the web: "capacity planning baseline metrics SaaS {date}"
Search the web: "AI capacity planning LLM workloads {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into baseline metrics
- **P (Party Mode)**: Bring infrastructure perspectives
- **C (Continue)**: Accept baseline and proceed to growth projection
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save capacity baseline to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-growth-projection.md`

---

## Verification

- [ ] Resource inventory documented
- [ ] Utilization baselines established
- [ ] Historical patterns analyzed
- [ ] AI capacity baseline documented

---

## Outputs

- Capacity baseline document
- **Load template:** `{project-root}/_bmad/bam/templates/capacity-planning-template.md`

---

## Next Step

Proceed to `step-02-c-growth-projection.md` to project growth.
