# BAM Federation Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing partner ecosystems, white-label architectures, reseller hierarchies, cross-tenant federation, or agent-to-agent communication; or when user mentions federation, A2A, partner integration, white-labeling, or cross-system interop.

**Integrates with:** Winston (Architect), Nova (AI Runtime), Chad (PM), Atlas (Platform), Business Development, reseller-bam extension, L17 A2A Interoperability layer

---

## Core Concepts

### Federation Architecture Overview

Federation enables controlled collaboration across tenant boundaries, partner ecosystems, and agent systems while maintaining isolation guarantees.

```
┌─────────────────────────────────────────────────────────────────┐
│                    Federation Architecture                       │
│                                                                  │
│  ┌────────────────┐    ┌────────────────┐    ┌────────────────┐ │
│  │   Platform     │    │   Federation   │    │   External     │ │
│  │   Operator     │◄──►│     Layer      │◄──►│   Partners     │ │
│  └───────┬────────┘    └───────┬────────┘    └────────────────┘ │
│          │                     │                                 │
│  ┌───────▼────────────────────▼────────────────────────────┐    │
│  │                    Tenant Hierarchy                      │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐ │    │
│  │  │Partner A │  │Partner B │  │Reseller  │  │Direct    │ │    │
│  │  │(Elite)   │  │(Gold)    │  │Partner   │  │Tenant    │ │    │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────┘ │    │
│  │       │             │             │                      │    │
│  │  ┌────▼────┐   ┌────▼────┐   ┌────▼────┐                │    │
│  │  │Sub-     │   │Sub-     │   │Sub-     │                │    │
│  │  │Tenants  │   │Tenants  │   │Tenants  │                │    │
│  │  └─────────┘   └─────────┘   └─────────┘                │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Partner Types

| Partner Type | Relationship | Revenue Model | Multi-Tenant Impact |
|--------------|--------------|---------------|---------------------|
| Integration Partner | Build integrations | Rev share on app store | App-scoped tenant access |
| Referral Partner | Refer customers | Referral fee | Attribution tracking |
| Reseller Partner | Sell your product | Reseller margin | Hierarchical tenancy |
| Technology Partner | Platform integration | Strategic/no fee | API-level federation |
| Implementation Partner | Deploy for customers | Service fees | Delegated access |
| White-Label Partner | Branded version | License + margin | Isolated branding |

### Federation Trust Levels

| Level | Mode | Trust | Use Case | Security |
|-------|------|-------|----------|----------|
| L0 | None | Zero | Regulated data | No federation |
| L1 | Internal | High | Same tenant agents | Standard auth |
| L2 | Partner | Medium | Pre-approved external | mTLS + allow list |
| L3 | Public | Low | Open marketplace | Full verification |

---

## BAM Conventions

### Partner Tenant Hierarchy Model

| Model | Description | Multi-Tenant Impact | Database Pattern |
|-------|-------------|---------------------|------------------|
| Direct | Partner manages own tenants | Partner as tenant admin | RLS with partner_id |
| Reseller | Partner's customers are sub-tenants | Hierarchical tenancy | Schema or DB per partner |
| White-Label | Partner's branded version | Isolated branding per partner | Database per partner |
| Managed Service | Partner operates on behalf of customer | Access delegation | RLS with delegation |

### Federation Token Structure

```yaml
federation_token:
  header:
    alg: "RS256"
    typ: "JWT"
    kid: "federation-key-001"
  
  payload:
    iss: "federation.platform.com"
    sub: "agent-uuid"
    aud: "target-agent-uuid"
    tenant_id: "source-tenant-uuid"
    target_tenant_id: "target-tenant-uuid"
    federation_mode: "partner"
    capabilities: ["data_retrieval", "action_execution"]
    exp: 1714060800  # Short TTL (5 minutes)
    iat: 1714060500
    jti: "unique-request-id"
  
  signature: "..."
```

### Cross-Tenant Data Boundaries

| Boundary Type | Data Flow | Isolation | Audit Requirement |
|---------------|-----------|-----------|-------------------|
| Strict | No cross-tenant | Complete | Standard |
| Federated | Explicit consent | Request-scoped | Enhanced |
| Aggregated | Anonymized only | Statistical | Compliance |
| Shared Services | Platform-wide | Service-scoped | Full trace |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Partner as tenant or separate? | Partner as special tenant type | Unified data model, consistent isolation |
| Hierarchical or flat tenancy? | Hierarchical for resellers | Model partner-customer relationship |
| White-label every partner? | Only elite tier | Maintenance overhead, deployment complexity |
| Revenue share calculation? | Real-time or monthly? | Monthly simpler, real-time better UX |
| Partner API limits? | Tier-based limits | Encourage tier upgrades, prevent abuse |
| Federation mode default? | Internal (L1) | Least privilege, explicit escalation |
| Cross-tenant data sharing? | Opt-in with audit | Compliance requirement, data sovereignty |
| Agent card caching? | Short TTL (5 min) | Permissions change, prevent stale grants |

---

## §partner-ecosystem

### Pattern: Partner Ecosystem Integration

Partner ecosystem architecture enables third parties to extend, resell, or integrate with the platform while maintaining multi-tenant isolation.

#### Partner Hierarchy Structure

```
┌─────────────────────────────────────────────────┐
│           Partner Ecosystem Hierarchy            │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │           Platform Operator               │   │
│  │  (You - the SaaS provider)                │   │
│  └────────────────────┬─────────────────────┘   │
│                       │                          │
│     ┌─────────────────┼─────────────────┐       │
│     │                 │                 │       │
│  ┌──▼───┐         ┌───▼──┐         ┌───▼──┐    │
│  │Partner│         │Partner│         │Partner│   │
│  │Tier 1 │         │Tier 2 │         │Tier 3 │   │
│  │(Elite)│         │(Gold) │         │(Silver)│  │
│  └──┬────┘         └───┬──┘         └───┬──┘    │
│     │                  │                │       │
│     └──────────────────┴────────────────┘       │
│                        │                        │
│              ┌─────────▼─────────┐              │
│              │   End Customers   │              │
│              │   (Tenants)       │              │
│              └───────────────────┘              │
└─────────────────────────────────────────────────┘
```

#### Partner Portal Features by Tier

| Feature | Silver | Gold | Elite |
|---------|--------|------|-------|
| Customer Management | View only | Manage | Full control |
| Revenue Dashboard | Basic | Detailed | Real-time |
| API Access | Standard | Enhanced | Unlimited |
| Support Level | Community | Priority | Dedicated |
| Commission Rate | 10% | 20% | 30% |
| Marketing Support | None | Co-marketing | Custom campaigns |
| White-Label | No | Partial | Full |
| Sub-tenant Creation | No | Limited | Unlimited |

#### Integration Marketplace Architecture

| Component | Purpose | Tenant Scope | Data Access |
|-----------|---------|--------------|-------------|
| App Listing | Discover integrations | Platform-wide | Metadata only |
| Installation | Add to tenant | Per-tenant | Scoped grant |
| Configuration | Set up integration | Per-tenant | Config storage |
| Data Exchange | Integration runtime | Tenant-scoped | Explicit consent |
| Billing | Track usage | Per-tenant + partner | Metered events |

#### Partner Revenue Models

| Model | Description | Multi-Tenant Consideration | Tracking |
|-------|-------------|---------------------------|----------|
| Revenue Share | % of customer spend | Track per-tenant attribution | Subscription events |
| Flat Fee | Fixed per customer | Tenant-partner mapping | Monthly reconciliation |
| Tiered Commission | Higher % at volume | Partner-level aggregation | Threshold triggers |
| Marketplace Cut | % of app revenue | App install tracking | Usage metering |

---

## §white-labeling

### Pattern: White-Label Tenant Configuration

White-labeling enables partners to present the platform as their own branded product while sharing underlying infrastructure.

#### White-Label Isolation Levels

| Level | Branding | Domain | Database | Infrastructure |
|-------|----------|--------|----------|----------------|
| Basic | Logo/colors | Subdomain | Shared (RLS) | Shared |
| Standard | Full UI | Custom CNAME | Schema per partner | Shared |
| Premium | Complete rebrand | Own domain | Database per partner | Dedicated compute |
| Enterprise | Custom features | Own domain | Database per partner | Isolated cluster |

#### White-Label Configuration Schema

```yaml
white_label_config:
  partner_id: "partner-uuid"
  branding:
    logo_url: "https://partner.com/logo.png"
    favicon_url: "https://partner.com/favicon.ico"
    primary_color: "#1a73e8"
    secondary_color: "#34a853"
    font_family: "Inter"
  
  domain:
    type: "custom"  # subdomain | cname | custom
    hostname: "app.partner.com"
    ssl_certificate: "managed"  # managed | custom
  
  features:
    hide_powered_by: true
    custom_login_page: true
    custom_email_templates: true
    custom_documentation: false
  
  isolation:
    level: "standard"  # basic | standard | premium | enterprise
    database_mode: "schema"  # shared | schema | dedicated
```

#### Multi-Tenant Branding Resolution

| Request | Resolution Order | Fallback |
|---------|------------------|----------|
| Domain | DNS → Partner Config → Default | Platform branding |
| Subdomain | Subdomain mapping → Partner lookup | Platform branding |
| API Key | Key → Partner → Tenant → Branding | Platform defaults |
| Session | Session tenant → Partner → Branding | Platform defaults |

---

## §reseller

### Pattern: Reseller and Sub-Tenant Architecture

Reseller patterns enable partners to create and manage their own customer tenants while maintaining platform-wide governance.

#### Reseller Tenant Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    Reseller Hierarchy                        │
│                                                              │
│  Platform Tenant Table                                       │
│  ┌─────────────────────────────────────────────────────────┐│
│  │ tenant_id │ parent_id │ type      │ reseller_id │ tier  ││
│  ├───────────┼───────────┼───────────┼─────────────┼───────┤│
│  │ platform  │ NULL      │ platform  │ NULL        │ -     ││
│  │ partner-a │ platform  │ reseller  │ NULL        │ elite ││
│  │ cust-1    │ partner-a │ customer  │ partner-a   │ pro   ││
│  │ cust-2    │ partner-a │ customer  │ partner-a   │ basic ││
│  │ partner-b │ platform  │ reseller  │ NULL        │ gold  ││
│  │ cust-3    │ partner-b │ customer  │ partner-b   │ pro   ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

#### Reseller Permission Matrix

| Permission | Platform | Reseller | Sub-Tenant |
|------------|----------|----------|------------|
| Create tenants | All | Own hierarchy | None |
| View tenants | All | Own hierarchy | Self only |
| Billing access | All | Own customers | Self only |
| Feature flags | All | Delegated | Inherited |
| API keys | All | Own scope | Own scope |
| Audit logs | All | Own hierarchy | Self only |

#### Revenue Attribution Flow

```
Customer Payment ($100)
        │
        ▼
┌───────────────────┐
│ Platform Receives │
│     $100          │
└────────┬──────────┘
         │
    ┌────▼────┐
    │ Split   │
    └────┬────┘
         │
    ┌────┴────────────┐
    │                 │
┌───▼───┐       ┌─────▼─────┐
│Platform│       │  Reseller │
│  $70   │       │   $30     │
└────────┘       │(Commission)│
                 └───────────┘
```

#### Sub-Tenant Lifecycle Management

| Event | Platform Action | Reseller Visibility | Sub-Tenant Visibility |
|-------|-----------------|--------------------|-----------------------|
| Creation | Provision tenant | Real-time | Welcome flow |
| Upgrade | Apply tier change | Dashboard update | Feature unlock |
| Downgrade | Adjust limits | Dashboard update | Feature restriction |
| Suspension | Disable access | Alert + reason | Access blocked |
| Deletion | Archive data | Confirmation | N/A |

---

## §tier-h-federation

### Pattern: Tier-H Cross-System Agent Federation

Tier-H ("Hyper-scale") enables agent federation across tenant and system boundaries with A2A (Agent-to-Agent) protocol support.

#### Tier-H Operating Model

```
Tenant A Agent ←→ Federation Layer ←→ Tenant B Agent
       │                │                    │
       └────────────────┴────────────────────┘
                   Tier-H Federation
              (Cross-boundary agent comms)
```

#### Federation Modes

| Mode | Trust Level | Use Case | Rate Limit Default |
|------|-------------|----------|-------------------|
| Internal | High | Same tenant, different agents | 1000/min |
| Partner | Medium | Pre-approved external tenants | 100/min |
| Public | Low | Open agent marketplace | 10/min |

#### Agent Card Schema (A2A Protocol)

```yaml
agent_card:
  id: "agent-uuid"
  tenant_id: "tenant-uuid"
  name: "Data Analysis Agent"
  version: "1.2.0"
  
  capabilities:
    - action_type: "data_retrieval"
      confidence_min: 0.8
      rate_limit: 50_per_minute
    - action_type: "action_execution"
      confidence_min: 0.9
      requires_approval: true
  
  federation:
    mode: "partner"
    allowed_tenants: ["tenant-b", "tenant-c"]
    blocked_tenants: []
    rate_limit: 100_per_minute
    max_payload_size: "10MB"
  
  proof_requirements:
    require_certificate: true
    verify_chain: true
    min_key_strength: 2048
  
  metadata:
    created_at: "2026-04-25T00:00:00Z"
    updated_at: "2026-04-25T00:00:00Z"
    contact: "agents@tenant.com"
```

#### Cross-Tenant Action Contract

| Field | Source | Validation | Required |
|-------|--------|------------|----------|
| tenant_id | Agent A's tenant | Must match caller | Yes |
| target_tenant_id | Agent B's tenant | Must be in allowed list | Yes |
| federation_token | Federation layer | JWT with short TTL | Yes |
| action_contract | Agent A | Full 8-field contract | Yes |
| correlation_id | Request | UUID v4 | Yes |
| trace_context | Distributed trace | W3C Trace Context | Yes |

#### Federation Security Layers

| Layer | Mechanism | Purpose | Validation |
|-------|-----------|---------|------------|
| Transport | Mutual TLS | Identity verification | Certificate chain |
| Authentication | JWT + JWKS | Token validation | Signature + claims |
| Authorization | RBAC + tenant scope | Permission check | Policy evaluation |
| Rate Limiting | Token bucket | Abuse prevention | Per-tenant quota |
| Audit | Distributed trace | Compliance trail | Immutable log |

---

## §cross-tenant

### Pattern: Cross-Tenant Data Federation

Cross-tenant federation enables controlled data sharing between tenants while maintaining isolation boundaries.

#### Data Sharing Models

| Model | Data Flow | Consent | Audit Level |
|-------|-----------|---------|-------------|
| None | No sharing | N/A | Standard |
| Request-based | Per-request approval | Explicit | Full |
| Standing grant | Pre-approved scope | Time-limited | Enhanced |
| Aggregated | Statistical only | Anonymized | Compliance |

#### Federation Request Flow

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│  Tenant A   │     │  Federation     │     │  Tenant B   │
│  (Requester)│     │     Layer       │     │  (Provider) │
└──────┬──────┘     └────────┬────────┘     └──────┬──────┘
       │                     │                     │
       │ 1. Request          │                     │
       │────────────────────►│                     │
       │                     │                     │
       │                     │ 2. Validate Token   │
       │                     │ 3. Check Allow List │
       │                     │ 4. Apply Rate Limit │
       │                     │                     │
       │                     │ 5. Forward Request  │
       │                     │────────────────────►│
       │                     │                     │
       │                     │                     │ 6. Verify Scope
       │                     │                     │ 7. Execute Query
       │                     │                     │ 8. Filter Response
       │                     │                     │
       │                     │ 9. Return Response  │
       │                     │◄────────────────────│
       │                     │                     │
       │ 10. Deliver Result  │ 11. Log Audit Event │
       │◄────────────────────│                     │
       │                     │                     │
```

#### Cross-Tenant Query Restrictions

| Query Type | Allowed | Restrictions | Example |
|------------|---------|--------------|---------|
| Read own data | Always | Tenant filter | SELECT * WHERE tenant_id = :own |
| Read federated | With grant | Explicit scope | Shared dashboard data |
| Write cross-tenant | Never | Prohibited | N/A |
| Aggregate cross-tenant | With consent | Anonymized | Industry benchmarks |

---

## Quality Gates

### Federation Quality Gate Checklist (QG-FED)

| Check | Category | Critical | Verification |
|-------|----------|----------|--------------|
| Mutual TLS enabled | Security | Yes | Certificate validation |
| JWT validation implemented | Security | Yes | Token verification |
| Rate limiting configured | Security | Yes | Quota enforcement |
| Audit logging enabled | Compliance | Yes | Log inspection |
| Agent card versioning | Operations | No | Schema validation |
| Federation allow list | Security | Yes | Config review |
| Cross-tenant query filter | Security | Yes | Query analysis |
| Token TTL < 5 minutes | Security | Yes | Token inspection |

---

## Web Research

| Topic | Query |
|-------|-------|
| Agent-to-Agent Protocols | "A2A agent interoperability protocol specification {date}" |
| Multi-tenant Federation | "multi-tenant AI federation patterns {date}" |
| White-Label SaaS | "white-label SaaS architecture multi-tenant {date}" |
| Partner Ecosystem | "SaaS partner ecosystem architecture {date}" |
| Reseller Models | "multi-tenant reseller model patterns {date}" |
| Cross-Tenant Security | "cross-tenant data sharing security patterns {date}" |
| mTLS Federation | "mutual TLS microservices federation {date}" |
| Agent Cards | "A2A agent card specification {date}" |

---

## Related Patterns

> **Note:** Use the `web_queries` column from pattern registry CSVs for current best practices searches.

Load decision criteria and web search queries from pattern registry:

- **Federation patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `federation-*`
- **Partner patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `partner-*`
- **Marketplace patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `marketplace-*`
- **Tenant models:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Related Workflows

- `bmad-bam-partner-integration-framework` - Design partner portal
- `bmad-bam-tenant-white-labeling-design` - Enable white-label for partners
- `bmad-bam-partner-certification-workflow` - Design reseller tenancy
- `bmad-bam-agent-runtime-architecture` - Runtime design
- `bmad-bam-action-contract-design` - Contract requirements
- `bmad-bam-ai-security-testing` - Security validation
- `bmad-bam-tenant-model-isolation` - Tenant isolation patterns

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {date} | BAM Consolidation | Initial consolidation from partner-ecosystem-patterns.md and tier-h-federation-patterns.md |
