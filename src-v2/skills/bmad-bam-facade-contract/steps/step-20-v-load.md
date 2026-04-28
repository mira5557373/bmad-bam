# Step 20: Load Facade Contract Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-I1 checklist** - This is the validation gate for facade contracts
- 📋 **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Load facade contract artifact and QG-I1 checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against QG-I1 criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current contract validation best practices
- ⚠️ Gate: QG-I1 (Convergence Gate) - CRITICAL checks must pass

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Load the existing facade contract artifact and QG-I1 validation checklist in preparation for formal quality gate verification.

---

## Prerequisites

- Facade contract artifact exists at `{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i1.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` --> filter: facade-contract

---

## YOUR TASK

Load the facade contract artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-I1 checklist for systematic verification.

---

## Validation Sequence

### Action 1: Load Facade Contract Artifact

**Attempt to read:**

```
{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md
```

**If artifact does not exist:**
- Inform user: "Facade contract not found. Please run Create mode first."
- Suggest: `bmad-bam-facade-contract` Create mode (step-01-c-*)
- HALT validation workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/facade-{source}-{target}-contract.md` |
| Source Module | {from frontmatter} |
| Target Module | {from frontmatter} |
| Version | {from frontmatter} |
| Last Modified | {date} |
| Create Steps Completed | {stepsCompleted array} |

### Action 2: Load QG-I1 Validation Checklist

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-i1.md
```

Extract the validation categories:

| Category | Classification | Pass Criteria |
|----------|----------------|---------------|
| Contract Completeness | CRITICAL | All operations and events defined |
| Tenant Context | CRITICAL | Tenant_id required on all operations |
| Event Tenant Isolation | CRITICAL | Tenant_id in all event envelopes |
| Schema Definitions | CRITICAL | Input/output schemas complete |
| Error Contracts | Non-critical | Error codes documented |
| Versioning | Non-critical | Version strategy defined |
| Testing Strategy | Non-critical | Contract tests planned |

### Action 3: Verify Contract Structure Present

Check artifact contains all required sections:

| Section | Present | Status |
|---------|---------|--------|
| Contract Overview | [ ] | |
| Module Pairing | [ ] | |
| Operations | [ ] | |
| Input/Output Schemas | [ ] | |
| Error Contracts | [ ] | |
| Event Contracts | [ ] | |
| Tenant Context | [ ] | |
| Versioning | [ ] | |
| Testing Strategy | [ ] | |

**If any CRITICAL section missing:**
- Document which sections are incomplete
- This will result in FAIL at QG-I1

### Action 4: Extract Contract Summary

**Parse contract details:**

| Component | Count | Status |
|-----------|-------|--------|
| Operations | {count} | {complete/incomplete} |
| Input Schemas | {count} | {complete/incomplete} |
| Output Schemas | {count} | {complete/incomplete} |
| Error Codes | {count} | {complete/incomplete} |
| Published Events | {count} | {complete/incomplete} |
| Consumed Events | {count} | {complete/incomplete} |

### Action 5: Prepare Validation Summary

Present artifact overview to user:

```
================================================================================
FACADE CONTRACT ARTIFACT LOADED
================================================================================
Path: {output_folder}/planning-artifacts/facade-{source}-{target}-contract.md
Source Module: {source_module}
Target Module: {target_module}
Version: {version}
================================================================================

CONTRACT SUMMARY:
Operations:        {count} defined - {status}
Events:            {count} defined - {status}
Schemas:           {count} defined - {status}
Tenant Context:    {enforced/missing} - {status}

CRITICAL SECTIONS:
- Contract Completeness: {present/incomplete}
- Tenant Context:        {present/missing}
- Event Isolation:       {present/missing}
- Schema Definitions:    {present/incomplete}

================================================================================

Ready for QG-I1 validation?
```

---

## Quality Gate Integration

**QG-I1 Validation Scope:**

This validation workflow verifies the facade contract meets QG-I1 (Convergence Gate) criteria. The gate validates:

- All required operations are defined with complete contracts
- Tenant context is required on all facade operations
- All events include tenant_id in envelope
- Input/output schemas are complete and versioned
- Error contracts are comprehensive
- **CRITICAL:** No tenant isolation gaps

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
- Pass context: artifact contents, contract structure status
- Explore edge cases: missing sections, incomplete schemas
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade contract artifact before QG-I1 validation"
- Present architect perspectives on validation approach
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to `step-21-v-validate.md`

---

## SUCCESS METRICS

- ✅ Facade contract artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ QG-I1 checklist loaded and understood
- ✅ Contract structure presence verified
- ✅ Validation readiness confirmed by user
- ✅ Create mode steps (1-5) completed in artifact

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/module names
- ❌ **Incomplete Create mode:** stepsCompleted missing steps 1-5
- ❌ **QG-I1 checklist not found:** Verify BAM installation

---

## Verification

- [ ] Artifact loaded from correct path
- [ ] Document metadata captured
- [ ] QG-I1 checklist loaded
- [ ] Contract structure verified present
- [ ] User confirmed ready for validation

---

## Outputs

- Loaded artifact content with metadata
- QG-I1 validation criteria prepared
- Validation readiness confirmation

---

## NEXT STEP

Proceed to `step-21-v-validate.md` to run QG-I1 validation checks against the facade contract. The validation step will systematically verify all CRITICAL and non-critical criteria.
