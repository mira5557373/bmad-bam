# AI Model Versioning

## Core Concept

AI model versioning ensures consistent, auditable, and rollback-capable AI behavior
in multi-tenant environments. Every model configuration change is tracked and
tenant-tier aware.

## Model Registry Structure

```
model_registry/
├── llm/
│   ├── gpt-4o-2024-08-06.yaml      # Specific version pin
│   ├── claude-3-5-sonnet.yaml
│   └── _default.yaml                # Default model config
├── embeddings/
│   ├── text-embedding-3-large.yaml
│   └── _default.yaml
└── registry-index.yaml              # Version catalog
```

## Version Pinning Strategy

| Layer                    | Versioning Approach           | Example                          |
| ------------------------ | ----------------------------- | -------------------------------- |
| **Platform Default**     | Pinned in master-architecture | `gpt-4o-2024-08-06`              |
| **Tenant Tier Override** | Enterprise can specify        | `claude-3-5-sonnet`              |
| **Feature Flag**         | A/B test new models           | `model_v2_rollout: 10%`          |
| **Rollback Target**      | Previous known-good           | `rollback_to: gpt-4o-2024-05-13` |

## Model Configuration Schema

```yaml
model_id: gpt-4o-2024-08-06
provider: openai
status: active | deprecated | experimental
introduced: 2024-08-06
deprecated_date: null # Set when deprecating
tenant_tiers: [free, pro, enterprise] # Which tiers can use
cost_per_1k_input: 0.0025
cost_per_1k_output: 0.01
context_window: 128000
capabilities:
  - vision
  - function_calling
  - json_mode
eval_baseline: evals/gpt-4o-2024-08-06-baseline.json
```

## Multi-Tenant Considerations

1. **Tier-Specific Models**: Enterprise tenants may access newer/more capable models
2. **Cost Isolation**: Model costs tracked per tenant for billing
3. **Eval Parity**: Each tenant tier has eval baselines for their available models
4. **Rollback Scope**: Rollback can be platform-wide or tenant-tier specific

## Deployment Workflow

1. **Stage**: New model added to registry with `status: experimental`
2. **Eval**: Run full eval suite against new model
3. **Canary**: Enable for 5% of requests via feature flag
4. **Monitor**: Track quality metrics, latency, cost for 48-72 hours
5. **Promote**: Change `status: active`, increase rollout percentage
6. **Default**: Update `_default.yaml` to point to new model
7. **Deprecate**: Mark old model `status: deprecated` with sunset date

## Rollback Procedure

1. Detect: Eval threshold breach or incident trigger
2. Decision: Rollback scope (all tenants vs specific tier)
3. Execute: Update feature flag or `_default.yaml`
4. Verify: Confirm evals pass on rollback target
5. Document: Incident report with root cause

## Kill Switch Integration

```yaml
# In kill-switch registry
ai_model_emergency:
  trigger: eval_failure OR cost_spike OR safety_incident
  action: rollback_to_previous_stable
  scope: platform | tenant_tier | specific_tenant
  notify: [oncall, ai-team]
```

## Architecture Integration Points

- **Master Architecture**: Default model pins, eval requirements
- **Module Architecture**: Module-specific model preferences (if any)
- **QG-M3**: Model registry exists, eval baselines defined
- **QG-I3**: Model rollback verified, kill switch tested
- **S9.3.1**: LLM Model Upgrade Protocol — orchestrates assessment, re-baseline, and cost recalibration

## Embedding Model Migration

LLM model versioning (above) covers text generation models. Embedding models require a separate migration strategy because changing the embedding model invalidates all existing vectors — old and new embeddings are incompatible.

| Phase                  | Action                                                                         | Rollback                   |
| ---------------------- | ------------------------------------------------------------------------------ | -------------------------- |
| 1. Create shadow index | New Qdrant collection `{module}_v2` alongside existing `{module}_v1`           | Drop `{module}_v2`         |
| 2. Dual-write          | New ingestions write to both v1 and v2 collections                             | Stop dual-write, drop v2   |
| 3. Backfill            | Background job re-embeds existing documents into v2 (per-tenant, rate-limited) | Pause backfill             |
| 4. Validate            | Compare retrieval quality: same queries against v1 and v2, measure recall@10   | Abort if recall drops >5%  |
| 5. Switch reads        | Feature flag `rag.{module}.index_version=v2` (S21.12)                          | Flip flag back to v1       |
| 6. Decommission        | Drop v1 collection after 1 sprint observation period                           | Cannot rollback after drop |

**Per-tenant scheduling:** Backfill runs as a background job (S21.6.9) scoped per tenant. Enterprise tenants are migrated first (higher data quality requirements). FREE tenants can tolerate brief retrieval degradation during migration.

**Cross-reference:** RAG pipeline boundaries (S4.6) define per-module collections. This migration operates per-module — each module's collection is migrated independently via the shared RAG facade.

## Key Points

- Every model is version-pinned — no "latest" in production
- Eval baselines exist per model per tier before promotion
- Rollback is always possible — previous stable version retained
- Cost tracking per tenant is mandatory for billing accuracy

## Anti-Pattern

| Anti-Pattern                 | Problem                                        | Correct Approach                         |
| ---------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Using "latest" model tag     | Behavior changes without notice                | Pin exact model version                  |
| Promoting without eval suite | Quality regression undetected                  | Full eval pass required before promotion |
| Platform-wide rollback only  | Enterprise tenant disrupted by free-tier issue | Support tier-scoped rollback             |
| No kill switch for AI models | Cannot stop bad model quickly                  | Kill switch with automatic rollback      |

See also: agent-runtime-patterns.md, agent-lifecycle-versioning-patterns.md, memory-tier-patterns.md
