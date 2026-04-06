# Step 2: Design Data Retention

Define data retention policies for tenant offboarding:

## Data Classification for Retention

| Data Category | Retention Requirement | Deletion Method |
|---------------|----------------------|-----------------|
| Tenant Profile | Until hard delete | Cascade delete |
| User Accounts | Until hard delete | Soft delete, then purge |
| Agent Configurations | Until hard delete | Cascade delete |
| Conversation History | Per tier policy | Batch purge |
| Vector Embeddings | Until hard delete | Namespace delete |
| File Storage | Until hard delete | Recursive delete |
| Audit Logs | Regulatory minimum (7 years) | Archive, then purge |
| Billing Records | Regulatory minimum (7 years) | Archive only |
| Analytics Data | Until hard delete | Partition drop |

## GDPR Compliance Requirements

### Right to Data Export
- Generate complete data export before deletion
- Include: user data, conversations, files, configurations
- Format: machine-readable (JSON/CSV archive)
- Delivery: secure download link (24h expiry)
- Notification: email confirmation with download link

### Right to be Forgotten
- Delete all personal data upon request
- Anonymize data that must be retained for analytics
- Provide deletion certificate
- Document deletion in compliance log

## Retention Policy Configuration

```yaml
retention_policies:
  tenant_data:
    soft_delete_period:
      FREE: 30_days
      PRO: 90_days
      ENTERPRISE: custom
    
  compliance_data:
    audit_logs: 7_years
    billing_records: 7_years
    deletion_certificates: 10_years
    
  anonymization_rules:
    - field: email -> hash
    - field: name -> "deleted_user_{id}"
    - field: ip_address -> null
```

## Data Export Package Structure

```
tenant_export_{tenant_id}_{date}/
  manifest.json           # Export metadata
  users/                  # User profiles and settings
  agents/                 # Agent configurations
  conversations/          # Conversation histories
  files/                  # Uploaded files
  integrations/           # Integration configurations
  analytics_summary.json  # Aggregated analytics
```
