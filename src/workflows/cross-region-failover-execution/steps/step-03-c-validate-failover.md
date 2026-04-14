# Step 3: Validate Failover

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

Perform comprehensive post-failover validation to verify service availability, data integrity, tenant access, and system functionality in the secondary region.

## Prerequisites

- Failover execution completed (Step 2)
- All services running in secondary region
- Traffic flowing to secondary region
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: validation


---

## Inputs

- Failover execution summary from Step 2
- Pre-failover baseline metrics from Step 1
- Service health check endpoints
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Execute Post-Failover Health Checks

Verify all services are healthy in secondary region:

| Service | Health Check | Status | Response Time | Notes |
|---------|--------------|--------|---------------|-------|
| API Gateway | /health | [ ] Pass / [ ] Fail | | |
| Authentication | /auth/health | [ ] Pass / [ ] Fail | | |
| Core API | /api/health | [ ] Pass / [ ] Fail | | |
| AI Agent Runtime | /agents/health | [ ] Pass / [ ] Fail | | |
| Background Workers | Queue depth check | [ ] Pass / [ ] Fail | | |
| Scheduler | Job execution check | [ ] Pass / [ ] Fail | | |

**Infrastructure Health:**

| Component | Check | Status | Notes |
|-----------|-------|--------|-------|
| PostgreSQL | Connection test | [ ] Pass / [ ] Fail | |
| Redis | PING response | [ ] Pass / [ ] Fail | |
| S3/Object Storage | List bucket | [ ] Pass / [ ] Fail | |
| Qdrant | Collection status | [ ] Pass / [ ] Fail | |
| DNS | Resolution test | [ ] Pass / [ ] Fail | |
| SSL | Certificate valid | [ ] Pass / [ ] Fail | |

### 2. Verify Service Availability

Test critical user journeys:

| Journey | Test Description | Status | Notes |
|---------|------------------|--------|-------|
| Login | User authentication | [ ] Pass / [ ] Fail | |
| API Request | Basic API call | [ ] Pass / [ ] Fail | |
| Data Read | Fetch tenant data | [ ] Pass / [ ] Fail | |
| Data Write | Create/update record | [ ] Pass / [ ] Fail | |
| AI Agent | Execute agent run | [ ] Pass / [ ] Fail | |
| File Upload | Upload to storage | [ ] Pass / [ ] Fail | |
| File Download | Download from storage | [ ] Pass / [ ] Fail | |
| Search | Vector similarity search | [ ] Pass / [ ] Fail | |

### 3. Validate Data Integrity

Verify data consistency:

| Check | Method | Status | Notes |
|-------|--------|--------|-------|
| Record counts match | Compare counts | [ ] Pass / [ ] Fail | |
| Recent data present | Check timestamps | [ ] Pass / [ ] Fail | |
| Foreign keys valid | Constraint check | [ ] Pass / [ ] Fail | |
| Tenant isolation | Cross-tenant test | [ ] Pass / [ ] Fail | |
| Sequence values | Compare sequences | [ ] Pass / [ ] Fail | |
| File integrity | Checksum validation | [ ] Pass / [ ] Fail | |

**Data Loss Assessment:**

| Data Type | Last Primary Timestamp | Last Secondary Timestamp | Gap |
|-----------|------------------------|--------------------------|-----|
| Transactional | | | |
| User sessions | | | |
| AI agent state | | | |
| Audit logs | | | |
| File metadata | | | |

### 4. Confirm Tenant Access

Verify tenant access by tier:

| Tier | Sample Tenant | Login | Data Access | API Access | Status |
|------|---------------|-------|-------------|------------|--------|
| Free | | [ ] Pass / [ ] Fail | [ ] Pass / [ ] Fail | [ ] Pass / [ ] Fail | |
| Pro | | [ ] Pass / [ ] Fail | [ ] Pass / [ ] Fail | [ ] Pass / [ ] Fail | |
| Enterprise | | [ ] Pass / [ ] Fail | [ ] Pass / [ ] Fail | [ ] Pass / [ ] Fail | |

**Tenant Isolation Verification:**

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| Tenant A cannot see Tenant B data | No access | | [ ] Pass / [ ] Fail |
| RLS policies enforced | Filtered | | [ ] Pass / [ ] Fail |
| API keys scoped correctly | Tenant-specific | | [ ] Pass / [ ] Fail |

### 5. Performance Validation

Compare performance to baseline:

| Metric | Pre-Failover Baseline | Post-Failover | Variance | Acceptable |
|--------|----------------------|---------------|----------|------------|
| API Latency (P50) | | | | [ ] Yes / [ ] No |
| API Latency (P95) | | | | [ ] Yes / [ ] No |
| API Latency (P99) | | | | [ ] Yes / [ ] No |
| Database Query (P95) | | | | [ ] Yes / [ ] No |
| Cache Hit Rate | | | | [ ] Yes / [ ] No |
| Error Rate | | | | [ ] Yes / [ ] No |
| Throughput (req/s) | | | | [ ] Yes / [ ] No |

### 6. Validation Summary

| Category | Pass | Fail | Total | Status |
|----------|------|------|-------|--------|
| Health Checks | | | | [ ] Pass / [ ] Fail |
| Service Availability | | | | [ ] Pass / [ ] Fail |
| Data Integrity | | | | [ ] Pass / [ ] Fail |
| Tenant Access | | | | [ ] Pass / [ ] Fail |
| Performance | | | | [ ] Pass / [ ] Fail |

**Overall Validation Status:** [ ] PASS / [ ] PASS WITH EXCEPTIONS / [ ] FAIL

**Critical Issues (if any):**
1. 
2. 
3. 

**Soft Gate Checkpoint:**
Steps 1-3 complete the failover execution. Present a summary of failover status, validation results, and any exceptions. Ask for confirmation before proceeding to documentation.

**Verify current best practices with web search:**
Search the web: "post-failover validation checklist best practices {date}"
Search the web: "DR validation data integrity verification {date}"

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
- **A1**: Review health check failures in detail
- **A2**: Analyze data integrity discrepancies
- **A3**: Evaluate tenant access issues
- **A4**: Assess performance degradation
- **A5**: Review critical issues impact

### [P]ropose Changes
- **P1**: Propose remediation for health check failures
- **P2**: Suggest data reconciliation steps
- **P3**: Recommend tenant access fixes
- **P4**: Propose performance optimization
- **P5**: Suggest rollback criteria

### [C]ontinue
- **C1**: Accept validation results and proceed to documentation
- **C2**: Mark step complete and load `step-04-c-document-execution.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All health checks executed
- [ ] Service availability verified
- [ ] Data integrity validated
- [ ] Tenant access confirmed
- [ ] Performance compared to baseline
- [ ] Validation summary documented
- [ ] Critical issues identified
- [ ] Patterns align with pattern registry

## Outputs

- Post-failover validation report
- Data integrity assessment
- Tenant access verification
- Performance comparison
- **Load template:** `{project-root}/_bmad/bam/templates/failover-execution-template.md`

## Next Step

Proceed to `step-04-c-document-execution.md` to document the execution and capture lessons learned.
