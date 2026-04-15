# Step 2: Assess Compatibility

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

Evaluate the impact of changes on existing API consumers.

## Prerequisites

- Changes inventoried (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "API compatibility integration patterns {date}"
Search the web: "semver compatibility contract design {date}"

_Source: [URL]_

## Compatibility Analysis

**Semantic Versioning Assessment:**
- Breaking changes present? → Major version bump required
- New features only? → Minor version bump
- Bug fixes only? → Patch version bump

**Consumer Impact Assessment:**
For each breaking change:
- Estimate number of affected consumers
- Identify high-value/enterprise tenants impacted
- Calculate migration effort per consumer

**Backward Compatibility Options:**
- Can old endpoints be maintained alongside new?
- Can request transformers bridge old to new?
- What is the cost of maintaining compatibility?

## Compatibility Matrix

| Change | Current Version | New Version | Migration Effort | Consumer Impact |
|--------|-----------------|-------------|------------------|-----------------|
| ... | ... | ... | Low/Med/High | Count |

## Risk Assessment

- **High Risk**: Breaking change affecting >20% of consumers
- **Medium Risk**: Breaking change affecting <20% with clear migration
- **Low Risk**: Non-breaking changes only

---

## Soft Gate Checkpoint

**Steps 1-2 complete the change analysis phase.**

Present summary of:
- Change inventory (breaking, non-breaking, deprecations)
- Compatibility assessment with risk classification
- Consumer impact evaluation

Ask for confirmation before proceeding to migration planning.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the compatibility assessment above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into consumer impact and compatibility options
- **P (Party Mode)**: Bring analyst and architect perspectives for risk review
- **C (Continue)**: Accept compatibility assessment and proceed to migration planning
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass compatibility context: breaking changes, consumer impact, risk level
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into compatibility assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compatibility assessment for API version release: {summary of risk and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save compatibility assessment to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-plan-migration.md`

---

## Verification

- [ ] Semantic versioning assessed
- [ ] Consumer impact evaluated
- [ ] Backward compatibility options reviewed
- [ ] Compatibility matrix complete
- [ ] Risk classification determined
- [ ] Patterns align with pattern registry

## Outputs

- Compatibility assessment
- Risk classification
- Impact summary

## Next Step

Proceed to `step-03-c-plan-migration.md` to create migration strategy.
