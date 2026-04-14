# Step 1: Inventory Changes

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

Catalog all changes since the last API version release.

## Prerequisites

- Previous API version released
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts


---

## Inputs

- User requirements and constraints for api version release
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

**Verify current best practices with web search:**
Search the web: "API versioning integration patterns {date}"
Search the web: "API changelog contract design {date}"

_Source: [URL]_

## Change Collection

Gather changes from:
- Git commits affecting API surface
- OpenAPI/Swagger specification changes
- Contract test modifications
- Documentation updates

## Change Classification

For each change, classify:

**Breaking Changes:**
- Removed endpoints
- Changed request/response schemas
- Modified authentication requirements
- Altered error codes
- Changed rate limits

**Non-Breaking Changes:**
- New endpoints
- New optional fields
- New query parameters
- Additional response fields
- Documentation improvements

**Deprecations:**
- Endpoints marked for removal
- Fields marked as deprecated
- Authentication methods being phased out

## Module Impact

Map changes to modules:
- Which modules expose these APIs
- Which modules consume these APIs
- Cross-module dependencies affected

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After completing the change inventory above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change classification and impact analysis
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept change inventory and proceed to compatibility assessment
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: breaking changes, non-breaking changes, deprecations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into change inventory
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API change inventory for version release: {summary of changes and module impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save change inventory to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-assess-compatibility.md`

---

## Verification

- [ ] Changes gathered from all sources
- [ ] Changes classified (breaking/non-breaking/deprecations)
- [ ] Module impact mapped
- [ ] Change inventory complete
- [ ] Patterns align with pattern registry

## Outputs

- Change inventory document
- Classification summary
- Module impact mapping

## Next Step

Proceed to `step-02-c-assess-compatibility.md` to evaluate consumer impact.
