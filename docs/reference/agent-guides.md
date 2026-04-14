# Agent Guides Reference

BAM provides **133 agent guides** that inject domain context following the WDS agent-guides pattern. These guides are loaded via extension menu items to provide agents with specialized knowledge.

## Overview

Agent guides are located in `src/data/agent-guides/bam/` and are loaded by extensions using prompts that reference the guide files. Each guide includes a "When to load" section that specifies the trigger conditions.

---

## Agent Role Guides (20)

Role-specific guides for each agent persona.

| Guide | When to Load | Related Extension |
|-------|--------------|-------------------|
| `analyst-guide.md` | During discovery when identifying bounded contexts | analyst-bam |
| `architect-guide.md` | During solutioning when designing architecture | architect-bam |
| `atlas-guide.md` | When designing platform/foundation architecture | architect-bam (Atlas persona) |
| `dev-guide.md` | During implementation of tenant-aware code | dev-bam |
| `devops-guide.md` | When configuring multi-tenant deployment | devops-bam |
| `freya-guide.md` | When designing tier-based UX flows | wds-freya-bam |
| `innovation-guide.md` | During SaaS feature ideation sessions | cis-innovation-bam |
| `kai-guide.md` | When designing integration and facade contracts | architect-bam (Kai persona) |
| `nova-guide.md` | When designing AI agent orchestration | architect-bam (Nova persona) |
| `platform-architecture.md` | During master architecture creation | architect-bam |
| `pm-guide.md` | During sprint planning with tenant stories | pm-bam |
| `po-guide.md` | When prioritizing tenant-specific backlog | po-bam |
| `qa-guide.md` | During tenant isolation test planning | dev-bam (QA capabilities) |
| `saga-guide.md` | When mapping tenant user journeys | wds-saga-bam |
| `security-guide.md` | During security review of tenant isolation | security-bam |
| `sm-guide.md` | During multi-tenant sprint ceremonies | dev-bam (SM capabilities) |
| `storyteller-guide.md` | When creating SaaS platform narratives | cis-storyteller-bam |
| `tea-guide.md` | When setting up tenant test fixtures | tea-bam |
| `tech-writer-guide.md` | When documenting tenant APIs | tech-writer-bam |
| `ux-guide.md` | When designing tenant portal interfaces | ux-bam |

---

## Tenant Isolation Patterns (18)

Patterns for implementing tenant data isolation.

| Guide | When to Load | Related Patterns |
|-------|--------------|------------------|
| `multi-tenant-patterns.md` | During tenant model selection | tenant-models.csv |
| `multi-tenant-context.md` | When implementing context propagation | tenant-context-patterns |
| `rls-best-practices.md` | When implementing row-level security | tenant-rls pattern |
| `rls-documentation.md` | When documenting RLS implementation | - |
| `tenant-context-propagation.md` | During context injection design | - |
| `tenant-customization-patterns.md` | When designing tenant branding/config | - |
| `tenant-isolation.md` | During isolation strategy selection | - |
| `tenant-lifecycle.md` | When designing onboarding/offboarding | - |
| `tenant-offboarding-patterns.md` | During deprovisioning design | - |
| `tenant-onboarding-patterns.md` | During provisioning design | - |
| `tenant-routing.md` | When implementing tenant resolution | - |
| `tenant-testing.md` | During tenant isolation test design | - |
| `testing-tenant-isolation.md` | When validating isolation boundaries | - |
| `white-labeling-guide.md` | When implementing custom branding | - |
| `data-residency.md` | When implementing data sovereignty | - |
| `data-sovereignty-patterns.md` | For regulatory data location requirements | - |
| `compliance.md` | During compliance framework selection | compliance-frameworks.csv |
| `government-compliance-patterns.md` | For FedRAMP/government requirements | - |

---

## AI Runtime Patterns (22)

Patterns for AI agent orchestration and runtime.

| Guide | When to Load | Related Patterns |
|-------|--------------|------------------|
| `ai-runtime.md` | During AI runtime architecture design and agent execution | ai-runtimes.csv |
| `agent-runtime-patterns.md` | When selecting orchestration framework | ai-runtimes.csv |
| `agent-coordination.md` | When designing multi-agent workflows | - |
| `agent-negotiation.md` | For agent consensus patterns | - |
| `agent-resilience-patterns.md` | When implementing agent fault tolerance | - |
| `agent-identity-tbac-patterns.md` | For tenant-based access control in agents | - |
| `context-compiler-patterns.md` | When building context for LLM calls | - |
| `run-contracts.md` | During tool contract design or when defining agent execution contracts | - |
| `tool-execution.md` | During tool invocation design | - |
| `tool-execution-middleware.md` | When adding tool middleware | - |
| `memory-tiers.md` | When designing agent memory architecture | - |
| `mcp-integration.md` | When integrating MCP protocol | - |
| `mcp-client-patterns.md` | For MCP client implementation | - |
| `mcp-server-isolation.md` | When isolating MCP servers by tenant | - |
| `action-gateway-patterns.md` | For centralized action handling | - |
| `llm-versioning.md` | When managing model versions | - |
| `ai-documentation-patterns.md` | For AI system documentation | - |
| `ai-transparency-patterns.md` | When implementing AI explainability | - |
| `human-oversight-patterns.md` | For human-in-the-loop patterns | - |

---

## Module Architecture Patterns (16)

Patterns for modular monolith design.

| Guide | When to Load | Related Patterns |
|-------|--------------|------------------|
| `module-architecture.md` | During bounded context design | bam-patterns.csv |
| `module-boundaries.md` | When defining module interfaces | - |
| `module-facade-patterns.md` | During facade contract design | - |
| `modular-monolith-patterns.md` | For modular monolith architecture | - |
| `ddd-module-patterns.md` | When applying DDD to modules | - |
| `facade-contracts.md` | During contract definition | - |
| `integration-patterns.md` | When designing cross-module integration | - |
| `context-propagation-patterns.md` | For context flow across modules | - |
| `event-driven-patterns.md` | When using event-driven communication | - |
| `saga-orchestration-patterns.md` | For distributed transaction patterns | - |
| `parallel-development-guide.md` | When teams work on separate modules | - |
| `api-version-routing.md` | For API version management | - |
| `api-gateway-patterns.md` | When designing API gateway layer | - |
| `api-throttling.md` | For rate limiting implementation | - |
| `rate-limiting.md` | During quota enforcement design | - |

---

## Operations Patterns (18)

Patterns for SaaS operations and observability.

| Guide | When to Load | Related Patterns |
|-------|--------------|------------------|
| `saas-lifecycle.md` | During lifecycle phase design | - |
| `observability.md` | When designing monitoring | - |
| `deployment.md` | During deployment strategy selection | - |
| `disaster-recovery.md` | When designing DR strategy | - |
| `incident-response-patterns.md` | For incident handling procedures | - |
| `change-management-patterns.md` | For change control processes | - |
| `risk-management-patterns.md` | During risk assessment | - |
| `usage-metering.md` | When implementing usage tracking | - |
| `cost-tracking.md` | For tenant cost allocation | - |
| `quota-management.md` | When implementing resource quotas | - |
| `billing-integration-patterns.md` | For billing system integration | - |
| `audit-logging-patterns.md` | When implementing audit trails | - |
| `background-jobs.md` | For background task patterns | - |
| `notification-system.md` | When designing notifications | - |
| `webhook-delivery.md` | For webhook implementation | - |
| `file-storage.md` | When designing file storage | - |
| `search-indexing.md` | For search implementation | - |
| `data-archival.md` | When designing data retention | - |

---

## Infrastructure Patterns (14)

Patterns for infrastructure and deployment.

| Guide | When to Load | Related Patterns |
|-------|--------------|------------------|
| `kubernetes-multi-tenancy.md` | When deploying to Kubernetes | - |
| `serverless-multi-tenancy.md` | For serverless architectures | - |
| `message-queue-isolation.md` | When isolating message queues | - |
| `websocket-multi-tenancy.md` | For WebSocket connections | - |
| `graphql-multi-tenancy.md` | When implementing GraphQL | - |
| `grpc-multi-tenancy.md` | For gRPC services | - |
| `caching-strategies.md` | During cache design and for cache isolation patterns | - |
| `circuit-breaker.md` | For fault tolerance | - |
| `retry-policies.md` | When implementing retries | - |
| `idempotency.md` | For idempotent operations | - |
| `performance-isolation.md` | When implementing noisy neighbor protection | - |
| `scaling-patterns.md` | During scalability design | - |
| `local-development-setup.md` | When setting up local dev | - |

---

## Security Patterns (12)

Patterns for security and compliance.

| Guide | When to Load | Related Patterns |
|-------|--------------|------------------|
| `all-security-patterns.md` | During security review | - |
| `encryption-patterns.md` | When implementing encryption | - |
| `encryption-key-management.md` | For key management design | - |
| `session-management.md` | During session design | - |
| `sso-integration-patterns.md` | When implementing SSO | - |
| `network-security-patterns.md` | For network security design | - |
| `testing-isolation.md` | When testing security boundaries | - |
| `testing-agent-safety.md` | For AI safety evaluation | - |
| `quality-gates.md` | During quality gate planning | quality-gates.csv |
| `tier-ux.md` | When designing tier-based access | - |
| `feature-toggle-patterns.md` | For feature flag implementation | - |
| `experimentation.md` | When implementing A/B testing | - |

---

## Innovation and Strategy Guides (12)

Guides for CIS innovation extensions.

| Guide | When to Load | Related Extension |
|-------|--------------|-------------------|
| `saas-innovation.md` | During SaaS innovation sessions | cis-innovation-bam |
| `saas-ideation.md` | When brainstorming features | cis-brainstorming-bam |
| `saas-design-thinking.md` | For design thinking workshops | cis-design-thinking-bam |
| `saas-problem-solving.md` | When solving technical challenges | cis-problem-solver-bam |
| `saas-narrative.md` | When crafting platform stories | cis-storyteller-bam |
| `saas-presentation.md` | For stakeholder presentations | cis-presentation-bam |
| `market-analysis.md` | During market research | cis-market-bam |
| `scaling-patterns.md` | When planning scaling strategy | cis-scale-bam |
| `value-creation.md` | For value proposition design | cis-value-bam |
| `llmops.md` | For LLM operations patterns | - |
| `multi-agent-coordination.md` | When orchestrating multiple agents | - |
| `customization.md` | For tenant customization options | - |

---

## Utility Guides (1)

General utility guides.

| Guide | When to Load | Related Patterns |
|-------|--------------|------------------|
| `local-development-setup.md` | When setting up development environment or local multi-tenant testing | - |

---

## Loading Agent Guides

Guides are loaded via extension menu items. Each extension has a context loading menu item:

```yaml
menu:
  - trigger: bam-{domain}-context
    action: "#load-{domain}-context-prompt"
    description: Load BAM {domain} context

prompts:
  - id: load-{domain}-context-prompt
    content: |
      Read and internalize the BAM guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
      
      Confirm when loaded.
```

## Related Documentation

- [Agents Reference](agents.md) - Extension capabilities
- [Pattern Registry Reference](pattern-registry.md) - CSV-based patterns
- [Workflows Reference](workflows.md) - Workflow catalog
