# QG-CC: Continuous Compliance Gate

**Shortcode:** ZCC  
**Workflow:** bmad-bam-privacy-compliance  
**Prerequisites:** QG-S3 (Security Baseline)

## Critical Checks (All Must Pass)

- [ ] **CRITICAL:** Data subject rights automation verified
- [ ] **CRITICAL:** Consent management system operational
- [ ] **CRITICAL:** Audit logging captures all compliance events
- [ ] **CRITICAL:** Retention policies enforced automatically

## Standard Checks

### Privacy Controls
- [ ] GDPR Article 30 records maintained
- [ ] CCPA disclosure requirements met
- [ ] Cross-border transfer documentation complete
- [ ] Privacy impact assessments current

### Compliance Monitoring
- [ ] Real-time compliance dashboard operational
- [ ] Automated alerts for policy violations
- [ ] Compliance metrics tracked and reported
- [ ] Third-party audit readiness verified

### Tenant Compliance
- [ ] Per-tenant compliance status tracking
- [ ] Tenant-specific regulatory requirements mapped
- [ ] Compliance inheritance for child tenants verified
- [ ] Compliance reporting per tenant available

## Recovery Protocol

| Attempt | Action |
|---------|--------|
| 1 | Review compliance gaps, implement missing controls |
| 2 | Escalate to compliance officer, create remediation plan |
| 3 | MANDATORY: Legal review and stakeholder notification |

## Outcome

| Result | Criteria |
|--------|----------|
| PASS | All critical + 80% standard checks |
| CONDITIONAL | All critical, <80% standard + documented mitigation |
| FAIL | Any critical check fails |

## Web Research Queries

- Search: "continuous compliance monitoring SaaS {date}"
- Search: "automated GDPR compliance verification {date}"
- Search: "privacy compliance automation patterns {date}"
