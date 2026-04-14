# Step 1: Scope Definition

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

Define the scope, objectives, and rules of engagement for penetration testing of the multi-tenant AI platform.

---

## Prerequisites

- Master architecture document loaded
- Security assessment findings (if available)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Inputs

- User requirements for penetration testing
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Testing Objectives

Document primary testing objectives:

| Objective | Priority | Success Criteria |
|-----------|----------|------------------|
| Validate tenant isolation | Critical | No cross-tenant data access |
| Identify authentication weaknesses | Critical | Auth bypass not possible |
| Test AI agent security boundaries | Critical | Agent cannot exceed permissions |
| Assess API security | High | No unauthorized access paths |
| Evaluate data protection | High | Sensitive data protected |
| Test infrastructure security | High | No infrastructure compromise |
| Assess compliance controls | Medium | Controls function as designed |

### 2. Define In-Scope Systems

Identify systems included in testing:

| System Category | Components | Environment | Priority |
|-----------------|------------|-------------|----------|
| Authentication | OAuth, JWT, MFA | Staging | Critical |
| Tenant Isolation | RLS, Schema, Database | Staging | Critical |
| AI Runtime | Agent orchestration, tools | Staging | Critical |
| API Layer | REST, GraphQL, WebSocket | Staging | High |
| Data Storage | Databases, caches, queues | Staging | High |
| Infrastructure | Kubernetes, networking | Staging | High |
| Third-party Integrations | LLM providers, external APIs | Staging | Medium |
| Admin Interfaces | Management console | Staging | High |

### 3. Define Out-of-Scope Items

Document exclusions and rationale:

| Excluded Item | Rationale | Alternative Coverage |
|---------------|-----------|---------------------|
| Production environment | Risk of disruption | Staging mirrors prod |
| Physical security | Separate assessment | Physical audit program |
| Social engineering | Separate program | Security awareness training |
| DDoS testing | Requires coordination | Separate DDoS assessment |
| Third-party SaaS | Not our systems | Vendor security reviews |

### 4. Define Rules of Engagement

Establish testing boundaries:

| Rule | Description | Enforcement |
|------|-------------|-------------|
| Test environment only | No production testing | IP allowlisting |
| Test tenant accounts | Dedicated test tenants only | Tenant ID validation |
| Working hours testing | Weekdays 9am-6pm UTC | Monitoring alerts |
| No data destruction | Read and write test data only | Account permissions |
| Immediate disclosure | Critical findings reported immediately | Communication channel |
| Evidence preservation | All findings documented | Testing logs |

### 5. Define Testing Timeline

Establish testing phases and duration:

| Phase | Duration | Activities | Deliverables |
|-------|----------|------------|--------------|
| Reconnaissance | 2 days | Information gathering, mapping | Asset inventory |
| Authentication Testing | 3 days | Auth bypass, session testing | Auth findings |
| Tenant Isolation Testing | 5 days | Cross-tenant access attempts | Isolation report |
| AI Agent Testing | 4 days | Prompt injection, permission bypass | Agent security report |
| API Security Testing | 3 days | Input validation, access control | API findings |
| Infrastructure Testing | 3 days | Network, container security | Infrastructure report |
| Reporting | 3 days | Analysis, documentation | Final report |

### 6. Define Communication Protocol

Establish communication procedures:

| Scenario | Contact | Method | Timeline |
|----------|---------|--------|----------|
| Critical vulnerability | Security Lead | Phone + Email | Immediate |
| High vulnerability | Security Team | Slack + Email | 4 hours |
| Testing blocked | Platform Team | Slack | 1 hour |
| Daily status | Stakeholders | Email | Daily 5pm |
| Final report | Leadership | Meeting + Document | End of engagement |

**Verify current best practices with web search:**
Search the web: "penetration testing scope definition best practices {date}"
Search the web: "multi-tenant security testing methodology {date}"
Search the web: "pentest rules of engagement templates {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the scope definition above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific scope areas
- **P (Party Mode)**: Bring security and legal perspectives on scope
- **C (Continue)**: Accept scope and proceed to test categories
- **[Specific refinements]**: Describe scope concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: testing objectives, in-scope systems, rules of engagement
- Process enhanced insights on scope completeness
- Ask user: "Accept these refined scope definitions? (y/n)"
- If yes, integrate into scope definition
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review penetration testing scope for multi-tenant AI platform"
- Process security and legal perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save scope definition to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-test-categories.md`

---

## Verification

- [ ] All testing objectives defined
- [ ] In-scope systems identified
- [ ] Exclusions documented with rationale
- [ ] Rules of engagement established
- [ ] Timeline defined
- [ ] Communication protocol established
- [ ] Patterns align with pattern registry

---

## Outputs

- Testing objectives
- In-scope systems inventory
- Exclusions list
- Rules of engagement
- Testing timeline
- Communication protocol

---

## Next Step

Proceed to `step-02-c-test-categories.md` to define test categories and methodologies.
