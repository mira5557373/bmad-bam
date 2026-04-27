# Step 20: Load Artifact for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER proceed without loading QG-PL1 validation checklist**
- 📖 **CRITICAL: ALWAYS verify source traceability** - requirements must link to sources
- 🔄 **CRITICAL: Check requirement ID uniqueness** - no duplicate IDs allowed
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **FLAG any 'TBD' or placeholder content** - blocks validation
- 📋 **VERIFY multi-tenant and AI/agent coverage** - BAM-specific requirements

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

This step loads the requirements analysis artifact and validation checklist for QG-PL1 (Planning Gate) verification.

---

## YOUR TASK

Load the requirements analysis artifact, verify all 11 required sections are present (Executive Summary through Stakeholder Sign-off), load the QG-PL1 validation checklist with its 5 weighted categories (Document Completeness 25%, Requirements Quality 30%, Multi-Tenant Coverage 20%, AI/Agent Coverage 15%, Stakeholder Alignment 10%), and prepare for systematic validation by identifying any structural gaps or placeholder content.

---

## Prerequisites

- Requirements analysis has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-pl1.md`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/qg-pl1.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

Read the artifact from `{output_folder}/planning-artifacts/requirements-analysis.md`

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

### 2. Load Validation Checklist

Load the QG-PL1 requirements checklist:

```yaml
qg_pl1_checklist:
  categories:
    - name: "Document Completeness"
      weight: 25
      checks:
        - "All sections populated"
        - "No placeholder content"
        - "Executive summary present"
        
    - name: "Requirements Quality"
      weight: 30
      checks:
        - "Unique IDs for all requirements"
        - "Source traceability established"
        - "Measurable acceptance criteria"
        - "No ambiguous language"
        
    - name: "Multi-Tenant Coverage"
      weight: 20
      checks:
        - "Tenant isolation requirements defined"
        - "Tier differentiation specified"
        - "Lifecycle requirements captured"
        
    - name: "AI/Agent Coverage"
      weight: 15
      checks:
        - "Runtime requirements defined"
        - "Context isolation specified"
        - "Safety constraints documented"
        
    - name: "Stakeholder Alignment"
      weight: 10
      checks:
        - "All stakeholders identified"
        - "Review process complete"
        - "Sign-offs obtained or scheduled"
```

### 3. Parse Document Structure

Verify the document contains all required sections:

```yaml
structure_validation:
  required_sections:
    - section: "Executive Summary"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Requirement Sources"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Functional Requirements"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Non-Functional Requirements"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Multi-Tenant Requirements"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "AI/Agent Requirements"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Compliance Requirements"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Module Mapping"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Gap Analysis"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Traceability Matrix"
      status: PRESENT | MISSING | INCOMPLETE
      
    - section: "Stakeholder Sign-off"
      status: PRESENT | MISSING | INCOMPLETE
```

### 4. Pre-Validation Summary

Present pre-validation findings:

```yaml
pre_validation_summary:
  artifact_status:
    file_exists: true
    file_readable: true
    valid_markdown: true
    
  section_coverage:
    required_sections: 11
    present_sections: {count}
    missing_sections: {count}
    incomplete_sections: {count}
    
  initial_concerns:
    - "{Any structural issues found}"
    - "{Missing required sections}"
    - "{Incomplete sections}"
```

---

## SUCCESS METRICS

- ✅ Requirements artifact loaded from correct path
- ✅ All 11 required sections verified present
- ✅ QG-PL1 checklist loaded with 5 weighted categories
- ✅ Requirement ID uniqueness verified
- ✅ No placeholder/TBD content detected
- ✅ Multi-tenant requirements section present
- ✅ AI/agent requirements section present

---

## FAILURE MODES

- ❌ **Artifact not found:** Redirect to Create mode
- ❌ **Missing required sections:** Cannot validate incomplete document
- ❌ **Duplicate requirement IDs:** Traceability compromised - fix before validation
- ❌ **Placeholder content detected:** Block validation until content complete
- ❌ **Missing multi-tenant section:** BAM-specific requirement coverage incomplete

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Validation checklist loaded
- [ ] Patterns align with pattern registry

---

## Outputs

Confirm successful loading with:
- Document structure status
- Section coverage summary
- Pre-validation findings
- Ready for QG-PL1 validation

---

## Next Step

Once all artifacts are successfully loaded and initial structure is confirmed, proceed to Step 21: Validate Requirements against QG-PL1.
