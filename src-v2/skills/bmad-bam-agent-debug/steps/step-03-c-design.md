# Step 3: Identify Failure Modes

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Identify specific failure modes based on trace analysis, including prompt injection, hallucination, tool failures, and context overflow issues.

---

## Prerequisites

- Step 2 completed: Trace analysis finished
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-safety`

**Web Research (Required):**

Search the web: "LLM agent failure modes classification {date}"
Search the web: "prompt injection detection techniques {date}"
Search the web: "AI hallucination detection patterns {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Detect Prompt Injection Patterns

Analyze for prompt injection indicators:

| Indicator | Present | Evidence | Severity |
|-----------|---------|----------|----------|
| System prompt override attempt | YES/NO | {evidence} | Critical |
| Role confusion injection | YES/NO | {evidence} | High |
| Tool invocation manipulation | YES/NO | {evidence} | High |
| Output format hijacking | YES/NO | {evidence} | Medium |
| Delimiter escape attempt | YES/NO | {evidence} | Medium |

**Injection Pattern Analysis:**

| Input Source | Suspicious Content | Risk Level |
|--------------|-------------------|------------|
| User message | {content_snippet} | {level} |
| Tool output | {content_snippet} | {level} |
| Retrieved context | {content_snippet} | {level} |
| Memory content | {content_snippet} | {level} |

### 2. Identify Hallucination Patterns

Analyze for hallucination indicators:

| Type | Detected | Evidence | Impact |
|------|----------|----------|--------|
| Factual invention | YES/NO | {evidence} | {impact} |
| Tool capability hallucination | YES/NO | {evidence} | {impact} |
| Non-existent API calls | YES/NO | {evidence} | {impact} |
| Fabricated conversation history | YES/NO | {evidence} | {impact} |
| Incorrect tenant data | YES/NO | {evidence} | {impact} |

**Hallucination Root Cause:**

| Cause | Likelihood | Mitigation |
|-------|------------|------------|
| Insufficient context | High/Med/Low | {mitigation} |
| Conflicting instructions | High/Med/Low | {mitigation} |
| Model capability gap | High/Med/Low | {mitigation} |
| Temperature too high | High/Med/Low | {mitigation} |

### 3. Analyze Tool Execution Failures

Document tool-related failures:

| Tool | Failure Type | Error Message | Frequency |
|------|--------------|---------------|-----------|
| {tool_1} | {type} | {message} | {count} |
| {tool_2} | {type} | {message} | {count} |

**Tool Failure Categories:**

| Category | Description | Tools Affected |
|----------|-------------|----------------|
| Input validation | Invalid parameters passed | {tools} |
| Permission denied | Authorization failure | {tools} |
| Timeout | Execution exceeded limits | {tools} |
| Rate limited | API quota exceeded | {tools} |
| Schema mismatch | Response format invalid | {tools} |
| External service | Third-party API failure | {tools} |

### 4. Assess Context Overflow Issues

Analyze context window usage:

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| Total context tokens | {tokens} | {limit} | OK/WARNING/EXCEEDED |
| System prompt size | {tokens} | {recommended} | OK/WARNING |
| Retrieved documents | {tokens} | {budget} | OK/WARNING |
| Conversation history | {tokens} | {budget} | OK/WARNING |
| Tool responses | {tokens} | {budget} | OK/WARNING |

**Context Overflow Consequences:**

| Consequence | Observed | Evidence |
|-------------|----------|----------|
| Instruction truncation | YES/NO | {evidence} |
| Memory loss | YES/NO | {evidence} |
| Degraded performance | YES/NO | {evidence} |
| Response truncation | YES/NO | {evidence} |

### 5. Identify Tenant Isolation Issues

Check for multi-tenant concerns:

| Issue | Detected | Evidence | Severity |
|-------|----------|----------|----------|
| Cross-tenant data leak | YES/NO | {evidence} | Critical |
| Wrong tenant context | YES/NO | {evidence} | Critical |
| Shared memory pollution | YES/NO | {evidence} | High |
| RLS bypass | YES/NO | {evidence} | Critical |
| Rate limit sharing | YES/NO | {evidence} | Medium |

---

## COLLABORATION MENUS (A/P/C):

After completing failure mode identification, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific failure modes
- **P (Party Mode)**: Bring security and reliability perspectives
- **C (Continue)**: Proceed to remediation design
- **[Specific failure]**: Examine a particular failure mode in detail

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: failure modes identified, severity assessment
- Process enhanced insights on root causes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review identified agent failure modes for remediation planning"
- Present synthesized recommendations from security/reliability perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Document all identified failure modes
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Prompt injection patterns analyzed
- [ ] Hallucination indicators identified
- [ ] Tool execution failures documented
- [ ] Context overflow assessed
- [ ] Tenant isolation verified
- [ ] Severity levels assigned to all findings
- [ ] Patterns align with pattern registry

---

## Outputs

- Prompt injection analysis with evidence
- Hallucination pattern detection results
- Tool failure catalog with error details
- Context overflow assessment
- Tenant isolation verification results
- Prioritized failure mode list by severity

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-04-c-document.md` to design remediation strategies.
