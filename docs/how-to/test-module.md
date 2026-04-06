# How to Test a Module

This guide covers testing strategies for BAM modules, including unit, integration, and contract tests.

## Prerequisites

- Module implementation complete
- TEA module installed (recommended)

## Testing Layers

### 1. Unit Tests

Test domain logic in isolation:

```typescript
describe('Project', () => {
  it('should create with valid data', () => {
    const project = Project.create({
      name: 'Test Project',
      tenantId: 'tenant-123',
    });
    
    expect(project.name).toBe('Test Project');
    expect(project.tenantId).toBe('tenant-123');
  });

  it('should enforce invariants', () => {
    expect(() => Project.create({ name: '' }))
      .toThrow('Name is required');
  });
});
```

### 2. Integration Tests

Test with real database and RLS:

```typescript
describe('ProjectRepository', () => {
  let tenantA: TenantFixture;
  let tenantB: TenantFixture;

  beforeEach(async () => {
    tenantA = await createTenantFixture();
    tenantB = await createTenantFixture();
  });

  it('should only return tenant data', async () => {
    // Create as tenant A
    tenantA.setContext();
    await repo.save(createProject('Project A'));

    // Query as tenant B
    tenantB.setContext();
    const projects = await repo.findAll();

    expect(projects).toHaveLength(0);
  });
});
```

### 3. Facade Contract Tests

Test the public interface:

```typescript
describe('ProjectFacade', () => {
  it('should create and retrieve project', async () => {
    const id = await facade.createProject({
      tenantId: 'tenant-123',
      name: 'Test Project',
    });

    const project = await facade.getProject(id, 'tenant-123');
    
    expect(project.name).toBe('Test Project');
  });

  it('should return proper error for not found', async () => {
    await expect(facade.getProject('invalid', 'tenant-123'))
      .rejects.toMatchObject({ code: 'NOT_FOUND' });
  });
});
```

### 4. Event Contract Tests

Test published events:

```typescript
describe('Project Events', () => {
  it('should publish ProjectCreated event', async () => {
    const events: any[] = [];
    eventBus.subscribe('ProjectCreated', e => events.push(e));

    await facade.createProject({
      tenantId: 'tenant-123',
      name: 'Test',
    });

    expect(events).toHaveLength(1);
    expect(events[0].payload.tenantId).toBe('tenant-123');
  });
});
```

## Running Tests

```bash
# All tests
npm test

# Unit tests only
npm test -- --grep "unit"

# Integration tests
npm test -- --grep "integration"

# With coverage
npm test -- --coverage
```

## Quality Gates

Tests must pass for:
- **QG-M3**: Module readiness (80% coverage)
- **QG-I1**: Facade compatibility
- **QG-I2**: Tenant safety

## Related

- [Integrate with TEA](integrate-with-tea.md) - Advanced testing patterns
- [Test Tenant Isolation](test-tenant-isolation.md) - Isolation verification
