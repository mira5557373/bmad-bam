# Step 1: Define Refund Types

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Define the complete refund type taxonomy and processing rules.

---

## Prerequisites

- Payment processing design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Define Refund Categories

| Refund Type | Description | Destination |
|-------------|-------------|-------------|
| Full refund | Complete invoice reversal | Original payment method |
| Partial refund | Portion of invoice | Original payment method |
| Credit refund | Refund to account balance | Credit balance |
| Prorated refund | Time-based calculation | Original or credit |

### 2. Define Refund Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| refund_id | string | Yes | Unique identifier |
| tenant_id | string | Yes | Tenant reference |
| invoice_id | string | Yes | Source invoice |
| amount | decimal | Yes | Refund amount |
| type | enum | Yes | Refund category |
| reason | string | Yes | Refund justification |
| requested_by | string | Yes | Requestor |
| approved_by | string | No | Approver (if required) |
| status | enum | Yes | Processing status |

### 3. Define Refund Policies

| Policy | Rule |
|--------|------|
| Time limit | 30 days from invoice |
| Minimum amount | $1.00 |
| Maximum amount | Original invoice total |
| Currency | Same as original |

### 4. Configure Refund States

| State | Transitions To | Trigger |
|-------|----------------|---------|
| requested | pending_approval, approved | Request/auto-approve |
| pending_approval | approved, rejected | Manager decision |
| approved | processing | Approval received |
| processing | completed, failed | Gateway response |
| completed | (terminal) | Refund success |
| failed | processing, rejected | Gateway failure |
| rejected | (terminal) | Denial |

**Verify current best practices with web search:**
Search the web: "refund processing workflow SaaS {date}"
Search the web: "payment refund best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into refund types
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept refund types and proceed to approval workflow

Select an option:
```

---

## Verification

- [ ] Refund categories defined
- [ ] Refund attributes specified
- [ ] Refund policies documented
- [ ] Refund states with transitions
- [ ] Patterns align with pattern registry

---

## Outputs

- Refund type taxonomy
- Refund attribute schema

---

## Next Step

Proceed to `step-02-c-design-approval-workflow.md`.
