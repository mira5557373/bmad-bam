# Step 1: Load Existing Incident Response Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

This step loads the existing security incident response plan for modification. Edit mode allows updates to incident classification, response procedures, notification protocols, or playbooks without recreating the entire plan from scratch.

## Prerequisites

- Existing incident response plan document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Incident Response Plan Document

Load the existing plan:
- `{output_folder}/planning-artifacts/security-incident-response-plan.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current plan:

**Document Sections:**
- Executive Summary
- Incident Classification (severity, categories, tenant impact)
- Response Team (CSIRT structure, roles)
- Response Procedures (phases, containment, evidence)
- Tenant Notification (triggers, channels, regulatory)
- Playbooks (incident-specific runbooks)
- Communication Templates
- Exercise Schedule

### 3. Identify Modification Areas

Present the following modification options:

| Section | Common Updates |
|---------|---------------|
| Incident Classification | Add categories, adjust severity |
| Response Team | Update contacts, change roles |
| Response Procedures | Modify timelines, add procedures |
| Notification | Update triggers, add channels |
| Playbooks | Add new scenarios, update actions |
| Exercise Schedule | Reschedule, update participants |

### 4. Confirm Modification Scope

Present options to user:
- Which sections need modification?
- Are there new requirements driving changes?
- Should any sections be validated after changes?

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review current plan structure and completeness
- **A2**: Analyze incident classification effectiveness
- **A3**: Evaluate response procedures currency
- **A4**: Assess playbook coverage
- **A5**: Review exercise history

### [P]ropose Changes
- **P1**: Propose classification updates
- **P2**: Suggest procedure improvements
- **P3**: Recommend notification enhancements
- **P4**: Propose new playbooks
- **P5**: Suggest exercise modifications

### [C]ontinue
- **C1**: Accept modification scope and proceed to apply changes
- **C2**: Mark step complete and load `step-11-e-apply-incident-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing incident response plan loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current incident response plan configuration
- Confirmed list of sections to modify
- Change rationale documented

## Next Step

Proceed to `step-11-e-apply-incident-changes.md` with identified modification targets.
