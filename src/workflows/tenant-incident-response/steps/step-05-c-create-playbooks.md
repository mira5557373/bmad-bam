# Step 5: Create Playbooks

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

Create operational playbooks for common incident scenarios specific to multi-tenant platforms, including AI agent failures and tenant isolation breaches.

---

## Prerequisites

- Steps 1-4 completed: Severity, isolation, communication, and recovery defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability
- **Load template:** `{project-root}/_bmad/bam/templates/runbook-template.md`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Create Database Incident Playbook

**Playbook: Database Connection Pool Exhaustion**

| Step | Action | Command/Tool | Owner |
|------|--------|--------------|-------|
| 1 | Identify affected tenants | Query connection pool by tenant_id | On-call |
| 2 | Kill long-running queries | `SELECT pg_terminate_backend(pid)` | DBA |
| 3 | Increase pool size temporarily | Scale connection pool | SRE |
| 4 | Notify affected tenants | Trigger communication workflow | On-call |
| 5 | Investigate root cause | Query logs analysis | DBA |
| 6 | Implement fix or rate limit | Code change or config | Dev |

### 2. Create AI Agent Incident Playbook

**Playbook: AI Agent Runaway/Failure**

| Step | Action | Command/Tool | Owner |
|------|--------|--------------|-------|
| 1 | Identify runaway agent | Check agent execution logs | On-call |
| 2 | Activate kill switch | Set feature flag `agent.{id}.enabled = false` | On-call |
| 3 | Quarantine affected tenant | Set tenant status QUARANTINE | Automated |
| 4 | Preserve agent state | Snapshot memory and context | SRE |
| 5 | Notify tenant | Send incident notification | On-call |
| 6 | Analyze agent behavior | Review tool calls, LLM responses | AI Engineer |
| 7 | Fix or disable agent permanently | Code change or config | AI Engineer |
| 8 | Restore tenant | Re-enable tenant | On-call |

### 3. Create Tenant Isolation Breach Playbook

**Playbook: Cross-Tenant Data Access Detected**

| Step | Action | Command/Tool | Owner |
|------|--------|--------------|-------|
| 1 | **IMMEDIATE:** Block all traffic | WAF rule or load balancer | SRE |
| 2 | Identify breach scope | Audit logs analysis | Security |
| 3 | Quarantine all affected tenants | Mass quarantine script | SRE |
| 4 | Notify security team | PagerDuty escalation | On-call |
| 5 | Preserve evidence | Snapshot logs, state | Security |
| 6 | Notify affected tenants | Legal-reviewed notification | Legal + CS |
| 7 | Root cause analysis | Full security review | Security |
| 8 | Implement fix | Code change with security review | Dev + Security |
| 9 | Compliance notification | Regulatory filing if required | Legal |

### 4. Create Service Degradation Playbook

**Playbook: High Latency or Error Rate**

| Step | Action | Command/Tool | Owner |
|------|--------|--------------|-------|
| 1 | Identify degradation scope | Check metrics dashboard | On-call |
| 2 | Check for tenant-specific impact | Filter metrics by tenant_id | On-call |
| 3 | Enable circuit breakers | Feature flag circuit_breaker.enabled | SRE |
| 4 | Scale affected services | Kubernetes HPA or manual scale | SRE |
| 5 | Rate limit if needed | Apply tenant rate limits | SRE |
| 6 | Notify affected tenants | Status page update | On-call |
| 7 | Investigate root cause | Distributed tracing analysis | Dev |

### 5. Create Authentication Incident Playbook

**Playbook: Auth Service Down or Compromised**

| Step | Action | Command/Tool | Owner |
|------|--------|--------------|-------|
| 1 | Assess auth service status | Health check dashboard | On-call |
| 2 | Enable fallback auth (if available) | Feature flag fallback_auth | SRE |
| 3 | If compromised: Invalidate all tokens | Token revocation API | Security |
| 4 | If compromised: Force password reset | Mass password reset | Security |
| 5 | Notify all tenants | Emergency notification | On-call |
| 6 | Restore auth service | Service restart or failover | SRE |
| 7 | Monitor for unauthorized access | Security audit logs | Security |

---

## Quality Gates

- [ ] All common incident scenarios covered
- [ ] Each playbook has clear ownership
- [ ] Tenant isolation maintained in all playbooks
- [ ] AI-specific incidents addressed
- [ ] Playbooks tested in staging
- [ ] Contact information current

**Verify current best practices with web search:**
Search the web: "create playbooks best practices {date}"
Search the web: "create playbooks enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the playbooks above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific playbook scenarios
- **P (Party Mode)**: Bring SRE and security perspectives on playbook completeness
- **C (Continue)**: Accept playbooks and complete Create mode
- **[Specific refinements]**: Describe playbook concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: playbook scenarios, steps, ownership
- Process enhanced insights on incident coverage
- Ask user: "Accept these refined playbooks? (y/n)"
- If yes, integrate into playbook collection
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review incident playbooks for multi-tenant platform completeness"
- Process SRE and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save complete incident response plan and playbooks
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Complete Create mode workflow

---

## Verification

- [ ] Database incident playbook created
- [ ] AI agent incident playbook created
- [ ] Tenant isolation breach playbook created
- [ ] Service degradation playbook created
- [ ] Authentication incident playbook created
- [ ] Patterns align with pattern registry

---

## Outputs

- Complete incident playbook collection
- **Output to:** `{output_folder}/planning-artifacts/operations/tenant-incident-response-plan.md`
- **Output to:** `{output_folder}/planning-artifacts/operations/incident-playbooks.md`
- **Load template:** `{project-root}/_bmad/bam/templates/runbook-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/incident-response-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/escalation-runbook-template.md`

---

## Next Step

**Workflow Complete.**

The Create mode workflow is finished. To modify the output, use Edit mode (`step-10-e-*`). To verify the output meets quality criteria, use Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for tenant-incident-response workflow. The following artifacts have been produced:

1. Severity level definitions with tenant-aware impact
2. Tenant isolation protocol with quarantine procedures
3. Communication plan with tenant-specific rules
4. Recovery procedures with re-enablement protocol
5. Operational playbooks for common scenarios
