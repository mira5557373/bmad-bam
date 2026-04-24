---
name: bmad-bam-continuous-security-setup
displayName: Continuous Security Setup
description: Set up continuous security monitoring and automation. Use when the user requests to 'setup security monitoring' or 'configure continuous security'.
module: bam
tags: [operations, security, monitoring]
---

# Continuous Security Setup

## Overview

This workflow sets up continuous security monitoring and automation for multi-tenant AI platforms. It covers compliance automation activation, threat monitoring setup, DLP controls verification, anomaly detection activation, and incident automation readiness. Produces security configuration and runbook documentation.

Act as a Security Engineer specializing in multi-tenant SaaS platform security with AI workload considerations.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

## When to Use

- Setting up continuous security monitoring
- Activating compliance automation
- Configuring threat detection and response
- Verifying DLP controls

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Set up new continuous security | `step-01-c-*` to `step-05-c-*` |
| Edit | Modify existing setup | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify setup completeness | `step-20-v-*` to `step-22-v-*` |

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Workflow

### Step 1: Compliance Automation Activation
- Compliance policy configuration
- Automated compliance checks
- Evidence collection automation
- Compliance reporting setup

### Step 2: Threat Monitoring Setup
- Security event collection
- SIEM integration
- Threat detection rules
- AI-specific threat monitoring

### Step 3: DLP Controls Verification
- Data classification rules
- Exfiltration prevention
- Tenant data isolation verification
- AI data leakage prevention

### Step 4: Anomaly Detection Activation
- Behavioral baseline establishment
- Anomaly detection rules
- AI usage anomaly detection
- Alert thresholds

### Step 5: Incident Automation Readiness
- Automated response playbooks
- Escalation automation
- Containment procedures
- Recovery automation

### Quality Gates

- [ ] Compliance automation active
- [ ] Threat monitoring configured
- [ ] DLP controls verified
- [ ] Anomaly detection enabled
- [ ] Incident automation ready

## Quality Gates

This workflow contributes to:
- **QG-S5** (Continuous Security Gate) - Validates continuous security setup
- **QG-P1** (Production Readiness) - Supports operational readiness

### Entry Gate
- Security architecture defined
- Compliance requirements documented

### Exit Gate
- QG-S5 checklist items verified
- Security configuration documented
- Runbooks created

## Output

- `{output_folder}/operations/security/continuous-security-config.md`
- `{output_folder}/operations/security/security-runbooks.md`

## References

- Template: `{project-root}/_bmad/bam/data/templates/security-config-template.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/security-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
