# Model Monitoring Patterns

**When to load:** When designing ML model monitoring systems, implementing drift detection, or when user mentions model monitoring, model drift, model performance, or model observability in multi-tenant agentic AI platforms.

**Integrates with:** Architect (Nova persona), DevOps agent, Security agent, Analyst agent

---

## Core Concepts

### What is Model Monitoring?

Model monitoring tracks ML model performance, behavior, and health in production. In multi-tenant agentic AI platforms, monitoring must detect issues at both platform and tenant levels while maintaining isolation of sensitive performance data.

### Monitoring Dimensions

| Dimension | Description | Metrics |
|-----------|-------------|---------|
| Performance | Model accuracy over time | Accuracy, F1, precision, recall |
| Latency | Inference speed | p50, p95, p99 latency |
| Throughput | Request handling capacity | Requests/second, queue depth |
| Drift | Data/concept distribution changes | KL divergence, PSI, feature drift |
| Errors | Failure rates and types | Error rate, timeout rate |
| Resource | Compute utilization | GPU/CPU usage, memory |

### Monitoring Architecture

```
Inference Request
        │
        ▼
┌─────────────────────────────────────┐
│           Model Server              │
│  ┌─────────────────────────────┐   │
│  │     Inference Engine        │   │
│  └──────────────┬──────────────┘   │
│                 │                   │
│  ┌──────────────▼──────────────┐   │
│  │    Metrics Collector        │   │
│  │  (input, output, latency)   │   │
│  └──────────────┬──────────────┘   │
└─────────────────┼───────────────────┘
                  │
        ┌─────────▼─────────┐
        │  Metrics Pipeline  │
        │  (tenant-tagged)   │
        └─────────┬─────────┘
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
┌───────┐   ┌─────────┐   ┌─────────┐
│Platform│   │Tenant A │   │Tenant B │
│Dashboard│  │Dashboard│   │Dashboard│
└───────┘   └─────────┘   └─────────┘
```

---

## Key Patterns

### Pattern 1: Monitoring Metrics Schema

| Field | Description | Example |
|-------|-------------|---------|
| metric_id | Unique identifier | `mtc_abc123` |
| tenant_id | Tenant context | `tenant_xyz` |
| model_id | Model identifier | `mdl_xyz:2.1.3` |
| metric_type | Metric category | `performance`, `drift`, `latency` |
| metric_name | Specific metric | `accuracy`, `kl_divergence`, `p99_latency` |
| value | Metric value | `0.95` |
| timestamp | Collection time | `2026-04-11T10:30:00Z` |
| window | Aggregation window | `1h`, `1d`, `7d` |
| dimensions | Additional context | `{"agent_id": "agt_123", "endpoint": "predict"}` |

### Pattern 2: Drift Detection Types

| Drift Type | Description | Detection Method | Alert Threshold |
|------------|-------------|------------------|-----------------|
| Data drift | Input distribution change | KL divergence, PSI | PSI > 0.2 |
| Concept drift | Input-output relationship change | Performance degradation | Accuracy drop > 5% |
| Feature drift | Individual feature distribution | Per-feature monitoring | Feature PSI > 0.1 |
| Prediction drift | Output distribution change | Output monitoring | Distribution shift > 10% |

### Pattern 3: Multi-Tenant Alert Configuration

| Alert Level | Scope | Recipients | Example |
|-------------|-------|------------|---------|
| Platform | All models | Platform ops | GPU utilization > 90% |
| Model | Specific model, all tenants | Model owners | Model accuracy drop |
| Tenant | Tenant-specific | Tenant admins | Tenant usage anomaly |
| Agent | Agent-specific | Agent owners | Agent performance issue |

---

## Application Guidelines

- Designing comprehensive model monitoring systems
- Implementing drift detection and alerting
- Building tenant-specific performance dashboards
- Creating model health scorecards
- Supporting A/B test analysis
- Enabling proactive model retraining triggers

---

## Multi-Tenant Considerations

### Per-Tier Monitoring Features

| Tier | Metrics Access | Alert Configuration | Dashboards | Historical Data |
|------|----------------|---------------------|------------|-----------------|
| Free | Basic latency only | Platform alerts only | None | 24 hours |
| Pro | Standard metrics | Limited custom alerts | Pre-built | 30 days |
| Enterprise | Full metrics + custom | Full alert configuration | Custom + API | 1 year |

### Tenant Isolation in Monitoring

| Isolation Aspect | Implementation | Verification |
|------------------|----------------|--------------|
| Metrics storage | Tenant-tagged time series | Query by tenant_id |
| Dashboards | Tenant-scoped views | Access control |
| Alerts | Per-tenant alert routing | Alert audit |
| Benchmarking | Anonymized cross-tenant | No tenant identification |

### Cross-Tenant Insights (Platform Level)

| Insight Type | Aggregation | Privacy Protection |
|--------------|-------------|-------------------|
| Model performance | Anonymized percentiles | No tenant identification |
| Usage patterns | Aggregated trends | Statistical noise |
| Drift patterns | Common drift detection | Feature anonymization |
| Best practices | Performance benchmarks | Opt-in sharing |

---

## Monitoring Dashboards

### Platform Dashboard

| Panel | Metrics | Purpose |
|-------|---------|---------|
| Model Health | Active models, error rates | Operational overview |
| Resource Utilization | GPU/CPU, memory, queue depth | Capacity planning |
| Drift Alerts | Active drift detections | Proactive maintenance |
| Tenant Distribution | Request distribution | Load balancing |

### Tenant Dashboard

| Panel | Metrics | Purpose |
|-------|---------|---------|
| Model Performance | Accuracy, latency by model | Quality assurance |
| Usage Trends | Requests over time | Capacity planning |
| Cost Attribution | Usage-based costs | Budget management |
| Agent Performance | Per-agent metrics | Agent optimization |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Real-time vs batch monitoring? | Hybrid: real-time for latency/errors, batch for drift | Balances immediacy with computational cost |
| How to detect drift in multi-tenant context? | Per-tenant baseline with platform anomaly detection | Accounts for tenant-specific usage patterns |
| Should tenants see model performance? | Own models yes, platform models aggregated benchmarks | Competitive protection while enabling optimization |
| How often to compute drift metrics? | Hourly for active models, daily for lower usage | Cost-efficient monitoring cadence |
| What triggers model retraining? | Drift threshold + performance degradation | Evidence-based retraining decisions |
| How to handle monitoring data retention? | Tier-based retention with aggregation for older data | Balances insight availability with storage costs |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Integrate monitoring with agent runtime
- `bmad-bam-ai-model-registry` - Monitor across model versions
- `bmad-bam-model-deployment-pipeline` - Monitor serving infrastructure
- `bmad-bam-tenant-aware-observability` - Tenant-scoped monitoring

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`, `ai-runtime`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "ML model monitoring best practices {date}"
- Search: "model drift detection multi-tenant {date}"
- Search: "LLM observability patterns production {date}"
