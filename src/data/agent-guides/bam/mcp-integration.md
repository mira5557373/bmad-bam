# BAM MCP Integration Guide

**When to load:** During Phase 3 (Solutioning) when designing MCP server architecture, implementing tool execution patterns, or when user mentions Model Context Protocol, MCP servers, or tool isolation.

**Integrates with:** Architect (Nova persona), Dev agent, Security agent

---

## Core Concepts

### What is MCP?

Model Context Protocol (MCP) is a standardized protocol for AI agents to discover, connect to, and invoke external tools and resources. In a multi-tenant SaaS context, MCP servers must be architected for tenant isolation, security, and scalability.

### MCP Architecture Components

| Component | Purpose | Multi-Tenant Consideration |
|-----------|---------|---------------------------|
| MCP Server | Exposes tools and resources | Tenant-scoped or shared |
| MCP Client | Agent-side protocol handler | Connection pooling per tenant |
| Tool Registry | Available tool catalog | Tenant-filtered discovery |
| Resource Provider | External data access | Tenant credential isolation |

---

## Application Guidelines

When implementing MCP integration in multi-tenant systems:

1. **Isolate tenant credentials**: Each tenant's external service credentials must be stored and accessed separately
2. **Filter tool discovery by tenant**: Tool registry should only expose tools the tenant has access to
3. **Propagate tenant context through MCP calls**: All tool invocations must carry tenant_id for proper scoping
4. **Implement rate limiting per tenant**: Prevent any tenant from exhausting MCP server resources
5. **Audit all tool invocations**: Log tool calls with tenant context for security and billing

---

## MCP Server Architecture for Multi-Tenant

### Deployment Models

| Model | Description | Isolation Level | Use Case |
|-------|-------------|-----------------|----------|
| Shared Server | Single MCP server, tenant filter | Logical | Cost-efficient, low-risk tools |
| Tenant Server | Dedicated MCP per tenant | Process | Regulated industries |
| Hybrid | Shared + dedicated for sensitive | Mixed | Enterprise tier differentiation |

### Shared Server Pattern

```
┌─────────────────────────────────────────────────────────┐
│                  Shared MCP Server                       │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │            Tenant Context Middleware         │       │
│   │   [Extract] ──► [Validate] ──► [Inject]     │       │
│   └─────────────────────────────────────────────┘       │
│                          │                               │
│   ┌──────────────────────▼──────────────────────┐       │
│   │              Tool Registry                   │       │
│   │  ┌─────────────────────────────────────┐    │       │
│   │  │  Platform Tools (all tenants)       │    │       │
│   │  │  [search] [calculate] [format]      │    │       │
│   │  └─────────────────────────────────────┘    │       │
│   │  ┌─────────────────────────────────────┐    │       │
│   │  │  Tenant-Specific Tools              │    │       │
│   │  │  [tenant_A:crm] [tenant_B:erp]      │    │       │
│   │  └─────────────────────────────────────┘    │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Tenant Server Pattern

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Tenant A MCP    │  │  Tenant B MCP    │  │  Tenant C MCP    │
│  ┌────────────┐  │  │  ┌────────────┐  │  │  ┌────────────┐  │
│  │ Tools      │  │  │  │ Tools      │  │  │  │ Tools      │  │
│  │ Resources  │  │  │  │ Resources  │  │  │  │ Resources  │  │
│  │ Credentials│  │  │  │ Credentials│  │  │  │ Credentials│  │
│  └────────────┘  │  │  └────────────┘  │  │  └────────────┘  │
└────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘
         │                     │                     │
         └─────────────────────┼─────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │    MCP Router       │
                    │  (Tenant Dispatch)  │
                    └─────────────────────┘
```

---

## Tenant Context in MCP Tools

### Context Injection Pattern

Every MCP tool invocation must include tenant context:

| Context Field | Source | Validation |
|---------------|--------|------------|
| tenant_id | JWT claim | Required, verified |
| user_id | JWT claim | Required, verified |
| tier | Tenant metadata | For rate limiting |
| permissions | RBAC lookup | Tool authorization |

### Tool Authorization Matrix

| Tool Type | Authorization | Context Required |
|-----------|---------------|------------------|
| Platform read | Auto-approve | tenant_id |
| Platform write | User confirmation | tenant_id, user_id |
| Tenant custom | Tool-specific | Full context |
| Admin | Role-based | Admin role claim |

---

## Security Considerations

### Credential Isolation

| Credential Type | Storage | Access Pattern |
|-----------------|---------|----------------|
| Platform API keys | Vault/KMS | MCP server only |
| Tenant OAuth | Encrypted DB | Per-tenant lookup |
| User tokens | Session store | Request-scoped |

### Input Validation

| Validation Layer | Purpose | Implementation |
|------------------|---------|----------------|
| Schema validation | Parameter structure | JSON Schema |
| Tenant boundary | Cross-tenant access | Context check |
| Rate limiting | Resource protection | Per-tenant limits |
| Output sanitization | Data leakage | Response filtering |

### Audit Requirements

| Event | Log Fields | Retention |
|-------|------------|-----------|
| Tool invocation | tenant_id, tool_id, params_hash | 90 days |
| Authorization decision | tenant_id, decision, reason | 1 year |
| Error/failure | Full context, stack trace | 30 days |

---

## Tool Execution Isolation

### Isolation Levels

| Level | Mechanism | Overhead | Use Case |
|-------|-----------|----------|----------|
| None | Direct execution | Minimal | Trusted platform tools |
| Process | Subprocess | Low | Untrusted input |
| Container | Docker/Firecracker | Medium | Code execution |
| VM | Full isolation | High | Customer-provided tools |

### Sandbox Configuration

| Sandbox Type | Memory | CPU | Network | Timeout |
|--------------|--------|-----|---------|---------|
| Light | 256MB | 0.5 | Allowed | 10s |
| Standard | 512MB | 1.0 | Restricted | 30s |
| Heavy | 2GB | 2.0 | Isolated | 60s |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|---------------|-----------|
| When should tenants have dedicated MCP servers? | When tenant provides custom tools or has strict compliance requirements | Dedicated servers provide process-level isolation and prevent tool conflicts between tenants |
| When is shared MCP server appropriate? | When only platform tools are used and tenant count is manageable | Shared servers reduce infrastructure cost while tenant context middleware ensures logical isolation |
| How to handle compliance requirements? | Per-tenant MCP server with full audit logging | Regulatory compliance often requires demonstrable isolation and complete audit trails |
| When to implement connection pooling? | High tool invocation volume (>100 calls/min per tenant) | Pooling reduces connection overhead and improves latency for high-frequency tool usage |
| Which sandbox level for code execution? | Container sandbox (Docker/Firecracker) minimum | Code execution requires strong isolation to prevent tenant escape and resource abuse |

---

## Implementation Example

### MCP Tool Handler with Tenant Context

```typescript
// Example: MCP tool with tenant isolation
import { Server } from '@modelcontextprotocol/sdk/server/index.js';

interface TenantToolContext {
  tenantId: string;
  tier: string;
  allowedTools: string[];
}

class TenantMCPServer {
  private server: Server;
  
  constructor() {
    this.server = new Server({
      name: 'tenant-aware-mcp',
      version: '1.0.0'
    });
    
    this.registerTools();
  }
  
  private registerTools() {
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;
      
      // Extract tenant context from request metadata
      const tenantContext = this.extractTenantContext(request);
      
      // Verify tool is allowed for this tenant
      if (!this.isToolAllowed(tenantContext, name)) {
        throw new Error(`Tool ${name} not available for tenant tier`);
      }
      
      // Execute tool with tenant-scoped resources
      return await this.executeToolWithTenantScope(
        name, 
        args, 
        tenantContext
      );
    });
  }
  
  private isToolAllowed(ctx: TenantToolContext, toolName: string): boolean {
    // Platform tools available to all
    if (this.isPlatformTool(toolName)) return true;
    // Check tenant-specific tool permissions
    return ctx.allowedTools.includes(toolName);
  }
}
```

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **MCP patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `mcp-server-isolation`, `mcp-client-patterns`
- **Tool patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tool-execution`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `mcp-server-isolation` | `MCP server multi-tenant isolation {date}` |
| `mcp-client-patterns` | `Model Context Protocol integration patterns {date}` |
| MCP security | `MCP tool security multi-tenant {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design MCP server architecture and tool isolation
- `bmad-bam-define-facade-contract` - Define MCP tool contracts and interfaces
- `bmad-bam-security-review` - Review MCP security controls and credential isolation
