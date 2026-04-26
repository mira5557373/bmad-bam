# Step 20: Load API Versioning Design Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD API versioning checklist** - This is the validation criteria
- 📋 **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Load API versioning design artifact and validation checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against quality criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current API versioning validation practices
- ⚠️ Gate: API versioning validation informs QG-I1 (Convergence Gate)

---

## Purpose

Load the existing API versioning design artifact and validation checklist in preparation for formal quality verification.

---

## Prerequisites

- API versioning design artifact exists at `{output_folder}/planning-artifacts/api-versioning-design.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/api-versioning.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` --> filter: api-versioning

---

## YOUR TASK

Load the API versioning design artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from the checklist for systematic verification.

---

## Validation Sequence

### Action 1: Load API Versioning Design Artifact

**Attempt to read:**

```
{output_folder}/planning-artifacts/api-versioning-design.md
```

**If artifact does not exist:**
- Inform user: "API versioning design not found. Please run Create mode first."
- Suggest: `bmad-bam-api-versioning` Create mode (step-01-c-*)
- HALT validation workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/api-versioning-design.md` |
| Versioning Strategy | {from frontmatter} |
| Version Format | {from frontmatter} |
| Document Version | {from frontmatter} |
| Last Modified | {date} |
| Create Steps Completed | {stepsCompleted array} |
| QG Status | {from frontmatter} |

### Action 2: Load Validation Checklist

**Read and internalize validation criteria:**

```
{project-root}/_bmad/bam/data/checklists/api-versioning.md
```

Extract the validation categories:

| Category | Classification | Pass Criteria |
|----------|----------------|---------------|
| Strategy Completeness | CRITICAL | Strategy defined with format |
| Lifecycle Definition | CRITICAL | Deprecation and sunset defined |
| Tenant Pinning | CRITICAL | Multi-tenant version control |
| Backward Compatibility | CRITICAL | Breaking change rules defined |
| Migration Strategy | CRITICAL | Rollout and rollback defined |
| Analytics | Non-critical | Version tracking specified |
| Documentation | Non-critical | Implementation guide included |

### Action 3: Verify Design Structure Present

Check artifact contains all required sections:

| Section | Present | Status |
|---------|---------|--------|
| Executive Summary | [ ] | |
| Versioning Strategy | [ ] | |
| Version Lifecycle | [ ] | |
| Backward Compatibility | [ ] | |
| Migration Strategy | [ ] | |
| Implementation Checklist | [ ] | |
| Web Research References | [ ] | |

**If any CRITICAL section missing:**
- Document which sections are incomplete
- This will result in FAIL at validation

### Action 4: Extract Design Summary

**Parse design details:**

| Component | Value | Status |
|-----------|-------|--------|
| Versioning Strategy | {strategy} | {complete/incomplete} |
| Version Format | {format} | {complete/incomplete} |
| Deprecation Timeline | {months} | {complete/incomplete} |
| Tenant Pinning | {enabled/disabled} | {complete/incomplete} |
| Rollout Phases | {count} | {complete/incomplete} |
| Rollback Defined | {yes/no} | {complete/incomplete} |

### Action 5: Prepare Validation Summary

Present artifact overview to user:

```
================================================================================
API VERSIONING DESIGN ARTIFACT LOADED
================================================================================
Path: {output_folder}/planning-artifacts/api-versioning-design.md
Versioning Strategy: {strategy}
Version Format: {format}
Document Version: {version}
================================================================================

DESIGN SUMMARY:
Versioning Strategy:     {strategy} - {status}
Version Lifecycle:       {deprecation_months} mo deprecation - {status}
Tenant Pinning:          {enabled/disabled} - {status}
Backward Compatibility:  {defined/undefined} - {status}
Migration Strategy:      {rollout_phases} phases - {status}

CRITICAL SECTIONS:
- Strategy Completeness: {present/incomplete}
- Lifecycle Definition:  {present/incomplete}
- Tenant Pinning:        {present/missing}
- Backward Compatibility:{present/incomplete}
- Migration Strategy:    {present/incomplete}

================================================================================

Ready for API versioning validation?
```

---

## Quality Gate Integration

**API Versioning Validation Scope:**

This validation workflow verifies the API versioning design meets quality criteria. The validation covers:

- Versioning strategy is clearly defined and implementable
- Version lifecycle with deprecation and sunset is complete
- Tenant pinning supports multi-tenant version control
- Backward compatibility rules are comprehensive
- Migration strategy enables safe version evolution
- **CRITICAL:** No gaps in tenant version management

**Validation Outcomes:**

| Outcome | Definition |
|---------|------------|
| **PASS** | All CRITICAL checks pass, >=80% standard pass |
| **CONDITIONAL** | All CRITICAL pass, <80% standard - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical item waived with stakeholder sign-off |

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
- Pass context: artifact contents, design structure status
- Explore edge cases: missing sections, incomplete rules
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API versioning design artifact before validation"
- Present architect perspectives on validation approach
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to `step-21-v-validate.md`

---

## SUCCESS METRICS

- ✅ API versioning design artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ Validation checklist loaded and understood
- ✅ Design structure presence verified
- ✅ Validation readiness confirmed by user
- ✅ Create mode steps (1-5) completed in artifact

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/strategy
- ❌ **Incomplete Create mode:** stepsCompleted missing steps 1-5
- ❌ **Validation checklist not found:** Verify BAM installation

---

## Verification

- [ ] Artifact loaded from correct path
- [ ] Document metadata captured
- [ ] Validation checklist loaded
- [ ] Design structure verified present
- [ ] User confirmed ready for validation

---

## Outputs

- Loaded artifact content with metadata
- Validation criteria prepared
- Validation readiness confirmation

---

## NEXT STEP

Proceed to `step-21-v-validate.md` to run validation checks against the API versioning design. The validation step will systematically verify all CRITICAL and non-critical criteria.
