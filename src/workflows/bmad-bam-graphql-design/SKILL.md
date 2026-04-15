---
name: bmad-bam-graphql-design
displayName: GraphQL API Design
description: Design GraphQL API layer with schema federation and tenant context. Use when the user requests to 'design GraphQL API' or 'create GraphQL schema'.
module: bam
tags: [integration, api, graphql]
---

# GraphQL API Design

## Overview

This workflow designs the complete GraphQL API layer including schema design, federation architecture, tenant-aware resolvers, and query optimization. It provides a flexible API layer over existing REST services with proper multi-tenant isolation.

Act as an Integration Architect designing GraphQL infrastructure for multi-tenant platforms.

**Args:** Accepts schema domains and federation requirements. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing GraphQL API layer
- Implementing schema federation
- Planning tenant-aware resolvers
- Optimizing query performance

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new GraphQL API design from scratch |
| **Edit** | Load existing design and apply targeted modifications |
| **Validate** | Check existing design against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Design Schema Architecture

- Define type system
- Plan schema organization
- Design federation boundaries
- Configure directives

### Step 2: Configure Resolvers

- Design resolver architecture
- Plan data loaders
- Configure tenant context
- Optimize N+1 queries

### Step 3: Plan Query Optimization

- Design query complexity limits
- Plan caching strategy
- Configure rate limiting
- Set up monitoring

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - GraphQL API integration
- **QG-P1** (Production) - GraphQL performance

## Output

- `{output_folder}/planning-artifacts/graphql/graphql-design.md` - GraphQL architecture
- `{output_folder}/planning-artifacts/graphql/schema-federation.md` - Federation spec
- GraphQL configuration

## References

- Template: `{project-root}/_bmad/bam/data/templates/graphql-template.md`
- API Gateway: `bmad-bam-api-gateway-design`
