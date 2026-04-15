# Step 1: Load Existing Reporting Design

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

## Purpose

This step loads the existing tenant self-service reporting design for modification. Edit mode allows updates to report types, builder capabilities, scheduling options, or export channels without recreating the entire design from scratch.

## Prerequisites

- Existing reporting design document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: reporting


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Reporting Design Document

Load the existing reporting design:
- `{output_folder}/planning-artifacts/tenant-self-service-reporting.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current reporting design:

**Document Sections:**
- Executive Summary (overview, scope)
- Report Types (categories, tier availability, data sources)
- Report Builder (interface components, capabilities)
- Scheduling (frequency options, quotas, notifications)
- Export Formats (format options, delivery channels)
- Security Requirements (encryption, access control)

### 3. Identify Modification Areas

Present the following modification options:

| Section | Common Updates |
|---------|---------------|
| Report Types | Add/remove report types, modify tier access |
| Report Builder | Adjust capabilities, limits, features |
| Scheduling | Modify frequencies, quotas, notifications |
| Export Formats | Add formats, modify delivery channels |
| Security | Update encryption, access control settings |
| Quotas | Adjust tier-specific limits |

### 4. Confirm Modification Scope

Present options to user:
- Which sections need modification?
- Are there new requirements driving changes?
- Should any sections be validated after changes?

Document the confirmed modification scope for the next step.

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

### Menu Options

### [A]nalyze Options
- **A1**: Review current reporting design structure and completeness
- **A2**: Analyze report types for tier alignment
- **A3**: Evaluate builder capabilities against user needs
- **A4**: Assess scheduling configuration for typical usage
- **A5**: Review export formats and delivery channels

### [P]ropose Changes
- **P1**: Propose report type adjustments
- **P2**: Suggest builder capability modifications
- **P3**: Recommend scheduling updates
- **P4**: Propose export format changes
- **P5**: Suggest security requirement updates

### [C]ontinue
- **C1**: Accept modification scope and proceed to apply changes
- **C2**: Mark step complete and load `step-11-e-apply-reporting-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing reporting design loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current reporting design configuration
- Confirmed list of sections to modify
- Change rationale documented
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

## Next Step

Proceed to `step-11-e-apply-reporting-changes.md` with identified modification targets.
