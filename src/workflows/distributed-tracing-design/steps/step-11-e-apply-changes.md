# Step 11: Apply Changes

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

---

## Purpose

Apply the targeted modifications to the distributed tracing design document based on user requirements identified in the previous step.

---

## Prerequisites

- Step 10 completed (artifact loaded and modification targets confirmed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: observability`

---


## Inputs

- Loaded artifact from Step 10
- Confirmed modification targets
- User-specified changes
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Review Modification Scope

Review the confirmed modification targets:
- OpenTelemetry SDK configuration changes
- Exporter updates
- Context propagation boundary additions
- Tenant correlation attribute changes
- Sampling strategy adjustments

### 2. Apply Modifications

For each modification target:
1. Present current state of the section
2. Propose specific changes based on user requirements
3. Await user approval before applying
4. Document the change rationale

### 3. Validate Consistency

After applying changes:
- Verify cross-references remain valid
- Check sampling rates align with tier definitions
- Ensure tenant correlation attributes are complete
- Validate propagation coverage

### 4. Generate Change Summary

Document all modifications made:
| Section | Original | Modified | Rationale |
|---------|----------|----------|-----------|
| {section} | {before} | {after} | {why} |

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impacts and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept modifications and complete Edit mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: modifications made, potential impacts
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate additional changes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review distributed tracing modifications: {summary of changes made}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modified document
- Update frontmatter `stepsCompleted: [10, 11]`
- Complete Edit mode

---

## Verification

- [ ] All modification targets addressed
- [ ] Cross-references validated
- [ ] Consistency checks passed
- [ ] Change summary documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Modified distributed tracing design document
- Change summary with rationale

---

## Workflow Complete

Edit mode complete. The modified distributed tracing design is saved at:
`{output_folder}/planning-artifacts/architecture/distributed-tracing-design.md`
