# Distributed Tracing Design

Design distributed tracing for multi-tenant microservices. Use when the user requests to 'design distributed tracing' or 'create tracing architecture'.

## Quick Reference

- **Owner:** Platform Architect (Atlas)
- **Domain:** observability
- **Complexity:** complex
- **Headless:** Yes

## Workflow Triggers

- **architect-bam (Atlas)**: When designing distributed tracing or OpenTelemetry instrumentation -> `bam/workflows/distributed-tracing-design`
- **devops-bam**: When configuring trace exporters or sampling strategies -> `bam/workflows/distributed-tracing-design`
- **security-bam**: When validating tenant correlation in traces -> `bam/workflows/distributed-tracing-design`
