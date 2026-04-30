# NEXUS Patterns Phase 3 Design Spec

**Date:** 2026-04-30  
**Status:** Approved  
**Approach:** Operations-First (4 remaining Top 10 + 5 security/safety patterns)

---

## Overview

Phase 3 adds 9 high-value patterns to BAM V2, prioritizing the 4 remaining Top 10 patterns from the gap analysis plus 5 security/safety patterns. This brings BAM V2 to 45 total patterns.

### Pattern Selection

| # | Pattern | Shortcode | Category | Domain | QG Ref |
|---|---------|-----------|----------|--------|--------|
| 1 | agent-registry | ZAG | operations | operations.md | QG-P1 |
| 2 | fanout-circuit-breaker | ZFC | safety | ai-runtime.md | QG-AI1 |
| 3 | regulatory-clock-engine | ZRE | compliance | compliance.md | QG-P1 |
| 4 | blast-radius-simulator | ZBL | reliability | operations.md | QG-DR1 |
| 5 | secret-leak-detector | ZSL | security | security.md | QG-S4 |
| 6 | canary-token-inserter | ZCN | security | security.md | QG-S5 |
| 7 | tool-sbom-registry | ZTS | security | security.md | QG-AI1 |
| 8 | streaming-output-decoder | ZSD | safety | ai-runtime.md | QG-S7 |
| 9 | agent-maturity-scoring | ZMS | lifecycle | operations.md | QG-P1 |

---

## 6-Point Anti-Decay Strategy

Each pattern implements:

1. **CSV web_queries** - 4+ queries with `{date}` placeholder
2. **Pattern .md** - Web Research section, YAML schemas only (no implementation code)
3. **TOML menu** - 3+ web search prompts per entry
4. **Domain references** - Pattern paths + Web Research subsection
5. **QG alignment** - Map to existing gates (QG-P1, QG-AI1, QG-DR1, QG-S4, QG-S5, QG-S7)
6. **YAML schemas** - `bam_controlled: true`, structural contracts only

---

## TOML Distribution

| TOML File | Entries | Shortcodes |
|-----------|---------|------------|
| bmad-agent-architect.toml | 4 | ZAG, ZFC, ZBL, ZMS |
| bmad-agent-security.toml | 4 | ZSL, ZCN, ZTS, ZSD |
| bmad-agent-compliance.toml | 1 | ZRE |

---

## Domain Updates

| Domain | Patterns Added |
|--------|----------------|
| operations.md | agent-registry, blast-radius-simulator, agent-maturity-scoring |
| ai-runtime.md | fanout-circuit-breaker, streaming-output-decoder |
| security.md | secret-leak-detector, canary-token-inserter, tool-sbom-registry |
| compliance.md | regulatory-clock-engine |

---

## Pattern Designs

### Pattern 1: Agent Registry (ZAG)

**Category:** operations | **QG:** QG-P1 | **Domain:** operations.md

#### When to Use
- Multiple agents deployed across tenants
- Need visibility into agent sprawl
- Ownership and dependency tracking required
- Compliance requires agent inventory

#### When NOT to Use
- Single agent deployment
- Development/sandbox environments
- No governance requirements

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Agent Registry                          │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Discovery   │───►│ Catalog     │───►│ Dependency  │      │
│  │ Scanner     │    │ Store       │    │ Graph       │      │
│  └─────────────┘    └──────┬──────┘    └─────────────┘      │
│                            │                                 │
│            ┌───────────────┼───────────────┐                │
│            ▼               ▼               ▼                │
│       [Ownership]     [Versions]     [Trust Score]         │
│                                                              │
│  Queries: [By Tenant] [By Owner] [By Capability] [Stale]   │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-01)

```yaml
agent_registry:
  version: "1.0.0"
  bam_controlled: true
  
  discovery:
    auto_discovery: bool
    scan_interval_hours: int
    sources: list[enum[kubernetes, config, manual]]
    
  catalog:
    required_fields:
      - agent_id
      - tenant_id
      - owner_team
      - version
      - capabilities
      - created_at
      - last_active_at
      
    optional_fields:
      - description
      - dependencies
      - sbom_ref
      - trust_score
      
  governance:
    require_owner: bool
    stale_threshold_days: int
    deprecation_notice_days: int
    auto_disable_stale: bool
    
  tenant_scoping:
    isolation: enum[tenant, org, platform]
    cross_tenant_visibility: bool
    admin_override: bool
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Auto-discovery | Complete coverage | Scan overhead | Large deployments |
| Manual registration | Precise control | May miss agents | Small teams |
| Hybrid | Balanced | Complexity | Enterprise |

#### Web Research Queries

- "AI agent registry catalog patterns {date}"
- "agent inventory management enterprise {date}"
- "Backstage AI agent catalog {date}"
- "multi-tenant agent governance {date}"

---

### Pattern 2: Fanout Circuit Breaker (ZFC)

**Category:** safety | **QG:** QG-AI1 | **Domain:** ai-runtime.md

#### When to Use
- Agents can spawn sub-agents or parallel tasks
- Risk of runaway token consumption
- Cost budget enforcement needed
- Prevent recursive agent loops

#### When NOT to Use
- Single-agent linear workflows
- No sub-agent spawning
- Unlimited budget scenarios

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Fanout Circuit Breaker                      │
│                                                              │
│  Agent Request                                               │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Depth       │───►│ Width       │───►│ Budget      │      │
│  │ Counter     │    │ Counter     │    │ Check       │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │              │
│                     ┌─────────────────────────┘              │
│                     ▼                                        │
│            ┌─────────────────┐                               │
│            │ ALLOW │ THROTTLE │ BREAK                       │
│            └─────────────────┘                               │
│                                                              │
│  Limits: [Max Depth] [Max Width] [Max Tokens] [Max Cost]    │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-02)

```yaml
fanout_circuit_breaker:
  version: "1.0.0"
  bam_controlled: true
  
  limits:
    max_depth: int
    max_width: int
    max_total_agents: int
    max_tokens_per_request: int
    max_cost_per_request: float
    
  tracking:
    counter_storage: enum[memory, redis, database]
    ttl_seconds: int
    
  actions:
    on_depth_exceeded: enum[block, warn, throttle]
    on_width_exceeded: enum[block, warn, throttle]
    on_budget_exceeded: enum[block, warn, complete_current]
    
  tenant_configuration:
    per_tenant_limits: bool
    tier_limits:
      free:
        max_depth: int
        max_width: int
      pro:
        max_depth: int
        max_width: int
      enterprise:
        max_depth: int
        max_width: int
        
  recovery:
    cooldown_seconds: int
    half_open_requests: int
    reset_on_success: bool
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Hard limits | Predictable costs | May truncate work | Budget-constrained |
| Soft limits + alerts | Flexibility | Risk of overrun | Trusted workloads |
| Adaptive limits | Learns patterns | Complexity | Mature systems |

#### Web Research Queries

- "agent fanout circuit breaker patterns {date}"
- "LLM runaway loop prevention {date}"
- "multi-agent cost limiting {date}"
- "recursive agent depth limiting {date}"

---

### Pattern 3: Regulatory Clock Engine (ZRE)

**Category:** compliance | **QG:** QG-P1 | **Domain:** compliance.md

#### When to Use
- Operating in regulated industries
- EU AI Act compliance required
- Multiple jurisdiction requirements
- Compliance deadline tracking needed

#### When NOT to Use
- Unregulated domains
- Single jurisdiction
- No formal compliance requirements

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Regulatory Clock Engine                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                  Regulation Registry                     ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││
│  │  │EU AI Act│  │GDPR     │  │CCPA     │  │Custom   │    ││
│  │  │Aug 2025 │  │Ongoing  │  │Ongoing  │  │Deadline │    ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    ││
│  └───────┼────────────┼────────────┼────────────┼──────────┘│
│          │            │            │            │            │
│          └────────────┴────────────┴────────────┘            │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │ Deadline Engine │                        │
│                   └────────┬────────┘                        │
│                            │                                 │
│    [Warning 90d] [Warning 30d] [Critical 7d] [Overdue]      │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-03)

```yaml
regulatory_clock_engine:
  version: "1.0.0"
  bam_controlled: true
  
  regulations:
    - id: string
      name: string
      jurisdiction: list[string]
      effective_date: date
      requirements: list[requirement]
      
  requirement:
    id: string
    description: string
    deadline: date
    status: enum[not_started, in_progress, compliant, overdue]
    evidence_required: bool
    
  tracking:
    auto_scan: bool
    scan_interval_days: int
    
  alerts:
    warning_thresholds_days: list[int]
    critical_threshold_days: int
    notify_on_change: bool
    notification_channels: list[string]
    
  tenant_configuration:
    per_tenant_jurisdictions: bool
    tenant_overrides: bool
    
  reporting:
    generate_compliance_report: bool
    report_frequency: enum[weekly, monthly, quarterly]
    include_evidence: bool
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual tracking | Simple | Error-prone | Small scope |
| Automated scanning | Complete | Requires maintenance | Multi-regulation |
| Third-party service | Expert updates | Cost, dependency | Enterprise |

#### Web Research Queries

- "EU AI Act compliance timeline {date}"
- "regulatory compliance tracking SaaS {date}"
- "AI regulation deadline management {date}"
- "multi-jurisdiction compliance automation {date}"

---

### Pattern 4: Blast Radius Simulator (ZBL)

**Category:** reliability | **QG:** QG-DR1 | **Domain:** operations.md

#### When to Use
- Complex agent dependency graphs
- Need to predict failure impact
- Change management processes
- Disaster recovery planning

#### When NOT to Use
- Simple linear workflows
- No interdependencies
- Single-tenant deployments

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Blast Radius Simulator                      │
│                                                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Dependency  │───►│ Failure     │───►│ Impact      │      │
│  │ Graph       │    │ Injector    │    │ Calculator  │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │              │
│            ┌──────────────────────────────────┘              │
│            ▼                                                 │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Impact Report                                           ││
│  │  - Affected Tenants: [list]                              ││
│  │  - Affected Agents: [list]                               ││
│  │  - Estimated Downtime: [duration]                        ││
│  │  - Revenue Impact: [estimate]                            ││
│  └─────────────────────────────────────────────────────────┘│
│                                                              │
│  Simulations: [Component Failure] [Tenant Spike] [Cascade]  │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-04)

```yaml
blast_radius_simulator:
  version: "1.0.0"
  bam_controlled: true
  
  dependency_graph:
    source: enum[auto_discover, manual, hybrid]
    refresh_interval_hours: int
    include_external: bool
    
  simulation_types:
    component_failure:
      enabled: bool
      components: list[string]
      
    tenant_spike:
      enabled: bool
      spike_multiplier: float
      
    cascade_failure:
      enabled: bool
      propagation_model: enum[immediate, delayed, probabilistic]
      
  impact_calculation:
    metrics:
      - affected_tenants
      - affected_agents
      - estimated_downtime_minutes
      - revenue_impact
      - data_loss_risk
      
    tenant_weighting:
      by_tier: bool
      by_revenue: bool
      
  reporting:
    generate_on_change: bool
    include_mitigation: bool
    notify_stakeholders: list[string]
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Static analysis | Fast, no risk | May miss runtime deps | Pre-deployment |
| Live simulation | Accurate | Requires safeguards | Staging env |
| Probabilistic model | Handles uncertainty | Complex to tune | Mature systems |

#### Web Research Queries

- "blast radius simulation distributed systems {date}"
- "failure impact analysis multi-tenant {date}"
- "dependency graph failure prediction {date}"
- "chaos engineering impact assessment {date}"

---

### Pattern 5: Secret Leak Detector (ZSL)

**Category:** security | **QG:** QG-S4 | **Domain:** security.md

#### When to Use
- Agents process user-provided prompts
- Risk of API keys in context
- Compliance requires secret scanning
- Multi-tenant data isolation

#### When NOT to Use
- Fully controlled input sources
- No external secrets in scope
- Air-gapped environments

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Secret Leak Detector                       │
│                                                              │
│  Input Stream                                                │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Pattern     │───►│ Entropy     │───►│ Known Key   │      │
│  │ Matcher     │    │ Analyzer    │    │ Validator   │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │              │
│                     ┌─────────────────────────┘              │
│                     ▼                                        │
│            ┌─────────────────┐                               │
│            │ BLOCK │ REDACT │ ALERT                         │
│            └─────────────────┘                               │
│                                                              │
│  Detects: [AWS Keys] [API Tokens] [JWTs] [Private Keys]    │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-05)

```yaml
secret_leak_detector:
  version: "1.0.0"
  bam_controlled: true
  
  detection_methods:
    pattern_matching:
      enabled: bool
      patterns:
        - aws_access_key
        - aws_secret_key
        - github_token
        - openai_api_key
        - jwt_token
        - private_key
        - generic_api_key
        
    entropy_analysis:
      enabled: bool
      threshold: float
      min_length: int
      
    known_key_validation:
      enabled: bool
      validators: list[enum[aws, github, openai, stripe]]
      
  actions:
    on_detection:
      action: enum[block, redact, alert, log]
      redaction_replacement: string
      alert_channels: list[string]
      
  scan_targets:
    prompts: bool
    tool_inputs: bool
    tool_outputs: bool
    memory_writes: bool
    
  tenant_configuration:
    per_tenant_patterns: bool
    custom_patterns: bool
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Pattern only | Fast | False negatives | Known formats |
| Entropy + pattern | Better coverage | False positives | General use |
| Live validation | Confirms secrets | API overhead | High security |

#### Web Research Queries

- "secret detection LLM prompts {date}"
- "API key scanning AI systems {date}"
- "credential leak prevention patterns {date}"
- "TruffleHog GitLeaks AI integration {date}"

---

### Pattern 6: Canary Token Inserter (ZCN)

**Category:** security | **QG:** QG-S5 | **Domain:** security.md

#### When to Use
- Track if prompts leak to unauthorized places
- Detect training data exfiltration
- Monitor for prompt injection success
- Audit trail for sensitive prompts

#### When NOT to Use
- Public, non-sensitive content
- No leak detection requirements
- Performance-critical hot paths

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Canary Token Inserter                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   Token Generator                        ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                  ││
│  │  │ UUID    │  │ Stealth │  │ Tracking│                  ││
│  │  │ Token   │  │ Embed   │  │ Registry│                  ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘                  ││
│  └───────┼────────────┼────────────┼────────────────────────┘│
│          │            │            │                         │
│          └────────────┴────────────┘                         │
│                       │                                      │
│              ┌────────▼────────┐                             │
│              │ Prompt + Canary │                             │
│              └────────┬────────┘                             │
│                       │                                      │
│  Detection: [Web Scan] [Dark Web] [Model Output] [Callback] │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-06)

```yaml
canary_token_inserter:
  version: "1.0.0"
  bam_controlled: true
  
  token_generation:
    format: enum[uuid, encoded, stealth]
    embedding_method: enum[prefix, suffix, inline, invisible]
    uniqueness: enum[per_request, per_session, per_tenant]
    
  registry:
    storage: enum[database, redis]
    retention_days: int
    metadata:
      - tenant_id
      - timestamp
      - request_context
      - expected_destinations
      
  detection:
    methods:
      - web_scanning
      - callback_url
      - output_monitoring
      - third_party_service
      
    scan_frequency: enum[realtime, hourly, daily]
    
  alerts:
    on_leak_detected:
      severity: enum[info, warning, critical]
      notify: list[string]
      auto_revoke: bool
      
  tenant_configuration:
    per_tenant_canaries: bool
    tenant_notification: bool
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Visible tokens | Easy detection | Attackers can strip | Internal monitoring |
| Stealth tokens | Hard to remove | Complex detection | Leak tracking |
| Callback URLs | Real-time alerts | Infrastructure needed | High security |

#### Web Research Queries

- "canary token prompt tracking {date}"
- "LLM data exfiltration detection {date}"
- "prompt leak monitoring patterns {date}"
- "honeypot tokens AI security {date}"

---

### Pattern 7: Tool SBOM Registry (ZTS)

**Category:** security | **QG:** QG-AI1 | **Domain:** security.md

#### When to Use
- Agents use external tools/MCP servers
- Supply chain security requirements
- Vulnerability tracking needed
- Compliance requires tool inventory

#### When NOT to Use
- Only built-in tools used
- No external dependencies
- Air-gapped environments

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Tool SBOM Registry                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   SBOM Store                             ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││
│  │  │ Tool A  │  │ Tool B  │  │ Tool C  │  │ MCP Srv │    ││
│  │  │ v1.2.3  │  │ v2.0.0  │  │ v0.9.1  │  │ v1.0.0  │    ││
│  │  │ deps:12 │  │ deps:8  │  │ deps:25 │  │ deps:5  │    ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    ││
│  └───────┼────────────┼────────────┼────────────┼──────────┘│
│          │            │            │            │            │
│          └────────────┴────────────┴────────────┘            │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │ Vulnerability   │                        │
│                   │ Scanner         │                        │
│                   └─────────────────┘                        │
│                                                              │
│  Checks: [CVE Scan] [License] [Signature] [Freshness]       │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-07)

```yaml
tool_sbom_registry:
  version: "1.0.0"
  bam_controlled: true
  
  sbom_format: enum[spdx, cyclonedx, custom]
  
  tool_metadata:
    required:
      - tool_id
      - version
      - publisher
      - dependencies
      - hash
      
    optional:
      - license
      - signature
      - last_audit_date
      - cve_scan_date
      
  vulnerability_scanning:
    enabled: bool
    scan_frequency: enum[on_register, daily, weekly]
    sources: list[enum[nvd, github_advisory, osv]]
    block_on_critical: bool
    
  policy_enforcement:
    require_signature: bool
    require_license_allow_list: bool
    max_dependency_age_days: int
    block_unregistered: bool
    
  tenant_configuration:
    per_tenant_tools: bool
    tool_allow_list: bool
    tier_restrictions:
      free: list[string]
      pro: list[string]
      enterprise: list[string]
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual SBOM | Control | Maintenance burden | Small tool sets |
| Auto-generated | Complete | May miss nuances | Large deployments |
| Third-party service | Expert scanning | Cost, dependency | Enterprise |

#### Web Research Queries

- "software bill of materials AI tools {date}"
- "MCP server security SBOM {date}"
- "agent tool supply chain security {date}"
- "CycloneDX SPDX AI integration {date}"

---

### Pattern 8: Streaming Output Decoder (ZSD)

**Category:** safety | **QG:** QG-S7 | **Domain:** ai-runtime.md

#### When to Use
- Streaming LLM responses to users
- Real-time safety filtering needed
- Cannot wait for full response
- Partial response risk mitigation

#### When NOT to Use
- Batch processing only
- Full response buffering acceptable
- No streaming requirements

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Streaming Output Decoder                     │
│                                                              │
│  LLM Stream                                                  │
│       │                                                      │
│       ▼                                                      │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Token       │───►│ Buffer      │───►│ Safety      │      │
│  │ Accumulator │    │ Window      │    │ Classifier  │      │
│  └─────────────┘    └─────────────┘    └──────┬──────┘      │
│                                               │              │
│                     ┌─────────────────────────┘              │
│                     ▼                                        │
│            ┌─────────────────┐                               │
│            │ PASS │ BUFFER │ STOP                           │
│            └─────────────────┘                               │
│                      │                                       │
│                      ▼                                       │
│               Client Stream                                  │
│                                                              │
│  Checks: [PII] [Toxicity] [Injection] [Secrets]             │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-08)

```yaml
streaming_output_decoder:
  version: "1.0.0"
  bam_controlled: true
  
  buffering:
    strategy: enum[token_count, character_count, sentence, semantic]
    buffer_size: int
    flush_on_safe: bool
    max_latency_ms: int
    
  safety_checks:
    pii_detection:
      enabled: bool
      action: enum[redact, stop, buffer]
      
    toxicity_detection:
      enabled: bool
      threshold: float
      action: enum[stop, replace, buffer]
      
    injection_detection:
      enabled: bool
      action: enum[stop, alert]
      
    secret_detection:
      enabled: bool
      action: enum[redact, stop]
      
  actions:
    on_violation:
      stop_stream: bool
      send_replacement: string
      log_event: bool
      
  performance:
    async_classification: bool
    classifier_timeout_ms: int
    fallback_on_timeout: enum[pass, buffer, stop]
    
  tenant_configuration:
    per_tenant_policies: bool
    tier_strictness:
      free: enum[strict]
      pro: enum[standard]
      enterprise: enum[custom]
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Token-level | Minimum latency | May miss context | Speed priority |
| Sentence-level | Better accuracy | Added latency | Balanced |
| Semantic buffering | Best accuracy | Highest latency | Safety priority |

#### Web Research Queries

- "streaming LLM output safety filtering {date}"
- "real-time content moderation streaming {date}"
- "token-level safety classification {date}"
- "SSE stream content filtering patterns {date}"

---

### Pattern 9: Agent Maturity Scoring (ZMS)

**Category:** lifecycle | **QG:** QG-P1 | **Domain:** operations.md

#### When to Use
- Evaluating agent readiness for production
- Progressive rollout decisions
- Agent lifecycle governance
- Risk assessment for deployments

#### When NOT to Use
- All agents at same maturity level
- No governance requirements
- Rapid prototyping phase

#### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Agent Maturity Scoring                      │
│                                                              │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                 Maturity Dimensions                      ││
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││
│  │  │Testing  │  │Security │  │Ops      │  │Document │    ││
│  │  │Coverage │  │Posture  │  │Readiness│  │ation    │    ││
│  │  │ 4/5     │  │ 3/5     │  │ 5/5     │  │ 2/5     │    ││
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    ││
│  └───────┼────────────┼────────────┼────────────┼──────────┘│
│          │            │            │            │            │
│          └────────────┴────────────┴────────────┘            │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │ Overall: 3.5/5  │                        │
│                   │ Level: Managed  │                        │
│                   └─────────────────┘                        │
│                                                              │
│  Levels: [1-Initial] [2-Basic] [3-Managed] [4-Advanced] [5] │
└─────────────────────────────────────────────────────────────┘
```

#### Configuration Schema (P3-09)

```yaml
agent_maturity_scoring:
  version: "1.0.0"
  bam_controlled: true
  
  dimensions:
    testing:
      weight: float
      criteria:
        - unit_test_coverage
        - integration_tests
        - e2e_tests
        - chaos_tests
        
    security:
      weight: float
      criteria:
        - vulnerability_scan
        - secret_scan
        - rbac_configured
        - audit_logging
        
    operations:
      weight: float
      criteria:
        - monitoring_configured
        - alerting_configured
        - runbooks_exist
        - on_call_defined
        
    documentation:
      weight: float
      criteria:
        - api_documented
        - architecture_documented
        - deployment_documented
        
  scoring:
    scale: enum[1-5, 1-10, percentage]
    aggregation: enum[weighted_average, minimum, geometric_mean]
    
  levels:
    - name: "Initial"
      min_score: 0
      allowed_environments: [development]
      
    - name: "Basic"
      min_score: 2
      allowed_environments: [development, staging]
      
    - name: "Managed"
      min_score: 3
      allowed_environments: [development, staging, production_limited]
      
    - name: "Advanced"
      min_score: 4
      allowed_environments: [all]
      
    - name: "Optimized"
      min_score: 4.5
      allowed_environments: [all]
      
  enforcement:
    block_deployment_below: int
    require_approval_below: int
```

#### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Checklist-based | Simple | Subjective | Early adoption |
| Automated scoring | Objective | Setup effort | Mature orgs |
| Hybrid | Balanced | Complexity | Enterprise |

#### Web Research Queries

- "AI agent maturity model {date}"
- "agent readiness scoring framework {date}"
- "MLOps maturity assessment {date}"
- "production readiness checklist AI {date}"

---

## Implementation Artifacts

### Files to Create (9 pattern files)

```
src-v2/data/patterns/
├── agent-registry.md
├── fanout-circuit-breaker.md
├── regulatory-clock-engine.md
├── blast-radius-simulator.md
├── secret-leak-detector.md
├── canary-token-inserter.md
├── tool-sbom-registry.md
├── streaming-output-decoder.md
└── agent-maturity-scoring.md
```

### Files to Modify

| File | Changes |
|------|---------|
| `src-v2/data/bam-patterns.csv` | Add 9 rows |
| `src-v2/customize/bmad-agent-architect.toml` | Add ZAG, ZFC, ZBL, ZMS |
| `src-v2/customize/bmad-agent-security.toml` | Add ZSL, ZCN, ZTS, ZSD |
| `src-v2/customize/bmad-agent-compliance.toml` | Add ZRE |
| `src-v2/data/domains/operations.md` | Add 3 pattern refs |
| `src-v2/data/domains/ai-runtime.md` | Add 2 pattern refs |
| `src-v2/data/domains/security.md` | Add 3 pattern refs |
| `src-v2/data/domains/compliance.md` | Add 1 pattern ref |
| `test/v2/file-counts.test.js` | Update to 45 patterns |
| `test/v2/pattern-standards.test.js` | Update to 45 patterns |

---

## Test Expectations

| Metric | Before | After |
|--------|--------|-------|
| Pattern files | 36 | 45 |
| CSV rows | ~211 | ~220 |
| TOML entries | +9 total | |

---

## Verification Checklist

- [ ] 45 pattern files in `src-v2/data/patterns/`
- [ ] 9 new rows in `bam-patterns.csv`
- [ ] 4 new entries in `bmad-agent-architect.toml`
- [ ] 4 new entries in `bmad-agent-security.toml`
- [ ] 1 new entry in `bmad-agent-compliance.toml`
- [ ] 4 domain files updated with pattern references
- [ ] All V2 tests pass
- [ ] No implementation code in any pattern file
- [ ] All web queries use `{date}` placeholder
