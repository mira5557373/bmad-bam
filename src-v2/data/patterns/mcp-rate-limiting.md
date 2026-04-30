---
pattern_id: mcp-rate-limiting
shortcode: ZMR
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Rate Limiting - BAM Pattern

**Loaded by:** ZMR  
**Applies to:** Per-server tenant rate limiting for MCP tools  
**See also:** [tenant-quotas.md](tenant-quotas.md), [mcp-tenant-isolation.md](mcp-tenant-isolation.md)

---

## When to Use

- Preventing tool abuse by tenants
- Fair resource allocation across tenants
- Protecting external MCP servers from overload
- Tier-based tool access limits

## When NOT to Use

- Unlimited tool access by design
- Single-tenant deployments
- Internal tools with no limits

## Architecture

### Rate Limit Enforcement

```
Tool Request
     │
     ▼
┌────────────────────┐
│ Tenant Rate Bucket │
│ (per-tool limits)  │
└────────┬───────────┘
         │
    ┌────┴────┐
    │ Allow?  │
    └────┬────┘
    yes  │  no
    ▼    ▼
┌──────┐ ┌─────────────┐
│ Tool │ │ 429 + Retry │
└──────┘ └─────────────┘
```

### Configuration Schema

```yaml
mcp_rate_limiting:
  version: "1.0.0"
  bam_controlled: true
  
  limits:
    - tier: free
      tools_per_minute: 10
      tools_per_day: 100
    - tier: pro
      tools_per_minute: 100
      tools_per_day: 10000
    - tier: enterprise
      tools_per_minute: 1000
      tools_per_day: unlimited
      
  enforcement:
    algorithm: enum[token_bucket, sliding_window, fixed_window]
    burst_allowance: float
    retry_after_header: bool
```

## Trade-offs

| Algorithm | Accuracy | Burst Handling | Memory |
|-----------|----------|----------------|--------|
| Token Bucket | High | Good | Medium |
| Sliding Window | Highest | Best | High |
| Fixed Window | Medium | Poor | Low |

## Web Research Queries

- "tool rate limiting multi-tenant {date}"
- "per-tenant API throttling {date}"
- "tiered rate limits SaaS {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Rate limits enforced per-tenant per-tool |

## Related Patterns

- [tenant-quotas.md](tenant-quotas.md) - Quota management
- [mcp-tenant-isolation.md](mcp-tenant-isolation.md) - Tenant isolation
