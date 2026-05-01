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

## When NOT to Use

- Simple chatbots with no content restrictions
- Internal tools with fully trusted users
- Systems where regex patterns are sufficient

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

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Intent classifier only | Fast, low latency | May miss edge cases | High-volume, simple policies |
| Embedding similarity | Catches semantic variants | Higher compute cost | Sophisticated policies |
| Full policy engine | Maximum flexibility | Complex to configure | Enterprise compliance |
| Combined approach | Best coverage | Highest latency | High-security deployments |


## Quality Checks

- [ ] Input validation implemented for all entry points
- [ ] Sensitive data detection and masking configured
- [ ] Audit logging enabled for security events
- [ ] Rate limiting prevents abuse
- [ ] **CRITICAL:** No credential or PII exposure in logs/outputs

## Web Research Queries

- "semantic firewall LLM production patterns {date}"
- "AI content policy engine enterprise {date}"
- "embedding-based content moderation multi-tenant {date}"
- "Anthropic Claude guardrails implementation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S4 | Semantic firewall active and tested |

## Related Patterns

- [prompt-injection-detection.md](prompt-injection-detection.md) - Input-side detection
- [output-sanitization.md](output-sanitization.md) - Output-side filtering
