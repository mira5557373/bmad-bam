# Step 1: Define Compliance Rules

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Define compliance rules and controls for automated verification.

---

## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: compliance`

---

## Actions

### 1. Compliance Frameworks

| Framework | Scope | Tenant Impact |
|-----------|-------|---------------|
| SOC 2 Type II | All tenants | Required |
| GDPR | EU tenants | Auto-applied |
| HIPAA | Healthcare | Opt-in |
| ISO 27001 | Enterprise | Standard |
| PCI DSS | Payment | Required if billing |

### 2. Control Categories

| Category | Controls | Frequency |
|----------|----------|-----------|
| Access Control | RBAC, MFA, SSO | Continuous |
| Data Protection | Encryption, backup | Daily |
| Audit Logging | Completeness, retention | Continuous |
| Change Management | Approval, review | Per change |
| Incident Response | Procedures, testing | Quarterly |

### 3. Per-Tenant Requirements

| Tenant Type | Compliance Level | Controls |
|-------------|------------------|----------|
| Standard | SOC 2 baseline | Core set |
| Healthcare | SOC 2 + HIPAA | Extended |
| Financial | SOC 2 + SOX | Financial controls |
| Enterprise | Custom | Negotiated |

### 4. Rule Specification Format

| Field | Description | Example |
|-------|-------------|---------|
| rule_id | Unique identifier | SOC2-AC-001 |
| control | Control reference | Access Control 1.1 |
| check | Automated check | MFA enabled for all admins |
| evidence | Required evidence | User role report |
| frequency | Check frequency | Daily |

**Verify current best practices with web search:**
Search the web: "compliance as code best practices {date}"
Search the web: "automated compliance verification SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to scanning design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1]`
- Proceed to: `step-02-c-design-scanning.md`

---

## Verification

- [ ] Compliance frameworks identified
- [ ] Control categories defined
- [ ] Per-tenant requirements specified
- [ ] Rule format documented

---

## Outputs

- Compliance framework matrix with tenant impact
- Control categories with check frequencies
- Per-tenant compliance requirements mapping
- Rule specification format and examples
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-02-c-design-scanning.md`.
