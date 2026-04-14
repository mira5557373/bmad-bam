# Step 10: Load Existing HIPAA Compliance Spec

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

This step loads the existing HIPAA compliance specification document for modification. Edit mode allows updates to PHI inventory, safeguard controls, BAA procedures, or breach notification processes without recreating the entire HIPAA design from scratch.

## Prerequisites

- Existing HIPAA compliance specification to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: HIPAA

## Artifact Location

Load the existing HIPAA compliance specification document:
- `{output_folder}/planning-artifacts/hipaa-compliance-spec.md`


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load HIPAA Compliance Specification

Read and parse the existing HIPAA compliance specification document.

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Extract and display a summary of the current document:

| Section | Status | Last Updated |
|---------|--------|--------------|
| PHI Inventory | {Status} | {Date} |
| PHI Data Flows | {Status} | {Date} |
| Administrative Safeguards | {Status} | {Date} |
| Technical Safeguards | {Status} | {Date} |
| Physical Safeguards | {Status} | {Date} |
| BAA Management | {Status} | {Date} |
| Breach Notification | {Status} | {Date} |
| Risk Assessment Schedule | {Status} | {Date} |

### 3. Identify Current State

Display key metrics from the current specification:

- **PHI Elements:** Count of identified PHI types
- **Safeguards:** Total controls by category
- **BAA Coverage:** Active BAAs and coverage percentage
- **Compliance Status:** Last assessment results

### 4. Confirm Modification Scope

Present modification options to the user:

| Option | Description |
|--------|-------------|
| A | Update PHI inventory (add/remove PHI elements) |
| B | Modify safeguard controls |
| C | Update BAA management procedures |
| D | Revise breach notification procedures |
| E | Update risk assessment schedule |
| F | Modify compliance monitoring |
| G | Update tenant-specific requirements |
| H | Multiple sections (specify) |

Confirm with the user which sections need modification.

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

### [A] Analyse - Existing HIPAA Analysis
- **A1**: Analyze PHI inventory gaps since last update
- **A2**: Evaluate safeguard control effectiveness
- **A3**: Assess BAA coverage changes
- **A4**: Review regulatory changes impacting current spec

### [P] Propose - Modification Recommendations
- **P1**: Propose PHI inventory update strategy
- **P2**: Suggest safeguard enhancements based on new threats
- **P3**: Recommend BAA process improvements
- **P4**: Propose compliance monitoring updates

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 11 (Apply Changes) - load `step-11-e-apply-hipaa-changes.md`
- **C2**: Switch to Create Mode - load `step-01-c-analyze-phi-data.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-hipaa.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] Current state metrics extracted
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current HIPAA compliance specification
- Confirmed list of sections to modify
- Modification scope and requirements

## Next Step

Proceed to `step-11-e-apply-hipaa-changes.md` with identified modification targets.
