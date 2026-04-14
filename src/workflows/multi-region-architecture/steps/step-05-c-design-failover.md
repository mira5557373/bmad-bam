# Step 5: Design Failover Strategy

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

Design cross-region failover strategy including triggers, RTO/RPO targets, and recovery procedures.

---

## Prerequisites

- Regional routing design completed (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Design cross-region failover:

---

## Failover Architecture

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Active-Passive | Standby region, manual/auto failover | Standard DR |
| Active-Active | Both regions serving traffic | High availability |
| Pilot Light | Minimal standby, scale on failover | Cost optimization |

**Recommended:** Active-Passive with automated failover for standard tenants, Active-Active for ENTERPRISE.

---

## RTO/RPO Targets by Tier

| Tier | RTO | RPO | Failover Mode |
|------|-----|-----|---------------|
| FREE | 4 hours | 24 hours | Manual |
| PRO | 1 hour | 1 hour | Semi-automatic |
| ENTERPRISE | 15 minutes | 5 minutes | Automatic |

---

## Failover Triggers

| Trigger | Detection | Threshold | Action |
|---------|-----------|-----------|--------|
| Region Unavailable | Health checks | 3 consecutive failures | Automatic failover |
| Database Down | Connection errors | 1 minute | Automatic failover |
| High Error Rate | 5xx responses | > 10% for 5 min | Alert, manual decision |
| Network Partition | Cross-region latency | > 5s for 2 min | Alert, investigate |

---

## Failover Procedure

### Automatic Failover (ENTERPRISE)
1. Health check detects failure (30s)
2. Confirm with secondary health check (15s)
3. Update DNS to point to DR region (30s)
4. Promote DR database replica (2-5 min)
5. Verify services healthy in DR (1 min)
6. Send notification to tenant admins

### Manual Failover (FREE/PRO)
1. Alert received by on-call
2. Assess situation, confirm failover needed
3. Execute runbook steps
4. Update DNS
5. Promote database
6. Verify and notify

---

## Data Recovery

| Data Type | Backup Frequency | Retention | Recovery Method |
|-----------|------------------|-----------|-----------------|
| Database | Continuous (WAL) | 30 days | Point-in-time recovery |
| Object Storage | Cross-region replication | 90 days | Promote replica |
| Vector Store | Daily snapshots | 7 days | Restore from snapshot |
| Redis | AOF + snapshots | 24 hours | Restore + replay |

---

## Failback Procedure

After primary region recovers:
1. Sync data back to primary (background)
2. Verify data consistency
3. Schedule maintenance window
4. Failback during low-traffic period
5. Monitor for issues

---

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/architecture/multi-region-architecture.md`
- `{output_folder}/planning-artifacts/operations/failover-runbook.md`

**Verify current best practices with web search:**
Search the web: "design failover strategy best practices {date}"
Search the web: "design failover strategy enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the failover design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into failover scenarios and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for failover review
- **C (Continue)**: Accept failover design and finalize multi-region architecture
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass failover context: triggers, procedures, recovery
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into failover design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review failover design: {summary of triggers and procedures}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save failover design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final multi-region architecture documentation

---

## Verification

- [ ] Failover architecture defined
- [ ] RTO/RPO targets specified per tier
- [ ] Failover triggers documented
- [ ] Failover procedures complete
- [ ] Data recovery strategy defined
- [ ] Failback procedure documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Failover strategy document
- Failover runbook
- **Load template:** `{project-root}/_bmad/bam/templates/architecture-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/operational-runbook-template.md`

---

## Next Step

Proceed to validation mode to verify multi-region architecture, or continue with disaster-recovery-design for comprehensive DR planning.
