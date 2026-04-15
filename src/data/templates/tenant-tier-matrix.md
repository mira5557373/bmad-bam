---
name: Tenant Tier Matrix
description: Template for documenting feature access and limits by tenant tier
category: tenant
version: 1.0.0
type: "tenant"
---

## Purpose

Template for documenting feature access and limits by tenant tier

# Tenant Tier Matrix

## Feature Access by Tier

| Feature                    |     Free      |          Pro           |        Enterprise         |
| -------------------------- | :-----------: | :--------------------: | :-----------------------: |
| **AI Models**              |  GPT-4o-mini  |  GPT-4o, Claude Haiku  | All models (Sonnet, Opus) |
| **Token Budget (monthly)** |     100K      |           2M           |  Unlimited (pay-per-use)  |
| **Concurrent Agents**      |       1       |           5            |            50             |
| **RAG Documents**          |      100      |         10,000         |         Unlimited         |
| **Memory Retention**       |    7 days     |        90 days         |         Unlimited         |
| **MCP Tools**              | Built-in only | Built-in + marketplace |       All + custom        |
| **API Rate Limit**         |  60 req/min   |      600 req/min       |       6,000 req/min       |
| **Support**                |   Community   |      Email (48h)       |    Dedicated (4h SLA)     |
| **Data Residency**         |    US only    |         US/EU          |       Custom region       |
| **SSO**                    |      ❌       |           ❌           |      ✅ (SAML/OIDC)       |
| **Audit Logs**             |    7 days     |        90 days         |          1 year           |
| **Compute Isolation**      |    Shared     |         Shared         |    Dedicated namespace    |

## Usage Limits

| Metric              | Free  | Pro    | Enterprise |
| ------------------- | ----- | ------ | ---------- |
| Storage (GB)        | 1     | 50     | 500        |
| API calls/day       | 1,000 | 50,000 | Unlimited  |
| Concurrent sessions | 1     | 10     | 100        |
| Custom integrations | 0     | 5      | Unlimited  |

## Overage Pricing (Enterprise)

| Metric     | Unit       | Price |
| ---------- | ---------- | ----- |
| LLM tokens | 1M tokens  | $X    |
| Storage    | 1 GB/month | $X    |
| API calls  | 10K calls  | $X    |
| Compute    | 1 hour     | $X    |

---

## Verification Checklist

- [ ] All tenant tiers are defined with clear feature differentiation
- [ ] Usage limits are realistic and enforceable at runtime
- [ ] Overage pricing is competitive and clearly documented
- [ ] Feature access matrix covers all platform capabilities
- [ ] Rate limits are appropriate for each tier's target use case
- [ ] Upgrade/downgrade paths between tiers are clearly defined
- [ ] Multi-tenant isolation requirements are specified per tier
- [ ] Enterprise tier includes all compliance-related features
- [ ] Free tier provides enough value for user acquisition
- [ ] Data residency options align with tier pricing strategy
- [ ] Audit log retention periods meet compliance requirements
- [ ] Compute isolation levels match tier SLA commitments

---

## Web Research Queries

Before finalizing this document, verify current best practices:

- "tenant lifecycle SaaS patterns {date}"
- "SaaS tier pricing strategies multi-tenant {date}"
- "feature gating best practices enterprise SaaS {date}"

Incorporate relevant findings. _Source: [URL]_

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| {{version}} | {{date}} | {{author}} | Initial template creation |
