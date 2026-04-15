---
name: bmad-bam-scaffold-foundation
displayName: Scaffold Foundation
description: Scaffold BAM foundation code and infrastructure. Use when the user requests to 'scaffold foundation' or 'bootstrap BAM project'.
module: bam
tags: [foundation]
---

# Scaffold Foundation

## Overview

This workflow scaffolds the foundation code for a BAM platform after the master architecture is complete. It generates the shared kernel, control-plane, and AI runtime base code, then creates foundation epics for implementation. The scaffold runs ONCE — after foundation, all module code is generated from architecture documents, not scaffolding tools.

Act as a Platform Architect scaffolding foundation infrastructure for a modular-monolith SaaS platform.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). If config is missing, let the user know they can configure BAM settings in `{project-root}/_bmad/config.yaml` under the `bam` section, or re-run `npx bmad-method install` to reconfigure. Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

Verify prerequisite: `master-architecture.md` must exist. If missing, inform the user to run `bmad-bam-create-master-architecture` first.

## When to Use

- Scaffolding initial BAM project structure
- Creating foundation directories and files
- Setting up base project configuration

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Review Master Architecture

Load `{output_folder}/planning-artifacts/master-architecture.md`. Extract:

- Technology stack decisions
- Shared kernel interfaces
- Tenant model configuration
- AI runtime requirements

### Step 2: Scaffold Generation

Generate the foundation scaffold. If `create-tenant-service` CLI is available:

```bash
create-tenant-service create \
  --name {project_name} \
  --type fastapi \
  --multi-tenant row-level \
  --auth keycloak \
  --db postgres \
  --with-ai-runtime \
  --with-control-plane
```

If CLI unavailable, generate the foundation structure manually based on master architecture patterns.

### Step 3: Agent Generation Boundaries

Establish zone rules for all future code generation:

| Zone        | Paths                                                                                                                                | Rule                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| FROZEN      | `src/core/*`, `docker-compose.yaml`, `.github/workflows/*`, `alembic/env.py`                                                         | Never modify (scaffold territory) |
| EXTEND ONLY | `src/shared_kernel/dtos.py`, `src/shared_kernel/exceptions.py`, `src/shared_kernel/events.py`, `tests/conftest.py`, `pyproject.toml` | Add to, never replace             |
| AUTONOMOUS  | `src/modules/{module}/*`, `tests/modules/{module}/*`, `docs/modules/{module}/*`                                                      | Full generation autonomy          |

### Step 4: Scaffold Integrity Check

Verify all required foundation files exist:

- `src/core/database.py` — must contain `AsyncSession`, `async_sessionmaker`
- `src/core/tenant_context.py` — must contain `TenantContext`, `tenant_id`
- `src/core/base_entity.py` — must contain `BaseEntity`, `tenant_id: UUID`
- `src/shared_kernel/events.py` — must contain `EventBus`, `publish`

If any missing: STOP and report what needs to be created.

**Soft Gate:** Steps 1-4 complete the scaffold generation and integrity check. Present a summary of what was scaffolded and what comes next (epic creation). Ask for confirmation before proceeding.

### Step 5: Create Foundation Epics

Create foundation epics for implementation via `dev-story`:

1. Shared Kernel epic — TenantContext, BaseEntity, EventBus, common DTOs
2. Control-Plane epic — tenant provisioning, admin operations, billing integration
3. AI Runtime epic — agent registry, tool registry, memory manager, kill switches

Write epics to `{output_folder}/planning-artifacts/foundation-epics.md`

### Step 6: Summary

Present what was scaffolded:

- Directory structure created
- Foundation files generated
- Zone boundaries established
- Foundation epics ready for implementation

Remind: After foundation stories are implemented, run `bmad-bam-validate-foundation` to pass the foundation gate.

**CRITICAL: Scaffold Boundary Rule** — `create-tenant-service` is used ONCE (this workflow only). No module scaffolding, no AI feature scaffolding. After foundation, the module architecture document IS the template.

## Output

- Foundation code scaffold
- `{output_folder}/planning-artifacts/foundation-epics.md`
- Zone boundary documentation

## References

- Template: `{project-root}/_bmad/bam/data/templates/master-architecture-template.md`
- Shared Kernel Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/shared-kernel-patterns.md`
- Local Development Setup: `{project-root}/_bmad/bam/data/agent-guides/bam/local-development-setup.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/shared-kernel-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/local-development-setup.md`
- Shared Kernel Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/shared-kernel-patterns.md`
- Local Development Setup: `{project-root}/_bmad/bam/data/agent-guides/bam/local-development-setup.md`

## Quality Gates

This workflow contributes to:
- **QG-F1** (Foundation) - Supports foundation gate by scaffolding implementation

### Entry Gate
- `master-architecture.md` must exist (QG-F1 design complete)

### Exit Gate
- All required foundation files exist and pass integrity check
- Zone boundaries established
- Foundation epics ready for implementation
- Scaffold integrity check passes (database.py, tenant_context.py, base_entity.py, events.py)
