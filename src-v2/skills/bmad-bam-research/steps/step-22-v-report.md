# Step 22: Generate Validation Report (Validate Mode)

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

Generate a comprehensive validation report summarizing findings from the research report validation and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Research report validation performed

---

## Inputs

- Validation results from Step 21
- Quality gate decision criteria
- Specific findings per category
- Critical issues list

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Score | Pass Rate | Status |
|----------|-------|-----------|--------|
| Completeness | {n}/{total} | {percent}% | Pass/Fail |
| Quality | {n}/{total} | {percent}% | Pass/Fail |
| Multi-Tenant | {n}/{total} | {percent}% | Pass/Fail |
| Consistency | {n}/{total} | {percent}% | Pass/Fail |
| **Overall** | {total}/{total} | {percent}% | **{status}** |

### 2. Assign Severity to Findings

| Severity | Count | Description | Action Required |
|----------|-------|-------------|-----------------|
| CRITICAL | {n} | Blocking issues | Must fix before acceptance |
| WARNING | {n} | Non-blocking gaps | Should address |
| INFO | {n} | Improvement suggestions | Consider for future |

### 3. Critical Issues Summary

List all critical issues requiring resolution:

| # | Issue | Category | Impact | Remediation |
|---|-------|----------|--------|-------------|
| 1 | {issue description} | {category} | {impact} | {fix required} |
| 2 | {issue description} | {category} | {impact} | {fix required} |

### 4. Warning Issues Summary

| # | Issue | Category | Recommended Action |
|---|-------|----------|-------------------|
| 1 | {issue description} | {category} | {suggested fix} |
| 2 | {issue description} | {category} | {suggested fix} |

### 5. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All categories pass, no critical issues, overall >= 90% |
| **CONDITIONAL** | Minor gaps (warnings only), overall >= 75%, document gaps and proceed |
| **NEEDS REVISION** | Any critical issues, or overall < 75% |

**Current Status:** {PASS/CONDITIONAL/NEEDS REVISION}

### 6. Generate Validation Report

```markdown
# Research Report Validation Report

## Document Information

| Field | Value |
|-------|-------|
| Validated Document | research-report.md |
| Validation Date | {date} |
| Validator | {role} |
| Validation Status | {PASS/CONDITIONAL/NEEDS REVISION} |

---

## Executive Summary

**Validation Outcome:** {status}

**Overall Score:** {total pass}/{total checks} ({percent}%)

**Key Findings:**
- {Finding 1}
- {Finding 2}
- {Finding 3}

---

## Detailed Results

### Completeness ({score}/{total})
{Table of completeness findings}

### Quality ({score}/{total})
{Table of quality findings}

### Multi-Tenant ({score}/{total})
{Table of multi-tenant findings}

### Consistency ({score}/{total})
{Table of consistency findings}

---

## Issues Requiring Action

### Critical Issues
{Critical issues table or "None"}

### Warnings
{Warning issues table or "None"}

### Suggestions
{Info items or "None"}

---

## Recommended Next Steps

**If PASS:**
1. Research report approved for stakeholder review
2. Proceed with recommendation approval process
3. Execute POC if defined

**If CONDITIONAL:**
1. Document gaps acknowledged: {list gaps}
2. Proceed with noted limitations
3. Schedule remediation for {items}

**If NEEDS REVISION:**
1. Address critical issues: {list issues}
2. Re-run Create or Edit mode
3. Re-validate after fixes

---

## Validation Checklist Summary

- [x] Artifact loaded and parsed
- [x] Completeness criteria checked
- [x] Quality criteria validated
- [x] Multi-tenant requirements verified
- [x] Consistency checks completed
- [x] Validation report generated

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | {date} | {role} | Initial validation |
```

### 7. Output Validation Report

Save the validation report to:
- `{output_folder}/planning-artifacts/research-report-validation.md`

Or append validation summary to the research report itself.

---

## COLLABORATION MENUS (A/P/C):

After generating the validation report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific findings for remediation planning
- **P (Party Mode)**: Bring QA and architect perspectives on validation outcome
- **C (Continue)**: Accept validation report and complete validation workflow
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, critical issues, remediation needs
- Process enhanced insights on remediation strategy
- Ask user: "Accept this remediation analysis? (y/n)"
- If yes, document remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review research report validation results: {summary of outcome and findings}"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined correctly
- [ ] Report generated with all required sections
- [ ] Next steps clearly defined
- [ ] Report saved to correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/research-report-validation.md`
- Gate decision: PASS / CONDITIONAL / NEEDS REVISION
- Remediation list (if applicable)

---

## Next Step

Based on completion status:

- **PASS:** Research report validated and approved. Proceed with:
  - Stakeholder presentation
  - Recommendation approval
  - POC execution (if defined)

- **CONDITIONAL:** Document gaps and proceed with noted limitations:
  - Acknowledge gaps in project documentation
  - Schedule remediation for non-critical items
  - Monitor identified risks

- **NEEDS REVISION:** Return to Create/Edit mode:
  - Address critical issues identified
  - Re-run `step-01-c-start.md` or `step-10-e-load.md`
  - Re-validate after corrections

## Workflow Complete

Validation mode complete for research workflow.
