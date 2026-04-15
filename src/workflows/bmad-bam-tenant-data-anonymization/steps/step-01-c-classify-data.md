# Step 1: Classify Data

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Define data classification taxonomy for anonymization requirements.

---

## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: compliance`

---

## Actions

### 1. Data Classification Levels

| Level | Description | Examples | Anonymization Required |
|-------|-------------|----------|----------------------|
| Public | Non-sensitive | Product names | No |
| Internal | Business data | Usage metrics | Aggregation |
| Confidential | User data | Email, name | Full anonymization |
| Restricted | Sensitive PII | SSN, health | Encryption + anonymization |

### 2. PII Identification

| Data Type | Classification | Source Tables |
|-----------|----------------|---------------|
| Email | Confidential | users, contacts |
| Name | Confidential | users, profiles |
| Phone | Confidential | users, contacts |
| IP Address | Confidential | audit_logs |
| Location | Confidential | sessions |
| Payment | Restricted | billing |

### 3. Tenant Data Boundaries

| Scope | Treatment |
|-------|-----------|
| Intra-tenant | Anonymize for analytics |
| Cross-tenant | Never mix without consent |
| Platform-wide | Aggregate only |

**Verify current best practices with web search:**
Search the web: "GDPR data classification best practices {date}"
Search the web: "PII identification automated tools {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to anonymization rules design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1]`
- Proceed to: `step-02-c-design-anonymization-rules.md`

---

## Verification

- [ ] Classification levels defined
- [ ] PII types identified
- [ ] Tenant boundaries established

---

## Outputs

- Data classification taxonomy with anonymization requirements
- PII identification catalog with source tables
- Tenant data boundary specifications
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-02-c-design-anonymization-rules.md`.
