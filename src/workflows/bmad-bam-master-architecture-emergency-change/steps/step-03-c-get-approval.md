# Step 3: Get Approval

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

Obtain necessary approvals for the emergency architecture change.

---

## Prerequisites

- Impact assessed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: event-driven

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### Approval Requirements

**Required Approvers:**
- Platform Architect (Atlas) - Technical approval
- Engineering Director - Resource and priority approval
- Security Lead - Security implications sign-off
- Compliance Officer - Compliance implications sign-off (if applicable)

### Approval Package

Prepare approval documentation:
- Emergency change request (from Step 1)
- Impact assessment (from Step 2)
- Proposed change specification
- Implementation timeline
- Rollback plan
- Post-emergency review commitment

### Approval Process

**Synchronous Review (Recommended for Critical):**
- Emergency architecture review meeting
- All required approvers present
- Real-time discussion and decision
- Decision documented in meeting notes

**Asynchronous Review (For High/Medium):**
- Distribute approval package
- Set decision deadline (24-48 hours)
- Collect written approvals
- Escalate if deadlock

### Approval Criteria

Approvers evaluate:
- Is this truly an emergency requiring frozen architecture change?
- Is the proposed change the minimal necessary?
- Are risks adequately mitigated?
- Is the rollback plan viable?
- Is the post-emergency review scheduled?

### Approval Record

Document the approval:
```markdown
## Emergency Architecture Change Approval

**Change ID:** EMG-YYYY-NNN
**Date:** YYYY-MM-DD
**Status:** APPROVED / REJECTED / CONDITIONAL

### Approvals
| Role | Name | Decision | Conditions |
|------|------|----------|------------|
| Platform Architect | ... | Approved | ... |
| Engineering Director | ... | Approved | ... |
| ... | ... | ... | ... |

### Conditions (if any)
- Condition 1
- Condition 2

### Post-Emergency Commitment
- Review scheduled: YYYY-MM-DD
- Technical debt item created: Yes/No
```

**Verify current best practices with web search:**
Search the web: "get approval best practices {date}"
Search the web: "get approval enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After preparing the approval package above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into approval criteria and stakeholder concerns
- **P (Party Mode)**: Bring PM and architect perspectives for approval strategy
- **C (Continue)**: Accept approval documentation and proceed to apply change
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass approval context: stakeholder list, approval criteria, potential blockers
- Process enhanced insights on approval strategy
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into approval package
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review approval strategy for emergency architecture change: {summary of change and approvers}"
- Process collaborative analysis from PM and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save approval documentation to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-apply-change.md`

---

## Verification

- [ ] Approval package prepared
- [ ] All required approvers contacted
- [ ] Approval criteria evaluated
- [ ] Decision documented
- [ ] Conditions recorded
- [ ] Patterns align with pattern registry

---

## Outputs

- Signed approval document
- Conditions and commitments

---

## Next Step

Proceed to `step-04-c-apply-change.md` to execute the change.
