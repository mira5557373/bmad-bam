---
pattern_id: mcp-authentication
shortcode: ZMA
category: mcp
qg_ref: QG-MCP1
version: 1.0.0
last_reviewed: 2026-04-30
---

# MCP Authentication - BAM Pattern

**Loaded by:** ZMA  
**Applies to:** Server authentication for MCP integrations  
**See also:** [mcp-tenant-isolation.md](mcp-tenant-isolation.md), [sso-auth.md](sso-auth.md)

---

## When to Use

- Authenticating MCP servers with the platform
- Per-tenant credential management for external tools
- API key rotation for tool integrations
- OAuth flows for third-party MCP servers

## When NOT to Use

- Internal-only tool servers
- Development without auth requirements
- Trusted network deployments

## Architecture

### Auth Flow

```
┌──────────┐    ┌──────────────┐    ┌───────────┐
│  Agent   │───►│ Auth Gateway │───►│MCP Server │
└──────────┘    └──────┬───────┘    └───────────┘
                       │
                ┌──────▼───────┐
                │ Credential   │
                │ Store        │
                │ (per-tenant) │
                └──────────────┘
```

### Configuration Schema

```yaml
mcp_authentication:
  version: "1.0.0"
  bam_controlled: true
  
  auth_methods:
    - type: enum[api_key, oauth2, mtls]
      tenant_scoped: bool
      rotation_days: int
      
  credential_storage:
    backend: enum[vault, kms, database]
    encryption: required
```

## Trade-offs

| Method | Security | Complexity | Use Case |
|--------|----------|------------|----------|
| API Key | Medium | Low | Internal tools |
| OAuth 2.0 | High | Medium | External tools |
| mTLS | Highest | High | Critical tools |

## Web Research Queries

- "MCP server authentication patterns {date}"
- "tool API key management multi-tenant {date}"
- "OAuth for AI tool integrations {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-MCP1 | Credentials are tenant-scoped and rotatable |

## Related Patterns

- [sso-auth.md](sso-auth.md) - SSO patterns
- [secrets-management.md](secrets-management.md) - Secret storage
