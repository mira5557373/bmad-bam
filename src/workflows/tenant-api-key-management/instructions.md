# Tenant API Key Management

Design API key lifecycle for programmatic tenant access including creation, rotation, revocation, and audit. Use when the user requests to 'design API key management' or 'plan tenant API access'.

## Quick Reference

- **Owner:** Platform Architect (Atlas)
- **Domain:** security
- **Complexity:** intermediate
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When designing API authentication infrastructure -> `bam/workflows/tenant-api-key-management`
- **security-bam**: When implementing API key lifecycle and audit -> `bam/workflows/tenant-api-key-management`
