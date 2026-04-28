# Step 21: Validate Research Report (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER skip source credibility checks - citations are required for research validity
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: Validate ALL 4 categories (completeness, quality, multi-tenant, consistency)
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on validation - do not modify the research report
- ✅ MARK each check as PASS/FAIL with specific evidence
- 📋 VERIFY research methodology follows best practices
- 🔍 CHECK citation credibility and recency
- ⚠️ FLAG findings without supporting evidence as FAIL

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## YOUR TASK

Systematically validate the research report against all 4 validation categories: Completeness (9 criteria), Quality (8 criteria), Multi-Tenant (8 criteria), and Consistency (7 criteria). For each check, record PASS/FAIL with specific evidence. Calculate category scores and overall pass rate. Identify critical issues requiring resolution. Prepare detailed results for Step 22 report generation.

---

## Purpose

Perform comprehensive validation of the research report against completeness, quality, multi-tenant, and consistency criteria.

---

## Prerequisites

- Step 20 completed: Artifact and checklist loaded
- Validation scope confirmed

---

## Inputs

- Research report document
- Validation checklist
- Validation scope (full or partial)
- Section inventory from Step 20

---

## Actions

### 1. Completeness Validation

Check all required sections:

| Criterion | Status | Findings |
|-----------|--------|----------|
| Executive summary present | Pass/Fail | {notes} |
| Research scope defined | Pass/Fail | {notes} |
| Evaluation criteria with weights | Pass/Fail | {notes} |
| All candidates evaluated | Pass/Fail | {notes} |
| Integration fit analysis | Pass/Fail | {notes} |
| Primary recommendation | Pass/Fail | {notes} |
| Risk assessment present | Pass/Fail | {notes} |
| POC plan defined | Pass/Fail | {notes} |
| Migration strategy outlined | Pass/Fail | {notes} |

**Completeness Score:** {passed}/{total} criteria

### 2. Quality Validation

Check quality of content:

| Criterion | Status | Findings |
|-----------|--------|----------|
| Recommendations supported by evidence | Pass/Fail | {notes} |
| Scores consistent with analysis | Pass/Fail | {notes} |
| All risks have mitigations | Pass/Fail | {notes} |
| POC objectives measurable | Pass/Fail | {notes} |
| Migration phases actionable | Pass/Fail | {notes} |
| Sources cited for claims | Pass/Fail | {notes} |
| No contradictory statements | Pass/Fail | {notes} |
| Evaluation criteria applied consistently | Pass/Fail | {notes} |

**Quality Score:** {passed}/{total} criteria

### 3. Multi-Tenant Validation (BAM-Specific)

Check BAM-specific requirements:

| Criterion | Status | Findings |
|-----------|--------|----------|
| Tenant isolation evaluated | Pass/Fail | {notes} |
| RLS/schema/database options assessed | Pass/Fail | {notes} |
| Scalability per tenant | Pass/Fail | {notes} |
| Noisy neighbor considerations | Pass/Fail | {notes} |
| Tenant-aware observability | Pass/Fail | {notes} |
| Per-tenant configuration | Pass/Fail | {notes} |
| Tenant onboarding impact | Pass/Fail | {notes} |
| Cost per tenant analysis | Pass/Fail | {notes} |

**Multi-Tenant Score:** {passed}/{total} criteria

### 4. Consistency Validation

Check internal consistency:

| Criterion | Status | Findings |
|-----------|--------|----------|
| Executive summary matches findings | Pass/Fail | {discrepancies if any} |
| Rankings align with weighted scores | Pass/Fail | {discrepancies if any} |
| Risk summary matches risk tables | Pass/Fail | {discrepancies if any} |
| ADR matches recommendation | Pass/Fail/N/A | {discrepancies if any} |
| POC scope aligns with risks | Pass/Fail | {discrepancies if any} |
| Migration timeline realistic | Pass/Fail | {concerns if any} |
| Cost analysis complete | Pass/Fail | {gaps if any} |

**Consistency Score:** {passed}/{total} criteria

### 5. Cross-Reference Validation

Verify external references:

| Reference Type | Valid | Invalid | Missing |
|----------------|-------|---------|---------|
| Pattern registry references | {count} | {count} | {count} |
| Architecture document links | {count} | {count} | {count} |
| Source citations | {count} | {count} | {count} |

### 6. Compile Validation Summary

| Category | Score | Status |
|----------|-------|--------|
| Completeness | {n}/{total} | Pass/Fail |
| Quality | {n}/{total} | Pass/Fail |
| Multi-Tenant | {n}/{total} | Pass/Fail |
| Consistency | {n}/{total} | Pass/Fail |
| **Overall** | {total pass}/{total checks} | **Pass/Conditional/Fail** |

### 7. Identify Critical Issues

Flag any critical issues that require resolution:

| Issue | Severity | Category | Resolution Required |
|-------|----------|----------|---------------------|
| {issue 1} | Critical/Warning/Info | {category} | {action needed} |
| {issue 2} | Critical/Warning/Info | {category} | {action needed} |

**Severity Definitions:**
- **Critical:** Must be resolved before report can be accepted
- **Warning:** Should be addressed but not blocking
- **Info:** Suggestions for improvement

---

## SUCCESS METRICS

- ✅ Completeness criteria checked (9 items) with PASS/FAIL for each
- ✅ Quality criteria validated (8 items) including source credibility verification
- ✅ Multi-tenant requirements verified (8 BAM-specific items)
- ✅ Consistency checks completed (7 items) for cross-section alignment
- ✅ Cross-references validated (pattern registry, architecture, ADRs)
- ✅ All findings include specific evidence references from document
- ✅ Category scores calculated (X/9, Y/8, Z/8, W/7)
- ✅ Overall pass rate calculated (total pass / total checks as percentage)
- ✅ Critical issues list compiled with severity assignments
- ✅ Validation summary ready for Step 22 report generation

---

## FAILURE MODES

- ❌ **Recommendation without evidence:** Mark quality check as FAIL, flag as CRITICAL issue requiring citation
- ❌ **Score-ranking mismatch:** Mark consistency check as FAIL, document specific discrepancy
- ❌ **Missing multi-tenant evaluation:** Mark BAM-specific check as FAIL, flag tenant isolation as required topic
- ❌ **Outdated sources (>2 years):** Mark quality check as FAIL, recommend source refresh
- ❌ **Contradictory findings:** Flag as CRITICAL issue, block PASS status until resolved

---

## Verification

- [ ] Completeness criteria checked
- [ ] Quality criteria validated
- [ ] Multi-tenant requirements verified
- [ ] Consistency checks completed
- [ ] Cross-references validated
- [ ] Critical issues identified
- [ ] Validation summary compiled
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation results by category
- Critical issues list
- Validation summary with scores

---

## Next Step

Proceed to `step-22-v-report.md` to generate the validation report.
