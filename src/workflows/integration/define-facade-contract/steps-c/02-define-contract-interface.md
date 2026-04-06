# Step 2: Define Contract Interface

Design the facade interface that will be exposed by the provider module.

## Tasks

1. **Define Operation Signatures**
   - For each integration point, define the method signature
   - Use the shared kernel types for common concepts (TenantId, UserId, etc.)
   - Ensure all operations include tenant context parameter

2. **Apply Facade Design Principles**
   - Expose use-case-oriented methods, not CRUD operations
   - Keep the facade surface area minimal (coarse-grained operations)
   - Avoid exposing internal domain entities directly

3. **Design Request/Response Objects**
   - Create DTOs that are specific to the facade contract
   - Include only data needed by consumers
   - Version the DTOs with the contract version

4. **Document Preconditions and Postconditions**
   - Specify required input validations
   - Document expected state changes
   - Define invariants that must hold

## Output

Generate facade interface definition:
```typescript
interface {ModuleName}Facade {
  // Operation signatures with JSDoc
}
```

Include request/response DTO definitions for each operation.
