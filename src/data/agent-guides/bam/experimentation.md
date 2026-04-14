# BAM Experimentation Guide

**When to load:** During Phase 3 (Solutioning) or Phase 4 (Implementation) when designing A/B testing, feature rollouts, or tenant-scoped experiments.

**Integrates with:** Architect (Atlas persona), PM agent, Dev agent, Analyst agent

---

## Core Concepts

### Experimentation Layers

| Layer | Scope | Randomization Unit |
|-------|-------|-------------------|
| Platform | All tenants | Tenant |
| Tenant | Single tenant | User |
| Feature | Specific capability | Request |
| Model | AI behavior | Session |
| Workflow | Process variation | Task |
| Integration | External service | Connection |

### Experimentation Philosophy

Experimentation in multi-tenant platforms requires careful consideration of isolation, fairness, and statistical validity. Experiments must respect tenant boundaries while gathering sufficient data for meaningful analysis. The experimentation framework should enable rapid iteration without compromising platform stability or user experience.

A well-designed experiment starts with a clear hypothesis, defines measurable success criteria, and includes guardrail metrics to detect unintended negative consequences. The multi-tenant context introduces unique challenges around sample size when experiments are scoped to individual tenants.

### Experimentation Pipeline

```
+-----------------------------------------------------------+
|  +----------+   +----------+   +----------+   +----------+|
|  | Hypothesis|-->| Design   |-->| Execute  |-->| Analyze  ||
|  | Define   |   | Experiment|   | & Collect|   | Results  ||
|  +----------+   +----------+   +----------+   +----------+|
|                       |                                    |
|                       v                                    |
|  +----------+   +----------+   +----------+               |
|  |   Learn  |<--| Decision |<--| Document |               |
|  +----------+   +----------+   +----------+               |
+-----------------------------------------------------------+
```

### Experiment Lifecycle

Each experiment progresses through defined stages: Draft, Review, Active, Analyzing, and Completed. Experiments can be paused or stopped early if guardrail metrics are breached. All experiment metadata, including configuration and results, are retained for future reference.

---

## Application Guidelines

When implementing experimentation in multi-tenant systems:

1. **Define clear hypotheses**: Every experiment needs measurable success criteria and guardrail metrics
2. **Respect tenant boundaries**: Experiments should not leak data or behavior across tenants
3. **Ensure statistical validity**: Calculate required sample sizes given tenant-scoped populations
4. **Implement guardrails**: Auto-stop experiments if negative metrics breach thresholds
5. **Document and share learnings**: Experiment results should inform future platform decisions

---

## Cohort Analysis

| Dimension | Segmentation Options |
|-----------|---------------------|
| Tier | Free, Pro, Enterprise |
| Tenure | New, Established, Mature |
| Activity | Low, Medium, High usage |
| Geography | Region-based |
| Industry | Vertical-specific |
| Size | User count brackets |
| Feature adoption | Early adopter, mainstream |

### Cohort Balance

When designing experiments, ensure cohorts are balanced across key dimensions. Imbalanced cohorts can lead to confounding variables and unreliable results. Use stratified sampling for small populations.

---

## Metrics Framework

| Category | Examples | Method |
|----------|----------|--------|
| Engagement | Sessions, actions | Event tracking |
| Performance | Latency, errors | Instrumentation |
| Business | Conversion, revenue | Transaction logs |
| AI-specific | Task success, quality | Agent telemetry |

### Primary vs Guardrail Metrics

| Type | Purpose | Decision Role |
|------|---------|---------------|
| Primary | Main success measure | Ship if improved |
| Secondary | Supporting evidence | Inform decision |
| Guardrail | Safety threshold | Block if degraded |

---

## Tenant-Scoped Experiments

| Isolation Level | Description | Use Case |
|-----------------|-------------|----------|
| Platform-wide | All tenants | Core feature changes |
| Opt-in tenants | Selected only | Beta programs |
| Single tenant | One isolated | Enterprise customization |
| Tier-specific | One tier only | Tier feature validation |

### Tenant Consent

Enterprise tenants may require explicit consent before inclusion in experiments. The experimentation framework supports consent management and automatic exclusion of tenants with active opt-out preferences.

---

## Statistical Analysis

| Metric Type | Alpha | Power | MDE |
|-------------|-------|-------|-----|
| Primary | 0.05 | 0.80 | 5% relative |
| Secondary | 0.10 | 0.70 | 10% relative |
| Guardrail | 0.01 | 0.90 | 2% degradation |

---

## Related Patterns

- `experimentation` pattern in `bam-patterns.csv`
- `tenant-isolation.md` guide for tenant-scoped experiments
- `observability.md` guide for metrics collection
- `tier-ux.md` guide for tier-based cohort analysis
- `experiment-report-template.md` for output documentation

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `experimentation`
- `{project-root}/_bmad/bam/data/tenant-models.csv` → tenant isolation strategies

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `experimentation` | `SaaS experimentation platform multi-tenant SaaS {date}` |
| `experimentation` | `A/B testing patterns multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Testing UI changes? | User-level randomization |
| Testing pricing? | Tenant-level, long duration |
| Testing AI behavior? | Include quality guardrails |
| Enterprise request? | Tenant-scoped experiment |
| Small sample available? | Use Bayesian methods |
| High-risk change? | Start with shadow mode |
| Cross-tenant impact? | Platform-level with careful monitoring |

---

## Experiment Duration Guidelines

| Experiment Type | Minimum Duration | Recommended Duration |
|-----------------|------------------|----------------------|
| UI/UX changes | 1 week | 2 weeks |
| Algorithm changes | 2 weeks | 4 weeks |
| Pricing experiments | 1 month | 3 months |
| AI model swaps | 2 weeks | 4 weeks |

## Related Workflows

- `bmad-bam-ai-eval-safety-design` - Design safety guardrails for AI experimentation
- `bmad-bam-tenant-model-isolation` - Configure tenant-scoped experiment isolation
- `bmad-bam-tenant-aware-observability` - Set up experiment metrics and monitoring
