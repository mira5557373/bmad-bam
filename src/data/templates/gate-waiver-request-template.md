---
name: gate-waiver-request-template
description: Template for requesting WAIVED outcome on non-critical gate items
category: quality-gates
version: "1.0.0"
---

# Quality Gate Waiver Request

## Document Information

| Field | Value |
|-------|-------|
| **Template ID** | TPL-GWR-001 |
| **Version** | 1.0.0 |
| **Domain** | Quality Gates |
| **Quality Gate** | {{gate_id}} |

## Purpose

Request WAIVED outcome for non-critical quality gate items with proper justification and stakeholder approval.

---

## 1. Waiver Identification

| Attribute | Value |
|-----------|-------|
| Waiver ID | WVR-{gate_id}-{sequence} |
| Gate ID | {gate_id} |
| Gate Name | {gate_name} |
| Request Date | {date} |
| Requestor | {requestor} |
| Project | {{project_name}} |

---

## 2. Items Requested for Waiver

### 2.1 Item Details

| Item | Checklist Section | Classification |
|------|-------------------|----------------|
| {item_name} | {section} | Non-critical |

**Note:** CRITICAL items cannot be waived per BMM/TEA gate standards.

### 2.2 Current Status

| Aspect | Status |
|--------|--------|
| Item Completion | {percent}% |
| Gap Description | {description} |
| Blocking Factors | {factors} |

---

## 3. Business Justification

### 3.1 Reason for Waiver

{detailed_reason}

### 3.2 Business Impact

| Impact Area | Description | Severity |
|-------------|-------------|----------|
| {area} | {impact} | {Low/Medium} |

### 3.3 Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| {risk} | {likelihood} | {impact} | {mitigation} |

---

## 4. Compensating Controls

### 4.1 Alternative Measures

| Control | Description | Effectiveness |
|---------|-------------|---------------|
| {control} | {description} | {effectiveness} |

### 4.2 Monitoring Plan

| Metric | Threshold | Alert |
|--------|-----------|-------|
| {metric} | {threshold} | {alert_action} |

---

## 5. Timeline

### 5.1 Waiver Duration

| Attribute | Value |
|-----------|-------|
| Effective Date | {start_date} |
| Expiration Date | {end_date} |
| Review Date | {review_date} |

### 5.2 Remediation Plan

| Milestone | Target Date | Owner |
|-----------|-------------|-------|
| {milestone} | {date} | {owner} |

---

## 6. Approval Chain

### 6.1 Required Approvals

| Role | Name | Decision | Date | Comments |
|------|------|----------|------|----------|
| Technical Lead | {name} | {APPROVE/REJECT} | {date} | {comments} |
| Product Owner | {name} | {APPROVE/REJECT} | {date} | {comments} |
| Gate Owner | {name} | {APPROVE/REJECT} | {date} | {comments} |

### 6.2 Final Decision

| Decision | {APPROVED / REJECTED} |
|----------|----------------------|
| Decision Date | {date} |
| Decision Rationale | {rationale} |

---

## 7. Post-Waiver Tracking

### 7.1 Follow-up Ticket

| Ticket ID | {ticket_id} |
|-----------|-------------|
| Description | {description} |
| Assignee | {assignee} |
| Due Date | {due_date} |

### 7.2 Review Schedule

| Review Type | Date | Outcome |
|-------------|------|---------|
| Initial Review | {date} | {outcome} |
| Follow-up Review | {date} | {outcome} |
| Closure Review | {date} | {outcome} |

---

## Verification Checklist

- [ ] Item is classified as Non-critical
- [ ] Business justification documented
- [ ] Risk assessment completed
- [ ] Compensating controls defined
- [ ] Remediation plan created
- [ ] All approvals obtained
- [ ] Follow-up ticket created
- [ ] Expiration date set

---

## Web Research Queries

For current waiver management best practices:

```
quality gate waiver best practices {date}
software release exception management {date}
compliance waiver documentation standards {date}
```

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {{date}} | {{author}} | Initial template creation |
