---
pattern_id: ai-discovery
shortcode: ZAD
category: discovery
qg_ref: QG-D1
version: 1.0.0
last_reviewed: 2026-04-29
---

# AI Discovery - BAM Pattern

**Loaded by:** ZAD  
**Applies to:** AI capability publishing and agent discovery

---

## When to Use

- Publishing agent capabilities for AI-to-AI discovery
- Enabling federated agent networks to discover available services
- Documenting LLM-specific constraints and configurations
- Implementing MCP server capability advertisement
- Signals: agent discovery, capability advertisement, model constraints, context limits

## When NOT to Use

- Internal-only agents with no external consumers
- Agents without stable public interfaces
- Rapid prototyping before API stabilization
- Single-tenant systems with no federation requirements

## Architecture

### AGENTS.md Format

AGENTS.md is a standardized file format (similar to robots.txt) that describes agent capabilities for AI-to-AI discovery.

```markdown
# AGENTS.md

## agent: customer-support-agent
capabilities:
  - name: ticket_triage
    description: Categorize and prioritize support tickets
    input_schema: { ticket_id: string, content: string }
    output_schema: { category: string, priority: enum }
  - name: sentiment_analysis
    description: Analyze customer sentiment from message
    input_schema: { message: string }
    output_schema: { sentiment: enum, confidence: float }

authentication:
  type: bearer_token
  scopes: [agent:read, agent:execute]

rate_limits:
  requests_per_minute: 100
  tokens_per_day: 500000

contact:
  escalation: support@example.com
  documentation: https://docs.example.com/agents
```

### llms.txt Format

llms.txt documents LLM-specific constraints and configurations for consistent agent behavior.

```txt
# llms.txt

# Supported Models
models:
  - claude-3-5-sonnet-20241022
  - gpt-4o-2024-11-20

# Context Limits (tokens)
context_limits:
  claude-3-5-sonnet-20241022: 200000
  gpt-4o-2024-11-20: 128000

# Rate Limits (per tenant tier)
rate_limits:
  free:
    requests_per_minute: 10
    tokens_per_day: 10000
  pro:
    requests_per_minute: 100
    tokens_per_day: 500000
  enterprise:
    requests_per_minute: unlimited
    tokens_per_day: unlimited

# Prompt Templates
prompt_templates:
  customer_support: /templates/customer-support.md
  code_review: /templates/code-review.md
```

### Publishing Strategies

| Strategy | Use Case | Implementation | Update Frequency |
|----------|----------|----------------|------------------|
| Static | Simple agents, <10 capabilities | Deploy static files in repo | On release |
| Dynamic | Complex agents, >10 capabilities | Generate at runtime from registry | Per request (cached) |
| Federated | Multi-tenant, per-tenant capabilities | Per-tenant file generation | On tenant config change |
| MCP Server | Tool-based agents | Expose via MCP protocol | Real-time |

### Multi-Tenant Publishing Configuration

```yaml
ai_discovery:
  publishing_mode: federated
  
  # Tenant-aware capability exposure
  tenant_overrides:
    enterprise:
      expose_all: true
      custom_capabilities:
        - advanced_analytics
        - custom_model_routing
    pro:
      expose_all: false
      capabilities:
        - ticket_triage
        - sentiment_analysis
    free:
      expose_all: false
      capabilities:
        - ticket_triage
  
  # File generation
  outputs:
    agents_md:
      enabled: true
      path: "/.well-known/AGENTS.md"
      cache_ttl: 300  # 5 minutes
    llms_txt:
      enabled: true
      path: "/.well-known/llms.txt"
      cache_ttl: 3600  # 1 hour
  
  # Authentication for discovery endpoints
  discovery_auth:
    public: false
    require_api_key: true
    rate_limit: 60  # requests per minute
```

### Discovery Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Discovery Flow                           │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  External    │    │  Discovery   │    │    Agent     │  │
│  │    Agent     │───►│   Endpoint   │───►│   Registry   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                    │          │
│         │                   ▼                    │          │
│         │           ┌──────────────┐             │          │
│         │           │ Tenant Check │             │          │
│         │           └──────────────┘             │          │
│         │                   │                    │          │
│         │                   ▼                    ▼          │
│         │           ┌──────────────────────────────┐        │
│         │           │  Generate AGENTS.md/llms.txt │        │
│         │           │  (filtered by tenant tier)   │        │
│         │           └──────────────────────────────┘        │
│         │                          │                        │
│         ◄──────────────────────────┘                        │
│    Capability Discovery Response                            │
└─────────────────────────────────────────────────────────────┘
```

## Trade-offs

| Approach | Pros | Cons |
|----------|------|------|
| Static files | Simple deployment, cacheable, no runtime overhead | Manual updates, stale data risk |
| Dynamic generation | Always current, tenant-aware | Performance overhead, complexity |
| MCP integration | Real-time discovery, standard protocol | Requires MCP infrastructure |
| Federated | Per-tenant customization, enterprise flexibility | Operational complexity |

### Strategy Selection Matrix

| Factor | Choose Static | Choose Dynamic | Choose MCP |
|--------|---------------|----------------|------------|
| Capabilities | <10, stable | >10, changing | Tool-based |
| Update frequency | Monthly | Daily | Real-time |
| Tenant variation | None | Per-tier | Per-tenant |
| Infrastructure | Minimal | Moderate | Full MCP stack |

## Implementation Considerations

### Security

- Always authenticate discovery endpoints
- Never expose internal-only capabilities
- Rate limit discovery requests separately from agent execution
- Log all discovery queries for audit

### Caching

- Cache generated files per tenant/tier
- Invalidate on capability registry changes
- Use ETags for conditional requests
- Consider CDN for static files

### Versioning

- Version the file format (e.g., `agents_md_version: 1.0`)
- Support backwards compatibility for one major version
- Deprecate capabilities gracefully with `deprecated: true` flag

## Web Research Queries

- "AGENTS.md specification {date}"
- "AI agent discovery protocols {date}"
- "llms.txt standard {date}"
- "MCP capability discovery patterns {date}"
- "multi-tenant AI agent federation {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-D1 | Pattern implementation verified |

## Related Patterns

- See bam-patterns.csv for related patterns

