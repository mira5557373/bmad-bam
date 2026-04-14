# ML Model Versioning

**When to load:** When designing ML model versioning systems, implementing model registries, or when user mentions model versioning, model registry, ML lifecycle, or model artifacts in multi-tenant agentic AI platforms.

**Integrates with:** Architect (Nova persona), DevOps agent, Security agent, Analyst agent

---

## Core Concepts

### What is ML Model Versioning?

ML model versioning tracks trained model artifacts (weights, parameters), configurations, and metadata across their lifecycle. In multi-tenant agentic AI platforms, versioning must support tenant-specific models, shared platform models, and complex model lineage tracking.

### Model Version Components

| Component | Description | Example |
|-----------|-------------|---------|
| Model artifact | Trained model weights/parameters | `model.pt`, `model.onnx` |
| Model configuration | Hyperparameters, architecture | `config.yaml` |
| Training metadata | Dataset, metrics, hardware | Training run record |
| Inference metadata | Serving config, resource requirements | Deployment manifest |
| Lineage | Parent models, data provenance | DAG of dependencies |

### Multi-Tenant Model Hierarchy

```
Platform Base Models (shared foundation)
        │
        ▼
Tenant Fine-tuned Models (tenant customization)
        │
        ▼
Agent-Specific Models (per-agent specialization)
        │
        ▼
Version History (complete lineage)
```

---

## Key Patterns

### Pattern 1: Model Version Schema

| Field | Description | Example |
|-------|-------------|---------|
| model_id | Unique model identifier | `mdl_abc123` |
| version | Semantic version | `2.1.3` |
| tenant_id | Tenant context (null for platform) | `tenant_xyz` |
| model_type | Model category | `llm`, `classifier`, `embeddings` |
| base_model_ref | Parent model reference | `mdl_base:1.0.0` |
| artifact_uri | Storage location | `s3://models/tenant_xyz/mdl_abc123/v2.1.3` |
| training_run_id | Training provenance | `run_xyz789` |
| metrics | Performance metrics | `{"accuracy": 0.95, "f1": 0.92}` |
| status | Lifecycle status | `staging`, `production`, `deprecated` |
| created_at | Creation timestamp | `2026-04-11T10:30:00Z` |

### Pattern 2: Version Lifecycle States

| State | Description | Allowed Transitions |
|-------|-------------|---------------------|
| Draft | In development | Staging, Archived |
| Staging | Testing/validation | Production, Draft, Archived |
| Production | Active serving | Deprecated, Rollback |
| Deprecated | Sunset period | Archived |
| Archived | Historical reference | None |
| Rollback | Emergency reversion | Production |

### Pattern 3: Multi-Tenant Model Registry

| Model Scope | Access Control | Versioning Isolation |
|-------------|----------------|---------------------|
| Platform models | Read: all tenants, Write: platform | Global versions |
| Tenant models | Read/Write: tenant only | Per-tenant versions |
| Shared fine-tunes | Read: subscribing tenants | Shared lineage |
| Agent models | Read/Write: owning tenant | Agent-scoped |

---

## Application Guidelines

- Designing model registries for multi-tenant AI platforms
- Implementing model promotion workflows (dev/staging/production)
- Building tenant-isolated model storage
- Creating model lineage tracking systems
- Supporting A/B testing with model versions
- Enabling model rollback and recovery

---

## Multi-Tenant Considerations

### Per-Tier Model Versioning Features

| Tier | Custom Models | Version History | Model Registry Access | Fine-tuning |
|------|---------------|-----------------|----------------------|-------------|
| Free | No | N/A | Platform models only | No |
| Pro | Limited (5) | 10 versions | Read platform + own | Base models |
| Enterprise | Unlimited | Unlimited | Full registry API | Full capability |

### Tenant Model Isolation

| Isolation Aspect | Implementation | Verification |
|------------------|----------------|--------------|
| Artifact storage | Tenant-prefixed paths | Path validation |
| Registry metadata | RLS on model tables | Query audit |
| Training jobs | Tenant-isolated compute | Resource tagging |
| Inference endpoints | Tenant-scoped deployments | Endpoint isolation |

### Model Lineage Tracking

| Lineage Element | Description | Multi-Tenant Handling |
|-----------------|-------------|----------------------|
| Data provenance | Training data sources | Tenant-scoped datasets |
| Model parents | Base models used | Cross-tenant references |
| Training environment | Hardware, framework versions | Shared infrastructure |
| Evaluation datasets | Test/validation data | Tenant-isolated |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Semantic versioning vs auto-increment? | Semantic versioning for production, auto-increment for experiments | Clear communication of change impact |
| Should tenants see platform model versions? | Yes, with abstracted versioning (stable/latest/pinned) | Enables planning without platform internal details |
| How to handle breaking model changes? | Deprecation period with migration path | Prevents tenant disruption |
| Centralized vs distributed model storage? | Centralized registry with tenant-partitioned storage | Single source of truth with isolation |
| How long to retain model versions? | Indefinite for production history, configurable for experiments | Supports audit and rollback requirements |
| Should model metrics be tenant-visible? | Own model metrics yes, platform model metrics aggregated only | Competitive privacy protection |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Integrate model versioning with agent runtime
- `bmad-bam-model-deployment-pipeline` - Design model deployment pipelines
- `bmad-bam-ai-observability-setup` - Monitor model performance
- `bmad-bam-llm-gateway-configuration` - Implement MLOps/LLMOps practices

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Platform patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `ai-runtime`, `ml-ops`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "ML model versioning best practices {date}"
- Search: "multi-tenant model registry patterns {date}"
- Search: "LLM model versioning SaaS platforms {date}"
