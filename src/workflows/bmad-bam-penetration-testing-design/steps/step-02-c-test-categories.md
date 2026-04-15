# Step 2: Test Categories

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

Define detailed test categories, methodologies, and specific test cases for comprehensive security assessment of the multi-tenant AI platform.

---

## Prerequisites

- Step 1 completed: Scope definition with in-scope systems
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Authentication and Authorization Testing

Define auth-related test cases:

| Test ID | Test Name | Methodology | Expected Outcome |
|---------|-----------|-------------|------------------|
| AUTH-001 | Password brute force | Automated credential stuffing | Rate limiting blocks |
| AUTH-002 | Session hijacking | Session token manipulation | Sessions invalidated |
| AUTH-003 | JWT tampering | Algorithm confusion, claim modification | Signatures validated |
| AUTH-004 | OAuth flow bypass | Redirect URI manipulation | Strict validation |
| AUTH-005 | MFA bypass | Code reuse, timing attacks | MFA enforced |
| AUTH-006 | Privilege escalation | Role manipulation | RBAC enforced |
| AUTH-007 | API key exposure | Key enumeration, reuse | Keys rotated, scoped |
| AUTH-008 | Token refresh abuse | Refresh token replay | Token rotation works |

### 2. Input Validation Testing

Define input validation test cases:

| Test ID | Test Name | Attack Vector | Expected Outcome |
|---------|-----------|---------------|------------------|
| INP-001 | SQL injection | Parameterized input bypass | Queries parameterized |
| INP-002 | NoSQL injection | MongoDB/Redis query injection | Input sanitized |
| INP-003 | XSS (reflected) | Script injection in params | Output encoded |
| INP-004 | XSS (stored) | Script injection in data | Content sanitized |
| INP-005 | Command injection | OS command in input | Commands blocked |
| INP-006 | Path traversal | File path manipulation | Paths validated |
| INP-007 | SSRF | Internal URL access | URLs allowlisted |
| INP-008 | XML injection | XXE, XPath injection | XML parsing safe |

### 3. API Security Testing

Define API-specific test cases:

| Test ID | Test Name | Methodology | Expected Outcome |
|---------|-----------|-------------|------------------|
| API-001 | BOLA/IDOR | Object ID manipulation | Authorization enforced |
| API-002 | Mass assignment | Extra parameters in requests | Fields filtered |
| API-003 | Rate limiting | Request flooding | Limits enforced |
| API-004 | GraphQL introspection | Schema discovery | Introspection disabled |
| API-005 | GraphQL depth attack | Nested query abuse | Depth limits enforced |
| API-006 | WebSocket hijacking | Connection takeover | Auth on each message |
| API-007 | API versioning bypass | Old version access | Deprecated versions blocked |
| API-008 | Content-type confusion | MIME type manipulation | Types validated |

### 4. Data Security Testing

Define data protection test cases:

| Test ID | Test Name | Methodology | Expected Outcome |
|---------|-----------|-------------|------------------|
| DATA-001 | Encryption at rest | Database file analysis | Data encrypted |
| DATA-002 | Encryption in transit | TLS inspection | TLS 1.3 enforced |
| DATA-003 | Key management | Key access attempts | HSM protected |
| DATA-004 | Sensitive data exposure | API response analysis | PII masked |
| DATA-005 | Backup security | Backup access attempts | Backups encrypted |
| DATA-006 | Log leakage | Log content analysis | No sensitive data |
| DATA-007 | Cache security | Cache extraction | Caches encrypted |
| DATA-008 | Memory dump analysis | Runtime memory inspection | Secrets protected |

### 5. Infrastructure Testing

Define infrastructure test cases:

| Test ID | Test Name | Methodology | Expected Outcome |
|---------|-----------|-------------|------------------|
| INFRA-001 | Container escape | Container breakout attempts | Isolation maintained |
| INFRA-002 | Kubernetes RBAC | K8s API access | RBAC enforced |
| INFRA-003 | Network segmentation | Lateral movement attempts | Networks segmented |
| INFRA-004 | Secret management | Secret extraction attempts | Vault protected |
| INFRA-005 | Service mesh bypass | mTLS circumvention | mTLS enforced |
| INFRA-006 | Cloud metadata | IMDS access attempts | IMDS restricted |
| INFRA-007 | DNS security | DNS exfiltration | DNS filtered |
| INFRA-008 | Egress filtering | Outbound access attempts | Egress controlled |

### 6. Business Logic Testing

Define business logic test cases:

| Test ID | Test Name | Methodology | Expected Outcome |
|---------|-----------|-------------|------------------|
| BIZ-001 | Workflow bypass | Step skipping attempts | Workflows enforced |
| BIZ-002 | Race conditions | Concurrent request attacks | Transactions atomic |
| BIZ-003 | Negative testing | Invalid state transitions | States validated |
| BIZ-004 | Quota bypass | Limit circumvention | Quotas enforced |
| BIZ-005 | Price manipulation | Checkout tampering | Server-side validation |
| BIZ-006 | Feature flag bypass | Premium feature access | Flags server-side |
| BIZ-007 | Referral abuse | Self-referral attempts | Referrals validated |
| BIZ-008 | Time-based attacks | Expiry manipulation | Server timestamps |

**Verify current best practices with web search:**
Search the web: "OWASP testing guide {date}"
Search the web: "API security testing methodology {date}"
Search the web: "cloud infrastructure penetration testing {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the test categories above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific test categories
- **P (Party Mode)**: Bring security researcher perspectives on test coverage
- **C (Continue)**: Accept categories and proceed to tenant isolation tests
- **[Specific refinements]**: Describe testing concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: test categories, methodologies, expected outcomes
- Process enhanced insights on test coverage completeness
- Ask user: "Accept these refined test categories? (y/n)"
- If yes, integrate into test categories
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review penetration test categories for multi-tenant AI platform"
- Process security researcher and QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save test categories to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-tenant-isolation-tests.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the general testing framework.**

Present summary of:
- Testing scope with in-scope systems
- 6 test categories with 48+ test cases
- Methodologies for each test type

Ask for confirmation before proceeding to tenant-specific and AI-specific tests.

---

## Verification

- [ ] Authentication tests defined
- [ ] Input validation tests defined
- [ ] API security tests defined
- [ ] Data security tests defined
- [ ] Infrastructure tests defined
- [ ] Business logic tests defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Authentication test cases
- Input validation test cases
- API security test cases
- Data security test cases
- Infrastructure test cases
- Business logic test cases

---

## Next Step

Proceed to `step-03-c-tenant-isolation-tests.md` to design tenant-specific isolation tests.
