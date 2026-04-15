# Step 5: Assembly

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

Assemble all backup/restore design components into a complete design document.

---

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-lifecycle-template.md`

---

## Actions

### 1. Document Assembly

Compile sections from previous steps:

| Section | Source | Content |
|---------|--------|---------|
| Backup Strategy | Step 1 | Isolation approach, backup types |
| Restore Procedures | Step 2 | Recovery methods, PITR |
| Verification | Step 3 | Testing, integrity checks |
| Scheduling | Step 4 | Schedules, retention, storage |

### 2. Cross-Reference Validation

Ensure consistency across sections:

| Check | Validation |
|-------|------------|
| RPO alignment | Schedule frequency matches RPO targets |
| RTO alignment | Restore procedures meet RTO targets |
| Tier consistency | All tiers covered in all sections |
| Storage mapping | Retention aligns with storage classes |

### 3. Dependency Documentation

| Dependency | Type | Description |
|------------|------|-------------|
| Tenant model | Required | Determines isolation approach |
| DR design | Recommended | Aligns with disaster recovery |
| Compliance | Required | Retention requirements |
| Infrastructure | Required | Storage and compute resources |

### 4. Implementation Roadmap

| Phase | Deliverable | Priority |
|-------|-------------|----------|
| Phase 1 | Basic backup/restore | P0 |
| Phase 2 | Tiered scheduling | P1 |
| Phase 3 | Cross-region replication | P1 |
| Phase 4 | Self-service restore | P2 |

### 5. Output Document Structure

```markdown
# Tenant Backup and Restore Design

## Overview
- Purpose and scope
- Tenant model alignment

## Backup Strategy
- Isolation approach
- Backup types
- Tenant-specific considerations

## Restore Procedures
- Full restore process
- Point-in-time recovery
- Cross-tenant isolation

## Verification
- Automated testing
- Integrity checks
- Recovery time validation

## Scheduling and Retention
- Backup schedules by tier
- Retention policies
- Storage tier mapping
- Geographic replication

## Compliance and Evidence
- Audit requirements
- Evidence retention
- Reporting

## Operational Runbook
- Standard procedures
- Incident response
- Troubleshooting
```

**Verify current best practices with web search:**
Search the web: "backup restore design documentation best practices {date}"
Search the web: "multi-tenant disaster recovery documentation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the assembly, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections for enhancement
- **P (Party Mode)**: Final review with all stakeholder perspectives
- **C (Continue)**: Accept design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save complete design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/operations/tenant-backup-restore.md`
- Create mode complete

---

## Verification

- [ ] All sections assembled
- [ ] Cross-references validated
- [ ] Dependencies documented
- [ ] Implementation roadmap defined
- [ ] Output document generated
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete backup/restore design document
- **Output to:** `{output_folder}/planning-artifacts/operations/tenant-backup-restore.md`

---

## Next Step

Create workflow complete. Backup and restore design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Backup and restore design is complete. The artifact is ready for validation or implementation.
