# Step 2: Security Group Design

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions

---

## Purpose

Define security group patterns for each layer of the application stack with tenant-aware rules.

---

## Prerequisites

- Step 1: Network Topology completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: security`

---

## Inputs

- Network topology from step 1
- Application architecture requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Layer-Based Security Groups

Define security groups per application layer:

| Security Group | Inbound | Outbound | Purpose |
|---------------|---------|----------|---------|
| sg-alb | 443 (0.0.0.0/0) | sg-app | Public load balancer |
| sg-app | 8080 (sg-alb) | sg-data, sg-cache | Application tier |
| sg-data | 5432 (sg-app) | None | Database tier |
| sg-cache | 6379 (sg-app) | None | Cache tier |
| sg-ai | 8000 (sg-app) | HTTPS (outbound) | AI inference tier |
| sg-bastion | 22 (VPN CIDR) | sg-* | Management access |

### 2. Tenant-Specific Rules

Configure tenant-aware security group modifications:

| Tier | Additional Rules |
|------|------------------|
| ENTERPRISE | Dedicated security groups |
| ENTERPRISE | Custom IP allowlists |
| PRO | Shared with tenant tagging |
| FREE | Shared, no customization |

### 3. Security Group Naming Convention

Establish naming standards:

```
{environment}-{tier}-{layer}-{tenant?}-sg
Example: prod-shared-app-sg
Example: prod-enterprise-app-acme-sg
```

**Verify current best practices with web search:**
Search the web: "AWS security group best practices multi-tenant {date}"
Search the web: "security group layered architecture {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the security group design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into security rule specifics
- **P (Party Mode)**: Bring security and compliance perspectives for review
- **C (Continue)**: Accept security group design and proceed to VPC peering
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save security group design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-vpc-peering.md`

---

## Verification

- [ ] Security groups defined per layer
- [ ] Tenant-specific rules documented
- [ ] Naming convention established
- [ ] Least privilege principle applied
- [ ] Patterns align with pattern registry

---

## Outputs

- Security group matrix
- Tenant-specific rule configurations

---

## Next Step

Proceed to `step-03-c-vpc-peering.md` to configure VPC connectivity.
