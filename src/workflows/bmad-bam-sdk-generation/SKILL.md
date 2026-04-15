---
name: bmad-bam-sdk-generation
displayName: SDK Generation Pipeline
description: Generate SDKs for multiple programming languages from OpenAPI spec. Use when the user requests to 'generate SDK' or 'create client libraries'.
module: bam
tags: [integration, platform, api]
---

# SDK Generation Pipeline

## Overview

This workflow generates client SDKs for multiple programming languages (TypeScript, Python, Go, Java, C#) from an OpenAPI specification. It includes authentication helpers, tenant context propagation, retry logic, and comprehensive documentation for each SDK.

Act as an Integration Architect designing SDK generation pipelines for multi-tenant platforms.

**Args:** Accepts OpenAPI spec path and target languages. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Generating client SDKs from OpenAPI specifications
- Creating multi-language client libraries for APIs
- Building developer-friendly API consumption tools
- Automating SDK release pipelines

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new SDK pipeline from scratch |
| **Edit** | Load existing SDK configuration and apply targeted modifications |
| **Validate** | Check existing SDK against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Analyze OpenAPI Spec

**Intent Check:** Confirm the user's intent before processing their input.

- Parse OpenAPI specification
- Identify endpoints and models
- Map authentication schemes
- Catalog tenant context requirements

### Step 2: Configure Generators

- Select code generators per language (openapi-generator, autorest)
- Configure authentication helpers
- Design retry and error handling
- Plan tenant context propagation

### Step 3: Design SDK Structure

- Define package structure per language
- Design client initialization patterns
- Plan model mapping and validation
- Create usage examples

**Soft Gate:** Steps 1-3 complete the design phase. Present a summary of SDK structure and ask for confirmation before proceeding.

### Step 4: Generate SDK Code

- Execute generators per language
- Add authentication wrappers
- Implement tenant context helpers
- Generate SDK documentation

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - SDK compatibility across API versions
- **QG-P1** (Production) - SDK quality required for public release

### Entry Gate
- OpenAPI spec must be valid and complete
- API version must be released

### Exit Gate
- SDKs generated for all target languages
- Authentication tested per SDK
- Documentation generated

## Output

- `{output_folder}/planning-artifacts/sdk/sdk-generation-config.md` - SDK generation configuration
- `{output_folder}/planning-artifacts/sdk/sdk-structure-{language}.md` - Per-language SDK structure
- SDK packages per language

## References

- Template: `{project-root}/_bmad/bam/data/templates/sdk-generation-template.md`
- API Version Release: `bmad-bam-api-version-release`
