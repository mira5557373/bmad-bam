---
name: bmad-bam-validate-production-readiness
displayName: Validate Production Readiness
description: Validate system production readiness against QG-P1 quality gate. Use when the user requests to 'validate production readiness' or 'check production gate'.
module: bam
tags: [quality, production, operations]
---

# Validate Production Readiness

## Overview

This workflow validates the complete system against QG-P1 Production Readiness quality gate criteria. It performs a comprehensive assessment of tenant isolation, agent safety, operational readiness, security posture, and deployment configurations before production release.

Act as a Platform Architect (Atlas) validating production readiness and deployment safety.

**Args:** Accepts project path or specific component. Accepts `--headless` / `-H`.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

**Intent Check:** Confirm the user's intent and the target system or component before processing. Verify all prerequisite quality gates have passed.

## When to Use

- After all integration gates pass (QG-I1, QG-I2, QG-I3)
- Before production deployment
- After completing agent safety validation
- When preparing for release sign-off

## Modes

This workflow operates in **Validate** mode — checking existing artifacts and system state against production criteria.

## Prerequisites

- Previous workflow outputs available (if applicable)
- **Config required:** See `On Activation` section

## Quality Gates

- **Entry Gate:** QG-I1, QG-I2, QG-I3 must pass (Convergence, Tenant Safety, Agent Safety)
- **Exit Gate:** QG-P1 (Production Readiness - enables production deployment)

## Validation Checklist

### Tenant Isolation
- [ ] All tenant isolation tests pass
- [ ] RLS policies verified in production config
- [ ] Cross-tenant access blocked
- [ ] Tenant data encryption confirmed

### Agent Safety
- [ ] All agent safety tests pass
- [ ] Tool permissions verified
- [ ] Guardrails configured
- [ ] Kill switches tested

### Operational Readiness
- [ ] Monitoring configured
- [ ] Alerting rules defined
- [ ] Runbooks documented
- [ ] Incident response tested

### Security Posture
- [ ] Security scan clean
- [ ] Secrets management verified
- [ ] Access controls reviewed
- [ ] Audit logging enabled

### Deployment Configuration
- [ ] Infrastructure as Code reviewed
- [ ] Rollback procedures documented
- [ ] Blue-green/canary strategy defined
- [ ] Health checks configured

**Soft Gate:** Validation checklist is complete. Present a summary of pass/fail results across all categories. Ask for confirmation before generating the final report. In headless mode, auto-proceed.

## Output

- `{output_folder}/planning-artifacts/quality/production-readiness-report.md` — production readiness validation report
- QG-P1 gate decision (PASS/CONDITIONAL/FAIL)
- Remediation items for any failures

## References

- Template: `{project-root}/_bmad/bam/data/templates/production-readiness-template.md`
- Checklist: `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`
- Knowledge: `{project-root}/_bmad/bam/data/agent-guides/bam/production-deployment.md`
