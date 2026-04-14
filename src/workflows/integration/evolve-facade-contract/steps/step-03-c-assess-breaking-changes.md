# Step 3: Assess Breaking Changes

## Purpose

Analyze the impact of proposed changes on consumers.

## Prerequisites

- Changes identified (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: agent-runtime`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "breaking changes API integration patterns {date}"
Search the web: "API compatibility contract design {date}"

_Source: [URL]_

### 1. Classify Each Change

| Change ID | Breaking? | Severity | Consumer Impact |
|-----------|-----------|----------|-----------------|
| {id}      | YES/NO    | HIGH/MEDIUM/LOW | {description} |

### 2. Assess Consumer Impact

For each breaking change:
- Identify all affected consumers
- Estimate migration effort per consumer
- Document rollback complexity
- Flag high-risk scenarios

### 3. Build Impact Matrix

| Consumer | Breaking Changes Affected | Migration Effort | Risk Level |
|----------|--------------------------|------------------|------------|
| {module} | {change-ids}             | {days/hours}     | HIGH/MEDIUM/LOW |

### 4. Document Non-Breaking Alternatives

For HIGH severity changes, explore:
- Adapter patterns to maintain backward compatibility
- Gradual migration paths
- Feature flags for phased rollout

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
- **A1**: What is the total migration effort across all consumers?
- **A2**: Which breaking changes have viable non-breaking alternatives?
- **A3**: What is the rollback complexity for the highest-risk changes?
- **A4**: Are there cascading impacts not yet identified?
- **A5**: How do breaking changes affect tenant isolation boundaries?

### [P]roceed
- **P1**: All breaking changes assessed - proceed to version strategy
- **P2**: Impact matrix complete - ready for migration planning
- **P3**: Risk levels acceptable - advance to Step 4

### [C]oncern
- **C1**: HIGH risk breaking changes need mitigation review
- **C2**: Non-breaking alternatives not fully explored
- **C3**: Consumer impact underestimated
- **C4**: Rollback procedures unclear for critical changes
- **C5**: Semantic breaking changes may be hidden

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] All changes classified as breaking/non-breaking
- [ ] Severity levels assigned to breaking changes
- [ ] Consumer impact matrix completed
- [ ] Non-breaking alternatives documented for HIGH severity
- [ ] Rollback complexity assessed

---

## Outputs

- Breaking change classification list
- Consumer impact matrix
- Risk assessment document
- Alternative approaches document
- **Load template:** `{project-root}/_bmad/bam/templates/facade-migration-template.md`

---

## Next Step

Proceed to `step-04-c-create-version-strategy.md` to design the migration strategy.
