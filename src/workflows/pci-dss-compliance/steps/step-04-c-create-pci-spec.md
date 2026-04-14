# Step 4: Create PCI-DSS Compliance Specification

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

Generate the comprehensive PCI-DSS compliance specification document consolidating CDE scope, security controls, tenant isolation, and compliance monitoring.

## Prerequisites

- CDE scoped (Step 1)
- Security controls designed (Step 2)
- Tenant isolation designed (Step 3)
- Soft gate checkpoint passed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load template:** `{project-root}/_bmad/bam/templates/pci-dss-compliance-template.md`


---

## Inputs

- All outputs from Steps 1-3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- PCI-DSS compliance template

---

## Actions

### 1. Compile CDE Scope Section

Document CDE scope with all components:

| Section | Content | Source |
|---------|---------|--------|
| CHD Inventory | Complete data catalog | Step 1 |
| System Components | CDE systems list | Step 1 |
| Data Flows | Flow diagram and descriptions | Step 1 |
| Network Segmentation | Zone definitions | Step 1 |
| SAQ Determination | Level and justification | Step 1 |

### 2. Document Security Control Implementation

Compile control documentation:

| Control Objective | Requirements Count | Implementation Status | Owner |
|-------------------|-------------------|----------------------|-------|
| Build Secure Network | 2 | Designed | {Owner} |
| Protect Cardholder Data | 2 | Designed | {Owner} |
| Vulnerability Management | 2 | Designed | {Owner} |
| Access Control | 3 | Designed | {Owner} |
| Monitor and Test | 2 | Designed | {Owner} |
| Security Policy | 1 | Designed | {Owner} |

### 3. Include Penetration Testing Requirements

Document security testing:

| Test Type | Scope | Frequency | Methodology |
|-----------|-------|-----------|-------------|
| External Pen Test | CDE perimeter | Annual | PTES/OWASP |
| Internal Pen Test | CDE internal | Annual | PTES |
| Segmentation Test | Network boundaries | Every 6 months | Network validation |
| Vulnerability Scan | All CDE systems | Quarterly | ASV approved |

### 4. Define Compliance Monitoring

Establish ongoing compliance activities:

| Activity | Frequency | Scope | Owner |
|----------|-----------|-------|-------|
| Control Assessment | Quarterly | All 12 requirements | Compliance |
| Vulnerability Scan | Quarterly | CDE systems | Security |
| Log Review | Daily | Security events | SOC |
| Policy Review | Annual | All policies | Compliance |
| Training | Annual + onboarding | All staff | HR |

### 5. Generate PCI-DSS Specification Document

Create final specification using template:

| Document Section | Content |
|------------------|---------|
| Executive Summary | Scope, SAQ level, certification goals |
| CDE Scope | Data inventory, systems, flows |
| Security Controls | All 12 requirements with implementation |
| Tenant Isolation | Key management, data segregation |
| Testing Requirements | Penetration testing, vulnerability scans |
| Compliance Monitoring | Ongoing activities, dashboards |
| Incident Response | Breach procedures, notification |
| Appendices | Diagrams, templates, references |

**Verify current best practices with web search:**
Search the web: "PCI DSS v4.0 compliance documentation requirements {date}"
Search the web: "PCI DSS penetration testing requirements {date}"

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
- **A1**: Analyze specification completeness against PCI DSS v4.0
- **A2**: Evaluate penetration testing scope adequacy
- **A3**: Assess compliance monitoring coverage
- **A4**: Review incident response procedure completeness

### [P] Propose - Specification Enhancements
- **P1**: Propose compliance automation opportunities
- **P2**: Suggest QSA preparation checklist
- **P3**: Recommend tenant compliance reporting dashboard
- **P4**: Propose continuous compliance verification approach

### [C] Continue - Workflow Navigation
- **C1**: Finish Create Mode - export specification to `{output_folder}/planning-artifacts/pci-dss-compliance-spec.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-pci.md`
- **C3**: Switch to Validate Mode - load `step-20-v-load-pci.md`

---

## Verification

- [ ] CDE scope section complete
- [ ] All 12 requirements documented
- [ ] Tenant isolation included
- [ ] Testing requirements defined
- [ ] Compliance monitoring established
- [ ] Specification exported to output folder
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/pci-dss-compliance-spec.md`
- CDE scope diagram
- Security control matrix
- Tenant isolation design
- SAQ documentation
- **Load template:** `{project-root}/_bmad/bam/templates/pci-dss-compliance-template.md`

## Next Step

PCI-DSS compliance specification complete. Options:
- Switch to Edit mode (`step-10-e-load-pci.md`) for modifications
- Switch to Validate mode (`step-20-v-load-pci.md`) for compliance checks
- Proceed to related workflow (`bmad-bam-compliance-design`)
