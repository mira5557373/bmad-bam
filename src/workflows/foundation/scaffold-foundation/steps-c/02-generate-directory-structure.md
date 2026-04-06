# Step 2: Generate Directory Structure

Create the foundation directory structure based on master architecture decisions.

## Core Structure

Generate the following directory hierarchy:

```
{project_root}/
├── src/
│   ├── core/                      # FROZEN zone - scaffold territory
│   │   ├── __init__.py
│   │   ├── database.py            # AsyncSession, async_sessionmaker
│   │   ├── tenant_context.py      # TenantContext, tenant_id propagation
│   │   ├── base_entity.py         # BaseEntity with tenant_id, audit fields
│   │   └── config.py              # Environment configuration
│   │
│   ├── shared_kernel/             # EXTEND ONLY zone
│   │   ├── __init__.py
│   │   ├── dtos.py                # Common DTOs
│   │   ├── events.py              # EventBus, domain events
│   │   ├── exceptions.py          # Shared exception types
│   │   └── value_objects.py       # Common value objects
│   │
│   ├── control_plane/             # Control plane module
│   │   ├── __init__.py
│   │   ├── tenant_provisioning/
│   │   ├── admin_operations/
│   │   └── billing_integration/
│   │
│   ├── ai_runtime/                # AI runtime module
│   │   ├── __init__.py
│   │   ├── agent_registry/
│   │   ├── tool_registry/
│   │   ├── memory_manager/
│   │   └── safety/                # Guardrails, kill switches
│   │
│   └── modules/                   # AUTONOMOUS zone - future modules
│       └── .gitkeep
│
├── tests/
│   ├── conftest.py                # EXTEND ONLY - test fixtures
│   ├── core/
│   ├── shared_kernel/
│   ├── control_plane/
│   ├── ai_runtime/
│   └── modules/
│
├── docs/
│   ├── architecture/
│   └── modules/
│
├── alembic/                       # FROZEN zone
│   ├── env.py
│   └── versions/
│
├── docker-compose.yaml            # FROZEN zone
├── pyproject.toml                 # EXTEND ONLY
└── .github/
    └── workflows/                 # FROZEN zone
```

## Zone Boundary Documentation

Create `{project_root}/ZONE_BOUNDARIES.md` documenting:

| Zone        | Paths                                                                                                                                | Rule                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| FROZEN      | `src/core/*`, `docker-compose.yaml`, `.github/workflows/*`, `alembic/env.py`                                                         | Never modify (scaffold territory) |
| EXTEND ONLY | `src/shared_kernel/dtos.py`, `src/shared_kernel/exceptions.py`, `src/shared_kernel/events.py`, `tests/conftest.py`, `pyproject.toml` | Add to, never replace             |
| AUTONOMOUS  | `src/modules/{module}/*`, `tests/modules/{module}/*`, `docs/modules/{module}/*`                                                      | Full generation autonomy          |

**Output:** Directory structure created with all required folders and zone boundary documentation.
