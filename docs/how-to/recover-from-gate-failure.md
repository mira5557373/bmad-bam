# Recovering from Quality Gate Failures

## Overview

This guide explains how to recover when a quality gate (QG-F1 through QG-P1) returns FAIL or CONDITIONAL. Quality gates enforce architectural consistency and safety requirements before proceeding to the next development phase.

## Gate Outcome Definitions

| Outcome | Definition | Action Required |
|---------|------------|-----------------|
| **PASS** | All checks pass | Proceed to next phase |
| **CONDITIONAL** | All critical items pass, non-critical gaps exist | Proceed with mitigation plan + deadline |
| **FAIL** | Any critical item fails | Enter recovery protocol |

## Recovery Protocol Overview

```
FAIL
  |
  +-- Attempt 1: Fix issues, re-run validation
  |       |
  |       +-- FAIL again?
  |               |
  |               +-- Attempt 2: Fix issues, re-run validation
  |               |       |
  |               |       +-- FAIL again?
  |               |               |
  |               |               +-- MANDATORY COURSE CORRECTION
  |               |                   (Escalate to project leadership)
  |               |
  |               +-- PASS --> Continue
  |
  +-- PASS --> Continue
```

**Locked Categories:** When a gate fails, categories that previously passed are "locked" and do not need re-validation.

---

## Gate-Specific Recovery

### QG-F1 (Foundation Gate) - FAIL

**Purpose:** Validate master architecture is complete and frozen.

**Critical Items:**
- Shared Kernel Implementation (TenantContext, BaseEntity, EventBus, Audit logging)
- Tenant isolation tests (data, event, cache isolation)
- Control Plane Implementation (provisioning, lifecycle, billing stub)

**Recovery Steps:**

1. **Review the foundation gate report** to identify specific failing items
2. **Load the checklist:** `src/data/checklists/foundation-gate.md`
3. **Address critical failures first:**
   - Missing TenantContext: Run `create-master-architecture` workflow Section 5
   - RLS not implemented: Run `tenant-model-isolation` workflow
   - Control plane gaps: Implement provisioning API and tenant lifecycle
4. **Re-run validation:** Execute `validate-foundation` workflow
5. **Document remediation:** Create ADR documenting what was fixed and why

**Recovery Workflow:** `bam-create-master-architecture` or `bam-validate-foundation`

---

### QG-M1 (Module Architecture) - FAIL

**Purpose:** Validate module bounded context is properly designed.

**Critical Items:**
- Bounded Context Definition (all items)
- Facade Contract Design (all items)
- Domain Model (aggregates and events)
- Tenant Isolation (all items)

**Recovery Steps:**

1. **Review the module validation report** for specific failures
2. **Load the checklist:** `src/data/checklists/module-architecture.md`
3. **Address by category:**
   - Bounded context unclear: Revisit domain analysis, clarify aggregate roots
   - Facade contract issues: Ensure DTOs at boundaries, no internal domain leakage
   - Missing tenant isolation: Add tenant_id to all entities, document RLS requirements
4. **Re-run validation:** Execute `validate-module` workflow
5. **Consult with Platform Architect** if context boundaries remain unclear

**Recovery Workflow:** `bam-create-module-architecture` or `bam-module-boundary-design`

---

### QG-M2 (Tenant Isolation) - FAIL

**Purpose:** Validate tenant isolation is implemented correctly.

**Critical Items:**
- Database Level (RLS policies, tenant_id columns)
- Application Level (middleware, JWT extraction, session context)
- Vector Store Level (collection strategy, query filters)
- Cache Level (tenant-prefixed keys)
- Memory Level (session/user/tenant/global isolation)

**Recovery Steps:**

1. **Review the tenant isolation report** for specific failures
2. **Load the checklist:** `src/data/checklists/tenant-isolation.md`
3. **Address by layer:**
   - Database: Create RLS policies for all tenant tables, enable FORCE RLS
   - Application: Implement tenant context middleware, verify JWT extraction
   - Vector Store: Implement collection tenant strategy or query filter injection
   - Cache: Add tenant prefix to all cache keys
   - Memory: Verify scope enforcement in Mem0/memory store
4. **Run isolation tests:** Use TEA to verify cross-tenant access is blocked
5. **Re-run validation:** Execute `validate-module` workflow (isolation phase)

**Recovery Workflow:** `bam-tenant-model-isolation`

---

### QG-M3 (Agent Runtime Readiness) - FAIL

**Purpose:** Validate AI runtime infrastructure is operational.

**Critical Items:**
- Tool Registry (catalog, schemas, permissions, policy engine)
- Memory Tiers (scope enforcement)
- Kill Switch (feature flags, circuit breaker, manual override)
- Orchestration (pattern documented, topology defined)

**Recovery Steps:**

1. **Review the agent runtime report** for specific failures
2. **Load the checklist:** `src/data/checklists/qg-m3-agent-runtime.md`
3. **Address by component:**
   - Tool Registry: Register all tools with schemas, implement permission model
   - Memory Tiers: Configure scope enforcement, verify tenant isolation
   - Kill Switch: Integrate feature flags, configure circuit breakers
   - Orchestration: Document chosen pattern (LangGraph/CrewAI/AutoGen)
4. **Re-run validation:** Execute `validate-module` workflow (readiness phase)

**Recovery Workflow:** `bam-agent-runtime-architecture`

---

### QG-I1 (Facade Compatibility / Convergence) - FAIL

**Purpose:** Validate cross-module contracts are compatible.

**Critical Items:**
- Facade Contract Stability (stable versions, no breaking changes, TenantContext)
- Cross-Module Journey Integration (facade-only dependencies, no circular deps)
- Event Flow Verification (backward compatibility, schema validation)

**Recovery Steps:**

1. **Review the convergence report** for incompatibilities
2. **Load the checklist:** `src/data/checklists/qg-i1-convergence.md`
3. **Address by category:**
   - Contract breaking changes: Add migration path or bump major version
   - Circular dependencies: Refactor to introduce abstraction or event-driven decoupling
   - Event schema issues: Ensure backward compatibility, unknown field handling
4. **Run integration tests:** Verify all cross-module journeys pass
5. **Re-run validation:** Execute `convergence-verification` workflow

**Recovery Workflow:** `bam-convergence-verification` or `bam-facade-mismatch-recovery`

---

### QG-I2 (Tenant Safety) - FAIL

**Purpose:** Validate no cross-tenant data leakage.

**Critical Items:**
- Isolation Tests (database, cache, vector, memory, job interference)
- Entitlement Tests (feature access, usage limits, AI token budgets)

**Recovery Steps:**

1. **Review the tenant safety report** for leakage vectors
2. **Load the checklist:** `src/data/checklists/qg-i2-tenant-safety.md`
3. **Address isolation failures:**
   - Database leakage: Verify RLS policies, check FORCE RLS enabled
   - Cache leakage: Add tenant prefix validation
   - Vector leakage: Verify namespace separation or query filter injection
   - Memory leakage: Verify Mem0 tenant isolation
   - Job interference: Verify tenant context propagation in async jobs
4. **Run TEA isolation tests:** Execute `tea-trace` with tenant safety checks
5. **Re-run validation:** Pass requires all critical isolation tests

**Recovery Workflow:** Address gaps identified in TEA trace, re-run `convergence-verification`

---

### QG-I3 (Agent Safety) - FAIL

**Purpose:** Validate AI agents are safe for production.

**Critical Items:**
- Tool Restrictions (unauthorized access blocked, sandbox enforced)
- Guardrails Verification (input/output/tool/cost guardrails)
- Kill Switch (feature flags, circuit breaker, manual override)
- Data Privacy (PII masking, no PII in logs, tenant isolation)
- EU AI Act Compliance (for EU deployments)

**Recovery Steps:**

1. **Review the agent safety report** for specific failures
2. **Load the checklist:** `src/data/checklists/qg-i3-agent-safety.md`
3. **Address by category:**
   - Tool restrictions: Implement permission checks, verify sandbox (E2B)
   - Guardrails: Configure NeMo Guardrails for input/output filtering
   - Kill switch: Verify feature flag integration, test circuit breaker
   - Data privacy: Enable PII masking in Langfuse, audit application logs
   - EU AI Act: Classify features by risk level, add required documentation
4. **Run safety tests:** Execute adversarial prompts, verify refusal behavior
5. **Re-run validation:** Pass requires all critical safety controls operational

**Recovery Workflow:** `bam-ai-eval-safety-design`

---

### QG-P1 (Production Readiness) - FAIL

**Purpose:** Final validation before deployment.

**Critical Items:**
- Prerequisite Gates (QG-F1 through QG-I3 all passed)
- Cross-Module Integration (convergence, facade tests, user journeys)
- Tenant Safety (RLS, isolation, entitlements, rate limiting)
- Agent Safety (kill switches, circuit breakers, policy engine, golden tasks)
- Operational Readiness (provisioning, offboarding, runbooks, rollback)

**Recovery Steps:**

1. **Review the production readiness report** for blocking items
2. **Load the checklist:** `src/data/checklists/production-readiness.md`
3. **Verify all prerequisite gates passed:**
   - If any prior gate failed, address that gate first
4. **Address production-specific gaps:**
   - Observability: Configure structured logging, distributed tracing, cost attribution
   - Runbooks: Create emergency procedures, kill switch procedures, rollback plans
   - Load testing: Execute load tests at expected scale
5. **Security review:** Address any critical security findings
6. **Re-run validation:** Execute production readiness checklist

**Recovery Workflow:** Address gaps in prior gates, then re-validate production readiness

---

## General Recovery Process

1. **Review gate checklist findings** - Load the specific checklist file for the failed gate
2. **Identify failed items** - Distinguish between CRITICAL and non-critical failures
3. **Prioritize critical items** - Critical failures must be resolved; non-critical can have mitigation plans
4. **Re-execute relevant workflow steps** - Use Create mode to regenerate artifacts or Edit mode to fix specific gaps
5. **Re-run validation** - Execute the validation workflow to verify fixes
6. **Document lessons learned** - Create ADR or update existing documentation with recovery insights

## CONDITIONAL Outcomes

When a gate returns CONDITIONAL (all critical pass, non-critical gaps):

1. **Document the gaps** - List all non-critical items that are incomplete
2. **Create mitigation plan** - Define what will be done and when
3. **Set deadline** - Agree on remediation timeline
4. **Proceed with caution** - Continue to next phase while tracking remediation
5. **Follow up** - Ensure remediation completes before next major milestone

## Escalation

After two failed recovery attempts:

1. **MANDATORY COURSE CORRECTION** - Do not attempt a third time without escalation
2. **Escalate to project leadership** - Involve Platform Architect, Tech Lead, or Project Manager
3. **Review architectural decisions** - The failure may indicate fundamental design issues
4. **Consider scope adjustment** - May need to reduce scope or adjust timeline
5. **Document decision** - Create ADR documenting the course correction

## Related Resources

- **Quality Gates Reference:** `docs/reference/quality-gates.md`
- **Checklists:** `src/data/checklists/`
- **Validation Workflows:** `src/workflows/foundation/validate-foundation/`, `src/workflows/module/validate-module/`
- **Convergence Workflow:** `src/workflows/convergence-verification/`
