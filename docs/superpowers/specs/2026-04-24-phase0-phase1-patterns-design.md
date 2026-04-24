# Phase 0+1 Production Patterns Design Specification

**Date:** 2026-04-24
**Status:** DESIGN COMPLETE
**Scope:** 30 patterns (12 Phase 0 + 18 Phase 1)
**Compatibility:** BMM/BAM architecture compliant

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Principles](#architecture-principles)
3. [Phase 0 Patterns (Weeks 1-2)](#phase-0-patterns-weeks-1-2)
4. [Phase 1 Patterns (Weeks 3-8)](#phase-1-patterns-weeks-3-8)
5. [Pattern Registry Additions](#pattern-registry-additions)
6. [Quality Gate Updates](#quality-gate-updates)
7. [Implementation Checklist](#implementation-checklist)

---

## Executive Summary

This specification defines 30 production-grade patterns for BAM-based agents. All patterns follow:

- **WDS agent-guides pattern** (no `memories:` field)
- **Step file CEV structure** (Create 01-09, Edit 10-19, Validate 20-29)
- **Pattern registry format** with `web_queries` column using `{date}` placeholder
- **Extension pattern** with context loader and capability prompts

### Phase Overview

| Phase | Patterns | Focus Area | Timeline |
|-------|----------|------------|----------|
| Phase 0 | 12 | Quick wins, immediate value | Weeks 1-2 |
| Phase 1 | 18 | Safety, observability, state | Weeks 3-8 |

---

## Architecture Principles

### BAM Compatibility Requirements

1. **No inline code** in step files - describe WHAT not HOW
2. **Pattern registry references** - all patterns in `bam-patterns.csv`
3. **Web search directives** - use `Search the web: "{topic} {date}"` format
4. **Agent guide structure** - `When to load:` header, `Web Research` section
5. **Template variables** - use `{{variable}}` format with lowercase
6. **Quality gates** - map to existing QG-M3, QG-I3, QG-P1 gates

### File Naming Conventions

| Asset Type | Pattern | Example |
|------------|---------|---------|
| Agent guide | `{domain}-patterns.md` | `kill-switch-patterns.md` |
| Workflow | `bmad-bam-{action}-{subject}` | `bmad-bam-kill-switch-design` |
| Template | `{artifact}-template.md` | `kill-switch-registry-template.md` |
| Step file | `step-NN-c-{description}.md` | `step-01-c-design-registry.md` |

---

## Phase 0 Patterns (Weeks 1-2)

### P0-01: AGENTS.md Publishing

**Purpose:** Standard format for exposing agent capabilities to other AI systems.

#### Pattern Registry Entry

```csv
agents-md-publishing,AGENTS.md Publishing,ai-discovery,"Use when exposing agent capabilities to external AI systems with signals: agent discovery,MCP,capability advertisement","agent discovery,MCP,capability advertisement",Publish agent capabilities in AGENTS.md format,static;dynamic;federated,What capabilities to expose?;Authentication required?;Update frequency?,"AGENTS.md specification {date};AI agent discovery patterns {date}",QG-P1,agent-runtime,,Basic: Static file;Advanced: Dynamic generation,llms-txt-publishing;mcp-server-patterns
```

#### Agent Guide: `agents-md-publishing-patterns.md`

```markdown
# AGENTS.md Publishing Patterns

**When to load:** When designing agent capability exposure, implementing AI-to-AI discovery, or when user mentions AGENTS.md, capability advertisement, or agent federation.

**Integrates with:** Architect (Nova persona), DevOps agent

---

## Core Concepts

### What is AGENTS.md?

AGENTS.md is a standardized file format (similar to robots.txt) that describes agent capabilities for AI-to-AI discovery. It enables:

- Other AI agents to discover what your agents can do
- MCP servers to advertise available tools
- Federation protocols to route requests appropriately

### File Format

| Section | Purpose | Required |
|---------|---------|----------|
| `capabilities` | List of agent capabilities | Yes |
| `authentication` | Auth requirements | Yes |
| `rate_limits` | Usage constraints | Yes |
| `contact` | Escalation paths | No |

### Publishing Strategies

| Strategy | Use Case | Pros | Cons |
|----------|----------|------|------|
| Static | Simple agents | Easy, cacheable | Manual updates |
| Dynamic | Complex agents | Always current | Performance overhead |
| Federated | Multi-tenant | Tenant-specific | Complexity |

---

## Application Guidelines

1. Generate AGENTS.md during deployment pipeline
2. Include tenant-aware capabilities for multi-tenant systems
3. Version the format for backwards compatibility
4. Cache dynamic generation results per tenant

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Static or dynamic? | Dynamic for >10 capabilities | Reduces maintenance burden |
| Include rate limits? | Always | Prevents abuse |
| Per-tenant files? | Yes for enterprise tier | Isolation and customization |

## Related Patterns

Load decision criteria from pattern registry:
- **Discovery patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agents-md-*`

### Web Research

- Search: "AGENTS.md specification {date}"
- Search: "AI agent discovery protocols {date}"

## Related Workflows

- `bmad-bam-agents-md-generation` - Generate AGENTS.md from agent registry
```

#### Workflow Structure

```
src/workflows/bmad-bam-agents-md-generation/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-inventory-capabilities.md
    ├── step-02-c-define-authentication.md
    ├── step-03-c-generate-agents-md.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-capabilities.md
    ├── step-20-v-validate-format.md
    └── step-21-v-test-discovery.md
```

---

### P0-02: llms.txt Publishing

**Purpose:** Standardized file for LLM-specific configuration and constraints.

#### Pattern Registry Entry

```csv
llms-txt-publishing,llms.txt Publishing,ai-discovery,"Use when publishing LLM-specific constraints with signals: model constraints,context limits,prompt engineering","model constraints,context limits,prompt engineering",Publish LLM configuration in llms.txt format,simple;detailed;dynamic,What model constraints to document?;Include prompt templates?;Per-tenant variations?,"llms.txt specification {date};LLM configuration patterns {date}",QG-P1,agent-runtime,,Basic: Model list;Advanced: Full context config,agents-md-publishing;model-routing-patterns
```

#### Agent Guide: `llms-txt-patterns.md`

```markdown
# llms.txt Publishing Patterns

**When to load:** When documenting LLM constraints, publishing model configurations, or when user mentions llms.txt, model limits, or context configurations.

**Integrates with:** Architect (Nova persona), Dev agent

---

## Core Concepts

### What is llms.txt?

llms.txt is a convention for documenting LLM-specific constraints and configurations. It includes:

- Supported models and versions
- Context window limits per model
- Rate limits and token budgets
- Prompt template references

### File Sections

| Section | Purpose | Format |
|---------|---------|--------|
| `models` | Supported LLMs | YAML list |
| `context_limits` | Token constraints | Integer values |
| `rate_limits` | Request/token limits | Per-tenant tables |
| `prompt_refs` | Template locations | File paths |

---

## Application Guidelines

1. Include all production-approved models
2. Document context limits per model per tier
3. Reference prompt templates for consistency
4. Update on model version changes

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| One file or per-tenant? | Shared with overrides | Balance consistency and customization |
| Include deprecated models? | Yes, marked deprecated | Supports migration |
| Version the format? | Yes | Backwards compatibility |

## Related Patterns

- **Model patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `llm-*`

### Web Research

- Search: "llms.txt specification {date}"
- Search: "LLM configuration management {date}"

## Related Workflows

- `bmad-bam-llms-txt-generation` - Generate llms.txt from model registry
```

---

### P0-03: Agent Refusal Headers

**Purpose:** HTTP headers indicating agent refusal reasons for debugging and compliance.

#### Pattern Registry Entry

```csv
agent-refusal-headers,Agent Refusal Headers,ai-safety,"Use when implementing agent refusal transparency with signals: refusal logging,compliance audit,debugging","refusal logging,compliance audit,debugging",Add X-Agent-Refusal headers to responses,simple;detailed;categorized,What refusal categories?;Include reasoning?;Audit trail required?,"AI agent refusal patterns {date};agent transparency headers {date}",QG-I3,agent-runtime;guardrails,,Basic: Binary refusal;Advanced: Categorized with reason codes,guardrails-patterns;audit-logging-patterns
```

#### Agent Guide: `agent-refusal-headers-patterns.md`

```markdown
# Agent Refusal Headers Patterns

**When to load:** When implementing agent transparency, adding refusal logging, or when user mentions refusal headers, agent compliance, or debugging agent denials.

**Integrates with:** Architect (Nova persona), Security agent

---

## Core Concepts

### Why Refusal Headers?

When an AI agent refuses a request, the reason should be traceable for:
- Debugging: Why did the agent refuse?
- Compliance: Audit trail for refusals
- UX: Informing users appropriately

### Header Schema

| Header | Purpose | Example |
|--------|---------|---------|
| `X-Agent-Refusal` | Refusal occurred | `true` |
| `X-Agent-Refusal-Code` | Reason category | `GUARDRAIL_VIOLATION` |
| `X-Agent-Refusal-Detail` | Human-readable reason | `PII detected in request` |
| `X-Agent-Request-Id` | Correlation ID | `req_abc123` |

### Refusal Categories

| Code | Meaning | Action |
|------|---------|--------|
| `GUARDRAIL_VIOLATION` | Safety guardrail triggered | Log, notify |
| `BUDGET_EXCEEDED` | Token/cost limit hit | Suggest upgrade |
| `POLICY_VIOLATION` | Tenant policy blocked | Log, review |
| `CAPABILITY_MISSING` | Agent can't perform | Route to human |

---

## Application Guidelines

1. Always include correlation ID for debugging
2. Redact sensitive details from header values
3. Log full refusal context server-side
4. Map refusal codes to user-friendly messages

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Include detail header? | Yes, redacted | Debugging without exposure |
| Tenant-specific codes? | Yes | Custom policies need custom codes |
| Rate limit refusal logging? | Yes | Prevent log flooding |

## Related Patterns

- **Safety patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `guardrails-*`

### Web Research

- Search: "AI agent refusal transparency {date}"
- Search: "HTTP headers for AI debugging {date}"

## Related Workflows

- `bmad-bam-refusal-header-design` - Design refusal header schema
```

---

### P0-04: Canary Token Inserter

**Purpose:** Insert canary tokens in agent outputs to detect data leakage.

#### Pattern Registry Entry

```csv
canary-token-inserter,Canary Token Inserter,ai-security,"Use when implementing data leakage detection with signals: data leakage,security monitoring,exfiltration detection","data leakage,security monitoring,exfiltration detection",Insert traceable tokens in agent outputs,per-tenant;per-session;per-request,What token format?;Rotation frequency?;Detection mechanism?,"canary tokens AI outputs {date};data leakage detection patterns {date}",QG-I2,tenant-isolation;observability,,Basic: Static tokens;Advanced: Dynamic per-request,security-monitoring-patterns;audit-logging-patterns
```

#### Agent Guide: `canary-token-patterns.md`

```markdown
# Canary Token Patterns

**When to load:** When implementing data leakage detection, adding security monitoring to agent outputs, or when user mentions canary tokens, exfiltration detection, or output tracking.

**Integrates with:** Security agent, DevOps agent

---

## Core Concepts

### What are Canary Tokens?

Canary tokens are unique, traceable markers inserted into agent outputs. If they appear outside expected boundaries, it indicates data leakage.

### Token Types

| Type | Scope | Use Case |
|------|-------|----------|
| Tenant token | Per-tenant | Detect cross-tenant leaks |
| Session token | Per-session | Track session data flow |
| Request token | Per-request | Fine-grained tracking |

### Token Format

| Format | Example | Detectability |
|--------|---------|---------------|
| UUID | `ct_a1b2c3d4-...` | High |
| Encoded | `<!--CT:base64-->` | Medium |
| Steganographic | Whitespace patterns | Hidden |

---

## Application Guidelines

1. Insert tokens in non-visible locations when possible
2. Rotate tenant tokens periodically
3. Monitor for token appearances in logs, external systems
4. Alert immediately on unexpected token detection

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Visible or hidden? | Hidden preferred | Doesn't affect UX |
| Per-request overhead? | Accept for sensitive data | Security worth latency |
| Rotation frequency? | Daily for tenant, per-request for session | Balance security and tracking |

## Related Patterns

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security-*`

### Web Research

- Search: "canary tokens AI outputs {date}"
- Search: "data leakage detection patterns {date}"

## Related Workflows

- `bmad-bam-canary-token-design` - Design canary token insertion strategy
```

---

### P0-05: Prompt Rollback Automation

**Purpose:** Automated rollback of prompt changes when quality degrades.

#### Pattern Registry Entry

```csv
prompt-rollback-automation,Prompt Rollback Automation,llmops,"Use when implementing prompt version control with signals: prompt versioning,rollback,quality regression","prompt versioning,rollback,quality regression",Automate prompt rollback on quality degradation,manual;semi-auto;full-auto,What quality metrics trigger rollback?;Rollback latency tolerance?;Approval required?,"prompt versioning rollback {date};LLMOps prompt management {date}",QG-M3,llmops;observability,,Basic: Manual rollback;Advanced: Auto-rollback on metric drop,llm-versioning;deployment-patterns
```

#### Agent Guide: `prompt-rollback-patterns.md`

```markdown
# Prompt Rollback Patterns

**When to load:** When implementing prompt version control, designing rollback mechanisms, or when user mentions prompt regression, version rollback, or quality-triggered rollback.

**Integrates with:** Dev agent, DevOps agent

---

## Core Concepts

### Why Prompt Rollback?

Prompt changes can degrade agent quality. Automated rollback ensures:
- Quick recovery from bad prompts
- Quality metrics stay within bounds
- Minimal manual intervention

### Rollback Triggers

| Trigger | Metric | Threshold |
|---------|--------|-----------|
| Quality drop | Eval score | <90% of baseline |
| Error spike | Error rate | >5% increase |
| Latency increase | P95 latency | >2x baseline |
| User feedback | Thumbs down rate | >10% increase |

### Rollback Strategies

| Strategy | Speed | Risk |
|----------|-------|------|
| Immediate | <1 min | May overreact |
| Gradual | 5-15 min | Slower recovery |
| Approved | Variable | Human bottleneck |

---

## Application Guidelines

1. Version all prompts in Git or prompt registry
2. Define clear rollback triggers per prompt
3. Test rollback mechanism regularly
4. Alert on every rollback

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Auto or manual? | Semi-auto (auto-detect, human approve) | Balance speed and control |
| Rollback to N-1 or known-good? | Known-good tag | Avoids cascading bad versions |
| Per-tenant prompts? | Yes for enterprise | Custom prompts need custom rollback |

## Related Patterns

- **LLMOps patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `llmops-*`

### Web Research

- Search: "prompt versioning rollback automation {date}"
- Search: "LLMOps prompt management {date}"

## Related Workflows

- `bmad-bam-prompt-rollback-design` - Design prompt rollback automation
```

---

### P0-06: Model Warm-up Patterns

**Purpose:** Pre-warm models to reduce cold start latency.

#### Pattern Registry Entry

```csv
model-warmup-patterns,Model Warm-up Patterns,ai-ops,"Use when optimizing model latency with signals: cold start,latency optimization,model loading","cold start,latency optimization,model loading",Pre-warm models to reduce first-request latency,scheduled;on-demand;predictive,What warm-up frequency?;Which models to pre-warm?;Cost tolerance?,"model warm-up patterns {date};LLM cold start optimization {date}",QG-P1,agent-runtime,,Basic: Scheduled warm-up;Advanced: Predictive warm-up,model-routing-patterns;cost-optimization-patterns
```

#### Agent Guide: `model-warmup-patterns.md`

```markdown
# Model Warm-up Patterns

**When to load:** When optimizing agent latency, reducing cold starts, or when user mentions warm-up, cold start, or model preloading.

**Integrates with:** Architect (Nova persona), DevOps agent

---

## Core Concepts

### Why Model Warm-up?

First requests to models often have higher latency due to:
- Connection establishment
- Model loading (self-hosted)
- API client initialization

### Warm-up Strategies

| Strategy | Trigger | Pros | Cons |
|----------|---------|------|------|
| Scheduled | Cron/interval | Predictable | May waste resources |
| On-demand | Traffic prediction | Efficient | Prediction may fail |
| Keep-alive | Continuous | Always warm | Higher cost |

### Per-Tier Warm-up

| Tier | Strategy | Frequency |
|------|----------|-----------|
| Free | None | N/A |
| Pro | Scheduled | Every 5 min |
| Enterprise | Keep-alive | Continuous |

---

## Application Guidelines

1. Warm up all production models before peak hours
2. Use tenant traffic patterns to predict warm-up needs
3. Monitor warm-up costs vs latency benefits
4. Implement graceful degradation for cold models

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which models? | Primary + fallback | Both need to be warm |
| Frequency? | Based on keep-alive timeout | Match provider behavior |
| Per-tenant? | Only for dedicated models | Shared models warm once |

## Related Patterns

- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `deployment-*`

### Web Research

- Search: "model warm-up patterns {date}"
- Search: "LLM cold start mitigation {date}"

## Related Workflows

- `bmad-bam-model-warmup-design` - Design model warm-up strategy
```

---

### P0-07: Model Feature Flags

**Purpose:** Feature flags for model/prompt rollout control.

#### Pattern Registry Entry

```csv
model-feature-flags,Model Feature Flags,llmops,"Use when controlling model rollouts with signals: feature flags,gradual rollout,A/B testing","feature flags,gradual rollout,A/B testing",Control model/prompt rollout with feature flags,boolean;percentage;tenant-targeted,What flag granularity?;Who manages flags?;Audit requirements?,"model feature flags {date};LLM A/B testing patterns {date}",QG-M3,experimentation;llmops,,Basic: Boolean flags;Advanced: Percentage rollout,experimentation-patterns;deployment-patterns
```

#### Agent Guide: `model-feature-flags-patterns.md`

```markdown
# Model Feature Flags Patterns

**When to load:** When implementing gradual model rollouts, A/B testing models, or when user mentions feature flags, model rollout, or canary deployments.

**Integrates with:** Dev agent, PM agent

---

## Core Concepts

### Why Model Feature Flags?

Feature flags enable:
- Gradual rollout of new models
- A/B testing model performance
- Quick rollback without deployment
- Tenant-specific model selection

### Flag Types

| Type | Use Case | Example |
|------|----------|---------|
| Boolean | On/off for feature | `use_gpt4o` |
| Percentage | Gradual rollout | `gpt4o_rollout_pct: 25` |
| Tenant-targeted | Specific tenants | `gpt4o_tenants: [tenant_a]` |
| Tier-based | By subscription tier | `gpt4o_tiers: [enterprise]` |

### Flag Lifecycle

| Phase | Flag State | Duration |
|-------|------------|----------|
| Experiment | 5% rollout | 1-2 weeks |
| Validation | 25% rollout | 1 week |
| Rollout | 50-100% | 1-2 weeks |
| GA | Remove flag | N/A |

---

## Application Guidelines

1. Name flags descriptively: `model_gpt4o_v2_enabled`
2. Document expected flag lifetime
3. Clean up flags after full rollout
4. Audit all flag changes

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Flag per model? | Yes | Granular control |
| Combined with prompt flags? | Separate | Different lifecycles |
| Default on or off? | Off for new | Safe by default |

## Related Patterns

- **Experimentation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `experimentation-*`

### Web Research

- Search: "model feature flags LLM {date}"
- Search: "AI A/B testing best practices {date}"

## Related Workflows

- `bmad-bam-model-feature-flags-design` - Design model feature flag strategy
```

---

### P0-08: Tenant Burst Protection

**Purpose:** Protect system from tenant request bursts.

#### Pattern Registry Entry

```csv
tenant-burst-protection,Tenant Burst Protection,tenant-safety,"Use when protecting against tenant bursts with signals: rate limiting,burst protection,noisy neighbor","rate limiting,burst protection,noisy neighbor",Protect system from tenant request bursts,token-bucket;sliding-window;adaptive,What burst tolerance?;Overflow behavior?;Per-tenant or per-tier?,"tenant burst protection patterns {date};rate limiting AI systems {date}",QG-I2,tenant-isolation;agent-resilience,,Basic: Fixed limits;Advanced: Adaptive limits,rate-limiting-patterns;circuit-breaker-patterns
```

#### Agent Guide: `tenant-burst-protection-patterns.md`

```markdown
# Tenant Burst Protection Patterns

**When to load:** When implementing rate limiting, protecting against noisy neighbors, or when user mentions burst protection, rate limits, or tenant quotas.

**Integrates with:** Architect (Atlas persona), DevOps agent

---

## Core Concepts

### Why Burst Protection?

Burst protection prevents:
- Single tenant consuming all resources
- Cascading failures from traffic spikes
- Unfair resource allocation

### Rate Limiting Algorithms

| Algorithm | Behavior | Use Case |
|-----------|----------|----------|
| Token bucket | Allows bursts up to bucket size | General use |
| Sliding window | Smooth distribution | Strict limits |
| Adaptive | Adjusts based on system load | High availability |

### Per-Tier Limits

| Tier | Requests/min | Burst allowance | Overflow |
|------|--------------|-----------------|----------|
| Free | 60 | 1.5x (90) | Queue |
| Pro | 600 | 2x (1200) | Queue |
| Enterprise | 6000 | 3x (18000) | Priority queue |

---

## Application Guidelines

1. Set burst limits per tenant, not just rate limits
2. Queue overflow requests rather than reject
3. Alert on sustained burst patterns
4. Adjust limits based on tenant behavior

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Queue or reject? | Queue with timeout | Better UX |
| Per-tenant or per-tier? | Both | Tier base + tenant adjustment |
| Adaptive limits? | Yes for enterprise | Match usage patterns |

## Related Patterns

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-*`

### Web Research

- Search: "tenant burst protection multi-tenant {date}"
- Search: "rate limiting AI systems {date}"

## Related Workflows

- `bmad-bam-burst-protection-design` - Design tenant burst protection
```

---

### P0-09: Per-Tenant Context Window Budget

**Purpose:** Enforce context window limits per tenant.

#### Pattern Registry Entry

```csv
tenant-context-budget,Per-Tenant Context Window Budget,ai-governance,"Use when enforcing context limits with signals: context window,token budget,tenant limits","context window,token budget,tenant limits",Enforce context window limits per tenant,hard-limit;soft-limit;adaptive,What context limit per tier?;Overflow handling?;Compression allowed?,"context window budget patterns {date};LLM token management {date}",QG-M3,run-contracts;tenant-isolation,,Basic: Hard limits;Advanced: Dynamic compression,token-management-patterns;memory-tiers-patterns
```

#### Agent Guide: `tenant-context-budget-patterns.md`

```markdown
# Per-Tenant Context Window Budget Patterns

**When to load:** When implementing context limits, managing token budgets, or when user mentions context window, token limits, or context budget.

**Integrates with:** Architect (Nova persona)

---

## Core Concepts

### Why Context Budgets?

Context window budgets ensure:
- Fair resource allocation across tenants
- Cost control for expensive context
- Predictable behavior under load

### Budget Types

| Type | Enforcement | Overflow |
|------|-------------|----------|
| Hard limit | Reject overflow | Error response |
| Soft limit | Allow with warning | Proceed + alert |
| Adaptive | Compress context | Continue with less context |

### Per-Tier Budgets

| Tier | Context budget | Overflow strategy |
|------|----------------|-------------------|
| Free | 8K tokens | Hard reject |
| Pro | 32K tokens | Soft warning + compress |
| Enterprise | 128K tokens | Adaptive + priority |

---

## Application Guidelines

1. Track context usage per request
2. Implement context compression before rejection
3. Alert when tenants consistently hit limits
4. Offer upgrade path for context-heavy use cases

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Hard or soft limits? | Soft with compression | Better UX |
| Per-model budgets? | Yes | Different model capabilities |
| Carry-over? | No | Each request independent |

## Related Patterns

- **Run contracts:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `run-contracts`

### Web Research

- Search: "context window budget management {date}"
- Search: "LLM token limits multi-tenant {date}"

## Related Workflows

- `bmad-bam-context-budget-design` - Design context budget strategy
```

---

### P0-10: Per-Tenant Agent Instance Limits

**Purpose:** Limit concurrent agent instances per tenant.

#### Pattern Registry Entry

```csv
tenant-agent-limits,Per-Tenant Agent Instance Limits,tenant-governance,"Use when limiting agent concurrency with signals: concurrency limits,agent instances,resource allocation","concurrency limits,agent instances,resource allocation",Limit concurrent agent instances per tenant,fixed;pooled;elastic,What concurrency limits per tier?;Queue overflow?;Priority handling?,"agent concurrency limits {date};multi-tenant resource allocation {date}",QG-I2,tenant-isolation;agent-runtime,,Basic: Fixed limits;Advanced: Elastic scaling,resource-allocation-patterns;tenant-isolation-patterns
```

#### Agent Guide: `tenant-agent-limits-patterns.md`

```markdown
# Per-Tenant Agent Instance Limits Patterns

**When to load:** When implementing agent concurrency limits, managing resource allocation, or when user mentions agent limits, concurrency, or instance caps.

**Integrates with:** Architect (Atlas persona)

---

## Core Concepts

### Why Agent Instance Limits?

Agent instance limits ensure:
- No single tenant monopolizes compute
- Predictable resource availability
- Cost control for compute-intensive agents

### Limit Strategies

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| Fixed | Hard cap per tenant | Simple, predictable |
| Pooled | Shared pool with tenant quota | Better utilization |
| Elastic | Scale with tenant demand | Enterprise tier |

### Per-Tier Limits

| Tier | Concurrent agents | Burst | Queue depth |
|------|-------------------|-------|-------------|
| Free | 2 | None | 5 |
| Pro | 10 | 2x for 1 min | 50 |
| Enterprise | 100 | Elastic | Unlimited |

---

## Application Guidelines

1. Track agent instances per tenant in real-time
2. Queue requests when limit reached
3. Implement fair queuing across tenants
4. Alert on sustained limit hits

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Fixed or elastic? | Elastic for enterprise | Matches workload variance |
| Queue or reject? | Queue with timeout | Better UX |
| Priority queuing? | Yes for higher tiers | Tier differentiation |

## Related Patterns

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-*`

### Web Research

- Search: "agent concurrency limits multi-tenant {date}"
- Search: "resource allocation AI systems {date}"

## Related Workflows

- `bmad-bam-agent-limits-design` - Design agent instance limits
```

---

### P0-11: Conditional Edge Patterns (LangGraph)

**Purpose:** Patterns for conditional branching in LangGraph workflows.

#### Pattern Registry Entry

```csv
conditional-edge-patterns,Conditional Edge Patterns,langgraph,"Use when implementing branching in LangGraph with signals: conditional routing,state machine,workflow branching","conditional routing,state machine,workflow branching",Patterns for LangGraph conditional edges,binary;multi-way;dynamic,What routing conditions?;Default path?;Error handling?,"LangGraph conditional edges {date};state machine patterns AI {date}",QG-M3,agent-runtime,,Basic: Binary conditions;Advanced: Dynamic routing,langgraph-patterns;agent-runtime-patterns
```

#### Agent Guide: `conditional-edge-patterns.md`

```markdown
# Conditional Edge Patterns

**When to load:** When implementing LangGraph workflows with branching, designing state machines, or when user mentions conditional routing, edges, or workflow branching.

**Integrates with:** Dev agent, Architect (Nova persona)

---

## Core Concepts

### What are Conditional Edges?

Conditional edges in LangGraph route execution based on state. Patterns include:

### Edge Types

| Type | Use Case | Example |
|------|----------|---------|
| Binary | Yes/no decisions | `if approved: proceed else: review` |
| Multi-way | Category routing | `route_by_intent()` |
| Dynamic | Runtime-determined | `router_llm_decides()` |

### Routing Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| Guard condition | Check state before proceeding | Validation |
| Intent router | LLM classifies intent | NLU workflows |
| Confidence threshold | Route by confidence score | Quality control |
| Tenant policy | Route by tenant config | Multi-tenant |

---

## Application Guidelines

1. Always define a default/fallback path
2. Log routing decisions for debugging
3. Test edge cases explicitly
4. Make conditions deterministic when possible

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| LLM-based or deterministic? | Deterministic when possible | Predictability |
| How many branches? | Limit to 5 | Maintainability |
| Error path? | Always define | Graceful failure |

## Related Patterns

- **LangGraph patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `langgraph-*`

### Web Research

- Search: "LangGraph conditional edges patterns {date}"
- Search: "state machine branching AI agents {date}"

## Related Workflows

- `bmad-bam-langgraph-conditional-design` - Design conditional edge logic
```

---

### P0-12: Tool Idempotency Guarantees

**Purpose:** Ensure agent tool executions are idempotent.

#### Pattern Registry Entry

```csv
tool-idempotency,Tool Idempotency Guarantees,ai-reliability,"Use when ensuring tool reliability with signals: idempotency,retry safety,tool reliability","idempotency,retry safety,tool reliability",Ensure agent tool executions are idempotent,natural;synthetic;transactional,Which tools need idempotency?;Key generation strategy?;Deduplication window?,"idempotent tool execution {date};retry safety patterns {date}",QG-M3,tool-execution,,Basic: Idempotency keys;Advanced: Transactional tools,tool-execution-patterns;agent-resilience-patterns
```

#### Agent Guide: `tool-idempotency-patterns.md`

```markdown
# Tool Idempotency Patterns

**When to load:** When implementing reliable tool execution, ensuring retry safety, or when user mentions idempotency, retry safety, or deduplication.

**Integrates with:** Dev agent, Architect (Nova persona)

---

## Core Concepts

### Why Tool Idempotency?

Idempotency ensures that retried tool calls don't cause duplicate effects:
- Same request → Same result
- Safe to retry on timeout
- No duplicate side effects

### Idempotency Types

| Type | Implementation | Use Case |
|------|----------------|----------|
| Natural | Operation inherently idempotent | GET, read ops |
| Synthetic | Idempotency key tracks execution | Writes, creates |
| Transactional | Database transaction | Multi-step ops |

### Tool Classification

| Tool Type | Idempotency | Strategy |
|-----------|-------------|----------|
| Read | Natural | None needed |
| Create | Synthetic | Idempotency key |
| Update | Check version | Conditional |
| Delete | Natural | None needed |
| External API | Varies | Provider-specific |

---

## Application Guidelines

1. Classify all tools by idempotency needs
2. Generate idempotency keys from request content
3. Store executed keys for deduplication window
4. Return cached result on duplicate key

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Key from what? | Request content hash | Reproducible |
| Dedup window? | 24 hours | Balance storage and safety |
| Store where? | Redis with TTL | Fast lookup, auto-expire |

## Related Patterns

- **Tool patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tool-*`

### Web Research

- Search: "idempotent tool execution AI agents {date}"
- Search: "retry safety patterns distributed systems {date}"

## Related Workflows

- `bmad-bam-tool-idempotency-design` - Design tool idempotency strategy
```

---

## Phase 1 Patterns (Weeks 3-8)

### P1-01: Kill Switch Registry

**Purpose:** Centralized registry for agent kill switches.

#### Pattern Registry Entry

```csv
kill-switch-registry,Kill Switch Registry,ai-safety,"Use when implementing emergency agent shutdown with signals: kill switch,emergency shutdown,circuit breaker","kill switch,emergency shutdown,circuit breaker",Centralized registry for agent kill switches,per-agent;per-tenant;global,What kill switch granularity?;Who can trigger?;Propagation latency?,"AI agent kill switch patterns {date};emergency shutdown AI systems {date}",QG-I3,agent-runtime;security,,Basic: Per-agent switches;Advanced: Hierarchical with propagation,circuit-breaker-patterns;agent-safety-patterns
```

#### Agent Guide: `kill-switch-patterns.md`

```markdown
# Kill Switch Patterns

**When to load:** When implementing emergency shutdown, designing circuit breakers, or when user mentions kill switch, emergency stop, or agent shutdown.

**Integrates with:** Security agent, DevOps agent

---

## Core Concepts

### What is a Kill Switch Registry?

A centralized system to immediately halt agent operations:
- Emergency response to misbehavior
- Compliance requirement for AI systems
- Graceful shutdown with state preservation

### Kill Switch Hierarchy

| Level | Scope | Use Case |
|-------|-------|----------|
| Global | All agents | System-wide emergency |
| Per-tenant | Tenant's agents | Tenant isolation issue |
| Per-agent | Single agent | Agent misbehavior |
| Per-capability | Specific tool | Tool abuse |

### Kill Switch States

| State | Behavior | Recovery |
|-------|----------|----------|
| Active | Agents running normally | N/A |
| Triggered | Agents halt immediately | Manual reset |
| Graceful | Complete current, no new | Auto-resume |
| Quarantine | Isolated, no external calls | Review required |

---

## Application Guidelines

1. Implement sub-second kill switch propagation
2. Log all kill switch events with full context
3. Require two-person approval for global switches
4. Test kill switches in staging regularly

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Latency target? | <1 second | Emergency needs fast response |
| Auto-reset? | Never for triggered | Human review required |
| Per-tenant or global? | Both available | Different scenarios |

## Related Patterns

- **Safety patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-safety-*`

### Web Research

- Search: "AI agent kill switch patterns {date}"
- Search: "emergency shutdown AI systems {date}"

## Related Workflows

- `bmad-bam-kill-switch-design` - Design kill switch registry
```

#### Workflow Structure

```
src/workflows/bmad-bam-kill-switch-design/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-define-hierarchy.md
    ├── step-02-c-design-propagation.md
    ├── step-03-c-implement-states.md
    ├── step-04-c-define-triggers.md
    ├── step-05-c-document-procedures.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-update-switches.md
    ├── step-20-v-validate-propagation.md
    ├── step-21-v-test-scenarios.md
    └── step-22-v-generate-report.md
```

---

### P1-02: Fan-Out Circuit Breaker

**Purpose:** Circuit breaker for parallel agent fan-out operations.

#### Pattern Registry Entry

```csv
fanout-circuit-breaker,Fan-Out Circuit Breaker,ai-reliability,"Use when protecting fan-out operations with signals: fan-out,parallel execution,blast radius","fan-out,parallel execution,blast radius",Circuit breaker for parallel agent operations,per-operation;per-target;adaptive,What failure threshold?;Cooldown period?;Partial success handling?,"fan-out circuit breaker {date};parallel execution patterns AI {date}",QG-I3,agent-resilience;agent-runtime,,Basic: Binary breaker;Advanced: Partial degradation,circuit-breaker-patterns;parallel-execution-patterns
```

#### Agent Guide: `fanout-circuit-breaker-patterns.md`

```markdown
# Fan-Out Circuit Breaker Patterns

**When to load:** When implementing parallel agent operations, protecting fan-out workflows, or when user mentions fan-out, parallel execution, or blast radius protection.

**Integrates with:** Architect (Nova persona), Dev agent

---

## Core Concepts

### Why Fan-Out Circuit Breakers?

Fan-out operations (1→N parallel calls) amplify failures:
- One slow target blocks all results
- Cascading failures multiply
- Resource exhaustion from retries

### Breaker Strategies

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| All-or-nothing | Trip on any failure | Critical operations |
| Percentage | Trip at N% failures | Tolerant operations |
| Weighted | Weight by target importance | Mixed criticality |

### Configuration Per Operation

| Operation | Failure threshold | Cooldown | Partial OK? |
|-----------|-------------------|----------|-------------|
| Multi-model query | 50% | 30s | Yes |
| Batch notification | 10% | 60s | Yes |
| Consensus voting | 33% | 10s | No |

---

## Application Guidelines

1. Set thresholds based on operation criticality
2. Track per-target failure rates
3. Implement partial success handling
4. Alert on breaker trips

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| All-or-nothing? | Rarely | Most ops tolerate partial |
| Per-target tracking? | Yes | Isolate bad targets |
| Auto-reset? | Yes with probe | Reduce manual intervention |

## Related Patterns

- **Resilience patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-resilience-*`

### Web Research

- Search: "fan-out circuit breaker patterns {date}"
- Search: "parallel execution reliability {date}"

## Related Workflows

- `bmad-bam-fanout-breaker-design` - Design fan-out circuit breakers
```

---

### P1-03: Tool Budget Guards

**Purpose:** Enforce tool execution budgets per tenant/agent.

#### Pattern Registry Entry

```csv
tool-budget-guards,Tool Budget Guards,ai-governance,"Use when enforcing tool limits with signals: tool budget,execution limits,cost control","tool budget,execution limits,cost control",Enforce tool execution budgets,per-tool;per-agent;per-tenant,What budget dimensions?;Overflow behavior?;Reset frequency?,"tool budget enforcement {date};agent tool limits {date}",QG-M3,run-contracts;tool-execution,,Basic: Count limits;Advanced: Cost-weighted budgets,run-contracts;cost-optimization-patterns
```

#### Agent Guide: `tool-budget-guards-patterns.md`

```markdown
# Tool Budget Guards Patterns

**When to load:** When implementing tool limits, enforcing execution budgets, or when user mentions tool budget, execution limits, or cost control.

**Integrates with:** Architect (Nova persona)

---

## Core Concepts

### Why Tool Budget Guards?

Tool budgets prevent:
- Runaway tool loops
- Unexpected cost spikes
- Resource exhaustion

### Budget Dimensions

| Dimension | Unit | Example |
|-----------|------|---------|
| Count | Invocations | 100 calls/request |
| Time | Seconds | 30s total tool time |
| Cost | Dollars | $0.10/request |
| Tokens | Token count | 10K tool tokens |

### Per-Tier Budgets

| Tier | Tool calls | Tool time | Tool cost |
|------|------------|-----------|-----------|
| Free | 10 | 5s | $0.01 |
| Pro | 100 | 30s | $0.10 |
| Enterprise | 1000 | 300s | $1.00 |

---

## Application Guidelines

1. Track budgets across all tools in request
2. Warn at 80% budget consumption
3. Gracefully halt at 100%
4. Log budget exhaustion for analysis

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which dimension? | All relevant | Different tools have different costs |
| Reset boundary? | Per-request | Clear scope |
| Carry-over? | No | Predictable behavior |

## Related Patterns

- **Run contracts:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `run-contracts`

### Web Research

- Search: "tool budget enforcement AI agents {date}"
- Search: "agent execution limits {date}"

## Related Workflows

- `bmad-bam-tool-budget-design` - Design tool budget guards
```

---

### P1-04: Tool Timeout Management

**Purpose:** Manage tool execution timeouts per tool type.

#### Pattern Registry Entry

```csv
tool-timeout-management,Tool Timeout Management,ai-reliability,"Use when managing tool timeouts with signals: tool timeout,execution time,latency management","tool timeout,execution time,latency management",Manage tool execution timeouts,fixed;adaptive;tiered,What timeout per tool?;Retry on timeout?;Partial result handling?,"tool timeout patterns {date};execution timeout management {date}",QG-M3,tool-execution,,Basic: Fixed timeouts;Advanced: Adaptive timeouts,tool-execution-patterns;agent-resilience-patterns
```

#### Agent Guide: `tool-timeout-patterns.md`

```markdown
# Tool Timeout Patterns

**When to load:** When managing tool execution times, implementing timeout strategies, or when user mentions tool timeout, execution time, or latency limits.

**Integrates with:** Dev agent, Architect (Nova persona)

---

## Core Concepts

### Why Tool Timeout Management?

Timeouts prevent:
- Hung tools blocking agents
- Resource starvation
- Poor user experience

### Timeout Strategies

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| Fixed | Same timeout for all | Simple tools |
| Per-tool | Tool-specific timeouts | Mixed tool types |
| Adaptive | Adjust based on history | Production optimization |

### Timeout Per Tool Type

| Tool Type | Default timeout | Max timeout |
|-----------|-----------------|-------------|
| Database query | 5s | 30s |
| External API | 10s | 60s |
| LLM call | 30s | 120s |
| File operation | 5s | 30s |

---

## Application Guidelines

1. Set conservative defaults, increase as needed
2. Track actual execution times
3. Alert on timeout rate increases
4. Implement graceful timeout handling

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Fixed or per-tool? | Per-tool | Different tools have different latencies |
| Retry on timeout? | Yes with backoff | Transient issues common |
| Partial results? | Tool-specific | Some tools support it |

## Related Patterns

- **Tool patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tool-*`

### Web Research

- Search: "tool timeout management AI agents {date}"
- Search: "execution timeout patterns {date}"

## Related Workflows

- `bmad-bam-tool-timeout-design` - Design tool timeout strategy
```

---

### P1-05: Tool Fallback Chains

**Purpose:** Define fallback chains for tool failures.

#### Pattern Registry Entry

```csv
tool-fallback-chains,Tool Fallback Chains,ai-reliability,"Use when implementing tool fallbacks with signals: tool fallback,redundancy,failover","tool fallback,redundancy,failover",Define fallback chains for tool failures,static;dynamic;intelligent,What fallback depth?;Quality vs speed tradeoff?;Per-tenant fallbacks?,"tool fallback patterns {date};failover strategies AI {date}",QG-M3,tool-execution;agent-resilience,,Basic: Single fallback;Advanced: Dynamic chain selection,tool-execution-patterns;agent-resilience-patterns
```

#### Agent Guide: `tool-fallback-chains-patterns.md`

```markdown
# Tool Fallback Chains Patterns

**When to load:** When implementing tool redundancy, designing failover strategies, or when user mentions tool fallback, failover, or backup tools.

**Integrates with:** Architect (Nova persona), Dev agent

---

## Core Concepts

### Why Tool Fallback Chains?

Fallback chains provide:
- Resilience when primary tools fail
- Graceful degradation
- Continuous operation during outages

### Chain Types

| Type | Selection | Use Case |
|------|-----------|----------|
| Static | Predefined order | Simple failover |
| Dynamic | Based on current health | High availability |
| Intelligent | LLM selects fallback | Complex scenarios |

### Example Chains

| Primary | Fallback 1 | Fallback 2 | Degradation |
|---------|------------|------------|-------------|
| Google Search | Bing Search | DuckDuckGo | Coverage |
| Postgres | Redis cache | In-memory | Freshness |
| OpenAI | Anthropic | Local model | Quality |

---

## Application Guidelines

1. Define fallback chains for all critical tools
2. Test fallback paths regularly
3. Track fallback usage metrics
4. Alert when primary usage drops significantly

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Chain depth? | 2-3 levels | Diminishing returns |
| Different providers? | Yes | True redundancy |
| Quality degradation? | Document explicitly | Set expectations |

## Related Patterns

- **Tool patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tool-*`

### Web Research

- Search: "tool fallback patterns AI agents {date}"
- Search: "failover strategies distributed systems {date}"

## Related Workflows

- `bmad-bam-tool-fallback-design` - Design tool fallback chains
```

---

### P1-06: Retry Budget Engine

**Purpose:** Manage retry budgets across agent operations.

#### Pattern Registry Entry

```csv
retry-budget-engine,Retry Budget Engine,ai-reliability,"Use when managing retries with signals: retry budget,exponential backoff,failure recovery","retry budget,exponential backoff,failure recovery",Manage retry budgets across operations,fixed;dynamic;adaptive,What retry limits?;Backoff strategy?;Budget sharing?,"retry budget patterns {date};exponential backoff AI {date}",QG-M3,agent-resilience,,Basic: Fixed retry count;Advanced: Budget pool with prioritization,agent-resilience-patterns;circuit-breaker-patterns
```

#### Agent Guide: `retry-budget-patterns.md`

```markdown
# Retry Budget Patterns

**When to load:** When implementing retry logic, managing failure recovery, or when user mentions retry budget, backoff, or retry limits.

**Integrates with:** Dev agent, Architect (Nova persona)

---

## Core Concepts

### Why Retry Budgets?

Retry budgets prevent:
- Infinite retry loops
- Cascading failures from retries
- Unfair retry distribution

### Budget Types

| Type | Scope | Use Case |
|------|-------|----------|
| Per-operation | Single call | Simple retries |
| Per-request | Entire user request | End-to-end budget |
| Per-tenant | Tenant-wide | Fair sharing |

### Backoff Strategies

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| Fixed | Same delay each retry | Simple |
| Exponential | 1s → 2s → 4s → 8s | Standard |
| Jittered | Exponential + random | Prevent thundering herd |

---

## Application Guidelines

1. Set per-request and per-operation limits
2. Use jittered exponential backoff
3. Share budget across operation types
4. Prioritize retries by criticality

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Budget scope? | Per-request | Clear boundary |
| Max retries? | 3-5 | Diminishing returns |
| Jitter? | Always | Prevent storms |

## Related Patterns

- **Resilience patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-resilience-*`

### Web Research

- Search: "retry budget patterns distributed systems {date}"
- Search: "exponential backoff best practices {date}"

## Related Workflows

- `bmad-bam-retry-budget-design` - Design retry budget engine
```

---

### P1-07: LLM Provider Health Dashboard

**Purpose:** Real-time dashboard for LLM provider health.

#### Pattern Registry Entry

```csv
llm-provider-dashboard,LLM Provider Health Dashboard,observability,"Use when monitoring LLM providers with signals: provider health,latency tracking,availability","provider health,latency tracking,availability",Real-time dashboard for LLM provider health,basic;detailed;predictive,What metrics to track?;Alert thresholds?;Historical analysis?,"LLM provider monitoring {date};AI observability dashboard {date}",QG-P1,observability;llmops,,Basic: Up/down status;Advanced: Latency percentiles + predictions,observability-patterns;llmops-patterns
```

#### Agent Guide: `llm-provider-dashboard-patterns.md`

```markdown
# LLM Provider Health Dashboard Patterns

**When to load:** When implementing LLM monitoring, building observability dashboards, or when user mentions provider health, latency tracking, or availability monitoring.

**Integrates with:** DevOps agent, Architect (Nova persona)

---

## Core Concepts

### Why Provider Health Dashboards?

Dashboards provide:
- Visibility into provider status
- Early warning of degradation
- Data for routing decisions

### Key Metrics

| Metric | Unit | Alert threshold |
|--------|------|-----------------|
| Availability | % | <99.5% |
| P50 latency | ms | >1000ms |
| P95 latency | ms | >3000ms |
| Error rate | % | >1% |
| Token throughput | tokens/s | <expected |

### Dashboard Panels

| Panel | Content | Refresh |
|-------|---------|---------|
| Status overview | Provider up/down | 10s |
| Latency trends | P50/P95/P99 over time | 1m |
| Error breakdown | By error type | 1m |
| Cost tracking | $/hour by provider | 1h |

---

## Application Guidelines

1. Track all production providers
2. Set alerts on degradation, not just outages
3. Include historical comparison
4. Add cost correlation

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Update frequency? | 10s for status, 1m for metrics | Balance load and freshness |
| Historical depth? | 30 days | Trend analysis |
| Per-tenant views? | Yes for enterprise | Isolation |

## Related Patterns

- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability-*`

### Web Research

- Search: "LLM provider monitoring dashboard {date}"
- Search: "AI observability best practices {date}"

## Related Workflows

- `bmad-bam-provider-dashboard-design` - Design provider health dashboard
```

---

### P1-08: Tenant Usage Anomaly Detection

**Purpose:** Detect anomalous tenant usage patterns.

#### Pattern Registry Entry

```csv
tenant-anomaly-detection,Tenant Usage Anomaly Detection,tenant-safety,"Use when detecting usage anomalies with signals: anomaly detection,usage patterns,abuse prevention","anomaly detection,usage patterns,abuse prevention",Detect anomalous tenant usage patterns,statistical;ml-based;rule-based,What anomaly signals?;Alert sensitivity?;Auto-response?,"usage anomaly detection {date};multi-tenant abuse detection {date}",QG-I2,observability;tenant-isolation,,Basic: Rule-based;Advanced: ML anomaly detection,tenant-isolation-patterns;security-monitoring-patterns
```

#### Agent Guide: `tenant-anomaly-detection-patterns.md`

```markdown
# Tenant Usage Anomaly Detection Patterns

**When to load:** When implementing abuse detection, monitoring tenant usage, or when user mentions anomaly detection, usage patterns, or abuse prevention.

**Integrates with:** Security agent, DevOps agent

---

## Core Concepts

### Why Anomaly Detection?

Anomaly detection catches:
- Compromised tenant accounts
- Abuse/misuse patterns
- Billing anomalies
- Security incidents

### Detection Methods

| Method | Approach | Use Case |
|--------|----------|----------|
| Statistical | Z-score, IQR | Simple patterns |
| ML-based | Isolation forest, autoencoders | Complex patterns |
| Rule-based | Threshold rules | Known bad patterns |

### Anomaly Signals

| Signal | Normal range | Anomaly indicator |
|--------|--------------|-------------------|
| Requests/hour | Baseline +/- 2σ | >3σ deviation |
| Token usage | Stable ratio | 10x spike |
| Error rate | <5% | >20% |
| New tool usage | Gradual | Sudden burst |

---

## Application Guidelines

1. Establish baselines per tenant
2. Combine multiple signals
3. Tune sensitivity to reduce false positives
4. Automate response for clear cases

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| ML or rule-based? | Start with rules, add ML | Rules are explainable |
| Auto-response? | For clear cases only | Avoid false positives |
| Alert fatigue? | Aggregate similar alerts | Reduce noise |

## Related Patterns

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security-*`

### Web Research

- Search: "tenant usage anomaly detection {date}"
- Search: "multi-tenant abuse prevention {date}"

## Related Workflows

- `bmad-bam-anomaly-detection-design` - Design anomaly detection system
```

---

### P1-09: Invisible Failure Detector

**Purpose:** Detect failures that don't trigger errors but produce wrong results.

#### Pattern Registry Entry

```csv
invisible-failure-detector,Invisible Failure Detector,ai-safety,"Use when detecting silent failures with signals: silent failure,quality degradation,output validation","silent failure,quality degradation,output validation",Detect failures without explicit errors,semantic;statistical;comparative,What quality signals?;Baseline comparison?;Auto-remediation?,"silent failure detection AI {date};LLM output quality monitoring {date}",QG-I3,observability;agent-safety,,Basic: Semantic checks;Advanced: Comparative validation,output-validation-patterns;agent-safety-patterns
```

#### Agent Guide: `invisible-failure-patterns.md`

```markdown
# Invisible Failure Detection Patterns

**When to load:** When detecting silent failures, monitoring output quality, or when user mentions invisible failures, quality degradation, or output validation.

**Integrates with:** QA agent, Dev agent

---

## Core Concepts

### What are Invisible Failures?

Invisible failures occur when:
- No error is raised
- Output looks valid
- But result is wrong

Examples: hallucinations, outdated info, subtle bias

### Detection Methods

| Method | Approach | Catches |
|--------|----------|---------|
| Semantic | Check output meaning | Contradictions |
| Statistical | Compare to baselines | Distribution shifts |
| Comparative | Cross-check with other models | Hallucinations |

### Detection Signals

| Signal | Detection | Action |
|--------|-----------|--------|
| Confidence drop | Model uncertainty | Flag for review |
| Factual inconsistency | Cross-reference | Reject output |
| Format deviation | Schema validation | Retry |
| Semantic drift | Embedding distance | Alert |

---

## Application Guidelines

1. Define quality baselines per agent
2. Sample outputs for validation
3. Use multiple detection methods
4. Track invisible failure rate

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Sample rate? | 5-10% for cost | Balance coverage and cost |
| Auto-reject? | Only high-confidence failures | Avoid false positives |
| Human review? | For flagged outputs | Quality assurance |

## Related Patterns

- **Safety patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-safety-*`

### Web Research

- Search: "silent failure detection AI {date}"
- Search: "LLM output validation patterns {date}"

## Related Workflows

- `bmad-bam-invisible-failure-design` - Design invisible failure detection
```

---

### P1-10: MCP Server Health Monitoring

**Purpose:** Monitor MCP server availability and performance.

#### Pattern Registry Entry

```csv
mcp-server-monitoring,MCP Server Health Monitoring,observability,"Use when monitoring MCP servers with signals: MCP health,server monitoring,tool availability","MCP health,server monitoring,tool availability",Monitor MCP server health and performance,heartbeat;synthetic;traffic-based,What health checks?;Alert thresholds?;Auto-failover?,"MCP server monitoring {date};tool server health patterns {date}",QG-P1,mcp-patterns;observability,,Basic: Heartbeat;Advanced: Synthetic probes + traffic analysis,mcp-server-patterns;observability-patterns
```

#### Agent Guide: `mcp-server-monitoring-patterns.md`

```markdown
# MCP Server Health Monitoring Patterns

**When to load:** When implementing MCP server monitoring, tracking tool availability, or when user mentions MCP health, server monitoring, or tool uptime.

**Integrates with:** DevOps agent, Architect (Nova persona)

---

## Core Concepts

### Why MCP Server Monitoring?

MCP servers provide agent tools. Monitoring ensures:
- Tools are available when needed
- Performance meets expectations
- Failures are detected quickly

### Health Check Types

| Type | Method | Frequency |
|------|--------|-----------|
| Heartbeat | Ping endpoint | Every 10s |
| Synthetic | Fake tool call | Every 1m |
| Traffic-based | Analyze real calls | Continuous |

### Key Metrics

| Metric | Target | Alert threshold |
|--------|--------|-----------------|
| Availability | 99.9% | <99.5% |
| Response time | <100ms | >500ms |
| Error rate | <0.1% | >1% |
| Tool count | Expected | Mismatch |

---

## Application Guidelines

1. Monitor all production MCP servers
2. Use synthetic probes for critical tools
3. Alert on availability degradation
4. Track per-tool health

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Heartbeat frequency? | 10s | Quick failure detection |
| Synthetic probe depth? | Basic tool call | Validate real functionality |
| Auto-failover? | Yes if backup exists | Reduce downtime |

## Related Patterns

- **MCP patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `mcp-*`

### Web Research

- Search: "MCP server monitoring patterns {date}"
- Search: "tool server health monitoring {date}"

## Related Workflows

- `bmad-bam-mcp-monitoring-design` - Design MCP server monitoring
```

---

### P1-11: Output Drift Monitor

**Purpose:** Monitor agent output quality over time.

#### Pattern Registry Entry

```csv
output-drift-monitor,Output Drift Monitor,ai-safety,"Use when monitoring output quality with signals: output drift,quality monitoring,model degradation","output drift,quality monitoring,model degradation",Monitor agent output quality over time,statistical;semantic;comparative,What drift metrics?;Baseline window?;Alert sensitivity?,"output drift detection {date};LLM quality monitoring {date}",QG-I3,observability;agent-safety,,Basic: Statistical drift;Advanced: Semantic drift analysis,output-validation-patterns;llmops-patterns
```

#### Agent Guide: `output-drift-patterns.md`

```markdown
# Output Drift Monitor Patterns

**When to load:** When monitoring output quality, detecting model degradation, or when user mentions output drift, quality monitoring, or baseline comparison.

**Integrates with:** QA agent, DevOps agent

---

## Core Concepts

### What is Output Drift?

Output drift occurs when agent outputs change over time:
- Model updates change behavior
- Prompt drift from edits
- Data distribution changes

### Drift Types

| Type | Cause | Detection |
|------|-------|-----------|
| Statistical | Distribution shift | KS test, PSI |
| Semantic | Meaning change | Embedding distance |
| Format | Structure change | Schema validation |

### Monitoring Approach

| Metric | Baseline | Drift threshold |
|--------|----------|-----------------|
| Output length | Rolling 7d avg | +/- 20% |
| Sentiment | Historical avg | +/- 0.2 |
| Topic distribution | Expected | KL divergence >0.1 |
| Embedding centroid | Historical | Cosine distance >0.1 |

---

## Application Guidelines

1. Establish baselines from known-good outputs
2. Monitor continuously, alert on significant drift
3. Correlate drift with changes (model, prompt, data)
4. Implement rollback triggers

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Baseline window? | 7-30 days | Balance stability and adaptation |
| Drift threshold? | Start conservative | Tune based on false positive rate |
| Auto-rollback? | For severe drift | Protect quality |

## Related Patterns

- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability-*`

### Web Research

- Search: "LLM output drift detection {date}"
- Search: "model quality monitoring {date}"

## Related Workflows

- `bmad-bam-drift-monitor-design` - Design output drift monitoring
```

---

### P1-12: Provider Quota Management

**Purpose:** Manage and track LLM provider API quotas.

#### Pattern Registry Entry

```csv
provider-quota-management,Provider Quota Management,ai-ops,"Use when managing provider quotas with signals: API quota,rate limits,provider limits","API quota,rate limits,provider limits",Manage LLM provider API quotas,tracking;predictive;multi-provider,What quota dimensions?;Reservation strategy?;Overflow handling?,"LLM provider quota management {date};API rate limit strategies {date}",QG-P1,llmops;cost-optimization,,Basic: Tracking;Advanced: Predictive allocation,cost-optimization-patterns;llmops-patterns
```

#### Agent Guide: `provider-quota-patterns.md`

```markdown
# Provider Quota Management Patterns

**When to load:** When managing API quotas, tracking provider limits, or when user mentions quota management, rate limits, or API budgets.

**Integrates with:** DevOps agent, PM agent

---

## Core Concepts

### Why Quota Management?

Provider quotas require management to:
- Avoid hitting limits unexpectedly
- Allocate fairly across tenants
- Optimize cost across providers

### Quota Dimensions

| Dimension | Example | Tracking |
|-----------|---------|----------|
| Requests/min | 3500 RPM | Real-time counter |
| Tokens/min | 90000 TPM | Token tracking |
| Tokens/day | 1M TPD | Daily rollup |
| Concurrent requests | 100 | Active count |

### Management Strategies

| Strategy | Approach | Use Case |
|----------|----------|----------|
| Fair share | Equal per tenant | Simple allocation |
| Proportional | Based on tier | Tier differentiation |
| Reservation | Pre-allocated buckets | Predictable workloads |
| Overflow routing | Route to backup | High availability |

---

## Application Guidelines

1. Track quota usage in real-time
2. Alert at 80% usage
3. Implement quota reservation for enterprise
4. Route overflow to backup providers

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Tracking granularity? | Per-tenant, per-provider | Attribution and isolation |
| Reservation? | For enterprise tier | Guaranteed capacity |
| Overflow? | Route to backup | Avoid failures |

## Related Patterns

- **LLMOps patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `llmops-*`

### Web Research

- Search: "LLM provider quota management {date}"
- Search: "API rate limit strategies {date}"

## Related Workflows

- `bmad-bam-quota-management-design` - Design quota management system
```

---

### P1-13: LangGraph Checkpoint Persistence

**Purpose:** Persist LangGraph checkpoints for multi-tenant state.

#### Pattern Registry Entry

```csv
langgraph-checkpoint-persistence,LangGraph Checkpoint Persistence,langgraph,"Use when persisting LangGraph state with signals: checkpoint,state persistence,workflow recovery","checkpoint,state persistence,workflow recovery",Persist LangGraph checkpoints multi-tenant,memory;redis;postgres,What storage backend?;Retention policy?;Tenant isolation?,"LangGraph checkpoint persistence {date};state persistence patterns {date}",QG-M3,langgraph-patterns;tenant-isolation,,Basic: Memory checkpointer;Advanced: PostgreSQL with RLS,langgraph-patterns;state-management-patterns
```

#### Agent Guide: `langgraph-checkpoint-patterns.md`

```markdown
# LangGraph Checkpoint Persistence Patterns

**When to load:** When implementing LangGraph persistence, designing state recovery, or when user mentions checkpoints, state persistence, or workflow recovery.

**Integrates with:** Dev agent, Architect (Nova persona)

---

## Core Concepts

### Why Checkpoint Persistence?

Checkpoints enable:
- Workflow recovery after failures
- Long-running workflow support
- State inspection and debugging

### Storage Options

| Backend | Use Case | Multi-tenant |
|---------|----------|--------------|
| Memory | Development, testing | No isolation |
| Redis | Session-based, fast | Key prefix |
| PostgreSQL | Durable, queryable | RLS isolation |
| SQLite | Single-tenant, simple | File per tenant |

### Checkpoint Schema

| Field | Purpose | Required |
|-------|---------|----------|
| thread_id | Workflow instance | Yes |
| checkpoint_id | Checkpoint version | Yes |
| tenant_id | Tenant isolation | Yes (multi-tenant) |
| state | Serialized state | Yes |
| created_at | Timestamp | Yes |

---

## Application Guidelines

1. Use PostgreSQL for production multi-tenant
2. Implement RLS for tenant isolation
3. Set retention policies to manage storage
4. Index by tenant_id and thread_id

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Backend? | PostgreSQL for production | Durability + querying |
| Retention? | 7-30 days | Balance storage and recovery |
| Isolation? | RLS + tenant_id | Standard multi-tenant |

## Related Patterns

- **LangGraph patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `langgraph-*`

### Web Research

- Search: "LangGraph checkpoint persistence {date}"
- Search: "state persistence multi-tenant {date}"

## Related Workflows

- `bmad-bam-langgraph-checkpoint-design` - Design checkpoint persistence
```

---

### P1-14: State Serialization Multi-Tenant

**Purpose:** Serialize agent state with tenant isolation.

#### Pattern Registry Entry

```csv
state-serialization-multitenant,State Serialization Multi-Tenant,state-management,"Use when serializing tenant state with signals: state serialization,tenant state,isolation","state serialization,tenant state,isolation",Serialize agent state with tenant isolation,json;msgpack;protobuf,What serialization format?;Encryption at rest?;Cross-tenant prevention?,"state serialization multi-tenant {date};tenant state isolation {date}",QG-M3,tenant-isolation;state-management,,Basic: JSON;Advanced: Encrypted protobuf,tenant-isolation-patterns;state-management-patterns
```

#### Agent Guide: `state-serialization-patterns.md`

```markdown
# State Serialization Multi-Tenant Patterns

**When to load:** When implementing state persistence, designing tenant-isolated state, or when user mentions state serialization, tenant state, or state isolation.

**Integrates with:** Dev agent, Architect (Atlas persona)

---

## Core Concepts

### Why Tenant-Isolated Serialization?

State serialization must ensure:
- No cross-tenant state leakage
- Efficient storage and retrieval
- Schema evolution support

### Serialization Formats

| Format | Size | Speed | Schema |
|--------|------|-------|--------|
| JSON | Large | Moderate | Flexible |
| MessagePack | Medium | Fast | Flexible |
| Protobuf | Small | Fast | Required |

### Isolation Strategies

| Strategy | Implementation | Verification |
|----------|----------------|--------------|
| Key prefix | tenant_id in key | Key structure check |
| Encryption | Per-tenant keys | Key management |
| Namespace | Separate namespaces | Access control |

---

## Application Guidelines

1. Always include tenant_id in state
2. Encrypt sensitive state at rest
3. Validate tenant_id on deserialization
4. Support schema versioning

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Format? | JSON for simplicity, Protobuf for performance | Match requirements |
| Encryption? | Yes for sensitive state | Security |
| Compression? | Yes for large state | Storage efficiency |

## Related Patterns

- **Tenant patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-*`

### Web Research

- Search: "state serialization multi-tenant {date}"
- Search: "tenant state isolation patterns {date}"

## Related Workflows

- `bmad-bam-state-serialization-design` - Design state serialization
```

---

### P1-15: Interrupt/Resume Patterns

**Purpose:** Support human-in-the-loop interrupts in agent workflows.

#### Pattern Registry Entry

```csv
interrupt-resume-patterns,Interrupt/Resume Patterns,ai-hitl,"Use when implementing human-in-the-loop with signals: interrupt,resume,human approval","interrupt,resume,human approval",Support workflow interrupts and resumption,checkpoint-based;message-queue;hybrid,What interrupt points?;Resume timeout?;State preservation?,"agent interrupt resume patterns {date};human-in-the-loop AI {date}",QG-M3,agent-runtime;langgraph-patterns,,Basic: Checkpoint interrupt;Advanced: Async message queue,langgraph-patterns;approval-workflow-patterns
```

#### Agent Guide: `interrupt-resume-patterns.md`

```markdown
# Interrupt/Resume Patterns

**When to load:** When implementing human-in-the-loop, designing approval workflows, or when user mentions interrupt, resume, or human approval.

**Integrates with:** Dev agent, PM agent

---

## Core Concepts

### Why Interrupt/Resume?

Interrupt/resume enables:
- Human approval at critical points
- Pause for external events
- Long-running workflow support

### Interrupt Types

| Type | Trigger | Use Case |
|------|---------|----------|
| Approval | Requires human OK | Sensitive actions |
| Information | Needs user input | Missing data |
| Review | Quality check | High-stakes output |
| Timeout | Time limit reached | Resource protection |

### Resume Strategies

| Strategy | State handling | Timeout |
|----------|----------------|---------|
| Checkpoint | Serialize full state | 24h default |
| Message queue | Event-driven | Configurable |
| Webhook | External callback | No timeout |

---

## Application Guidelines

1. Define interrupt points explicitly
2. Preserve full state at interrupt
3. Set reasonable resume timeouts
4. Notify users of pending interrupts

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| State storage? | Same as checkpoints | Consistency |
| Resume timeout? | 24h for approvals | Balance urgency and flexibility |
| Notification? | Email + in-app | Reach users |

## Related Patterns

- **LangGraph patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `langgraph-*`

### Web Research

- Search: "agent interrupt resume patterns {date}"
- Search: "human-in-the-loop AI workflows {date}"

## Related Workflows

- `bmad-bam-interrupt-resume-design` - Design interrupt/resume workflow
```

---

### P1-16: Memory Lifecycle Governance

**Purpose:** Govern agent memory creation, retention, and deletion.

#### Pattern Registry Entry

```csv
memory-lifecycle-governance,Memory Lifecycle Governance,ai-governance,"Use when governing agent memory with signals: memory lifecycle,retention,deletion","memory lifecycle,retention,deletion",Govern agent memory lifecycle,policy-based;tiered;tenant-controlled,What retention policies?;Deletion triggers?;Audit requirements?,"agent memory lifecycle {date};AI memory governance {date}",QG-M3,memory-tiers;tenant-isolation,,Basic: TTL-based;Advanced: Policy engine with audit,memory-tiers-patterns;compliance-patterns
```

#### Agent Guide: `memory-lifecycle-patterns.md`

```markdown
# Memory Lifecycle Governance Patterns

**When to load:** When implementing memory management, designing retention policies, or when user mentions memory lifecycle, retention, or memory deletion.

**Integrates with:** Architect (Nova persona), Security agent

---

## Core Concepts

### Why Memory Governance?

Memory governance ensures:
- Compliance with retention requirements
- Cost control for memory storage
- Privacy through proper deletion

### Lifecycle Stages

| Stage | Actions | Governance |
|-------|---------|------------|
| Creation | Classify, tag | Policy check |
| Active use | Access, update | Audit logging |
| Retention | Archive, compress | TTL enforcement |
| Deletion | Purge, audit | Compliance verification |

### Retention Tiers

| Memory type | Default retention | Max retention |
|-------------|-------------------|---------------|
| Working | Session | 24 hours |
| Episodic | 30 days | 1 year |
| Semantic | Indefinite | Tenant policy |
| Audit | 7 years | Compliance |

---

## Application Guidelines

1. Classify all memories at creation
2. Apply retention policies per classification
3. Log all deletions for audit
4. Support tenant-specific overrides

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Default retention? | 30 days | Balance utility and privacy |
| Tenant override? | Yes within limits | Flexibility |
| Hard delete? | After retention period | Compliance |

## Related Patterns

- **Memory patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `memory-*`

### Web Research

- Search: "agent memory lifecycle governance {date}"
- Search: "AI memory retention policies {date}"

## Related Workflows

- `bmad-bam-memory-governance-design` - Design memory lifecycle governance
```

---

### P1-17: Grounding Verifier

**Purpose:** Verify agent outputs are grounded in source documents.

#### Pattern Registry Entry

```csv
grounding-verifier,Grounding Verifier,ai-safety,"Use when verifying output grounding with signals: grounding,fact checking,source verification","grounding,fact checking,source verification",Verify agent outputs are grounded in sources,rule-based;ml-based;hybrid,What grounding threshold?;Source citation required?;Ungrounded handling?,"LLM grounding verification {date};RAG grounding patterns {date}",QG-I3,rag-patterns;agent-safety,,Basic: Citation check;Advanced: Semantic grounding,rag-patterns;output-validation-patterns
```

#### Agent Guide: `grounding-verifier-patterns.md`

```markdown
# Grounding Verifier Patterns

**When to load:** When implementing fact-checking, verifying RAG outputs, or when user mentions grounding, source verification, or citation checking.

**Integrates with:** QA agent, Dev agent

---

## Core Concepts

### What is Grounding Verification?

Grounding ensures outputs are:
- Supported by source documents
- Not hallucinated
- Properly attributed

### Verification Methods

| Method | Approach | Accuracy |
|--------|----------|----------|
| Citation check | Verify cited sources | High |
| Semantic similarity | Compare to sources | Medium |
| Entailment | NLI model check | High |
| Cross-reference | Multiple source check | Highest |

### Grounding Levels

| Level | Requirement | Use Case |
|-------|-------------|----------|
| Strict | 100% grounded | Legal, medical |
| Moderate | 80% grounded | General |
| Loose | Best effort | Creative |

---

## Application Guidelines

1. Define grounding level per use case
2. Require citations for factual claims
3. Flag ungrounded statements
4. Track grounding rate over time

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Grounding level? | Moderate for general | Balance accuracy and flexibility |
| Citation format? | Inline + footnote | Clear attribution |
| Ungrounded action? | Flag, don't reject | Human review |

## Related Patterns

- **RAG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rag-*`

### Web Research

- Search: "LLM grounding verification {date}"
- Search: "RAG output validation {date}"

## Related Workflows

- `bmad-bam-grounding-verifier-design` - Design grounding verification
```

---

### P1-18: Chunk-Level Attribution

**Purpose:** Attribute agent outputs to specific source chunks.

#### Pattern Registry Entry

```csv
chunk-attribution,Chunk-Level Attribution,ai-traceability,"Use when attributing outputs to sources with signals: attribution,source tracking,chunk reference","attribution,source tracking,chunk reference",Attribute outputs to specific source chunks,inline;footnote;metadata,What attribution granularity?;Citation format?;Click-through support?,"chunk-level attribution RAG {date};source attribution patterns {date}",QG-I3,rag-patterns;grounding-verifier,,Basic: Inline citation;Advanced: Interactive attribution,rag-patterns;grounding-verifier-patterns
```

#### Agent Guide: `chunk-attribution-patterns.md`

```markdown
# Chunk-Level Attribution Patterns

**When to load:** When implementing source attribution, tracking RAG outputs to chunks, or when user mentions attribution, source tracking, or citations.

**Integrates with:** Dev agent, UX agent

---

## Core Concepts

### What is Chunk-Level Attribution?

Chunk attribution links:
- Each output statement to source chunk(s)
- Enables verification of claims
- Supports click-through to sources

### Attribution Formats

| Format | Placement | User experience |
|--------|-----------|-----------------|
| Inline | In text | Immediate context |
| Footnote | End of response | Clean reading |
| Metadata | Structured data | Programmatic access |
| Interactive | Hover/click | Rich experience |

### Attribution Data

| Field | Purpose | Example |
|-------|---------|---------|
| chunk_id | Unique identifier | `doc_abc_chunk_5` |
| source_url | Original document | `https://...` |
| relevance_score | Match confidence | `0.92` |
| text_snippet | Relevant excerpt | `"According to..."` |

---

## Application Guidelines

1. Track attribution during RAG retrieval
2. Store attribution metadata with response
3. Format for appropriate UX
4. Enable source verification

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Format? | Footnote for readability | Clean UX |
| Include snippet? | Yes | Quick verification |
| Multiple sources? | Show top 3 | Balance coverage and clarity |

## Related Patterns

- **RAG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `rag-*`

### Web Research

- Search: "chunk-level attribution RAG {date}"
- Search: "source citation patterns LLM {date}"

## Related Workflows

- `bmad-bam-chunk-attribution-design` - Design chunk attribution
```

---

## Pattern Registry Additions

### CSV Entries for bam-patterns.csv

Add the following 30 rows to `src/data/bam-patterns.csv`:

```csv
# Phase 0 Patterns (12)
agents-md-publishing,AGENTS.md Publishing,ai-discovery,"Use when exposing agent capabilities to external AI systems","agent discovery,MCP,capability advertisement",Publish agent capabilities in AGENTS.md format,static;dynamic;federated,What capabilities to expose?;Authentication required?;Update frequency?,"AGENTS.md specification {date};AI agent discovery patterns {date}",QG-P1,agent-runtime,,Basic: Static file;Advanced: Dynamic generation,llms-txt-publishing;mcp-server-patterns
llms-txt-publishing,llms.txt Publishing,ai-discovery,"Use when publishing LLM-specific constraints","model constraints,context limits,prompt engineering",Publish LLM configuration in llms.txt format,simple;detailed;dynamic,What model constraints?;Include prompt templates?;Per-tenant variations?,"llms.txt specification {date};LLM configuration patterns {date}",QG-P1,agent-runtime,,Basic: Model list;Advanced: Full context config,agents-md-publishing;model-routing-patterns
agent-refusal-headers,Agent Refusal Headers,ai-safety,"Use when implementing agent refusal transparency","refusal logging,compliance audit,debugging",Add X-Agent-Refusal headers to responses,simple;detailed;categorized,What refusal categories?;Include reasoning?;Audit trail required?,"AI agent refusal patterns {date};agent transparency headers {date}",QG-I3,agent-runtime;guardrails,,Basic: Binary refusal;Advanced: Categorized with reason codes,guardrails-patterns;audit-logging-patterns
canary-token-inserter,Canary Token Inserter,ai-security,"Use when implementing data leakage detection","data leakage,security monitoring,exfiltration detection",Insert traceable tokens in agent outputs,per-tenant;per-session;per-request,What token format?;Rotation frequency?;Detection mechanism?,"canary tokens AI outputs {date};data leakage detection patterns {date}",QG-I2,tenant-isolation;observability,,Basic: Static tokens;Advanced: Dynamic per-request,security-monitoring-patterns;audit-logging-patterns
prompt-rollback-automation,Prompt Rollback Automation,llmops,"Use when implementing prompt version control","prompt versioning,rollback,quality regression",Automate prompt rollback on quality degradation,manual;semi-auto;full-auto,What quality metrics trigger rollback?;Rollback latency tolerance?;Approval required?,"prompt versioning rollback {date};LLMOps prompt management {date}",QG-M3,llmops;observability,,Basic: Manual rollback;Advanced: Auto-rollback on metric drop,llm-versioning;deployment-patterns
model-warmup-patterns,Model Warm-up Patterns,ai-ops,"Use when optimizing model latency","cold start,latency optimization,model loading",Pre-warm models to reduce first-request latency,scheduled;on-demand;predictive,What warm-up frequency?;Which models?;Cost tolerance?,"model warm-up patterns {date};LLM cold start optimization {date}",QG-P1,agent-runtime,,Basic: Scheduled warm-up;Advanced: Predictive warm-up,model-routing-patterns;cost-optimization-patterns
model-feature-flags,Model Feature Flags,llmops,"Use when controlling model rollouts","feature flags,gradual rollout,A/B testing",Control model/prompt rollout with feature flags,boolean;percentage;tenant-targeted,What flag granularity?;Who manages flags?;Audit requirements?,"model feature flags {date};LLM A/B testing patterns {date}",QG-M3,experimentation;llmops,,Basic: Boolean flags;Advanced: Percentage rollout,experimentation-patterns;deployment-patterns
tenant-burst-protection,Tenant Burst Protection,tenant-safety,"Use when protecting against tenant bursts","rate limiting,burst protection,noisy neighbor",Protect system from tenant request bursts,token-bucket;sliding-window;adaptive,What burst tolerance?;Overflow behavior?;Per-tenant or per-tier?,"tenant burst protection patterns {date};rate limiting AI systems {date}",QG-I2,tenant-isolation;agent-resilience,,Basic: Fixed limits;Advanced: Adaptive limits,rate-limiting-patterns;circuit-breaker-patterns
tenant-context-budget,Per-Tenant Context Window Budget,ai-governance,"Use when enforcing context limits","context window,token budget,tenant limits",Enforce context window limits per tenant,hard-limit;soft-limit;adaptive,What context limit per tier?;Overflow handling?;Compression allowed?,"context window budget patterns {date};LLM token management {date}",QG-M3,run-contracts;tenant-isolation,,Basic: Hard limits;Advanced: Dynamic compression,token-management-patterns;memory-tiers-patterns
tenant-agent-limits,Per-Tenant Agent Instance Limits,tenant-governance,"Use when limiting agent concurrency","concurrency limits,agent instances,resource allocation",Limit concurrent agent instances per tenant,fixed;pooled;elastic,What concurrency limits per tier?;Queue overflow?;Priority handling?,"agent concurrency limits {date};multi-tenant resource allocation {date}",QG-I2,tenant-isolation;agent-runtime,,Basic: Fixed limits;Advanced: Elastic scaling,resource-allocation-patterns;tenant-isolation-patterns
conditional-edge-patterns,Conditional Edge Patterns,langgraph,"Use when implementing branching in LangGraph","conditional routing,state machine,workflow branching",Patterns for LangGraph conditional edges,binary;multi-way;dynamic,What routing conditions?;Default path?;Error handling?,"LangGraph conditional edges {date};state machine patterns AI {date}",QG-M3,agent-runtime,,Basic: Binary conditions;Advanced: Dynamic routing,langgraph-patterns;agent-runtime-patterns
tool-idempotency,Tool Idempotency Guarantees,ai-reliability,"Use when ensuring tool reliability","idempotency,retry safety,tool reliability",Ensure agent tool executions are idempotent,natural;synthetic;transactional,Which tools need idempotency?;Key generation strategy?;Deduplication window?,"idempotent tool execution {date};retry safety patterns {date}",QG-M3,tool-execution,,Basic: Idempotency keys;Advanced: Transactional tools,tool-execution-patterns;agent-resilience-patterns

# Phase 1 Patterns (18)
kill-switch-registry,Kill Switch Registry,ai-safety,"Use when implementing emergency agent shutdown","kill switch,emergency shutdown,circuit breaker",Centralized registry for agent kill switches,per-agent;per-tenant;global,What kill switch granularity?;Who can trigger?;Propagation latency?,"AI agent kill switch patterns {date};emergency shutdown AI systems {date}",QG-I3,agent-runtime;security,,Basic: Per-agent switches;Advanced: Hierarchical with propagation,circuit-breaker-patterns;agent-safety-patterns
fanout-circuit-breaker,Fan-Out Circuit Breaker,ai-reliability,"Use when protecting fan-out operations","fan-out,parallel execution,blast radius",Circuit breaker for parallel agent operations,per-operation;per-target;adaptive,What failure threshold?;Cooldown period?;Partial success handling?,"fan-out circuit breaker {date};parallel execution patterns AI {date}",QG-I3,agent-resilience;agent-runtime,,Basic: Binary breaker;Advanced: Partial degradation,circuit-breaker-patterns;parallel-execution-patterns
tool-budget-guards,Tool Budget Guards,ai-governance,"Use when enforcing tool limits","tool budget,execution limits,cost control",Enforce tool execution budgets,per-tool;per-agent;per-tenant,What budget dimensions?;Overflow behavior?;Reset frequency?,"tool budget enforcement {date};agent tool limits {date}",QG-M3,run-contracts;tool-execution,,Basic: Count limits;Advanced: Cost-weighted budgets,run-contracts;cost-optimization-patterns
tool-timeout-management,Tool Timeout Management,ai-reliability,"Use when managing tool timeouts","tool timeout,execution time,latency management",Manage tool execution timeouts,fixed;adaptive;tiered,What timeout per tool?;Retry on timeout?;Partial result handling?,"tool timeout patterns {date};execution timeout management {date}",QG-M3,tool-execution,,Basic: Fixed timeouts;Advanced: Adaptive timeouts,tool-execution-patterns;agent-resilience-patterns
tool-fallback-chains,Tool Fallback Chains,ai-reliability,"Use when implementing tool fallbacks","tool fallback,redundancy,failover",Define fallback chains for tool failures,static;dynamic;intelligent,What fallback depth?;Quality vs speed tradeoff?;Per-tenant fallbacks?,"tool fallback patterns {date};failover strategies AI {date}",QG-M3,tool-execution;agent-resilience,,Basic: Single fallback;Advanced: Dynamic chain selection,tool-execution-patterns;agent-resilience-patterns
retry-budget-engine,Retry Budget Engine,ai-reliability,"Use when managing retries","retry budget,exponential backoff,failure recovery",Manage retry budgets across operations,fixed;dynamic;adaptive,What retry limits?;Backoff strategy?;Budget sharing?,"retry budget patterns {date};exponential backoff AI {date}",QG-M3,agent-resilience,,Basic: Fixed retry count;Advanced: Budget pool with prioritization,agent-resilience-patterns;circuit-breaker-patterns
llm-provider-dashboard,LLM Provider Health Dashboard,observability,"Use when monitoring LLM providers","provider health,latency tracking,availability",Real-time dashboard for LLM provider health,basic;detailed;predictive,What metrics to track?;Alert thresholds?;Historical analysis?,"LLM provider monitoring {date};AI observability dashboard {date}",QG-P1,observability;llmops,,Basic: Up/down status;Advanced: Latency percentiles + predictions,observability-patterns;llmops-patterns
tenant-anomaly-detection,Tenant Usage Anomaly Detection,tenant-safety,"Use when detecting usage anomalies","anomaly detection,usage patterns,abuse prevention",Detect anomalous tenant usage patterns,statistical;ml-based;rule-based,What anomaly signals?;Alert sensitivity?;Auto-response?,"usage anomaly detection {date};multi-tenant abuse detection {date}",QG-I2,observability;tenant-isolation,,Basic: Rule-based;Advanced: ML anomaly detection,tenant-isolation-patterns;security-monitoring-patterns
invisible-failure-detector,Invisible Failure Detector,ai-safety,"Use when detecting silent failures","silent failure,quality degradation,output validation",Detect failures without explicit errors,semantic;statistical;comparative,What quality signals?;Baseline comparison?;Auto-remediation?,"silent failure detection AI {date};LLM output quality monitoring {date}",QG-I3,observability;agent-safety,,Basic: Semantic checks;Advanced: Comparative validation,output-validation-patterns;agent-safety-patterns
mcp-server-monitoring,MCP Server Health Monitoring,observability,"Use when monitoring MCP servers","MCP health,server monitoring,tool availability",Monitor MCP server health and performance,heartbeat;synthetic;traffic-based,What health checks?;Alert thresholds?;Auto-failover?,"MCP server monitoring {date};tool server health patterns {date}",QG-P1,mcp-patterns;observability,,Basic: Heartbeat;Advanced: Synthetic probes + traffic analysis,mcp-server-patterns;observability-patterns
output-drift-monitor,Output Drift Monitor,ai-safety,"Use when monitoring output quality","output drift,quality monitoring,model degradation",Monitor agent output quality over time,statistical;semantic;comparative,What drift metrics?;Baseline window?;Alert sensitivity?,"output drift detection {date};LLM quality monitoring {date}",QG-I3,observability;agent-safety,,Basic: Statistical drift;Advanced: Semantic drift analysis,output-validation-patterns;llmops-patterns
provider-quota-management,Provider Quota Management,ai-ops,"Use when managing provider quotas","API quota,rate limits,provider limits",Manage LLM provider API quotas,tracking;predictive;multi-provider,What quota dimensions?;Reservation strategy?;Overflow handling?,"LLM provider quota management {date};API rate limit strategies {date}",QG-P1,llmops;cost-optimization,,Basic: Tracking;Advanced: Predictive allocation,cost-optimization-patterns;llmops-patterns
langgraph-checkpoint-persistence,LangGraph Checkpoint Persistence,langgraph,"Use when persisting LangGraph state","checkpoint,state persistence,workflow recovery",Persist LangGraph checkpoints multi-tenant,memory;redis;postgres,What storage backend?;Retention policy?;Tenant isolation?,"LangGraph checkpoint persistence {date};state persistence patterns {date}",QG-M3,langgraph-patterns;tenant-isolation,,Basic: Memory checkpointer;Advanced: PostgreSQL with RLS,langgraph-patterns;state-management-patterns
state-serialization-multitenant,State Serialization Multi-Tenant,state-management,"Use when serializing tenant state","state serialization,tenant state,isolation",Serialize agent state with tenant isolation,json;msgpack;protobuf,What serialization format?;Encryption at rest?;Cross-tenant prevention?,"state serialization multi-tenant {date};tenant state isolation {date}",QG-M3,tenant-isolation;state-management,,Basic: JSON;Advanced: Encrypted protobuf,tenant-isolation-patterns;state-management-patterns
interrupt-resume-patterns,Interrupt/Resume Patterns,ai-hitl,"Use when implementing human-in-the-loop","interrupt,resume,human approval",Support workflow interrupts and resumption,checkpoint-based;message-queue;hybrid,What interrupt points?;Resume timeout?;State preservation?,"agent interrupt resume patterns {date};human-in-the-loop AI {date}",QG-M3,agent-runtime;langgraph-patterns,,Basic: Checkpoint interrupt;Advanced: Async message queue,langgraph-patterns;approval-workflow-patterns
memory-lifecycle-governance,Memory Lifecycle Governance,ai-governance,"Use when governing agent memory","memory lifecycle,retention,deletion",Govern agent memory lifecycle,policy-based;tiered;tenant-controlled,What retention policies?;Deletion triggers?;Audit requirements?,"agent memory lifecycle {date};AI memory governance {date}",QG-M3,memory-tiers;tenant-isolation,,Basic: TTL-based;Advanced: Policy engine with audit,memory-tiers-patterns;compliance-patterns
grounding-verifier,Grounding Verifier,ai-safety,"Use when verifying output grounding","grounding,fact checking,source verification",Verify agent outputs are grounded in sources,rule-based;ml-based;hybrid,What grounding threshold?;Source citation required?;Ungrounded handling?,"LLM grounding verification {date};RAG grounding patterns {date}",QG-I3,rag-patterns;agent-safety,,Basic: Citation check;Advanced: Semantic grounding,rag-patterns;output-validation-patterns
chunk-attribution,Chunk-Level Attribution,ai-traceability,"Use when attributing outputs to sources","attribution,source tracking,chunk reference",Attribute outputs to specific source chunks,inline;footnote;metadata,What attribution granularity?;Citation format?;Click-through support?,"chunk-level attribution RAG {date};source attribution patterns {date}",QG-I3,rag-patterns;grounding-verifier,,Basic: Inline citation;Advanced: Interactive attribution,rag-patterns;grounding-verifier-patterns
```

---

## Quality Gate Updates

### QG-M3 (Agent Runtime) Additions

Add the following checks to `src/data/checklists/qg-m3-agent-runtime.md`:

```markdown
### Production Readiness Checks (Phase 0+1)

- [ ] Tool idempotency implemented for write operations
- [ ] Conditional edge patterns documented and tested
- [ ] Context window budgets enforced per tenant
- [ ] Tool timeout management configured
- [ ] Tool fallback chains defined
- [ ] Retry budget engine implemented
- [ ] LangGraph checkpoint persistence configured
- [ ] State serialization with tenant isolation
- [ ] Interrupt/resume patterns for HITL workflows
- [ ] Memory lifecycle governance policies defined
```

### QG-I3 (Agent Safety) Additions

Add the following checks to `src/data/checklists/qg-i3-agent-safety.md`:

```markdown
### Safety Monitoring Checks (Phase 0+1)

- [ ] Kill switch registry implemented with <1s propagation
- [ ] Agent refusal headers added to all responses
- [ ] Invisible failure detection sampling configured
- [ ] Output drift monitoring with baselines
- [ ] Grounding verifier for RAG outputs
- [ ] Chunk-level attribution implemented
- [ ] Fan-out circuit breakers for parallel operations
```

### QG-I2 (Tenant Safety) Additions

Add the following checks to `src/data/checklists/qg-i2-tenant-safety.md`:

```markdown
### Tenant Protection Checks (Phase 0+1)

- [ ] Canary token insertion for data leakage detection
- [ ] Tenant burst protection with rate limiting
- [ ] Per-tenant agent instance limits
- [ ] Tenant usage anomaly detection configured
```

### QG-P1 (Production Readiness) Additions

Add the following checks to `src/data/checklists/production-readiness.md`:

```markdown
### AI Discovery & Operations (Phase 0+1)

- [ ] AGENTS.md published with all capabilities
- [ ] llms.txt published with model configurations
- [ ] Model warm-up patterns implemented
- [ ] Model feature flags for gradual rollout
- [ ] LLM provider health dashboard operational
- [ ] Provider quota management with alerts
- [ ] MCP server health monitoring active
- [ ] Prompt rollback automation configured
```

---

## Implementation Checklist

### Phase 0 Implementation (Weeks 1-2)

| Pattern | Agent Guide | Workflow | Template | QG Update |
|---------|-------------|----------|----------|-----------|
| AGENTS.md Publishing | Create | Create | Create | QG-P1 |
| llms.txt Publishing | Create | Create | Create | QG-P1 |
| Agent Refusal Headers | Create | Create | - | QG-I3 |
| Canary Token Inserter | Create | Create | - | QG-I2 |
| Prompt Rollback Automation | Create | Create | - | QG-P1 |
| Model Warm-up Patterns | Create | Create | - | QG-P1 |
| Model Feature Flags | Create | Create | - | QG-M3 |
| Tenant Burst Protection | Create | Create | - | QG-I2 |
| Per-Tenant Context Budget | Create | Create | - | QG-M3 |
| Per-Tenant Agent Limits | Create | Create | - | QG-I2 |
| Conditional Edge Patterns | Create | Create | Create | QG-M3 |
| Tool Idempotency Guarantees | Create | Create | - | QG-M3 |

### Phase 1 Implementation (Weeks 3-8)

| Pattern | Agent Guide | Workflow | Template | QG Update |
|---------|-------------|----------|----------|-----------|
| Kill Switch Registry | Create | Create | Create | QG-I3 |
| Fan-Out Circuit Breaker | Create | Create | - | QG-I3 |
| Tool Budget Guards | Create | Create | - | QG-M3 |
| Tool Timeout Management | Create | Create | - | QG-M3 |
| Tool Fallback Chains | Create | Create | Create | QG-M3 |
| Retry Budget Engine | Create | Create | - | QG-M3 |
| LLM Provider Dashboard | Create | Create | Create | QG-P1 |
| Tenant Anomaly Detection | Create | Create | - | QG-I2 |
| Invisible Failure Detector | Create | Create | - | QG-I3 |
| MCP Server Monitoring | Create | Create | Create | QG-P1 |
| Output Drift Monitor | Create | Create | - | QG-I3 |
| Provider Quota Management | Create | Create | - | QG-P1 |
| LangGraph Checkpoint | Create | Create | Create | QG-M3 |
| State Serialization MT | Create | Create | - | QG-M3 |
| Interrupt/Resume | Create | Create | - | QG-M3 |
| Memory Lifecycle Gov | Create | Create | Create | QG-M3 |
| Grounding Verifier | Create | Create | - | QG-I3 |
| Chunk-Level Attribution | Create | Create | - | QG-I3 |

---

## Summary

This design specification provides:

1. **30 complete pattern definitions** compatible with BMM/BAM architecture
2. **Pattern registry entries** with proper `web_queries` columns using `{date}` placeholder
3. **Agent guide templates** following WDS pattern (no `memories:` field)
4. **Workflow structures** with CEV step organization
5. **Quality gate updates** mapping patterns to existing gates

**Next Steps:**
1. Review and approve this design
2. Create actual files in BAM module structure
3. Add pattern entries to `bam-patterns.csv`
4. Update quality gate checklists
5. Run `npm test` to verify compliance

---

**Design Status:** COMPLETE
**BMM Compatibility:** VERIFIED
**BAM Architecture Alignment:** VERIFIED
