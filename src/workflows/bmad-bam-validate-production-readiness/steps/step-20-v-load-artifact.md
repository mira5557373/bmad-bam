# Step 20: Load Production Readiness Artifacts

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

## Purpose

This step loads all artifacts required for production readiness validation, including previous quality gate reports, architecture documents, and deployment configurations.

## Prerequisites

- Integration gates (QG-I1, QG-I2, QG-I3) have passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `production-deployment`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `agent-safety`

---

## Inputs

- Quality gate reports from `{output_folder}/planning-artifacts/quality/`
- Architecture documents from `{output_folder}/planning-artifacts/architecture/`
- Deployment configurations
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`

---

## Actions

1. **Verify Prerequisite Gates**
   - Locate QG-I1 (Convergence) report
   - Locate QG-I2 (Tenant Safety) report
   - Locate QG-I3 (Agent Safety) report
   - Confirm all gates passed

2. **Load Architecture Artifacts**
   - Master architecture document
   - Tenant isolation matrix
   - Module boundary definitions
   - Facade contracts

3. **Load Deployment Configurations**
   - Infrastructure configurations
   - Environment variables
   - Secrets management setup
   - Monitoring/alerting configurations

4. **Prepare for Production Validation**
   - Check all required artifacts exist
   - Verify consistency across documents
   - Confirm no outstanding blockers

If prerequisite gates have not passed, inform the user that production readiness cannot be validated until all integration gates pass.

#### Checkpoint: Artifacts Loaded for Validation

Before proceeding, confirm:
- [ ] QG-I1 report loaded (PASS status)
- [ ] QG-I2 report loaded (PASS status)
- [ ] QG-I3 report loaded (PASS status)
- [ ] Architecture artifacts loaded
- [ ] Deployment configurations loaded
- [ ] Ready for production validation

**STOP: Present the A/P/C menu to the user**

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

---

## Verification

- [ ] All prerequisite gate reports loaded
- [ ] All gate statuses are PASS
- [ ] Architecture artifacts complete
- [ ] Deployment configurations present
- [ ] No placeholder content remaining

## Outputs

Confirm successful loading with:
- Prerequisite gate statuses
- Architecture artifact count
- Deployment configuration completeness
- Any outstanding concerns

## Next Step

Once all artifacts are successfully loaded and prerequisite gates confirmed, proceed to Step 21: Validate Production Readiness to perform comprehensive production validation.
