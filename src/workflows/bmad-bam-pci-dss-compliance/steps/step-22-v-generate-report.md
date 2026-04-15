# Step 22: Generate PCI-DSS Validation Report

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

Generate a comprehensive validation report summarizing PCI-DSS compliance status, identified gaps, and remediation recommendations.

## Prerequisites

- PCI-DSS validation completed (Step 21 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Inputs

- Validation results from Step 21
- Gap analysis findings
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Compile Executive Summary

Create high-level compliance overview:

| Metric | Value | Status |
|--------|-------|--------|
| Overall PCI-DSS Compliance | {Percentage}% | {Pass/Conditional/Fail} |
| Requirements 1-6 | {X}/{Y} controls | {Status} |
| Requirements 7-12 | {X}/{Y} controls | {Status} |
| CDE Scope | {X} systems | {Status} |
| Tenant Isolation | {Percentage}% | {Status} |
| Critical Gaps | {Count} | {Severity} |

### 2. Detail Gap Analysis

Document all identified gaps:

| Gap ID | Requirement | Severity | Description | Remediation | Timeline |
|--------|-------------|----------|-------------|-------------|----------|
| GAP-001 | {Req #} | {Critical/High/Medium/Low} | {Description} | {Action} | {Days} |

### 3. Generate Remediation Roadmap

Create prioritized remediation plan:

| Priority | Gap ID | Remediation Action | Owner | Due Date | Status |
|----------|--------|-------------------|-------|----------|--------|
| 1 | {GAP-ID} | {Action} | {Owner} | {Date} | {Status} |

### 4. Document Recommendations

Provide strategic recommendations:

| Area | Recommendation | Impact | Effort |
|------|----------------|--------|--------|
| Network | {Recommendation} | {High/Medium/Low} | {High/Medium/Low} |
| Data Protection | {Recommendation} | {High/Medium/Low} | {High/Medium/Low} |
| Access Control | {Recommendation} | {High/Medium/Low} | {High/Medium/Low} |

### 5. Generate Final Report

Create validation report document:

| Report Section | Content |
|----------------|---------|
| Executive Summary | Compliance overview, key metrics |
| Validation Methodology | Approach, scope, limitations |
| CDE Scope Results | Scope validation, data flows |
| Requirements Assessment | All 12 requirements status |
| Tenant Isolation | Multi-tenant control assessment |
| Gap Analysis | Detailed findings by severity |
| Remediation Roadmap | Prioritized action plan |
| QSA Preparation | Audit readiness notes |
| Appendices | Evidence, references, sign-off |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Report Analysis
- **A1**: Analyze critical gap root causes
- **A2**: Evaluate remediation timeline feasibility
- **A3**: Assess resource requirements for remediation
- **A4**: Review QSA audit preparation status

### [P] Propose - Report Enhancements
- **P1**: Propose executive presentation format
- **P2**: Suggest compliance dashboard integration
- **P3**: Recommend continuous monitoring approach
- **P4**: Propose re-validation schedule

### [C] Continue - Workflow Navigation
- **C1**: Export validation report to `{output_folder}/planning-artifacts/pci-dss-validation-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-pci.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] Executive summary complete
- [ ] All gaps documented with severity
- [ ] Remediation roadmap created
- [ ] Recommendations provided
- [ ] Report exported to output folder
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/pci-dss-validation-report.md`
- Gap analysis spreadsheet
- Remediation roadmap
- QSA preparation checklist

## Next Step

Validation complete. Options:
- Switch to Edit mode (`step-10-e-load-pci.md`) to address gaps
- Run additional workflows for gap remediation
- Exit workflow with completed validation report
