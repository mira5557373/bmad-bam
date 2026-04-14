# MCP Server Isolation Patterns

**When to load:** When designing MCP server deployment, tenant tool isolation, or when user mentions MCP server multi-tenancy, tool isolation, or Model Context Protocol security.

**Integrates with:** Architect (Nova persona), Dev agent, Platform architect, Security architect

---

## Core Concepts

### What is MCP Server Isolation?

MCP (Model Context Protocol) server isolation ensures that tools exposed to AI agents are properly isolated between tenants. This includes access control, resource isolation, and audit logging.

### Isolation Strategy Comparison

| Strategy | Description | Isolation Level | Cost |
|----------|-------------|-----------------|------|
| Shared Server | All tenants share | Logical | Low |
| Tenant Server | Per-tenant instance | Physical | High |
| Hybrid MCP | Shared common + tenant-specific | Mixed | Medium |

---

## Key Patterns

### Pattern 1: Shared MCP Server with Tenant Filter

Single server with tenant-aware tool filtering.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Tool Registry | All available tools | Filtered by tenant |
| Permission Layer | Access control | Per-tenant permissions |
| Request Handler | Process requests | Validate tenant context |
| Audit Logger | Track usage | Tenant-tagged logs |

### Shared Server Architecture

```
┌─────────────────────────────────────────┐
│          Shared MCP Server               │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │         Tool Registry             │   │
│  │  ┌─────────┐  ┌─────────┐        │   │
│  │  │ Tool A  │  │ Tool B  │        │   │
│  │  │ (all)   │  │ (pro+)  │        │   │
│  │  └─────────┘  └─────────┘        │   │
│  └──────────────────────────────────┘   │
│                   │                      │
│  ┌──────────────────────────────────┐   │
│  │       Tenant Permission Layer     │   │
│  │  Tenant A: [Tool A]              │   │
│  │  Tenant B: [Tool A, Tool B]      │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Pattern 2: Per-Tenant MCP Server

Dedicated server instance per tenant.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Server Instance | Tenant-dedicated | Complete isolation |
| Tool Configuration | Tenant-specific | Custom tool set |
| Resource Limits | Dedicated resources | Guaranteed capacity |
| Network Isolation | Tenant network | Full isolation |

### Per-Tenant Architecture

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Tenant A   │  │  Tenant B   │  │  Tenant C   │
│  MCP Server │  │  MCP Server │  │  MCP Server │
│  ┌───────┐  │  │  ┌───────┐  │  │  ┌───────┐  │
│  │Tools  │  │  │  │Tools  │  │  │  │Tools  │  │
│  └───────┘  │  │  └───────┘  │  │  └───────┘  │
│  Custom     │  │  Custom     │  │  Custom     │
│  config     │  │  config     │  │  config     │
└─────────────┘  └─────────────┘  └─────────────┘
```

### Pattern 3: Hybrid MCP Deployment

Shared common tools with tenant-specific extensions.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Core Server | Common tools | Shared, filtered |
| Extension Server | Tenant tools | Per-tenant instance |
| Router | Request routing | Tenant-aware |
| Aggregator | Combine results | Tenant-scoped |

### Hybrid Architecture

```
┌─────────────────────────────────────────┐
│            Hybrid MCP Setup              │
│                                          │
│  ┌──────────────┐    ┌───────────────┐  │
│  │ Core Server  │    │ Extension     │  │
│  │ (shared)     │    │ Registry      │  │
│  │ ┌──────────┐ │    │               │  │
│  │ │Core Tools│ │    │ ┌─────────┐   │  │
│  │ └──────────┘ │    │ │Tenant A │   │  │
│  └──────────────┘    │ │Extension│   │  │
│          │           │ └─────────┘   │  │
│          │           │ ┌─────────┐   │  │
│          └───────────│ │Tenant B │   │  │
│                      │ │Extension│   │  │
│                      │ └─────────┘   │  │
│                      └───────────────┘  │
└─────────────────────────────────────────┘
```

### Pattern 4: Tool Permission Model

Control which tools each tenant can access.

| Permission Level | Description | Use Case |
|------------------|-------------|----------|
| Public | All tenants | Core functionality |
| Tier-based | By subscription tier | Premium features |
| Custom | Per-tenant config | Enterprise |
| Restricted | Explicit grant | Sensitive tools |

---

## Application Guidelines

When implementing MCP server isolation:

1. **Always validate tenant** - Before any tool execution
2. **Filter tool discovery** - Return only permitted tools
3. **Log all invocations** - Audit trail per tenant
4. **Resource isolation** - Prevent noisy neighbor
5. **Secure tool inputs** - Validate and sanitize

---

## Per-Tier MCP Configuration

| Tier | Server Type | Tool Access | Custom Tools |
|------|-------------|-------------|--------------|
| Free | Shared | Basic only | None |
| Pro | Shared | Standard | Limited |
| Enterprise | Dedicated | Full + custom | Unlimited |

---

## Tool Permission Matrix

| Tool Category | Free | Pro | Enterprise |
|---------------|------|-----|------------|
| Read tools | Yes | Yes | Yes |
| Write tools | Limited | Yes | Yes |
| External APIs | No | Yes | Yes |
| Custom tools | No | Limited | Yes |
| Admin tools | No | No | Yes |

---

## Security Considerations

| Concern | Mitigation | Implementation |
|---------|------------|----------------|
| Tenant data access | Tool scoping | Tenant context in all calls |
| Resource exhaustion | Rate limiting | Per-tenant limits |
| Privilege escalation | Permission validation | Check on every call |
| Data exfiltration | Output filtering | Tenant data only |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Global tool access | Unauthorized access | Tenant filtering |
| No input validation | Injection attacks | Sanitize inputs |
| Shared state | Cross-tenant leakage | Tenant-scoped state |
| Missing audit | No accountability | Log all invocations |
| No rate limits | Resource abuse | Per-tenant limits |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Shared vs dedicated server? | Shared for cost; dedicated for compliance | Balance cost vs isolation requirements |
| Tool permission model? | Tier-based with custom override | Flexible and scalable |
| Hybrid deployment? | For enterprise with custom tools | Best of both worlds |
| Custom tool support? | Enterprise tier only | Additional security review needed |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design MCP integration
- `bmad-bam-validate-tool-contract` - Verify tool security
- `bmad-bam-security-review` - MCP security review

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **MCP server:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `mcp-server-isolation`
- **Tool execution:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tool-execution`
- **Agent runtime:** `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "MCP server multi-tenant {date}"
- Search: "Model Context Protocol isolation {date}"
- Search: "AI agent tool security patterns {date}"
