# Step 1: Define Deprovisioning Stages

Define the ordered stages of tenant deprovisioning:

| Stage | Name | Description | Reversibility Window |
|-------|------|-------------|----------------------|
| 1 | Offboarding Request | Validate deprovisioning request (admin authorization, billing clearance) | N/A |
| 2 | Status Transition | Transition tenant to SUSPENDED status, disable new logins | Immediate (reactivate) |
| 3 | Active Session Termination | Gracefully terminate all active user sessions | 24h (reactivation restores access) |
| 4 | Running Job Completion | Allow in-flight jobs to complete or timeout (max 1h) | Until completion |
| 5 | Data Export Preparation | Generate tenant data export package (GDPR compliance) | 30 days |
| 6 | Archive Creation | Create archival snapshot of tenant data | 30 days |
| 7 | Soft Delete | Mark tenant as ARCHIVED, retain data per policy | Retention period |
| 8 | Hard Delete | Permanently delete all tenant data | Irreversible |
| 9 | Resource Cleanup | Remove all infrastructure resources | Irreversible |

## Stage Timing Policies

```yaml
deprovisioning_timing:
  suspension_to_archive: 7_days  # Grace period for reactivation
  archive_retention:
    FREE: 30_days
    PRO: 90_days
    ENTERPRISE: 365_days  # Or custom per contract
  hard_delete_delay: 24_hours  # After retention expires
```

## Cancellation Points

| Before Stage | Cancellation Action |
|--------------|---------------------|
| Stage 6 | Full reactivation, restore all access |
| Stage 7 | Reactivation from archive (may take time) |
| Stage 8 | No cancellation possible |

For each stage, define:
- Authorization requirements (who can trigger)
- Notification recipients (tenant admin, billing, operations)
- Audit log entries required
- Checkpoint verification before proceeding
