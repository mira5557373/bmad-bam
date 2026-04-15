# Step 1: Identify Compliance Frameworks

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

Identify applicable compliance frameworks based on project requirements, geographic regions, industry verticals, and data types processed.

## Prerequisites

- Master architecture document completed
- Tenant model isolation defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Inputs

- User requirements and constraints for compliance design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Gather Project Context

Collect information about the platform to determine applicable frameworks:

| Context Area | Questions |
|--------------|-----------|
| Geographic Regions | Where are customers located? Where is data stored? |
| Industry Vertical | Healthcare, Finance, E-commerce, Government? |
| Data Types | PII, PHI, Payment data, Financial records? |
| Customer Requirements | Contractual compliance requirements? |
| Certification Goals | Which certifications are business objectives? |

### 2. Evaluate Framework Applicability

Assess each major compliance framework:

| Framework | Trigger Conditions | Applicability |
|-----------|-------------------|---------------|
| SOC 2 Type II | SaaS platform serving enterprise customers | Evaluate |
| GDPR | EU residents' personal data processed | Evaluate |
| HIPAA | Healthcare data or PHI processed | Evaluate |
| PCI DSS | Payment card data processed | Evaluate |
| SOX | Publicly traded company or financial reporting | Evaluate |
| ISO 27001 | Enterprise security certification requirement | Evaluate |
| CCPA | California residents' personal data | Evaluate |
| FERPA | Educational records processed | Evaluate |

### 3. Document Framework Selection

For each applicable framework, document:

| Framework | Scope | Priority | Timeline | Owner |
|-----------|-------|----------|----------|-------|
| {Framework Name} | {Scope description} | {High/Medium/Low} | {Target date} | {Responsible party} |

### 4. Identify Cross-Framework Controls

Map overlapping requirements across selected frameworks:

| Control Domain | SOC 2 | GDPR | HIPAA | Other |
|----------------|-------|------|-------|-------|
| Access Control | CC6.1-6.8 | Art. 32 | 164.312(d) | - |
| Audit Logging | CC7.2 | Art. 30 | 164.312(b) | - |
| Encryption | CC6.7 | Art. 32 | 164.312(a)(2)(iv) | - |
| Incident Response | CC7.3-7.5 | Art. 33-34 | 164.308(a)(6) | - |
| Data Retention | CC1.4 | Art. 5(1)(e) | 164.530(j) | - |

**Verify current best practices with web search:**
Search the web: "identify compliance frameworks best practices {date}"
Search the web: "identify compliance frameworks enterprise SaaS {date}"

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

### [A] Analyse - Compliance Framework Analysis
- **A1**: Analyze geographic data residency requirements for multi-region compliance
- **A2**: Evaluate industry-specific framework overlaps (SOC2/HIPAA/GDPR)
- **A3**: Assess tenant tier compliance differentiation needs
- **A4**: Review cross-framework control consolidation opportunities

### [P] Propose - Framework Recommendations
- **P1**: Propose prioritized framework implementation roadmap
- **P2**: Suggest framework-specific audit logging requirements
- **P3**: Recommend control mapping strategy for selected frameworks
- **P4**: Propose tenant-aware compliance evidence collection approach

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 2 (Design Audit Logging) - load `step-02-c-design-audit-logging.md`
- **C2**: Return to workflow overview
- **C3**: Export current framework analysis

---

## Verification

- [ ] Project context gathered comprehensively
- [ ] All applicable frameworks identified
- [ ] Framework priorities established
- [ ] Cross-framework control mapping initiated
- [ ] Patterns align with pattern registry

## Outputs

- List of applicable compliance frameworks
- Framework selection rationale
- Initial cross-framework control mapping
- Framework ownership assignments

## Next Step

Proceed to `step-02-c-design-audit-logging.md` to design the audit logging architecture.
