# Step 1: Analyze Renewal Model

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

Analyze the existing contract and subscription model to understand renewal requirements, pricing structures, and contract terms that affect the renewal process.

---

## Prerequisites

- Master architecture document loaded with tenant model
- Tenant billing integration completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- User requirements and constraints for contract renewal
- Billing integration documentation (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Document Contract Types

Identify and document contract structures:

| Contract Type | Term | Auto-Renew | Notice Period | Price Lock |
|---------------|------|------------|---------------|------------|
| Monthly | 1 month | Yes (default) | None | Current rate |
| Annual | 12 months | Yes (default) | 30 days | 12 months |
| Multi-Year | 24-36 months | No | 60 days | Term length |
| Enterprise | Custom | Negotiated | 90 days | Negotiated |

### 2. Map Renewal Scenarios

Document all renewal scenarios:

| Scenario | Trigger | Action | Notification |
|----------|---------|--------|--------------|
| Auto-renew success | Term end | Charge and renew | Confirmation email |
| Auto-renew payment fail | Payment declined | Retry + grace | Urgent notification |
| Opt-out requested | User cancels | Schedule termination | Confirmation + offboarding |
| Price increase | New pricing | Notify, offer lock | Price change notice |
| Plan discontinuation | Plan sunset | Migration offer | Mandatory migration notice |
| Renegotiation | User request | Sales engagement | Negotiation start |

### 3. Define Pricing Update Rules

Specify how pricing changes affect renewals:

| Pricing Change | Effective Date | Grandfathering | Communication |
|----------------|----------------|----------------|---------------|
| Standard increase | Next renewal | 12 months | 60-day notice |
| Major increase (>10%) | Next renewal | 24 months | 90-day notice |
| Feature-based change | Immediate (new) | Existing users exempt | Feature announcement |
| Enterprise custom | Per contract | Per negotiation | Account manager |

### 4. Document Compliance Requirements

Identify legal/compliance considerations:

| Requirement | Jurisdiction | Impact on Renewal | Implementation |
|-------------|--------------|-------------------|----------------|
| Auto-renew disclosure | US (various states) | Clear opt-out | Pre-renewal notice |
| Price change notice | EU | 30-day minimum | Email + in-app |
| Cancellation rights | EU | 14-day cooling off | Easy cancel flow |
| Contract terms | Global | Accessible T&C | Updated at renewal |

**Verify current best practices with web search:**
Search the web: "SaaS contract renewal automation best practices {date}"
Search the web: "subscription renewal compliance requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the renewal model analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific contract types or scenarios
- **P (Party Mode)**: Bring legal and finance perspectives on renewal model
- **C (Continue)**: Accept renewal analysis and proceed to notification workflow design
- **[Specific refinements]**: Describe renewal model concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: contract types, renewal scenarios, pricing rules
- Process enhanced insights on renewal complexity
- Ask user: "Accept these refined renewal insights? (y/n)"
- If yes, integrate into renewal analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review contract renewal model for multi-tenant platform"
- Process legal and finance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save renewal model analysis to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-notification-workflows.md`

---

## Verification

- [ ] All contract types documented
- [ ] Renewal scenarios mapped
- [ ] Pricing update rules defined
- [ ] Compliance requirements identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Contract type matrix
- Renewal scenario definitions
- Pricing update rules
- Compliance requirements

---

## Next Step

Proceed to `step-02-c-design-notification-workflows.md` to design notification workflows.
