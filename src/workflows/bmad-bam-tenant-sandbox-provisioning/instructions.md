# Tenant Sandbox Provisioning

Design demo/trial environment creation with sandbox creation, data seeding, and cleanup. Use when the user requests to 'design sandbox provisioning' or 'plan trial environments'.

## Quick Reference

- **Owner:** Platform Architect (Atlas)
- **Domain:** tenant-lifecycle
- **Complexity:** intermediate
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When designing trial or sandbox infrastructure -> `bam/workflows/tenant-sandbox-provisioning`
- **devops-bam**: When implementing automated sandbox creation -> `bam/workflows/tenant-sandbox-provisioning`
