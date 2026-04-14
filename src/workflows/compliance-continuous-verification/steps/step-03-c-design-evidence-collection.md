# Step 3: Design Evidence Collection

## Purpose

Design automated evidence collection for audit readiness.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 2 completed

**Web Research (Required):**

Search the web: "compliance evidence collection automation best practices {date}"
Search the web: "audit evidence management multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Evidence Types

| Type | Format | Source |
|------|--------|--------|
| Configuration | JSON/YAML snapshots | Infrastructure |
| Logs | Structured logs | Application |
| Reports | PDF/CSV exports | Generated |
| Screenshots | PNG captures | UI verification |
| Attestations | Signed documents | Manual |

### 2. Collection Automation

| Evidence | Collection Method | Storage |
|----------|-------------------|---------|
| Access reviews | Quarterly export | S3 + DB |
| Security configs | Daily snapshot | S3 |
| Audit logs | Real-time stream | Log store |
| Vulnerability scans | Weekly report | S3 |

### 3. Evidence Retention

| Framework | Retention | Archive |
|-----------|-----------|---------|
| SOC 2 | 1 year | 5 years |
| GDPR | Duration of processing | Per request |
| HIPAA | 6 years | 10 years |
| ISO 27001 | 3 years | 7 years |

### 4. Audit Readiness

| Artifact | Preparation | Availability |
|----------|-------------|--------------|
| Control matrix | Auto-generated | Real-time |
| Evidence package | On-demand bundle | < 1 hour |
| Gap analysis | Weekly | Dashboard |

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to reporting design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to: `step-04-c-design-reporting.md`

---

## Verification

- [ ] Evidence types defined
- [ ] Collection automation specified
- [ ] Retention policies documented
- [ ] Audit readiness procedures established

---

## Outputs

- Evidence type catalog with formats and sources
- Collection automation specifications
- Framework-specific retention policy matrix
- Audit readiness artifacts and procedures
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-04-c-design-reporting.md`.
