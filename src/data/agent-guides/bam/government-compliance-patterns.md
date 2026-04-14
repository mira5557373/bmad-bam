# Government Compliance Patterns

**When to load:** When implementing FedRAMP, StateRAMP, or other government compliance requirements for multi-tenant SaaS serving public sector customers

**Integrates with:** Security agent, Architect (Atlas persona), Compliance/Legal teams

---

## Core Concepts

### FedRAMP Impact Levels

FedRAMP defines three impact levels based on the potential harm from a security breach, each requiring progressively more stringent security controls.

| Impact Level | Data Sensitivity | Control Count | Typical Use Cases |
|--------------|------------------|---------------|-------------------|
| Low | Public information | ~125 controls | Public websites, non-sensitive data |
| Moderate | Controlled unclassified | ~325 controls | Most government SaaS applications |
| High | Highly sensitive | ~425 controls | Law enforcement, financial systems |

### NIST 800-53 Control Families

NIST 800-53 organizes security controls into families that address different aspects of information security, forming the foundation of FedRAMP requirements.

- **Access Control (AC)**: User identification, authentication, and authorization
- **Audit and Accountability (AU)**: Event logging, review, and retention
- **Security Assessment (CA)**: Control effectiveness verification
- **Configuration Management (CM)**: Baseline configurations and change control
- **Incident Response (IR)**: Detection, handling, and reporting procedures

### Continuous Monitoring Program

Continuous monitoring provides ongoing awareness of security posture through automated scanning, log analysis, and regular assessments required for FedRAMP authorization maintenance.

| Monitoring Activity | Frequency | Purpose |
|--------------------|-----------|---------|
| Vulnerability Scanning | Monthly (minimum) | Identify system weaknesses |
| Log Review | Continuous + monthly analysis | Detect security events |
| Configuration Audit | Quarterly | Verify baseline compliance |
| Penetration Testing | Annual | Validate security controls |
| POA&M Review | Monthly | Track remediation progress |

## Overview

Government compliance patterns address the stringent security and operational requirements for SaaS platforms serving government customers. These patterns cover FedRAMP authorization, NIST control implementation, continuous monitoring, and supply chain security requirements that enable multi-tenant platforms to support public sector deployments.

## Compliance Requirements

- **NIST Controls**: Implementation of NIST 800-53 security controls at appropriate impact level
- **Continuous Monitoring**: Real-time security monitoring and monthly/annual assessments
- **Supply Chain Security**: Verification and monitoring of third-party components
- **Incident Response**: Government-specific notification and reporting requirements
- **Boundary Definition**: Clear system boundary documentation and authorization

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| NIST Control Implementation | Systematic implementation of required security controls | FedRAMP, StateRAMP, NIST 800-53 |
| Continuous Monitoring Program | Automated vulnerability scanning, log analysis, and compliance checking | FedRAMP, NIST CSF 2.0 |
| System Security Plan (SSP) | Comprehensive documentation of security controls and implementation | FedRAMP |
| Plan of Action and Milestones (POA&M) | Tracked remediation of identified security gaps | FedRAMP |
| Supply Chain Risk Management | Vendor assessment, component inventory, and ongoing monitoring | FedRAMP, NIST 800-161 |
| Government Tenant Isolation | Enhanced isolation for government customer data | FedRAMP, Multi-tenant |

## Validation Checklist

- [ ] All required NIST controls are implemented
- [ ] SSP documentation is complete and current
- [ ] Continuous monitoring tools are operational
- [ ] Vulnerability scanning runs on required schedule
- [ ] Supply chain inventory is complete
- [ ] Vendor risk assessments are current
- [ ] POA&M items are tracked and progressing
- [ ] Government tenant data isolation is verified

## Application Guidelines

When implementing government compliance:

1. **Determine authorization boundary**: Define system boundaries and document all components
2. **Map NIST controls**: Identify required controls based on FedRAMP impact level (Low, Moderate, High)
3. **Implement control baseline**: Deploy required security controls systematically
4. **Establish continuous monitoring**: Set up automated vulnerability scanning and compliance checking
5. **Prepare documentation**: Create SSP, POA&M, and required assessment documentation

When serving government tenants in multi-tenant platforms:

1. **Isolate government data**: Implement enhanced isolation for government customer data
2. **Support government authentication**: Enable PIV/CAC card authentication for government users
3. **Configure regional compliance**: Ensure data residency requirements are met
4. **Provide compliance evidence**: Enable government tenants to access audit reports and compliance documentation

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "FedRAMP authorization SaaS requirements {date}"
- Search: "NIST 800-53 implementation guide {date}"
- Search: "StateRAMP multi-tenant compliance {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| What FedRAMP impact level do you need? | Start with Moderate; plan for High if handling CUI | Most government SaaS contracts require Moderate; High is needed for sensitive data |
| Should government tenants share infrastructure? | Provide dedicated isolation option for government tier | Government customers often require enhanced separation from commercial tenants |
| How do you handle continuous monitoring? | Automate vulnerability scanning and compliance reporting | FedRAMP requires monthly scans and annual assessments with documented evidence |
| Do you need PIV/CAC authentication support? | Build SAML/OIDC integration with smart card capability | Federal employees require PIV card authentication for system access |
| How do you manage supply chain risk? | Maintain software bill of materials (SBOM) and vendor assessments | NIST 800-161 and FedRAMP require documented supply chain risk management |

## Related Workflows

- `bmad-bam-compliance-design` - Design FedRAMP and NIST control implementation
- `bmad-bam-security-review` - Review security controls against government requirements
- `bmad-bam-tenant-model-isolation` - Configure enhanced isolation for government tenants

## References

- `all-security-patterns` - Comprehensive security controls
- `compliance` - General compliance pattern from bam-patterns.csv
- `audit-logging-patterns` - Security event logging
- `incident-response-patterns` - Incident handling procedures
- `risk-management-patterns` - Risk assessment and management
- `tenant-isolation` - Tenant separation for government data
