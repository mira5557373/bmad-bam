# Step 02: Secrets Analysis (Create Mode - ZSR)

## MANDATORY EXECUTION RULES (READ FIRST):

- STOP NEVER generate content without user input
- READ CRITICAL: ALWAYS read the complete step file before taking any action
- LOOP CRITICAL: When loading next step with 'C', ensure entire file is read
- PAUSE ALWAYS pause after presenting findings and await user direction
- TARGET Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- TARGET Focus: Analyze secrets requirements for multi-tenant platform
- SAVE Track: Document secret types, access patterns, tenant isolation
- READ Context: Load secrets-management.md pattern
- STOP Do NOT: Design rotation policies yet (step-03)
- SEARCH Use web search: Verify current secrets management best practices

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Identifying secret types and categories
- Mapping secrets to tenant isolation model
- Analyzing access patterns and requirements
- Selecting vault provider approach

**OUT OF SCOPE:**
- Rotation policies (step-03)
- Threat modeling (ZST steps)
- Incident response (ZIR steps)
- Validation (separate mode)

## YOUR TASK

Analyze the secrets management requirements for the multi-tenant SaaS platform. Identify all secret types, map them to the tenant isolation model, and determine vault integration requirements.

---

## Purpose

Analyze secrets requirements including tenant-scoped credentials, API keys, encryption keys, and agent tokens. Map secrets to the selected tenant isolation model and determine vault integration approach.

---

## Prerequisites

- Step 01 completed: ZSR focus selected (or ALL)
- **Load patterns:** `{project-root}/_bmad/bam/data/patterns/secrets-management.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`
- Tenant model: `{tenant_model}`

**Web Research (Required):**

Search the web: "secrets management multi-tenant SaaS {date}"
Search the web: "HashiCorp Vault tenant isolation patterns {date}"
Search the web: "cloud secrets manager comparison {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Secret Type Inventory

Identify and categorize all secret types:

| Secret Type | Category | Tenant Scope | Rotation | Storage |
|-------------|----------|--------------|----------|---------|
| Database credentials | Infrastructure | Platform | 90 days | Vault |
| API gateway keys | Infrastructure | Platform | 90 days | Vault |
| Tenant API keys | Customer | Per-tenant | On-demand | Vault |
| OAuth client secrets | Integration | Per-tenant | 30 days | Vault |
| Encryption keys (DEK) | Data protection | Per-tenant | 365 days | KMS |
| Encryption keys (KEK) | Data protection | Platform | 365 days | HSM/KMS |
| Agent tokens | AI runtime | Per-tenant | 15 min TTL | Vault |
| Service account creds | Infrastructure | Platform | 90 days | Vault |
| Webhook signing keys | Integration | Per-tenant | On-demand | Vault |
| TLS certificates | Infrastructure | Platform | 90 days | Cert manager |

### 2. Tenant Isolation Model Mapping

Map secrets to tenant isolation model (`{tenant_model}`):

| Tenant Model | Secret Isolation | Namespace Pattern | Access Pattern |
|--------------|------------------|-------------------|----------------|
| row-level-security | Path-based | `tenants/{tenant_id}/` | Policy per tenant |
| schema-per-tenant | Namespace | `schema-{tenant_id}/` | Schema-scoped |
| database-per-tenant | Full isolation | `db-{tenant_id}/` | Database-scoped |

**Selected Model Implications:**

```
{tenant_model} Secrets Structure:

Platform Secrets (shared infrastructure):
  path: platform/
  access: [infrastructure, ci-cd, admin]

Tenant Secrets (isolated per tenant):
  path: tenants/{tenant_id}/
  access: [tenant-service-{tenant_id}]

User-Managed Secrets (customer-controlled):
  path: tenants/{tenant_id}/user-keys/
  access: [tenant-user-{tenant_id}]
```

### 3. Vault Provider Selection

Evaluate vault providers for the platform:

| Provider | Pros | Cons | Best For |
|----------|------|------|----------|
| HashiCorp Vault | Full control, audit, namespaces | Operational overhead | Self-hosted, compliance |
| AWS Secrets Manager | AWS-native, Lambda rotation | Vendor lock-in | AWS-primary |
| Azure Key Vault | Azure-native, managed identity | Azure-only | Azure-primary |
| GCP Secret Manager | GCP-native, IAM integration | GCP-only | GCP-primary |
| Multi-cloud | Flexibility | Complexity | Multi-cloud deployment |

**Selection Criteria:**
- [ ] Cloud platform alignment
- [ ] Tenant isolation requirements
- [ ] Rotation automation capability
- [ ] Audit logging completeness
- [ ] Compliance certification

### 4. Access Pattern Analysis

Document secret access patterns:

| Consumer | Secret Types | Access Frequency | TTL Strategy |
|----------|--------------|------------------|--------------|
| API Gateway | API keys, TLS certs | Per-request | Cache 5 min |
| Application Services | DB creds, API keys | Connection pool | Cache 15 min |
| AI Agents | Agent tokens | Per-execution | No cache |
| Background Jobs | Service accounts | Per-job | Lease-based |
| CI/CD Pipeline | Deploy secrets | Per-deployment | One-time |

### 5. Agent Credential Requirements

Design agent credential flow for AI runtime:

```
Agent Execution Request
         |
         v
+------------------+     +------------------+
| Request Token    |---->| Vault Issues     |
| (tenant_id,      |     | Scoped Token     |
|  scope, ttl=15m) |     | (short-lived)    |
+------------------+     +------------------+
                                |
         +----------------------+----------------------+
         v                                             v
+------------------+                        +------------------+
| Tool Access      |                        | Renew Before     |
| (Scoped to       |                        | Expiry (if       |
|  tenant)         |                        |  needed)         |
+------------------+                        +------------------+
```

| Agent Token Attribute | Value | Rationale |
|-----------------------|-------|-----------|
| TTL | 15 minutes | Minimize exposure window |
| Max TTL | 60 minutes | Limit long-running tasks |
| Renewable | Yes | Support extended operations |
| Scopes | read, execute | Least privilege |
| Tenant bound | Yes | Prevent cross-tenant access |

---

## COLLABORATION MENUS (A/P/C):

After analyzing secrets requirements, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific secret categories
- **P (Party Mode)**: Bring security, ops, compliance perspectives
- **C (Continue)**: Proceed to rotation policy design
- **[Specific category]**: Focus on tenant keys, agent tokens, etc.

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: secret inventory, tenant model, vault selection
- Clarify specific secret handling requirements
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review secrets analysis for multi-tenant security"
- Present perspectives from Security Architect, Platform Engineer, Compliance
- Return to A/P/C menu

#### If 'C' (Continue):
- Document secrets analysis
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to `step-03-c-secrets-rotation.md`

---

## Verification

- [ ] All secret types identified and categorized
- [ ] Tenant isolation model mapped to secrets structure
- [ ] Vault provider evaluated and selected
- [ ] Access patterns documented
- [ ] Agent credential requirements defined
- [ ] Web research citations documented

---

## Outputs

- Secret type inventory with categories
- Tenant isolation mapping for secrets
- Vault provider selection with rationale
- Access pattern documentation
- Agent credential flow design

---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Secret inventory comprehensive
- [ ] Tenant isolation properly addressed
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing secret types:** Use Advanced Elicitation (A) to discover
- **Unclear tenant isolation:** Return to master architecture
- **Conflicting requirements:** Use Party Mode (P) for resolution

## Next Step

Proceed to `step-03-c-secrets-rotation.md` for rotation policy design.
