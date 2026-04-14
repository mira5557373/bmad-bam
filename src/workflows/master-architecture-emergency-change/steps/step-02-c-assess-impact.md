# Step 2: Assess Impact

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

Evaluate the full impact of the proposed architecture change.

---

## Prerequisites

- Emergency documented (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: local-dev

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### Architecture Impact Analysis

**Master Architecture Components Affected:**
- List each section of master architecture to be modified
- Current state of each component
- Proposed change to each component
- Rationale for each change

**Module Impact:**
| Module | Impact Type | Severity | Changes Required |
|--------|-------------|----------|------------------|
| ... | Breaking/Minor/None | High/Med/Low | Description |

### Dependency Analysis

**Upstream Impact:**
- Services that depend on changed components
- Contract changes required
- Migration complexity

**Downstream Impact:**
- Services that the changed components depend on
- Integration changes required
- Testing implications

### Risk Assessment

**Technical Risks:**
- What could go wrong during implementation
- Data integrity risks
- Performance risks
- Rollback complexity

**Business Risks:**
- Service disruption duration
- Customer impact
- Revenue impact
- Compliance implications

**Risk Mitigation:**
For each risk:
- Mitigation strategy
- Contingency plan
- Owner responsible

### Change Scope

Define the minimal change:
- What is the smallest change that addresses the emergency
- What can be deferred to post-emergency
- What additional changes would be beneficial but not critical

**Verify current best practices with web search:**
Search the web: "assess impact best practices {date}"
Search the web: "assess impact enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the impact assessment above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into dependency and risk analysis
- **P (Party Mode)**: Bring architect and DevOps perspectives for impact review
- **C (Continue)**: Accept impact assessment and proceed to approval
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass impact context: affected components, dependencies, risks identified
- Process enhanced insights on change impact
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review impact assessment for emergency architecture change: {summary of affected modules and risks}"
- Process collaborative analysis from architect and DevOps personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save impact assessment to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-get-approval.md`

---

## Verification

- [ ] Architecture components identified
- [ ] Module impact mapped
- [ ] Dependencies analyzed
- [ ] Risks assessed and mitigated
- [ ] Minimal change scope defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Impact assessment document
- Risk mitigation plan

---

## Next Step

Proceed to `step-03-c-get-approval.md` to obtain required approvals.
