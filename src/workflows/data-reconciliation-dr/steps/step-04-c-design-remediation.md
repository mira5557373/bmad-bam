# Step 4: Design Remediation Procedures

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

Design data remediation and correction procedures for addressing data discrepancies discovered during post-DR reconciliation, including rollback options, escalation procedures, and sign-off requirements.

## Prerequisites

- Reconciliation scope defined (Step 1)
- Verification procedures designed (Step 2)
- Automated checks configured (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-integrity
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery


---

## Inputs

- Reconciliation scope, verification, and automated check definitions from Steps 1-3
- User requirements for remediation procedures
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Remediation Categories

Design remediation categories based on discrepancy type:

| Category | Description | Example | Typical Resolution |
|----------|-------------|---------|-------------------|
| Missing Data | Data exists in source but not target | Missing transactions | Replay from source |
| Extra Data | Data exists in target but not source | Orphaned records | Verify and delete |
| Modified Data | Data differs between source and target | Corrupted values | Restore from source |
| Sequence Gap | Missing sequence IDs | Missing IDs | Generate or skip |
| Reference Break | Broken foreign keys | Orphan children | Reconnect or cascade |
| Schema Mismatch | Structure differences | Missing columns | Apply migration |

### 2. Design Resolution Procedures

Define resolution procedures per category:

**Missing Data Resolution:**
| Step | Action | Owner | Approval |
|------|--------|-------|----------|
| 1 | Identify missing records | Automated | No |
| 2 | Verify source availability | SRE | No |
| 3 | Extract from source/backup | SRE | No |
| 4 | Validate data integrity | SRE | No |
| 5 | Apply to target | SRE | P1: Yes, P2-4: No |
| 6 | Verify resolution | Automated | No |

**Extra Data Resolution:**
| Step | Action | Owner | Approval |
|------|--------|-------|----------|
| 1 | Identify extra records | Automated | No |
| 2 | Verify not legitimate | SRE | No |
| 3 | Archive to quarantine | SRE | No |
| 4 | Delete from target | SRE | Yes (all) |
| 5 | Verify resolution | Automated | No |

**Modified Data Resolution:**
| Step | Action | Owner | Approval |
|------|--------|-------|----------|
| 1 | Identify modifications | Automated | No |
| 2 | Determine correct value | SRE | No |
| 3 | Apply correction | SRE | P1: Yes, P2-4: No |
| 4 | Verify resolution | Automated | No |

### 3. Define Rollback Options

Establish rollback procedures for failed remediation:

| Rollback Type | Description | When to Use | Duration |
|---------------|-------------|-------------|----------|
| Transaction Rollback | Undo single transaction | Minor failures | Immediate |
| Batch Rollback | Undo batch of changes | Batch failures | < 5 minutes |
| Point-in-Time Restore | Restore to checkpoint | Major failures | < 30 minutes |
| Full Failback | Revert to primary | Critical failures | Per DR plan |

Rollback Configuration:
| Setting | Description | Default |
|---------|-------------|---------|
| Auto-Rollback | Enable automatic rollback | Yes |
| Checkpoint Frequency | Create rollback points | Before each batch |
| Rollback Timeout | Max rollback duration | 30 minutes |
| Preserve Logs | Keep rollback audit trail | Yes (30 days) |

### 4. Design Escalation Procedures

Define escalation paths for remediation failures:

| Escalation Level | Trigger | Notification | Response Time |
|------------------|---------|--------------|---------------|
| L1 - SRE | Initial failure | Slack, PagerDuty | < 5 minutes |
| L2 - Senior SRE | L1 timeout (15 min) | PagerDuty | < 10 minutes |
| L3 - Engineering Lead | L2 timeout (30 min) | Phone | < 15 minutes |
| L4 - VP Engineering | Critical data loss | Phone | Immediate |
| L5 - Executive | Business impact | Phone | Immediate |

Tenant-Specific Escalation:
| Tier | Initial Level | Escalation Speed | Notification |
|------|---------------|------------------|--------------|
| Free | L1 | Standard | None |
| Pro | L1 | Fast (2x) | Admin email |
| Enterprise | L2 | Immediate | Dedicated contact |

### 5. Define Sign-Off Requirements

Establish sign-off requirements for remediation actions:

| Action Type | Sign-Off Required | Sign-Off Authority | Documentation |
|-------------|-------------------|-------------------|---------------|
| Auto-Remediation | No | N/A | Audit log only |
| P4 Data Changes | No | N/A | Audit log only |
| P3 Data Changes | No | SRE on-call | Ticket |
| P2 Data Changes | Yes (async) | SRE Lead | Ticket + approval |
| P1 Data Changes | Yes (sync) | Engineering Lead | Ticket + approval |
| Data Deletion | Yes (sync) | Data Owner | Ticket + approval |
| Schema Changes | Yes (sync) | Architecture Lead | RFC |

### 6. Create Remediation Runbooks

Define runbook structure for remediation:

| Section | Content |
|---------|---------|
| Overview | Problem description and impact |
| Prerequisites | Required access and tools |
| Diagnosis | How to identify root cause |
| Resolution Steps | Step-by-step remediation |
| Verification | How to verify fix worked |
| Rollback | How to undo if fix fails |
| Escalation | When and how to escalate |
| Post-Incident | Documentation requirements |

Runbook Index:
| Runbook ID | Title | Category |
|------------|-------|----------|
| REM-001 | Missing Transaction Recovery | Missing Data |
| REM-002 | Orphaned Record Cleanup | Extra Data |
| REM-003 | Data Corruption Repair | Modified Data |
| REM-004 | Sequence Gap Resolution | Sequence Gap |
| REM-005 | Foreign Key Repair | Reference Break |
| REM-006 | Schema Alignment | Schema Mismatch |

**Verify current best practices with web search:**
Search the web: "data remediation procedures disaster recovery {date}"
Search the web: "database rollback strategies best practices {date}"

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
- **A1**: Review remediation categories for completeness
- **A2**: Analyze resolution procedures for safety
- **A3**: Evaluate rollback options for adequacy
- **A4**: Assess escalation procedures for responsiveness

### [P]ropose Changes
- **P1**: Propose remediation category adjustments
- **P2**: Propose resolution procedure modifications
- **P3**: Suggest rollback option enhancements
- **P4**: Recommend escalation procedure changes

### [C]ontinue
- **C1**: Accept current remediation design and complete Create mode
- **C2**: Mark step complete and generate reconciliation design document

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Remediation categories defined for all discrepancy types
- [ ] Resolution procedures documented
- [ ] Rollback options established
- [ ] Escalation procedures defined
- [ ] Sign-off requirements documented
- [ ] Remediation runbooks created
- [ ] Patterns align with pattern registry

## Outputs

- Remediation categories specification
- Resolution procedures per category
- Rollback options documentation
- Escalation procedures
- Sign-off requirements matrix
- Remediation runbook index
- **Load template:** `{project-root}/_bmad/bam/data/templates/data-reconciliation-dr-template.md`

## Next Step

This completes the Create mode for data-reconciliation-dr workflow.

Generate the final reconciliation design document using template:
`{project-root}/_bmad/bam/data/templates/data-reconciliation-dr-template.md`

Output to: `{output_folder}/planning-artifacts/data-reconciliation-dr.md`

## Quality Gate Summary

Review the completed reconciliation design:
- Reconciliation scope defined for all data types
- Verification procedures documented
- Automated checks configured
- Remediation procedures established
- Tenant data isolation verified
