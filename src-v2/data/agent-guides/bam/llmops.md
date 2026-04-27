# BAM LLMOps Guide

**When to load:** During Phase 3 (Solutioning) or Phase 4 (Implementation) when designing LLM lifecycle management, model registry, or production deployment.

**Integrates with:** Architect (Nova persona), DevOps agent, Dev agent

---

## Core Concepts

### LLMOps Lifecycle

| Stage | Activities | Artifacts |
|-------|------------|-----------|
| Development | Prompt engineering, fine-tuning | Prompts, adapters |
| Evaluation | Benchmarking, A/B testing | Eval reports |
| Deployment | Model serving, scaling | Endpoints |
| Monitoring | Quality tracking, drift detection | Dashboards |
| Optimization | Cost reduction, performance tuning | Configurations |
| Retirement | Model deprecation, migration | Migration plans |

### LLMOps Philosophy

LLMOps extends traditional MLOps practices to address the unique challenges of large language models. Unlike conventional ML models, LLMs require careful management of prompts, context windows, and output quality. The operational lifecycle must account for model versioning across providers, prompt version control, and the continuous evaluation of model quality against evolving benchmarks.

In a multi-tenant environment, LLMOps must also manage model allocation by tier, enforce usage quotas, and ensure that model changes do not disrupt tenant-specific customizations or fine-tuned adaptations.

### LLMOps Pipeline

```
+-----------------------------------------------------------+
|  +----------+   +----------+   +----------+   +----------+|
|  | Prompt   |-->| Evaluate |-->| Deploy   |-->| Monitor  ||
|  | Registry |   | & Test   |   | & Serve  |   | & Observe||
|  +----------+   +----------+   +----------+   +----------+|
|                       |                                    |
|                       v                                    |
|  +----------+   +----------+   +----------+               |
|  |  Cache   |   | Fallback |   |  Audit   |               |
|  |  Layer   |   |  Router  |   |  Trail   |               |
|  +----------+   +----------+   +----------+               |
+-----------------------------------------------------------+
```

### Model Governance

All model deployments require approval through defined governance workflows. Changes to production models are tracked with full audit trails, including who approved the change, evaluation results, and rollback procedures.

---

## Application Guidelines

When implementing LLMOps in multi-tenant systems:

1. **Version everything**: Prompts, models, and configurations must be versioned and auditable
2. **Evaluate before deploying**: Automated evaluation pipelines are mandatory for all changes
3. **Plan for fallback**: Every model deployment needs a fallback chain for provider outages
4. **Tier model access**: Match model capabilities to tenant tier requirements
5. **Monitor continuously**: Quality metrics, cost tracking, and latency are essential for LLM operations

---

## Model Registry

| Component | Purpose | Storage |
|-----------|---------|---------|
| Model catalog | Available models | Database |
| Version history | Model versions | Object storage |
| Prompt library | Prompt templates | Git + DB |
| Adapter store | Fine-tuned weights | Object storage |
| Embedding index | Vector embeddings | Vector DB |
| Config store | Model parameters | Encrypted DB |

### Model-Tenant Mapping

| Tier | Available Models | Default |
|------|------------------|---------|
| Free | Small, efficient | gpt-3.5-turbo |
| Pro | Standard models | gpt-4o |
| Enterprise | All + fine-tuned | Custom |
| White-label | Tenant-dedicated | Configurable |

### Model Fallback Chain

When primary models are unavailable, the system automatically falls back to alternate models while maintaining quality thresholds. Fallback events are logged and trigger alerts for investigation.

---

## Evaluation Framework

| Dimension | Metrics | Method |
|-----------|---------|--------|
| Accuracy | Task success | Ground truth |
| Quality | Coherence | LLM-as-judge |
| Safety | Toxicity, bias | Classifier |
| Efficiency | Latency, tokens | Instrumentation |
| Relevance | Context adherence | Semantic similarity |
| Consistency | Output stability | Cross-run comparison |

### Evaluation Automation

Automated evaluation pipelines run on every prompt or model change. Results are compared against baseline thresholds, and regressions block deployment until resolved.

---

## Deployment Patterns

| Strategy | Risk Level | Rollback Speed |
|----------|------------|----------------|
| Blue-green | Low | Instant |
| Canary | Low | Fast |
| Rolling | Medium | Gradual |
| Shadow | Very low | N/A |

### Canary Flow

| Stage | Traffic % | Duration | Gate |
|-------|-----------|----------|------|
| Shadow | 0% | 24h | No regressions |
| Canary | 5% | 24h | Metrics stable |
| Partial | 25% | 24h | Quality ok |
| Full | 100% | - | All pass |

---

## Monitoring

| Metric | Type | Alert Threshold |
|--------|------|-----------------|
| Latency p99 | Gauge | > 5s |
| Error rate | Rate | > 1% |
| Quality score | Gauge | < baseline 5% |
| Cost/request | Gauge | > budget 20% |

---

## Related Patterns

- `llmops` pattern in `bam-patterns.csv`
- `ai-runtime.md` guide for AI runtime architecture
- `observability.md` guide for monitoring and alerting
- `deployment.md` guide for deployment strategies
- `model-registry-template.md` for output documentation

Load from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `llmops`
- `{project-root}/_bmad/bam/data/ai-runtimes.csv` → runtime configurations

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `llmops` | `LLMOps best practices multi-tenant SaaS {date}` |
| `llmops` | `ML model versioning multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| New model available? | Shadow test, then canary |
| Prompt change? | Version, evaluate, A/B test |
| Quality degradation? | Rollback, investigate |
| Cost optimization? | Model tiering + caching |
| Provider outage? | Activate fallback chain |
| Tenant-specific tuning? | Isolated adapter deployment |
| Compliance requirement? | Region-specific model routing |

---

## Cost Management

| Strategy | Implementation | Savings Potential |
|----------|----------------|-------------------|
| Response caching | Semantic similarity | 30-50% |
| Model tiering | Task complexity routing | 20-40% |
| Batch processing | Async aggregation | 15-25% |
| Context optimization | Prompt compression | 10-20% |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design LLM serving and orchestration architecture
- `bmad-bam-ai-eval-safety-design` - Configure model evaluation and safety guardrails
- `bmad-bam-tenant-aware-observability` - Set up LLM monitoring and cost tracking
