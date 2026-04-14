---
name: experiment-report-template
description: Template for documenting AI/ML experiments, A/B tests, and feature experiments in multi-tenant environments
category: ai-runtime
version: "1.0.0"
---

# Experiment Report Template

## Document Information

| Field | Value |
|-------|-------|
| **Experiment ID** | {{experiment_id}} |
| **Project** | {{project_name}} |
| **Hypothesis** | {{hypothesis}} |
| **Date** | {{date}} |
| **Author** | {{author}} |
| **Status** | {{draft|in_progress|completed|abandoned}} |

## Purpose

This template documents AI/ML experiments, A/B tests, and feature experiments in multi-tenant environments, enabling data-driven decisions while maintaining tenant isolation and statistical rigor.

## Experiment Overview

### Hypothesis Statement

**If** {{independent_variable_change}}
**Then** {{expected_outcome}}
**Because** {{rationale}}

### Experiment Type

| Attribute | Value |
|-----------|-------|
| Type | {{a_b_test|multivariate|feature_flag|ml_experiment}} |
| Duration | {{duration}} |
| Sample Size | {{target_sample_size}} |
| Confidence Level | {{confidence_level}}% |
| MDE (Minimum Detectable Effect) | {{mde}}% |

## Variant Configuration

### Control vs Treatment

| Variant | Description | Traffic % | Tenant Scope |
|---------|-------------|-----------|--------------|
| Control | {{control_description}} | {{control_pct}}% | {{control_tenants}} |
| Treatment A | {{treatment_a_description}} | {{treatment_a_pct}}% | {{treatment_a_tenants}} |
| Treatment B | {{treatment_b_description}} | {{treatment_b_pct}}% | {{treatment_b_tenants}} |

### Tenant Segmentation

```yaml
experiment:
  id: {{experiment_id}}
  
  targeting:
    tenant_tiers: [free, pro, enterprise]
    tenant_ids: [{{specific_tenant_ids}}]
    exclusions: [{{excluded_tenant_ids}}]
    
  assignment:
    method: deterministic  # deterministic | random
    salt: "{{experiment_salt}}"
    sticky: true  # User sees same variant across sessions
```

## Success Metrics

### Primary Metrics

| Metric | Baseline | Target | Weight |
|--------|----------|--------|--------|
| {{primary_metric_1}} | {{baseline_1}} | {{target_1}} | {{weight_1}} |
| {{primary_metric_2}} | {{baseline_2}} | {{target_2}} | {{weight_2}} |

### Guardrail Metrics

| Metric | Threshold | Action if Breached |
|--------|-----------|-------------------|
| Error rate | > {{error_threshold}}% | Stop experiment |
| Latency P95 | > {{latency_threshold}}ms | Alert |
| User complaints | > {{complaint_threshold}} | Review |

## Data Collection

### Event Schema

```json
{
  "event_id": "{{uuid}}",
  "experiment_id": "{{experiment_id}}",
  "variant": "{{variant_name}}",
  "timestamp": "{{iso8601}}",
  
  "context": {
    "tenant_id": "{{tenant_id}}",
    "user_id": "{{user_id}}",
    "session_id": "{{session_id}}"
  },
  
  "metrics": {
    "{{metric_name}}": {{metric_value}}
  }
}
```

### Tenant Isolation

| Requirement | Implementation |
|-------------|----------------|
| Data separation | Events tagged with tenant_id |
| Result isolation | Per-tenant statistical analysis |
| Privacy | No cross-tenant metric leakage |

## Results

### Statistical Analysis

| Variant | Sample Size | Conversion | Lift | P-Value | Significant |
|---------|-------------|------------|------|---------|-------------|
| Control | {{control_n}} | {{control_conv}} | - | - | - |
| Treatment A | {{treatment_a_n}} | {{treatment_a_conv}} | {{lift_a}}% | {{p_value_a}} | {{sig_a}} |

### Confidence Intervals

| Variant | Lower Bound | Point Estimate | Upper Bound |
|---------|-------------|----------------|-------------|
| Treatment A vs Control | {{ci_lower}} | {{ci_point}} | {{ci_upper}} |

## Decision

### Recommendation

| Decision | Rationale |
|----------|-----------|
| {{ship|iterate|abandon}} | {{decision_rationale}} |

### Rollout Plan

| Phase | Traffic % | Tenants | Duration |
|-------|-----------|---------|----------|
| Phase 1 | 25% | Pro tier | 1 week |
| Phase 2 | 50% | All paid | 1 week |
| Phase 3 | 100% | All | Permanent |

## Verification Checklist

- [ ] Hypothesis clearly stated
- [ ] Sample size adequate for MDE
- [ ] Tenant isolation maintained
- [ ] Guardrail metrics monitored
- [ ] Statistical significance achieved
- [ ] Results reproducible
- [ ] Decision documented
- [ ] Rollout plan approved

## Web Research Queries

- Search: "A/B testing multi-tenant SaaS {date}"
- Search: "experiment frameworks AI products {date}"
- Search: "statistical significance online experiments {date}"

## Change Log

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | {{date}} | Initial template | Platform Team |
