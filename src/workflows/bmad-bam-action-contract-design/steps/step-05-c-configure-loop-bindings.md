# Step 5: Configure Loop Bindings

> **MANDATORY EXECUTION RULES:**
> 1. Read this ENTIRE file before acting
> 2. Follow steps in EXACT order
> 3. Use web search when directed
> 4. DO NOT skip verification

## Purpose

Bind each action type to the appropriate runtime loop for execution.

## Prerequisites

- Step 4 completed (proof design)
- **Load guides:**
  - `{project-root}/_bmad/bam/data/agent-guides/bam/request-loop-patterns.md`
  - `{project-root}/_bmad/bam/data/agent-guides/bam/control-loop-patterns.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/runtime-loop-config-template.md`

## Actions

### 1. Define Loop Binding Rules

| Action Type | Primary Loop | Fallback Loop | Rationale |
|-------------|--------------|---------------|-----------|
| READ_ONLY | REQUEST | - | Fast, synchronous |
| WRITE_INTERNAL | CONTROL | RECOVERY | State management |
| WRITE_EXTERNAL | CONTROL | RECOVERY | External coordination |
| FINANCIAL | CONTROL | ECONOMIC | Budget + audit |
| PRIVILEGED | CONTROL | RECOVERY | Approval workflow |

### 2. Configure Loop Parameters

```yaml
loop_bindings:
  REQUEST:
    timeout_ms: 100
    retry_policy: none
    metrics: [latency_p50, latency_p99]
  
  CONTROL:
    timeout_ms: 30000
    retry_policy: exponential_backoff
    checkpoint_interval: 1
    metrics: [state_transitions, completion_rate]
  
  LEARNING:
    batch_size: 100
    privacy_mode: differential
    metrics: [feedback_count, model_drift]
  
  ECONOMIC:
    budget_check: pre_execution
    throttle_strategy: soft_then_hard
    metrics: [token_usage, cost_per_tenant]
  
  RECOVERY:
    max_retries: 3
    rollback_timeout_ms: 5000
    metrics: [recovery_success_rate, mttr]
```

### 3. Design Loop Transitions

**Verify current best practices with web search:**
Search the web: "AI agent workflow state machine patterns {date}"

| From Loop | To Loop | Trigger | Action |
|-----------|---------|---------|--------|
| REQUEST | CONTROL | Complex query | Checkpoint + handoff |
| CONTROL | RECOVERY | Failure detected | Isolate + diagnose |
| CONTROL | ECONOMIC | Budget alert | Throttle + notify |
| ANY | LEARNING | Feedback received | Async queue |

## Verification

- [ ] All action types bound to loops
- [ ] Loop parameters configured
- [ ] Transition rules defined

## Outputs

- Loop binding configuration
- Transition rules matrix

## Next Step

Proceed to `step-06-c-generate-contract-spec.md` to finalize specification.
