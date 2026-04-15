# Rate Limiting Design

Design per-tenant rate limiting strategy with tier-based limits and enforcement. Use when the user requests to 'design rate limiting' or 'plan API throttling'.

## Quick Reference

- **Owner:** Platform Architect (Atlas)
- **Domain:** operations
- **Complexity:** simple
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When designing API infrastructure or platform rate controls -> `bam/workflows/rate-limiting-design`
- **devops-bam**: When implementing traffic management or configuring API gateway throttling -> `bam/workflows/rate-limiting-design`
