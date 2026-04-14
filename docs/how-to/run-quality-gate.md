# How to Run Quality Gates

This guide explains how to run each BAM quality gate, which checklist to use, and what to do when a gate fails.

## Overview

BAM enforces 8 quality gates from foundation to production. Gates must be run in sequence, as each gate depends on prior gates passing.

## Gate Sequence

```
QG-F1 (Foundation)
    |
    v
QG-M1 (Module Architecture)
    |
    v
QG-M2 (Tenant Isolation)
    |
    v
QG-M3 (Agent Runtime)
    |
    +-----------------+
    |                 |
    v                 v
QG-I1 (Convergence)
    |
    +---------+---------+
    |                   |
    v                   v
QG-I2 (Tenant Safety)  QG-I3 (Agent Safety)
    |                   |
    +---------+---------+
              |
              v
        QG-P1 (Production)
```

## Gate Outcomes

| Outcome | Definition | Action |
|---------|------------|--------|
| **PASS** | All critical items pass, >=80% non-critical | Proceed to next gate |
| **CONDITIONAL** | All critical pass, <80% non-critical | Proceed with mitigation plan |
| **FAIL** | Any critical item fails | Enter recovery protocol |

---

## QG-F1: Foundation Gate

**Purpose:** Validate master architecture is complete and frozen.

**When to Run:** After completing `create-master-architecture` workflow.

**Checklist:** `src/checklists/foundation-gate.md`

### How to Run

1. Execute the validation workflow:
   ```
   /atlas
   > VF  -- Validate Foundation
   ```
   Or directly:
   ```
   bmad-bam-validate-foundation
   ```

2. Load and review the checklist:
   - Verify master-architecture.md exists with all sections (1-7)
   - Verify Shared Kernel implementation (TenantContext, BaseEntity, EventBus)
   - Verify Control Plane implementation
   - Verify AI Runtime implementation
   - Run tenant isolation tests

### Critical Items

- Shared Kernel Implementation (all items)
- Tests Passing (tenant isolation)
- Control Plane Implementation

### If Gate Fails

See [Recovering from Quality Gate Failures](recover-from-gate-failure.md#qg-f1-foundation-gate---fail).

---

## QG-M1: Module Architecture

**Purpose:** Validate module bounded context is properly designed.

**When to Run:** After completing `create-module-architecture` workflow for each module.

**Checklist:** `src/checklists/module-architecture.md`

### How to Run

1. Execute the validation workflow:
   ```
   /atlas
   > VM  -- Validate Module
   ```
   Or directly:
   ```
   bmad-bam-validate-module
   ```

2. Load and review the checklist:
   - Verify bounded context definition
   - Verify facade contract design
   - Verify domain model
   - Verify integration points
   - Verify tenant isolation design

### Critical Items

- Bounded Context Definition (all items)
- Facade Contract Design (all items)
- Domain Model (aggregates and events)
- Tenant Isolation (all items)

### If Gate Fails

See [Recovering from Quality Gate Failures](recover-from-gate-failure.md#qg-m1-module-architecture---fail).

---

## QG-M2: Tenant Isolation

**Purpose:** Validate tenant isolation is implemented correctly.

**When to Run:** After completing `tenant-model-isolation` workflow.

**Checklist:** `src/checklists/tenant-isolation.md`

### How to Run

1. Execute the validation workflow:
   ```
   /atlas
   > VM  -- Validate Module (isolation phase)
   ```

2. Load and review the checklist:
   - Verify database level isolation (RLS policies)
   - Verify application level isolation (middleware, JWT)
   - Verify vector store level isolation
   - Verify cache level isolation
   - Verify memory level isolation

### Critical Items

- Database Level (all items)
- Application Level (all items)
- Vector Store Level (all items)
- Cache Level (all items)
- Memory Level (all items)

### If Gate Fails

See [Recovering from Quality Gate Failures](recover-from-gate-failure.md#qg-m2-tenant-isolation---fail).

---

## QG-M3: Agent Runtime

**Purpose:** Validate AI runtime infrastructure is operational.

**When to Run:** After completing `agent-runtime-architecture` workflow.

**Checklists:**
- `src/checklists/qg-m3-agent-runtime.md`
- `src/checklists/qg-m3-tools.md`

### How to Run

1. Execute the validation workflow:
   ```
   /nova
   > VARA  -- Validate Agent Runtime Architecture
   ```
   Or directly:
   ```
   bmad-bam-validate-module (readiness phase)
   ```

2. Load and review both checklists:
   - Verify orchestration pattern documented
   - Verify tool registry complete
   - Verify memory tiers configured
   - Verify approval workflow
   - Verify evaluation foundation
   - Verify kill switch operational

### Critical Items

- Tool Registry (all items)
- Memory Tiers (scope enforcement)
- Kill Switch (all items)
- Orchestration (all items)

### If Gate Fails

See [Recovering from Quality Gate Failures](recover-from-gate-failure.md#qg-m3-agent-runtime-readiness---fail).

---

## QG-I1: Convergence

**Purpose:** Validate cross-module contracts are compatible.

**When to Run:** After all module gates (QG-M1, QG-M2, QG-M3) pass for all modules.

**Checklist:** `src/checklists/qg-i1-convergence.md`

### How to Run

1. Execute the convergence verification workflow:
   ```
   /kai
   > CV  -- Convergence Verification
   ```
   Or directly:
   ```
   bmad-bam-convergence-verification
   ```

2. Load and review the checklist:
   - Verify facade contract stability
   - Verify cross-module journey integration
   - Verify event flow
   - Verify data consistency
   - Verify integration test coverage

### Critical Items

- Facade Contract Stability (all items)
- Cross-Module Journey Integration (all items)
- Event Flow Verification (all items)

### If Gate Fails

See [Recovering from Quality Gate Failures](recover-from-gate-failure.md#qg-i1-facade-compatibility--convergence---fail).

---

## QG-I2: Tenant Safety

**Purpose:** Validate no cross-tenant data leakage.

**When to Run:** After QG-I1 passes.

**Checklist:** `src/checklists/qg-i2-tenant-safety.md`

### How to Run

1. Execute the tenant safety verification:
   ```
   /tea
   > TS  -- Tenant Safety
   ```
   Or use TEA trace:
   ```
   tea-trace --tenant-safety
   ```

2. Load and review the checklist:
   - Verify isolation tests (database, cache, vector, memory)
   - Verify entitlement tests (feature access, usage limits)
   - Verify cross-tenant access attempts are logged

### Critical Items

- All isolation tests must pass
- All entitlement tests must pass

### If Gate Fails

See [Recovering from Quality Gate Failures](recover-from-gate-failure.md#qg-i2-tenant-safety---fail).

---

## QG-I3: Agent Safety

**Purpose:** Validate AI agents are safe for production.

**When to Run:** After QG-I1 passes (can run parallel with QG-I2).

**Checklist:** `src/checklists/qg-i3-agent-safety.md`

### How to Run

1. Execute the agent safety verification:
   ```
   /nova
   > AS  -- Agent Safety
   ```
   Or directly:
   ```
   bmad-bam-ai-eval-safety-design
   ```

2. Load and review the checklist:
   - Verify tool restrictions
   - Verify guardrails (input/output/tool/cost)
   - Verify kill switch functionality
   - Verify data privacy
   - Verify EU AI Act compliance (if applicable)

### Critical Items

- Tool Restrictions (all items)
- Guardrails Verification (all items)
- Kill Switch (all items)
- Data Privacy (all items)

### If Gate Fails

See [Recovering from Quality Gate Failures](recover-from-gate-failure.md#qg-i3-agent-safety---fail).

---

## QG-P1: Production Readiness

**Purpose:** Final validation before deployment.

**When to Run:** After QG-I1, QG-I2, and QG-I3 all pass.

**Checklist:** `src/checklists/production-readiness.md`

### How to Run

1. Verify all prerequisite gates:
   ```
   /atlas
   > GS  -- Gate Status
   ```

2. Execute the production readiness check:
   ```
   /atlas
   > PR  -- Production Readiness
   ```

3. Load and review the checklist:
   - Verify all prerequisite gates passed
   - Verify cross-module integration
   - Verify tenant safety
   - Verify agent safety
   - Verify observability
   - Verify operational readiness
   - Verify documentation

### Critical Items

- Prerequisite Gates (all must pass)
- Cross-Module Integration (all items)
- Tenant Safety (all items)
- Agent Safety (all items)
- Operational Readiness (all items)

### If Gate Fails

See [Recovering from Quality Gate Failures](recover-from-gate-failure.md#qg-p1-production-readiness---fail).

---

## Running Gates in Sequence

### Foundation Phase

```bash
# 1. Create master architecture
bmad-bam-create-master-architecture

# 2. Validate foundation (QG-F1)
bmad-bam-validate-foundation
# Must PASS before proceeding
```

### Module Phase (repeat for each module)

```bash
# 1. Create module architecture
bmad-bam-create-module-architecture

# 2. Validate module architecture (QG-M1)
bmad-bam-validate-module

# 3. Design tenant isolation
bmad-bam-tenant-model-isolation

# 4. Validate tenant isolation (QG-M2)
# (included in validate-module)

# 5. Design agent runtime
bmad-bam-agent-runtime-architecture

# 6. Validate agent runtime (QG-M3)
# (included in validate-module)
```

### Integration Phase

```bash
# 1. Run convergence verification (QG-I1)
bmad-bam-convergence-verification

# 2. Run tenant safety tests (QG-I2)
tea-trace --tenant-safety

# 3. Run agent safety tests (QG-I3)
bmad-bam-ai-eval-safety-design

# 4. Validate production readiness (QG-P1)
# Use production-readiness.md checklist
```

---

## Gate Status Tracking

### Check Current Gate Status

```
/atlas
> GS  -- Gate Status
```

This shows which gates have passed, are pending, or have failed.

### Gate Override (Emergency Only)

Emergency overrides require:
1. Documented justification
2. Admin approval
3. Time-limited exception
4. Follow-up remediation

```
/atlas
> MAEC  -- Master Architecture Emergency Change
```

**Warning:** Gate overrides bypass safety checks. Only use for genuine emergencies with leadership approval.

---

## Quick Reference

| Gate | Checklist | Trigger Workflow | Recovery Workflow |
|------|-----------|------------------|-------------------|
| QG-F1 | `foundation-gate.md` | `validate-foundation` | `create-master-architecture` |
| QG-M1 | `module-architecture.md` | `validate-module` | `create-module-architecture` |
| QG-M2 | `tenant-isolation.md` | `validate-module` | `tenant-model-isolation` |
| QG-M3 | `qg-m3-agent-runtime.md` | `validate-module` | `agent-runtime-architecture` |
| QG-I1 | `qg-i1-convergence.md` | `convergence-verification` | `facade-mismatch-recovery` |
| QG-I2 | `qg-i2-tenant-safety.md` | `tea-trace` | Fix isolation gaps |
| QG-I3 | `qg-i3-agent-safety.md` | `ai-eval-safety-design` | Fix safety gaps |
| QG-P1 | `production-readiness.md` | Manual | Address all gaps |

---

## Related Resources

- **Quality Gates Reference:** `docs/reference/quality-gates.md`
- **Gate Recovery Guide:** `docs/how-to/recover-from-gate-failure.md`
- **Checklists:** `src/checklists/`
- **Quality Gates CSV:** `src/data/quality-gates.csv`
