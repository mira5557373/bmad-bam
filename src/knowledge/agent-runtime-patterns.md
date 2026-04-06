# Agent Runtime Patterns

## Core Concept

Patterns for orchestrating AI agents in a multi-tenant, safety-first environment.

## Orchestration Patterns

### Single Agent (Simplest)

```
User → Agent → Tools → Response
```

- Best for: Focused tasks, low complexity
- Tenant scope: Agent inherits request tenant context

### Router Pattern

```
User → Router Agent → [Specialist A | Specialist B | Specialist C]
```

- Best for: Multi-domain queries
- Tenant scope: Router passes context to specialists

### Hierarchical Pattern

```
User → Manager Agent → [Worker 1, Worker 2, Worker 3] → Aggregated Response
```

- Best for: Complex multi-step tasks
- Tenant scope: Manager enforces context for all workers

## Tool Invocation Pattern

**Tool invocation steps** (TenantAwareTool):

| Step              | Action                                                                   | On Failure                                                 | Audit  |
| ----------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------- | ------ |
| 1. Policy check   | `policy_engine.check(ctx, tool_name, params)`                            | Return `ToolResult(denied=True, reason="Policy denied")`   | —      |
| 2. Approval check | `policy_engine.requires_approval(tool_name, params)` → queue if required | Return `ToolResult(denied=True, reason="Approval denied")` | —      |
| 3. Execute        | `execute_tool(tool_name, params)` with tenant context                    | Propagate error to error handling pattern (below)          | —      |
| 4. Audit log      | `audit_log(tool_name, params, result)`                                   | Log failure, don't block response                          | Always |

**Constructor requires:** `TenantContext` + `PolicyEngine`. Every tool invocation carries tenant context end-to-end.

## Memory Access Pattern

**Memory scope routing** (TenantAwareMemory):

| Scope     | Store           | Filter                                         | Access Rule                   |
| --------- | --------------- | ---------------------------------------------- | ----------------------------- |
| `SESSION` | `session_store` | `conversation_id=ctx.conversation_id`          | Current conversation only     |
| `USER`    | `user_store`    | `user_id=ctx.user_id, tenant_id=ctx.tenant_id` | User's memories within tenant |
| `TENANT`  | `tenant_store`  | `tenant_id=ctx.tenant_id`                      | Shared tenant knowledge       |
| `GLOBAL`  | `global_store`  | None (system-wide)                             | Read-only for agents          |

**Rule:** `tenant_id` filter is REQUIRED on USER and TENANT scopes — omitting it is a cross-tenant data leak.

## Conversation History Strategy

| Tier       | Strategy                        | Trigger Threshold | Max Messages Kept    | Summarization Model               |
| ---------- | ------------------------------- | ----------------- | -------------------- | --------------------------------- |
| FREE       | Sliding window (drop oldest)    | >20 messages      | 20                   | None (truncate)                   |
| PRO        | Summarize-then-window           | >40 messages      | 40 recent + summary  | Cheaper model (e.g., GPT-4o-mini) |
| ENTERPRISE | Full history + periodic summary | >80 messages      | All + summary prefix | Same tier model                   |

**Rules:** Token counting uses `tiktoken` (or provider tokenizer) before each LLM call. When message history exceeds the tier threshold, the strategy is applied before the next turn — not mid-generation. The summary is stored as a single system message prepended to the retained window. Summarization runs synchronously (blocks the turn) because the summary IS the context. On conversation close, the final summary is written to user-scope memory (S28.10) if the tenant tier allows it.

## Error Handling Pattern

```python
async def agent_execute(self, input: str) -> AgentResponse:
    try:
        return await self._execute(input)
    except RateLimitError:
        return AgentResponse(
            fallback=True,
            message="I'm experiencing high demand. Please try again."
        )
    except ToolDeniedError as e:
        return AgentResponse(
            refused=True,
            message=f"I can't perform that action: {e.reason}"
        )
    except Exception as e:
        await self.audit_log.error(e)
        return AgentResponse(
            error=True,
            message="I encountered an issue. Our team has been notified."
        )
```

## Kill Switch Integration

```python
class AgentWithKillSwitch:
    def __init__(self, feature_flags: FeatureFlags):
        self.flags = feature_flags

    async def execute(self, input: str) -> AgentResponse:
        # Check kill switch before any execution
        if not self.flags.is_enabled(f"agent.{self.agent_id}.enabled"):
            return AgentResponse(
                disabled=True,
                message="This feature is temporarily unavailable."
            )

        # Check circuit breaker
        if self.circuit_breaker.is_open:
            return AgentResponse(
                fallback=True,
                message="Service recovering. Please try again shortly."
            )

        return await self._execute(input)
```

## Per-Conversation Token Budget

| Tier       | Per-Conversation Budget | Warning (80%)                               | Degrade (95%)             | Hard Stop (100%)                     |
| ---------- | ----------------------- | ------------------------------------------- | ------------------------- | ------------------------------------ |
| FREE       | 5,000 tokens            | Shorter responses, skip optional tool calls | Text-only (no tool calls) | End conversation with budget message |
| PRO        | 50,000 tokens           | Inform user of remaining budget             | Shorter responses         | End conversation with budget message |
| ENTERPRISE | 200,000 tokens          | Inform user of remaining budget             | Shorter responses         | End conversation with budget message |

**Tracking:** Redis counter per `{tenant_id}::conversation::{conversation_id}::tokens` incremented after each LLM call (prompt + completion tokens from `usage` in StreamChunk). Counter inherits conversation TTL (session memory TTL from S28.10).

**Enforcement stages:** Before each LLM call, the agent checks the counter against the tier budget. At 80%, the system prompt is appended with a brevity instruction. At 95%, tool calls are disabled (text-only responses). At 100%, the agent returns a graceful termination message and closes the conversation. The user can start a new conversation (new budget).

**Monthly budget guard:** If the tenant's cumulative monthly usage exceeds 90% of their tier limit (S22.8.4), new conversations start with a reduced per-conversation budget (50% of normal). This prevents the last few conversations of the month from being unusable.

## Key Points

- Start with single-agent pattern; escalate topology only when justified
- Every tool invocation goes through policy check → approval check → execute → audit
- Kill switch + circuit breaker are mandatory for all agent endpoints
- Error responses must be user-friendly — never expose internal stack traces

## Anti-Pattern

| Anti-Pattern                          | Problem                          | Correct Approach                              |
| ------------------------------------- | -------------------------------- | --------------------------------------------- |
| Agent calls tool without policy check | Unauthorized data access         | All tools go through PolicyEngine             |
| Multi-agent without justification     | Complexity without benefit       | Start single-agent, escalate deliberately     |
| No kill switch on agent endpoint      | Cannot disable misbehaving agent | Feature flag + circuit breaker required       |
| Exposing raw LLM errors to user       | Poor UX, potential info leak     | Catch all exceptions, return friendly message |

**2026 Cross-Reference:** For run-contract-governed orchestration modes (single_agent, chain, fan_out, evaluator_optimizer, hierarchical), see S4.6.1 Orchestration Mode Selection Matrix and S28.17 run-contract-patterns. For resilience during orchestration (mid-run failover, partial fan-out failure), see S28.20 agent-resilience-patterns.

See also: memory-tier-patterns.md, tool-execution-middleware.md, run-contract-patterns.md, agent-resilience-patterns.md
