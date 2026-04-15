# Step 3: Configure Resolution Paths

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

Configure dispute resolution options and chargeback defense.

---

## Prerequisites

- Investigation workflow designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Define Resolution Options

| Resolution | Description | Automation |
|------------|-------------|------------|
| Invoice adjustment | Modify invoice amount | Semi-auto |
| Credit issuance | Issue account credit | Semi-auto |
| Full refund | Return all funds | Manual |
| Partial refund | Return portion | Manual |
| Dispute rejected | No action taken | Manual |
| Chargeback representation | Fight reversal | Manual |

### 2. Configure Chargeback Defense

| Phase | Timeline | Action |
|-------|----------|--------|
| Notification | Day 0 | Alert team |
| Evidence gathering | Day 0-3 | Compile proof |
| Representation | Day 3-7 | Submit defense |
| Pre-arbitration | Day 7-21 | Negotiate |
| Arbitration | Day 21+ | Final decision |

### 3. Design Resolution Workflow

| Decision | Outcome | Notification |
|----------|---------|--------------|
| Customer correct | Apply resolution | Email + in-app |
| Partial validity | Negotiate settlement | Email + call |
| Company correct | Explain with evidence | Email + call |
| Chargeback won | No action | Email |
| Chargeback lost | Accept loss | Internal |

### 4. Configure Post-Resolution Actions

| Action | Trigger | Automation |
|--------|---------|------------|
| Apply credit | Resolution approved | Automatic |
| Process refund | Resolution approved | Semi-auto |
| Update invoice | Adjustment approved | Automatic |
| Document outcome | All resolutions | Automatic |

**Verify current best practices with web search:**
Search the web: "dispute resolution SaaS billing {date}"
Search the web: "chargeback representation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into resolution paths
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept resolution paths and complete Create mode

Select an option:
```

---

## Soft Gate Checkpoint

**Steps 1-3 complete the billing disputes design.**

Present summary of:
- Dispute types and priority
- Investigation workflow
- Resolution options and chargeback defense

---

## Verification

- [ ] Resolution options defined
- [ ] Chargeback defense configured
- [ ] Resolution workflow designed
- [ ] Post-resolution actions specified

---

## Outputs

- Resolution paths specification
- Chargeback defense procedures
- **Load template:** `{project-root}/_bmad/bam/data/templates/billing-disputes-template.md`

---

## Next Step

Create mode complete. Proceed to Edit or Validate modes.
