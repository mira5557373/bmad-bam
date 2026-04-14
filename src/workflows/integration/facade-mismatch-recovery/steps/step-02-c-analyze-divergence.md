# Step 2: Analyze Divergence

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

Perform detailed analysis of how the contract and implementation diverged.

---

## Prerequisites

- Mismatch detected (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract drift analysis API integration patterns {date}"
Search the web: "API divergence detection contract design {date}"

_Source: [URL]_

### 1. Generate Contract Diff

Compare documented contract with actual implementation:

| Field/Operation | Contract Definition | Actual Implementation | Divergence |
|-----------------|--------------------|-----------------------|------------|
| {field1} | {expected type} | {actual type} | {description} |
| {operation1} | {expected signature} | {actual signature} | {description} |

Quantify the scope of divergence:
- Number of fields affected
- Number of operations affected
- Breaking vs non-breaking changes

### 2. Trace Divergence Origin

Investigate the timeline:

| Investigation Area | Findings |
|--------------------|----------|
| Recent provider module changes | {git history analysis} |
| Contract updates not implemented | {contract changelog review} |
| Implementation changes without contract updates | {code review findings} |
| Git history for both contract and implementation | {commit comparison} |

### 3. Categorize Divergences

For each difference found:

| Difference | Contract Correct? | Implementation Correct? | Category |
|------------|-------------------|------------------------|----------|
| {diff1} | Yes/No | Yes/No | Documentation drift / Implementation bug / Unplanned breaking change |
| {diff2} | Yes/No | Yes/No | {category} |

### 4. Assess Impact Scope

| Impact Area | Assessment |
|-------------|------------|
| Affected consumers | {list of modules} |
| Broken functionality | {list of features} |
| Data integrity risk | Low / Medium / High |
| Tenant isolation concerns | Yes / No - {details} |

### 5. Identify Root Cause

| Root Cause Category | Evidence | Contributing Factors |
|--------------------|----------|---------------------|
| Process failure | Missing contract update step | {details} |
| Communication failure | Team unaware of contract | {details} |
| Tooling gap | No contract validation in CI | {details} |
| Emergency change | Without full process | {details} |

---

## COLLABORATION MENUS (A/P/C):

After completing divergence analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific divergence areas or root cause factors
- **P (Party Mode)**: Bring integration architect and DevOps perspectives on divergence analysis
- **C (Continue)**: Accept divergence analysis and proceed to resolution strategy
- **[Specific refinements]**: Describe additional analysis needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: contract diff, divergence origin, impact assessment, root cause
- Process enhanced insights on divergence severity and dependencies
- Ask user: "Accept this detailed divergence analysis? (y/n)"
- If yes, integrate into analysis report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade contract divergence analysis for completeness and accuracy"
- Process integration architect and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save divergence analysis report to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-determine-resolution.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the divergence analysis phase.**

Present summary of:
- Contract diff with all divergences quantified
- Root cause analysis findings
- Impact assessment on consumers and tenants

Ask for confirmation before proceeding to resolution strategy.

---

## Verification

- [ ] Contract diff generated
- [ ] Divergence origin traced
- [ ] Divergences categorized
- [ ] Impact scope assessed
- [ ] Root cause identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Divergence analysis report
- Impact assessment

---

## Next Step

Proceed to `step-03-c-determine-resolution.md` to choose resolution strategy.
