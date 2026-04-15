---
name: api-documentation-automation
displayName: API Documentation Automation
description: Design automated API documentation pipeline. Use when the user requests to 'automate API docs' or 'create documentation pipeline'.
module: bam
tags: [documentation, api]
---

# API Documentation Automation

## Overview

This workflow designs an automated API documentation pipeline for a multi-tenant platform. It covers documentation generation strategy, OpenAPI integration, versioning approach, and developer portal synchronization. This is a utility workflow without quality gate requirements.

Act as a Technical Writer specializing in API documentation and developer experience.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing API documentation automation pipeline
- Integrating OpenAPI specs with documentation generation
- Setting up versioned API documentation
- Synchronizing docs with developer portal

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new documentation pipeline design | `step-01-c-*` to `step-04-c-*` |
| Edit | Modify existing documentation pipeline | `step-10-e-*` to `step-11-e-*` |
| Validate | Check documentation pipeline completeness | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Doc Generation Strategy

- Select documentation generation tools (Redoc, Swagger UI, Stoplight)
- Define documentation structure and navigation
- Design code comment to documentation flow
- Configure static site generation

### Step 2: OpenAPI Integration

- Define OpenAPI spec source (code-first vs spec-first)
- Configure spec validation and linting
- Design spec enrichment with examples
- Set up automated spec generation from code

### Step 3: Versioning Approach

- Define version labeling strategy (semantic, date-based)
- Design version archive and deprecation workflow
- Configure version selector in documentation
- Establish breaking change documentation process

**Soft Gate:** Steps 1-3 complete the documentation pipeline design. Present a summary of generation tools, OpenAPI integration, and versioning strategy. Ask for confirmation before proceeding to developer portal sync.

### Step 4: Developer Portal Sync

- Design portal publishing workflow
- Configure API explorer integration
- Set up authentication for try-it-out functionality
- Define feedback collection mechanism

## Quality Gates

This workflow is a **utility workflow** without quality gate requirements.

### Entry Gate
- None (can be run anytime)

### Exit Gate
- None (utility workflow)

## Related Workflows

- `bmad-bam-api-version-release` - API versioning coordination
- `bmad-bam-sdk-generation` - SDK generation from OpenAPI specs
- `bmad-bam-tech-writer-bam` - Technical writing extension

## Output

- `{output_folder}/planning-artifacts/documentation/api-documentation-pipeline.md`
- OpenAPI generation configuration
- Documentation site configuration
- Portal sync workflow

## References

- Template: `{project-root}/_bmad/bam/data/templates/api-documentation-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/api-documentation-patterns.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/developer-portal-patterns.md`

## Web Research

Use web search to verify current best practices:
- Search: "API documentation automation best practices {date}"
- Search: "OpenAPI documentation generation tools {date}"
- Search: "developer portal API docs sync {date}"
