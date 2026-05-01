---
pattern_id: tool-schema-versioning
shortcode: ZTV
category: ai-runtime
qg_ref: QG-M3
version: 1.0.0
last_reviewed: 2026-04-30
---

# Tool Schema Versioning - BAM Pattern

**Loaded by:** ZTV  
**Applies to:** Multi-tenant AI systems with evolving tool schemas  
**See also:** [tool-execution.md](tool-execution.md), [mcp-tenant-isolation.md](mcp-tenant-isolation.md)

---

## When to Use

- Evolving agent tool interfaces
- Multiple tool versions in production
- Tenant-specific tool customizations
- Breaking change management

## When NOT to Use

- Stable, unchanging tool sets
- Single-version deployments
- Development/prototyping phases

## Architecture

### Version Registry

```
┌─────────────────────────────────────────────────────────────┐
│                 Tool Schema Versioning                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Schema Registry                     │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐              │   │
│  │  │ v1.0.0  │  │ v1.1.0  │  │ v2.0.0  │              │   │
│  │  │ (active)│  │ (active)│  │ (beta)  │              │   │
│  │  └─────────┘  └─────────┘  └─────────┘              │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                 │
│            ┌───────────────┼───────────────┐                │
│            ▼               ▼               ▼                │
│       [Free: v1.0]   [Pro: v1.1]   [Ent: v2.0]             │
│                                                              │
│  Features: [Compatibility Check] [Migration] [Deprecation] │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-08)

```yaml
tool_schema_versioning:
  version: "1.0.0"
  bam_controlled: true
  
  versioning:
    scheme: enum[semantic, timestamp, hash]
    
    compatibility:
      check_breaking_changes: bool
      breaking_change_rules:
        - required_field_added
        - field_removed
        - type_changed
      deprecation_warning_days: int
      sunset_enforcement: bool
      
  registry:
    storage: enum[database, git, object_storage]
    
    validation:
      on_publish: bool
      schema_format: enum[json_schema, openapi, protobuf]
      require_description: bool
      
  tenant_configuration:
    per_tenant_versions: bool
    version_pinning: bool
    auto_upgrade: enum[never, minor, patch]
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Semantic versioning | Clear contract | Requires discipline | Public tools |
| Timestamp versioning | Simple | No compatibility signal | Internal tools |
| Per-tenant pinning | Stability | Fragmentation | Enterprise |
| Auto-upgrade | Always current | Breaking changes | Trusted tools |


## Quality Checks

- [ ] Agent execution respects tenant boundaries
- [ ] State management includes tenant context
- [ ] Checkpointing configured for long-running workflows
- [ ] Timeout and retry policies defined
- [ ] **CRITICAL:** No cross-tenant state leakage

## Web Research Queries

- "AI tool schema versioning patterns {date}"
- "agent tool API versioning best practices {date}"
- "MCP tool version management {date}"
- "LLM function schema evolution {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-M3 | Tool schemas versioned, compatibility checked |

## Related Patterns

- [tool-execution.md](tool-execution.md) - Tool runtime
- [mcp-tenant-isolation.md](mcp-tenant-isolation.md) - MCP patterns
