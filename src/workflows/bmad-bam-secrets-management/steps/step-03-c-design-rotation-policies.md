# Step 3: Design Rotation Policies

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics


---

## Purpose

Design secret rotation schedules, automated rotation mechanisms, emergency rotation procedures, and audit logging for compliance.

## Prerequisites

- Secret classification defined in Step 1
- Vault integration defined in Step 2
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Secret classification from Step 1
- Vault integration from Step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Rotation Schedules

Per secret type and sensitivity:

| Secret Type | Sensitivity | Rotation Period | Grace Period |
|-------------|-------------|-----------------|--------------|
| Database Passwords | Critical | 30 days | 24 hours |
| API Keys | High | 90 days | 7 days |
| Encryption Keys | Critical | 365 days | 30 days |
| TLS Certificates | High | 90 days | 14 days |
| OAuth Secrets | High | 180 days | 7 days |
| Service Tokens | Medium | 24 hours | 1 hour |

### 2. Configure Automated Rotation

Define automation approach:

| Component | Rotation Mechanism | Trigger | Verification |
|-----------|-------------------|---------|--------------|
| Database | Vault database engine | Schedule | Connection test |
| API Keys | Custom rotation lambda | Schedule | API call test |
| Certificates | cert-manager/Vault PKI | Before expiry | TLS handshake |
| Encryption | Vault transit rekey | Schedule | Encrypt/decrypt test |
| Cloud Creds | Cloud provider rotation | Dynamic | API call test |

### 3. Design Emergency Rotation

For security incidents:

| Scenario | Trigger | Scope | Timeline |
|----------|---------|-------|----------|
| Credential Leak | Incident report | Affected secrets | Immediate |
| Employee Departure | HR notification | User-accessible | 24 hours |
| Security Audit Finding | Audit report | Identified secrets | Per finding |
| Compliance Requirement | Regulatory notice | Scope defined | Per requirement |

### 4. Configure Audit Logging

Define audit requirements:

| Event | Log Content | Retention | Alert |
|-------|-------------|-----------|-------|
| Secret Access | Who, what, when, from | 7 years | Anomaly |
| Secret Creation | Creator, type, path | 7 years | None |
| Secret Rotation | Old/new version, trigger | 7 years | Failure |
| Auth Failure | Identity, reason, source | 1 year | Threshold |

**Soft Gate:** Steps 1-3 complete the core secrets management design. Present summary and ask for confirmation.

**Verify current best practices with web search:**
Search the web: "secret rotation automation best practices {date}"
Search the web: "credential rotation zero downtime {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review rotation schedules against compliance
- **A2**: Analyze automation coverage
- **A3**: Evaluate emergency procedures
- **A4**: Assess audit logging completeness

### [P]ropose Changes
- **P1**: Propose rotation schedule adjustments
- **P2**: Propose automation improvements
- **P3**: Suggest emergency procedure enhancements
- **P4**: Recommend audit logging additions

### [C]ontinue
- **C1**: Accept current rotation policies and proceed to documentation
- **C2**: Mark step complete and load `step-04-c-create-secrets-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Rotation schedules defined per secret type
- [ ] Automated rotation mechanisms configured
- [ ] Emergency rotation procedures documented
- [ ] Audit logging requirements defined
- [ ] Patterns align with pattern registry

## Outputs

- Rotation schedule matrix
- Automation configuration
- Emergency rotation runbook
- Audit logging specification

## Next Step

Proceed to `step-04-c-create-secrets-plan.md` to create the final documentation.
