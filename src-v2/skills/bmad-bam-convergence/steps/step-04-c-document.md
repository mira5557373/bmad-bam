# Step 04: Verify Agent Safety Across Boundaries

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🚦 **HALT on CRITICAL failure** - Document and enter recovery protocol

## EXECUTION PROTOCOLS

- 🎯 Focus: Verify agent safety across module boundaries (QG-I3)
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Agent tenant isolation, tool boundaries, memory isolation
- 🚫 Do NOT: Make final gate decisions (that's Step 05)
- 🔍 Use web search: Verify agent safety patterns against current best practices
- ⚠️ Gate: QG-I3 - CRITICAL checks must pass for agent safety

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Verifying agent tenant isolation
- Checking tool execution boundaries
- Validating memory isolation between tenants
- Confirming output sanitization

**OUT OF SCOPE:**
- Tenant isolation verification (Step 03)
- Final convergence report (Step 05)
- Cross-module integration analysis (Step 02)

---

## Purpose

Verify agent safety across all module boundaries. This step validates that AI agents operate within tenant boundaries, tool registries respect tenant scopes, and agent memory is properly isolated. This addresses QG-I3 (Agent Safety) requirements.

---

## Prerequisites

- Step 03 completed: Tenant isolation verified
- AI runtime configuration defined in master architecture
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-safety
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3.md`

---

## Inputs

- AI runtime configuration from master architecture
- Agent definitions across modules
- Tool registries with tenant scoping
- Memory tier configurations
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Verify agent safety across all module boundaries against QG-I3 criteria.

---

## Main Sequence

### 1. Agent Tenant Isolation Verification

#### 1.1 Agent Context Scope

For each agent definition:

| Agent | Module | TenantContext | Scope Enforcement | Status |
|-------|--------|---------------|-------------------|--------|
| {{agent}} | {{module}} | Required | Always/Conditional | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** All agents receive TenantContext on invocation
- [ ] **CRITICAL:** Agent operations scoped to invoking tenant
- [ ] **CRITICAL:** Agent cannot access cross-tenant data

#### 1.2 Cross-Tenant Agent Test

| Test Scenario | Expected | Actual | Status |
|---------------|----------|--------|--------|
| Agent queries other tenant data | Blocked | {{actual}} | PASS/FAIL |
| Agent calls tool for other tenant | Blocked | {{actual}} | PASS/FAIL |
| Agent retrieves other tenant memory | Empty | {{actual}} | PASS/FAIL |

### 2. Tool Execution Boundary Verification

#### 2.1 Tool Registry Tenant Scoping

For each tool in the registry:

| Tool | Module | Tenant Scoped | Permission Check | Status |
|------|--------|---------------|------------------|--------|
| {{tool}} | {{module}} | YES/NO | Always/Missing | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Tool registry respects tenant boundaries
- [ ] **CRITICAL:** Tool execution validates tenant context
- [ ] **CRITICAL:** Tool results scoped to requesting tenant

#### 2.2 Tool Permission Matrix

| Tool Category | Tenant Read | Tenant Write | Cross-Tenant | Status |
|---------------|-------------|--------------|--------------|--------|
| Data Query | Scoped | Scoped | Blocked | PASS/FAIL |
| File Access | Scoped | Scoped | Blocked | PASS/FAIL |
| External API | Rate Limited | Rate Limited | N/A | PASS/FAIL |

#### 2.3 Dangerous Tool Restrictions

| Tool | Risk Level | Tenant Admin Only | Audit Logged | Status |
|------|------------|-------------------|--------------|--------|
| {{tool}} | HIGH | YES/NO | YES/NO | PASS/FAIL |

**Criteria:**
- [ ] High-risk tools require tenant admin approval
- [ ] Tool invocations audit logged with tenant context
- [ ] Tool failures do not leak cross-tenant information

### 3. Memory Isolation Verification

#### 3.1 Agent Memory Tiers

| Memory Tier | Scope | Tenant Key | Isolation | Status |
|-------------|-------|------------|-----------|--------|
| Short-term | Session | `tenant:{id}:session:{sid}` | Verified | PASS/FAIL |
| Working | Conversation | `tenant:{id}:conv:{cid}` | Verified | PASS/FAIL |
| Long-term | Tenant | `tenant:{id}:memory` | Verified | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Agent memory keys include tenant_id
- [ ] **CRITICAL:** Memory retrieval validates tenant ownership
- [ ] **CRITICAL:** No cross-tenant memory leakage

#### 3.2 Memory Cross-Tenant Test

| Test Scenario | Expected | Actual | Status |
|---------------|----------|--------|--------|
| Agent A reads Agent B tenant memory | Empty | {{actual}} | PASS/FAIL |
| Agent A writes to Agent B tenant memory | Blocked | {{actual}} | PASS/FAIL |
| Memory search returns cross-tenant results | Never | {{actual}} | PASS/FAIL |

#### 3.3 Memory Embedding Isolation

| Vector Store | Tenant Namespace | Filter Enforcement | Status |
|--------------|------------------|-------------------|--------|
| {{store}} | `tenant_{id}` | Query Filter | PASS/FAIL |

**Criteria:**
- [ ] Vector embeddings stored in tenant namespace
- [ ] Similarity search filtered by tenant_id
- [ ] No semantic leakage across tenants

### 4. Output Sanitization Verification

#### 4.1 Agent Response Sanitization

| Output Type | Sanitization | Tenant Context | Status |
|-------------|--------------|----------------|--------|
| Text Response | PII Filtered | Verified | PASS/FAIL |
| Structured Data | Schema Validated | Verified | PASS/FAIL |
| File Output | Path Validated | Verified | PASS/FAIL |

**CRITICAL Criteria:**
- [ ] **CRITICAL:** Agent outputs sanitized before delivery
- [ ] **CRITICAL:** No cross-tenant data in responses
- [ ] **CRITICAL:** Error messages do not leak tenant information

#### 4.2 Prompt Injection Protection

| Protection | Implemented | Tested | Status |
|------------|-------------|--------|--------|
| Input sanitization | YES/NO | PASS/FAIL | {{status}} |
| Output validation | YES/NO | PASS/FAIL | {{status}} |
| Jailbreak detection | YES/NO | PASS/FAIL | {{status}} |

### 5. Agent Resource Limits

#### 5.1 Token Limits Enforcement

| Tier | Input Limit | Output Limit | Enforced | Status |
|------|-------------|--------------|----------|--------|
| Free | 4K | 2K | YES/NO | PASS/FAIL |
| Pro | 16K | 8K | YES/NO | PASS/FAIL |
| Enterprise | 128K | 32K | YES/NO | PASS/FAIL |

**Standard Criteria:**
- [ ] Token limits enforced per tier
- [ ] Limit exceeded returns graceful error
- [ ] No cross-tenant token pool sharing

#### 5.2 Timeout Handling

| Agent Type | Timeout | Cleanup | Status |
|------------|---------|---------|--------|
| Sync | 30s | Immediate | PASS/FAIL |
| Async | 5min | Graceful | PASS/FAIL |
| Long-running | 30min | Checkpoint | PASS/FAIL |

**Standard Criteria:**
- [ ] Agent timeout handling tested
- [ ] Timeout cleanup releases tenant resources
- [ ] Partial results handled appropriately

### 6. Agent Observability

#### 6.1 Agent Tracing

| Trace Aspect | Tenant Scoped | Sampled | Status |
|--------------|---------------|---------|--------|
| Span Context | tenant_id attribute | YES | PASS/FAIL |
| LLM Calls | token usage by tenant | YES | PASS/FAIL |
| Tool Calls | tool name + tenant | YES | PASS/FAIL |

**Standard Criteria:**
- [ ] Agent tracing functional with tenant attribution
- [ ] Cost attribution accurate per tenant
- [ ] Agent versioning tracked in traces

---

## COLLABORATION MENUS (A/P/C):

After completing agent safety verification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific agent safety findings
- **P (Party Mode)**: Bring AI runtime and security perspectives
- **C (Continue)**: Accept verification and proceed to convergence report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: agent safety findings, tool boundary issues, memory isolation gaps
- Process enhanced insights on agent safety patterns
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into verification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review agent safety verification for QG-I3: {summary}"
- Process AI Runtime Architect (Nova) and Security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document agent safety verification results
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## SUCCESS METRICS:

- [ ] All CRITICAL agent safety checks pass
- [ ] Tool execution boundaries verified
- [ ] Memory isolation confirmed
- [ ] Output sanitization functional
- [ ] Agent resource limits enforced

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Agent missing TenantContext | Update agent invocation to require TenantContext |
| Tool bypasses tenant check | Add tenant validation to tool execution |
| Memory key missing tenant | Refactor memory key pattern |
| Output leaks cross-tenant data | Implement output sanitization |

---

## Verification

- [ ] Agent tenant isolation verified
- [ ] Tool execution boundaries enforced
- [ ] Memory isolation confirmed
- [ ] Output sanitization functional
- [ ] Patterns align with pattern registry

---

## Outputs

- Agent safety verification matrix
- Tool boundary test results
- Memory isolation findings
- Output sanitization status
- QG-I3 preliminary assessment

---

## NEXT STEP:

Proceed to `step-05-c-complete.md` to compile the convergence report and make QG-I2/QG-I3 gate decisions.
