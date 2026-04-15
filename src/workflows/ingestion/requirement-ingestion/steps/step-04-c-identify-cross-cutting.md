# Step 4: Identify Cross-Cutting Concerns

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

Detect requirements that span multiple modules or represent shared infrastructure.

## Prerequisites

- Module mapping complete (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Detect requirements that span multiple modules or represent shared infrastructure:

**Cross-cutting categories:**
1. **Security concerns:** Authentication, authorization, audit logging
2. **Observability:** Logging, metrics, tracing, alerting
3. **Tenant isolation:** Multi-tenancy patterns, data segregation
4. **Performance:** Caching, rate limiting, circuit breakers
5. **Compliance:** GDPR, SOC2, HIPAA requirements that affect all modules

**Analysis tasks:**
- Flag requirements that appear in multiple domain categories
- Identify shared kernel candidates (truly shared domain concepts)
- Detect infrastructure requirements masquerading as features
- Mark requirements needing platform-level implementation

**Cross-cutting handling:**
- Assign to dedicated cross-cutting module (e.g., `platform-core`)
- Or document as aspect applied across modules
- Never duplicate implementation across modules

**Output:** Cross-cutting concern registry in `{output_folder}/planning-artifacts/features/cross-cutting-concerns.md`.

**Verify current best practices with web search:**
Search the web: "identify cross cutting concerns best practices {date}"
Search the web: "identify cross cutting concerns enterprise SaaS {date}"

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

---

## Verification

- [ ] Cross-cutting requirements flagged
- [ ] Shared kernel candidates identified
- [ ] Platform-level requirements marked
- [ ] No duplicate implementations planned
- [ ] Patterns align with pattern registry

## Outputs

- Cross-cutting concerns registry
- Platform-core module definition (if needed)

## Next Step

Proceed to `step-05-c-generate-requirement-matrix.md` to produce traceability matrix.
