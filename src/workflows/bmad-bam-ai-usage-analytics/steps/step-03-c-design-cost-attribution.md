# Step 3: Design Cost Attribution

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design AI cost attribution model per tenant.

---

## Prerequisites

- Step 2 completed (Tracking designed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Cost Model Components

| Component | Calculation | Unit |
|-----------|-------------|------|
| Token Cost | tokens * rate_per_1k / 1000 | USD |
| Compute Cost | latency * compute_rate | USD |
| Storage Cost | embeddings * storage_rate | USD |
| Overhead | 15-20% markup | USD |

### 2. Model Pricing Matrix

| Model | Input Rate | Output Rate | Tier Discount |
|-------|------------|-------------|---------------|
| GPT-4 | $0.03/1K | $0.06/1K | 10-20% |
| GPT-3.5 | $0.0015/1K | $0.002/1K | 5-15% |
| Claude | $0.008/1K | $0.024/1K | 10-20% |
| Custom | Variable | Variable | Negotiated |

### 3. Attribution Rules

| Scenario | Attribution | Rationale |
|----------|-------------|-----------|
| Direct Call | 100% to tenant | Clear ownership |
| Background Job | To triggering tenant | Causal chain |
| System Call | Platform overhead | Shared cost |
| Retry | 50% to tenant | Shared responsibility |

### 4. Billing Integration

| Integration Point | Data Flow | Frequency |
|-------------------|-----------|-----------|
| Usage Aggregation | Hourly rollups | Hourly |
| Invoice Generation | Monthly totals | Monthly |
| Real-time Balance | Running total | Real-time |
| Quota Enforcement | Limit checks | Per-call |

**Soft Gate:** Steps 1-3 complete metrics and cost model. Present summary and confirm before proceeding to dashboards.

**Verify current best practices with web search:**
Search the web: "LLM cost attribution multi-tenant {date}"
Search the web: "AI usage billing models SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into cost modeling
- **P (Party Mode)**: Bring finance and product perspectives
- **C (Continue)**: Accept cost model and proceed to dashboards
```

#### If 'C' (Continue):
- Save cost model to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-dashboards.md`

---

## Verification

- [ ] Cost components defined
- [ ] Pricing matrix documented
- [ ] Attribution rules established
- [ ] Billing integration planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Cost attribution model
- Pricing matrix
- Billing integration design

---

## Next Step

Proceed to `step-04-c-design-dashboards.md` to design AI analytics dashboards.
