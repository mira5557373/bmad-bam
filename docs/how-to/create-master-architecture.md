# How to Create Master Architecture

The master architecture is the frozen foundation of your multi-tenant SaaS platform.

## When to Use

- Starting a new multi-tenant SaaS project
- Migrating existing app to multi-tenant
- Major platform redesign

## Prerequisites

- BAM installed
- Requirements gathered (use Mary with `bam-context`)

## Steps

### 1. Start the Workflow

```
/atlas
> CMAR
```

Or directly:
```
bmad-bam-create-master-architecture
```

### 2. Define Tenant Model

Atlas will guide you through:

```markdown
## Tenant Hierarchy

Organization (Billing Entity)
  └── Workspace (Collaboration Boundary)
      └── User (Individual Access)
```

Answer:
- Who is the billing entity?
- What collaboration boundaries exist?
- How do users relate to organizations?

### 3. Select Isolation Strategy

```markdown
## Isolation Decision

| Factor | RLS | Schema | Database |
|--------|-----|--------|----------|
| Tenant count | 1000+ | 100-1000 | <100 |
| Isolation need | Medium | High | Maximum |
| Ops complexity | Low | Medium | High |
```

### 4. Define Module Boundaries

Identify bounded contexts:

```markdown
## Modules

### Core Modules
- Identity (auth, users, tenants)
- Billing (subscriptions, usage)
- Projects (core domain)

### AI Modules
- Agent Runtime (orchestration)
- Tool Registry (MCP integration)
```

### 5. Design Shared Kernel

Keep minimal:

```markdown
## Shared Kernel

### Allowed
- TenantContext interface
- Base value objects (Money, Email)
- Event contracts

### Forbidden
- Domain entities
- Business logic
- Direct database access
```

### 6. Generate Document

Output: `{output_folder}/planning-artifacts/master-architecture.md`

## Template Structure

```markdown
# Master Architecture

## 1. Vision
## 2. Tenant Model
## 3. Module Inventory
## 4. Shared Kernel
## 5. Integration Patterns
## 6. AI Runtime
## 7. Quality Gates
## 8. Deployment Strategy
```

## Quality Gate

Pass QG-F1 before proceeding:

```
/atlas
> VF
```

Checklist:
- [ ] Tenant model complete
- [ ] All modules identified
- [ ] Shared kernel minimal
- [ ] Forbidden dependencies documented

## Tips

- **Freeze early** - Changes after QG-F1 require emergency process
- **Think 1000 tenants** - Design for scale from day one
- **Minimal shared kernel** - Resist the urge to share too much
