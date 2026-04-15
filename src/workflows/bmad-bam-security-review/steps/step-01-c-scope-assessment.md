# Step 1: Scope Assessment

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

Define the scope of the security assessment, identifying systems, components, trust boundaries, and threat actors relevant to the multi-tenant AI platform.

---

## Prerequisites

- Master architecture document loaded
- Module architecture documents (if available)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---


## Inputs

- User requirements and constraints for security review
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Assessment Scope

Identify components in scope for security review:

| Component | In Scope | Priority | Rationale |
|-----------|----------|----------|-----------|
| Tenant isolation layer | Yes | Critical | Core security boundary |
| AI runtime/agents | Yes | Critical | AI safety concerns |
| Authentication/authorization | Yes | Critical | Identity boundary |
| Data storage | Yes | High | Tenant data protection |
| API layer | Yes | High | External attack surface |
| Background jobs | Yes | Medium | Privilege escalation risk |
| Third-party integrations | Yes | Medium | Supply chain risk |
| Monitoring/logging | Yes | Low | Audit capability |

### 2. Identify Trust Boundaries

Document trust boundaries in the system:

| Boundary | Description | Controls |
|----------|-------------|----------|
| Internet → Platform | External users accessing platform | WAF, rate limiting, auth |
| Tenant A → Tenant B | Cross-tenant boundary | RLS, tenant_id validation |
| User → AI Agent | Human-AI interaction | Guardrails, approval workflow |
| AI Agent → Tools | Agent tool execution | Permission model, sandbox |
| Platform → External APIs | Outbound integrations | API keys, egress filtering |

### 3. Identify Threat Actors

Document relevant threat actors:

| Actor | Motivation | Capability | Target |
|-------|------------|------------|--------|
| External attacker | Data theft, ransom | High | Tenant data, credentials |
| Malicious tenant | Access other tenants | Medium | Tenant isolation |
| Compromised AI agent | Unintended behavior | Variable | System resources, data |
| Insider threat | Data exfiltration | High | All systems |
| Automated bot | Abuse, DoS | Medium | API endpoints |

### 4. Define Assessment Criteria

Establish criteria for security findings:

| Severity | Impact | Examples |
|----------|--------|----------|
| CRITICAL | Data breach, complete compromise | Cross-tenant data access, RCE |
| HIGH | Significant impact, limited scope | Auth bypass, privilege escalation |
| MEDIUM | Moderate impact | Information disclosure, DoS |
| LOW | Minor impact | Informational findings |

### 5. Document Compliance Requirements

Identify applicable compliance frameworks:

| Framework | Applicable | Key Requirements |
|-----------|------------|------------------|
| SOC 2 | Yes/No | Access controls, encryption |
| GDPR | Yes/No | Data protection, right to erasure |
| HIPAA | Yes/No | PHI protection, audit logs |
| PCI DSS | Yes/No | Payment data protection |
| ISO 27001 | Yes/No | ISMS implementation |

**Verify current best practices with web search:**
Search the web: "scope assessment best practices {date}"
Search the web: "scope assessment enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the scope assessment above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific scope areas
- **P (Party Mode)**: Bring security and compliance perspectives on scope
- **C (Continue)**: Accept scope and proceed to threat modeling
- **[Specific refinements]**: Describe scope concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: scope components, trust boundaries, threat actors
- Process enhanced insights on scope completeness
- Ask user: "Accept these refined scope definitions? (y/n)"
- If yes, integrate into scope assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security assessment scope for multi-tenant AI platform"
- Process security and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save scope assessment to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-threat-modeling.md`

---

## Verification

- [ ] All major components identified
- [ ] Trust boundaries documented
- [ ] Threat actors identified
- [ ] Assessment criteria defined
- [ ] Compliance requirements documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Assessment scope document
- Trust boundary diagram
- Threat actor profiles
- Assessment criteria

---

## Next Step

Proceed to `step-02-c-threat-modeling.md` to perform threat modeling.
