# Step 21: Validate Research Report (Validate Mode)

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
