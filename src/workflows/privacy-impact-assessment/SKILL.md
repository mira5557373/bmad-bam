---
name: privacy-impact-assessment
displayName: Privacy Impact Assessment
description: Design PIA/DPIA process for data protection impact assessments. Use when the user requests to 'conduct privacy impact assessment', 'create DPIA', or 'assess privacy risks'.
module: bam
tags: [compliance, gdpr, privacy, dpia, assessment]
---

# Privacy Impact Assessment

## Overview

This workflow designs the complete Privacy Impact Assessment (PIA) and Data Protection Impact Assessment (DPIA) process for a BAM platform -- covering threshold analysis, risk assessment, mitigation planning, and DPA consultation procedures per GDPR Article 35.

Act as a Compliance Architect designing production-grade privacy impact assessment procedures for a multi-tenant modular monolith.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## When to Use

- Conducting privacy impact assessments for new processing activities
- Evaluating high-risk data processing per GDPR Article 35
- Assessing AI/ML processing privacy risks
- Documenting privacy risk mitigation measures

## Modes

| Mode | Description |
|------|-------------|
| **Create** | Generate new PIA/DPIA specification from scratch |
| **Edit** | Load existing PIA spec and apply targeted modifications |
| **Validate** | Check existing PIA spec against DPIA requirements |

Default: **Create** mode.

## Prerequisites

- Processing activity description
- Data flow documentation
- **Config required:** `{tenant_model}`

## Workflow

### Step 1: Conduct Threshold Analysis

Determine DPIA requirement:

- High-risk processing identification
- Blacklist/whitelist evaluation
- Profiling and automated decision assessment
- Large-scale processing evaluation

### Step 2: Assess Privacy Risks

Evaluate privacy risks:

- Risk identification methodology
- Impact assessment criteria
- Likelihood evaluation
- Risk scoring matrix

### Step 3: Design Mitigation Measures

Plan risk mitigation:

- Technical measures
- Organizational measures
- Residual risk assessment
- DPA consultation triggers

**Soft Gate:** Steps 1-3 complete the threshold analysis, risk assessment, and mitigation planning.

### Step 4: Create PIA/DPIA Specification

Generate the comprehensive PIA/DPIA specification.

## Outputs

- `{output_folder}/planning-artifacts/privacy-impact-assessment-spec.md`
- Threshold analysis
- Risk assessment matrix
- Mitigation plan

## Quality Gates

This workflow contributes to:
- **QG-C1** (Compliance Gate) - Validates privacy impact assessment requirements
- **QG-S3** (Security Baseline Gate) - Validates privacy risk mitigation controls

### DPIA Readiness
- [ ] Threshold analysis completed
- [ ] Risks identified and scored
- [ ] Mitigation measures documented
- [ ] Residual risk acceptable
- [ ] DPA consultation evaluated

## Related Workflows

| Workflow | Relationship | When to Use |
|----------|--------------|-------------|
| `bmad-bam-gdpr-consent-management` | Related | Consent as mitigation measure |
| `bmad-bam-compliance-design` | Context | Compliance controls inform PIA |

## Headless Mode

Accepts `--headless` / `-H` for autonomous execution using defaults and available inputs.
