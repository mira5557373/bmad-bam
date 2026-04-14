# Step 4: Design Deletion Procedures

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

Design secure deletion procedures including soft delete, hard delete, cascade deletion, and cryptographic erasure to ensure compliant and complete data removal.

---

## Prerequisites

- Archival rules configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Deletion Types

| Deletion Type | Description | Reversibility | Use Case |
|---------------|-------------|---------------|----------|
| Soft Delete | Mark as deleted, retain data | Reversible (grace period) | User deletion requests |
| Hard Delete | Remove from database | Irreversible | Post-grace period |
| Cascade Delete | Delete related records | Irreversible | Parent entity deletion |
| Cryptographic Erasure | Destroy encryption keys | Irreversible | Encrypted data destruction |
| Anonymization | Remove identifying data | Irreversible | Analytics preservation |

### 2. Design Soft Delete Procedure

| Phase | Action | Duration | Trigger |
|-------|--------|----------|---------|
| Request | Mark record with `deleted_at` timestamp | Immediate | User or admin request |
| Grace Period | Data retained but hidden from queries | 30 days default | Automatic |
| Recovery | Clear `deleted_at` if recovery requested | During grace period | User request |
| Escalation | Transition to hard delete | After grace period | Automatic |

Soft delete data handling:
- Exclude from standard queries (WHERE deleted_at IS NULL)
- Include in admin/recovery queries
- Exclude from backups after grace period
- Maintain audit trail of deletion request

### 3. Design Hard Delete Procedure

| Step | Action | Verification | Audit |
|------|--------|--------------|-------|
| Pre-check | Verify no legal hold | Query legal hold table | Log check result |
| Cascade Scan | Identify dependent records | Generate deletion manifest | Log manifest |
| Backup Exclusion | Mark for backup exclusion | Verify backup job config | Log exclusion |
| Primary Deletion | DELETE from primary tables | Verify row count = 0 | Log deletion |
| Index Cleanup | Remove from search indices | Verify index clean | Log cleanup |
| Cache Invalidation | Purge from all caches | Verify cache miss | Log invalidation |
| Archive Cleanup | Remove from archive storage | Verify storage removal | Log archive cleanup |
| Certificate | Generate deletion certificate | Hash of deleted data | Store certificate |

### 4. Design Cascade Deletion Rules

| Parent Entity | Cascade Targets | Deletion Order | Orphan Handling |
|---------------|-----------------|----------------|-----------------|
| Tenant | All tenant data | Children first, parent last | N/A |
| User | User PII, sessions, preferences | Children first | Reassign to admin |
| Agent | Agent logs, tool calls, memories | Children first | Archive then delete |
| Conversation | Messages, attachments | All together | N/A |
| Project | Documents, artifacts | Children first | Orphan error |

### 5. Design Cryptographic Erasure

| Scenario | Key Action | Data Action | Verification |
|----------|------------|-------------|--------------|
| Tenant Offboarding | Destroy tenant KEK | Data becomes unreadable | Verify decryption fails |
| User Deletion | Destroy user DEK | User-specific data unreadable | Verify decryption fails |
| Compliance Request | Destroy specific keys | Targeted data unreadable | Certificate generation |
| Key Rotation | Destroy old key version | Old data versions unreadable | Verify new key works |

Cryptographic erasure benefits:
- Faster than scanning all data locations
- Covers data in backups and archives
- Provides mathematical guarantee of deletion
- Audit-friendly with key destruction logs

### 6. Design GDPR/CCPA Deletion Workflow

| Step | Timeline | Action | Documentation |
|------|----------|--------|---------------|
| Request Receipt | Day 0 | Log request, verify identity | Request ticket |
| Scope Determination | Day 0-5 | Identify all data locations | Data inventory |
| Legal Hold Check | Day 5-7 | Verify no holds apply | Legal clearance |
| Execution | Day 7-25 | Execute deletion per procedures | Deletion logs |
| Verification | Day 25-28 | Verify complete deletion | Verification report |
| Certificate | Day 28-30 | Generate deletion certificate | Certificate to requester |
| Response | Day 30 max | Confirm completion to requester | Response record |

**Verify current best practices with web search:**
Search the web: "GDPR data deletion multi-tenant {date}"
Search the web: "cryptographic erasure patterns data deletion {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-4 complete the retention and deletion design.**

Present summary of:
- Retention policies with periods and expiry actions
- Archival rules with storage tiers and transitions
- Deletion procedures with soft/hard delete flows
- GDPR/CCPA compliance workflow

Ask for confirmation before proceeding to compliance reporting design.

---

## COLLABORATION MENUS (A/P/C):

After completing the deletion procedures above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into deletion types and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for deletion review
- **C (Continue)**: Accept deletion procedures and proceed to compliance reporting
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass deletion context: types, procedures, cascade rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into deletion procedures
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review deletion procedures: {summary of types and workflows}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save deletion procedures to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-design-compliance-reporting.md`

---

## Verification

- [ ] All deletion types defined with reversibility
- [ ] Soft delete grace period configured
- [ ] Hard delete procedure with verification steps
- [ ] Cascade deletion rules documented
- [ ] Cryptographic erasure procedures defined
- [ ] GDPR/CCPA deletion workflow specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Deletion type definitions
- Soft delete procedure
- Hard delete runbook
- Cascade deletion rules
- Cryptographic erasure procedures
- GDPR/CCPA deletion workflow

---

## Next Step

Proceed to `step-05-c-design-compliance-reporting.md` to design compliance audit and reporting.
