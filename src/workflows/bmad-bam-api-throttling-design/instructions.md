# API Throttling Design

Design API throttling with per-endpoint limits, burst handling, and tier-based quotas. Use when designing request rate management.

## Quick Reference

- **Owner:** Platform Architect (Atlas)
- **Domain:** operations
- **Complexity:** simple
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When designing per-endpoint rate limits or sliding window algorithms -> `bam/workflows/api-throttling-design`
- **devops-bam**: When configuring API gateway throttling rules or burst handling mechanisms -> `bam/workflows/api-throttling-design`
