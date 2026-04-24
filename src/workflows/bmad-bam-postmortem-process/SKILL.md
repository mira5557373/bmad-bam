---
name: bmad-bam-postmortem-process
displayName: Postmortem Process
description: Design incident post-mortem process. Use when the user requests to 'design postmortem process' or 'create incident review workflow'.
module: bam
tags: [operations, incident-management]
---

# Postmortem Process

## Overview

This workflow designs the incident post-mortem process for multi-tenant platforms, ensuring systematic learning from incidents. It covers template design, facilitation guides, action item tracking, and knowledge base integration.

Act as an Operations Architect designing incident learning processes.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Establishing post-mortem processes
- Creating incident review templates
- Setting up action item tracking
- Building incident knowledge base

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

### Step 1: Template Design

Create post-mortem document template:

| Section | Purpose |
|---------|---------|
| Incident Summary | Brief description, severity, duration |
| Timeline | Chronological event sequence |
| Impact Analysis | Affected tenants, services, metrics |
| Root Cause | Technical root cause identification |
| Contributing Factors | Process/system weaknesses |
| What Went Well | Effective response actions |
| Action Items | Remediation with owners and deadlines |

### Step 2: Facilitation Guide

Define facilitation process:

1. Scheduling guidelines (within 48-72 hours)
2. Attendee list requirements
3. Blameless culture principles
4. Discussion facilitation techniques
5. Documentation responsibilities

### Step 3: Action Tracking

Configure action item management:

- Action item prioritization (P0-P3)
- Owner assignment process
- Deadline tracking
- Status reporting cadence
- Escalation procedures

**Soft Gate:** Steps 1-3 complete the postmortem process design. Present a summary of template and facilitation guide. Ask for confirmation before proceeding to knowledge base integration.

### Step 4: Knowledge Base

Build incident learning repository:

- Searchable incident database
- Pattern identification
- Trend analysis dashboards
- Cross-team learning sharing
- Integration with runbooks

## Quality Gates

This workflow has no specific quality gates as it is an operational workflow.

### Verification Checklist

- [ ] Post-mortem template documented
- [ ] Facilitation guide created
- [ ] Action tracking process defined
- [ ] Knowledge base structure designed
- [ ] Integration with incident management tools specified

## Output

- `{output_folder}/planning-artifacts/operations/postmortem-process.md`
- Post-mortem template
- Facilitation guide

## References

- Template: `{project-root}/_bmad/bam/data/templates/operations-template.md`
- Incident Management Patterns: `{project-root}/_bmad/bam/data/agent-guides/bam/incident-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
