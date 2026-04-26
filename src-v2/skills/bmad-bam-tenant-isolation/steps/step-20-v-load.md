# Step 20: Load Tenant Isolation Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-M2 checklist** - This is the validation gate for tenant isolation
- 📋 **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Load tenant isolation artifact and QG-M2 checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against QG-M2 criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current isolation best practices
- ⚠️ Gate: QG-M2 (Tenant Isolation Gate) - CRITICAL checks must pass

---

## Purpose

Load the existing tenant isolation design artifact and QG-M2 validation checklist in preparation for formal quality gate verification.

---

## Prerequisites

- Tenant isolation artifact exists at `{output_folder}/planning-artifacts/tenant-isolation.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv` → filter: selected tenant model

---

## YOUR TASK

Load the tenant isolation design artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-M2 checklist for systematic verification.

---

## Validation Sequence

### Action 1: Load Tenant Isolation Artifact

**Attempt to read:**

```
{output_folder}/planning-artifacts/tenant-isolation.md
```

**If artifact does not exist:**
- Inform user: "Tenant isolation design not found. Please run Create mode first."
- Suggest: `bmad-bam-tenant-isolation` Create mode (step-01-c-*)
- HALT validation workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/tenant-isolation.md` |
| Version | {from frontmatter} |
| Tenant Model | {tenant_model from frontmatter} |
| Last Modified | {date} |
| Create Steps Completed | {stepsCompleted array} |

### Action 2: Load QG-M2 Validation Checklist

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-m2.md
```

Extract the validation categories:

| Category | Classification | Pass Criteria |
|----------|----------------|---------------|
| Database Level | CRITICAL | RLS policies enabled, cross-tenant blocked |
| Application Level | CRITICAL | Tenant context middleware working |
| Vector Store Level | CRITICAL | Collection isolation verified |
| Cache Level | CRITICAL | Tenant-prefixed keys |
| Memory Level | CRITICAL | Session/user/tenant scopes |
| Background Jobs | Non-critical | Context propagation |
| Audit | Non-critical | Tenant actions logged |

### Action 3: Verify 8-Dimension Matrix Present

Check artifact contains all 8 isolation dimensions:

| Dimension | Present | Status |
|-----------|---------|--------|
| Data | [ ] | |
| Cache | [ ] | |
| Storage | [ ] | |
| Compute | [ ] | |
| Network | [ ] | |
| API | [ ] | |
| Events | [ ] | |
| Logs | [ ] | |

**If any dimension missing:**
- Document which dimensions are incomplete
- This will result in FAIL at QG-M2

### Action 4: Prepare Validation Summary

Present artifact overview to user:

```
================================================================================
TENANT ISOLATION ARTIFACT LOADED
================================================================================
Path: {output_folder}/planning-artifacts/tenant-isolation.md
Tenant Model: {tenant_model}
Version: {version}
8-Dimension Matrix: {complete/incomplete}
Context Propagation: {documented/missing}
Sharing Rules: {documented/missing}
================================================================================

Ready for QG-M2 validation?
```

---

## Quality Gate Integration

**QG-M2 Validation Scope:**

This validation workflow verifies the tenant isolation design meets QG-M2 (Tenant Isolation Complete) criteria. The gate validates:

- All 8 isolation dimensions defined with isolation level
- Context propagation designed for request, async, and background jobs
- Sharing rules documented with enforcement methods
- Tier-specific variations addressed (Free/Pro/Enterprise)
- **CRITICAL:** No cross-tenant data leakage paths exist

**Gate Outcomes:**

| Outcome | Definition |
|---------|------------|
| **PASS** | All CRITICAL checks pass, ≥80% non-critical pass |
| **CONDITIONAL** | All CRITICAL pass, <80% non-critical - remediation plan required |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical waived with stakeholder sign-off |

---

## COLLABORATION MENUS (A/P/C)

After loading artifact, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure before validation
- **P (Party Mode)**: Security architect review of validation approach
- **C (Continue)**: Proceed to validation checks
- **[Specific concerns]**: Describe concerns about artifact completeness

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact contents, 8-dimension matrix status
- Explore edge cases: missing dimensions, incomplete propagation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation artifact before QG-M2 validation"
- Present security and architect perspectives on validation approach
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to `step-21-v-validate.md`

---

## SUCCESS METRICS

- ✅ Tenant isolation artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ QG-M2 checklist loaded and understood
- ✅ 8-dimension matrix presence verified
- ✅ Validation readiness confirmed by user
- ✅ Create mode steps (1-5) completed in artifact

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/model
- ❌ **Incomplete Create mode:** stepsCompleted missing steps 1-5
- ❌ **QG-M2 checklist not found:** Verify BAM installation

---

## Verification

- [ ] Artifact loaded from correct path
- [ ] Document metadata captured
- [ ] QG-M2 checklist loaded
- [ ] 8-dimension matrix verified present
- [ ] User confirmed ready for validation

---

## Outputs

- Loaded artifact content with metadata
- QG-M2 validation criteria prepared
- Validation readiness confirmation

---

## NEXT STEP

Proceed to `step-21-v-validate.md` to run QG-M2 validation checks against the tenant isolation design. The validation step will systematically verify all CRITICAL and non-critical criteria.
