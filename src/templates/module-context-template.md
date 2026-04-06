# Module Context: {{MODULE_NAME}}

## Module Identity

- **Path:** `src/modules/{{MODULE_NAME}}/`
- **Facade:** `src/modules/{{MODULE_NAME}}/facade.py`
- **Status:** {{STATUS}}

## Inheritance from Master Architecture

- **Tenant Model:** {{TENANT_MODEL}}
- **Base Entity:** All entities MUST inherit `TenantEntity` from shared kernel
- **Tenant ID Column:** `tenant_id` (UUID, NOT NULL, indexed)
- **Event Bus:** {{EVENT_BUS}}

## Dependencies

### Allowed Imports

{{ALLOWED_DEPENDENCIES}}

### Forbidden Imports

- Direct import from any module's internal packages
- Circular dependencies to modules that depend on this module
- Any import bypassing facade contracts

## Facade Contract

### Commands (Write Operations)

{{COMMANDS}}

### Queries (Read Operations)

{{QUERIES}}

### Events Published

{{EVENTS}}

## AI Coding Rules

1. **Tenant Isolation:** Every query MUST filter by `tenant_id`
2. **Facade Only:** External access ONLY through facade functions
3. **No Direct DB Access:** Other modules cannot access this module's tables
4. **Event-Driven:** Cross-module side effects via domain events only
5. **Entitlement Check:** Feature gating via billing.facade.check_entitlement()

## Testing Requirements

- Unit tests: `tests/modules/{{MODULE_NAME}}/unit/`
- Integration tests: `tests/modules/{{MODULE_NAME}}/integration/`
- Isolation tests: Must verify tenant_id filtering in every query
