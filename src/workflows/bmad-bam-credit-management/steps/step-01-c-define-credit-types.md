# Step 1: Define Credit Types

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

Define the complete credit type taxonomy and attributes.

---

## Prerequisites

- Invoice generation design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Define Credit Categories

| Credit Type | Source | Typical Amount | Expiration |
|-------------|--------|----------------|------------|
| Promotional | Marketing | $10-$1000 | 90 days |
| Service | SLA violation | Variable | 12 months |
| Prepaid | Customer purchase | Custom | Never |
| Referral | Referral program | $50-$500 | 12 months |
| Goodwill | Support discretion | $10-$100 | 6 months |

### 2. Define Credit Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| credit_id | string | Yes | Unique identifier |
| tenant_id | string | Yes | Owning tenant |
| credit_type | enum | Yes | Category |
| amount | decimal | Yes | Credit value |
| currency | string | Yes | ISO currency |
| issued_date | ISO8601 | Yes | Creation date |
| expiration_date | ISO8601 | No | Expiry date |
| reason | string | Yes | Issuance reason |
| issued_by | string | Yes | Issuer reference |

### 3. Define Credit States

| State | Transitions To | Trigger |
|-------|----------------|---------|
| active | applied, expired, voided | Usage/time/admin |
| applied | (terminal) | Applied to invoice |
| expired | (terminal) | Past expiration |
| voided | (terminal) | Administrative action |

### 4. Configure Currency Handling

| Scenario | Handling |
|----------|----------|
| Same currency | Direct application |
| Different currency | Convert at application time |
| Multi-currency credits | Track original + converted |

**Verify current best practices with web search:**
Search the web: "SaaS credit management system design {date}"
Search the web: "promotional credit best practices billing {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into credit types
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept credit types and proceed to application rules

Select an option:
```

---

## Verification

- [ ] Credit categories defined
- [ ] Credit attributes specified
- [ ] Credit states with transitions
- [ ] Currency handling configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Credit type taxonomy
- Credit attribute schema

---

## Next Step

Proceed to `step-02-c-configure-application-rules.md`.
