---
name: bmad-bam-tenant-api-key-management
displayName: Tenant API Key Management
description: Design API key lifecycle for programmatic tenant access including creation, rotation, revocation, and audit. Use when the user requests to 'design API key management' or 'plan tenant API access'.
module: bam
tags: [tenant, security, api]
---

# Tenant API Key Management

## Overview

This workflow designs the complete API key lifecycle for programmatic tenant access. It covers secure key generation, storage patterns, rotation policies, revocation procedures, scope/permission binding, rate limiting integration, and comprehensive audit logging. Essential for enabling secure machine-to-machine integration with tenant services.

Act as a Security Architect designing robust API key management.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing API key lifecycle for programmatic tenant access
- Creating secure key generation and storage patterns
- Building key rotation and revocation procedures
- Setting up API key audit logging and compliance

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

### Step 1: Key Creation Design

Design secure key generation:

1. Key format and structure (prefix, entropy, checksum)
2. Cryptographic generation requirements
3. Secure storage patterns (hashing, encryption)
4. Key metadata (name, description, expiry)
5. Scope/permission binding

### Step 2: Key Rotation

Design rotation policies:

| Rotation Type | Trigger | Grace Period |
|---------------|---------|--------------|
| Scheduled | Time-based | 30 days overlap |
| Manual | Admin request | Configurable |
| Forced | Security incident | None |
| Automatic | Policy violation | 24 hours |

**Soft Gate:** Steps 1-2 complete key creation and rotation design. Present summary and ask for confirmation before proceeding to revocation and audit.

### Step 3: Key Revocation

Design revocation procedures:

- Immediate vs graceful revocation
- Cascade effects on active sessions
- Recovery procedures
- Compliance evidence preservation

### Step 4: Audit Logging

Design comprehensive audit trail:

- Key lifecycle events
- Usage patterns and anomaly detection
- Compliance reporting
- Retention policies

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation via key scoping |
| **QG-I2** | Contributes | Cross-tenant safety in API access |
| **QG-P1** | Contributes | Production-ready key management |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must be defined
- **Exit Gate:** QG-M2 (Tenant Isolation) - Keys must enforce tenant boundaries

### Verification Checklist

- [ ] Key generation is cryptographically secure
- [ ] Storage follows security best practices
- [ ] Rotation policies defined
- [ ] Revocation procedures complete
- [ ] Audit logging comprehensive

## Output

- `{output_folder}/planning-artifacts/security/tenant-api-key-management.md`
- Key lifecycle state machine
- Audit event catalog

## References

- Template: `{project-root}/_bmad/bam/data/templates/tenant-lifecycle-template.md`
- Security Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/security-patterns.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
