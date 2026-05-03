# White-Labeling Operational Runbook

**Type:** Runbook (operational procedure, not a workflow)
**BAM v3:** Replaces former `bmad-bam-white-labeling` skill
**Scope:** Tenant-specific UI/branding/domain customization

---

## When to Use

Use this runbook when:
- Onboarding an enterprise tenant requiring custom branding
- Implementing white-label features for partner ecosystem
- Configuring custom domains for tenant cohorts
- Defining theme tokens for tenant-specific UI

---

## Prerequisites

- [ ] Master architecture document with white-label scope defined
- [ ] Tenant tier definitions (which tiers get white-labeling?)
- [ ] DNS / TLS infrastructure for custom domains (if applicable)
- [ ] Theme token system in design (if applicable)

---

## Pattern References

- `_bmad/bam/data/patterns/white-label.md` — White-label architecture patterns
- `_bmad/bam/data/patterns/customization.md` — Tenant-customization model
- `_bmad/bam/data/patterns/reseller-model.md` — Reseller / partner enablement

---

## The Six Levels of White-Labeling

Choose the level appropriate for your tenant tier:

### Level 1 — Brand Tokens (Default)
- Logo and color palette per tenant
- Tenant-specific application name in UI chrome
- Stored as theme tokens in tenant config

**Implementation effort:** Low. Requires only tenant config schema.

### Level 2 — Domain Theming
- Level 1 + custom typography, spacing, component variants
- Tenant-specific email templates with branding
- Tenant-specific PDF / invoice templates

**Implementation effort:** Medium. Requires theme token system + email/PDF template engine.

### Level 3 — Custom Domain
- Level 2 + tenant on `tenant.com` instead of `app.com/tenant`
- Requires DNS CNAME, automatic TLS provisioning, tenant routing logic
- Branded email senders (`noreply@tenant.com`)

**Implementation effort:** High. Requires DNS automation, ACME/Let's Encrypt integration, multi-domain TLS.

### Level 4 — Custom Login / Auth
- Level 3 + tenant-specific SSO providers (SAML / OIDC)
- Branded login UI without app-vendor mention
- Custom auth flows per tenant

**Implementation effort:** High. Requires SSO integration per tenant.

### Level 5 — Embedded UI (iframe / web component)
- Level 4 + ability to embed in tenant's own application
- CSP / X-Frame-Options configuration
- postMessage-based parent communication

**Implementation effort:** Very High. Requires security review, message protocol design.

### Level 6 — Full Reseller Mode
- Level 5 + tenant becomes reseller, can have sub-tenants
- Hierarchical tenant model (parent + child tenants)
- Revenue sharing / royalties

**Implementation effort:** Architectural. Requires hierarchical tenant model from foundation.

---

## Implementation Checklist (Level 1-3 Most Common)

### Brand Tokens (Level 1)
- [ ] Define theme token schema (colors, logo, app-name)
- [ ] Add `brand_tokens` table or column to tenant config
- [ ] Implement theme token loader in app shell
- [ ] Implement theme token defaults fallback
- [ ] UI for tenant admin to upload logo + pick colors
- [ ] CDN / asset pipeline for tenant assets
- [ ] QA: theme token isolation (one tenant cannot see another's branding)

### Domain Theming (Level 2)
- [ ] Extend theme tokens to typography + spacing
- [ ] Refactor email templates to consume tenant brand tokens
- [ ] Refactor PDF generation to use tenant brand tokens
- [ ] Tenant-specific email signatures
- [ ] QA: email rendering with tenant branding (multi-client testing)

### Custom Domain (Level 3)
- [ ] DNS CNAME automation (tenant_domain → app_apex)
- [ ] TLS automation (ACME / Let's Encrypt) per tenant domain
- [ ] Tenant routing middleware (Host header → tenant_id)
- [ ] Branded email senders (DKIM / SPF per domain)
- [ ] Cookie scoping for tenant domains
- [ ] QA: domain isolation, certificate transparency monitoring
- [ ] Compliance: data residency if domains span regions

---

## Quality Gates

| Gate | What Verifies |
|---|---|
| QG-M1 (Module Boundaries) | White-label customization layer doesn't leak across tenant module boundaries |
| QG-S5 (Security Baseline) | Custom domain TLS, SSO isolation, cookie scoping verified |
| QG-P1 (Production Readiness) | White-label UAT signed off by tenant before activation |

---

## Common Pitfalls

1. **CSS leakage** — One tenant's CSS overrides bleed into another's UI. Solution: scope all tenant CSS under unique container class with `tenant_id`.
2. **Email "from" address spoofing** — Tenant emails come from `app.com` instead of `tenant.com` due to misconfigured DKIM. Solution: per-domain DKIM keys.
3. **TLS certificate exhaustion** — ACME rate limits hit when onboarding many tenants. Solution: wildcard certificates for shared domain, dedicated certs only for Level 3+ custom domains.
4. **Logo asset performance** — Tenant logos served unoptimized degrade page speed. Solution: image optimization pipeline + CDN.
5. **Brand asset audit gap** — No retention of tenant logos after offboarding. Solution: include in tenant offboarding workflow (`bmad-bam-tenant-offboarding`).

---

## Related BAM Workflows

- `bmad-bam-master-architecture` — Define white-label scope at foundation
- `bmad-bam-tenant-onboarding` — Trigger white-label provisioning
- `bmad-bam-tenant-offboarding` — Clean up tenant brand assets

---

*This runbook replaces the former `bmad-bam-white-labeling` skill. The skill was dissolved in BAM v3 because white-labeling is operational procedure, not workflow logic.*