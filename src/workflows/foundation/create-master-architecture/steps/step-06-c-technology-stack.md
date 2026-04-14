# Step 6: Technology Stack

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

Select and document the technology choices for each layer of the platform. This step uses web research for current best practices and ensures all technology choices are recorded with their versions and fallback strategies.

---

## Prerequisites

- Shared kernel definition complete (Step 5)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: deployment,disaster-recovery

**Verify current best practices with web search:**
Search the web: "technology stack best practices {date}"
Search the web: "technology stack multi-tenant SaaS {date}"

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

### 1. Load Project Context Technology Decisions

- Search for `**/project-context.md` for existing decisions
- Review any existing architecture documentation
- Identify technologies already committed to

### 2. Extract Technology Decisions Per Layer

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Backend | {language/framework} | {version} | {why chosen} |
| Database | {primary store} | {version} | {why chosen} |
| Cache | {caching layer} | {version} | {why chosen} |
| Events | {message broker} | {version} | {why chosen} |
| AI Runtime | {`{ai_runtime}`} | {version} | {configured choice} |
| Security | {auth provider} | {version} | {why chosen} |
| Infrastructure | {cloud/k8s} | {version} | {why chosen} |

### 3. Document Version Pins

- Record locked versions for production dependencies
- Document upgrade paths and compatibility windows
- Note end-of-life dates for critical dependencies

### 4. Define Limp Mode Architecture

| Dependency | Criticality | Fallback Behavior |
|------------|-------------|-------------------|
| Primary DB | Critical | Read-only from replica |
| Cache | Degraded | Direct DB reads (slower) |
| AI Provider | Degraded | Fallback provider / queue |
| Events | Critical | Retry queue / sync fallback |

---

## COLLABORATION MENUS (A/P/C):

After completing the technology stack analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific technology decisions
- **P (Party Mode)**: Bring DevOps and architect perspectives on stack
- **C (Continue)**: Accept technology stack and proceed to core contracts
- **[Specific refinements]**: Describe technology concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: technology decisions, version constraints, fallback strategies
- Process enhanced insights on technology selection
- Ask user: "Accept these refined decisions? (y/n)"
- If yes, integrate into technology stack document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review technology stack decisions for multi-tenant AI SaaS"
- Process DevOps and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save technology stack to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-core-contracts.md`

---

## Verification

- [ ] Every layer has a documented technology choice
- [ ] All production dependencies have pinned versions
- [ ] Critical dependencies have defined fallback behavior
- [ ] Technology choices support multi-tenant isolation requirements
- [ ] Security requirements are addressed in technology selection
- [ ] Patterns align with pattern registry

---

## Outputs

- Technology stack matrix by layer
- Version specification document
- Dependency criticality classification
- Limp mode fallback specifications
- Technology decision rationale document
- **Load template:** `{project-root}/_bmad/bam/templates/caching-strategy-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/connection-pooling-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/background-jobs-template.md`

---

## Next Step

Proceed to `step-07-c-core-contracts.md` to define facade patterns and event conventions.
