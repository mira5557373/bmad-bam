# Step 10: Load Existing Tracing Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Load existing specification for modification
- 💾 **Track:** `stepsCompleted: 10` when complete
- 📖 **Context:** Edit mode - modifying existing artifact
- 🚫 **Do NOT:** Make changes without documenting current state first

## Purpose

Load existing agent tracing design document for modification.

---

## Prerequisites

- Existing artifact at `{output_folder}/planning-artifacts/agent-tracing-design.md`

---

## Actions

### 1. Load Existing Specification

Read: `{output_folder}/planning-artifacts/agent-tracing-design.md`

### 2. Parse Current State

Extract and document current design elements:

| Section | Current State | Last Modified |
|---------|---------------|---------------|
| Trace Dimensions | | |
| Span Naming | | |
| Tenant Attributes | | |
| Token Metrics | | |
| Propagation Design | | |
| Analysis Design | | |

### 3. Identify Change Scope

Determine what modifications are requested:

| Change Type | Impact Level | Requires Re-validation |
|-------------|--------------|------------------------|
| Add span type | Low | No |
| Modify attribute | Medium | Yes - schema update |
| Change propagation | High | Yes - integration test |
| Add dashboard | Low | No |
| Modify alert rule | Medium | Yes - threshold review |
| Change tenant scope | High | Yes - QG-I2 |

### 4. Document Change Request

| Change | Section | Rationale | Impact |
|--------|---------|-----------|--------|
| | | | |

---

## Verification

- [ ] Existing specification loaded
- [ ] Current state documented
- [ ] Change scope identified
- [ ] Impact assessment complete

---

## Outputs

- Current state summary
- Change impact assessment
- Modification plan

---

## Next Step

Proceed to `step-11-e-apply.md` with loaded state and change request.
