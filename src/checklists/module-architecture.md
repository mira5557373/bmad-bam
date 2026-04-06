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

## Critical Items

- Bounded Context Definition: All items CRITICAL
- Facade Contract Design: All items CRITICAL
- Domain Model: Aggregates and events CRITICAL
- Tenant Isolation: All items CRITICAL

## Recovery Protocol

If this gate fails:
1. Review feedback with Platform Architect
2. Update module architecture document
3. Re-run create-module-architecture workflow
4. Resubmit for QG-M1 validation
