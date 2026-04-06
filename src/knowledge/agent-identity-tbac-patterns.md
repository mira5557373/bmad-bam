# Agent Identity & TBAC Patterns

## Principle

Agents are first-class security principals with their own cryptographic identity. Authorization is task-scoped (TBAC), not just role-scoped (RBAC). Every agent gets a SPIFFE SVID for non-repudiation.

## Rationale

RBAC alone cannot express "this agent may access tool X only during run Y with budget Z." TBAC intersects four permission layers (tenant policy, user RBAC, run contract scope, agent trust level) to produce the effective permission set for each action.

## Identity Comparison

| Concern         | User Identity (Keycloak) | Agent Identity (SPIFFE)                      | Module Boundary           |
| --------------- | ------------------------ | -------------------------------------------- | ------------------------- |
| Authentication  | OAuth/OIDC, MFA          | SPIFFE SVID + agent claims                   | `auth` module             |
| Authorization   | RBAC roles (Cerbos)      | TBAC: task scope ∩ user RBAC ∩ tenant policy | `auth` → `action-gateway` |
| Audit trail     | User actions             | Agent decisions + model + version            | `observability`           |
| Lifecycle       | Long-lived sessions      | Per-run or per-deployment                    | `agent-registry`          |
| Non-repudiation | JWT signature            | Agent SVID + decision hash                   | `auth` → `audit-store`    |

## TBAC Permission Resolution

| Layer                    | Source                         | Enforced By        | Module Boundary  |
| ------------------------ | ------------------------------ | ------------------ | ---------------- |
| Tenant policy            | Tenant admin config            | Keycloak realm     | `auth`           |
| User RBAC                | Role assignments               | Cerbos policies    | `auth`           |
| Run contract scope       | Per-run capability whitelist   | Action gateway     | `action-gateway` |
| Agent trust level        | Deployment config              | SPIFFE claims      | `agent-registry` |
| **Effective permission** | **Intersection of all layers** | **Action gateway** | `action-gateway` |

**TBAC effective permission = tenant policy ∩ user RBAC ∩ run contract scope ∩ agent trust level**

## Authorization Technology Decision Matrix

| Scenario                                               | Cerbos (RBAC)    | OpenFGA (TBAC) | Both                    |
| ------------------------------------------------------ | ---------------- | -------------- | ----------------------- |
| "Can user deploy agents?"                              | ✅               | ❌             | Cerbos only             |
| "Can agent X access tool Y?"                           | Partial (static) | ✅ (dynamic)   | OpenFGA preferred       |
| "Can agent X access tool Y during run Z?"              | ❌               | ✅             | OpenFGA only            |
| "Can tenant admin revoke agent access?"                | ✅               | ✅             | Either                  |
| "Is agent X's trust level sufficient for this action?" | ❌               | ✅             | OpenFGA + SPIFFE claims |

**Technology Decision:** Cerbos (adopt) for static RBAC + OpenFGA (trial) for dynamic TBAC relationship checks. Action gateway queries both.

## Agent SPIFFE Identity Format

```
spiffe://platform.ai/tenant/{tenant_id}/agent/{agent_type}/{version}
```

- Agent identity is separate from the user who initiated the run — enables non-repudiation
- Per-run or per-deployment lifecycle (not long-lived sessions)
- Decision hash provides tamper-evident audit trail

## Anti-Patterns

| Anti-Pattern                             | Problem                                | Correct Approach                                  |
| ---------------------------------------- | -------------------------------------- | ------------------------------------------------- |
| Using only RBAC for agent authorization  | Cannot express per-run constraints     | TBAC intersects RBAC with run contract scope      |
| Sharing user identity with agent         | No non-repudiation for agent decisions | Separate SPIFFE identity for agents               |
| Static agent permissions across all runs | Violates least privilege               | Per-run capability whitelist via run contract     |
| No trust level differentiation           | All agents treated equally             | Deployment config sets trust level per agent type |

## Cross-Reference

- S4.6.1: Agent identity & TBAC, SPIFFE SVID, permission resolution
- S28.19: action-gateway-patterns (enforcement of TBAC at gateway level)

See also: action-gateway-patterns.md, run-contract-patterns.md, agent-data-governance-patterns.md
