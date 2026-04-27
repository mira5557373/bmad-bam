# BAM AI Security Guide

**When to load:** During Phase 5 (Quality) when auditing AI security,
or when user mentions LLM security, prompt injection, model security, or AI threats.

**Integrates with:** Security Architect, AI/ML Engineer, Platform Architect

---

## Core Concepts

### AI Security Domains

Comprehensive AI security covers six domains:

1. **Model Security** - Model protection, versioning, access control
2. **Endpoint Protection** - API security, rate limiting, DDoS
3. **Prompt Injection** - Direct, indirect, encoding-based attacks
4. **Data Leakage** - Cross-tenant, PII, system prompt exposure
5. **Access Controls** - Model access, tool permissions, agent capabilities
6. **Inference Security** - Input validation, output filtering

### Prompt Injection Categories

| Category | Attack Vector | Defense |
|----------|---------------|---------|
| Direct | "Ignore previous instructions" | Guardrails |
| Indirect | Malicious document content | Input sanitization |
| Encoding | Base64/Unicode payloads | Decoding + scanning |
| Multi-turn | Gradual trust escalation | Context monitoring |

### AI-Specific Security Controls

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Guardrails | Block harmful content | Input/output filters |
| Kill Switch | Emergency shutdown | Immediate response |
| Budget Limits | Prevent cost attacks | Token/spend limits |
| Rate Limiting | Prevent abuse | Per-tenant throttling |
| Output Filtering | Prevent data leakage | PII/secret redaction |

### TEA Integration for QG-I3

Agent safety verification (QG-I3) requires TEA handoff:

1. BAM produces safety test criteria
2. TEA executes adversarial testing
3. TEA validates guardrails and kill switch
4. BAM makes gate decision

## Application Guidelines

When auditing AI security:

1. **Start with model access** - Who can access which models
2. **Test injection defenses** - All four categories
3. **Verify data leakage prevention** - Cross-tenant, PII, prompts
4. **Confirm access controls** - Tool and capability permissions

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Prompt injection works | FAIL gate | Critical vulnerability |
| Data leakage possible | FAIL gate | Privacy violation |
| Kill switch slow (>100ms) | CONDITIONAL | Performance issue |
| Missing guardrail | FAIL gate | Safety requirement |

## Related Workflows

- `bmad-bam-ai-security` - AI security audit
- `bmad-bam-agent-safety` - Agent safety verification
- `bmad-bam-ai-guardrails-implementation` - Guardrail implementation

## Related Patterns

Load decision criteria and `web_queries` column from pattern registry:

- **AI safety patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-agent-safety`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `security`

Use the `web_queries` column from pattern registry for current best practices.

### Web Research

Use these queries for current best practices:

- Search: "LLM security best practices {date}"
- Search: "prompt injection defense {date}"
- Search: "AI model security enterprise {date}"
- Search: "adversarial AI testing {date}"
