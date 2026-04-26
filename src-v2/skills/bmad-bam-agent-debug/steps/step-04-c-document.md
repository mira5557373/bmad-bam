# Step 4: Design Remediation

## MANDATORY EXECUTION RULES (READ FIRST):

- :stop_sign: NEVER generate content without user input
- :open_book: CRITICAL: ALWAYS read the complete step file before taking any action
- :arrows_counterclockwise: CRITICAL: When loading next step with 'C', ensure entire file is read
- :pause_button: ALWAYS pause after presenting findings and await user direction
- :dart: Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- :dart: Show your analysis before taking any action
- :floppy_disk: Update document frontmatter after each section completion
- :memo: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

Design comprehensive remediation strategies including prompt engineering fixes, tool configuration adjustments, guard rail implementation, and fallback behavior design.

---

## Prerequisites

- Step 3 completed: Failure modes identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-safety`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `agent-guardrails`

**Web Research (Required):**

Search the web: "LLM agent safety guardrails implementation {date}"
Search the web: "prompt engineering defensive patterns {date}"
Search the web: "AI agent fallback handling best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Design Prompt Engineering Fixes

Address prompt-related issues:

| Issue | Current State | Proposed Fix | Implementation |
|-------|---------------|--------------|----------------|
| Weak system prompt | {current} | {proposed} | {approach} |
| Missing constraints | {current} | {proposed} | {approach} |
| Ambiguous instructions | {current} | {proposed} | {approach} |
| Role confusion | {current} | {proposed} | {approach} |

**Prompt Structure Improvements:**

| Section | Current | Proposed | Rationale |
|---------|---------|----------|-----------|
| Role definition | {current} | {proposed} | {why} |
| Constraints | {current} | {proposed} | {why} |
| Output format | {current} | {proposed} | {why} |
| Error handling | {current} | {proposed} | {why} |
| Tool usage rules | {current} | {proposed} | {why} |

### 2. Design Tool Configuration Adjustments

Fix tool-related issues:

| Tool | Issue | Configuration Change | Expected Outcome |
|------|-------|---------------------|------------------|
| {tool_1} | {issue} | {change} | {outcome} |
| {tool_2} | {issue} | {change} | {outcome} |
| {tool_3} | {issue} | {change} | {outcome} |

**Tool Schema Updates:**

| Tool | Schema Field | Current | Proposed | Reason |
|------|--------------|---------|----------|--------|
| {tool} | {field} | {current} | {proposed} | {reason} |

**Tool Timeout/Retry Configuration:**

| Tool | Current Timeout | Proposed Timeout | Retry Policy |
|------|-----------------|------------------|--------------|
| {tool_1} | {current} | {proposed} | {policy} |
| {tool_2} | {current} | {proposed} | {policy} |

### 3. Implement Guard Rails

Design protective measures:

| Guard Rail Type | Trigger Condition | Action | Severity |
|-----------------|-------------------|--------|----------|
| Input validation | {condition} | {action} | {level} |
| Output filtering | {condition} | {action} | {level} |
| Token budget | {condition} | {action} | {level} |
| Rate limiting | {condition} | {action} | {level} |
| Content moderation | {condition} | {action} | {level} |

**Injection Prevention:**

| Attack Vector | Detection Method | Mitigation |
|---------------|------------------|------------|
| System prompt override | {method} | {mitigation} |
| Tool manipulation | {method} | {mitigation} |
| Output hijacking | {method} | {mitigation} |
| Delimiter injection | {method} | {mitigation} |

**Hallucination Prevention:**

| Technique | Implementation | Expected Reduction |
|-----------|----------------|-------------------|
| Grounding | {implementation} | {percentage} |
| Citation requirement | {implementation} | {percentage} |
| Confidence thresholds | {implementation} | {percentage} |
| Verification steps | {implementation} | {percentage} |

### 4. Design Fallback Behavior

Define graceful degradation:

| Failure Scenario | Fallback Behavior | User Communication |
|------------------|-------------------|-------------------|
| Tool unavailable | {behavior} | {message} |
| Token budget exceeded | {behavior} | {message} |
| Model timeout | {behavior} | {message} |
| Rate limited | {behavior} | {message} |
| Confidence too low | {behavior} | {message} |
| External API failure | {behavior} | {message} |

**Escalation Path:**

| Escalation Level | Condition | Action | Notification |
|------------------|-----------|--------|--------------|
| L1 - Retry | Transient failure | Auto-retry with backoff | None |
| L2 - Degrade | Repeated failure | Reduced functionality | User info |
| L3 - Human | Critical failure | Human handoff | Agent + User |
| L4 - Block | Security concern | Block action | Security team |

### 5. Design Monitoring Improvements

Enhance observability:

| Metric | Current | Proposed | Alert Threshold |
|--------|---------|----------|-----------------|
| Error rate | {current} | {proposed} | {threshold} |
| Latency p99 | {current} | {proposed} | {threshold} |
| Token usage | {current} | {proposed} | {threshold} |
| Hallucination rate | {current} | {proposed} | {threshold} |
| Injection attempts | {current} | {proposed} | {threshold} |

---

## COLLABORATION MENUS (A/P/C):

After completing remediation design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific remediation strategies
- **P (Party Mode)**: Bring implementation and security perspectives
- **C (Continue)**: Proceed to compile debug report
- **[Specific fix]**: Examine a particular remediation in detail

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: remediation designs, implementation complexity
- Process enhanced insights on implementation approach
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review remediation designs for agent debugging"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Document all remediation designs
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## Verification

- [ ] Prompt engineering fixes designed
- [ ] Tool configuration adjustments specified
- [ ] Guard rails defined with trigger conditions
- [ ] Fallback behaviors documented
- [ ] Monitoring improvements planned
- [ ] All remediations mapped to failure modes
- [ ] Patterns align with pattern registry

---

## Outputs

- Prompt engineering improvement specifications
- Tool configuration change proposals
- Guard rail implementation design
- Fallback behavior specifications
- Monitoring enhancement plan
- Implementation priority matrix

---

## Next Step

Proceed to `step-05-c-complete.md` to compile the debug report.
