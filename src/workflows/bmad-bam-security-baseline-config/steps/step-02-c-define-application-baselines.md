# Step 2: Define Application Baselines

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- SEARCH Use web search to verify current best practices when making technology decisions

---

## Purpose

Define security configuration baselines for application components including web servers, APIs, and authentication.

## Prerequisites

- Infrastructure baselines from Step 1
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Define Web Application Baselines

| Setting | Baseline | OWASP Reference |
|---------|----------|-----------------|
| Headers | Security headers set | A05:2021 |
| CORS | Strict origins | A01:2021 |
| Session | Secure flags, short TTL | A07:2021 |
| Input | Validation, sanitization | A03:2021 |
| Output | Encoding, escaping | A03:2021 |

### 2. Define API Security Baselines

| Setting | Baseline | Rationale |
|---------|----------|-----------|
| Authentication | OAuth 2.0 / JWT | Standard auth |
| Authorization | RBAC/ABAC | Access control |
| Rate Limiting | Per-tenant limits | Abuse prevention |
| Input Validation | Schema validation | Injection prevention |
| TLS | 1.3 minimum | Transport security |

### 3. Define Authentication Baselines

| Setting | Baseline | NIST Reference |
|---------|----------|----------------|
| Password Policy | 12+ chars, complexity | SP 800-63B |
| MFA | Required for admin | SP 800-63B |
| Session Timeout | 1 hour idle | SP 800-63B |
| Lockout | 5 failures, 15 min | SP 800-63B |
| Password Storage | Argon2id | SP 800-63B |

### 4. Define Logging Baselines

| Log Type | Retention | Content |
|----------|-----------|---------|
| Access Logs | 90 days | Who, what, when |
| Security Events | 1 year | Auth, authz failures |
| Audit Trail | 7 years | Data changes |
| Error Logs | 30 days | Errors (no secrets) |

**Verify current best practices with web search:**
Search the web: "OWASP application security baseline {date}"
Search the web: "API security best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review web baselines
- **A2**: Analyze API baselines
- **A3**: Evaluate auth baselines
- **A4**: Assess logging baselines

### [P]ropose Changes
- **P1**: Propose web adjustments
- **P2**: Propose API changes
- **P3**: Suggest auth improvements
- **P4**: Recommend logging enhancements

### [C]ontinue
- **C1**: Accept application baselines
- **C2**: Mark step complete and load `step-03-c-define-ai-baselines.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Web baselines defined
- [ ] API baselines configured
- [ ] Authentication baselines documented
- [ ] Logging baselines specified
- [ ] Patterns align with pattern registry

## Outputs

- Web application baseline
- API security baseline
- Authentication baseline
- Logging baseline

## Next Step

Proceed to `step-03-c-define-ai-baselines.md`.
