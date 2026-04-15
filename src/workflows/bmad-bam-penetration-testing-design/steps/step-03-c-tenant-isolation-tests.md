# Step 3: Tenant Isolation Tests

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

Design comprehensive tenant isolation testing procedures specific to the multi-tenant architecture, including cross-tenant access attempts and AI agent boundary testing.

---

## Prerequisites

- Step 2 completed: General test categories defined
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-isolation

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tenant model: `{tenant_model}`
- User feedback and refinements from previous steps

---

## Actions

### 1. Cross-Tenant Data Access Tests

Define tenant boundary violation tests:

| Test ID | Test Name | Attack Vector | Expected Outcome |
|---------|-----------|---------------|------------------|
| TEN-001 | Direct ID manipulation | Change tenant_id in request | Access denied |
| TEN-002 | JWT tenant claim tampering | Modify tenant claim | Token rejected |
| TEN-003 | Session tenant switching | Change tenant mid-session | Session invalidated |
| TEN-004 | API parameter injection | tenant_id in query params | Parameter ignored |
| TEN-005 | Database direct query | RLS bypass attempts | RLS enforced |
| TEN-006 | Cache key manipulation | Cross-tenant cache keys | Cache isolated |
| TEN-007 | Queue message injection | Tenant in message header | Messages filtered |
| TEN-008 | File storage access | Cross-tenant file paths | Paths isolated |

### 2. Model-Specific Isolation Tests

Based on `{tenant_model}`, design specific tests:

**For Row-Level Security (RLS):**

| Test ID | Test Name | Methodology | Expected Outcome |
|---------|-----------|-------------|------------------|
| RLS-001 | Policy bypass via SQL | Raw SQL execution | Policy enforced |
| RLS-002 | Function privilege escalation | SECURITY DEFINER abuse | Functions audited |
| RLS-003 | View bypass | Materialized view access | Views respect RLS |
| RLS-004 | Trigger manipulation | Trigger-based access | Triggers isolated |
| RLS-005 | Context pollution | set_config manipulation | Context protected |
| RLS-006 | Backup restore attack | Restore cross-tenant data | Backups isolated |

**For Schema-per-Tenant:**

| Test ID | Test Name | Methodology | Expected Outcome |
|---------|-----------|-------------|------------------|
| SCH-001 | Schema traversal | Cross-schema queries | Schema boundaries enforced |
| SCH-002 | Search path manipulation | search_path injection | Path controlled |
| SCH-003 | Public schema abuse | Shared object access | Public limited |
| SCH-004 | Migration cross-talk | Schema migration isolation | Migrations isolated |
| SCH-005 | Connection pool poisoning | Tenant session reuse | Sessions purged |
| SCH-006 | Metadata exposure | Information schema access | Metadata filtered |

**For Database-per-Tenant:**

| Test ID | Test Name | Methodology | Expected Outcome |
|---------|-----------|-------------|------------------|
| DB-001 | Connection string injection | DB name manipulation | Routing enforced |
| DB-002 | DNS rebinding | Database endpoint hijack | Endpoints validated |
| DB-003 | Credential reuse | Cross-DB credential use | Credentials unique |
| DB-004 | Backup cross-access | Access other tenant backup | Backups isolated |
| DB-005 | Replication snooping | Replication stream access | Streams encrypted |
| DB-006 | Admin console access | Cross-DB admin operations | Admin isolated |

### 3. AI Agent Isolation Tests

Define AI agent security boundary tests:

| Test ID | Test Name | Attack Vector | Expected Outcome |
|---------|-----------|---------------|------------------|
| AI-001 | Prompt injection - direct | Malicious user input | Guardrails block |
| AI-002 | Prompt injection - indirect | Data-embedded prompts | Content sanitized |
| AI-003 | Tool permission escalation | Request unauthorized tools | Permissions enforced |
| AI-004 | Agent context leakage | Extract system prompt | Context protected |
| AI-005 | Cross-tenant tool access | Access other tenant tools | Tools scoped |
| AI-006 | Run result manipulation | Modify run outputs | Outputs signed |
| AI-007 | Approval workflow bypass | Skip human approval | Approval enforced |
| AI-008 | Resource exhaustion | Agent infinite loop | Limits enforced |
| AI-009 | Knowledge base poisoning | Inject malicious embeddings | Embeddings validated |
| AI-010 | Chain-of-thought exploit | Reasoning manipulation | Reasoning audited |

### 4. Shared Resource Isolation Tests

Test isolation of shared platform resources:

| Test ID | Test Name | Shared Resource | Expected Outcome |
|---------|-----------|-----------------|------------------|
| SHR-001 | Feature flag leakage | LaunchDarkly/Split | Flags tenant-scoped |
| SHR-002 | Config service access | Shared config | Configs isolated |
| SHR-003 | Monitoring data exposure | Metrics/logs | Data tenant-filtered |
| SHR-004 | Job queue priority abuse | Background jobs | Jobs tenant-aware |
| SHR-005 | Rate limit sharing | API rate limits | Limits per-tenant |
| SHR-006 | WebSocket broadcast leak | Real-time updates | Broadcasts scoped |

### 5. Tier Boundary Tests

Test tier feature isolation:

| Test ID | Test Name | Attack Vector | Expected Outcome |
|---------|-----------|---------------|------------------|
| TIER-001 | Free tier premium access | Feature flag manipulation | Tier enforced |
| TIER-002 | Quota limit bypass | Counter manipulation | Quotas server-side |
| TIER-003 | API limit circumvention | Multiple API keys | Limits aggregated |
| TIER-004 | Storage tier bypass | Direct storage access | Storage tiered |
| TIER-005 | Support tier escalation | Priority queue manipulation | Queues validated |
| TIER-006 | Billing manipulation | Invoice tampering | Billing protected |

**Verify current best practices with web search:**
Search the web: "multi-tenant isolation testing best practices {date}"
Search the web: "SaaS tenant boundary security testing {date}"
Search the web: "AI agent security testing methodology {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the tenant isolation tests above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific isolation test scenarios
- **P (Party Mode)**: Bring multi-tenant security and AI safety perspectives
- **C (Continue)**: Accept tests and proceed to reporting design
- **[Specific refinements]**: Describe isolation testing concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: tenant isolation tests, AI agent tests, tier boundary tests
- Process enhanced insights on isolation test coverage
- Ask user: "Accept these refined isolation tests? (y/n)"
- If yes, integrate into test design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review tenant isolation tests for multi-tenant AI platform"
- Process multi-tenant security and AI safety perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save tenant isolation tests to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-reporting.md`

---

## Verification

- [ ] Cross-tenant data access tests defined
- [ ] Model-specific isolation tests designed
- [ ] AI agent boundary tests specified
- [ ] Shared resource tests documented
- [ ] Tier boundary tests defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Cross-tenant access test cases
- Tenant model-specific test cases
- AI agent isolation test cases
- Shared resource test cases
- Tier boundary test cases
- **Output to:** `{output_folder}/planning-artifacts/security/test-cases.md`

---

## Next Step

Proceed to `step-04-c-reporting.md` to design reporting and remediation procedures.
