# Tenant Network Isolation Design

Design network-level tenant isolation using VPC and security groups. Use when the user requests to 'design network isolation' or 'configure VPC security'.

## Quick Reference

- **Owner:** Platform Security Architect
- **Domain:** tenant, security
- **Complexity:** moderate
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When designing VPC architecture or network isolation -> `bam/workflows/tenant-network-isolation-design`
- **security-bam**: When implementing network security controls -> `bam/workflows/tenant-network-isolation-design`
- **devops-bam**: When configuring VPC and security groups -> `bam/workflows/tenant-network-isolation-design`
