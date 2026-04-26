# Step 20: Load Agent Runtime Artifact (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-M3 checklist** - This is the validation gate for agent runtime
- 📋 **VERIFY artifact exists** before proceeding to validation checks

## EXECUTION PROTOCOLS

- 🎯 Focus: Load agent runtime artifact and QG-M3 checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against QG-M3 criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- 🔍 Use web search: Verify current AI runtime best practices
- ⚠️ Gate: QG-M3 (Agent Runtime Gate) - CRITICAL checks must pass

---

## Purpose

Load the existing agent runtime architecture artifact and QG-M3 validation checklist in preparation for formal quality gate verification.

---

## Prerequisites

- Agent runtime artifact exists at `{output_folder}/planning-artifacts/agent-runtime-architecture.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter: selected ai_runtime

---

## YOUR TASK

Load the agent runtime architecture artifact created in Create mode. If the artifact does not exist, inform the user and suggest switching to Create mode. Prepare all validation criteria from QG-M3 checklist for systematic verification.

---

## Validation Sequence

### Action 1: Load Agent Runtime Artifact

**Attempt to read:**

```
{output_folder}/planning-artifacts/agent-runtime-architecture.md
```

**If artifact does not exist:**
- Inform user: "Agent runtime architecture not found. Please run Create mode first."
- Suggest: `bmad-bam-agent-runtime` Create mode (step-01-c-*)
- HALT validation workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Document Path | `{output_folder}/planning-artifacts/agent-runtime-architecture.md` |
| Version | {from frontmatter} |
| AI Runtime | {ai_runtime from frontmatter} |
| Last Modified | {date} |
| Create Steps Completed | {stepsCompleted array} |

### Action 2: Load QG-M3 Validation Checklist

**Read and internalize:**

```
{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md
```

Extract the validation categories:

| Category | Classification | Pass Criteria |
|----------|----------------|---------------|
| Orchestration | CRITICAL | Pattern documented, topology defined |
| Tool Registry | CRITICAL | Catalog implemented, tenant isolation verified |
| Memory Tiers | CRITICAL | All tiers configured, scope enforcement active |
| Kill Switch | CRITICAL | Feature flags integrated, circuit breaker active |
| Approval Workflow | Non-critical | Triggers defined, queue implemented |
| Evaluation Foundation | Non-critical | Metrics defined, thresholds configured |

### Action 3: Verify Core Components Present

Check artifact contains all required components:

| Component | Present | Status |
|-----------|---------|--------|
| Agent Topology | [ ] | |
| Tool Registry | [ ] | |
| Permission Model | [ ] | |
| Memory Architecture | [ ] | |
| Approval Workflow | [ ] | |
| Kill Switches | [ ] | |
| Guardrails | [ ] | |
| Evaluation Strategy | [ ] | |

**If any component missing:**
- Document which components are incomplete
- This will result in FAIL at QG-M3

### Action 4: Verify Tenant Isolation Markers

Check for tenant-scoping in critical areas:

| Area | Tenant-Scoped | Evidence |
|------|---------------|----------|
| Agent Operations | [ ] | |
| Tool Registry | [ ] | |
| Memory Tiers | [ ] | |
| Event Handlers | [ ] | |

**CRITICAL:** All agent operations must be tenant-scoped.

### Action 5: Prepare Validation Summary

Present artifact overview to user:

```
================================================================================
AGENT RUNTIME ARCHITECTURE ARTIFACT LOADED
================================================================================
Path: {output_folder}/planning-artifacts/agent-runtime-architecture.md
AI Runtime: {ai_runtime}
Version: {version}
Agent Topology: {pattern} - {agent_count} agents
Tool Registry: {tool_count} tools
Memory Tiers: {tier_count}/4 configured
================================================================================

Ready for QG-M3 validation?
```

---

## Quality Gate Integration

**QG-M3 Validation Scope:**

This validation workflow verifies the agent runtime architecture meets QG-M3 (Agent Runtime Readiness) criteria. The gate validates:

- Orchestration pattern documented and justified
- Tool registry implemented with tenant isolation
- Memory tiers configured with scope enforcement
- Kill switches operational for all agents
- **CRITICAL:** No cross-tenant agent state leakage

**Gate Outcomes:**

| Outcome | Definition |
|---------|------------|
| **PASS** | All CRITICAL checks pass, non-critical documented |
| **CONDITIONAL** | All CRITICAL pass, non-critical gaps with remediation plan |
| **FAIL** | Any CRITICAL check fails - block until resolved |
| **WAIVED** | Non-critical waived with stakeholder sign-off |

---

## COLLABORATION MENUS (A/P/C)

After loading artifact, present options:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure before validation
- **P (Party Mode)**: AI Runtime architect review of validation approach
- **C (Continue)**: Proceed to validation checks
- **[Specific concerns]**: Describe concerns about artifact completeness

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: artifact contents, agent topology, tool registry status
- Explore edge cases: missing tools, memory scope gaps
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review agent runtime artifact before QG-M3 validation"
- Present AI runtime and security perspectives on validation approach
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to `step-21-v-validate.md`

---

## SUCCESS METRICS

- ✅ Agent runtime artifact loaded successfully
- ✅ Document metadata extracted and displayed
- ✅ QG-M3 checklist loaded and understood
- ✅ Core components presence verified
- ✅ Tenant isolation markers identified
- ✅ Validation readiness confirmed by user
- ✅ Create mode steps (1-5) completed in artifact

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing frontmatter:** Cannot extract version/runtime
- ❌ **Incomplete Create mode:** stepsCompleted missing steps 1-5
- ❌ **QG-M3 checklist not found:** Verify BAM installation

---

## Verification

- [ ] Artifact loaded from correct path
- [ ] Document metadata captured
- [ ] QG-M3 checklist loaded
- [ ] Core components verified present
- [ ] Tenant isolation markers identified
- [ ] User confirmed ready for validation

---

## Outputs

- Loaded artifact content with metadata
- QG-M3 validation criteria prepared
- Validation readiness confirmation

---

## NEXT STEP

Proceed to `step-21-v-validate.md` to run QG-M3 validation checks against the agent runtime architecture. The validation step will systematically verify all CRITICAL and non-critical criteria.
