# Step 11: Apply Changes to Data Retention Policy

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making changes

---

## Purpose

Apply targeted modifications to the existing data retention policy document.

---

## Prerequisites

- Step 10: Load Existing completed
- User has provided modification requirements
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Loaded document from Step 10
- User modification requirements
- Pattern registry for validation

---

## Actions

### 1. Analyze Modification Requirements

Parse user requirements and identify:
- Sections to modify
- New policies to add
- Existing policies to update
- Policies to remove

### 2. Apply Modifications

For each modification:
- Update retention periods
- Modify archival rules
- Adjust deletion procedures
- Update compliance mappings

**Verify current best practices with web search:**
Search the web: "data retention policy GDPR {date}"
Search the web: "data archival best practices SaaS {date}"

### 3. Validate Changes

- Ensure consistency across policies
- Verify compliance requirements still met
- Check for conflicting rules

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into changes
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Save changes and complete edit mode

Select an option:
```

#### If 'C' (Continue):
- Save modified document
- Update frontmatter `stepsCompleted: [10, 11]`
- Edit mode complete

---

## Verification

- [ ] All requested modifications applied
- [ ] Document consistency maintained
- [ ] Compliance requirements verified
- [ ] Version history updated
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated data retention policy document
- Change summary

---

## Next Step

Edit mode complete. Document ready for validation if needed.
