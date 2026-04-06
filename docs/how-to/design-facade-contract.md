# How to Design Facade Contracts

Facade contracts define the public interface between modules. This guide covers creating well-designed contracts.

## When to Use

- Defining module boundaries
- Cross-module communication needs
- API versioning requirements

## Prerequisites

- Module architecture complete
- Bounded contexts identified

## Steps

### 1. Start the Workflow

```
/kai
> DFC  -- Define Facade Contract
```

### 2. Identify Integration Points

For each module pair that needs communication:
- What data flows between them?
- What operations does consumer need?
- What events should be published?

### 3. Define Contract Interface

```typescript
// Example facade interface
interface ProjectFacade {
  // Queries (read operations)
  getProject(id: ProjectId, tenantId: TenantId): Promise<ProjectDTO>;
  listProjects(tenantId: TenantId, options?: ListOptions): Promise<Page<ProjectDTO>>;
  
  // Commands (write operations)
  createProject(cmd: CreateProjectCommand): Promise<ProjectId>;
  updateProject(cmd: UpdateProjectCommand): Promise<void>;
  
  // Events (async notifications)
  onProjectCreated: Event<ProjectCreatedPayload>;
}
```

### 4. Specify DTOs

```typescript
// Data Transfer Objects - never expose domain entities
interface ProjectDTO {
  id: string;
  tenantId: string;
  name: string;
  status: ProjectStatus;
  createdAt: string;
  // No internal fields exposed
}
```

### 5. Document Error Handling

```typescript
// Contract errors
type FacadeError = 
  | { code: 'NOT_FOUND'; message: string }
  | { code: 'FORBIDDEN'; message: string }
  | { code: 'VALIDATION'; message: string; details: ValidationError[] }
  | { code: 'CONFLICT'; message: string };
```

### 6. Include Tenant Context

Every operation must include tenant context:

```typescript
// Tenant context is required for all operations
interface TenantScopedOperation {
  tenantId: TenantId;
  // Other parameters
}
```

## Best Practices

1. **Keep facades thin** - Only expose what consumers need
2. **Version from day one** - Include version in contract
3. **Use DTOs** - Never expose domain entities
4. **Document everything** - Include examples and edge cases
5. **Test contracts** - Consumer-driven contract tests

## Output

Generated file: `{output_folder}/contracts/{module}-facade-contract.md`

## Related

- [Evolve Facade Contract](../reference/workflows.md) - For contract changes
- [Module Boundary Design](create-master-architecture.md) - For initial boundaries
