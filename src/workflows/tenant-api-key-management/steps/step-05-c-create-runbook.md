# Step 5: Create Runbook

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

Create operational runbook for API key management operations.

---

## Prerequisites

- Steps 1-4 completed
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-lifecycle-template.md`

---

## Actions

### 1. Standard Operations

Document routine procedures:

| Operation | Steps | Approval |
|-----------|-------|----------|
| Create API key | User request → Generate → Store → Display once | Self-service |
| View key metadata | Authenticate → Fetch metadata → Mask sensitive | Self-service |
| Rotate key | Trigger rotation → Generate new → Grace period | Self-service |
| Revoke key | Confirm → Revoke → Notify → Cleanup | Self-service |

### 2. Incident Response

| Incident | Detection | Response |
|----------|-----------|----------|
| Key leak (public) | External report/scan | Immediate revoke, notify, investigate |
| Key leak (internal) | Log analysis | Assess scope, rotate, audit |
| Brute force attack | Anomaly detection | Block IP, alert, investigate |
| Unauthorized access | Usage anomaly | Temporary suspend, investigate |

### 3. Emergency Procedures

| Emergency | Procedure | Escalation |
|-----------|-----------|------------|
| Mass key compromise | Global rotation trigger | Security lead + CTO |
| System-wide revocation | Maintenance mode + revoke all | Platform team |
| Audit subpoena | Preserve + export specific data | Legal + Security |

### 4. Troubleshooting Guide

| Issue | Symptoms | Resolution |
|-------|----------|------------|
| Key not working | 401 errors | Check expiry, scope, tenant status |
| Rate limited | 429 errors | Review usage, upgrade tier |
| Rotation failed | Old key invalid, no new key | Manual intervention, support ticket |
| Audit gap | Missing events | Check logging pipeline, backfill |

### 5. Monitoring Dashboards

Define operational metrics:

- Active keys per tenant
- Key age distribution
- Authentication success/failure rates
- Rotation compliance percentage
- Revocation response time
- Anomaly detection accuracy

**Verify current best practices with web search:**
Search the web: "API key management operational runbook {date}"
Search the web: "credential incident response procedures {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the runbook, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into edge cases and disaster recovery
- **P (Party Mode)**: Bring security and operations perspectives for runbook review
- **C (Continue)**: Accept runbook and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass runbook context: procedures, incidents, monitoring
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into runbook
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review API key runbook: {summary of procedures and monitoring}"
- Process collaborative analysis from security and operations personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete runbook to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Output to: `{output_folder}/planning-artifacts/security/tenant-api-key-management.md`
- Create mode complete

---

## Verification

- [ ] Standard operations documented
- [ ] Incident response procedures complete
- [ ] Emergency procedures defined
- [ ] Troubleshooting guide comprehensive
- [ ] Monitoring dashboards specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete API key management document
- Operational runbook
- Incident response playbook

---

## Next Step

Create workflow complete. API key management design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

API key management design is complete. The artifact is ready for validation or implementation.
