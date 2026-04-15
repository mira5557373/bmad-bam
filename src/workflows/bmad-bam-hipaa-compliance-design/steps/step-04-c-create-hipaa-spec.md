# Step 4: Create HIPAA Compliance Specification

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

Generate the comprehensive HIPAA compliance specification document consolidating PHI inventory, safeguard controls, BAA management, and breach notification procedures.

## Prerequisites

- PHI data flows analyzed (Step 1)
- Safeguards designed (Step 2)
- BAA management designed (Step 3)
- Soft gate checkpoint passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load template:** `{project-root}/_bmad/bam/data/templates/hipaa-compliance-template.md`


---

## Inputs

- All outputs from Steps 1-3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- HIPAA compliance template

---

## Actions

### 1. Compile PHI Inventory Section

Document PHI inventory with all classifications:

| Section | Content | Source |
|---------|---------|--------|
| PHI Elements | Complete PHI catalog | Step 1 |
| Data Flows | Flow diagram and descriptions | Step 1 |
| Sensitivity Levels | Classification matrix | Step 1 |
| Tenant Isolation | PHI isolation requirements | Step 1 |

### 2. Document Safeguard Implementation

Compile safeguard control documentation:

| Safeguard Category | Controls Count | Implementation Status | Owner |
|--------------------|----------------|----------------------|-------|
| Administrative | {Count} | Designed | {Owner} |
| Technical | {Count} | Designed | {Owner} |
| Physical | {Count} | Designed | {Owner} |

### 3. Include Breach Notification Procedures

Document breach response workflow:

| Phase | Timeline | Actions | Responsible |
|-------|----------|---------|-------------|
| Detection | Immediate | Incident identification, containment | Security Team |
| Assessment | 24-48 hours | PHI exposure evaluation, risk assessment | Privacy Officer |
| Notification | Within 60 days | HHS, affected individuals, media (if >500) | Compliance |
| Documentation | Ongoing | Breach log, remediation tracking | Legal |

### 4. Define Risk Assessment Schedule

Establish ongoing compliance activities:

| Activity | Frequency | Scope | Owner |
|----------|-----------|-------|-------|
| Risk Analysis | Annual | Full platform | Security Officer |
| Vulnerability Scan | Quarterly | Technical controls | Security Team |
| Access Review | Semi-annual | All PHI access | IAM Team |
| BAA Review | Annual | All agreements | Legal |
| Training | Annual + onboarding | All workforce | HR |
| Policy Review | Annual | All policies | Compliance |

### 5. Generate HIPAA Specification Document

Create final specification using template:

| Document Section | Content |
|------------------|---------|
| Executive Summary | Scope, applicability, certification goals |
| PHI Inventory | Data elements, flows, classifications |
| Safeguard Controls | Administrative, technical, physical |
| BAA Management | Procedures, templates, tracking |
| Breach Notification | Procedures, timelines, templates |
| Risk Management | Assessment schedule, remediation tracking |
| Compliance Monitoring | Dashboards, metrics, alerts |
| Appendices | Templates, checklists, references |

**Verify current best practices with web search:**
Search the web: "HIPAA compliance documentation requirements {date}"
Search the web: "HIPAA breach notification rule requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A] Analyse - Specification Analysis
- **A1**: Analyze specification completeness against HIPAA requirements
- **A2**: Evaluate breach notification procedure adequacy
- **A3**: Assess risk management program comprehensiveness
- **A4**: Review compliance monitoring coverage

### [P] Propose - Specification Enhancements
- **P1**: Propose automation opportunities for compliance monitoring
- **P2**: Suggest integration with existing GRC platform
- **P3**: Recommend tenant-facing compliance dashboard
- **P4**: Propose continuous compliance verification approach

### [C] Continue - Workflow Navigation
- **C1**: Finish Create Mode - export specification to `{output_folder}/planning-artifacts/hipaa-compliance-spec.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-hipaa.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-hipaa.md`

---

## Verification

- [ ] PHI inventory section complete
- [ ] All safeguards documented
- [ ] BAA management procedures included
- [ ] Breach notification procedures defined
- [ ] Risk assessment schedule established
- [ ] Specification exported to output folder
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/hipaa-compliance-spec.md`
- PHI data flow diagrams
- Safeguard control matrix
- BAA management procedures
- Breach notification runbook
- **Load template:** `{project-root}/_bmad/bam/data/templates/hipaa-compliance-template.md`

## Next Step

HIPAA compliance specification complete. Options:
- Switch to Edit mode (`step-10-e-load-hipaa.md`) for modifications
- Switch to Validate mode (`step-20-v-load-hipaa.md`) for compliance checks
- Proceed to related workflow (`bmad-bam-compliance-design`)
