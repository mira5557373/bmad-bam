---
name: bmad-bam-data-retention-policy-design
displayName: Data Retention Policy Design
description: Design tenant data retention policies with GDPR/CCPA compliance, automated archival, secure deletion, and audit trails.
module: bam
tags: [compliance, tenant]
---

# Data Retention Policy Design

## Overview

This workflow designs comprehensive data retention policies for multi-tenant SaaS platforms, covering GDPR/CCPA compliance requirements, automated archival rules, secure deletion procedures, and compliance reporting. It addresses the complete data lifecycle from creation through retention, archival, and deletion.

Act as a Platform Architect designing compliant data lifecycle management.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing data retention strategies for multi-tenant platforms
- Implementing GDPR/CCPA compliance requirements
- Creating automated archival and deletion procedures
- Building compliance audit trails and reporting

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Analyze Retention Requirements

Analyze compliance and business requirements for data retention:

- GDPR Article 17 (Right to Erasure)
- CCPA deletion requirements
- Industry-specific retention mandates
- Business-driven retention needs

### Step 2: Design Retention Policies

Design retention policies per data category:

| Category | Retention Period | Legal Basis | Action at Expiry |
|----------|-----------------|-------------|------------------|
| User PII | Configurable | Consent/Contract | Archive then delete |
| Transaction Records | 7 years | Legal obligation | Archive |
| Agent Logs | 90 days | Legitimate interest | Delete |
| Audit Trails | 10 years | Compliance | Archive |

### Step 3: Configure Archival Rules

Design automated archival:
- Time-based triggers
- Storage tier transitions
- Compression and encryption
- Retrieval SLAs per tier

### Step 4: Design Deletion Procedures

Design secure deletion:
- Soft delete with grace period
- Hard delete with verification
- Cascade deletion for related data
- Cryptographic erasure for encrypted data

**Soft Gate:** Steps 1-4 complete the retention and deletion design. Present a summary of policies and procedures. Ask for confirmation before proceeding to compliance reporting.

### Step 5: Design Compliance Reporting

Design audit and compliance reporting:
- Retention policy audit logs
- Deletion certificates
- GDPR Article 30 records
- Compliance dashboards

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant data isolation during retention and deletion |
| **QG-I2** | Contributes | Tenant safety during data lifecycle transitions |
| **QG-P1** | Contributes | Production-ready compliance procedures |

- **Entry Gate:** QG-M2 (Tenant Isolation) - Tenant model must be defined
- **Exit Gate:** QG-P1 (Production Readiness) - Retention policies must be compliance-ready

### Verification Checklist

- [ ] Retention periods defined per data category
- [ ] GDPR/CCPA compliance requirements addressed
- [ ] Archival rules and storage tiers specified
- [ ] Deletion procedures documented
- [ ] Compliance reporting designed

## Output

- `{output_folder}/planning-artifacts/compliance/data-retention-policy.md`
- Data category matrix
- Archival rules catalog
- Deletion procedures runbook

## References

- Template: `{project-root}/_bmad/bam/data/templates/data-retention-template.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
- Compliance Patterns: `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
