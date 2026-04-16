# BAM Workflow Sequence Guide

**When to load:** During project planning, workflow ordering decisions, dependency resolution, or when understanding the recommended sequence of BAM workflows.

**Integrates with:** All BMAD agents with BAM extensions active.

---

## Core Concepts

### Master Workflow Sequence

```
┌─────────────────────────────────────────────────┐
│          BAM Workflow Sequence                   │
│                                                  │
│  Phase 1: Discovery                              │
│  ┌─────────────────────────────────┐            │
│  │ requirement-ingestion           │            │
│  │         ↓                       │            │
│  │ triage-module-complexity        │            │
│  └─────────────────────────────────┘            │
│                   ↓                              │
│  Phase 2: Planning                               │
│  ┌─────────────────────────────────┐            │
│  │ create-module-epics             │            │
│  │         ↓                       │            │
│  │ cross-module-story              │            │
│  └─────────────────────────────────┘            │
│                   ↓                              │
│  Phase 3: Solutioning (Foundation)              │
│  ┌─────────────────────────────────┐            │
│  │ create-master-architecture  [QG-F1]          │
│  │         ↓                       │            │
│  │ tenant-model-isolation          │            │
│  │         ↓                       │            │
│  │ validate-foundation             │            │
│  └─────────────────────────────────┘            │
│                   ↓                              │
│  Phase 3: Solutioning (Module)                  │
│  ┌─────────────────────────────────┐            │
│  │ create-module-architecture [QG-M1]           │
│  │         ↓                       │            │
│  │ define-facade-contract          │            │
│  │         ↓                       │            │
│  │ validate-module       [QG-M2,M3]│            │
│  └─────────────────────────────────┘            │
│                   ↓                              │
│  Phase 4: Implementation                         │
│  ┌─────────────────────────────────┐            │
│  │ convergence-verification [QG-I1-3]           │
│  │         ↓                       │            │
│  │ facade-mismatch-recovery (if needed)         │
│  └─────────────────────────────────┘            │
│                   ↓                              │
│  Phase 6: Operations                             │
│  ┌─────────────────────────────────┐            │
│  │ tenant-onboarding-design        │            │
│  │ tenant-aware-observability      │            │
│  │ production-readiness    [QG-P1] │            │
│  └─────────────────────────────────┘            │
└─────────────────────────────────────────────────┘
```

### Workflow Dependencies

| Workflow | Prerequisites | Enables |
|----------|---------------|---------|
| requirement-ingestion | None | triage-module-complexity |
| triage-module-complexity | requirement-ingestion | create-module-epics |
| create-master-architecture | triage-module-complexity | tenant-model-isolation |
| tenant-model-isolation | create-master-architecture | validate-foundation |
| create-module-architecture | validate-foundation | define-facade-contract |
| convergence-verification | validate-module | production-readiness |

### Parallel Workflow Opportunities

| Phase | Parallelizable Workflows | Condition |
|-------|-------------------------|-----------|
| Planning | create-module-epics (per module) | Independent modules |
| Solutioning | create-module-architecture (per module) | After foundation |
| Implementation | Per-module development | Defined interfaces |
| Operations | Monitoring + CI/CD setup | After architecture |

### Quality Gate Sequence

| Gate | Blocks | Passed After |
|------|--------|--------------|
| QG-D1 | Planning phase | requirement-ingestion |
| QG-PL1 | Solutioning phase | Planning workflows |
| QG-F1 | Module design | create-master-architecture |
| QG-M1 | Implementation | create-module-architecture |
| QG-M2 | Integration | tenant isolation verified |
| QG-M3 | Integration | agent runtime verified |
| QG-I1-I3 | Production | convergence-verification |
| QG-P1 | Go-live | Full verification |

### Skip Conditions

| Workflow | Can Skip If | Documentation |
|----------|-------------|---------------|
| requirement-ingestion | External PRD exists | Reference PRD in architecture |
| triage-module-complexity | Simple single-module | Document decision |
| tenant-model-isolation | Single-tenant MVP | Add later milestone |
| agent-runtime-architecture | No AI features | Add later milestone |

---

## Application Guidelines

When sequencing BAM workflows:

1. **Follow quality gates** - Don't skip gate workflows
2. **Parallelize modules** - Multiple modules can progress simultaneously
3. **Document skips** - Record why a workflow was skipped
4. **Re-sequence for scope** - Smaller scope may simplify sequence
5. **Include recovery workflows** - Plan for mismatch resolution
6. **Track dependencies** - Use module-help.csv after/before columns

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Can I skip discovery? | Only with existing PRD | Don't skip understanding |
| When to parallelize? | After foundation is stable | Avoid rework |
| How to handle blockers? | Work on independent modules | Keep momentum |
| When to run recovery workflows? | At any gate failure | Structured recovery |
| Can I reorder phases? | No, gates enforce order | Quality assurance |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Sequence patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `sequence-*`
- **Dependency patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `dependency-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "BMAD method workflow sequence {date}"
- Search: "software development phase sequencing {date}"
- Search: "quality gate workflow patterns {date}"

---

## Related Workflows

- `create-master-architecture` - Foundation sequence start
- `validate-foundation` - Foundation sequence gate
- `bmad-bam-convergence-verification` - Integration sequence gate
