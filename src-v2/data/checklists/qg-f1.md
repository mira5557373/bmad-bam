---
name: qg-f1-foundation-gate
description: Foundation validation gate - must pass before any module development begins
module: bam
tags: [quality-gate, foundation, architecture, tenant-isolation, ai-runtime]
version: 2.0.0
---

# QG-F1: Foundation Validation Gate Checklist

> **Gate ID:** QG-F1 (Foundation Gate)
> **Definition:** Foundation gate MUST pass before any module development begins.
> **Scope:** Covers master architecture approval, tenant isolation, and AI runtime readiness.
> **Recovery:** Gate failure recovery requires resolving blocking items before enabling module development.

**Workflow:** bmad-bam-create-master-architecture, bmad-bam-validate-foundation
**Prerequisites:** None (first gate in the BAM workflow sequence)

---

## Purpose

The Foundation Gate (QG-F1) validates that the master architecture is complete, approved, and ready to support module development. This gate ensures:

1. **Tenant isolation model** is selected, documented, and implementable
2. **Module boundaries** are defined with clear facades and contracts
3. **AI runtime framework** is selected with safety guardrails in place
4. **Shared kernel** components are implemented and tested
5. **Control plane** can provision and manage tenant lifecycles

Passing QG-F1 unlocks module-level development (QG-M1, QG-M2, QG-M3).

---

## Artifacts

- [ ] **CRITICAL:** master-architecture.md exists with all required sections (1-7)
- [ ] **CRITICAL:** master-architecture.md status is 'approved'
- [ ] Technology Stack Architecture (TSA) documented with version pins
- [ ] Deployment topology diagram included

---

## Shared Kernel Implementation

- [ ] **CRITICAL:** TenantContext class implemented with required properties
- [ ] **CRITICAL:** TenantContext middleware implemented for request pipeline
- [ ] **CRITICAL:** BaseEntity class implemented with tenant_id field
- [ ] EventBus interface implemented with tenant isolation
- [ ] Audit logging implemented with tenant context injection
- [ ] Shared kernel unit tests passing

---

## Control Plane Implementation

- [ ] **CRITICAL:** Tenant provisioning API functional
- [ ] **CRITICAL:** Tenant lifecycle management working (create, suspend, delete)
- [ ] Billing integration connected (or stub for MVP)
- [ ] Admin dashboard for tenant management available
- [ ] Tenant configuration management implemented

---

## AI Runtime Implementation

- [ ] **CRITICAL:** Agent registry implemented with tenant scoping
- [ ] **CRITICAL:** Tool registry implemented with policy checks
- [ ] **CRITICAL:** Memory manager implemented with scope enforcement
- [ ] **CRITICAL:** LLM gateway connected with rate limiting
- [ ] **CRITICAL:** Safety guardrails active and tested
- [ ] Run contract enforcement operational (run-contracts: enforces execution boundaries)
- [ ] Action gateway routing all write operations (action-gateway-patterns: mediates all mutations)
- [ ] Trust tier labeling configured for all data sources (context-compiler-patterns: data provenance)
- [ ] Context compiler functional with trust-tier priority (context-compiler-patterns: priority assembly)

---

## Tests Passing

- [ ] **CRITICAL:** Tenant isolation test: data isolation verified (no cross-tenant data access)
- [ ] **CRITICAL:** Tenant isolation test: event isolation verified (events scoped to tenant)
- [ ] **CRITICAL:** Tenant isolation test: cache isolation verified (cache keys tenant-prefixed)
- [ ] **CRITICAL:** Module boundary test: no cross-module internal access
- [ ] AI runtime test: policy enforcement verified
- [ ] AI runtime test: guardrail effectiveness validated
- [ ] Integration tests for shared kernel passing

---

## Documentation

- [ ] Code patterns documented with examples
- [ ] Facade contract template documented
- [ ] Module creation guide exists
- [ ] All TSA technologies have version pins
- [ ] Technology decisions informed by web research ({date})
- [ ] Runbook for tenant provisioning available

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required with deadline |
| **FAIL** | Any CRITICAL item fails - block module development until resolved |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Artifacts (master-architecture.md) | CRITICAL | N/A | Document missing or not approved |
| Shared Kernel Implementation | CRITICAL | TenantContext partial | No TenantContext implementation |
| Control Plane Implementation | CRITICAL | Provisioning partial | No provisioning API |
| Tests Passing (tenant isolation) | CRITICAL | <80% isolation tests pass | Any cross-tenant test failure |
| AI Runtime (core components) | CRITICAL | Agent/tool registry partial | No safety guardrails |
| AI Runtime (advanced features) | Non-critical | Guardrails partial | N/A |
| Documentation | Non-critical | Incomplete guides | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. **Document** the specific item and reason for waiver request
2. **Justify** the business rationale for proceeding without this item
3. **Obtain** stakeholder sign-off (Product Owner or Technical Lead)
4. **Record** waiver in gate report with expiration date (if applicable)
5. **Create** follow-up ticket for future remediation with priority

**Note:** CRITICAL items cannot be waived. All CRITICAL items must pass for gate approval.

---

## Recovery Protocol

**If QG-F1 fails:**

### Attempt 1: Immediate Remediation (target: 2-3 days)

1. Identify failed CRITICAL categories from checklist
2. Review master architecture document for missing sections
3. Execute `create-master-architecture` workflow for incomplete areas
4. Verify tenant model decision is documented with rationale
5. Re-run QG-F1 validation after fixes
6. **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Investigation (target: 2-3 days)

1. Analyze root cause of continued failures
2. Engage Platform Architect and relevant domain experts
3. Review TSA technology decisions against current best practices
4. Validate shared kernel implementation patterns
5. Ensure run-contract enforcement is operational
6. Re-run QG-F1 validation after remediation
7. **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

1. Escalate to project leadership and Master Architect
2. Document failure patterns and blocking issues
3. Conduct architecture review session with all stakeholders
4. Consider scope reduction or phased foundation approach
5. Create remediation plan with executive sign-off
6. Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Artifacts | Update master-architecture.md, ensure all sections complete | Status not 'approved' after review |
| Shared Kernel Implementation | Review TenantContext, BaseEntity patterns; verify middleware | >2 failed attempts |
| Control Plane | Verify tenant provisioning API; check lifecycle management | Lifecycle management broken |
| Tests Passing | Run isolation test suite, fix gaps; verify no cross-tenant access | Cross-tenant test failure |
| AI Runtime | Validate agent/tool registries; verify safety guardrails | Safety guardrails inactive |
| Documentation | Complete missing guides; add pattern examples | Pattern docs incomplete after 2 attempts |

---

## Related Workflows

- `bmad-bam-create-master-architecture` - Foundation artifact creation (primary)
- `bmad-bam-validate-foundation` - Foundation validation execution
- `bmad-bam-tenant-model-isolation` - Tenant isolation design and setup
- `bmad-bam-agent-runtime-architecture` - AI runtime framework configuration
- `bmad-bam-scaffold-foundation` - Foundation scaffolding (optional)

---

## Required Templates

- `master-architecture-template.md` - Master architecture document structure
- `tenant-model-template.md` - Tenant isolation model documentation
- `ai-runtime-template.md` - AI runtime configuration template
- `sidecar-architecture-decisions.md` - Architecture decision records

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Tenant patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` - filter by selected model
- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` - filter by selected runtime
- **Foundation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` - filter: `foundation-*`

### Web Research

- Search: "multi-tenant foundation validation patterns {date}"
- Search: "enterprise SaaS architecture quality gates {date}"
- Search: "tenant isolation verification best practices {date}"

---

## Web Research Verification

- [ ] Search the web: "quality gate best practices enterprise SaaS {date}" - Verify gate criteria
- [ ] Search the web: "multi-tenant platform validation patterns {date}" - Confirm validation approach
- [ ] Search the web: "foundation architecture checklist patterns {date}" - Validate completeness
- [ ] _Source: [URL]_ citations documented for key decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, foundation ready for module development
**OWNER:** BAM (Platform Architect persona - Atlas)
**REVIEWERS:** Platform Architect, Master Architect, Security Lead

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | V2 BMAD format with full sections |
| 1.0.0 | - | Platform Architect | Initial V1 checklist |
