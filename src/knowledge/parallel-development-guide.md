# Parallel Development Guide

## Branch Strategy

- `main`: Foundation code + facade contracts (source of truth)
- `module/{name}`: Per-module development branch

## Rules

1. Foundation lives on `main` — never modify shared-kernel from a module branch
2. Facade contracts committed to `main` before consumer modules branch
3. Each module branch only modifies files in `src/modules/{own_module}/`
4. Module branches merge to `main` after module-readiness gate passes
5. Pull latest `main` into module branch to get new facade contracts

## Multiple AI Sessions

- Session A works on `module/users`, Session B works on `module/orders`
- Both inherit from `main` (foundation + master architecture)
- If orders depends on users facade, users facade must be on `main` first
- Sessions never modify the same files — no merge conflicts

## Database Migration Strategy

Each module owns its own migration chain:

- `src/modules/{module}/migrations/` — module-scoped Alembic revisions
- Shared kernel migrations live in `src/shared/migrations/`
- Module migrations MUST NOT reference other modules' tables
- Migration order: shared-kernel first, then modules in any order

```
alembic/
├── shared/          # Shared kernel migrations (TenantContext, BaseEntity)
├── modules/
│   ├── users/       # User module migrations
│   ├── orders/      # Order module migrations
│   └── billing/     # Billing module migrations
```

## CI/CD Pipeline for Parallel Modules

```yaml
# Each module has independent test + build stages
stages:
  - foundation-tests # Shared kernel + facade contract tests
  - module-tests # Per-module unit + integration tests (parallel)
  - convergence-tests # Cross-module integration (sequential)
  - deploy
```

Module test stages run in parallel — each module's tests are independent. Convergence tests run after all module tests pass to verify cross-module contracts.

## Facade Contract Propagation

1. Module B needs Module A's data
2. Module A's facade contract is written and committed to `main`
3. Module B pulls `main`, gets the contract
4. Both modules implement independently against the contract
5. Both merge to `main` when ready — integration verified by contract tests

## Key Points

- Foundation code and facade contracts are the ONLY things on `main` during module development
- Module branches are disposable — the contract on `main` is the source of truth
- AI sessions are scoped to one module branch; cross-module coordination happens via `main`

## Anti-Pattern

| Anti-Pattern                               | Problem                             | Correct Approach                                           |
| ------------------------------------------ | ----------------------------------- | ---------------------------------------------------------- |
| Modifying shared-kernel from module branch | Breaks other modules on merge       | Change shared-kernel on `main`, pull into branches         |
| Two modules editing same file              | Merge conflicts, lost work          | Modules only touch `src/modules/{own}/`                    |
| Merging without gate pass                  | Untested code on `main`             | Module-readiness gate required before merge                |
| Skipping facade-first on `main`            | Consumer builds against assumptions | Publish facade contract to `main` before consumer branches |

See also: independent-development.md, module-facade-patterns.md, local-development-setup.md
