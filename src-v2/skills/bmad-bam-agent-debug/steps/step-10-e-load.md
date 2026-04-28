# Step 10: Load Existing Debug Report (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER proceed without locating the existing agent-debug-report.md file
- 📖 ALWAYS read the complete document including trace data and root cause analysis
- 🔄 ALWAYS parse the failure classification matrix for current state
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all agent runtime context and LLM interaction traces
- 📋 PRESENT a structured summary of current findings before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY resolution status to understand which issues are still open

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing agent debug report for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract agent runtime, failure modes, root causes, remediation status
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may require re-testing of remediation effectiveness
- 🔍 Use web search: Only if user requests updated debugging patterns

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## Purpose

Load and review existing agent debug report documents to identify sections requiring modification based on new findings, updated remediation strategies, or additional failure analysis.

---

## YOUR TASK

Load the existing agent debug report, parse its structure, extract the current failure analysis and remediation state, and present a summary showing what can be edited. Enable the user to select specific sections for modification based on new debugging data or effectiveness feedback.

---

## Prerequisites

- Existing debug report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-runtime`
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---

## Actions

### 1. Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/agent-debug-report.md
```

If not found, check alternate locations:
- `{output_folder}/agent-debug-report.md`
- `{project-root}/docs/debugging/agent-debug-report.md`

**If document not found:**
```
================================================================================
EDIT MODE ERROR: No existing agent debug report found
================================================================================
Expected location: {output_folder}/planning-artifacts/agent-debug-report.md

Options:
[C] Switch to Create mode to generate new debug report
[P] Specify alternate path to existing document
================================================================================
```

### 2. Parse Frontmatter and Metadata

**Extract document metadata:**

| Metadata | Value |
|----------|-------|
| Report ID | |
| Agent Type | |
| Runtime | {langgraph/crewai/autogen} |
| Issue Severity | {critical/high/medium/low} |
| Resolution Status | {open/investigating/resolved} |
| Document Version | |
| Last Updated | |

### 3. Parse Failure Classification Matrix

**Extract current failure analysis:**

| Failure Category | Occurrences | Status | Root Cause Identified |
|------------------|-------------|--------|----------------------|
| LLM Response Errors | {count} | {status} | {yes/no} |
| Tool Execution Failures | {count} | {status} | {yes/no} |
| State Corruption | {count} | {status} | {yes/no} |
| Context Overflow | {count} | {status} | {yes/no} |
| Tenant Isolation Breach | {count} | {status} | {yes/no} |
| Timeout/Resource Exhaustion | {count} | {status} | {yes/no} |

**Flag unresolved categories:** Mark any with "investigating" or missing root cause.

### 4. Extract Trace Analysis Summary

**Parse execution trace data:**

| Trace Component | Current State | Notes |
|-----------------|---------------|-------|
| Request entry point | | |
| LLM invocations | {count} calls | |
| Tool executions | {count} calls | |
| State transitions | {count} | |
| Error point | {node/step} | |
| Tenant context | {preserved/lost} | |

### 5. Extract Remediation Status

**Parse remediation progress:**

| Remediation Action | Status | Effectiveness |
|--------------------|--------|---------------|
| {action_1} | {implemented/pending/blocked} | {tested/untested} |
| {action_2} | {implemented/pending/blocked} | {tested/untested} |
| {action_3} | {implemented/pending/blocked} | {tested/untested} |

### 6. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
AGENT DEBUG REPORT - EDIT MODE
================================================================================
Document: agent-debug-report.md
Version: {version}
Agent Type: {agent_type}
Runtime: {runtime}
Resolution Status: {status}
================================================================================

FAILURE CATEGORIES:
1. LLM Response Errors:    {count} - {status}
2. Tool Execution:         {count} - {status}
3. State Corruption:       {count} - {status}
4. Context Overflow:       {count} - {status}
5. Tenant Breach:          {count} - {status}
6. Timeout/Resources:      {count} - {status}

REMEDIATION PROGRESS: {implemented}/{total} actions complete

EDITABLE SECTIONS:
[1] Failure Analysis - Add new failure modes or update counts
[2] Root Cause Analysis - Refine or add root cause findings
[3] Trace Data - Add new execution traces
[4] Remediation Actions - Update action status or add new actions
[5] Prevention Measures - Update monitoring/alerting
[6] Full Document - Major revision (if issue scope changed)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Failure classification matrix parsed completely
- ✅ Trace analysis summarized
- ✅ Remediation status documented
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Missing trace data:** Warn that edits may be limited without traces
- ❌ **Conflicting remediation status:** Flag inconsistencies for user resolution

---

## Verification

- [ ] Existing debug report loaded successfully
- [ ] Document structure understood
- [ ] Failure categories extracted and categorized
- [ ] Trace analysis summary captured
- [ ] Remediation status documented
- [ ] Sections for modification identified
- [ ] User confirmed modification targets
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current debug report state
- Failure classification matrix
- Remediation progress summary
- List of sections to modify with rationale
- Modification priority assessment

---

## Next Step

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed failure matrix
- Remediation status for tracking
