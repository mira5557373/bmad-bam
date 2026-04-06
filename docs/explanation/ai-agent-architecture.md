# AI Agent Architecture

BAM provides patterns for building AI agents in a multi-tenant SaaS environment. This document explains the architecture.

## Why AI Agents in SaaS?

Modern SaaS platforms increasingly embed AI capabilities:
- **Copilots** - In-context assistance
- **Automation** - Workflow execution
- **Analysis** - Data insights
- **Generation** - Content creation

Each requires careful architecture in a multi-tenant context.

## Agent Architecture Layers

```
┌─────────────────────────────────────────────────┐
│                   User Request                   │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              Tenant Context Layer                │
│  - Extract tenant from JWT                       │
│  - Validate tier permissions                     │
│  - Set resource limits                           │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│             Agent Orchestration Layer            │
│  - LangGraph state machine                       │
│  - Step execution                                │
│  - Error handling                                │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              Action Gateway Layer                │
│  - Tool permission checking                      │
│  - Human approval routing                        │
│  - Audit logging                                 │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│                  Tool Layer                      │
│  - MCP servers                                   │
│  - Internal APIs                                 │
│  - External integrations                         │
└─────────────────────────────────────────────────┘
```

## Tenant-Aware Agent Design

### Context Injection

```typescript
interface AgentContext {
  tenantId: string;
  workspaceId: string;
  userId: string;
  tier: 'free' | 'pro' | 'enterprise';
  permissions: string[];
}

const createAgent = (context: AgentContext) => {
  return new StateGraph({
    state: {
      ...context,
      messages: [],
      tools: getToolsForTier(context.tier),
    },
    // ...
  });
};
```

### Tier-Based Capabilities

| Capability | Free | Pro | Enterprise |
|------------|------|-----|------------|
| Messages/day | 100 | 1,000 | Unlimited |
| Tool access | Read-only | Read/Write | All + Custom |
| Memory | Session | 7 days | Unlimited |
| Model | GPT-3.5 | GPT-4 | GPT-4 + Custom |

### Resource Limits

```typescript
const enforceLimit = async (context: AgentContext, action: string) => {
  const usage = await getUsage(context.tenantId, action);
  const limit = getLimitForTier(context.tier, action);
  
  if (usage >= limit) {
    throw new RateLimitError({
      action,
      usage,
      limit,
      upgradeUrl: getUpgradeUrl(context.tier),
    });
  }
};
```

## Memory Architecture

BAM defines three memory tiers:

### 1. Ephemeral Memory
```typescript
// Lives only during agent run
const ephemeralMemory = {
  currentTask: Task,
  intermediateResults: any[],
  scratchpad: string,
};
```

### 2. Working Memory
```typescript
// Persists across runs, per conversation
const workingMemory = {
  conversationId: string,
  messages: Message[],
  context: Record<string, any>,
  ttl: '24h',
};
```

### 3. Long-Term Memory
```typescript
// Persists indefinitely, tenant-scoped
const longTermMemory = {
  tenantId: string,
  facts: Fact[],
  preferences: Preference[],
  vectorStore: VectorStoreRef,
};
```

### Tenant Isolation in Memory

```typescript
// Vector store isolation
const vectorStore = await getVectorStore({
  tenantId: context.tenantId,
  namespace: `tenant_${context.tenantId}`,
  // Queries automatically filtered
});

// Memory queries include tenant filter
const memories = await memoryStore.query({
  tenantId: context.tenantId,
  query: 'project deadline',
});
```

## Action Gateway Pattern

The Action Gateway controls all tool execution:

```typescript
class ActionGateway {
  async execute(action: ToolAction): Promise<ToolResult> {
    // 1. Permission check
    await this.checkPermission(action);
    
    // 2. Rate limit check
    await this.checkRateLimit(action);
    
    // 3. Human approval (if required)
    if (this.requiresApproval(action)) {
      await this.requestApproval(action);
    }
    
    // 4. Tenant context injection
    const contextualAction = this.injectTenantContext(action);
    
    // 5. Execute
    const result = await this.executeAction(contextualAction);
    
    // 6. Audit log
    await this.logAction(action, result);
    
    return result;
  }
}
```

### Permission Matrix

```yaml
tools:
  read_project:
    tiers: [free, pro, enterprise]
    approval: none
    
  update_project:
    tiers: [pro, enterprise]
    approval: none
    
  delete_project:
    tiers: [pro, enterprise]
    approval: human_in_loop
    
  external_api_call:
    tiers: [enterprise]
    approval: admin_approval
```

## Kill Switch Design

Every agent must have kill switches:

### 1. User Kill Switch
```typescript
// User can stop any time
socket.on('stop', () => {
  agent.abort('user_requested');
});
```

### 2. Timeout Kill Switch
```typescript
// Automatic timeout per tier
const timeouts = {
  free: 30_000,      // 30 seconds
  pro: 120_000,      // 2 minutes
  enterprise: 600_000, // 10 minutes
};
```

### 3. Cost Kill Switch
```typescript
// Stop if cost exceeds threshold
agent.on('token_usage', (usage) => {
  const cost = calculateCost(usage);
  if (cost > context.costLimit) {
    agent.abort('cost_limit_exceeded');
  }
});
```

### 4. Admin Kill Switch
```typescript
// Platform-wide emergency stop
await redis.publish('agent:kill_all', {
  reason: 'emergency_stop',
  initiator: adminId,
});
```

## Evaluation Framework

BAM requires safety evaluation:

### Golden Tasks
```typescript
const goldenTasks = [
  {
    input: 'Summarize this document',
    expectedBehavior: 'Returns summary under 200 words',
    mustNotDo: ['Access other tenants', 'Call external APIs'],
  },
];
```

### Safety Checks
```typescript
const safetyChecks = [
  'prompt_injection_resistance',
  'tenant_boundary_respect',
  'tool_permission_compliance',
  'rate_limit_respect',
];
```

## Quality Gates

- **QG-M3**: Agent runtime architecture complete
- **QG-I3**: Agent safety evaluation passes
- **QG-P1**: All safety checks pass in production config
