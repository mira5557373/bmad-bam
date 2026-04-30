---
name: qg-mcp1-mcp-integration
description: MCP integration validation gate ensuring tenant isolation and tool governance
module: bam
version: 1.0.0
tags: [mcp, quality-gate, multi-tenant, tools]
---

# QG-MCP1: MCP Integration Gate

> **Gate ID:** QG-MCP1 (MCP Integration)
> **Definition:** MCP integration gate validates tenant-aware tool registration and governance.
> **Scope:** Covers MCP server registration, tool discovery, tenant isolation, and invocation safety.
> **Recovery:** Gate failure recovery requires fixing tenant context propagation before production deployment.

**Workflow:** bmad-bam-mcp-integration
**Prerequisites:** QG-F1 (Foundation)

---

## Purpose

The MCP Integration Gate (QG-MCP1) validates that Model Context Protocol servers are properly integrated with multi-tenant isolation. This gate ensures:

1. **Tenant-aware registration** - All MCP servers register with tenant context
2. **Scoped tool discovery** - Clients discover only tenant-authorized capabilities
3. **Isolation enforcement** - No cross-tenant tool access is possible
4. **Audit compliance** - All tool invocations are logged with tenant context

Passing QG-MCP1 enables safe production deployment of MCP-based tool integrations.

---

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** All MCP servers register with tenant context
- [ ] **CRITICAL:** Tool discovery returns tenant-scoped capabilities only
- [ ] **CRITICAL:** No cross-tenant tool access possible
- [ ] **CRITICAL:** Tool invocations include tenant_id in all requests
- [ ] **CRITICAL:** Server-side tenant validation active (not just client filtering)

---

## MCP Server Registration

- [ ] **CRITICAL:** Server registration includes tenant_id parameter
- [ ] **CRITICAL:** Server capabilities filtered by tenant tier
- [ ] Tool manifest includes tenant scope metadata
- [ ] Server health endpoints return tenant-aware status
- [ ] Registration failures logged with tenant context
- [ ] Server restart preserves tenant associations

---

## Tool Discovery and Authorization

- [ ] **CRITICAL:** Discovery API requires tenant context header
- [ ] **CRITICAL:** Tool listing filtered by tenant permissions
- [ ] **CRITICAL:** Schema validation prevents tenant field manipulation
- [ ] Tool capabilities cached per-tenant (not globally)
- [ ] Discovery rate limiting enforced per-tenant
- [ ] Tool deprecation notices tenant-aware

---

## Protocol Compliance

- [ ] MCP protocol version negotiation implemented
- [ ] JSON-RPC 2.0 specification compliance verified
- [ ] Error codes follow MCP standard mappings
- [ ] Capability negotiation includes tenant context
- [ ] Stream handling respects tenant quotas
- [ ] Cancellation propagates to tenant-scoped operations

---

## Rate Limiting and Quotas

- [ ] Rate limiting enforced per-tenant per-tool
- [ ] Quota tracking includes tool invocation counts
- [ ] Burst limits configured by tenant tier
- [ ] Rate limit responses include retry-after headers
- [ ] Quota exceeded events trigger tenant notifications
- [ ] Tool-specific limits configurable per tenant

---

## Audit and Observability

- [ ] Audit logging captures all tool invocations
- [ ] Logs include tenant_id, tool_id, timestamp, duration
- [ ] Error traces preserve tenant context
- [ ] Metrics segmented by tenant and tool
- [ ] Alert thresholds configurable per tenant
- [ ] Compliance reports filterable by tenant

---

## Error Handling and Recovery

- [ ] Error recovery patterns implemented
- [ ] Fallback tools configured where appropriate
- [ ] Circuit breaker protects tenant isolation
- [ ] Retry logic respects tenant rate limits
- [ ] Timeout handling preserves tenant context
- [ ] Graceful degradation per tenant tier

---

## Tests Passing

- [ ] **CRITICAL:** Cross-tenant tool access test fails (isolation verified)
- [ ] **CRITICAL:** Tenant context propagation test passes
- [ ] **CRITICAL:** Tool discovery filtering test passes
- [ ] Server registration integration test passes
- [ ] Rate limiting enforcement test passes
- [ ] Audit logging completeness test passes

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block production deployment until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Server Registration | CRITICAL | Registration partial | No tenant context in registration |
| Tool Discovery | CRITICAL | Filtering incomplete | Cross-tenant discovery possible |
| Invocation Isolation | CRITICAL | Context propagation gaps | Cross-tenant access possible |
| Tests (isolation) | CRITICAL | <80% isolation tests pass | Any cross-tenant test failure |
| Protocol Compliance | Non-critical | Partial compliance | N/A |
| Rate Limiting | Non-critical | Partial enforcement | N/A |
| Audit Logging | Non-critical | Incomplete logging | N/A |

---

## Recovery Protocol

**If QG-MCP1 fails:**

### Attempt 1: Immediate Remediation (target: 1-2 days)

1. Identify failed CRITICAL categories from checklist
2. Review MCP server registration for tenant context gaps
3. Verify tool discovery filtering implementation
4. Add missing tenant_id propagation to invocations
5. Re-run QG-MCP1 validation after fixes
6. **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Investigation (target: 2-3 days)

1. Analyze root cause of continued failures
2. Review MCP server configuration and middleware
3. Validate tenant context injection at gateway level
4. Ensure server-side validation (not just client filtering)
5. Re-run QG-MCP1 validation after remediation
6. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to Platform Architect and Security Lead
2. Document failure patterns and blocking issues
3. Conduct MCP integration architecture review
4. Consider restricting tool access until resolved
5. Create remediation plan with executive sign-off
6. Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Server Registration | Add tenant context to registration flow | Registration fails after fix |
| Tool Discovery | Implement tenant filtering middleware | Cross-tenant discovery persists |
| Invocation Isolation | Add tenant_id to all request contexts | Any cross-tenant access |
| Tests Passing | Fix isolation gaps; add missing tenant checks | Cross-tenant test failure |
| Protocol Compliance | Update protocol handlers | Version negotiation fails |

---

## Related Workflows

- `bmad-bam-mcp-integration` - MCP integration workflow (primary)
- `bmad-bam-validate-foundation` - Foundation validation
- `bmad-bam-tool-registry` - Tool governance workflow
- `bmad-bam-tenant-model-isolation` - Tenant isolation patterns

---

## Required Templates

- `mcp-server-template.md` - MCP server configuration
- `tool-manifest-template.md` - Tool capability manifest
- `tenant-tool-policy-template.md` - Tenant tool access policies

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **MCP patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `mcp-*`
- **Tool patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `tool-*`
- **Tenant patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` - filter by selected model

### Web Research

- Search: "MCP protocol multi-tenant implementation {date}"
- Search: "Model Context Protocol security best practices {date}"
- Search: "tool governance patterns enterprise SaaS {date}"

---

## Web Research Verification

- [ ] Search the web: "MCP server tenant isolation patterns {date}" - Verify isolation approach
- [ ] Search the web: "Model Context Protocol rate limiting {date}" - Confirm rate limiting patterns
- [ ] Search the web: "tool registry multi-tenant audit {date}" - Validate audit requirements
- [ ] _Source: [URL]_ citations documented for key decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, MCP integration ready for production
**OWNER:** BAM (Platform Architect persona - Atlas)
**REVIEWERS:** Platform Architect, Security Lead, Integration Architect

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-30 | BAM V2 NEXUS | Initial MCP integration gate for NEXUS patterns |
