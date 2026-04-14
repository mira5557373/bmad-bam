# Module Architecture Checklist (QG-M1)

> Gate ID: QG-M1 (Module Architecture)
> Per-module architecture validation. Must pass before module implementation begins.
> Gate definition: Module has a well-defined bounded context, facade contract, and integration plan.
> Gate failure recovery: Address architectural gaps before proceeding to implementation.

## Bounded Context Definition

- [ ] Module name clearly reflects its domain purpose
- [ ] Bounded context boundaries explicitly documented
- [ ] Aggregate roots identified with clear responsibilities
- [ ] Ubiquitous language glossary defined for this context
- [ ] Context mapping shows relationships to other modules

## Facade Contract Design

- [ ] Public facade interface documented with all methods
- [ ] Method signatures are tenant-aware (accept TenantId where needed)
- [ ] DTOs defined for all facade inputs and outputs
- [ ] No internal domain objects exposed through facade
- [ ] Version strategy defined (semantic versioning)

## Domain Model

- [ ] Entities identified with their invariants
- [ ] Value objects defined for domain concepts
- [ ] Domain events documented with schema
- [ ] Aggregates have clear consistency boundaries
- [ ] No dependencies on other module internals

## Integration Points

- [ ] Dependencies on other module facades documented
- [ ] Events consumed from other modules listed
- [ ] Events published to domain event bus listed
- [ ] Async vs sync communication patterns chosen
- [ ] Failure handling strategy for each dependency

## Tenant Isolation

- [ ] Tenant ID propagation path documented
- [ ] All entities have tenant_id field design
- [ ] RLS policy requirements identified
- [ ] Cross-tenant data access explicitly prevented
- [ ] Tier-specific behavior requirements captured

## AI Behaviors (if applicable)

- [ ] AI-powered features listed with use cases
- [ ] Tool definitions drafted for agent interactions
- [ ] Memory scope requirements documented
- [ ] Safety boundaries defined for AI actions
- [ ] Approval workflow requirements identified

## Gate Decision

| Classification | Criteria |
|---------------|----------|
| **PASS** | All required items checked, architecture is implementable |
| **CONDITIONAL** | Minor gaps exist with documented remediation plan |
| **FAIL** | Critical gaps in bounded context or facade design |
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

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Bounded Context Definition | CRITICAL | Boundaries documented but incomplete | No bounded context |
| Facade Contract Design | CRITICAL | Minor interface gaps | No facade defined |
| Domain Model | CRITICAL | Events incomplete | No entities defined |
| Integration Points | Non-critical | Dependencies unclear | N/A |
| Tenant Isolation | CRITICAL | Partial tenant awareness | No tenant ID propagation |
| AI Behaviors | Non-critical | Safety boundaries unclear | N/A |

## Web Research Verification

- [ ] Search the web: "module architecture bounded context best practices {date}" - Verify current DDD patterns
- [ ] Search the web: "multi-tenant facade contract design patterns {date}" - Confirm facade design is current
- [ ] _Source: [URL]_ citations documented for key architectural decisions

## Recovery Protocol

**If QG-M1 fails:**

1. **Attempt 1:** Immediate architecture remediation (target: 1-2 days)
   - Identify failed CRITICAL categories from checklist
   - Review bounded context definition for gaps
   - Update facade contract with missing methods/DTOs
   - Document tenant ID propagation path
   - Re-run QG-M1 validation after fixes
   - **Lock passed categories** — do not re-test locked items

2. **Attempt 2:** Deep architecture investigation (target: 2-3 days)
   - Engage Platform Architect and domain experts
   - Review context mapping with other modules
   - Validate aggregate boundaries and invariants
   - Ensure facade exposes no internal domain objects
   - Update AI behavior documentation if applicable
   - Re-run validation after remediation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Master Architect and project leadership
   - Document architectural blockers in ADR
   - Conduct bounded context modeling session
   - Consider module boundary reorganization
   - Create remediation plan with stakeholder sign-off
   - Schedule follow-up validation within 1 week

**Category-Specific Recovery:**

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Bounded Context | Define context boundaries, glossary | No bounded context |
| Facade Contract | Document interface, define DTOs | No facade defined |
| Domain Model | Identify entities, document events | No entities defined |
| Tenant Isolation | Add tenant_id propagation | No tenant awareness |
| AI Behaviors | Define tools, memory scope | Safety boundaries unclear |

## Related Workflows

- `bmad-bam-create-module-architecture` - Module architecture creation
- `bmad-bam-define-facade-contract` - Facade contract definition
- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-agent-runtime-architecture` - AI behavior configuration

**PASS CRITERIA:** All CRITICAL checkboxes completed, architecture implementable
**OWNER:** BAM
**REVIEWERS:** Platform Architect, Domain Expert
