# LLM Versioning - BAM Domain Context

**Loaded by:** AI architects, Platform engineers  
**Related Workflows:** bmad-bam-llm-versioning, bmad-bam-agent-runtime

---

## Overview

LLM versioning manages model lifecycle, prompt versioning, and tenant-specific model configurations to ensure reproducibility and controlled rollouts across a multi-tenant platform.

## Core Concepts

### Version Components

| Component | Versioning Scope | Tenant Control |
|-----------|------------------|----------------|
| Base Model | Platform-wide | Tier-based access |
| Fine-tuned Model | Per-tenant optional | Enterprise+ |
| Prompt Templates | Platform + tenant overrides | Pro+ |
| System Prompts | Platform-managed | None |
| RAG Indices | Per-tenant | All tiers |

### Model Version Lifecycle

```
Development
    │
    ▼
┌─────────────────┐
│ Shadow Testing  │ ← Run alongside production
└────────┬────────┘
         │ Metrics validated
         ▼
┌─────────────────┐
│ Canary (5%)     │ ← Selected tenants
└────────┬────────┘
         │ Quality gates pass
         ▼
┌─────────────────┐
│ Gradual Rollout │ ← Tier-based promotion
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Production      │ ← All tenants
└─────────────────┘
```

### Tenant Model Configuration

| Tier | Model Access | Customization |
|------|--------------|---------------|
| Free | Platform default | None |
| Pro | Model selection | Prompt overrides |
| Enterprise | Full catalog | Fine-tuning, BYOK |
| OEM | Custom models | Full control |

## Decision Matrix

| Requirement | Approach | Rationale |
|-------------|----------|-----------|
| Reproducibility | Immutable versions | Audit trail |
| A/B testing | Shadow deployment | Safe comparison |
| Tenant customization | Config-driven | No code changes |
| Rollback capability | Version pinning | Instant recovery |

## Quality Checks

- [ ] Model versions are immutable once deployed
- [ ] Prompt changes versioned with tenant scope
- [ ] **CRITICAL:** Model access respects tenant tier
- [ ] Rollback tested for each model version

## Web Research Queries

- "LLM model versioning production patterns {date}"
- "Multi-tenant AI model management {date}"
- "Prompt versioning best practices {date}"
