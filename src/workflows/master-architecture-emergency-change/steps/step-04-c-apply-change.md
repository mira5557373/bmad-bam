# Step 4: Apply Change

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

Execute the approved emergency architecture change.

---

## Prerequisites

- Approval obtained (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation,testing-isolation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### Pre-Implementation Checklist

- [ ] Approval documented and filed
- [ ] Implementation team assembled
- [ ] Communication sent to affected teams
- [ ] Rollback procedures verified
- [ ] Monitoring dashboards prepared
- [ ] On-call support alerted

### Master Architecture Update

**Update Process:**
1. Create branch for architecture document changes
2. Apply changes to master architecture document
3. Mark sections with emergency change notation:
   ```markdown
   <!-- EMERGENCY CHANGE: EMG-YYYY-NNN -->
   <!-- Date: YYYY-MM-DD -->
   <!-- Reason: Brief description -->
   [Changed content]
   <!-- END EMERGENCY CHANGE -->
   ```
4. Create technical debt item for post-emergency review
5. Commit with reference to emergency ID

### Implementation Coordination

**Parallel Tracks:**
1. Documentation update (master architecture)
2. Module code changes (affected modules)
3. Infrastructure changes (if applicable)
4. Testing and validation

**Communication Points:**
- Implementation started notification
- Mid-implementation status update
- Implementation complete notification
- Validation complete notification

### Validation

Before declaring complete:
- [ ] Architecture document updated
- [ ] All affected modules updated
- [ ] Tests pass (existing and new)
- [ ] Security scan (if security-related)
- [ ] Compliance check (if compliance-related)
- [ ] Monitoring confirms stability

**Verify current best practices with web search:**
Search the web: "apply change best practices {date}"
Search the web: "apply change enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the change implementation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation and rollback readiness
- **P (Party Mode)**: Bring DevOps and QA perspectives for implementation review
- **C (Continue)**: Accept implementation and proceed to update dependents
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass implementation context: changes applied, validation status, rollback readiness
- Process enhanced insights on implementation quality
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into implementation log
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review implementation of emergency architecture change: {summary of changes applied}"
- Process collaborative analysis from DevOps and QA personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save implementation log to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-update-dependents.md`

---

## Verification

- [ ] Pre-implementation checklist complete
- [ ] Architecture document updated
- [ ] Implementation coordinated
- [ ] Validation passed
- [ ] Patterns align with pattern registry

---

## Outputs

- Implementation log
- Change evidence
- Validation results

---

## Next Step

Proceed to `step-05-c-update-dependents.md` to propagate changes.
