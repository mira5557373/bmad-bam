# Step 3: Identify Failure Point

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Pinpoint the exact location and cause of the agent failure.

---

## Prerequisites

- State history analyzed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,observability

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Correlate Anomalies

Correlate anomalies from state analysis with specific execution steps.

### 2. Classify Failure Type

| Type | Description | Indicators |
|------|-------------|------------|
| **Tool failure** | Tool returned error or unexpected result | Error codes, timeout |
| **Prompt failure** | Agent misinterpreted instructions or context | Wrong actions taken |
| **Memory failure** | Incorrect or missing context from memory tiers | Stale data, missing history |
| **Integration failure** | External service unavailable or returned error | HTTP errors, timeouts |
| **Safety trigger** | Guardrail or kill switch activated | Blocked responses |
| **Resource limit** | Token, time, or cost limit exceeded | Truncation, timeouts |

### 3. Identify Root Cause

- Distinguish root cause vs. symptoms
- Check if failure is reproducible
- Document evidence from logs and traces

### 4. Failure Classification

| Attribute | Assessment |
|-----------|------------|
| Severity | Critical / High / Medium / Low |
| Scope | Single execution / Pattern across executions |
| Tenant impact | Single tenant / Multi-tenant / Platform-wide |

**Verify current best practices with web search:**
Search the web: "AI agent failure analysis AI agent patterns {date}"
Search the web: "AI agent failure analysis LLM orchestration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After identifying failure point, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into root cause analysis or reproducibility
- **P (Party Mode)**: Bring SRE and AI architect perspectives on failure analysis
- **C (Continue)**: Accept failure identification and proceed to recommendations
- **[Specific refinements]**: Describe additional investigation needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: failure type, root cause hypothesis, evidence
- Process enhanced insights on failure patterns
- Ask user: "Accept this root cause analysis? (y/n)"
- If yes, integrate into failure classification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent failure identification and root cause analysis"
- Process SRE and AI architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save failure classification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-recommend-fix.md`

---

## Verification

- [ ] Failure type classified
- [ ] Root cause identified
- [ ] Severity assessed
- [ ] Scope determined
- [ ] Reproducibility checked
- [ ] Patterns align with pattern registry

---

## Outputs

- Failure classification document
- Root cause analysis

---

## Next Step

Proceed to `step-04-c-recommend-fix.md` to propose remediation.
