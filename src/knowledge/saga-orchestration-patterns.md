# Saga Orchestration Playbook

## Principle

Multi-step tenant provisioning uses an orchestrated saga with explicit
compensation handlers, idempotency, and real-time status tracking.

## Rationale

Provisioning involves multiple services (database, auth, AI runtime, billing).
Failures must trigger coordinated rollback to avoid orphaned resources.

## Saga vs Choreography Decision

| Factor        | Use Saga                   | Use Choreography       |
| ------------- | -------------------------- | ---------------------- |
| Steps         | >3 ordered steps           | Independent reactions  |
| Rollback      | Explicit compensation      | Eventually consistent  |
| Visibility    | Centralized status         | Distributed tracing    |
| Human-in-loop | Approval workflows         | Not suitable           |
| Cross-module  | Orchestrator calls facades | Events between modules |

## Provisioning Saga Flow

1. Check idempotency (return cached if exists)
2. Build execution DAG (topological sort)
3. Initialize status (all steps PENDING)
4. Execute steps with retry/timeout
5. On success: emit event, send webhook
6. On failure: compensate in reverse order

## Step Classification

| Step Type                               | Compensation Required   | Failure Behavior                |
| --------------------------------------- | ----------------------- | ------------------------------- |
| Critical (database, auth)               | Yes — explicit rollback | Trigger full compensation chain |
| Non-critical (analytics, notifications) | No                      | Log warning, continue           |
| Idempotent                              | Self-compensating       | Safe to retry                   |

## Retry and Timeout Strategy

| Parameter       | Default             | Configurable | Notes                       |
| --------------- | ------------------- | ------------ | --------------------------- |
| Max retries     | 3                   | Per-step     | Exponential backoff         |
| Backoff formula | delay x 2^(retry-1) | Per-step     | Starting delay configurable |
| Step timeout    | 30s                 | Per-step     | Non-critical steps: 10s     |
| Saga timeout    | 5 minutes           | Per-saga     | Enterprise: 10 minutes      |

## Idempotency Rules

- Idempotency key is client-generated UUID
- Request hash prevents key reuse with different params
- Cached results returned for duplicate requests
- Idempotency records expire after 24 hours

## Key Points

- Non-critical step failures don't trigger compensation
- WebSocket broadcasts status updates (see provisioning-ui-patterns.md)
- Orchestrator lives in the initiating module; each step calls facades
- Temporal workflow engine handles long-running sagas

## Anti-Patterns

| Anti-Pattern                    | Problem                         | Correct Approach                        |
| ------------------------------- | ------------------------------- | --------------------------------------- |
| Fire-and-forget provisioning    | Orphaned resources on failure   | Saga with compensation handlers         |
| No idempotency key              | Duplicate provisioning on retry | Client-generated UUID with request hash |
| Compensating non-critical steps | Unnecessary rollback complexity | Only compensate critical steps          |
| Synchronous saga execution      | Blocks request thread           | Async execution with WebSocket status   |

## Integration Points

- Section 22.8: Tenant Onboarding Orchestration Pattern
- Section 22.8.7: Idempotency and Retry Handling
- Section 22.9: Tenant Tier Change Orchestration Pattern (upgrade/downgrade sagas)
- Section 28.11: multi-tenant-patterns (tenant lifecycle, provisioning/offboarding)

See also: provisioning-ui-patterns.md, multi-tenant-patterns.md, module-facade-patterns.md
