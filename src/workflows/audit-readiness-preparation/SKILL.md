---
name: audit-readiness-preparation
displayName: Audit Readiness Preparation
description: Design audit preparation procedures for compliance assessments. Use when the user requests to 'prepare for audit', 'document evidence collection', or 'create audit readiness checklist'.
module: bam
tags: [compliance, audit, evidence, assessment, readiness]
---

# Audit Readiness Preparation

## Overview

This workflow designs the complete audit readiness framework for a BAM platform -- covering evidence collection, control testing, documentation review, and auditor coordination. Supports SOC 2, ISO 27001, PCI-DSS, and other compliance audits.

Act as a Compliance Architect designing production-grade audit readiness procedures for a multi-tenant modular monolith.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Preparing for upcoming compliance audits
- Creating evidence collection procedures
- Documenting control effectiveness testing
- Coordinating auditor engagements

## Modes

| Mode | Description |
|------|-------------|
| **Create** | Generate new audit readiness specification from scratch |
| **Edit** | Load existing audit spec and apply targeted modifications |
| **Validate** | Check existing audit spec against readiness criteria |

Default: **Create** mode.

## Prerequisites

- Master architecture document completed
- Compliance controls documented
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Inventory Control Evidence

Create evidence inventory:

- Control-to-evidence mapping
- Evidence sources and owners
- Collection automation opportunities
- Evidence quality requirements

### Step 2: Design Evidence Collection

Define collection procedures:

- Automated evidence collection
- Manual evidence procedures
- Evidence storage and retention
- Chain of custody requirements

### Step 3: Plan Control Testing

Design control effectiveness testing:

- Testing methodology
- Sample selection criteria
- Exception handling
- Remediation tracking

**Soft Gate:** Steps 1-3 complete the evidence inventory, collection design, and testing plan.

### Step 4: Create Audit Readiness Spec

Generate the comprehensive audit readiness specification.

## Outputs

- `{output_folder}/planning-artifacts/audit-readiness-spec.md`
- Evidence inventory matrix
- Collection procedures
- Testing plan

## Quality Gates

This workflow contributes to:
- **QG-C1** (Compliance Gate) - Validates audit readiness for compliance assessments
- **QG-P1** (Production Readiness) - Supports operational audit readiness

### Audit Readiness
- [ ] Evidence inventory complete
- [ ] Collection procedures documented
- [ ] Control testing planned
- [ ] Remediation tracking configured
- [ ] Auditor coordination planned

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-soc2-evidence-collection` | Related | SOC 2 specific evidence |
| `bmad-bam-compliance-design` | Context | Compliance controls inform audit scope |

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
