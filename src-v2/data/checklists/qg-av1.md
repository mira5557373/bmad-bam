---
name: qg-av1-api-versioning
description: API versioning gate - versioning strategy, backward compatibility, deprecation policy
category: quality-gate
tags: [api, quality-gate, multi-tenant, versioning, compatibility]
version: 2.0.0
---

# QG-AV1: API Versioning Gate

> **Gate ID:** QG-AV1 (API Versioning)
> **Phase:** 4-implementation
> **Workflow:** bmad-bam-api-version-release
> **Prerequisites:** QG-M1 (Module Architecture), QG-I1 (Convergence)

API versioning MUST be validated before any production API release. This gate ensures versioning strategy consistency, backward compatibility guarantees, and clear deprecation policies across the multi-tenant platform.

---

## Purpose

QG-AV1 validates that the API versioning strategy meets enterprise SaaS requirements:

1. **Version strategy** is documented and consistently applied
2. **Backward compatibility** is verified for existing tenants
3. **Breaking changes** are detected and communicated
4. **Deprecation policy** provides adequate migration timeline
5. **Tenant migration** paths are clear and actionable

---

## Version Strategy

### Versioning Scheme

- [ ] **CRITICAL:** Versioning scheme documented (semantic, date-based, or hybrid)
- [ ] **CRITICAL:** Version format standardized across all APIs (e.g., v1, v2025-04)
- [ ] **CRITICAL:** Version placement consistent (URL path, header, or query param)
- [ ] Major/minor/patch versioning rules defined
- [ ] Version discovery endpoint available (e.g., /api/versions)
- [ ] API changelog maintained per version

### Version Lifecycle

- [ ] **CRITICAL:** Version lifecycle states defined (alpha, beta, stable, deprecated, sunset)
- [ ] **CRITICAL:** Minimum support period documented per state (stable >= 24 months)
- [ ] Beta-to-stable promotion criteria documented
- [ ] Stable-to-deprecated transition process defined
- [ ] Version status exposed in API metadata

### Multi-Tenant Version Support

- [ ] **CRITICAL:** Multiple API versions supported concurrently
- [ ] **CRITICAL:** Tenant-level version pinning available
- [ ] Enterprise tenants can access beta versions early
- [ ] Version preference stored per tenant configuration
- [ ] Default version configurable per tenant tier

---

## Backward Compatibility

### Compatibility Guarantees

- [ ] **CRITICAL:** Backward compatibility policy documented
- [ ] **CRITICAL:** Non-breaking change definition established
- [ ] **CRITICAL:** Breaking change definition established with examples
- [ ] Additive-only changes within minor versions enforced
- [ ] Field removal prohibited within major version

### Compatibility Verification

- [ ] **CRITICAL:** Automated compatibility testing in CI/CD
- [ ] **CRITICAL:** Contract tests verify existing clients work with new version
- [ ] Schema comparison tools detect breaking changes
- [ ] OpenAPI diff generated for each release
- [ ] Compatibility report included in release notes

### Non-Breaking Change Types

- [ ] New optional fields allowed
- [ ] New endpoints allowed
- [ ] New optional query parameters allowed
- [ ] Expanded enums allowed (with default handling)
- [ ] Performance improvements allowed

### Breaking Change Types

- [ ] **CRITICAL:** Field removal detected as breaking
- [ ] **CRITICAL:** Type changes detected as breaking
- [ ] **CRITICAL:** Required field addition detected as breaking
- [ ] Endpoint removal detected as breaking
- [ ] Response structure changes detected as breaking
- [ ] Authentication changes detected as breaking

---

## Breaking Change Detection

### Automated Detection

- [ ] **CRITICAL:** Breaking change detection automated in CI
- [ ] **CRITICAL:** Pull requests flagged when breaking changes detected
- [ ] OpenAPI schema diff comparison automated
- [ ] Request/response payload comparison automated
- [ ] Field type changes detected
- [ ] Required field additions detected

### Change Classification

- [ ] **CRITICAL:** Changes classified as breaking/non-breaking automatically
- [ ] **CRITICAL:** Breaking changes require explicit approval
- [ ] Change impact assessment required for breaking changes
- [ ] Affected tenant count estimated for breaking changes
- [ ] Migration complexity rated (low/medium/high)

### Change Documentation

- [ ] **CRITICAL:** All breaking changes documented in changelog
- [ ] Before/after examples provided for each breaking change
- [ ] Migration code samples provided where applicable
- [ ] Affected endpoints listed explicitly
- [ ] Rollback procedure documented

---

## Deprecation Policy

### Deprecation Timeline

- [ ] **CRITICAL:** Minimum deprecation notice period defined (90 days minimum)
- [ ] **CRITICAL:** Deprecation announcement process documented
- [ ] Enterprise tenant extended deprecation available (180 days)
- [ ] Deprecation warning headers returned in responses
- [ ] Deprecation sunset date enforced

### Deprecation Communication

- [ ] **CRITICAL:** Tenant notification system for deprecations configured
- [ ] **CRITICAL:** Email notifications sent at deprecation start
- [ ] **CRITICAL:** Reminder notifications sent at 30, 14, 7 days before sunset
- [ ] In-API deprecation warnings enabled
- [ ] Dashboard notifications for tenant admins

### Deprecated Endpoint Behavior

- [ ] **CRITICAL:** Deprecated endpoints continue functioning until sunset
- [ ] **CRITICAL:** Deprecation-Warning header included in responses
- [ ] Usage metrics tracked for deprecated endpoints
- [ ] Migration progress tracked per tenant
- [ ] Sunset date enforced (405 response after sunset)

### Deprecation Registry

- [ ] **CRITICAL:** Centralized deprecation registry maintained
- [ ] All deprecated endpoints/fields listed
- [ ] Deprecation date recorded
- [ ] Sunset date recorded
- [ ] Replacement endpoint/field documented
- [ ] Migration guide linked

---

## Tenant API Migration

### Migration Planning

- [ ] **CRITICAL:** Migration path documented for each breaking change
- [ ] **CRITICAL:** Migration guide available per tenant tier
- [ ] Self-service migration tools provided where possible
- [ ] Migration complexity assessment provided
- [ ] Estimated migration effort documented

### Migration Support

- [ ] **CRITICAL:** Migration support resources identified
- [ ] Enterprise tenants receive dedicated migration support
- [ ] Migration sandbox environment available
- [ ] Migration testing tools provided
- [ ] Migration progress dashboard available

### Migration Tracking

- [ ] **CRITICAL:** Migration status tracked per tenant
- [ ] **CRITICAL:** Non-migrated tenants identified before sunset
- [ ] Migration completion metrics collected
- [ ] Migration blockers documented and escalated
- [ ] Post-migration validation automated

### Migration Safeguards

- [ ] **CRITICAL:** Grace period available for critical tenants
- [ ] Emergency rollback procedure documented
- [ ] Data preservation guaranteed during migration
- [ ] Feature flag controls migration rollout
- [ ] Canary migration supported (subset of tenants first)

---

## API Release Process

### Pre-Release Validation

- [ ] **CRITICAL:** All compatibility tests pass
- [ ] **CRITICAL:** Breaking changes approved by API owner
- [ ] **CRITICAL:** Deprecation notices sent for any deprecations
- [ ] API documentation updated
- [ ] Changelog entry created

### Release Coordination

- [ ] **CRITICAL:** Release schedule communicated to tenants
- [ ] **CRITICAL:** Enterprise tenants notified of new features
- [ ] Beta testers given early access (if applicable)
- [ ] Support team briefed on changes
- [ ] Monitoring dashboards updated

### Post-Release Monitoring

- [ ] **CRITICAL:** API error rates monitored post-release
- [ ] **CRITICAL:** Tenant adoption metrics tracked
- [ ] Performance regression detection active
- [ ] Rollback criteria defined and monitored
- [ ] Support ticket spike detection configured

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Versioning Scheme | CRITICAL | Minor inconsistencies | No version strategy |
| Version Lifecycle | CRITICAL | Support period unclear | No lifecycle states |
| Compatibility Guarantees | CRITICAL | Policy incomplete | No compatibility policy |
| Compatibility Verification | CRITICAL | Manual verification only | No testing |
| Breaking Change Detection | CRITICAL | Manual detection only | No detection |
| Change Documentation | CRITICAL | Examples incomplete | No documentation |
| Deprecation Timeline | CRITICAL | Notice period short | No deprecation policy |
| Deprecation Communication | CRITICAL | Notifications partial | No tenant notification |
| Migration Planning | CRITICAL | Guides incomplete | No migration path |
| Migration Tracking | CRITICAL | Manual tracking only | No tracking |
| Migration Support | Non-critical | Self-service limited | N/A |
| Release Coordination | Non-critical | Communication delayed | N/A |

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items checked, >=80% standard items complete |
| **CONDITIONAL** | All CRITICAL items checked, <80% standard items + documented mitigation plan |
| **FAIL** | Any CRITICAL item unchecked - block API release, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (API Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived.

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

### Attempt 1: Address Versioning Gaps (target: 1-2 days)

- Review failed checks and identify root cause
- Document versioning scheme if missing
- Configure deprecation notification system
- Create migration guides for breaking changes
- Re-run QG-AV1 validation
- **Lock passed categories**

### Attempt 2: Deeper Investigation (target: 3-5 days)

- Engage API Platform Lead
- Review breaking change detection automation
- Audit tenant notification systems
- Test migration paths with sample tenants
- Verify deprecation timeline compliance
- Re-run validation after remediation
- **Preserve locked categories**

### Attempt 3: Mandatory Course Correction

- Escalate to Engineering Leadership and Product Management
- Document API versioning blockers
- Reassess release timeline if gaps are systemic
- Consider phased release with reduced scope
- Create remediation plan with stakeholder sign-off
- Schedule follow-up validation within 1 week

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Versioning Scheme | Document and standardize scheme | No scheme after review |
| Compatibility | Implement automated testing | No compatibility tests |
| Breaking Changes | Configure CI detection | No detection mechanism |
| Deprecation | Set up notification system | No deprecation process |
| Migration | Create migration guides | No migration path |

---

## Automated Validation Script

```bash
# Run as part of QG-AV1 gate
./scripts/validate-api-versioning.sh

# Validates:
# - Version scheme consistency
# - Breaking change detection
# - Deprecation registry completeness
# - Migration documentation
# - Notification system configuration
```

---

## Related Workflows

- `bmad-bam-api-version-release` - API release process
- `bmad-bam-define-facade-contract` - Contract definition
- `bmad-bam-evolve-facade-contract` - Contract evolution
- `bmad-bam-facade-mismatch-recovery` - Contract mismatch recovery

## Related Templates

- `api-versioning-strategy-template.md` - Versioning documentation
- `api-deprecation-notice-template.md` - Deprecation communication
- `api-migration-guide-template.md` - Migration documentation
- `facade-contract-template.md` - API contract definition

## Related Patterns

- `api-versioning-patterns.md` - Versioning strategy guidance
- `api-deprecation-patterns.md` - Deprecation best practices
- `tenant-api-migration.md` - Multi-tenant migration patterns

---

## Web Research Verification

- [ ] Search the web: "API versioning strategy best practices {date}" - Verify versioning approaches
- [ ] Search the web: "API backward compatibility testing {date}" - Confirm compatibility patterns
- [ ] Search the web: "API deprecation policy enterprise {date}" - Verify deprecation timelines
- [ ] Search the web: "multi-tenant API migration patterns {date}" - Confirm migration approaches
- [ ] _Source: [URL]_ citations documented for key versioning decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, versioning strategy documented, deprecation policy active
**OWNER:** Integration Architect (Kai persona)
**REVIEWERS:** Platform Architect (Atlas persona), API Owner, Product Manager

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | New V2 gate for API versioning; multi-tenant compatibility management |
