# NEXUS Patterns Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Top 10 Critical missing NEXUS patterns to BAM V2, following the established Pattern Tiered Architecture.

**Architecture:** 6 new Innovation-tier pattern files with YAML frontmatter and schemas, 1 Structural enhancement to agent-orchestration.md, and 3 CSV-only registry entries. All patterns follow the established template with no implementation code.

**Tech Stack:** Markdown, YAML frontmatter, CSV, Jest

---

## File Structure

**Create (6 files):**
- `src-v2/data/patterns/prompt-injection-detection.md` - L3 Guardrails security pattern
- `src-v2/data/patterns/kill-switch-registry.md` - L40 Failure operations pattern
- `src-v2/data/patterns/invisible-failure-detector.md` - L5 Observability operations pattern
- `src-v2/data/patterns/grounding-verifier.md` - L2 RAG ai-runtime pattern
- `src-v2/data/patterns/decision-verification.md` - L24 Neuro ai-runtime pattern
- `src-v2/data/patterns/output-drift-monitor.md` - L30 Alignment ai-runtime pattern

**Modify (3 files):**
- `src-v2/data/patterns/agent-orchestration.md` - Add Agent Registry section
- `src-v2/data/bam-patterns.csv` - Add 3 CSV-only pattern entries
- `test/v2/pattern-standards.test.js` - Update expected count from 21 to 27

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

- [ ] **Step 3: Commit the failing test**

```bash
git add test/v2/pattern-standards.test.js
git commit -m "test: expect 27 patterns after NEXUS Phase 1"
```

---

### Task 2: Create prompt-injection-detection.md

**Files:**
- Create: `src-v2/data/patterns/prompt-injection-detection.md`

- [ ] **Step 1: Create the pattern file**

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

### Detection Configuration (P1-01)

```yaml
prompt_injection_detection:
  version: "1.0.0"
  
  detection_layers:
    input_sanitization:
      enabled: true
      strip_control_chars: true
      normalize_unicode: true
      max_input_length: 32000
      
    pattern_matching:
      enabled: true
      patterns:
        - "ignore previous instructions"
        - "disregard above"
        - "system prompt override"
        - "you are now"
        - "forget everything"
      case_insensitive: true
      
    canary_detection:
      enabled: true
      canary_format: "{{CANARY_TOKEN}}"
      alert_on_leak: true
      
    ml_classifier:
      enabled: optional
      model: "injection-classifier-v1"
      threshold: 0.85
      
  response_actions:
    on_detection:
      action: enum[block, flag, sanitize, allow_with_warning]
      log_level: "security"
      alert_threshold: 5_per_minute
      
  tenant_isolation:
    per_tenant_patterns: true
    shared_blocklist: true
```

### Tenant-Aware Configuration (P1-02)

```yaml
tenant_config:
  tier_settings:
    free:
      detection_layers: [input_sanitization, pattern_matching]
      ml_classifier: false
      alert_on_detection: false
      
    pro:
      detection_layers: [input_sanitization, pattern_matching, canary_detection]
      ml_classifier: false
      alert_on_detection: true
      
    enterprise:
      detection_layers: [input_sanitization, pattern_matching, canary_detection, ml_classifier]
      ml_classifier: true
      custom_patterns: true
      alert_on_detection: true
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

- [ ] **Step 2: Verify file created correctly**

Run: `head -20 src-v2/data/patterns/prompt-injection-detection.md`
Expected: YAML frontmatter with pattern_id: prompt-injection-detection

- [ ] **Step 3: Run tests to verify pattern count increased**

Run: `npm test -- test/v2/pattern-standards.test.js`
Expected: Still failing (22 patterns, need 27)

---

### Task 3: Create kill-switch-registry.md

**Files:**
- Create: `src-v2/data/patterns/kill-switch-registry.md`

- [ ] **Step 1: Create the pattern file**

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
- Systems without real-time control requirements

## Architecture

### Kill Switch Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Kill Switch Registry                      │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 PLATFORM LEVEL                        │   │
│  │   EMERGENCY_HALT_ALL ──────────────────────────────► │   │
│  │       Requires: 2 approvers (admin + oncall)         │   │
│  │       Effect: All agents, all tenants                │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼ cascade                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 TENANT LEVEL                          │   │
│  │   TENANT_AGENT_HALT ─────────────────────────────►   │   │
│  │       Auto-trigger: budget_exceeded, safety_violation│   │
│  │       Effect: All agents for tenant                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                  │
│                           ▼ cascade                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 AGENT LEVEL                           │   │
│  │   AGENT_SUSPEND ─────────────────────────────────►   │   │
│  │       Auto-trigger: tool_abuse, infinite_loop        │   │
│  │       Effect: Single agent instance                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Registry Schema (P1-01)

```yaml
kill_switch_registry:
  version: "1.0.0"
  
  switches:
    global:
      - id: "EMERGENCY_HALT_ALL"
        scope: "platform"
        requires_approval: true
        approvers: ["platform_admin", "oncall_lead"]
        cooldown_seconds: 0
        
    tenant_scoped:
      - id: "TENANT_AGENT_HALT"
        scope: "tenant"
        auto_trigger_on: ["budget_exceeded", "safety_violation"]
        manual_trigger: true
        
    agent_scoped:
      - id: "AGENT_SUSPEND"
        scope: "agent"
        auto_trigger_on: ["tool_abuse", "infinite_loop", "context_overflow"]
        
  propagation:
    cascade_down: true
    notify_upstream: true
    notification_channels: ["slack", "pagerduty", "email"]
    
  recovery:
    requires_manual_reset: enum[always, on_safety, never]
    cooldown_seconds: 300
    post_recovery_verification: true
    
  audit:
    log_all_activations: true
    log_all_recoveries: true
    alert_channel: "security-critical"
    retention_days: 365
```

### Auto-Trigger Configuration (P1-02)

```yaml
auto_triggers:
  budget_exceeded:
    condition: "tenant.usage >= tenant.budget * 1.0"
    switch: "TENANT_AGENT_HALT"
    grace_period_seconds: 60
    
  safety_violation:
    condition: "safety_score < 0.5 OR blocked_actions > 10"
    switch: "TENANT_AGENT_HALT"
    grace_period_seconds: 0
    
  tool_abuse:
    condition: "failed_tool_calls > 50 in 1m"
    switch: "AGENT_SUSPEND"
    grace_period_seconds: 0
    
  infinite_loop:
    condition: "identical_action_count > 5"
    switch: "AGENT_SUSPEND"
    grace_period_seconds: 0
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

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/kill-switch-registry.md`
Expected: File exists

---

### Task 4: Create invisible-failure-detector.md

**Files:**
- Create: `src-v2/data/patterns/invisible-failure-detector.md`

- [ ] **Step 1: Create the pattern file**

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
- Low-stakes AI features (recommendations, suggestions)

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
│  │   ──────────────────────────────────────────────────── │ │
│  │   Threshold: 0.7 (configurable per tier)               │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Baseline Comparison                                    │ │
│  │   • Historical output distribution                     │ │
│  │   • Rolling 7-day baseline                             │ │
│  │   • Drift threshold: 15%                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Response Time Anomaly                                  │ │
│  │   • p99 latency baseline                               │ │
│  │   • Anomaly: > 3x baseline                             │ │
│  │   • Correlate with quality drop                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Empty/Minimal Response Detection                       │ │
│  │   • Min response length: 10 chars                      │ │
│  │   • Refusal pattern detection                          │ │
│  │   • Repetitive output detection                        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Detection Configuration (P1-01)

```yaml
invisible_failure_detection:
  version: "1.0.0"
  
  detection_methods:
    output_quality_scoring:
      enabled: true
      metrics:
        - coherence_score
        - relevance_score
        - completeness_score
      threshold: 0.7
      
    baseline_comparison:
      enabled: true
      baseline_window_hours: 168
      drift_threshold_percent: 15
      
    response_time_anomaly:
      enabled: true
      p99_multiplier: 3.0
      
    empty_response_detection:
      enabled: true
      min_response_length: 10
      refusal_patterns:
        - "I cannot"
        - "I'm unable"
        - "As an AI"
      
  tenant_configuration:
    per_tenant_baselines: true
    tier_thresholds:
      free: 0.6
      pro: 0.75
      enterprise: 0.85
      
  alerting:
    on_degradation:
      severity: "warning"
      auto_escalate_after_minutes: 30
    on_failure:
      severity: "critical"
      page_oncall: true
```

### Metric Collection (P1-02)

```yaml
metrics:
  quality_scores:
    collection: per_request
    storage: timeseries_db
    retention_days: 30
    
  baselines:
    calculation: rolling_7_day
    update_frequency: hourly
    per_tenant: true
    
  alerts:
    deduplication_window: 5_minutes
    escalation_path: ["slack", "pagerduty"]
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

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/invisible-failure-detector.md`
Expected: File exists

---

### Task 5: Create grounding-verifier.md

**Files:**
- Create: `src-v2/data/patterns/grounding-verifier.md`

- [ ] **Step 1: Create the pattern file**

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
- Systems where hallucination is acceptable (fiction, ideation)
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
│  │   • Embedding comparison (threshold: 0.75)              │ │
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

### Verification Configuration (P1-01)

```yaml
grounding_verification:
  version: "1.0.0"
  
  verification_methods:
    citation_check:
      enabled: true
      require_source_attribution: true
      max_unsourced_claims: 2
      
    semantic_similarity:
      enabled: true
      model: "embedding-model"
      threshold: 0.75
      
    factual_consistency:
      enabled: true
      cross_reference_sources: true
      contradiction_threshold: 0.3
      
  source_management:
    tenant_document_scope: true
    shared_knowledge_base: optional
    
  output_actions:
    on_ungrounded:
      action: enum[flag, regenerate, block]
      max_regeneration_attempts: 2
      
    confidence_scoring:
      include_in_response: true
      format: enum[numeric, categorical, hidden]
```

### Tenant Isolation (P1-02)

```yaml
tenant_grounding:
  document_scope:
    strategy: enum[tenant_only, tenant_plus_shared, all]
    default: tenant_only
    
  verification_strictness:
    free: lenient
    pro: standard
    enterprise: strict
    
  shared_knowledge:
    allowed_categories: ["product_docs", "faq"]
    excluded_categories: ["tenant_data", "pii"]
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

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/grounding-verifier.md`
Expected: File exists

---

### Task 6: Create decision-verification.md

**Files:**
- Create: `src-v2/data/patterns/decision-verification.md`

- [ ] **Step 1: Create the pattern file**

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
- Development environments (may relax gates)

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
│        ├── MEDIUM ───► ┌──────────────────────────────────┐ │
│        │               │      Automated Checks             │ │
│        │               │  • Budget available               │ │
│        │               │  • Rate limit OK                  │ │
│        │               │  • Tenant permissions             │ │
│        │               │  • Action contract valid          │ │
│        │               └──────────────────────────────────┘ │
│        │                         │                           │
│        │                         ▼                           │
│        │               Pass? ──► Execute                     │
│        │                    Fail? ──► Reject                 │
│        │                                                     │
│        └── HIGH ────► ┌──────────────────────────────────┐  │
│                       │      Human Approval Gate          │  │
│                       │  • Timeout: 30 minutes            │  │
│                       │  • Default on timeout: Reject     │  │
│                       │  • Escalation path configured     │  │
│                       └──────────────────────────────────┘  │
│                                  │                           │
│                                  ▼                           │
│                        Approved? ──► Execute                 │
│                        Rejected/Timeout ──► Reject           │
└─────────────────────────────────────────────────────────────┘
```

### Verification Configuration (P1-01)

```yaml
decision_verification:
  version: "1.0.0"
  
  verification_gates:
    impact_assessment:
      enabled: true
      classifications:
        low: "read-only operations"
        medium: "reversible mutations"
        high: "irreversible or external actions"
        
    human_approval:
      required_for: ["high"]
      optional_for: ["medium"]
      timeout_minutes: 30
      default_on_timeout: "reject"
      
    automated_checks:
      enabled: true
      checks:
        - budget_available
        - rate_limit_ok
        - tenant_permissions
        - action_contract_valid
        
  reversibility:
    track_undo_capability: true
    require_compensation_action: true
    
  audit:
    log_all_decisions: true
    include_reasoning: true
    retention_days: 365
```

### Impact Classification Rules (P1-02)

```yaml
impact_rules:
  low:
    actions:
      - "read_*"
      - "list_*"
      - "get_*"
      - "search_*"
    
  medium:
    actions:
      - "create_*"
      - "update_*"
      - "delete_draft_*"
    reversible: true
    
  high:
    actions:
      - "delete_*"
      - "publish_*"
      - "send_*"
      - "transfer_*"
      - "execute_*"
    external_effect: true
    irreversible: true
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

- [ ] **Step 2: Verify file created**

Run: `ls -la src-v2/data/patterns/decision-verification.md`
Expected: File exists

---

### Task 7: Create output-drift-monitor.md

**Files:**
- Create: `src-v2/data/patterns/output-drift-monitor.md`

- [ ] **Step 1: Create the pattern file**

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
**Applies to:** Monitoring AI output quality over time to detect model drift and degradation  
**See also:** [ai-observability.md](ai-observability.md), [invisible-failure-detector.md](invisible-failure-detector.md)

---

## When to Use

- Production AI systems with quality SLAs
- LLM-powered features requiring consistent behavior
- Systems sensitive to model updates or fine-tuning changes
- Multi-tenant platforms with per-tenant quality monitoring
- Regulated environments requiring quality documentation

## When NOT to Use

- Development/staging environments
- AI features without quality requirements
- Systems with frequent intentional output changes
- Short-lived or experimental deployments

## Architecture

### Drift Detection Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   Output Drift Monitoring                    │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Baseline Establishment                 │ │
│  │   Period: 7 days | Sample: 1000 outputs                │ │
│  │   Metrics: length, sentiment, topic, quality score     │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                  Continuous Collection                  │ │
│  │   Window: 24 hours rolling                             │ │
│  │   Sampling: 100% or configurable rate                  │ │
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
│  │   Warning: drift > 10%                                 │ │
│  │   Critical: drift > 25%                                │ │
│  │   Auto-rollback: optional                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Monitoring Configuration (P1-01)

```yaml
output_drift_monitoring:
  version: "1.0.0"
  
  baseline:
    establishment_period_days: 7
    sample_size: 1000
    metrics:
      - response_length_distribution
      - sentiment_distribution
      - topic_distribution
      - quality_score_distribution
      
  drift_detection:
    methods:
      statistical: "ks_test"
      embedding: "cosine_distance"
      categorical: "chi_squared"
    window_hours: 24
    comparison_period_days: 7
    
  thresholds:
    warning: 0.1
    critical: 0.25
    
  tenant_segmentation:
    per_tenant_baselines: true
    aggregate_platform_baseline: true
    
  alerting:
    on_drift:
      notify: ["ml_team", "platform_oncall"]
      auto_rollback: optional
```

### Metric Definitions (P1-02)

```yaml
drift_metrics:
  response_length:
    type: continuous
    test: kolmogorov_smirnov
    
  sentiment:
    type: categorical
    categories: [positive, neutral, negative]
    test: chi_squared
    
  topic:
    type: embedding
    model: "topic-embedding-v1"
    test: cosine_distance
    
  quality_score:
    type: continuous
    range: [0, 1]
    test: kolmogorov_smirnov
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

- [ ] **Step 2: Verify file created and run tests**

Run: `ls -la src-v2/data/patterns/output-drift-monitor.md && npm test -- test/v2/pattern-standards.test.js`
Expected: File exists, test still fails (27 patterns expected, 27 now exist - should pass the count test)

---

### Task 8: Enhance agent-orchestration.md with Agent Registry

**Files:**
- Modify: `src-v2/data/patterns/agent-orchestration.md`

- [ ] **Step 1: Read current file to find insertion point**

Run: `tail -50 src-v2/data/patterns/agent-orchestration.md`
Expected: See current end of file structure

- [ ] **Step 2: Add Agent Registry section before Quality Gate Alignment**

Insert before the `## Quality Gate Alignment` section:

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
│  │   PostgreSQL + Redis Cache                           │   │
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

- [ ] **Step 3: Verify the edit**

Run: `grep -n "Agent Registry" src-v2/data/patterns/agent-orchestration.md`
Expected: Line number showing "Agent Registry Pattern"

---

### Task 9: Add CSV-only Pattern Entries

**Files:**
- Modify: `src-v2/data/bam-patterns.csv`

- [ ] **Step 1: Add the 3 new CSV entries**

Append to `src-v2/data/bam-patterns.csv`:

```csv
fan-out-circuit-breaker,Fan-Out Circuit Breaker,ai-runtime,"Multi-agent fan-out with circuit breaker protection","parallel agents,fan-out,failure handling",Protect multi-agent fan-out from cascade failures,,,fan-out circuit breaker multi-agent {date};parallel agent orchestration failure handling {date},QG-M3,,,,agent-orchestration.md,ai-runtime.md,ZFC
regulatory-clock-engine,Regulatory Clock Engine,compliance,"Time-based regulatory compliance automation","GDPR,retention,compliance clock",Automate regulatory time-based requirements,,,regulatory compliance automation {date};GDPR retention clock patterns {date},QG-CC,,,,,,ZRC
blast-radius-simulator,Blast Radius Simulator,operations,"Simulate failure impact before deployment","chaos engineering,blast radius,impact analysis",Simulate and contain failure impact,,,blast radius simulation chaos engineering {date};failure impact analysis patterns {date},QG-DR1,,,,,operations.md,ZBR
```

- [ ] **Step 2: Verify CSV entries added**

Run: `tail -5 src-v2/data/bam-patterns.csv`
Expected: See the 3 new entries

- [ ] **Step 3: Verify unique shortcodes**

Run: `grep -E "ZFC|ZRC|ZBR" src-v2/data/bam-patterns.csv | wc -l`
Expected: 3 (one occurrence each)

---

### Task 10: Run Full Test Suite and Commit

**Files:**
- All pattern files created
- CSV updated

- [ ] **Step 1: Run pattern standards tests**

Run: `npm test -- test/v2/pattern-standards.test.js`
Expected: PASS (27 patterns exist)

- [ ] **Step 2: Run CSV schema tests**

Run: `npm test -- test/v2/csv-schema.test.js`
Expected: PASS

- [ ] **Step 3: Run full V2 test suite**

Run: `npm test -- test/v2/`
Expected: All tests PASS

- [ ] **Step 4: Commit all changes**

```bash
git add src-v2/data/patterns/*.md src-v2/data/bam-patterns.csv test/v2/pattern-standards.test.js
git commit -m "feat: add NEXUS Phase 1 patterns (10 patterns)

- Add 6 Innovation-tier patterns:
  - prompt-injection-detection.md (ZPD) - L3 Guardrails
  - kill-switch-registry.md (ZKS) - L40 Failure
  - invisible-failure-detector.md (ZIF) - L5 Observability
  - grounding-verifier.md (ZGV) - L2 RAG
  - decision-verification.md (ZDV) - L24 Neuro
  - output-drift-monitor.md (ZOD) - L30 Alignment
- Enhance agent-orchestration.md with Agent Registry section
- Add 3 CSV-only patterns: fan-out-circuit-breaker, regulatory-clock-engine, blast-radius-simulator
- Update test expectations from 21 to 27 patterns

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Push changes**

```bash
git push origin main
```

---

## Verification Checklist

After completing all tasks:

- [ ] 27 pattern files exist in `src-v2/data/patterns/`
- [ ] All 6 new patterns have YAML frontmatter with pattern_id, shortcode, category, qg_ref
- [ ] All new patterns have Quality Gate Alignment section
- [ ] All new patterns have Related Patterns section
- [ ] All new patterns have Web Research Queries section
- [ ] agent-orchestration.md contains Agent Registry section
- [ ] bam-patterns.csv has 3 new rows (fan-out-circuit-breaker, regulatory-clock-engine, blast-radius-simulator)
- [ ] All shortcodes unique: ZPD, ZKS, ZIF, ZGV, ZDV, ZOD, ZFC, ZRC, ZBR
- [ ] `npm test -- test/v2/` passes all tests
