# Step 2: Growth Projection

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

Project growth for tenants, usage, AI demand, and seasonal adjustments to inform capacity planning decisions.

---

## Prerequisites

- Capacity baseline established (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: capacity

---

## Actions

### 1. Tenant Growth Projection

| Scenario | 3 Months | 6 Months | 12 Months | 24 Months |
|----------|----------|----------|-----------|-----------|
| Conservative | +{%} | +{%} | +{%} | +{%} |
| Expected | +{%} | +{%} | +{%} | +{%} |
| Aggressive | +{%} | +{%} | +{%} | +{%} |

By tier:
| Tier | Current | 6 Months | 12 Months |
|------|---------|----------|-----------|
| Enterprise | {count} | {count} | {count} |
| Pro | {count} | {count} | {count} |
| Free | {count} | {count} | {count} |

### 2. Usage Growth Projection

| Metric | Current | 6 Months | 12 Months | Growth Factor |
|--------|---------|----------|-----------|---------------|
| API requests/day | {value} | {value} | {value} | {x} |
| AI requests/day | {value} | {value} | {value} | {x} |
| Storage (GB) | {value} | {value} | {value} | {x} |
| Concurrent users | {value} | {value} | {value} | {x} |

### 3. AI Demand Projection

| AI Resource | Current | 6 Months | 12 Months | Scaling Plan |
|-------------|---------|----------|-----------|--------------|
| Tokens/day | {value} | {value} | {value} | {plan} |
| Agent executions/day | {value} | {value} | {value} | {plan} |
| Embedding calls/day | {value} | {value} | {value} | {plan} |

### 4. Seasonal Adjustments

| Season/Event | Impact | Duration | Planning Consideration |
|--------------|--------|----------|------------------------|
| {event} | +{%} | {duration} | {consideration} |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into projection methodology
- **P (Party Mode)**: Bring business and product perspectives
- **C (Continue)**: Accept projections and proceed to scaling thresholds
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save growth projections to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-scaling-thresholds.md`

---

**Verify current best practices with web search:**
Search the web: "growth projection best practices {date}"
Search the web: "growth projection multi-tenant SaaS {date}"

## Verification

- [ ] Tenant growth projected (multiple scenarios)
- [ ] Usage growth projected
- [ ] AI demand projected
- [ ] Seasonal adjustments documented

---

## Outputs

- Growth projection document

---

## Next Step

Proceed to `step-03-c-scaling-thresholds.md` to define scaling thresholds.
