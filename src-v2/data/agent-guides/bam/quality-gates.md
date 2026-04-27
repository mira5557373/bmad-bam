# Quality Gates Guide - BAM Extension

**When to load:** During any validation phase, when running gate validations, when user mentions quality gates, QG-F1 through QG-P1, or when determining release readiness.

**Integrates with:** Architect (bmad-agent-architect), Dev (bmad-agent-dev), PM (bmad-agent-pm)

This guide provides comprehensive context for BAM quality gates across multi-tenant agentic AI platform development.

---

## Core Concepts

### Gate Sequence Diagram

```
                    ┌──────────────┐
                    │   QG-F1      │
                    │  Foundation  │
                    └──────┬───────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌──────────────┐┌──────────────┐┌──────────────┐
    │    QG-M1     ││    QG-M2     ││    QG-M3     │
    │Module Arch   ││Tenant Isolat.││Agent Runtime │
    └──────┬───────┘└──────┬───────┘└──────┬───────┘
           └───────────────┼───────────────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌──────────────┐┌──────────────┐┌──────────────┐
    │    QG-I1     ││    QG-I2     ││    QG-I3     │
    │ Convergence  ││Tenant Safety ││ Agent Safety │
    └──────┬───────┘└──────┬───────┘└──────┬───────┘
           └───────────────┼───────────────┘
                           ▼
                    ┌──────────────┐
                    │    QG-P1     │
                    │  Production  │
                    └──────────────┘
```

### Soft Gates vs Hard Gates

| Gate Type | Behavior | Example |
|-----------|----------|---------|
| **Soft Gate** | Checkpoint; may proceed with documented justification | Pre-design reviews |
| **Hard Gate** | Blocking; must pass before proceeding | QG-F1, QG-M1, QG-I1, QG-P1 |

### Gate Outcomes

| Outcome | Definition | Action Required |
|---------|------------|-----------------|
| **PASS** | All CRITICAL pass, >=80% non-critical pass | Proceed to next phase |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical pass | Proceed with mitigation plan |
| **FAIL** | Any CRITICAL fails | Enter recovery protocol |

### Recovery Protocol

```
FAIL → Attempt 1 (Fix + Re-validate)
         │
    ┌────┴────┐
  PASS      FAIL → Attempt 2 (Fix + Re-validate)
    │              │
 Continue    ┌─────┴─────┐
           PASS        FAIL → MANDATORY ESCALATION
             │                (Architecture review)
          Continue
```

**Locked Categories:** Passed categories remain locked during recovery attempts.

---

## Gate Reference Table

| Gate | Name | Phase | Checklist | Triggers |
|------|------|-------|-----------|----------|
| QG-F1 | Foundation | foundation | foundation-gate.md | create-master-architecture |
| QG-M1 | Module Architecture | module | module-architecture.md | create-module-architecture |
| QG-M2 | Tenant Isolation | module | tenant-isolation.md | tenant-model-isolation |
| QG-M3 | Agent Runtime | module | qg-m3-agent-runtime.md | agent-runtime-architecture |
| QG-I1 | Convergence | integration | qg-i1-convergence.md | convergence-verification |
| QG-I2 | Tenant Safety | integration | qg-i2-tenant-safety.md | tea-trace |
| QG-I3 | Agent Safety | integration | qg-i3-agent-safety.md | tea-trace |
| QG-P1 | Production | production | production-readiness.md | release decision |

---

## Gate Details

### QG-F1: Foundation Gate
Validates master architecture completion and foundational components before module development.
- **CRITICAL:** Shared Kernel, Control Plane, Tenant Isolation Tests
- **Non-critical:** Documentation, AI Runtime (with mitigation plan)

### QG-M1: Module Architecture Gate
Validates module architectures align with master architecture.
- Module boundaries, facade contracts, data ownership, event flows

### QG-M2: Tenant Isolation Gate
Validates tenant isolation per selected model.
- RLS policies, schema separation, cross-tenant access tests

### QG-M3: Agent Runtime Gate
Validates AI agent runtime safety and operations.
- Run contracts, tool policies, memory scope, safety guardrails, action gateway

### QG-I1: Convergence Gate
Validates cross-module integration and facade stability.
- **CRITICAL:** Facade Stability, Cross-Module Journeys, Event Flows
- **Non-critical:** Data Consistency, Test Coverage

### QG-I2: Tenant Safety Gate
Validates tenant safety via TEA trace.
- Cross-tenant leakage, boundary enforcement, audit separation

### QG-I3: Agent Safety Gate
Validates AI agent safety via TEA trace.
- Agent boundaries, tool policy, memory isolation, escalation prevention

### QG-P1: Production Gate
Final validation before production.
- All gates passed, performance benchmarks, DR tested, compliance, runbooks

---

## Application Guidelines

When running gate validations:

1. **Load checklist** from `{project-root}/_bmad/bam/data/checklists/{checklist}.md`
2. **Execute checks** - mark items PASS/FAIL/N/A
3. **Document failures** with details and reproduction steps
4. **Calculate pass rate** - CRITICAL vs non-critical separately
5. **Determine outcome** based on criteria
6. **FAIL:** Enter recovery protocol
7. **CONDITIONAL:** Document mitigation with timeline

---

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|----------------|-----------|
| CRITICAL item fails | Recovery protocol immediately | Non-negotiable thresholds |
| Multiple non-critical fail | Evaluate for CONDITIONAL | May indicate systemic issues |
| Gate fails twice | Escalate to architecture review | Fundamental design issues |
| Tight deadline, CONDITIONAL pass | Proceed with sign-off + remediation sprint | Document risk acceptance |
| Check applicability uncertain | Mark N/A with justification | Prevent false negatives |
| New requirement discovered | Add to checklist, re-run | Gates evolve with understanding |

---

## Related Workflows

- `validate-foundation` - Execute QG-F1 validation
- `validate-module` - Execute QG-M1, QG-M2, QG-M3 validations
- `bmad-bam-convergence-verification` - Execute QG-I1 validation
- `create-master-architecture` - Artifacts validated by QG-F1
- `bmad-bam-tenant-model-isolation` - Artifacts validated by QG-M2
- `bmad-bam-agent-runtime-architecture` - Artifacts validated by QG-M3

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Quality patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `testing-isolation,testing-agent-safety`
- **Gate requirements:** `{project-root}/_bmad/bam/data/quality-gates.csv`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Compliance frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "software quality gates best practices {date}"
- Search: "multi-tenant SaaS release validation {date}"
- Search: "CI/CD quality gates patterns {date}"
- Search: "AI system safety validation gates {date}"

---

## Checklist Owners

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

## Gate Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| First-pass rate | Gates passing on first attempt | >80% |
| Recovery time | Average FAIL to PASS | <2 sprints |
| CONDITIONAL rate | Gates passing conditionally | <20% |
| Escalation rate | Requiring architecture review | <5% |

---

## Anti-Patterns

| Anti-Pattern | Correct Approach |
|--------------|------------------|
| Skipping gates under deadline | Use CONDITIONAL with remediation plan |
| N/A without justification | Require written justification |
| Re-running only failed categories | Re-run full gate after changes |
| Multiple CONDITIONAL passes | Track debt; block after 2 consecutive |
| Treating all failures equally | Distinguish CRITICAL vs non-critical |
