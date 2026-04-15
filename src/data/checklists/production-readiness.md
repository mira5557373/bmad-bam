# Production Readiness Checklist (QG-P1)

> Gate ID: QG-P1 (Production Readiness)
> Final release decision evidence. ALL critical items must pass.
> Safety outranks schedule — no release if tenant-safety or agent-safety gates fail.
> Gate definition: comprehensive pre-production verification across all quality dimensions.
> Gate failure recovery: resolve blocking items before approving production deployment.

## Prerequisite Gates

- [ ] Foundation gate (QG-M1, QG-M2, QG-M3) passed
- [ ] All module readiness gates passed
- [ ] Cross-module convergence gate (QG-I1) passed
- [ ] Tenant isolation gate (QG-I2) passed
- [ ] Agent safety gate (QG-I3) passed

## Cross-Module Integration

- [ ] Convergence verification completed
- [ ] All facade contract tests passing
- [ ] Cross-module user journeys tested end-to-end
- [ ] Domain event flows verified across modules

## Tenant Safety

- [ ] RLS policies verified on all tenant-plane tables
- [ ] Cross-tenant data isolation confirmed
- [ ] Tier entitlements enforced correctly
- [ ] Rate limiting active per tenant
- [ ] Noisy-neighbor prevention tested

## Agent Safety

- [ ] All AI agents have kill switches configured
- [ ] Circuit breakers active on agent endpoints
- [ ] Tool permissions enforced via policy engine
- [ ] Memory scope enforcement verified
- [ ] Golden task evaluation passing (relevance ≥ 0.8, completion ≥ 0.9)
- [ ] Fallback behavior tested for all agent endpoints
- [ ] NeMo Guardrails active for input/output safety

## Observability

- [ ] Structured logging with tenant_id in all log entries
- [ ] Distributed tracing configured per tenant
- [ ] Cost attribution per tenant operational
- [ ] Noisy-neighbor alerting configured
- [ ] Audit event catalog complete

## Operational Readiness

- [ ] Tenant provisioning tested (all tiers)
- [ ] Tenant offboarding tested (GDPR compliance)
- [ ] Runbooks created for emergency procedures
- [ ] Kill switch procedures documented and tested
- [ ] Rollback procedures documented and tested

## Documentation

- [ ] API documentation complete with tenant context requirements
- [ ] Module contract documentation up to date
- [ ] Architecture decision records (ADRs) current
- [ ] Operational runbooks reviewed
- [ ] All architecture decisions verified with current {date} best practices

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All CRITICAL items pass, ≥80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass — remediation plan required |
| **FAIL** | Any CRITICAL item fails — block until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

## Waiver Process

For non-critical items that cannot be addressed:
1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

## Critical vs Non-Critical Classification

| Category                 | Classification | CONDITIONAL Threshold | FAIL Threshold |
| ------------------------ | -------------- | --------------------- | -------------- |
| Prerequisite Gates       | CRITICAL       | Any QG conditional | Any QG-I2/QG-I3 failed |
| Cross-Module Integration | CRITICAL       | Contract tests partial | Contract mismatch |
| Tenant Safety            | CRITICAL       | RLS gaps documented | Cross-tenant access |
| Agent Safety             | CRITICAL       | Kill switch >100ms | No kill switch |
| Observability            | Non-critical   | Missing tenant_id in logs | N/A |
| Operational Readiness    | CRITICAL       | Runbooks incomplete | No DR procedure |
| Documentation            | Non-critical   | API docs outdated | N/A |

## Required Templates

The following templates must be completed before this gate can pass:

| Template | Purpose | Location |
|----------|---------|----------|
| `master-architecture-template.md` | Platform architecture documentation | `{output_folder}/planning-artifacts/` |
| `module-architecture-template.md` | Module-level architecture | `{output_folder}/planning-artifacts/` |
| `tenant-model-template.md` | Tenant isolation design | `{output_folder}/planning-artifacts/` |
| `agent-runtime-template.md` | AI agent runtime configuration | `{output_folder}/planning-artifacts/` |
| `facade-contract-template.md` | Cross-module contracts | `{output_folder}/planning-artifacts/` |
| `runbook-template.md` | Operational procedures | `{output_folder}/operations/` |
| `disaster-recovery-template.md` | DR procedures | `{output_folder}/operations/` |

## Recovery Protocol

**If QG-P1 fails:**

1. **Attempt 1:** Immediate remediation (target: 1 day)
   - Identify failed CRITICAL categories from checklist
   - Review prerequisite gate status (QG-F1 through QG-I3)
   - Prioritize tenant safety and agent safety gaps
   - Execute `convergence-verification` for integration issues
   - Verify kill switches and circuit breakers are active
   - Re-run QG-P1 validation after fixes
   - **Lock passed categories** — do not re-test locked items
   - **Safety outranks schedule** — no release if safety gates fail

2. **Attempt 2:** Deep investigation (target: 1-2 days)
   - Engage cross-functional team (Security, SRE, Platform)
   - Review all prerequisite gate evidence
   - Validate end-to-end user journeys across modules
   - Verify observability coverage (logs, metrics, traces)
   - Test tenant provisioning and offboarding flows
   - Execute DR drill if disaster-recovery checks failed
   - Re-run QG-P1 validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Engineering Leadership and Product
   - Document all blocking issues with impact assessment
   - Conduct go/no-go review with all stakeholders
   - Consider phased rollout or limited tenant release
   - Create remediation plan with executive sign-off
   - Define rollback triggers and monitoring thresholds
   - Schedule production validation within 48 hours of fix

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Prerequisite Gates | Re-validate failed prerequisite | Any QG-I2/QG-I3 failure |
| Cross-Module Integration | Run convergence verification | Contract mismatch |
| Tenant Safety | Fix RLS gaps, verify isolation | Cross-tenant access |
| Agent Safety | Verify guardrails, test kill switch | Kill switch >100ms |
| Observability | Add missing tenant_id in logs | No cost attribution |
| Operational Readiness | Complete runbooks, test DR | Missing DR procedure |
| Documentation | Update API docs, ADRs | Outdated contracts |

## Related Workflows

- `bmad-bam-convergence-verification` - Integration validation
- `bmad-bam-tenant-aware-observability` - Observability setup
- `bmad-bam-disaster-recovery-design` - DR planning

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] _Source: [URL]_ citations documented for key decisions

**PASS CRITERIA:** All CRITICAL checkboxes completed, safe for production deployment
**OWNER:** BAM
**REVIEWERS:** Platform Architect, Security Lead, SRE Lead
