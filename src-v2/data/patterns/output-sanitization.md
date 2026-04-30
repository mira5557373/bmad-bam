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

## When NOT to Use

- Internal analytics with no user-facing output
- Systems with homogeneous non-sensitive data
- Development environments with synthetic data

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

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S7 | Output sanitization active, PII tests pass |

## Related Patterns

- [semantic-firewall.md](semantic-firewall.md) - Semantic content filtering
- [prompt-injection-detection.md](prompt-injection-detection.md) - Input protection
