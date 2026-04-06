# BAM SaaS Lifecycle Context

**When to load:** During planning phase for tenant onboarding, offboarding, or billing integration.

**Integrates with:** PM agents, Scrum Master agents

---

## Tenant Lifecycle Stages

```
PROSPECT → ONBOARDING → ACTIVE → CHURNING → OFFBOARDED
                ↑                    |
                └─── REACTIVATION ───┘
```

### Onboarding Flow (Saga Pattern)

| Step | FREE | PRO | ENTERPRISE | Compensation |
|------|------|-----|------------|--------------|
| Create tenant record | ✅ | ✅ | ✅ | Delete record |
| Setup database schema | ✅ | ✅ | ✅ | Drop schema |
| Configure auth | Basic | Org+IdP | Org+IdP+SCIM | Remove org |
| Setup AI runtime | Basic | Standard | Full | Remove config |
| Configure billing | Free plan | Pro plan | Custom | Cancel subscription |

### Offboarding Flow (GDPR Compliant)

1. **Request phase**: User requests deletion
2. **Grace period**: 30-day retention window
3. **Export**: Generate data export
4. **Anonymization**: Remove PII
5. **Archival**: Move to cold storage
6. **Deletion**: Final purge after retention period

---

## Application Guidelines

1. **Saga orchestration** - Each step has compensation
2. **Idempotency** - Steps can be retried safely
3. **Status updates** - WebSocket for real-time progress
4. **Webhooks** - Notify external systems
5. **Audit trail** - Log every lifecycle transition

---

## Integration with BAM Workflows

- `bmad-bam-tenant-onboarding-design` → Provisioning design
- `bmad-bam-tenant-offboarding-design` → Offboarding design
