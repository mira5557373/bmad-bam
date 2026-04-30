# MCP Integration - BAM Domain Context

**Loaded by:** ZML, ZMD, ZMT, ZTP, ZMF, ZMC, ZMA, ZMV, ZA2, ZMR  
**Related Workflows:** bmad-bam-mcp-integration, bmad-bam-tool-orchestration

---

## Overview

MCP (Model Context Protocol) provides standardized tool integration for AI agents in multi-tenant environments.

## Core Concepts

### Server Lifecycle

| Phase | Actions | Tenant Considerations |
|-------|---------|----------------------|
| Registration | Capability declaration | Tenant-scoped registration |
| Health | Heartbeat monitoring | Per-tenant health tracking |
| Versioning | Schema evolution | Tenant migration coordination |
| Discovery | Tool enumeration | Tenant capability filtering |

### Tenant Isolation Model

```
┌─────────────────────────────────────────────┐
│              MCP Gateway                     │
├─────────────────────────────────────────────┤
│  Tenant A Context  │  Tenant B Context      │
│  ┌─────────────┐   │  ┌─────────────┐       │
│  │ Server Pool │   │  │ Server Pool │       │
│  │ (isolated)  │   │  │ (isolated)  │       │
│  └─────────────┘   │  └─────────────┘       │
└─────────────────────────────────────────────┘
```

## Decision Matrix

| Requirement | Pattern | Rationale |
|-------------|---------|-----------|
| Tool discovery | mcp-tool-discovery | Dynamic capability enumeration |
| Auth per server | mcp-authentication | Tenant-scoped credentials |
| Rate limits | mcp-rate-limiting | Prevent tenant resource abuse |
| Cross-server | mcp-federation | Multi-server orchestration |

## Quality Checks

- [ ] All MCP servers register with tenant context
- [ ] Tool discovery returns tenant-scoped capabilities
- [ ] **CRITICAL:** No cross-tenant tool access possible

## Related Patterns

**Core MCP:**
- `{project-root}/_bmad/bam/data/patterns/mcp-server-lifecycle.md` - Server management
- `{project-root}/_bmad/bam/data/patterns/mcp-tool-discovery.md` - Capability enumeration
- `{project-root}/_bmad/bam/data/patterns/mcp-tenant-isolation.md` - Isolation enforcement

**Security & Auth:**
- `{project-root}/_bmad/bam/data/patterns/mcp-authentication.md` - Server auth
- `{project-root}/_bmad/bam/data/patterns/tool-permission-model.md` - Access control

**Operations:**
- `{project-root}/_bmad/bam/data/patterns/mcp-federation.md` - Cross-server
- `{project-root}/_bmad/bam/data/patterns/mcp-rate-limiting.md` - Throttling
- `{project-root}/_bmad/bam/data/patterns/mcp-result-caching.md` - Performance

## Web Research

- "MCP Model Context Protocol patterns {date}"
- "multi-tenant tool orchestration {date}"
- "agent tool discovery patterns {date}"
