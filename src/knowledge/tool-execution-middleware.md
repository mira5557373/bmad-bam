# Tool Execution Middleware Playbook

## Principle

AI agent tool access is filtered and executed through a two-stage middleware pipeline
that enforces tenant boundaries, tier restrictions, and governance controls.

## Rationale

LLMs perform better with fewer, more relevant tools. Research shows >20 tools
degrades accuracy. Semantic pre-filtering triples selection accuracy.

## Two-Stage Architecture

**Stage 1: Tool Selection (wrap_model_call)**

- Load all tools from registry
- Filter by tenant tier (FREE/PRO/ENTERPRISE)
- Filter by user role (category restrictions)
- Apply semantic gating if >15 tools remain
- Attach filtered tools to agent turn

**Stage 2: Tool Execution (wrap_tool_call)**

- Check rate limits (Redis sliding window)
- Route approval-required tools to queue
- Route sandbox-required tools to E2B
- Execute via facade with TenantContext injection
- Enforce execution timeout
- Record audit log and Langfuse span

## Tool Selection Decision Matrix

| Filter Stage     | Input                   | Output                | Mechanism                          |
| ---------------- | ----------------------- | --------------------- | ---------------------------------- |
| Registry load    | All registered tools    | Full tool list        | Tool registry query                |
| Tier filter      | Full list               | Tier-eligible tools   | Tenant tier lookup                 |
| Role filter      | Tier-eligible           | Role-permitted tools  | User role → category mapping       |
| Semantic gating  | Role-permitted (if >15) | Top K=15 by relevance | Embedding similarity to user query |
| Final attachment | Filtered tools          | Agent turn tools      | LangGraph tool binding             |

## Tool Execution Routing

| Tool Property                            | Route                | Execution Environment        |
| ---------------------------------------- | -------------------- | ---------------------------- |
| Standard (no special flags)              | Direct execution     | In-process via facade        |
| `approval_required: true`                | Approval queue       | Paused until human approval  |
| `sandbox_required: true`                 | E2B sandbox          | Isolated container execution |
| `approval_required` + `sandbox_required` | Approval queue → E2B | Approval first, then sandbox |

## Rate Limiting Strategy

| Scope                | Implementation         | Window                     | Storage |
| -------------------- | ---------------------- | -------------------------- | ------- |
| Per-tenant, per-tool | Sliding window counter | Configurable (default 60s) | Redis   |
| Per-tenant, global   | Token bucket           | Per-minute                 | Redis   |
| Per-tool, global     | Fixed window           | Per-minute                 | Redis   |

## Key Points

- Tools are thin wrappers over module facades (never bypass)
- TenantContext propagates through entire execution chain
- Semantic gating uses embedding similarity (top K=15)
- Rate limits are per-tenant, per-tool
- Every tool execution produces an audit log entry and Langfuse span

## Anti-Patterns

| Anti-Pattern                            | Problem                                   | Correct Approach                                      |
| --------------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| Tool directly accesses database         | Bypasses tenant isolation, no audit trail | Tool calls facade which enforces tenant context       |
| No semantic gating with >20 tools       | LLM accuracy degrades                     | Apply semantic pre-filtering to top K=15              |
| Skipping rate limits for internal tools | Resource exhaustion by single tenant      | Rate limits apply to all tools, internal and external |
| No timeout on tool execution            | Runaway tools consume budget indefinitely | Enforce execution timeout per tool                    |

## Integration Points

- Section 22.6: Module-to-AI-Runtime Tool Registration Pattern
- Section 22.6.10: Langfuse observability integration
- Section 28.9: agent-runtime-patterns (orchestration, memory, error handling)

See also: agent-runtime-patterns.md, action-gateway-patterns.md, run-contract-patterns.md
