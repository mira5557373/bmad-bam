# Database Migration Pipeline

Execute database migrations including migration plan execution, data validation, tenant impact assessment, and rollback testing. Use for schema changes.

## Quick Reference

- **Owner:** Database Engineer
- **Domain:** operations
- **Complexity:** complex
- **Headless:** Yes

## Workflow Triggers

- **devops-bam**: When executing database migrations or schema changes -> `bam/workflows/database-migration-pipeline`
- **dev-bam**: When deploying database changes -> `bam/workflows/database-migration-pipeline`
