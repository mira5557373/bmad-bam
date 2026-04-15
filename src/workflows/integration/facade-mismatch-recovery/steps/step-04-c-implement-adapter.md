# Step 4: Implement Resolution

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

Execute the chosen resolution strategy.

---

## Prerequisites

- Resolution strategy determined (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-context-propagation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "adapter pattern API integration patterns {date}"
Search the web: "contract adapter layer design {date}"

_Source: [URL]_

### If Option A: Update Contract

| Step | Action | Status |
|------|--------|--------|
| 1 | Run the evolve-facade-contract workflow | [ ] |
| 2 | Document the unplanned change as emergency evolution | [ ] |
| 3 | Notify affected consumers of the retroactive contract change | [ ] |
| 4 | Update contract tests to match new contract | [ ] |

### If Option B: Fix Implementation

| Step | Action | Status |
|------|--------|--------|
| 1 | Create implementation fix with rollback plan | [ ] |
| 2 | Deploy fix to staging environment | [ ] |
| 3 | Run contract compliance tests | [ ] |
| 4 | Deploy to production with monitoring | [ ] |

### If Option C: Create Adapter Layer

#### 1. Design Adapter

| Design Element | Specification |
|----------------|---------------|
| Adapter interface | Matches consumer expectations |
| Mapping to provider | How adapter calls map to actual implementation |
| Type transformations | Transformation rules for each type |
| Tenant context preservation | How tenant context flows through adapter |

#### 2. Implement Adapter

| Implementation Task | Status |
|--------------------|--------|
| Create adapter module in consumer or shared location | [ ] |
| Implement transformation logic for each affected operation | [ ] |
| Add logging for adapter usage tracking | [ ] |
| Include deprecation notice for temporary adapters | [ ] |

#### 3. Configure Routing

| Routing Task | Status |
|--------------|--------|
| Update consumer to use adapter | [ ] |
| Ensure adapter is transparent to consumer business logic | [ ] |
| Add feature flag for adapter bypass when ready | [ ] |

### If Option D: Version Fork

| Step | Action | Status |
|------|--------|--------|
| 1 | Create new contract version with current implementation | [ ] |
| 2 | Maintain old contract version for existing consumers | [ ] |
| 3 | Set up routing based on consumer version | [ ] |
| 4 | Plan migration timeline | [ ] |

---

## COLLABORATION MENUS (A/P/C):

After implementing the chosen resolution strategy, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into implementation details or deployment concerns
- **P (Party Mode)**: Bring integration architect and DevOps perspectives on implementation quality
- **C (Continue)**: Accept implementation and proceed to verification
- **[Specific refinements]**: Describe implementation adjustments needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: implementation artifacts, deployment plan, rollback procedure
- Process enhanced insights on implementation completeness and risks
- Ask user: "Accept this detailed implementation review? (y/n)"
- If yes, integrate into implementation documentation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review facade mismatch resolution implementation for quality and deployment readiness"
- Process integration architect and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save implementation artifacts to output
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-verify-compatibility.md`

---

## Verification

- [ ] Chosen strategy implemented
- [ ] Code changes complete
- [ ] Deployment plan ready
- [ ] Rollback procedure documented
- [ ] Monitoring configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Implementation artifacts
- Deployment plan
- Rollback procedure

---

## Next Step

Proceed to `step-05-c-verify-compatibility.md` to confirm resolution.
