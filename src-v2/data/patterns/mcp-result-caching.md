---
pattern_id: mcp-result-caching
shortcode: ZMC
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Result Caching - BAM Pattern

**Loaded by:** ZMC  
**Applies to:** Caching tool results in multi-tenant environments  
**See also:** [mcp-tool-discovery.md](mcp-tool-discovery.md), [cache-invalidation.md](cache-invalidation.md)

---

## When to Use

- Reducing latency for repeated tool calls
- Lowering costs for expensive tool invocations
- Improving throughput for common queries
- Tenant-scoped result sharing

## When NOT to Use

- Tools with non-deterministic outputs
- Real-time data requirements
- Tools with side effects

## Architecture

### Cache Hierarchy

```
┌─────────────────────────────┐
│     L1: Request Cache       │ ←─ Same request in flight
├─────────────────────────────┤
│     L2: Tenant Cache        │ ←─ Tenant-scoped results
├─────────────────────────────┤
│     L3: Global Cache        │ ←─ Cross-tenant (if safe)
└─────────────────────────────┘
```

### Configuration Schema

```yaml
mcp_result_caching:
  version: "1.0.0"
  bam_controlled: true
  
  cache_levels:
    request:
      enabled: bool
      dedup_window_ms: int
    tenant:
      enabled: bool
      ttl_seconds: int
      max_entries: int
    global:
      enabled: bool
      tenant_safe_only: bool
      
  invalidation:
    on_tool_update: bool
    on_tenant_config_change: bool
```

## Trade-offs

| Level | Hit Rate | Isolation | Staleness Risk |
|-------|----------|-----------|----------------|
| Request | Low | Full | None |
| Tenant | Medium | Full | Low |
| Global | High | Requires care | Medium |


## Quality Checks

- [ ] MCP server registration validated
- [ ] Tenant isolation enforced on all tool calls
- [ ] Rate limiting configured per tenant tier
- [ ] Schema validation enabled for all tools
- [ ] **CRITICAL:** No cross-tenant tool access possible

## Web Research Queries

- "tool result caching patterns {date}"
- "multi-tenant cache isolation {date}"
- "LLM tool response caching {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Cache maintains tenant isolation |

## Related Patterns

- [cache-invalidation.md](cache-invalidation.md) - General caching
- [mcp-tool-discovery.md](mcp-tool-discovery.md) - Tool enumeration
