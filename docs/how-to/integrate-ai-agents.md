# How to Integrate AI Agents

This guide covers adding AI agent capabilities to your multi-tenant platform.

## Prerequisites

- Foundation architecture complete (QG-F1 passed)
- AI runtime selected during BAM install

## Steps

### 1. Design Agent Runtime

```
/nova
> ARA  -- Agent Runtime Architecture
```

Nova guides you through:
- Orchestration model (LangGraph, CrewAI, etc.)
- Memory tier configuration
- Tool registry design
- Kill switch mechanisms

### 2. Define Tool Contracts

Each tool needs a contract:

```typescript
interface ToolDefinition {
  name: string;
  description: string;
  parameters: JSONSchema;
  permissions: {
    tiers: ('free' | 'pro' | 'enterprise')[];
    requiresApproval: boolean;
    tenantScoped: boolean;
  };
}

// Example tool
const readProjectTool: ToolDefinition = {
  name: 'read_project',
  description: 'Read project details by ID',
  parameters: {
    type: 'object',
    properties: {
      projectId: { type: 'string' },
    },
    required: ['projectId'],
  },
  permissions: {
    tiers: ['free', 'pro', 'enterprise'],
    requiresApproval: false,
    tenantScoped: true,  // Auto-filters by tenant
  },
};
```

### 3. Implement Action Gateway

The gateway controls all tool execution:

```typescript
class ActionGateway {
  async execute(tool: string, params: any, context: AgentContext) {
    // 1. Permission check
    const toolDef = this.tools.get(tool);
    if (!toolDef.permissions.tiers.includes(context.tier)) {
      throw new ForbiddenError('Upgrade required');
    }

    // 2. Tenant context injection
    if (toolDef.permissions.tenantScoped) {
      params = { ...params, tenantId: context.tenantId };
    }

    // 3. Approval check
    if (toolDef.permissions.requiresApproval) {
      await this.requestApproval(tool, params, context);
    }

    // 4. Execute
    return this.executeTool(tool, params);
  }
}
```

### 4. Configure Memory Tiers

```typescript
const memoryConfig = {
  ephemeral: {
    // Current run only
    storage: 'memory',
    ttl: null,
  },
  working: {
    // Conversation scope
    storage: 'redis',
    ttl: '24h',
    tenantPrefix: true,
  },
  longTerm: {
    // Persistent per tenant
    storage: 'postgres',
    ttl: null,
    tenantScoped: true,
  },
};
```

### 5. Set Up Kill Switches

```typescript
const killSwitches = {
  // User can stop anytime
  userStop: socket.on('stop', () => agent.abort()),
  
  // Timeout per tier
  timeout: {
    free: 30_000,
    pro: 120_000,
    enterprise: 600_000,
  },
  
  // Cost limit
  costLimit: (usage) => {
    if (calculateCost(usage) > context.costLimit) {
      agent.abort('cost_limit');
    }
  },
};
```

### 6. Create Safety Evaluation

```
/nova
> AED  -- AI Eval Safety Design
```

Define golden tasks and safety checks:

```typescript
const goldenTasks = [
  {
    name: 'summarize_document',
    input: { doc: 'test content' },
    expected: {
      completes: true,
      maxTokens: 500,
      noTenantLeak: true,
    },
  },
];
```

## Quality Gates

- **QG-M3**: Agent runtime architecture complete
- **QG-I3**: AI safety evaluation passes

## Related

- [AI Agent Architecture](../explanation/ai-agent-architecture.md) - Concepts
- [Agent Reference](../reference/agents.md) - Nova capabilities
