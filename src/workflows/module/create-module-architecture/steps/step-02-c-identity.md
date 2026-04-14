# Step 2: Identity

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

Establish the module's bounded context identity, clarifying what business capability it owns and who is responsible for it.

---

## Prerequisites

- Complexity confirmed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: local-dev

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Business Capability Owned

- Single, clear capability statement
- What problems does this module solve?
- What would break if this module didn't exist?

### 2. Assign Module Ownership

- Primary owner team name
- Technical lead contact
- Escalation path for cross-module issues

### 3. Write Purpose Statement

- One paragraph describing the module's role
- Key responsibilities (3-5 bullet points)
- Explicit non-responsibilities (what this module does NOT do)

### 4. Identify Bounded Context Boundaries

- Core domain concepts owned by this module
- Ubiquitous language terms defined here
- Integration points with other contexts

**Verify current best practices with web search:**
Search the web: "bounded context module patterns {date}"
Search the web: "domain-driven design bounded context {date}"

_Source: [URL]_

---

## Questions to Consider

- Is this capability distinct enough to warrant its own module?
- Could this be merged with an adjacent module?
- Are the boundaries clear to other teams?

---

## COLLABORATION MENUS (A/P/C):

After completing the identity definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into bounded context boundaries using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for identity validation
- **C (Continue)**: Accept module identity and proceed to load master architecture
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass identity context: business capability, ownership, boundaries
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into identity definition
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module identity and bounded context: {capability and boundaries summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save module identity to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-load-master-architecture.md`

---

## Verification

- [ ] Business capability clearly defined
- [ ] Module ownership assigned
- [ ] Purpose statement written
- [ ] Bounded context boundaries identified
- [ ] Responsibility matrix complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Module identity card (name, owner, purpose)
- Bounded context diagram showing this module
- Responsibility matrix (owns vs. uses vs. ignores)

---

## Next Step

Proceed to `step-03-c-load-master-architecture.md` to extract patterns and constraints.
