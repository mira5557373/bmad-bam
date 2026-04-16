# Step 5: Compliance Mapping

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

Map regulatory compliance requirements to the tenant data model, ensuring the architecture supports GDPR, CCPA, and other data protection regulations. This step produces actionable implementation requirements for data export, deletion, audit trails, and data residency.

---

## Prerequisites

- Sharing rules complete (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: data-residency`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

1. **GDPR Data Export Requirements Per Tenant**
   - Define data portability scope (what data must be exportable)
   - Specify export formats (JSON, CSV, machine-readable standards)
   - Document export API requirements and rate limits
   - Establish SLA for export request fulfillment (typically 30 days)
   - Design tenant-scoped export that excludes other tenants' data

2. **Data Deletion Requirements (Right to be Forgotten)**
   - Identify all data stores containing tenant/user data
   - Define hard delete vs. soft delete policies per data type
   - Document cascade deletion rules across related entities
   - Specify retention exceptions (legal holds, regulatory requirements)
   - Design verification process to confirm complete deletion
   - Address deletion in backups and replicas

3. **Audit Trail Requirements**
   - Define audit event taxonomy (create, read, update, delete, access)
   - Specify retention period for audit logs (typically 7 years for financial)
   - Design tamper-evident audit log storage
   - Document audit log access controls and query capabilities
   - Ensure audit logs themselves are tenant-isolated

4. **Data Residency Considerations**
   - Map tenant jurisdictions to required data storage regions
   - Define region-locked data vs. globally replicable data
   - Document cross-border data transfer mechanisms (SCCs, BCRs)
   - Design tenant configuration for residency preferences

**Verify current best practices with web search:**
Search the web: "compliance mapping best practices {date}"
Search the web: "compliance mapping enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the compliance mapping above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into compliance requirements and regional variations
- **P (Party Mode)**: Bring analyst and architect perspectives for compliance review
- **C (Continue)**: Accept compliance mapping and finalize tenant model isolation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass compliance context: GDPR, data deletion, audit, residency requirements
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into compliance mapping
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance mapping: {summary of requirements and implementation}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save compliance mapping to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final tenant model isolation documentation

---

## Verification

- [ ] All regulations mapped to implementation requirements
- [ ] Data export scope and format defined
- [ ] Deletion workflow with cascade rules documented
- [ ] Audit trail schema and retention defined
- [ ] Data residency configuration documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Compliance requirements matrix by regulation
- Data export API specification
- Deletion workflow documentation
- Audit schema and retention policies
- Data residency configuration guide
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-lifecycle-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/isolation-test-template.md`

---

---

## Quality Gate: QG-S7 Data Protection Gate

This workflow is the entry workflow for QG-S7. Ensure the following patterns are addressed:

| QG-S7 Pattern | Addressed In | Status |
|---------------|--------------|--------|
| `classification_implemented` | Step 2 - Isolation Matrix | Data sensitivity levels |
| `dlp_policies_active` | Step 4 - Sharing Rules | Cross-tenant DLP policies |
| `encryption_verified` | Step 2 - Isolation Matrix | Encryption requirements |
| `access_logging_active` | Step 5 - Audit Trail | Access logging design |
| `retention_enforced` | Step 5 - Data Deletion | Retention requirements |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7`

---

## Next Step

Submit tenant model for validation via `validate-module` with tenant isolation checklist and QG-S7 verification.
