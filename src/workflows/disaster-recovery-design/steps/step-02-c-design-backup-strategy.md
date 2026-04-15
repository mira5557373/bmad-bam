# Step 2: Design Backup Strategy

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

Design a comprehensive backup strategy for each tenant tier, including backup types, frequency, retention policies, storage locations, and verification procedures.

## Prerequisites

- RTO/RPO objectives defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Backup Types per Tier

Using backup patterns from knowledge, define backup methods:

| Tier | Primary Method | Secondary Method | CDC Enabled |
|------|---------------|------------------|-------------|
| Free | Daily incremental + weekly full | None | No |
| Pro | 4-hour incremental + daily full | WAL archiving | No |
| Enterprise | Continuous CDC + hourly snapshots | WAL streaming | Yes |

### 2. Configure Backup Frequency

Define backup schedules aligned with RPO:

**Free Tier:**
| Backup Type | Frequency | Retention | Storage Class |
|-------------|-----------|-----------|---------------|
| Full | Weekly (Sunday 02:00 UTC) | 7 days | S3 Standard-IA |
| Incremental | Daily (02:00 UTC) | 7 days | S3 Standard-IA |

**Pro Tier:**
| Backup Type | Frequency | Retention | Storage Class |
|-------------|-----------|-----------|---------------|
| Full | Daily (02:00 UTC) | 30 days | S3 Standard |
| Incremental | Every 4 hours | 30 days | S3 Standard |
| WAL Archive | Continuous | 30 days | S3 Standard |
| Monthly Archive | 1st of month | 12 months | S3 Glacier |

**Enterprise Tier:**
| Backup Type | Frequency | Retention | Storage Class |
|-------------|-----------|-----------|---------------|
| Snapshot | Hourly | 365 days | S3 Standard |
| CDC Stream | Continuous | 365 days | S3 Standard |
| Air-gapped | Daily | 7 years | Offline vault |

### 3. Design Storage Locations

Define storage architecture per tier:

| Tier | Primary Region | Secondary Region | Air-gapped |
|------|---------------|------------------|------------|
| Free | Single region | None | No |
| Pro | Primary + CRR | Cross-region replica | No |
| Enterprise | Multi-region active | 3 regions | Yes |

Storage encryption requirements:
| Tier | Encryption | Key Management |
|------|------------|----------------|
| Free | AES-256 at rest | AWS managed keys |
| Pro | AES-256 at rest | Customer-managed optional |
| Enterprise | AES-256 + in-transit | Customer HSM required |

### 4. Define Data Types Coverage

Map backup strategy to all data types:

| Data Type | Backup Method | Tier Coverage | Special Handling |
|-----------|--------------|---------------|------------------|
| PostgreSQL | pg_basebackup + WAL | All | RLS-aware restore |
| Redis | RDB snapshots | Pro/Enterprise | Key prefix isolation |
| Qdrant vectors | Collection snapshots | Pro/Enterprise | Tenant namespace |
| S3 objects | Cross-region replication | Pro/Enterprise | Tenant prefix paths |
| Agent memory | Mem0 export | Pro/Enterprise | Tenant-scoped |

### 5. Plan Backup Verification

Define verification procedures per tier:

| Tier | Verification Method | Frequency | Automated |
|------|---------------------|-----------|-----------|
| Free | Row count validation | Weekly | Yes |
| Pro | Restore test to staging | Daily | Yes |
| Enterprise | Full restore + checksum | Hourly | Yes |

Verification checks:
- [ ] Backup file integrity (checksum)
- [ ] Row count comparison
- [ ] Referential integrity
- [ ] Tenant isolation verification
- [ ] Recovery time measurement

### 6. Define Retention Policies

Document retention requirements:

| Tier | Hot Storage | Warm Storage | Cold Archive |
|------|-------------|--------------|--------------|
| Free | 7 days | None | None |
| Pro | 30 days | 12 months | None |
| Enterprise | 365 days | 3 years | 7 years |

Compliance considerations:
- GDPR data deletion requirements
- Industry-specific retention mandates
- Audit trail preservation
- Legal hold capabilities

**Verify current best practices with web search:**
Search the web: "design backup strategy best practices {date}"
Search the web: "design backup strategy enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze Options
- **A1**: Review backup types against RPO requirements for each tier
- **A2**: Analyze storage cost implications across tiers
- **A3**: Evaluate encryption and key management approach
- **A4**: Assess data type coverage completeness
- **A5**: Review verification procedure effectiveness

### [P]ropose Changes
- **P1**: Propose backup frequency adjustments to meet RPO targets
- **P2**: Suggest storage architecture modifications for cost optimization
- **P3**: Recommend encryption upgrades for compliance
- **P4**: Propose additional data types for backup coverage
- **P5**: Suggest enhanced verification procedures

### [C]ontinue
- **C1**: Accept current backup strategy and proceed to failover design
- **C2**: Mark step complete and load `step-03-c-design-failover.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Soft Gate Checkpoint

**Steps 1-2 complete the backup strategy design.**

Present summary of:
- Backup types and frequency by tier
- Storage locations and encryption approach
- Data type coverage and verification procedures

Ask for confirmation before proceeding to failover design.

---

## Verification

- [ ] Backup types defined for all tiers
- [ ] Frequency aligns with RPO objectives
- [ ] Retention policies documented
- [ ] Storage locations and encryption defined
- [ ] All data types covered
- [ ] Verification procedures established
- [ ] Patterns align with pattern registry

## Outputs

- Backup strategy matrix by tier
- Storage architecture documentation
- Data type coverage mapping
- Verification procedure runbook
- **Load template:** `{project-root}/_bmad/bam/data/templates/disaster-recovery-plan-template.md`

## Next Step

Proceed to `step-03-c-design-failover.md` to design cross-region failover procedures.
