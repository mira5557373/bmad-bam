# Step 2: Generate Directory Structure

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Create the foundation directory structure based on master architecture decisions.

## Prerequisites

- Master architecture analyzed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

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

**Verify current best practices with web search:**
Search the web: "generate directory structure best practices {date}"
Search the web: "generate directory structure enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Soft Gate Checkpoint

**Steps 1-2 complete the foundation scaffold design.**

Present summary of:
- Directory structure with zone classifications
- Core, shared_kernel, and module placeholders
- Zone boundary documentation (FROZEN, EXTEND ONLY, AUTONOMOUS)

Ask for confirmation before proceeding to shared kernel creation.

---

## Verification

- [ ] Core structure created
- [ ] Zone boundaries documented
- [ ] Module placeholders in place
- [ ] Test structure mirrors src
- [ ] Patterns align with pattern registry

## Outputs

- Directory structure
- ZONE_BOUNDARIES.md

## Next Step

Proceed to `step-03-c-create-shared-kernel.md` to generate shared kernel components.
