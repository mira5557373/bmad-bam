# Step 6: Backup and Recovery

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

Design comprehensive backup and disaster recovery strategies for vector storage including incremental backups, point-in-time recovery, and cross-region replication.

---

## Prerequisites

- Steps 1-5 completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: disaster-recovery
- **Web research (if available):** Search for vector database backup strategies

---

## Inputs

- Architecture decisions from previous steps
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define RPO/RTO Requirements

| Tier | RPO (Data Loss) | RTO (Downtime) | Backup Frequency |
|------|-----------------|----------------|------------------|
| Free | 24 hours | 4 hours | Daily |
| Pro | 4 hours | 1 hour | 4x daily |
| Enterprise | 15 minutes | 15 minutes | Continuous |

### 2. Design Backup Strategy

| Backup Type | Frequency | Retention | Storage |
|-------------|-----------|-----------|---------|
| Full index snapshot | Weekly | 4 weeks | S3/GCS |
| Incremental | Daily | 2 weeks | S3/GCS |
| Transaction log | Continuous | 7 days | Local + S3 |

### 3. Configure Cross-Region Replication

| Region Pair | Replication Mode | Failover Time | Use Case |
|-------------|------------------|---------------|----------|
| Primary-Secondary | Async | 5-15 min | Cost-effective DR |
| Active-Active | Sync | <1 min | High availability |
| Multi-region | Async | 15-30 min | Global presence |

### 4. Design Tenant-Specific Restore

| Scenario | Procedure | Time Estimate |
|----------|-----------|---------------|
| Single tenant rollback | Namespace restore from snapshot | 15-30 min |
| Tenant data export | Export to portable format | Variable |
| Partial vector restore | Selective index rebuild | 30-60 min |

### 5. Document Recovery Procedures

| Scenario | Detection | Response | Recovery |
|----------|-----------|----------|----------|
| Index corruption | Checksum mismatch | Failover to replica | Rebuild from snapshot |
| Region failure | Health check failure | DNS failover | Promote secondary |
| Data deletion (accidental) | Audit log alert | Pause writes | Point-in-time restore |

**Verify current best practices with web search:**
Search the web: "vector database backup recovery strategies {date}"
Search the web: "multi-region vector database replication {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the backup analysis above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into RPO/RTO trade-offs and recovery procedures
- **P (Party Mode)**: Bring SRE and compliance perspectives on backup strategy
- **C (Continue)**: Accept backup design and proceed to monitoring
- **[Specific refinements]**: Describe backup concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: RPO/RTO requirements, backup strategy, replication design
- Process enhanced insights on recovery planning
- Ask user: "Accept these refined backup decisions? (y/n)"
- If yes, integrate into backup specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review vector database backup and DR strategy for compliance"
- Process SRE and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save backup strategy to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Proceed to next step: `step-07-c-monitoring.md`

---

## Verification

- [ ] RPO/RTO requirements defined per tier
- [ ] Backup schedule and retention configured
- [ ] Cross-region replication designed
- [ ] Tenant-specific restore procedures documented
- [ ] Recovery procedures tested (or test plan created)
- [ ] Patterns align with pattern registry

---

## Outputs

- Backup strategy specification
- RPO/RTO matrix
- Cross-region replication design
- Recovery procedures runbook

---

## Next Step

Proceed to `step-07-c-monitoring.md` to define monitoring requirements.
