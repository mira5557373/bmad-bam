# Step 1: Complexity Confirmation

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

> **Pre-Confirmation Gate:** This step establishes context and validates preconditions before substantive architecture work begins. It confirms the module's complexity classification before proceeding.

## Purpose

Verify and confirm the module's complexity classification before proceeding with architecture design.

---

## Prerequisites

- Module identified for architecture design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

---


## Inputs

- User requirements and constraints for module - create module architecture
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Load Existing Classification

Load existing classification from `sprint-status.yaml` if available.

### 2. Review Module Scope

Review module scope against the 8-question complexity assessment:
- Q1-Q4: Technical complexity (entities, rules, AI, data volume)
- Q5-Q8: Integration complexity (dependencies, events, external, compliance)

### 3. Apply One-Way Upgrade Rule

Classification can only increase, never decrease.

### 4. Confirm Classification

Determine final classification: SIMPLE | STANDARD | COMPLEX

**Verify current best practices with web search:**
Search the web: "module complexity assessment patterns {date}"
Search the web: "bounded context complexity criteria {date}"

_Source: [URL]_

---

## Classification Triggers

| Classification | Criteria |
|----------------|----------|
| SIMPLE | Score 0-8, single aggregate, no AI |
| STANDARD | Score 9-16, multiple aggregates, basic AI |
| COMPLEX | Score 17+, cross-module deps, advanced AI |

---

## COLLABORATION MENUS (A/P/C):

After completing the complexity confirmation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into complexity factors using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for complexity assessment
- **C (Continue)**: Accept complexity classification and proceed to module identity
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass complexity context: score breakdown, assessment factors
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into complexity summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module complexity classification: {score breakdown and factors}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complexity classification to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-identity.md`

---

## Verification

- [ ] Existing classification loaded (if available)
- [ ] Module scope reviewed against 8-question assessment
- [ ] One-way upgrade rule applied
- [ ] Classification confirmed (SIMPLE/STANDARD/COMPLEX)
- [ ] Patterns align with pattern registry

---

## Outputs

- Confirmed complexity classification
- Assessment score breakdown

---

## Next Step

Proceed to `step-02-c-identity.md` to establish the module's bounded context identity.
