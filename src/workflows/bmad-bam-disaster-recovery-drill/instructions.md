# Disaster Recovery Drill

Execute disaster recovery drills including DR plan execution, failover testing, recovery validation, and RTO/RPO verification. Use for scheduled DR exercises.

## Quick Reference

- **Owner:** SRE Engineer
- **Domain:** operations
- **Complexity:** complex
- **Headless:** Yes

## Workflow Triggers

- **devops-bam**: When executing DR drills or testing failover procedures -> `bam/workflows/disaster-recovery-drill`
- **security-bam**: When validating business continuity controls -> `bam/workflows/disaster-recovery-drill`
