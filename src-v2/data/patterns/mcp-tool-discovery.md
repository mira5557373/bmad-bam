---
pattern_id: mcp-tool-discovery
shortcode: ZMD
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Tool Discovery - BAM Pattern

**Loaded by:** ZMD  
**Applies to:** AI agents discovering available MCP tools  
**See also:** [mcp-server-lifecycle.md](mcp-server-lifecycle.md), [ai-discovery.md](ai-discovery.md)

---

## When to Use

- Dynamic enumeration of available tools per tenant
- Capability-based tool selection for agents
- Runtime tool availability checks
- Tenant-scoped tool catalogs

## When NOT to Use

- Static tool configurations
- Single-tenant with known tool sets
- Development with hardcoded tool lists

## Architecture

### Discovery Flow

```
Agent Request (tenant_id)
        │
        ▼
┌───────────────────┐
│  Discovery Cache  │◄──── TTL-based invalidation
└────────┬──────────┘
         │ cache miss
         ▼
┌───────────────────┐
│ Tool Registry     │
│ (tenant-filtered) │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│ Capability List   │
│ (schemas, limits) │
└───────────────────┘
```

### Configuration Schema

```yaml
mcp_tool_discovery:
  version: "1.0.0"
  bam_controlled: true
  
  discovery:
    cache_ttl_seconds: int
    tenant_filtering: required
    capability_schema: json_schema
    
  enumeration:
    include_schemas: bool
    include_rate_limits: bool
    include_examples: bool
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Pull-based | Simple | Latency | Low tool churn |
| Push-based | Real-time | Complexity | Dynamic tools |
| Hybrid | Balanced | Cache invalidation | Production |

## Web Research Queries

- "MCP tool discovery patterns {date}"
- "agent capability enumeration {date}"
- "multi-tenant service discovery {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Tool discovery returns tenant-scoped capabilities |

## Related Patterns

- [mcp-server-lifecycle.md](mcp-server-lifecycle.md) - Server management
- [ai-discovery.md](ai-discovery.md) - AGENTS.md format
