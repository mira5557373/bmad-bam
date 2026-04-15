# Step 1: Analyze Retention Requirements

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Analyze compliance and business requirements for data retention across the multi-tenant platform, identifying applicable regulations and data categories requiring retention policies.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- User requirements and constraints for data retention design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Applicable Regulations

| Regulation | Scope | Key Requirements | Impact on Retention |
|------------|-------|------------------|---------------------|
| GDPR | EU citizens | Right to erasure (Art 17), storage limitation (Art 5) | Must delete on request, minimize retention |
| CCPA | California residents | Right to deletion, disclosure of retention | 45-day response, disclose practices |
| HIPAA | Health data (US) | Minimum 6 years retention | Longer retention required |
| SOX | Financial records (US) | 7 years for audit trails | Cannot delete prematurely |
| PCI-DSS | Payment card data | 1 year minimum, secure deletion | Specific deletion requirements |

### 2. Categorize Data Types

| Data Category | Examples | Sensitivity | Tenant Scope |
|---------------|----------|-------------|--------------|
| User PII | Name, email, address | High | Per-tenant isolated |
| Authentication | Passwords, tokens, sessions | Critical | Per-tenant isolated |
| Transaction Records | Purchases, invoices, payments | High | Per-tenant isolated |
| Agent Execution | Agent logs, tool calls, outputs | Medium | Per-tenant isolated |
| Audit Trails | User actions, system events | High | Per-tenant + platform |
| Analytics | Usage metrics, aggregations | Low | Aggregated or per-tenant |
| Backups | System snapshots | Variable | Per-tenant isolated |

### 3. Determine Retention Drivers

| Driver Type | Description | Priority |
|-------------|-------------|----------|
| Legal Compliance | Regulatory mandates (GDPR, CCPA, etc.) | Highest |
| Contractual | Customer contract requirements | High |
| Business Need | Operational, analytics, support | Medium |
| Technical | Backup, disaster recovery | Medium |
| Cost Optimization | Storage cost management | Lower |

**Verify current best practices with web search:**
Search the web: "data retention policy SaaS {date}"
Search the web: "GDPR data retention requirements multi-tenant {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the retention requirements analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific regulations and data categories
- **P (Party Mode)**: Bring analyst and architect perspectives for requirements review
- **C (Continue)**: Accept requirements and proceed to retention policy design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass requirements context: regulations, data categories, drivers
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into requirements analysis
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review retention requirements: {summary of regulations and data categories}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save retention requirements to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-retention-policies.md`

---

## Verification

- [ ] Applicable regulations identified
- [ ] Data categories defined with sensitivity levels
- [ ] Retention drivers prioritized
- [ ] Tenant scope specified per category
- [ ] Patterns align with pattern registry

---

## Outputs

- Regulatory compliance matrix
- Data category catalog with sensitivity classification
- Retention driver priorities

---

## Next Step

Proceed to `step-02-c-design-retention-policies.md` to design specific retention policies per data category.
