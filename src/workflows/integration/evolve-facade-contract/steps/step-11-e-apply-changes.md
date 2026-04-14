# Step 11: Apply Targeted Modifications (Edit Mode)

## Purpose

This step applies the identified changes to the existing contract evolution plan. Changes are applied incrementally while preserving unchanged migration steps, maintaining breaking change assessments, ensuring deprecation timelines remain realistic, and keeping version strategies consistent.

## Prerequisites

- Step 10 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: facade-contracts`


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Requested Modifications

For each modification:
- Locate target section in documents
- Apply change with preservation of context
- Update related cross-references
- Document modification rationale

### 2. Validate Consistency

After applying changes:
- Verify breaking change counts match
- Confirm timeline dates are consistent
- Check version numbers align
- Validate consumer lists are current

### 3. Update Document Metadata

- Update last-modified timestamps
- Add modification notes to changelog
- Update document version numbers
- Record modification author

### 4. Generate Change Summary

| Section Modified | Change Type | Impact |
|-----------------|-------------|--------|
| {section}       | {type}      | {impact} |

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

---

## COLLABORATION MENUS (A/P/C)

### [A]sk
- **A1**: Did the modifications introduce new breaking changes?
- **A2**: Is the version bump still appropriate after edits?
- **A3**: Does the migration guide need additional updates?
- **A4**: Are there unintended side effects from the changes?
- **A5**: Should the deprecation timeline be adjusted?

### [P]roceed
- **P1**: Modifications applied successfully - edit mode complete
- **P2**: Consistency verified - ready to return to workflow selection
- **P3**: All documents updated - proceed to validation if needed

### [C]oncern
- **C1**: New breaking changes introduced unexpectedly
- **C2**: Version bump needs reconsideration
- **C3**: Migration path invalidated by changes
- **C4**: Deprecation timeline now unrealistic
- **C5**: Consumer impact assessment needs update

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] All requested modifications applied
- [ ] Document consistency validated
- [ ] Metadata updated
- [ ] Change summary generated

---

## Outputs

- Modified evolution documents
- Change summary
- Updated changelog
- **Load template:** `{project-root}/_bmad/bam/templates/facade-migration-template.md`

---

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.
