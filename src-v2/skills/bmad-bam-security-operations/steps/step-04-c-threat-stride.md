# Step 04: STRIDE Threat Analysis (Create Mode - ZST)

## MANDATORY EXECUTION RULES (READ FIRST):

- STOP NEVER generate content without user input
- READ CRITICAL: ALWAYS read the complete step file before taking any action
- LOOP CRITICAL: When loading next step with 'C', ensure entire file is read
- PAUSE ALWAYS pause after presenting findings and await user direction
- TARGET Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- TARGET Focus: Conduct STRIDE threat analysis for platform components
- SAVE Track: Document threats per component with severity ratings
- READ Context: Load security domain, zero-trust pattern
- STOP Do NOT: Design mitigations yet (step-05)
- SEARCH Use web search: Verify current threat modeling best practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- STRIDE threat categorization
- Component-by-component analysis
- Multi-tenant specific threats
- AI-specific threat vectors

**OUT OF SCOPE:**
- Mitigation design (step-05)
- Secrets management (ZSR steps)
- Incident response (ZIR steps)
- Validation (separate mode)

## YOUR TASK

Conduct STRIDE threat analysis for each major component of the multi-tenant SaaS platform. Identify threats across Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege.

---

## Purpose

Perform systematic threat modeling using the STRIDE methodology to identify security threats for each platform component, with special attention to multi-tenant isolation and AI-specific threats.

---

## Prerequisites

- Step 01 completed: ZST focus selected (or ALL)
- Master architecture defined (QG-F1 passed)
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/zero-trust.md`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/security.md` (Threat Modeling section)

**Web Research (Required):**

Search the web: "STRIDE threat modeling cloud applications {date}"
Search the web: "multi-tenant SaaS threat model {date}"
Search the web: "AI agent security threats {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. STRIDE Categories Reference

Review STRIDE categories before analysis:

| Category | Threat | Property Violated | Example |
|----------|--------|-------------------|---------|
| **S**poofing | Impersonation | Authentication | Forged JWT, stolen credentials |
| **T**ampering | Data modification | Integrity | SQL injection, request manipulation |
| **R**epudiation | Action denial | Non-repudiation | Missing audit logs, unsigned transactions |
| **I**nformation Disclosure | Data exposure | Confidentiality | Cross-tenant data leak, log exposure |
| **D**enial of Service | Availability impact | Availability | Resource exhaustion, tenant noisy neighbor |
| **E**levation of Privilege | Unauthorized access | Authorization | IDOR, privilege escalation |

### 2. Component Threat Matrix

Analyze each major component:

| Component | S | T | R | I | D | E | Priority |
|-----------|---|---|---|---|---|---|----------|
| API Gateway | X | X | - | X | X | X | High |
| Auth Service | X | X | X | X | - | X | Critical |
| Tenant Service | X | - | X | X | X | X | Critical |
| Database Layer | X | X | - | X | X | X | Critical |
| AI Agent Runtime | X | X | X | X | X | X | Critical |
| Cache Layer | X | X | - | X | X | - | Medium |
| Message Queue | - | X | X | X | X | - | Medium |
| File Storage | X | X | - | X | - | X | High |

Legend: X = Applicable threat, - = Lower risk

### 3. Detailed Threat Analysis per Component

#### API Gateway Threats

| STRIDE | Threat | Likelihood | Impact | Risk |
|--------|--------|------------|--------|------|
| S | Spoofed API requests with invalid tokens | Medium | High | High |
| T | Request body manipulation | Medium | High | High |
| I | API error messages leak internal details | High | Medium | High |
| D | Rate limit bypass, DDoS | High | High | Critical |
| E | API key with elevated permissions | Medium | Critical | Critical |

#### Auth Service Threats

| STRIDE | Threat | Likelihood | Impact | Risk |
|--------|--------|------------|--------|------|
| S | Credential stuffing, token forgery | High | Critical | Critical |
| T | Session token manipulation | Medium | Critical | Critical |
| R | Failed login attempts not logged | Medium | Medium | Medium |
| I | User enumeration via login responses | High | Medium | High |
| E | JWT claim manipulation for admin access | Medium | Critical | Critical |

#### Tenant Service Threats

| STRIDE | Threat | Likelihood | Impact | Risk |
|--------|--------|------------|--------|------|
| S | Tenant ID spoofing in requests | Medium | Critical | Critical |
| R | Tenant actions not auditable | Medium | High | High |
| I | Cross-tenant data access via IDOR | Medium | Critical | Critical |
| D | Tenant resource exhaustion affecting others | High | High | Critical |
| E | Tenant admin escalates to platform admin | Low | Critical | High |

#### Database Layer Threats

| STRIDE | Threat | Likelihood | Impact | Risk |
|--------|--------|------------|--------|------|
| S | Database credential theft | Low | Critical | High |
| T | SQL injection bypassing RLS | Medium | Critical | Critical |
| I | RLS policy bypass exposing tenant data | Medium | Critical | Critical |
| D | Query-based DoS (expensive queries) | High | High | Critical |
| E | Connection string with elevated privileges | Low | Critical | High |

#### AI Agent Runtime Threats

| STRIDE | Threat | Likelihood | Impact | Risk |
|--------|--------|------------|--------|------|
| S | Agent impersonation, forged context | Medium | High | High |
| T | Prompt injection to alter behavior | High | Critical | Critical |
| R | Agent actions not attributed to user | Medium | High | High |
| I | Data exfiltration via model outputs | High | Critical | Critical |
| D | Token/budget exhaustion attacks | High | High | Critical |
| E | Tool access escalation, jailbreak | Medium | Critical | Critical |

### 4. Multi-Tenant Specific Threats

Document threats unique to multi-tenant architecture:

| Threat | Description | Components Affected | Risk Level |
|--------|-------------|---------------------|------------|
| Cross-tenant data access | Accessing another tenant's data | All data paths | Critical |
| Tenant isolation bypass | Circumventing isolation controls | RLS, namespaces | Critical |
| Noisy neighbor | One tenant impacts others | Compute, DB, cache | High |
| Tenant enumeration | Discovering other tenants exist | API, auth | Medium |
| Shared resource poisoning | Cache/queue poisoning | Cache, MQ | High |
| Tenant impersonation | Acting as another tenant | Auth, API | Critical |

### 5. AI-Specific Threat Vectors

Document AI/LLM-specific threats:

| Threat | Attack Vector | Detection | Risk |
|--------|---------------|-----------|------|
| Prompt injection (direct) | Malicious user input | Pattern matching, classifier | Critical |
| Prompt injection (indirect) | Malicious external data | Output analysis, canary tokens | Critical |
| Jailbreak attempts | Bypassing guardrails | Behavior classifier | High |
| Data extraction | PII leakage via outputs | Output scanning, PII filter | Critical |
| Model manipulation | Adversarial inputs | Input validation | Medium |
| Token exhaustion | Expensive prompt attacks | Budget monitoring | High |
| Tool misuse | Exploiting tool permissions | Permission boundaries | High |

---

## COLLABORATION MENUS (A/P/C):

After completing STRIDE analysis, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific threat categories
- **P (Party Mode)**: Bring security architect, red team, compliance perspectives
- **C (Continue)**: Proceed to threat mitigation design
- **[Specific component]**: Focus on particular component threats

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: threat matrix, component analysis
- Explore specific attack scenarios in depth
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review STRIDE threat analysis completeness"
- Present perspectives from Security Architect, Red Team, Compliance
- Return to A/P/C menu

#### If 'C' (Continue):
- Document threat analysis
- Update frontmatter `stepsCompleted: [1, 4]` or `[1, 2, 3, 4]`
- Proceed to `step-05-c-threat-mitigations.md`

---

## Verification

- [ ] All major components analyzed
- [ ] STRIDE categories applied to each component
- [ ] Multi-tenant specific threats documented
- [ ] AI-specific threats documented
- [ ] Risk levels assigned (Critical/High/Medium/Low)
- [ ] Web research citations documented

---

## Outputs

- Component threat matrix
- Detailed threat analysis per component
- Multi-tenant threat catalog
- AI-specific threat vectors
- Risk-prioritized threat list

---

## SUCCESS METRICS:

- [ ] All platform components covered
- [ ] Threat likelihood and impact assessed
- [ ] Multi-tenant threats identified
- [ ] AI threats identified (if applicable)
- [ ] User confirmed via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing components:** Update architecture diagram, add components
- **Unclear threat scenarios:** Use Advanced Elicitation (A) for attack scenarios
- **Risk assessment inconsistent:** Use Party Mode (P) for calibration

## Next Step

Proceed to `step-05-c-threat-mitigations.md` for mitigation design.
