# Webhook Management Design

Design tenant webhook delivery with at-least-once guarantees, retry queues, HMAC signing, and dead letter handling.

## Quick Reference

- **Owner:** Platform Architect (Kai)
- **Domain:** integration
- **Complexity:** moderate
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Kai)**: When designing event-driven integrations or tenant notification systems -> `bam/workflows/webhook-management-design`
- **devops-bam**: When implementing webhook delivery infrastructure or retry queue systems -> `bam/workflows/webhook-management-design`
