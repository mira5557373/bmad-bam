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
