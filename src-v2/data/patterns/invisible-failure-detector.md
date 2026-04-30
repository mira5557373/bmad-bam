---
pattern_id: invisible-failure-detector
shortcode: ZIF
category: operations
qg_ref: QG-AI2
version: 1.0.0
last_reviewed: 2026-04-30
---

# Invisible Failure Detector - BAM Pattern

**Loaded by:** ZIF  
**Applies to:** Detecting AI failures that don't throw exceptions but produce degraded outputs  
**See also:** [ai-observability.md](ai-observability.md), [circuit-breaker.md](circuit-breaker.md)

---

## When to Use

- AI systems where output quality degradation isn't immediately obvious
- LLM responses that may be coherent but factually wrong
- Agents that complete tasks but with suboptimal results
- Systems requiring quality SLAs per tenant tier
- Production environments with business-critical AI features

## When NOT to Use

- Development environments (manual review sufficient)
- Systems with clear pass/fail outputs
- Batch processing with post-hoc review
- Low-stakes AI features

## Architecture

### Detection Method Stack

```
┌─────────────────────────────────────────────────────────────┐
│               Invisible Failure Detection                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Output Quality Scoring                                 │ │
│  │   • Coherence score (semantic consistency)             │ │
│  │   • Relevance score (query-response alignment)         │ │
│  │   • Completeness score (task coverage)                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Baseline Comparison                                    │ │
│  │   • Historical output distribution                     │ │
│  │   • Rolling baseline window                            │ │
│  │   • Drift threshold detection                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Response Time Anomaly                                  │ │
│  │   • p99 latency baseline                               │ │
│  │   • Anomaly detection                                  │ │
│  │   • Correlate with quality drop                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Empty/Minimal Response Detection                       │ │
│  │   • Min response length check                          │ │
│  │   • Refusal pattern detection                          │ │
│  │   • Repetitive output detection                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Detection Configuration Schema (P1-01)

```yaml
invisible_failure_detection:
  version: "1.0.0"
  bam_controlled: true
  
  detection_methods:
    output_quality_scoring:
      enabled: bool
      metrics: list[string]
      threshold: float
      
    baseline_comparison:
      enabled: bool
      baseline_window_hours: int
      drift_threshold_percent: int
      
    response_time_anomaly:
      enabled: bool
      p99_multiplier: float
      
    empty_response_detection:
      enabled: bool
      min_response_length: int
      refusal_patterns: list[string]
      
  tenant_configuration:
    per_tenant_baselines: bool
    tier_thresholds:
      free: float
      pro: float
      enterprise: float
      
  alerting:
    on_degradation:
      severity: enum[info, warning, critical]
      auto_escalate_after_minutes: int
    on_failure:
      severity: enum[info, warning, critical]
      page_oncall: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Quality scoring only | Fast, cheap | May miss subtle issues | MVP |
| Baseline comparison | Catches drift | Needs historical data | Mature systems |
| Full stack | Best coverage | Complexity, cost | Production SaaS |
| Per-tenant baselines | Accurate | Storage overhead | Multi-tenant |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Alert fatigue | Deduplication, severity levels |
| Baseline poisoning | Anomaly detection on baseline updates |
| Privacy in logging | Redact PII from quality logs |
| Performance impact | Sample-based scoring for high volume |

## Web Research Queries

- "AI output quality monitoring patterns {date}"
- "invisible failure detection machine learning {date}"
- "LLM response quality scoring {date}"
- "silent degradation detection AI systems {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI2 | Invisible failure detection implemented |

## Related Patterns

- [ai-observability.md](ai-observability.md) - AI monitoring
- [circuit-breaker.md](circuit-breaker.md) - Failure handling
- [output-drift-monitor.md](output-drift-monitor.md) - Drift detection
