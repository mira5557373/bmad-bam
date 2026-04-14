# Step 2: Check Bounded Context

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

Validate the module's bounded context definition and domain model integrity.

---

## Prerequisites

- Module artifacts loaded (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries,tenant-isolation

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

## Bounded Context Validation

### QG-M1: Identity and Context

- [ ] **Business capability** clearly stated
  - Must describe a single, cohesive business capability
  - Should not overlap with other modules' capabilities

- [ ] **Ubiquitous language** defined
  - Key domain terms documented
  - Terms consistent with master architecture glossary

- [ ] **Context boundaries** explicit
  - Clear statement of what is IN scope
  - Clear statement of what is OUT of scope
  - Boundary rationale documented

### Domain Model Integrity

- [ ] **Aggregate roots** defined
  - Each aggregate has a single root entity
  - Aggregate boundaries documented
  - Invariants protected by root

- [ ] **Entity compliance**
  - ALL entities have `tenant_id` field
  - ALL entities extend `BaseEntity` from master architecture
  - Entity relationships documented (ownership, references)

- [ ] **Value objects** identified
  - Immutable value types documented
  - No identity, only equality

- [ ] **Lifecycle rules** documented
  - Entity creation constraints
  - State transitions defined
  - Deletion/archival rules

## Validation Results

For each check, record:

```markdown
| Check | Status | Finding |
|-------|--------|---------|
| Business capability | PASS/FAIL | {detail} |
| Ubiquitous language | PASS/FAIL | {detail} |
| Context boundaries | PASS/FAIL | {detail} |
| Aggregate roots | PASS/FAIL | {detail} |
| Entity compliance | PASS/FAIL | {detail} |
| Value objects | PASS/FAIL | {detail} |
| Lifecycle rules | PASS/FAIL | {detail} |
```

## Blocking Issues

Flag as BLOCKING if:
- No bounded context definition
- Entities missing `tenant_id`
- Entities not extending `BaseEntity`
- Aggregate boundaries unclear

**Verify current best practices with web search:**
Search the web: "check bounded context best practices {date}"
Search the web: "check bounded context enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After checking bounded context, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into domain model specifics or aggregate boundaries
- **P (Party Mode)**: Bring domain expert and DDD architect perspectives on context design
- **C (Continue)**: Accept bounded context validation and proceed to facade verification
- **[Specific refinements]**: Describe areas requiring additional validation

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: bounded context definition, domain model, entity compliance
- Process enhanced insights on aggregate design and context boundaries
- Ask user: "Accept this detailed bounded context analysis? (y/n)"
- If yes, integrate into validation results
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review bounded context and domain model integrity"
- Process domain expert and DDD architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save bounded context validation results to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-verify-facade-contracts.md`

---

## Verification

- [ ] Business capability clearly stated
- [ ] Ubiquitous language defined
- [ ] Context boundaries explicit
- [ ] Aggregate roots defined
- [ ] Entity compliance verified
- [ ] Blocking issues documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Bounded context validation results
- Domain model integrity report

---

## Next Step

Proceed to `step-03-c-verify-facade-contracts.md` to validate public facade.
