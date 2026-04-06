# How to Integrate BAM with TEA

TEA (Test Engineering Architecture) provides testing patterns. BAM extends TEA with tenant-specific testing capabilities.

## Prerequisites

- Both BAM and TEA installed
- Module architecture designed

## Load BAM Testing Context

```
/tea
> bam-tea-context
```

This loads tenant-aware testing patterns.

## Tenant Isolation Testing

### Generate Test Strategy

```
> tenant-test-strategy
```

Produces test categories:
1. **Unit tests** - Domain logic without tenant context
2. **Integration tests** - RLS policy verification
3. **E2E tests** - Full tenant journey

### Fixture Patterns

BAM provides multi-tenant fixture patterns:

```typescript
// fixtures/tenant-factory.ts
export const createTenantFixture = async (tier: Tier = 'free') => {
  const tenant = await db.tenant.create({
    name: `test-tenant-${uuid()}`,
    tier,
  });
  
  return {
    tenant,
    setContext: () => setTenantContext(tenant.id),
    cleanup: () => db.tenant.delete(tenant.id),
  };
};
```

### Isolation Test Template

```typescript
describe('Tenant Isolation', () => {
  let tenantA: TenantFixture;
  let tenantB: TenantFixture;

  beforeEach(async () => {
    tenantA = await createTenantFixture();
    tenantB = await createTenantFixture();
  });

  afterEach(async () => {
    await tenantA.cleanup();
    await tenantB.cleanup();
  });

  it('prevents cross-tenant data access', async () => {
    tenantA.setContext();
    await createProject('Project A');

    tenantB.setContext();
    const projects = await listProjects();
    
    expect(projects).toHaveLength(0);
  });
});
```

## AI Agent Testing

### Golden Task Testing

```
/tea
> bam-tea-context
> golden-task-design
```

Creates baseline tests for AI agents:

```typescript
describe('Agent Golden Tasks', () => {
  it('summarizes document correctly', async () => {
    const result = await agent.run({
      task: 'summarize',
      input: goldenInput,
    });
    
    expect(result).toMatchSnapshot();
    expect(result.metrics.tokens).toBeLessThan(1000);
  });
});
```

### Safety Evaluation

```
> agent-safety-eval
```

Generates safety test suite:
- Prompt injection resistance
- Tool permission verification
- Tenant context validation

## Test Matrix

| Test Type | TEA Pattern | BAM Extension |
|-----------|-------------|---------------|
| Unit | Pure functions | Tenant-agnostic |
| Integration | Database | RLS verification |
| Contract | API | Facade contracts |
| E2E | User flows | Tenant journeys |
| AI Eval | Benchmarks | Safety + Golden tasks |

## Running Tests

```bash
# Run all tests
npm test

# Run tenant isolation tests only
npm test -- --grep "Tenant Isolation"

# Run AI safety tests
npm test -- --grep "Agent Safety"
```

## Quality Gates

TEA + BAM integration validates:
- **QG-M2**: Tenant isolation tests pass
- **QG-I2**: Cross-tenant safety verified
- **QG-I3**: AI guardrails active
