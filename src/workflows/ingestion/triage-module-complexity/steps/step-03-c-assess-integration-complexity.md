# Step 3: Assess Integration Complexity

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

Evaluate integration and external dependency factors for the module.

## Prerequisites

- Technical complexity assessed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Evaluate integration and external dependency factors:

## Assessment Questions (Integration)

### Q5: Dependency Count
How many facade dependencies does this module have?
- **0 (Simple):** 0-1 module dependencies
- **1 (Standard):** 2-3 module dependencies
- **2 (Complex):** 4+ module dependencies

### Q6: Event Complexity
How many domain events does this module publish?
- **0 (Simple):** No events (pure query module)
- **1 (Standard):** 1-5 domain events
- **2 (Complex):** 6+ domain events, event sourcing patterns

### Q7: External Integrations
Does this module integrate with third-party APIs?
- **0 (Simple):** No external integrations
- **1 (Standard):** 1 external integration (well-documented API)
- **2 (Complex):** 2+ external integrations, or unreliable/complex APIs

### Q8: Compliance Requirements
Are there regulatory constraints affecting this module?
- **0 (Simple):** No special compliance needs
- **1 (Standard):** Basic compliance (audit logging, data retention)
- **2 (Complex):** GDPR, SOC2, HIPAA, or industry-specific regulations

**Output:** Integration complexity scores (Q5-Q8) with justification for each.

Document specific integration points, external systems, and compliance requirements from module context.

## Verification

- [ ] Q5-Q8 scores assigned
- [ ] Integration points documented
- [ ] External systems identified
- [ ] Compliance requirements noted
- [ ] Patterns align with pattern registry

## Outputs

- Integration complexity scores (Q5-Q8)
- Integration documentation

## Next Step

Proceed to `step-04-c-assign-complexity-scores.md` to calculate final classification.

**Verify current best practices with web search:**
Search the web: "assess integration complexity best practices {date}"
Search the web: "assess integration complexity enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file
