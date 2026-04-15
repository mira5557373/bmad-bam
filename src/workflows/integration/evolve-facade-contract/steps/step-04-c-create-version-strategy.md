# Step 4: Create Version Strategy

## Purpose

Design the versioning and migration strategy for the contract evolution.

## Prerequisites

- Breaking changes assessed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "API versioning integration patterns {date}"
Search the web: "semver contract design {date}"

_Source: [URL]_

### 1. Determine Version Bump

Based on breaking change assessment:
- **MAJOR**: Any breaking changes present
- **MINOR**: New features, no breaking changes
- **PATCH**: Bug fixes only

### 2. Design Migration Timeline

| Phase | Duration | Activities |
|-------|----------|------------|
| Announcement | {weeks} | Notify all consumers |
| Parallel Support | {weeks} | Old and new versions active |
| Deprecation | {weeks} | Warnings on old version |
| Sunset | {date} | Old version removed |

### 3. Create Rollback Strategy

Document for each breaking change:
- Rollback procedure
- Data migration requirements
- State recovery steps
- Testing requirements

### 4. Document ADR

Create Architecture Decision Record:
- Context and problem statement
- Decision drivers
- Considered options
- Decision outcome and rationale
- Consequences (positive and negative)

---

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

## COLLABORATION MENUS (A/P/C)

### [A]sk
- **A1**: Is the deprecation timeline realistic for all consumers?
- **A2**: What is the cost of maintaining parallel versions?
- **A3**: Are there consumers who cannot meet the sunset deadline?
- **A4**: How will version coexistence affect testing complexity?
- **A5**: What rollback scenarios need additional planning?

### [P]roceed
- **P1**: Version strategy complete - proceed to contract update
- **P2**: ADR documented and approved - ready for implementation
- **P3**: Migration path validated - advance to Step 5

### [C]oncern
- **C1**: Deprecation timeline too aggressive for consumers
- **C2**: Parallel version maintenance cost underestimated
- **C3**: Rollback procedures incomplete for edge cases
- **C4**: ADR missing key decision rationale
- **C5**: Consumer communication plan lacks escalation path

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] Version bump type determined
- [ ] Migration timeline documented
- [ ] Rollback strategy defined
- [ ] ADR created and reviewed
- [ ] Consumer communication plan drafted

---

## Outputs

- Version strategy document
- Migration timeline
- Rollback procedures
- Architecture Decision Record (ADR)
- **Load template:** `{project-root}/_bmad/bam/data/templates/facade-migration-template.md`

---

## Next Step

Proceed to `step-05-c-update-contract.md` to apply planned changes.
