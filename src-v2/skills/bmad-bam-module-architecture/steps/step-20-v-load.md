# Step 20: Load Module Architecture Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-M1 checklist** - This is the validation gate for module architecture
- 📋 **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Load module architecture artifact and QG-M1 checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against QG-M1 criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current module design best practices
- ⚠️ Gate: QG-M1 (Module Architecture Gate) - CRITICAL checks must pass

---

## Purpose

Load the existing module architecture artifact and QG-M1 validation checklist in preparation for formal quality gate verification.

---

## Prerequisites

- Module architecture artifact exists at `{output_folder}/planning-artifacts/module-{name}-architecture.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m1.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` --> filter: module-architecture

---

## YOUR TASK

Load the module architecture artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-M1 checklist for systematic verification.

---

## Validation Sequence

### Action 1: Load Module Architecture Artifact

**Attempt to read:**

```
{output_folder}/planning-artifacts/module-{module_name}-architecture.md
```

**If artifact does not exist:**
- Inform user: "Module architecture not found. Please run Create mode first."
- Suggest: `bmad-bam-module-architecture` Create mode (step-01-c-*)
- HALT validation workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/module-{name}-architecture.md` |
| Module Name | {from frontmatter} |
| Version | {from frontmatter} |
| Last Modified | {date} |
| Create Steps Completed | {stepsCompleted array} |

### Action 2: Load QG-M1 Validation Checklist

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-m1.md
```

Extract the validation categories:

| Category | Classification | Pass Criteria |
|----------|----------------|---------------|
| Module Boundary | CRITICAL | Single clear responsibility defined |
| Public API Contracts | CRITICAL | Facade contract well-defined |
| Dependencies | CRITICAL | All through facades only |
| Tenant Context | CRITICAL | Properly integrated |
| Internal Structure | Non-critical | Layers follow pattern |
| Events | Non-critical | Documented |
| Testing Strategy | Non-critical | Defined |

### Action 3: Verify Module Structure Present

Check artifact contains all required sections:

| Section | Present | Status |
|---------|---------|--------|
| Module Boundary | [ ] | |
| Public API | [ ] | |
| Dependencies | [ ] | |
| Tenant Context | [ ] | |
| Internal Layers | [ ] | |
| Events | [ ] | |
| Testing | [ ] | |

**If any CRITICAL section missing:**
- Document which sections are incomplete
- This will result in FAIL at QG-M1

### Action 4: Prepare Validation Summary

Present artifact overview to user:

```
================================================================================
MODULE ARCHITECTURE ARTIFACT LOADED
================================================================================
Path: {output_folder}/planning-artifacts/module-{name}-architecture.md
Module: {module_name}
Version: {version}
Boundary Definition: {complete/incomplete}
Public API: {documented/missing}
Dependencies: {documented/missing}
Tenant Context: {integrated/missing}
================================================================================

Ready for QG-M1 validation?
```

---

## Quality Gate Integration

**QG-M1 Validation Scope:**

This validation workflow verifies the module architecture meets QG-M1 (Module Architecture Complete) criteria. The gate validates:

- Module has single clear responsibility
- Facade contract is well-defined with documented endpoints
- Dependencies are through facades only
- Tenant context properly integrated
- Internal component structure follows clean architecture
- **CRITICAL:** No boundary violations or tight coupling

**Gate Outcomes:**

| Outcome | Definition |
|---------|------------|
| **PASS** | All CRITICAL checks pass, >=80% standard pass |
| **CONDITIONAL** | All CRITICAL pass, <80% standard - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical items waived with stakeholder sign-off |

---

## COLLABORATION MENUS (A/P/C)

After loading artifact, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure before validation
- **P (Party Mode)**: Architecture review of validation approach
- **C (Continue)**: Proceed to validation checks
- **[Specific concerns]**: Describe concerns about artifact completeness

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact contents, module structure status
- Explore edge cases: missing sections, incomplete contracts
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module architecture artifact before QG-M1 validation"
- Present architect perspectives on validation approach
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to `step-21-v-validate.md`

---

## SUCCESS METRICS

- ✅ Module architecture artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ QG-M1 checklist loaded and understood
- ✅ Module structure presence verified
- ✅ Validation readiness confirmed by user
- ✅ Create mode steps (1-5) completed in artifact

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/module name
- ❌ **Incomplete Create mode:** stepsCompleted missing steps 1-5
- ❌ **QG-M1 checklist not found:** Verify BAM installation

---

## Verification

- [ ] Artifact loaded from correct path
- [ ] Document metadata captured
- [ ] QG-M1 checklist loaded
- [ ] Module structure verified present
- [ ] User confirmed ready for validation

---

## Outputs

- Loaded artifact content with metadata
- QG-M1 validation criteria prepared
- Validation readiness confirmation

---

## NEXT STEP

Proceed to `step-21-v-validate.md` to run QG-M1 validation checks against the module architecture. The validation step will systematically verify all CRITICAL and non-critical criteria.
