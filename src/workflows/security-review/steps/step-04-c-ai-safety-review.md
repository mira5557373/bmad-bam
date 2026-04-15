# Step 4: AI Safety Review

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

Perform a security review of AI agent systems, evaluating prompt injection defenses, tool permission controls, approval workflows, and kill switch mechanisms.

---

## Prerequisites

- Step 3 completed: Tenant isolation review
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety
- **Load patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Review Prompt Injection Defenses

Evaluate defenses against prompt manipulation:

| Defense | Implemented | Effectiveness | Gap |
|---------|-------------|---------------|-----|
| Input sanitization | Yes/No | Strong/Weak | {gap} |
| System prompt hardening | Yes/No | Strong/Weak | {gap} |
| Output validation | Yes/No | Strong/Weak | {gap} |
| NeMo Guardrails | Yes/No | Strong/Weak | {gap} |
| Prompt templates (no user in system) | Yes/No | Strong/Weak | {gap} |

### 2. Review Tool Permission Model

Evaluate AI tool permission security:

| Check | Status | Finding |
|-------|--------|---------|
| Tools require explicit permission | Pass/Fail | {details} |
| Permissions are tenant-scoped | Pass/Fail | {details} |
| Sensitive tools require approval | Pass/Fail | {details} |
| Permission escalation prevention | Pass/Fail | {details} |
| Tool sandboxing (E2B) for untrusted | Pass/Fail | {details} |

### 3. Review Approval Workflow Security

Evaluate approval workflow integrity:

| Check | Status | Finding |
|-------|--------|---------|
| Risk assessment criteria defined | Pass/Fail | {details} |
| Approval queue per tenant | Pass/Fail | {details} |
| Timeout handling secure | Pass/Fail | {details} |
| Approval cannot be bypassed | Pass/Fail | {details} |
| Audit trail for approvals | Pass/Fail | {details} |

### 4. Review Kill Switch Mechanisms

Evaluate agent termination controls:

| Check | Status | Finding |
|-------|--------|---------|
| Feature flags for agent disable | Pass/Fail | {details} |
| Circuit breakers per agent | Pass/Fail | {details} |
| Manual override available | Pass/Fail | {details} |
| Graceful degradation defined | Pass/Fail | {details} |
| Rollback procedure documented | Pass/Fail | {details} |

### 5. Review AI Memory Security

Evaluate AI memory tenant isolation:

| Memory Tier | Isolation Check | Risk |
|-------------|-----------------|------|
| Session memory | Per-session isolation | {risk} |
| User memory | Per-user isolation | {risk} |
| Tenant memory | Per-tenant isolation | {risk} |
| Global memory | No sensitive data | {risk} |
| Episodic memory | Tenant-scoped events | {risk} |

### 6. Review AI Output Safety

Evaluate AI output handling:

| Check | Status | Finding |
|-------|--------|---------|
| PII detection in outputs | Pass/Fail | {details} |
| Cross-tenant data in responses | Pass/Fail | {details} |
| Sensitive data masking | Pass/Fail | {details} |
| Output length limits | Pass/Fail | {details} |
| Content moderation | Pass/Fail | {details} |

**Verify current best practices with web search:**
Search the web: "ai safety review best practices {date}"
Search the web: "ai safety review enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the AI safety review above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific AI safety concerns
- **P (Party Mode)**: Bring AI engineer and security perspectives on AI safety
- **C (Continue)**: Accept AI safety review and proceed to findings generation
- **[Specific refinements]**: Describe AI safety concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: prompt injection defenses, tool permissions, kill switches
- Process enhanced insights on AI safety completeness
- Ask user: "Accept these refined AI safety findings? (y/n)"
- If yes, integrate into AI safety review
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent safety for multi-tenant platform"
- Process AI engineer and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save AI safety review to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-generate-findings.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the AI safety assessment phase.**

Present summary of:
- Prompt injection defense evaluation with gap analysis
- Tool permission model findings and security status
- Kill switch mechanism assessment and coverage

Ask for confirmation before proceeding to findings generation.

---

## Verification

- [ ] Prompt injection defenses reviewed
- [ ] Tool permission model evaluated
- [ ] Approval workflow security verified
- [ ] Kill switch mechanisms evaluated
- [ ] AI memory isolation verified
- [ ] AI output safety reviewed
- [ ] Patterns align with pattern registry

---

## Outputs

- AI safety security report
- Prompt injection defense assessment
- Tool permission findings
- Kill switch evaluation

---

## Next Step

Proceed to `step-05-c-generate-findings.md` to generate consolidated findings.
