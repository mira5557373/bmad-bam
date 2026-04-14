# BAM - Multi-Tenant Agentic AI SaaS Extension

BAM (BMAD for Agentic Monoliths) extends the BMAD Method with enterprise patterns for building multi-tenant AI-powered SaaS platforms.

## What is BAM?

BAM is an **extension module** that adds:

- **Multi-tenant architecture patterns** - RLS, schema isolation, tenant context propagation
- **Modular monolith design** - DDD bounded contexts, module facades, independent development
- **AI agent orchestration** - LangGraph integration, tool contracts, memory tiers
- **Quality gates** - 8 gates from foundation to production readiness

## Documentation Structure

| Section | Purpose |
|---------|---------|
| [Tutorials](tutorials/) | Step-by-step learning guides for newcomers |
| [How-To Guides](how-to/) | Practical recipes for specific tasks |
| [Explanation](explanation/) | Background concepts and architecture decisions |
| [Reference](reference/) | Technical specifications and API details |

## Quick Links

- [Getting Started](tutorials/getting-started.md) - Install BAM and create your first module
- [Create Master Architecture](how-to/create-master-architecture.md) - Design your platform foundation
- [Why Modular Monolith](explanation/why-modular-monolith.md) - Understand the architecture choice
- [Workflow Reference](reference/workflows.md) - All 61 BAM workflows
- [Extensions Reference](reference/extensions.md) - All 25 BAM extensions
- [Agent Guides Reference](reference/agent-guides.md) - All 133 agent guides
- [Architecture Decisions](adr/README.md) - ADRs documenting key decisions

## Module Compatibility

BAM extends these official BMAD modules:

| Module | Extension |
|--------|-----------|
| BMM | Multi-tenant context for Analyst, Architect, Dev, PM, QA, SM, UX, Tech Writer |
| TEA | Tenant isolation testing, AI safety evaluation |
| WDS | Tenant-aware UX, tier-specific journeys |
| CIS | SaaS feature brainstorming, AI opportunity discovery |

## Installation

```bash
npx bmad-method install
# Select BAM when prompted
```

## Component Inventory

| Component | Count |
|-----------|-------|
| Agents | 0 (pure extension module - Atlas/Nova/Kai consolidated in architect-bam.yaml) |
| Workflows | 61 |
| Agent Guides | 133 |
| Extensions | 25 |
| Checklists | 22 |
| Templates | 137 |
