# Step 4: Validate Isolation

Verify module isolation, dependency integrity, and tenant boundary enforcement.

## Module Isolation Validation

### Dependency Integrity

- [ ] **Consumed facades declared**
  - All external module dependencies listed
  - Version or contract reference provided
  - Purpose of each dependency documented

- [ ] **Consumed events declared**
  - All subscribed events listed
  - Event source module identified
  - Handler responsibility documented

- [ ] **No circular dependencies**
  - Module does not depend on modules that depend on it
  - Dependency graph is acyclic
  - If cycle detected, document resolution strategy

- [ ] **No forbidden imports**
  - No direct access to other modules' internal packages
  - All cross-module access through facades
  - No shared database tables (except shared kernel)

### Tenant Isolation

- [ ] **Data isolation**
  - All queries filter by `tenant_id`
  - No cross-tenant data access possible
  - Tenant context propagated through all layers

- [ ] **Memory isolation** (if AI-enabled)
  - Memory tiers respect tenant boundaries
  - No cross-tenant memory leakage
  - Tenant-specific memory scoped correctly

- [ ] **Event isolation**
  - Published events include `tenant_id`
  - Event consumers filter by tenant
  - No tenant ID in event routing keys (security)

### Published Events Validation

- [ ] **Events defined with schemas**
  - Each published event has payload schema
  - All events include `tenant_id` in payload
  - Event naming follows conventions (past tense)

- [ ] **Publishing rules documented**
  - When each event is published
  - Consistency guarantees (at-least-once, exactly-once)
  - Ordering requirements

## Isolation Verification Matrix

```markdown
| Isolation Type | Check | Status | Finding |
|----------------|-------|--------|---------|
| Module boundaries | No internal imports | PASS/FAIL | {detail} |
| Module boundaries | Facade-only access | PASS/FAIL | {detail} |
| Dependencies | No cycles | PASS/FAIL | {detail} |
| Tenant data | tenant_id filtering | PASS/FAIL | {detail} |
| Tenant memory | Scope isolation | PASS/FAIL | {detail} |
| Events | tenant_id in payload | PASS/FAIL | {detail} |
```

## Blocking Issues

Flag as BLOCKING if:
- Circular dependencies detected
- Internal package imports across modules
- Missing `tenant_id` in events
- Cross-tenant data access possible
