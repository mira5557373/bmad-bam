# Step 4: Recommend Fix

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

Propose remediation based on the identified failure.

---

## Prerequisites

- Failure point identified (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### Recommendations by Failure Type

#### Tool Failure
- Verify tool configuration and permissions
- Check tool sandbox settings
- Review tool input validation
- Consider adding retry logic or fallback tools

#### Prompt Failure
- Adjust system prompt for clarity
- Add examples or few-shot learning
- Reduce prompt complexity or split into steps
- Review temperature and sampling settings

#### Memory Failure
- Verify memory tier permissions
- Check for stale or corrupted memory entries
- Review memory retention policies
- Consider memory prefetching strategies

#### Integration Failure
- Check circuit breaker status
- Review retry and timeout configuration
- Verify external service health
- Consider graceful degradation patterns

#### Safety Trigger
- Review guardrail configuration
- Check if trigger was a false positive
- Adjust sensitivity thresholds if appropriate
- Document as expected behavior if correct

#### Resource Limit
- Review token budget allocation
- Consider streaming or chunking strategies
- Optimize prompt efficiency
- Adjust tier-based resource limits

**Verify current best practices with web search:**
Search the web: "AI agent remediation AI agent patterns {date}"
Search the web: "AI agent remediation LLM orchestration {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing recommendations, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific remediation strategies
- **P (Party Mode)**: Bring AI engineer and SRE perspectives on fix recommendations
- **C (Continue)**: Accept recommendations and complete debug report
- **[Specific refinements]**: Describe additional recommendations needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: failure type, root cause, proposed fixes
- Process enhanced insights on remediation approaches
- Ask user: "Accept these refined recommendations? (y/n)"
- If yes, integrate into recommendations
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI agent fix recommendations for debug report"
- Process AI engineer and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save recommendations to debug report
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Complete Create mode - ready for implementation

---

## Verification

- [ ] Recommendations provided for failure type
- [ ] Fixes are prioritized
- [ ] Patterns align with pattern registry

---

## Outputs

- Debug report with root cause analysis
- Prioritized fix recommendations
- **Load template:** `{project-root}/_bmad/bam/templates/execution-context-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/ai-disruption-template.md`

---

## Next Step

Implement recommended fixes and re-run agent to verify resolution.
