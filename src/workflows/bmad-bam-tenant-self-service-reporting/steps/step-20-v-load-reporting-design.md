# Step 1: Load Reporting Design for Validation

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

This step loads the tenant self-service reporting design artifacts for validation. The reporting design defines report types, builder capabilities, scheduling options, and export channels that enable tenants to create and receive custom reports.

## Prerequisites

- Previous step completed (workflow selection)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: reporting
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation

## Artifact Locations

Load the existing reporting design:
- `{output_folder}/planning-artifacts/tenant-self-service-reporting.md`

## Pre-Validation Checks

Before proceeding, verify the following conditions:

| Check | Expected |
|-------|----------|
| File exists | Reporting design at specified path |
| File readable | Valid markdown content |
| Document complete | All major sections present |
| Metadata present | Version, date, author, status |

## Expected Document Structure

The tenant-self-service-reporting.md should contain:

**Executive Summary:**
- Design overview and purpose
- Scope definition (in/out of scope)
- Tier coverage summary

**Report Types:**
- Report categories defined
- Tier availability matrix
- Data source mappings
- Retention policies per tier

**Report Builder:**
- Interface components
- Field selection capabilities
- Filtering options
- Aggregation features
- Visualization options
- Performance guardrails

**Scheduling:**
- Frequency options per tier
- Quotas and limits
- Notification settings
- Management features

**Export Formats:**
- Format options per tier
- Delivery channels
- Email delivery settings
- Cloud storage options
- Webhook specifications

**Security Requirements:**
- Encryption standards
- Access control
- Audit logging
- Compliance requirements

## Error Handling Guidance

If the file does not exist:
- Inform user no reporting design exists to validate
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
- **A1**: Review reporting design file existence and accessibility
- **A2**: Analyze document structure completeness
- **A3**: Evaluate metadata currency and accuracy
- **A4**: Assess section presence against expected structure
- **A5**: Review pre-validation check results

### [P]ropose Changes
- **P1**: Propose switching to Create mode if design missing
- **P2**: Suggest Edit mode for incomplete sections
- **P3**: Recommend metadata updates if outdated
- **P4**: Propose validation scope adjustments
- **P5**: Suggest additional pre-validation checks

### [C]ontinue
- **C1**: Accept loaded reporting design and proceed to validation
- **C2**: Mark step complete and load `step-21-v-validate-reporting-design.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Reporting design artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] Metadata is complete and current
- [ ] Patterns align with pattern registry

## Outputs

- Loaded reporting design for validation
- Section completeness checklist
- Initial quality assessment
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

## Next Step

Proceed to `step-21-v-validate-reporting-design.md` for detailed validation checks.
