# Step 2: Configure Application Rules

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

Design credit application rules and priority order.

---

## Prerequisites

- Credit types defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Define Application Priority

| Priority | Credit Type | Rationale |
|----------|-------------|-----------|
| 1 | Promotional | Expire soonest |
| 2 | Goodwill | Short expiration |
| 3 | Service | Medium expiration |
| 4 | Referral | Medium expiration |
| 5 | Prepaid | Never expires |

### 2. Configure Partial Application

| Scenario | Handling |
|----------|----------|
| Credit > Invoice | Apply partial, retain balance |
| Credit < Invoice | Apply full, charge remainder |
| Multiple credits | Apply in priority order |

### 3. Define Application Restrictions

| Restriction | Rule |
|-------------|------|
| Minimum invoice | Credits apply only if invoice > $0 |
| Same tenant | Credits cannot transfer |
| Currency match | Must match or convert |
| Expired credits | Excluded from application |

### 4. Configure Proration Rules

| Scenario | Proration |
|----------|-----------|
| Mid-cycle cancellation | No credit proration |
| Partial refund | Pro-rata credit |
| Service credit | Full value applied |

**Verify current best practices with web search:**
Search the web: "credit application rules SaaS billing {date}"
Search the web: "prepaid balance application order {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into application rules
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept rules and proceed to expiration handling

Select an option:
```

---

## Verification

- [ ] Application priority defined
- [ ] Partial application configured
- [ ] Application restrictions specified
- [ ] Proration rules documented

---

## Outputs

- Application rules specification
- Priority order documentation

---

## Next Step

Proceed to `step-03-c-design-expiration-handling.md`.
