---
name: incident-response-operations
displayName: Incident Response Operations
description: Execute incident response procedures for production issues. Use when the user requests to 'handle incident' or 'initiate incident response'.
module: bam
tags: [operations, incident, security]
---

# Incident Response Operations

## Overview

This workflow executes structured incident response procedures for production issues in multi-tenant AI platforms. It covers incident classification, response initiation, investigation procedures, mitigation execution, resolution verification, and postmortem scheduling. Produces incident reports and action items for continuous improvement.

Act as an Incident Commander specializing in multi-tenant SaaS platform operations with AI workload considerations.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Responding to production incidents affecting tenants
- Classifying and prioritizing incoming incident reports
- Executing investigation and mitigation procedures
- Verifying resolution and scheduling postmortems

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Execute new incident response | `step-01-c-*` to `step-06-c-*` |
| Edit | Modify active incident response | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify incident resolution | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Incident Classification

Classify the incident based on severity and impact:
- P1: Critical - Full outage, data loss risk
- P2: Major - Partial outage, significant degradation
- P3: Minor - Limited impact, workaround available
- P4: Low - Informational, no immediate action required

Assess tenant impact scope and AI workload implications.

### Step 2: Response Initiation

- Assemble incident response team
- Establish communication channels
- Notify affected stakeholders
- Set up incident tracking

### Step 3: Investigation Procedures

- Collect logs and telemetry
- Identify root cause hypothesis
- Map affected components and tenants
- Document timeline of events

### Step 4: Mitigation Execution

- Execute mitigation procedures
- Implement temporary workarounds
- Monitor for regression
- Communicate progress to stakeholders

**Soft Gate:** Steps 1-4 complete active incident response. Present a summary of incident status and mitigation applied. Ask for confirmation before proceeding to resolution verification.

### Step 5: Resolution Verification

- Verify mitigation effectiveness
- Confirm service restoration
- Validate tenant impact resolved
- Close incident status

### Step 6: Postmortem Scheduling

- Schedule postmortem meeting
- Assign action item owners
- Document lessons learned
- Update runbooks as needed

### Quality Gates

- [ ] Incident correctly classified
- [ ] Response team assembled and notified
- [ ] Root cause identified or hypothesis documented
- [ ] Mitigation executed and verified
- [ ] Resolution confirmed across affected tenants
- [ ] Postmortem scheduled with action items

## Quality Gates

This workflow contributes to:
- **QG-IR1** (Incident Response Gate) - Validates incident handling procedures
- **QG-P1** (Production Readiness) - Supports operational readiness

### Entry Gate
- Production monitoring and alerting must be in place
- Incident response runbooks available

### Exit Gate
- QG-IR1 checklist items verified
- Incident closed with documented resolution
- Postmortem scheduled or completed

## Output

- `{output_folder}/operations/incidents/incident-{id}-report.md`
- `{output_folder}/operations/incidents/incident-{id}-postmortem.md`

## References

- Template: `bam/templates/incident-report-template.md`
- Checklist: `bam/checklists/qg-incident-response.md`
- Knowledge: `bam/knowledge/incident-response-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
