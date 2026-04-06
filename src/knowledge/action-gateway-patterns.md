# Action Gateway Patterns

## Principle

Every write operation passes through a unified action gateway that enforces trust tiers, consent, budget, and scope. The gateway is a shared-kernel service — no module bypasses it.

## Rationale

Without a gateway, each integration implements its own security checks (or doesn't). The gateway centralizes enforcement, making it auditable and consistent. All modules that perform external writes route through it.

## Enforcement Checklist

| Check              | Description                               | Failure Action          | Module                  |
| ------------------ | ----------------------------------------- | ----------------------- | ----------------------- |
| Trust tier         | Data source trusted enough for operation? | Block + log             | AI security             |
| Run contract scope | Operation within allowed capabilities?    | Block + scope reduction | AI runtime              |
| Budget             | Remaining budget for operation?           | Block + budget event    | Billing facade          |
| Consent            | User consented to this data usage?        | Block + consent request | Consent module          |
| Rate limit         | Tenant within rate limits?                | Throttle                | Rate limiting (S22.6.4) |
| Audit              | Log decision regardless of outcome        | Always                  | Observability           |

## Trust Tier Definitions

| Tier              | Source                             | Can Become Instructions?  | Can Modify State?       |
| ----------------- | ---------------------------------- | ------------------------- | ----------------------- |
| `verified`        | System config, admin-authored      | Yes                       | Yes                     |
| `corroborated`    | Multiple independent sources       | Conditional (with review) | Yes (audited)           |
| `user-provided`   | Direct user input                  | No (data only)            | Yes (user-scoped)       |
| `unverified`      | RAG chunks, single external source | No                        | No (read-only)          |
| `model-generated` | LLM output, agent decisions        | No                        | Via action gateway only |

## Gateway Enforcement Level by Operation Type

| Operation Type   | Trust Tier Required | Consent Required | Budget Check |
| ---------------- | ------------------- | ---------------- | ------------ |
| Read (internal)  | Any                 | No               | No           |
| Read (external)  | `user-provided`+    | Per-domain       | No           |
| Write (internal) | `corroborated`+     | No               | Yes          |
| Write (external) | `verified`          | Yes              | Yes          |
| Delete           | `verified`          | Yes              | Yes          |

## TBAC Permission Resolution

The action gateway enforces Task-Based Access Control by intersecting four permission layers:

| Layer                    | Source                         | Enforced By        | Module Boundary  |
| ------------------------ | ------------------------------ | ------------------ | ---------------- |
| Tenant policy            | Tenant admin config            | Keycloak realm     | `auth`           |
| User RBAC                | Role assignments               | Cerbos policies    | `auth`           |
| Run contract scope       | Per-run capability whitelist   | Action gateway     | `action-gateway` |
| Agent trust level        | Deployment config              | SPIFFE claims      | `agent-registry` |
| **Effective permission** | **Intersection of all layers** | **Action gateway** | `action-gateway` |

**Technology Decision:** Cerbos (adopt) for static RBAC + OpenFGA (trial) for dynamic TBAC relationship checks. Action gateway queries both.

## Consent Management

| Consent Type   | Scope                          | Grantor              | Duration                   |
| -------------- | ------------------------------ | -------------------- | -------------------------- |
| `tool_access`  | Specific MCP tool/server       | User or tenant admin | Per-session or persistent  |
| `data_sharing` | Share data with external agent | User                 | Per-run or persistent      |
| `processing`   | Process specific data type     | User                 | Persistent with revocation |
| `delegation`   | Allow sub-agent delegation     | Tenant admin         | Persistent                 |
| `federation`   | Cross-boundary communication   | Tenant admin         | Persistent with scope      |

## Decision Lineage Trace Model

| Link              | Data Captured                          | Storage              |
| ----------------- | -------------------------------------- | -------------------- |
| Context → Input   | What the agent saw, trust tiers        | OTel span attributes |
| Input → Decision  | LLM call, model version, parameters    | Langfuse trace       |
| Decision → Action | Action gateway decision, consent check | Audit log            |
| Action → Outcome  | State change, artifact produced        | Event schema         |

## Verification Criteria (Foundation Gate)

- [ ] Action gateway routing all write operations — no bypass paths exist
- [ ] Trust tier labeling configured for all data sources
- [ ] Consent checks enforced for external writes
- [ ] Budget checks integrated with billing facade
- [ ] Audit logging captures every gateway decision (allow and deny)
- [ ] Rate limiting enforced per-tenant, per-tool

## Anti-Patterns

| Anti-Pattern                                  | Problem                             | Correct Approach                                                                  |
| --------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| Point-to-point integrations bypassing gateway | Inconsistent security enforcement   | All external writes route through gateway — no exceptions                         |
| Trusting model-generated content as verified  | Trust tier escalation vulnerability | Model output is always `model-generated` tier — can only modify state via gateway |
| Skipping consent for internal writes          | Compliance risk for data processing | Internal writes skip consent only if no user data involved                        |
| Logging only denied actions                   | Incomplete audit trail              | Log every decision regardless of outcome                                          |

## Cross-Reference

- S4.6.1: Action gateway enforcement checklist, trust tier definitions
- S28.12: tool-execution-middleware (tool permission checks and sandbox execution)

See also: tool-execution-middleware.md, run-contract-patterns.md, agent-identity-tbac-patterns.md, context-compiler-patterns.md
