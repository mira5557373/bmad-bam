---
name: openapi-spec-management
displayName: OpenAPI Spec Management
description: Design OpenAPI specification lifecycle management. Use when the user requests to 'manage API specs' or 'design API documentation workflow'.
module: bam
tags: [api, documentation]
---

# OpenAPI Spec Management

## Overview

This workflow designs the complete OpenAPI specification lifecycle management for multi-tenant platforms. It covers specification structure standards, version control workflows, validation rules, and publishing pipelines. This is a utility workflow that supports API development across all phases.

Act as a Platform Architect designing production-grade API documentation infrastructure.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing OpenAPI specification standards
- Creating API documentation workflows
- Building spec validation pipelines
- Establishing API publishing processes

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new OpenAPI management design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing management design | `step-10-e-*` to `step-11-e-*` |
| Validate | Check against quality criteria | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Spec Structure Standards

Define OpenAPI specification structure and organization:

- OpenAPI version selection (3.0.x vs 3.1.x)
- File organization (single file vs multi-file with $ref)
- Naming conventions for paths, operations, schemas
- Tenant-aware API patterns (tenant_id in path vs header)
- Security scheme definitions (OAuth2, API keys, JWT)
- Common response schemas and error formats

### Step 2: Version Control Workflow

Establish API specification version management:

- Semantic versioning strategy for APIs
- Breaking vs non-breaking change classification
- Branch strategies for spec development
- Review and approval processes
- Change tracking and changelog generation
- Deprecation policies and sunset procedures

### Step 3: Validation Rules

Create validation pipeline for API specifications:

- Structural validation (OpenAPI schema compliance)
- Linting rules (naming conventions, descriptions)
- Security validation (authentication required, HTTPS)
- Tenant isolation validation (tenant context in operations)
- Breaking change detection rules
- Custom validation rules for platform standards

### Step 4: Publishing Pipeline

Design specification publishing workflow:

- Build pipeline for spec processing
- Documentation generation (Redoc, Swagger UI)
- SDK generation configuration
- Multi-environment publishing (dev, staging, prod)
- Version hosting and routing
- API portal integration

## Quality Gates

This workflow is a utility workflow with no mandatory quality gates.

| Gate | Contribution | Description |
|------|--------------|-------------|
| None | Utility | Supports API development workflows |

### Verification Checklist

- [ ] OpenAPI version and structure defined
- [ ] Versioning strategy documented
- [ ] Validation rules established
- [ ] Publishing pipeline designed
- [ ] Tenant-aware patterns included

## Output

- `{output_folder}/planning-artifacts/api/openapi-spec-management.md`
- OpenAPI structure guidelines
- Validation rule definitions
- Publishing pipeline specification

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/api-versioning-patterns.md`
