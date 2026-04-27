# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile validation results, assign severity, determine outcome, generate report
- 💾 Track: `stepsCompleted: [20, 21, 22]` when complete
- 📖 Context: Validation findings from Step 21, QG-OC criteria
- 🚫 Do NOT: Make changes to artifact - validation is read-only
- 🔍 Use web search: Not required for report generation
- ⚠️ Gate: QG-OC (Observability Completeness)

---

## Purpose

Generate a comprehensive validation report summarizing findings from the QG-OC (Observability Completeness) validation and determining the workflow completion status.

---

## Prerequisites

- Step 20 complete: Artifact loaded successfully
- Step 21 complete: Validation performed
- Quality gate criteria applied

---

## Inputs

- Validation results from Step 21
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per category
- Remediation recommendations (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Weight | Findings |
|----------|--------|--------|----------|
| Tenant Dimensions | | CRITICAL | |
| Metrics Collection | | CRITICAL | |
| Logging Strategy | | CRITICAL | |
| Distributed Tracing | | CRITICAL | |
| Dashboards | | HIGH | |
| Alerting | | HIGH | |
| SLO Definitions | | MEDIUM | |
| Tenant Isolation | | CRITICAL | |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| **CRITICAL** | Missing tenant dimensions, no isolation, cardinality issues | Must fix before proceeding |
| **HIGH** | Dashboard access gaps, alert routing incomplete | Should address before production |
| **MEDIUM** | SLO thresholds undefined, minor retention gaps | Consider for improvement |
| **LOW** | Dashboard layout, additional metric suggestions | Optional enhancement |

### 3. Calculate Compliance Score

```yaml
compliance_calculation:
  total_checks: 48
  
  by_weight:
    CRITICAL:
      total: 32
      passed: X
      percentage: X%
    HIGH:
      total: 10
      passed: X
      percentage: X%
    MEDIUM:
      total: 6
      passed: X
      percentage: X%
      
  overall_score: "Weighted average"
```

### 4. Determine Completion Status

| Status | Criteria | Next Action |
|--------|----------|-------------|
| **PASS** | All CRITICAL pass, >=80% HIGH/MEDIUM pass | Proceed to implementation |
| **CONDITIONAL** | All CRITICAL pass, <80% HIGH/MEDIUM pass | Proceed with documented gaps |
| **FAIL** | Any CRITICAL fails | Return to Create/Edit mode |

### 5. Generate Report Document

```markdown
# QG-OC Validation Report: Observability Design

**Project:** {{project_name}}
**Date:** {{date}}
**Validator:** {{author}}
**Gate:** QG-OC (Observability Completeness)

---

## Executive Summary

**Outcome:** [PASS | CONDITIONAL | FAIL]
**Compliance Score:** [X]%

---

## Findings by Category

### Tenant Dimensions (CRITICAL)
- **Status:** [PASS | FAIL]
- **Findings:** [Details]

### Metrics Collection (CRITICAL)
- **Status:** [PASS | FAIL]
- **Findings:** [Details]

### Logging Strategy (CRITICAL)
- **Status:** [PASS | FAIL]
- **Findings:** [Details]

### Distributed Tracing (CRITICAL)
- **Status:** [PASS | FAIL]
- **Findings:** [Details]

### Dashboards (HIGH)
- **Status:** [PASS | PARTIAL | FAIL]
- **Findings:** [Details]

### Alerting (HIGH)
- **Status:** [PASS | PARTIAL | FAIL]
- **Findings:** [Details]

### SLO Definitions (MEDIUM)
- **Status:** [PASS | PARTIAL | FAIL]
- **Findings:** [Details]

### Tenant Isolation (CRITICAL)
- **Status:** [PASS | FAIL]
- **Findings:** [Details]

---

## Critical Gaps (if any)

| Gap | Impact | Remediation |
|-----|--------|-------------|
| | | |

---

## Recommendations

1. [Recommendation 1]
2. [Recommendation 2]
3. [Recommendation 3]

---

## Next Steps

Based on outcome:
- **PASS:** Proceed to implementation
- **CONDITIONAL:** Address gaps per remediation plan
- **FAIL:** Return to Create/Edit mode
```

---

## COLLABORATION MENUS (A/P/C):

After generating report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report sections or recommendations
- **P (Party Mode)**: Bring SRE and security architect perspectives on final report
- **C (Continue)**: Accept generated report and complete validation workflow
- **[Specific refinements]**: Describe specific sections to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation outcome, findings by category, recommendations
- Process enhanced insights on report quality
- Ask user: "Accept this detailed report analysis? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review final QG-OC validation report for observability design"
- Process SRE and security architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validation mode complete

---

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All CRITICAL category results documented with evidence
- ✅ All non-critical category results documented
- ✅ Three pillars completeness verified
- ✅ Recommendations provided based on gate outcome
- ✅ Report saved to validation folder
- ✅ Recovery protocol status documented (if applicable)
- ✅ Compliance score calculated correctly

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify all Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Missing pillar evidence:** Cannot generate complete report
- ❌ **Template not found:** Verify BAM installation

---

## Recovery Protocol

**If QG-OC fails:**

1. **Attempt 1:** Immediate remediation (target: 2-3 days)
   - Fix CRITICAL gaps identified in report
   - Focus on tenant isolation and dimension consistency
   - Re-run QG-OC validation after fixes
   - **Lock passed categories** - do not re-test

2. **Attempt 2:** Deep review (target: 2-3 days)
   - Engage SRE and Platform teams
   - Review observability architecture against patterns
   - Verify cross-pillar consistency
   - Re-run QG-OC validation
   - **Preserve locked categories** from Attempt 1

3. **Mandatory Course Correction:**
   - Escalate to Platform Lead and Engineering Leadership
   - Document observability gaps with impact assessment
   - Consider tooling changes if gaps are systemic
   - Create remediation plan with SRE sign-off

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Compliance score calculated
- [ ] Completion status determined
- [ ] Report generated with all required sections
- [ ] Next steps clearly defined

---

## Outputs

- QG-OC Validation Report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Compliance score
- Specific findings per observability category
- Remediation recommendations (if applicable)

---

## Next Steps

Based on completion status:

- **PASS:** Observability design validated. Proceed to implementation or downstream workflows:
  - `bmad-bam-agent-tracing` - Implement agent tracing
  - `bmad-bam-billing` - Implement cost attribution
  - `bmad-bam-observability` - Advanced SLO management

- **CONDITIONAL:** Document gaps and proceed with noted limitations. Schedule remediation.

- **FAIL:** Return to Create mode to address:
  - Missing tenant dimensions
  - Isolation gaps
  - Cardinality issues
  - Cross-pillar inconsistencies

---

## Workflow Complete

Validation mode complete for observability workflow.

**Gate:** QG-OC (Observability Completeness)
**Owner:** Platform Architect
**Reviewers:** SRE, Security, AI Platform Lead
