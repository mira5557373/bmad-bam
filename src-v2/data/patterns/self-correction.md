---
pattern_id: self-correction
shortcode: ZSE
category: advanced-ai
qg_ref: QG-AI1
version: 1.0.0
last_reviewed: 2026-04-30
---

# Self-Correction - BAM Pattern

**Loaded by:** ZSE  
**Applies to:** Self-healing agents, error detection, graceful degradation

---

## When to Use

- Agents that must maintain high reliability without human intervention
- Long-running agent workflows with potential for drift
- Multi-step tasks where errors can compound
- Production systems requiring autonomous error recovery
- Learning from failures to prevent recurrence

## When NOT to Use

- Simple single-shot tasks
- Development/testing environments
- Tasks where human review is mandatory
- When correction loops could cause infinite retries

## Architecture

### Self-Correction Loop

```
┌─────────────────────────────────────────────────────────────────┐
│                   Self-Correction Engine                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Agent Execution                         │   │
│  │     Input ──► Process ──► Output ──► Validator            │   │
│  └────────────────────────────────┬─────────────────────────┘   │
│                                   │                              │
│                     ┌─────────────▼─────────────┐               │
│                     │     Error Detector         │               │
│                     │  - Schema validation       │               │
│                     │  - Semantic checks         │               │
│                     │  - Constraint verification │               │
│                     └─────────────┬─────────────┘               │
│                                   │                              │
│              ┌────────────────────┼────────────────────┐        │
│              ▼                    ▼                    ▼        │
│       ┌──────────┐         ┌──────────┐         ┌──────────┐   │
│       │  PASS    │         │  MINOR   │         │  MAJOR   │   │
│       │  Output  │         │  Correct │         │  Fallback│   │
│       └──────────┘         └────┬─────┘         └────┬─────┘   │
│                                 │                    │          │
│                                 ▼                    ▼          │
│                          ┌─────────────┐      ┌─────────────┐  │
│                          │   Retry     │      │   Graceful  │  │
│                          │   with fix  │      │   Degrade   │  │
│                          └─────────────┘      └─────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                   Learning Module                          │   │
│  │  - Record error patterns                                  │   │
│  │  - Update correction strategies                           │   │
│  │  - Improve detection rules                                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Error Classification

| Severity | Description | Action |
|----------|-------------|--------|
| None | Output valid | Proceed normally |
| Minor | Fixable locally | Self-correct and retry |
| Major | Requires fallback | Graceful degradation |
| Critical | Unrecoverable | Halt and escalate |

### Correction Strategy Matrix

| Error Type | Detection Method | Correction Strategy |
|------------|------------------|---------------------|
| Format error | Schema validation | Reformat output |
| Factual error | Grounding check | Re-query with context |
| Logic error | Constraint solver | Backtrack and retry |
| Hallucination | Canary/RAG verify | Strip unsupported claims |
| Timeout | Deadline monitor | Partial result + flag |

## Configuration Schema

```yaml
bam_controlled: true

self_correction:
  error_detection:
    validators:
      - type: "schema"
        schema_ref: "output_schema.json"
        on_failure: "reformat"
        
      - type: "semantic"
        checks:
          - "output_relevance"
          - "claim_support"
          - "no_contradiction"
        on_failure: "retry_with_context"
        
      - type: "constraint"
        rules:
          - "no_pii_in_output"
          - "valid_json_structure"
          - "within_token_limit"
        on_failure: "sanitize_and_retry"
        
  correction_policies:
    retry_limits:
      minor_errors: 3
      major_errors: 1
      total_attempts: 5
      
    backoff:
      initial_delay_ms: 500
      multiplier: 2
      max_delay_ms: 10000
      
    escalation:
      after_attempts: 3
      notify: ["ops_channel", "tenant_webhook"]
      
  graceful_degradation:
    strategies:
      - level: 1
        description: "Full capability"
        conditions: "all_systems_nominal"
        
      - level: 2
        description: "Reduced accuracy"
        conditions: "rag_unavailable"
        fallback: "respond_with_disclaimer"
        
      - level: 3
        description: "Basic response only"
        conditions: "llm_degraded"
        fallback: "template_response"
        
      - level: 4
        description: "Service unavailable"
        conditions: "critical_failure"
        fallback: "error_message_with_eta"
        
  tenant_config:
    tier_limits:
      free:
        max_retries: 2
        correction_budget_tokens: 1000
        learning_enabled: false
        
      pro:
        max_retries: 5
        correction_budget_tokens: 5000
        learning_enabled: true
        
      enterprise:
        max_retries: 10
        correction_budget_tokens: 20000
        learning_enabled: true
        custom_validators: true
        
  learning:
    enabled: true
    store_corrections: true
    pattern_detection: true
    auto_rule_generation: false  # Requires human review
    feedback_loop: true
```

### Self-Correction Event Schema

```yaml
correction_event:
  event_id: "ce_uuid_001"
  tenant_id: "tenant_123"
  agent_id: "agent_analysis"
  request_id: "req_abc"
  timestamp: "2026-04-30T11:00:00Z"
  
  original_output:
    content: "..."
    confidence: 0.75
    
  error_detected:
    type: "semantic"
    severity: "minor"
    description: "Claim unsupported by context"
    detector: "grounding_verifier"
    
  correction_applied:
    strategy: "retry_with_context"
    attempt: 2
    additional_context: "Added source documents"
    
  corrected_output:
    content: "..."
    confidence: 0.92
    
  learning:
    pattern_id: "pat_hallucination_001"
    frequency: 12
    suggested_rule: "Require citation for statistics"
    
  metrics:
    original_latency_ms: 1500
    correction_latency_ms: 2100
    total_latency_ms: 3600
    additional_tokens: 800
    additional_cost_usd: 0.012
```

## Trade-offs

| Approach | Benefit | Cost |
|----------|---------|------|
| Aggressive correction | Higher accuracy | Increased latency |
| Minimal correction | Lower latency | Potential errors |
| Learning enabled | Improves over time | Storage/compute |
| Graceful degradation | Maintains availability | Reduced capability |
| Full retry | Complete fix | Resource intensive |

## Degradation Levels

```
Level 1: Full Service
    │
    ▼ (RAG unavailable)
Level 2: Reduced Accuracy
    │    - Add disclaimer to responses
    │    - Flag for human review
    │
    ▼ (LLM degraded)
Level 3: Basic Service
    │    - Template responses only
    │    - Queue requests for later
    │
    ▼ (Critical failure)
Level 4: Unavailable
         - Error message with ETA
         - Redirect to support
```


## Quality Checks

- [ ] Prompt templates versioned and tested
- [ ] Output quality metrics defined
- [ ] Fallback strategies configured
- [ ] Token usage tracked per tenant
- [ ] **CRITICAL:** No hallucination in critical outputs

## Web Research Queries

- "LLM self-correction patterns {date}"
- "AI agent error recovery best practices {date}"
- "graceful degradation AI systems {date}"
- "self-healing agent architectures {date}"
- "LLM output validation correction loop {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-AI1 | Correction loops bounded and monitored |
| QG-AI1 | Tenant isolation maintained during retries |
| QG-AI1 | Learning data isolated per tenant |

## Related Patterns

- [circuit-breaker.md](circuit-breaker.md) - Circuit breaker for failures
- [tool-resilience.md](tool-resilience.md) - Tool retry patterns
- [invisible-failure-detector.md](invisible-failure-detector.md) - Silent failure detection
- [grounding-verifier.md](grounding-verifier.md) - Output verification
