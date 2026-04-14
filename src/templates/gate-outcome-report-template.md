---
name: gate-outcome-report-template
description: Standard template for documenting quality gate evaluation outcomes
category: quality-gates
version: "1.0.0"
---

# Quality Gate Outcome Report

## Document Information

| Field | Value |
|-------|-------|
| **Template ID** | TPL-GOR-001 |
| **Version** | 1.0.0 |
| **Domain** | Quality Gates |
| **Quality Gate** | {{gate_id}} |

## Purpose

Document quality gate evaluation outcomes following BMM four-outcome model (PASS/CONDITIONAL/FAIL/WAIVED).

---

## 1. Gate Identification

| Attribute | Value |
|-----------|-------|
| Gate ID | {gate_id} |
| Gate Name | {gate_name} |
| BMM Phase | {bmm_phase} |
| Evaluation Date | {date} |
| Evaluator | {evaluator} |
| Project | {{project_name}} |

---

## 2. Evaluation Summary

### 2.1 Overall Outcome

| Outcome | Description |
|---------|-------------|
| **{PASS/CONDITIONAL/FAIL/WAIVED}** | {outcome_description} |

### 2.2 Category Results

| Category | Classification | Result | Notes |
|----------|----------------|--------|-------|
| {category_1} | CRITICAL | {PASS/FAIL} | {notes} |
| {category_2} | CRITICAL | {PASS/FAIL} | {notes} |
| {category_3} | Non-critical | {PASS/FAIL/WAIVED} | {notes} |

---

## 3. Detailed Findings

### 3.1 Passing Items

| Item | Evidence | Verified By |
|------|----------|-------------|
| {item} | {evidence_link} | {verifier} |

### 3.2 Failing Items (if FAIL outcome)

| Item | Gap Description | Severity | Remediation Required |
|------|-----------------|----------|----------------------|
| {item} | {description} | {CRITICAL/High/Medium} | {remediation} |

### 3.3 Conditional Items (if CONDITIONAL outcome)

| Item | Condition | Mitigation Plan | Deadline |
|------|-----------|-----------------|----------|
| {item} | {condition} | {plan} | {deadline} |

### 3.4 Waived Items (if applicable)

| Item | Justification | Approver | Expiration |
|------|---------------|----------|------------|
| {item} | {justification} | {approver} | {expiration_date} |

---

## 4. Evidence Collection

### 4.1 Documentation Evidence

| Document | Location | Status |
|----------|----------|--------|
| {document} | {path_or_url} | {verified/missing} |

### 4.2 Test Evidence

| Test Suite | Results | Coverage |
|------------|---------|----------|
| {test_suite} | {pass_rate}% | {coverage}% |

### 4.3 Audit Trail

| Action | Actor | Timestamp | System |
|--------|-------|-----------|--------|
| {action} | {actor} | {timestamp} | {system} |

---

## 5. Decision

### 5.1 Gate Decision

| Decision | {PROCEED / CONDITIONAL PROCEED / BLOCKED} |
|----------|-------------------------------------------|
| Rationale | {rationale} |
| Conditions | {conditions_if_any} |
| Next Steps | {next_steps} |

### 5.2 Approvals

| Role | Name | Decision | Date |
|------|------|----------|------|
| Gate Owner | {name} | {APPROVE/REJECT} | {date} |
| Technical Lead | {name} | {APPROVE/REJECT} | {date} |
| Product Owner | {name} | {APPROVE/REJECT} | {date} |

---

## 6. Follow-up Actions

| Action ID | Description | Owner | Due Date | Status |
|-----------|-------------|-------|----------|--------|
| {id} | {action} | {owner} | {due_date} | {status} |

---

## Verification Checklist

- [ ] All gate criteria evaluated
- [ ] Evidence collected and linked
- [ ] Outcome determined per BMM model
- [ ] Approvals obtained
- [ ] Follow-up actions documented

---

## Web Research Queries

For current gate evaluation best practices:

```
quality gate evaluation best practices {date}
software release gate patterns {date}
gate outcome documentation standards {date}
```

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial template creation |
