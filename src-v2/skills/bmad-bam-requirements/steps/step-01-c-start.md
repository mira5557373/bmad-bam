# Step 1: Initialize Requirements Ingestion

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER skip source identification** - all requirements must have traceable origins
- 📖 **CRITICAL: ALWAYS establish requirement ID scheme** before ingestion
- 🔄 **CRITICAL: Include multi-tenant requirement category** - BAM-specific dimension
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **IDENTIFY AI/agent requirements** - separate category for agent runtime needs
- 📋 **VERIFY compliance requirements exist** - regulatory/security requirements

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize requirements ingestion for QG-PL1 compliance
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Requirements feed master architecture (QG-F1)
- 🔍 Use web search: Verify current best practices
- ⚠️ Gate: QG-PL1 (Planning Gate) - all requirements need sources

---

## Purpose

Initialize the requirements ingestion workflow by loading existing requirements documents, identifying requirement sources, and establishing the analysis framework.

---

## Prerequisites

- Project context established
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- User-provided requirements documents (PRD, user stories, stakeholder interviews)
- Existing project documentation
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Requirement Sources

Gather and catalog all available requirement sources:

| Source Type | Description | Priority |
|-------------|-------------|----------|
| PRD (Product Requirements Document) | Formal product requirements | High |
| User Stories | Agile user story format | High |
| Stakeholder Interviews | Direct stakeholder input | High |
| Technical Specifications | Existing technical docs | Medium |
| Market Research | Competitive analysis | Medium |
| Support Tickets | Customer pain points | Low |
| Feature Requests | User-submitted ideas | Low |

### 2. Load Existing Documents

```yaml
document_sources:
  primary:
    - type: prd
      location: "{project-root}/docs/prd.md"
      format: markdown
      
    - type: user_stories
      location: "{project-root}/docs/user-stories/"
      format: markdown
      
    - type: stakeholder_notes
      location: "{project-root}/docs/interviews/"
      format: markdown
      
  secondary:
    - type: technical_specs
      location: "{project-root}/docs/technical/"
      format: markdown
      
    - type: market_research
      location: "{project-root}/docs/research/"
      format: various
```

### 3. Establish Analysis Framework

```yaml
analysis_framework:
  requirement_types:
    - functional
    - non_functional
    - multi_tenant
    - ai_agent
    - compliance
    
  categorization:
    by_module: true
    by_priority: true
    by_stakeholder: true
    by_timeline: true
    
  traceability:
    source_tracking: true
    dependency_mapping: true
    impact_analysis: true
```

### 4. Initialize Requirements Document

Create the initial structure for the requirements analysis document:

```yaml
requirements_document:
  frontmatter:
    title: "Requirements Analysis"
    version: "1.0.0"
    date: "{date}"
    status: "draft"
    stepsCompleted: [1]
    
  sections:
    - executive_summary
    - requirement_sources
    - categorized_requirements
    - module_mapping
    - dependency_analysis
    - traceability_matrix
    - gap_analysis
    - stakeholder_signoff
```

**Verify current best practices with web search:**
Search the web: "requirements engineering best practices {date}"
Search the web: "multi-tenant SaaS requirements analysis {date}"

_Source: [URL]_

---

## Verification

- [ ] All requirement sources identified
- [ ] Existing documents loaded and cataloged
- [ ] Analysis framework established
- [ ] Requirements document initialized
- [ ] Patterns align with pattern registry

---

## Outputs

- Requirements source catalog
- Initial requirements document structure
- Analysis framework definition
- **Load template:** `{project-root}/_bmad/bam/data/templates/requirements-analysis.md`

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-02-c-analyze.md` to categorize requirements.
