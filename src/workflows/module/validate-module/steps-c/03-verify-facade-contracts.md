# Step 3: Verify Facade Contracts

Validate the module's public facade design and contract compliance.

## Public Facade Validation

### QG-M2: Facade Completeness

- [ ] **Facade class defined**
  - Single public facade per module
  - Clear naming convention: `{ModuleName}Facade`

- [ ] **All methods tenant-scoped**
  - Every public method accepts tenant context
  - No methods that operate across tenants
  - Tenant parameter is first or context object

- [ ] **Method signatures complete**
  - Input parameters documented
  - Return types specified
  - Async/sync behavior declared

### DTO Validation

- [ ] **Input DTOs defined**
  - Each facade method has typed input
  - Validation rules documented
  - Required vs optional fields clear

- [ ] **Output DTOs defined**
  - Return types are DTOs, not entities
  - No entity leakage through facade
  - Pagination patterns followed for lists

### Error Contract Compliance

- [ ] **Error types defined**
  - Module-specific error types documented
  - Errors follow master architecture error contract
  - Error codes are unique within module

- [ ] **Error handling documented**
  - Expected errors listed per method
  - Recovery guidance provided
  - Tenant context preserved in errors

### Master Architecture Alignment

- [ ] **Facade template followed**
  - Structure matches master architecture facade template
  - Required methods implemented (if specified)
  - Naming conventions consistent

## Contract Verification

For each facade method:

```markdown
| Method | Tenant-Scoped | Input DTO | Output DTO | Errors | Status |
|--------|---------------|-----------|------------|--------|--------|
| {name} | YES/NO | {dto} | {dto} | {list} | PASS/FAIL |
```

## Blocking Issues

Flag as BLOCKING if:
- No public facade defined
- Methods not tenant-scoped
- Entity leakage (entities returned instead of DTOs)
- Error contract not followed
