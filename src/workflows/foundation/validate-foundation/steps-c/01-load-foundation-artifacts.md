# Step 1: Load Foundation Artifacts

Load all foundation artifacts required for QG-F1 validation:

## Planning Artifacts
- `{output_folder}/planning-artifacts/master-architecture.md`
- `{output_folder}/planning-artifacts/foundation-epics.md`
- `{output_folder}/planning-artifacts/architecture/agent-runtime-architecture.md` (if exists)
- `{output_folder}/planning-artifacts/architecture/tool-registry-and-permissions.md` (if exists)
- `{output_folder}/planning-artifacts/architecture/memory-boundaries.md` (if exists)

## Code Artifacts
- `{project_root}/src/core/` - Core implementation files
- `{project_root}/src/shared_kernel/` - Shared kernel implementation
- `{project_root}/src/control_plane/` - Control plane implementation
- `{project_root}/src/ai_runtime/` - AI runtime implementation

## Test Artifacts
- `{project_root}/tests/` - Test files and fixtures
- Test coverage reports (if available)

## Infrastructure Artifacts
- `{project_root}/docker-compose.yaml`
- `{project_root}/alembic/` - Database migrations
- `{project_root}/.github/workflows/` - CI/CD configuration

If critical artifacts are missing, compile a list of gaps and report to the user.

## Pre-Gate Check

Verify prerequisite sub-gates have passed:

| Sub-Gate | Focus | Status |
|----------|-------|--------|
| QG-M1 | Master Architecture Readiness | Check `master-architecture.md` exists and is complete |
| QG-M2 | Tenant Isolation Complete | Check tenant model implementation |
| QG-M3 | Agent Runtime Readiness | Check AI runtime architecture |

If any sub-gate has not passed, report which sub-gate(s) need attention before QG-F1 can proceed.

**Output:** Inventory of all foundation artifacts with availability status.
