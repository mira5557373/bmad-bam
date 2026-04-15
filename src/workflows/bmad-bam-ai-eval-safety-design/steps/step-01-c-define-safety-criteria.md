# Step 1: Define Safety Criteria

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

Establish the safety requirements and evaluation criteria for the AI system.

## Prerequisites

- Agent runtime architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety, agent-runtime
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime


---

## Inputs

- User requirements and constraints for ai eval safety design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Establish the safety requirements and evaluation criteria for the AI system:

## Safety Dimensions

Define criteria for each safety dimension:

**Content Safety:**
- Harmful content generation (violence, hate speech, illegal activity)
- PII exposure and data leakage
- Misinformation and hallucination thresholds
- Inappropriate content for context

**Behavioral Safety:**
- Action scope boundaries (what agents can/cannot do)
- Resource consumption limits (tokens, API calls, cost)
- Execution time bounds
- Escalation and approval requirements

**System Safety:**
- Tenant isolation enforcement
- Authentication and authorization checks
- Rate limiting and abuse prevention
- Kill switch activation criteria

**Operational Safety:**
- Graceful degradation requirements
- Fallback behavior specifications
- Recovery procedures
- Audit and compliance requirements

## Tier-Specific Criteria

For each tenant tier, specify:
- Safety threshold values
- Acceptable risk levels
- Monitoring sensitivity
- Response time requirements

Output: Safety criteria document with measurable thresholds for each dimension.

**Verify current best practices with web search:**
Search the web: "AI safety criteria AI agent patterns {date}"
Search the web: "AI safety criteria LLM orchestration {date}"

_Source: [URL]_

## COLLABORATION MENUS (A/P/C):

After completing the safety criteria definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into safety dimension requirements and thresholds
- **P (Party Mode)**: Bring Security Architect, Compliance Officer, and AI Safety Expert perspectives
- **C (Continue)**: Accept safety criteria and proceed to Step 2: Design Golden Tasks
- **Refine thresholds**: Describe specific threshold or criteria concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: safety dimensions, tier requirements, compliance needs
- Process enhanced insights
- Ask user: "Accept these refined safety criteria? (y/n)"
- If yes, integrate into safety criteria document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review safety criteria for AI system covering content, behavioral, system, and operational safety"
- Process Security Architect, Compliance Officer, AI Safety Expert perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save safety criteria to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-golden-tasks.md`

---

## Verification

- [ ] Content safety criteria defined
- [ ] Behavioral safety specified
- [ ] System safety requirements documented
- [ ] Operational safety criteria established
- [ ] Tier-specific criteria specified
- [ ] Patterns align with pattern registry

## Outputs

- Safety criteria document
- Measurable thresholds
- **Load template:** `{project-root}/_bmad/bam/data/templates/bias-assessment-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/evaluation-criteria-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-ethics-review-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-eval-safety-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-safety-spec-template.md`

## Next Step

Proceed to `step-02-c-design-golden-tasks.md` to create evaluation tasks.
