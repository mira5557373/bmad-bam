# Step 1: Define Dispute Types

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

Define the complete dispute type taxonomy and handling rules.

---

## Prerequisites

- Invoice generation and payment processing designs completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Define Dispute Categories

| Dispute Type | Description | SLA |
|--------------|-------------|-----|
| Usage dispute | Disagree with usage amount | 5 business days |
| Pricing dispute | Disagree with rate charged | 3 business days |
| Duplicate charge | Charged twice | 24 hours |
| Chargeback | Bank-initiated reversal | 7 business days |
| Service credit | SLA violation claim | 3 business days |
| Unauthorized | Didn't authorize charge | 24 hours |

### 2. Define Dispute Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| dispute_id | string | Yes | Unique identifier |
| tenant_id | string | Yes | Tenant reference |
| invoice_id | string | No | Related invoice |
| charge_id | string | No | Related charge |
| type | enum | Yes | Dispute category |
| amount | decimal | Yes | Disputed amount |
| description | string | Yes | Customer description |
| evidence | array | No | Supporting documents |
| status | enum | Yes | Processing status |
| resolution | string | No | Outcome details |

### 3. Define Dispute States

| State | Transitions To | Trigger |
|-------|----------------|---------|
| opened | investigating | Acknowledgment |
| investigating | resolved, escalated | Evidence review |
| escalated | resolved | Manager decision |
| resolved | (terminal) | Resolution applied |

### 4. Configure Priority Matrix

| Type + Amount | Priority | Response SLA |
|---------------|----------|--------------|
| Chargeback | Critical | 2 hours |
| Unauthorized + any | High | 4 hours |
| Any + >$1000 | High | 4 hours |
| Usage/Pricing | Medium | 8 hours |
| Service credit | Normal | 24 hours |

**Verify current best practices with web search:**
Search the web: "billing dispute management SaaS {date}"
Search the web: "chargeback dispute resolution best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into dispute types
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept dispute types and proceed to investigation workflow

Select an option:
```

---

## Verification

- [ ] Dispute categories defined
- [ ] Dispute attributes specified
- [ ] Dispute states with transitions
- [ ] Priority matrix configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Dispute type taxonomy
- Dispute attribute schema

---

## Next Step

Proceed to `step-02-c-design-investigation-workflow.md`.
