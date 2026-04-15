# Tenant Custom Domain Design

Design custom domain and subdomain routing per tenant. Use when the user requests to 'design custom domains' or 'configure tenant domains'.

## Quick Reference

- **Owner:** Platform Architect (Atlas)
- **Domain:** tenant
- **Complexity:** simple
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When designing custom domain routing or SSL/TLS automation -> `bam/workflows/tenant-custom-domain-design`
- **devops-bam**: When implementing domain provisioning or certificate automation -> `bam/workflows/tenant-custom-domain-design`
