---
name: qg-m1-module-architecture
description: Module architecture validation gate ensuring bounded context, facade contracts, and sprint readiness
module: bam
version: 2.0.0
tags: [module, quality-gate, multi-tenant, architecture, ddd, sprint-readiness]
secondary_gates: [QG-S1]
---

# QG-M1: Module Architecture Gate

> **Gate ID:** QG-M1 (Module Architecture)
> **Secondary Gate:** QG-S1 (Module Readiness) merged into this gate
> **Workflow:** bmad-bam-create-module-architecture
> **Prerequisites:** QG-F1 (Foundation)

Per-module architecture validation. Must pass before module implementation begins.

**Gate definition:** Module has a well-defined bounded context, facade contract, integration plan, and sprint readiness.

**Gate failure recovery:** Address architectural and readiness gaps before proceeding to implementation.

---

## Purpose

This gate validates that each module:
1. Has clearly defined bounded context boundaries following DDD principles
2. Exposes a tenant-aware facade contract with versioning strategy
3. Maintains proper integration relationships with other modules
4. Ensures tenant isolation throughout the domain model
5. Documents AI behaviors where applicable
6. Is ready for sprint implementation (QG-S1 criteria)

---

## Bounded Context Definition

- [ ] **CRITICAL:** Module name clearly reflects its domain purpose
- [ ] **CRITICAL:** Bounded context boundaries explicitly documented
- [ ] Aggregate roots identified with clear responsibilities
- [ ] Ubiquitous language glossary defined for this context
- [ ] Context mapping shows relationships to other modules

## Facade Contract Design

- [ ] **CRITICAL:** Public facade interface documented with all methods
- [ ] **CRITICAL:** Method signatures are tenant-aware (accept TenantId where needed)
- [ ] DTOs defined for all facade inputs and outputs
- [ ] No internal domain objects exposed through facade
- [ ] Version strategy defined (semantic versioning)

## Domain Model

- [ ] **CRITICAL:** Entities identified with their invariants
- [ ] **CRITICAL:** All entities have tenant_id field design
- [ ] Value objects defined for domain concepts
- [ ] Domain events documented with schema
- [ ] Aggregates have clear consistency boundaries
- [ ] No dependencies on other module internals

## Integration Points

- [ ] Dependencies on other module facades documented
- [ ] **CRITICAL:** Dependencies explicit and minimal
- [ ] Events consumed from other modules listed
- [ ] Events published to domain event bus listed
- [ ] Async vs sync communication patterns chosen
- [ ] Failure handling strategy for each dependency

## Tenant Isolation

- [ ] **CRITICAL:** Tenant ID propagation path documented
- [ ] **CRITICAL:** Tenant context requirements identified
- [ ] RLS policy requirements identified
- [ ] **CRITICAL:** Cross-tenant data access explicitly prevented
- [ ] Tier-specific behavior requirements captured

## AI Behaviors (if applicable)

- [ ] AI-powered features listed with use cases
- [ ] Tool definitions drafted for agent interactions
- [ ] Memory scope requirements documented
- [ ] Safety boundaries defined for AI actions
- [ ] Approval workflow requirements identified

---

## Module Readiness (QG-S1)

> This section merges the QG-S1 Module Readiness checklist. These items ensure the module is ready for sprint implementation.

### Prerequisites

- [ ] **CRITICAL:** Foundation gate (QG-F1) passed
- [ ] **CRITICAL:** All dependency modules have facade contracts

### Sprint Readiness

- [ ] Module architecture document created
- [ ] Module architecture inherits master-architecture
- [ ] **CRITICAL:** Public facade designed
- [ ] **CRITICAL:** No forbidden dependencies
- [ ] Module epics created
- [ ] Stories are module-scoped (no cross-module implementation)
- [ ] Stories reference facade contracts for dependencies
- [ ] Module registered in sprint-status.yaml
- [ ] Module status set to 'in-progress'
- [ ] Dependency status shows all 'satisfied'

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items pass, architecture is implementable, module ready for sprint |
| **CONDITIONAL** | All CRITICAL items pass, minor gaps exist with documented remediation plan |
| **FAIL** | Any CRITICAL item fails |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Critical vs Non-Critical Classification

### Module Architecture Categories

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Bounded Context Definition | CRITICAL | Boundaries documented but incomplete | No bounded context |
| Facade Contract Design | CRITICAL | Minor interface gaps | No facade defined |
| Domain Model | CRITICAL | Events incomplete | No entities defined |
| Integration Points | Non-critical | Dependencies unclear | N/A |
| Tenant Isolation | CRITICAL | Partial tenant awareness | No tenant ID propagation |
| AI Behaviors | Non-critical | Safety boundaries unclear | N/A |

### Module Readiness Categories (QG-S1)

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Prerequisites (foundation gate, dependency facades) | CRITICAL | Foundation partial | Foundation gate failed |
| Architecture (facade, dependencies) | CRITICAL | Minor facade gaps | No facade designed |
| Epics & Stories completeness | Non-critical | Stories incomplete | N/A |
| Module Status registration | Non-critical | Status not updated | N/A |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If QG-M1 fails:**

### Attempt 1: Immediate Architecture Remediation (target: 1-2 days)

- Identify failed CRITICAL categories from checklist
- Review bounded context definition for gaps
- Update facade contract with missing methods/DTOs
- Document tenant ID propagation path
- Verify foundation gate has passed (QG-S1)
- Check all dependency modules have facade contracts (QG-S1)
- Update module architecture document if incomplete (QG-S1)
- Register module in sprint-status.yaml (QG-S1)
- Re-run QG-M1 validation after fixes
- **Lock passed categories** - do not re-test locked items

### Attempt 2: Deep Architecture Investigation (target: 2-3 days)

- Engage Platform Architect and domain experts
- Review context mapping with other modules
- Validate aggregate boundaries and invariants
- Ensure facade exposes no internal domain objects
- Update AI behavior documentation if applicable
- Validate facade dependencies are satisfied (QG-S1)
- Review epic and story scoping for cross-module issues (QG-S1)
- Verify no forbidden dependencies exist (QG-S1)
- Re-run validation after remediation
- **Preserve locked categories** from Attempt 1

### Attempt 3: Mandatory Course Correction

- Escalate to Master Architect and project leadership
- Document architectural blockers in ADR
- Conduct bounded context modeling session
- Consider module boundary reorganization
- Consider story rescoping or dependency renegotiation (QG-S1)
- Create remediation plan with stakeholder sign-off
- Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Bounded Context | Define context boundaries, glossary | No bounded context |
| Facade Contract | Document interface, define DTOs | No facade defined |
| Domain Model | Identify entities, document events | No entities defined |
| Tenant Isolation | Add tenant_id propagation | No tenant awareness |
| AI Behaviors | Define tools, memory scope | Safety boundaries unclear |
| Prerequisites | Re-validate foundation gate, check facades | Foundation gate failed |
| Epics & Stories | Scope stories to module boundary | Cross-module implementation |
| Module Status | Register module, update dependencies | Status not 'in-progress' |

---

## Related Workflows

- `create-module-architecture` - Module architecture creation
- `define-facade-contract` - Facade contract definition
- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-agent-runtime-architecture` - AI behavior configuration
- `validate-foundation` - Foundation gate validation
- `create-module-epics` - Epic and story creation

## Related Templates

- `module-architecture-template.md` - Module architecture document
- `facade-contract-template.md` - Facade contract specification
- `module-epic-template.md` - Epic and story templates

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Module patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `module-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **DDD patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter by category: `ddd-*`

---

## Web Research Verification

- [ ] Search the web: "module architecture bounded context best practices {date}" - Verify current DDD patterns
- [ ] Search the web: "multi-tenant facade contract design patterns {date}" - Confirm facade design is current
- [ ] Search the web: "module readiness sprint planning best practices {date}" - Verify sprint readiness criteria
- [ ] Search the web: "multi-tenant module dependency management patterns {date}" - Confirm dependency patterns are current
- [ ] _Source: [URL]_ citations documented for key architectural decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, architecture implementable, module ready for sprint
**OWNER:** BAM
**REVIEWERS:** Platform Architect, Domain Expert, Tech Lead, Product Owner

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM V2 Migration | V2 BMAD format with full sections |
| 1.0.0 | - | Platform Architect | Initial V1 checklist |
