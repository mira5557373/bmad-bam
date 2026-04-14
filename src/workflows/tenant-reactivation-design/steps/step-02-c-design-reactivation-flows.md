# Step 2: Design Reactivation Flows

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

Design the reactivation flows for each suspension state, including self-service recovery, assisted restoration, and win-back campaign integration.

---

## Prerequisites

- Step 1 completed: Suspension state analysis
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Self-Service Reactivation Flow

Define the self-service recovery path for payment-related suspensions:

| Step | Screen | Action | Validation |
|------|--------|--------|------------|
| 1 | Login | User authenticates | Account exists, suspended |
| 2 | Suspension Notice | Display reason, resolution | User acknowledges |
| 3 | Payment Update | Update payment method | Valid payment info |
| 4 | Plan Confirmation | Confirm current/new plan | Plan selected |
| 5 | Payment Processing | Process outstanding balance | Payment success |
| 6 | Reactivation | Enable account access | All checks pass |
| 7 | Welcome Back | Confirm restoration, feature tour | Complete |

### 2. Design Assisted Restoration Flow

Define support-assisted reactivation for archived/complex cases:

| Step | Actor | Action | SLA |
|------|-------|--------|-----|
| 1 | User | Submit restoration request | - |
| 2 | Support | Verify identity | 2 hours |
| 3 | Support | Review account history | 4 hours |
| 4 | Support | Initiate data restoration | 24 hours |
| 5 | System | Restore from cold storage | 24-48 hours |
| 6 | Support | Verify restoration complete | 4 hours |
| 7 | User | Confirm data integrity | - |
| 8 | System | Full reactivation | 1 hour |

### 3. Design Win-Back Campaign Flow

Define marketing-driven reactivation:

| Trigger | Campaign | Offer | Conversion Path |
|---------|----------|-------|-----------------|
| 30 days post-churn | Email 1 | "We miss you" | Direct reactivation link |
| 45 days post-churn | Email 2 | 20% discount | Discounted plan |
| 60 days post-churn | Email 3 | Extended trial | Free month |
| 90 days post-churn | Final email | Best offer | VIP onboarding |

### 4. Design Appeal and Review Flow

Define reactivation path for policy violations:

| Step | Actor | Action | Duration |
|------|-------|--------|----------|
| 1 | User | Submit appeal | - |
| 2 | Trust & Safety | Review violation | 48 hours |
| 3 | Trust & Safety | Request additional info | If needed |
| 4 | User | Provide information | 7 days |
| 5 | Trust & Safety | Final decision | 48 hours |
| 6 | Admin | Approve/deny reactivation | 24 hours |
| 7 | System | Execute decision | 1 hour |

### 5. Define Reactivation Events

Document system events during reactivation:

| Event | Trigger | Payload | Subscribers |
|-------|---------|---------|-------------|
| `reactivation.requested` | User initiates | tenant_id, reason | Analytics, Support |
| `reactivation.payment.received` | Payment success | amount, method | Billing, Provisioning |
| `reactivation.data.restoring` | Restoration started | tenant_id, scope | Ops, User |
| `reactivation.completed` | Full reactivation | tenant_id, method | All systems |
| `reactivation.failed` | Any failure | error_code, step | Support, Analytics |

**Verify current best practices with web search:**
Search the web: "SaaS customer win-back strategies {date}"
Search the web: "suspended account reactivation UX patterns {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-2 complete the reactivation flow design.**

Present summary of:
- Suspension state analysis
- Self-service reactivation flow
- Assisted restoration process
- Win-back campaign strategy

Ask for confirmation before proceeding to data restoration design.

---

## COLLABORATION MENUS (A/P/C):

After completing the reactivation flow design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific reactivation flows
- **P (Party Mode)**: Bring customer success and marketing perspectives
- **C (Continue)**: Accept reactivation flows and proceed to data restoration design
- **[Specific refinements]**: Describe reactivation flow concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: reactivation flows, win-back campaigns, appeal process
- Process enhanced insights on reactivation complexity
- Ask user: "Accept these refined reactivation flows? (y/n)"
- If yes, integrate into reactivation design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review reactivation flows for multi-tenant platform"
- Process customer success and marketing perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save reactivation flow design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-data-restoration.md`

---

## Verification

- [ ] Self-service flow documented
- [ ] Assisted restoration flow defined
- [ ] Win-back campaigns specified
- [ ] Appeal process documented
- [ ] Reactivation events defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Self-service reactivation flow
- Assisted restoration procedure
- Win-back campaign specifications
- Appeal and review process
- Reactivation event definitions

---

## Next Step

Proceed to `step-03-c-design-data-restoration.md` to design data restoration procedures.
