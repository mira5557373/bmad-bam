# Knowledge Fragments Reference

BAM includes 30 knowledge fragments organized by tier.

## Tier System

| Tier | Loading | Use Case |
|------|---------|----------|
| Core | Always available | Foundational patterns |
| Extended | Load on demand | Deeper analysis |
| Specialized | Load when relevant | Niche scenarios |

## Fragment Index

Located at: `src/skills/bam-resources/bam-index.csv`

---

## Core Tier (10 fragments)

### multi-tenant-patterns.md
RLS, schema, and database isolation strategies for tenant separation.

### rls-best-practices.md
PostgreSQL row-level security implementation patterns and pitfalls.

### ddd-module-patterns.md
Bounded contexts, aggregates, and module design using DDD principles.

### module-facade-patterns.md
Cross-module communication through facade interfaces.

### shared-kernel-patterns.md
Minimal shared code and types across modules.

### event-driven-patterns.md
Module-to-module async communication via events.

### independent-development.md
Patterns for teams to work independently on modules.

### local-development-setup.md
Local environment configuration for multi-tenant development.

### workflow-sequence.md
BAM workflow execution order and dependencies.

### workflow-ownership.md
Agent-to-workflow mapping and responsibilities.

---

## Extended Tier (12 fragments)

### agent-runtime-patterns.md
LangGraph orchestration and state machine patterns.

### run-contracts.md
Agent task contracts and execution patterns.

### memory-tiers.md
Ephemeral, working, and long-term memory design.

### action-gateway-patterns.md
Tool execution and safety gate patterns.

### context-compiler-patterns.md
Dynamic context assembly for AI agents.

### tool-execution-middleware.md
Middleware patterns for tool safety and auditing.

### testing-tenant-isolation.md
Test patterns for verifying tenant isolation.

### testing-multi-tenant-fixtures.md
Fixture setup for multi-tenant testing.

### testing-agent-safety.md
AI safety evaluation test patterns.

### parallel-development-guide.md
Multi-team parallel development coordination.

### api-version-routing.md
Version-aware API routing patterns.

### provisioning-ui-patterns.md
Tenant provisioning user interface patterns.

---

## Specialized Tier (8 fragments)

### agent-data-governance-patterns.md
Data access controls and governance for AI agents.

### agent-identity-tbac-patterns.md
Tenant-based access control for agent actions.

### agent-lifecycle-versioning-patterns.md
Agent version management and migration.

### agent-resilience-patterns.md
Error handling and recovery for agents.

### llm-versioning.md
LLM version management and migration strategies.

### saga-orchestration-patterns.md
Distributed transaction patterns (when needed).

### wds-integration-patterns.md
Integration with WDS module for UX design.

### section-reference-map.md
Cross-reference between BAM documents and TSA.

---

## Loading Fragments

### In Workflows
```markdown
## Prerequisites
Load knowledge fragment: `multi-tenant-patterns.md`
```

### In Agent Guides
```markdown
## Related Knowledge
- `agent-runtime-patterns.md` - For orchestration details
- `memory-tiers.md` - For memory design
```

### Via Index
```typescript
// Load by tag
const fragments = await loadFragments({ tags: ['isolation'] });

// Load by tier
const coreFragments = await loadFragments({ tier: 'core' });
```

## Fragment Format

```markdown
# Fragment Title

## Overview
Brief description of the pattern.

## When to Use
Scenarios where this pattern applies.

## Pattern Details
Detailed explanation with examples.

## Implementation
```code
// Example implementation
```

## Anti-Patterns
What NOT to do.

## Related Fragments
- Links to related knowledge
```
