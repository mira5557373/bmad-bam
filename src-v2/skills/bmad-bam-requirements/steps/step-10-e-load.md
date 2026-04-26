# Step 10: Load Existing Requirements Document

## MANDATORY EXECUTION RULES (READ FIRST)

- :stop_sign: **NEVER generate content without user input** - Wait for explicit direction
- :open_book: **CRITICAL: ALWAYS read the complete step file** before taking any action
- :arrows_counterclockwise: **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- :pause_button: **ALWAYS pause after presenting findings** and await user direction
- :dart: **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- :dart: Show your analysis before taking any action
- :floppy_disk: Update document frontmatter after each section completion
- :pencil: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

This step loads the existing requirements analysis document for modification. Edit mode allows updates to requirements, categorization, module mappings, or validation results without recreating the entire analysis from scratch.

---

## Prerequisites

- Existing requirements analysis document to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

Load the existing requirements analysis document:
- `{output_folder}/planning-artifacts/requirements-analysis.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and validate the document structure:

```yaml
document_parse:
  sections_found:
    - executive_summary: {present: true/false}
    - requirement_sources: {present: true/false}
    - functional_requirements: {present: true/false}
    - non_functional_requirements: {present: true/false}
    - multi_tenant_requirements: {present: true/false}
    - ai_agent_requirements: {present: true/false}
    - compliance_requirements: {present: true/false}
    - module_mapping: {present: true/false}
    - cross_module_requirements: {present: true/false}
    - gap_analysis: {present: true/false}
    - traceability_matrix: {present: true/false}
    - stakeholder_signoff: {present: true/false}
    
  metadata:
    version: "{version}"
    last_modified: "{date}"
    status: "{status}"
```

### 3. Display Current State Summary

Present the user with a summary of the current document:

```yaml
current_state_summary:
  statistics:
    functional_requirements: {count}
    non_functional_requirements: {count}
    multi_tenant_requirements: {count}
    ai_agent_requirements: {count}
    compliance_requirements: {count}
    cross_module_requirements: {count}
    
  module_coverage:
    modules_defined: {count}
    requirements_assigned: "{percentage}%"
    orphaned_requirements: {count}
    
  validation_status:
    gaps_identified: {count}
    gaps_resolved: {count}
    ambiguities_pending: {count}
    stakeholders_approved: "{n}/{total}"
    
  traceability:
    requirements_with_source: "{percentage}%"
    requirements_with_tests: "{percentage}%"
```

### 4. Identify Modification Targets

Confirm with the user which sections need modification:

| Section | Last Modified | Status | Modify? |
|---------|---------------|--------|---------|
| Executive Summary | {date} | Complete | [ ] |
| Functional Requirements | {date} | Complete | [ ] |
| Non-Functional Requirements | {date} | Complete | [ ] |
| Multi-Tenant Requirements | {date} | Complete | [ ] |
| AI/Agent Requirements | {date} | Complete | [ ] |
| Compliance Requirements | {date} | Complete | [ ] |
| Module Mapping | {date} | Complete | [ ] |
| Gap Analysis | {date} | Complete | [ ] |
| Traceability Matrix | {date} | Complete | [ ] |
| Stakeholder Sign-off | {date} | Pending | [ ] |

---

## COLLABORATION MENUS (A/P/C):

After loading the existing artifact above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change analysis
- **C (Continue)**: Proceed to apply changes with identified modifications
- **[Specific refinements]**: Describe what sections you want to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass current artifact context: sections loaded, potential modification areas
- Process enhanced insights from deep questioning
- Ask user: "Accept these modification requirements? (y/n)"
- If yes, integrate into modification plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing requirements document for modification: {summary of current state}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations for changes
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm modification scope with user
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] Current state summary presented
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current requirements analysis document
- Confirmed list of sections to modify
- Modification scope definition

---

## Next Step

Proceed to `step-11-e-apply.md` with identified modification targets.
