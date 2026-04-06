# Independent Module Development

## Core Concept

After the foundation gate passes, any module can be developed in any order.
Modules are self-contained units with their own architecture, stories, and tests.

## What Makes It Work

1. **Master architecture is frozen** — all modules inherit the same platform patterns
2. **Module-scoped context** — stories only load same-module history, not the entire project
3. **Facade contracts** — cross-module communication via versioned interfaces, not internals
4. **Foundation gate** — shared-kernel, control-plane, ai-runtime proven before modules start

## Context Loading Rule

When creating or implementing a story for module X:

- ALWAYS load: master-architecture.md
- ALWAYS load: modules/X/architecture.md
- ONLY load: previous stories from module X
- IF dependency: load facade contract for that dependency
- NEVER load: other modules' stories or internal architecture

## Module Directory Structure

Each module follows a standard layout:

```
src/modules/{module}/
├── facade.py           # Public interface (ONLY import point)
├── api/                # REST routes (FastAPI routers)
│   └── v1/routes.py
├── internal/           # Private implementation
│   ├── models.py       # SQLAlchemy models (inherit BaseEntity)
│   ├── services.py     # Business logic
│   └── repository.py   # Data access (tenant-scoped)
├── events/             # Domain events published by this module
│   └── definitions.py
├── migrations/         # Alembic migrations (module-scoped)
└── tests/              # Module tests (public interface only)
    ├── test_facade.py
    └── test_api.py
```

## Dependency Graph Enforcement

Modules declare their dependencies explicitly in their architecture document:

- `allowed_dependencies: [users_facade, billing_facade]`
- Import linting enforces: only `from modules.{dep}.facade import {Dep}Facade`
- Circular dependencies are architecture violations — resolve via events or shared kernel

## Starting a New Module

1. Verify foundation.gate_passed == true
2. Verify all dependency facades exist
3. Run create-module-architecture → creates modules/{name}/architecture.md
4. Run create-module-epics → creates modules/{name}/epics.md
5. Pass module readiness gate
6. Begin sprint cycle: create-story → dev-story → code-review

**Key Points:**

- Frozen master architecture guarantees all modules inherit identical platform patterns
- Module-scoped context loading prevents context window bloat — only load same-module history
- Facade contracts are the ONLY cross-module communication mechanism
- Foundation gate must pass before any module development begins

## Anti-Patterns

| Anti-Pattern                                | Problem                                | Correct Approach                                            |
| ------------------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| Loading all project stories                 | Context window bloat, irrelevant noise | Load only same-module stories + master arch                 |
| Importing from another module's `internal/` | Tight coupling, breaks independence    | Use facade contracts                                        |
| Starting before foundation gate             | Missing shared patterns, rework        | Wait for gate pass                                          |
| Modifying shared-kernel from module branch  | Breaks other modules                   | Shared-kernel changes go through emergency protocol (S21.5) |

See also: module-facade-patterns.md, parallel-development-guide.md, shared-kernel-patterns.md
