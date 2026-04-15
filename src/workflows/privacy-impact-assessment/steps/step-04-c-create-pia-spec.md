# Step 4: Create PIA/DPIA Specification

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Generate the comprehensive PIA/DPIA specification document consolidating threshold analysis, risk assessment, mitigation measures, and DPA consultation decision.

## Prerequisites

- Threshold analysis (Step 1), Risk assessment (Step 2), Mitigation design (Step 3) complete
- Soft gate checkpoint passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Actions

### 1. Compile Processing Description

| Section | Content |
|---------|---------|
| Purpose | Processing purpose and necessity |
| Data Categories | Personal data types processed |
| Data Subjects | Categories of data subjects |
| Recipients | Data recipients and transfers |
| Retention | Retention periods |

### 2. Document Threshold Analysis

| Section | Content | Source |
|---------|---------|--------|
| Article 35(3) Evaluation | Criteria assessment | Step 1 |
| WP29 Guidelines Scoring | 9 criteria scores | Step 1 |
| DPIA Decision | Required/Not required | Step 1 |

### 3. Include Risk Assessment

| Component | Implementation | Coverage |
|-----------|----------------|----------|
| Risk Inventory | All identified risks | Complete |
| Impact Assessment | Severity ratings | All risks |
| Likelihood Evaluation | Probability ratings | All risks |
| Risk Scores | Calculated scores | All risks |

### 4. Document Mitigation Measures

| Measure Type | Count | Implementation Status |
|--------------|-------|----------------------|
| Technical | {Count} | Designed |
| Organizational | {Count} | Designed |
| Residual Risk | Assessed | Acceptable/Unacceptable |

### 5. Generate PIA/DPIA Specification

| Document Section | Content |
|------------------|---------|
| Executive Summary | Processing description, DPIA outcome |
| Processing Description | Purpose, data, subjects, recipients |
| Threshold Analysis | DPIA requirement decision |
| Risk Assessment | Identified risks, scores |
| Mitigation Measures | Technical, organizational controls |
| Residual Risk | Post-mitigation assessment |
| DPA Consultation | Decision and rationale |
| Data Subject Views | Consultation approach |
| Review Schedule | Periodic review plan |
| Approvals | Sign-off matrix |

**Verify current best practices with web search:**
Search the web: "DPIA documentation requirements GDPR {date}"
Search the web: "PIA report template best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Finish Create Mode - export specification to `{output_folder}/planning-artifacts/privacy-impact-assessment-spec.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-pia.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-pia.md`

---

## Verification

- [ ] Processing description complete
- [ ] Threshold analysis documented
- [ ] Risk assessment included
- [ ] Mitigation measures documented
- [ ] Specification exported to output folder
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/privacy-impact-assessment-spec.md`
- Threshold analysis
- Risk assessment matrix
- Mitigation plan
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-processing-agreement-template.md`

## Next Step

PIA/DPIA specification complete. Options:
- Switch to Edit mode (`step-10-e-load-pia.md`) for modifications
- Switch to Validate mode (`step-20-v-load-pia.md`) for compliance checks
