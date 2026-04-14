# Step 06: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

### EXECUTION PROTOCOLS

- 🎯 **Output Delivery:** Present outputs clearly with headers
- 💾 **State Persistence:** Update document frontmatter after changes
- 📝 **Documentation:** Record decisions with rationale
- ✅ **Verification:** Confirm completion before proceeding
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Generate comprehensive pattern registry validation report.

---

## Prerequisites

- Steps 01-05 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Compile All Findings

| Category | Issues | Severity |
|----------|--------|----------|
| File Structure | | |
| Pattern Structure | | |
| Dependencies | | |
| Web Queries | | |
| Cross-References | | |

### 2. Calculate Metrics

- Total patterns: X
- Valid patterns: Y
- Patterns with issues: Z
- Coverage percentage: %

### 3. Determine Overall Status

| Status | Criteria |
|--------|----------|
| **PASS** | All patterns valid, no critical issues |
| **CONDITIONAL** | Minor issues, patterns usable |
| **FAIL** | Critical issues blocking usage |

### 4. Generate Report

Create detailed validation report with recommendations.

**Verify current best practices with web search:**
Search the web: "generate validation report best practices {date}"
Search the web: "generate validation report enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After generating report:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring QA perspectives on remediation
- **C (Continue)**: Complete validation workflow
- **[Specific concerns]**: Describe report concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save validation report
- Complete workflow

---

## Verification

- [ ] All findings compiled
- [ ] Metrics calculated
- [ ] Status determined
- [ ] Report generated

---

## Outputs

- Pattern Validation Report at `{output_folder}/planning-artifacts/pattern-validation-report.md`
- Coverage metrics

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete

Create mode complete for bam-validate-patterns workflow.
