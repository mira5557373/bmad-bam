# Step 05: Compile Tool Contract Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💾 **VERIFY all prior steps** complete before generating artifact

## EXECUTION PROTOCOLS

- 🎯 Focus: Compile comprehensive tool contract design document
- 💾 Track: `stepsCompleted: [1, 2, 3, 4, 5]` when complete
- 📖 Context: Synthesize all step outputs into final artifact
- 🚫 Do NOT: Add new design decisions; compile existing decisions
- 🔍 Use web search: Final verification of tool contract patterns
- ⚠️ Gate: Output feeds QG-M3 (Agent Runtime) validation

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Compiling all design decisions into single document
- Generating tool contract design artifact
- Creating verification checklist
- Preparing for QG-M3 validation

**OUT OF SCOPE:**
- New design decisions (Steps 01-04)
- Execution of tool contracts
- Quality gate validation (use Validate mode)

---

## Purpose

Compile all tool contract design decisions from Steps 01-04 into a comprehensive tool contract design document. This document serves as the definitive specification for tool implementation and feeds into QG-M3 (Agent Runtime) validation.

---

## Prerequisites

- Steps 01-04 completed: All design decisions made
- **Load template:** `{project-root}/_bmad/bam/data/templates/tool-contract.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tool-contract

---

## Inputs

- Tool scope and categories (Step 01)
- Tool schemas and permissions (Step 02)
- Tool registration design (Step 03)
- Tool execution design (Step 04)
- Pattern registry references

---

## YOUR TASK:

Compile the comprehensive tool contract design document.

---

## Main Sequence

### 1. Verify Prior Step Completion

Confirm all design steps are complete:

| Step | Title | Status | Key Outputs |
|------|-------|--------|-------------|
| 01 | Initialize Tool Contract Design | {{status}} | Scope, categories |
| 02 | Design Tool Schemas | {{status}} | Input/output schemas |
| 03 | Design Tool Registration | {{status}} | Registry, versioning |
| 04 | Design Tool Execution | {{status}} | Sandbox, limits |

If any step is incomplete, inform user and halt compilation.

### 2. Compile Document Sections

Generate the tool contract design document with sections:

#### 2.1 Executive Summary

```markdown
## Tool Contract Design Summary

**Project:** {{project_name}}
**Date:** {{date}}
**Author:** AI Runtime Architect (Nova)
**AI Runtime:** {{ai_runtime}}

### Scope
- Tools Defined: {{count}}
- Tool Categories: {{count}}
- Modules with Tools: {{count}}
- Agents Consuming Tools: {{count}}

### Key Decisions
1. TenantContext injection as first parameter
2. Capability-based access control
3. Sandboxed execution environment
4. Tiered resource limits
```

#### 2.2 Tool Catalog

Compile complete tool listing:

| Tool ID | Name | Category | Module | Version | Status |
|---------|------|----------|--------|---------|--------|
| {{id}} | {{name}} | {{cat}} | {{mod}} | {{ver}} | Active |

#### 2.3 TenantContext Specification

Document the tenant context contract:

```markdown
## TenantContext Contract

All tools MUST accept TenantContext as their first parameter.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| tenant_id | string | YES | Unique tenant identifier |
| user_id | string | YES | Acting user |
| permissions | string[] | YES | Granted permissions |
| tier | string | YES | Tenant tier |
| quotas | object | YES | Remaining quotas |
| trace_id | string | YES | Request correlation |
```

#### 2.4 Tool Schemas

Include all tool input/output schemas:

```markdown
## Tool Schemas

### query_database
**Category:** Data Access
**Module:** {{module}}

**Input Schema:**
- tenant_context: TenantContext (required)
- query: string (required, maxLength: 10000)
- params: object (optional)

**Output Schema:**
- success: boolean
- data: array (query results)
- metadata: object (pagination, timing)

**Permissions:** data:read
**Rate Limits:** Free: 100/min, Pro: 1000/min, Enterprise: 10000/min
```

#### 2.5 Permission Matrix

Compile permission requirements:

| Tool | Required Permissions | Tier Access |
|------|---------------------|-------------|
| {{tool}} | {{permissions}} | {{tiers}} |

#### 2.6 Rate Limiting Configuration

Document rate limits:

| Tool | Free | Pro | Enterprise | Window |
|------|------|-----|------------|--------|
| {{tool}} | {{limit}} | {{limit}} | {{limit}} | 1 min |

#### 2.7 Registry Architecture

Include registry design:

```markdown
## Tool Registry

### Architecture
- Global Registry: All available tools
- Tenant Registry: Enabled tools per tenant
- Session Registry: Active tools per session

### Versioning
- Strategy: Semantic versioning (MAJOR.MINOR.PATCH)
- Selection: Pinned or range-based
- Deprecation: 90-day sunset policy
```

#### 2.8 Execution Environment

Document sandbox and limits:

```markdown
## Execution Environment

### Sandbox Layers
1. Process isolation (container/lambda)
2. Memory isolation
3. Network policy enforcement
4. Storage isolation (tenant prefix)
5. Secret isolation (tenant vault)

### Resource Limits by Tier
| Resource | Free | Pro | Enterprise |
|----------|------|-----|------------|
| Memory | 256 MB | 1 GB | 4 GB |
| CPU Time | 10s | 60s | 300s |
| File Size | 10 MB | 100 MB | 1 GB |
```

#### 2.9 Error Response Specification

Document error handling:

```markdown
## Error Responses

### Error Codes
| Code | HTTP | Retryable | Description |
|------|------|-----------|-------------|
| VALIDATION_ERROR | 400 | No | Invalid input |
| PERMISSION_DENIED | 403 | No | Access denied |
| RATE_LIMITED | 429 | Yes | Quota exceeded |
| TIMEOUT_ERROR | 408 | Yes | Execution timeout |
```

#### 2.10 Monitoring and Tracing

Document observability:

```markdown
## Monitoring

### Metrics
- tool_execution_duration (histogram)
- tool_execution_errors (counter)
- tool_resource_usage (gauge)
- tool_rate_limit_hits (counter)

### Trace Context
- trace_id, span_id, parent_span_id
- tenant_id, tool_id
```

### 3. Generate Output Artifact

Write the compiled document to:

```
{output_folder}/planning-artifacts/tool-contracts-design.md
```

### 4. Create Verification Checklist

Generate checklist for QG-M3 validation:

| Category | Check | Status |
|----------|-------|--------|
| Schema | All tools have input schemas | [ ] |
| Schema | All tools have output schemas | [ ] |
| TenantContext | All tools require TenantContext | [ ] |
| Permissions | All tools have permission mapping | [ ] |
| Rate Limits | All tools have rate limits defined | [ ] |
| Sandbox | Execution isolation documented | [ ] |
| Errors | Standard error responses defined | [ ] |
| Monitoring | Metrics and tracing specified | [ ] |

### 5. Web Research Final Verification

**Final verification of patterns:**

Search the web: "AI agent tool contract patterns {date}"
Search the web: "tool schema versioning best practices {date}"

_Source: [Document findings with URLs]_

---

## COLLABORATION MENUS (A/P/C):

After compiling the tool contract design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific contract sections
- **P (Party Mode)**: Final review with architect perspectives
- **C (Continue)**: Finalize and output the design document
- **[Specific section]**: Describe section to review in detail

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: complete tool contract design
- Process enhanced insights on contract completeness
- Ask user: "Accept these enhancements? (y/n)"
- If yes, integrate into document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Final review of tool contract design: {summary}"
- Process Nova (AI Runtime), Atlas (Platform), Kai (Integration) perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Write tool contract design to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Present completion summary

---

## SUCCESS METRICS:

- [ ] All prior steps verified complete
- [ ] Document includes all required sections
- [ ] Tool catalog complete
- [ ] Verification checklist generated
- [ ] Output artifact written successfully

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Missing step output | Return to incomplete step |
| Template not found | Use inline template |
| Write permission error | Check output folder |
| Incomplete tool list | Reconcile with Step 01 |

---

## Verification

- [ ] All design decisions from Steps 01-04 included
- [ ] Document structure follows template
- [ ] Tool catalog matches identified tools
- [ ] Permissions and limits consistent
- [ ] Patterns align with pattern registry

---

## Outputs

- **Primary:** `{output_folder}/planning-artifacts/tool-contracts-design.md`
- Verification checklist for QG-M3
- Tool catalog summary
- Permission matrix

---

## NEXT STEP:

Workflow complete for Create mode.

**Recommended next steps:**
1. Run Validate mode (`step-20-v-load.md`) to verify against QG-M3
2. Share tool contract design with development team
3. Proceed to implementation of tool registry and execution

If modifications needed later, use Edit mode (`step-10-e-load.md`).
