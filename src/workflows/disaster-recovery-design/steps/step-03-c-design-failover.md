# Step 3: Design Cross-Region Failover

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

Design cross-region failover architecture, triggers, procedures, and failback processes to ensure business continuity during regional outages.

## Prerequisites

- RTO/RPO objectives defined (Step 1)
- Backup strategy designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Failover Architecture

Map failover capabilities per component:

| Component | Primary Region | Secondary Region | Sync Method | Failover Time |
|-----------|---------------|------------------|-------------|---------------|
| PostgreSQL | Active | Streaming replica | Sync (Enterprise) / Async (Pro) | 30s - 5min |
| Redis | Active | Sentinel replica | Async | 10s - 30s |
| Qdrant | Active | Snapshot restore | Periodic | 5min - 30min |
| S3 | Active | Cross-region replication | Eventual | Automatic |
| DNS | Primary records | Failover records | Route53 health | TTL dependent |

### 2. Design Tier-Specific Failover

Define failover capabilities by tier:

| Tier | Cross-Region | Automatic Failover | Manual Failover | Data Consistency |
|------|-------------|-------------------|-----------------|------------------|
| Free | No | No | Best-effort | Eventual |
| Pro | Yes (2 regions) | No | Within RTO | Async replication |
| Enterprise | Yes (3 regions) | Yes | Immediate | Synchronous |

### 3. Configure Failover Triggers

Define conditions that trigger failover:

| Signal | Threshold | Action | Automatic |
|--------|-----------|--------|-----------|
| Primary health check | 3 consecutive failures | Alert on-call | No |
| Replication lag | >30s (Enterprise), >5min (Pro) | Prepare failover | No |
| Region API errors | >50% for 5 minutes | Initiate failover | Enterprise only |
| Complete region outage | AWS status page | Immediate failover | Yes |
| Database unavailable | 2 minutes | Promote replica | Enterprise only |

Health check configuration:
| Check Type | Interval | Timeout | Healthy Threshold |
|------------|----------|---------|-------------------|
| HTTP endpoint | 10s | 5s | 2 consecutive |
| Database connectivity | 30s | 10s | 2 consecutive |
| Replication lag | 10s | N/A | <30s |

### 4. Design Failover Procedure

Define step-by-step failover process:

**Phase 1: Detection (0-5 minutes)**
| Step | Action | Owner | Checkpoint |
|------|--------|-------|------------|
| 1 | Detect primary failure | Monitoring | Alert triggered |
| 2 | Verify outage scope | On-call | Scope confirmed |
| 3 | Assess replication lag | DBA | Lag documented |
| 4 | Notify DR team | Coordinator | Team assembled |

**Phase 2: Decision (5-10 minutes)**
| Step | Action | Owner | Checkpoint |
|------|--------|-------|------------|
| 1 | Review failover criteria | DR Lead | Criteria met |
| 2 | Approve failover | Authority | Approval logged |
| 3 | Notify stakeholders | Communications | Notification sent |

**Phase 3: Execution (10-30 minutes)**
| Step | Action | Owner | Checkpoint |
|------|--------|-------|------------|
| 1 | Stop writes to primary | DBA | Writes stopped |
| 2 | Verify secondary sync | DBA | Sync verified |
| 3 | Promote secondary | DBA | Promotion complete |
| 4 | Update DNS records | Infrastructure | DNS updated |
| 5 | Verify service health | QA | Health checks pass |
| 6 | Resume traffic | Operations | Traffic flowing |

### 5. Design Failback Procedure

Define return to primary operations:

| Step | Action | Duration | Checkpoint |
|------|--------|----------|------------|
| 1 | Verify primary recovery | Variable | Health checks pass |
| 2 | Stop writes to secondary | Seconds | Writes stopped |
| 3 | Sync delta to primary | Minutes-hours | Sync complete |
| 4 | Verify data consistency | Minutes | Checksums match |
| 5 | Switch DNS to primary | Seconds | DNS propagated |
| 6 | Resume writes to primary | Immediate | Writes active |
| 7 | Re-establish replication | Minutes | Replication healthy |

### 6. Define Replication Monitoring

Configure replication lag monitoring:

| Metric | Alert Threshold | Critical Threshold | Action |
|--------|----------------|-------------------|--------|
| Replication lag (Enterprise) | 10s | 30s | Prepare failover |
| Replication lag (Pro) | 1min | 5min | Alert on-call |
| Replication slot size | 1GB | 5GB | Investigate |
| WAL segment growth | 100/hour | 500/hour | Scale storage |

## Soft Gate Checkpoint

**Steps 1-3 complete the core DR design.**

Present summary:
- RTO/RPO objectives by tier
- Backup strategy (types, frequency, retention)
- Failover architecture and triggers

Ask for confirmation before proceeding to final DR plan documentation.

**Verify current best practices with web search:**
Search the web: "design cross region failover best practices {date}"
Search the web: "design cross region failover enterprise SaaS {date}"

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
- **A1**: Review failover architecture against RTO requirements
- **A2**: Analyze tier-specific failover capabilities and gaps
- **A3**: Evaluate failover trigger thresholds for sensitivity
- **A4**: Assess replication monitoring coverage
- **A5**: Review failback procedure for data loss risks

### [P]ropose Changes
- **P1**: Propose failover architecture modifications for faster recovery
- **P2**: Suggest trigger threshold adjustments based on RTO
- **P3**: Recommend enhanced failover procedures for specific components
- **P4**: Propose failback procedure improvements
- **P5**: Suggest additional replication monitoring metrics

### [C]ontinue
- **C1**: Accept current failover design and proceed to DR plan creation
- **C2**: Mark step complete and load `step-04-c-create-dr-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Failover architecture covers all components
- [ ] Tier-specific failover capabilities defined
- [ ] Failover triggers and thresholds documented
- [ ] Step-by-step failover procedure complete
- [ ] Failback procedure documented
- [ ] Replication monitoring configured
- [ ] Patterns align with pattern registry

## Outputs

- Failover architecture diagram
- Failover trigger matrix
- Failover/failback runbooks
- Replication monitoring configuration

## Next Step

Proceed to `step-04-c-create-dr-plan.md` to assemble the comprehensive DR plan document.
