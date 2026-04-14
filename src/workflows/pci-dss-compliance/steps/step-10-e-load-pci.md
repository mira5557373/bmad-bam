# Step 10: Load Existing PCI-DSS Compliance Spec

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

This step loads the existing PCI-DSS compliance specification document for modification. Edit mode allows updates to CDE scope, security controls, tenant isolation, or compliance monitoring without recreating the entire PCI-DSS design from scratch.

## Prerequisites

- Existing PCI-DSS compliance specification to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: PCI-DSS

## Artifact Location

Load the existing PCI-DSS compliance specification document:
- `{output_folder}/planning-artifacts/pci-dss-compliance-spec.md`


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load PCI-DSS Compliance Specification

Read and parse the existing PCI-DSS compliance specification document.

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Extract and display a summary of the current document:

| Section | Status | Last Updated |
|---------|--------|--------------|
| CDE Scope | {Status} | {Date} |
| Network Segmentation | {Status} | {Date} |
| Security Controls (Req 1-6) | {Status} | {Date} |
| Security Controls (Req 7-12) | {Status} | {Date} |
| Tenant Isolation | {Status} | {Date} |
| Testing Requirements | {Status} | {Date} |
| Compliance Monitoring | {Status} | {Date} |

### 3. Identify Current State

Display key metrics from the current specification:

- **CDE Systems:** Count of in-scope systems
- **Controls:** Total controls by requirement
- **Gaps:** Open gap items and remediation status
- **Last Assessment:** Most recent compliance assessment

### 4. Confirm Modification Scope

Present modification options to the user:

| Option | Description |
|--------|-------------|
| A | Update CDE scope (add/remove systems) |
| B | Modify network segmentation |
| C | Update security controls |
| D | Revise tenant isolation design |
| E | Update testing requirements |
| F | Modify compliance monitoring |
| G | Update incident response procedures |
| H | Multiple sections (specify) |

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Existing PCI-DSS Analysis
- **A1**: Analyze CDE scope changes since last assessment
- **A2**: Evaluate control implementation gaps
- **A3**: Assess PCI DSS v4.0 compliance impact
- **A4**: Review network segmentation adequacy

### [P] Propose - Modification Recommendations
- **P1**: Propose CDE scope reduction strategy
- **P2**: Suggest control enhancement priorities
- **P3**: Recommend tenant isolation improvements
- **P4**: Propose compliance monitoring updates

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 11 (Apply Changes) - load `step-11-e-apply-pci-changes.md`
- **C2**: Switch to Create Mode - load `step-01-c-scope-cde.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-pci.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] Current state metrics extracted
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current PCI-DSS compliance specification
- Confirmed list of sections to modify
- Modification scope and requirements

## Next Step

Proceed to `step-11-e-apply-pci-changes.md` with identified modification targets.
