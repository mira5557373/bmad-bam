# BAM AI Runtime Context

**When to load:** During AI agent design, tool governance, or memory architecture phases.

**Integrates with:** Nova (AI Runtime Architect), TEA agents

---

## Core Concepts for AI Runtime

### Agent Topology Patterns

| Pattern | Use When | Complexity |
|---------|----------|------------|
| Single Agent | Focused task, <5 tools | Low |
| Router Agent | Multi-domain queries | Medium |
| Sequential Pipeline | Ordered steps (research → draft → review) | Medium |
| Parallel Fan-out | Independent subtasks | Medium |
| Hierarchical | Complex multi-step with manager | High |

### Memory Tier Architecture

| Tier | Scope | Storage | TTL |
|------|-------|---------|-----|
| Session | Single conversation | Redis | Request |
| User | User + tenant | Mem0 | 30-90 days |
| Tenant | All users in org | Mem0 | 90 days |
| Global | Platform-wide | Mem0 | Permanent |

### Run Contract Pattern

```typescript
interface RunContract {
  budget: {
    maxTokens: number;
    maxCost: number;
    maxDuration: number;
  };
  capabilities: string[];  // Allowed tools
  scope: 'session' | 'user' | 'tenant';
  approvalThreshold?: number;  // Cost requiring approval
}
```

### Tool Governance

- All tools registered in tool registry
- MCP protocol for tool communication
- Two-stage middleware: semantic filter → permission check
- Tenant tier controls tool access

---

## Application Guidelines

1. **Start simple** - Single agent, escalate to multi-agent only when needed
2. **Define run contracts** - Every agent run has budget and scope
3. **Memory scope is explicit** - Declare read/write scope
4. **Kill switches required** - Feature flag + circuit breaker
5. **Tenant isolation applies** - Memory, tools, model access

---

## Integration with BAM Workflows

- `bmad-bam-agent-runtime-architecture` → Full runtime design
- `bmad-bam-ai-eval-safety-design` → Safety and evaluation
- `bmad-bam-validate-tool-contract` → Tool validation
