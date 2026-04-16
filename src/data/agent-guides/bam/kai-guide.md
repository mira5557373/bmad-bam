# Kai Guide - BAM Extension

**When to load:** During Phase 3-4 (Solutioning/Implementation) when designing module integrations or MCP, or when user mentions facade contracts, cross-module communication, or MCP integration.
**Integrates with:** Architect+Kai (architect-bam.yaml), integration patterns, cross-module design

This guide provides BAM-specific context for Kai (integration specialist) working on multi-tenant agentic AI platforms.

## Role Context

As Kai on a BAM project, you focus on:
- Designing module facade contracts
- Implementing cross-module integrations
- Managing MCP (Model Context Protocol) integrations
- Ensuring contract compatibility across versions

## Core Concepts

### Contract-First Integration
All module integrations begin with explicit contract definition before implementation. Contracts specify the interface, data transfer objects, error types, and tenant context requirements. This enables parallel development, contract testing, and clear versioning semantics.

### Tenant Context Propagation
Every integration must explicitly handle tenant context flow. For synchronous facade calls, context passes as a validated parameter. For async events, tenant_id is a required field in every event payload. For external APIs, per-tenant credentials must be securely managed and isolated.

### MCP Tool Governance
Model Context Protocol tools in multi-tenant environments require explicit permission models mapping tools to tenant tiers and roles. All tool invocations must be audited with tenant context, rate-limited per tenant, and sandboxed to prevent cross-tenant data access.

## Application Guidelines

When designing integrations:
1. Define contracts with tenant context requirements before any implementation
2. Use semantic versioning with clear deprecation timelines for contract evolution
3. Implement circuit breakers for all cross-module and external calls
4. Include correlation IDs that flow through all integration points for tracing
5. Test failure modes explicitly - integration tests should exercise error paths

## Integration Complexity Matrix

Use this matrix to assess and plan integration efforts:

| Integration Type | Complexity | Tenant Considerations | Typical Timeline |
|-----------------|------------|----------------------|------------------|
| **Intra-Module** (same bounded context) | Low | Shared tenant context | 1-2 days |
| **Inter-Module Sync** (facade call) | Medium | Context propagation required | 3-5 days |
| **Inter-Module Async** (event-driven) | Medium-High | Tenant in event payload | 1-2 weeks |
| **External API** (third-party) | High | Per-tenant credentials/config | 2-4 weeks |
| **MCP Tool** (AI agent tools) | High | Tenant permissions, rate limits | 2-3 weeks |
| **Webhook** (inbound) | Medium | Tenant identification, validation | 1-2 weeks |
| **Webhook** (outbound) | Medium | Tenant-specific endpoints | 1-2 weeks |

### Contract Versioning Decision Matrix

| Change Type | Backward Compatible? | Version Strategy | Deprecation Timeline |
|-------------|---------------------|------------------|---------------------|
| New optional field | Yes | Minor version bump | N/A |
| New required field | No | Major version bump | 6 months minimum |
| Field removal | No | Major version bump | 12 months minimum |
| Field type change | No | Major version bump | 6 months minimum |
| New endpoint | Yes | Minor version bump | N/A |
| Endpoint removal | No | Major version bump | 12 months minimum |
| Behavior change | Depends | Case-by-case | Based on impact |

## Actionable Guidance

### Designing Module Facade Contracts

1. **Define Interface Scope** - List all operations the facade must expose
2. **Create DTOs** - Design data transfer objects that hide internal models
3. **Specify Tenant Context** - Define how tenant context is passed and validated
4. **Document Error Contracts** - Define all error types and their meanings
5. **Version from Start** - Include version in contract from initial design
6. **Write Contract Tests** - Create tests that verify contract compliance
7. **Document Breaking Changes** - Maintain changelog of contract evolution

### Implementing Cross-Module Communication

1. **Choose Communication Style** - Sync (immediate need) vs Async (eventual consistency)
2. **Establish Tenant Flow** - Ensure tenant context propagates across boundary
3. **Implement Circuit Breakers** - Protect against cascade failures
4. **Add Retry Logic** - Handle transient failures gracefully
5. **Log at Boundaries** - Trace requests across module boundaries
6. **Monitor Latency** - Track inter-module call performance
7. **Test Failure Modes** - Verify behavior when downstream fails

### Managing MCP Integrations

1. **Inventory Tools** - Catalog all MCP tools with capabilities and permissions
2. **Define Permission Model** - Map tools to tenant tiers and permissions
3. **Implement Rate Limiting** - Per-tenant rate limits for tool invocations
4. **Add Audit Logging** - Log all tool invocations with tenant context
5. **Handle Failures Gracefully** - Provide meaningful errors to agents
6. **Monitor Tool Usage** - Track tool popularity and performance by tenant
7. **Plan Tool Versioning** - Strategy for evolving tool capabilities

## Key Considerations

### Facade Contracts
- Design clear, minimal facade interfaces
- Version contracts explicitly
- Document breaking vs non-breaking changes

### Contract Design
- Use semantic versioning for contracts
- Provide migration paths for contract evolution
- Test contracts at module boundaries

### MCP Integration
- Tenant context flows through MCP calls
- Tool registrations respect tenant permissions
- Handle MCP failures gracefully per tenant

## SaaS-Specific Considerations

### Multi-Tenant Integration Patterns

**Tenant-Aware API Gateway:**
- Extract tenant from authentication token
- Route to appropriate backend based on tenant tier
- Apply tenant-specific rate limits
- Log all requests with tenant context

**Tenant Credential Management:**
- Store per-tenant API keys securely
- Support tenant-specific OAuth tokens
- Implement credential rotation per tenant
- Isolate credential access strictly

**Webhook Security:**
- Generate unique webhook URLs per tenant
- Validate webhook signatures
- Rate limit incoming webhooks per tenant
- Queue webhooks to prevent blocking

### Contract Design for Multiple Tiers

Design contracts that support tier-based functionality:

| Contract Element | Free Tier | Pro Tier | Enterprise Tier |
|-----------------|-----------|----------|-----------------|
| Batch size limits | 10 items | 100 items | 1000+ items |
| Rate limits | 100/hour | 1000/hour | Custom |
| Response fields | Basic | Extended | Full + custom |
| Async operations | Not available | Available | Priority queue |
| Webhook support | Not available | Standard | Custom payloads |

### Integration Error Handling

**Error Categories:**
- `TENANT_NOT_AUTHORIZED` - Tenant lacks permission for operation
- `TIER_LIMIT_EXCEEDED` - Operation not available in tenant's tier
- `RATE_LIMIT_EXCEEDED` - Tenant has hit rate limit
- `CONTRACT_VERSION_MISMATCH` - Client using deprecated contract
- `DOWNSTREAM_UNAVAILABLE` - External service temporarily unavailable
- `TENANT_CREDENTIAL_INVALID` - Per-tenant credential issue

**Error Response Pattern:**
- Include error code for programmatic handling
- Provide human-readable message
- Include correlation ID for support
- Suggest resolution when possible
- Never leak other tenant information

### External Integration Security

**Per-Tenant External Credentials:**
- Encrypt credentials at rest with tenant-specific keys
- Rotate credentials on configurable schedule
- Audit credential access and usage
- Support multiple credential sets per integration

**Integration Health Monitoring:**
- Monitor external API availability per tenant
- Alert on tenant-specific integration failures
- Track API quota usage per tenant
- Provide tenant visibility into integration status

### MCP Tool Governance

**Tool Permission Model:**

| Permission Level | Available To | Example Tools |
|-----------------|--------------|---------------|
| Platform Tools | All tenants | Time, date, calculations |
| Standard Tools | Pro + Enterprise | File operations, web search |
| Advanced Tools | Enterprise only | Code execution, database access |
| Custom Tools | Per-tenant config | Tenant-integrated systems |

**Tool Safety for Multi-Tenant:**
- Sandbox tool execution per tenant
- Limit resource consumption per tool invocation
- Audit all tool calls with full context
- Implement kill switch for runaway tools

## Outputs

| Deliverable | Format | Template |
|-------------|--------|----------|
| Facade Contract Specification | Markdown | `facade-contract-template.md` |
| Integration Design Document | Markdown | `integration-design-template.md` |
| MCP Tool Registry | Markdown | `mcp-tool-registry-template.md` |
| Contract Migration Plan | Markdown | N/A |

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Module needs data from another module | Use facade call, not direct DB access | Maintains module boundaries and tenant isolation |
| Integration latency is critical | Synchronous facade with caching | Async adds complexity when real-time needed |
| Data consistency can be eventual | Use domain events | Reduces coupling and enables independent scaling |
| External API has per-tenant limits | Implement tenant-aware rate limiting | Prevents one tenant exhausting shared quotas |
| Contract change affects consumers | Major version bump with migration period | Never break existing integrations without notice |
| MCP tool accesses sensitive data | Enterprise tier only with audit logging | High-risk tools require maximum governance |

## Related Workflows

- `define-facade-contract` - Define public facade contracts between modules
- `evolve-facade-contract` - Evolve existing facade contracts with versioning
- `bmad-bam-convergence-verification` - Verify convergence across module integrations

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Integration patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `integration-*`
- **Facade patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `facade-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "modular monolith integration patterns {date}"
- Search: "facade contract design multi-tenant {date}"
- Search: "event-driven architecture module communication {date}"
