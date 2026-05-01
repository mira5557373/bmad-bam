---
pattern_id: mcp-schema-validation
shortcode: ZMV
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Schema Validation - BAM Pattern

**Loaded by:** ZMV  
**Applies to:** Validating tool schemas in MCP integrations  
**See also:** [tool-schema-versioning.md](tool-schema-versioning.md), [mcp-tool-discovery.md](mcp-tool-discovery.md)

---

## When to Use

- Validating tool input/output schemas
- Schema version compatibility checks
- Runtime schema enforcement
- Migration planning for schema changes

## When NOT to Use

- Trusted internal tools
- Schema-less tool integrations
- Development with frequent schema changes

## Architecture

### Validation Pipeline

```
Tool Request
     │
     ▼
┌────────────────┐
│ Schema Lookup  │ ←─ From tool discovery
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ Input Validate │ ←─ JSON Schema / Pydantic
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ Tool Execution │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│Output Validate │
└────────────────┘
```

### Configuration Schema

```yaml
mcp_schema_validation:
  version: "1.0.0"
  bam_controlled: true
  
  validation:
    input_validation: enum[strict, lenient, none]
    output_validation: enum[strict, lenient, none]
    coercion_enabled: bool
    
  schema_registry:
    source: enum[tool_discovery, central_registry]
    cache_ttl_seconds: int
```

## Trade-offs

| Mode | Safety | Flexibility | Performance |
|------|--------|-------------|-------------|
| Strict | High | Low | Lower |
| Lenient | Medium | Medium | Good |
| None | Low | High | Best |


## Quality Checks

- [ ] MCP server registration validated
- [ ] Tenant isolation enforced on all tool calls
- [ ] Rate limiting configured per tenant tier
- [ ] Schema validation enabled for all tools
- [ ] **CRITICAL:** No cross-tenant tool access possible

## Web Research Queries

- "tool schema validation patterns {date}"
- "JSON schema for AI tools {date}"
- "runtime schema enforcement {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Schema validation configured for production tools |

## Related Patterns

- [tool-schema-versioning.md](tool-schema-versioning.md) - Schema versions
- [mcp-tool-discovery.md](mcp-tool-discovery.md) - Tool enumeration
