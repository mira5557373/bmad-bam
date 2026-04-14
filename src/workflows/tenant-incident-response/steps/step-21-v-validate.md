# Step 21: Validate Incident Response Plan

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

Validate the incident response plan against quality criteria, ensuring complete severity definitions, tenant isolation, communication procedures, and operational playbooks.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Validation Checklist

### Severity Levels
- [ ] All severity levels defined (SEV-1 through SEV-4)
- [ ] Tenant impact matrix complete
- [ ] Response time SLAs defined per severity
- [ ] Tier-based SLA modifiers documented
- [ ] Escalation triggers defined

### Isolation Protocol
- [ ] **CRITICAL:** Isolation mechanisms per tenant model documented
- [ ] **CRITICAL:** Tenant quarantine procedure defined
- [ ] Blast radius assessment method documented
- [ ] Selective isolation strategies defined
- [ ] Isolation verification checks documented

### Communication Plan
- [ ] Communication channels defined per severity
- [ ] Notification templates created for all phases
- [ ] **CRITICAL:** Tenant-specific communication rules documented
- [ ] Internal escalation contacts defined
- [ ] Update schedule documented per severity

### Recovery Procedures
- [ ] Recovery phases defined (stabilization through monitoring)
- [ ] **CRITICAL:** Data recovery procedures documented
- [ ] Service resumption steps defined
- [ ] **CRITICAL:** Tenant re-enablement protocol created
- [ ] Post-recovery validation defined

### Playbooks
- [ ] Database incident playbook present
- [ ] **CRITICAL:** AI agent incident playbook present
- [ ] **CRITICAL:** Tenant isolation breach playbook present
- [ ] Service degradation playbook present
- [ ] Authentication incident playbook present
- [ ] Each playbook has clear ownership

### Cross-Cutting
- [ ] Consistent with master architecture tenant model
- [ ] **CRITICAL:** Tenant isolation maintained in all procedures
- [ ] Contact information current and tested
- [ ] Playbooks tested in staging
- [ ] **CRITICAL:** QG-S9 (Incident Response Gate) criteria verified

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All components defined, critical checks pass, playbooks tested |
| **CONDITIONAL** | Minor gaps (e.g., contact info needs update) with mitigation plan |
| **FAIL** | Missing isolation protocol, no AI agent playbook, or no breach procedure |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and security perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on quality gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident response validation findings"
- Process QA and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
