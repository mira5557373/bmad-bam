# Step 11: Apply Targeted Modifications

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step applies the identified changes to the existing tenant safety report and related documents. Changes are applied incrementally while preserving document structure, unaffected test results, and ensuring no security gaps are introduced.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-safety`

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

### 1. Identify Affected Sections

Identify the affected sections in the tenant safety documents:
- Data isolation audit findings
- Resource boundary test results
- AI context separation verification
- Cross-tenant attack test results
- Safety report conclusions

### 2. Present Current Content

Present the current content of each affected section for review.

### 3. Apply Modifications

Apply the requested modifications while preserving:
- Document structure
- Unaffected test results
- Valid isolation controls
- Existing compliance documentation

### 4. Verify Safety Integrity

If modifying safety controls, verify:
- No security gaps are introduced
- Cross-tenant isolation remains intact
- AI context separation is maintained
- Compliance requirements are still met

### 5. Validate Modified Documents

Validate the modified documents against completeness criteria.

### 6. Write Updated Documents

Write updated documents back to their original locations.

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize tenant safety update
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications applied, impact analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into change validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant safety changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated tenant safety documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] No security gaps introduced
- [ ] Cross-tenant isolation maintained
- [ ] Compliance requirements still met

---

## Outputs

- Updated tenant safety report
- Updated isolation verification (if affected)
- Updated cross-tenant test results (if affected)

---

## Next Step

Run tenant safety validation (QG-AI2) to verify changes against safety requirements.
