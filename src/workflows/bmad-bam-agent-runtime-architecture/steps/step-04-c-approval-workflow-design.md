# Step 4: Approval Workflow Design

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

Design human-in-the-loop approval workflows that gate sensitive agent actions based on risk, cost, and policy requirements.

---

## Prerequisites

- Memory tier design complete (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Trigger Conditions

- Risk level thresholds (high-risk actions always require approval)
- Cost threshold (actions exceeding budget limits)
- Sensitivity classification (PII access, external communications)
- First-time tool usage for a tenant

### 2. Design Approval Queue System

- Per-tenant approval queues with priority levels
- Queue persistence (survive service restarts)
- Assignment rules (who can approve what)
- Bulk approval for similar requests

### 3. Configure Timeout Handling

- Auto-deny after configurable period (default: 24 hours)
- Notification escalation before timeout
- Partial completion handling (save progress, resume after approval)

### 4. Establish Escalation Rules

- Human override protocol for urgent cases
- Escalation tiers (approver → supervisor → admin)
- Emergency bypass procedures with audit logging

**Verify current best practices with web search:**
Search the web: "human-in-the-loop approval AI agent patterns {date}"
Search the web: "human-in-the-loop approval LLM orchestration {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-4 complete the core runtime design.** Present a summary of:
- Orchestration model
- Tool registry
- Memory tiers
- Approval workflows

Ask for confirmation before proceeding to evaluation and safety design.

---

## COLLABORATION MENUS (A/P/C):

After completing the approval workflow design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into escalation rules or timeout handling
- **P (Party Mode)**: Bring product and security perspectives on approval workflows
- **C (Continue)**: Accept approval workflow design and proceed to evaluation (soft gate)
- **[Specific refinements]**: Describe approval workflow concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: trigger conditions, queue design, escalation rules
- Process enhanced insights on human-in-loop patterns
- Ask user: "Accept these refined approval workflow decisions? (y/n)"
- If yes, integrate into approval workflow specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review human-in-the-loop approval workflows for multi-tenant AI platform"
- Process product and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save approval workflow design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Present soft gate summary for approval
- After approval, proceed to next step: `step-05-c-evaluation-foundation.md`

---

## Verification

- [ ] Trigger conditions defined
- [ ] Approval queue system designed
- [ ] Timeout handling configured
- [ ] Escalation rules established
- [ ] Patterns align with pattern registry

---

## Outputs

- Approval trigger rule configuration
- Queue schema and state machine definition
- Notification templates and channels
- Escalation policy document

---

## Next Step

Proceed to `step-05-c-evaluation-foundation.md` to design the evaluation framework.
