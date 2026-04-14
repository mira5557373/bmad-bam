---
name: api-gateway-design
displayName: API Gateway Design
description: Design API gateway configuration with rate limiting, authentication, and routing. Use when the user requests to 'configure API gateway' or 'design gateway routing'.
module: bam
tags: [integration, platform, security]
---

# API Gateway Design

## Overview

This workflow designs the complete API gateway configuration including tenant-aware routing, rate limiting policies, authentication flows, request transformation, and observability integration. It supports both cloud-native gateways (AWS API Gateway, Kong, Envoy) and self-hosted solutions.

Act as a Platform Architect designing API gateway infrastructure for multi-tenant platforms.

**Args:** Accepts gateway type and routing requirements. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

## When to Use

- Designing API gateway infrastructure
- Configuring tenant-aware rate limiting
- Setting up authentication and authorization flows
- Planning request routing and transformation

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new gateway design from scratch |
| **Edit** | Load existing design and apply targeted modifications |
| **Validate** | Check existing design against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Define Gateway Requirements

**Intent Check:** Confirm the user's intent before processing their input.

- Identify traffic patterns
- Catalog API endpoints
- Map authentication requirements
- Define tenant routing needs

### Step 2: Design Rate Limiting

- Configure tier-based quotas
- Design burst handling
- Plan quota enforcement
- Set up tenant isolation

### Step 3: Configure Authentication

- Design auth flows per endpoint type
- Configure token validation
- Plan tenant context extraction
- Set up security policies

**Soft Gate:** Steps 1-3 complete the design phase. Present a summary and ask for confirmation.

### Step 4: Define Routing Rules

- Create route configurations
- Design request transformation
- Configure response handling
- Plan failover routes

## Quality Gates

This workflow contributes to:
- **QG-I1** (Convergence) - Gateway integration with services
- **QG-P1** (Production) - Gateway readiness for production traffic

### Entry Gate
- API specifications must exist
- Authentication strategy defined

### Exit Gate
- Gateway configuration documented
- Rate limiting policies defined
- Routing rules validated

## Output

- `{output_folder}/planning-artifacts/gateway/api-gateway-design.md` - Gateway design document
- `{output_folder}/planning-artifacts/gateway/rate-limit-policies.md` - Rate limiting configuration
- Gateway configuration files

## References

- Template: `bam/templates/api-gateway-template.md`
- Rate Limiting: `bmad-bam-rate-limiting-design`
