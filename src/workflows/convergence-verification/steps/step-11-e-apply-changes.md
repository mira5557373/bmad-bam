# Step 11: Apply Targeted Modifications

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

Apply requested modifications to convergence report by re-running specified verification phases.

## Prerequisites

- Step 10 completed with identified phases
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Based on the user's requested changes:

1. Identify which verification phases need to be re-run
2. Present the previous results for those phases
3. Re-run the specified verification phases:
   - Cross-module integration (if facade contracts changed)
   - Tenant safety (if isolation rules changed)
   - Agent safety (if AI features changed)
   - Performance (if infrastructure or high-traffic paths changed)
4. Merge new results with existing results for unchanged phases
5. Update the release recommendation based on combined results
6. Write the updated report to `{output_folder}/planning-artifacts/quality/convergence-report.md`

Present a summary of what changed and the updated release recommendation.

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

### [A]nalyze - Deep Dive Options
| Code | Action | Description |
|------|--------|-------------|
| A1 | Analyze change impact | Determine which QG-I1/I2/I3 phases are affected |
| A2 | Analyze previous results | Review results from unchanged phases |
| A3 | Analyze merge strategy | Plan how to combine old and new results |
| A4 | Analyze recommendation | Assess updated GO/NO-GO determination |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Re-run cross-module tests | Execute QG-I1 verification for changed facades |
| P2 | Re-run tenant safety tests | Execute QG-I2 verification for isolation changes |
| P3 | Re-run agent safety tests | Execute QG-I3 verification for AI changes |
| P4 | Merge and write report | Combine results and update convergence report |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Complete Edit mode | Finish modifications and return to workflow |
| C2 | Return to Step 10 | Go back to load and review existing report |
| C3 | Jump to validation | Proceed to step-20-v-load-artifact.md |

**Convergence Gate Context:** Edit mode preserves locked (passing) verification categories while allowing targeted re-verification of affected QG-I1/I2/I3 phases.

---

## Verification

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] Verification phases consistent
- [ ] Patterns align with pattern registry

## Outputs

- Updated convergence report

## Next Step

Return to workflow for validation or completion.
