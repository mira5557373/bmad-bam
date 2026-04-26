# Step 05: Compile Agent Runtime Architecture

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate artifact without all previous steps complete**
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause at QG-M3 checkpoint** and await user decision
- 🎯 **Focus ONLY on compilation and verification** - no new design work
- 🚦 **HALT at QG-M3 checkpoint** - Do not proceed without explicit approval

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile all decisions into final artifact
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📝 Maintain: Complete document from all prior steps
- ✅ Present: QG-M3 soft gate checkpoint for approval
- 🔍 Use web search: Final verification of runtime patterns
- 📎 Reference: Template for artifact structure

---

## CONTEXT BOUNDARIES

### Input Context

This step builds on all previous Create mode steps:

| Step | Deliverable | Required Input |
|------|-------------|----------------|
| Step 01 | Requirements gathered | Agent types, orchestration, tools, tenant scoping |
| Step 02 | Runtime analyzed | Selected runtime, comparison matrix |
| Step 03 | Architecture designed | Graph, tools, memory, context injection |
| Step 04 | Observability documented | Tracing, versioning, metrics, error handling |

**All prior step outputs must be present before proceeding.**

---

## Purpose

Compile all agent runtime decisions into the final agent-runtime.md artifact and present the QG-M3 soft gate checkpoint for review before workflow completion.

---

## Prerequisites

- Steps 01-04 completed successfully
- **Load template:** `{project-root}/_bmad/bam/data/templates/agent-runtime-template.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`

---

## YOUR TASK

Compile the complete agent runtime architecture document by:

1. Loading the agent-runtime template
2. Populating all sections from Steps 01-04 decisions
3. Generating the architecture diagram
4. Presenting the QG-M3 soft gate checkpoint
5. Saving the final artifact

---

## Main Sequence

### Action 1: Load Agent Runtime Template

Load the design template:
- `{project-root}/_bmad/bam/data/templates/agent-runtime-template.md`

Prepare frontmatter with:

```yaml
---
title: Agent Runtime Architecture
version: 1.0.0
date: {{date}}
runtime: {selected_runtime}
tenant_model: {tenant_model}
stepsCompleted: [1, 2, 3, 4]
qg_m3_status: pending
---
```

### Action 2: Compile Requirements Section

Aggregate from Step 01:

```markdown
## 1. AI Agent Requirements

### 1.1 Agent Types

| Agent | Purpose | User-Facing | Orchestration |
|-------|---------|-------------|---------------|
| {agent_1} | {purpose} | {yes/no} | {style} |
| {agent_2} | {purpose} | {yes/no} | {style} |
| {agent_3} | {purpose} | {yes/no} | {style} |

### 1.2 Orchestration Requirements

| Requirement | Value | Impact |
|-------------|-------|--------|
| Orchestration Style | {style} | {impact} |
| Conditional Branching | {yes/no} | {impact} |
| Human-in-Loop | {yes/no} | {impact} |
| Maximum Execution Time | {duration} | {impact} |

### 1.3 State Management Requirements

| Requirement | Value | Storage |
|-------------|-------|---------|
| Session Memory | {yes/no} | {storage} |
| Task Checkpointing | {yes/no} | {storage} |
| Long-term Memory | {yes/no} | {storage} |
| Tenant Isolation | {method} | {implementation} |

### 1.4 Tool Access Requirements

| Category | Tools | Tenant Scoping |
|----------|-------|----------------|
| {category_1} | {tools} | {scoping} |
| {category_2} | {tools} | {scoping} |
| {category_3} | {tools} | {scoping} |

### 1.5 Tenant Scoping Decisions

| Dimension | Scoping | Rationale |
|-----------|---------|-----------|
| Agent Instances | {shared/dedicated} | {rationale} |
| Agent Memory | {shared/isolated} | {rationale} |
| Agent Tools | {shared/configured} | {rationale} |
| Agent Limits | {global/per-tenant} | {rationale} |
| LLM Credentials | {shared/BYOK} | {rationale} |
```

### Action 3: Compile Runtime Selection Section

Aggregate from Step 02:

```markdown
## 2. Runtime Selection

### 2.1 Selected Runtime: {runtime_name}

| Attribute | Value |
|-----------|-------|
| Runtime | {runtime_name} |
| Version | {version} |
| Selection Score | {score}/30 |
| Primary Rationale | {rationale} |

### 2.2 Comparison Summary

| Runtime | Score | Key Strengths | Key Limitations |
|---------|-------|---------------|-----------------|
| LangGraph | {score} | {strengths} | {limitations} |
| CrewAI | {score} | {strengths} | {limitations} |
| AutoGen | {score} | {strengths} | {limitations} |
| DSPy | {score} | {strengths} | {limitations} |
| Instructor | {score} | {strengths} | {limitations} |
| Custom | {score} | {strengths} | {limitations} |

### 2.3 Tenant Isolation Approach

{Description of how the selected runtime supports multi-tenant isolation}

### 2.4 Accepted Trade-offs

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| {tradeoff_1} | {impact} | {mitigation} |
| {tradeoff_2} | {impact} | {mitigation} |
```

### Action 4: Compile Architecture Section

Aggregate from Step 03:

```markdown
## 3. Agent Architecture

### 3.1 Graph/Workflow Structure

```
{Include architecture diagram from Step 03}
```

### 3.2 State Schema

| Field | Type | Purpose | Tenant Scoped |
|-------|------|---------|---------------|
| {field_1} | {type} | {purpose} | {yes/no} |
| {field_2} | {type} | {purpose} | {yes/no} |
| {field_3} | {type} | {purpose} | {yes/no} |

### 3.3 Tool Registry

| Tool | Category | Tenant Scoping | Rate Limit |
|------|----------|----------------|------------|
| {tool_1} | {category} | {scoping} | {limit} |
| {tool_2} | {category} | {scoping} | {limit} |
| {tool_3} | {category} | {scoping} | {limit} |

### 3.4 Memory Architecture

| Tier | Purpose | Storage | Tenant Key Pattern |
|------|---------|---------|-------------------|
| Session (L1) | {purpose} | {storage} | `tenant:{id}:session:*` |
| Short-term (L2) | {purpose} | {storage} | `tenant:{id}:task:*` |
| Long-term (L3) | {purpose} | {storage} | RLS + tenant_id |

### 3.5 Tenant Context Injection

| Injection Point | Method | Format |
|-----------------|--------|--------|
| {point_1} | {method} | {format} |
| {point_2} | {method} | {format} |
| {point_3} | {method} | {format} |
```

### Action 5: Compile Observability Section

Aggregate from Step 04:

```markdown
## 4. Observability and Operations

### 4.1 Execution Tracing

| Tool | Configuration | Sampling |
|------|---------------|----------|
| {tracing_tool} | {config} | {sampling_rate} |

**Instrumentation Points:**
- {point_1}
- {point_2}
- {point_3}

### 4.2 LLM Versioning

| Dimension | Strategy | Configuration |
|-----------|----------|---------------|
| Model Version | {strategy} | {config} |
| Prompt Version | {strategy} | {config} |
| Agent Version | {strategy} | {config} |

**Tenant Configuration Levels:**
| Level | Scope | Override Priority |
|-------|-------|-------------------|
| Platform | All tenants | Lowest |
| Tier | Free/Pro/Enterprise | Medium |
| Tenant | Single tenant | High |

### 4.3 Tenant-Scoped Metrics

| Metric | Type | Dimensions |
|--------|------|------------|
| {metric_1} | {type} | tenant_id, agent, model |
| {metric_2} | {type} | tenant_id, operation, status |
| {metric_3} | {type} | tenant_id, tier |

### 4.4 Error Handling

| Error Category | Retryable | Recovery Strategy |
|----------------|-----------|-------------------|
| {error_1} | {yes/no} | {strategy} |
| {error_2} | {yes/no} | {strategy} |
| {error_3} | {yes/no} | {strategy} |

**Circuit Breaker Configuration:**
- Open after: {failure_count} failures in {time_window}
- Half-open after: {recovery_time}
- Close after: {success_count} consecutive successes
```

### Action 6: Generate Architecture Diagram

Create comprehensive architecture diagram:

```markdown
## 5. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Agent Runtime Architecture                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐      ┌─────────────────────────────────────────────┐  │
│  │   Client    │─────►│              API Gateway                    │  │
│  │             │      │  (Tenant Context Extraction)                │  │
│  └─────────────┘      └──────────────────┬──────────────────────────┘  │
│                                          │                              │
│                                          ▼                              │
│                       ┌──────────────────────────────────────────────┐ │
│                       │           Agent Runtime ({runtime})          │ │
│                       │  ┌────────────────────────────────────────┐  │ │
│                       │  │             Graph/Workflow              │  │ │
│                       │  │   ┌─────┐   ┌─────┐   ┌─────┐         │  │ │
│                       │  │   │Agent│──►│Agent│──►│Agent│         │  │ │
│                       │  │   │  A  │   │  B  │   │  C  │         │  │ │
│                       │  │   └──┬──┘   └──┬──┘   └──┬──┘         │  │ │
│                       │  │      │         │         │             │  │ │
│                       │  └──────┼─────────┼─────────┼─────────────┘  │ │
│                       │         │         │         │                │ │
│                       │    ┌────▼─────────▼─────────▼────┐          │ │
│                       │    │        Tool Registry        │          │ │
│                       │    │    (Tenant-Scoped Tools)    │          │ │
│                       │    └─────────────┬───────────────┘          │ │
│                       └──────────────────┼───────────────────────────┘ │
│                                          │                              │
│         ┌────────────────────────────────┼────────────────────────┐    │
│         ▼                                ▼                        ▼    │
│  ┌─────────────┐                ┌─────────────┐           ┌──────────┐│
│  │   Memory    │                │  External   │           │    LLM   ││
│  │   Tiers     │                │    APIs     │           │ Provider ││
│  │ (L1/L2/L3)  │                │(Tenant Creds)│          │          ││
│  └─────────────┘                └─────────────┘           └──────────┘│
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Observability Layer                         │   │
│  │  [Tracing: {tracing}]  [Metrics: {metrics}]  [Logging: {logs}]  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Tenant Isolation:
├── API Gateway: Extract tenant_id from JWT
├── Graph State: tenant_id in state schema
├── Tool Registry: Tenant-scoped credentials
├── Memory: Tenant-prefixed keys / RLS
└── Observability: Tenant dimension in all metrics
```
```

### Action 7: QG-M3 Soft Gate Checkpoint

**Present checkpoint and await user decision:**

```
================================================================================
QG-M3 SOFT GATE CHECKPOINT: Agent Runtime Architecture Review
================================================================================

RUNTIME: {runtime_name}
AGENTS: {agent_count} agents defined
TOOLS: {tool_count} tools in registry
MEMORY: {tier_count} memory tiers
OBSERVABILITY: {tracing_tool} + {metrics_tool}

================================================================================

CRITICAL CHECKS:
- [ ] Runtime selection documented with rationale
- [ ] Agent graph/workflow structure defined
- [ ] Tool registry includes tenant scoping
- [ ] Memory tiers have tenant isolation
- [ ] Tenant context injection documented
- [ ] LLM versioning strategy defined

STANDARD CHECKS:
- [ ] Execution tracing instrumentation planned
- [ ] Tenant-scoped metrics defined
- [ ] Error handling patterns documented
- [ ] Circuit breaker configuration specified
- [ ] Graceful degradation levels defined
- [ ] Recovery procedures documented

================================================================================
OPTIONS:
[A] Approve - Accept architecture and complete workflow
[E] Edit - Modify specific sections before completion
[V] Validate - Run full QG-M3 validation workflow
================================================================================

Select an option:
```

### Action 8: Save to Output Location

Upon approval, write final artifact:
- **Output to:** `{output_folder}/planning-artifacts/agent-runtime.md`
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4, 5]`
- Set status: `qg_m3_status: PASS` or `qg_m3_status: CONDITIONAL`

**Verify current best practices with web search:**
Search the web: "AI agent architecture documentation best practices {date}"
Search the web: "{runtime_name} production checklist {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After presenting QG-M3 checkpoint, offer:

```
================================================================================
AGENT RUNTIME ARCHITECTURE COMPLETE
================================================================================

Your options:
- **A (Advanced Elicitation)**: Deep dive into specific architecture components
- **P (Party Mode)**: Security and architect final review
- **C (Continue)**: Accept architecture and complete Create mode

Select an option:
================================================================================
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Completeness** | Are all requirements from Step 01 addressed? |
| **Consistency** | Do all sections align with each other? |
| **Gaps** | What edge cases are not covered? |
| **Evolution** | How will architecture evolve over time? |
| **Dependencies** | What external dependencies exist? |
| **Risks** | What are the implementation risks? |

Pass context: Complete architecture document, QG-M3 checklist, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Final review of agent runtime architecture:
- Runtime: {runtime_name}
- Agents: {agent_count}
- Tools: {tool_count}
- Memory: {memory_tiers}
- Observability: {observability_stack}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **Architect** | Completeness | Does architecture meet all requirements? |
| **Security** | Tenant isolation | Are there any isolation gaps? |
| **DevOps** | Operability | Is this architecture operable? |
| **QA** | Testability | Can we test this architecture? |

Process multi-perspective analysis and synthesize final recommendations.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Save complete architecture to output file:
   - Output to: `{output_folder}/planning-artifacts/agent-runtime.md`

2. Update frontmatter:
   ```yaml
   stepsCompleted: [1, 2, 3, 4, 5]
   qg_m3_status: {PASS|CONDITIONAL}
   completed_at: {timestamp}
   ```

3. Record QG-M3 outcome in document

4. Create mode complete

---

## SUCCESS METRICS

- ✅ All sections populated from Steps 01-04
- ✅ Architecture diagram generated
- ✅ QG-M3 critical checks addressed
- ✅ Artifact saved to planning-artifacts
- ✅ Frontmatter complete with metadata
- ✅ User approved via A/P/C menu

---

## FAILURE MODES

- ❌ **Missing step outputs:** Return to incomplete step
- ❌ **Incomplete sections:** Fill from step working documents
- ❌ **QG-M3 critical failure:** Document gaps, enter recovery
- ❌ **Template not found:** Verify BAM installation
- ❌ **Inconsistent decisions:** Review step transitions

---

## Verification

- [ ] All 5 sections populated (Requirements, Selection, Architecture, Observability, Diagram)
- [ ] QG-M3 checkpoint presented
- [ ] User approval received
- [ ] Artifact written to output location
- [ ] Frontmatter complete with status

---

## Outputs

- Complete agent runtime architecture document
- **Output to:** `{output_folder}/planning-artifacts/agent-runtime.md`

---

## WORKFLOW COMPLETE

Create workflow complete. Agent runtime architecture is ready for:

- **Validation:** Run `bmad-bam-agent-runtime` Validate mode (step-20-v-*)
- **Next workflows:**
  - `bmad-bam-validate-module` - Run QG-M3 validation
  - `bmad-bam-convergence-verification` - Verify module integration
  - `bmad-bam-ai-agent-debug` - Debug agent issues (if needed)

---

## Next Step

Proceed to validation if formal QG-M3 sign-off required, or continue to next planning workflow.

**Workflow completion summary:**
```
================================================================================
AGENT RUNTIME WORKFLOW COMPLETE
================================================================================

ARTIFACT: agent-runtime.md
LOCATION: {output_folder}/planning-artifacts/agent-runtime.md
STATUS: QG-M3 {PASS|CONDITIONAL}
RUNTIME: {runtime_name}

NEXT STEPS:
1. Run validation mode for formal QG-M3 sign-off
2. Proceed to convergence-verification workflow
3. Begin implementation phase

================================================================================
```
