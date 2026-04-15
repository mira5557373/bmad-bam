# Step 22: Generate Consent Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing GDPR consent compliance status, identified gaps, and remediation recommendations.

## Prerequisites

- Consent validation completed (Step 21 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---

## Actions

### 1. Compile Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Overall GDPR Consent Compliance | {Percentage}% | {Pass/Conditional/Fail} |
| Article 7 Requirements | {X}/{Y} | {Status} |
| Articles 13/14 Information | {X}/{Y} | {Status} |
| Lawful Basis Coverage | {Percentage}% | {Status} |
| Critical Gaps | {Count} | {Severity} |

### 2. Detail Gap Analysis

| Gap ID | GDPR Article | Severity | Description | Remediation | Timeline |
|--------|--------------|----------|-------------|-------------|----------|
| GAP-001 | {Article} | {Critical/High/Medium/Low} | {Description} | {Action} | {Days} |

### 3. Generate Remediation Roadmap

| Priority | Gap ID | Remediation Action | Owner | Due Date | Status |
|----------|--------|-------------------|-------|----------|--------|
| 1 | {GAP-ID} | {Action} | {Owner} | {Date} | {Status} |

### 4. Generate Final Report

| Report Section | Content |
|----------------|---------|
| Executive Summary | Compliance overview, key metrics |
| Validation Methodology | Approach, scope, limitations |
| Article 7 Results | Consent requirements status |
| Articles 13/14 Results | Information requirements status |
| Lawful Basis Assessment | Purpose-basis validation |
| Storage Assessment | Proof and record compliance |
| Gap Analysis | Detailed findings by severity |
| Remediation Roadmap | Prioritized action plan |
| Appendices | Evidence, references |

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Export validation report to `{output_folder}/planning-artifacts/gdpr-consent-validation-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-consent.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] Executive summary complete
- [ ] All gaps documented with severity
- [ ] Remediation roadmap created
- [ ] Report exported to output folder

## Outputs

- `{output_folder}/planning-artifacts/gdpr-consent-validation-report.md`
- Gap analysis spreadsheet
- Remediation roadmap

## Next Step

Validation complete. Options:
- Switch to Edit mode (`step-10-e-load-consent.md`) to address gaps
- Run additional workflows for gap remediation
- Exit workflow with completed validation report
