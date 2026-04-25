# BAM Gate Verification Patterns Guide

**When to load:** During any validation phase, when running gate validations, implementing production readiness checks, or when user mentions quality gates, QG-*, go-live, release readiness, or production deployment.

**Integrates with:** Platform Architect (Atlas), DevOps Engineer, SRE, Security Architect, QA Lead, Release Manager

---

## Core Concepts

### Quality Gate Philosophy

Multi-tenant AI platforms require rigorous verification through quality gates that ensure tenant safety, AI agent behavior, and production readiness. BAM implements 40 quality gates organized into a hierarchical dependency structure.

### Gate Categories

| Category | Gate IDs | Count | Purpose |
|----------|----------|-------|---------|
| Phase 1-2 (Discovery/Planning) | QG-D1, QG-PL1 | 2 | Early validation |
| Core Workflow | QG-F1, QG-M1-M3, QG-I1-I3, QG-P1 | 8 | Development lifecycle |
| Security | QG-S1-S10 | 10 | Multi-tenant security |
| AI/Agent | QG-AI1, QG-AI2 | 2 | AI safety verification |
| Operations | QG-IR1, QG-SA1, QG-PR1, QG-DR1, QG-CP1, QG-CS1, QG-MG1, QG-OC, QG-CC | 9 | Operational readiness |
| Recovery | QG-M1-R, QG-R1, QG-M3-T | 3 | Recovery protocols |
| Data/Compliance | QG-DC1, QG-PD1 | 2 | Regulatory compliance |
| Test Coverage (TEA) | QG-TC1, QG-TC2, QG-TC3 | 3 | Test verification |
| Pre-Commit | QG-DEV1 | 1 | Developer workflow |

### Soft Gates vs Hard Gates

| Gate Type | Behavior | Example |
|-----------|----------|---------|
| **Soft Gate** | Checkpoint; may proceed with documented justification | Pre-design reviews |
| **Hard Gate** | Blocking; must pass before proceeding | QG-F1, QG-M1, QG-I1, QG-P1 |

---

## BAM Conventions

> **CRITICAL:** BAM-specific gate conventions for multi-tenant AI platforms

### Gate Outcome Definitions

| Outcome | Definition | Action Required |
|---------|------------|-----------------|
| **PASS** | All CRITICAL pass, >=80% non-critical pass | Proceed to next phase |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical pass | Proceed with mitigation plan |
| **FAIL** | Any CRITICAL fails | Enter recovery protocol |
| **WAIVED** | Non-critical items waived by stakeholder | Proceed with documented justification |

### Critical vs Non-Critical Checks

| Critical (Block on Fail) | Non-Critical (Warn Only) |
|--------------------------|--------------------------|
| Tenant isolation | Observability instrumentation |
| Action contracts | Chaos testing |
| Audit trail | Documentation completeness |
| Confidence thresholds | Performance benchmarks |
| Human sign-off | Code coverage metrics |

### Locked Categories

When a gate fails, categories that passed are "locked" and do not require re-validation during recovery attempts.

---

## Decision Framework

### Gate Selection Matrix

| Situation | Recommended Path | Timeline |
|-----------|------------------|----------|
| New agent deployment | Full PRG (all 10 checks) | 2-5 days |
| Agent update (minor) | Partial PRG (1,2,4,7) | 4-8 hours |
| Hotfix deployment | Emergency PRG (1,2,10) | 1-2 hours |
| Config change only | Mini PRG (1,7) | 30 minutes |

### Go-Live Decision Matrix

| Outcome | Criteria | Action |
|---------|----------|--------|
| **GO** | All gates pass, no blocking issues | Proceed with launch |
| **GO WITH CAUTION** | Minor gaps with mitigation | Launch with enhanced monitoring |
| **NO GO** | Critical gaps or blocking issues | Address before launch |

### Verification Strategy by Release Type

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| First launch | Full verification | No production track record |
| Major release | Full verification | Significant changes |
| Minor update | Incremental verification | Focused on changes |
| Hotfix | Expedited verification | Critical path only |

---

## §gate-hierarchy

### Pattern: Quality Gate Hierarchy and Sequence

The gate hierarchy establishes dependencies and execution order for multi-tenant AI platforms.

#### Gate Sequence Diagram

```
                    +--------------+
                    |   QG-F1      |
                    |  Foundation  |
                    +------+-------+
                           |
           +---------------+---------------+
           v               v               v
    +--------------++--------------++--------------+
    |    QG-M1     ||    QG-M2     ||    QG-M3     |
    |Module Arch   ||Tenant Isolat.||Agent Runtime |
    +------+-------++------+-------++------+-------+
           +---------------+---------------+
                           |
           +---------------+---------------+
           v               v               v
    +--------------++--------------++--------------+
    |    QG-I1     ||    QG-I2     ||    QG-I3     |
    | Convergence  ||Tenant Safety ||Agent Safety  |
    +------+-------++------+-------++------+-------+
           +---------------+---------------+
                           v
                    +--------------+
                    |    QG-P1     |
                    |  Production  |
                    +--------------+
```

#### Gate Reference Table

| Gate | Name | Phase | Checklist | Triggers |
|------|------|-------|-----------|----------|
| QG-D1 | Discovery | discovery | discovery-gate.md | requirements-analysis |
| QG-PL1 | Planning | planning | planning-gate.md | create-module-epics |
| QG-F1 | Foundation | foundation | foundation-gate.md | create-master-architecture |
| QG-M1 | Module Architecture | module | module-architecture.md | create-module-architecture |
| QG-M2 | Tenant Isolation | module | tenant-isolation.md | tenant-model-isolation |
| QG-M3 | Agent Runtime | module | qg-m3-agent-runtime.md | agent-runtime-architecture |
| QG-I1 | Convergence | integration | qg-i1-convergence.md | convergence-verification |
| QG-I2 | Tenant Safety | integration | qg-i2-tenant-safety.md | tea-trace |
| QG-I3 | Agent Safety | integration | qg-i3-agent-safety.md | tea-trace |
| QG-P1 | Production | production | production-readiness.md | release decision |

#### Gate Details

**QG-F1: Foundation Gate**
- Validates master architecture completion and foundational components
- CRITICAL: Shared Kernel, Control Plane, Tenant Isolation Tests
- Non-critical: Documentation, AI Runtime (with mitigation plan)

**QG-M1: Module Architecture Gate**
- Validates module architectures align with master architecture
- Module boundaries, facade contracts, data ownership, event flows

**QG-M2: Tenant Isolation Gate**
- Validates tenant isolation per selected model
- RLS policies, schema separation, cross-tenant access tests

**QG-M3: Agent Runtime Gate**
- Validates AI agent runtime safety and operations
- Run contracts, tool policies, memory scope, safety guardrails, action gateway

**QG-I1: Convergence Gate**
- Validates cross-module integration and facade stability
- CRITICAL: Facade Stability, Cross-Module Journeys, Event Flows

**QG-I2: Tenant Safety Gate**
- Validates tenant safety via TEA trace
- Cross-tenant leakage, boundary enforcement, audit separation

**QG-I3: Agent Safety Gate**
- Validates AI agent safety via TEA trace
- Agent boundaries, tool policy, memory isolation, escalation prevention

**QG-P1: Production Gate**
- Final validation before production
- All gates passed, performance benchmarks, DR tested, compliance, runbooks

---

## §verification-process

### Pattern: Verification Workflow Patterns

Structured approach to gate verification in multi-tenant contexts.

#### Verification Process Steps

1. **Load checklist** from `{project-root}/_bmad/bam/data/checklists/{checklist}.md`
2. **Execute checks** - mark items PASS/FAIL/N/A
3. **Document failures** with details and reproduction steps
4. **Calculate pass rate** - CRITICAL vs non-critical separately
5. **Determine outcome** based on criteria
6. **FAIL:** Enter recovery protocol
7. **CONDITIONAL:** Document mitigation with timeline

#### PRG 10-Check Framework

The Production-Readiness Gate (PRG) requires ALL 10 checks to pass:

| # | Check | Category | Automation Level |
|---|-------|----------|------------------|
| 1 | Tenant isolation verified | Security | Automated |
| 2 | Action contracts validated | AI Safety | Automated |
| 3 | Rollback tested | Operations | Semi-auto |
| 4 | Audit trail complete | Compliance | Automated |
| 5 | Resource budgets configured | Cost | Automated |
| 6 | Confidence thresholds set | AI Safety | Manual |
| 7 | Loop bindings verified | Runtime | Automated |
| 8 | Observability instrumented | Operations | Automated |
| 9 | Chaos test passed | Resilience | Semi-auto |
| 10 | Human review sign-off | Governance | Manual |

#### PRG Check Categories

```
PRG Checks
+-- Security (1)
|   +-- Tenant isolation proof
+-- AI Safety (2, 6)
|   +-- Contract validation
|   +-- Threshold configuration
+-- Operations (3, 8)
|   +-- Rollback verification
|   +-- Observability check
+-- Compliance (4)
|   +-- Audit completeness
+-- Cost (5)
|   +-- Budget enforcement
+-- Runtime (7)
|   +-- Loop binding proof
+-- Resilience (9)
|   +-- Chaos engineering
+-- Governance (10)
    +-- Human approval
```

#### Checklist Owners

| Gate | Checklist | Owner |
|------|-----------|-------|
| QG-F1 | foundation-gate.md | Platform Architect (Atlas) |
| QG-M1 | module-architecture.md | Module Architect |
| QG-M2 | tenant-isolation.md | Platform Architect (Atlas) |
| QG-M3 | qg-m3-agent-runtime.md | AI Runtime Architect (Nova) |
| QG-I1 | qg-i1-convergence.md | Integration Architect (Kai) |
| QG-I2 | qg-i2-tenant-safety.md | QA Lead + Security |
| QG-I3 | qg-i3-agent-safety.md | QA Lead + AI Safety |
| QG-P1 | production-readiness.md | Release Manager |

---

## §recovery-protocols

### Pattern: Gate Failure Recovery Patterns

Structured recovery when gates fail.

#### Recovery Protocol Flowchart

```
FAIL -> Attempt 1 (Fix + Re-validate)
         |
    +----+----+
  PASS      FAIL -> Attempt 2 (Fix + Re-validate)
    |              |
 Continue    +-----+-----+
           PASS        FAIL -> MANDATORY ESCALATION
             |                (Architecture review)
          Continue
```

#### Recovery Guidelines

| Scenario | Recovery Action | Timeline |
|----------|-----------------|----------|
| Single CRITICAL fail | Targeted fix, re-run category | 1-2 days |
| Multiple CRITICAL fail | Root cause analysis, broader fix | 3-5 days |
| Gate fails twice | Escalate to architecture review | Immediate |
| Systemic issues found | Design review, potential refactor | 1-2 sprints |

#### Anti-Patterns in Recovery

| Anti-Pattern | Correct Approach |
|--------------|------------------|
| Skipping gates under deadline | Use CONDITIONAL with remediation plan |
| N/A without justification | Require written justification |
| Re-running only failed categories | Re-run full gate after changes |
| Multiple CONDITIONAL passes | Track debt; block after 2 consecutive |
| Treating all failures equally | Distinguish CRITICAL vs non-critical |

---

## §production-readiness

### Pattern: Production Readiness Verification

Five pillars of production readiness for multi-tenant AI platforms.

#### Production Readiness Pillars

1. **Gate Verification** - All prerequisite quality gates passed
2. **Infrastructure** - Capacity, HA, and scaling verified
3. **Observability** - Metrics, logs, traces, and alerts configured
4. **Disaster Recovery** - Backups, failover, and RTO/RPO validated
5. **Operations** - Runbooks, on-call, and procedures documented

#### Quality Gate Dependencies for QG-P1

| Gate | Name | Purpose |
|------|------|---------|
| QG-S4 | AI Security | Model and inference protection |
| QG-I3 | Agent Safety | Guardrails and kill switch |
| QG-I2 | Tenant Safety | Cross-tenant isolation |
| QG-DR1 | Data Protection | Encryption and privacy |
| QG-CP1 | Compliance | Regulatory requirements |

#### Production Readiness Assessment Guidelines

When assessing production readiness:

1. **Verify all gates first** - Do not proceed if prerequisites fail
2. **Test under realistic load** - Capacity must handle expected traffic
3. **Validate DR procedures** - Actually test failover, not just documentation
4. **Confirm on-call readiness** - Team trained and tools accessible

---

## §tenant-gates

### Pattern: Tenant-Specific Gate Patterns

Gate patterns specific to multi-tenant isolation verification.

#### Tenant Isolation Verification Matrix

| Tenant Model | Gate Focus | Critical Checks |
|--------------|------------|-----------------|
| Row-Level Security | QG-M2, QG-I2 | RLS policy validation, cross-tenant query tests |
| Schema-per-Tenant | QG-M2, QG-I2 | Schema isolation, migration consistency |
| Database-per-Tenant | QG-M2, QG-I2 | Connection routing, resource quotas |

#### Tenant Safety Gate (QG-I2) Checklist

- [ ] Cross-tenant leakage tests pass
- [ ] Boundary enforcement verified
- [ ] Audit trail separation confirmed
- [ ] Data encryption at rest per tenant
- [ ] API rate limiting per tenant

#### Agent Safety Gate (QG-I3) Checklist

- [ ] Agent boundaries validated
- [ ] Tool policy enforcement tested
- [ ] Memory isolation verified
- [ ] Escalation prevention active
- [ ] Kill switch operational

---

## Gate Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| First-pass rate | Gates passing on first attempt | >80% |
| Recovery time | Average FAIL to PASS | <2 sprints |
| CONDITIONAL rate | Gates passing conditionally | <20% |
| Escalation rate | Requiring architecture review | <5% |

---

## Quality Gates

Load gate requirements and validation criteria from:

- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv`
- **Checklists:** `{project-root}/_bmad/bam/data/checklists/`

---

## Web Research

| Topic | Query |
|-------|-------|
| Software quality gates | "software quality gates best practices {date}" |
| Multi-tenant release validation | "multi-tenant SaaS release validation {date}" |
| CI/CD quality gates | "CI/CD quality gates patterns {date}" |
| AI system safety validation | "AI system safety validation gates {date}" |
| Production readiness checklist | "production readiness checklist SaaS {date}" |
| Go-live criteria | "go-live criteria multi-tenant platform {date}" |
| AI platform deployment | "AI platform deployment best practices {date}" |
| SRE production readiness | "SRE production readiness {date}" |
| PRG gate AI systems | "production readiness gate AI systems {date}" |
| Agent safety verification | "AI agent go-live safety verification {date}" |

---

## Related Patterns

Load decision criteria and `web_queries` column from pattern registry:

- **Quality patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `testing-isolation,testing-agent-safety`
- **Gate requirements:** `{project-root}/_bmad/bam/data/quality-gates.csv`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `operations`
- **DR patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `disaster-recovery`
- **PRG patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `prg-*`

---

## Related Workflows

- `bmad-bam-validate-foundation` - Execute QG-F1 validation
- `bmad-bam-validate-module` - Execute QG-M1, QG-M2, QG-M3 validations
- `bmad-bam-convergence-verification` - Execute QG-I1 validation
- `bmad-bam-production-readiness` - Production readiness assessment
- `bmad-bam-create-master-architecture` - Artifacts validated by QG-F1
- `bmad-bam-tenant-model-isolation` - Artifacts validated by QG-M2
- `bmad-bam-agent-runtime-architecture` - Artifacts validated by QG-M3
- `bmad-bam-runbook-creation` - Operational runbooks
- `bmad-bam-prg-gate-setup` - Configure PRG automation
- `bmad-bam-action-contract-design` - Contract validation

---

## Change Log

| Date | Version | Changes |
|------|---------|---------|
| {date} | 1.0.0 | Initial consolidated guide from production-readiness.md, quality-gates.md, prg-gate-implementation.md |
