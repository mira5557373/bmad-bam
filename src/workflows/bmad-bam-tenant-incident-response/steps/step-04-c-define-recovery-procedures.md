# Step 4: Define Recovery Procedures

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Define tenant-safe recovery procedures including data restoration, service resumption, and tenant re-enablement protocols.

---

## Prerequisites

- Step 3 completed: Communication plan created
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Recovery Phases

Document recovery phases for tenant-safe restoration:

| Phase | Name | Actions | Verification |
|-------|------|---------|--------------|
| 1 | Stabilization | Stop bleeding, prevent spread | No new errors |
| 2 | Assessment | Evaluate damage scope | Damage report |
| 3 | Restoration | Restore services/data | Service health |
| 4 | Verification | Confirm tenant data integrity | Data checksums |
| 5 | Re-enablement | Bring tenant back online | Tenant active |
| 6 | Monitoring | Watch for recurrence | Metrics stable |

### 2. Design Data Recovery Procedures

Document tenant-specific data recovery:

| Scenario | Recovery Source | Procedure | Data Loss Window |
|----------|-----------------|-----------|------------------|
| Single tenant corruption | Tenant backup | Restore from last backup | RPO target |
| Multi-tenant corruption | Point-in-time recovery | PITR to before incident | Minutes to hours |
| Complete data loss | Off-site backup | Full restore from DR | RPO target |
| Partial data loss | Transaction logs | Replay logs | Transaction level |

### 3. Define Service Resumption Steps

Document service resumption sequence:

| Step | Action | Verification | Rollback |
|------|--------|--------------|----------|
| 1 | Validate infrastructure health | All systems green | N/A |
| 2 | Start backend services | Health checks pass | Stop services |
| 3 | Restore database connections | Connection pool active | Close connections |
| 4 | Enable API endpoints | API health check | Disable endpoints |
| 5 | Resume background jobs | Job queue processing | Pause jobs |
| 6 | Enable user traffic | Load balancer health | Block traffic |

### 4. Design Tenant Re-enablement Protocol

Define how to safely bring tenants back online:

| Step | Action | Criteria | Actor |
|------|--------|----------|-------|
| 1 | Verify tenant data integrity | Checksum match | Automated |
| 2 | Run tenant health checks | All checks pass | Automated |
| 3 | Update tenant status to ACTIVE | Status updated | Automated |
| 4 | Enable tenant traffic | Requests flowing | Automated |
| 5 | Notify tenant of restoration | Notification sent | Automated |
| 6 | Monitor tenant for 1 hour | No new errors | On-call |

### 5. Define Post-Recovery Validation

Document validation requirements after recovery:

| Validation | Method | Success Criteria | Owner |
|------------|--------|------------------|-------|
| Data consistency | Checksum comparison | 100% match | DBA |
| Feature functionality | Smoke tests | All pass | QA |
| Performance baseline | Load test | Within 10% of normal | SRE |
| Security posture | Security scan | No new vulnerabilities | Security |
| Tenant experience | User journey test | Complete successfully | QA |

**Verify current best practices with web search:**
Search the web: "define recovery procedures best practices {date}"
Search the web: "define recovery procedures enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the recovery procedures above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into recovery scenario details
- **P (Party Mode)**: Bring DBA and SRE perspectives on recovery procedures
- **C (Continue)**: Accept recovery procedures and proceed to playbook creation
- **[Specific refinements]**: Describe recovery concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: recovery phases, data recovery, re-enablement protocol
- Process enhanced insights on recovery completeness
- Ask user: "Accept these refined recovery procedures? (y/n)"
- If yes, integrate into recovery specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant recovery procedures for incident response"
- Process DBA and SRE perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save recovery procedures to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-create-playbooks.md`

---

## Soft Gate Checkpoint

**Steps 1-4 complete the incident response framework design.**

Present summary of:
- Recovery phases (stabilization through monitoring)
- Data recovery procedures with RPO targets per scenario
- Tenant re-enablement protocol and post-recovery validation

Ask for confirmation before proceeding to playbook creation.

---

## Verification

- [ ] Recovery phases defined
- [ ] Data recovery procedures documented
- [ ] Service resumption steps defined
- [ ] Tenant re-enablement protocol created
- [ ] Post-recovery validation defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Recovery phase definitions
- Data recovery procedures
- Service resumption sequence
- Tenant re-enablement protocol
- Post-recovery validation checklist

---

## Next Step

Proceed to `step-05-c-create-playbooks.md` to create operational playbooks.
