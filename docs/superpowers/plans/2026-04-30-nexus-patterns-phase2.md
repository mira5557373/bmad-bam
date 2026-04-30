# NEXUS Patterns Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 9 Innovation-tier NEXUS patterns to BAM V2 with full BMAD 5-layer integration and 6-point anti-knowledge-decay.

**Architecture:** Each pattern gets: CSV registry entry (4+ web queries), pattern .md file (YAML schemas, no code), TOML menu entry (3+ web search prompts), domain file reference, and quality gate alignment. All web queries use `{date}` placeholder.

**Tech Stack:** Markdown, YAML frontmatter, CSV, TOML, Jest tests

---

## File Structure

### Files to Create (9 pattern files)
- `src-v2/data/patterns/semantic-firewall.md`
- `src-v2/data/patterns/output-sanitization.md`
- `src-v2/data/patterns/rbac-per-tool.md`
- `src-v2/data/patterns/reasoning-trace-collector.md`
- `src-v2/data/patterns/cost-attribution-engine.md`
- `src-v2/data/patterns/tenant-chaos-injector.md`
- `src-v2/data/patterns/incident-correlation-engine.md`
- `src-v2/data/patterns/tool-schema-versioning.md`
- `src-v2/data/patterns/agent-handoff-protocol.md`

### Files to Modify
- `src-v2/data/bam-patterns.csv` - Add 9 rows
- `src-v2/customize/bmad-agent-security.toml` - Add ZSF, ZOS, ZRT
- `src-v2/customize/bmad-agent-devops.toml` - Add ZCI, ZIC
- `src-v2/customize/bmad-agent-architect.toml` - Add ZRX, ZCA, ZTV, ZAH
- `src-v2/data/domains/security.md` - Add pattern references
- `src-v2/data/domains/observability.md` - Add pattern references
- `src-v2/data/domains/billing.md` - Add pattern references
- `src-v2/data/domains/testing.md` - Add pattern references
- `src-v2/data/domains/ai-runtime.md` - Add pattern references
- `test/v2/file-counts.test.js` - Update pattern count to 36

---

## Task 1: Update Test Expectations

**Files:**
- Modify: `test/v2/file-counts.test.js:34-41`

- [ ] **Step 1: Update pattern count test**

Edit `test/v2/file-counts.test.js` to expect 36 patterns (27 + 9 new):

```javascript
  test('36 pattern files (after NEXUS Phase 2)', () => {
    const files = fs.readdirSync(path.join(v2Dir, 'data/patterns')).filter(f => f.endsWith('.md'));
    // V2 consolidated: 21 base + 6 NEXUS Phase 1 + 9 NEXUS Phase 2 = 36
    // Phase 2: semantic-firewall, output-sanitization, rbac-per-tool,
    //          reasoning-trace-collector, cost-attribution-engine,
    //          tenant-chaos-injector, incident-correlation-engine,
    //          tool-schema-versioning, agent-handoff-protocol
    expect(files.length).toBe(36);
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- test/v2/file-counts.test.js`
Expected: FAIL with "Expected: 36, Received: 27"

- [ ] **Step 3: Commit test update**

```bash
git add test/v2/file-counts.test.js
git commit -m "test: expect 36 patterns for NEXUS Phase 2"
```

---

## Task 2: Add CSV Registry Entries

**Files:**
- Modify: `src-v2/data/bam-patterns.csv`

- [ ] **Step 1: Append 9 CSV rows**

Add these 9 rows to the end of `src-v2/data/bam-patterns.csv`:

```csv
semantic-firewall,Semantic Firewall,security,"Use when implementing semantic content filtering beyond regex patterns","content policy,intent detection,embedding filter",Semantic AI content filtering,intent-based;embedding-based;policy-engine,"What content policies needed?;Tenant-specific rules?;Real-time vs batch?","semantic firewall LLM production {date};AI content policy engine patterns {date};embedding content moderation enterprise {date};Anthropic Claude guardrails {date}",QG-S4,prompt-injection-detection,,"Basic: Intent classifier;Advanced: Full policy engine with embeddings",prompt-injection-detection;ai-safety,semantic-firewall.md,security.md,ZSF
output-sanitization,Output Sanitization,security,"Use when implementing AI output PII/secret removal","PII detection,secret scanning,data leakage",AI output data protection,redaction;masking;tokenization,"What PII types to detect?;Reversible tokenization needed?;Cross-tenant leak detection?","LLM output PII detection {date};AI data leakage prevention patterns {date};GDPR LLM output compliance {date};secret scanning AI output {date}",QG-S7,semantic-firewall,,"Basic: Regex PII detection;Advanced: ML-based with tokenization",prompt-injection-detection;ai-safety,output-sanitization.md,security.md,ZOS
rbac-per-tool,RBAC Per Tool,security,"Use when implementing per-tool permissions for AI agents","tool permissions,agent RBAC,capability control",AI agent tool access control,allow-list;deny-list;conditional,"What tools need restrictions?;Approval workflows needed?;Tenant-specific tools?","AI agent tool RBAC {date};LangGraph tool permissions {date};MCP tool access control patterns {date};multi-tenant agent capability {date}",QG-AI1,tool-execution,,"Basic: Static allow-list;Advanced: Dynamic RBAC with conditions",action-contract;tool-execution,rbac-per-tool.md,security.md,ZRT
reasoning-trace-collector,Reasoning Trace Collector,observability,"Use when implementing AI reasoning audit trails","reasoning trace,decision logging,agent observability",AI agent reasoning capture,minimal;standard;verbose,"What trace detail needed?;Compliance requirements?;Storage retention?","AI agent reasoning trace {date};LLM observability tracing patterns {date};agent decision audit logging {date};LangSmith tracing {date}",QG-S5,ai-observability,,"Basic: Input/output logging;Advanced: Full decision tree capture",ai-observability;invisible-failure-detector,reasoning-trace-collector.md,observability.md,ZRX
cost-attribution-engine,Cost Attribution Engine,monetization,"Use when implementing per-tenant AI cost tracking","cost allocation,token metering,usage billing",AI cost attribution,per-request;per-session;per-tenant,"What cost dimensions?;Real-time or batch?;Shared resource allocation?","LLM cost attribution multi-tenant {date};AI token metering billing {date};usage-based AI pricing {date};OpenAI cost allocation {date}",QG-P1,usage-metering,,"Basic: Token counting;Advanced: Full resource attribution",usage-metering;llm-cost-tracking,cost-attribution-engine.md,billing.md,ZCA
tenant-chaos-injector,Tenant Chaos Injector,testing,"Use when implementing tenant isolation chaos testing","chaos engineering,isolation testing,resilience validation",Tenant isolation verification,latency;error;resource;cross-tenant,"What failure modes to test?;Production safeguards?;Blast radius limits?","tenant isolation chaos testing {date};multi-tenant chaos engineering {date};noisy neighbor testing patterns {date};SaaS resilience validation {date}",QG-DR1,testing-isolation,,"Basic: Manual injection;Advanced: Continuous chaos with assertions",testing-isolation;disaster-recovery,tenant-chaos-injector.md,testing.md,ZCI
incident-correlation-engine,Incident Correlation Engine,operations,"Use when implementing cross-tenant incident analysis","incident correlation,root cause,platform health",Cross-tenant incident triage,clustering;classification;severity,"How to correlate across tenants?;Privacy preservation?;Auto-classification?","incident correlation multi-tenant {date};cross-tenant incident analysis {date};platform incident classification {date};AIOps incident correlation {date}",QG-IR1,observability,,"Basic: Time-window clustering;Advanced: ML-based correlation",incident-response;ai-observability,incident-correlation-engine.md,observability.md,ZIC
tool-schema-versioning,Tool Schema Versioning,ai-runtime,"Use when implementing AI tool schema version control","tool versioning,breaking changes,schema evolution",AI tool schema management,semantic;compatibility;migration,"Version scheme?;Breaking change handling?;Tenant-specific versions?","AI tool schema versioning {date};agent tool API versioning {date};MCP tool version management {date};LangGraph tool evolution {date}",QG-M3,tool-execution,,"Basic: Semantic versioning;Advanced: Full compatibility matrix",tool-execution;mcp-server-isolation,tool-schema-versioning.md,ai-runtime.md,ZTV
agent-handoff-protocol,Agent Handoff Protocol,ai-runtime,"Use when implementing multi-agent task handoff","agent handoff,context transfer,orchestration",Agent-to-agent task transfer,sequential;parallel;escalation;delegation,"What context to transfer?;Failure handling?;Cross-tenant handoffs?","multi-agent handoff protocol {date};agent task delegation patterns {date};LangGraph agent orchestration {date};CrewAI handoff patterns {date}",QG-M3,agent-coordination,,"Basic: Sequential handoff;Advanced: Full context preservation",agent-coordination;agent-orchestration,agent-handoff-protocol.md,ai-runtime.md,ZAH
```

- [ ] **Step 2: Verify CSV line endings**

Run: `file src-v2/data/bam-patterns.csv`
Expected: "ASCII text" (not "with CRLF line terminators")

If CRLF detected, fix with:
```bash
sed -i 's/\r$//' src-v2/data/bam-patterns.csv
```

- [ ] **Step 3: Verify row count**

Run: `wc -l src-v2/data/bam-patterns.csv`
Expected: 63 lines (header + 62 patterns, was 54 + 9 new = 63)

- [ ] **Step 4: Commit CSV update**

```bash
git add src-v2/data/bam-patterns.csv
git commit -m "feat(csv): add 9 NEXUS Phase 2 pattern entries"
```

---

## Task 3: Create semantic-firewall.md

**Files:**
- Create: `src-v2/data/patterns/semantic-firewall.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: semantic-firewall
shortcode: ZSF
category: security
qg_ref: QG-S4
version: 1.0.0
last_reviewed: 2026-04-30
---

# Semantic Firewall - BAM Pattern

**Loaded by:** ZSF  
**Applies to:** Multi-tenant AI systems requiring content policy enforcement beyond regex  
**See also:** [prompt-injection-detection.md](prompt-injection-detection.md), [output-sanitization.md](output-sanitization.md)

---

## When to Use

- Multi-tenant AI with custom content policies per tenant
- Platforms requiring semantic intent detection
- Systems processing user-generated content through LLMs
- Enterprise deployments with compliance-driven content rules
- Chatbots with dynamic content restrictions

## When NOT to Use

- Simple chatbots with no content restrictions
- Internal tools with fully trusted users
- Systems where regex patterns are sufficient
- Development/sandbox environments
- Single-tenant deployments without compliance needs

## Architecture

### Semantic Analysis Pipeline

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Intent classifier only | Fast, low latency | May miss edge cases | High-volume, simple policies |
| Embedding similarity | Catches semantic variants | Higher compute cost | Sophisticated policies |
| Full policy engine | Maximum flexibility | Complex to configure | Enterprise compliance |
| Combined approach | Best coverage | Highest latency | High-security deployments |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Classifier bypass | Multiple detection layers |
| Embedding adversarial attacks | Regular model updates |
| Policy misconfiguration | Validation + testing framework |
| Performance degradation | Tiered enforcement by tenant tier |

## Web Research Queries

- "semantic firewall LLM production patterns {date}"
- "AI content policy engine enterprise {date}"
- "embedding-based content moderation multi-tenant {date}"
- "Anthropic Claude guardrails implementation {date}"

**Framework-Specific:**
- "LangGraph content filtering guardrails {date}"
- "CrewAI agent content policy {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S4 | Semantic firewall active and tested |

## Related Patterns

- [prompt-injection-detection.md](prompt-injection-detection.md) - Input-side detection
- [output-sanitization.md](output-sanitization.md) - Output-side filtering
- [ai-safety.md](ai-safety.md) - Broader safety controls
```

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/semantic-firewall.md`
Expected: File exists with content

- [ ] **Step 3: Commit**

```bash
git add src-v2/data/patterns/semantic-firewall.md
git commit -m "feat(pattern): add semantic-firewall (ZSF)"
```

---

## Task 4: Create output-sanitization.md

**Files:**
- Create: `src-v2/data/patterns/output-sanitization.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: output-sanitization
shortcode: ZOS
category: security
qg_ref: QG-S7
version: 1.0.0
last_reviewed: 2026-04-30
---

# Output Sanitization - BAM Pattern

**Loaded by:** ZOS  
**Applies to:** Multi-tenant AI systems requiring PII/secret removal from outputs  
**See also:** [semantic-firewall.md](semantic-firewall.md), [prompt-injection-detection.md](prompt-injection-detection.md)

---

## When to Use

- AI systems processing sensitive data
- Multi-tenant platforms with strict data isolation
- Systems under GDPR/CCPA/HIPAA compliance
- Any LLM output that may contain training data artifacts
- Cross-tenant data leakage prevention

## When NOT to Use

- Internal analytics with no user-facing output
- Systems with homogeneous non-sensitive data
- Development environments with synthetic data
- Single-tenant with no compliance requirements

## Architecture

### Sanitization Pipeline

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Regex-based detection | Fast, predictable | Misses variants | Simple PII types |
| ML-based detection | Higher accuracy | Latency, cost | Complex data types |
| Tokenization | Reversible | Storage overhead | Audit requirements |
| Hard redaction | Simple, secure | Data loss | Maximum security |

## Web Research Queries

- "LLM output PII detection redaction {date}"
- "AI data leakage prevention patterns {date}"
- "GDPR LLM output compliance {date}"
- "secret scanning AI output filtering {date}"

**Framework-Specific:**
- "LangGraph output filtering {date}"
- "Presidio PII detection integration {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S7 | Output sanitization active, PII tests pass |

## Related Patterns

- [semantic-firewall.md](semantic-firewall.md) - Semantic content filtering
- [prompt-injection-detection.md](prompt-injection-detection.md) - Input protection
- [grounding-verifier.md](grounding-verifier.md) - Output verification
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/patterns/output-sanitization.md
git commit -m "feat(pattern): add output-sanitization (ZOS)"
```

---

## Task 5: Create rbac-per-tool.md

**Files:**
- Create: `src-v2/data/patterns/rbac-per-tool.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: rbac-per-tool
shortcode: ZRT
category: security
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# RBAC Per Tool - BAM Pattern

**Loaded by:** ZRT  
**Applies to:** Multi-tenant AI systems requiring tool permission control  
**See also:** [action-contract.md](action-contract.md), [tool-execution.md](tool-execution.md)

---

## When to Use

- AI agents with powerful/dangerous tools
- Multi-tenant systems with tiered capabilities
- Platforms requiring per-user tool restrictions
- Systems with tools that modify external state
- Compliance requirements for tool access audit

## When NOT to Use

- Single-tenant internal tools
- Read-only agent deployments
- Sandbox/development environments
- Agents with only safe, reversible tools

## Architecture

### Permission Evaluation Flow

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Static allow-list | Simple, fast | Inflexible | Small tool sets |
| Dynamic RBAC | Flexible | Complexity | Enterprise deployments |
| Approval workflows | Maximum control | Latency | High-risk tools |
| Tier-based | Easy to understand | Coarse-grained | SaaS tiering |

## Web Research Queries

- "AI agent tool RBAC patterns {date}"
- "LangGraph tool permissions implementation {date}"
- "MCP tool access control multi-tenant {date}"
- "agent capability management enterprise {date}"

**Framework-Specific:**
- "LangGraph tool permission middleware {date}"
- "CrewAI agent tool restrictions {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Tool permissions verified, RBAC tests pass |

## Related Patterns

- [action-contract.md](action-contract.md) - Action validation
- [tool-execution.md](tool-execution.md) - Tool runtime patterns
- [run-contracts.md](run-contracts.md) - Execution limits
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/patterns/rbac-per-tool.md
git commit -m "feat(pattern): add rbac-per-tool (ZRT)"
```

---

## Task 6: Create reasoning-trace-collector.md

**Files:**
- Create: `src-v2/data/patterns/reasoning-trace-collector.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: reasoning-trace-collector
shortcode: ZRX
category: observability
qg_ref: QG-S5
version: 1.0.0
last_reviewed: 2026-04-30
---

# Reasoning Trace Collector - BAM Pattern

**Loaded by:** ZRX  
**Applies to:** Multi-tenant AI systems requiring reasoning audit trails  
**See also:** [ai-observability.md](ai-observability.md), [invisible-failure-detector.md](invisible-failure-detector.md)

---

## When to Use

- Enterprise AI deployments requiring audit trails
- Debugging complex multi-step agent workflows
- Model fine-tuning based on production traces
- Compliance scenarios requiring decision explanations
- Performance optimization initiatives

## When NOT to Use

- High-volume, low-value interactions
- Privacy-sensitive contexts without consent
- Cost-constrained deployments
- Simple single-turn interactions

## Architecture

### Trace Collection Pipeline

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Minimal tracing | Low overhead | Limited debugging | High-volume |
| Standard tracing | Good balance | Moderate storage | Most deployments |
| Verbose tracing | Full visibility | High storage cost | Debugging, audit |
| Debug tracing | Complete picture | Performance impact | Development |

## Web Research Queries

- "AI agent reasoning trace collection {date}"
- "LLM observability tracing patterns {date}"
- "agent decision audit logging enterprise {date}"
- "LangSmith tracing integration {date}"

**Framework-Specific:**
- "LangGraph tracing LangSmith {date}"
- "CrewAI agent observability {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S5 | Trace collection active, anomaly detection configured |

## Related Patterns

- [ai-observability.md](ai-observability.md) - Broader observability
- [invisible-failure-detector.md](invisible-failure-detector.md) - Silent failure detection
- [output-drift-monitor.md](output-drift-monitor.md) - Quality monitoring
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/patterns/reasoning-trace-collector.md
git commit -m "feat(pattern): add reasoning-trace-collector (ZRX)"
```

---

## Task 7: Create cost-attribution-engine.md

**Files:**
- Create: `src-v2/data/patterns/cost-attribution-engine.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: cost-attribution-engine
shortcode: ZCA
category: monetization
qg_ref: QG-P1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Cost Attribution Engine - BAM Pattern

**Loaded by:** ZCA  
**Applies to:** Multi-tenant AI systems requiring cost tracking and allocation  
**See also:** [usage-metering.md](usage-metering.md), [llm-cost-tracking.md](llm-cost-tracking.md)

---

## When to Use

- Usage-based billing for AI features
- Cost allocation across business units
- Budget enforcement per tenant/tier
- Cost optimization initiatives
- Chargeback models for internal AI platforms

## When NOT to Use

- Fixed-price AI offerings
- Single-tenant deployments
- Development/testing environments
- Minimal AI usage scenarios

## Architecture

### Attribution Pipeline

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Per-request tracking | Precise | High overhead | Enterprise billing |
| Aggregated tracking | Low overhead | Less precise | Internal chargeback |
| Real-time attribution | Immediate visibility | Complexity | Budget enforcement |
| Batch attribution | Simple | Delayed insights | Reporting only |

## Web Research Queries

- "LLM cost attribution multi-tenant {date}"
- "AI token metering billing patterns {date}"
- "usage-based AI pricing implementation {date}"
- "OpenAI cost allocation enterprise {date}"

**Framework-Specific:**
- "LangSmith cost tracking {date}"
- "Anthropic usage API billing {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-P1 | Cost tracking active, budget alerts configured |

## Related Patterns

- [usage-metering.md](usage-metering.md) - General usage tracking
- [quota-management.md](quota-management.md) - Quota enforcement
- [llm-cost-tracking.md](llm-cost-tracking.md) - LLM-specific costs
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/patterns/cost-attribution-engine.md
git commit -m "feat(pattern): add cost-attribution-engine (ZCA)"
```

---

## Task 8: Create tenant-chaos-injector.md

**Files:**
- Create: `src-v2/data/patterns/tenant-chaos-injector.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: tenant-chaos-injector
shortcode: ZCI
category: testing
qg_ref: QG-DR1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tenant Chaos Injector - BAM Pattern

**Loaded by:** ZCI  
**Applies to:** Multi-tenant systems requiring isolation chaos testing  
**See also:** [testing-isolation.md](testing-isolation.md), [disaster-recovery.md](disaster-recovery.md)

---

## When to Use

- Validating tenant isolation under failure conditions
- Testing noisy neighbor protections
- Pre-production resilience verification
- Compliance validation for isolation claims
- Regular chaos engineering drills

## When NOT to Use

- Production without proper safeguards
- During high-traffic periods
- Without rollback capabilities
- Single-tenant deployments

## Architecture

### Chaos Injection Flow

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual injection | Full control | Infrequent testing | Initial validation |
| Scheduled chaos | Regular testing | Planned disruption | Mature systems |
| Continuous chaos | Always validated | Operational overhead | High-reliability |
| Game day events | Team learning | Resource intensive | Quarterly drills |

## Web Research Queries

- "tenant isolation chaos testing {date}"
- "multi-tenant chaos engineering patterns {date}"
- "noisy neighbor resilience testing {date}"
- "SaaS fault injection testing {date}"

**Framework-Specific:**
- "Chaos Monkey multi-tenant {date}"
- "Litmus chaos tenant isolation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-DR1 | Chaos tests pass, isolation verified |

## Related Patterns

- [testing-isolation.md](testing-isolation.md) - Isolation testing
- [disaster-recovery.md](disaster-recovery.md) - DR patterns
- [performance-isolation.md](performance-isolation.md) - Noisy neighbor prevention
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/patterns/tenant-chaos-injector.md
git commit -m "feat(pattern): add tenant-chaos-injector (ZCI)"
```

---

## Task 9: Create incident-correlation-engine.md

**Files:**
- Create: `src-v2/data/patterns/incident-correlation-engine.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: incident-correlation-engine
shortcode: ZIC
category: operations
qg_ref: QG-IR1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Incident Correlation Engine - BAM Pattern

**Loaded by:** ZIC  
**Applies to:** Multi-tenant systems requiring cross-tenant incident analysis  
**See also:** [incident-response.md](incident-response.md), [ai-observability.md](ai-observability.md)

---

## When to Use

- Multi-tenant incident triage
- Root cause analysis across tenants
- Platform health vs tenant health differentiation
- Automated incident classification
- Reducing MTTR through correlation

## When NOT to Use

- Single-tenant deployments
- Simple applications with obvious failures
- Systems without sufficient telemetry
- Privacy-restricted environments

## Architecture

### Correlation Pipeline

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Time-based clustering | Simple | May miss patterns | Basic correlation |
| Similarity clustering | Accurate grouping | Compute intensive | Root cause analysis |
| ML-based correlation | Discovers patterns | Requires training | Mature systems |
| Rule-based classification | Predictable | Manual maintenance | Known failure modes |

## Web Research Queries

- "incident correlation multi-tenant SaaS {date}"
- "cross-tenant incident analysis patterns {date}"
- "platform incident classification automation {date}"
- "AIOps incident correlation {date}"

**Framework-Specific:**
- "PagerDuty incident correlation {date}"
- "Datadog incident management multi-tenant {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-IR1 | Correlation engine active, runbooks linked |

## Related Patterns

- [incident-response.md](incident-response.md) - Response procedures
- [ai-observability.md](ai-observability.md) - Telemetry collection
- [kill-switch-registry.md](kill-switch-registry.md) - Emergency controls
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/patterns/incident-correlation-engine.md
git commit -m "feat(pattern): add incident-correlation-engine (ZIC)"
```

---

## Task 10: Create tool-schema-versioning.md

**Files:**
- Create: `src-v2/data/patterns/tool-schema-versioning.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: tool-schema-versioning
shortcode: ZTV
category: ai-runtime
qg_ref: QG-M3
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tool Schema Versioning - BAM Pattern

**Loaded by:** ZTV  
**Applies to:** Multi-tenant AI systems with evolving tool schemas  
**See also:** [tool-execution.md](tool-execution.md), [mcp-server-isolation.md](mcp-server-isolation.md)

---

## When to Use

- Evolving agent tool interfaces
- Multiple tool versions in production
- Tenant-specific tool customizations
- Breaking change management
- Long-running agent deployments

## When NOT to Use

- Stable, unchanging tool sets
- Single-version deployments
- Development/prototyping phases
- Simple tools with no schema

## Architecture

### Version Registry

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Semantic versioning | Clear contract | Requires discipline | Public tools |
| Timestamp versioning | Simple | No compatibility signal | Internal tools |
| Per-tenant pinning | Stability | Fragmentation | Enterprise |
| Auto-upgrade | Always current | Breaking changes | Trusted tools |

## Web Research Queries

- "AI tool schema versioning patterns {date}"
- "agent tool API versioning best practices {date}"
- "MCP tool version management {date}"
- "LLM function schema evolution {date}"

**Framework-Specific:**
- "LangGraph tool versioning {date}"
- "OpenAI function calling schema versioning {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Tool schemas versioned, compatibility checked |

## Related Patterns

- [tool-execution.md](tool-execution.md) - Tool runtime
- [mcp-server-isolation.md](mcp-server-isolation.md) - MCP patterns
- [facade-contracts.md](facade-contracts.md) - Contract versioning
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/patterns/tool-schema-versioning.md
git commit -m "feat(pattern): add tool-schema-versioning (ZTV)"
```

---

## Task 11: Create agent-handoff-protocol.md

**Files:**
- Create: `src-v2/data/patterns/agent-handoff-protocol.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: agent-handoff-protocol
shortcode: ZAH
category: ai-runtime
qg_ref: QG-M3
version: 1.0.0
last_reviewed: 2026-04-30
---

# Agent Handoff Protocol - BAM Pattern

**Loaded by:** ZAH  
**Applies to:** Multi-agent systems requiring task handoff with context preservation  
**See also:** [agent-orchestration.md](agent-orchestration.md), [agent-coordination.md](agent-coordination.md)

---

## When to Use

- Multi-agent workflows
- Agent specialization with handoffs
- Escalation to more capable agents
- Parallel task delegation
- Complex orchestration scenarios

## When NOT to Use

- Single-agent deployments
- Simple linear workflows
- Stateless interactions
- No agent specialization

## Architecture

### Handoff Flow

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Full context transfer | Complete information | Large payloads | Complex tasks |
| Summary transfer | Efficient | Information loss | Simple handoffs |
| Stateless handoff | Simple | No context | Independent tasks |
| Checkpoint-based | Resumable | Storage overhead | Long-running tasks |

## Web Research Queries

- "multi-agent handoff protocol patterns {date}"
- "agent task delegation orchestration {date}"
- "LLM agent context transfer {date}"
- "agent-to-agent communication patterns {date}"

**Framework-Specific:**
- "LangGraph agent handoff {date}"
- "CrewAI agent delegation {date}"
- "AutoGen agent conversation handoff {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Handoff protocol implemented, context preserved |

## Related Patterns

- [agent-orchestration.md](agent-orchestration.md) - Orchestration patterns
- [agent-coordination.md](agent-coordination.md) - Multi-agent coordination
- [state-management.md](state-management.md) - State persistence
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/data/patterns/agent-handoff-protocol.md
git commit -m "feat(pattern): add agent-handoff-protocol (ZAH)"
```

---

## Task 12: Add Security TOML Menu Entries

**Files:**
- Modify: `src-v2/customize/bmad-agent-security.toml`

- [ ] **Step 1: Add ZSF, ZOS, ZRT menu entries**

Append to `src-v2/customize/bmad-agent-security.toml`:

```toml

# NEXUS Phase 2 Security Patterns

[[agent.menu]]
code = "ZSF"
description = "Load: Semantic Firewall pattern (content policy)"
prompt = """
Loading semantic firewall pattern:
`{project-root}/_bmad/bam/data/patterns/semantic-firewall.md`

Use web search for current implementation:
- "semantic firewall LLM production patterns {date}"
- "AI content policy engine implementation {date}"
- "embedding-based content moderation {date}"

Confirm loaded. Ready for semantic firewall design.
"""

[[agent.menu]]
code = "ZOS"
description = "Load: Output Sanitization pattern (PII/secrets)"
prompt = """
Loading output sanitization pattern:
`{project-root}/_bmad/bam/data/patterns/output-sanitization.md`

Use web search for current implementation:
- "LLM output PII detection redaction {date}"
- "AI secret scanning output filtering {date}"
- "GDPR compliant AI output {date}"

Confirm loaded. Ready for output sanitization design.
"""

[[agent.menu]]
code = "ZRT"
description = "Load: RBAC Per Tool pattern (agent permissions)"
prompt = """
Loading RBAC per tool pattern:
`{project-root}/_bmad/bam/data/patterns/rbac-per-tool.md`

Use web search for current implementation:
- "AI agent tool RBAC patterns {date}"
- "LangGraph tool permissions {date}"
- "MCP tool access control {date}"

Confirm loaded. Ready for tool permission design.
"""
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/customize/bmad-agent-security.toml
git commit -m "feat(toml): add ZSF, ZOS, ZRT menu entries"
```

---

## Task 13: Add DevOps TOML Menu Entries

**Files:**
- Modify: `src-v2/customize/bmad-agent-devops.toml`

- [ ] **Step 1: Add ZCI, ZIC menu entries**

Append to `src-v2/customize/bmad-agent-devops.toml`:

```toml

# NEXUS Phase 2 Operations Patterns

[[agent.menu]]
code = "ZCI"
description = "Load: Tenant Chaos Injector pattern"
prompt = """
Loading tenant chaos injector pattern:
`{project-root}/_bmad/bam/data/patterns/tenant-chaos-injector.md`

Use web search for current implementation:
- "tenant isolation chaos testing {date}"
- "multi-tenant chaos engineering {date}"
- "noisy neighbor resilience testing {date}"

Confirm loaded. Ready for chaos testing design.
"""

[[agent.menu]]
code = "ZIC"
description = "Load: Incident Correlation Engine pattern"
prompt = """
Loading incident correlation engine pattern:
`{project-root}/_bmad/bam/data/patterns/incident-correlation-engine.md`

Use web search for current implementation:
- "incident correlation multi-tenant SaaS {date}"
- "cross-tenant incident analysis {date}"
- "AIOps incident correlation {date}"

Confirm loaded. Ready for incident correlation design.
"""
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/customize/bmad-agent-devops.toml
git commit -m "feat(toml): add ZCI, ZIC menu entries"
```

---

## Task 14: Add Architect TOML Menu Entries

**Files:**
- Modify: `src-v2/customize/bmad-agent-architect.toml`

- [ ] **Step 1: Add ZRX, ZCA, ZTV, ZAH menu entries**

Find the `# NEXUS PATTERNS` section in `src-v2/customize/bmad-agent-architect.toml` and append:

```toml

[[agent.menu]]
code = "ZRX"
description = "Load: Reasoning Trace Collector pattern"
prompt = """
Loading reasoning trace collector pattern:
`{project-root}/_bmad/bam/data/patterns/reasoning-trace-collector.md`

Use web search for current implementation:
- "AI agent reasoning trace collection {date}"
- "LLM observability tracing patterns {date}"
- "LangSmith tracing integration {date}"

Confirm loaded. Ready for reasoning trace design.
"""

[[agent.menu]]
code = "ZCA"
description = "Load: Cost Attribution Engine pattern"
prompt = """
Loading cost attribution engine pattern:
`{project-root}/_bmad/bam/data/patterns/cost-attribution-engine.md`

Use web search for current implementation:
- "LLM cost attribution multi-tenant {date}"
- "AI token metering billing patterns {date}"
- "usage-based AI pricing {date}"

Confirm loaded. Ready for cost attribution design.
"""

[[agent.menu]]
code = "ZTV"
description = "Load: Tool Schema Versioning pattern"
prompt = """
Loading tool schema versioning pattern:
`{project-root}/_bmad/bam/data/patterns/tool-schema-versioning.md`

Use web search for current implementation:
- "AI tool schema versioning patterns {date}"
- "agent tool API versioning {date}"
- "MCP tool version management {date}"

Confirm loaded. Ready for tool versioning design.
"""

[[agent.menu]]
code = "ZAH"
description = "Load: Agent Handoff Protocol pattern"
prompt = """
Loading agent handoff protocol pattern:
`{project-root}/_bmad/bam/data/patterns/agent-handoff-protocol.md`

Use web search for current implementation:
- "multi-agent handoff protocol {date}"
- "LangGraph agent handoff {date}"
- "CrewAI agent delegation patterns {date}"

Confirm loaded. Ready for agent handoff design.
"""
```

- [ ] **Step 2: Commit**

```bash
git add src-v2/customize/bmad-agent-architect.toml
git commit -m "feat(toml): add ZRX, ZCA, ZTV, ZAH menu entries"
```

---

## Task 15: Update Domain Files

**Files:**
- Modify: `src-v2/data/domains/security.md`
- Modify: `src-v2/data/domains/observability.md`
- Modify: `src-v2/data/domains/billing.md`
- Modify: `src-v2/data/domains/testing.md`
- Modify: `src-v2/data/domains/ai-runtime.md`

- [ ] **Step 1: Update security.md**

Add before the final `---` in `src-v2/data/domains/security.md`:

```markdown

## NEXUS Phase 2 Patterns

**Content Filtering:**
- `{project-root}/_bmad/bam/data/patterns/semantic-firewall.md` - Semantic content policy
- `{project-root}/_bmad/bam/data/patterns/output-sanitization.md` - PII/secret removal

**Tool Security:**
- `{project-root}/_bmad/bam/data/patterns/rbac-per-tool.md` - Tool permission control

### Web Research

- "semantic content filtering LLM enterprise {date}"
- "AI output sanitization patterns {date}"
- "agent tool RBAC multi-tenant {date}"
```

- [ ] **Step 2: Update observability.md**

Add before the final line in `src-v2/data/domains/observability.md`:

```markdown

## NEXUS Phase 2 Patterns

**AI Observability:**
- `{project-root}/_bmad/bam/data/patterns/reasoning-trace-collector.md` - Reasoning audit
- `{project-root}/_bmad/bam/data/patterns/incident-correlation-engine.md` - Cross-tenant incidents

### Web Research

- "AI agent reasoning trace patterns {date}"
- "incident correlation multi-tenant {date}"
```

- [ ] **Step 3: Update billing.md**

Add before the final line in `src-v2/data/domains/billing.md`:

```markdown

## NEXUS Phase 2 Patterns

**Cost Management:**
- `{project-root}/_bmad/bam/data/patterns/cost-attribution-engine.md` - AI cost tracking

### Web Research

- "LLM cost attribution enterprise {date}"
- "AI usage billing patterns {date}"
```

- [ ] **Step 4: Update testing.md**

Add before the final line in `src-v2/data/domains/testing.md`:

```markdown

## NEXUS Phase 2 Patterns

**Chaos Testing:**
- `{project-root}/_bmad/bam/data/patterns/tenant-chaos-injector.md` - Isolation chaos

### Web Research

- "tenant chaos engineering patterns {date}"
- "multi-tenant resilience testing {date}"
```

- [ ] **Step 5: Update ai-runtime.md**

Add to the "Related Patterns" section in `src-v2/data/domains/ai-runtime.md`:

```markdown

**Tool & Agent Management (NEXUS Phase 2):**
- `{project-root}/_bmad/bam/data/patterns/tool-schema-versioning.md` - Tool version control
- `{project-root}/_bmad/bam/data/patterns/agent-handoff-protocol.md` - Multi-agent handoff
```

- [ ] **Step 6: Commit domain updates**

```bash
git add src-v2/data/domains/security.md src-v2/data/domains/observability.md src-v2/data/domains/billing.md src-v2/data/domains/testing.md src-v2/data/domains/ai-runtime.md
git commit -m "feat(domains): add NEXUS Phase 2 pattern references"
```

---

## Task 16: Run Full Test Suite

**Files:**
- Test: `test/v2/`

- [ ] **Step 1: Run all V2 tests**

Run: `npm test -- test/v2/`

Expected: All tests pass, including:
- 36 pattern files exist
- All patterns have Web Research section
- No implementation code in patterns
- All TOML files valid

- [ ] **Step 2: Verify pattern count**

Run: `ls src-v2/data/patterns/*.md | wc -l`
Expected: 36

- [ ] **Step 3: Verify CSV row count**

Run: `wc -l src-v2/data/bam-patterns.csv`
Expected: 63 lines

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete NEXUS Phase 2 - 9 patterns with anti-decay

Added 9 Innovation-tier patterns:
- semantic-firewall (ZSF) - Semantic content filtering
- output-sanitization (ZOS) - PII/secret removal
- rbac-per-tool (ZRT) - Agent tool permissions
- reasoning-trace-collector (ZRX) - AI reasoning audit
- cost-attribution-engine (ZCA) - LLM cost tracking
- tenant-chaos-injector (ZCI) - Isolation chaos testing
- incident-correlation-engine (ZIC) - Cross-tenant incidents
- tool-schema-versioning (ZTV) - Tool schema evolution
- agent-handoff-protocol (ZAH) - Multi-agent handoff

6-point anti-knowledge-decay per pattern:
1. CSV web_queries with 4+ {date} queries
2. Pattern .md Web Research section
3. TOML web search prompts
4. Domain Web Research subsection
5. YAML schemas only (no implementation code)
6. QG alignment with existing gates

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Verification Checklist

After completing all tasks, verify:

- [ ] 36 pattern files in `src-v2/data/patterns/`
- [ ] 9 new rows in `bam-patterns.csv` (63 total lines)
- [ ] 3 new entries in `bmad-agent-security.toml`
- [ ] 2 new entries in `bmad-agent-devops.toml`
- [ ] 4 new entries in `bmad-agent-architect.toml`
- [ ] 5 domain files updated with pattern references
- [ ] All V2 tests pass: `npm test -- test/v2/`
- [ ] No implementation code in any pattern file
- [ ] All web queries use `{date}` placeholder

---

Generated with [Claude Code](https://claude.com/claude-code)
