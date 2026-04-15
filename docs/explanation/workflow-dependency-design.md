# Workflow Dependency Design: Required with Optional Prerequisites

BAM intentionally allows required workflows to depend on optional prerequisites. This document explains the design rationale.

## Context

In module-help.csv, workflow dependencies are specified via `after` and `before` columns, with `required` marking whether a workflow must be executed. A naive interpretation suggests that if a required workflow lists optional workflows in its `after` column, this is an inconsistency.

Example from module-help.csv:
```csv
# create-master-architecture (required=true) has after: requirement-ingestion;triage-module-complexity
# Both requirement-ingestion and triage-module-complexity have required=false
```

## Decision

This is **intentional** design, not a bug.

## Rationale

### Principle: Enforce Outputs, Not Process

Required workflows enforce that a **deliverable exists and meets quality criteria**. They do NOT enforce **how** that deliverable was created.

```
┌─────────────────────────────────────────────────────────────────┐
│                    What "Required" Means                         │
├─────────────────────────────────────────────────────────────────┤
│  Required workflow        │  Enforces output artifact exists     │
│  Optional prerequisite    │  Provides one way to create inputs   │
│  Quality gate             │  Validates artifact regardless of    │
│                           │  how it was produced                 │
└─────────────────────────────────────────────────────────────────┘
```

### Use Case 1: External Requirements

Many teams already have requirements documented:
- Jira epics with acceptance criteria
- Notion PRDs with feature specifications
- Google Docs with stakeholder requirements
- Existing architecture decision records

These teams should not be forced to re-run `requirement-ingestion` just because BAM provides that workflow.

```
External PRD exists?
    │
    ├── YES ──► Skip requirement-ingestion ──► create-master-architecture
    │           (Required workflow runs with external inputs)
    │
    └── NO ───► requirement-ingestion ──► triage-module-complexity ──► create-master-architecture
                (Full BAM workflow path)
```

### Use Case 2: Custom Scaffolding

Teams may have:
- Custom internal scaffolding tools
- Enterprise templates from a platform team
- Existing codebase being retrofitted
- Different technology preferences than BAM defaults

```
Existing scaffolding?
    │
    ├── YES ──► Skip scaffold-foundation ──► validate-foundation
    │           (Validation still required!)
    │
    └── NO ───► scaffold-foundation ──► validate-foundation
                (Use BAM's scaffolding)
```

### Quality Gates Remain Mandatory

While prerequisites may be optional, **validation gates are never skippable**:

| Gate | Workflow | Always Required |
|------|----------|-----------------|
| QG-F1 | validate-foundation | Yes |
| QG-M1/M2/M3 | validate-module | Yes |
| QG-I1/I2/I3 | convergence-verification | Yes |
| QG-P1 | production-readiness | Yes |

This ensures quality regardless of the path taken to create artifacts.

## Affected Workflows

| Required Workflow | Optional Prerequisites | Why Optional |
|-------------------|------------------------|--------------|
| `create-master-architecture` | `requirement-ingestion`, `triage-module-complexity` | Teams may have requirements from Jira, Notion, or existing PRDs |
| `validate-foundation` | `scaffold-foundation` | Teams may scaffold manually, use different tooling, or have existing infrastructure |

## Consequences

### Positive

1. **Flexibility** - Teams can enter BAM at different points based on existing work
2. **Integration** - BAM works alongside existing tools rather than replacing them
3. **Adoption** - Lower barrier to entry for teams with partial implementations
4. **Focus on Quality** - Emphasis on validation outcomes rather than process conformance

### Negative

1. **Potential Confusion** - New users may wonder why required depends on optional
2. **Documentation Burden** - Must clearly explain the pattern (this document)
3. **Validation Responsibility** - Users must ensure equivalent inputs exist when skipping

### Mitigations

1. **Clear Documentation** - This ADR and CLAUDE.md explain the pattern
2. **Helpful Error Messages** - Validation workflows should detect missing inputs
3. **Skip Guidance** - When skipping, point users to what inputs they must provide

## Alternatives Considered

### Alternative 1: Make All Prerequisites Required

Rejected because:
- Forces teams to re-create existing work
- Increases adoption friction
- Not aligned with "extend, don't replace" philosophy

### Alternative 2: Remove Dependencies from Required Workflows

Rejected because:
- Loses helpful guidance for new users
- Breaks the workflow graph visualization
- Makes it harder to understand the full path

### Alternative 3: Create "Light" Versions of Optional Workflows

Rejected because:
- Increases maintenance burden
- Creates confusion about which version to use
- Doesn't solve the fundamental design question

## Related Documentation

- [CLAUDE.md](../../CLAUDE.md) - Quality Gates & Recovery section
- [Workflow Reference](../reference/workflows.md) - Workflow Dependencies section
- [module-help.csv](../../src/module-help.csv) - Workflow metadata with dependencies
