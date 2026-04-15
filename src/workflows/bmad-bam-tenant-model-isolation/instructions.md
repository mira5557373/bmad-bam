# Tenant Model Isolation

Design tenant isolation strategy and context propagation. Use when the user requests to 'design tenant isolation' or 'create isolation matrix'.

## Quick Reference

- **Owner:** Platform Architect (Atlas)
- **Domain:** tenant
- **Complexity:** complex
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When designing tenant isolation strategies or RLS policies -> `bam/workflows/tenant-model-isolation`
- **security-bam**: When validating tenant data isolation or cross-tenant access controls -> `bam/workflows/tenant-model-isolation`
