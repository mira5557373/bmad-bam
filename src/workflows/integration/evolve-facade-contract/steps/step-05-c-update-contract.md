# Step 5: Update Contract

## Purpose

Apply the planned changes to create the new contract version.

## Prerequisites

- Version strategy created (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`
- **Load template:** `{project-root}/_bmad/bam/templates/facade-contract-template.md`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "contract update API integration patterns {date}"
Search the web: "migration guide contract design {date}"

_Source: [URL]_

### 1. Apply Change Manifest

For each change in the manifest:
- Apply additions to contract
- Modify existing operations/fields
- Add deprecation notices with dates
- Remove sunset items

### 2. Update Contract Metadata

- Increment version number per strategy
- Update last-modified timestamp
- Add changelog entry
- Update consumer requirements

### 3. Generate Migration Guide

Create migration guide covering:
- Step-by-step migration instructions
- Code examples for breaking changes
- Testing recommendations
- Rollback procedures

### 4. Prepare Consumer Communication

Draft announcements including:
- Summary of changes
- Migration timeline
- Support resources
- Escalation contacts

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
- **A1**: Are all changes from the manifest applied correctly?
- **A2**: Do deprecation notices include clear removal dates?
- **A3**: Are TypeScript definitions backward-compatible where expected?
- **A4**: Does the migration guide cover all breaking changes?
- **A5**: Is the consumer communication clear and actionable?

### [P]roceed
- **P1**: Contract updated successfully - ready for validation
- **P2**: All artifacts generated - proceed to quality gate
- **P3**: Consumer communication prepared - submit for review

### [C]oncern
- **C1**: Change manifest mismatch with applied changes
- **C2**: Deprecation notices missing removal dates
- **C3**: TypeScript definitions have unexpected breaking changes
- **C4**: Migration guide incomplete for complex scenarios
- **C5**: Consumer communication tone needs adjustment

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] All changes from manifest applied
- [ ] Contract metadata updated
- [ ] Migration guide generated
- [ ] Consumer communication prepared
- [ ] Changelog entry added

---

## Outputs

- Updated facade contract
- Migration guide document
- Consumer communication draft
- Changelog entry
- **Load template:** `{project-root}/_bmad/bam/templates/facade-contract-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/facade-migration-template.md`

---

## Next Step

Submit updated contract for validation via `bmad-bam-validate-facade-contract`.
