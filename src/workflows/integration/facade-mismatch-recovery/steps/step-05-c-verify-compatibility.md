# Step 5: Verify Compatibility

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

Confirm the mismatch is resolved and document learnings.

---

## Prerequisites

- Resolution implemented (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract testing API integration patterns {date}"
Search the web: "API compatibility verification design {date}"

_Source: [URL]_

### 1. Run Contract Compliance Tests

| Test Category | Status | Notes |
|---------------|--------|-------|
| Facade contract tests against resolved implementation | [ ] Pass / [ ] Fail | |
| All operations match contract specifications | [ ] Pass / [ ] Fail | |
| DTOs serialize/deserialize correctly | [ ] Pass / [ ] Fail | |
| Error handling matches contract | [ ] Pass / [ ] Fail | |

### 2. Test Consumer Integration

| Test Area | Status | Notes |
|-----------|--------|-------|
| Integration tests for each affected consumer | [ ] Pass / [ ] Fail | |
| Consumer workflows function correctly | [ ] Pass / [ ] Fail | |
| No regressions in unaffected functionality | [ ] Pass / [ ] Fail | |
| Tenant isolation is maintained | [ ] Pass / [ ] Fail | |

### 3. Validate in Production-like Environment

| Validation Task | Status | Notes |
|-----------------|--------|-------|
| Deploy to staging with production-like data | [ ] Complete | |
| Run smoke tests for affected operations | [ ] Pass / [ ] Fail | |
| Monitor for errors or unexpected behavior | [ ] No issues / [ ] Issues found | |
| Verify performance is acceptable | [ ] Acceptable / [ ] Concerns | |

### 4. Document Resolution

| Documentation Item | Status |
|--------------------|--------|
| Mismatch incident recorded | [ ] |
| Root cause and resolution documented | [ ] |
| Temporary measures (adapters) with removal timeline noted | [ ] |
| Runbook updated if applicable | [ ] |

### 5. Implement Prevention Measures

Based on root cause:

| Prevention Measure | Applicable | Status |
|--------------------|------------|--------|
| Add contract validation to CI pipeline | [ ] Yes / [ ] No | [ ] Implemented |
| Create pre-commit hooks for contract changes | [ ] Yes / [ ] No | [ ] Implemented |
| Update code review checklist | [ ] Yes / [ ] No | [ ] Implemented |
| Add monitoring for contract drift | [ ] Yes / [ ] No | [ ] Implemented |
| Schedule regular contract audits | [ ] Yes / [ ] No | [ ] Implemented |

---

## Output

Write recovery report to:
`{output_folder}/planning-artifacts/quality/facade-mismatch-recovery-{date}.md`

Include:
- Mismatch summary
- Resolution implemented
- Verification results (tests passed/failed)
- Prevention measures added
- Lessons learned

---

## COLLABORATION MENUS (A/P/C):

After completing verification and documentation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into test results or prevention measures
- **P (Party Mode)**: Bring QA, DevOps, and integration architect perspectives on verification completeness
- **C (Continue)**: Accept verification results and complete the recovery workflow
- **[Specific refinements]**: Describe additional verification needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: test results, prevention measures, lessons learned
- Process enhanced insights on verification thoroughness and prevention effectiveness
- Ask user: "Accept this detailed verification review? (y/n)"
- If yes, integrate into recovery report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade mismatch recovery verification for completeness and prevention adequacy"
- Process QA, DevOps, and integration architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save recovery report to output location
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Close recovery incident and update contract validation in CI pipeline

---

## Verification

- [ ] Contract compliance tests pass
- [ ] Consumer integration tests pass
- [ ] Production-like validation complete
- [ ] Resolution documented
- [ ] Prevention measures implemented
- [ ] Patterns align with pattern registry

---

## Outputs

- Recovery report
- Verification results
- Prevention measures documentation
- **Load template:** `{project-root}/_bmad/bam/templates/mismatch-recovery-template.md`

---

## Next Step

Close recovery incident and update contract validation in CI pipeline.
