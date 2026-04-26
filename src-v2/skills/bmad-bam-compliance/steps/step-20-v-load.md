# Step 20: Load Compliance Design for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- :stop_sign: NEVER generate content without user input
- :book: CRITICAL: ALWAYS read the complete step file before taking any action
- :arrows_counterclockwise: CRITICAL: When loading next step with 'C', ensure entire file is read
- :pause_button: ALWAYS pause after presenting findings and await user direction
- :dart: Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- :dart: Show your analysis before taking any action
- :floppy_disk: Track validation progress
- :pencil: Document findings objectively
- :white_check_mark: No web research in Validate mode - use existing patterns

---

## Purpose

Load the compliance design artifact and validation checklists to prepare for systematic validation against quality gate criteria.

---

## Prerequisites

- Compliance design document exists (from Create or Edit mode)
- **Load artifact:** `{output_folder}/planning-artifacts/compliance-design.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md` (QG-P1)
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/compliance-continuous-verification.md` (QG-CC)
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` (for validation criteria)

---

## Actions

### 1. Load Compliance Design Artifact

Load the compliance design document:
- `{output_folder}/planning-artifacts/compliance-design.md`

If the file does not exist:
- Inform user that validation requires an existing artifact
- Suggest running Create mode first

### 2. Parse Document Completeness

Verify all required sections are present:

| Section | Required | Present | Status |
|---------|----------|---------|--------|
| Executive Summary | Yes | YES/NO | :white_check_mark:/:x: |
| Compliance Framework Analysis | Yes | YES/NO | :white_check_mark:/:x: |
| Data Governance | Yes | YES/NO | :white_check_mark:/:x: |
| Audit Controls | Yes | YES/NO | :white_check_mark:/:x: |
| Compliance Monitoring | Yes | YES/NO | :white_check_mark:/:x: |
| Implementation Roadmap | Yes | YES/NO | :white_check_mark:/:x: |
| Risk Assessment | Yes | YES/NO | :white_check_mark:/:x: |
| Control Mapping | Yes | YES/NO | :white_check_mark:/:x: |

### 3. Load Validation Checklists

Load the applicable quality gate checklists:

**QG-P1 Production Readiness (Compliance Section):**
- [ ] Compliance frameworks identified and mapped
- [ ] Data classification implemented
- [ ] Audit logging operational
- [ ] Monitoring and alerting active
- [ ] Evidence collection automated

**QG-CC Continuous Compliance Verification:**
- [ ] Continuous compliance checks defined
- [ ] Violation detection rules configured
- [ ] Remediation workflows documented
- [ ] Reporting automation specified

### 4. Extract Validation Context

Extract key information for validation:

| Context Item | Value |
|--------------|-------|
| Document version | {version} |
| Last updated | {date} |
| Tenant model | {tenant_model} |
| Frameworks covered | {list} |
| Control count | {count} |
| Risk items | {count} |

### 5. Prepare Validation Criteria

Map compliance design to validation criteria:

| Framework | Required Controls | Documented Controls | Gap |
|-----------|-------------------|---------------------|-----|
| SOC2 | 64+ trust criteria | {count} | {gap} |
| GDPR | 12 data subject rights | {count} | {gap} |
| HIPAA | 54 standards | {count} | {gap} |
| PCI-DSS | 12 requirements | {count} | {gap} |

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact and checklists, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Clarify validation scope and criteria
- **P (Party Mode)**: Bring audit and compliance perspectives on validation approach
- **C (Continue)**: Proceed to validation execution
- **[Specific section]**: Focus validation on specific section

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: document state, applicable checklists, validation scope
- Clarify validation priorities
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Prepare for compliance design validation"
- Present audit perspective on validation approach
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to validation execution
- Next step: `step-21-v-validate.md`

---

## Verification

- [ ] Compliance design document loaded successfully
- [ ] Document structure completeness assessed
- [ ] Validation checklists loaded
- [ ] Validation context extracted
- [ ] Framework coverage identified

---

## Outputs

- Document completeness summary
- Loaded validation checklists
- Validation context and criteria
- Framework coverage analysis

---

## Next Step

Proceed to `step-21-v-validate.md` to execute validation checks.
