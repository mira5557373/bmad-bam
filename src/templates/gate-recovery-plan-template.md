---
name: gate-recovery-plan-template
description: Template for documenting quality gate FAIL recovery protocols
category: quality-gates
version: "1.0.0"
---

# Quality Gate Recovery Plan

## Document Information

| Field | Value |
|-------|-------|
| **Template ID** | TPL-GRP-001 |
| **Version** | 1.0.0 |
| **Domain** | Quality Gates |
| **Quality Gate** | {{gate_id}} |

## Purpose

Document the recovery protocol for quality gates with FAIL outcome, following BMM 3-step recovery pattern.

---

## 1. Recovery Identification

| Attribute | Value |
|-----------|-------|
| Recovery ID | RCV-{gate_id}-{sequence} |
| Gate ID | {gate_id} |
| Gate Name | {gate_name} |
| Fail Date | {fail_date} |
| Recovery Owner | {owner} |
| Project | {{project_name}} |

---

## 2. Failure Analysis

### 2.1 Failed Items

| Item | Category | Classification | Gap Description |
|------|----------|----------------|-----------------|
| {item} | {category} | {CRITICAL/Non-critical} | {description} |

### 2.2 Root Cause Analysis

| Factor | Description | Contributing? |
|--------|-------------|---------------|
| Technical | {description} | {Yes/No} |
| Process | {description} | {Yes/No} |
| Resource | {description} | {Yes/No} |
| External | {description} | {Yes/No} |

### 2.3 Locked Categories

Categories that passed and are locked for recovery:

| Category | Status | Lock Date |
|----------|--------|-----------|
| {category} | LOCKED | {date} |

---

## 3. Recovery Protocol

### 3.1 Attempt 1 (Target: {timeframe})

| Action | Owner | Status | Due Date |
|--------|-------|--------|----------|
| {action} | {owner} | {status} | {date} |

**Attempt 1 Outcome:**

| Result | {PASS/FAIL} |
|--------|-------------|
| Date | {date} |
| Notes | {notes} |

### 3.2 Attempt 2 (If Attempt 1 Failed)

| Action | Owner | Status | Due Date |
|--------|-------|--------|----------|
| {action} | {owner} | {status} | {date} |

**Attempt 2 Outcome:**

| Result | {PASS/FAIL} |
|--------|-------------|
| Date | {date} |
| Notes | {notes} |

### 3.3 Mandatory Escalation (If Attempt 2 Failed)

| Escalation To | {role/person} |
|---------------|---------------|
| Escalation Date | {date} |
| Issue Summary | {summary} |
| Recommended Action | {action} |

**Escalation Outcome:**

| Decision | {description} |
|----------|---------------|
| Course Correction | {correction_plan} |
| Timeline Impact | {impact} |

---

## 4. Resource Allocation

### 4.1 Team Assignments

| Role | Person | Availability | Hours Allocated |
|------|--------|--------------|-----------------|
| {role} | {name} | {availability} | {hours} |

### 4.2 External Support (if needed)

| Support Type | Provider | Engagement Date |
|--------------|----------|-----------------|
| {type} | {provider} | {date} |

---

## 5. Progress Tracking

### 5.1 Daily Status

| Date | Status | Blockers | Next Steps |
|------|--------|----------|------------|
| {date} | {status} | {blockers} | {next} |

### 5.2 Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Items Fixed | {target} | {current} | {on_track/at_risk} |
| Tests Passing | {target}% | {current}% | {on_track/at_risk} |

---

## 6. Gate Re-evaluation

### 6.1 Re-evaluation Schedule

| Attempt | Scheduled Date | Actual Date | Outcome |
|---------|----------------|-------------|---------|
| 1 | {date} | {date} | {outcome} |
| 2 | {date} | {date} | {outcome} |

### 6.2 Final Outcome

| Final Result | {PASS/CONDITIONAL/FAIL} |
|--------------|-------------------------|
| Resolution Date | {date} |
| Resolution Notes | {notes} |

---

## 7. Lessons Learned

### 7.1 What Worked

| Item | Description |
|------|-------------|
| {item} | {description} |

### 7.2 What Didn't Work

| Item | Description | Improvement |
|------|-------------|-------------|
| {item} | {description} | {improvement} |

### 7.3 Process Improvements

| Improvement | Owner | Implementation Date |
|-------------|-------|---------------------|
| {improvement} | {owner} | {date} |

---

## Verification Checklist

- [ ] Failure analysis completed
- [ ] Root cause identified
- [ ] Locked categories documented
- [ ] Recovery actions defined
- [ ] Resources allocated
- [ ] Progress tracking active
- [ ] Re-evaluation scheduled
- [ ] Lessons learned captured

---

## Web Research Queries

For current recovery best practices:

```
software quality gate recovery patterns {date}
agile gate failure remediation {date}
release blockers resolution best practices {date}
```

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial template creation |
