# Step 5: Run Contract Tests

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


## Purpose

Execute contract tests to verify tool behavior matches specification.

## Prerequisites

- Tenant context validated (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: testing-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: run-contracts`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-tools.md`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract testing API integration patterns {date}"
Search the web: "tool contract testing design {date}"

_Source: [URL]_

1. **Generate Contract Test Cases**
   Based on tool definition:
   - Valid input scenarios
   - Invalid input rejection
   - Boundary conditions
   - Error handling scenarios
   - Tenant isolation scenarios

2. **Run Schema Compliance Tests**
   - Input validation works as specified
   - Output matches declared schema
   - Error responses follow format
   - Optional parameters handled correctly

3. **Run Permission Tests**
   - Tool rejects calls without required permissions
   - Permission errors are clear and actionable
   - Approval workflow triggers correctly
   - Sandbox restrictions enforced

4. **Run Tenant Isolation Tests**
   - Tool only returns tenant-specific data
   - Cross-tenant access attempts fail
   - Tenant context propagates correctly
   - Concurrent tenant requests are isolated

5. **Run Integration Tests**
   - Tool integrates with agent runtime correctly
   - Tool appears in registry as expected
   - Tool description works well with LLM
   - Tool responses are parseable by agent

6. **Document Test Results**
   - Record all test executions
   - Note any failures with details
   - Document edge cases discovered
   - Record performance observations

#### Checkpoint: Contract Tests Complete

Before proceeding, confirm:
- [ ] Test cases generated and executed
- [ ] Schema compliance tests run
- [ ] Permission tests run
- [ ] Tenant isolation tests run
- [ ] Integration tests run
- [ ] Results documented

**STOP: Present the A/P/C menu to the user**

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

---

## Output

Write validation report to:
`{output_folder}/planning-artifacts/ai-runtime/tool-validation-{tool-name}.md`

Include:
- Schema validation results
- Permission validation results
- Tenant context validation results
- Contract test results (passed/failed/skipped)
- Overall validation status (PASS/CONDITIONAL/FAIL)
- Recommendations for improvement

## Verification

- [ ] Contract test cases generated
- [ ] Schema compliance tests passed
- [ ] Permission tests passed
- [ ] Tenant isolation tests passed
- [ ] Integration tests passed
- [ ] Test results documented
- [ ] Patterns align with pattern registry

## Outputs

- Tool validation report
- Contract test results
- **Load template:** `{project-root}/_bmad/bam/data/templates/tool-definition-template.md`

## Next Step

On PASS: Tool contract validated. Proceed with agent runtime integration.
