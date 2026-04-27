# BAM Learning Loop Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing continuous improvement,
or when user mentions feedback, fine-tuning, or model improvement.

**Integrates with:** Nova (AI Runtime), L18 Continual Learning layer

---

## Core Concepts

### Learning Loop Overview

The Learning Loop enables tenant-aware model improvement without cross-contamination.

```
Feedback → Aggregate → Validate → Train → Deploy
    │          │           │        │        │
    └──────────┴───────────┴────────┴────────┘
                   Learning Loop
              (Tenant-isolated improvement)
```

### Feedback Categories

| Type | Source | Tenant Scope | Usage |
|------|--------|--------------|-------|
| Explicit | Thumbs up/down | Per-tenant | Direct signal |
| Implicit | Completion rate | Per-tenant | Inferred signal |
| Correction | User edits | Per-tenant | Gold label |
| Escalation | Human takeover | Per-tenant | Failure signal |

### Tenant Data Isolation in Learning

```yaml
learning_isolation:
  # Option 1: Per-tenant fine-tuning (expensive)
  per_tenant_model:
    enabled: enterprise_only
    min_samples: 1000
  
  # Option 2: Federated learning (privacy-preserving)
  federated:
    enabled: true
    aggregation: differential_privacy
    epsilon: 1.0
  
  # Option 3: Shared with consent
  shared_pool:
    requires_consent: true
    anonymization: required
```

### Learning Pipeline Stages

| Stage | Tenant Boundary | Data Handling |
|-------|-----------------|---------------|
| Collection | Per-tenant bucket | Encrypted at rest |
| Aggregation | Cross-tenant (with consent) | Differential privacy |
| Validation | Platform-wide | Quality gates |
| Training | Isolated compute | No data mixing |
| Deployment | Gradual rollout | A/B by tenant tier |

## Application Guidelines

1. **Never mix tenant feedback** - Strict isolation by default
2. **Require consent for shared learning** - GDPR compliance
3. **Apply differential privacy** - Mathematical privacy guarantee
4. **Validate before training** - Quality gate on feedback

### Feedback Quality Gates

Not all feedback is equally valuable. Implement quality gates to filter low-quality signals before they enter the learning pipeline. Explicit feedback (thumbs up/down) generally has higher signal quality than implicit signals (completion rate), but both require validation.

```yaml
quality_gates:
  explicit_feedback:
    min_confidence: 0.8
    require_context: true
    deduplicate: true
  
  implicit_feedback:
    min_session_length: 30s
    require_completion: true
    exclude_bounces: true
  
  corrections:
    require_diff: true
    min_change_length: 10
    validate_format: true
```

### Model Versioning

Tenant-specific fine-tuned models require careful versioning to enable rollback and A/B testing. Each model version should track its training data lineage, hyperparameters, and performance metrics. Models should support gradual rollout with automatic rollback on quality degradation.

| Version Stage | Traffic | Monitoring | Rollback |
|---------------|---------|------------|----------|
| Canary | 5% | Real-time | Automatic |
| Beta | 25% | Hourly | Manual |
| Production | 100% | Daily | Emergency |

### Privacy-Preserving Aggregation

Federated learning enables cross-tenant improvement without sharing raw data. Each tenant's model updates are encrypted and aggregated using secure multi-party computation or differential privacy. The aggregated model improves for all tenants while protecting individual tenant data.

## Decision Framework

| Scenario | Learning Strategy | Rationale |
|----------|------------------|-----------|
| Enterprise tenant | Per-tenant fine-tune | Custom behavior |
| Standard tenants | Federated learning | Privacy + scale |
| Free tier | Shared pool (consent) | Cost efficiency |
| Regulated industry | No cross-tenant | Compliance |

## Related Workflows

- `bmad-bam-ai-feedback-loop` - Feedback collection design
- `bmad-bam-agent-runtime-architecture` - Runtime integration

## Related Patterns

Load from pattern registry:

- **Learning patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `learning-loop-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "federated learning multi-tenant AI {date}"
- Search: "RLHF tenant isolation patterns {date}"
