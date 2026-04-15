# Step 21: Validate PII Detection Architecture

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Validate the PII detection architecture against privacy criteria, ensuring complete taxonomy, detection methods, redaction strategies, and tenant policy design.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Validation Checklist

### PII Taxonomy
- [ ] PII categories defined with sensitivity levels
- [ ] Jurisdiction-specific definitions documented
- [ ] Context-aware classification rules specified
- [ ] Cross-tenant PII boundaries defined
- [ ] Sensitivity level handling requirements documented

### Detection Methods
- [ ] Pattern-based detection rules defined
- [ ] ML-based classification designed
- [ ] Context-aware detection configured
- [ ] Multi-language support planned
- [ ] Accuracy targets specified

### Redaction Strategies
- [ ] Redaction methods defined per sensitivity
- [ ] Method selection rules configured
- [ ] Reversibility architecture designed
- [ ] Audit trail requirements documented
- [ ] Performance optimizations planned

### Tenant Policies
- [ ] Sensitivity configuration schema defined
- [ ] Custom category support designed
- [ ] Retention/deletion rules documented
- [ ] Compliance framework mapping complete
- [ ] Policy inheritance specified

### Cross-Cutting
- [ ] All components consistent with agent runtime architecture
- [ ] Tenant isolation maintained
- [ ] Compliance requirements addressed (GDPR, CCPA, etc.)

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, privacy compliance met, tenant isolation verified |
| **CONDITIONAL** | Minor gaps (e.g., multi-language incomplete, performance not optimized) - document gaps and proceed |
| **FAIL** | Missing PII taxonomy, undefined detection, or no tenant policies - return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and privacy perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on privacy gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review PII detection validation findings"
- Process QA and privacy perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation results with specific findings per component
- Determine preliminary gate decision
- Proceed to next step: `step-22-v-generate-report.md`

---

## Verification

- [ ] All checklist items evaluated
- [ ] Gate decision determined
- [ ] Findings documented per component

---

## Outputs

- Validation report
- Pass/Fail determination
- Specific findings per component

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
