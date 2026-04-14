# Step 2: Design Data Retention

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

Define data retention policies for tenant offboarding and GDPR compliance.

---

## Prerequisites

- Deprovisioning stages defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: disaster-recovery`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define data retention policies for tenant offboarding:

---

## Data Classification for Retention

| Data Category | Retention Requirement | Deletion Method |
|---------------|----------------------|-----------------|
| Tenant Profile | Until hard delete | Cascade delete |
| User Accounts | Until hard delete | Soft delete, then purge |
| Agent Configurations | Until hard delete | Cascade delete |
| Conversation History | Per tier policy | Batch purge |
| Vector Embeddings | Until hard delete | Namespace delete |
| File Storage | Until hard delete | Recursive delete |
| Audit Logs | Regulatory minimum (7 years) | Archive, then purge |
| Billing Records | Regulatory minimum (7 years) | Archive only |
| Analytics Data | Until hard delete | Partition drop |

---

## GDPR Compliance Requirements

### Right to Data Export
- Generate complete data export before deletion
- Include: user data, conversations, files, configurations
- Format: machine-readable (JSON/CSV archive)
- Delivery: secure download link (24h expiry)
- Notification: email confirmation with download link

### Right to be Forgotten
- Delete all personal data upon request
- Anonymize data that must be retained for analytics
- Provide deletion certificate
- Document deletion in compliance log

---

## Retention Policy Configuration

```yaml
retention_policies:
  tenant_data:
    soft_delete_period:
      FREE: 30_days
      PRO: 90_days
      ENTERPRISE: custom
    
  compliance_data:
    audit_logs: 7_years
    billing_records: 7_years
    deletion_certificates: 10_years
    
  anonymization_rules:
    - field: email → hash
    - field: name → "deleted_user_{id}"
    - field: ip_address → null
```

---

## Data Export Package Structure

```
tenant_export_{tenant_id}_{date}/
  manifest.json           # Export metadata
  users/                  # User profiles and settings
  agents/                 # Agent configurations
  conversations/          # Conversation histories
  files/                  # Uploaded files
  integrations/           # Integration configurations
  analytics_summary.json  # Aggregated analytics
```

**Verify current best practices with web search:**
Search the web: "tenant data retention tenant lifecycle {date}"
Search the web: "GDPR data retention multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the data retention design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into retention requirements and compliance edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for retention review
- **C (Continue)**: Accept data retention design and proceed to active resource handling
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass retention context: policies, GDPR requirements, export structure
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into data retention design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data retention design: {summary of policies and compliance}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save data retention design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-handle-active-resources.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the deprovisioning foundation design.**

Present summary of:
- Deprovisioning stage definitions and workflows
- Data retention policies with GDPR compliance
- Export package structure and anonymization rules

Ask for confirmation before proceeding to active resource handling.

---

## Verification

- [ ] Data classification complete
- [ ] GDPR compliance requirements documented
- [ ] Retention policy configuration defined
- [ ] Export package structure specified
- [ ] Anonymization rules established
- [ ] Patterns align with pattern registry

---

## Outputs

- Data retention policy
- GDPR compliance documentation
- Export package specification

---

## Next Step

Proceed to `step-03-c-handle-active-resources.md` to define resource handling.
