---
name: qg-wl1-white-labeling
description: White labeling gate - branding customization, tenant theming, asset management
category: quality-gate
tags: [white-labeling, quality-gate, multi-tenant, branding, customization]
version: 2.0.0
---

# QG-WL1: White Labeling Gate

> **Gate ID:** QG-WL1 (White Labeling)
> **Phase:** 3-solutioning
> **Workflow:** bmad-bam-tenant-model-isolation, bmad-bam-create-module-architecture
> **Prerequisites:** QG-F1 (Foundation), QG-M1 (Module Architecture)

White labeling capabilities MUST be validated before tenant branding features go live. This gate ensures brand customization is properly isolated per tenant, theming infrastructure is robust, and asset management meets enterprise requirements.

---

## Purpose

QG-WL1 validates that white labeling meets multi-tenant SaaS requirements:

1. **Brand isolation** ensures each tenant sees only their branding
2. **Theme customization** provides flexible styling without code changes
3. **Asset management** handles logos, images, and files securely
4. **Style inheritance** enables consistent customization hierarchy
5. **Runtime theming** allows dynamic brand switching

---

## Brand Customization

### Brand Identity Configuration

- [ ] **CRITICAL:** Tenant brand name configurable
- [ ] **CRITICAL:** Tenant logo upload/management supported
- [ ] **CRITICAL:** Brand colors configurable (primary, secondary, accent)
- [ ] Favicon customization available
- [ ] Email sender name/logo configurable
- [ ] Footer branding customizable

### Brand Asset Types

- [ ] **CRITICAL:** Logo formats supported (PNG, SVG, JPG)
- [ ] **CRITICAL:** Logo size constraints documented and enforced
- [ ] Favicon formats supported (ICO, PNG)
- [ ] Email header/footer images supported
- [ ] Document watermarks supported (Enterprise)
- [ ] Mobile app icons supported (if applicable)

### Brand Validation

- [ ] **CRITICAL:** Logo dimensions validated on upload
- [ ] **CRITICAL:** File size limits enforced
- [ ] Image format validation performed
- [ ] Color contrast accessibility checked
- [ ] Brand preview available before save
- [ ] Brand history/versioning available

### Multi-Tenant Brand Isolation

- [ ] **CRITICAL:** Each tenant's brand completely isolated
- [ ] **CRITICAL:** No brand cross-contamination between tenants
- [ ] **CRITICAL:** Brand settings scoped to tenant_id
- [ ] Subdomain branding supported (if applicable)
- [ ] Custom domain branding supported (Enterprise)

---

## Tenant Theming

### Theme Structure

- [ ] **CRITICAL:** CSS custom properties (variables) used for theming
- [ ] **CRITICAL:** Theme schema documented
- [ ] **CRITICAL:** Default theme provides fallback for all properties
- [ ] Theme inheritance hierarchy defined (platform -> tier -> tenant)
- [ ] Theme composition rules documented
- [ ] Theme property naming convention established

### Theme Customization Scope

- [ ] **CRITICAL:** Primary/secondary colors customizable
- [ ] **CRITICAL:** Typography (font family) customizable
- [ ] Background colors customizable
- [ ] Border styles customizable
- [ ] Spacing/sizing adjustable (within limits)
- [ ] Component-specific overrides available (Enterprise)

### Theme Application

- [ ] **CRITICAL:** Theme applied consistently across all pages
- [ ] **CRITICAL:** Theme loaded on initial page load (no flash of unstyled content)
- [ ] **CRITICAL:** Theme changes apply without page reload
- [ ] Theme persists across sessions
- [ ] Theme applies to embedded components
- [ ] Theme applies to PDF exports (if applicable)

### Theme Tiers

- [ ] **CRITICAL:** Free tier has limited customization (colors only)
- [ ] **CRITICAL:** Pro tier has expanded customization (colors, fonts, logos)
- [ ] **CRITICAL:** Enterprise tier has full customization (all properties)
- [ ] Tier upgrade path clear for additional customization
- [ ] Feature flags control tier-specific options

---

## Asset Management

### Asset Storage

- [ ] **CRITICAL:** Tenant assets stored in isolated storage
- [ ] **CRITICAL:** Asset access requires tenant authentication
- [ ] **CRITICAL:** Assets served via CDN with cache headers
- [ ] Asset storage quotas enforced per tenant tier
- [ ] Asset backup strategy documented

### Asset Upload

- [ ] **CRITICAL:** Upload file type validation performed
- [ ] **CRITICAL:** Upload file size limits enforced
- [ ] **CRITICAL:** Malware scanning on upload
- [ ] Image optimization performed on upload
- [ ] Duplicate detection available
- [ ] Batch upload supported

### Asset Organization

- [ ] **CRITICAL:** Assets organized by tenant and category
- [ ] Asset metadata stored (name, size, type, upload date)
- [ ] Asset search/filter available
- [ ] Asset tagging supported
- [ ] Folder organization available (Enterprise)

### Asset Delivery

- [ ] **CRITICAL:** Assets served with proper cache headers
- [ ] **CRITICAL:** Assets served via HTTPS only
- [ ] CDN integration for performance
- [ ] Image resizing on-the-fly available
- [ ] WebP/AVIF format conversion available
- [ ] Lazy loading supported

---

## Style Overrides

### Override Hierarchy

- [ ] **CRITICAL:** Override precedence documented (tenant > tier > platform)
- [ ] **CRITICAL:** Override conflicts resolved predictably
- [ ] Platform defaults cannot be accidentally overridden
- [ ] Tier defaults can be overridden by tenant (within limits)
- [ ] Emergency override capability for platform team

### Override Scope

- [ ] **CRITICAL:** CSS variable overrides supported
- [ ] **CRITICAL:** Component-level overrides scoped correctly
- [ ] Page-level overrides available (Enterprise)
- [ ] Feature-specific overrides available
- [ ] Override impact preview available

### Override Validation

- [ ] **CRITICAL:** Invalid override values rejected
- [ ] **CRITICAL:** Override changes logged for audit
- [ ] Color accessibility validation performed
- [ ] Typography readability validation performed
- [ ] Layout break detection available

### Override Safety

- [ ] **CRITICAL:** Overrides cannot inject arbitrary CSS
- [ ] **CRITICAL:** Overrides cannot execute JavaScript
- [ ] Override sandbox prevents security issues
- [ ] Override rollback available
- [ ] Override versioning supported

---

## Theme Isolation

### Isolation Guarantees

- [ ] **CRITICAL:** Tenant A theme never visible to Tenant B
- [ ] **CRITICAL:** Theme storage segregated by tenant
- [ ] **CRITICAL:** Theme API endpoints validate tenant ownership
- [ ] Theme cache keys include tenant identifier
- [ ] Theme preview isolated to requesting tenant

### Isolation Testing

- [ ] **CRITICAL:** Cross-tenant theme isolation test passing
- [ ] **CRITICAL:** Theme injection attack prevention verified
- [ ] Cache invalidation per tenant verified
- [ ] Concurrent theme updates don't conflict
- [ ] Theme rollback doesn't affect other tenants

### Isolation Monitoring

- [ ] **CRITICAL:** Theme access logged with tenant context
- [ ] Theme anomaly detection configured
- [ ] Cross-tenant theme request alerts
- [ ] Theme change audit trail maintained
- [ ] Theme access patterns monitored

---

## White Label Email

### Email Branding

- [ ] **CRITICAL:** Email templates use tenant branding
- [ ] **CRITICAL:** From name/address customizable per tenant
- [ ] Email header logo uses tenant logo
- [ ] Email footer uses tenant branding
- [ ] Email color scheme matches tenant theme

### Email Configuration

- [ ] **CRITICAL:** Custom email domain supported (Enterprise)
- [ ] **CRITICAL:** SPF/DKIM configured for custom domains
- [ ] Email reply-to customizable
- [ ] Email signature customizable
- [ ] Unsubscribe links maintained per tenant

### Email Isolation

- [ ] **CRITICAL:** Email templates isolated per tenant
- [ ] **CRITICAL:** Email sending uses tenant context
- [ ] Email tracking isolated per tenant
- [ ] Email analytics scoped to tenant
- [ ] Email previews show tenant branding

---

## White Label Documentation

### Documentation Branding

- [ ] **CRITICAL:** Help docs can show tenant branding (Enterprise)
- [ ] **CRITICAL:** Support contact uses tenant info
- [ ] KB articles can be tenant-customized
- [ ] Tutorial videos can be tenant-branded (Enterprise)
- [ ] API docs can show tenant examples

### Documentation Access

- [ ] **CRITICAL:** Tenant-specific docs isolated from others
- [ ] Custom content visible only to that tenant
- [ ] Documentation search respects tenant scope
- [ ] Documentation analytics per tenant
- [ ] Version control for tenant docs

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Brand Identity Config | CRITICAL | Some options limited | No customization |
| Brand Validation | CRITICAL | Validation partial | No validation |
| Brand Isolation | CRITICAL | Minor leakage risk | Cross-tenant visible |
| Theme Structure | CRITICAL | Schema incomplete | No theming system |
| Theme Application | CRITICAL | Flash of default | Theme not applied |
| Theme Tiers | CRITICAL | Tier limits unclear | No tier differentiation |
| Asset Storage | CRITICAL | Quota not enforced | No isolation |
| Asset Upload | CRITICAL | Scanning partial | No validation |
| Asset Delivery | CRITICAL | Cache headers missing | Assets inaccessible |
| Override Hierarchy | CRITICAL | Precedence unclear | Conflicts unpredictable |
| Override Safety | CRITICAL | Sandbox partial | CSS/JS injection possible |
| Theme Isolation | CRITICAL | Testing incomplete | Cross-tenant leakage |
| Email Branding | CRITICAL | Partial branding | No email branding |
| Email Isolation | CRITICAL | Tracking shared | Emails mixed |
| Asset Organization | Non-critical | Metadata incomplete | N/A |
| Documentation Branding | Non-critical | Limited customization | N/A |

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items checked, >=80% standard items complete |
| **CONDITIONAL** | All CRITICAL items checked, <80% standard items + documented mitigation plan |
| **FAIL** | Any CRITICAL item unchecked - block white labeling release, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

### Attempt 1: Address Branding Gaps (target: 1-2 days)

- Review failed checks and identify root cause
- Implement missing brand customization options
- Configure asset storage isolation
- Test theme application across pages
- Re-run QG-WL1 validation
- **Lock passed categories**

### Attempt 2: Deeper Investigation (target: 3-5 days)

- Engage UX Designer and Frontend Lead
- Review theme architecture for isolation gaps
- Audit asset storage for cross-tenant access
- Test email branding with multiple tenants
- Verify override safety mechanisms
- Re-run validation after remediation
- **Preserve locked categories**

### Attempt 3: Mandatory Course Correction

- Escalate to Product and Engineering Leadership
- Document white labeling blockers
- Reassess theming architecture if gaps are systemic
- Consider phased rollout (basic branding first)
- Create remediation plan with stakeholder sign-off
- Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Brand Customization | Add missing config options | No brand config exists |
| Theme Structure | Define CSS variable schema | No theming infrastructure |
| Asset Storage | Configure isolated storage | Assets not isolated |
| Theme Isolation | Add tenant scoping | Cross-tenant access |
| Email Branding | Configure email templates | No email customization |
| Override Safety | Implement sandbox | Security vulnerability |

---

## Automated Validation Script

```bash
# Run as part of QG-WL1 gate
./scripts/validate-white-labeling.sh

# Validates:
# - Brand configuration options
# - Theme isolation
# - Asset storage segregation
# - Override safety
# - Email branding
```

---

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant isolation design
- `bmad-bam-create-module-architecture` - Module design
- `bmad-bam-tenant-onboarding-design` - Onboarding with branding
- `bmad-bam-tenant-aware-observability` - Theme usage monitoring

## Related Templates

- `white-label-config-template.md` - White label configuration
- `theme-schema-template.md` - Theme structure documentation
- `brand-guidelines-template.md` - Brand customization guidelines
- `asset-management-template.md` - Asset handling documentation

## Related Patterns

- `white-labeling-guide.md` - White labeling patterns
- `tenant-theming-patterns.md` - Theming architecture
- `asset-management-patterns.md` - Asset handling best practices
- `multi-tenant-styling.md` - CSS isolation patterns

---

## Web Research Verification

- [ ] Search the web: "SaaS white labeling best practices {date}" - Verify branding approaches
- [ ] Search the web: "multi-tenant theming architecture {date}" - Confirm theme isolation
- [ ] Search the web: "CSS custom properties theming patterns {date}" - Verify implementation
- [ ] Search the web: "tenant asset management SaaS {date}" - Confirm asset handling
- [ ] _Source: [URL]_ citations documented for key theming decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, branding isolated, theming functional
**OWNER:** UX Designer (ux-bam) / Frontend Lead
**REVIEWERS:** Platform Architect (Atlas persona), Product Owner, Security Lead

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | New V2 gate for white labeling; multi-tenant branding management |
