# Step 1: Load DR Plan for Validation

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

This step loads the disaster recovery plan artifacts for validation. The DR plan defines RTO/RPO objectives, backup strategies, failover procedures, and testing schedules that ensure business continuity for the multi-tenant platform.

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation

## Artifact Locations

Load the existing disaster recovery plan:
- `{output_folder}/planning-artifacts/disaster-recovery-plan.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:

| Check | Expected |
|-------|----------|
| File exists | DR plan at specified path |
| File readable | Valid markdown content |
| Document complete | All major sections present |
| Metadata present | Version, date, author, status |

## Expected Document Structure

The disaster-recovery-plan.md should contain:

**Executive Summary:**
- Plan overview and purpose
- Scope definition (in/out of scope)
- Critical services listing
- DR team contacts

**RTO/RPO Objectives:**
- Recovery Time Objectives by tier
- Recovery Point Objectives by tier
- SLA mapping
- Recovery tier definitions

**Recovery Procedures:**
- Phase 1: Initial Response (0-30 min)
- Phase 2: Assessment and Triage (30-60 min)
- Phase 3: Recovery Execution (1-4 hours)
- Phase 4: Validation (4-8 hours)
- Phase 5: Return to Normal

**Backup Strategy:**
- Backup types and methods
- Frequency and retention
- Storage locations
- Verification procedures
- Tenant-specific backup configuration

**Failover Architecture:**
- Component failover mapping
- Failover triggers
- Failover step-by-step procedures
- Failback procedures

**Testing Schedule:**
- Test types and descriptions
- Annual testing calendar
- Test results history
- Acceptance criteria

**Communication Plan:**
- Internal communication channels
- External notification procedures

## Error Handling Guidance

If the file does not exist:
- Inform user no DR plan exists to validate
- Suggest switching to Create mode

If the file is incomplete:
- Report which sections are missing
- Suggest Edit mode to complete missing sections



---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure
- Verify document integrity

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

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
- **A1**: Review DR plan file existence and accessibility
- **A2**: Analyze document structure completeness
- **A3**: Evaluate metadata currency and accuracy
- **A4**: Assess section presence against expected structure
- **A5**: Review pre-validation check results

### [P]ropose Changes
- **P1**: Propose switching to Create mode if plan missing
- **P2**: Suggest Edit mode for incomplete sections
- **P3**: Recommend metadata updates if outdated
- **P4**: Propose validation scope adjustments
- **P5**: Suggest additional pre-validation checks

### [C]ontinue
- **C1**: Accept loaded DR plan and proceed to validation
- **C2**: Mark step complete and load `step-21-v-validate-dr-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] DR plan artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] Metadata is complete and current
- [ ] Patterns align with pattern registry

## Outputs

- Loaded DR plan for validation
- Section completeness checklist
- Initial quality assessment

## Next Step

Proceed to `step-21-v-validate-dr-plan.md` for detailed validation checks.
