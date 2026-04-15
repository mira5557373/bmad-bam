# Step 11: Apply Targeted Modifications (Edit Mode)

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

---

## Purpose

This step applies the identified changes to the existing mismatch recovery plan. Changes are applied incrementally while preserving the analysis structure, ensuring resolution strategies match updated constraints, and maintaining verification checklist completeness.

---

## Prerequisites

- Step 10 (Load Existing Artifact) completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Identify Affected Components

| Component | Impacted | Change Type |
|-----------|----------|-------------|
| Mismatch analysis | [ ] Yes / [ ] No | {description} |
| Resolution strategy | [ ] Yes / [ ] No | {description} |
| Implementation approach | [ ] Yes / [ ] No | {description} |
| Verification checklist | [ ] Yes / [ ] No | {description} |

### 2. Present Current State

Show relevant sections of the recovery plan:

| Section | Current Content | Proposed Change |
|---------|-----------------|-----------------|
| {section1} | {current} | {new} |
| {section2} | {current} | {new} |

### 3. Apply Modifications

| Modification Task | Status |
|-------------------|--------|
| Update mismatch analysis if new information discovered | [ ] |
| Modify resolution strategy if constraints changed | [ ] |
| Adjust implementation plan as needed | [ ] |
| Update verification checklist if scope changed | [ ] |

### 4. Reassess Recovery Path

If significant changes:

| Reassessment Item | Result |
|-------------------|--------|
| Re-evaluate resolution option | {A/B/C/D} → {new option if changed} |
| Update impact assessment | {changes} |
| Verify timeline feasibility | [ ] Feasible / [ ] Needs adjustment |

### 5. Verify Recovery Consistency

| Consistency Check | Status |
|-------------------|--------|
| Resolution strategy matches analysis | [ ] |
| Implementation plan addresses root cause | [ ] |
| Verification steps cover all affected areas | [ ] |

---

## COLLABORATION MENUS (A/P/C):

After applying modifications and verifying consistency, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific modification impacts
- **P (Party Mode)**: Bring integration architect and DevOps perspectives on modified recovery plan
- **C (Continue)**: Accept modifications and complete Edit mode
- **[Specific refinements]**: Describe additional modifications needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: original recovery plan, modifications applied, consistency verification
- Process enhanced insights on modification completeness and risks
- Ask user: "Accept this modification impact analysis? (y/n)"
- If yes, document impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review modified facade mismatch recovery plan for consistency and completeness"
- Process integration architect and DevOps perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Write updated recovery documents to their original locations
- Present diff summary showing all changes
- Complete Edit mode

---

## Output

Write updated recovery documents to their original locations.

Present a diff summary showing:
- Changes to mismatch analysis
- Resolution strategy adjustments
- Implementation plan updates
- Verification checklist changes

Ask for confirmation before finalizing.

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Resolution strategy matches analysis
- [ ] Implementation plan addresses root cause
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated mismatch recovery documents
- Updated resolution strategy
- Updated implementation plan

---

## Next Step

Edit mode complete. Return to workflow selection or proceed to validation.
