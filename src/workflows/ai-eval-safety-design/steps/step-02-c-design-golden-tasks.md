# Step 2: Design Golden Tasks

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

Create a comprehensive set of golden tasks for safety evaluation.

## Prerequisites

- Safety criteria defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: llmops


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Create a comprehensive set of golden tasks for safety evaluation:

## Golden Task Categories

**Positive Cases (Expected Success):**
- Standard workflow completion tasks
- Multi-step reasoning tasks
- Tool usage tasks within permissions
- Cross-module integration tasks

**Negative Cases (Expected Rejection/Handling):**
- Prompt injection attempts
- Jailbreak patterns
- Out-of-scope requests
- Unauthorized tool access attempts
- Cross-tenant data access attempts

**Edge Cases:**
- Ambiguous instructions
- Conflicting requirements
- Resource boundary conditions
- Concurrent execution scenarios

## Task Structure

For each golden task, define:
- Task ID and category
- Input prompt/context
- Expected behavior/output
- Evaluation criteria (pass/fail/partial)
- Tenant tier applicability
- Required tools and permissions

## Coverage Matrix

Ensure golden tasks cover:
- [ ] All safety dimensions from Step 1
- [ ] All agent types in the system
- [ ] All tenant tiers
- [ ] Common attack vectors (OWASP LLM Top 10)
- [ ] Business-critical workflows

Output: Golden task library with 50+ tasks across all categories.

**Verify current best practices with web search:**
Search the web: "golden test tasks AI agent patterns {date}"
Search the web: "golden test tasks LLM orchestration {date}"

_Source: [URL]_

## Soft Gate Checkpoint

**Steps 1-2 complete the safety requirements phase.**

Present summary of:
- Safety criteria across all dimensions (content, behavioral, system, operational)
- Golden task library with positive, negative, and edge cases

Ask for confirmation before proceeding to guardrails configuration.

---

## COLLABORATION MENUS (A/P/C):

After completing the golden task design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into golden task coverage and attack vector scenarios
- **P (Party Mode)**: Bring Red Team Specialist, QA Engineer, and Security Researcher perspectives
- **C (Continue)**: Accept golden task library and proceed to Step 3: Configure Guardrails
- **Expand coverage**: Describe specific attack vectors or scenarios to add

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: golden task categories, coverage matrix, OWASP vectors
- Process enhanced insights
- Ask user: "Accept these refined golden tasks? (y/n)"
- If yes, integrate into golden task library
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review golden task library for comprehensive safety evaluation coverage"
- Process Red Team Specialist, QA Engineer, Security Researcher perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save golden task library to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-guardrails.md`

---

## Verification

- [ ] Positive cases defined
- [ ] Negative cases defined
- [ ] Edge cases covered
- [ ] Task structure complete
- [ ] Coverage matrix complete
- [ ] Patterns align with pattern registry

## Outputs

- Golden task library (50+ tasks)
- Coverage matrix
- **Load template:** `{project-root}/_bmad/bam/templates/golden-task-template.md`

## Next Step

Proceed to `step-03-c-configure-guardrails.md` to design runtime safety controls.
