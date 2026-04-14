# Step 2: Identify Changes Needed

## Purpose

Document all changes required for the contract evolution.

## Prerequisites

- Existing contract loaded (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "API change management integration patterns {date}"
Search the web: "contract changes design {date}"

_Source: [URL]_

### 1. Categorize Required Changes

| Change Type | Description | Priority |
|-------------|-------------|----------|
| Addition    | New operations/fields | HIGH/MEDIUM/LOW |
| Modification| Changed behavior/signature | HIGH/MEDIUM/LOW |
| Deprecation | Mark for future removal | HIGH/MEDIUM/LOW |
| Removal     | Delete existing element | HIGH/MEDIUM/LOW |

### 2. Document Each Change

For each change, document:
- **Change ID**: Unique identifier
- **Type**: Addition/Modification/Deprecation/Removal
- **Element**: Operation, field, or behavior affected
- **Rationale**: Business or technical reason
- **Dependencies**: Other changes this depends on

### 3. Map Change Dependencies

- Identify changes that must be applied together
- Document ordering constraints
- Flag changes that can be applied independently

### 4. Create Change Manifest

Generate a comprehensive manifest containing:
- All proposed changes with rationales
- Dependency relationships
- Suggested implementation order

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
- **A1**: Which changes have the highest business priority?
- **A2**: Are there hidden behavioral changes not captured?
- **A3**: What external dependencies could block changes?
- **A4**: Which changes can be safely batched together?
- **A5**: Are there alternative approaches for high-risk changes?

### [P]roceed
- **P1**: Change manifest complete - proceed to breaking change assessment
- **P2**: All rationales documented - ready for impact analysis
- **P3**: Dependencies mapped - advance to Step 3

### [C]oncern
- **C1**: Change scope too large - need to split into phases
- **C2**: Business rationale unclear for some changes
- **C3**: Dependency conflicts detected between changes
- **C4**: Missing stakeholder input on removal decisions
- **C5**: Behavioral changes lack sufficient documentation

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Soft Gate Checkpoint

**Steps 1-2 complete the change identification phase.**

Present summary of:
- Change manifest with all proposed changes categorized
- Dependency relationships between changes
- Priority levels and implementation order

Ask for confirmation before proceeding to breaking change assessment.

---

## Verification

- [ ] All changes categorized by type
- [ ] Each change has documented rationale
- [ ] Dependencies mapped between changes
- [ ] Change manifest generated
- [ ] Priority levels assigned

---

## Outputs

- Change manifest document
- Dependency relationship map
- Prioritized change list
- **Load template:** `{project-root}/_bmad/bam/templates/facade-contract-template.md`

---

## Next Step

Proceed to `step-03-c-assess-breaking-changes.md` to analyze consumer impact.
