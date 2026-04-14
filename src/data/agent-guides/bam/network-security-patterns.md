# Network Security Patterns

**When to load:** When implementing PCI-DSS network segmentation, FedRAMP boundary controls, or network-level security requirements for multi-tenant SaaS

**Integrates with:** Security agent, DevOps agent, Architect (Atlas persona)

---

## Core Concepts

### Network Segmentation Zones

Network segmentation divides infrastructure into security zones with controlled traffic flow between them. Each zone has distinct security requirements and access policies.

| Zone | Purpose | Typical Components | Access Policy |
|------|---------|-------------------|---------------|
| DMZ | Public-facing services | Load balancers, WAF, API gateways | Internet ingress, controlled egress |
| Application | Business logic execution | Application servers, containers | DMZ ingress only, data tier egress |
| Data | Persistent storage | Databases, caches, object storage | Application tier only, no internet |
| Management | Operations and monitoring | Bastion hosts, monitoring, CI/CD | VPN/private access only |

### Zero Trust Network Architecture

Zero trust assumes no implicit trust based on network location. Every request must be authenticated, authorized, and encrypted regardless of source.

- **Identity-based access**: Service mesh with mTLS between all services
- **Micro-segmentation**: Network policies restricting pod-to-pod communication
- **Continuous verification**: Re-authentication on session boundaries and sensitive operations
- **Least privilege**: Services can only reach explicitly allowed destinations

### Multi-Tenant Network Isolation

Network isolation in multi-tenant platforms prevents cross-tenant traffic while sharing infrastructure efficiently. Isolation mechanisms vary by tenant tier and compliance requirements.

| Isolation Level | Mechanism | Use Case | Overhead |
|-----------------|-----------|----------|----------|
| Shared network | Kubernetes NetworkPolicy | Standard tiers, cost-sensitive | Low |
| Virtual network | VPC/VNet per tenant | Enterprise, regulated industries | Medium |
| Physical network | Dedicated infrastructure | Government, maximum isolation | High |

## Overview

Network security patterns establish controls for protecting network infrastructure in multi-tenant SaaS environments. These patterns address segmentation, perimeter defense, monitoring, and secure communication requirements while supporting the shared infrastructure model typical of SaaS platforms.

## Compliance Requirements

- **Segmentation**: Network isolation between security zones and tenants where required
- **Perimeter Defense**: Protection of network boundaries with firewalls and WAF
- **Monitoring**: Network traffic analysis and intrusion detection
- **Secure Communications**: Encryption of all network traffic
- **Access Control**: Network-level access restrictions and authentication

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Network Segmentation | Logical separation of network zones (DMZ, application, data) | PCI-DSS, FedRAMP, SOC2 |
| Web Application Firewall | Protection against application-layer attacks | PCI-DSS, SOC2 |
| DDoS Protection | Distributed denial of service mitigation | SOC2, All frameworks |
| Intrusion Detection/Prevention | Network traffic analysis for threat detection | FedRAMP, PCI-DSS, SOC2 |
| Private Connectivity | VPC peering or private links for tenant connections | Enterprise, FedRAMP |
| Zero Trust Networking | Micro-segmentation with service-level authentication | NIST CSF 2.0, FedRAMP |

## Validation Checklist

- [ ] Network segmentation is implemented and documented
- [ ] WAF rules are configured and monitored
- [ ] DDoS protection is active
- [ ] Intrusion detection alerts are monitored
- [ ] All network traffic is encrypted (TLS 1.2+)
- [ ] Network access controls are enforced
- [ ] Private connectivity options are available for enterprise tenants
- [ ] Network security is regularly tested (penetration testing)

## Application Guidelines

When implementing network security:

1. **Design network segmentation**: Define security zones (DMZ, application, data) with appropriate controls
2. **Deploy perimeter defenses**: Implement WAF, DDoS protection, and firewall rules
3. **Enable traffic encryption**: Enforce TLS 1.2+ for all internal and external communications
4. **Configure intrusion detection**: Set up IDS/IPS with appropriate alerting thresholds
5. **Implement zero trust**: Apply micro-segmentation and service-level authentication

When securing multi-tenant network infrastructure:

1. **Isolate tenant traffic**: Use network policies to prevent cross-tenant network access
2. **Offer private connectivity**: Provide VPC peering or private links for enterprise tenants
3. **Monitor per-tenant traffic**: Enable network analytics scoped to tenant resources
4. **Support tenant firewalls**: Allow enterprise tenants to configure additional network rules

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "PCI-DSS network segmentation requirements {date}"
- Search: "zero trust networking SaaS {date}"
- Search: "multi-tenant network isolation patterns {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Do you need PCI-DSS compliance? | Implement network segmentation with DMZ, application, and data zones | PCI-DSS requires documented network segmentation and access controls between zones |
| Should enterprise tenants have private connectivity? | Offer VPC peering or AWS PrivateLink for enterprise tier | Private connectivity eliminates internet exposure for sensitive enterprise workloads |
| How do you prevent cross-tenant network access? | Implement Kubernetes network policies with tenant namespace isolation | Network policies enforce that tenant workloads cannot communicate across boundaries |
| What DDoS protection is needed? | Deploy cloud-native DDoS protection (CloudFlare, AWS Shield) at edge | Multi-tenant platforms are high-value targets; edge protection prevents platform-wide impact |
| Should you implement zero trust networking? | Adopt zero trust for new deployments; plan migration for existing | Zero trust with service mesh provides defense in depth beyond perimeter security |

## Related Workflows

- `bmad-bam-security-review` - Review network security controls and segmentation
- `bmad-bam-compliance-design` - Design network controls for PCI-DSS and FedRAMP
- `bmad-bam-multi-region-architecture` - Configure secure cross-region networking

## References

- `all-security-patterns` - Comprehensive security controls
- `tenant-isolation` - Tenant separation from bam-patterns.csv
- `encryption-patterns` - Encryption for network traffic
- `compliance` - General compliance pattern from bam-patterns.csv
- `audit-logging-patterns` - Network event logging
