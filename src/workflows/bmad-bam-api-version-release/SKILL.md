---
name: bmad-bam-api-version-release
displayName: API Version Release
description: Release new REST API version with docs and migration guide. Use when the user requests to 'release API version' or 'create new API version'.
module: bam
tags: [platform]
---

# API Version Release

## Overview

This workflow manages the release of a new REST API version with OpenAPI documentation, migration guide, and version-specific tests. It follows the URL-prefix versioning pattern (`/api/v{N}/`) and ensures backward compatibility during the deprecation window.

Act as a Platform Architect managing API versioning for a multi-tenant platform.

**Args:** Accepts module name and version number. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Releasing new API versions with backward compatibility
- Managing API deprecation schedules
- Coordinating version rollout across tenants

## Modes

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Version Planning

**Intent Check:** Confirm the user's intent before processing their input.

- Identify breaking changes from current version
- Classify change type (additive, breaking, deprecation)
- Define deprecation timeline for old version

### Step 2: Router Creation

- Create versioned router (`/api/v{N}/`)
- Map endpoints to module facades
- Ensure tenant context middleware applied to all routes

### Step 3: OpenAPI Spec

- Generate OpenAPI spec for new version
- Document all endpoints with request/response schemas
- Include authentication requirements
- Add tenant context headers

**Soft Gate:** Steps 1-3 complete the planning and specification phase. Present a summary of version changes, router design, and OpenAPI spec. Ask for confirmation before proceeding to migration guide and tests.

### Step 4: Migration Guide

- Document breaking changes with before/after examples
- Provide migration steps for API consumers
- Include code examples in common languages
- Define deprecation timeline and sunset date

### Step 5: Version Tests

- Create version-specific integration tests
- Test backward compatibility (old version still works)
- Test new version endpoints
- Verify tenant context propagation

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - API version compatibility across modules
- **QG-P1** (Production) - API versioning required for production release

### Entry Gate
- QG-M1 (Module Arch) must pass for modules exposing APIs
- Module facades and contracts must be defined

### Exit Gate
- OpenAPI spec generated and validated
- Migration guide documented with deprecation timeline
- Version-specific integration tests passing

## Output

- `{output_folder}/planning-artifacts/api/v{version}-router.md` — versioned router code
- `{output_folder}/planning-artifacts/api/v{version}-openapi.yaml` — OpenAPI spec for new version
- `{output_folder}/planning-artifacts/api/v{version}-migration-guide.md` — migration guide document
- Version-specific test suite

## References

- Template: `{project-root}/_bmad/bam/data/templates/api-version-release-template.md`
- API Version Routing: `{project-root}/_bmad/bam/data/agent-guides/bam/api-version-routing.md`

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/api-version-routing.md`
- API Version Routing: `{project-root}/_bmad/bam/data/agent-guides/bam/api-version-routing.md`
