# Step 3: Design Breach Handling

## Purpose

Design SLA breach detection, alerting, and compensation procedures.

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

Search the web: "SLA breach handling best practices {date}"
Search the web: "error budget management multi-tenant SaaS patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Breach Detection

| Threshold | Alert Level | Response |
|-----------|-------------|----------|
| 50% error budget consumed | Warning | Review |
| 75% error budget consumed | High | Investigate |
| 100% error budget consumed | Critical | Immediate action |
| SLA breach | Breach | Compensation trigger |

### 2. Notification Matrix

| Stakeholder | Warning | Breach |
|-------------|---------|--------|
| SRE Team | Slack | PagerDuty |
| Customer Success | Email | Call + Email |
| Customer (Enterprise) | Dashboard | Direct outreach |
| Customer (PRO) | Dashboard | Email |

### 3. Compensation Framework

| Breach Severity | Credit | Process |
|-----------------|--------|---------|
| < 99.9% (PRO) | 10% monthly | Automatic |
| < 99.99% (ENTERPRISE) | 25% monthly | Automatic |
| Major incident | Custom | Negotiated |

### 4. RCA Requirements

| Breach Type | RCA Deadline | Audience |
|-------------|--------------|----------|
| Minor | 5 business days | Internal |
| Major | 3 business days | Internal + Customer |
| Critical | 24 hours | All stakeholders |

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

- [ ] Breach detection thresholds defined
- [ ] Notification matrix documented
- [ ] Compensation framework established
- [ ] RCA requirements specified

---

## Outputs

- Breach detection thresholds with alert levels and responses
- Notification matrix by stakeholder and severity
- Compensation framework with credit amounts and processes
- RCA requirements by breach type with deadlines
- Design decisions documented in frontmatter

---

## Next Step

Proceed to `step-04-c-design-reporting.md`.
