# Step 22: Generate Validation Report

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

Generate a comprehensive validation report summarizing QG-F1 foundation gate findings and determining the gate decision for the master architecture document.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Validation performed against QG-F1 criteria
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-f1-foundation.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 by category:

| Category | Description |
|----------|-------------|
| Structural Completeness | Missing sections, template conformance issues |
| Tenant Model | Isolation strategy gaps, TenantContext issues, lifecycle gaps |
| AI Runtime | Registry gaps, memory tier issues, safety requirement gaps |
| Module Boundaries | Facade issues, forbidden dependencies, ownership gaps |
| Shared Kernel | Interface gaps, entity requirements, event bus issues |
| Technology Stack | Missing decisions, version pin gaps, limp mode gaps |
| Core Contracts | Interface contract issues, template gaps |
| Code Patterns | Missing patterns, incomplete examples |
| Cross-Cutting | Module-specific content, inconsistencies |

### 2. Assign Severity to Findings

| Severity | Classification | Description | Action Required |
|----------|----------------|-------------|-----------------|
| CRITICAL | Blocks QG-F1 | Missing required sections, undefined isolation strategy, no code patterns, shared kernel gaps | Must fix before proceeding |
| WARNING | Non-critical gap | Missing version pins for non-critical tech, incomplete documentation | Should address before module development |
| INFO | Improvement | Style suggestions, optional enhancements | Consider for future iterations |

Reference the Critical vs Non-Critical Classification table in `qg-f1-foundation.md`:
- Shared Kernel Implementation: CRITICAL
- Tests Passing (tenant isolation): CRITICAL
- Control Plane Implementation: CRITICAL
- Artifacts (status field): Non-critical
- Documentation: Non-critical
- AI Runtime (partial proceed possible): Non-critical with mitigation plan

### 3. Determine Gate Decision

Apply gate decision criteria from QG-F1:

| Decision | Criteria |
|----------|----------|
| **PASS** | All CRITICAL items pass, >=80% of non-critical items pass |
| **CONDITIONAL** | All CRITICAL items pass, <80% of non-critical items pass - remediation plan required |
| **FAIL** | Any CRITICAL item fails - block until resolved |

### 4. Generate Report

Create the validation report with the following structure:

```markdown
# Master Architecture Validation Report

**Gate ID:** QG-F1 (Foundation Gate)
**Artifact:** master-architecture.md
**Validation Date:** {{date}}
**Gate Decision:** [PASS | CONDITIONAL | FAIL]

## Executive Summary

[1-2 sentence summary of validation outcome]

## Gate Decision Rationale

[Explanation of why this decision was reached]

## Findings by Category

### [Category Name]
| Finding | Severity | Details | Recommendation |
|---------|----------|---------|----------------|
| [Finding] | [CRITICAL/WARNING/INFO] | [Details] | [Action] |

[Repeat for each category with findings]

## Critical Items Status

- [ ] All required sections present (1-7)
- [ ] Tenant isolation strategy defined
- [ ] TenantContext class shape documented
- [ ] Isolation matrix complete
- [ ] Code patterns present (>=4 examples)
- [ ] Shared kernel interfaces defined

## Remediation Plan (if CONDITIONAL)

| Item | Owner | Deadline | Status |
|------|-------|----------|--------|
| [Gap] | [Role] | [Date] | Pending |

## Next Steps

[Guidance based on gate decision]
```

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings or remediation approach
- **P (Party Mode)**: Bring PM and architect perspectives on next steps
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific concerns]**: Describe concerns about report or next steps

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, gate decision, remediation plan
- Process enhanced insights on remediation strategy
- Ask user: "Accept this remediation approach? (y/n)"
- If yes, finalize remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-F1 validation report and recommend next steps"
- Process PM and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow
- Provide gate decision guidance

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding using QG-F1 classification
- [ ] Gate decision determined using QG-F1 criteria
- [ ] Remediation plan included (if CONDITIONAL)
- [ ] Report generated and saved

---

## Outputs

- Validation report document
- **Output to:** `{output_folder}/planning-artifacts/master-architecture-validation-report.md`

---

## Next Step

Based on gate decision:

- **PASS:** Foundation gate cleared. Proceed to downstream workflows:
  - `bmad-bam-tenant-model-isolation` for detailed tenant isolation design
  - `bmad-bam-module-boundary-design` for module architecture
  - `bmad-bam-agent-runtime-architecture` for AI runtime specification

- **CONDITIONAL:** Foundation gate conditionally passed. Document the remediation plan with deadlines, then proceed to downstream workflows while tracking remediation. All remediation items must be resolved before QG-I1 (Convergence) gate.

- **FAIL:** Foundation gate blocked. Return to Edit mode via `step-10-e-load-existing.md` to address critical findings. After corrections, re-run validation starting at `step-20-v-load-artifact.md`.

---

## Workflow Complete

Validation mode complete. The master architecture validation report documents the QG-F1 gate decision and any required remediation actions.
