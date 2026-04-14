---
name: api-deprecation-strategy
displayName: API Deprecation Strategy
description: Design API deprecation lifecycle with sunset dates and migration support. Use when the user requests to 'deprecate API' or 'sunset endpoints'.
module: bam
tags: [integration, platform, api]
---

# API Deprecation Strategy

## Overview

This workflow designs the complete API deprecation lifecycle including sunset dates, deprecation headers, consumer notification, migration assistance, and monitoring of deprecated endpoint usage. It ensures graceful API evolution while maintaining backward compatibility during transition periods.

Act as an Integration Architect managing API lifecycle for multi-tenant platforms.

**Args:** Accepts API version and deprecation timeline. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Deprecating old API versions
- Sunsetting legacy endpoints
- Managing breaking changes with grace periods
- Coordinating API evolution across tenants

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new deprecation strategy from scratch |
| **Edit** | Load existing strategy and apply targeted modifications |
| **Validate** | Check existing strategy against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Identify Deprecation Candidates

**Intent Check:** Confirm the user's intent before processing their input.

- Catalog endpoints for deprecation
- Analyze usage patterns
- Identify affected consumers
- Assess migration complexity

### Step 2: Design Deprecation Timeline

- Set sunset dates per endpoint
- Define grace periods by tier
- Plan notification schedules
- Create milestone checkpoints

### Step 3: Configure Deprecation Signals

- Design deprecation headers
- Plan warning responses
- Configure usage monitoring
- Set up alerting thresholds

**Soft Gate:** Steps 1-3 complete the planning phase. Present a summary and ask for confirmation before proceeding.

### Step 4: Create Migration Support

- Document migration paths
- Generate code examples
- Plan support resources
- Design rollback procedures

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - API evolution coordination
- **QG-P1** (Production) - Deprecation compliance

### Entry Gate
- Current API version documented
- Usage metrics available

### Exit Gate
- Deprecation timeline approved
- Migration guides complete
- Monitoring configured

## Output

- `{output_folder}/planning-artifacts/api/deprecation-strategy.md` - Deprecation strategy document
- `{output_folder}/planning-artifacts/api/migration-guides/` - Per-endpoint migration guides
- Monitoring dashboards configured

## References

- Template: `bam/templates/api-deprecation-template.md`
- API Version Release: `bmad-bam-api-version-release`
