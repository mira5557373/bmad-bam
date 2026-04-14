---
name: compliance-training-tracking
displayName: Compliance Training Tracking
description: Design compliance training requirements and tracking procedures. Use when the user requests to 'track compliance training', 'design training program', or 'manage training requirements'.
module: bam
tags: [compliance, training, awareness, tracking, workforce]
---

# Compliance Training Tracking

## Overview

This workflow designs the complete compliance training framework for a BAM platform -- covering training requirements identification, curriculum design, completion tracking, and reporting. Supports HIPAA, SOC 2, GDPR, and other compliance training requirements.

Act as a Compliance Architect designing production-grade compliance training procedures for a multi-tenant organization.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Designing compliance training programs
- Tracking training completion requirements
- Creating training curriculum per compliance framework
- Reporting on training compliance status

## Modes

| Mode | Description |
|------|-------------|
| **Create** | Generate new training tracking specification from scratch |
| **Edit** | Load existing training spec and apply targeted modifications |
| **Validate** | Check existing training spec against requirements |

Default: **Create** mode.

## Prerequisites

- Compliance framework requirements identified
- Workforce roles documented
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Identify Training Requirements

Define training requirements:

- Framework-specific training mandates
- Role-based training requirements
- Frequency and renewal requirements
- New hire onboarding requirements

### Step 2: Design Training Curriculum

Create training content structure:

- Course catalog design
- Learning paths per role
- Assessment requirements
- Certification tracking

### Step 3: Design Tracking System

Build tracking capabilities:

- Completion tracking
- Compliance reporting
- Reminder and escalation
- Audit evidence generation

**Soft Gate:** Steps 1-3 complete the requirements identification, curriculum design, and tracking system design.

### Step 4: Create Training Tracking Spec

Generate the comprehensive training tracking specification.

## Outputs

- `{output_folder}/planning-artifacts/compliance-training-tracking-spec.md`
- Training requirements matrix
- Curriculum design
- Tracking system requirements

## Quality Gates

This workflow contributes to:
- **QG-C1** (Compliance Gate) - Validates training compliance requirements
- **QG-P1** (Production Readiness) - Supports workforce compliance readiness

### Training Compliance Readiness
- [ ] Training requirements identified per framework
- [ ] Role-based curriculum designed
- [ ] Tracking system specified
- [ ] Reporting requirements defined
- [ ] Audit evidence automation planned

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-hipaa-compliance-design` | Related | HIPAA requires security training |
| `bmad-bam-compliance-design` | Context | Compliance controls inform training |

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
