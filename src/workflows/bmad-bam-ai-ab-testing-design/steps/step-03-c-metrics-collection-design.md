# Step 3: Metrics Collection Design

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Design the experiment metrics collection pipeline including primary metrics, guardrail metrics, statistical analysis, and per-tenant metric isolation.

---

## Prerequisites

- Steps 1-2 completed with framework and variant management
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-testing

---

## Inputs

- Experiment framework from Step 1
- Variant management from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Metric Categories

Catalog experiment metrics:

| Category | Metrics | Purpose |
|----------|---------|---------|
| Primary | Task success rate, quality score | Decision metric |
| Guardrail | Latency, cost, safety score | Must not degrade |
| Engagement | Completion rate, retry rate | User behavior |
| Business | Revenue impact, retention | Business outcome |

### 2. Design Metric Schema

Define metric structure:

| Field | Type | Description |
|-------|------|-------------|
| metric_id | string | Unique identifier |
| experiment_id | string | Associated experiment |
| variant_id | string | Variant that generated |
| tenant_id | string | Tenant context |
| value | float | Metric value |
| timestamp | datetime | Collection time |
| metadata | object | Additional context |

### 3. Configure Statistical Analysis

Specify analysis methods:

| Method | Use Case | Sample Size |
|--------|----------|-------------|
| Two-sample t-test | Continuous metrics | 1000+ per variant |
| Chi-squared | Conversion rates | 500+ per variant |
| Bayesian | Early stopping | 100+ per variant |
| Sequential | Continuous monitoring | Rolling window |

### 4. Design Significance Thresholds

Define decision criteria:

| Threshold | Value | Application |
|-----------|-------|-------------|
| Confidence Level | 95% | Standard experiments |
| Minimum Detectable Effect | 2% | Primary metrics |
| Power | 80% | Sample size calculation |
| Guardrail Tolerance | -1% | Must not exceed |

### 5. Implement Tenant Isolation

Ensure metric isolation:

| Isolation | Description | Query Pattern |
|-----------|-------------|---------------|
| Tenant Partition | Metrics stored per tenant | WHERE tenant_id = ? |
| Aggregate View | Platform-wide (authorized) | GROUP BY experiment_id |
| Cross-tenant Ban | No individual tenant data sharing | RLS policy |

**Verify current best practices with web search:**
Search the web: "A/B testing statistical significance LLM {date}"
Search the web: "experiment metrics pipeline real-time analysis {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the metrics collection analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into statistical methods or tenant isolation
- **P (Party Mode)**: Bring data science and analytics perspectives
- **C (Continue)**: Accept metrics design and proceed to analysis engine
- **[Specific refinements]**: Describe metrics concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save metrics collection design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-analysis-decision-engine.md`

---

## Verification

- [ ] Metric categories defined
- [ ] Schema documented
- [ ] Statistical methods specified
- [ ] Significance thresholds configured
- [ ] Tenant isolation implemented
- [ ] Patterns align with pattern registry

---

## Outputs

- Metrics collection specification
- Statistical analysis configuration
- Tenant isolation design

---

## Next Step

Proceed to `step-04-c-analysis-decision-engine.md` to design the analysis engine.
