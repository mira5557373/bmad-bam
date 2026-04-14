# Step 2: Design Retention Policies

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

Design specific retention policies for each data category, defining retention periods, legal basis, and actions at expiry.

---

## Prerequisites

- Retention requirements analyzed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Retention Periods Per Category

| Data Category | Default Retention | Configurable | Legal Basis | Minimum | Maximum |
|---------------|-------------------|--------------|-------------|---------|---------|
| User PII | Account lifetime + 30 days | Yes (per tenant) | Consent/Contract | 30 days post-deletion | 7 years |
| Authentication | Session lifetime | No | Security | Immediate | 90 days |
| Transaction Records | 7 years | No | Legal obligation | 7 years | 10 years |
| Agent Execution Logs | 90 days | Yes (per tier) | Legitimate interest | 7 days | 1 year |
| Audit Trails | 10 years | No | Compliance | 7 years | Indefinite |
| Analytics (Raw) | 90 days | Yes | Legitimate interest | 30 days | 1 year |
| Analytics (Aggregated) | Indefinite | Yes | Legitimate interest | 1 year | Indefinite |
| Backups | 30 days | Yes (per tier) | Disaster recovery | 7 days | 90 days |

### 2. Define Expiry Actions

| Data Category | Primary Action | Secondary Action | Notification |
|---------------|----------------|------------------|--------------|
| User PII | Archive to cold storage | Delete after archive period | Admin notification |
| Authentication | Hard delete | N/A | None |
| Transaction Records | Archive to cold storage | Retain indefinitely | None |
| Agent Execution Logs | Archive then delete | Generate summary before delete | None |
| Audit Trails | Archive to compliance storage | Retain indefinitely | None |
| Analytics (Raw) | Aggregate then delete | Retain aggregates | None |
| Backups | Rotate and delete | N/A | Admin notification |

### 3. Define Tenant-Specific Overrides

| Override Type | Allowed By | Scope | Constraints |
|---------------|------------|-------|-------------|
| Extended Retention | Enterprise tier | Per data category | Cannot exceed maximum |
| Shortened Retention | All tiers | User PII only | Cannot go below minimum |
| Immediate Deletion | All tiers | User request (GDPR) | Must honor within 30 days |
| Regulatory Extension | Compliance | All categories | Legal hold override |

### 4. Define Legal Hold Procedures

| Trigger | Scope | Duration | Override Behavior |
|---------|-------|----------|-------------------|
| Litigation Hold | Specified data ranges | Until released | Prevents all deletion |
| Regulatory Investigation | Tenant or platform | Until released | Prevents all deletion |
| Audit Request | Specified audit scope | 90 days default | Prevents archival |
| Customer Request | Per-tenant data | As specified | Custom handling |

**Verify current best practices with web search:**
Search the web: "data retention policy best practices SaaS {date}"
Search the web: "GDPR retention periods data categories {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the retention policies above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific retention periods and legal basis
- **P (Party Mode)**: Bring analyst and architect perspectives for policy review
- **C (Continue)**: Accept policies and proceed to archival rules design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass policy context: retention periods, expiry actions, overrides
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into retention policies
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review retention policies: {summary of periods and actions}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save retention policies to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-archival-rules.md`

---

## Verification

- [ ] Retention periods defined for all data categories
- [ ] Legal basis documented for each policy
- [ ] Expiry actions specified
- [ ] Tenant override rules defined
- [ ] Legal hold procedures documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Retention policy matrix
- Expiry action catalog
- Tenant override rules
- **Load template:** `{project-root}/_bmad/bam/templates/data-retention-template.md`

---

## Next Step

Proceed to `step-03-c-configure-archival-rules.md` to configure automated archival rules.
