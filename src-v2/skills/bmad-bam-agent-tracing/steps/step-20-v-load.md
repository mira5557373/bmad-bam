# Step 20: Load Tracing Design for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Load specification and identify validation targets
- 💾 **Track:** `stepsCompleted: 20` when complete
- 📖 **Context:** Validate mode - preparing for quality gate checks
- 🚫 **Do NOT:** Begin validation checks in this step

## YOUR TASK

Load the agent tracing design artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-M3 and QG-I2 checklists for systematic verification of trace schemas, span hierarchies, and tenant context propagation.

---

## Purpose

Load agent tracing design specification for validation against quality gate criteria.

---

## Prerequisites

- Artifact exists at `{output_folder}/planning-artifacts/agent-tracing-design.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i2-tenant-safety.md`

---

## Actions

### 1. Load Specification

Read: `{output_folder}/planning-artifacts/agent-tracing-design.md`

### 2. Extract Validation Targets

| Component | Location in Spec | Validation Gate |
|-----------|------------------|-----------------|
| Trace dimensions | Section 1 | QG-M3 |
| Span naming | Section 2.1 | QG-M3 |
| Tenant attributes | Section 2.2 | QG-I2 |
| Token metrics | Section 2.3 | QG-M3 |
| Propagation design | Section 3 | QG-M3 |
| Analysis design | Section 4 | QG-P1 |

### 3. Load Validation Criteria

Load applicable quality gate checklists:

| Gate | Checklist | Scope |
|------|-----------|-------|
| QG-M3 | Agent Runtime | Tracing implementation |
| QG-I2 | Tenant Safety | Tenant isolation |
| QG-P1 | Production | Observability readiness |

### 4. Identify Critical Checks

| Check Category | Critical Items | Gate |
|----------------|----------------|------|
| Tenant isolation | tenant_id on all spans | QG-I2 |
| Token tracking | LLM token metrics defined | QG-M3 |
| Error handling | Error spans and events | QG-M3 |
| Context propagation | Cross-agent context | QG-M3 |
| Dashboard readiness | Tenant-scoped queries | QG-P1 |

---

## SUCCESS METRICS

- ✅ Tracing design artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ QG-M3 checklist loaded and understood
- ✅ QG-I2 checklist loaded for tenant isolation verification
- ✅ All trace dimensions presence verified
- ✅ Span hierarchy structure parsed
- ✅ Validation readiness confirmed by user
- ✅ Create mode steps completed in artifact

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/sampling config
- ❌ **Incomplete Create mode:** stepsCompleted missing required steps
- ❌ **QG-M3 checklist not found:** Verify BAM installation
- ❌ **Missing span definitions:** Flag trace dimensions needing completion

---

## Verification

- [ ] Specification loaded successfully
- [ ] All sections present
- [ ] Validation criteria loaded
- [ ] Critical checks identified

---

## Outputs

- Parsed specification
- Validation target list
- Applicable quality gates

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation.
