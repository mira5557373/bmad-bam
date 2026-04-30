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
