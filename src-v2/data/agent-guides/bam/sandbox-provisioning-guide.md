# BAM Sandbox Provisioning Guide

**When to load:** During test environment design, tenant sandbox planning, or when user mentions sandbox, staging, test environment, demo, trial.

**Integrates with:** DevOps (devops-bam), Architect (platform), TEA (testing)

---

## Core Concepts

### Sandbox Types

Different sandbox types serve different purposes in multi-tenant platforms.

| Sandbox Type | Purpose | Isolation Level | Data Source |
|--------------|---------|-----------------|-------------|
| Development | Developer testing | Shared infra | Synthetic |
| Staging | Pre-production testing | Dedicated | Anonymized prod |
| Tenant sandbox | Tenant experimentation | Tenant-isolated | Empty or seeded |
| Demo | Sales demonstrations | Multi-tenant | Curated demo data |
| Trial | Prospect evaluation | Tenant-isolated | Limited synthetic |

### Sandbox Tiers

| Tier | Sandbox Features | Limits | Duration |
|------|------------------|--------|----------|
| Free | None | N/A | N/A |
| Pro | 1 sandbox | 10% of prod limits | 30 days per sandbox |
| Enterprise | 5 sandboxes | 50% of prod limits | Unlimited |
| Enterprise+ | Unlimited | 100% of prod limits | Unlimited |

---

## Application Guidelines

When implementing sandbox provisioning for multi-tenant platforms:

1. **Isolate from production**: Complete data and network separation
2. **Seed with realistic data**: Representative but safe test data
3. **Mirror configuration**: Same structure as production tenant
4. **Enable easy reset**: One-click restore to initial state
5. **Track resource usage**: Prevent runaway costs

---

## Provisioning Architecture

### Sandbox Lifecycle

```
Sandbox Request
       |
       v
1. Validate entitlement (tier check)
       |
       v
2. Allocate resources
   - Compute
   - Storage
   - Network isolation
       |
       v
3. Initialize data
   - Schema creation
   - Seed data loading
   - Configuration copying
       |
       v
4. Configure integrations
   - Webhook endpoints (sandbox)
   - API keys (sandbox-scoped)
   - External services (mock/sandbox)
       |
       v
5. Activate sandbox
   - DNS/routing
   - Access credentials
   - Notification
       |
       v
Sandbox Active
       |
       v
[Usage Phase]
       |
       v
Expiration/Deletion
       |
       v
6. Cleanup
   - Data deletion
   - Resource deallocation
   - Audit logging
```

### Infrastructure Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Namespace isolation | Kubernetes namespace per sandbox | Container workloads |
| Schema isolation | Database schema per sandbox | Data isolation |
| Account isolation | Cloud account per sandbox | Maximum isolation |
| Prefix isolation | Shared infra with key prefixes | Cost optimization |

### Resource Allocation

| Resource | Sandbox Allocation | Scaling |
|----------|-------------------|---------|
| Compute | Fixed small instance | Manual upgrade |
| Database | Shared with schema isolation | Per-tier limits |
| Storage | Quota per sandbox | Expandable |
| AI/LLM | Rate-limited | Per-tier limits |
| Network | Isolated subnet | Fixed |

---

## Data Management

### Data Seeding Options

| Option | Description | Use Case |
|--------|-------------|----------|
| Empty | No seed data | Fresh start testing |
| Minimal | Essential config only | Quick testing |
| Standard | Realistic sample data | Feature testing |
| Production clone | Anonymized prod copy | Integration testing |
| Custom | User-defined dataset | Specific scenarios |

### Seed Data Categories

| Category | Standard Seed | Enterprise Option |
|----------|---------------|-------------------|
| Users | 5 test users | Clone from prod |
| Projects | 2 sample projects | Configurable |
| Data records | 100 sample records | Up to 10,000 |
| AI agents | Pre-configured demo | Clone tenant config |
| Integrations | Mock endpoints | Sandbox endpoints |

### Data Anonymization

| Data Type | Anonymization Method | Preservation |
|-----------|---------------------|--------------|
| Email addresses | Faker generation | Domain structure |
| Names | Random replacement | Cultural patterns |
| Phone numbers | Partial masking | Format |
| Financial data | Value scrambling | Statistical distribution |
| Content | Lorem ipsum or redaction | Length/structure |
| Relationships | Preserved | Foreign key integrity |

### Data Refresh

| Operation | Free Sandbox | Pro Sandbox | Enterprise |
|-----------|--------------|-------------|------------|
| Manual reset | 1/day | 5/day | Unlimited |
| Scheduled refresh | No | Weekly | Configurable |
| Production sync | No | No | On-demand |
| Partial refresh | No | No | Yes |

---

## Configuration Management

### Configuration Inheritance

| Config Type | Inheritance | Override Allowed |
|-------------|-------------|------------------|
| Feature flags | From tenant | Yes |
| Integrations | Empty/sandbox | Yes |
| Workflows | From tenant | Yes |
| Permissions | From tenant | Limited |
| AI settings | From tenant | Yes |

### Sandbox-Specific Configs

| Setting | Production | Sandbox |
|---------|------------|---------|
| Email delivery | Real SMTP | Captured/logged |
| Webhooks | Real endpoints | Sandbox endpoints |
| External APIs | Production | Mocked/sandbox |
| Payment processing | Live | Test mode |
| AI models | Production | May use smaller models |

---

## Access Control

### Access Patterns

| Access Level | Permissions | Use Case |
|--------------|-------------|----------|
| Owner | Full control | Sandbox creator |
| Admin | Manage, no delete | Team leads |
| Developer | Use, limited config | Team members |
| Viewer | Read-only | Stakeholders |
| External | Time-limited access | Partners |

### Authentication Integration

| Scenario | Authentication | Isolation |
|----------|----------------|-----------|
| Same tenant users | SSO passthrough | Sandbox indicator |
| Cross-tenant demo | Separate credentials | Full isolation |
| API access | Sandbox API keys | Scoped to sandbox |

---

## Lifecycle Management

### Automatic Expiration

| Sandbox Type | Default TTL | Extension | Max Duration |
|--------------|-------------|-----------|--------------|
| Trial | 14 days | Not allowed | 14 days |
| Development | 30 days | 30 days | 180 days |
| Staging | 90 days | Unlimited | Unlimited |
| Demo | 7 days | 7 days | 30 days |
| Enterprise | No expiration | N/A | Unlimited |

### Cleanup Process

```
Expiration Approaching
       |
       v
1. T-7 days: Email notification
       |
       v
2. T-3 days: In-app warning
       |
       v
3. T-1 day: Final warning
       |
       v
4. Expiration: Disable access
       |
       v
5. T+7 days: Begin deletion
       |
       v
6. T+14 days: Permanent deletion
       |
       v
Cleanup Complete
```

### Cost Management

| Control | Implementation | Alert Threshold |
|---------|----------------|-----------------|
| Compute cap | Hard resource limits | 80% utilization |
| Storage cap | Quota enforcement | 90% capacity |
| API rate limiting | Per-sandbox limits | 80% of limit |
| AI token budget | Monthly cap | 80% consumed |
| Inactivity shutdown | Auto-stop after N days | 7 days inactive |

---

## Integration Testing

### External Service Handling

| Service Type | Sandbox Behavior | Configuration |
|--------------|------------------|---------------|
| Payment (Stripe) | Test mode | Sandbox API keys |
| Email (SendGrid) | Captured locally | Sandbox credentials |
| SMS (Twilio) | Test numbers only | Sandbox API keys |
| Storage (S3) | Isolated bucket | Sandbox bucket |
| AI (OpenAI) | Rate-limited | Shared or sandbox key |

### Mock Services

| Service | Mock Behavior | Realism Level |
|---------|---------------|---------------|
| Email | Capture and display | Full |
| Webhooks | Echo service | Medium |
| External APIs | Recorded responses | Configurable |
| Payment | Always succeed | Low |

---

## Tenant Sandbox Features

### Self-Service Portal

| Feature | Pro | Enterprise |
|---------|-----|------------|
| Create sandbox | 1 click | 1 click |
| Reset sandbox | 5/day | Unlimited |
| Clone configuration | Yes | Yes |
| Export data | No | Yes |
| Import data | No | Yes |
| API provisioning | Yes | Yes |

### Sandbox Dashboard

| Panel | Information |
|-------|-------------|
| Status | Active/Expired/Suspended |
| Resources | Usage vs. limits |
| Age | Days active, expiration |
| Activity | Last access, usage stats |
| Actions | Reset, Delete, Extend |

---

## Decision Framework

### Sandbox Type Selection

| Requirement | Recommended Type |
|-------------|------------------|
| Developer testing | Development sandbox |
| Pre-release validation | Staging sandbox |
| Customer demo | Demo sandbox |
| Prospect trial | Trial sandbox |
| Integration testing | Enterprise sandbox |

### Isolation Level Selection

| Factor | Lower Isolation | Higher Isolation |
|--------|-----------------|------------------|
| Cost | Lower | Higher |
| Provisioning speed | Faster | Slower |
| Data sensitivity | Less sensitive | More sensitive |
| Compliance | Relaxed | Strict |
| Performance accuracy | Approximate | Exact |

---

## Related Patterns

**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-sandbox`
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `local-dev`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS sandbox environment provisioning {date}"
- Search: "test data seeding best practices {date}"
- Search: "tenant sandbox isolation patterns {date}"

---

## Related Workflows

- `bmad-bam-tenant-sandbox-provisioning` - Sandbox provisioning workflow
- `bmad-bam-tenant-onboarding-design` - Onboarding with sandbox
- `bmad-bam-tenant-data-migration` - Data migration to sandbox
