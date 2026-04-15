# Step 1: Load Existing DR Plan

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

This step loads the existing disaster recovery plan for modification. Edit mode allows updates to RTO/RPO objectives, backup strategies, failover procedures, or testing schedules without recreating the entire DR plan from scratch.

## Prerequisites

- Existing DR plan document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load DR Plan Document

Load the existing disaster recovery plan:
- `{output_folder}/planning-artifacts/disaster-recovery-plan.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current DR plan:

**Document Sections:**
- Executive Summary (overview, scope, contacts)
- RTO/RPO Objectives (by tier and service criticality)
- Recovery Procedures (phases 1-5)
- Backup Strategy (types, frequency, retention)
- Failover Architecture (components, triggers, procedures)
- Testing Schedule (quarterly tests)
- Communication Plan (internal, external)

### 3. Identify Modification Areas

Present the following modification options:

| Section | Common Updates |
|---------|---------------|
| RTO/RPO Objectives | Adjust targets based on SLA changes |
| Backup Strategy | Modify frequency, retention, or storage |
| Failover Architecture | Add/remove regions, update triggers |
| Recovery Procedures | Refine steps, update owners |
| Testing Schedule | Reschedule tests, update participants |
| Communication Plan | Update contacts, channels |
| DR Team Contacts | Update personnel information |

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
- **A1**: Review current DR plan structure and completeness
- **A2**: Analyze RTO/RPO targets for alignment with current SLAs
- **A3**: Evaluate backup strategy against current RPO requirements
- **A4**: Assess failover architecture for current infrastructure
- **A5**: Review testing schedule and recent test results

### [P]ropose Changes
- **P1**: Propose RTO/RPO adjustments based on analysis
- **P2**: Suggest backup strategy modifications
- **P3**: Recommend failover architecture updates
- **P4**: Propose recovery procedure refinements
- **P5**: Suggest communication plan updates

### [C]ontinue
- **C1**: Accept modification scope and proceed to apply changes
- **C2**: Mark step complete and load `step-11-e-apply-dr-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing DR plan loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current DR plan configuration
- Confirmed list of sections to modify
- Change rationale documented

## Next Step

Proceed to `step-11-e-apply-dr-changes.md` with identified modification targets.
