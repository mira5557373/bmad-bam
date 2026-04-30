# NEXUS Patterns Phase 1 - BMAD Compatible Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 10 NEXUS patterns to BAM V2 with FULL BMAD method compatibility, preventing knowledge decay through CSV-driven pattern registry with web search integration.

**Architecture:** Every pattern gets entries in 5 places: (1) bam-patterns.csv with web_queries, (2) pattern .md file with YAML schemas, (3) TOML menu with shortcode, (4) domain .md with pattern reference, (5) quality-gates.csv if new QG. No implementation code in any file.

**Tech Stack:** Markdown, YAML frontmatter, CSV, TOML, Jest

---

## BMAD Compatibility Checklist

For each pattern, verify:
- [ ] CSV row with 17 columns including `web_queries` with `{date}`
- [ ] Pattern .md with YAML schemas (no implementation code)
- [ ] TOML menu entry with shortcode
- [ ] Domain .md reference
- [ ] Quality gate CSV entry (if new QG ref)

---

## File Structure

### Create (6 pattern files):
- `src-v2/data/patterns/prompt-injection-detection.md`
- `src-v2/data/patterns/kill-switch-registry.md`
- `src-v2/data/patterns/invisible-failure-detector.md`
- `src-v2/data/patterns/grounding-verifier.md`
- `src-v2/data/patterns/decision-verification.md`
- `src-v2/data/patterns/output-drift-monitor.md`

### Modify (7 files):
- `src-v2/data/bam-patterns.csv` - Add 9 rows (6 Innovation + 3 CSV-only)
- `src-v2/data/patterns/agent-orchestration.md` - Add Agent Registry section
- `src-v2/customize/bmad-agent-security.toml` - Add menu entries
- `src-v2/customize/bmad-agent-architect.toml` - Add menu entries
- `src-v2/data/domains/security.md` - Add pattern references
- `src-v2/data/domains/ai-runtime.md` - Add pattern references
- `test/v2/pattern-standards.test.js` - Update expected count

---

### Task 1: Update Test Expected Count

**Files:**
- Modify: `test/v2/pattern-standards.test.js:7-12`

- [ ] **Step 1: Update the test to expect 27 patterns**

```javascript
  test('27 pattern files exist (after NEXUS Phase 1)', () => {
    const patterns = fs.readdirSync(patternsDir).filter(f =>
      f.endsWith('.md') && !f.startsWith('.')
    );
    expect(patterns.length).toBe(27);
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- test/v2/pattern-standards.test.js`
Expected: FAIL with "Expected: 27, Received: 21"

---

### Task 2: Add ALL Pattern CSV Entries (9 rows)

**Files:**
- Modify: `src-v2/data/bam-patterns.csv`

This is the **CRITICAL** step for BMAD compatibility. Every pattern needs a CSV row with:
- `pattern_id` - unique identifier
- `decision_criteria` - when to use
- `signals` - trigger keywords
- `web_queries` - with `{date}` placeholder for current info
- `core_pattern_ref` - link to .md file
- `domain_ref` - link to domain file
- `shortcode` - menu trigger

- [ ] **Step 1: Add 9 CSV rows (6 Innovation + 3 CSV-only)**

Append to `src-v2/data/bam-patterns.csv`:

```csv
prompt-injection-detection,Prompt Injection Detection,security,"Use when implementing LLM input validation and attack prevention","prompt injection,jailbreak,adversarial input,canary token",Detect and prevent prompt injection attacks in multi-tenant AI,pattern-matching;canary-detection;ml-classifier,What detection layers needed?;ML classifier required?;Per-tenant patterns?,prompt injection detection patterns {date};LLM jailbreak prevention techniques {date};canary token system prompt protection {date},QG-S6,ai-runtime,,Basic: Pattern matching;Advanced: ML classifier with canary tokens,,prompt-injection-detection.md,security.md,ZPD
kill-switch-registry,Kill Switch Registry,operations,"Use when implementing emergency shutdown controls for AI agents","kill switch,emergency halt,agent shutdown,circuit breaker",Centralized registry for emergency shutdown controls,global;tenant-scoped;agent-scoped,What switch scopes needed?;Auto-trigger conditions?;Recovery protocol?,AI agent kill switch patterns {date};emergency shutdown multi-tenant systems {date};agent safety automatic shutdown {date},QG-IR1,circuit-breaker,,Basic: Manual switches;Advanced: Auto-trigger with cascading,,kill-switch-registry.md,operations.md,ZKS
invisible-failure-detector,Invisible Failure Detector,operations,"Use when detecting AI failures that don't throw exceptions","silent failure,quality degradation,output scoring,baseline drift",Detect failures producing incorrect or degraded outputs,quality-scoring;baseline-comparison;response-time-anomaly,What quality metrics?;Per-tenant baselines?;Alert thresholds?,AI output quality monitoring patterns {date};invisible failure detection machine learning {date};silent degradation detection AI systems {date},QG-AI2,ai-observability,,Basic: Quality scoring;Advanced: Per-tenant baseline with drift detection,,invisible-failure-detector.md,operations.md,ZIF
grounding-verifier,Grounding Verifier,ai-runtime,"Use when implementing RAG verification to prevent hallucination","grounding,hallucination,citation,factual consistency",Verify AI outputs are grounded in retrieved context,citation-check;semantic-similarity;factual-consistency,Citation required?;Similarity threshold?;On-fail action?,RAG grounding verification patterns {date};LLM hallucination detection techniques {date};citation verification AI systems {date},QG-AI3,ai-verification,,Basic: Citation check;Advanced: Semantic similarity with regeneration,,grounding-verifier.md,ai-runtime.md,ZGV
decision-verification,Decision Verification,ai-runtime,"Use when implementing pre-execution verification for agent actions","decision gate,human-in-the-loop,impact assessment,reversibility",Verify agent decisions before execution,impact-assessment;human-approval;automated-checks,What impact levels?;HITL for high-impact?;Reversibility tracking?,AI agent decision verification patterns {date};human-in-the-loop AI systems {date};impact assessment automated actions {date},QG-AI3,action-contract,,Basic: Automated checks;Advanced: Human approval for high-impact,,decision-verification.md,ai-runtime.md,ZDV
output-drift-monitor,Output Drift Monitor,ai-runtime,"Use when monitoring AI output quality over time","drift detection,model degradation,baseline,quality monitoring",Monitor output quality to detect model drift,statistical;embedding;categorical,What drift metrics?;Per-tenant baselines?;Auto-rollback?,ML model drift detection patterns {date};LLM output quality monitoring {date};embedding-based drift detection {date},QG-AI2,ai-observability,,Basic: Statistical tests;Advanced: Per-tenant with auto-rollback,,output-drift-monitor.md,ai-runtime.md,ZOD
fan-out-circuit-breaker,Fan-Out Circuit Breaker,ai-runtime,"Use when implementing multi-agent fan-out with failure protection","parallel agents,fan-out,failure handling,circuit breaker",Protect multi-agent fan-out from cascade failures,half-open;bulkhead;timeout,What failure threshold?;Recovery strategy?;Timeout values?,fan-out circuit breaker multi-agent {date};parallel agent orchestration failure handling {date},QG-M3,agent-orchestration,,Basic: Simple timeout;Advanced: Bulkhead with half-open recovery,,agent-orchestration.md,ai-runtime.md,ZFC
regulatory-clock-engine,Regulatory Clock Engine,compliance,"Use when implementing time-based regulatory compliance automation","GDPR,retention,compliance clock,data lifecycle",Automate regulatory time-based requirements,retention-clock;deletion-scheduler;consent-expiry,What regulations?;Retention periods?;Deletion automation?,regulatory compliance automation {date};GDPR retention clock patterns {date},QG-CC,compliance,,Basic: Manual tracking;Advanced: Automated deletion with audit trail,,,compliance.md,ZRC
blast-radius-simulator,Blast Radius Simulator,operations,"Use when simulating failure impact before deployment","chaos engineering,blast radius,impact analysis,failure simulation",Simulate and contain failure impact,failure-injection;impact-scoring;containment,What failure types?;Tenant isolation verified?;Recovery tested?,blast radius simulation chaos engineering {date};failure impact analysis patterns {date},QG-DR1,disaster-recovery,,Basic: Manual simulation;Advanced: Automated chaos with tenant isolation,,,operations.md,ZBR
```

- [ ] **Step 2: Verify CSV entries**

Run: `grep -c "^prompt-injection-detection\|^kill-switch-registry\|^invisible-failure-detector\|^grounding-verifier\|^decision-verification\|^output-drift-monitor\|^fan-out-circuit-breaker\|^regulatory-clock-engine\|^blast-radius-simulator" src-v2/data/bam-patterns.csv`
Expected: 9

- [ ] **Step 3: Verify all shortcodes are unique**

Run: `cut -d',' -f17 src-v2/data/bam-patterns.csv | sort | uniq -d | wc -l`
Expected: 0 (no duplicates)

---

### Task 3: Create prompt-injection-detection.md

**Files:**
- Create: `src-v2/data/patterns/prompt-injection-detection.md`

- [ ] **Step 1: Create pattern file with YAML schemas (no implementation code)**

```markdown
---
pattern_id: prompt-injection-detection
shortcode: ZPD
category: security
qg_ref: QG-S6
version: 1.0.0
last_reviewed: 2026-04-30
---

# Prompt Injection Detection - BAM Pattern

**Loaded by:** ZPD  
**Applies to:** Multi-tenant AI systems requiring input validation and attack prevention  
**See also:** [zero-trust.md](zero-trust.md), [ai-safety.md](ai-safety.md)

---

## When to Use

- Multi-tenant AI systems accepting user prompts
- LLM-powered features with untrusted input
- Chatbots or agents with system prompt confidentiality
- AI features processing external documents or URLs
- Systems with tiered tenant permissions

## When NOT to Use

- Internal AI tools with fully trusted users
- Batch processing with pre-validated inputs
- Systems without system prompts to protect
- Development/sandbox environments

## Architecture

### Detection Layer Stack

```
┌─────────────────────────────────────────────────────────────┐
│                 Prompt Injection Detection                   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Layer 1: Input Sanitization                            │ │
│  │   • Strip control characters                           │ │
│  │   • Normalize Unicode (NFC)                            │ │
│  │   • Limit input length                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Layer 2: Pattern Matching                              │ │
│  │   • Known injection phrases                            │ │
│  │   • Regex-based detection                              │ │
│  │   • Multi-language support                             │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Layer 3: Canary Token Detection                        │ │
│  │   • Embed tokens in system prompt                      │ │
│  │   • Detect token in output                             │ │
│  │   • Alert on system prompt leak                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Layer 4: ML Classifier (Optional)                      │ │
│  │   • Trained injection classifier                       │ │
│  │   • Confidence threshold scoring                       │ │
│  │   • Adversarial robustness                             │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Detection Configuration Schema (P1-01)

```yaml
prompt_injection_detection:
  version: "1.0.0"
  bam_controlled: true
  
  detection_layers:
    input_sanitization:
      enabled: bool
      strip_control_chars: bool
      normalize_unicode: bool
      max_input_length: int
      
    pattern_matching:
      enabled: bool
      patterns: list[string]
      case_insensitive: bool
      
    canary_detection:
      enabled: bool
      canary_format: string
      alert_on_leak: bool
      
    ml_classifier:
      enabled: enum[true, false, optional]
      model: string
      threshold: float
      
  response_actions:
    on_detection:
      action: enum[block, flag, sanitize, allow_with_warning]
      log_level: enum[debug, info, warning, security]
      alert_threshold: int
      
  tenant_isolation:
    per_tenant_patterns: bool
    shared_blocklist: bool
```

### Tenant-Aware Configuration Schema (P1-02)

```yaml
tenant_injection_config:
  tier_settings:
    free:
      detection_layers: list[string]
      ml_classifier: bool
      alert_on_detection: bool
      
    pro:
      detection_layers: list[string]
      ml_classifier: bool
      alert_on_detection: bool
      
    enterprise:
      detection_layers: list[string]
      ml_classifier: bool
      custom_patterns: bool
      alert_on_detection: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Pattern matching only | Fast, low cost | Easily bypassed | MVP, low risk |
| Pattern + canary | Detects leaks | Overhead in prompts | Most SaaS |
| Full ML classifier | Best detection | Higher latency, cost | Enterprise |
| Defense in depth | Maximum security | Complexity | High-value targets |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Bypass via encoding | Normalize Unicode, decode entities |
| Prompt leak | Canary tokens, output filtering |
| False positives | Configurable thresholds, allow-lists |
| Model poisoning | Regular classifier retraining |

## Web Research Queries

- "prompt injection detection patterns {date}"
- "LLM jailbreak prevention techniques {date}"
- "canary token system prompt protection {date}"
- "multi-tenant AI security boundaries {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S6 | Prompt injection detection implemented |

## Related Patterns

- [zero-trust.md](zero-trust.md) - Trust boundaries
- [ai-safety.md](ai-safety.md) - AI safety controls
- [action-contract.md](action-contract.md) - Agent action validation
```

- [ ] **Step 2: Verify no implementation code**

Run: `grep -E "^\`\`\`(python|typescript|javascript)" src-v2/data/patterns/prompt-injection-detection.md | wc -l`
Expected: 0

---

### Task 4: Create kill-switch-registry.md

**Files:**
- Create: `src-v2/data/patterns/kill-switch-registry.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: kill-switch-registry
shortcode: ZKS
category: operations
qg_ref: QG-IR1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Kill Switch Registry - BAM Pattern

**Loaded by:** ZKS  
**Applies to:** Emergency shutdown controls for AI agents and tenant operations  
**See also:** [incident-response.md](incident-response.md), [circuit-breaker.md](circuit-breaker.md)

---

## When to Use

- Production AI systems requiring emergency controls
- Multi-tenant platforms with per-tenant shutdown needs
- Systems with budget or rate limit enforcement
- Compliance requirements for immediate termination capability
- High-risk AI agent deployments

## When NOT to Use

- Development/staging environments (simplified controls sufficient)
- Single-tenant deployments with simpler shutdown needs
- Stateless services without persistent agent sessions

## Architecture

### Kill Switch Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Kill Switch Registry                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 PLATFORM LEVEL                        │   │
│  │   EMERGENCY_HALT_ALL                                  │   │
│  │       Requires: 2 approvers (admin + oncall)         │   │
│  │       Effect: All agents, all tenants                │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼ cascade                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 TENANT LEVEL                          │   │
│  │   TENANT_AGENT_HALT                                   │   │
│  │       Auto-trigger: budget_exceeded, safety_violation│   │
│  │       Effect: All agents for tenant                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼ cascade                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 AGENT LEVEL                           │   │
│  │   AGENT_SUSPEND                                       │   │
│  │       Auto-trigger: tool_abuse, infinite_loop        │   │
│  │       Effect: Single agent instance                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Registry Schema (P1-01)

```yaml
kill_switch_registry:
  version: "1.0.0"
  bam_controlled: true
  
  switches:
    global:
      id: string
      scope: enum[platform]
      requires_approval: bool
      approvers: list[string]
      cooldown_seconds: int
        
    tenant_scoped:
      id: string
      scope: enum[tenant]
      auto_trigger_on: list[string]
      manual_trigger: bool
        
    agent_scoped:
      id: string
      scope: enum[agent]
      auto_trigger_on: list[string]
        
  propagation:
    cascade_down: bool
    notify_upstream: bool
    notification_channels: list[string]
    
  recovery:
    requires_manual_reset: enum[always, on_safety, never]
    cooldown_seconds: int
    post_recovery_verification: bool
    
  audit:
    log_all_activations: bool
    log_all_recoveries: bool
    alert_channel: string
    retention_days: int
```

### Auto-Trigger Configuration (P1-02)

```yaml
auto_triggers:
  budget_exceeded:
    condition: string
    switch: string
    grace_period_seconds: int
    
  safety_violation:
    condition: string
    switch: string
    grace_period_seconds: int
    
  tool_abuse:
    condition: string
    switch: string
    grace_period_seconds: int
    
  infinite_loop:
    condition: string
    switch: string
    grace_period_seconds: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Manual only | Full control | Slow response | Low-risk systems |
| Auto-trigger only | Fast response | Risk of false positives | Budget enforcement |
| Hybrid (manual + auto) | Balanced | Complexity | Production SaaS |
| Multi-approval | Safety | Slow for emergencies | High-stakes |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Unauthorized activation | Multi-approver for global switches |
| Denial of service | Rate limit switch activations |
| Failed recovery | Post-recovery verification checks |
| Audit gap | Immutable audit log, 365-day retention |

## Web Research Queries

- "AI agent kill switch patterns {date}"
- "emergency shutdown multi-tenant systems {date}"
- "circuit breaker vs kill switch patterns {date}"
- "agent safety automatic shutdown {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-IR1 | Kill switch registry implemented |

## Related Patterns

- [incident-response.md](incident-response.md) - Incident handling
- [circuit-breaker.md](circuit-breaker.md) - Graceful degradation
- [runtime-loops.md](runtime-loops.md) - Recovery loop
```

---

### Task 5: Create invisible-failure-detector.md

**Files:**
- Create: `src-v2/data/patterns/invisible-failure-detector.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: invisible-failure-detector
shortcode: ZIF
category: operations
qg_ref: QG-AI2
version: 1.0.0
last_reviewed: 2026-04-30
---

# Invisible Failure Detector - BAM Pattern

**Loaded by:** ZIF  
**Applies to:** Detecting AI failures that don't throw exceptions but produce degraded outputs  
**See also:** [ai-observability.md](ai-observability.md), [circuit-breaker.md](circuit-breaker.md)

---

## When to Use

- AI systems where output quality degradation isn't immediately obvious
- LLM responses that may be coherent but factually wrong
- Agents that complete tasks but with suboptimal results
- Systems requiring quality SLAs per tenant tier
- Production environments with business-critical AI features

## When NOT to Use

- Development environments (manual review sufficient)
- Systems with clear pass/fail outputs
- Batch processing with post-hoc review
- Low-stakes AI features

## Architecture

### Detection Method Stack

```
┌─────────────────────────────────────────────────────────────┐
│               Invisible Failure Detection                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Output Quality Scoring                                 │ │
│  │   • Coherence score (semantic consistency)             │ │
│  │   • Relevance score (query-response alignment)         │ │
│  │   • Completeness score (task coverage)                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Baseline Comparison                                    │ │
│  │   • Historical output distribution                     │ │
│  │   • Rolling baseline window                            │ │
│  │   • Drift threshold detection                          │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Response Time Anomaly                                  │ │
│  │   • p99 latency baseline                               │ │
│  │   • Anomaly detection                                  │ │
│  │   • Correlate with quality drop                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Empty/Minimal Response Detection                       │ │
│  │   • Min response length check                          │ │
│  │   • Refusal pattern detection                          │ │
│  │   • Repetitive output detection                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Detection Configuration Schema (P1-01)

```yaml
invisible_failure_detection:
  version: "1.0.0"
  bam_controlled: true
  
  detection_methods:
    output_quality_scoring:
      enabled: bool
      metrics: list[string]
      threshold: float
      
    baseline_comparison:
      enabled: bool
      baseline_window_hours: int
      drift_threshold_percent: int
      
    response_time_anomaly:
      enabled: bool
      p99_multiplier: float
      
    empty_response_detection:
      enabled: bool
      min_response_length: int
      refusal_patterns: list[string]
      
  tenant_configuration:
    per_tenant_baselines: bool
    tier_thresholds:
      free: float
      pro: float
      enterprise: float
      
  alerting:
    on_degradation:
      severity: enum[info, warning, critical]
      auto_escalate_after_minutes: int
    on_failure:
      severity: enum[info, warning, critical]
      page_oncall: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Quality scoring only | Fast, cheap | May miss subtle issues | MVP |
| Baseline comparison | Catches drift | Needs historical data | Mature systems |
| Full stack | Best coverage | Complexity, cost | Production SaaS |
| Per-tenant baselines | Accurate | Storage overhead | Multi-tenant |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Alert fatigue | Deduplication, severity levels |
| Baseline poisoning | Anomaly detection on baseline updates |
| Privacy in logging | Redact PII from quality logs |
| Performance impact | Sample-based scoring for high volume |

## Web Research Queries

- "AI output quality monitoring patterns {date}"
- "invisible failure detection machine learning {date}"
- "LLM response quality scoring {date}"
- "silent degradation detection AI systems {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI2 | Invisible failure detection implemented |

## Related Patterns

- [ai-observability.md](ai-observability.md) - AI monitoring
- [circuit-breaker.md](circuit-breaker.md) - Failure handling
- [output-drift-monitor.md](output-drift-monitor.md) - Drift detection
```

---

### Task 6: Create grounding-verifier.md

**Files:**
- Create: `src-v2/data/patterns/grounding-verifier.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: grounding-verifier
shortcode: ZGV
category: ai-runtime
qg_ref: QG-AI3
version: 1.0.0
last_reviewed: 2026-04-30
---

# Grounding Verifier - BAM Pattern

**Loaded by:** ZGV  
**Applies to:** Verifying AI outputs are grounded in retrieved context, preventing hallucination  
**See also:** [ai-verification.md](ai-verification.md), [ai-safety.md](ai-safety.md)

---

## When to Use

- RAG (Retrieval-Augmented Generation) systems
- AI features requiring factual accuracy
- Legal, medical, or financial AI applications
- Customer support AI with knowledge bases
- Multi-tenant systems with tenant-specific documents

## When NOT to Use

- Creative writing or brainstorming AI features
- Conversational AI without knowledge bases
- Systems where hallucination is acceptable
- Development/prototyping phases

## Architecture

### Verification Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   Grounding Verification                     │
│                                                              │
│  Retrieved Context          LLM Response                     │
│        │                         │                           │
│        ▼                         ▼                           │
│  ┌───────────┐             ┌───────────┐                    │
│  │  Source   │             │  Claims   │                    │
│  │ Documents │             │ Extractor │                    │
│  └─────┬─────┘             └─────┬─────┘                    │
│        │                         │                           │
│        └──────────┬──────────────┘                          │
│                   ▼                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Citation Verification                      │ │
│  │   • Match claims to source passages                     │ │
│  │   • Flag unsourced assertions                           │ │
│  └────────────────────────────────────────────────────────┘ │
│                   │                                          │
│                   ▼                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Semantic Similarity                        │ │
│  │   • Embedding comparison                                │ │
│  │   • Cross-reference verification                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                   │                                          │
│                   ▼                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Factual Consistency                        │ │
│  │   • Contradiction detection                             │ │
│  │   • Entailment verification                             │ │
│  └────────────────────────────────────────────────────────┘ │
│                   │                                          │
│                   ▼                                          │
│           Confidence Score + Actions                         │
└─────────────────────────────────────────────────────────────┘
```

### Verification Configuration Schema (P1-01)

```yaml
grounding_verification:
  version: "1.0.0"
  bam_controlled: true
  
  verification_methods:
    citation_check:
      enabled: bool
      require_source_attribution: bool
      max_unsourced_claims: int
      
    semantic_similarity:
      enabled: bool
      model: string
      threshold: float
      
    factual_consistency:
      enabled: bool
      cross_reference_sources: bool
      contradiction_threshold: float
      
  source_management:
    tenant_document_scope: bool
    shared_knowledge_base: enum[required, optional, disabled]
    
  output_actions:
    on_ungrounded:
      action: enum[flag, regenerate, block]
      max_regeneration_attempts: int
      
    confidence_scoring:
      include_in_response: bool
      format: enum[numeric, categorical, hidden]
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Citation only | Fast, simple | Misses paraphrasing | MVP |
| Semantic similarity | Catches paraphrasing | Compute cost | Standard |
| Full verification | Best accuracy | High latency | Enterprise |
| Regenerate on fail | Better output | Cost, latency | Critical apps |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Cross-tenant data leak | Strict tenant document scope |
| Adversarial sources | Source validation before indexing |
| Confidence manipulation | Server-side scoring only |
| Performance DoS | Rate limit verification requests |

## Web Research Queries

- "RAG grounding verification patterns {date}"
- "LLM hallucination detection techniques {date}"
- "citation verification AI systems {date}"
- "factual consistency checking NLP {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI3 | Grounding verification implemented |

## Related Patterns

- [ai-verification.md](ai-verification.md) - AI output verification
- [ai-safety.md](ai-safety.md) - Safety controls
- [decision-verification.md](decision-verification.md) - Decision validation
```

---

### Task 7: Create decision-verification.md

**Files:**
- Create: `src-v2/data/patterns/decision-verification.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: decision-verification
shortcode: ZDV
category: ai-runtime
qg_ref: QG-AI3
version: 1.0.0
last_reviewed: 2026-04-30
---

# Decision Verification - BAM Pattern

**Loaded by:** ZDV  
**Applies to:** Verifying agent decisions before execution, especially for high-impact actions  
**See also:** [action-contract.md](action-contract.md), [ai-safety.md](ai-safety.md)

---

## When to Use

- AI agents with tool execution capabilities
- Autonomous systems performing external actions
- Multi-step workflows with irreversible operations
- Financial, legal, or safety-critical AI applications
- Systems requiring audit trails for AI decisions

## When NOT to Use

- Read-only AI assistants
- Conversational AI without action capabilities
- Low-stakes recommendation systems
- Development environments

## Architecture

### Verification Gate Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   Decision Verification                      │
│                                                              │
│  Agent Decision                                              │
│        │                                                     │
│        ▼                                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Impact Assessment                          │ │
│  │   LOW: read-only operations                             │ │
│  │   MEDIUM: reversible mutations                          │ │
│  │   HIGH: irreversible or external actions                │ │
│  └────────────────────────────────────────────────────────┘ │
│        │                                                     │
│        ├── LOW ──────────────────────► Auto-approve         │
│        │                                                     │
│        ├── MEDIUM ───► Automated Checks ───► Execute/Reject │
│        │                                                     │
│        └── HIGH ────► Human Approval Gate ───► Execute/Reject│
└─────────────────────────────────────────────────────────────┘
```

### Verification Configuration Schema (P1-01)

```yaml
decision_verification:
  version: "1.0.0"
  bam_controlled: true
  
  verification_gates:
    impact_assessment:
      enabled: bool
      classifications:
        low: string
        medium: string
        high: string
        
    human_approval:
      required_for: list[string]
      optional_for: list[string]
      timeout_minutes: int
      default_on_timeout: enum[approve, reject]
      
    automated_checks:
      enabled: bool
      checks: list[string]
        
  reversibility:
    track_undo_capability: bool
    require_compensation_action: bool
    
  audit:
    log_all_decisions: bool
    include_reasoning: bool
    retention_days: int
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Auto-approve all | Fast | Risky | Dev/test only |
| Automated checks | Balanced | Misses edge cases | Standard |
| Human gate for high | Safe | Slow, expensive | Critical actions |
| Full HITL | Maximum safety | Not scalable | Regulated industries |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Approval bypass | Server-side enforcement, audit log |
| Timeout exploitation | Conservative default (reject) |
| Stale approvals | Time-bound approval tokens |
| Audit tampering | Immutable audit log |

## Web Research Queries

- "AI agent decision verification patterns {date}"
- "human-in-the-loop AI systems {date}"
- "impact assessment automated actions {date}"
- "reversible action design patterns {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI3 | Decision verification implemented |

## Related Patterns

- [action-contract.md](action-contract.md) - Action validation
- [ai-safety.md](ai-safety.md) - Safety controls
- [grounding-verifier.md](grounding-verifier.md) - Output verification
```

---

### Task 8: Create output-drift-monitor.md

**Files:**
- Create: `src-v2/data/patterns/output-drift-monitor.md`

- [ ] **Step 1: Create pattern file**

```markdown
---
pattern_id: output-drift-monitor
shortcode: ZOD
category: ai-runtime
qg_ref: QG-AI2
version: 1.0.0
last_reviewed: 2026-04-30
---

# Output Drift Monitor - BAM Pattern

**Loaded by:** ZOD  
**Applies to:** Monitoring AI output quality over time to detect model drift  
**See also:** [ai-observability.md](ai-observability.md), [invisible-failure-detector.md](invisible-failure-detector.md)

---

## When to Use

- Production AI systems with quality SLAs
- LLM-powered features requiring consistent behavior
- Systems sensitive to model updates or fine-tuning
- Multi-tenant platforms with per-tenant quality monitoring
- Regulated environments requiring quality documentation

## When NOT to Use

- Development/staging environments
- AI features without quality requirements
- Systems with frequent intentional output changes
- Short-lived deployments

## Architecture

### Drift Detection Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   Output Drift Monitoring                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Baseline Establishment                 │ │
│  │   Period: configurable | Sample: configurable          │ │
│  │   Metrics: length, sentiment, topic, quality score     │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Continuous Collection                  │ │
│  │   Window: rolling | Sampling: configurable rate        │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Drift Detection                        │ │
│  │   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐     │ │
│  │   │ Statistical │ │  Embedding  │ │ Categorical │     │ │
│  │   │  (KS Test)  │ │  (Cosine)   │ │(Chi-Squared)│     │ │
│  │   └─────────────┘ └─────────────┘ └─────────────┘     │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Alert & Action                         │ │
│  │   Warning: drift > threshold | Critical: drift > 2x    │ │
│  │   Auto-rollback: optional                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Monitoring Configuration Schema (P1-01)

```yaml
output_drift_monitoring:
  version: "1.0.0"
  bam_controlled: true
  
  baseline:
    establishment_period_days: int
    sample_size: int
    metrics: list[string]
      
  drift_detection:
    methods:
      statistical: string
      embedding: string
      categorical: string
    window_hours: int
    comparison_period_days: int
    
  thresholds:
    warning: float
    critical: float
    
  tenant_segmentation:
    per_tenant_baselines: bool
    aggregate_platform_baseline: bool
    
  alerting:
    on_drift:
      notify: list[string]
      auto_rollback: enum[enabled, disabled, optional]
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Statistical only | Fast, cheap | May miss semantic drift | Cost-conscious |
| Embedding-based | Catches semantic changes | Compute cost | Quality-focused |
| Per-tenant baselines | Accurate per customer | Storage overhead | Multi-tenant |
| Auto-rollback | Fast response | Risk of false positive rollback | Critical systems |

## Security Considerations

| Risk | Mitigation |
|------|------------|
| Baseline manipulation | Anomaly detection on baseline updates |
| Alert fatigue | Configurable thresholds, deduplication |
| Privacy in metrics | Aggregate metrics only, no raw content |
| Performance impact | Sampling for high-volume systems |

## Web Research Queries

- "ML model drift detection patterns {date}"
- "LLM output quality monitoring {date}"
- "statistical drift detection techniques {date}"
- "embedding-based drift detection {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI2 | Output drift monitoring implemented |

## Related Patterns

- [ai-observability.md](ai-observability.md) - AI monitoring
- [invisible-failure-detector.md](invisible-failure-detector.md) - Silent failure detection
- [ai-verification.md](ai-verification.md) - Output verification
```

---

### Task 9: Enhance agent-orchestration.md with Agent Registry

**Files:**
- Modify: `src-v2/data/patterns/agent-orchestration.md`

- [ ] **Step 1: Add Agent Registry section before Quality Gate Alignment**

Insert this section before `## Quality Gate Alignment`:

```markdown
---

## Agent Registry Pattern (P3-01)

Centralized registry for all deployed agents with capability discovery and lifecycle management.

### Registry Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Agent Registry                          │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 Registry Storage                      │   │
│  │   Persistent store + cache layer                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│         ┌─────────────────┼─────────────────┐               │
│         ▼                 ▼                 ▼               │
│  ┌────────────┐   ┌────────────┐   ┌────────────┐          │
│  │  Register  │   │  Discover  │   │  Lifecycle │          │
│  │   Agent    │   │   Agents   │   │   Manage   │          │
│  └────────────┘   └────────────┘   └────────────┘          │
│         │                 │                 │               │
│         ▼                 ▼                 ▼               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Tenant-Scoped Views                      │   │
│  │   Global agents | Tenant agents | User agents        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Registry Schema

```yaml
agent_registry:
  version: "1.0.0"
  bam_controlled: true
  
  agent_definition:
    id: string
    name: string
    version: semver
    tenant_scope: enum[global, tenant, user]
    
  capabilities:
    tools: list[tool_id]
    permissions: list[permission]
    resource_limits:
      max_tokens_per_request: int
      max_concurrent_executions: int
      
  lifecycle:
    status: enum[active, suspended, deprecated, retired]
    created_at: timestamp
    updated_at: timestamp
    
  discovery:
    tags: list[string]
    searchable: bool
    public_to_tenant: bool
```

### Registry Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Centralized registry | Single source of truth | Single point of failure | Small-medium deployments |
| Federated registry | Resilient, scalable | Consistency challenges | Large distributed systems |
| Sidecar discovery | Low latency | Complex deployment | Microservices |
```

---

### Task 10: Add TOML Menu Entries

**Files:**
- Modify: `src-v2/customize/bmad-agent-security.toml`
- Modify: `src-v2/customize/bmad-agent-architect.toml`

- [ ] **Step 1: Add security pattern menu entries to bmad-agent-security.toml**

Append to `[[agent.menu]]` section:

```toml
[[agent.menu]]
code = "ZPD"
description = "Load: Prompt Injection Detection pattern"
prompt = """
Loading prompt injection detection pattern:
`{project-root}/_bmad/bam/data/patterns/prompt-injection-detection.md`

Use web search for current implementation:
- "prompt injection detection patterns {date}"
- "LLM jailbreak prevention techniques {date}"

Confirm loaded. Ready for prompt injection defense guidance.
"""

[[agent.menu]]
code = "ZKS"
description = "Load: Kill Switch Registry pattern"
prompt = """
Loading kill switch registry pattern:
`{project-root}/_bmad/bam/data/patterns/kill-switch-registry.md`

Use web search for current implementation:
- "AI agent kill switch patterns {date}"
- "emergency shutdown multi-tenant systems {date}"

Confirm loaded. Ready for emergency shutdown design.
"""
```

- [ ] **Step 2: Add AI runtime pattern menu entries to bmad-agent-architect.toml**

Append to `[[agent.menu]]` section:

```toml
[[agent.menu]]
code = "ZGV"
description = "Load: Grounding Verifier pattern"
prompt = """
Loading grounding verifier pattern:
`{project-root}/_bmad/bam/data/patterns/grounding-verifier.md`

Use web search for current implementation:
- "RAG grounding verification patterns {date}"
- "LLM hallucination detection techniques {date}"

Confirm loaded. Ready for grounding verification design.
"""

[[agent.menu]]
code = "ZDV"
description = "Load: Decision Verification pattern"
prompt = """
Loading decision verification pattern:
`{project-root}/_bmad/bam/data/patterns/decision-verification.md`

Use web search for current implementation:
- "AI agent decision verification patterns {date}"
- "human-in-the-loop AI systems {date}"

Confirm loaded. Ready for decision verification design.
"""

[[agent.menu]]
code = "ZOD"
description = "Load: Output Drift Monitor pattern"
prompt = """
Loading output drift monitor pattern:
`{project-root}/_bmad/bam/data/patterns/output-drift-monitor.md`

Use web search for current implementation:
- "ML model drift detection patterns {date}"
- "LLM output quality monitoring {date}"

Confirm loaded. Ready for drift monitoring design.
"""

[[agent.menu]]
code = "ZIF"
description = "Load: Invisible Failure Detector pattern"
prompt = """
Loading invisible failure detector pattern:
`{project-root}/_bmad/bam/data/patterns/invisible-failure-detector.md`

Use web search for current implementation:
- "AI output quality monitoring patterns {date}"
- "silent degradation detection AI systems {date}"

Confirm loaded. Ready for invisible failure detection design.
"""
```

---

### Task 11: Update Domain Files with Pattern References

**Files:**
- Modify: `src-v2/data/domains/security.md`
- Modify: `src-v2/data/domains/ai-runtime.md`

- [ ] **Step 1: Add pattern references to security.md**

Add to Related Patterns section:

```markdown
## Related Patterns

- `{project-root}/_bmad/bam/data/patterns/zero-trust.md` - Trust boundaries
- `{project-root}/_bmad/bam/data/patterns/sso-auth.md` - Authentication patterns
- `{project-root}/_bmad/bam/data/patterns/secrets-management.md` - Secret handling
- `{project-root}/_bmad/bam/data/patterns/prompt-injection-detection.md` - Input attack prevention
- `{project-root}/_bmad/bam/data/patterns/kill-switch-registry.md` - Emergency shutdown

**Web Research:**
- Search: "prompt injection detection patterns {date}"
- Search: "AI agent kill switch patterns {date}"
```

- [ ] **Step 2: Add pattern references to ai-runtime.md**

Add to Related Patterns section or create new section:

```markdown
## Related Patterns

**Detailed Patterns:**
- `{project-root}/_bmad/bam/data/patterns/langgraph.md` - State machine runtime
- `{project-root}/_bmad/bam/data/patterns/agent-orchestration.md` - CrewAI, AutoGen, Saga
- `{project-root}/_bmad/bam/data/patterns/grounding-verifier.md` - RAG verification
- `{project-root}/_bmad/bam/data/patterns/decision-verification.md` - Pre-execution gates
- `{project-root}/_bmad/bam/data/patterns/output-drift-monitor.md` - Quality monitoring
- `{project-root}/_bmad/bam/data/patterns/invisible-failure-detector.md` - Silent failure detection

**Web Research:**
- Search: "AI agent orchestration multi-tenant patterns {date}"
- Search: "RAG grounding verification patterns {date}"
- Search: "ML model drift detection patterns {date}"
```

---

### Task 12: Run Full Test Suite and Commit

**Files:**
- All modified files

- [ ] **Step 1: Run pattern standards tests**

Run: `npm test -- test/v2/pattern-standards.test.js`
Expected: PASS (27 patterns exist, no implementation code)

- [ ] **Step 2: Run CSV schema tests**

Run: `npm test -- test/v2/csv-schema.test.js`
Expected: PASS

- [ ] **Step 3: Run full V2 test suite**

Run: `npm test -- test/v2/`
Expected: All tests PASS

- [ ] **Step 4: Verify BMAD compatibility checklist**

For each of the 9 new patterns, verify:
- [ ] CSV row exists with `web_queries` containing `{date}`
- [ ] Pattern .md exists (for 6 Innovation patterns)
- [ ] No implementation code in pattern files
- [ ] TOML menu entry exists with shortcode
- [ ] Domain file references the pattern

- [ ] **Step 5: Commit all changes**

```bash
git add src-v2/data/patterns/*.md \
        src-v2/data/bam-patterns.csv \
        src-v2/customize/*.toml \
        src-v2/data/domains/*.md \
        test/v2/pattern-standards.test.js

git commit -m "feat: add NEXUS Phase 1 patterns with full BMAD compatibility

BMAD Compatibility:
- 9 CSV rows in bam-patterns.csv with web_queries containing {date}
- 6 Innovation-tier pattern files with YAML schemas (no impl code)
- 1 Structural enhancement (agent-registry in agent-orchestration.md)
- 6 TOML menu entries with web search prompts
- 2 Domain file updates with pattern references

Patterns Added:
- prompt-injection-detection.md (ZPD) - L3 Guardrails
- kill-switch-registry.md (ZKS) - L40 Failure
- invisible-failure-detector.md (ZIF) - L5 Observability
- grounding-verifier.md (ZGV) - L2 RAG
- decision-verification.md (ZDV) - L24 Neuro
- output-drift-monitor.md (ZOD) - L30 Alignment
- fan-out-circuit-breaker (ZFC) - CSV-only
- regulatory-clock-engine (ZRC) - CSV-only
- blast-radius-simulator (ZBR) - CSV-only

No Knowledge Decay:
- All patterns use web_queries with {date} placeholder
- No implementation code in any pattern file
- YAML schemas define contracts, not implementations

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

- [ ] **Step 6: Push changes**

```bash
git push origin main
```

---

## BMAD Compatibility Verification Checklist

After all tasks complete, verify:

| Pattern | CSV Row | .md File | TOML Menu | Domain Ref | No Impl Code |
|---------|---------|----------|-----------|------------|--------------|
| prompt-injection-detection | ✓ | ✓ | ✓ | security.md | ✓ |
| kill-switch-registry | ✓ | ✓ | ✓ | security.md | ✓ |
| invisible-failure-detector | ✓ | ✓ | ✓ | ai-runtime.md | ✓ |
| grounding-verifier | ✓ | ✓ | ✓ | ai-runtime.md | ✓ |
| decision-verification | ✓ | ✓ | ✓ | ai-runtime.md | ✓ |
| output-drift-monitor | ✓ | ✓ | ✓ | ai-runtime.md | ✓ |
| fan-out-circuit-breaker | ✓ | N/A | N/A | ai-runtime.md | N/A |
| regulatory-clock-engine | ✓ | N/A | N/A | compliance.md | N/A |
| blast-radius-simulator | ✓ | N/A | N/A | operations.md | N/A |

## Knowledge Decay Prevention

All patterns follow these anti-decay rules:
- ✅ `web_queries` column has `{date}` placeholder in CSV
- ✅ Pattern files have `## Web Research Queries` section with `{date}`
- ✅ TOML prompts include web search with `{date}`
- ✅ No TypeScript, Python, or JavaScript code in patterns
- ✅ YAML schemas define structure, not implementation
