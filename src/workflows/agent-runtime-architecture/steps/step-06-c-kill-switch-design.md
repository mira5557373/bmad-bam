# Step 6: Kill Switch Design

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

Design rapid shutdown mechanisms to immediately halt agent operations when safety, cost, or operational issues arise.

---

## Prerequisites

- Evaluation foundation complete (Step 5)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Integrate Feature Flag System

- GrowthBook + OpenFeature for flag management
- Per-agent enable/disable flags
- Per-tenant agent availability flags
- Gradual rollout percentages for new agents

### 2. Configure Circuit Breakers

- Per-agent circuit breaker thresholds
- Per-tool circuit breaker configuration
- Failure rate triggers (e.g., 5 failures in 1 minute)
- Recovery probe configuration (test before re-enabling)

### 3. Design Manual Override Mechanisms

- Ops dashboard for immediate agent shutdown
- API endpoints for programmatic control
- Audit logging of all override actions
- Required confirmation for tenant-wide shutdowns

### 4. Document Rollback Procedures

- Fall back to simpler agent topology
- Disable specific tools while keeping agent active
- Complete agent disable with graceful in-flight handling
- Data preservation during emergency shutdown

**Verify current best practices with web search:**
Search the web: "AI agent kill switch AI agent patterns {date}"
Search the web: "AI agent kill switch LLM orchestration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the kill switch design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into circuit breaker thresholds or rollback procedures
- **P (Party Mode)**: Bring SRE and security perspectives on kill switch design
- **C (Continue)**: Accept kill switch design and complete Create mode
- **[Specific refinements]**: Describe safety mechanism concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: feature flags, circuit breakers, rollback procedures
- Process enhanced insights on operational safety
- Ask user: "Accept these refined kill switch decisions? (y/n)"
- If yes, integrate into kill switch specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review kill switch and safety mechanisms for multi-tenant AI platform"
- Process SRE and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save kill switch design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Submit agent runtime architecture for validation via `bmad-bam-validate-module`

---

## Verification

- [ ] Feature flag system integrated
- [ ] Circuit breakers configured
- [ ] Manual override mechanisms designed
- [ ] Rollback procedures documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Feature flag configuration schema
- Circuit breaker threshold definitions
- Ops runbook for emergency procedures
- Rollback playbook with decision tree
- **Load template:** `{project-root}/_bmad/bam/templates/agent-runtime-architecture-template.md`

---

## Next Step

Submit agent runtime architecture for validation via `bmad-bam-validate-module`.
