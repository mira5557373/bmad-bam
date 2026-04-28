# Step 21: Validate Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the requirements analysis document against QG-PL1 (Planning Gate) criteria and requirements engineering best practices.

---

## Prerequisites

- Step 20 completed (Load Artifact)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-pl1.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`

---

## Inputs

- Loaded artifact from Step 20
- QG-PL1 checklist
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### QG-PL1 Requirements Validation Checklist

#### 1. Document Completeness Validation (25%)

- [ ] Executive summary accurately reflects document content
- [ ] All sections populated with substantive content
- [ ] No placeholder text remaining
- [ ] Statistics calculated correctly
- [ ] Version information current

#### 2. Requirements Quality Validation (30%)

##### Uniqueness and Identification
- [ ] All requirements have unique IDs
- [ ] ID naming convention consistent
- [ ] No duplicate requirements

##### Source Traceability (CRITICAL)
- [ ] **CRITICAL:** All requirements have documented sources
- [ ] Source references are valid and accessible
- [ ] Bidirectional traceability established

##### Measurability
- [ ] Acceptance criteria defined for all requirements
- [ ] Non-functional requirements have quantifiable targets
- [ ] Success metrics identified

##### Clarity
- [ ] No ambiguous language ("fast", "user-friendly", etc.)
- [ ] Technical terms defined in glossary
- [ ] Requirements are testable

#### 3. Multi-Tenant Coverage Validation (20%)

- [ ] **CRITICAL:** Tenant isolation requirements defined
- [ ] **CRITICAL:** Isolation model specified ({tenant_model})
- [ ] Tier differentiation requirements present (FREE, PRO, ENTERPRISE)
- [ ] Tenant lifecycle requirements captured
- [ ] Data residency requirements addressed (if applicable)
- [ ] Tenant-specific compliance requirements mapped

#### 4. AI/Agent Coverage Validation (15%)

- [ ] **CRITICAL:** Agent runtime requirements defined ({ai_runtime})
- [ ] **CRITICAL:** Tenant context propagation specified
- [ ] Agent memory isolation requirements present
- [ ] Safety constraints documented
- [ ] Rate limits and quotas defined per tier
- [ ] Error handling requirements specified

#### 5. Stakeholder Alignment Validation (10%)

- [ ] All stakeholders identified
- [ ] Stakeholder roles documented
- [ ] Review status tracked
- [ ] Sign-offs obtained or scheduled
- [ ] Feedback incorporated

### Severity Classification

| Finding Type | Severity | Impact on Gate |
|-------------|----------|----------------|
| Missing source traceability | CRITICAL | FAIL |
| Missing tenant isolation | CRITICAL | FAIL |
| Missing agent context requirements | CRITICAL | FAIL |
| Incomplete requirements | HIGH | CONDITIONAL |
| Ambiguous language | HIGH | CONDITIONAL |
| Missing acceptance criteria | MEDIUM | Note in report |
| Documentation gaps | LOW | Note in report |

### Validation Scoring

```yaml
validation_scoring:
  categories:
    document_completeness:
      weight: 25
      checks_passed: {n}
      checks_total: 5
      score: {percentage}
      
    requirements_quality:
      weight: 30
      checks_passed: {n}
      checks_total: 12
      score: {percentage}
      critical_passed: {bool}
      
    multi_tenant_coverage:
      weight: 20
      checks_passed: {n}
      checks_total: 6
      score: {percentage}
      critical_passed: {bool}
      
    ai_agent_coverage:
      weight: 15
      checks_passed: {n}
      checks_total: 6
      score: {percentage}
      critical_passed: {bool}
      
    stakeholder_alignment:
      weight: 10
      checks_passed: {n}
      checks_total: 5
      score: {percentage}
      
  overall:
    weighted_score: {percentage}
    all_critical_passed: {bool}
    gate_status: PASS | CONDITIONAL | FAIL
```

---

## COLLABORATION MENUS (A/P/C):

After completing validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for validation analysis
- **C (Continue)**: Accept validation findings and proceed to report generation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass validation context: findings, QG-PL1 status
- Process enhanced insights from deep questioning
- Ask user: "Accept these validation findings? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-PL1 validation findings for requirements: {summary of findings}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Compile validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-report.md`

---

## Verification

- [ ] All QG-PL1 checks performed
- [ ] Critical items verified
- [ ] Findings categorized by severity
- [ ] Scoring calculated correctly
- [ ] Recommendations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- QG-PL1 validation results
- Severity-categorized issues
- Validation scoring summary
- Recommendations for improvements

---


---

## SUCCESS METRICS:

- [ ] Artifact loaded for validation
- [ ] All checklist items evaluated
- [ ] Evidence documented for each check
- [ ] Gate decision determined (PASS/CONDITIONAL/FAIL)
- [ ] Validation report generated

## FAILURE MODES:

- **Artifact not found:** Cannot validate - run Create mode first
- **Missing checklist:** Use embedded criteria as fallback
- **Ambiguous evidence:** Mark as CONDITIONAL, document uncertainty

## Next Step

Proceed to `step-22-v-report.md` to generate validation report.
