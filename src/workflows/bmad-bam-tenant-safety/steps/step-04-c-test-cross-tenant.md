# Step 4: Test Cross-Tenant Attacks

## Purpose

Execute cross-tenant attack scenarios to verify all isolation controls are effective.

## Prerequisites

- Steps 1-3 complete
- Test tenants configured
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-isolation`

## Actions

### 1. Direct Access Attacks

| Attack Vector | Method | Target | Result | Status |
|---------------|--------|--------|--------|--------|
| ID enumeration | Guess tenant IDs | Resources | Denied | |
| IDOR | Manipulate resource ID | Data | Denied | |
| Path traversal | ../../tenant_b/ | Files | Denied | |
| Parameter tampering | tenant_id=other | API | Denied | |

### 2. Authentication/Session Attacks

| Attack Vector | Method | Target | Result | Status |
|---------------|--------|--------|--------|--------|
| Session hijacking | Steal session | Other tenant | Denied | |
| Token manipulation | Modify JWT | Tenant claim | Invalid | |
| Cookie tampering | Edit tenant cookie | Session | Denied | |
| OAuth confusion | Provider mismatch | Identity | Denied | |

### 3. AI-Specific Cross-Tenant Attacks

| Attack Vector | Method | Target | Result | Status |
|---------------|--------|--------|--------|--------|
| Prompt injection | Inject in shared context | Other tenant data | Blocked | |
| Memory extraction | Query memory | Other tenant memory | Denied | |
| RAG poisoning | Inject in retrieval | Other tenant docs | Blocked | |
| Model confusion | Multi-tenant prompt | Context leak | Blocked | |

### 4. Infrastructure-Level Attacks

| Attack Vector | Method | Target | Result | Status |
|---------------|--------|--------|--------|--------|
| Container escape | Exploit container | Host/other tenant | Blocked | |
| Network sniffing | Capture traffic | Other tenant data | Encrypted | |
| DNS rebinding | Redirect DNS | Internal services | Blocked | |
| SSRF | Server-side request | Internal endpoints | Blocked | |

### 5. Side-Channel Attacks

| Attack Vector | Method | Target | Result | Status |
|---------------|--------|--------|--------|--------|
| Timing analysis | Measure response time | Existence proof | Mitigated | |
| Resource exhaustion | Consume resources | Other tenant perf | Limited | |
| Error message leakage | Analyze errors | Tenant info | Sanitized | |
| Cache timing | Cache hit/miss | Data presence | Mitigated | |

**Verify cross-tenant attack testing with web search:**
Search the web: "cross-tenant attack testing methodology {date}"
Search the web: "multi-tenant penetration testing {date}"

## Verification

- [ ] Direct access attacks blocked
- [ ] Auth attacks blocked
- [ ] AI attacks blocked
- [ ] Infrastructure attacks blocked
- [ ] Side-channel mitigated

## Outputs

- Cross-tenant attack test results

## Next Step

Proceed to `step-05-c-generate-report.md`
