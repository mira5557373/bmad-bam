# Step 2: Execute Failover

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

Execute the cross-region failover procedures per the disaster recovery plan, monitoring progress at each phase, handling exceptions, and tracking completion milestones.

## Prerequisites

- Readiness assessment completed (Step 1)
- GO or GO WITH CAUTION decision received
- Disaster recovery plan loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: failover


---

## Inputs

- Readiness assessment from Step 1
- Disaster recovery plan: `{output_folder}/planning-artifacts/disaster-recovery-plan.md`
- Failover runbook procedures
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Initiate Failover Sequence

Record failover initiation:

| Field | Value |
|-------|-------|
| Execution Start Time | {timestamp} |
| Incident Commander | {name} |
| Communication Channel | {slack/teams channel} |
| Status Page Updated | [ ] Yes / [ ] No |
| Customer Notification Sent | [ ] Yes / [ ] No / [ ] N/A (test) |

### 2. Phase 1: Stop Traffic to Primary

Execute traffic cutover:

| Step | Action | Status | Time | Notes |
|------|--------|--------|------|-------|
| 1.1 | Announce maintenance (if planned) | [ ] Complete | | |
| 1.2 | Enable maintenance mode | [ ] Complete | | |
| 1.3 | Drain active connections | [ ] Complete | | |
| 1.4 | Stop accepting new requests | [ ] Complete | | |
| 1.5 | Wait for in-flight requests | [ ] Complete | | |
| 1.6 | Verify no new traffic | [ ] Complete | | |

**Phase 1 Completion Time:** {timestamp}
**Phase 1 Duration:** {minutes}

### 3. Phase 2: Database Failover

Execute database failover:

| Step | Action | Status | Time | Notes |
|------|--------|--------|------|-------|
| 2.1 | Stop replication writes | [ ] Complete | | |
| 2.2 | Verify replication caught up | [ ] Complete | | |
| 2.3 | Promote replica to primary | [ ] Complete | | |
| 2.4 | Update connection strings | [ ] Complete | | |
| 2.5 | Verify database accessible | [ ] Complete | | |
| 2.6 | Test read/write operations | [ ] Complete | | |

**Database Failover:**

| Database | Old Primary | New Primary | Promotion Status |
|----------|-------------|-------------|------------------|
| PostgreSQL | | | [ ] Promoted / [ ] Failed |
| Redis | | | [ ] Promoted / [ ] Failed |
| Qdrant | | | [ ] Promoted / [ ] Failed |

**Phase 2 Completion Time:** {timestamp}
**Phase 2 Duration:** {minutes}

### 4. Phase 3: Service Failover

Execute service failover:

| Step | Action | Status | Time | Notes |
|------|--------|--------|------|-------|
| 3.1 | Start services in secondary | [ ] Complete | | |
| 3.2 | Verify service health checks | [ ] Complete | | |
| 3.3 | Update service discovery | [ ] Complete | | |
| 3.4 | Configure load balancers | [ ] Complete | | |
| 3.5 | Update DNS records | [ ] Complete | | |
| 3.6 | Verify DNS propagation | [ ] Complete | | |

**Service Status in Secondary Region:**

| Service | Status | Health Check | Notes |
|---------|--------|--------------|-------|
| API Gateway | [ ] Running / [ ] Failed | [ ] Pass / [ ] Fail | |
| Authentication | [ ] Running / [ ] Failed | [ ] Pass / [ ] Fail | |
| Core API | [ ] Running / [ ] Failed | [ ] Pass / [ ] Fail | |
| AI Agent Runtime | [ ] Running / [ ] Failed | [ ] Pass / [ ] Fail | |
| Background Workers | [ ] Running / [ ] Failed | [ ] Pass / [ ] Fail | |
| Scheduler | [ ] Running / [ ] Failed | [ ] Pass / [ ] Fail | |

**Phase 3 Completion Time:** {timestamp}
**Phase 3 Duration:** {minutes}

### 5. Phase 4: Traffic Cutover

Execute traffic cutover to secondary:

| Step | Action | Status | Time | Notes |
|------|--------|--------|------|-------|
| 4.1 | Enable traffic to secondary | [ ] Complete | | |
| 4.2 | Disable maintenance mode | [ ] Complete | | |
| 4.3 | Monitor traffic flow | [ ] Complete | | |
| 4.4 | Verify request routing | [ ] Complete | | |
| 4.5 | Check error rates | [ ] Complete | | |
| 4.6 | Confirm customer access | [ ] Complete | | |

**Traffic Metrics Post-Cutover:**

| Metric | Expected | Actual | Status |
|--------|----------|--------|--------|
| Request rate | {baseline} | | [ ] Normal / [ ] Anomaly |
| Error rate | <1% | | [ ] Normal / [ ] Anomaly |
| Latency (P95) | {target} | | [ ] Normal / [ ] Anomaly |
| Success rate | >99% | | [ ] Normal / [ ] Anomaly |

**Phase 4 Completion Time:** {timestamp}
**Phase 4 Duration:** {minutes}

### 6. Handle Exceptions

Document any exceptions encountered:

| Exception | Severity | Resolution | Time to Resolve |
|-----------|----------|------------|-----------------|
| | [ ] Critical / [ ] High / [ ] Medium / [ ] Low | | |
| | [ ] Critical / [ ] High / [ ] Medium / [ ] Low | | |
| | [ ] Critical / [ ] High / [ ] Medium / [ ] Low | | |

### 7. Failover Summary

| Metric | Value |
|--------|-------|
| Total Failover Duration | {minutes} |
| RTO Target | {from DR plan} |
| RTO Achieved | [ ] Yes / [ ] No |
| Data Loss (estimated) | {description} |
| RPO Target | {from DR plan} |
| RPO Achieved | [ ] Yes / [ ] No |
| Exceptions Count | {number} |
| Critical Exceptions | {number} |

**Verify current best practices with web search:**
Search the web: "database failover best practices PostgreSQL {date}"
Search the web: "cross-region DNS failover enterprise {date}"

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
- **A1**: Review traffic cutover completion status
- **A2**: Analyze database failover health
- **A3**: Evaluate service failover status
- **A4**: Assess exception severity and impact
- **A5**: Review RTO/RPO achievement

### [P]ropose Changes
- **P1**: Propose rollback if critical issues
- **P2**: Suggest exception mitigation steps
- **P3**: Recommend additional health checks
- **P4**: Propose communication updates
- **P5**: Suggest monitoring enhancements

### [C]ontinue
- **C1**: Accept failover execution and proceed to validation
- **C2**: Mark step complete and load `step-03-c-validate-failover.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All failover phases completed
- [ ] Database failover successful
- [ ] Service failover successful
- [ ] Traffic cutover successful
- [ ] Exceptions documented
- [ ] RTO/RPO achievement assessed
- [ ] Patterns align with pattern registry

## Outputs

- Failover execution timeline
- Phase completion documentation
- Exception log
- RTO/RPO achievement report
- **Load template:** `{project-root}/_bmad/bam/data/templates/failover-execution-template.md`

## Next Step

Proceed to `step-03-c-validate-failover.md` to perform post-failover validation.
