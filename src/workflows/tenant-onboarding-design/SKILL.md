---
name: bmad-bam-tenant-onboarding-design
displayName: Tenant Onboarding Design
description: Design tenant provisioning orchestration with tier-specific flows. Use when the user requests to 'design tenant onboarding' or 'plan tenant provisioning'.
module: bam
web_bundle: true
tags: [tenant]
---

# Tenant Onboarding Design

## Overview

This workflow designs the tenant provisioning orchestration using the saga pattern with tier-specific flows and compensation logic. It covers the complete onboarding journey from signup through full provisioning, including database setup, Keycloak configuration, billing activation, AI runtime initialization, and webhook notifications.

Act as a Platform Architect designing reliable multi-step tenant provisioning.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Provisioning Steps

Define the ordered provisioning sequence:

1. Create tenant record (PostgreSQL)
2. Configure RLS policies for new tenant
3. Create Keycloak organization (PRO/ENTERPRISE) or realm user (FREE)
4. Configure IdP if ENTERPRISE (SAML/OIDC)
5. Create billing subscription (Orb + Stripe)
6. Initialize AI runtime (agent configs, memory tiers, tool permissions per tier)
7. Provision storage (S3 prefix, Qdrant namespace)
8. Send welcome webhook/notification

### Step 2: Tier-Specific Flows

| Step       | FREE                       | PRO              | ENTERPRISE                |
| ---------- | -------------------------- | ---------------- | ------------------------- |
| Keycloak   | Realm user                 | Organization     | Organization + custom IdP |
| Billing    | Free plan (no payment)     | Payment required | Custom contract           |
| AI Runtime | Basic agent, limited tools | Full agent suite | Custom agents + tools     |
| Storage    | Shared quota               | Dedicated quota  | Dedicated + backup        |

**Soft Gate:** Steps 1-2 complete the provisioning design and tier-specific flows. Present a summary of provisioning steps and tier differences. Ask for confirmation before proceeding to compensation logic and webhook design.

### Step 3: Compensation Logic (Saga Pattern)

For each provisioning step, define the compensation (rollback) action:

- If step N fails, compensate steps N-1 through 1 in reverse order
- Compensation must be idempotent (safe to retry)
- Use Temporal for saga orchestration

### Step 4: Webhook Events

Define webhook events fired during onboarding:

- `tenant.provisioning.started`
- `tenant.provisioning.step_completed` (per step)
- `tenant.provisioning.completed`
- `tenant.provisioning.failed` (with compensation status)

### Quality Gates

- [ ] All provisioning steps defined with compensation
- [ ] Tier-specific flows documented
- [ ] Saga pattern with Temporal orchestration designed
- [ ] Webhook events specified

## Output

- `{output_folder}/planning-artifacts/architecture/tenant-onboarding-design.md`
- Provisioning step matrix
- Webhook event catalog

## References

- Template: `bam/templates/tenant-lifecycle-template.md`, `bam/templates/tenant-tier-matrix.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`
- Saga Orchestration Patterns: `bam/knowledge/saga-orchestration-patterns.md`
- Provisioning UI Patterns: `bam/knowledge/provisioning-ui-patterns.md`
- WDS Integration Patterns: `bam/knowledge/wds-integration-patterns.md`

- Knowledge: `bam/knowledge/saga-orchestration-patterns.md`, `bam/knowledge/provisioning-ui-patterns.md`, `bam/knowledge/multi-tenant-patterns.md`, `bam/knowledge/wds-integration-patterns.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`
- Saga Orchestration Patterns: `bam/knowledge/saga-orchestration-patterns.md`
- Provisioning UI Patterns: `bam/knowledge/provisioning-ui-patterns.md`
- WDS Integration Patterns: `bam/knowledge/wds-integration-patterns.md`
