---
name: tenant-network-isolation-design
displayName: Tenant Network Isolation Design
description: Design network-level tenant isolation using VPC and security groups. Use when the user requests to 'design network isolation' or 'configure VPC security'.
module: bam
tags: [tenant, security, infrastructure]
---

# Tenant Network Isolation Design

## Overview

This workflow designs network-level tenant isolation using VPC architecture, security groups, and traffic isolation patterns. It ensures proper network segmentation for multi-tenant SaaS platforms with varying security requirements per tier.

Act as a Platform Security Architect designing network isolation boundaries.

**Args:** Accepts `--headless` / `-H` for autonomous execution.

## On Activation

Load available config from `{project-root}/_bmad/config.yaml` and `{project-root}/_bmad/config.user.yaml` (root and `bam` section). Resolve:

- `{user_name}`, `{communication_language}`, `{document_output_language}`, `{output_folder}`

Search for and load `{project-root}/**/project-context.md` as foundational reference for project decisions and constraints.

**If running in headless mode (`-H`):** Use defaults for all optional inputs, skip confirmation prompts, and auto-proceed through all steps.

**Note:** If the user provides additional information during guided steps, capture it for later use without breaking the current flow.

## When to Use

- Designing VPC architecture for multi-tenant platforms
- Configuring security group rules for tenant isolation
- Setting up VPC peering for enterprise tenants
- Implementing network-level traffic isolation

## Mode

Select execution mode:

| Mode | Description |
|------|-------------|
| **Create** | Generate new artifact from scratch |
| **Edit** | Load existing artifact and apply targeted modifications |
| **Validate** | Check existing artifact against quality criteria |

Default: **Create** mode. In headless mode, always use Create.

## Workflow

### Step 1: Network Topology

Design the VPC architecture:

| Component | Shared Tier | Dedicated Tier |
|-----------|-------------|----------------|
| VPC | Shared multi-tenant VPC | Dedicated VPC per tenant |
| Subnets | Shared subnets with NACL | Isolated subnets |
| NAT Gateway | Shared | Dedicated |
| Internet Gateway | Shared | Dedicated |

### Step 2: Security Group Design

Define security group patterns:

1. Application layer security groups
2. Database layer security groups
3. Cache layer security groups
4. Management/bastion security groups
5. Tenant-specific security group rules

### Step 3: VPC Peering

Configure VPC connectivity for enterprise tenants:

- Transit Gateway configuration
- VPC peering rules
- Private Link endpoints
- Cross-account access patterns

**Soft Gate:** Steps 1-3 complete the network architecture design. Present a summary of VPC structure and security groups. Ask for confirmation before proceeding to traffic isolation.

### Step 4: Traffic Isolation

Define traffic isolation mechanisms:

- Network ACLs per tier
- Flow logs for audit
- Traffic mirroring for security
- DDoS protection configuration

## Quality Gates

| Gate | Contribution | Description |
|------|--------------|-------------|
| **QG-M2** | Contributes | Tenant isolation at network level |
| **QG-S3** | Contributes | Security baseline compliance |

- **Entry Gate:** QG-F1 (Foundation) - Master architecture must be defined
- **Exit Gate:** QG-M2 (Tenant Isolation) - Network must enforce tenant boundaries

### Verification Checklist

- [ ] VPC topology documented
- [ ] Security groups defined per layer
- [ ] VPC peering configured for enterprise
- [ ] Traffic isolation mechanisms specified
- [ ] Network flow logging enabled

## Output

- `{output_folder}/planning-artifacts/infrastructure/tenant-network-isolation-design.md`
- VPC architecture diagram
- Security group matrix

## References

- Template: `bam/templates/infrastructure-template.md`
- Multi-Tenant Patterns: `bam/knowledge/multi-tenant-patterns.md`

## Web Research

This workflow uses web search to verify current best practices. Steps involving technology decisions will include:
- `Search the web:` directives for pattern verification
- Pattern registry `web_queries` for search topics
- Source citations: `_Source: [URL]_`
