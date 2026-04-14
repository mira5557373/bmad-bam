# Step 2: Evidence Sources

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Identify and document all evidence sources for each mapped control, specifying data locations, access methods, and collection requirements.

---

## Prerequisites

- Step 1 completed: Control mapping with evidence source identification
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Categorize Evidence Types

Define evidence categories and their characteristics:

| Evidence Type | Description | Format | Retention |
|---------------|-------------|--------|-----------|
| Population | Full dataset for sampling | Database export, CSV | Audit period |
| Configuration | System settings screenshot | Screenshot, JSON | Point-in-time |
| Log Sample | Audit log extracts | Log files, SIEM export | Audit period |
| Policy Document | Written policies | PDF, Markdown | Current version |
| Process Evidence | Workflow completion | Tickets, screenshots | Audit period |
| Attestation | Signed statements | PDF with signature | Per audit |
| Report | Generated reports | PDF, dashboard export | Audit period |

### 2. Map Evidence Sources by Control Category

**Access Control Evidence (CC6):**

| Control | Evidence Type | Source System | Data Location | Access Method |
|---------|---------------|---------------|---------------|---------------|
| CC6.1 | Configuration | IAM Provider | Auth0/Okta console | API/Screenshot |
| CC6.1 | Log Sample | Audit Logs | audit_logs table | SQL query |
| CC6.2 | Population | HR System | employee_onboarding | API export |
| CC6.2 | Process | Ticketing | JIRA onboarding tickets | JQL query |
| CC6.3 | Population | HR System | employee_offboarding | API export |
| CC6.3 | Log Sample | IAM | deprovisioning_logs | API query |
| CC6.4 | Report | Access Review | review_artifacts table | Database query |
| CC6.5 | Configuration | Auth Service | auth_config | Config export |
| CC6.6 | Configuration | RBAC System | role_permissions | Database query |
| CC6.6 | Configuration | Tenant Isolation | RLS policies | Schema export |
| CC6.7 | Configuration | SSL/TLS | Certificate inventory | API query |
| CC6.8 | Report | EDR Platform | Endpoint reports | Dashboard export |

**System Operations Evidence (CC7):**

| Control | Evidence Type | Source System | Data Location | Access Method |
|---------|---------------|---------------|---------------|---------------|
| CC7.1 | Configuration | IaC Repository | Terraform state | Git export |
| CC7.1 | Log Sample | Deployment | CI/CD logs | Pipeline export |
| CC7.2 | Log Sample | SIEM | integrity_alerts | SIEM query |
| CC7.3 | Population | Incident System | security_incidents | Ticket export |
| CC7.3 | Process | Incident Response | incident_timeline | Ticket details |
| CC7.4 | Report | DR Tests | dr_test_results | Document store |
| CC7.5 | Log Sample | Backup System | backup_logs | Backup console |
| CC7.5 | Report | Restore Tests | restore_test_results | Document store |

**Change Management Evidence (CC8):**

| Control | Evidence Type | Source System | Data Location | Access Method |
|---------|---------------|---------------|---------------|---------------|
| CC8.1 | Population | Git Repository | pull_requests | Git API |
| CC8.1 | Process | PR Approvals | review_history | Git API |
| CC8.1 | Population | Change Tickets | CAB approvals | Ticket export |

### 3. Define Evidence Queries

Document specific queries for automated collection:

**Authentication Evidence:**

| Query Name | Purpose | Query/API Call | Frequency |
|------------|---------|----------------|-----------|
| auth_success_sample | Login success events | `SELECT * FROM audit_logs WHERE event_type='auth_success' LIMIT 100` | Monthly |
| auth_failure_sample | Login failure events | `SELECT * FROM audit_logs WHERE event_type='auth_failure' LIMIT 100` | Monthly |
| mfa_enabled_users | MFA enforcement | `GET /api/users?filter=mfa_enabled` | Weekly |
| session_timeout_config | Session settings | `GET /api/security/session-config` | Monthly |

**Access Review Evidence:**

| Query Name | Purpose | Query/API Call | Frequency |
|------------|---------|----------------|-----------|
| access_review_population | All users for review | `SELECT user_id, roles, last_access FROM users` | Quarterly |
| terminated_users | Offboarded users | `GET /api/hr/terminated?period=quarter` | Quarterly |
| access_removed_logs | Deprovisioning events | `SELECT * FROM audit_logs WHERE event_type='access_removed'` | Quarterly |

**Tenant Isolation Evidence:**

| Query Name | Purpose | Query/API Call | Frequency |
|------------|---------|----------------|-----------|
| rls_policy_config | RLS policy definitions | `SELECT * FROM pg_policies` | Monthly |
| tenant_boundary_tests | Isolation test results | Test automation output | Monthly |
| cross_tenant_attempts | Unauthorized access attempts | `SELECT * FROM audit_logs WHERE risk_level='cross_tenant'` | Weekly |

### 4. Map Third-Party Evidence

Document evidence from external providers:

| Provider | Evidence Type | Collection Method | Frequency |
|----------|---------------|-------------------|-----------|
| AWS/GCP/Azure | Infrastructure security | Security Hub/Config exports | Monthly |
| Auth0/Okta | Authentication logs | Log streaming to SIEM | Continuous |
| GitHub/GitLab | Code review evidence | API export | Per audit |
| PagerDuty | Incident response | Incident export | Per audit |
| Datadog/New Relic | Monitoring evidence | Dashboard screenshots | Monthly |
| Vanta/Drata | Continuous compliance | Platform export | Continuous |

**Verify current best practices with web search:**
Search the web: "SOC2 evidence collection automation {date}"
Search the web: "continuous compliance monitoring tools {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the evidence source mapping above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific evidence sources
- **P (Party Mode)**: Bring auditor and engineering perspectives
- **C (Continue)**: Accept sources and proceed to collection automation
- **[Specific refinements]**: Describe evidence source concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save evidence sources to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-collection-automation.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the evidence mapping phase.**

Present summary of:
- Control mapping to Trust Services Criteria
- Evidence sources by control category
- Third-party evidence integrations

Ask for confirmation before proceeding to automation design.

---

## Verification

- [ ] All evidence types categorized
- [ ] Access control evidence mapped
- [ ] System operations evidence mapped
- [ ] Change management evidence mapped
- [ ] Evidence queries documented
- [ ] Third-party evidence identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Evidence type catalog
- Evidence source mapping by control
- Evidence query definitions
- Third-party evidence inventory

---

## Next Step

Proceed to `step-03-c-collection-automation.md` to design automation.
