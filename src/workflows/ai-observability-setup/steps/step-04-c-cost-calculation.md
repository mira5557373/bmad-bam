# Step 4: Cost Per Request Calculation

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

---

## Purpose

Configure model cost pricing, implement per-request cost attribution, set up tenant cost aggregation, and enable cost anomaly detection.

---

## Prerequisites

- Latency monitoring configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: cost

---

## Actions

### 1. Model Cost Configuration

| Model | Input Cost/1K | Output Cost/1K | Cache Discount |
|-------|---------------|----------------|----------------|
| GPT-4-turbo | $0.01 | $0.03 | 50% |
| GPT-4 | $0.03 | $0.06 | 50% |
| GPT-3.5-turbo | $0.0005 | $0.0015 | 50% |
| Claude-3-opus | $0.015 | $0.075 | N/A |
| Claude-3-sonnet | $0.003 | $0.015 | N/A |
| text-embedding-3-small | $0.00002 | N/A | N/A |

Cost update process:
- [ ] Pricing table versioned
- [ ] Automatic price updates from provider
- [ ] Price change alerts

### 2. Per-Request Cost Attribution

| Cost Component | Calculation | Attribution |
|----------------|-------------|-------------|
| Input tokens | tokens * price/1K | Request |
| Output tokens | tokens * price/1K | Request |
| Embedding calls | calls * price | Request |
| Cache savings | cached * discount | Request |

Metadata attached to each request:
| Field | Example | Purpose |
|-------|---------|---------|
| total_cost | $0.0234 | Billing |
| input_cost | $0.0120 | Analysis |
| output_cost | $0.0114 | Analysis |
| cache_savings | $0.0050 | Optimization |

### 3. Tenant Cost Aggregation

| Aggregation | Window | Storage | Query |
|-------------|--------|---------|-------|
| Real-time | Per-request | Metrics | Dashboard |
| Hourly | 1 hour | TimescaleDB | API |
| Daily | 24 hours | TimescaleDB | Reports |
| Monthly | Calendar month | PostgreSQL | Billing |

Aggregation dimensions:
| Dimension | Use Case |
|-----------|----------|
| By tenant | Billing |
| By model | Optimization |
| By agent | Attribution |
| By user | Usage analysis |

### 4. Cost Anomaly Detection

| Anomaly Type | Detection | Threshold | Action |
|--------------|-----------|-----------|--------|
| Hourly spike | Rate comparison | > 3x avg | Alert |
| Daily spike | Daily comparison | > 2x avg | Alert |
| Single request | Per-request | > $1.00 | Log + Alert |
| Tenant runaway | Tenant trend | > 5x baseline | Alert + Review |

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cost attribution
- **P (Party Mode)**: Bring finance and engineering perspectives
- **C (Continue)**: Accept cost calculation and proceed to quality metrics
- **[Specific refinements]**: Describe concerns to address

Select an option:
```

#### If 'C' (Continue):
- Save cost calculation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-quality-metrics.md`

---

**Verify current best practices with web search:**
Search the web: "cost calculation best practices {date}"
Search the web: "cost calculation multi-tenant SaaS {date}"

## Verification

- [ ] Model costs configured
- [ ] Per-request attribution active
- [ ] Tenant aggregation working
- [ ] Anomaly detection enabled

---

## Outputs

- Cost calculation configuration

---

## Next Step

Proceed to `step-05-c-quality-metrics.md` to define quality metrics.
