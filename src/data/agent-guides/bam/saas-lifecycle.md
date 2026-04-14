# BAM SaaS Lifecycle Context

**When to load:** During planning phase for tenant onboarding, offboarding, or billing integration.

**Integrates with:** PM agents, Scrum Master agents

---

## Core Concepts

### SaaS Maturity Stages
The evolution from startup MVP through growth, maturity, and renewal phases. Each stage demands different operational focus: early stages prioritize product-market fit, growth stages focus on scalability, and mature stages emphasize efficiency and ecosystem expansion.

### Growth Metrics
Key indicators that measure SaaS health: MRR/ARR (revenue), CAC (acquisition cost), LTV (lifetime value), churn rate, and net revenue retention. These metrics guide operational decisions and investor communications.

### Tenant Lifecycle
The journey from prospect through onboarding, active use, potential churn, and either retention or offboarding. Each stage requires specific interventions, communications, and system behaviors.

### Tier Progression
The natural evolution of tenants through subscription levels as their needs grow. Understanding tier progression patterns enables better product design, pricing optimization, and customer success strategies.

### Multi-Tenant Considerations
Multi-tenant SaaS lifecycle management requires orchestrating tenant-specific journeys while maintaining platform efficiency. Onboarding sagas must provision isolated resources, billing integration must handle tier transitions gracefully, and offboarding must comply with data retention regulations while preserving platform integrity.

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
| Create tenant record | Yes | Yes | Yes | Delete record |
| Setup database schema | Yes | Yes | Yes | Drop schema |
| Configure auth | Basic | Org+IdP | Org+IdP+SCIM | Remove org |
| Setup AI runtime | Basic | Standard | Full | Remove config |
| Configure billing | Free plan | Pro plan | Custom | Cancel subscription |

#### Detailed Onboarding Saga Steps

**Step 1: Create Tenant Record**
- Generate unique tenant_id (UUID v7 for time-ordering)
- Create tenant row with status: `provisioning`
- Initialize metadata (tier, region, created_at)
- Compensation: Delete tenant record, release tenant_id

**Step 2: Database Provisioning**
- Create tenant schema (schema-per-tenant) or initialize RLS context
- Run migrations for tenant-specific tables
- Seed default data (settings, templates)
- Compensation: Drop schema, rollback migrations

**Step 3: Authentication Setup**
- Create organization in auth provider (Auth0, Clerk, etc.)
- Configure SSO/IdP connections (PRO/ENTERPRISE)
- Setup SCIM provisioning (ENTERPRISE only)
- Create initial admin user
- Compensation: Delete organization, remove IdP connections

**Step 4: AI Runtime Initialization**
- Allocate memory namespace in Mem0
- Configure rate limits per tier
- Initialize tool access permissions
- Setup agent preferences
- Compensation: Delete memory namespace, revoke permissions

**Step 5: Billing Configuration**
- Create customer in Stripe
- Attach payment method (or mark as free tier)
- Create subscription with selected plan
- Initialize usage meters
- Compensation: Cancel subscription, delete customer

**Step 6: Send Welcome Notifications**
- Email welcome message with getting started guide
- Trigger onboarding webhooks
- Initialize usage tracking
- Mark tenant status: `active`

### Billing Integration Patterns

#### Stripe Integration

| Event | Action | Webhook Handler |
|-------|--------|-----------------|
| `customer.subscription.created` | Activate tenant | `/webhooks/stripe/subscription-created` |
| `customer.subscription.updated` | Update tier limits | `/webhooks/stripe/subscription-updated` |
| `customer.subscription.deleted` | Begin churn flow | `/webhooks/stripe/subscription-deleted` |
| `invoice.payment_succeeded` | Record payment | `/webhooks/stripe/payment-success` |
| `invoice.payment_failed` | Trigger dunning | `/webhooks/stripe/payment-failed` |

#### Usage-Based Billing

Metering dimensions for AI platforms:

| Dimension | Unit | Meter Name |
|-----------|------|------------|
| API Calls | Count | `api_calls` |
| LLM Tokens | 1000 tokens | `llm_tokens` |
| Storage | GB-hours | `storage_gb_hours` |
| Compute | CPU-seconds | `compute_seconds` |
| Agent Runs | Count | `agent_runs` |

Metering implementation:
- Real-time: Redis HyperLogLog for unique counts
- Aggregation: Hourly rollups to PostgreSQL
- Billing sync: Daily push to Stripe Usage Records

### Tier Upgrade/Downgrade Flows

#### Upgrade Flow (FREE → PRO)

1. Validate payment method exists
2. Create PRO subscription in Stripe
3. Update tenant tier in database
4. Expand rate limits immediately
5. Enable PRO-only tools
6. Send upgrade confirmation email

#### Downgrade Flow (PRO → FREE)

1. Schedule downgrade for end of billing period
2. Warn about feature loss (email, in-app)
3. At period end: Cancel subscription
4. Reduce rate limits
5. Disable PRO-only tools
6. Archive PRO-only data (30-day retention)
7. Send downgrade confirmation

### Offboarding Flow (GDPR Compliant)

1. **Request phase**: User requests deletion
2. **Grace period**: 30-day retention window
3. **Export**: Generate data export
4. **Anonymization**: Remove PII
5. **Archival**: Move to cold storage
6. **Deletion**: Final purge after retention period

#### Reactivation Flow

Available during grace period (30 days):

1. User requests reactivation
2. Verify account ownership (email confirmation)
3. If billing active: Resume immediately
4. If billing lapsed: Require payment method
5. Restore tenant status to `active`
6. Restore data access (if still in grace period)
7. Send reactivation confirmation

### Metering and Usage Tracking

#### Real-Time Usage Dashboard

Display for each tenant:
- Current period usage vs limits
- Usage trend charts
- Projected overage warnings
- Cost breakdown by dimension

#### Usage Alert Thresholds

| Threshold | Action |
|-----------|--------|
| 50% | Informational email |
| 80% | Warning email + in-app banner |
| 95% | Urgent notification |
| 100% | Soft limit + upgrade prompt |
| 110% | Hard limit + throttling |

---

## Application Guidelines

1. **Saga orchestration** - Each step has compensation
2. **Idempotency** - Steps can be retried safely
3. **Status updates** - WebSocket for real-time progress
4. **Webhooks** - Notify external systems
5. **Audit trail** - Log every lifecycle transition

---

## Related Patterns

Load these from pattern registry:
- `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `lifecycle`
- **data-archival:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-archival`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS tenant lifecycle management {date}"
- Search: "tenant onboarding automation patterns {date}"
- Search: "SaaS churn prevention strategies {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should tenant onboarding be implemented as a saga? | Yes, use saga pattern with compensation for each provisioning step | Enables reliable rollback on failure; each step (schema, auth, billing) has clear compensation action |
| How should tier upgrades be processed? | Apply expanded limits immediately; bill prorated amount | Immediate value delivery improves customer experience; prorated billing is fair and expected |
| How should tier downgrades be handled? | Schedule for end of billing period with advance warning about feature loss | Prevents mid-period feature disruption; warnings reduce surprise and support burden |
| What grace period should be provided before tenant data deletion? | 30 days with option for data export | Balances GDPR compliance with recovery opportunity; export option ensures customer data ownership |
| How should usage-based billing be metered? | Real-time tracking in Redis with hourly aggregation to PostgreSQL and daily Stripe sync | Real-time enables quota enforcement; aggregation reduces write volume; daily sync balances accuracy with API limits |

---

## Integration with BAM Workflows

- `bmad-bam-tenant-onboarding-design` → Provisioning design
- `bmad-bam-tenant-offboarding-design` → Offboarding design

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design tenant provisioning sagas
- `bmad-bam-tenant-offboarding-design` - Plan GDPR-compliant offboarding
- `bmad-bam-tenant-tier-migration` - Implement upgrade/downgrade flows
- `bmad-bam-tenant-billing-integration` - Configure billing integration
- `bmad-bam-tenant-data-export` - Design data export for offboarding
