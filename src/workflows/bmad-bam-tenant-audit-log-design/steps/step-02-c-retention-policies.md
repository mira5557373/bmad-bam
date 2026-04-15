# Step 2: Retention Policies

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Define comprehensive retention policies for audit logs based on regulatory requirements, business needs, and cost optimization while maintaining compliance.

---

## Prerequisites

- Step 1 completed: Audit schema design with event categories
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: retention

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Map Regulatory Requirements

Document retention requirements by compliance framework:

| Framework | Minimum Retention | Specific Requirements |
|-----------|-------------------|----------------------|
| SOC 2 | 7 years | Access controls, security events |
| GDPR | As needed + legal hold | Right to erasure considerations |
| HIPAA | 6 years | PHI access audit trail |
| PCI DSS | 1 year (3 months immediate) | Cardholder data access |
| ISO 27001 | Organization defined | Security event retention |
| CCPA | As needed | Consumer data access |
| FINRA | 6-7 years | Financial transaction records |
| SOX | 7 years | Financial control records |

### 2. Define Retention Tiers

Create tiered retention strategy:

| Tier | Description | Storage Type | Access Speed | Cost |
|------|-------------|--------------|--------------|------|
| Hot | 0-90 days | Primary database | Instant | $$$ |
| Warm | 91-365 days | Time-series DB | Fast (< 5s) | $$ |
| Cold | 1-3 years | Object storage | Moderate (< 30s) | $ |
| Archive | 3-7+ years | Deep archive | Slow (hours) | Minimal |
| Legal Hold | Indefinite | Isolated storage | On-demand | Variable |

### 3. Design Category-Specific Policies

Define retention by event category:

| Category | Hot | Warm | Cold | Archive | Total |
|----------|-----|------|------|---------|-------|
| Authentication | 90d | 275d | 2y | 4y | 7 years |
| Authorization | 90d | 275d | 2y | 4y | 7 years |
| Data Access | 30d | 335d | 2y | - | 3 years |
| Data Modification | 90d | 275d | 2y | 4y | 7 years |
| Administrative | 90d | 275d | 2y | 4y | 7 years |
| AI Agent Actions | 90d | 275d | 2y | 2y | 5 years |
| Billing/Metering | 90d | 275d | 2y | 4y | 7 years |
| Security Events | 90d | 275d | 2y | 4y | 7 years |

### 4. Define Tenant-Specific Overrides

Allow tenant-level customization:

| Tenant Tier | Base Policy | Custom Allowed | Max Extension |
|-------------|-------------|----------------|---------------|
| Free | Standard | No | - |
| Pro | Standard | Limited | +1 year |
| Enterprise | Standard | Yes | +5 years |
| Regulated | Extended | Yes | Unlimited |

**Tenant Override Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `tenant_id` | UUID | Tenant identifier |
| `event_category` | Enum | Category to override |
| `retention_days` | Integer | Custom retention period |
| `archive_days` | Integer | Archive threshold |
| `legal_hold` | Boolean | Legal hold flag |
| `effective_date` | Date | When policy takes effect |
| `expiry_date` | Date | When override expires |
| `approved_by` | UUID | Administrator approval |
| `justification` | Text | Business justification |

### 5. Design Lifecycle Automation

Define automated lifecycle management:

| Stage | Trigger | Action | Verification |
|-------|---------|--------|--------------|
| Ingestion | Event received | Write to hot storage | Acknowledgment |
| Hot-to-Warm | Age > 90 days | Migrate to time-series | Checksum validation |
| Warm-to-Cold | Age > 365 days | Compress and archive | Manifest update |
| Cold-to-Archive | Age > 3 years | Deep archive migration | Archive receipt |
| Deletion | Retention expired | Secure deletion | Audit of deletion |
| Legal Hold | Hold applied | Suspend deletion | Hold notification |

### 6. Define Deletion Procedures

Secure deletion requirements:

| Aspect | Requirement | Verification |
|--------|-------------|--------------|
| Pre-deletion audit | Log deletion intent | Manager approval for bulk |
| Cryptographic erasure | Key destruction option | Key destruction certificate |
| Physical deletion | Multi-pass overwrite | Deletion certificate |
| Backup purge | Remove from all backups | Backup manifest update |
| Replica sync | Propagate to all replicas | Replication confirmation |
| Audit of deletion | Log the deletion event | Separate deletion log |

**Verify current best practices with web search:**
Search the web: "audit log retention policy best practices {date}"
Search the web: "data lifecycle management multi-tenant {date}"
Search the web: "GDPR audit log retention requirements {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the retention policy design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific retention scenarios
- **P (Party Mode)**: Bring legal and compliance perspectives on retention
- **C (Continue)**: Accept policies and proceed to query patterns
- **[Specific refinements]**: Describe retention concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: retention tiers, lifecycle automation, deletion procedures
- Process enhanced insights on compliance coverage
- Ask user: "Accept these refined retention policies? (y/n)"
- If yes, integrate into retention design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit log retention policies for multi-tenant AI platform"
- Process legal counsel and compliance officer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save retention policies to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-query-patterns.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the audit architecture foundation.**

Present summary of:
- Audit schema with tenant isolation
- Retention policies by category and tier
- Lifecycle automation design

Ask for confirmation before proceeding to query patterns.

---

## Verification

- [ ] All regulatory requirements mapped
- [ ] Retention tiers defined with storage strategy
- [ ] Category-specific policies documented
- [ ] Tenant override capability designed
- [ ] Lifecycle automation specified
- [ ] Deletion procedures defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Regulatory retention mapping
- Tiered retention strategy
- Category-specific retention policies
- Tenant override schema
- Lifecycle automation design
- **Output to:** `{output_folder}/planning-artifacts/compliance/retention-policy.md`

---

## Next Step

Proceed to `step-03-c-query-patterns.md` to design audit query patterns.
