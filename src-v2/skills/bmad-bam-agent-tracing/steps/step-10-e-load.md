# Step 10: Load Existing Tracing Design

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing agent-tracing-design.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse the trace schema, span hierarchies, and sampling configuration
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all span types, attribute schemas, and tenant context propagation settings
- 📋 PRESENT a structured summary of current tracing design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-M3 status from frontmatter to understand agent runtime compliance
- ⚠️ FLAG any span types marked as "TODO" or missing tenant_id attributes

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing agent tracing design for modification
- 💾 Track: `stepsCompleted: 10` when complete
- 📖 Context: Extract trace dimensions, span naming, tenant attributes, sampling strategies
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-M3 status
- 🔍 Use web search: Only if user requests updated OpenTelemetry best practices

---

## YOUR TASK

Load the existing agent tracing design document, parse its trace schema structure, extract the current span hierarchies and sampling configuration, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

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

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
AGENT TRACING DESIGN - EDIT MODE
================================================================================
Document: agent-tracing-design.md
Version: {version}
QG-M3 Status: {status}
================================================================================

CURRENT TRACE DIMENSIONS:
1. Agent Spans:     {span_count} defined - {status}
2. Tool Spans:      {span_count} defined - {status}
3. LLM Spans:       {span_count} defined - {status}
4. Memory Spans:    {span_count} defined - {status}
5. Custom Spans:    {span_count} defined - {status}

TENANT CONTEXT: {propagation_method} - {status}
SAMPLING STRATEGY: {strategy} - {rate}

EDITABLE SECTIONS:
[1] Trace Dimensions - Modify span type definitions
[2] Span Naming - Update naming conventions and hierarchies
[3] Tenant Attributes - Change tenant context propagation
[4] Token Metrics - Adjust LLM token tracking configuration
[5] Sampling Strategy - Update sampling rates and rules
[6] Analysis Design - Modify dashboards and alert rules
[7] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ All trace dimensions parsed completely
- ✅ Span naming conventions documented
- ✅ Tenant attribute propagation chain extracted
- ✅ Sampling strategy configuration documented
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Missing tenant_id attributes:** Flag spans needing tenant context before edit
- ❌ **QG-M3 already failed:** Warn that edits require full re-validation
- ❌ **Incomplete span schema:** Flag span types needing completion before edit

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
