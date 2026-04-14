# Step 4: Validate Quality Gate

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

Perform final QG-F1 (Foundation Gate) validation and generate gate report.

---

## Prerequisites

- Tenant model verified (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime,testing-agent-safety
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation
- **Load checklist:** `{project-root}/_bmad/bam/checklists/foundation-gate.md`

**Verify current best practices with web search:**
Search the web: "quality gate validation best practices {date}"
Search the web: "quality gate validation multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### AI Runtime Verification

#### Agent Registry
- [ ] Agent registry structure implemented
- [ ] Agent registration/discovery mechanism present
- [ ] Agent lifecycle management available

#### Tool Registry
- [ ] Tool catalog structure defined
- [ ] Permission model implemented (role-based, tenant-scoped)
- [ ] Sandbox configuration for untrusted tools
- [ ] Pre-tool safety checks defined

#### Memory Manager
- [ ] Memory tier implementation (Session, User, Tenant, Global, Episodic)
- [ ] Each tier has scope, storage, retention defined
- [ ] Tenant memory isolation enforced

#### Safety Mechanisms
- [ ] Kill switch implementation present
- [ ] Circuit breaker configuration available
- [ ] Manual override mechanism documented
- [ ] Rollback procedure defined

### Documentation Verification

- [ ] Master architecture document complete
- [ ] Zone boundaries documented
- [ ] Foundation epics documented
- [ ] API documentation (if applicable)

### Test Execution

Run foundation test suite:

```bash
pytest tests/core/ tests/shared_kernel/ tests/control_plane/ tests/ai_runtime/ -v
```

- [ ] All tests pass
- [ ] No critical test failures
- [ ] Coverage meets threshold (if defined)

---

## Final Gate Decision

Aggregate all check results:

| Category | Status | Critical Items |
|----------|--------|----------------|
| Master Architecture | | |
| Tenant Model | | |
| Shared Kernel | | |
| Control Plane | | |
| AI Runtime | | |
| Tests | | |
| Documentation | | |

### Gate Outcome

| Outcome | Definition | Action |
|---------|------------|--------|
| PASS | All categories pass | Module development enabled |
| CONDITIONAL | Non-critical gaps, all critical pass | Proceed with mitigation plan + deadline |
| FAIL | Any critical category fails | Enter recovery protocol |

---

## Generate Gate Report

Write `{output_folder}/planning-artifacts/foundation-gate-report.md`:

```markdown
# Foundation Gate Report (QG-F1)

## Gate Decision: {PASS | CONDITIONAL | FAIL}

## Summary
- Date: {date}
- Validator: {user_name}
- Duration: {time taken}

## Category Results
{per-category pass/fail with findings}

## Critical Items
{list of critical items and their status}

## Gaps Identified
{list of gaps with severity and remediation}

## For CONDITIONAL Pass
- Mitigation plan: {plan}
- Deadline: {date}
- Responsible: {owner}

## For FAIL
- Root cause classification: {SCOPE | SKILL | TECH | DESIGN | QUALITY}
- Locked categories: {list of passed categories}
- Recovery path: {recommendation}

## Next Steps
{what happens after this gate}
```

Update `sprint-status.yaml`:

```yaml
foundation:
  status: {complete | in-progress}
  gate_passed: {true | false}
  gate_date: {date}
  gate_report: {path to report}
```

**Output:** Foundation gate report and updated sprint status.

**On PASS:** Foundation complete. Module development is now enabled. Proceed to create first module architecture.

**On FAIL:** Enter recovery protocol. Max 2 recovery attempts - 3 failures triggers mandatory course correction.

---

## COLLABORATION MENUS (A/P/C):

After completing the quality gate validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into gate findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for gate decision review
- **C (Continue)**: Accept gate decision and finalize QG-F1 validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: category results, critical items, gaps identified, gate decision
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into gate report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-F1 foundation gate decision: {summary of category results and gate outcome}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save gate report to output folder
- Update sprint-status.yaml
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Mark Create mode complete

---

## Verification

- [ ] AI runtime components verified
- [ ] Documentation complete
- [ ] Test suite executed successfully
- [ ] All categories evaluated
- [ ] Gate decision determined
- [ ] Gate report generated
- [ ] Sprint status updated
- [ ] Patterns align with pattern registry

---

## Outputs

- Foundation gate report
- Updated sprint status
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/foundation-review-template.md`

---

## Next Step

On PASS: Proceed to module development. Run `create-module-architecture` for first module.
