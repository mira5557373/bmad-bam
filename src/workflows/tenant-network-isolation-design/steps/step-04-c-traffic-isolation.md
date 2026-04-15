# Step 4: Traffic Isolation

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

Define traffic isolation mechanisms including NACLs, flow logs, and DDoS protection for tenant security.

---

## Prerequisites

- Step 1: Network Topology completed
- Step 2: Security Group Design completed
- Step 3: VPC Peering completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: security`

---

## Inputs

- Network topology from step 1
- Security groups from step 2
- VPC peering from step 3
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Network ACL Configuration

Define stateless network rules:

| NACL | Inbound Allow | Outbound Allow | Purpose |
|------|---------------|----------------|---------|
| nacl-public | 443, 80 | Ephemeral | Web traffic |
| nacl-private | App ports | Ephemeral | Internal traffic |
| nacl-data | DB ports (from app) | Ephemeral | Database access |
| nacl-mgmt | 22 (VPN only) | All | Management |

### 2. VPC Flow Logs

Configure comprehensive traffic logging:

| Log Type | Destination | Retention | Analysis |
|----------|-------------|-----------|----------|
| All Traffic | CloudWatch | 30 days | Athena |
| Rejected | S3 + Alert | 90 days | Security |
| Cross-tenant | S3 | 365 days | Compliance |

### 3. DDoS Protection

Design DDoS mitigation:

| Component | Protection Level | Scope |
|-----------|-----------------|-------|
| AWS Shield Standard | Auto | All resources |
| AWS Shield Advanced | Enterprise tier | Critical endpoints |
| WAF | All tiers | ALB, CloudFront |
| Rate Limiting | Tenant-aware | API Gateway |

### 4. Traffic Mirroring

Configure for security analysis:

- Mirror suspicious traffic to security VPC
- IDS/IPS integration points
- Tenant-tagged traffic for investigation
- Retention policies for captured traffic

**Verify current best practices with web search:**
Search the web: "AWS VPC flow logs security analysis {date}"
Search the web: "DDoS protection multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the traffic isolation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into traffic isolation edge cases
- **P (Party Mode)**: Bring security and operations perspectives for review
- **C (Continue)**: Finalize network isolation design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save complete network isolation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Generate final artifact

---

## Verification

- [ ] Network ACLs configured
- [ ] Flow logs enabled
- [ ] DDoS protection designed
- [ ] Traffic mirroring specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Network ACL matrix
- Flow log configuration
- DDoS protection design
- Complete network isolation document
- **Load template:** `{project-root}/_bmad/bam/data/templates/network-isolation-template.md`

---

## Workflow Complete

Create mode complete for tenant-network-isolation-design workflow.
