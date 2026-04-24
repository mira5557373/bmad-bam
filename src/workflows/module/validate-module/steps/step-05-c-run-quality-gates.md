# Step 5: Run Quality Gates

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


---

## Purpose

Execute final quality gate checks and generate validation report.

---

## Prerequisites

- Isolation validated (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m1-module-architecture.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m2-tenant-isolation.md`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

## Quality Gate Summary

### QG-M1: Module Identity Gate

| Criterion | Weight | Status |
|-----------|--------|--------|
| Bounded context defined | Required | |
| Business capability documented | Required | |
| Domain model complete | Required | |
| All entities have tenant_id | Required | |
| Entities extend BaseEntity | Required | |

**QG-M1 Result:** PASS / FAIL

### QG-M2: Module Interface Gate

| Criterion | Weight | Status |
|-----------|--------|--------|
| Public facade defined | Required | |
| All methods tenant-scoped | Required | |
| DTOs for input/output | Required | |
| Error contract followed | Required | |
| Facade template compliance | Required | |

**QG-M2 Result:** PASS / FAIL

### QG-M3: Module Integration Gate

| Criterion | Weight | Status |
|-----------|--------|--------|
| Dependencies declared | Required | |
| No circular dependencies | Required | |
| Facade-only cross-module access | Required | |
| Events include tenant_id | Required | |
| AI behaviors within policy | Conditional | |

**QG-M3 Result:** PASS / FAIL

## AI Validation (if applicable)

If module has AI behaviors:

- [ ] Agents defined with clear responsibilities
- [ ] Tool permissions within policy bounds
- [ ] Memory scope correctly declared (session/user/tenant)
- [ ] Kill switch mechanism documented
- [ ] Agent topology justified (single vs multi-agent)

**AI Validation Result:** PASS / FAIL / N/A

## Overall Gate Decision

| Result | Criteria | Action |
|--------|----------|--------|
| **PASS** | All required gates pass | Module ready for sprint planning |
| **CONDITIONAL** | Minor gaps, no blocking issues | Document gaps, proceed with caution |
| **FAIL** | Any blocking issue | Block sprint, fix architecture first |

## Validation Report

Generate validation report:

```markdown
# Module Validation Report: {module-name}

**Date:** {timestamp}
**Validator:** {user or automated}

## Summary

- **Overall Result:** PASS / CONDITIONAL / FAIL
- **QG-M1 (Identity):** PASS / FAIL
- **QG-M2 (Interface):** PASS / FAIL
- **QG-M3 (Integration):** PASS / FAIL
- **AI Validation:** PASS / FAIL / N/A

## Findings

### Blocking Issues
{list or "None"}

### Warnings
{list or "None"}

### Recommendations
{list or "None"}

## Next Steps

{Based on result}
```

## Output

Write report to: `{output_folder}/planning-artifacts/modules/{module-name}/validation-report.md`

Update sprint-status.yaml:
- If PASS: module status to 'validated'
- If FAIL: module status to 'validation-failed'

Present validation summary with clear next steps.

**Verify current best practices with web search:**
Search the web: "run quality gates best practices {date}"
Search the web: "run quality gates enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After running quality gates, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific gate failures or recommendations
- **P (Party Mode)**: Bring QA lead and architect perspectives on gate results
- **C (Continue)**: Accept quality gate results and finalize validation report
- **[Specific refinements]**: Describe specific gates to re-evaluate

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: gate results, blocking issues, AI validation results
- Process enhanced insights on remediation strategies
- Ask user: "Accept this detailed gate analysis? (y/n)"
- If yes, integrate into validation report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review quality gate results and validation findings"
- Process QA lead and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Update sprint-status.yaml
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Module validation complete

---

## Verification

- [ ] QG-M1 (Identity Gate) evaluated
- [ ] QG-M2 (Interface Gate) evaluated
- [ ] QG-M3 (Integration Gate) evaluated
- [ ] AI validation completed (if applicable)
- [ ] Overall gate decision determined
- [ ] Validation report generated
- [ ] Sprint status updated
- [ ] Patterns align with pattern registry

---

## Outputs

- Module validation report
- Updated sprint-status.yaml
- **Load template:** `{project-root}/_bmad/bam/data/templates/module-validation-report-template.md`

---

## Next Step

On PASS: Module ready for sprint planning. Create module epics or proceed to implementation.
