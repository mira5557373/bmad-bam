# Step 1: Define Exportable Data Categories

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

Define all data categories subject to GDPR Article 20 data portability export.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---


## Inputs

- User requirements and constraints for tenant data export
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

Define exportable data categories per GDPR Article 20:

---

## GDPR Article 20 Requirements

Data portability applies to:
- Personal data provided by the data subject
- Processed based on consent or contract
- Carried out by automated means

---

## User Data Category

| Data Type | Description | Source | Format |
|-----------|-------------|--------|--------|
| Profile | Name, email, avatar, timezone | users table | JSON |
| Preferences | Notification settings, theme | user_preferences | JSON |
| Sessions | Login history (anonymized) | sessions | CSV |
| API Keys | Key metadata (not secrets) | api_keys | JSON |

---

## Content Data Category

| Data Type | Description | Source | Format |
|-----------|-------------|--------|--------|
| Conversations | Agent chat history | conversations | JSON |
| Documents | Uploaded files | S3/storage | Files |
| Agent Configs | User-created agent definitions | agents | JSON |
| Workflows | Custom workflow definitions | workflows | JSON |
| Embeddings | Vector embedding metadata | vector_store | JSON |

---

## Configuration Data Category

| Data Type | Description | Source | Format |
|-----------|-------------|--------|--------|
| Workspace Settings | Workspace configuration | workspaces | JSON |
| Integration Configs | Webhook URLs, OAuth apps | integrations | JSON |
| Security Settings | MFA, password policies | security_settings | JSON |
| Custom Fields | User-defined metadata | custom_fields | JSON |

---

## Activity Data Category

| Data Type | Description | Source | Format |
|-----------|-------------|--------|--------|
| Audit Logs | User actions | audit_logs | CSV |
| Usage Metrics | API calls, agent runs | usage_events | CSV |
| Billing History | Invoice data | billing | CSV |

---

## Excluded Data

Data NOT subject to portability (GDPR Art. 20 exemptions):

| Data Type | Reason for Exclusion |
|-----------|---------------------|
| System Logs | Not provided by user |
| Internal Analytics | Platform-generated insights |
| Other Users' Data | Third-party privacy |
| Derived Data | AI-generated content not from user |

**Verify current best practices with web search:**
Search the web: "GDPR data portability tenant lifecycle {date}"
Search the web: "data export categories multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the data categories above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into data classification edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for data review
- **C (Continue)**: Accept data categories and proceed to export formats
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass category context: user, content, config, activity data
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into data categories
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review exportable data: {summary of categories and exclusions}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save data categories to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-design-export-formats.md`

---

## Verification

- [ ] User data category defined
- [ ] Content data category defined
- [ ] Configuration data category defined
- [ ] Activity data category defined
- [ ] Exclusions documented with justification
- [ ] GDPR Art. 20 requirements met
- [ ] Patterns align with pattern registry

---

## Outputs

- Exportable data inventory
- Data category classification

---

## Next Step

Proceed to `step-02-c-design-export-formats.md` to design export formats.
