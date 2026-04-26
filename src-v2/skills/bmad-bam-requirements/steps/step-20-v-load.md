# Step 20: Load Artifact for Validation

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

This step loads the requirements analysis artifact and validation checklist for QG-PL1 (Planning Gate) verification.

---

## Prerequisites

- Requirements analysis has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/requirements-checklist.md`

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/requirements-checklist.md`
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

## COLLABORATION MENUS (A/P/C):

After loading the artifacts above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for pre-validation analysis
- **C (Continue)**: Proceed to validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass artifact context: documents loaded, structure analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these pre-validation findings? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review loaded requirements artifact for validation: {summary of structure}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loading complete
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

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
