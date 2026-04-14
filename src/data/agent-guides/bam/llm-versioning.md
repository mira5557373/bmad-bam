# LLM Versioning

**When to load:** When designing LLM lifecycle management, implementing model version control, or when user mentions model updates, A/B testing models, or model deprecation.

**Integrates with:** Architect (Nova persona), DevOps agent, Dev agent

---

## Core Concepts

### What is LLM Versioning?

LLM versioning manages the lifecycle of LLM models (provider APIs like OpenAI, Anthropic) in a multi-tenant SaaS platform, including version tracking, rollout strategies, tenant-specific model assignments, and deprecation workflows.

### Versioning Dimensions

| Dimension | Description | Example |
|-----------|-------------|---------|
| Provider version | Upstream model release | `gpt-4-0125-preview` |
| Platform alias | Internal reference | `default-chat-v3` |
| Tenant override | Per-tenant assignment | `enterprise-custom-v1` |
| Feature binding | Feature-to-model map | `summarization → claude-3-sonnet` |

---

## Key Patterns

### Pattern 1: Model Registry

Centralized registry of available models:

| Field | Description | Example |
|-------|-------------|---------|
| model_id | Unique identifier | `openai-gpt4-turbo-0125` |
| provider | LLM provider | `openai`, `anthropic` |
| capabilities | Supported features | `chat`, `function_calling` |
| cost_per_token | Pricing info | `input: 0.01, output: 0.03` |
| status | Availability | `active`, `deprecated`, `beta` |
| tier_access | Allowed tiers | `[pro, enterprise]` |

### Pattern 2: Tenant Model Assignment

| Assignment Type | Description | Use Case |
|----------------|-------------|----------|
| Platform default | Global default model | All tenants baseline |
| Tier default | Per-tier assignment | Feature differentiation |
| Tenant override | Explicit tenant choice | Enterprise customization |
| Feature routing | Per-feature model | Optimized performance |

### Pattern 3: Rollout Strategy

| Strategy | Description | Risk Level |
|----------|-------------|------------|
| Canary | Small % first | Low |
| Ring-based | Tier-by-tier | Medium |
| Feature flag | Opt-in tenants | Low |
| Big bang | All at once | High |

---

## Application Guidelines

- Planning LLM provider migrations
- Implementing A/B testing for models
- Building tenant-specific model configurations
- Managing model deprecation timelines
- Cost optimization through model routing

---

## Deprecation Workflow

| Phase | Duration | Actions |
|-------|----------|---------|
| Announcement | 30 days | Notify affected tenants |
| Migration | 60 days | Provide migration tools |
| Soft deprecation | 30 days | Warnings on usage |
| Hard deprecation | Final | Route to replacement |

---

## Per-Tier Model Access

| Tier | Models Available | Custom Models | Version Control |
|------|------------------|---------------|-----------------|
| Free | 1 (economy) | No | Platform-managed |
| Pro | 5 | No | Platform-managed |
| Enterprise | All + custom | Yes | Tenant-controlled |

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should tenants control their model versions? | Enterprise tier yes, other tiers platform-managed | Enterprise customers have compliance needs; platform manages complexity for others |
| How to handle upstream model deprecation? | 30-day notice, automatic migration with opt-out for enterprise | Provides transition time while preventing stranded tenants |
| When to use canary vs ring-based rollout? | Canary for minor updates, ring-based for major model changes | Canary catches issues early; ring-based controls blast radius for significant changes |
| Should model aliases be tenant-specific? | Platform aliases by default, tenant overrides for enterprise | Simplifies management while enabling enterprise customization |
| How long to support deprecated model versions? | 90 days minimum, longer for enterprise contracts | Balances operational cost with customer migration needs |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Configure model selection per tenant tier
- `bmad-bam-ai-eval-safety-design` - Evaluate model versions for safety compliance
- `bmad-bam-tenant-model-isolation` - Design tenant-specific model assignments

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `llmops`, `agent-runtime`
- **Related guides:** `feature-toggle-patterns` guide

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "LLMOps model versioning best practices {date}"
- Search: "multi-tenant LLM model management {date}"
- Search: "AI model rollout strategies {date}"
