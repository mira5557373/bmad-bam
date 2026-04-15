# Step 3: Design Conversion Workflows

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design automated conversion workflows that trigger based on engagement signals, including nurture sequences, sales handoffs, and self-service conversion paths.

---

## Prerequisites

- Step 2 completed: Engagement tracking design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: experimentation

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Self-Service Conversion Flow

Define the self-service upgrade path:

| Step | Trigger | Action | Outcome |
|------|---------|--------|---------|
| 1 | User clicks upgrade | Show plan selection | Plan selected |
| 2 | Plan selected | Display pricing details | Price confirmed |
| 3 | Price confirmed | Collect payment info | Payment ready |
| 4 | Payment ready | Process payment | Payment success/fail |
| 5 | Payment success | Provision paid tier | Upgrade complete |
| 6 | Upgrade complete | Send confirmation | Trial ended |

### 2. Design Nurture Sequence Workflows

Create automated email/notification sequences:

| Sequence | Trigger | Day 1 | Day 3 | Day 7 | Day 12 | Day 14 |
|----------|---------|-------|-------|-------|--------|--------|
| Onboarding | Trial start | Welcome + quickstart | Feature highlight | Success story | Value recap | Expiry warning |
| Re-engagement | Score < 30 | Check-in | Help offer | Demo invite | Special offer | Final notice |
| High Intent | Score > 120 | Thank you | Premium features | ROI calculator | Schedule call | Discount offer |
| Limit Hit | Usage > 80% | Limit notice | Upgrade benefits | Comparison | Urgency | Final upgrade |

### 3. Design Sales Handoff Workflow

Define when and how to hand off to sales:

| Trigger | Qualification | Handoff Action | SLA |
|---------|---------------|----------------|-----|
| Score > 120 | Enterprise signals | Assign to AE | 2 hours |
| Team size > 5 | Team plan fit | Assign to SDR | 4 hours |
| Pricing page > 3x | Price sensitivity | Offer demo | 24 hours |
| Support escalation | Complex needs | CS to Sales | 4 hours |
| Inbound request | Self-qualified | Immediate route | 1 hour |

### 4. Design Conversion Incentive Engine

Specify dynamic incentives:

| Incentive | Trigger | Eligibility | Expiry |
|-----------|---------|-------------|--------|
| Trial Extension | Day 12, score < 50 | First extension only | 7 days |
| Discount 10% | Day 14, no conversion | Annual plans only | 48 hours |
| Discount 20% | Day 21, extended trial | First 100 users/month | 24 hours |
| Free Month | Team upgrade | 3+ seats | 72 hours |
| Feature Unlock | High engagement | Select features | Trial end |

### 5. Define Conversion Events

Document system events during conversion:

| Event | Trigger | Subscribers | Side Effects |
|-------|---------|-------------|--------------|
| `conversion.started` | Upgrade initiated | Analytics, Sales | Log entry |
| `conversion.payment.pending` | Payment processing | Billing | Hold resources |
| `conversion.completed` | Payment success | All systems | Provision, notify |
| `conversion.failed` | Payment failed | Support, Analytics | Retry flow |
| `conversion.abandoned` | Cart abandoned | Marketing | Recovery email |

**Verify current best practices with web search:**
Search the web: "SaaS conversion workflow automation {date}"
Search the web: "trial conversion funnel optimization {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the conversion workflow design.**

Present summary of:
- Self-service conversion flow
- Nurture sequences by segment
- Sales handoff criteria
- Incentive engine rules

Ask for confirmation before proceeding to runbook creation.

---

## COLLABORATION MENUS (A/P/C):

After completing the conversion workflow design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific workflow branches
- **P (Party Mode)**: Bring marketing and sales perspectives on conversion flows
- **C (Continue)**: Accept conversion workflow design and proceed to runbook creation
- **[Specific refinements]**: Describe conversion workflow concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: conversion flows, nurture sequences, handoff rules
- Process enhanced insights on workflow completeness
- Ask user: "Accept these refined conversion workflows? (y/n)"
- If yes, integrate into conversion design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review conversion workflows for trial-to-paid optimization"
- Process marketing and sales perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save conversion workflow design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-create-runbook.md`

---

## Verification

- [ ] Self-service flow documented
- [ ] Nurture sequences defined per segment
- [ ] Sales handoff criteria specified
- [ ] Incentive engine rules documented
- [ ] Conversion events defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Self-service conversion flow
- Nurture sequence specifications
- Sales handoff workflow
- Incentive engine rules
- Conversion event definitions

---

## Next Step

Proceed to `step-04-c-create-runbook.md` to create the operational runbook.
