# Step 21: Validate AI Guardrails Architecture

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

Validate the AI guardrails architecture against safety criteria, ensuring complete input filtering, output validation, framework integration, and policy engine design.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Load checklist:** `{project-root}/_bmad/bam/checklists/qg-m3-agent-runtime.md`

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

### Input Filtering
- [ ] Attack vectors cataloged with risk levels
- [ ] Sanitization pipeline defined with stages
- [ ] Injection detection methods specified
- [ ] Per-tenant input policies documented
- [ ] Token limits defined per tier

### Output Validation
- [ ] Safety categories defined with actions
- [ ] Validation pipeline stages documented
- [ ] Safety scoring thresholds configured
- [ ] Fallback responses defined
- [ ] Latency budget allocated

### Framework Selection
- [ ] Framework evaluation documented
- [ ] Hybrid architecture designed (if applicable)
- [ ] Integration points specified
- [ ] Latency requirements validated

### Policy Engine
- [ ] Policy schema defined
- [ ] Rule definition structure documented
- [ ] Severity levels configured
- [ ] Override hierarchy specified
- [ ] Audit logging designed

### Cross-Cutting
- [ ] All components consistent with agent runtime architecture
- [ ] Tenant isolation maintained in policies
- [ ] Compliance requirements addressed

---

## Gate Decision Criteria

| Decision | Criteria |
|----------|----------|
| **PASS** | All 4 components defined, safety thresholds configured, tenant isolation verified |
| **CONDITIONAL** | Minor gaps (e.g., fallback responses incomplete, audit retention not finalized) - document gaps and proceed |
| **FAIL** | Missing input filtering, undefined output validation, or no policy schema - return to Create mode |

---

## COLLABORATION MENUS (A/P/C):

After completing the validation checklist, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and security perspectives on validation results
- **C (Continue)**: Accept validation results and generate report
- **[Specific findings]**: Describe findings to investigate further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, failed checks, gap analysis
- Process enhanced insights on quality gaps
- Ask user: "Accept this detailed analysis of findings? (y/n)"
- If yes, document enhanced findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI guardrails validation findings"
- Process QA and security perspectives
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
