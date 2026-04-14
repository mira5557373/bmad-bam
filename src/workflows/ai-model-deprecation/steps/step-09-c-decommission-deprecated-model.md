# Step 9: Decommission Deprecated Model

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- WRITE Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics

---

## Purpose

Safely remove the deprecated model from the platform infrastructure, ensuring all dependencies are resolved, traffic is fully migrated, and removal is reversible during a safety window.

---

## Prerequisites

- Step 08 (Monitor Migration Progress) completed
- Migration targets achieved (95%+ tenants migrated)
- Go/no-go checkpoint passed
- Stakeholder approval obtained
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: change-management
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv`

---

## Actions

### 1. Verify Decommission Readiness

Complete final readiness checklist:

| Check | Status | Verified By | Date |
|-------|--------|-------------|------|
| Migration target achieved (>95%) | [ ] | {name} | {date} |
| No active P1/P2 issues | [ ] | {name} | {date} |
| All enterprise tenants migrated | [ ] | {name} | {date} |
| Stakeholder sign-off received | [ ] | {name} | {date} |
| Rollback plan tested | [ ] | {name} | {date} |
| Support team briefed | [ ] | {name} | {date} |
| Communication sent for final notice | [ ] | {name} | {date} |

### 2. Execute Pre-Decommission Steps

Prepare infrastructure for removal:

| Step | Description | Owner | Status | Completion |
|------|-------------|-------|--------|------------|
| 1 | Disable new tenant onboarding to deprecated model | {owner} | {status} | {date} |
| 2 | Set routing to reject new requests | {owner} | {status} | {date} |
| 3 | Send final warning to remaining users | {owner} | {status} | {date} |
| 4 | Export configuration backup | {owner} | {status} | {date} |
| 5 | Document rollback procedure | {owner} | {status} | {date} |

### 3. Implement Graceful Shutdown

Execute controlled shutdown sequence:

| Phase | Action | Duration | Monitoring | Rollback Trigger |
|-------|--------|----------|------------|------------------|
| 1 | Stop accepting new sessions | 1 hour | Session count | New sessions detected |
| 2 | Drain existing sessions | 4 hours | Active sessions | Sessions not draining |
| 3 | Disable API endpoint | 1 hour | Request count | Requests still arriving |
| 4 | Remove from load balancer | 30 min | Health checks | N/A |
| 5 | Stop model service | 30 min | Service status | N/A |

### 4. Remove Infrastructure Components

Decommission model infrastructure:

| Component | Action | Order | Reversible | Backup Location |
|-----------|--------|-------|------------|-----------------|
| API endpoints | Remove routes | 1 | Yes | Config repo |
| Load balancer config | Remove backend | 2 | Yes | Config repo |
| Model service | Stop containers | 3 | Yes | Container registry |
| Model artifacts | Archive | 4 | Yes | Cold storage |
| GPU allocation | Release | 5 | No | N/A |
| DNS records | Update/remove | 6 | Yes | DNS backup |

### 5. Handle Remaining Requests

Configure graceful error responses:

| Scenario | Response Code | Response Message | Redirect |
|----------|---------------|------------------|----------|
| Direct API call | 410 Gone | Model deprecated. Use {replacement} | Migration docs |
| Legacy SDK | 400 Bad Request | Update SDK to v{x} | SDK docs |
| Cached endpoint | 301 Redirect | N/A | New endpoint |

### 6. Execute Cleanup Tasks

Remove deprecated resources:

| Resource | Current State | Target State | Cleanup Date | Owner |
|----------|---------------|--------------|--------------|-------|
| Model weights | Active storage | Archive | {date} | {owner} |
| Configuration | Live config | Archived | {date} | {owner} |
| Documentation | Published | Marked deprecated | {date} | {owner} |
| SDK support | Active | Removed | {date} | {owner} |
| Test fixtures | Active | Removed | {date} | {owner} |

### 7. Maintain Rollback Window

Keep rollback capability during safety period:

| Rollback Component | Retention Period | Storage Location | Recovery Time |
|-------------------|------------------|------------------|---------------|
| Model artifacts | 30 days | Cold storage | 4 hours |
| Configuration | 30 days | Config repo | 1 hour |
| Container images | 90 days | Registry | 30 minutes |
| Database state | 7 days | Snapshot | 2 hours |

Rollback procedure:
1. Restore configuration from backup
2. Pull container images from registry
3. Redeploy model service
4. Update load balancer
5. Re-enable API endpoints
6. Notify affected tenants

### 8. Verify Decommission Success

Confirm complete removal:

| Verification | Method | Expected Result | Actual | Status |
|--------------|--------|-----------------|--------|--------|
| API endpoint | HTTP request | 410 response | {result} | {status} |
| Resource usage | Monitoring | Zero consumption | {result} | {status} |
| Cost attribution | Billing | No charges | {result} | {status} |
| Tenant configs | Database query | No references | {result} | {status} |
| Logs | Log search | No new entries | {result} | {status} |

**Verify current best practices with web search:**
Search the web: "API deprecation decommission best practices {date}"
Search the web: "infrastructure decommission checklist cloud {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into decommission process
- **[P] Party Mode**: Collaborative risk assessment
- **[C] Continue**: Proceed to documentation

### Menu Options

### [A]nalyze Options
- **A1**: Review readiness checklist completeness
- **A2**: Analyze shutdown sequence risks
- **A3**: Evaluate rollback procedure adequacy
- **A4**: Assess cleanup task coverage

### [P]ropose Changes
- **P1**: Propose additional safety measures
- **P2**: Suggest shutdown sequence optimizations
- **P3**: Recommend extended rollback capabilities
- **P4**: Identify additional cleanup tasks

### [C]ontinue
- **C1**: Confirm decommission complete and proceed
- **C2**: Mark step complete and load `10-document-deprecation.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Decommission readiness verified
- [ ] Pre-decommission steps completed
- [ ] Graceful shutdown executed
- [ ] Infrastructure components removed
- [ ] Remaining requests handled gracefully
- [ ] Cleanup tasks executed
- [ ] Rollback capability maintained
- [ ] Decommission success verified

---

## Outputs

- Decommission readiness checklist
- Pre-decommission execution log
- Shutdown sequence record
- Infrastructure removal log
- Error response configuration
- Cleanup task completion record
- Rollback procedure document
- Decommission verification report

---

## Next Step

Proceed to `step-10-c-document-deprecation.md` to create the final deprecation report.
