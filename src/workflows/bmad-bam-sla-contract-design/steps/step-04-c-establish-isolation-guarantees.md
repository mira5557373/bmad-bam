# Step 4: Establish Isolation Guarantees

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead
- Use web search to verify current best practices when making technology decisions

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Document tenant isolation SLAs covering data separation, compute isolation, network segmentation, and cross-tenant data protection guarantees.

---

## Prerequisites

- Step 3 (Design Latency SLAs) completed
- Latency SLAs documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `security`

---

## Inputs

- Latency SLAs from Step 3
- Tenant model configuration (`{tenant_model}`)
- Pattern registry: `{project-root}/_bmad/bam/data/tenant-models.csv`
- Security architecture documentation

---

## Actions

### 1. Define Data Isolation Guarantees

Establish data separation commitments per tier:

| Tier | Isolation Model | Data Separation Guarantee | Encryption |
|------|-----------------|---------------------------|------------|
| Free | Row-Level Security (RLS) | Logical isolation via tenant_id | At-rest (shared key) |
| Starter | Row-Level Security (RLS) | Logical isolation via tenant_id | At-rest (shared key) |
| Pro | Schema-per-Tenant | Schema-level isolation | At-rest (tenant key) |
| Enterprise | Database-per-Tenant | Physical database isolation | At-rest + in-transit (dedicated key) |
| Premium | Dedicated Infrastructure | Full physical isolation | Customer-managed keys |

### 2. Define Compute Isolation Guarantees

Establish processing isolation commitments:

| Tier | Compute Model | Noisy Neighbor Protection | Resource Guarantees |
|------|---------------|---------------------------|---------------------|
| Free | Shared pool | Best effort | No guarantee |
| Starter | Shared pool | Basic throttling | Burst available |
| Pro | Priority pool | Resource quotas | Reserved baseline |
| Enterprise | Dedicated pool | Isolated containers | Guaranteed capacity |
| Premium | Dedicated nodes | Physical isolation | Dedicated infrastructure |

### 3. Define Network Isolation Guarantees

Establish network segmentation commitments:

| Tier | Network Model | Ingress Control | Egress Control |
|------|---------------|-----------------|----------------|
| Free | Shared endpoints | API key auth | Platform-controlled |
| Starter | Shared endpoints | API key + rate limiting | Platform-controlled |
| Pro | Tenant namespaces | API key + IP allowlist | Configurable |
| Enterprise | Private endpoints | VPC peering available | Tenant-controlled |
| Premium | Dedicated endpoints | Private Link | Full control |

### 4. Define AI Context Isolation

Establish AI-specific isolation guarantees:

| Tier | Context Isolation | Model Memory | Embedding Isolation |
|------|-------------------|--------------|---------------------|
| Free | Request-level only | No persistence | Shared namespace |
| Starter | Session-level | Short-term cache | Prefixed namespace |
| Pro | Tenant-level | Dedicated cache | Isolated namespace |
| Enterprise | Full isolation | Encrypted storage | Dedicated vector DB |
| Premium | Physical separation | Customer-owned | Customer-managed |

### 5. Define Cross-Tenant Protection SLAs

Establish guarantees against cross-tenant data exposure:

| Protection | Guarantee | Verification | Response to Breach |
|------------|-----------|--------------|-------------------|
| Data Access | Zero unauthorized access | Continuous audit | Immediate notification |
| Prompt Injection | No cross-tenant prompt leakage | Guardrails monitoring | Investigation <1h |
| Model Poisoning | Tenant data cannot affect other tenants | Isolated training | Rollback + notify |
| Cache Isolation | No cache key collisions | Automated testing | Immediate invalidation |
| Log Separation | Tenant logs never mixed | Log audit | Immediate remediation |

### 6. Define Compliance Isolation

Establish compliance-related isolation guarantees:

| Compliance | Guarantee | Tier Availability | Documentation |
|------------|-----------|-------------------|---------------|
| SOC 2 Type II | Annual audit | Pro+ | Available on request |
| GDPR | Data residency control | Pro+ (EU region) | DPA provided |
| HIPAA | BAA available | Enterprise+ | BAA required |
| PCI DSS | Cardholder data isolation | Enterprise+ | Compliance report |
| FedRAMP | Government cloud | Premium only | Authorization docs |

**Verify current best practices with web search:**
Search the web: "multi-tenant isolation SLA best practices {date}"
Search the web: "tenant data protection guarantees SaaS {date}"
Search the web: "AI platform tenant isolation patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the isolation guarantees above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific isolation mechanisms and compliance requirements
- **P (Party Mode)**: Bring security and compliance perspectives for isolation review
- **C (Continue)**: Accept isolation guarantees and proceed to support tier design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: data isolation, compute isolation, AI context isolation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into isolation guarantees
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review isolation guarantees: {summary of data, compute, network, AI isolation}"
- Process collaborative analysis from security and compliance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save isolation guarantees to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-create-support-tiers.md`

---

## Verification

- [ ] Data isolation guarantees defined per tier
- [ ] Compute isolation model established
- [ ] Network isolation documented
- [ ] AI context isolation specified
- [ ] Cross-tenant protections detailed
- [ ] Compliance requirements mapped
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant isolation SLA matrix
- Cross-tenant protection guarantees
- Compliance isolation mapping

---

## Next Step

Proceed to `step-05-c-create-support-tiers.md` to design support response time tiers.
