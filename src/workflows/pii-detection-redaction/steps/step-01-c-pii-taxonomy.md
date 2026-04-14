# Step 1: PII Taxonomy

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define the PII classification taxonomy including categories, sensitivity levels, jurisdiction-specific definitions, and context-aware classification rules for multi-tenant AI platforms.

---

## Prerequisites

- Agent runtime architecture document loaded
- AI runtime configuration (`{ai_runtime}`) resolved
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: ai-safety
- **Web research (if available):** Search for current PII classification best practices

---

## Inputs

- User requirements and constraints for privacy protection
- Agent runtime architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define PII Categories

Categorize PII by type and risk:

| Category | Examples | Sensitivity | Risk Level |
|----------|----------|-------------|------------|
| Direct Identifiers | SSN, passport, driver's license | Critical | Critical |
| Contact Information | Email, phone, address | High | High |
| Financial Data | Credit card, bank account, income | Critical | Critical |
| Health Information | Medical records, diagnoses, prescriptions | Critical | Critical |
| Biometric Data | Fingerprints, facial recognition, voice | Critical | Critical |
| Behavioral Data | Browsing history, preferences, location | Medium | Medium |
| Demographic Data | Age, gender, ethnicity | Medium | Low |

### 2. Define Sensitivity Levels

Establish sensitivity classification:

| Level | Definition | Handling Requirements |
|-------|------------|----------------------|
| CRITICAL | Can directly identify individual + cause significant harm | Encrypt at rest, mask in logs, strict access |
| HIGH | Can identify individual with other data | Encrypt at rest, redact in outputs |
| MEDIUM | Indirectly identifiable, limited harm potential | Anonymize in analytics, redact on export |
| LOW | Minimal identification risk | Standard protection, no special handling |

### 3. Map Jurisdiction-Specific Definitions

Define PII by regulatory framework:

| Jurisdiction | Framework | Additional PII Categories |
|--------------|-----------|---------------------------|
| EU/EEA | GDPR | Genetic data, political opinions, trade union membership |
| California | CCPA/CPRA | Inferences, geolocation, professional information |
| Healthcare | HIPAA | PHI (Protected Health Information) |
| Financial | PCI-DSS | Cardholder data, authentication data |
| Children | COPPA | Parental consent required data |

### 4. Design Context-Aware Classification

Define context-sensitive rules:

| Context | Classification Adjustment | Example |
|---------|---------------------------|---------|
| AI Training | Elevate all PII to HIGH+ | User queries in training data |
| Analytics | Allow aggregated/anonymized | Cohort-level metrics |
| Debugging | Mask PII, retain structure | Logs with [REDACTED] |
| Export/API | Apply strictest applicable rules | Data portability requests |
| Cross-Tenant | Block all PII transfer | Shared model training |

**Verify current best practices with web search:**
Search the web: "PII classification taxonomy best practices {date}"
Search the web: "GDPR CCPA PII definition comparison {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the PII taxonomy analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific PII categories or jurisdictions
- **P (Party Mode)**: Bring privacy and compliance perspectives on taxonomy
- **C (Continue)**: Accept PII taxonomy design and proceed to detection methods
- **[Specific refinements]**: Describe PII taxonomy concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: PII categories, sensitivity levels, jurisdictions
- Process enhanced insights on privacy classification trade-offs
- Ask user: "Accept these refined PII taxonomy decisions? (y/n)"
- If yes, integrate into PII taxonomy specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review PII taxonomy design for multi-tenant AI platform compliance"
- Process privacy and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save PII taxonomy design to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-detection-methods.md`

---

## Verification

- [ ] PII categories defined
- [ ] Sensitivity levels established
- [ ] Jurisdiction mappings documented
- [ ] Context-aware rules specified
- [ ] Patterns align with pattern registry

---

## Outputs

- PII category taxonomy
- Sensitivity level definitions
- Jurisdiction mapping table
- Context-aware classification rules

---

## Next Step

Proceed to `step-02-c-detection-methods.md` to design detection methods.
