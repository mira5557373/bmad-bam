# BAM Governance Patterns Guide

**When to load:** During access control design, policy management setup, approval workflow implementation, or when establishing platform governance for multi-tenant SaaS.

**Integrates with:** Winston (Architect), Platform administrators, Security teams.

---

## Core Concepts

### Platform Governance Models

Multi-tenant platforms require clear governance structures that balance platform control with tenant autonomy.

| Model | Description | Best For |
|-------|-------------|----------|
| Centralized | Platform controls all policies | Regulated industries, early stage |
| Federated | Tenants manage within boundaries | Enterprise tenants, flexibility |
| Hybrid | Platform baseline + tenant override | Most SaaS platforms |

### Tenant Admin Delegation Matrix

| Capability | Platform Admin | Tenant Admin | Tenant User |
|------------|---------------|--------------|-------------|
| Create tenant | Yes | No | No |
| Manage tenant settings | Yes | Yes (own) | No |
| Configure SSO/IdP | Yes | Yes (own) | No |
| Manage users | Yes | Yes (own tenant) | No |
| Access audit logs | All tenants | Own tenant | No |
| Set quotas | Yes | No | No |
| Upgrade tier | Yes | Request | No |

### Policy Hierarchy

Policies cascade from platform to user level, with inheritance and override rules.

```
Platform Policies (enforced for all)
    │
    ├── Tier Policies (Free, Pro, Enterprise)
    │       │
    │       └── Tenant Policies (within tier limits)
    │               │
    │               └── User Policies (within tenant limits)
```

| Policy Level | Examples | Override Allowed |
|--------------|----------|-----------------|
| Platform | Security requirements, data retention minimums | No |
| Tier | Feature access, resource limits, SLA | No |
| Tenant | Branding, default settings, integrations | Yes (within tier) |
| User | Preferences, notification settings | Yes (within tenant) |

### Approval Workflows

High-impact actions require structured approval processes.

| Action | Approval Required | Approvers |
|--------|------------------|-----------|
| Tenant creation | Platform policy | Auto or Platform Admin |
| Tier upgrade | Payment verification | Billing system |
| Data export | Tenant admin | Tenant Admin |
| API key creation | Depends on scope | Tenant Admin |
| Cross-tenant access | Platform + Both tenants | All parties |

### Access Control Architecture

| Component | Governance Role | Implementation |
|-----------|-----------------|----------------|
| Identity Provider | Authenticate users | Platform IdP or tenant SAML/OIDC |
| Authorization Service | Enforce permissions | Centralized policy engine |
| Audit Service | Track all actions | Immutable audit log |
| Policy Engine | Evaluate rules | OPA/Cedar/custom rules |

---

## Application Guidelines

When implementing governance in a multi-tenant context:

1. **Start restrictive, relax later** - Begin with platform control, delegate as tenants mature
2. **Implement least privilege** - Users get minimum permissions needed
3. **Audit everything** - All admin actions must be logged with context
4. **Enable tenant self-service** - Reduce platform admin burden with guardrails
5. **Document delegation clearly** - Tenants must understand their responsibilities
6. **Plan for emergency access** - Break-glass procedures with full audit

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should tenants manage their own SSO? | Yes for Pro+, with platform validation | Enterprise expects IdP integration |
| How much should tenants customize? | Branding and settings, not core behavior | Maintain platform consistency |
| Who approves tenant data exports? | Tenant admin with audit trail | Tenant owns their data |
| How to handle policy conflicts? | More restrictive wins, platform overrides tenant | Security-first approach |
| What actions need MFA? | All admin actions, sensitive operations | Critical operations need elevation |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Governance patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `governance-*`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS governance patterns {date}"
- Search: "tenant admin delegation best practices {date}"
- Search: "platform policy management architecture {date}"

---

## Related Workflows

- `bmad-bam-rbac-abac-design` - Design access control structure
- `bmad-bam-stakeholder-discovery` - Identify governance stakeholders
- `bmad-bam-tenant-offboarding-design` - Governance for tenant exit
- `bmad-bam-tenant-aware-observability` - Monitor governance compliance
