# Step 21: Validate AI Security Testing Design

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

Validate completeness and quality of the AI security testing design against established criteria.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-security

---

## Actions

### 1. Validate Prompt Injection Tests

- [ ] Attack categories defined
- [ ] Test payloads documented
- [ ] Automation integrated
- [ ] Detection metrics specified

### 2. Validate Guardrail Validation

- [ ] Guardrail categories defined
- [ ] Validation tests documented
- [ ] Tier-specific rules established

### 3. Validate Penetration Tests

- [ ] Pentest scope defined
- [ ] Red team scenarios documented
- [ ] CI/CD integration specified
- [ ] Runbook included

### 4. Calculate Gate Decision

Based on validation results:

| Outcome | Criteria |
|---------|----------|
| **PASS** | All checks pass, comprehensive AI security testing |
| **CONDITIONAL** | Non-critical gaps, all critical pass |
| **FAIL** | Missing critical security tests |

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring perspectives on gate decision
- **C (Continue)**: Proceed to generate report
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation results, gate decision
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI security testing validation results"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All validation checks completed
- [ ] Gate decision calculated
- [ ] Issues documented
- [ ] **CRITICAL:** QG-S4 (AI Security Gate) criteria verified

### QG-S4 AI Security Gate Verification
This workflow validates patterns for QG-S4 (AI Security Gate):

| QG-S4 Pattern | Criteria | Status | Evidence |
|---------------|----------|--------|----------|
| `prompt_injection_tested` | Direct and indirect injection tests designed | [ ] Pass / [ ] Fail | Step 1 test cases |
| `adversarial_detection_active` | Adversarial attack detection rules defined | [ ] Pass / [ ] Fail | Step 2 detection config |
| `output_filtering_verified` | Output filtering validation tests designed | [ ] Pass / [ ] Fail | Step 2 filter tests |
| `kill_switch_tested` | Kill switch validation procedures defined | [ ] Pass / [ ] Fail | Step 2 kill switch tests |
| `model_extraction_prevented` | Model extraction prevention tests designed | [ ] Pass / [ ] Fail | Step 3 pentest scope |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S4`

### QG-S10 Dependency Chain
QG-S4 is the entry gate for QG-S10 (Penetration Testing Gate). Upon PASS of QG-S4:
- [ ] AI prompt injection testing completed
- [ ] Output filtering verified
- [ ] Kill switch tested

**QG-S4 PASS enables:** QG-S10 (Penetration Testing Gate) execution via penetration-testing-design workflow
**QG-S10 EXIT:** QG-P1 (Production Readiness)

---

## Outputs

- Validation checklist results
- Gate decision (PASS/CONDITIONAL/FAIL)
- List of issues found

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
