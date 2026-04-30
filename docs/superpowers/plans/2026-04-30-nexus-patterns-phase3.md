# NEXUS Patterns Phase 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 9 Operations-first patterns to BAM V2 (45 total patterns)

**Architecture:** 6-point anti-decay strategy: CSV web_queries with {date}, pattern .md with YAML schemas (no code), TOML menu entries with web search, domain references, QG alignment, bam_controlled schemas

**Tech Stack:** YAML, TOML, Markdown, Jest tests

**Spec:** `docs/superpowers/specs/2026-04-30-nexus-patterns-phase3-design.md`

---

## File Structure

| Action | Path | Purpose |
|--------|------|---------|
| Modify | `test/v2/pattern-standards.test.js` | Update pattern count to 45 |
| Modify | `test/v2/file-counts.test.js` | Update pattern count to 45 |
| Modify | `src-v2/data/bam-patterns.csv` | Add 9 pattern rows |
| Create | `src-v2/data/patterns/agent-registry.md` | ZAG pattern |
| Create | `src-v2/data/patterns/fanout-circuit-breaker.md` | ZFC pattern |
| Create | `src-v2/data/patterns/regulatory-clock-engine.md` | ZRE pattern |
| Create | `src-v2/data/patterns/blast-radius-simulator.md` | ZBL pattern |
| Create | `src-v2/data/patterns/secret-leak-detector.md` | ZSL pattern |
| Create | `src-v2/data/patterns/canary-token-inserter.md` | ZCN pattern |
| Create | `src-v2/data/patterns/tool-sbom-registry.md` | ZTS pattern |
| Create | `src-v2/data/patterns/streaming-output-decoder.md` | ZSD pattern |
| Create | `src-v2/data/patterns/agent-maturity-scoring.md` | ZMS pattern |
| Modify | `src-v2/customize/bmad-agent-architect.toml` | Add ZAG, ZFC, ZBL, ZMS |
| Modify | `src-v2/customize/bmad-agent-security.toml` | Add ZSL, ZCN, ZTS, ZSD |
| Modify | `src-v2/customize/bmad-agent-compliance.toml` | Add ZRE |
| Modify | `src-v2/data/domains/observability.md` | Add 2 pattern refs |
| Modify | `src-v2/data/domains/ai-runtime.md` | Add 2 pattern refs |
| Modify | `src-v2/data/domains/security.md` | Add 3 pattern refs |
| Modify | `src-v2/data/domains/compliance.md` | Add 1 pattern ref |
| Modify | `src-v2/data/domains/deployment.md` | Add 1 pattern ref |

---

### Task 1: Update Test Expectations

**Files:**
- Modify: `test/v2/pattern-standards.test.js:7`
- Modify: `test/v2/file-counts.test.js:34-41`

- [ ] **Step 1: Update pattern-standards.test.js**

In `test/v2/pattern-standards.test.js`, change line 7:

```javascript
// FROM:
expect(patterns.length).toBe(36);

// TO:
expect(patterns.length).toBe(45);
```

Also update the comment on line 12 to:

```javascript
// 21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 = 45
```

- [ ] **Step 2: Update file-counts.test.js**

In `test/v2/file-counts.test.js`, change lines 34-41:

```javascript
// FROM:
test('36 pattern files (after NEXUS Phase 2)', () => {
  const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
  // V2 consolidated: 21 base + 6 NEXUS Phase 1 + 9 NEXUS Phase 2 = 36
  // Phase 2: semantic-firewall, output-sanitization, rbac-per-tool,
  //          reasoning-trace-collector, cost-attribution-engine,
  //          tenant-chaos-injector, incident-correlation-engine,
  //          tool-schema-versioning, agent-handoff-protocol
  expect(files.length).toBe(36);
});

// TO:
test('45 pattern files (after NEXUS Phase 3)', () => {
  const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
  // V2 consolidated: 21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 = 45
  // Phase 3: agent-registry, fanout-circuit-breaker, regulatory-clock-engine,
  //          blast-radius-simulator, secret-leak-detector, canary-token-inserter,
  //          tool-sbom-registry, streaming-output-decoder, agent-maturity-scoring
  expect(files.length).toBe(45);
});
```

- [ ] **Step 3: Run tests (expect failure)**

Run: `npm test -- test/v2/pattern-standards.test.js test/v2/file-counts.test.js`

Expected: FAIL with "Expected: 45, Received: 36"

- [ ] **Step 4: Commit test expectations**

```bash
git add test/v2/pattern-standards.test.js test/v2/file-counts.test.js
git commit -m "$(cat <<'EOF'
test: update pattern count expectations for NEXUS Phase 3

21 base + 6 Phase 1 + 9 Phase 2 + 9 Phase 3 = 45 patterns

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Add CSV Registry Entries

**Files:**
- Modify: `src-v2/data/bam-patterns.csv`

- [ ] **Step 1: Add 9 pattern rows to CSV**

Append these 9 rows to `src-v2/data/bam-patterns.csv`:

```csv
agent-registry,Agent Registry,operations,"Use when multiple agents deployed across tenants requiring visibility into agent sprawl and ownership tracking","agent catalog,agent sprawl,ownership,governance",Agent inventory and governance,auto-discovery;manual-registration;hybrid,What governance requirements apply?;How many agents deployed?;Need dependency tracking?,AI agent registry catalog patterns {date};agent inventory management enterprise {date};Backstage AI agent catalog {date};multi-tenant agent governance {date},QG-P1,observability,,Basic: Manual registry;Advanced: Auto-discovery with trust scoring,agent-catalog-patterns,agent-registry.md,observability.md,ZAG
fanout-circuit-breaker,Fanout Circuit Breaker,safety,"Use when agents can spawn sub-agents or parallel tasks with risk of runaway token consumption","fanout,sub-agents,runaway,cost limit",Prevent recursive agent loops,hard-limits;soft-limits;adaptive,What depth/width limits needed?;How to handle budget exceeded?;Per-tenant limits?,agent fanout circuit breaker patterns {date};LLM runaway loop prevention {date};multi-agent cost limiting {date};recursive agent depth limiting {date},QG-AI1,ai-runtime,,Basic: Hard depth limits;Advanced: Adaptive with cooldown,circuit-breaker-patterns,fanout-circuit-breaker.md,ai-runtime.md,ZFC
regulatory-clock-engine,Regulatory Clock Engine,compliance,"Use when operating in regulated industries with EU AI Act or multi-jurisdiction compliance","EU AI Act,GDPR,compliance deadline,regulation",Track regulatory deadlines,manual-tracking;automated-scanning;third-party,What regulations apply?;Multiple jurisdictions?;Auto-scan needed?,EU AI Act compliance timeline {date};regulatory compliance tracking SaaS {date};AI regulation deadline management {date};multi-jurisdiction compliance automation {date},QG-P1,compliance,,Basic: Manual tracking;Advanced: Automated with alerts,compliance-tracking-patterns,regulatory-clock-engine.md,compliance.md,ZRE
blast-radius-simulator,Blast Radius Simulator,reliability,"Use when complex agent dependency graphs require failure impact prediction for disaster recovery","failure impact,dependency graph,disaster recovery,change management",Predict failure cascade impact,static-analysis;live-simulation;probabilistic,What dependencies to track?;Tenant weighting needed?;Include mitigation?,blast radius simulation distributed systems {date};failure impact analysis multi-tenant {date};dependency graph failure prediction {date};chaos engineering impact assessment {date},QG-DR1,observability,,Basic: Static analysis;Advanced: Probabilistic modeling,chaos-engineering-patterns,blast-radius-simulator.md,observability.md,ZBL
secret-leak-detector,Secret Leak Detector,security,"Use when agents process user prompts with risk of API keys or credentials in context","secret scanning,API keys,credential leak,PII",Detect secrets in agent I/O,pattern-matching;entropy-analysis;live-validation,What secret patterns to detect?;Scan prompts/outputs/memory?;Block or redact?,secret detection LLM prompts {date};API key scanning AI systems {date};credential leak prevention patterns {date};TruffleHog GitLeaks AI integration {date},QG-S4,security,,Basic: Pattern matching;Advanced: Entropy + live validation,secret-scanning-patterns,secret-leak-detector.md,security.md,ZSL
canary-token-inserter,Canary Token Inserter,security,"Use when tracking if prompts leak to unauthorized places or detecting training data exfiltration","canary tokens,leak detection,exfiltration,honeypot",Track prompt leakage,visible-tokens;stealth-tokens;callback-urls,What token format?;How to detect leaks?;Per-request or per-session?,canary token prompt tracking {date};LLM data exfiltration detection {date};prompt leak monitoring patterns {date};honeypot tokens AI security {date},QG-S5,security,,Basic: Visible tokens;Advanced: Stealth with callbacks,canary-token-patterns,canary-token-inserter.md,security.md,ZCN
tool-sbom-registry,Tool SBOM Registry,security,"Use when agents use external tools or MCP servers requiring supply chain security and vulnerability tracking","SBOM,supply chain,MCP tools,vulnerability",Tool inventory with vulnerability scanning,manual-sbom;auto-generated;third-party,What SBOM format?;Block unregistered tools?;Scan frequency?,software bill of materials AI tools {date};MCP server security SBOM {date};agent tool supply chain security {date};CycloneDX SPDX AI integration {date},QG-AI1,security,,Basic: Manual SBOM;Advanced: Auto-scan with blocking,sbom-patterns,tool-sbom-registry.md,security.md,ZTS
streaming-output-decoder,Streaming Output Decoder,safety,"Use when streaming LLM responses require real-time safety filtering without full response buffering","streaming,SSE,safety filter,real-time",Real-time stream safety filtering,token-level;sentence-level;semantic-buffering,What buffer strategy?;Latency tolerance?;Async classification?,streaming LLM output safety filtering {date};real-time content moderation streaming {date};token-level safety classification {date};SSE stream content filtering patterns {date},QG-S7,ai-runtime,,Basic: Token-level;Advanced: Semantic buffering,streaming-safety-patterns,streaming-output-decoder.md,ai-runtime.md,ZSD
agent-maturity-scoring,Agent Maturity Scoring,lifecycle,"Use when evaluating agent readiness for production with progressive rollout and lifecycle governance","maturity model,readiness,lifecycle,governance",Score agent production readiness,checklist-based;automated-scoring;hybrid,What dimensions to score?;Deployment blocking?;Approval thresholds?,AI agent maturity model {date};agent readiness scoring framework {date};MLOps maturity assessment {date};production readiness checklist AI {date},QG-P1,deployment,,Basic: Checklist;Advanced: Automated multi-dimension,maturity-model-patterns,agent-maturity-scoring.md,deployment.md,ZMS
```

- [ ] **Step 2: Verify CSV format**

Run: `head -1 src-v2/data/bam-patterns.csv && tail -9 src-v2/data/bam-patterns.csv | cut -d',' -f1,2,17`

Expected output showing header and 9 new patterns with shortcodes:
```
pattern_id,name,...,shortcode
agent-registry,Agent Registry,ZAG
fanout-circuit-breaker,Fanout Circuit Breaker,ZFC
...
```

- [ ] **Step 3: Commit CSV entries**

```bash
git add src-v2/data/bam-patterns.csv
git commit -m "$(cat <<'EOF'
feat: add 9 NEXUS Phase 3 pattern CSV entries

- agent-registry (ZAG) - operations
- fanout-circuit-breaker (ZFC) - safety
- regulatory-clock-engine (ZRE) - compliance
- blast-radius-simulator (ZBL) - reliability
- secret-leak-detector (ZSL) - security
- canary-token-inserter (ZCN) - security
- tool-sbom-registry (ZTS) - security
- streaming-output-decoder (ZSD) - safety
- agent-maturity-scoring (ZMS) - lifecycle

All with {date} web queries for anti-decay

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Create Agent Registry Pattern (ZAG)

**Files:**
- Create: `src-v2/data/patterns/agent-registry.md`

- [ ] **Step 1: Create agent-registry.md**

```markdown
---
pattern_id: agent-registry
shortcode: ZAG
category: operations
qg_ref: QG-P1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent Registry - BAM Pattern

**Loaded by:** ZAG  
**Applies to:** Multi-tenant AI systems with multiple agents requiring governance and visibility  
**See also:** [ai-observability.md](ai-observability.md), [agent-maturity-scoring.md](agent-maturity-scoring.md)

---

## When to Use

- Multiple agents deployed across tenants
- Need visibility into agent sprawl
- Ownership and dependency tracking required
- Compliance requires agent inventory

## When NOT to Use

- Single agent deployment
- Development/sandbox environments
- No governance requirements

## Architecture

### Agent Discovery and Catalog

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

### Configuration Schema (P3-01)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Auto-discovery | Complete coverage | Scan overhead | Large deployments |
| Manual registration | Precise control | May miss agents | Small teams |
| Hybrid | Balanced | Complexity | Enterprise |

## Web Research Queries

- "AI agent registry catalog patterns {date}"
- "agent inventory management enterprise {date}"
- "Backstage AI agent catalog {date}"
- "multi-tenant agent governance {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Agent registry deployed and populated |

## Related Patterns

- [ai-observability.md](ai-observability.md) - Agent monitoring
- [agent-maturity-scoring.md](agent-maturity-scoring.md) - Readiness assessment
- [tool-sbom-registry.md](tool-sbom-registry.md) - Tool inventory
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/agent-registry.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/agent-registry.md
git commit -m "$(cat <<'EOF'
feat(patterns): add agent-registry pattern (ZAG)

NEXUS Phase 3 pattern for agent inventory and governance.
Includes auto-discovery, catalog, dependency graph, trust scoring.
QG-P1 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Create Fanout Circuit Breaker Pattern (ZFC)

**Files:**
- Create: `src-v2/data/patterns/fanout-circuit-breaker.md`

- [ ] **Step 1: Create fanout-circuit-breaker.md**

```markdown
---
pattern_id: fanout-circuit-breaker
shortcode: ZFC
category: safety
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Fanout Circuit Breaker - BAM Pattern

**Loaded by:** ZFC  
**Applies to:** Multi-agent systems with sub-agent spawning and parallel task execution  
**See also:** [agent-orchestration.md](agent-orchestration.md), [cost-attribution-engine.md](cost-attribution-engine.md)

---

## When to Use

- Agents can spawn sub-agents or parallel tasks
- Risk of runaway token consumption
- Cost budget enforcement needed
- Prevent recursive agent loops

## When NOT to Use

- Single-agent linear workflows
- No sub-agent spawning
- Unlimited budget scenarios

## Architecture

### Depth/Width/Budget Protection

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

### Configuration Schema (P3-02)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Hard limits | Predictable costs | May truncate work | Budget-constrained |
| Soft limits + alerts | Flexibility | Risk of overrun | Trusted workloads |
| Adaptive limits | Learns patterns | Complexity | Mature systems |

## Web Research Queries

- "agent fanout circuit breaker patterns {date}"
- "LLM runaway loop prevention {date}"
- "multi-agent cost limiting {date}"
- "recursive agent depth limiting {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Fanout limits configured and tested |

## Related Patterns

- [agent-orchestration.md](agent-orchestration.md) - Multi-agent execution
- [cost-attribution-engine.md](cost-attribution-engine.md) - Cost tracking
- [kill-switch-registry.md](kill-switch-registry.md) - Emergency shutdown
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/fanout-circuit-breaker.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/fanout-circuit-breaker.md
git commit -m "$(cat <<'EOF'
feat(patterns): add fanout-circuit-breaker pattern (ZFC)

NEXUS Phase 3 safety pattern for preventing runaway agent loops.
Depth/width/budget limiting with tier-aware configuration.
QG-AI1 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Create Regulatory Clock Engine Pattern (ZRE)

**Files:**
- Create: `src-v2/data/patterns/regulatory-clock-engine.md`

- [ ] **Step 1: Create regulatory-clock-engine.md**

```markdown
---
pattern_id: regulatory-clock-engine
shortcode: ZRE
category: compliance
qg_ref: QG-P1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Regulatory Clock Engine - BAM Pattern

**Loaded by:** ZRE  
**Applies to:** AI systems operating in regulated industries with compliance deadlines  
**See also:** [compliance.md](../domains/compliance.md)

---

## When to Use

- Operating in regulated industries
- EU AI Act compliance required
- Multiple jurisdiction requirements
- Compliance deadline tracking needed

## When NOT to Use

- Unregulated domains
- Single jurisdiction
- No formal compliance requirements

## Architecture

### Regulation Tracking Pipeline

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

### Configuration Schema (P3-03)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual tracking | Simple | Error-prone | Small scope |
| Automated scanning | Complete | Requires maintenance | Multi-regulation |
| Third-party service | Expert updates | Cost, dependency | Enterprise |

## Web Research Queries

- "EU AI Act compliance timeline {date}"
- "regulatory compliance tracking SaaS {date}"
- "AI regulation deadline management {date}"
- "multi-jurisdiction compliance automation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Regulatory clock engine tracking all applicable regulations |

## Related Patterns

- [compliance.md](../domains/compliance.md) - Compliance domain context
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/regulatory-clock-engine.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/regulatory-clock-engine.md
git commit -m "$(cat <<'EOF'
feat(patterns): add regulatory-clock-engine pattern (ZRE)

NEXUS Phase 3 compliance pattern for tracking regulatory deadlines.
EU AI Act, GDPR, multi-jurisdiction with alerts.
QG-P1 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Create Blast Radius Simulator Pattern (ZBL)

**Files:**
- Create: `src-v2/data/patterns/blast-radius-simulator.md`

- [ ] **Step 1: Create blast-radius-simulator.md**

```markdown
---
pattern_id: blast-radius-simulator
shortcode: ZBL
category: reliability
qg_ref: QG-DR1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Blast Radius Simulator - BAM Pattern

**Loaded by:** ZBL  
**Applies to:** Complex multi-tenant systems requiring failure impact prediction  
**See also:** [tenant-chaos-injector.md](tenant-chaos-injector.md), [incident-correlation-engine.md](incident-correlation-engine.md)

---

## When to Use

- Complex agent dependency graphs
- Need to predict failure impact
- Change management processes
- Disaster recovery planning

## When NOT to Use

- Simple linear workflows
- No interdependencies
- Single-tenant deployments

## Architecture

### Failure Impact Analysis

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

### Configuration Schema (P3-04)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Static analysis | Fast, no risk | May miss runtime deps | Pre-deployment |
| Live simulation | Accurate | Requires safeguards | Staging env |
| Probabilistic model | Handles uncertainty | Complex to tune | Mature systems |

## Web Research Queries

- "blast radius simulation distributed systems {date}"
- "failure impact analysis multi-tenant {date}"
- "dependency graph failure prediction {date}"
- "chaos engineering impact assessment {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-DR1 | Blast radius analysis completed for critical paths |

## Related Patterns

- [tenant-chaos-injector.md](tenant-chaos-injector.md) - Chaos testing
- [incident-correlation-engine.md](incident-correlation-engine.md) - Incident analysis
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/blast-radius-simulator.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/blast-radius-simulator.md
git commit -m "$(cat <<'EOF'
feat(patterns): add blast-radius-simulator pattern (ZBL)

NEXUS Phase 3 reliability pattern for failure impact prediction.
Dependency graph, cascade simulation, revenue impact calculation.
QG-DR1 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Create Secret Leak Detector Pattern (ZSL)

**Files:**
- Create: `src-v2/data/patterns/secret-leak-detector.md`

- [ ] **Step 1: Create secret-leak-detector.md**

```markdown
---
pattern_id: secret-leak-detector
shortcode: ZSL
category: security
qg_ref: QG-S4
version: 1.0.0
last_reviewed: 2026-04-30
---

# Secret Leak Detector - BAM Pattern

**Loaded by:** ZSL  
**Applies to:** AI systems processing user prompts with risk of credential exposure  
**See also:** [semantic-firewall.md](semantic-firewall.md), [output-sanitization.md](output-sanitization.md)

---

## When to Use

- Agents process user-provided prompts
- Risk of API keys in context
- Compliance requires secret scanning
- Multi-tenant data isolation

## When NOT to Use

- Fully controlled input sources
- No external secrets in scope
- Air-gapped environments

## Architecture

### Multi-Layer Detection

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

### Configuration Schema (P3-05)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Pattern only | Fast | False negatives | Known formats |
| Entropy + pattern | Better coverage | False positives | General use |
| Live validation | Confirms secrets | API overhead | High security |

## Web Research Queries

- "secret detection LLM prompts {date}"
- "API key scanning AI systems {date}"
- "credential leak prevention patterns {date}"
- "TruffleHog GitLeaks AI integration {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S4 | Secret leak detection active on all input/output paths |

## Related Patterns

- [semantic-firewall.md](semantic-firewall.md) - Content policy enforcement
- [output-sanitization.md](output-sanitization.md) - Output filtering
- [canary-token-inserter.md](canary-token-inserter.md) - Leak tracking
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/secret-leak-detector.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/secret-leak-detector.md
git commit -m "$(cat <<'EOF'
feat(patterns): add secret-leak-detector pattern (ZSL)

NEXUS Phase 3 security pattern for detecting secrets in agent I/O.
Pattern matching, entropy analysis, live validation.
QG-S4 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Create Canary Token Inserter Pattern (ZCN)

**Files:**
- Create: `src-v2/data/patterns/canary-token-inserter.md`

- [ ] **Step 1: Create canary-token-inserter.md**

```markdown
---
pattern_id: canary-token-inserter
shortcode: ZCN
category: security
qg_ref: QG-S5
version: 1.0.0
last_reviewed: 2026-04-30
---

# Canary Token Inserter - BAM Pattern

**Loaded by:** ZCN  
**Applies to:** AI systems requiring leak detection and exfiltration monitoring  
**See also:** [secret-leak-detector.md](secret-leak-detector.md), [output-sanitization.md](output-sanitization.md)

---

## When to Use

- Track if prompts leak to unauthorized places
- Detect training data exfiltration
- Monitor for prompt injection success
- Audit trail for sensitive prompts

## When NOT to Use

- Public, non-sensitive content
- No leak detection requirements
- Performance-critical hot paths

## Architecture

### Token Generation and Tracking

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

### Configuration Schema (P3-06)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Visible tokens | Easy detection | Attackers can strip | Internal monitoring |
| Stealth tokens | Hard to remove | Complex detection | Leak tracking |
| Callback URLs | Real-time alerts | Infrastructure needed | High security |

## Web Research Queries

- "canary token prompt tracking {date}"
- "LLM data exfiltration detection {date}"
- "prompt leak monitoring patterns {date}"
- "honeypot tokens AI security {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S5 | Canary tokens active for sensitive data paths |

## Related Patterns

- [secret-leak-detector.md](secret-leak-detector.md) - Secret detection
- [output-sanitization.md](output-sanitization.md) - Output filtering
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/canary-token-inserter.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/canary-token-inserter.md
git commit -m "$(cat <<'EOF'
feat(patterns): add canary-token-inserter pattern (ZCN)

NEXUS Phase 3 security pattern for tracking prompt leakage.
UUID/stealth tokens, web scanning, callback detection.
QG-S5 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: Create Tool SBOM Registry Pattern (ZTS)

**Files:**
- Create: `src-v2/data/patterns/tool-sbom-registry.md`

- [ ] **Step 1: Create tool-sbom-registry.md**

```markdown
---
pattern_id: tool-sbom-registry
shortcode: ZTS
category: security
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tool SBOM Registry - BAM Pattern

**Loaded by:** ZTS  
**Applies to:** AI systems using external tools or MCP servers requiring supply chain security  
**See also:** [agent-registry.md](agent-registry.md), [rbac-per-tool.md](rbac-per-tool.md)

---

## When to Use

- Agents use external tools/MCP servers
- Supply chain security requirements
- Vulnerability tracking needed
- Compliance requires tool inventory

## When NOT to Use

- Only built-in tools used
- No external dependencies
- Air-gapped environments

## Architecture

### SBOM and Vulnerability Scanning

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

### Configuration Schema (P3-07)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual SBOM | Control | Maintenance burden | Small tool sets |
| Auto-generated | Complete | May miss nuances | Large deployments |
| Third-party service | Expert scanning | Cost, dependency | Enterprise |

## Web Research Queries

- "software bill of materials AI tools {date}"
- "MCP server security SBOM {date}"
- "agent tool supply chain security {date}"
- "CycloneDX SPDX AI integration {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Tool SBOM registry populated and scanned |

## Related Patterns

- [agent-registry.md](agent-registry.md) - Agent inventory
- [rbac-per-tool.md](rbac-per-tool.md) - Tool permissions
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/tool-sbom-registry.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/tool-sbom-registry.md
git commit -m "$(cat <<'EOF'
feat(patterns): add tool-sbom-registry pattern (ZTS)

NEXUS Phase 3 security pattern for tool supply chain security.
SPDX/CycloneDX, vulnerability scanning, policy enforcement.
QG-AI1 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: Create Streaming Output Decoder Pattern (ZSD)

**Files:**
- Create: `src-v2/data/patterns/streaming-output-decoder.md`

- [ ] **Step 1: Create streaming-output-decoder.md**

```markdown
---
pattern_id: streaming-output-decoder
shortcode: ZSD
category: safety
qg_ref: QG-S7
version: 1.0.0
last_reviewed: 2026-04-30
---

# Streaming Output Decoder - BAM Pattern

**Loaded by:** ZSD  
**Applies to:** AI systems streaming LLM responses requiring real-time safety filtering  
**See also:** [output-sanitization.md](output-sanitization.md), [semantic-firewall.md](semantic-firewall.md)

---

## When to Use

- Streaming LLM responses to users
- Real-time safety filtering needed
- Cannot wait for full response
- Partial response risk mitigation

## When NOT to Use

- Batch processing only
- Full response buffering acceptable
- No streaming requirements

## Architecture

### Real-Time Safety Pipeline

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

### Configuration Schema (P3-08)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Token-level | Minimum latency | May miss context | Speed priority |
| Sentence-level | Better accuracy | Added latency | Balanced |
| Semantic buffering | Best accuracy | Highest latency | Safety priority |

## Web Research Queries

- "streaming LLM output safety filtering {date}"
- "real-time content moderation streaming {date}"
- "token-level safety classification {date}"
- "SSE stream content filtering patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S7 | Streaming safety filtering active and tested |

## Related Patterns

- [output-sanitization.md](output-sanitization.md) - Output filtering
- [semantic-firewall.md](semantic-firewall.md) - Content policy
- [secret-leak-detector.md](secret-leak-detector.md) - Secret detection
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/streaming-output-decoder.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/streaming-output-decoder.md
git commit -m "$(cat <<'EOF'
feat(patterns): add streaming-output-decoder pattern (ZSD)

NEXUS Phase 3 safety pattern for real-time stream filtering.
Token/sentence/semantic buffering, PII/toxicity/injection detection.
QG-S7 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: Create Agent Maturity Scoring Pattern (ZMS)

**Files:**
- Create: `src-v2/data/patterns/agent-maturity-scoring.md`

- [ ] **Step 1: Create agent-maturity-scoring.md**

```markdown
---
pattern_id: agent-maturity-scoring
shortcode: ZMS
category: lifecycle
qg_ref: QG-P1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent Maturity Scoring - BAM Pattern

**Loaded by:** ZMS  
**Applies to:** AI systems requiring agent readiness assessment for production deployment  
**See also:** [agent-registry.md](agent-registry.md), [ai-deployment.md](ai-deployment.md)

---

## When to Use

- Evaluating agent readiness for production
- Progressive rollout decisions
- Agent lifecycle governance
- Risk assessment for deployments

## When NOT to Use

- All agents at same maturity level
- No governance requirements
- Rapid prototyping phase

## Architecture

### Multi-Dimensional Assessment

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

### Configuration Schema (P3-09)

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Checklist-based | Simple | Subjective | Early adoption |
| Automated scoring | Objective | Setup effort | Mature orgs |
| Hybrid | Balanced | Complexity | Enterprise |

## Web Research Queries

- "AI agent maturity model {date}"
- "agent readiness scoring framework {date}"
- "MLOps maturity assessment {date}"
- "production readiness checklist AI {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Agent maturity score meets deployment threshold |

## Related Patterns

- [agent-registry.md](agent-registry.md) - Agent inventory
- [ai-deployment.md](ai-deployment.md) - Deployment patterns
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/agent-maturity-scoring.md`

Expected: File exists with non-zero size

- [ ] **Step 3: Commit pattern**

```bash
git add src-v2/data/patterns/agent-maturity-scoring.md
git commit -m "$(cat <<'EOF'
feat(patterns): add agent-maturity-scoring pattern (ZMS)

NEXUS Phase 3 lifecycle pattern for agent readiness assessment.
Multi-dimensional scoring: testing, security, ops, documentation.
QG-P1 alignment, bam_controlled schema.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: Add Architect TOML Entries (ZAG, ZFC, ZBL, ZMS)

**Files:**
- Modify: `src-v2/customize/bmad-agent-architect.toml`

- [ ] **Step 1: Add 4 menu entries to architect TOML**

Append to `src-v2/customize/bmad-agent-architect.toml` before the closing (at end of file):

```toml
# NEXUS Phase 3 Patterns

[[agent.menu]]
code = "ZAG"
description = "Load: Agent Registry pattern (agent catalog, governance)"
prompt = """
Loading agent registry pattern:
`{project-root}/_bmad/bam/data/patterns/agent-registry.md`

Use web search for current implementation:
- "AI agent registry catalog patterns {date}"
- "agent inventory management enterprise {date}"
- "Backstage AI agent catalog {date}"

Confirm loaded. Ready for agent registry design.
"""

[[agent.menu]]
code = "ZFC"
description = "Load: Fanout Circuit Breaker pattern (runaway prevention)"
prompt = """
Loading fanout circuit breaker pattern:
`{project-root}/_bmad/bam/data/patterns/fanout-circuit-breaker.md`

Use web search for current implementation:
- "agent fanout circuit breaker patterns {date}"
- "LLM runaway loop prevention {date}"
- "multi-agent cost limiting {date}"

Confirm loaded. Ready for fanout limiting design.
"""

[[agent.menu]]
code = "ZBL"
description = "Load: Blast Radius Simulator pattern (failure impact)"
prompt = """
Loading blast radius simulator pattern:
`{project-root}/_bmad/bam/data/patterns/blast-radius-simulator.md`

Use web search for current implementation:
- "blast radius simulation distributed systems {date}"
- "failure impact analysis multi-tenant {date}"
- "chaos engineering impact assessment {date}"

Confirm loaded. Ready for blast radius analysis.
"""

[[agent.menu]]
code = "ZMS"
description = "Load: Agent Maturity Scoring pattern (readiness assessment)"
prompt = """
Loading agent maturity scoring pattern:
`{project-root}/_bmad/bam/data/patterns/agent-maturity-scoring.md`

Use web search for current implementation:
- "AI agent maturity model {date}"
- "agent readiness scoring framework {date}"
- "MLOps maturity assessment {date}"

Confirm loaded. Ready for maturity scoring design.
"""
```

- [ ] **Step 2: Verify TOML syntax**

Run: `python3 -c "import tomllib; tomllib.load(open('src-v2/customize/bmad-agent-architect.toml', 'rb'))"`

Expected: No output (valid TOML)

- [ ] **Step 3: Commit TOML entries**

```bash
git add src-v2/customize/bmad-agent-architect.toml
git commit -m "$(cat <<'EOF'
feat(toml): add Phase 3 patterns to architect TOML

- ZAG: Agent Registry (catalog, governance)
- ZFC: Fanout Circuit Breaker (runaway prevention)
- ZBL: Blast Radius Simulator (failure impact)
- ZMS: Agent Maturity Scoring (readiness assessment)

All with web search prompts for anti-decay

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 13: Add Security TOML Entries (ZSL, ZCN, ZTS, ZSD)

**Files:**
- Modify: `src-v2/customize/bmad-agent-security.toml`

- [ ] **Step 1: Add 4 menu entries to security TOML**

Append to `src-v2/customize/bmad-agent-security.toml` at the end of file:

```toml
# NEXUS Phase 3 Security Patterns

[[agent.menu]]
code = "ZSL"
description = "Load: Secret Leak Detector pattern (credential scanning)"
prompt = """
Loading secret leak detector pattern:
`{project-root}/_bmad/bam/data/patterns/secret-leak-detector.md`

Use web search for current implementation:
- "secret detection LLM prompts {date}"
- "API key scanning AI systems {date}"
- "TruffleHog GitLeaks AI integration {date}"

Confirm loaded. Ready for secret detection design.
"""

[[agent.menu]]
code = "ZCN"
description = "Load: Canary Token Inserter pattern (leak tracking)"
prompt = """
Loading canary token inserter pattern:
`{project-root}/_bmad/bam/data/patterns/canary-token-inserter.md`

Use web search for current implementation:
- "canary token prompt tracking {date}"
- "LLM data exfiltration detection {date}"
- "honeypot tokens AI security {date}"

Confirm loaded. Ready for canary token design.
"""

[[agent.menu]]
code = "ZTS"
description = "Load: Tool SBOM Registry pattern (supply chain security)"
prompt = """
Loading tool SBOM registry pattern:
`{project-root}/_bmad/bam/data/patterns/tool-sbom-registry.md`

Use web search for current implementation:
- "software bill of materials AI tools {date}"
- "MCP server security SBOM {date}"
- "CycloneDX SPDX AI integration {date}"

Confirm loaded. Ready for tool SBOM design.
"""

[[agent.menu]]
code = "ZSD"
description = "Load: Streaming Output Decoder pattern (real-time safety)"
prompt = """
Loading streaming output decoder pattern:
`{project-root}/_bmad/bam/data/patterns/streaming-output-decoder.md`

Use web search for current implementation:
- "streaming LLM output safety filtering {date}"
- "real-time content moderation streaming {date}"
- "SSE stream content filtering patterns {date}"

Confirm loaded. Ready for streaming safety design.
"""
```

- [ ] **Step 2: Verify TOML syntax**

Run: `python3 -c "import tomllib; tomllib.load(open('src-v2/customize/bmad-agent-security.toml', 'rb'))"`

Expected: No output (valid TOML)

- [ ] **Step 3: Commit TOML entries**

```bash
git add src-v2/customize/bmad-agent-security.toml
git commit -m "$(cat <<'EOF'
feat(toml): add Phase 3 patterns to security TOML

- ZSL: Secret Leak Detector (credential scanning)
- ZCN: Canary Token Inserter (leak tracking)
- ZTS: Tool SBOM Registry (supply chain security)
- ZSD: Streaming Output Decoder (real-time safety)

All with web search prompts for anti-decay

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 14: Add Compliance TOML Entry (ZRE)

**Files:**
- Modify: `src-v2/customize/bmad-agent-compliance.toml`

- [ ] **Step 1: Add 1 menu entry to compliance TOML**

Append to `src-v2/customize/bmad-agent-compliance.toml` at the end of file:

```toml
# NEXUS Phase 3 Compliance Pattern

[[agent.menu]]
code = "ZRE"
description = "Load: Regulatory Clock Engine pattern (deadline tracking)"
prompt = """
Loading regulatory clock engine pattern:
`{project-root}/_bmad/bam/data/patterns/regulatory-clock-engine.md`

Use web search for current implementation:
- "EU AI Act compliance timeline {date}"
- "regulatory compliance tracking SaaS {date}"
- "AI regulation deadline management {date}"

Confirm loaded. Ready for regulatory clock design.
"""
```

- [ ] **Step 2: Verify TOML syntax**

Run: `python3 -c "import tomllib; tomllib.load(open('src-v2/customize/bmad-agent-compliance.toml', 'rb'))"`

Expected: No output (valid TOML)

- [ ] **Step 3: Commit TOML entry**

```bash
git add src-v2/customize/bmad-agent-compliance.toml
git commit -m "$(cat <<'EOF'
feat(toml): add Phase 3 pattern to compliance TOML

- ZRE: Regulatory Clock Engine (deadline tracking)

With web search prompts for anti-decay

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 15: Update Domain Files

**Files:**
- Modify: `src-v2/data/domains/observability.md`
- Modify: `src-v2/data/domains/ai-runtime.md`
- Modify: `src-v2/data/domains/security.md`
- Modify: `src-v2/data/domains/compliance.md`
- Modify: `src-v2/data/domains/deployment.md`

- [ ] **Step 1: Update observability.md**

Add to `src-v2/data/domains/observability.md` after the "NEXUS Phase 2 Patterns" section:

```markdown
## NEXUS Phase 3 Patterns

**Operations & Reliability:**
- `{project-root}/_bmad/bam/data/patterns/agent-registry.md` - Agent catalog and governance
- `{project-root}/_bmad/bam/data/patterns/blast-radius-simulator.md` - Failure impact prediction

### Web Research

- "AI agent registry catalog patterns {date}"
- "blast radius simulation distributed systems {date}"
```

- [ ] **Step 2: Update ai-runtime.md**

Add to `src-v2/data/domains/ai-runtime.md` after the "Related Patterns" section (before "Related Web Research"):

```markdown
## NEXUS Phase 3 Patterns

**Safety & Control:**
- `{project-root}/_bmad/bam/data/patterns/fanout-circuit-breaker.md` - Runaway prevention
- `{project-root}/_bmad/bam/data/patterns/streaming-output-decoder.md` - Real-time safety

### Web Research

- "agent fanout circuit breaker patterns {date}"
- "streaming LLM output safety filtering {date}"
```

- [ ] **Step 3: Update security.md**

Add to `src-v2/data/domains/security.md` (find appropriate location, likely after existing pattern sections):

```markdown
## NEXUS Phase 3 Security Patterns

**Detection & Prevention:**
- `{project-root}/_bmad/bam/data/patterns/secret-leak-detector.md` - Credential scanning
- `{project-root}/_bmad/bam/data/patterns/canary-token-inserter.md` - Leak tracking
- `{project-root}/_bmad/bam/data/patterns/tool-sbom-registry.md` - Supply chain security

### Web Research

- "secret detection LLM prompts {date}"
- "canary token prompt tracking {date}"
- "software bill of materials AI tools {date}"
```

- [ ] **Step 4: Update compliance.md**

Add to `src-v2/data/domains/compliance.md` (find appropriate location):

```markdown
## NEXUS Phase 3 Patterns

**Regulatory Tracking:**
- `{project-root}/_bmad/bam/data/patterns/regulatory-clock-engine.md` - Deadline management

### Web Research

- "EU AI Act compliance timeline {date}"
- "regulatory compliance tracking SaaS {date}"
```

- [ ] **Step 5: Update deployment.md**

Add to `src-v2/data/domains/deployment.md` (find appropriate location):

```markdown
## NEXUS Phase 3 Patterns

**Lifecycle Governance:**
- `{project-root}/_bmad/bam/data/patterns/agent-maturity-scoring.md` - Readiness assessment

### Web Research

- "AI agent maturity model {date}"
- "agent readiness scoring framework {date}"
```

- [ ] **Step 6: Commit domain updates**

```bash
git add src-v2/data/domains/observability.md src-v2/data/domains/ai-runtime.md src-v2/data/domains/security.md src-v2/data/domains/compliance.md src-v2/data/domains/deployment.md
git commit -m "$(cat <<'EOF'
docs(domains): add Phase 3 pattern references

- observability.md: +agent-registry, +blast-radius-simulator
- ai-runtime.md: +fanout-circuit-breaker, +streaming-output-decoder
- security.md: +secret-leak-detector, +canary-token-inserter, +tool-sbom-registry
- compliance.md: +regulatory-clock-engine
- deployment.md: +agent-maturity-scoring

All with {date} web queries for anti-decay

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 16: Run Full Test Suite

**Files:**
- Test: `test/v2/*.test.js`

- [ ] **Step 1: Verify pattern count**

Run: `ls -1 src-v2/data/patterns/*.md | wc -l`

Expected: `45`

- [ ] **Step 2: Run V2 tests**

Run: `npm test -- test/v2/`

Expected: All tests pass with 45 patterns

- [ ] **Step 3: Run full test suite**

Run: `npm test`

Expected: All tests pass

- [ ] **Step 4: Verify no implementation code in patterns**

Run: `grep -l '```python\|```typescript\|```javascript' src-v2/data/patterns/*.md || echo "No implementation code found"`

Expected: "No implementation code found"

- [ ] **Step 5: Create summary commit (if all tests pass)**

```bash
git add -A
git status
# If any uncommitted changes, commit them
git commit -m "$(cat <<'EOF'
chore: NEXUS Phase 3 complete - 45 patterns

Summary:
- 9 new patterns: ZAG, ZFC, ZRE, ZBL, ZSL, ZCN, ZTS, ZSD, ZMS
- 9 CSV entries with {date} web queries
- 9 TOML menu entries (4 architect, 4 security, 1 compliance)
- 5 domain files updated with pattern refs
- Tests updated: 36 → 45 patterns

All tests passing.

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Verification Checklist

- [ ] 45 pattern files in `src-v2/data/patterns/`
- [ ] 9 new rows in `bam-patterns.csv`
- [ ] 4 new entries in `bmad-agent-architect.toml`
- [ ] 4 new entries in `bmad-agent-security.toml`
- [ ] 1 new entry in `bmad-agent-compliance.toml`
- [ ] 5 domain files updated with pattern references
- [ ] All V2 tests pass
- [ ] No implementation code in any pattern file
- [ ] All web queries use `{date}` placeholder
