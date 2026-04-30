# NEXUS Patterns Phase 2 - Design Spec

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 9 medium-priority NEXUS patterns to BAM V2 with full BMAD 5-layer integration and comprehensive knowledge decay prevention.

**Architecture:** All 9 patterns are Innovation-tier (full .md files with YAML schemas). Each pattern has 6 anti-decay mechanisms: CSV web_queries, pattern Web Research section, TOML web search prompts, domain Web Research, YAML-only schemas, and QG alignment.

**Tech Stack:** Markdown patterns with YAML frontmatter, CSV registry, TOML menu entries, Jest tests.

---

## Knowledge Decay Prevention Strategy

### 6-Point Anti-Decay Per Pattern

| Layer | Mechanism | Queries Required |
|-------|-----------|------------------|
| CSV Registry | `web_queries` column | 4+ with `{date}` |
| Pattern .md | Web Research section | 4+ with `{date}` |
| TOML Menu | Web search in prompt | 3+ with `{date}` |
| Domain .md | Web Research subsection | 2+ with `{date}` |
| Pattern .md | YAML schemas only | `bam_controlled: true` |
| Quality Gate | Existing QG web_queries | Already have `{date}` |

### Anti-Decay Rules

1. **No implementation code** - YAML schemas define structure, not implementation
2. **No hardcoded versions** - Use `{date}` placeholder for current year
3. **No specific library imports** - Reference patterns, not code
4. **Framework-agnostic queries** - Include LangGraph, CrewAI, MCP variations
5. **Production + enterprise context** - Queries include enterprise/production terms

---

## Patterns Overview

| # | Pattern | Category | Shortcode | QG Ref | NEXUS Layer | Domain |
|---|---------|----------|-----------|--------|-------------|--------|
| 1 | semantic-firewall | security | ZSF | QG-S4 | L3 Guardrails | security.md |
| 2 | output-sanitization | security | ZOS | QG-S7 | L3 Guardrails | security.md |
| 3 | rbac-per-tool | security | ZRT | QG-AI1 | L10 Security | security.md |
| 4 | reasoning-trace-collector | observability | ZRX | QG-S5 | L5 Observability | observability.md |
| 5 | cost-attribution-engine | monetization | ZCA | QG-P1 | L20 Cost | billing.md |
| 6 | tenant-chaos-injector | testing | ZCI | QG-DR1 | L40 Failure | testing.md |
| 7 | incident-correlation-engine | operations | ZIC | QG-IR1 | L40 Failure | observability.md |
| 8 | tool-schema-versioning | ai-runtime | ZTV | QG-M3 | L15 Tooling | ai-runtime.md |
| 9 | agent-handoff-protocol | ai-runtime | ZAH | QG-M3 | L10 Orchestration | ai-runtime.md |

---

## Pattern 1: semantic-firewall.md

**Shortcode:** ZSF  
**Category:** security  
**QG Ref:** QG-S4 (AI Security Gate)  
**NEXUS Layer:** L3 Guardrails  
**Domain:** security.md

### Purpose

Semantic analysis of AI inputs/outputs to detect policy violations beyond simple pattern matching. Uses embedding-based similarity and intent classification to catch sophisticated attacks that evade regex patterns.

### When to Use

- Multi-tenant AI with custom content policies per tenant
- Platforms requiring semantic intent detection
- Systems processing user-generated content through LLMs
- Enterprise deployments with compliance-driven content rules

### When NOT to Use

- Simple chatbots with no content restrictions
- Internal tools with trusted users only
- Systems where regex patterns are sufficient
- Development/sandbox environments

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Semantic Firewall                          │
│                                                              │
│  Input ──►┌──────────────┐    ┌──────────────┐              │
│           │ Intent       │───►│ Policy       │              │
│           │ Classifier   │    │ Engine       │              │
│           └──────────────┘    └──────┬───────┘              │
│                                      │                       │
│           ┌──────────────┐    ┌──────▼───────┐              │
│           │ Embedding    │───►│ Violation    │──► Action    │
│           │ Similarity   │    │ Scorer       │              │
│           └──────────────┘    └──────────────┘              │
│                                                              │
│  Tenant Policies: {tenant_id} → policy_set                  │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-01)

```yaml
semantic_firewall:
  version: "1.0.0"
  bam_controlled: true
  
  analysis_layers:
    intent_classification:
      enabled: bool
      categories: list[string]
      model: string
      threshold: float
      
    embedding_similarity:
      enabled: bool
      reference_embeddings: string
      distance_metric: enum[cosine, euclidean]
      threshold: float
      
    policy_engine:
      format: enum[rego, yaml, json]
      tenant_policies: bool
      global_policies: bool
      
  actions:
    on_violation:
      action: enum[block, flag, rewrite, escalate]
      log_level: enum[info, warning, security]
      notify: list[string]
      
  tenant_configuration:
    per_tenant_policies: bool
    tier_enforcement:
      free: enum[basic, standard]
      pro: enum[standard, strict]
      enterprise: enum[custom]
```

### Tenant-Aware Schema (P2-01b)

```yaml
tenant_semantic_config:
  tier_settings:
    free:
      intent_classification: bool
      embedding_similarity: bool
      custom_policies: bool
      
    pro:
      intent_classification: bool
      embedding_similarity: bool
      custom_policies: bool
      
    enterprise:
      intent_classification: bool
      embedding_similarity: bool
      custom_policies: bool
      policy_format: enum[rego, yaml, json]
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Intent classifier only | Fast, low latency | May miss edge cases | High-volume, simple policies |
| Embedding similarity | Catches semantic variants | Higher compute cost | Sophisticated content policies |
| Full policy engine | Maximum flexibility | Complex to configure | Enterprise compliance |
| Combined approach | Best coverage | Highest latency | High-security deployments |

### Security Considerations

| Risk | Mitigation |
|------|------------|
| Classifier bypass | Multiple detection layers |
| Embedding adversarial attacks | Regular model updates via web search |
| Policy misconfiguration | Validation + testing framework |
| Performance degradation | Tiered enforcement by tenant tier |

### Web Research Queries

- "semantic firewall LLM production patterns {date}"
- "AI content policy engine enterprise {date}"
- "embedding-based content moderation multi-tenant {date}"
- "Anthropic Claude guardrails implementation {date}"

**Framework-Specific:**
- "LangGraph content filtering guardrails {date}"
- "CrewAI agent content policy {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S4 | Semantic firewall active and tested |

### Related Patterns

- [prompt-injection-detection.md](prompt-injection-detection.md) - Input-side detection
- [output-sanitization.md](output-sanitization.md) - Output-side filtering
- [ai-safety.md](ai-safety.md) - Broader safety controls

---

## Pattern 2: output-sanitization.md

**Shortcode:** ZOS  
**Category:** security  
**QG Ref:** QG-S7 (Data Protection Gate)  
**NEXUS Layer:** L3 Guardrails  
**Domain:** security.md

### Purpose

Sanitize AI outputs to remove PII, secrets, tenant identifiers, and sensitive data before delivery to users. Prevents accidental data leakage across tenant boundaries.

### When to Use

- AI systems processing sensitive data
- Multi-tenant platforms with strict data isolation
- Systems under GDPR/CCPA/HIPAA compliance
- Any LLM output that may contain training data artifacts
- Cross-tenant data leakage prevention

### When NOT to Use

- Internal analytics with no user-facing output
- Systems with homogeneous non-sensitive data
- Development environments with synthetic data

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Output Sanitization Pipeline                │
│                                                              │
│  LLM Output ──►┌──────────────┐    ┌──────────────┐         │
│                │ PII          │───►│ Secret       │         │
│                │ Detector     │    │ Scanner      │         │
│                └──────────────┘    └──────┬───────┘         │
│                                           │                  │
│                ┌──────────────┐    ┌──────▼───────┐         │
│                │ Tenant ID    │───►│ Sanitizer    │──► Out  │
│                │ Detector     │    │ Engine       │         │
│                └──────────────┘    └──────────────┘         │
│                                                              │
│  Actions: [REDACT] [MASK] [TOKENIZE] [BLOCK]                │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-02)

```yaml
output_sanitization:
  version: "1.0.0"
  bam_controlled: true
  
  detection_rules:
    pii:
      enabled: bool
      types: list[enum[email, phone, ssn, credit_card, address, name, dob]]
      action: enum[redact, mask, tokenize]
      confidence_threshold: float
      
    secrets:
      enabled: bool
      patterns: list[string]
      action: enum[redact, block]
      
    tenant_data:
      cross_tenant_detection: bool
      tenant_identifier_patterns: list[string]
      action: enum[redact, block, alert]
      
  sanitization:
    redaction:
      replacement: string
      preserve_length: bool
      
    masking:
      visible_chars: int
      mask_char: string
      position: enum[start, end, middle]
      
    tokenization:
      reversible: bool
      ttl_hours: int
      storage: enum[memory, database, vault]
      
  tenant_configuration:
    per_tenant_rules: bool
    tier_strictness:
      free: enum[basic]
      pro: enum[standard]
      enterprise: enum[custom]
      
  audit:
    log_sanitization_events: bool
    include_original: bool
    retention_days: int
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Regex-based detection | Fast, predictable | Misses variants | Simple PII types |
| ML-based detection | Higher accuracy | Latency, cost | Complex data types |
| Tokenization | Reversible | Storage overhead | Audit requirements |
| Hard redaction | Simple, secure | Data loss | Maximum security |

### Web Research Queries

- "LLM output PII detection redaction {date}"
- "AI data leakage prevention patterns {date}"
- "GDPR LLM output compliance {date}"
- "secret scanning AI output filtering {date}"

**Framework-Specific:**
- "LangGraph output filtering {date}"
- "Presidio PII detection integration {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S7 | Output sanitization active, PII tests pass |

### Related Patterns

- [semantic-firewall.md](semantic-firewall.md) - Semantic content filtering
- [prompt-injection-detection.md](prompt-injection-detection.md) - Input protection
- [data-residency.md](data-residency.md) - Data location compliance

---

## Pattern 3: rbac-per-tool.md

**Shortcode:** ZRT  
**Category:** security  
**QG Ref:** QG-AI1 (AI Safety Evaluation Gate)  
**NEXUS Layer:** L10 Security  
**Domain:** security.md

### Purpose

Role-based access control for AI agent tool permissions. Controls which tools agents can invoke based on tenant tier, user role, and operation context.

### When to Use

- AI agents with powerful/dangerous tools
- Multi-tenant systems with tiered capabilities
- Platforms requiring per-user tool restrictions
- Systems with tools that modify external state
- Compliance requirements for tool access audit

### When NOT to Use

- Single-tenant internal tools
- Read-only agent deployments
- Sandbox/development environments
- Agents with only safe, reversible tools

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    RBAC Tool Permission                      │
│                                                              │
│  Tool Request                                                │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Tenant Tier │───►│ User Role   │───►│ Tool Policy │      │
│  │ Check       │    │ Check       │    │ Evaluation  │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │              │
│                     ┌─────────────────────────┘              │
│                     ▼                                        │
│            ┌─────────────────┐                               │
│            │ ALLOW │ DENY │ REQUIRE_APPROVAL                │
│            └─────────────────┘                               │
│                                                              │
│  Conditions: [Time Window] [Budget] [Rate Limit] [Approval] │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-03)

```yaml
rbac_per_tool:
  version: "1.0.0"
  bam_controlled: true
  
  permission_model:
    hierarchy:
      - platform_admin
      - tenant_admin
      - tenant_user
      - agent
      
    tool_permissions:
      tool_id: string
      allowed_roles: list[string]
      denied_roles: list[string]
      conditions: list[condition]
      
    condition:
      type: enum[time_window, request_count, approval_required, budget_check]
      params: map[string, any]
      
  tenant_scoping:
    per_tenant_tools: bool
    tool_inheritance: bool
    tier_restrictions:
      free: list[string]
      pro: list[string]
      enterprise: list[string]
      
  evaluation:
    mode: enum[allow_list, deny_list, hybrid]
    cache_ttl_seconds: int
    audit_all: bool
    
  agent_constraints:
    max_tools_per_request: int
    sensitive_tool_approval: bool
    cross_tenant_tool_block: bool
    
  escalation:
    approval_timeout_minutes: int
    default_on_timeout: enum[allow, deny]
    notify_on_denial: list[string]
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Static allow-list | Simple, fast | Inflexible | Small tool sets |
| Dynamic RBAC | Flexible | Complexity | Enterprise deployments |
| Approval workflows | Maximum control | Latency | High-risk tools |
| Tier-based | Easy to understand | Coarse-grained | SaaS tiering |

### Web Research Queries

- "AI agent tool RBAC patterns {date}"
- "LangGraph tool permissions implementation {date}"
- "MCP tool access control multi-tenant {date}"
- "agent capability management enterprise {date}"

**Framework-Specific:**
- "LangGraph tool permission middleware {date}"
- "CrewAI agent tool restrictions {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Tool permissions verified, RBAC tests pass |

### Related Patterns

- [action-contract.md](action-contract.md) - Action validation
- [tool-execution.md](tool-execution.md) - Tool runtime patterns
- [run-contracts.md](run-contracts.md) - Execution limits

---

## Pattern 4: reasoning-trace-collector.md

**Shortcode:** ZRX  
**Category:** observability  
**QG Ref:** QG-S5 (Continuous Security Gate)  
**NEXUS Layer:** L5 Observability  
**Domain:** observability.md

### Purpose

Collect, store, and analyze AI agent reasoning traces for debugging, auditing, compliance, and model improvement.

### When to Use

- Enterprise AI deployments requiring audit trails
- Debugging complex multi-step agent workflows
- Model fine-tuning based on production traces
- Compliance scenarios requiring decision explanations
- Performance optimization initiatives

### When NOT to Use

- High-volume, low-value interactions
- Privacy-sensitive contexts without consent
- Cost-constrained deployments
- Simple single-turn interactions

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               Reasoning Trace Collector                      │
│                                                              │
│  Agent Execution                                             │
│       │                                                      │
│       ├──► Input ──────────────────────────────┐             │
│       ├──► Tool Selection ─────────────────────┤             │
│       ├──► Tool Execution ─────────────────────┤             │
│       ├──► Decision Branch ────────────────────┼──► Trace    │
│       └──► Output ─────────────────────────────┘    Store    │
│                                                      │       │
│            ┌──────────────────────────────────────────┘      │
│            ▼                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Index       │    │ Search      │    │ Analyze     │      │
│  │ (Tenant)    │    │ (Query)     │    │ (Anomaly)   │      │
│  └─────────────┘    └─────────────┘    └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-04)

```yaml
reasoning_trace_collector:
  version: "1.0.0"
  bam_controlled: true
  
  collection:
    capture_points:
      - input_received
      - context_retrieved
      - tool_selection
      - tool_execution
      - decision_branch
      - output_generation
      
    detail_level: enum[minimal, standard, verbose, debug]
    
    include:
      prompts: bool
      tool_calls: bool
      tool_results: bool
      intermediate_outputs: bool
      timing: bool
      token_counts: bool
      embedding_vectors: bool
      
  storage:
    backend: enum[database, object_storage, time_series]
    retention_days: int
    compression: bool
    tenant_isolation: bool
    
  tenant_configuration:
    per_tenant_retention: bool
    tier_detail_level:
      free: enum[minimal]
      pro: enum[standard]
      enterprise: enum[verbose, debug]
    tier_retention_days:
      free: int
      pro: int
      enterprise: int
      
  analysis:
    indexing: bool
    searchable_fields: list[string]
    anomaly_detection: bool
    baseline_comparison: bool
    
  privacy:
    pii_redaction: bool
    prompt_hashing: bool
    consent_required: bool
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Minimal tracing | Low overhead | Limited debugging | High-volume |
| Standard tracing | Good balance | Moderate storage | Most deployments |
| Verbose tracing | Full visibility | High storage cost | Debugging, audit |
| Debug tracing | Complete picture | Performance impact | Development |

### Web Research Queries

- "AI agent reasoning trace collection {date}"
- "LLM observability tracing patterns {date}"
- "agent decision audit logging enterprise {date}"
- "LangSmith tracing integration {date}"

**Framework-Specific:**
- "LangGraph tracing LangSmith {date}"
- "CrewAI agent observability {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S5 | Trace collection active, anomaly detection configured |

### Related Patterns

- [ai-observability.md](ai-observability.md) - Broader observability
- [invisible-failure-detector.md](invisible-failure-detector.md) - Silent failure detection
- [output-drift-monitor.md](output-drift-monitor.md) - Quality monitoring

---

## Pattern 5: cost-attribution-engine.md

**Shortcode:** ZCA  
**Category:** monetization  
**QG Ref:** QG-P1 (Production Readiness)  
**NEXUS Layer:** L20 Cost  
**Domain:** billing.md

### Purpose

Attribute AI/LLM operational costs to tenants, users, agents, and operations for billing, budgeting, and optimization.

### When to Use

- Usage-based billing for AI features
- Cost allocation across business units
- Budget enforcement per tenant/tier
- Cost optimization initiatives
- Chargeback models for internal AI platforms

### When NOT to Use

- Fixed-price AI offerings
- Single-tenant deployments
- Development/testing environments
- Minimal AI usage scenarios

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Cost Attribution Engine                     │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Token       │    │ Compute     │    │ Storage     │      │
│  │ Metering    │    │ Metering    │    │ Metering    │      │
│  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            ▼                                 │
│                   ┌─────────────────┐                        │
│                   │ Attribution     │                        │
│                   │ Engine          │                        │
│                   └────────┬────────┘                        │
│                            │                                 │
│    ┌───────────────────────┼───────────────────────┐        │
│    ▼                       ▼                       ▼        │
│ [Tenant]              [User]                  [Agent]       │
│                                                              │
│  Alerts: [Warning %] [Critical %] [Budget Exceeded]         │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-05)

```yaml
cost_attribution_engine:
  version: "1.0.0"
  bam_controlled: true
  
  attribution_dimensions:
    tenant: bool
    user: bool
    agent: bool
    operation_type: bool
    model: bool
    tool: bool
    
  metering:
    tokens:
      input: bool
      output: bool
      embedding: bool
      
    compute:
      gpu_seconds: bool
      cpu_seconds: bool
      
    storage:
      embeddings_gb: bool
      traces_gb: bool
      cache_gb: bool
      
    api_calls:
      external_apis: bool
      tool_invocations: bool
      
  allocation_rules:
    shared_resources:
      method: enum[proportional, fixed, usage_based]
      
    overhead:
      allocation: enum[spread, tenant_tier, exclude]
      
    model_costs:
      source: enum[api_pricing, custom_rates, provider_billing]
      
  reporting:
    real_time: bool
    aggregation_interval: enum[minute, hour, day]
    export_format: enum[json, csv, parquet]
    
  tenant_configuration:
    per_tenant_budgets: bool
    budget_enforcement: enum[soft, hard]
    alert_thresholds:
      warning_percent: int
      critical_percent: int
    actions_on_exceed:
      warning: enum[alert, throttle, none]
      critical: enum[alert, throttle, block]
      
  anomaly_detection:
    enabled: bool
    baseline_window_days: int
    deviation_threshold: float
    alert_on_anomaly: bool
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Per-request tracking | Precise | High overhead | Enterprise billing |
| Aggregated tracking | Low overhead | Less precise | Internal chargeback |
| Real-time attribution | Immediate visibility | Complexity | Budget enforcement |
| Batch attribution | Simple | Delayed insights | Reporting only |

### Web Research Queries

- "LLM cost attribution multi-tenant {date}"
- "AI token metering billing patterns {date}"
- "usage-based AI pricing implementation {date}"
- "OpenAI cost allocation enterprise {date}"

**Framework-Specific:**
- "LangSmith cost tracking {date}"
- "Anthropic usage API billing {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Cost tracking active, budget alerts configured |

### Related Patterns

- [usage-metering.md](usage-metering.md) - General usage tracking
- [quota-management.md](quota-management.md) - Quota enforcement
- [llm-cost-tracking.md](llm-cost-tracking.md) - LLM-specific costs

---

## Pattern 6: tenant-chaos-injector.md

**Shortcode:** ZCI  
**Category:** testing  
**QG Ref:** QG-DR1 (Disaster Recovery Drill)  
**NEXUS Layer:** L40 Failure  
**Domain:** testing.md

### Purpose

Controlled chaos engineering for tenant isolation testing. Validates that failures in one tenant don't cascade to others.

### When to Use

- Validating tenant isolation under failure conditions
- Testing noisy neighbor protections
- Pre-production resilience verification
- Compliance validation for isolation claims
- Regular chaos engineering drills

### When NOT to Use

- Production without proper safeguards
- During high-traffic periods
- Without rollback capabilities
- Single-tenant deployments

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Tenant Chaos Injector                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Control Plane                         ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││
│  │  │ Latency │  │ Error   │  │ Resource│  │ Cross-  │    ││
│  │  │ Inject  │  │ Inject  │  │ Exhaust │  │ Tenant  │    ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    ││
│  └───────┼────────────┼────────────┼────────────┼──────────┘│
│          │            │            │            │            │
│          └────────────┴────────────┴────────────┘            │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │ Target Tenant   │                        │
│                   │ (Isolated)      │                        │
│                   └─────────────────┘                        │
│                                                              │
│  Safety: [Auto-Rollback] [Blast Radius] [Excluded Tenants]  │
│  Assert: [No Cascade] [Isolation Held] [Recovery Time]      │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-06)

```yaml
tenant_chaos_injector:
  version: "1.0.0"
  bam_controlled: true
  
  injection_types:
    latency:
      enabled: bool
      min_ms: int
      max_ms: int
      distribution: enum[uniform, normal, exponential]
      
    error:
      enabled: bool
      error_rate: float
      error_types: list[string]
      
    resource_exhaustion:
      enabled: bool
      resource: enum[memory, cpu, connections, tokens, storage]
      exhaustion_percent: int
      
    cross_tenant_simulation:
      enabled: bool
      access_attempt: bool
      privilege_escalation: bool
      data_leak_attempt: bool
      
  targeting:
    scope: enum[tenant, user, agent, service]
    selection: enum[random, specific, percentage]
    target_tenant_id: string
    target_percentage: float
    
  safety:
    max_duration_seconds: int
    auto_rollback: bool
    rollback_on_cascade: bool
    excluded_tenants: list[string]
    production_safeguard: bool
    require_approval: bool
    
  validation:
    assertions:
      - no_cross_tenant_impact
      - isolation_maintained
      - recovery_within_threshold
    recovery_threshold_seconds: int
    
  scheduling:
    mode: enum[manual, scheduled, continuous]
    schedule_cron: string
    
  reporting:
    generate_report: bool
    notify_on_failure: list[string]
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual injection | Full control | Infrequent testing | Initial validation |
| Scheduled chaos | Regular testing | Planned disruption | Mature systems |
| Continuous chaos | Always validated | Operational overhead | High-reliability |
| Game day events | Team learning | Resource intensive | Quarterly drills |

### Web Research Queries

- "tenant isolation chaos testing {date}"
- "multi-tenant chaos engineering patterns {date}"
- "noisy neighbor resilience testing {date}"
- "SaaS fault injection testing {date}"

**Framework-Specific:**
- "Chaos Monkey multi-tenant {date}"
- "Litmus chaos tenant isolation {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-DR1 | Chaos tests pass, isolation verified |

### Related Patterns

- [testing-isolation.md](testing-isolation.md) - Isolation testing
- [disaster-recovery.md](disaster-recovery.md) - DR patterns
- [performance-isolation.md](performance-isolation.md) - Noisy neighbor prevention

---

## Pattern 7: incident-correlation-engine.md

**Shortcode:** ZIC  
**Category:** operations  
**QG Ref:** QG-IR1 (Incident Response)  
**NEXUS Layer:** L40 Failure  
**Domain:** observability.md

### Purpose

Correlate incidents across tenant boundaries to distinguish systemic platform issues from tenant-specific problems.

### When to Use

- Multi-tenant incident triage
- Root cause analysis across tenants
- Platform health vs tenant health differentiation
- Automated incident classification
- Reducing MTTR through correlation

### When NOT to Use

- Single-tenant deployments
- Simple applications with obvious failures
- Systems without sufficient telemetry
- Privacy-restricted environments

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Incident Correlation Engine                     │
│                                                              │
│  Incidents                                                   │
│  ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐                   │
│  │Tenant │ │Tenant │ │Tenant │ │Tenant │                   │
│  │  A    │ │  B    │ │  C    │ │  D    │                   │
│  └───┬───┘ └───┬───┘ └───┬───┘ └───┬───┘                   │
│      │         │         │         │                        │
│      └─────────┴─────────┴─────────┘                        │
│                     │                                        │
│            ┌────────▼────────┐                               │
│            │ Correlation     │                               │
│            │ Engine          │                               │
│            └────────┬────────┘                               │
│                     │                                        │
│       ┌─────────────┼─────────────┐                         │
│       ▼             ▼             ▼                         │
│  [Tenant-      [Tier-       [Platform-                      │
│   Specific]    Wide]        Wide]                           │
│                                                              │
│  Actions: [Auto-Classify] [Escalate] [Link Runbook]         │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-07)

```yaml
incident_correlation_engine:
  version: "1.0.0"
  bam_controlled: true
  
  correlation_rules:
    time_window:
      lookback_minutes: int
      lookahead_minutes: int
      
    similarity:
      error_message: bool
      stack_trace: bool
      affected_service: bool
      error_code: bool
      http_status: bool
      
    clustering:
      algorithm: enum[dbscan, hierarchical, similarity_graph]
      threshold: float
      min_incidents: int
      
  classification:
    scopes:
      - tenant_specific
      - tenant_tier
      - region
      - platform_wide
      
    severity_inference:
      tenant_count_threshold: int
      tier_weight: map[string, float]
      impact_score_weights: map[string, float]
      
    auto_classify: bool
    confidence_threshold: float
      
  tenant_context:
    preserve_isolation: bool
    anonymize_cross_tenant: bool
    aggregate_only: bool
    
  automation:
    auto_escalate: bool
    escalation_rules:
      platform_wide: list[string]
      tier_wide: list[string]
      tenant_specific: list[string]
    runbook_linking: bool
    auto_remediation: bool
    
  reporting:
    aggregate_dashboard: bool
    tenant_dashboard: bool
    real_time_view: bool
    correlation_graph: bool
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Time-based clustering | Simple | May miss patterns | Basic correlation |
| Similarity clustering | Accurate grouping | Compute intensive | Root cause analysis |
| ML-based correlation | Discovers patterns | Requires training | Mature systems |
| Rule-based classification | Predictable | Manual maintenance | Known failure modes |

### Web Research Queries

- "incident correlation multi-tenant SaaS {date}"
- "cross-tenant incident analysis patterns {date}"
- "platform incident classification automation {date}"
- "AIOps incident correlation {date}"

**Framework-Specific:**
- "PagerDuty incident correlation {date}"
- "Datadog incident management multi-tenant {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-IR1 | Correlation engine active, runbooks linked |

### Related Patterns

- [incident-response.md](incident-response.md) - Response procedures
- [ai-observability.md](ai-observability.md) - Telemetry collection
- [kill-switch-registry.md](kill-switch-registry.md) - Emergency controls

---

## Pattern 8: tool-schema-versioning.md

**Shortcode:** ZTV  
**Category:** ai-runtime  
**QG Ref:** QG-M3 (Agent Runtime)  
**NEXUS Layer:** L15 Tooling  
**Domain:** ai-runtime.md

### Purpose

Version control for AI agent tool schemas. Manages breaking changes, backward compatibility, and tenant-specific tool versions.

### When to Use

- Evolving agent tool interfaces
- Multiple tool versions in production
- Tenant-specific tool customizations
- Breaking change management
- Long-running agent deployments

### When NOT to Use

- Stable, unchanging tool sets
- Single-version deployments
- Development/prototyping phases
- Simple tools with no schema

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Tool Schema Versioning                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Schema Registry                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐              │   │
│  │  │ v1.0.0  │  │ v1.1.0  │  │ v2.0.0  │              │   │
│  │  │ (active)│  │ (active)│  │ (beta)  │              │   │
│  │  └─────────┘  └─────────┘  └─────────┘              │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│            ┌───────────────┼───────────────┐                │
│            ▼               ▼               ▼                │
│       [Free: v1.0]   [Pro: v1.1]   [Ent: v2.0]             │
│                                                              │
│  Features: [Compatibility Check] [Migration] [Deprecation] │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-08)

```yaml
tool_schema_versioning:
  version: "1.0.0"
  bam_controlled: true
  
  versioning:
    scheme: enum[semantic, timestamp, hash]
    
    compatibility:
      check_breaking_changes: bool
      breaking_change_rules:
        - required_field_added
        - field_removed
        - type_changed
        - enum_value_removed
      deprecation_warning_days: int
      sunset_enforcement: bool
      
  registry:
    storage: enum[database, git, object_storage]
    
    validation:
      on_publish: bool
      schema_format: enum[json_schema, openapi, protobuf]
      require_description: bool
      require_examples: bool
      
  tenant_configuration:
    per_tenant_versions: bool
    version_pinning: bool
    auto_upgrade: enum[never, minor, patch]
    tier_versions:
      free: string
      pro: string
      enterprise: string
      
  migration:
    assisted_migration: bool
    migration_scripts: bool
    rollback_support: bool
    parallel_versions: bool
    parallel_duration_days: int
    
  agent_compatibility:
    version_negotiation: bool
    fallback: enum[error, use_latest, use_pinned]
    compatibility_matrix: bool
    
  notifications:
    deprecation_warning: bool
    breaking_change_alert: bool
    notify_tenants: bool
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Semantic versioning | Clear contract | Requires discipline | Public tools |
| Timestamp versioning | Simple | No compatibility signal | Internal tools |
| Per-tenant pinning | Stability | Fragmentation | Enterprise |
| Auto-upgrade | Always current | Breaking changes | Trusted tools |

### Web Research Queries

- "AI tool schema versioning patterns {date}"
- "agent tool API versioning best practices {date}"
- "MCP tool version management {date}"
- "LLM function schema evolution {date}"

**Framework-Specific:**
- "LangGraph tool versioning {date}"
- "OpenAI function calling schema versioning {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Tool schemas versioned, compatibility checked |

### Related Patterns

- [tool-execution.md](tool-execution.md) - Tool runtime
- [mcp-server-isolation.md](mcp-server-isolation.md) - MCP patterns
- [facade-contracts.md](facade-contracts.md) - Contract versioning

---

## Pattern 9: agent-handoff-protocol.md

**Shortcode:** ZAH  
**Category:** ai-runtime  
**QG Ref:** QG-M3 (Agent Runtime)  
**NEXUS Layer:** L10 Orchestration  
**Domain:** ai-runtime.md

### Purpose

Standardized protocol for agent-to-agent task handoff with context preservation and tenant isolation.

### When to Use

- Multi-agent workflows
- Agent specialization with handoffs
- Escalation to more capable agents
- Parallel task delegation
- Complex orchestration scenarios

### When NOT to Use

- Single-agent deployments
- Simple linear workflows
- Stateless interactions
- No agent specialization

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                Agent Handoff Protocol                        │
│                                                              │
│  Agent A                        Agent B                      │
│  ┌─────────┐                   ┌─────────┐                  │
│  │ Execute │    Handoff        │ Receive │                  │
│  │ Task    │──────────────────►│ Task    │                  │
│  └────┬────┘                   └────┬────┘                  │
│       │                             │                        │
│       │  ┌─────────────────────┐   │                        │
│       └─►│ Context Transfer    │◄──┘                        │
│          │ • Conversation      │                             │
│          │ • Working Memory    │                             │
│          │ • Tenant Context    │                             │
│          │ • Tool State        │                             │
│          └─────────────────────┘                             │
│                                                              │
│  Handoffs: [Sequential] [Parallel] [Escalation] [Delegate] │
│  Guarantees: [Ack] [Timeout] [Retry] [Fallback]            │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-09)

```yaml
agent_handoff_protocol:
  version: "1.0.0"
  bam_controlled: true
  
  handoff_types:
    sequential:
      description: "Complete then hand off"
      preserve_full_context: bool
    parallel:
      description: "Fork to multiple agents"
      aggregation_strategy: enum[first, all, majority]
    escalation:
      description: "Escalate to more capable agent"
      escalation_criteria: list[string]
    delegation:
      description: "Delegate subtask and await"
      timeout_seconds: int
      
  context_transfer:
    include:
      conversation_history: bool
      conversation_summary: bool
      working_memory: bool
      tool_state: bool
      tenant_context: bool
      user_preferences: bool
      
    serialization:
      format: enum[json, protobuf, msgpack]
      compression: bool
      max_size_bytes: int
      
    truncation:
      strategy: enum[recent_first, summarize, error]
      max_messages: int
      
  acknowledgment:
    required: bool
    timeout_seconds: int
    retry_count: int
    retry_backoff: enum[linear, exponential]
    
  failure_handling:
    on_timeout: enum[retry, fallback, escalate, fail]
    on_rejection: enum[retry, reroute, fail]
    fallback_agent: string
    max_handoff_chain: int
    
  tenant_isolation:
    cross_tenant_handoff: enum[never, same_org, explicit_consent]
    context_sanitization: bool
    tenant_context_required: bool
    
  observability:
    trace_handoffs: bool
    metrics:
      - handoff_latency
      - success_rate
      - context_size
      - chain_depth
    log_context_transfer: bool
```

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full context transfer | Complete information | Large payloads | Complex tasks |
| Summary transfer | Efficient | Information loss | Simple handoffs |
| Stateless handoff | Simple | No context | Independent tasks |
| Checkpoint-based | Resumable | Storage overhead | Long-running tasks |

### Web Research Queries

- "multi-agent handoff protocol patterns {date}"
- "agent task delegation orchestration {date}"
- "LLM agent context transfer {date}"
- "agent-to-agent communication patterns {date}"

**Framework-Specific:**
- "LangGraph agent handoff {date}"
- "CrewAI agent delegation {date}"
- "AutoGen agent conversation handoff {date}"

### Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Handoff protocol implemented, context preserved |

### Related Patterns

- [agent-orchestration.md](agent-orchestration.md) - Orchestration patterns
- [agent-coordination.md](agent-coordination.md) - Multi-agent coordination
- [state-management.md](state-management.md) - State persistence

---

## Implementation Artifacts

### CSV Registry Entries

All 9 patterns will be added to `src-v2/data/bam-patterns.csv` with:
- All 17 columns populated
- 4+ web_queries per pattern with `{date}`
- Proper QG references
- Unique shortcodes

### TOML Menu Entries

**bmad-agent-security.toml:** ZSF, ZOS, ZRT (3 entries)
**bmad-agent-devops.toml:** ZCI, ZIC (2 entries)
**bmad-agent-architect.toml:** ZRX, ZCA, ZTV, ZAH (4 entries)

Each entry includes web search prompts with 3+ queries and `{date}`.

### Domain File Updates

| Domain File | Patterns Added | Section |
|-------------|----------------|---------|
| security.md | ZSF, ZOS, ZRT | AI-Specific Security |
| observability.md | ZRX, ZIC | AI Observability |
| billing.md | ZCA | Cost Attribution |
| testing.md | ZCI | Chaos Testing |
| ai-runtime.md | ZTV, ZAH | Tool & Agent Management |

### Test Updates

- `test/v2/file-counts.test.js`: Update pattern count from 27 to 36
- `test/v2/pattern-standards.test.js`: Verify new patterns follow template

---

## Verification Checklist

### Pattern Files (9 total)
- [ ] semantic-firewall.md created with full template
- [ ] output-sanitization.md created with full template
- [ ] rbac-per-tool.md created with full template
- [ ] reasoning-trace-collector.md created with full template
- [ ] cost-attribution-engine.md created with full template
- [ ] tenant-chaos-injector.md created with full template
- [ ] incident-correlation-engine.md created with full template
- [ ] tool-schema-versioning.md created with full template
- [ ] agent-handoff-protocol.md created with full template

### CSV Registry
- [ ] 9 new rows added to bam-patterns.csv
- [ ] All rows have 17 columns
- [ ] All web_queries have 4+ queries with {date}
- [ ] Shortcodes unique: ZSF, ZOS, ZRT, ZRX, ZCA, ZCI, ZIC, ZTV, ZAH

### TOML Menu Entries
- [ ] bmad-agent-security.toml: ZSF, ZOS, ZRT added
- [ ] bmad-agent-devops.toml: ZCI, ZIC added
- [ ] bmad-agent-architect.toml: ZRX, ZCA, ZTV, ZAH added
- [ ] All prompts have 3+ web search queries with {date}

### Domain Files
- [ ] security.md updated with pattern references
- [ ] observability.md updated with pattern references
- [ ] billing.md updated with pattern references
- [ ] testing.md updated with pattern references
- [ ] ai-runtime.md updated with pattern references
- [ ] All domain updates include Web Research section

### Tests
- [ ] file-counts.test.js updated for 36 patterns
- [ ] All V2 tests pass: `npm test -- test/v2/`

---

## Test Plan

1. **Pattern Structure Tests**
   - All 9 new patterns have required YAML frontmatter
   - All patterns have Web Research Queries section with 4+ {date} queries
   - All patterns have Quality Gate Alignment section
   - All patterns have Related Patterns section
   - No implementation code in pattern files
   - All YAML schemas have `bam_controlled: true`

2. **CSV Validation**
   - 9 new CSV entries have all 17 columns
   - Shortcodes are unique (no conflicts)
   - Web queries contain 4+ entries with {date} placeholder
   - QG references map to existing gates

3. **TOML Validation**
   - All 9 menu entries added to correct TOML files
   - All prompts include web search directives
   - Shortcodes match CSV entries

4. **Domain Integration**
   - All 5 domain files updated
   - Pattern references use correct paths
   - Web Research sections added

5. **Integration Tests**
   - Pattern count increased from 27 to 36
   - CSV row count increased by 9
   - All shortcodes unique across all patterns

---

Generated with [Claude Code](https://claude.com/claude-code)
