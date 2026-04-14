# Step 5: Assembly - AI Security Test Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Combine all AI security testing designs into a comprehensive test plan document.

---

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/templates/ai-security-test-plan-template.md`

---

## Actions

### 1. Document Assembly

Combine outputs from all previous steps:

| Section | Source Step | Content |
|---------|-------------|---------|
| Threat Modeling | Step 1 | Injection attack categories, test payloads |
| Prompt Injection Tests | Step 2 | Guardrail validation, detection mechanisms |
| Data Leakage Tests | Step 3 | Penetration scope, red team scenarios |
| Adversarial Attack Tests | Step 4 | Attack scenarios, resilience testing |

### 2. Test Plan Structure

```
AI Security Test Plan
├── 1. Executive Summary
│   ├── Scope and Objectives
│   ├── Risk Assessment Summary
│   └── Key Findings (post-execution)
├── 2. Threat Model
│   ├── AI-Specific Threats
│   ├── Multi-Tenant Considerations
│   └── Attack Surface Analysis
├── 3. Test Categories
│   ├── 3.1 Prompt Injection Tests
│   ├── 3.2 Guardrail Validation
│   ├── 3.3 Data Leakage Detection
│   ├── 3.4 Adversarial Attacks
│   └── 3.5 Penetration Testing
├── 4. Test Automation
│   ├── CI/CD Integration
│   ├── Continuous Monitoring
│   └── Alert Configuration
├── 5. Quality Gate Mapping
│   ├── QG-M3 Requirements
│   ├── QG-I3 Requirements
│   └── QG-S4 Requirements
└── 6. Appendices
    ├── A. Test Payload Catalog
    ├── B. Runbooks
    └── C. Compliance Mapping
```

### 3. Quality Gate Verification

Verify the test plan satisfies:

| Gate | Requirement | Addressed |
|------|-------------|-----------|
| QG-M3 | Agent runtime safety patterns | Step 2 |
| QG-I3 | Agent safety integration | Steps 1-4 |
| QG-S4 | AI security controls | All steps |

### 4. Final Validation Checklist

| Item | Status |
|------|--------|
| All threat categories covered | [ ] |
| Multi-tenant isolation verified | [ ] |
| CI/CD integration defined | [ ] |
| Detection metrics established | [ ] |
| Runbooks documented | [ ] |
| Compliance mapping complete | [ ] |

**Verify current best practices with web search:**
Search the web: "AI security test plan structure best practices {date}"
Search the web: "LLM security testing documentation standards {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
- **C (Continue)**: Complete Create mode
```

#### If 'C' (Continue):
- Save complete AI security test plan
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/security/ai-security-test-plan.md`
- Create mode complete

---

## Verification

- [ ] All sections assembled from previous steps
- [ ] Test plan structure follows template
- [ ] Quality gate requirements mapped
- [ ] Final validation checklist complete

---

## Outputs

- Complete AI Security Test Plan document
- Quality gate compliance verification
- **Output to:** `{output_folder}/planning-artifacts/security/ai-security-test-plan.md`

---

## Next Step

Create workflow complete. AI security test plan ready for validation using Validate mode (`step-20-v-*`).

---

## Quality Gate Contribution: QG-S4 AI Security Gate

This workflow completes contribution to QG-S4 by providing comprehensive AI security testing:

| QG-S4 Pattern | Step | Status |
|---------------|------|--------|
| `prompt_injection_tested` | Step 1 | Test cases designed |
| `adversarial_detection_active` | Step 2 | Detection rules defined |
| `output_filtering_verified` | Step 2 | Output filtering tests |
| `kill_switch_tested` | Step 2 | Kill switch validation |
| `model_extraction_prevented` | Step 3 | Extraction prevention tests |
| `adversarial_resilience_tested` | Step 4 | Resilience testing defined |

**QG-S4 enables QG-S10:** Upon QG-S4 pass, penetration-testing-design workflow (QG-S10) can execute.

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S4`

---

## Create Mode Complete

AI security test plan design is complete.
