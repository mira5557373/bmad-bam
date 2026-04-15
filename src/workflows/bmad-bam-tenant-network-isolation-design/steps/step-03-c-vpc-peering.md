# Step 3: VPC Peering

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

Configure VPC connectivity for enterprise tenants including peering, transit gateway, and private endpoints.

---

## Prerequisites

- Step 1: Network Topology completed
- Step 2: Security Group Design completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Inputs

- Network topology from step 1
- Security groups from step 2
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Transit Gateway Configuration

Design centralized connectivity:

| Component | Configuration |
|-----------|---------------|
| Transit Gateway | Regional hub for all VPCs |
| TGW Attachments | Per VPC (shared + enterprise) |
| Route Tables | Isolated per tenant tier |
| Routing | Selective per attachment |

### 2. VPC Peering Patterns

Define peering for enterprise tenants:

| Peering Type | Use Case | Route Propagation |
|--------------|----------|-------------------|
| Hub-Spoke | Platform -> Tenant VPCs | Via Transit Gateway |
| Direct Peering | Tenant -> External | Explicit routes only |
| Cross-Region | DR connectivity | Via TGW peering |

### 3. Private Link Endpoints

Configure PrivateLink for service access:

| Service | Endpoint Type | Access Control |
|---------|---------------|----------------|
| S3 | Gateway | VPC policy |
| RDS | Interface | Security group |
| AI Models | Interface | Security group |
| Secrets Manager | Interface | Security group |

**Soft Gate:** Steps 1-3 complete the network connectivity design. Present a summary of VPC peering and private endpoints. Ask for confirmation before proceeding to traffic isolation.

**Verify current best practices with web search:**
Search the web: "AWS Transit Gateway multi-tenant {date}"
Search the web: "VPC PrivateLink best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the VPC peering design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into connectivity edge cases
- **P (Party Mode)**: Bring infrastructure and security perspectives for review
- **C (Continue)**: Accept VPC peering design and proceed to traffic isolation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save VPC peering design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-traffic-isolation.md`

---

## Verification

- [ ] Transit Gateway configured
- [ ] VPC peering patterns defined
- [ ] Private Link endpoints specified
- [ ] Route tables documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Transit Gateway design
- VPC peering matrix
- Private Link endpoint configuration

---

## Next Step

Proceed to `step-04-c-traffic-isolation.md` to define traffic isolation mechanisms.
