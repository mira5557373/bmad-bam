# Step 11: Apply Targeted Modifications

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

Apply requested modifications to foundation validation while managing gate state and recovery protocols.

---

## Prerequisites

- Step 10 completed with identified modifications
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes to the validation:

### Re-validation Scenarios

#### Scenario 1: Re-run Specific Categories

If re-validating specific categories after fixes:

1. Load locked categories from previous report (do not re-test)
2. Run validation only on specified failed categories
3. Merge new results with locked category results
4. Update overall gate decision based on combined results

#### Scenario 2: Update Mitigation Plan

If updating CONDITIONAL pass mitigation:

1. Load current mitigation items and deadlines
2. Apply requested changes:
   - Update deadlines
   - Mark items as resolved
   - Add new mitigation items
3. Re-evaluate overall gate status
4. If all mitigations resolved, upgrade to PASS

#### Scenario 3: Add New Findings

If adding findings discovered post-validation:

1. Classify new findings by category and severity
2. Update affected category status if severity warrants
3. Add findings to gap list with remediation recommendations
4. Re-evaluate overall gate decision

#### Scenario 4: Recovery Attempt

If performing a recovery attempt after FAIL:

1. Increment recovery attempt counter
2. Check if max attempts (2) exceeded - trigger mandatory course correction
3. Re-run only failed categories
4. Lock newly passing categories
5. Update recovery path recommendation

---

## Update Gate Report

Modify `{output_folder}/planning-artifacts/foundation-gate-report.md`:

- Update gate decision if changed
- Add new findings with timestamps
- Update mitigation plan status
- Record recovery attempt if applicable
- Add modification history section

---

## Update Sprint Status

Modify `sprint-status.yaml`:

```yaml
foundation:
  status: {updated status}
  gate_passed: {updated boolean}
  gate_date: {new date if changed}
  gate_report: {path}
  recovery_attempts: {count if applicable}
  last_modified: {date}
```

Present a diff summary of changes made and ask for confirmation.

**Warning:** If recovery attempt count reaches 3, mandatory course correction is triggered - this requires escalation to project leadership.

---

## COLLABORATION MENUS (A/P/C):

After applying the targeted modifications above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification impacts using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize Edit mode
- **[Specific refinements]**: Describe additional modifications needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: changes applied, gate decision impact, recovery status
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into change summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-F1 foundation gate modifications: {summary of changes and new gate status}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated gate report
- Update sprint-status.yaml
- Update frontmatter `stepsCompleted: [10, 11]`
- Mark Edit mode complete

---

## Verification

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] Recovery protocol followed
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated foundation gate report
- Updated sprint status

---

## Next Step

Return to workflow for validation or completion.
