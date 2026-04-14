# All Security Patterns

**When to load:** When implementing comprehensive security controls for multi-tenant SaaS, particularly for FedRAMP, ISO 27001, or other security-focused compliance frameworks

**Integrates with:** Security agent, Architect (Atlas persona), DevOps agent

---

## Core Concepts

### Zero Trust Architecture

Zero trust operates on the principle of "never trust, always verify," requiring continuous authentication and authorization at every access point regardless of network location or previous authentication state.

| Principle | Implementation | Multi-Tenant Consideration |
|-----------|----------------|---------------------------|
| Verify Explicitly | Authenticate every request | Include tenant context in every verification |
| Least Privilege | Minimal required permissions | Scope permissions to tenant boundaries |
| Assume Breach | Limit blast radius | Isolate tenant data to contain potential breaches |

### Defense in Depth

Defense in depth implements multiple layers of security controls so that if one layer is compromised, subsequent layers continue to protect tenant data and system integrity.

- **Network Layer**: Firewalls, segmentation, DDoS protection
- **Application Layer**: Input validation, authentication, authorization
- **Data Layer**: Encryption, access controls, data masking
- **Operational Layer**: Monitoring, incident response, security testing

### Tenant Security Boundaries

Tenant security boundaries establish logical and physical isolation between tenants, ensuring that a security incident affecting one tenant cannot propagate to others.

| Boundary Type | Description | Verification Method |
|---------------|-------------|---------------------|
| Logical Isolation | Software-enforced separation (RLS, namespaces) | Automated penetration testing |
| Network Isolation | Tenant-aware network segmentation | Traffic analysis and monitoring |
| Resource Isolation | Compute and storage separation | Resource quota enforcement |
| Key Isolation | Separate encryption keys per tenant | Key management audit |

## Overview

All security patterns provides a consolidated view of security controls required across multiple compliance frameworks. This pattern aggregates security requirements from SOC2, FedRAMP, ISO 27001, and NIST CSF 2.0 into a unified implementation approach suitable for multi-tenant architectures where comprehensive security posture is required.

## Compliance Requirements

- **Access Control**: Identity management, authentication, authorization, and privilege management
- **Data Protection**: Encryption, key management, data classification, and secure handling
- **Network Security**: Segmentation, perimeter defense, monitoring, and secure communications
- **Incident Management**: Detection, response, recovery, and post-incident analysis
- **Continuous Monitoring**: Vulnerability management, security testing, and compliance monitoring

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Zero Trust Architecture | Never trust, always verify approach with continuous authentication and authorization | FedRAMP, NIST CSF 2.0, ISO 27001 |
| Defense in Depth | Multiple layers of security controls protecting tenant data and operations | SOC2, FedRAMP, ISO 27001 |
| Tenant Security Boundaries | Logical and physical isolation between tenants with verified separation | All frameworks |
| Security Baseline Configuration | Hardened configurations for all infrastructure components | FedRAMP, CIS Benchmarks, SOC2 |
| Continuous Security Validation | Automated security testing, vulnerability scanning, and compliance checking | NIST CSF 2.0, SOC2, FedRAMP |
| Security Event Correlation | Centralized security event analysis across tenant boundaries | SOC2, ISO 27001, FedRAMP |

## Validation Checklist

- [ ] Zero trust principles implemented for all access paths
- [ ] Defense in depth controls verified at each layer
- [ ] Tenant isolation verified through security testing
- [ ] Infrastructure meets security baseline configurations
- [ ] Vulnerability scanning runs continuously
- [ ] Security events are correlated and analyzed
- [ ] Penetration testing validates security controls
- [ ] Security documentation is complete and current

## Application Guidelines

When implementing comprehensive security:

1. **Conduct security assessment**: Evaluate current security posture against target compliance frameworks
2. **Identify control gaps**: Map required controls from FedRAMP, ISO 27001, SOC2 to current implementation
3. **Prioritize by risk**: Address critical security gaps first based on risk assessment
4. **Implement defense in depth**: Layer security controls across network, application, and data tiers
5. **Automate compliance checking**: Deploy continuous security validation and monitoring

When securing multi-tenant platforms:

1. **Verify tenant isolation**: Implement and regularly test security boundaries between tenants
2. **Apply least privilege**: Ensure each tenant and user has only necessary permissions
3. **Monitor cross-tenant**: Alert on any potential cross-tenant access attempts
4. **Document security per tier**: Clearly communicate security controls available at each subscription tier

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Which compliance framework to prioritize? | SOC2 as baseline, add FedRAMP/ISO27001 based on customer requirements | SOC2 is table stakes for B2B SaaS; additional certifications follow market needs |
| How to implement zero trust in multi-tenant context? | Verify tenant context at every layer, not just gateway | Defense in depth ensures tenant isolation even if one layer is compromised |
| Should security controls differ by tier? | Same baseline, additional controls for enterprise tier | All tenants deserve security; enterprise may need enhanced monitoring/isolation |
| When to require penetration testing? | Annually minimum, plus after major architecture changes | Regular testing validates security controls remain effective |
| How to balance security with developer velocity? | Automate security checks in CI/CD pipeline | Shifts security left without blocking deployments for known-safe patterns |

---

## Related Workflows

- `bmad-bam-security-review` - Comprehensive security control validation
- `bmad-bam-tenant-model-isolation` - Implement tenant security boundaries
- `bmad-bam-compliance-design` - Design security compliance controls

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "FedRAMP security controls SaaS {date}"
- Search: "ISO 27001 multi-tenant implementation {date}"
- Search: "zero trust architecture SaaS platforms {date}"

---

## References

- `tenant-isolation` - Tenant separation controls from bam-patterns.csv
- `encryption-patterns` - Data protection and key management
- `network-security-patterns` - Network-level security controls
- `audit-logging-patterns` - Security event logging
- `incident-response-patterns` - Security incident handling
- `sso-integration-patterns` - Authentication and identity
