---
pattern_id: predictive-scaling
shortcode: ZPR
category: scaling
qg_ref: QG-SC2
version: 1.0.0
last_reviewed: 2026-05-01
---

# Predictive Scaling - BAM Pattern

**Loaded by:** ZPR  
**Applies to:** Multi-tenant SaaS platforms requiring proactive capacity management

---

## When to Use

- Workloads with predictable daily/weekly/seasonal patterns
- Tenant activity follows business hours or known schedules
- Cost optimization through right-sized capacity
- Need to eliminate cold-start latency during traffic spikes
- SLA requirements that reactive scaling cannot meet
- Multi-tenant platforms with diverse tenant usage patterns

## When NOT to Use

- Completely unpredictable traffic patterns
- Low-volume applications where over-provisioning is cheap
- Real-time reactive scaling is sufficient
- Insufficient historical data (<30 days)
- Cost of prediction infrastructure exceeds savings

## Architecture

### Predictive vs Reactive Scaling

```
                    REACTIVE                         PREDICTIVE
                    
Traffic ──────────────┐                 Traffic ──────────────┐
                      │                                       │
                      ▼                                       ▼
              ┌───────────────┐                       ┌───────────────┐
              │ Threshold     │                       │ ML Forecast   │
              │ Exceeded      │                       │ Model         │
              └───────┬───────┘                       └───────┬───────┘
                      │                                       │
                      ▼                                       ▼
              ┌───────────────┐                       ┌───────────────┐
              │ Scale Action  │                       │ Pre-warm      │
              │ (AFTER spike) │                       │ (BEFORE spike)│
              └───────────────┘                       └───────────────┘
                      │                                       │
                      ▼                                       ▼
              [Latency during                         [No latency
               scale-up]                               impact]
```

### ML-Based Demand Forecasting Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                    Prediction Pipeline                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │ Ingest   │───▶│ Feature  │───▶│ Model    │───▶│ Scaling  │  │
│  │ Metrics  │    │ Engineer │    │ Predict  │    │ Decision │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
│       │               │               │               │        │
│       ▼               ▼               ▼               ▼        │
│  - Request rate   - Hour of day   - Forecast     - Scale up    │
│  - Active users   - Day of week   - Confidence   - Scale down  │
│  - Queue depth    - Tenant tier   - Anomaly      - Hold        │
│  - CPU/Memory     - Seasonality   - Uncertainty               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Tenant-Aware Prediction Models

```
┌─────────────────────────────────────────────────────────────────┐
│                    Multi-Tenant Prediction                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Global Model    │  │ Tier Models     │  │ Tenant Models   │ │
│  │ (All tenants)   │  │ (Free/Pro/Ent)  │  │ (Large tenants) │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
│           │                    │                    │          │
│           └────────────┬───────┴────────────────────┘          │
│                        ▼                                       │
│              ┌─────────────────┐                               │
│              │  Ensemble       │                               │
│              │  Prediction     │                               │
│              └────────┬────────┘                               │
│                       │                                        │
│                       ▼                                        │
│              ┌─────────────────┐                               │
│              │ Confidence      │                               │
│              │ Weighted Sum    │                               │
│              └─────────────────┘                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Configuration Schema

```yaml
predictive_scaling:
  tenant_id: uuid
  bam_controlled: true
  
  data_collection:
    metrics_retention_days: 90
    granularity_minutes: 5
    features:
      - request_rate
      - active_users
      - queue_depth
      - cpu_utilization
      - memory_utilization
      - error_rate
      
  model_config:
    algorithm: enum[prophet, lstm, xgboost, ensemble]
    training_frequency: daily
    prediction_horizon_hours: 24
    confidence_threshold: 0.8
    
  tenant_segmentation:
    use_global_model: bool  # default: true
    use_tier_models: bool   # default: true
    individual_tenant_models:
      min_history_days: 30
      min_daily_requests: 1000
      
  scaling_policy:
    pre_warm_lead_time_minutes: 15
    scale_up_buffer_percent: 20  # Over-provision by 20%
    fallback_to_reactive: bool   # If prediction confidence low
    
  seasonality:
    daily_patterns: bool
    weekly_patterns: bool
    monthly_patterns: bool
    custom_events:
      - name: "black_friday"
        start: "2026-11-27"
        end: "2026-11-30"
        scale_factor: 3.0
```

### Prediction Accuracy Monitoring

```
┌───────────────────────────────────────────────────────────┐
│                  Prediction Accuracy                       │
├───────────────────────────────────────────────────────────┤
│                                                           │
│  Metric: Mean Absolute Percentage Error (MAPE)            │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Time     │ Predicted │ Actual  │ Error │ Action    │  │
│  ├──────────┼───────────┼─────────┼───────┼───────────┤  │
│  │ 09:00    │ 1000 RPS  │ 950 RPS │ 5.2%  │ Good      │  │
│  │ 12:00    │ 2000 RPS  │ 2100    │ 4.8%  │ Good      │  │
│  │ 15:00    │ 1500 RPS  │ 2500    │ 40%   │ Retrain   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                           │
│  Thresholds:                                              │
│  - MAPE < 10%: Excellent                                  │
│  - MAPE 10-20%: Acceptable                                │
│  - MAPE > 20%: Trigger model retraining                   │
│                                                           │
└───────────────────────────────────────────────────────────┘
```

### Historical Pattern Analysis

| Pattern Type | Detection Method | Scaling Impact |
|--------------|-----------------|----------------|
| Daily peaks | Hour-of-day aggregation | Pre-warm before business hours |
| Weekly cycles | Day-of-week analysis | Weekend scale-down |
| Monthly billing | Date patterns | End-of-month capacity |
| Seasonal | Year-over-year comparison | Holiday preparation |
| Tenant-specific | Individual tenant time series | VIP tenant pre-warming |

### Fallback Strategy

```
Prediction Generated
        │
        ▼
┌───────────────┐
│ Confidence    │
│ > 80%?        │
└───────┬───────┘
        │
   YES ─┴─ NO
    │      │
    ▼      ▼
┌────────┐ ┌────────────┐
│ Apply  │ │ Fallback   │
│ Predic │ │ to Reactive│
│ Scaling│ │ Scaling    │
└────────┘ └────────────┘
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Global model | Simple, works with limited data | Ignores tenant patterns | Small tenant base |
| Per-tier models | Balances accuracy/complexity | Requires tier-level data | Medium scale |
| Per-tenant models | Most accurate | ML ops overhead | Enterprise tenants |
| Ensemble | Best accuracy | Most complex | Mission-critical SLA |

## Quality Checks

- [ ] Historical data collection configured (minimum 30 days)
- [ ] Model training pipeline operational
- [ ] Prediction accuracy monitoring in place
- [ ] Fallback to reactive scaling configured
- [ ] **CRITICAL:** Pre-warming does not impact existing tenant performance
- [ ] Cost savings tracked vs pure reactive approach

## Web Research Queries

- "predictive autoscaling machine learning patterns {date}"
- "AWS predictive scaling best practices {date}"
- "time series forecasting infrastructure capacity {date}"
- "multi-tenant demand forecasting ML {date}"
- "Kubernetes predictive horizontal pod autoscaler {date}"
- "prophet forecasting infrastructure scaling {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-SC2 | Predictive scaling pattern implementation verified |

## Related Patterns

- [vertical-scaling.md](vertical-scaling.md) - Reactive vertical scaling
- [load-balancing.md](load-balancing.md) - Traffic distribution
- [usage-analytics.md](usage-analytics.md) - Tenant usage data for predictions
- [ai-observability.md](ai-observability.md) - ML model monitoring
