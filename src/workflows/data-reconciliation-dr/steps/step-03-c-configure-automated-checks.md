# Step 3: Configure Automated Checks

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

Configure automated integrity checks that validate data consistency after DR failover, including scheduling, triggers, alert thresholds, and automated remediation rules.

## Prerequisites

- Reconciliation scope defined (Step 1)
- Verification procedures designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-integrity
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: monitoring


---

## Inputs

- Reconciliation scope and verification procedures from Steps 1-2
- User requirements for automated checks
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Automated Check Types

Design automated integrity check types:

| Check Type | Description | Execution Time | Resource Impact |
|------------|-------------|----------------|-----------------|
| Heartbeat | Basic connectivity and health | < 1 second | Minimal |
| Count Validation | Row count comparison | < 10 seconds | Low |
| Checksum Validation | Hash comparison | < 1 minute | Medium |
| Sample Verification | Random sample check | < 5 minutes | Medium |
| Full Verification | Complete data comparison | Hours | High |
| Consistency Check | Cross-reference validation | < 10 minutes | Medium |

### 2. Configure Check Scheduling

Define check scheduling per scenario:

| Scenario | Check Frequency | Check Types |
|----------|-----------------|-------------|
| Normal Operation | Every 1 hour | Heartbeat, Count |
| Post-Failover (0-1h) | Every 1 minute | All P1 checks |
| Post-Failover (1-4h) | Every 5 minutes | P1, P2 checks |
| Post-Failover (4-24h) | Every 15 minutes | Count, Sample |
| Steady State | Every 4 hours | Count, Checksum |

Check Schedule Configuration:
| Setting | Description | Default |
|---------|-------------|---------|
| Check Window | Maintenance window for heavy checks | 02:00-04:00 UTC |
| Max Concurrent | Maximum parallel checks | 5 |
| Check Timeout | Maximum check duration | 30 minutes |
| Retry Count | Failed check retries | 3 |
| Retry Delay | Delay between retries | 30 seconds |

### 3. Define Alert Thresholds

Configure alert thresholds and escalation:

| Check | Warning Threshold | Critical Threshold | Escalation |
|-------|-------------------|-------------------|------------|
| Heartbeat Failure | 1 failure | 3 consecutive | P1 |
| Count Mismatch | > 0.01% | > 0.1% | P1 |
| Checksum Mismatch | > 0 (P1 data) | Any P1 data | P1 |
| Sample Failure | > 0.5% | > 1% | P2 |
| Replication Lag | > 30 seconds | > 5 minutes | P1 |
| Check Timeout | 1 timeout | 3 consecutive | P2 |

Alert Configuration:
| Setting | Description | Default |
|---------|-------------|---------|
| Alert Cooldown | Minimum time between same alerts | 5 minutes |
| Auto-Resolve | Auto-close on recovery | Yes |
| Alert Channels | Notification destinations | PagerDuty, Slack |
| Business Hours | Modified escalation times | 09:00-18:00 |

### 4. Design Alert Notification

Define alert notification structure:

| Field | Description | Example |
|-------|-------------|---------|
| Alert ID | Unique identifier | `rec_alert_12345` |
| Severity | Critical/Warning/Info | `Critical` |
| Check Type | Type of check that failed | `Checksum Validation` |
| Data Asset | Affected data asset | `transactions` |
| Tenant Impact | Affected tenants (if known) | `All Enterprise` |
| Primary Value | Source value | `12345678` |
| Secondary Value | Target value | `12345677` |
| Difference | Calculated difference | `1 row` |
| Timestamp | Alert generation time | `2026-04-11T10:00:00Z` |
| Runbook Link | Remediation link | `https://...` |

### 5. Configure Automated Remediation

Define automated remediation rules:

| Condition | Automated Action | Requires Approval |
|-----------|------------------|-------------------|
| Replication Lag > 1 min | Increase replication priority | No |
| Count Mismatch < 10 rows | Trigger sync job | No |
| Cache Inconsistency | Invalidate and refresh | No |
| Session Mismatch | Clear stale sessions | No |
| Checksum Mismatch | Alert only (manual review) | Yes |
| Schema Mismatch | Alert and block writes | Yes |
| P1 Data Mismatch | Escalate immediately | Yes |

Remediation Configuration:
| Setting | Description | Default |
|---------|-------------|---------|
| Auto-Remediate Enabled | Enable automated fixes | Yes (non-critical) |
| Max Auto-Remediation | Maximum auto-fix attempts | 3 |
| Remediation Timeout | Max remediation duration | 10 minutes |
| Audit All Actions | Log all remediation | Yes |
| Rollback on Failure | Undo failed remediation | Yes |

### 6. Define Check Infrastructure

Establish check execution infrastructure:

| Component | Description | Deployment |
|-----------|-------------|------------|
| Check Scheduler | Triggers checks on schedule | Kubernetes CronJob |
| Check Executor | Runs individual checks | Kubernetes Job |
| Result Store | Stores check results | PostgreSQL |
| Alert Manager | Processes and routes alerts | Prometheus Alertmanager |
| Dashboard | Visualizes check status | Grafana |

**Soft Gate Checkpoint:**

**Steps 1-3 complete the core reconciliation design.**

Present summary of:
- Reconciliation scope and priorities
- Verification procedures
- Automated check configuration

Ask for confirmation before proceeding to remediation design.

**Verify current best practices with web search:**
Search the web: "automated database integrity monitoring best practices {date}"
Search the web: "data reconciliation alerting patterns {date}"

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
- **A1**: Review automated check types for coverage
- **A2**: Analyze scheduling configuration for scenarios
- **A3**: Evaluate alert thresholds for appropriateness
- **A4**: Assess automated remediation rules for safety

### [P]ropose Changes
- **P1**: Propose check type adjustments
- **P2**: Propose scheduling modifications
- **P3**: Suggest alert threshold changes
- **P4**: Recommend remediation rule updates

### [C]ontinue
- **C1**: Accept current automated check design and proceed to remediation
- **C2**: Mark step complete and load `step-04-c-design-remediation.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Automated check types defined
- [ ] Check scheduling configured for all scenarios
- [ ] Alert thresholds established
- [ ] Alert notification structure defined
- [ ] Automated remediation rules configured
- [ ] Check infrastructure specified
- [ ] Patterns align with pattern registry

## Outputs

- Automated check types specification
- Check scheduling configuration
- Alert threshold documentation
- Automated remediation rules
- Check infrastructure design
- **Load template:** `{project-root}/_bmad/bam/templates/data-reconciliation-dr-template.md`

## Next Step

Proceed to `step-04-c-design-remediation.md` to design data remediation and correction procedures.
