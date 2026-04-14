# Risk Management Patterns

**When to load:** When implementing ISO 27001 ISMS, NIST CSF 2.0 risk management, or systematic risk assessment for multi-tenant SaaS

**Integrates with:** Security agent, Architect (Atlas persona), Compliance/Legal teams

---

## Core Concepts

### Risk Assessment Methodology

Risk assessment quantifies threats by evaluating likelihood and impact. A consistent methodology ensures comparable risk ratings across different domains and enables prioritized treatment.

| Risk Rating | Likelihood x Impact | Treatment Priority | Review Frequency |
|-------------|--------------------|--------------------|------------------|
| Critical | High x High | Immediate mitigation required | Weekly |
| High | High x Medium or Medium x High | Treatment plan within 30 days | Bi-weekly |
| Medium | Medium x Medium | Treatment plan within 90 days | Monthly |
| Low | Low x Any or Any x Low | Accept or monitor | Quarterly |

### Risk Treatment Options

Once risks are assessed, treatment decisions determine how to address each risk. Treatment selection considers cost-effectiveness, residual risk, and organizational risk appetite.

- **Mitigate**: Implement controls to reduce likelihood or impact (most common)
- **Transfer**: Shift risk to third party through insurance or contracts
- **Accept**: Acknowledge and monitor risk within defined tolerance
- **Avoid**: Eliminate risk by removing the activity or asset entirely

### Multi-Tenant Risk Considerations

Multi-tenant platforms introduce shared infrastructure risks where one tenant's actions can affect others. Risk management must address tenant-introduced risks and platform-wide vulnerabilities.

| Risk Category | Tenant Impact | Platform Response |
|---------------|---------------|-------------------|
| Noisy neighbor | Performance degradation | Resource quotas, tenant isolation |
| Data breach | Cross-tenant exposure | Encryption, access controls, isolation |
| Compliance violation | Platform liability | Tenant attestations, monitoring |
| Vendor dependency | Supply chain risk | Third-party risk assessment, alternatives |

## Overview

Risk management patterns establish systematic approaches to identifying, assessing, treating, and monitoring risks in multi-tenant SaaS environments. These patterns support compliance with ISO 27001 ISMS requirements and NIST CSF 2.0 governance function while addressing the unique risk landscape of shared infrastructure and AI-powered services.

## Compliance Requirements

- **Risk Identification**: Systematic identification of information security and operational risks
- **Risk Assessment**: Consistent methodology for evaluating risk likelihood and impact
- **Risk Treatment**: Documented decisions and controls for risk mitigation
- **Risk Monitoring**: Ongoing monitoring of risk indicators and control effectiveness
- **Risk Communication**: Reporting to stakeholders and governance bodies

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Risk Registry | Centralized tracking of identified risks with assessment and treatment status | ISO 27001, NIST CSF 2.0 |
| Risk Assessment Methodology | Standardized approach to evaluating risk likelihood and impact | ISO 27001, NIST RMF |
| Control Effectiveness Monitoring | Automated verification that risk controls are operating effectively | SOC2, ISO 27001 |
| Tenant Risk Profiling | Per-tenant risk assessment based on data sensitivity and usage | Multi-tenant, Enterprise |
| Third-Party Risk Management | Assessment and monitoring of vendor and supply chain risks | SOC2, ISO 27001, NIST CSF 2.0 |
| AI Risk Assessment | Specific risk evaluation for AI system deployment and operation | EU AI Act, NIST AI RMF |

## Validation Checklist

- [ ] Risk registry is complete and current
- [ ] Risk assessment methodology is documented
- [ ] All significant risks have treatment plans
- [ ] Control effectiveness is monitored
- [ ] Tenant risk profiles are maintained
- [ ] Third-party risks are assessed and monitored
- [ ] AI-specific risks are evaluated
- [ ] Risk reporting reaches appropriate stakeholders

## Application Guidelines

When implementing risk management:

1. **Establish risk methodology**: Define consistent criteria for assessing likelihood and impact
2. **Create risk registry**: Document all identified risks with assessment and treatment status
3. **Implement risk treatments**: Deploy controls to mitigate, transfer, accept, or avoid risks
4. **Monitor control effectiveness**: Continuously validate that risk treatments are working
5. **Report to stakeholders**: Communicate risk posture to leadership and governance bodies

When managing risks in multi-tenant environments:

1. **Assess tenant-specific risks**: Evaluate risks introduced by each tenant's data sensitivity and usage
2. **Profile tenant risk levels**: Categorize tenants by industry, data type, and compliance requirements
3. **Monitor third-party risks**: Track risks from shared dependencies across all tenants
4. **Support tenant risk reporting**: Provide tenants with visibility into risks affecting their data

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "ISO 27001 risk management SaaS {date}"
- Search: "NIST CSF 2.0 risk governance {date}"
- Search: "AI risk assessment frameworks {date}"

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How frequently to reassess risk registry? | Quarterly reviews, plus event-triggered reassessment | Balances thoroughness with operational efficiency; major changes trigger immediate review |
| Should risk profiles be per-tenant or per-tier? | Per-tier defaults with per-tenant overrides for enterprise | Tier-based provides consistency; enterprise tenants may have unique risk profiles |
| When to require third-party risk assessment? | Any vendor with access to tenant data or critical path | Vendor incidents directly impact tenant security and SLAs |
| How to prioritize AI-specific risks? | Weighted by potential harm, tenant exposure, and regulatory impact | EU AI Act penalties and reputational risk require careful AI risk treatment |
| Should tenants have visibility into platform risks? | Yes, provide transparency dashboard with appropriate detail level | Builds trust and supports tenant compliance obligations |

---

## Related Workflows

- `bmad-bam-security-review` - Comprehensive security assessment and risk identification
- `bmad-bam-ai-eval-safety-design` - AI-specific risk evaluation and mitigation
- `bmad-bam-tenant-onboarding-design` - Tenant risk profiling during onboarding

---

## References

- `compliance` - General compliance pattern from bam-patterns.csv
- `all-security-patterns` - Security controls as risk treatments
- `audit-logging-patterns` - Evidence for control effectiveness
- `ai-documentation-patterns` - AI risk documentation
- `incident-response-patterns` - Risk realization handling
