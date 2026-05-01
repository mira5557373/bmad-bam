---
pattern_id: mcp-tenant-isolation
shortcode: ZMT
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Tenant Isolation - BAM Pattern

**Loaded by:** ZMT  
**Applies to:** Multi-tenant MCP server deployments  
**See also:** [tenant-isolation.md](tenant-isolation.md), [mcp-server-lifecycle.md](mcp-server-lifecycle.md)

---

## When to Use

- Enforcing tenant boundaries in MCP tool access
- Preventing cross-tenant data leakage via tools
- Implementing tenant-scoped server pools
- Audit logging for tool invocations

## When NOT to Use

- Single-tenant deployments
- Shared tools with no tenant-specific data
- Development environments

## Architecture

### Isolation Enforcement

```
┌────────────────────────────────────┐
│         MCP Gateway                │
│  ┌──────────────────────────────┐  │
│  │   Tenant Context Extractor   │  │
│  └──────────────┬───────────────┘  │
│                 │                   │
│  ┌──────────────▼───────────────┐  │
│  │   Tenant Isolation Filter    │  │
│  │   - Server pool selection    │  │
│  │   - Request decoration       │  │
│  │   - Response sanitization    │  │
│  └──────────────┬───────────────┘  │
│                 │                   │
│  ┌──────────────▼───────────────┐  │
│  │   Audit Logger               │  │
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

### Configuration Schema

```yaml
mcp_tenant_isolation:
  version: "1.0.0"
  bam_controlled: true
  
  isolation:
    mode: enum[shared, pool-per-tenant, dedicated]
    context_propagation: required
    cross_tenant_blocking: required
    
  audit:
    log_all_invocations: bool
    include_request_payload: bool
    redact_sensitive_fields: list[string]
```

## Trade-offs

| Mode | Isolation | Cost | Complexity |
|------|-----------|------|------------|
| Shared | Logical | Low | Medium |
| Pool-per-tenant | Strong | Medium | Medium |
| Dedicated | Complete | High | High |


## Quality Checks

- [ ] MCP server registration validated
- [ ] Tenant isolation enforced on all tool calls
- [ ] Rate limiting configured per tenant tier
- [ ] Schema validation enabled for all tools
- [ ] **CRITICAL:** No cross-tenant tool access possible

## Web Research Queries

- "MCP tenant isolation patterns {date}"
- "multi-tenant tool access control {date}"
- "agent tool sandboxing {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | **CRITICAL:** No cross-tenant tool access possible |

## Related Patterns

- [tenant-isolation.md](tenant-isolation.md) - Database isolation
- [mcp-authentication.md](mcp-authentication.md) - Server auth
