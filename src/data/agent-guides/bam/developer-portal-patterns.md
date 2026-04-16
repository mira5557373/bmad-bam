# BAM Developer Portal Patterns Guide

**When to load:** During developer portal design, API marketplace creation, SDK distribution, or when implementing developer experience for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), James (Dev), Emma (UX), tech-writer-bam extension.

---

## Core Concepts

### Developer Portal Components

| Component | Purpose | Multi-Tenant Adaptation |
|-----------|---------|------------------------|
| API Reference | Endpoint documentation | Tier-gated content |
| Getting Started | Quick start guides | Tenant-specific onboarding |
| SDKs | Client libraries | Tenant configuration built-in |
| Sandbox | Test environment | Per-tenant isolated sandbox |
| Console | API key management | Tenant-scoped credentials |
| Status Page | API health | Per-tenant SLA dashboards |

### Portal Architecture

```
┌─────────────────────────────────────────────────┐
│              Developer Portal                    │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │   Docs   │  │ Console  │  │  Status  │      │
│  │ (Public) │  │(Auth Req)│  │ (Public) │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │             │             │
│       └──────┬──────┴──────┬──────┘             │
│              │             │                    │
│       ┌──────▼──────┐ ┌────▼─────┐             │
│       │ Identity &  │ │ Tenant   │             │
│       │   Access    │ │ Context  │             │
│       └─────────────┘ └──────────┘             │
└─────────────────────────────────────────────────┘
```

### Portal Tiers and Features

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| API Documentation | Basic | Full | Full + Private |
| Sandbox Environments | Shared | Dedicated | Custom |
| Rate Limits Dashboard | View only | Detailed | Custom alerts |
| API Keys | 2 keys | 10 keys | Unlimited |
| SSO Integration | No | Yes | Yes + SCIM |
| Support Access | Community | Ticket | Dedicated |

### Self-Service Capabilities

| Capability | Description | Tier Availability |
|------------|-------------|-------------------|
| API Key Generation | Create/rotate keys | All tiers |
| Usage Analytics | View API usage | Pro+ |
| Webhook Management | Configure callbacks | Pro+ |
| Team Management | Add team members | Pro+ |
| Custom Domains | Branded API URLs | Enterprise |
| IP Allowlisting | Restrict access | Enterprise |

### SDK Distribution Strategy

| Approach | Pros | Cons |
|----------|------|------|
| Public Package Manager | Easy discovery | Limited customization |
| Authenticated Download | Control access | Friction for developers |
| Generated from OpenAPI | Always current | Quality varies |
| Hand-Written | Best quality | Maintenance overhead |

### Developer Onboarding Flow

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Sign Up │───►│ Verify  │───►│ Create  │───►│  First  │
│         │    │ Email   │    │ API Key │    │API Call │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │
  < 1 min       < 5 min        < 2 min       < 10 min
                                          
Target: First API call within 15 minutes
```

---

## Application Guidelines

When implementing developer portal in a multi-tenant context:

1. **Optimize for time-to-first-call** - Minimize friction to first successful API call
2. **Provide tenant-scoped sandboxes** - Isolated test environments per developer
3. **Generate SDKs from OpenAPI** - Keep SDKs in sync with API changes
4. **Show tier-appropriate content** - Upsell higher tiers naturally
5. **Enable self-service operations** - Reduce support load
6. **Track developer journey** - Measure onboarding funnel conversion

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Public or private portal? | Hybrid - public docs, private console | Balance discoverability with security |
| Build or buy portal? | Buy + customize for speed | Portal is not core differentiator |
| SDK strategy? | Generate from OpenAPI + hand-tune | Balance currency with quality |
| How to handle enterprise customization? | Private portal sections | Enterprise-specific documentation |
| Sandbox data approach? | Synthetic data, tenant-isolated | Prevent real data exposure |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Developer experience patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `dx-*`
- **API patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `api-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "developer portal multi-tenant SaaS {date}"
- Search: "API developer experience best practices {date}"
- Search: "SDK distribution strategies {date}"

---

## Related Workflows

- `bmad-bam-tenant-portal-design` - Design portal architecture
- `bmad-bam-api-documentation-automation` - Generate API docs
- `bmad-bam-pricing-tier-configuration` - Define tier features
