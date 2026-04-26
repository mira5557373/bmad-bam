# Step 01: Initialize Compliance Design (Create Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📖 Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current compliance requirements

---

## Purpose

Initialize compliance design by loading compliance frameworks and identifying applicable regulatory requirements for the multi-tenant SaaS platform.

---

## Prerequisites

- Master architecture defined (QG-F1 passed)
- Tenant model selected: `{tenant_model}`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` (all frameworks)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`

**Web Research (Required):**

Search the web: "multi-tenant SaaS compliance requirements {date}"
Search the web: "GDPR SOC2 HIPAA PCI-DSS SaaS architecture {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Load Compliance Frameworks

Load and present the compliance frameworks from `compliance-frameworks.csv`:

| Framework | Category | Tenant Model Fit | Control Count | Audit Frequency |
|-----------|----------|------------------|---------------|-----------------|
| SOC2 | security | all | 64+ trust criteria | Annual Type II |
| GDPR | privacy | all | 99 articles | Continuous |
| HIPAA | healthcare | schema/database | 54 standards | Annual risk assessment |
| PCI-DSS | payment | schema/database | 250+ sub-requirements | Quarterly + annual |
| ISO27001 | security | all | 93 Annex A controls | Annual surveillance |
| EU-AI-Act | ai | all | 85 articles | Pre-market + continuous |

### 2. Gather Compliance Requirements

Collect user input on applicable frameworks:

| Question | Input Required |
|----------|----------------|
| Geographic regions served? | (EU, US, APAC, etc.) |
| Industry verticals? | (Healthcare, Finance, Government, etc.) |
| Data types processed? | (PII, PHI, Payment, etc.) |
| AI/ML features included? | (Yes/No) |
| Enterprise customers expected? | (Yes/No) |

### 3. Identify Applicable Frameworks

Based on user input, map requirements to frameworks:

| Region/Industry | Primary Framework | Secondary Frameworks |
|-----------------|-------------------|----------------------|
| EU customers | GDPR | NIS2, DORA (financial) |
| US healthcare | HIPAA | SOC2, CCPA |
| US government | FedRAMP | NIST 800-53, CMMC |
| Payment processing | PCI-DSS | SOC2 |
| AI features | EU-AI-Act | ISO42001 |
| Enterprise B2B | SOC2 | ISO27001 |

### 4. Assess Tenant Model Compliance Fit

Evaluate selected tenant model (`{tenant_model}`) against framework requirements:

| Tenant Model | SOC2 | GDPR | HIPAA | PCI-DSS | Notes |
|--------------|------|------|-------|---------|-------|
| row-level-security | :white_check_mark: | :white_check_mark: | ⚠️ | ⚠️ | May need additional controls |
| schema-per-tenant | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | Strong isolation |
| database-per-tenant | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | Maximum isolation |

---

## Verification

- [ ] Compliance frameworks loaded from CSV
- [ ] User requirements gathered
- [ ] Applicable frameworks identified
- [ ] Tenant model compatibility assessed
- [ ] Web research citations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Applicable compliance framework list with priorities
- Tenant model compliance assessment
- Data classification requirements
- Initial compliance gap analysis

---

## Next Step

Proceed to `step-02-c-analyze.md` with identified compliance frameworks.
