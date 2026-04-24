---
name: bmad-bam-revenue-recognition
displayName: Revenue Recognition
description: Design ASC 606 compliant revenue recognition system. Use when the user requests to 'design revenue recognition' or 'configure accounting compliance'.
module: bam
tags: [billing, compliance, platform]
---

# Revenue Recognition

## Overview

This workflow designs the complete ASC 606 compliant revenue recognition system from contract identification through performance obligation fulfillment to journal entry generation. It covers multi-element arrangements, deferred revenue, and audit trail requirements. Run during foundation phase.

Act as a Platform Architect designing a production-grade revenue recognition system.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Implementing ASC 606 compliance
- Designing deferred revenue tracking
- Building financial reporting systems

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

### Step 1: Contract Identification

Define contract recognition rules:

- Contract attributes and validation
- Multi-element arrangement handling
- Contract modification tracking
- Renewal and extension processing

### Step 2: Performance Obligation Mapping

Map services to performance obligations:

- Subscription services (stand-ready)
- Usage-based services (consumption)
- Professional services (milestone)
- Support services (ratably)

### Step 3: Transaction Price Allocation

Configure price allocation:

- Standalone selling price determination
- Discount allocation methodology
- Variable consideration handling
- Contract asset/liability tracking

### Step 4: Revenue Scheduling

Design revenue recognition scheduling:

- Recognition timing rules
- Period-end processing
- Catch-up calculations
- Adjustment handling

**Soft Gate:** Steps 1-4 complete the revenue recognition foundation. Present a summary and ask for confirmation before proceeding.

### Step 5: Journal Entry Generation

Configure accounting integration:

- GL account mapping
- Journal entry templates
- Posting schedules
- Reconciliation procedures

### Step 6: Audit Trail

Design audit and compliance:

- Evidence collection
- Period close procedures
- Restatement handling
- External audit support

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-F1** | Contributes | Foundation-level financial architecture |
| **QG-M2** | Contributes | Tenant-scoped revenue tracking |
| **QG-P1** | Contributes | Production-ready compliance |

### Verification Checklist

- [ ] ASC 606 five-step model implemented
- [ ] Performance obligations mapped to services
- [ ] Transaction price allocation documented
- [ ] Journal entries generated correctly
- [ ] Audit trail maintains evidence

## Output

- `{output_folder}/planning-artifacts/billing/revenue-recognition-design.md`
- ASC 606 compliance documentation
- GL integration specification

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/multi-tenant-patterns.md`
