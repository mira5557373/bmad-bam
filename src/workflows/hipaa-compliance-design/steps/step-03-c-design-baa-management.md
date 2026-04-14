# Step 3: Design BAA Management

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

Design the Business Associate Agreement (BAA) management lifecycle including template management, subcontractor tracking, renewal procedures, and compliance monitoring.

## Prerequisites

- HIPAA safeguards designed (Step 2 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: HIPAA


---

## Inputs

- Safeguard control matrix from Step 2
- Tenant model requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- BAA regulatory requirements

---

## Actions

### 1. Define BAA Requirements

Establish BAA contract requirements per HIPAA:

| BAA Requirement | HIPAA Reference | Implementation | Verification |
|-----------------|-----------------|----------------|--------------|
| Written Contract | 164.308(b)(1) | Signed agreement | Legal review |
| PHI Use Limits | 164.504(e)(2) | Permitted uses clause | Contract language |
| Safeguard Commitment | 164.504(e)(2) | Security obligations | SOC 2 attestation |
| Subcontractor Flow-down | 164.504(e)(2) | Sub-BAA requirement | Chain tracking |
| Breach Notification | 164.504(e)(2) | 60-day notification | SLA clause |
| Termination Return | 164.504(e)(2) | Data return/destroy | Termination checklist |

### 2. Design BAA Lifecycle Management

Create BAA management workflow:

| Lifecycle Stage | Actions | Owner | Timeline |
|-----------------|---------|-------|----------|
| Initiation | Risk assessment, due diligence | Procurement | Pre-contract |
| Negotiation | Terms review, amendments | Legal | 2-4 weeks |
| Execution | Signing, system registration | Contract Admin | 1 week |
| Active Monitoring | Compliance checks, audits | Compliance | Ongoing |
| Annual Review | Renewal assessment | Legal + Compliance | Annual |
| Termination | Data return, destruction cert | Operations | 30 days |

### 3. Design Subcontractor Tracking

Manage subcontractor BAA chain:

| Subcontractor Type | BAA Requirement | Tracking Method | Audit Frequency |
|--------------------|-----------------|-----------------|-----------------|
| Cloud Infrastructure | Required | Vendor register | Annual |
| Data Analytics | Required | PHI access log | Quarterly |
| Support Services | Conditional | Access review | Semi-annual |
| Development Tools | Conditional | Data exposure check | As-needed |

### 4. Design BAA Compliance Dashboard

Define monitoring and reporting:

| Metric | Threshold | Alert | Dashboard |
|--------|-----------|-------|-----------|
| BAA Coverage | 100% vendors with PHI | <100% | Red indicator |
| Expiring BAAs | 90-day warning | <30 days | Amber alert |
| Subcontractor Chain | Complete chain | Missing link | Red flag |
| Annual Review | Within 12 months | >11 months | Reminder |
| Breach Notification SLA | 60 days max | >30 days | Escalation |

**Verify current best practices with web search:**
Search the web: "HIPAA business associate agreement requirements {date}"
Search the web: "BAA management best practices healthcare SaaS {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-3 complete the PHI analysis, safeguard design, and BAA management.**

Present summary to user:
- PHI inventory and data flow coverage
- Safeguard implementation readiness
- BAA management procedures

Ask for confirmation before proceeding to HIPAA specification creation.

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

### [A] Analyse - BAA Analysis
- **A1**: Analyze current vendor BAA coverage gaps
- **A2**: Evaluate subcontractor chain completeness
- **A3**: Assess BAA termination procedure adequacy
- **A4**: Review BAA monitoring automation options

### [P] Propose - BAA Recommendations
- **P1**: Propose automated BAA renewal workflow
- **P2**: Suggest vendor risk scoring for BAA prioritization
- **P3**: Recommend subcontractor audit program
- **P4**: Propose tenant-specific BAA requirements approach

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 4 (Create HIPAA Spec) - load `step-04-c-create-hipaa-spec.md`
- **C2**: Return to workflow overview
- **C3**: Export current BAA management design

---

## Verification

- [ ] BAA requirements fully documented
- [ ] Lifecycle management workflow defined
- [ ] Subcontractor tracking designed
- [ ] Compliance dashboard specified
- [ ] Patterns align with pattern registry

## Outputs

- BAA requirements matrix
- BAA lifecycle management procedures
- Subcontractor tracking system design
- BAA compliance dashboard specification
- **Load template:** `{project-root}/_bmad/bam/templates/baa-management-template.md`

## Next Step

Proceed to `step-04-c-create-hipaa-spec.md` to create the comprehensive HIPAA compliance specification.
