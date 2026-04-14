# Step 10: Load Existing Compliance Spec

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

This step loads the existing compliance specification document for modification. Edit mode allows updates to framework requirements, audit logging configuration, control mappings, or retention policies without recreating the entire compliance design from scratch.

## Prerequisites

- Existing compliance specification to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

## Artifact Location

Load the existing compliance specification document:
- `{output_folder}/planning-artifacts/compliance-spec.md`


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Compliance Specification

Read and parse the existing compliance specification document.

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Extract and display a summary of the current document:

| Section | Status | Last Updated |
|---------|--------|--------------|
| Framework Requirements | {Status} | {Date} |
| Audit Logging Architecture | {Status} | {Date} |
| Control Inventory | {Status} | {Date} |
| Control-Framework Mapping | {Status} | {Date} |
| Evidence Requirements | {Status} | {Date} |
| Retention Policies | {Status} | {Date} |
| Compliance Monitoring | {Status} | {Date} |
| Remediation Tracking | {Status} | {Date} |

### 3. Identify Current State

Display key metrics from the current specification:

- **Frameworks:** List of applicable frameworks
- **Controls:** Total controls, compliant, partial, non-compliant
- **Gaps:** Open gap items and remediation status
- **Evidence:** Evidence collection status

### 4. Confirm Modification Scope

Present modification options to the user:

| Option | Description |
|--------|-------------|
| A | Update framework requirements (add/remove frameworks) |
| B | Modify audit logging architecture |
| C | Update control mappings or add new controls |
| D | Revise retention policies |
| E | Update evidence requirements |
| F | Modify compliance monitoring dashboards |
| G | Update remediation procedures |
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

### [A] Analyse - Existing Compliance Analysis
- **A1**: Analyze current SOC 2 control coverage gaps
- **A2**: Evaluate HIPAA compliance drift since last review
- **A3**: Assess GDPR data subject rights implementation status
- **A4**: Review framework requirement changes since last update

### [P] Propose - Modification Recommendations
- **P1**: Propose framework update strategy for new requirements
- **P2**: Suggest control mapping updates for compliance changes
- **P3**: Recommend retention policy adjustments per framework updates
- **P4**: Propose evidence collection automation improvements

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 11 (Apply Changes) - load `step-11-e-apply-compliance-changes.md`
- **C2**: Switch to Create Mode - load `step-01-c-identify-frameworks.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-compliance.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] Current state metrics extracted
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current compliance specification
- Confirmed list of sections to modify
- Modification scope and requirements

## Next Step

Proceed to `step-11-e-apply-compliance-changes.md` with identified modification targets.
