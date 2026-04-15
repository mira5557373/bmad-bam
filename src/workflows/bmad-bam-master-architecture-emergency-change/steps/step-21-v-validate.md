# Step 21: Validate Emergency Change

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

---

## Purpose

Validate the emergency change documentation against process compliance criteria, ensuring proper approvals, complete impact assessment, and documented rollback procedures.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

---


## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### Validation Checklist

#### Emergency Documentation
- [ ] Severity level assigned and justified
- [ ] Emergency type classified
- [ ] Problem statement clear and specific
- [ ] Root cause documented
- [ ] Urgency justification provided
- [ ] Evidence collected and attached

#### Impact Assessment
- [ ] All affected architecture components listed
- [ ] Module impact matrix complete
- [ ] Dependency analysis performed
- [ ] Technical and business risks documented
- [ ] Risk mitigation strategies defined
- [ ] Minimal change scope identified

#### Approval
- [ ] All required approvers identified
- [ ] Approval package complete
- [ ] Approval status documented
- [ ] Any conditions recorded
- [ ] Post-emergency review committed

#### Implementation
- [ ] Pre-implementation checklist complete
- [ ] Architecture document updated with emergency notation
- [ ] Technical debt item created
- [ ] Validation steps completed
- [ ] Implementation log maintained

#### Dependent Updates
- [ ] All dependent artifacts identified
- [ ] Dependent artifacts updated
- [ ] Teams notified
- [ ] Post-emergency review scheduled
- [ ] Lessons learned documented

#### Process Compliance
- [ ] Emergency change ID assigned
- [ ] All phases documented
- [ ] Audit trail complete
- [ ] No approval bypass
- [ ] Rollback plan verified

### Gate Decision

- **PASS**: Full documentation, valid approval, complete implementation, dependents updated
- **CONDITIONAL**: Minor documentation gaps acceptable during active emergency
- **FAIL**: Missing approval, incomplete impact assessment, or no rollback plan

**CRITICAL FAILURE CONDITIONS:**
- Approval bypass - escalate immediately
- Undocumented architecture changes - halt and remediate
- No post-emergency review scheduled - require scheduling

Present validation results with specific findings for each phase.

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings and remediation
- **P (Party Mode)**: Bring QA and security perspectives on validation results
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, critical failures, remediation options
- Process enhanced insights on compliance gaps
- Ask user: "Accept this validation analysis? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review emergency change validation results: {summary of findings}"
- Process QA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per phase
- [ ] Critical failure conditions checked
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per phase
- Escalation requirements (if critical failures)

---

## Next Step

Generate validation report and return results to user. If critical failures detected, initiate escalation protocol.
