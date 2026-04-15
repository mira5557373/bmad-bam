# Step 1: Assess Failover Readiness

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

Assess readiness for cross-region failover by verifying pre-failover health checks, confirming replication status, validating target region availability, and documenting the current system state before initiating failover procedures.

## Prerequisites

- Disaster recovery plan approved and available
- Failover architecture documented
- Target region infrastructure provisioned
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: failover


---

## Inputs

- Disaster recovery plan: `{output_folder}/planning-artifacts/disaster-recovery-plan.md`
- Current system health metrics
- Replication status reports
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Document Failover Context

Record the failover initiation context:

| Field | Value |
|-------|-------|
| Failover Type | [ ] Planned Test / [ ] Unplanned DR Event |
| Initiation Time | {timestamp} |
| Incident Reference | {ticket/incident ID if applicable} |
| Initiator | {name and role} |
| Approver | {name and role} |
| Target Region | {region identifier} |
| Expected RTO | {per tier from DR plan} |
| Expected RPO | {per tier from DR plan} |

### 2. Verify Pre-Failover Health Checks

Execute health checks on primary and secondary regions:

**Primary Region Status:**

| Component | Status | Last Known Good | Notes |
|-----------|--------|-----------------|-------|
| Database (PostgreSQL) | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| Cache (Redis) | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| Object Storage (S3) | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| Vector DB (Qdrant) | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| API Gateway | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| Authentication | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| AI Agent Runtime | [ ] Healthy / [ ] Degraded / [ ] Down | | |

**Secondary Region Status:**

| Component | Status | Ready for Traffic | Notes |
|-----------|--------|-------------------|-------|
| Database (PostgreSQL) | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| Cache (Redis) | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| Object Storage (S3) | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| Vector DB (Qdrant) | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| API Gateway | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| Authentication | [ ] Healthy / [ ] Degraded / [ ] Down | | |
| AI Agent Runtime | [ ] Healthy / [ ] Degraded / [ ] Down | | |

### 3. Confirm Replication Status

Verify data replication state:

| Replication Stream | Lag | Last Sync | Status |
|--------------------|-----|-----------|--------|
| PostgreSQL WAL | {seconds} | {timestamp} | [ ] In Sync / [ ] Lagging / [ ] Broken |
| Redis Replication | {seconds} | {timestamp} | [ ] In Sync / [ ] Lagging / [ ] Broken |
| S3 Cross-Region | {seconds} | {timestamp} | [ ] In Sync / [ ] Lagging / [ ] Broken |
| Qdrant Replication | {seconds} | {timestamp} | [ ] In Sync / [ ] Lagging / [ ] Broken |

**Replication Lag Assessment:**
- [ ] All streams within RPO targets
- [ ] No broken replication streams
- [ ] Data loss estimation documented

**Estimated Data Loss (if failover now):**

| Tier | RPO Target | Current Lag | Within RPO |
|------|------------|-------------|------------|
| Free | 24 hours | | [ ] Yes / [ ] No |
| Pro | 4 hours | | [ ] Yes / [ ] No |
| Enterprise | 15 minutes | | [ ] Yes / [ ] No |

### 4. Validate Target Region Availability

Confirm target region readiness:

| Check | Status | Notes |
|-------|--------|-------|
| Network connectivity | [ ] Pass / [ ] Fail | |
| DNS propagation ready | [ ] Pass / [ ] Fail | |
| Load balancer configured | [ ] Pass / [ ] Fail | |
| SSL certificates valid | [ ] Pass / [ ] Fail | |
| Firewall rules configured | [ ] Pass / [ ] Fail | |
| IAM permissions verified | [ ] Pass / [ ] Fail | |
| Secrets synchronized | [ ] Pass / [ ] Fail | |
| Configuration deployed | [ ] Pass / [ ] Fail | |

### 5. Document Current System State

Capture baseline for comparison:

| Metric | Primary Region | Secondary Region |
|--------|----------------|------------------|
| Active tenant count | | |
| Active user sessions | | |
| Active AI agent runs | | |
| Request rate (req/s) | | |
| Error rate (%) | | |
| Database connections | | |
| Cache hit rate (%) | | |

### 6. Readiness Decision

Based on assessment, determine failover readiness:

| Status | Criteria | Action |
|--------|----------|--------|
| **GO** | All checks pass, replication in sync | Proceed to Step 2 |
| **GO WITH CAUTION** | Minor issues, acceptable data loss | Proceed with monitoring |
| **NO-GO** | Critical issues, unacceptable risk | Resolve issues first |

**Readiness Decision:** [ ] GO / [ ] GO WITH CAUTION / [ ] NO-GO

**Decision Rationale:**
{Document the reasoning for the decision}

**Verify current best practices with web search:**
Search the web: "cross-region failover readiness checklist best practices {date}"
Search the web: "DR failover pre-checks enterprise SaaS {date}"

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
- **A1**: Review primary region health check details
- **A2**: Analyze replication lag implications
- **A3**: Evaluate target region readiness gaps
- **A4**: Assess data loss risk per tier
- **A5**: Review baseline metrics for anomalies

### [P]ropose Changes
- **P1**: Propose mitigation for health check failures
- **P2**: Suggest replication recovery steps
- **P3**: Recommend target region fixes
- **P4**: Propose risk acceptance criteria
- **P5**: Suggest additional readiness checks

### [C]ontinue
- **C1**: Accept readiness assessment and proceed to execution
- **C2**: Mark step complete and load `step-02-c-execute-failover.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Failover context documented
- [ ] Primary region health checked
- [ ] Secondary region health checked
- [ ] Replication status verified
- [ ] Target region availability confirmed
- [ ] Current system state documented
- [ ] Readiness decision made
- [ ] Patterns align with pattern registry

## Outputs

- Failover readiness assessment report
- Pre-failover health check results
- Replication status documentation
- Baseline system metrics
- **Load template:** `{project-root}/_bmad/bam/data/templates/failover-execution-template.md`

## Next Step

Proceed to `step-02-c-execute-failover.md` to execute the failover procedures.
