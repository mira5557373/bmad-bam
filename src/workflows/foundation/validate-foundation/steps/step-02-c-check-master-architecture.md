# Step 2: Check Master Architecture

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Validate master architecture completeness and implementation alignment.

---

## Prerequisites

- Foundation artifacts loaded (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries

**Verify current best practices with web search:**
Search the web: "master architecture validation best practices {date}"
Search the web: "master architecture validation multi-tenant SaaS {date}"

Reference web research findings in your analysis.
_Source: [URL]_ for key findings.

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### Document Completeness

Verify all required sections present in `master-architecture.md`:

- [ ] Tenant Model - isolation strategy, TenantContext, lifecycle states, isolation matrix
- [ ] AI Runtime - agent registry, tool registry, memory tiers, safety requirements
- [ ] Module Boundaries - facade requirements, forbidden patterns, event/database ownership
- [ ] Shared Kernel - TenantContext interface, BaseEntity, EventBus, common objects
- [ ] Technology Stack - decisions per layer, version pins, limp mode architecture
- [ ] Core Contracts - interface definitions, module facade templates
- [ ] Code Patterns - repository, facade, domain event, service patterns

### Implementation Alignment

Cross-reference master architecture decisions with actual implementation:

#### Tenant Model Implementation
- [ ] Isolation strategy matches (`src/core/tenant_context.py`)
- [ ] TenantContext shape matches interface definition
- [ ] Lifecycle states implemented in control plane
- [ ] Isolation matrix enforced across all asset types

#### Technology Stack Implementation
- [ ] Primary framework matches (`pyproject.toml` / `package.json`)
- [ ] Database technology matches (`src/core/database.py`)
- [ ] Version pins honored in dependencies
- [ ] Limp mode fallbacks implemented (if required)

#### Module Boundary Compliance
- [ ] Facade pattern followed in control plane and AI runtime
- [ ] No forbidden dependency patterns present
- [ ] Event ownership rules respected
- [ ] Database ownership rules respected

---

## Gap Analysis

For each gap found:

1. Classify severity: CRITICAL / MAJOR / MINOR
2. Document the gap with specific file/section reference
3. Recommend remediation action

---

## Outcome

- **PASS**: All sections present, implementation aligned
- **CONDITIONAL**: Minor gaps documented with remediation plan
- **FAIL**: Missing required sections or critical misalignment

Record findings for final gate report.

---

## COLLABORATION MENUS (A/P/C):

After completing the architecture validation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into architecture gaps using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for gap analysis
- **C (Continue)**: Accept architecture assessment and proceed to tenant model verification
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: architecture completeness findings, gap analysis, severity classifications
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into architecture assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review master architecture completeness for QG-F1 validation: {summary of sections and gaps}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save architecture assessment to validation document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-verify-tenant-model.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the foundation artifact validation.**

Present summary of:
- Document completeness status (all required sections)
- Implementation alignment findings
- Gap analysis with severity classification

Ask for confirmation before proceeding to tenant model verification.

---

## Verification

- [ ] All required sections present in master-architecture.md
- [ ] Tenant model implementation aligns with architecture
- [ ] Technology stack implementation matches decisions
- [ ] Module boundary compliance verified
- [ ] Gap analysis completed with severity classification
- [ ] Patterns align with pattern registry

---

## Outputs

- Architecture completeness checklist
- Gap analysis with remediation recommendations

---

## Next Step

Proceed to `step-03-c-verify-tenant-model.md` to validate tenant isolation.
