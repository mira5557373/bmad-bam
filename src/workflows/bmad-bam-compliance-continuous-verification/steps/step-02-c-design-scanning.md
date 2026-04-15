# Step 2: Design Scanning

## Purpose

Design automated compliance scanning infrastructure.

## MANDATORY EXECUTION RULES

**FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **COMPLETE EVERY STEP** - Execute all steps in sequence
2. **NO PARTIAL COMPLETIONS** - Finish what you start
3. **VERIFY OUTPUTS** - Confirm each step produces expected results
4. **DOCUMENT DECISIONS** - Record all choices made

---

## Prerequisites

- Step 1 completed

**Web Research (Required):**

Search the web: "compliance scanning automation best practices {date}"
Search the web: "continuous compliance monitoring multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Scanning Architecture

| Component | Purpose | Technology |
|-----------|---------|------------|
| Rule engine | Evaluate controls | Open Policy Agent |
| Scanner | Execute checks | Custom + tools |
| Scheduler | Run frequency | Cron/Temporal |
| Collector | Gather evidence | API integrations |

### 2. Scan Types

| Type | Trigger | Scope |
|------|---------|-------|
| Continuous | Real-time events | Critical controls |
| Scheduled | Daily/weekly | Full compliance |
| On-demand | Manual request | Specific areas |
| Drift detection | Change detected | Changed resources |

### 3. Integration Points

| System | Data Collected | Frequency |
|--------|----------------|-----------|
| IAM | User roles, MFA status | Real-time |
| Database | Encryption, access logs | Daily |
| Cloud infra | Configuration, security | Hourly |
| Application | Audit logs, sessions | Real-time |

### 4. Tenant Isolation

| Concern | Mitigation |
|---------|------------|
| Cross-tenant data | Separate scan contexts |
| Resource contention | Tenant-scoped workers |
| Result privacy | Encrypted per-tenant storage |

**Soft Gate:** Steps 1-2 complete rules and scanning. Confirm before proceeding to evidence collection.

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Proceed to evidence collection design
```

#### If 'C' (Continue):
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to: `step-03-c-design-evidence-collection.md`

---

## Verification

- [ ] Scanning architecture defined
- [ ] Scan types specified
- [ ] Integration points documented
- [ ] Tenant isolation addressed

---

## Outputs

- Compliance scanning architecture specifications
- Scan type definitions with triggers and scope
- Integration points and data collection specifications
- Tenant isolation design for scanning
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-03-c-design-evidence-collection.md`.
