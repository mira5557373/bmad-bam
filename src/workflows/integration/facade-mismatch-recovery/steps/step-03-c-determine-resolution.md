# Step 3: Determine Resolution Strategy

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

Choose the appropriate recovery strategy based on the divergence analysis.

---

## Prerequisites

- Divergence analyzed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: agent-runtime

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract recovery strategy API integration patterns {date}"
Search the web: "API mismatch resolution contract design {date}"

_Source: [URL]_

### 1. Evaluate Resolution Options

| Option | When to Use | Risk | Requires |
|--------|-------------|------|----------|
| **A: Update Contract** | Implementation is correct, contract is outdated | May legitimize unplanned breaking changes | Contract evolution process, consumer notification |
| **B: Fix Implementation** | Contract is correct, implementation drifted | May break consumers relying on current behavior | Deployment, possible rollback plan |
| **C: Create Adapter Layer** | Cannot change contract or implementation quickly | Adds complexity, performance overhead | Adapter implementation and testing |
| **D: Version Fork** | Both behaviors need to coexist | Maintenance burden of two versions | Full versioning strategy |

### 2. Consider Constraints

| Constraint | Assessment | Impact on Strategy |
|------------|------------|-------------------|
| Time pressure | Production issue vs planned fix | {impact} |
| Consumer coordination | Feasibility of coordinating consumers | {impact} |
| Testing and deployment risk | Risk tolerance | {impact} |
| Long-term maintenance | Maintenance implications | {impact} |

### 3. Select Primary Strategy

| Decision Element | Value |
|------------------|-------|
| Selected option | A / B / C / D |
| Decision rationale | {justification} |
| Fallback if primary fails | {fallback option} |
| Estimated timeline | {duration} |

### 4. Define Success Criteria

| Success Criterion | Measurement |
|-------------------|-------------|
| Mismatch resolved indicator | {how we know} |
| Required tests | {test suite to pass} |
| Monitoring confirmation | {metrics to verify} |
| Consumer acceptance | {sign-off criteria} |

---

## COLLABORATION MENUS (A/P/C):

After evaluating options and selecting a strategy, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific resolution options or risk assessment
- **P (Party Mode)**: Bring integration architect, DevOps, and affected consumer perspectives on resolution strategy
- **C (Continue)**: Accept resolution strategy and proceed to implementation
- **[Specific refinements]**: Describe additional factors to consider

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: resolution options evaluation, constraints, selected strategy, success criteria
- Process enhanced insights on strategy viability and risks
- Ask user: "Accept this detailed strategy analysis? (y/n)"
- If yes, integrate into resolution strategy document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade mismatch resolution strategy for feasibility and risk"
- Process integration architect, DevOps, and consumer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save resolution strategy document to output
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-implement-adapter.md`

---

## Verification

- [ ] Resolution options evaluated
- [ ] Constraints considered
- [ ] Primary strategy selected
- [ ] Success criteria defined
- [ ] Fallback plan documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Resolution strategy document
- Success criteria

---

## Next Step

Proceed to `step-04-c-implement-adapter.md` to execute resolution.
