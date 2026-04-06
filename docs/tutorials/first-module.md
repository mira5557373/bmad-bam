# Your First Module

This tutorial guides you through designing and implementing your first module in a BAM multi-tenant architecture.

## Prerequisites

- Completed [Getting Started](getting-started.md)
- Master architecture created and frozen (QG-F1 passed)

## Understanding Modules in BAM

In BAM, a module is:
- A **bounded context** with clear domain boundaries
- **Independently deployable** (even within a monolith)
- **Tenant-aware** with proper isolation
- **Facade-protected** for cross-module communication

## Step 1: Identify Your Bounded Context

Work with Mary (Analyst) with BAM extensions:

```
/analyst
> bam-context
> discover-contexts
```

Answer the discovery questions:
1. What domain does this module serve?
2. What data does it own?
3. Who are the actors (users, agents, systems)?
4. What are the invariants?

## Step 2: Design Module Architecture

Switch to Atlas for architecture:

```
/atlas
> MBD
```

Follow the workflow to define:

### Aggregate Roots
```markdown
## Aggregates

### Project (Aggregate Root)
- ProjectId (tenant-scoped)
- Name, Description
- Members[]
- Settings

Invariants:
- Project must have at least one owner
- Name unique within tenant
```

### Facade Contract
```markdown
## Facade Interface

### ProjectFacade
- createProject(cmd: CreateProjectCommand): ProjectId
- getProject(id: ProjectId): ProjectDTO
- listProjects(tenantId: TenantId): ProjectDTO[]
```

## Step 3: Implement Tenant Isolation

With the design complete, implement isolation:

```
/dev
> bam-dev-context
> implement-rls
```

Generate RLS policies:
```sql
-- projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON projects
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

## Step 4: Create Module Epics

Break down into implementable stories:

```
/atlas
> CME  -- Create Module Epics
```

This generates:
- Epic 1: Core domain implementation
- Epic 2: Facade contract implementation
- Epic 3: Tenant isolation verification
- Epic 4: Integration testing

## Step 5: Validate Module

Before integration, pass module gates:

```
/atlas
> VM  -- Validate Module
```

Checks against:
- QG-M1: Module architecture complete
- QG-M2: Tenant isolation implemented
- QG-M3: Module readiness verified

## Common Patterns

### Tenant Context Propagation
```typescript
// Middleware extracts tenant from JWT
const tenantId = extractTenantId(request);

// Set in database session
await db.query(`SET app.tenant_id = '${tenantId}'`);

// RLS automatically filters
const projects = await db.query('SELECT * FROM projects');
```

### Facade Implementation
```typescript
@Injectable()
export class ProjectFacade {
  constructor(
    private readonly projectService: ProjectService,
    private readonly tenantContext: TenantContext,
  ) {}

  async createProject(cmd: CreateProjectCommand): Promise<ProjectId> {
    // Tenant automatically injected
    return this.projectService.create({
      ...cmd,
      tenantId: this.tenantContext.tenantId,
    });
  }
}
```

## Next Steps

- [Tenant Isolation Setup](tenant-isolation-setup.md) - Advanced isolation patterns
- [Facade Contract Design](../how-to/design-facade-contract.md) - Cross-module communication
- [Module Testing](../how-to/test-module.md) - TEA integration for testing
