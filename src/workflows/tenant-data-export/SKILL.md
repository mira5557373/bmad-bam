---
name: tenant-data-export
displayName: Tenant Data Export
description: Design GDPR Article 20 data portability export with audit trail and verification. Use when the user requests to 'design data export' or 'plan GDPR portability'.
module: bam
tags: [tenant, compliance]
---

# Tenant Data Export

## Overview

This workflow designs GDPR Article 20 compliant data portability export functionality. It covers export formats (JSON, CSV), automated delivery mechanisms, comprehensive audit trails, and data completeness verification. The export system enables tenants to receive their data in a machine-readable format as required by GDPR.

Act as a Platform Architect designing compliant data portability systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing tenant data export capabilities
- Creating data portability features
- Building GDPR data subject access request support

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Define Exportable Data Categories

Define all data categories subject to export:

| Category | Examples | Format |
|----------|----------|--------|
| User Data | Profile, preferences | JSON |
| Content | Conversations, documents | JSON/Files |
| Configuration | Settings, integrations | JSON |
| Activity | Audit logs, usage | CSV |

### Step 2: Design Export Formats

Design export format specifications:
- JSON schema for structured data
- CSV format for tabular data
- File packaging (ZIP with manifest)
- Encryption options for sensitive data

### Step 3: Build Export Pipeline

Design the export pipeline:
- Request initiation (UI, API)
- Queue processing (background job)
- Data collection from multiple sources
- Package generation
- Delivery notification

**Soft Gate:** Steps 1-3 complete the export design. Present a summary of data categories and pipeline. Ask for confirmation before proceeding to audit and verification.

### Step 4: Implement Audit Trail

Design audit trail for export operations:
- Export request logging
- Processing status tracking
- Download access logging
- Retention and cleanup

### Step 5: Data Completeness Verification

Design verification mechanisms:
- Pre-export data inventory
- Post-export checksum validation
- Missing data detection
- Verification report generation

## Quality Gates

This workflow contributes to:
- **QG-M2** (Tenant Isolation) - Validates tenant data boundaries during export
- **QG-I2** (Tenant Safety) - Ensures export does not leak cross-tenant data
- **QG-P1** (Production) - GDPR compliance required for production

### Entry Gate
- QG-F1 (Foundation) must pass (master architecture with compliance requirements)
- QG-M2 (Tenant Isolation) must pass for data boundary definitions

### Exit Gate
- QG-M2 and QG-I2 checklist items from `tenant-isolation.md` and `qg-i2-tenant-safety.md` verified:
  - [ ] All data categories identified
  - [ ] Export formats specified
  - [ ] Pipeline designed
  - [ ] Audit trail implemented
  - [ ] Verification mechanisms defined

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Data boundary prerequisite
- `bmad-bam-tenant-offboarding-design` - Export may be part of offboarding
- `bmad-bam-compliance-design` - GDPR compliance coordination

## Output

- `{output_folder}/planning-artifacts/compliance/data-export-design.md`
- Export schema documentation
- Pipeline architecture diagram

## References

- Template: `{project-root}/_bmad/bam/data/templates/compliance-design-template.md`
- GDPR Compliance: `{project-root}/_bmad/bam/data/agent-guides/bam/gdpr-compliance-patterns.md`
- Multi-Tenant Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
