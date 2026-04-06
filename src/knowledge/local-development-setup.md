# Local Development Setup for Modular Monolith

## Core Concept

A modular monolith runs as a single process locally. All modules share one
PostgreSQL instance with per-module schema isolation via RLS. The local
environment must support both full-stack development and single-module
isolation with mock facades.

## Principle

Local development mirrors production's module boundary rules (S4.4) while
minimizing infrastructure overhead. Mock facades enable single-module
development without running the entire application.

## Rationale

TSA getting-started.md defines Docker Compose profiles (minimal/standard/full)
for infrastructure services. This fragment adds the modular-monolith-specific
patterns: how modules map to the local environment, how to isolate a single
module for focused development, and how to handle AI runtime locally.

## Docker Compose Topology

| Profile         | Services                                 | Use Case                  | RAM  |
| --------------- | ---------------------------------------- | ------------------------- | ---- |
| **module-dev**  | PostgreSQL + Redis + target module       | Single-module development | 4GB  |
| **integration** | PostgreSQL + Redis + Kafka + all modules | Cross-module testing      | 8GB  |
| **full-stack**  | All services + mock LLM + Keycloak       | End-to-end testing        | 16GB |

All profiles use a SINGLE PostgreSQL instance. Module isolation is via RLS
policies, not separate databases — matching production architecture.

## Single-Module Isolation

When developing one module, mock all dependency facades:

| Component          | Real                                  | Mock                                            | Switch Mechanism                        |
| ------------------ | ------------------------------------- | ----------------------------------------------- | --------------------------------------- |
| Dependency facades | Facade class from other module        | Mock facade returning test fixtures             | Dependency injection at module startup  |
| Shared-kernel      | Real shared-kernel (always available) | N/A — shared-kernel is always real              | N/A                                     |
| Event bus          | Kafka/Redis Streams                   | In-memory event bus (shared-kernel test double) | Environment variable `EVENT_BUS=memory` |
| Background jobs    | Real queue (Redis/Kafka)              | Synchronous execution (no queue)                | Environment variable `JOB_MODE=sync`    |

Mock facades live in `tests/mocks/{module}_facade_mock.py` — they implement
the same interface as real facades (S28.3) but return deterministic test data.

## Database Setup

Single PostgreSQL instance, module schemas via RLS:

| Step | Command                              | Purpose                                     |
| ---- | ------------------------------------ | ------------------------------------------- |
| 1    | `docker compose up postgres`         | Start PostgreSQL                            |
| 2    | `alembic upgrade head`               | Run all module migrations (S27.5)           |
| 3    | `python scripts/seed-dev-tenants.py` | Create 3 test tenants (FREE/PRO/ENTERPRISE) |
| 4    | Verify RLS                           | Each test tenant sees only its own data     |

Seed script creates tenants matching TSA getting-started.md seed data patterns.

## AI Runtime Locally

| Mode         | Configuration                                           | Use Case                           |
| ------------ | ------------------------------------------------------- | ---------------------------------- |
| **Mock LLM** | WireMock with canned responses (TSA getting-started.md) | Unit tests, facade development, CI |
| **Real LLM** | API key in `.env.local` via LiteLLM proxy               | Agent behavior testing, eval runs  |
| **Hybrid**   | Mock for expensive models, real for cheap models        | Cost-conscious development         |

Set via environment variable: `LLM_MODE=mock|real|hybrid`

Kill switches (S21.12) work locally — `agent.{id}.enabled=false` disables
agents even in local development, matching production behavior.

## Hot-Reload Configuration

| Component             | Hot-Reload Method                                     | Scope                         |
| --------------------- | ----------------------------------------------------- | ----------------------------- |
| FastAPI application   | `uvicorn --reload`                                    | Python file changes in `src/` |
| Module facade changes | Automatic (uvicorn watches all `src/modules/`)        | Changed module only           |
| Database migrations   | Manual (`alembic upgrade head`)                       | All modules                   |
| Feature flags         | Automatic (GrowthBook polling or local override file) | Per-module                    |

## Key Points

- Single PostgreSQL instance with RLS — never use separate databases per module locally
- Mock facades enable single-module development without running other modules
- Three LLM modes (mock/real/hybrid) balance cost vs fidelity
- Hot-reload covers application code; migrations and seed data are manual
- Local environment enforces the same module boundary rules as production (S4.4)

## Anti-Pattern

| Anti-Pattern                                     | Problem                                                  | Correct Approach                                                                     |
| ------------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Separate database per module locally             | Doesn't match production RLS model; hides isolation bugs | Single PostgreSQL + RLS, same as production                                          |
| Importing real facades in tests instead of mocks | Tests require all modules running; slow, brittle         | Use mock facades for unit/integration tests; real facades only for convergence tests |
| Hardcoding LLM API keys in source                | Security risk; breaks CI                                 | Use `.env.local` (gitignored) for real keys; mock LLM for CI                         |
| Skipping seed data                               | Tests run against empty database; miss RLS edge cases    | Always seed 3 test tenants (FREE/PRO/ENTERPRISE)                                     |

See also: parallel-development-guide.md, multi-tenant-patterns.md, testing-multi-tenant-fixtures.md
