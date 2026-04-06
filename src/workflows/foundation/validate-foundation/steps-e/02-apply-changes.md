# Step 2: Apply Targeted Modifications

Based on the user's requested changes to the validation:

## Re-validation Scenarios

### Scenario 1: Re-run Specific Categories

If re-validating specific categories after fixes:

1. Load locked categories from previous report (do not re-test)
2. Run validation only on specified failed categories
3. Merge new results with locked category results
4. Update overall gate decision based on combined results

### Scenario 2: Update Mitigation Plan

If updating CONDITIONAL pass mitigation:

1. Load current mitigation items and deadlines
2. Apply requested changes:
   - Update deadlines
   - Mark items as resolved
   - Add new mitigation items
3. Re-evaluate overall gate status
4. If all mitigations resolved, upgrade to PASS

### Scenario 3: Add New Findings

If adding findings discovered post-validation:

1. Classify new findings by category and severity
2. Update affected category status if severity warrants
3. Add findings to gap list with remediation recommendations
4. Re-evaluate overall gate decision

### Scenario 4: Recovery Attempt

If performing a recovery attempt after FAIL:

1. Increment recovery attempt counter
2. Check if max attempts (2) exceeded - trigger mandatory course correction
3. Re-run only failed categories
4. Lock newly passing categories
5. Update recovery path recommendation

## Update Gate Report

Modify `{output_folder}/planning-artifacts/foundation-gate-report.md`:

- Update gate decision if changed
- Add new findings with timestamps
- Update mitigation plan status
- Record recovery attempt if applicable
- Add modification history section

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
