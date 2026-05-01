---
pattern_id: output-drift-monitor
shortcode: ZOD
category: ai-runtime
qg_ref: QG-AI2
version: 1.0.0
last_reviewed: 2026-04-30
---

# Output Drift Monitor - BAM Pattern

**Loaded by:** ZOD  
**Applies to:** Monitoring AI output quality over time to detect model drift  
**See also:** [ai-observability.md](ai-observability.md), [invisible-failure-detector.md](invisible-failure-detector.md)

---

## When to Use

- Production AI systems with quality SLAs
- LLM-powered features requiring consistent behavior
- Systems sensitive to model updates or fine-tuning
- Multi-tenant platforms with per-tenant quality monitoring
- Regulated environments requiring quality documentation

## When NOT to Use

- Development/staging environments
- AI features without quality requirements
- Systems with frequent intentional output changes
- Short-lived deployments

## Architecture

### Drift Detection Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   Output Drift Monitoring                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Baseline Establishment                 │ │
│  │   Period: configurable | Sample: configurable          │ │
│  │   Metrics: length, sentiment, topic, quality score     │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Continuous Collection                  │ │
│  │   Window: rolling | Sampling: configurable rate        │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Drift Detection                        │ │
│  │   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │ │
│  │   │ Statistical │ │  Embedding  │ │ Categorical │     │ │
│  │   │  (KS Test)  │ │  (Cosine)   │ │(Chi-Squared)│     │ │
│  │   └─────────────┘ └─────────────┘ └─────────────┘     │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Alert & Action                         │ │
│  │   Warning: drift > threshold | Critical: drift > 2x    │ │
│  │   Auto-rollback: optional                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Monitoring Configuration Schema (P1-01)

```yaml
output_drift_monitoring:
  version: "1.0.0"
  bam_controlled: true
  
  baseline:
    establishment_period_days: int
    sample_size: int
    metrics: list[string]
      
  drift_detection:
    methods:
      statistical: string
      embedding: string
      categorical: string
    window_hours: int
    comparison_period_days: int
    
  thresholds:
    warning: float
    critical: float
    
  tenant_segmentation:
    per_tenant_baselines: bool
    aggregate_platform_baseline: bool
    
  alerting:
    on_drift:
      notify: list[string]
      auto_rollback: enum[enabled, disabled, optional]
```

### Metric Definitions Schema (P1-02)

```yaml
drift_metrics:
  response_length:
    type: enum[continuous, categorical, embedding]
    test: string
    
  sentiment:
    type: enum[continuous, categorical, embedding]
    categories: list[string]
    test: string
    
  topic:
    type: enum[continuous, categorical, embedding]
    model: string
    test: string
    
  quality_score:
    type: enum[continuous, categorical, embedding]
    range: list[float]
    test: string
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Statistical only | Fast, cheap | May miss semantic drift | Cost-conscious |
| Embedding-based | Catches semantic changes | Compute cost | Quality-focused |
| Per-tenant baselines | Accurate per customer | Storage overhead | Multi-tenant |
| Auto-rollback | Fast response | Risk of false positive rollback | Critical systems |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Baseline manipulation | Anomaly detection on baseline updates |
| Alert fatigue | Configurable thresholds, deduplication |
| Privacy in metrics | Aggregate metrics only, no raw content |
| Performance impact | Sampling for high-volume systems |


## Quality Checks

- [ ] Agent execution respects tenant boundaries
- [ ] State management includes tenant context
- [ ] Checkpointing configured for long-running workflows
- [ ] Timeout and retry policies defined
- [ ] **CRITICAL:** No cross-tenant state leakage

## Web Research Queries

- "ML model drift detection patterns {date}"
- "LLM output quality monitoring {date}"
- "statistical drift detection techniques {date}"
- "embedding-based drift detection {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI2 | Output drift monitoring implemented |

## Related Patterns

- [ai-observability.md](ai-observability.md) - AI monitoring
- [invisible-failure-detector.md](invisible-failure-detector.md) - Silent failure detection
- [ai-verification.md](ai-verification.md) - Output verification
