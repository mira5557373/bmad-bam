# Step 1: Analyze Suspension States

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

Analyze the existing suspension states and data retention policies to understand the reactivation requirements for different suspension scenarios.

---

## Prerequisites

- Master architecture document loaded with tenant model
- Tenant suspension design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- User requirements and constraints for tenant reactivation
- Tenant suspension design document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Map Suspension States

Document all suspension states that require reactivation paths:

| State | Cause | Data Status | Reactivation Path |
|-------|-------|-------------|-------------------|
| Soft Suspended | Payment failure | Preserved, read-only | Payment update |
| Hard Suspended | Policy violation | Preserved, no access | Appeal + resolution |
| Grace Period | Voluntary churn | Preserved (30 days) | Re-subscribe |
| Archived | Past grace period | Cold storage | Full restoration |
| Churned | Completed offboarding | Deleted/anonymized | New account + import |

### 2. Define Data Retention by State

Map data availability per suspension state:

| Data Type | Soft Suspended | Hard Suspended | Grace Period | Archived | Churned |
|-----------|----------------|----------------|--------------|----------|---------|
| User accounts | Full access | Read-only | Full access | Restorable | Deleted |
| Application data | Read-only | Locked | Read-only | Restorable | Deleted |
| AI models/configs | Preserved | Locked | Preserved | Cold storage | Deleted |
| Audit logs | Available | Available | Available | Available | Anonymized |
| Integrations | Disabled | Disabled | Disabled | Restorable | Deleted |

### 3. Identify Reactivation Triggers

Document events that initiate reactivation:

| Trigger | Source | Validation | Workflow |
|---------|--------|------------|----------|
| Payment success | Billing system | Valid payment method | Auto-reactivate |
| Appeal approved | Admin action | Resolution documented | Manual review |
| Re-subscription | User action | Plan selected, payment | Self-service |
| Restoration request | Support ticket | Identity verified | Assisted restore |
| Win-back conversion | Marketing campaign | Offer accepted | Campaign flow |

### 4. Map Grace Period Rules

Define grace period handling:

| Scenario | Grace Period | Data Retention | Extension Policy |
|----------|--------------|----------------|------------------|
| Payment failure | 14 days | Full preservation | +7 days on request |
| Voluntary churn | 30 days | Full preservation | +30 days (once) |
| Policy violation | 0 days | Locked immediately | Appeal process |
| Trial expiry | 7 days | Limited preservation | N/A |

**Verify current best practices with web search:**
Search the web: "SaaS tenant reactivation patterns {date}"
Search the web: "suspended account recovery best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the suspension state analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific suspension states
- **P (Party Mode)**: Bring legal and customer success perspectives on reactivation
- **C (Continue)**: Accept suspension analysis and proceed to reactivation flow design
- **[Specific refinements]**: Describe suspension state concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: suspension states, data retention, grace periods
- Process enhanced insights on reactivation complexity
- Ask user: "Accept these refined suspension insights? (y/n)"
- If yes, integrate into suspension analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review suspension states for multi-tenant platform reactivation"
- Process legal and customer success perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save suspension analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-reactivation-flows.md`

---

## Verification

- [ ] All suspension states documented
- [ ] Data retention mapped per state
- [ ] Reactivation triggers identified
- [ ] Grace period rules defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Suspension state matrix
- Data retention mapping
- Reactivation trigger definitions
- Grace period rules

---

## Next Step

Proceed to `step-02-c-design-reactivation-flows.md` to design reactivation flows.
