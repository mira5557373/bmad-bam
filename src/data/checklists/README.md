# BAM Quality Gate Checklists

## Overview

36 checklists enforcing 43 quality gates throughout the multi-tenant AI SaaS development lifecycle. This includes gate-tied checklists and supplementary reference checklists.

## Supplementary Checklists

These checklists are general-purpose reference materials not tied to specific quality gates:

| File | Purpose |
|------|---------|
| `compliance-checklist.md` | General compliance verification reference |
| `production-checklist.md` | General production deployment reference |
| `security-checklist.md` | General security verification reference |
| `tenant-checklist.md` | General tenant configuration reference |

## Quality Gate Sequence

### Foundation Gate
1. **QG-F1** - `foundation-gate.md` - Master architecture frozen

### Module Gates
2. **QG-M1** - `module-architecture.md` - Module bounded context defined
3. **QG-M2** - `tenant-isolation.md` - RLS and context propagation
4. **QG-M3** - Agent runtime ready:
   - `qg-m3-agent-runtime.md` - Agent runtime checklist
   - `qg-m3-tools.md` - Tool contract checklist

### Integration Gates
5. **QG-I1** - `qg-i1-convergence.md` - Cross-module facade compatibility
6. **QG-I2** - `qg-i2-tenant-safety.md` - No cross-tenant data leaks
7. **QG-I3** - `qg-i3-agent-safety.md` - AI guardrails active

### Production Gate
8. **QG-P1** - `production-readiness.md` - All gates pass, ready to deploy

### Post-Production Gates
9. **QG-PD1** - `qg-post-deployment.md` - Post-deployment verification
10. **QG-IR1** - `qg-incident-response.md` - Incident handling checklist

### Periodic Review Gates
11. **QG-SA1** - `qg-security-audit.md` - Periodic security audit
12. **QG-PR1** - `qg-performance-review.md` - Performance baseline review

### Module Readiness Gate
13. **QG-M1-R** - `module-readiness.md` - Module readiness (sub-gate of QG-M1)

### Security Gates
14. **QG-S1 to QG-S10** - Security baseline and continuous security (referenced in `qg-security-continuous.md`)

### Specialized Operational Gates
15. **QG-CC** - `qg-compliance-continuous.md` - Continuous compliance monitoring
16. **QG-AI2** - `qg-ai-observability.md` - AI/LLM observability verification
17. **QG-CP1** - `qg-capacity-planning.md` - Capacity planning quarterly review
18. **QG-DR1** - `qg-disaster-recovery-drill.md` - Disaster recovery drill validation

## Checklist Files

| File | Gate | Purpose |
|------|------|---------|
| `foundation-gate.md` | QG-F1 | Verify master architecture is frozen |
| `module-architecture.md` | QG-M1 | Module bounded context complete |
| `tenant-isolation.md` | QG-M2 | RLS and tenant context verified |
| `qg-m3-agent-runtime.md` | QG-M3 | Agent runtime architecture |
| `qg-m3-tools.md` | QG-M3 | Tool contracts defined |
| `qg-i1-convergence.md` | QG-I1 | Facade contract compatibility |
| `qg-i2-tenant-safety.md` | QG-I2 | Cross-tenant leak prevention |
| `qg-i3-agent-safety.md` | QG-I3 | AI safety guardrails |
| `production-readiness.md` | QG-P1 | Production deployment ready |
| `qg-post-deployment.md` | QG-PD1 | Post-deployment verification |
| `qg-incident-response.md` | QG-IR1 | Incident handling checklist |
| `qg-security-audit.md` | QG-SA1 | Periodic security audit |
| `qg-performance-review.md` | QG-PR1 | Performance baseline review |
| `module-readiness.md` | QG-M1-R | Module readiness (sub-gate of QG-M1) |
| `qg-security-continuous.md` | QG-S5 | Continuous security monitoring |
| `qg-s3-security-baseline.md` | QG-S3 | Security baseline gate |
| `qg-s4-ai-security.md` | QG-S4 | AI-specific security controls |
| `qg-operations-continuous.md` | QG-OC | Continuous operations (postmortem process) |
| `qg-compliance-continuous.md` | QG-CC | Continuous compliance monitoring |
| `qg-ai-observability.md` | QG-AI2 | AI/LLM observability verification |
| `qg-capacity-planning.md` | QG-CP1 | Capacity planning quarterly review |
| `qg-disaster-recovery-drill.md` | QG-DR1 | Disaster recovery drill validation |
| `qg-ai1-ai-safety.md` | QG-AI1 | AI agent safety evaluation |
| `qg-bv1-billing-validation.md` | QG-BV1 | Billing accuracy validation |
| `qg-ce1-chaos-engineering.md` | QG-CE1 | Chaos engineering verification |
| `qg-lt1-load-testing.md` | QG-LT1 | Load testing completion |

## Checklist Format

All checklists include:
- Gate ID and description
- `- [ ]` checkbox items (grouped by category)
- Gate Decision section (PASS/CONDITIONAL/FAIL criteria)
- **Critical vs Non-Critical Classification table** (defines which categories are CRITICAL)

### CRITICAL Classification Standard

BAM checklists use **classification tables** rather than inline markers to define CRITICAL items. This approach:
- Groups related items by category
- Classifies entire categories as CRITICAL or non-critical
- Provides clearer gate decision criteria

## Example Checklist Structure

```markdown
# Quality Gate: QG-XX - Gate Name

> Gate ID: QG-XX
> Brief description of what this gate validates.

## Category Name

- [ ] Required item in this category
- [ ] Another required item
- [ ] Optional item

## Another Category

- [ ] Item in second category

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, ≥80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass — remediation plan required |
| **FAIL** | Any CRITICAL item fails — block until resolved |

## Critical vs Non-Critical Classification

| Category           | Classification |
|--------------------|----------------|
| Category Name      | CRITICAL       |
| Another Category   | Non-critical   |

## Recovery Protocol
Steps to remediate failed gates.
```

## Gate Dependencies

```
QG-F1 (Foundation)
  |
  v
QG-M1 (Module Architecture)
  |
  v
QG-M2 (Tenant Isolation) --+
  |                        |
  v                        v
QG-M3 (Agent Runtime) --> QG-AI2 (AI Observability)
  |
  v
QG-I1 (Convergence) --> QG-I2 (Tenant Safety) --> QG-I3 (Agent Safety)
  |
  v
QG-P1 (Production)
  |
  v
QG-PD1 (Post-Deployment) --> [Production Stable]
  |
  v
[Operational Phase]
  |
  +---> QG-IR1 (Incident Response) - triggered by incidents
  +---> QG-SA1 (Security Audit) - quarterly
  +---> QG-PR1 (Performance Review) - quarterly
  +---> QG-OC (Operations Continuous) - postmortem process
  +---> QG-CC (Compliance Continuous) - continuous compliance
  +---> QG-CP1 (Capacity Planning) - quarterly
  +---> QG-DR1 (Disaster Recovery Drill) - quarterly
```
