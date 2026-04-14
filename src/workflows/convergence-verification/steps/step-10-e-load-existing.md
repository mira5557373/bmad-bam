# Step 10: Load Existing Artifact

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

Load and review existing convergence report to identify verification phases requiring re-run or update.

## Prerequisites

- Existing convergence report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing convergence report from `{output_folder}/planning-artifacts/quality/convergence-report.md`.

If the file does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current report:
- Previous verification results per phase
- Previous release recommendation
- Any documented blockers

Confirm with the user which verification phases need to be re-run or updated.

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
| A1 | Analyze report structure | Review existing convergence report format |
| A2 | Analyze verification gaps | Identify phases needing re-validation |
| A3 | Analyze previous blockers | Review documented issues from prior run |
| A4 | Analyze gate status | Check QG-I1/I2/I3 pass/fail history |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Load convergence report | Read existing report from output folder |
| P2 | Parse verification phases | Extract results per verification category |
| P3 | Identify re-run targets | Determine which phases need updates |
| P4 | Prepare modification plan | Document targeted changes |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Continue to Step 11 | Proceed to apply targeted modifications |
| C2 | Switch to Create mode | Go to step-01-c-cross-module-integration-verification.md |
| C3 | Jump to validation | Skip to step-20-v-load-artifact.md |

**Convergence Gate Context:** Edit mode allows targeted re-verification of specific QG-I1/I2/I3 phases without re-running the entire convergence workflow.

---

## Verification

- [ ] Convergence report loaded successfully
- [ ] Report structure understood
- [ ] Phases for re-verification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current convergence report state
- List of phases to re-run or update

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
