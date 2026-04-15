# Step 3: Design Expiration Handling

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

Configure credit lifecycle and expiration handling.

---

## Prerequisites

- Application rules configured (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Define Expiration Policies

| Credit Type | Default Expiration | Extension Allowed |
|-------------|-------------------|-------------------|
| Promotional | 90 days | No |
| Service | 12 months | Yes (by CSM) |
| Prepaid | Never | N/A |
| Referral | 12 months | No |
| Goodwill | 6 months | Yes (by manager) |

### 2. Configure Notification Schedule

| Timing | Notification | Channel |
|--------|--------------|---------|
| 30 days before | Reminder | Email |
| 7 days before | Warning | Email + In-app |
| Day of | Final notice | Email |
| After expiry | Confirmation | Email |

### 3. Design Rollover Rules

| Scenario | Rollover |
|----------|----------|
| Prepaid balance | Yes, indefinite |
| Promotional | No rollover |
| Service credit | Case-by-case |

### 4. Configure Forfeiture Handling

| Forfeiture Reason | Treatment |
|-------------------|-----------|
| Expiration | Mark expired, no reversal |
| Account closure | Apply remaining, forfeit rest |
| Fraud detection | Void all credits |

**Verify current best practices with web search:**
Search the web: "credit expiration handling SaaS {date}"
Search the web: "prepaid balance forfeiture patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into expiration handling
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept handling and complete Create mode

Select an option:
```

---

## Soft Gate Checkpoint

**Steps 1-3 complete the credit management design.**

Present summary of:
- Credit types and attributes
- Application rules and priority
- Expiration and forfeiture handling

---

## Verification

- [ ] Expiration policies defined
- [ ] Notification schedule configured
- [ ] Rollover rules specified
- [ ] Forfeiture handling documented

---

## Outputs

- Expiration handling specification
- **Load template:** `{project-root}/_bmad/bam/data/templates/credit-management-template.md`

---

## Next Step

Create mode complete. Proceed to Edit or Validate modes.
