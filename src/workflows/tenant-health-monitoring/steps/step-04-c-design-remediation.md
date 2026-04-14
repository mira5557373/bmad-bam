# Step 4: Design Remediation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

---

## Purpose

Define automated and manual remediation procedures for health issues.

---

## Prerequisites

- Step 3 completed (Alerting designed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: observability`

---

## Actions

### 1. Automated Remediation

| Condition | Auto-Remediation | Approval |
|-----------|------------------|----------|
| High error rate | Circuit breaker | None |
| Quota exceeded | Grace period extension | Auto |
| Cache thrashing | Cache clear + warm | None |
| Rate limit spike | Temporary increase | Auto |

### 2. Manual Remediation

| Issue | Procedure | Owner |
|-------|-----------|-------|
| Persistent performance | Scale resources | SRE |
| Engagement decline | Outreach campaign | CS |
| Support backlog | Priority boost | Support |
| Data issue | Investigation | Engineering |

### 3. Escalation Procedures

| Level | Trigger | Response |
|-------|---------|----------|
| L1 | Alert fires | On-call SRE |
| L2 | Not resolved 1 hour | Senior SRE |
| L3 | Critical tenant | Engineering lead |
| L4 | Enterprise escalation | VP Engineering |

### 4. Runbook Integration

Document remediation runbooks:
- Performance degradation playbook
- Availability incident playbook
- Engagement recovery playbook
- Quota management playbook

**Verify current best practices with web search:**
Search the web: "automated remediation patterns SaaS {date}"
Search the web: "customer health intervention strategies {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into remediation scenarios
- **P (Party Mode)**: Bring SRE and customer success perspectives
- **C (Continue)**: Accept remediation design and complete Create mode
```

#### If 'C' (Continue):
- Save complete design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Output to: `{output_folder}/planning-artifacts/operations/tenant-health-monitoring.md`
- Create mode complete

---

## Verification

- [ ] Auto-remediation rules defined
- [ ] Manual procedures documented
- [ ] Escalation path established
- [ ] Runbooks referenced
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete health monitoring design
- Remediation procedures
- Escalation matrix

---

## Next Step

Create workflow complete. Health monitoring design ready for validation using Validate mode (`step-20-v-*`).

---

## Create Mode Complete

Health monitoring design is complete. Ready for validation or implementation.
