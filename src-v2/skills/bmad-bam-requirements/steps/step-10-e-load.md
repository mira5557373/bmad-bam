# Step 10: Load Existing Requirements Document

## MANDATORY EXECUTION RULES

- 🛑 NEVER proceed without locating the existing requirements-analysis.md file
- 📖 ALWAYS read the complete document including frontmatter metadata
- 🔄 ALWAYS parse all requirement categories for current state
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ EXTRACT all requirement types (functional, non-functional, tenant-specific)
- 📋 PRESENT a structured summary of current requirements before accepting edits
- 💬 PAUSE after summary presentation and await user edit selection
- 🎯 IDENTIFY QG-PL1 status from frontmatter to understand validation state
- ⚠️ FLAG any requirements marked as "TBD" or incomplete

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Load and parse existing requirements document for modification
- 💾 Track: Document load status and parse results
- 📖 Context: Extract requirement types, module mappings, traceability
- 🚫 Do NOT: Modify any content during load phase
- ⚠️ Gate: Changes may invalidate QG-PL1 status
- 🔍 Use web search: Only if user requests updated requirements patterns

---

## YOUR TASK

Load the existing requirements analysis document, parse its structure, extract all requirement categories and mappings, and present a summary showing what can be edited. Enable the user to select specific sections for modification.

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

### 5. Present Edit Summary

**Display current state and available edit targets:**

```
================================================================================
REQUIREMENTS ANALYSIS - EDIT MODE
================================================================================
Document: requirements-analysis.md
Version: {version}
QG-PL1 Status: {status}
================================================================================

REQUIREMENT STATISTICS:
- Functional:       {count} requirements
- Non-Functional:   {count} requirements
- Multi-Tenant:     {count} requirements
- AI/Agent:         {count} requirements
- Compliance:       {count} requirements

MODULE COVERAGE: {n} modules mapped, {percentage}% requirements assigned

TRACEABILITY: {percentage}% with source, {percentage}% with test coverage

EDITABLE SECTIONS:
[1] Functional Requirements - Add, update, or remove functional requirements
[2] Non-Functional Requirements - Modify NFRs (performance, security, etc.)
[3] Multi-Tenant Requirements - Update tenant isolation requirements
[4] AI/Agent Requirements - Modify AI agent requirements
[5] Compliance Requirements - Update regulatory/compliance needs
[6] Module Mapping - Reassign requirements to modules
[7] Gap Analysis - Update gap findings and resolutions
[8] Traceability Matrix - Fix traceability links
[9] Stakeholder Sign-off - Record approval decisions
[A] Full Document - Major restructure (requires QG-PL1 re-validation)

================================================================================
Select section(s) to edit (comma-separated) or 'C' to cancel:
```

---

## SUCCESS METRICS

- ✅ Document located and fully loaded
- ✅ Frontmatter parsed with all metadata extracted
- ✅ All requirement categories parsed completely
- ✅ Module mappings extracted and categorized
- ✅ Traceability matrix documented
- ✅ Gap analysis status captured
- ✅ Edit summary presented to user
- ✅ User has selected edit target(s)
- ✅ QG-PL1 impact assessment communicated

---

## FAILURE MODES

- ❌ **Document not found:** Redirect to Create mode or request alternate path
- ❌ **Invalid frontmatter:** Attempt recovery, flag missing fields
- ❌ **Incomplete categories:** Flag categories needing completion before edit
- ❌ **QG-PL1 already failed:** Warn that edits require full re-validation
- ❌ **Missing traceability:** Warn that requirement IDs may need regeneration

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
