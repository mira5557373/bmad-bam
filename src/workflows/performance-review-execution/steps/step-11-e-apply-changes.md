# Step 11: Apply Changes (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Apply targeted modifications to the performance review based on identified change requirements.

---

## Prerequisites

- Existing performance review loaded (Step 10)
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: performance

---

## Actions

### 1. Apply Section Updates

Update identified sections with new data or analysis.

### 2. Create Change Log Entry

Document the modification:

```
## Change Log

### {date} - {modifier}
- Changed: {section} 
- Reason: {justification}
- Impact: {description}
```

### 3. Verify Consistency

Ensure all sections are consistent after modifications.

---

## COLLABORATION MENUS (A/P/C):

After applying modifications, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Review change impact in detail
- **P (Party Mode)**: Get SRE perspective on changes
- **C (Continue)**: Finalize changes and save
- **[Additional changes]**: Describe more changes to apply

Select an option:
```

#### If 'C' (Continue):
- Save modified performance review
- Update document timestamps
- Mark edit workflow as complete

---

## Verification

- [ ] All requested modifications applied
- [ ] Change log entry created
- [ ] Document consistency verified

---

## Outputs

- Updated performance review
- Change log entry

---

## Workflow Complete

Edit mode complete. Updated artifact saved to:
- `{output_folder}/operations/performance/performance-review-{date}.md`
