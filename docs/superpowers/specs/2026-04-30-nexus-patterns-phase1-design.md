# NEXUS Patterns Phase 1 - Design Spec

## Goal

Add the Top 10 Critical missing NEXUS patterns to BAM V2, following the established Pattern Tiered Architecture (Innovation, Structural, CSV-only tiers).

## Architecture

Phase 1 adds 10 high-value NEXUS patterns identified from the gap analysis:
- 6 Innovation-tier patterns (full markdown files with YAML schemas)
- 1 Structural-tier enhancement (add section to existing pattern)
- 3 CSV-only patterns (registry entries with web queries)

All patterns follow the established template with YAML frontmatter, ASCII diagrams, and no implementation code.

## Tech Stack

- Markdown pattern files with YAML frontmatter
- CSV pattern registry
- Jest tests for validation

---

## Patterns to Implement

### Innovation Tier (New Pattern Files)

#### 1. prompt-injection-detection.md

**Shortcode:** ZPD  
**Category:** security  
**QG Ref:** QG-S6  
**NEXUS Layer:** L3 Guardrails

**Purpose:** Detect and prevent prompt injection attacks in multi-tenant AI systems.

**Key Sections:**
- Input sanitization patterns
- Canary token detection
- Jailbreak attempt classification
- Multi-tenant isolation boundaries
- Real-time vs batch detection trade-offs

**YAML Schema:**
```yaml
prompt_injection_detection:
  version: "1.0.0"
  
  detection_layers:
    input_sanitization:
      enabled: true
      strip_control_chars: true
      normalize_unicode: true
      
    pattern_matching:
      enabled: true
      patterns:
        - "ignore previous instructions"
        - "disregard above"
        - "system prompt override"
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

---

#### 2. kill-switch-registry.md

**Shortcode:** ZKS  
**Category:** operations  
**QG Ref:** QG-IR1  
**NEXUS Layer:** L40 Failure

**Purpose:** Centralized registry for emergency shutdown controls across AI agents and tenant operations.

**Key Sections:**
- Global vs tenant-scoped kill switches
- Cascade propagation rules
- Recovery protocols
- Audit requirements

**YAML Schema:**
```yaml
kill_switch_registry:
  version: "1.0.0"
  
  switches:
    global:
      - id: "EMERGENCY_HALT_ALL"
        scope: "platform"
        requires_approval: true
        approvers: ["platform_admin", "oncall_lead"]
        
    tenant_scoped:
      - id: "TENANT_AGENT_HALT"
        scope: "tenant"
        auto_trigger_on: ["budget_exceeded", "safety_violation"]
        
    agent_scoped:
      - id: "AGENT_SUSPEND"
        scope: "agent"
        auto_trigger_on: ["tool_abuse", "infinite_loop"]
        
  propagation:
    cascade_down: true
    notify_upstream: true
    
  recovery:
    requires_manual_reset: enum[always, on_safety, never]
    cooldown_seconds: 300
    
  audit:
    log_all_activations: true
    alert_channel: "security-critical"
```

---

#### 3. invisible-failure-detector.md

**Shortcode:** ZIF  
**Category:** operations  
**QG Ref:** QG-AI2  
**NEXUS Layer:** L5 Observability

**Purpose:** Detect failures that don't throw exceptions but produce incorrect or degraded outputs.

**Key Sections:**
- Output quality scoring
- Baseline drift detection
- Silent degradation patterns
- Tenant-aware thresholds

**YAML Schema:**
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

---

#### 4. grounding-verifier.md

**Shortcode:** ZGV  
**Category:** ai-runtime  
**QG Ref:** QG-AI3  
**NEXUS Layer:** L2 RAG

**Purpose:** Verify AI outputs are grounded in retrieved context, preventing hallucination.

**Key Sections:**
- Citation verification
- Factual consistency checking
- Source attribution
- Confidence scoring

**YAML Schema:**
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

---

#### 5. decision-verification.md

**Shortcode:** ZDV  
**Category:** ai-runtime  
**QG Ref:** QG-AI3  
**NEXUS Layer:** L24 Neuro

**Purpose:** Verify agent decisions before execution, especially for high-impact actions.

**Key Sections:**
- Pre-execution verification
- Human-in-the-loop gates
- Reversibility assessment
- Impact classification

**YAML Schema:**
```yaml
decision_verification:
  version: "1.0.0"
  
  verification_gates:
    impact_assessment:
      enabled: true
      classifications:
        - low: "read-only operations"
        - medium: "reversible mutations"
        - high: "irreversible or external actions"
        
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
```

---

#### 6. output-drift-monitor.md

**Shortcode:** ZOD  
**Category:** ai-runtime  
**QG Ref:** QG-AI2  
**NEXUS Layer:** L30 Alignment

**Purpose:** Monitor AI output quality over time to detect model drift and degradation.

**Key Sections:**
- Baseline establishment
- Drift metrics
- Alert thresholds
- Per-tenant monitoring

**YAML Schema:**
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
      - statistical: "ks_test"
      - embedding: "cosine_distance"
      - categorical: "chi_squared"
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

---

### Structural Tier (Enhancement to Existing)

#### 7. agent-registry (Add to agent-orchestration.md)

Add new section to existing `agent-orchestration.md`:

```markdown
## Agent Registry Pattern (P3-01)

Centralized registry for all deployed agents with capability discovery and lifecycle management.

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

### Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Centralized registry | Single source of truth | Single point of failure | Small-medium deployments |
| Federated registry | Resilient, scalable | Consistency challenges | Large distributed systems |
| Sidecar discovery | Low latency | Complex deployment | Microservices |
```

---

### CSV-only Tier (Registry Entries)

#### 8. fan-out-circuit-breaker

Add to `bam-patterns.csv`:
```csv
fan-out-circuit-breaker,Fan-Out Circuit Breaker,ai-runtime,Multi-agent fan-out with circuit breaker protection,,,ZFC,QG-M3,"fan-out circuit breaker multi-agent {date};parallel agent orchestration failure handling {date}"
```

#### 9. regulatory-clock-engine

Add to `bam-patterns.csv`:
```csv
regulatory-clock-engine,Regulatory Clock Engine,compliance,Time-based regulatory compliance automation,,,ZRC,QG-CC,"regulatory compliance automation {date};GDPR retention clock patterns {date}"
```

#### 10. blast-radius-simulator

Add to `bam-patterns.csv`:
```csv
blast-radius-simulator,Blast Radius Simulator,operations,Simulate failure impact before deployment,,,ZBR,QG-DR1,"blast radius simulation chaos engineering {date};failure impact analysis patterns {date}"
```

---

## Test Plan

1. **Pattern Structure Tests**
   - All 6 new patterns have required YAML frontmatter
   - All patterns have Quality Gate Alignment section
   - All patterns have Related Patterns section
   - No implementation code in pattern files

2. **CSV Validation**
   - 3 new CSV entries have all required columns
   - Shortcodes are unique (no conflicts with existing)
   - Web queries contain {date} placeholder

3. **Integration Tests**
   - Pattern count increased by 6 (from 21 to 27)
   - CSV row count increased by 3
   - All shortcodes unique across patterns

## Verification Checklist

- [ ] 6 new pattern files created in `src-v2/data/patterns/`
- [ ] agent-orchestration.md enhanced with agent-registry section
- [ ] 3 new rows added to bam-patterns.csv
- [ ] All patterns follow template (frontmatter, sections, no code)
- [ ] Shortcodes verified unique: ZPD, ZKS, ZIF, ZGV, ZDV, ZOD, ZFC, ZRC, ZBR
- [ ] Tests pass: `npm test -- test/v2/`
- [ ] Domain files updated with new pattern references

---

## Future Phases

**Phase 2 (Medium Priority - 15 patterns):**
- Security: semantic-firewall, output-sanitization, rbac-per-tool
- Observability: reasoning-trace-collector, cost-attribution-engine
- Operations: tenant-chaos-injector, incident-correlation-engine
- AI Runtime: tool-schema-versioning, agent-handoff-protocol

**Phase 3 (Lower Priority - 15+ patterns):**
- Remaining NEXUS patterns from gap analysis
- Patterns requiring external service integration
- Experimental/emerging patterns

---

Generated with [Claude Code](https://claude.com/claude-code)
