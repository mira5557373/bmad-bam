# Post-Deployment Verification

Verify deployment success with smoke tests, monitoring activation, tenant health checks, and rollback readiness. Use when completing deployment to production or staging environments.

## Quick Reference

- **Owner:** DevOps Engineer
- **Domain:** operations
- **Complexity:** medium
- **Headless:** Yes

## Workflow Triggers

- **devops-bam**: When verifying deployment success or checking post-deployment health -> `bam/workflows/post-deployment-verification`
- **pm-bam**: When confirming release completion and deployment status -> `bam/workflows/post-deployment-verification`
