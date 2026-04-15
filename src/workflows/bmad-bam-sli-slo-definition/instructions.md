# SLI/SLO Definition

Define Service Level Indicators and Objectives for multi-tenant platform. Use when the user requests to 'define SLIs/SLOs' or 'create service level objectives'.

## Quick Reference

- **Owner:** Platform Architect (Atlas) / SRE
- **Domain:** observability
- **Complexity:** complex
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When defining service level indicators or objectives -> `bam/workflows/sli-slo-definition`
- **devops-bam**: When configuring error budgets or SLO alerting -> `bam/workflows/sli-slo-definition`
- **pm-bam**: When defining tenant-tier SLAs or reliability commitments -> `bam/workflows/sli-slo-definition`
