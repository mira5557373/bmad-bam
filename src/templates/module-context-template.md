---
name: Module Context Template
description: Template for documenting module context and AI coding rules
category: architecture
version: 1.0.0
type: "architecture"
---

## Purpose

Template for documenting module context and AI coding rules

# Module Context: {{module_name}}

## Module Identity

- **Path:** `src/modules/{{module_name}}/`
- **Facade:** `src/modules/{{module_name}}/facade.py`
- **Status:** {{status}}

## Inheritance from Master Architecture

- **Tenant Model:** {{tenant_model}}
- **Base Entity:** All entities MUST inherit `TenantEntity` from shared kernel
- **Tenant ID Column:** `tenant_id` (UUID, NOT NULL, indexed)
- **Event Bus:** {{event_bus}}

## Dependencies

### Allowed Imports

{{allowed_dependencies}}

### Forbidden Imports

- Direct import from any module's internal packages
- Circular dependencies to modules that depend on this module
- Any import bypassing facade contracts

## Facade Contract

### Commands (Write Operations)

{{commands}}

### Queries (Read Operations)

{{queries}}

### Events Published

{{events}}

## AI Coding Rules

1. **Tenant Isolation:** Every query MUST filter by `tenant_id`
2. **Facade Only:** External access ONLY through facade functions
3. **No Direct DB Access:** Other modules cannot access this module's tables
4. **Event-Driven:** Cross-module side effects via domain events only
5. **Entitlement Check:** Feature gating via billing.facade.check_entitlement()

## Testing Requirements

- Unit tests: `tests/modules/{{module_name}}/unit/`
- Integration tests: `tests/modules/{{module_name}}/integration/`
- Isolation tests: Must verify tenant_id filtering in every query

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "module context documentation best practices {date}"
- "bounded context multi-tenant SaaS patterns {date}"
- "DDD module boundaries enterprise implementation {date}"

Incorporate relevant findings into the document sections above.

---

## Verification Checklist

- [ ] Module identity (path, facade, status) is accurately documented
- [ ] Tenant model inheritance is correctly specified from master architecture
- [ ] All entities inherit from TenantEntity with proper tenant_id column
- [ ] Allowed dependencies are explicitly listed and verified
- [ ] Forbidden imports are documented and enforced by lint rules
- [ ] Facade contract commands and queries are fully specified
- [ ] Published events are documented with schema definitions
- [ ] AI coding rules are complete and enforceable
- [ ] Testing requirements include tenant isolation verification
- [ ] No direct database access occurs from external modules
- [ ] Feature gating via entitlement check is implemented

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
