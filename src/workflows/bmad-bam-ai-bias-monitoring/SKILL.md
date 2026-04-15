---
name: bmad-bam-ai-bias-monitoring
displayName: AI Bias Monitoring
description: Design bias detection and fairness monitoring for AI systems. Use when the user requests 'design bias monitoring' or 'AI fairness'.
module: bam
tags: [ai-safety, fairness, compliance]
---

# AI Bias Monitoring

## Overview

This workflow designs comprehensive bias detection and fairness monitoring for AI systems, including bias taxonomy definition, detection methods, monitoring dashboards, and remediation workflows. It ensures AI systems operate fairly across tenant populations and comply with regulatory requirements. Run after runtime architecture is defined.

Act as an AI Ethics Architect designing bias monitoring systems.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing bias detection for AI outputs
- Creating fairness monitoring dashboards
- Building remediation workflows for bias incidents
- Defining bias taxonomy for specific domains
- Meeting EU AI Act fairness requirements

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Bias Taxonomy Definition

Define bias categories relevant to the domain:

- Protected attributes (demographics, geography)
- Output bias types (selection, ranking, content)
- Interaction bias (prompt handling, response quality)
- Tenant-specific bias concerns

### Step 2: Detection Methods

Design bias detection approaches:

- Statistical parity metrics
- Equal opportunity metrics
- Calibration metrics
- Adversarial bias testing

### Step 3: Monitoring Dashboards

Create fairness monitoring interfaces:

- Real-time bias metrics
- Trend analysis over time
- Per-tenant fairness reports
- Alert thresholds and notifications

### Step 4: Remediation Workflows

Define bias incident response:

- Escalation procedures
- Remediation actions
- Documentation requirements
- Compliance reporting

**Soft Gate:** Steps 1-4 complete the bias monitoring design. Present a summary of taxonomy, detection, monitoring, and remediation. Ask for confirmation.

### Quality Gates

- [ ] Bias taxonomy defined for domain
- [ ] Detection methods cover all bias types
- [ ] Monitoring dashboards designed
- [ ] Remediation workflows documented

## Quality Gates

This workflow contributes to:
- **QG-M3** (Agent Runtime) - Bias monitoring within agent outputs
- **QG-I3** (Agent Safety) - Fairness as safety requirement

### Entry Gate
- QG-M3 (Agent Runtime) must pass before designing bias monitoring
- Agent runtime architecture must be defined

### Exit Gate
- QG-I3 checklist items for fairness verified
- Bias taxonomy and detection documented
- Monitoring dashboards specified

## Output

- `{output_folder}/planning-artifacts/quality/bias-monitoring.md`
- Bias taxonomy document
- Monitoring dashboard specifications
- Remediation workflow documentation

## References

- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/testing-agent-safety.md`, `{project-root}/_bmad/bam/data/agent-guides/bam/agent-runtime-patterns.md`
- Patterns: `{project-root}/_bmad/bam/data/bam-patterns.csv` (ai-safety, ai-testing, compliance)
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`
