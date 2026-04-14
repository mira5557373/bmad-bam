# Step 2: Design Vault Integration

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

Design the vault architecture, authentication methods, secret engines, and high availability configuration for the multi-tenant AI platform.

## Prerequisites

- Secret classification defined in Step 1
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Secret classification from Step 1
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Define Vault Architecture

Select vault deployment model:

| Option | Description | Use Case | HA |
|--------|-------------|----------|-----|
| HashiCorp Vault | Self-managed, full control | Enterprise | Yes |
| AWS Secrets Manager | Managed, AWS-native | AWS-first | Yes |
| Azure Key Vault | Managed, Azure-native | Azure-first | Yes |
| GCP Secret Manager | Managed, GCP-native | GCP-first | Yes |
| Vault + Cloud KMS | Hybrid, cloud seal | Multi-cloud | Yes |

### 2. Configure Authentication Methods

Define auth methods per client type:

| Client Type | Auth Method | Token TTL | Renewal |
|-------------|-------------|-----------|---------|
| Applications | AppRole | 1 hour | Auto-renew |
| Services | Kubernetes | 30 min | Pod identity |
| Operators | OIDC/LDAP | 8 hours | Re-auth |
| CI/CD | JWT | 15 min | Per job |
| Tenant Apps | Dynamic | Per tier | Auto-renew |

### 3. Design Secret Engines

Configure secret engines:

| Engine | Purpose | Path | Rotation |
|--------|---------|------|----------|
| KV v2 | Static secrets | `/secret/` | Manual |
| Database | DB credentials | `/database/` | Dynamic |
| PKI | Certificates | `/pki/` | Dynamic |
| Transit | Encryption | `/transit/` | Key rotation |
| AWS/Azure/GCP | Cloud credentials | `/cloud/` | Dynamic |

### 4. Design Multi-Tenant Paths

Create path structure:

| Path | Purpose | Access |
|------|---------|--------|
| `/platform/*` | Platform-wide secrets | Platform team |
| `/tenant/{id}/*` | Tenant-specific secrets | Tenant + Platform |
| `/ai/*` | AI/LLM credentials | AI team |
| `/shared/*` | Shared services | Service accounts |

**Verify current best practices with web search:**
Search the web: "HashiCorp Vault multi-tenant architecture {date}"
Search the web: "secrets management vault best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review vault architecture options
- **A2**: Analyze authentication method security
- **A3**: Evaluate secret engine coverage
- **A4**: Assess path structure for multi-tenancy

### [P]ropose Changes
- **P1**: Propose alternative vault solutions
- **P2**: Propose auth method adjustments
- **P3**: Suggest additional secret engines
- **P4**: Recommend path structure changes

### [C]ontinue
- **C1**: Accept current vault integration and proceed to rotation policies
- **C2**: Mark step complete and load `step-03-c-design-rotation-policies.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Vault architecture defined
- [ ] Authentication methods configured
- [ ] Secret engines designed
- [ ] Multi-tenant paths structured
- [ ] Patterns align with pattern registry

## Outputs

- Vault architecture diagram
- Authentication method configuration
- Secret engine specifications
- Path structure documentation

## Next Step

Proceed to `step-03-c-design-rotation-policies.md` to design rotation policies.
