# Step 5: Compile Requirements Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- :pencil: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making decisions
- :paperclip: Reference pattern registry `web_queries` for search topics

---

## Purpose

Compile all requirements analysis into a comprehensive, deliverable requirements document ready for architecture and implementation phases.

---

## Prerequisites

- Step 4 completed (Validate Completeness)
- All validations complete
- **Load template:** `{project-root}/_bmad/bam/data/templates/requirements-template.md`

---

## Inputs

- All outputs from Steps 1-4
- Requirements template
- Stakeholder sign-off status

---

## Actions

### 1. Compile Final Document Structure

Generate the comprehensive requirements document:

```markdown
# Requirements Analysis Document

## Document Information
- **Project:** {{project_name}}
- **Version:** 1.0.0
- **Date:** {{date}}
- **Status:** Draft | Review | Approved
- **Author:** {{author}}

## Executive Summary

### Scope
{Brief description of project scope and objectives}

### Key Statistics
| Category | Count | Critical |
|----------|-------|----------|
| Functional | {n} | {n} |
| Non-Functional | {n} | {n} |
| Multi-Tenant | {n} | {n} |
| AI/Agent | {n} | {n} |
| Compliance | {n} | {n} |
| Cross-Module | {n} | {n} |
| **Total** | **{n}** | **{n}** |

### Risk Summary
{Top 3-5 risk items requiring attention}

---

## 1. Requirement Sources
{Documented sources from Step 1}

## 2. Categorized Requirements

### 2.1 Functional Requirements
{FR table from Step 2}

### 2.2 Non-Functional Requirements
{NFR table from Step 2}

### 2.3 Multi-Tenant Requirements
{MT table from Step 2}

### 2.4 AI/Agent Requirements
{AI table from Step 2}

### 2.5 Compliance Requirements
{COMP table from Step 2}

---

## 3. Module Mapping

### 3.1 Module Structure
{Module definitions from Step 3}

### 3.2 Requirements Assignment
{Assignment matrix from Step 3}

### 3.3 Cross-Module Requirements
{CMR catalog from Step 3}

### 3.4 Dependencies
{Dependency graph from Step 3}

### 3.5 Priority Scoring
{Priority scores from Step 3}

---

## 4. Validation Results

### 4.1 Gap Analysis
{Gaps identified from Step 4}

### 4.2 Ambiguity Resolution
{Resolution log from Step 4}

### 4.3 Traceability Matrix
{Matrix from Step 4}

---

## 5. Stakeholder Sign-Off

| Stakeholder | Role | Status | Date |
|-------------|------|--------|------|
| {name} | {role} | {status} | {date} |

---

## Appendices

### A. Source Document Index
### B. Glossary of Terms
### C. Revision History
```

### 2. Generate Output Artifacts

Create the following output files:

```yaml
output_artifacts:
  primary:
    - file: "requirements-analysis.md"
      location: "{output_folder}/planning-artifacts/"
      content: "Complete requirements document"
      
  supporting:
    - file: "requirements-matrix.csv"
      location: "{output_folder}/planning-artifacts/"
      content: "Tabular requirements data for tooling"
      
    - file: "traceability-matrix.csv"
      location: "{output_folder}/planning-artifacts/"
      content: "Source to requirement to test mapping"
      
    - file: "stakeholder-signoff.md"
      location: "{output_folder}/planning-artifacts/"
      content: "Sign-off tracking document"
```

### 3. Final Verification Checklist

Complete the requirements completeness checklist:

```yaml
completeness_checklist:
  documentation:
    - [ ] All sections populated
    - [ ] No placeholder content remaining
    - [ ] Cross-references valid
    - [ ] Version information current
    
  requirements:
    - [ ] All requirements have unique IDs
    - [ ] All requirements have sources
    - [ ] All requirements assigned to modules
    - [ ] Priority scores calculated
    - [ ] Critical requirements flagged
    
  validation:
    - [ ] Gap analysis complete
    - [ ] Ambiguities resolved or tracked
    - [ ] Traceability established
    - [ ] Stakeholder reviews scheduled
    
  multi_tenant:
    - [ ] Tenant isolation requirements defined
    - [ ] Tier differentiation specified
    - [ ] Lifecycle requirements captured
    - [ ] Compliance mapped
    
  ai_agent:
    - [ ] Runtime requirements defined
    - [ ] Context isolation specified
    - [ ] Safety constraints documented
    - [ ] Integration patterns identified
```

### 4. Output Generation

Save the compiled document:

**Output to:** `{output_folder}/planning-artifacts/requirements-analysis.md`

**Verify current best practices with web search:**
Search the web: "software requirements specification best practices {date}"
Search the web: "SaaS requirements documentation standards {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After compiling the requirements document above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for final review
- **C (Continue)**: Accept document and complete Create mode
- **[Specific refinements]**: Describe what sections you'd like to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: document structure, completeness status, pending items
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhancements? (y/n)"
- If yes, integrate into final document
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compiled requirements document: {summary of document structure}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final requirements document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to `{output_folder}/planning-artifacts/requirements-analysis.md`

---

## Verification

- [ ] Document follows template structure
- [ ] All sections complete
- [ ] Executive summary accurate
- [ ] Statistics calculated correctly
- [ ] All appendices populated
- [ ] Output saved to correct location
- [ ] Supporting artifacts generated

---

## Outputs

- `{output_folder}/planning-artifacts/requirements-analysis.md` - Complete requirements document
- `{output_folder}/planning-artifacts/requirements-matrix.csv` - Tabular data
- `{output_folder}/planning-artifacts/traceability-matrix.csv` - Traceability data
- `{output_folder}/planning-artifacts/stakeholder-signoff.md` - Sign-off tracker

---

## Create Mode Complete

The requirements analysis document has been compiled and saved. 

### Next Steps

1. **Review:** Share with stakeholders for sign-off
2. **Iterate:** Use Edit mode to incorporate feedback
3. **Validate:** Run Validate mode before proceeding to architecture
4. **Architecture:** Proceed to `bmad-bam-create-master-architecture` workflow
