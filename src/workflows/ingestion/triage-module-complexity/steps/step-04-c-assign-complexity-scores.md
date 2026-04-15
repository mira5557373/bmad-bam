# Step 4: Assign Complexity Scores

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

Calculate final complexity classification from assessment scores.

## Prerequisites

- Integration complexity assessed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Calculate final complexity classification from assessment scores:

## Scoring Formula

**Total Score:** Sum of Q1 through Q8 (range: 0-16)

| Total Score | Classification |
|-------------|----------------|
| 0-4         | SIMPLE         |
| 5-10        | STANDARD       |
| 11-16       | COMPLEX        |

## One-Way Upgrade Rule

If ANY single question scores 2 (Complex) AND total score >= 5, upgrade classification to COMPLEX.

**Rationale:** A single highly complex factor (e.g., multi-agent AI, HIPAA compliance) dominates overall implementation complexity regardless of other simple factors.

## Score Summary Table

| Question | Factor | Score | Evidence |
|----------|--------|-------|----------|
| Q1 | Entity Count | | |
| Q2 | Business Rules | | |
| Q3 | AI Involvement | | |
| Q4 | Data Volume | | |
| Q5 | Dependency Count | | |
| Q6 | Event Complexity | | |
| Q7 | External Integrations | | |
| Q8 | Compliance Requirements | | |
| **Total** | | | |

**Classification:** [SIMPLE | STANDARD | COMPLEX]

**Output:** Completed score table and final classification with upgrade rule applied if applicable.

## Verification

- [ ] All Q1-Q8 scores in table
- [ ] Total score calculated
- [ ] Classification determined
- [ ] Upgrade rule applied if applicable
- [ ] Patterns align with pattern registry

## Outputs

- Completed score table
- Final classification

## Next Step

Proceed to `step-05-c-recommend-module-assignment.md` to generate recommendations.

**Verify current best practices with web search:**
Search the web: "assign complexity scores best practices {date}"
Search the web: "assign complexity scores enterprise SaaS {date}"

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
