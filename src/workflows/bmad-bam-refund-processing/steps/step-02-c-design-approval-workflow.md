# Step 2: Design Approval Workflow

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Design the refund approval workflow with appropriate controls.

---

## Prerequisites

- Refund types defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Define Auto-Approval Thresholds

| Condition | Threshold | Approval |
|-----------|-----------|----------|
| Amount | < $50 | Auto-approve |
| Time since purchase | < 7 days | Auto-approve |
| Customer history | Good standing | Auto-approve |
| First refund | Any amount up to $200 | Auto-approve |

### 2. Configure Manual Approval Triggers

| Trigger | Approver Level |
|---------|----------------|
| Amount > $50 | Support lead |
| Amount > $500 | Finance manager |
| Amount > $5000 | Finance director |
| Multiple refunds | Support manager |
| Fraud flags | Security team |

### 3. Design Escalation Paths

| Scenario | Escalation | SLA |
|----------|------------|-----|
| Pending > 24h | Manager | 24h |
| Pending > 48h | Director | 48h |
| Customer complaint | Priority queue | 4h |

### 4. Configure Fraud Prevention

| Check | Action |
|-------|--------|
| Multiple refunds in 24h | Flag for review |
| Refund > 80% of LTV | Flag for review |
| Pattern matching | Alert security |
| Velocity check | Auto-reject |

**Verify current best practices with web search:**
Search the web: "refund approval workflow design {date}"
Search the web: "SaaS refund fraud prevention {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into approval workflow
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept workflow and proceed to gateway integration

Select an option:
```

---

## Verification

- [ ] Auto-approval thresholds defined
- [ ] Manual approval triggers configured
- [ ] Escalation paths designed
- [ ] Fraud prevention checks specified

---

## Outputs

- Approval workflow specification
- Threshold configuration

---

## Next Step

Proceed to `step-03-c-configure-gateway-integration.md`.
