# Step 21: Validate Usage Alerts Design

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Track progress in `stepsCompleted` array

---

## Purpose

Validate the completeness and quality of the usage alerts design.

---

## Prerequisites

- Step 20: Load Artifact completed successfully

---

## Verification

### Alert Thresholds
- [ ] Percentage thresholds defined (50%, 75%, 90%, 100%)
- [ ] Absolute thresholds configured
- [ ] Rate-of-change alerts designed
- [ ] Forecast alerts specified

### Notification Channels
- [ ] Email notifications configured
- [ ] In-app notifications designed
- [ ] Webhooks specified
- [ ] SMS for critical alerts configured

### Escalation Paths
- [ ] Self-service paths defined
- [ ] Admin escalation configured
- [ ] Automatic actions specified
- [ ] Account management alerts designed

### Cross-Cutting
- [ ] Tenant isolation in alerts
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: All alert configurations complete
- **CONDITIONAL**: Minor gaps in channels or escalation
- **FAIL**: Missing thresholds or notification channels

---

## Actions

1. Load the relevant documents
2. Apply modifications as specified
3. Generate summary of changes

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept validation and proceed to report

Select an option:
```

---

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Next Step

Proceed to `step-22-v-generate-report.md`.
