# Step 4: Define Bypass Policy

## Purpose

Define policies for bypassing quality gates in exceptional circumstances.

## Actions

### 1. Define Bypass Conditions

| Gate | Bypassable | Condition | Approval Required |
|------|------------|-----------|-------------------|
| QG-M2 | No | Never | N/A |
| QG-I1 | Limited | Hotfix only | Tech Lead + PM |
| QG-I2 | No | Never | N/A |
| QG-I3 | No | Never | N/A |
| QG-P1 | Yes | Emergency | VP + Security |

### 2. Define Bypass Workflow

1. Requestor submits bypass request with justification
2. Required approvers notified
3. Approvers review and approve/reject
4. If approved, bypass token generated
5. Token used in pipeline (single use)
6. Audit log entry created

### 3. Define Bypass Limits

| Constraint | Value |
|------------|-------|
| Max bypasses per gate per month | 2 |
| Bypass token expiry | 4 hours |
| Remediation SLA | 48 hours |

## Web Research Verification

Search the web: "quality gate bypass policy best practices {date}"
Search the web: "CI/CD emergency bypass governance {date}"

## Verification

- [ ] Bypass conditions defined
- [ ] Workflow documented
- [ ] Limits established

## Outputs

- Bypass policy document

## Next Step

Proceed to `step-05-c-generate-pipeline-config.md`.
