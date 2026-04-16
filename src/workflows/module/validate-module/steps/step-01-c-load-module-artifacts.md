# Step 1: Load Module Artifacts

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

Load all module artifacts required for comprehensive validation.

---

## Prerequisites

- Module architecture created
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries,facade-contracts

---


## Inputs

- User requirements and constraints for module - validate module
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

## Required Artifacts

Load the following documents:

1. **Module Architecture** (required)
   - `{output_folder}/planning-artifacts/modules/{module-name}/architecture.md`

2. **Master Architecture** (required)
   - `{output_folder}/planning-artifacts/architecture/master-architecture.md`

3. **Module Epics** (if exists)
   - `{output_folder}/planning-artifacts/modules/{module-name}/epics.md`

4. **Dependent Module Facades** (if dependencies declared)
   - `{output_folder}/planning-artifacts/modules/{dependency-name}/architecture.md` (facade section)

5. **Sprint Status** (for gate tracking)
   - `{output_folder}/sprint-status.yaml`

## Validation Prerequisites

If module architecture does not exist:
- Inform user: "Module architecture not found. Cannot validate."
- Suggest: "Run `create-module-architecture` first."
- Exit validation.

## Extract Module Metadata

Parse from module architecture:

- **Module name**: identifier used throughout validation
- **Complexity classification**: SIMPLE, STANDARD, or COMPLEX
- **Bounded context**: business capability owned
- **Dependencies**: list of consumed facades and events

## Prepare Validation Context

Create validation context containing:

```yaml
module:
  name: {module-name}
  complexity: {SIMPLE|STANDARD|COMPLEX}
  context: {bounded-context-description}
  
master_constraints:
  base_entity: {required fields}
  error_contract: {error structure}
  facade_template: {required methods}
  
dependencies:
  facades: [{list}]
  events: [{list}]
```

Present module summary and confirm validation target before proceeding.

**Verify current best practices with web search:**
Search the web: "load module artifacts best practices {date}"
Search the web: "load module artifacts enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After loading module artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into module metadata or dependency analysis
- **P (Party Mode)**: Bring architect and domain expert perspectives on module scope
- **C (Continue)**: Accept loaded artifacts and proceed to bounded context validation
- **[Specific refinements]**: Describe additional artifacts to load

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: module architecture, dependencies, validation context
- Process enhanced insights on module boundaries and integration points
- Ask user: "Accept this detailed artifact analysis? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module artifacts for validation readiness"
- Process architect and domain expert perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation context to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-check-bounded-context.md`

---

## Verification

- [ ] Module architecture loaded
- [ ] Master architecture loaded
- [ ] Module metadata extracted
- [ ] Validation context prepared
- [ ] Dependencies identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation context document
- Module metadata summary

---

## Next Step

Proceed to `step-02-c-check-bounded-context.md` to validate domain model.
