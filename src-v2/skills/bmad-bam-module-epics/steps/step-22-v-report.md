# Step 22: Generate Epic Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER finalize report without user confirmation** - Wait for explicit approval
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting report** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **INCLUDE all validation evidence** in final report
- 💾 **SAVE report to validation folder** with timestamp

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate comprehensive epic validation report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Report documents all findings and validation decision
- 🚫 Do NOT: Change validation results; report findings as-is
- 📎 Reference: Include remediation recommendations if CONDITIONAL/FAIL
- ✅ Complete: Validate mode workflow finishes with this step

---

## Purpose

Generate a formal epic validation report documenting all validation findings, the validation decision, and recommended next steps based on the outcome. This report serves as evidence of epic quality for implementation readiness.

---

## Prerequisites

- Step 21 completed: All validation checks run
- Validation decision calculated (PASS/CONDITIONAL/FAIL)
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## YOUR TASK

Compile all validation results into a formal validation report. Document the decision with rationale, list all findings with evidence, and provide recommendations based on the outcome. Save the report to the validation folder.

---

## Main Sequence

### Action 1: Compile Executive Summary

Generate executive summary with validation decision:

```markdown
## Epic Validation Report: {module_name} Module

**Document:** epics.md
**Module:** {module_name}
**Date:** {current_date}
**Decision:** {PASS / CONDITIONAL / FAIL}

### Summary

{1-2 sentence summary of validation outcome}

### Key Findings

- CRITICAL checks passed: {X}/{total}
- Non-critical checks passed: {Y}/{total}
- Tenant context coverage: {percentage}%
- Stories validated: {story_count}
```

### Action 2: Document CRITICAL Category Results

Compile detailed results for each CRITICAL category:

```markdown
## CRITICAL Checks

### Epic Structure: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| All epics have ID | {status} | {evidence} |
| All epics have title | {status} | {evidence} |
| All epics have category | {status} | {evidence} |
| All epics have priority | {status} | {evidence} |
| All epics have acceptance criteria | {status} | {evidence} |
| All epics have tenant considerations | {status} | {evidence} |

### Story Completeness: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| All stories have story ID | {status} | {evidence} |
| All stories have user story format | {status} | {evidence} |
| All stories have acceptance criteria | {status} | {evidence} |
| All stories reference parent epic | {status} | {evidence} |
| All stories have estimation | {status} | {evidence} |

### Tenant Context: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| All stories have tenant scope | {status} | {evidence} |
| All stories have tier availability | {status} | {evidence} |
| All stories have data isolation | {status} | {evidence} |
| All stories have tenant AC | {status} | {evidence} |

**Tenant Context by Story:**

| Story ID | Tenant Scope | Tier | Isolation | Tenant AC | Status |
|----------|--------------|------|-----------|-----------|--------|
| S-{module}-001-01 | {scope} | {tier} | {isolation} | {ac} | {status} |
| S-{module}-001-02 | {scope} | {tier} | {isolation} | {ac} | {status} |

### Done Criteria: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Definition of Done exists | {status} | {evidence} |
| Quality gates mapped | {status} | {evidence} |
| Test coverage thresholds | {status} | {evidence} |
| Documentation requirements | {status} | {evidence} |
| Review checkpoints | {status} | {evidence} |
| Tenant isolation in DoD | {status} | {evidence} |
```

### Action 3: Document Non-Critical Category Results

```markdown
## Non-Critical Checks

### Estimation: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| All stories have estimates | {status} | {evidence} |
| Fibonacci scale used | {status} | {evidence} |
| No stories > 13 points | {status} | {evidence} |
| Total points correct | {status} | {evidence} |

### Sprint Allocation: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| All stories allocated | {status} | {evidence} |
| Velocity respected | {status} | {evidence} |
| Dependencies ordered | {status} | {evidence} |
| No sprint over capacity | {status} | {evidence} |

### Dependencies: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Epic dependencies documented | {status} | {evidence} |
| Story dependencies documented | {status} | {evidence} |
| No circular dependencies | {status} | {evidence} |
| Cross-module identified | {status} | {evidence} |
```

### Action 4: Document Issues Found

If any checks failed or have conditions:

```markdown
## Issues Found

### CRITICAL Issues (Must Fix Before Implementation)

| Issue | Category | Severity | Affected Items |
|-------|----------|----------|----------------|
| {issue_description} | {category} | CRITICAL | {items} |

### Non-Critical Issues (Should Fix)

| Issue | Category | Severity | Affected Items |
|-------|----------|----------|----------------|
| {issue_description} | {category} | Non-critical | {items} |

### Missing Tenant Context

| Story ID | Missing Element | Remediation |
|----------|-----------------|-------------|
| S-{module}-001-03 | Tenant scope | Add tenant scope definition |
| S-{module}-002-01 | Tier availability | Specify tier availability |
```

### Action 5: Generate Recommendations

Based on validation decision, provide recommendations:

**If PASS:**
```markdown
## Recommendations

Epic validation passed. Proceed to:

1. **Implementation:**
   - Begin Sprint 1 execution
   - Use stories as implementation guides
   - Follow done criteria for each story

2. **Quality Gates:**
   - Apply QG mappings during development
   - Run tenant isolation tests for all stories
   - Document completion per DoD

3. **Monitoring:**
   - Track sprint velocity
   - Update estimates based on actuals
   - Refine future sprint allocations
```

**If CONDITIONAL:**
```markdown
## Recommendations

Epic validation passed with conditions. Required actions:

1. **Remediation Items:**
   {List non-critical items that need addressing}

2. **Timeline:**
   - Address within: {recommended timeframe}
   - Create tickets for tracking

3. **Proceed With:**
   - Can proceed to implementation
   - Address non-critical items in parallel
   - Re-validate after remediation complete

4. **Conditional Approvals:**
   - Stakeholder: {name}
   - Date: {date}
   - Conditions accepted: {list}
```

**If FAIL:**
```markdown
## Recommendations

Epic validation failed. CRITICAL issues require resolution:

1. **Failed CRITICAL Categories:**
   {List categories that failed}

2. **Recovery Protocol:**
   - **Attempt {N}:** {Current attempt status}
   - Fix identified issues
   - Re-run validation (Validate mode)
   - Contact: Product Owner, Tech Lead

3. **Blocked Actions:**
   - Cannot proceed to implementation
   - Cannot begin sprint execution
   - Must resolve CRITICAL issues first

4. **Escalation (if Attempt 3):**
   - Mandatory course correction required
   - Epic planning workshop with full team
   - Consider re-running Create mode
```

### Action 6: Save Report

Save validation report to:
- **Output to:** `{output_folder}/planning-artifacts/validation/epics-validation-report.md`

Include in frontmatter:
```yaml
---
type: validation-report
artifact: epics.md
module: {module_name}
decision: {PASS/CONDITIONAL/FAIL}
date: {current_date}
validated_by: {agent}
---
```

---

## Quality Gate Integration

### Validation Decision Summary

Present final outcome:

```
================================================================================
EPIC VALIDATION COMPLETE
================================================================================
Validation Decision: {PASS / CONDITIONAL / FAIL}
================================================================================

CRITICAL Categories (4):
- Epic Structure:      {PASS/FAIL}
- Story Completeness:  {PASS/FAIL}
- Tenant Context:      {PASS/FAIL}
- Done Criteria:       {PASS/FAIL}

Non-Critical Categories (3):
- Estimation:          {PASS/CONDITIONAL}
- Sprint Allocation:   {PASS/CONDITIONAL}
- Dependencies:        {PASS/CONDITIONAL}

Stories Validated: {story_count}
Tenant Context Coverage: {percentage}%

================================================================================
Report saved to: {output_folder}/planning-artifacts/validation/
================================================================================
```

### Recovery Protocol Status (If FAIL)

Document recovery attempt status:

| Attempt | Status | Actions Taken | Categories Locked |
|---------|--------|---------------|-------------------|
| 1 | {Pending/Complete/Failed} | {actions} | {locked categories} |
| 2 | {Pending/Complete/Failed} | {actions} | {locked categories} |
| 3 | {Pending/Mandatory Course Correction} | {actions} | N/A |

---

## SUCCESS METRICS

- ✅ Executive summary generated with validation decision
- ✅ All CRITICAL category results documented with evidence
- ✅ All non-critical category results documented
- ✅ Tenant context results documented per story
- ✅ Issues found listed with remediation
- ✅ Recommendations provided based on outcome
- ✅ Report saved to validation folder
- ✅ Recovery protocol status documented (if applicable)

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify all Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Missing evidence:** Cannot generate complete report
- ❌ **Template not found:** Verify BAM installation

---

## Verification

- [ ] Executive summary complete
- [ ] CRITICAL categories documented
- [ ] Non-critical categories documented
- [ ] Tenant context documented
- [ ] Issues found listed
- [ ] Recommendations generated
- [ ] Report saved to correct location
- [ ] Validation decision clearly stated

---

## Outputs

- **Validation Report:** `{output_folder}/planning-artifacts/validation/epics-validation-report.md`
- Validation decision summary
- Recommendations for next steps

---

## WORKFLOW COMPLETE

Validate mode is complete. Based on validation decision:

| Decision | Next Steps |
|----------|------------|
| **PASS** | Proceed to sprint execution and implementation |
| **CONDITIONAL** | Proceed with documented remediation plan and timeline |
| **FAIL** | Return to Create/Edit mode to address CRITICAL issues; follow recovery protocol |

---

## Related Workflows

Based on validation outcome, consider:

- `bmad-bam-module-epics` Edit mode - Modify epic document to fix issues
- `bmad-bam-cross-module-story` - Create cross-module epics
- Sprint execution - Begin implementation (if PASS)
- `bmad-bam-convergence` - Module readiness verification

---

## NEXT STEP

Validation workflow complete. Proceed based on validation decision:

- **PASS:** Continue to sprint execution
- **CONDITIONAL:** Address documented gaps, then continue
- **FAIL:** Enter recovery protocol, fix CRITICAL issues, re-validate
