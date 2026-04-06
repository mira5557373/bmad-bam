# Getting Started with BAM

This tutorial walks you through installing BAM and creating your first multi-tenant SaaS architecture.

## Prerequisites

- Node.js 20+
- An existing BMAD Method project, or willingness to start fresh
- Basic understanding of multi-tenant SaaS concepts

## Step 1: Install BAM

```bash
npx bmad-method install
```

When prompted, select:
- **BAM** - Multi-Tenant Agentic AI SaaS
- Optionally: **BMM**, **TEA**, **WDS**, **CIS** for the full ecosystem

## Step 2: Configure Tenant Model

During installation, you'll be asked:

```
Select tenant isolation strategy for your SaaS platform:
> Row-Level Security (Recommended for most SaaS)
  Schema per Tenant (Higher isolation)
  Database per Tenant (Maximum isolation)
```

Choose based on your isolation requirements:
- **RLS**: Best for most SaaS, efficient resource usage
- **Schema**: Good for regulated industries needing audit trails
- **Database**: Maximum isolation for enterprise tenants

## Step 3: Meet the BAM Agents

BAM introduces three specialist agents:

### Atlas - Platform Architect
```
/atlas
```
Designs master architecture, tenant models, and module boundaries.

### Nova - AI Runtime Architect
```
/nova
```
Designs AI agent orchestration, tool contracts, and memory systems.

### Kai - Integration Architect
```
/kai
```
Designs facade contracts, convergence verification, and cross-module integration.

## Step 4: Create Master Architecture

Start with Atlas to create your frozen master architecture:

```
/atlas
> CMAR
```

This runs the **Create Master Architecture** workflow:
1. Analyzes your domain requirements
2. Designs tenant model hierarchy
3. Identifies module boundaries
4. Creates the master architecture document

## Step 5: Design Your First Module

After foundation is frozen, design a module:

```
/atlas
> MBD
```

This runs **Module Boundary Design**:
1. Defines bounded context
2. Specifies facade contract
3. Documents dependencies
4. Creates module architecture

## Step 6: Pass Foundation Gate

Before coding, validate against QG-F1:

```
/atlas
> VF
```

This checks:
- [ ] Master architecture complete
- [ ] Tenant model defined
- [ ] Shared kernel minimal
- [ ] Module boundaries clear

## Next Steps

- [First Module Tutorial](first-module.md) - Deep dive into module design
- [Tenant Isolation Setup](tenant-isolation-setup.md) - Implement RLS policies
- [AI Agent Integration](../how-to/integrate-ai-agents.md) - Add AI capabilities
