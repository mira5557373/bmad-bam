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


## Quality Checks

- [ ] Input validation implemented for all entry points
- [ ] Sensitive data detection and masking configured
- [ ] Audit logging enabled for security events
- [ ] Rate limiting prevents abuse
- [ ] **CRITICAL:** No credential or PII exposure in logs/outputs

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
