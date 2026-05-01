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


## Quality Checks

- [ ] Input validation implemented for all entry points
- [ ] Sensitive data detection and masking configured
- [ ] Audit logging enabled for security events
- [ ] Rate limiting prevents abuse
- [ ] **CRITICAL:** No credential or PII exposure in logs/outputs

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
