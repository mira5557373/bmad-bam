# Step 21: Validate Mismatch Recovery

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

This step validates the completeness and quality of the facade mismatch recovery process, ensuring that mismatches are properly detected, analyzed, resolved, and prevented from recurring.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts



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

## Verification Checklist

### Detection Phase
- [ ] Mismatch clearly identified (modules, operations, symptoms)
- [ ] Mismatch type classified (schema, signature, semantic, version)
- [ ] Evidence documented (logs, test failures, error messages)
- [ ] Discovery context recorded

### Analysis Phase
- [ ] Contract vs implementation diff documented
- [ ] Divergence origin identified
- [ ] Root cause determined
- [ ] Impact assessment completed for all consumers
- [ ] Risk level classified

### Resolution Strategy
- [ ] Resolution option selected and justified
- [ ] Alternative options considered and documented
- [ ] Constraints identified (time, coordination, risk)
- [ ] Success criteria defined
- [ ] Fallback plan documented

### Implementation
- [ ] Implementation aligns with chosen strategy
- [ ] Rollback procedure defined
- [ ] Deployment plan documented
- [ ] Monitoring additions specified

### Verification
- [ ] Contract compliance tests pass
- [ ] Consumer integration tests pass
- [ ] Staging environment validation complete
- [ ] Tenant isolation confirmed
- [ ] Performance acceptable

### Prevention
- [ ] Root cause addressed (not just symptoms)
- [ ] Process improvements identified
- [ ] Tooling gaps addressed (CI validation, monitoring)
- [ ] Documentation updated

### Cross-Cutting
- [ ] Recovery timeline is realistic
- [ ] Consumer communication completed
- [ ] Lessons learned documented
- [ ] Temporary measures have removal timeline
- [ ] Patterns align with pattern registry

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation concerns or failed checks
- **P (Party Mode)**: Bring QA, integration architect, and DevOps perspectives on validation findings
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific refinements]**: Describe additional validation needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation checklist results, failed checks, borderline items
- Process enhanced insights on validation thoroughness
- Ask user: "Accept this detailed validation analysis? (y/n)"
- If yes, document additional validation findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade mismatch recovery validation results for completeness"
- Process QA, integration architect, and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results
- Proceed to next step: `step-22-v-generate-report.md`

---

## Gate Decision

| Decision | Criteria |
|----------|----------|
| **PASS** | All phases complete, verification passed, prevention measures in place |
| **CONDITIONAL** | Recovery complete, minor documentation gaps - note gaps |
| **FAIL** | Verification failing, root cause not addressed, or critical consumers still affected - continue recovery |

Present validation results with specific findings for each phase.

---

## Outputs

- Validated mismatch recovery report
- Recovery gate decision (PASS/CONDITIONAL/FAIL)
- Documented gaps (if CONDITIONAL)
- Action items (if FAIL)

---

## Next Step

If PASS: Proceed to `step-22-v-generate-report.md` to generate final validation report.
If CONDITIONAL: Proceed to `step-22-v-generate-report.md` with documented gaps.
If FAIL: Return to Create mode to continue recovery process.
