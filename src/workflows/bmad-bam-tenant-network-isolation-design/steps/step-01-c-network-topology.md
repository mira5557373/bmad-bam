# Step 1: Network Topology

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
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the VPC architecture and network topology for tenant isolation with tier-specific configurations.

---

## Prerequisites

- Tenant model defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: security`

---

## Inputs

- User requirements for network isolation
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. VPC Architecture Design

Define VPC structure per tenant tier:

| Component | FREE/PRO (Shared) | ENTERPRISE (Dedicated) |
|-----------|-------------------|------------------------|
| VPC | Shared multi-tenant | Dedicated per tenant |
| Public Subnets | 3 (AZ distributed) | 3 (AZ distributed) |
| Private Subnets | 6 (App + Data) | 6 (App + Data) |
| NAT Gateway | Shared HA | Dedicated HA |
| Internet Gateway | Shared | Dedicated |
| VPC CIDR | 10.0.0.0/16 | 10.{tenant}.0.0/16 |

### 2. Subnet Design

Configure subnet allocation:

| Subnet Type | CIDR Pattern | Purpose |
|-------------|--------------|---------|
| Public Web | /24 | Load balancers, bastion |
| Private App | /22 | Application workloads |
| Private Data | /24 | Databases, caches |
| Private AI | /23 | AI inference workloads |

### 3. Availability Zone Distribution

Design for high availability:

- Minimum 2 AZs for production
- 3 AZs recommended for enterprise
- Cross-AZ replication for databases
- AZ-aware auto-scaling groups

**Verify current best practices with web search:**
Search the web: "AWS VPC multi-tenant architecture {date}"
Search the web: "VPC subnet design best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the network topology design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into VPC design decisions
- **P (Party Mode)**: Bring security and infrastructure perspectives for review
- **C (Continue)**: Accept network topology and proceed to security group design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save network topology to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-security-group-design.md`

---

## Verification

- [ ] VPC architecture documented per tier
- [ ] Subnet allocation defined
- [ ] AZ distribution planned
- [ ] CIDR ranges assigned
- [ ] Patterns align with pattern registry

---

## Outputs

- VPC architecture design
- Subnet allocation matrix

---

## Next Step

Proceed to `step-02-c-security-group-design.md` to define security group patterns.
