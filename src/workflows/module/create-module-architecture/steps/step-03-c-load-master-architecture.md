# Step 3: Load Master Architecture

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

Load and analyze the master architecture document to extract patterns, constraints, and interfaces that this module must inherit and implement.

---

## Prerequisites

- Module identity established (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries,tenant-isolation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Load Master Architecture Document

- Read `{output_folder}/planning-artifacts/master-architecture.md`
- Identify sections relevant to this module type
- Note any module-specific overrides or exceptions

### 2. Extract Relevant Patterns

- Repository pattern requirements
- Service layer conventions
- Error handling patterns
- Logging and observability standards

### 3. Document Inherited Constraints

- Technology stack constraints (languages, frameworks)
- Security requirements (authentication, authorization)
- Performance requirements (latency, throughput)
- Compliance requirements (data residency, audit)

### 4. Identify Shared Kernel Interfaces

- BaseEntity and value object base classes
- TenantContext interface requirements
- Event publishing interfaces
- Common DTOs and error types

**Verify current best practices with web search:**
Search the web: "shared kernel module patterns {date}"
Search the web: "master architecture bounded context {date}"

_Source: [URL]_

---

## Questions to Consider

- Are there patterns in master that don't apply to this module?
- Does this module need patterns not yet in master architecture?
- What shared kernel version is this module targeting?

---

## COLLABORATION MENUS (A/P/C):

After completing the master architecture analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pattern applicability and constraints
- **P (Party Mode)**: Bring architect perspectives for pattern gap analysis
- **C (Continue)**: Accept inherited patterns and proceed to domain model design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: extracted patterns, constraints, shared kernel interfaces
- Process enhanced insights on pattern applicability
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into pattern extraction
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review master architecture inheritance for module: {pattern and constraint summary}"
- Process collaborative analysis from architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save extracted patterns and constraints to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-domain-model.md`

---

## Verification

- [ ] Master architecture loaded and analyzed
- [ ] Relevant patterns extracted
- [ ] Inherited constraints documented
- [ ] Shared kernel interfaces identified
- [ ] Gap analysis completed
- [ ] Patterns align with pattern registry

---

## Outputs

- Extracted pattern checklist for this module
- Constraint compliance matrix
- List of shared kernel interfaces to implement
- Gap analysis (patterns needed but not in master)
- **Load template:** `{project-root}/_bmad/bam/data/templates/module-context-template.md`

---

## Next Step

Proceed to `step-04-c-domain-model.md` to design the module's domain model.
