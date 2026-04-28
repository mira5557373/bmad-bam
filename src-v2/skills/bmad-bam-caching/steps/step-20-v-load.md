# Step 20: Load Caching Design Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-M2 checklist** - Cache dimension validation criteria
- 📋 **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Load caching design artifact and QG-M2 cache validation checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against QG-M2 cache criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current caching best practices
- ⚠️ Gate: QG-M2 Cache Dimension - CRITICAL checks must pass

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

Load the existing caching design artifact and QG-M2 cache validation checklist in preparation for formal quality gate verification of the cache dimension.

---

## Prerequisites

- Caching design artifact exists at `{output_folder}/planning-artifacts/caching-design.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2.md` (cache dimension)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `caching-*`

---

## YOUR TASK

Load the caching design artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-M2 cache dimension checklist for systematic verification.

---

## Validation Sequence

### Action 1: Load Caching Design Artifact

**Attempt to read:**

```
{output_folder}/planning-artifacts/caching-design.md
```

**If artifact does not exist:**
- Inform user: "Caching design not found. Please run Create mode first."
- Suggest: `bmad-bam-caching` Create mode (step-01-c-*)
- HALT validation workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/caching-design.md` |
| Version | {from frontmatter} |
| Tenant Model | {tenant_model from frontmatter} |
| Last Modified | {date} |
| Create Steps Completed | {stepsCompleted array} |

### Action 2: Load QG-M2 Cache Validation Checklist

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-m2.md
```

Extract the cache-specific validation categories:

| Category | Classification | Pass Criteria |
|----------|----------------|---------------|
| Cache Key Isolation | CRITICAL | All keys include tenant prefix |
| Cache Layer Consistency | CRITICAL | L1, L2, CDN all tenant-aware |
| TTL Policy | Non-critical | TTL defined per tier |
| Invalidation Strategy | CRITICAL | Event-driven invalidation configured |
| Circuit Breaker | Non-critical | Fallback behavior defined |
| Performance Monitoring | Non-critical | Hit rate metrics configured |

### Action 3: Verify Cache Layer Configuration Present

Check artifact contains all cache layers:

| Layer | Present | Configuration Status |
|-------|---------|---------------------|
| L1 (In-Memory) | [ ] | |
| L2 (Distributed) | [ ] | |
| CDN | [ ] | |

**If any layer missing:**
- Document which layers are incomplete
- This will result in FAIL at QG-M2 cache dimension

### Action 4: Verify Key Strategy Present

Check artifact contains tenant-aware key patterns:

| Component | Present | Status |
|-----------|---------|--------|
| Key Pattern | [ ] | `tenant:{id}:{type}:{key}` |
| Session Keys | [ ] | |
| Entity Keys | [ ] | |
| Query Keys | [ ] | |

### Action 5: Verify Supporting Sections Present

Check artifact contains required sections:

| Section | Present | Status |
|---------|---------|--------|
| TTL Policies | [ ] | |
| Invalidation Strategy | [ ] | |
| Performance Settings | [ ] | |
| Cache Warming | [ ] | |

### Action 6: Prepare Validation Summary

Present artifact overview to user:

```
================================================================================
CACHING DESIGN ARTIFACT LOADED
================================================================================
Path: {output_folder}/planning-artifacts/caching-design.md
Tenant Model: {tenant_model}
Version: {version}
Cache Layers: {complete/incomplete}
Key Strategy: {documented/missing}
TTL Policies: {documented/missing}
Invalidation: {documented/missing}
================================================================================

Ready for QG-M2 cache dimension validation?
```

---

## Quality Gate Integration

**QG-M2 Cache Dimension Validation Scope:**

This validation workflow verifies the caching design meets QG-M2 (Tenant Isolation Complete) cache dimension criteria. The gate validates:

- All cache keys include tenant prefix
- Cache layers provide tenant isolation
- TTL policies defined by tier
- Invalidation strategy is event-driven and tenant-scoped
- **CRITICAL:** No cross-tenant cache pollution possible

**Gate Outcomes:**

| Outcome | Definition |
|---------|------------|
| **PASS** | All CRITICAL checks pass, >=80% non-critical pass |
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
- Pass context: artifact contents, cache layer status
- Explore edge cases: missing layers, incomplete key patterns
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review caching design artifact before QG-M2 validation"
- Present security and architect perspectives on validation approach
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to `step-21-v-validate.md`

---

## SUCCESS METRICS

- ✅ Caching design artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ QG-M2 cache checklist loaded and understood
- ✅ Cache layer presence verified
- ✅ Key strategy presence verified
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
- [ ] Cache layers verified present
- [ ] Key strategy verified present
- [ ] User confirmed ready for validation

---

## Outputs

- Loaded artifact content with metadata
- QG-M2 cache validation criteria prepared
- Validation readiness confirmation

---

## NEXT STEP

Proceed to `step-21-v-validate.md` to run QG-M2 cache dimension validation checks against the caching design. The validation step will systematically verify all CRITICAL and non-critical criteria.
