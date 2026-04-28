# Step 05: Threat Mitigations Design (Create Mode - ZST)

## MANDATORY EXECUTION RULES (READ FIRST):

- STOP NEVER generate content without user input
- READ CRITICAL: ALWAYS read the complete step file before taking any action
- LOOP CRITICAL: When loading next step with 'C', ensure entire file is read
- PAUSE ALWAYS pause after presenting findings and await user direction
- TARGET Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- TARGET Focus: Design mitigations for identified STRIDE threats
- SAVE Track: Document controls per threat with implementation details
- READ Context: Build on step-04 threat analysis
- STOP Do NOT: Begin incident response (step-06)
- SEARCH Use web search: Verify current mitigation best practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Control mapping to threats
- Attack tree construction
- Mitigation implementation design
- Defense-in-depth layering

**OUT OF SCOPE:**
- New threat identification (step-04)
- Secrets management (ZSR steps)
- Incident response (ZIR steps)
- Validation (separate mode)

## YOUR TASK

Design security controls and mitigations for all identified STRIDE threats. Map controls to threats, construct attack trees with mitigations, and design defense-in-depth layers for the multi-tenant platform.

---

## Purpose

Design comprehensive threat mitigations including control mappings, attack tree analysis, and defense-in-depth architecture to address all identified STRIDE threats.

---

## Prerequisites

- Step 04 completed: STRIDE threat analysis
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/zero-trust.md`
- **Load domain:** `{project-root}/_bmad/bam/data/domains/security.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-s3.md`

**Web Research (Required):**

Search the web: "STRIDE threat mitigation patterns {date}"
Search the web: "zero trust architecture implementation {date}"
Search the web: "AI security guardrails best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Threat-to-Control Mapping

Map identified threats to security controls:

| Threat | Control | Implementation | Verification |
|--------|---------|----------------|--------------|
| Credential stuffing | Rate limiting + MFA | API gateway rules, OIDC | Penetration test |
| Token forgery | JWT signature validation | RS256 with key rotation | Unit tests |
| Tenant ID spoofing | Tenant context validation | Middleware enforcement | Integration tests |
| Cross-tenant access | RLS policies | PostgreSQL RLS | Isolation tests |
| SQL injection | Parameterized queries + RLS | ORM + DB policies | SAST, DAST |
| Prompt injection | Input sanitization + classifier | ML filter + rules | Red team |
| Data exfiltration | Output filtering + PII detection | Post-processing | Output scanning |
| Token exhaustion | Budget limits + alerts | Per-tenant quotas | Load tests |
| Privilege escalation | RBAC + tenant check | Authorization middleware | Access audit |
| Session fixation | Session regeneration | Auth flow | Security tests |

### 2. Attack Tree with Mitigations

Construct attack trees with mitigation at each node:

```
ATTACK GOAL: Access Other Tenant's Data
|
+-- Via Application Layer
|   |
|   +-- IDOR Vulnerability
|   |   |
|   |   +-- [MITIGATE] Tenant context validation in every request
|   |   +-- [MITIGATE] Resource ownership check at data layer
|   |   +-- [DETECT] Cross-tenant access logging + alerting
|   |
|   +-- SQL Injection
|   |   |
|   |   +-- [MITIGATE] Parameterized queries (ORM)
|   |   +-- [MITIGATE] RLS as defense-in-depth
|   |   +-- [DETECT] WAF SQL injection rules
|   |
|   +-- Business Logic Bypass
|       |
|       +-- [MITIGATE] Authorization checks at service layer
|       +-- [MITIGATE] Tenant-scoped transactions
|       +-- [DETECT] Anomaly detection on access patterns
|
+-- Via AI Agent
|   |
|   +-- Prompt Injection
|   |   |
|   |   +-- [MITIGATE] Input sanitization + pattern blocking
|   |   +-- [MITIGATE] Classifier model for injection detection
|   |   +-- [MITIGATE] Separate system/user prompts
|   |   +-- [DETECT] Alert on classifier triggers
|   |
|   +-- Tool Permission Bypass
|   |   |
|   |   +-- [MITIGATE] Scoped tool access per tenant
|   |   +-- [MITIGATE] Tool allowlist enforcement
|   |   +-- [DETECT] Tool invocation audit logging
|   |
|   +-- Memory Leak (Cross-Tenant)
|       |
|       +-- [MITIGATE] Isolated memory per tenant session
|       +-- [MITIGATE] Memory clearing on session end
|       +-- [DETECT] Memory content scanning
|
+-- Via Infrastructure
    |
    +-- Network Sniffing
    |   |
    |   +-- [MITIGATE] mTLS for all internal traffic
    |   +-- [MITIGATE] TLS 1.3 for external traffic
    |   +-- [DETECT] Network anomaly detection
    |
    +-- Database Direct Access
        |
        +-- [MITIGATE] Network isolation (VPC)
        +-- [MITIGATE] Credential rotation
        +-- [MITIGATE] RLS enforced regardless of connection
        +-- [DETECT] Database audit logging
```

### 3. Defense-in-Depth Architecture

Design layered security controls:

```
+----------------------------------------------------------+
|                    EDGE LAYER                             |
|  WAF | DDoS Protection | Rate Limiting | Bot Detection   |
+----------------------------------------------------------+
                            |
+----------------------------------------------------------+
|                   GATEWAY LAYER                           |
|  AuthN | API Validation | Request Logging | IP Filtering |
+----------------------------------------------------------+
                            |
+----------------------------------------------------------+
|                  SERVICE LAYER                            |
|  AuthZ | Tenant Context | Business Logic | Input Valid   |
+----------------------------------------------------------+
                            |
+----------------------------------------------------------+
|                    DATA LAYER                             |
|  RLS | Encryption | Audit Logging | Backup Protection    |
+----------------------------------------------------------+
                            |
+----------------------------------------------------------+
|                   AI/AGENT LAYER                          |
|  Prompt Filter | Tool Permissions | Budget Limits | Kill |
+----------------------------------------------------------+
```

**Layer-by-Layer Controls:**

| Layer | Threats Mitigated | Controls |
|-------|-------------------|----------|
| Edge | DDoS, Bot attacks, Known exploits | WAF, CDN protection, rate limits |
| Gateway | Spoofing, Tampering, Bad input | JWT validation, schema validation |
| Service | Authorization bypass, Business logic | RBAC, tenant checks, validation |
| Data | Data exposure, Injection | RLS, encryption, parameterized queries |
| AI/Agent | Prompt injection, Data leak | Input filter, output filter, budgets |

### 4. Multi-Tenant Isolation Controls

Design tenant isolation controls:

| Isolation Point | Control | Implementation |
|-----------------|---------|----------------|
| Request parsing | Tenant ID extraction | JWT claims / API key lookup |
| Request validation | Tenant ID verification | Middleware validation |
| Service layer | Tenant context injection | Thread-local / context propagation |
| Database queries | RLS enforcement | PostgreSQL policies |
| Cache access | Key prefixing | `tenant:{tenant_id}:{key}` |
| File storage | Path scoping | `/{tenant_id}/` prefix |
| AI memory | Session isolation | Tenant-scoped memory stores |
| Logging | Tenant attribution | `tenant_id` in all logs |

**Critical Control: Tenant Context Propagation**

```
Request
   |
   v
+------------------+
| Extract Tenant   |<-- From JWT, API key, or header
| ID from Request  |
+------------------+
   |
   v
+------------------+
| Validate Tenant  |<-- Verify tenant exists and active
| Status           |
+------------------+
   |
   v
+------------------+
| Set Tenant       |<-- Thread-local or async context
| Context          |
+------------------+
   |
   v
+------------------+
| All Operations   |<-- Every DB query, cache access,
| Use Context      |    file operation uses context
+------------------+
```

### 5. AI Guardrail Implementation

Design AI-specific security controls:

| Guardrail | Purpose | Implementation | Bypass = P0 |
|-----------|---------|----------------|-------------|
| Input sanitization | Block injection | Regex + ML classifier | Yes |
| System prompt isolation | Protect instructions | Separate message types | Yes |
| Output filtering | Prevent data leak | PII detection | Yes |
| Tool permissions | Least privilege | Allowlist + tenant scope | Yes |
| Budget limits | Prevent exhaustion | Per-tenant token limits | No |
| Kill switch | Emergency stop | Immediate execution halt | Yes |
| Human-in-the-loop | High-risk approval | Approval workflow | Yes |

**AI Security Flow:**

```
User Input
    |
    v
+----------------+    +----------------+
| Pattern        |--->| Block Known   |
| Matching       |    | Attacks       |
+----------------+    +----------------+
    |
    v
+----------------+    +----------------+
| ML Classifier  |--->| Score Risk    |
| (Injection)    |    | Level         |
+----------------+    +----------------+
    |
    v
+----------------+
| Risk Score     |
| Threshold      |
+----------------+
    |
    +--- High Risk ---> Block + Alert
    |
    +--- Medium Risk ---> Flag for Review
    |
    +--- Low Risk ---> Process
            |
            v
      +----------------+
      | Execute with   |
      | Tenant Scope   |
      +----------------+
            |
            v
      +----------------+    +----------------+
      | Output PII     |--->| Redact/Block  |
      | Detection      |    | if PII Found  |
      +----------------+    +----------------+
            |
            v
      Return Response
```

---

## COLLABORATION MENUS (A/P/C):

After designing mitigations, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific control implementations
- **P (Party Mode)**: Bring security architect, platform engineer, compliance perspectives
- **C (Continue)**: Proceed to next focus area or complete ZST
- **[Specific control]**: Focus on AI guardrails, tenant isolation, etc.

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: control mappings, attack trees
- Explore implementation details for specific controls
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review threat mitigation design for completeness"
- Present perspectives from Security Architect, Platform Engineer, Compliance
- Return to A/P/C menu

#### If 'C' (Continue):
- Document mitigation design
- Update frontmatter `stepsCompleted: [1, 4, 5]` or `[1, 2, 3, 4, 5]`
- Based on focus:
  - ZST only -> Complete, run validation
  - ALL -> Proceed to `step-06-c-incident-classification.md`

---

## Verification

- [ ] All critical threats have mitigations
- [ ] Attack trees constructed with mitigation nodes
- [ ] Defense-in-depth layers documented
- [ ] Multi-tenant isolation controls specified
- [ ] AI guardrails designed
- [ ] Web research citations documented

---

## Outputs

- Threat-to-control mapping matrix
- Attack tree diagrams with mitigations
- Defense-in-depth architecture
- Tenant isolation control specification
- AI guardrail implementation design

---

## SUCCESS METRICS:

- [ ] All critical/high threats mitigated
- [ ] Controls are implementable with selected technology
- [ ] Defense-in-depth provides multiple barriers
- [ ] User confirmed via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Unmitigated threats:** Identify compensating controls or accept risk
- **Control gaps:** Use Advanced Elicitation (A) for alternatives
- **Implementation unclear:** Use Party Mode (P) for platform guidance

## Next Step

Based on focus:
- **ZST only:** ZST section complete - run validation or select another focus
- **ALL:** Proceed to `step-06-c-incident-classification.md` for incident response
