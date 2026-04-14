# MCP Client Patterns

**When to load:** When implementing MCP client integration, agent tool discovery, or when user mentions Model Context Protocol clients, tool discovery, or MCP connection management.

**Integrates with:** Architect (Nova persona), Dev agent, Platform architect

---

## Core Concepts

### What is MCP Client?

MCP (Model Context Protocol) client is the component that connects AI agents to MCP servers, discovering and invoking tools. In multi-tenant SaaS, MCP clients must handle tenant context and connection lifecycle appropriately.

### Client Strategy Comparison

| Strategy | Description | Tenant Consideration |
|----------|-------------|---------------------|
| Direct Client | One client per agent | Per-agent lifecycle |
| Pooled Client | Shared connection pool | Tenant-aware pooling |
| Gateway Client | Central MCP gateway | Tenant routing |

---

## Key Patterns

### Pattern 1: Direct Client Per Agent

Each agent maintains its own MCP client.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Client Instance | Agent-owned connection | Per-tenant context |
| Tool Discovery | On-demand discovery | Tenant-filtered tools |
| Connection Lifecycle | Agent-bound | Cleanup on agent end |
| Error Handling | Agent-level retry | Tenant budget aware |

### Direct Client Flow

```
Agent
   │
   └── MCP Client
          │
          ├── Connect to MCP Server
          │
          ├── Discover Tools
          │   └── Filter by tenant permissions
          │
          └── Invoke Tool
              └── Include tenant context
```

### Pattern 2: Connection Pooling

Share connections across agents within tenant.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Pool Manager | Manage connections | Per-tenant pools |
| Connection Checkout | Acquire connection | Tenant-scoped checkout |
| Connection Return | Release connection | Clear tenant state |
| Pool Sizing | Configure capacity | Per-tier limits |

### Pool Architecture

```
┌─────────────────────────────────────────┐
│          MCP Connection Pool             │
│                                          │
│  Tenant A Pool          Tenant B Pool   │
│  ┌──────────────┐      ┌──────────────┐ │
│  │ Connection 1 │      │ Connection 1 │ │
│  │ Connection 2 │      │ Connection 2 │ │
│  │ Connection 3 │      │              │ │
│  └──────────────┘      └──────────────┘ │
│                                          │
│  Pool sizing based on tenant tier        │
└─────────────────────────────────────────┘
```

### Pattern 3: Gateway Client

Centralized MCP gateway for all agents.

| Component | Purpose | Tenant Consideration |
|-----------|---------|---------------------|
| Gateway Service | Central MCP proxy | Multi-tenant routing |
| Request Router | Route to MCP servers | Tenant-aware routing |
| Response Aggregator | Combine results | Tenant isolation |
| Caching | Tool cache | Per-tenant cache |

### Gateway Architecture

```
Agents
   │
   └── MCP Gateway
          │
          ├── Tenant Router
          │
          ├── Tool Registry (cached)
          │
          └── MCP Server Pool
              ├── Shared Server
              └── Tenant-Specific Servers
```

### Pattern 4: Tool Discovery

Discover and cache available tools.

| Discovery Type | Description | Tenant Consideration |
|----------------|-------------|---------------------|
| Startup Discovery | On client init | Cache per tenant |
| On-Demand Discovery | When needed | Lazy loading |
| Periodic Refresh | Scheduled update | Per-tenant schedule |
| Event-Driven | On tool change | Tenant notification |

---

## Application Guidelines

When implementing MCP clients:

1. **Propagate tenant context** - Include in all MCP calls
2. **Handle connection failures** - Retry with backoff
3. **Cache tool discovery** - Reduce discovery overhead
4. **Monitor connection health** - Track per-tenant metrics
5. **Clean up resources** - Proper connection lifecycle

---

## Per-Tier Client Configuration

| Tier | Pool Size | Discovery Cache | Timeout |
|------|-----------|-----------------|---------|
| Free | 2 connections | 5 minutes | 30 seconds |
| Pro | 10 connections | 1 hour | 60 seconds |
| Enterprise | 50 connections | 24 hours | 120 seconds |

---

## Client Lifecycle

| Phase | Action | Tenant Consideration |
|-------|--------|---------------------|
| Initialize | Create client | Set tenant context |
| Connect | Establish connection | Per-tenant auth |
| Discover | Find available tools | Tenant filtering |
| Invoke | Call tools | Tenant in request |
| Cleanup | Close connections | Release resources |

---

## Error Handling

| Error Type | Handling | Tenant Impact |
|------------|----------|---------------|
| Connection Failed | Retry with backoff | Single tenant |
| Tool Not Found | Check permissions | Tenant tool access |
| Timeout | Cancel and retry | Tenant budget |
| Server Error | Circuit breaker | Per-tenant state |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| Shared connections | Cross-tenant context | Tenant-scoped pools |
| No cleanup | Connection leaks | Proper lifecycle |
| Missing retry | Transient failures | Retry with backoff |
| No discovery cache | High overhead | Cache tool lists |
| Missing monitoring | Hidden issues | Track metrics |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Direct vs pooled client? | Pooled for high-volume; direct for simplicity | Pool amortizes connection cost |
| Gateway vs direct connection? | Gateway for complex routing; direct for simple cases | Gateway adds latency but simplifies management |
| Discovery caching? | Always cache with appropriate TTL | Reduces discovery overhead |
| Connection timeout? | Based on tool execution time expectations | Balance responsiveness vs reliability |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design MCP integration
- `bmad-bam-validate-tool-contract` - Verify tool contracts
- `bmad-bam-ai-eval-safety-design` - Tool safety validation

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **MCP client:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `mcp-client-patterns`
- **MCP server:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `mcp-server-isolation`
- **Tool execution:** `{project-root}/_bmad/bam/data/agent-guides/bam/tool-execution.md`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "MCP client patterns {date}"
- Search: "Model Context Protocol integration {date}"
- Search: "AI agent tool discovery patterns {date}"
