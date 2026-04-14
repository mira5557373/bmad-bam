# Tenant Admin Guide - BAM Extension

**When to load:** When designing tenant self-service portals, admin dashboards, or when user mentions tenant administration, user management, tenant configuration, or self-service features.
**Integrates with:** UX Designer (bmad-agent-ux-designer), PM (bmad-agent-pm), Dev (bmad-agent-dev)

This guide provides BAM-specific context for designing and implementing features that tenant administrators use to manage their organization's instance within a multi-tenant platform.

---

## Role Context

As a tenant administrator on a BAM-based platform, you focus on:
- Managing users and roles within your organization's tenant
- Configuring SSO and authentication settings
- Monitoring usage and managing billing
- Ensuring compliance with organizational policies
- Self-service administration without platform support dependency

---

## Core Concepts

### Tenant Administration Model

Tenant administration enables organization admins to manage their instance without platform operator involvement. This includes user management, role assignment, configuration, billing visibility, and data governance. Effective tenant admin capabilities reduce support load and improve tenant satisfaction through self-service empowerment.

### Tenant Admin vs Platform Admin

| Aspect | Tenant Admin | Platform Admin |
|--------|--------------|----------------|
| Scope | Single tenant organization | Entire platform |
| User Management | Tenant users only | All users, all tenants |
| Configuration | Tenant-specific settings | Platform-wide settings |
| Billing | View usage, manage payment | Set pricing, manage all billing |
| Data Access | Own tenant data only | Cross-tenant (with audit) |
| Compliance | Tenant compliance settings | Platform compliance |

### Tenant Admin Personas

| Persona | Role | Primary Goals | Key Capabilities Needed |
|---------|------|---------------|------------------------|
| **IT Admin** | Technical lead | Security, SSO, integrations | Identity config, API keys, audit logs |
| **Billing Admin** | Finance/ops | Cost control, invoicing | Usage dashboards, payment methods, invoices |
| **Team Admin** | Department lead | Team productivity | User invites, role assignment, team settings |
| **Compliance Admin** | Legal/security | Data governance | Data export, retention settings, audit trails |

---

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| User invitation flow | Self-service with domain verification | Reduces support tickets; domain verification prevents unauthorized access |
| Role management | Pre-defined roles with custom option for Enterprise | Balance simplicity with flexibility; custom roles add complexity |
| SSO configuration | Self-service SAML/OIDC setup with validation | Enterprise requirement; reduces platform admin dependency |
| API key management | Tenant-scoped with rotation and audit | Security best practice; tenant controls their credentials |
| Usage visibility | Real-time dashboard with export | Transparency builds trust; export enables internal reporting |
| Data export | Self-service with rate limiting | GDPR requirement; rate limiting prevents abuse |

---

## Tenant Admin Capabilities Matrix

### By Tier

| Capability | Free Tier | Pro Tier | Enterprise Tier |
|------------|-----------|----------|-----------------|
| User management | Up to 3 users | Up to 25 users | Unlimited |
| Role assignment | Basic roles | Standard roles | Custom roles |
| SSO/SAML | Not available | Available | Required |
| API key management | 1 key | 5 keys | Unlimited |
| Audit log access | 7 days | 30 days | 1 year + export |
| Usage dashboard | Basic metrics | Full metrics | Custom + API |
| Data export | Manual request | Self-service | Automated + API |
| Branding/white-label | Not available | Logo only | Full white-label |
| Support access | Community | Email | Dedicated + SLA |

### By Admin Role

| Capability | IT Admin | Billing Admin | Team Admin | Compliance Admin |
|------------|----------|---------------|------------|------------------|
| User invite/remove | Full | View only | Team only | View only |
| Role assignment | Full | None | Team only | View only |
| SSO configuration | Full | None | None | View only |
| API key management | Full | None | None | View only |
| Billing/payment | View only | Full | None | View only |
| Usage reports | Full | Full | Team only | Full |
| Audit logs | Full | Billing only | None | Full |
| Data export | Request | None | None | Full |
| Compliance settings | Configure | None | None | Full |

---

## Application Guidelines

### Designing Tenant Admin Portals

When designing tenant admin interfaces:

1. **Scope visibility strictly** - Admin sees only their tenant's data, never cross-tenant
2. **Audit all admin actions** - Every configuration change logged with actor, timestamp, before/after
3. **Implement confirmation flows** - Destructive actions (user removal, data deletion) require confirmation
4. **Provide undo capabilities** - Where possible, allow reversal of recent changes
5. **Show impact previews** - Before applying changes, show what will be affected
6. **Design for delegation** - Allow primary admin to delegate specific capabilities to others

### User Management Implementation

| Feature | Implementation Pattern | Security Consideration |
|---------|----------------------|------------------------|
| User invite | Email with secure token, expiration | Token expires in 24-48 hours |
| User removal | Soft delete, data reassignment | Preserve audit trail, reassign ownership |
| Role change | Immediate effect, notification | Log who changed, when, from/to |
| Password reset | Admin-initiated, user completes | Never expose passwords to admin |
| Session management | View active sessions, force logout | Allow terminating compromised sessions |
| MFA enforcement | Tenant-level policy | Admin cannot bypass own MFA |

### SSO/Identity Configuration

1. **SAML Setup Flow:**
   - Upload IdP metadata or manual configuration
   - Download SP metadata for IdP configuration
   - Test connection before enforcing
   - Provide bypass for admin lockout recovery

2. **OIDC Setup Flow:**
   - Configure client ID, secret, discovery URL
   - Map claims to user attributes
   - Configure group-to-role mapping
   - Test with admin account first

3. **Domain Verification:**
   - DNS TXT record verification
   - Prevents unauthorized domain claims
   - Auto-provision users from verified domains

### API Key Management

| Aspect | Pattern | Rationale |
|--------|---------|-----------|
| Key generation | Cryptographically secure, prefix for identification | Security; easy identification of key source |
| Key display | Show once, then masked | Security; prevent exposure |
| Key rotation | Generate new before revoking old | Zero-downtime rotation |
| Key scoping | Permissions per key | Principle of least privilege |
| Key audit | Log all key usage | Security monitoring |
| Key expiration | Optional expiration dates | Security best practice |

### Usage and Billing Visibility

Tenant admins need clear visibility into:

1. **Current Usage:**
   - Real-time usage metrics by category
   - Comparison to tier limits
   - Projection to end of billing period

2. **Historical Usage:**
   - Usage trends over time
   - Per-user usage breakdown
   - Feature-specific usage

3. **Cost Management:**
   - Current invoice projection
   - Cost by category/feature
   - Budget alerts configuration

4. **Billing Administration:**
   - Payment method management
   - Invoice history and download
   - Billing contact management

---

## Tenant Admin Workflows

### Onboarding New Admin

```
Platform invites tenant admin
    │
    ├── Admin receives secure invite link
    │
    ├── Admin creates account (or SSO)
    │
    ├── Admin verifies email/domain
    │
    ├── Admin completes setup wizard
    │   ├── Company profile
    │   ├── Initial user invites
    │   ├── Basic configuration
    │   └── Billing setup (if required)
    │
    └── Admin dashboard unlocked
```

### User Lifecycle Management

```
Invite User
    │
    ├── Enter email, select role
    │
    ├── Check domain policy (auto-approve or manual)
    │
    ├── Send invitation email
    │
    ├── User accepts, creates account
    │
    ├── User active in tenant
    │
    ├── [Optional] Role changes over time
    │
    ├── User offboarding
    │   ├── Reassign owned resources
    │   ├── Revoke access
    │   └── Retain audit history
    │
    └── User removed (soft delete)
```

### Data Export Request

```
Admin requests data export
    │
    ├── Select export scope
    │   ├── All tenant data
    │   ├── Specific date range
    │   └── Specific data categories
    │
    ├── Verify admin identity (MFA)
    │
    ├── Queue export job
    │
    ├── Process export (async)
    │
    ├── Notify admin when ready
    │
    └── Secure download (time-limited link)
```

---

## Security Considerations

### Admin Access Security

| Control | Implementation | Purpose |
|---------|---------------|---------|
| MFA requirement | Enforce for all admin roles | Prevent credential compromise |
| Session timeout | Shorter timeout for admin sessions | Reduce exposure window |
| IP allowlisting | Optional Enterprise feature | Restrict admin access locations |
| Admin audit log | Immutable log of all admin actions | Accountability and forensics |
| Separation of duties | Different admins for different functions | Prevent single point of compromise |

### Preventing Admin Abuse

1. **Rate limiting** - Prevent bulk operations that could be destructive
2. **Confirmation flows** - Require explicit confirmation for high-impact actions
3. **Notification to affected users** - Users notified of changes affecting them
4. **Platform oversight** - Platform can audit tenant admin actions if needed
5. **Recovery procedures** - Documented process for admin lockout recovery

### Data Access Boundaries

- Tenant admin NEVER sees other tenant data
- Tenant admin CANNOT access platform admin functions
- Tenant admin actions logged with tenant context
- Cross-tenant queries technically impossible via admin interface

---

## Tenant Admin Portal UX Patterns

### Dashboard Design

| Section | Content | Update Frequency |
|---------|---------|-----------------|
| Overview | Key metrics, alerts, quick actions | Real-time |
| Users | User count, recent activity, pending invites | Real-time |
| Usage | Current usage vs limits, trends | Near real-time |
| Billing | Current invoice, payment status | Daily |
| Security | Recent auth events, policy status | Real-time |
| Integrations | Connected apps, API key status | On-demand |

### Navigation Structure

```
Tenant Admin Portal
├── Dashboard (overview)
├── Users & Teams
│   ├── All Users
│   ├── Teams/Groups
│   ├── Pending Invites
│   └── Roles & Permissions
├── Security
│   ├── SSO/Authentication
│   ├── API Keys
│   ├── Audit Log
│   └── Security Policies
├── Billing
│   ├── Current Usage
│   ├── Invoices
│   ├── Payment Methods
│   └── Plan & Limits
├── Settings
│   ├── Organization Profile
│   ├── Preferences
│   ├── Integrations
│   └── Data Management
└── Support
    ├── Documentation
    ├── Contact Support
    └── Feature Requests
```

---

## Testing Tenant Admin Features

### Test Scenarios

| Scenario | Test Case | Expected Result |
|----------|-----------|-----------------|
| User invite | Invite user from verified domain | User receives invite, can join |
| User invite | Invite user from unverified domain | Blocked or requires approval |
| Role change | Change user from viewer to admin | Immediate permission update |
| SSO setup | Configure valid SAML | SSO login works |
| SSO setup | Configure invalid SAML | Clear error, prevents save |
| API key | Generate and use key | Key works for API calls |
| API key | Revoke key | Key immediately stops working |
| Data export | Request full export | Export completes, download works |
| Audit log | View admin actions | All actions visible with details |

### Multi-Tenant Isolation Tests

- [ ] Admin cannot see other tenant users
- [ ] Admin cannot access other tenant settings
- [ ] Admin API keys only work for own tenant
- [ ] Admin audit log shows only own tenant
- [ ] Admin usage metrics show only own tenant
- [ ] Admin data export contains only own tenant data

---

## Related Workflows

- `bmad-bam-tenant-onboarding-design` - Design tenant onboarding including admin setup
- `bmad-bam-tenant-sso-integration` - Design SSO integration for tenant admins
- `bmad-bam-tenant-billing-integration` - Design billing visibility for admins
- `bmad-bam-tenant-self-service-upgrade` - Design self-service tier upgrades

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Admin patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `tenant-*`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS tenant admin portal design patterns {date}"
- Search: "multi-tenant user management self-service {date}"
- Search: "B2B SaaS admin dashboard UX {date}"
- Search: "tenant SSO self-service configuration {date}"
