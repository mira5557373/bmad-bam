# Step 10: Load Existing Agent Runtime Architecture

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing agent-runtime-architecture.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse the agent topology and tool registry for current state
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all memory tier configurations and kill switch settings
- 📋 PRESENT a structured summary of current design before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-M3 status from frontmatter to understand compliance state
- ⚠️ FLAG any sections marked as "TODO" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing agent runtime architecture for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract AI runtime framework, agent topology, tool registry, memory tiers
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-M3 status
- 🔍 Use web search: Only if user requests updated best practices

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading existing artifact
- Applying user-requested changes
- Preserving existing content

**OUT OF SCOPE:**
- Creating new artifacts (use Create mode)
- Validation (use Validate mode)
## YOUR TASK

Load the existing agent runtime architecture document, parse its structure, extract the current runtime configuration, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

---

## Load Sequence

### Action 1: Locate Document

**Search for existing artifact:**

```
{output_folder}/planning-artifacts/agent-runtime-architecture.md
```

If not found, check alternate locations:
- `{output_folder}/agent-runtime-architecture.md`
- `{project-root}/docs/architecture/agent-runtime-architecture.md`

**If document not found:**
```
================================================================================
EDIT MODE ERROR: No existing agent runtime architecture found
================================================================================
Expected location: {output_folder}/planning-artifacts/agent-runtime-architecture.md

Options:
[C] Switch to Create mode to generate new design
[P] Specify alternate path to existing document
================================================================================
```

### Action 2: Parse Frontmatter

**Extract document metadata:**

```yaml
# Expected frontmatter structure
ai_runtime: {langgraph|crewai|autogen|dspy|instructor|custom}
version: {semantic_version}
date: {last_modified_date}
stepsCompleted: [1, 2, 3, 4, 5]
qg_m3_status: {PASS|CONDITIONAL|PENDING}
```

Document current state:

| Metadata | Value |
|----------|-------|
| AI Runtime | |
| Document Version | |
| Last Modified | |
| QG-M3 Status | |
| Completeness | |

### Action 3: Extract Agent Topology

**Parse current agent configuration:**

| Agent | Purpose | Tools | Memory Scope | Status |
|-------|---------|-------|--------------|--------|
| | | | | |

**Topology Pattern:** {single-agent|multi-agent-sequential|multi-agent-parallel|hierarchical}

**Flag incomplete agents:** Mark any with "TODO" or missing tool assignments.

### Action 4: Extract Tool Registry

**Parse registered tools:**

| Tool | Category | Tenant-Scoped | Approval Required | Sandbox | Status |
|------|----------|---------------|-------------------|---------|--------|
| | | | | | |

**Permission Model:**

| Role | Allowed Categories | Restricted Tools |
|------|-------------------|------------------|
| | | |

### Action 5: Extract Memory Tiers

**Parse memory architecture:**

| Tier | Store | Retention | Budget | Tenant-Isolated |
|------|-------|-----------|--------|-----------------|
| Session | | | | |
| User | | | | |
| Tenant | | | | |
| Global | | | | |

### Action 6: Extract Safety Infrastructure

**Parse kill switches and guardrails:**

| Switch | Scope | Trigger | Recovery | Status |
|--------|-------|---------|----------|--------|
| | | | | |

| Guardrail | Type | Action | Status |
|-----------|------|--------|--------|
| | | | |

### Action 7: Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
AGENT RUNTIME ARCHITECTURE - EDIT MODE
================================================================================
Document: agent-runtime-architecture.md
Version: {version}
AI Runtime: {ai_runtime}
QG-M3 Status: {status}
================================================================================

CURRENT CONFIGURATION:
Agent Topology:    {pattern} - {agent_count} agents
Tool Registry:     {tool_count} tools registered
Memory Tiers:      {tier_count}/4 tiers configured
Kill Switches:     {switch_count} configured
Guardrails:        {rail_count} active

EDITABLE SECTIONS:
[1] Agent Topology - Modify agent configuration and responsibilities
[2] Tool Registry - Add/remove tools, update permissions
[3] Memory Tiers - Change retention, budgets, scope enforcement
[4] Approval Workflow - Update triggers and approval types
[5] Safety Infrastructure - Modify kill switches, guardrails
[6] Evaluation Strategy - Update metrics and thresholds
[7] Full Document - Major restructure (requires re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ Agent topology parsed completely
- ✅ Tool registry extracted with permission model
- ✅ Memory tier configuration documented
- ✅ Safety infrastructure parsed
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete topology:** Flag agents needing completion before edit
- ❌ **QG-M3 already failed:** Warn that edits require full re-validation

---

## Verification

- [ ] Document loaded from expected location
- [ ] Frontmatter parsed with ai_runtime, version, QG-M3 status
- [ ] Agent topology extracted
- [ ] Tool registry parsed
- [ ] Memory tiers documented
- [ ] Safety infrastructure parsed
- [ ] Edit summary presented
- [ ] User selection received

---

## NEXT STEP

Proceed to `step-11-e-apply.md` with:
- Selected edit target(s)
- Current document state
- Parsed runtime configuration
- QG-M3 status for re-validation tracking
