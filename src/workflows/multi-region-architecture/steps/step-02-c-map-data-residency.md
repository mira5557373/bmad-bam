# Step 2: Map Data Residency Requirements

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Map data residency requirements to regions based on regulatory compliance needs.

---

## Prerequisites

- Regional topology defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Map data residency requirements per jurisdiction:

---

## GDPR (European Union)

| Data Category | Residency Requirement | Allowed Regions | Transfer Rules |
|---------------|----------------------|-----------------|----------------|
| User PII | Must stay in EU | eu-west-1, eu-central-1 | SCCs for processor |
| Agent Conversations | Must stay in EU | eu-west-1, eu-central-1 | None |
| Usage Telemetry | Anonymized can transfer | Any | Anonymize before transfer |
| Billing Data | EU preferred | eu-west-1, us-east-1 | SCCs required |

GDPR Article references:
- Art. 44-49: International transfers
- Art. 17: Right to erasure
- Art. 20: Data portability

---

## US (SOC2, CCPA)

| Data Category | Residency Requirement | Allowed Regions | Compliance |
|---------------|----------------------|-----------------|------------|
| All Tenant Data | US preferred, flexible | us-east-1, us-west-2 | SOC2 Type II |
| California PII | Subject to CCPA | Any US | CCPA disclosure |
| Financial Data | US required | us-east-1 | PCI-DSS |

---

## APAC (Various)

| Jurisdiction | Data Category | Residency Requirement | Region |
|--------------|---------------|----------------------|--------|
| Singapore | Financial | Local | ap-southeast-1 |
| Japan | PII | Flexible with consent | ap-northeast-1 |
| Australia | Health | Local | ap-southeast-2 |

---

## Data Classification

| Classification | Definition | Residency Rule |
|----------------|------------|----------------|
| Tenant Core | Tenant config, users, settings | Tenant's home region only |
| Tenant Content | Agent conversations, documents | Tenant's home region only |
| Tenant Analytics | Usage metrics, performance | Anonymized can be global |
| Platform Data | Service configs, logs | Global with restrictions |

**Verify current best practices with web search:**
Search the web: "map data residency requirements best practices {date}"
Search the web: "map data residency requirements enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the data residency mapping above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into compliance requirements per jurisdiction
- **P (Party Mode)**: Bring analyst and architect perspectives for residency review
- **C (Continue)**: Accept data residency mapping and proceed to sync strategy
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass residency context: jurisdictions, data categories, transfer rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into data residency mapping
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data residency: {summary of jurisdictions and requirements}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save data residency mapping to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-cross-region-sync.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the regional planning and compliance phase.**

Present summary of:
- Regional topology defined
- Data residency requirements per jurisdiction
- Data classification scheme

Ask for confirmation before proceeding to cross-region sync design.

---

## Verification

- [ ] GDPR requirements mapped
- [ ] US compliance mapped
- [ ] APAC requirements documented
- [ ] Data classification defined
- [ ] Transfer rules specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Data residency compliance matrix
- Data classification scheme

---

## Next Step

Proceed to `step-03-c-design-cross-region-sync.md` to design cross-region synchronization.
