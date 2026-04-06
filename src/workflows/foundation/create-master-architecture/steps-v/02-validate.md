# Step 2: Validate Master Architecture

## Validation Checklist

### Structural Completeness
- [ ] All 7 required sections present: tenant model, AI runtime, module boundaries, shared kernel, tech stack, contracts, code patterns
- [ ] Table of contents with section anchors present
- [ ] Document follows master-architecture-template.md structure

### Tenant Model
- [ ] Isolation strategy defined (RLS / schema / database per tenant)
- [ ] TenantContext class shape documented
- [ ] Tenant lifecycle states defined (provisioning → active → suspended → archived → deleted)
- [ ] Isolation matrix covers all asset types (data, cache, logs, memory, tools, jobs, vectors, analytics)

### AI Runtime
- [ ] Agent registry design documented
- [ ] Tool registry with permission policies defined
- [ ] Memory tier rules defined (session, user, tenant, global)
- [ ] Safety requirements documented (guardrails, kill switches, fallback)
- [ ] Evaluation requirements documented (golden tasks, metrics, thresholds)

### Module Boundaries
- [ ] Facade requirements defined
- [ ] Forbidden dependency patterns documented
- [ ] Event ownership rules defined
- [ ] Database ownership rules defined

### Shared Kernel
- [ ] TenantContext interface defined
- [ ] BaseEntity requirements documented
- [ ] EventBus interface defined
- [ ] Common value objects and DTOs listed

### Technology Stack
- [ ] Technology decisions per layer documented
- [ ] Version pins present for all technologies
- [ ] Limp mode architecture defined

### Core Contracts
- [ ] Tenant context interface contract defined
- [ ] AI runtime interface contract defined
- [ ] Event bus interface contract defined
- [ ] Module facade template defined

### Code Patterns
- [ ] At least 4 code pattern examples present
- [ ] Repository pattern (tenant-scoped) included
- [ ] Facade pattern included
- [ ] Domain event pattern included
- [ ] Service pattern included

### Cross-Cutting
- [ ] No module-specific decisions present (master arch is module-agnostic)
- [ ] All TSA technologies have version pins
- [ ] Document is internally consistent (no contradictions between sections)

## Gate Decision

- **PASS**: All required sections present, all critical items checked, no contradictions
- **CONDITIONAL**: Minor gaps (e.g., missing version pins for non-critical tech) — document gaps and proceed
- **FAIL**: Missing required sections, undefined isolation strategy, or no code patterns — return to Create mode

Present validation results with specific findings for each section.
