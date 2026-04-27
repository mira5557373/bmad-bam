# Step 22: Generate QG-M1 Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER finalize report without user confirmation** - Wait for explicit approval
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting report** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **INCLUDE all validation evidence** in final report
- 💾 **SAVE report to validation folder** with timestamp

## EXECUTION PROTOCOLS

- 🎯 Focus: Generate comprehensive QG-M1 validation report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Report documents all findings and gate decision
- 🚫 Do NOT: Change validation results; report findings as-is
- 📎 Reference: Include remediation recommendations if CONDITIONAL/FAIL
- ✅ Complete: Validate mode workflow finishes with this step

---

## Purpose

Generate a formal QG-M1 validation report documenting all module architecture validation findings, the gate decision, and recommended next steps based on the outcome.

---

## Prerequisites

- Step 21 completed: All validation checks run
- Gate decision calculated (PASS/CONDITIONAL/FAIL)
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md`

---

## YOUR TASK

Compile all validation results into a formal QG-M1 report. Document the gate decision with rationale, list all findings with evidence, and provide recommendations based on the outcome. Save the report to the validation folder.

---

## Validation Sequence

### Action 1: Compile Executive Summary

Generate executive summary with gate decision:

```markdown
## QG-M1 Validation Report: Module Architecture

**Gate:** QG-M1 (Module Architecture Complete)
**Artifact:** module-{name}-architecture.md
**Module:** {module_name}
**Date:** {current_date}
**Decision:** {PASS / CONDITIONAL / FAIL}

### Summary

{1-2 sentence summary of validation outcome}

### Key Findings

- CRITICAL checks passed: {X}/17
- Non-critical checks passed: {Y}/11
- Module structure verified: {complete/incomplete}
```

### Action 2: Document CRITICAL Category Results

Compile detailed results for each CRITICAL category:

```markdown
## CRITICAL Checks

### Module Boundary: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Single clear responsibility | {status} | {evidence} |
| Responsibility documented | {status} | {evidence} |
| No boundary overlap | {status} | {evidence} |
| Name reflects responsibility | {status} | {evidence} |

### Public API Contracts: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Facade contract defined | {status} | {evidence} |
| Endpoints documented | {status} | {evidence} |
| Schemas specified | {status} | {evidence} |
| Error handling defined | {status} | {evidence} |
| Versioning strategy | {status} | {evidence} |

### Dependencies: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Through facades only | {status} | {evidence} |
| No circular dependencies | {status} | {evidence} |
| Explicit and minimal | {status} | {evidence} |
| No tight coupling | {status} | {evidence} |

### Tenant Context: {PASS/FAIL}

| Check | Status | Evidence |
|-------|--------|----------|
| Requirements identified | {status} | {evidence} |
| Propagation defined | {status} | {evidence} |
| Data access scoped | {status} | {evidence} |
| Isolation maintained | {status} | {evidence} |
```

### Action 3: Document Non-Critical Category Results

```markdown
## Non-Critical Checks

### Internal Structure: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Clean architecture layers | {status} | {evidence} |
| Separation of concerns | {status} | {evidence} |
| No internal cycles | {status} | {evidence} |
| Clear responsibilities | {status} | {evidence} |

### Events: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Events documented | {status} | {evidence} |
| Contracts specified | {status} | {evidence} |
| Patterns defined | {status} | {evidence} |

### Testing Strategy: {PASS/CONDITIONAL}

| Check | Status | Evidence |
|-------|--------|----------|
| Strategy defined | {status} | {evidence} |
| Unit test targets | {status} | {evidence} |
| Integration approach | {status} | {evidence} |
| Contract tests | {status} | {evidence} |
```

### Action 4: Generate Recommendations

Based on gate decision, provide recommendations:

**If PASS:**
```markdown
## Recommendations

QG-M1 validation passed. Proceed to:

1. **Next Workflows:**
   - `bmad-bam-module-epics` - Create implementation epics
   - `bmad-bam-define-facade-contract` - Detail API contracts
   - `bmad-bam-convergence-verification` - QG-I1 verification

2. **Maintenance:**
   - Schedule periodic architecture reviews
   - Include module tests in CI/CD
   - Document any future architecture changes
```

**If CONDITIONAL:**
```markdown
## Recommendations

QG-M1 validation passed with conditions. Required actions:

1. **Remediation Items:**
   {List non-critical items that need addressing}

2. **Timeline:**
   - Address within: {recommended timeframe}
   - Create tickets for tracking

3. **Proceed With:**
   - Can proceed to next workflows
   - Monitor remediation progress
   - Re-validate after remediation complete
```

**If FAIL:**
```markdown
## Recommendations

QG-M1 validation failed. CRITICAL issues require resolution:

1. **Failed CRITICAL Categories:**
   {List categories that failed}

2. **Recovery Protocol:**
   - **Attempt {N}:** {Current attempt status}
   - Fix identified issues
   - Re-run validation (Validate mode)
   - Contact: Platform Architect, Module Owner

3. **Blocked Actions:**
   - Cannot proceed to module epics
   - Cannot proceed to integration
   - Cannot implement module

4. **Escalation (if Attempt 3):**
   - Mandatory course correction required
   - Architecture review with Platform Architect
   - Consider module redesign
```

### Action 5: Save Report

Save validation report to:
- **Output to:** `{output_folder}/planning-artifacts/validation/module-{name}-qg-m1-report.md`

Include in frontmatter:
```yaml
---
gate: QG-M1
artifact: module-{name}-architecture.md
module: {module_name}
decision: {PASS/CONDITIONAL/FAIL}
date: {current_date}
validated_by: {agent}
---
```

---

## Quality Gate Integration

### Gate Decision Summary

Present final gate outcome:

```
================================================================================
QG-M1 MODULE ARCHITECTURE VALIDATION COMPLETE
================================================================================
Module: {module_name}
Gate Decision: {PASS / CONDITIONAL / FAIL}
================================================================================

CRITICAL Categories (4):
- Module Boundary:      {PASS/FAIL}
- Public API Contracts: {PASS/FAIL}
- Dependencies:         {PASS/FAIL}
- Tenant Context:       {PASS/FAIL}

Non-Critical Categories (3):
- Internal Structure:   {PASS/CONDITIONAL}
- Events:               {PASS/CONDITIONAL}
- Testing Strategy:     {PASS/CONDITIONAL}

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

## COLLABORATION MENUS (A/P/C)

After generating report, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Architecture review of next steps
- **C (Continue)**: Complete validation workflow
- **[Specific concerns]**: Describe concerns about report or next steps

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report contents, gate decision, recommendations
- Explore additional context for failed items
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-M1 validation report and recommended next steps"
- Present architect perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete
- Workflow finished

---

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All CRITICAL category results documented with evidence
- ✅ All non-critical category results documented
- ✅ Recommendations provided based on gate outcome
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
- [ ] Recommendations generated
- [ ] Report saved to correct location
- [ ] Gate decision clearly stated

---

## Outputs

- **Validation Report:** `{output_folder}/planning-artifacts/validation/module-{name}-qg-m1-report.md`
- Gate decision summary
- Recommendations for next steps

---

## WORKFLOW COMPLETE

Validate mode is complete. Based on gate decision:

| Decision | Next Steps |
|----------|------------|
| **PASS** | Proceed to next workflow (`module-epics`, `define-facade-contract`) |
| **CONDITIONAL** | Proceed with documented remediation plan and timeline |
| **FAIL** | Return to Create/Edit mode to address CRITICAL issues; follow recovery protocol |

---

## Related Workflows

Based on validation outcome, consider:

- `bmad-bam-module-architecture` Edit mode - Modify existing design
- `bmad-bam-module-epics` - Create implementation epics
- `bmad-bam-define-facade-contract` - Detail API contracts
- `bmad-bam-convergence-verification` - QG-I1 verification

---

## NEXT STEP

Validation workflow complete. Proceed based on gate decision:

- **PASS:** Continue to next planning workflow
- **CONDITIONAL:** Address documented gaps, then continue
- **FAIL:** Enter recovery protocol, fix CRITICAL issues, re-validate
