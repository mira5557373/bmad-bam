# Step 3: Design Verification

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

Design backup validation and restore testing procedures.

---

## Prerequisites

- Step 2 completed (Restore procedures defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: disaster-recovery`

---

## Actions

### 1. Automated Restore Testing

| Test Type | Frequency | Scope | Validation |
|-----------|-----------|-------|------------|
| Full restore | Monthly | Random tenant | Complete data |
| Incremental | Weekly | All tenants | Integrity check |
| Point-in-time | Weekly | Sample tenants | Time accuracy |
| Cross-region | Quarterly | DR failover | Full recovery |

### 2. Data Integrity Checks

| Check | Method | Threshold |
|-------|--------|-----------|
| Row count | Source vs backup | Exact match |
| Checksum | MD5/SHA256 | Exact match |
| Referential | FK validation | No orphans |
| Application | Business rules | Pass all |

### 3. Recovery Time Verification

| Metric | Target | Measurement |
|--------|--------|-------------|
| Backup duration | < 1 hour | Start to complete |
| Restore duration | < RTO | Initiate to available |
| Verification | < 15 min | Post-restore checks |
| Cutover | < 5 min | Switch traffic |

### 4. Compliance Evidence

| Requirement | Evidence | Retention |
|-------------|----------|-----------|
| SOC 2 | Backup logs, test results | 1 year |
| HIPAA | Encryption verification | 7 years |
| GDPR | Data location proof | Per request |
| ISO 27001 | Restore test reports | 3 years |

### 5. Runbook Creation

Document operational procedures:

- Backup monitoring and alerting
- Restore initiation process
- Escalation procedures
- Communication templates

**Verify current best practices with web search:**
Search the web: "backup verification best practices {date}"
Search the web: "disaster recovery testing automation {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the verification design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into compliance requirements
- **P (Party Mode)**: Bring operations and compliance perspectives for review
- **C (Continue)**: Accept verification design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save verification design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-backup-scheduling.md`

---

## Verification

- [ ] Automated testing schedule defined
- [ ] Integrity checks specified
- [ ] Recovery time targets set
- [ ] Compliance evidence documented
- [ ] Runbook created
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete backup/restore design
- Test schedule
- Compliance evidence matrix
- Operational runbook

---

## Next Step

Proceed to `step-04-c-backup-scheduling.md` to design backup schedules and retention policies.
