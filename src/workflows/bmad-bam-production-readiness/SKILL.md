---
name: bmad-bam-production-readiness
displayName: Production Readiness
description: Perform comprehensive production readiness assessment for multi-tenant AI platforms. Use when the user requests 'production readiness check', 'go-live assessment', or 'launch readiness'.
module: bam
tags: [operations, production, go-live]
---

# Production Readiness Workflow

## Overview

This workflow performs comprehensive production readiness assessment for multi-tenant AI platforms, validating all prerequisites for go-live including security, performance, observability, and operational readiness. It supports Quality Gate QG-OC (Operational Checklist Gate).

Act as a Platform Operations Architect specializing in production readiness and go-live assessments.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Before initial production deployment
- Before major version releases
- After significant architecture changes
- For periodic production health assessments

## Modes

| Mode | Purpose | Step Range |
|------|---------|------------|
| Create | Generate new production readiness assessment | `step-01-c-*` to `step-06-c-*` |
| Edit | Update existing readiness documentation | `step-10-e-*` to `step-11-e-*` |
| Validate | Verify production readiness against QG-OC | `step-20-v-*` to `step-22-v-*` |

## Workflow

### Step 1: Verify Prerequisite Gates

- Verify all prerequisite quality gates have passed
- Check security, data protection, compliance, and code quality gates
- Confirm no blocking dependencies

### Step 2: Assess Infrastructure Readiness

- Verify infrastructure capacity and high availability
- Check resource provisioning and scaling capabilities
- Validate network and connectivity configurations

### Step 3: Validate Observability Setup

- Confirm monitoring coverage for all components
- Verify alerting rules and notification channels
- Validate logging and tracing infrastructure

### Step 4: Test Disaster Recovery

- Verify RTO/RPO requirements can be met
- Test backup and restore procedures
- Validate failover mechanisms

### Step 5: Review Operational Procedures

- Confirm runbooks are complete and tested
- Verify on-call schedules and escalation paths
- Check incident response procedures

**Soft Gate:** Steps 1-5 complete the production readiness assessment. Present a summary of all findings and ask for confirmation before generating the final report.

### Step 6: Generate Readiness Report

- Compile all findings into comprehensive report
- Determine go-live recommendation (GO/GO WITH CAUTION/NO GO)
- Generate go-live checklist

## Quality Gate

**Gate ID:** QG-OC  
**Gate Name:** Operational Checklist Gate  
**Pass Criteria:**
- All prerequisite gates passed
- Infrastructure verified
- Observability complete
- DR tested
- Procedures documented

## Recovery Protocol

If QG-OC fails:
1. **Identify Gap:** Review findings for specific failures
2. **Address Issue:** Fix blocking items
3. **Re-assess:** Run production readiness again

## Outputs

- `production-readiness-report.md` - Full assessment
- `go-live-checklist.md` - Launch checklist
- `risk-assessment.md` - Risk analysis
