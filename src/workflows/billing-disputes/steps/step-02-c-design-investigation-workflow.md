# Step 2: Design Investigation Workflow

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

Design the dispute investigation process and evidence collection.

---

## Prerequisites

- Dispute types defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Configure Evidence Collection

| Evidence Type | Source | Auto-Collect |
|---------------|--------|--------------|
| Usage logs | Metering system | Yes |
| API call logs | Gateway | Yes |
| Invoice history | Billing system | Yes |
| Payment records | Payment gateway | Yes |
| Contract terms | CRM | Yes |
| Communication history | Support system | No |

### 2. Design Timeline Reconstruction

| Step | Action | Output |
|------|--------|--------|
| 1 | Identify disputed period | Date range |
| 2 | Pull usage events | Event timeline |
| 3 | Cross-reference invoices | Billing timeline |
| 4 | Map to contract terms | Expected vs actual |

### 3. Configure Root Cause Analysis

| Issue Type | Investigation Path |
|------------|-------------------|
| Metering error | Verify event collection |
| Pricing mismatch | Check rate card version |
| Duplicate charge | Verify idempotency |
| Technical failure | Review system logs |

### 4. Define Documentation Requirements

| Dispute Type | Required Evidence |
|--------------|-------------------|
| Chargeback | Transaction proof, delivery proof |
| Usage | Detailed usage logs, calculation proof |
| Pricing | Contract, rate card, calculation |
| Unauthorized | Auth logs, IP addresses |

**Verify current best practices with web search:**
Search the web: "billing dispute investigation workflow {date}"
Search the web: "chargeback evidence collection {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into investigation workflow
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept workflow and proceed to resolution paths

Select an option:
```

---

## Verification

- [ ] Evidence collection configured
- [ ] Timeline reconstruction designed
- [ ] Root cause analysis paths defined
- [ ] Documentation requirements specified

---

## Outputs

- Investigation workflow specification
- Evidence collection procedures

---

## Next Step

Proceed to `step-03-c-configure-resolution-paths.md`.
