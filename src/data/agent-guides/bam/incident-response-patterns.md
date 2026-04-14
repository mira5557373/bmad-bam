# Incident Response Patterns

**When to load:** When implementing SOC2, HIPAA, PCI-DSS, or FedRAMP incident response requirements for multi-tenant SaaS

**Integrates with:** Security agent, DevOps agent, PM agent

---

## Core Concepts

### Incident Classification and Severity

Incident classification determines response urgency, resource allocation, and notification requirements. Multi-tenant incidents require additional complexity assessment for tenant impact scope.

| Severity | Definition | Response Time | Notification |
|----------|------------|---------------|--------------|
| Critical (P1) | Platform-wide outage or active data breach | Immediate (<15 min) | All hands, executive, affected tenants |
| High (P2) | Major feature unavailable, single tenant breach | 1 hour | On-call team, tenant admin |
| Medium (P3) | Degraded performance, potential security issue | 4 hours | Assigned engineer, monitoring |
| Low (P4) | Minor issue, no immediate impact | 24 hours | Ticket queue |

### Multi-Tenant Incident Isolation

Incident containment in multi-tenant environments must prevent blast radius expansion while maintaining service for unaffected tenants. Isolation decisions balance security against availability.

- **Tenant quarantine**: Isolate affected tenant workloads without platform shutdown
- **Evidence preservation**: Capture forensic data per-tenant with strict access controls
- **Communication isolation**: Notify only affected tenants to prevent unnecessary alarm
- **Recovery sequencing**: Restore tenants based on impact severity and SLA tier

### Breach Notification Compliance

Data breach notification requirements vary by regulation, jurisdiction, and data type. Multi-tenant platforms must track per-tenant notification obligations and execute parallel notification workflows.

| Regulation | Timeline | Recipients | Content Requirements |
|------------|----------|------------|---------------------|
| GDPR | 72 hours | Supervisory authority + data subjects | Nature, scope, consequences, remediation |
| HIPAA | 60 days | HHS + affected individuals | Description, mitigation, contact info |
| State laws | 30-90 days | State AG + affected residents | Varies by state |
| PCI-DSS | Immediate | Payment brands, acquirer | Compromise details, forensic report |

## Overview

Incident response patterns establish systematic approaches to detecting, responding to, and recovering from security incidents in multi-tenant environments. These patterns ensure compliance with breach notification requirements while managing the complexity of incidents that may affect single tenants, multiple tenants, or the entire platform.

## Compliance Requirements

- **Detection**: Timely identification of security incidents through monitoring and alerting
- **Response**: Documented procedures for incident containment and eradication
- **Notification**: Compliance with breach notification timelines (72 hours GDPR, varies by regulation)
- **Recovery**: Procedures to restore normal operations securely
- **Post-Incident**: Root cause analysis, documentation, and improvement actions

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Incident Detection Automation | Automated detection of security events requiring response | SOC2, HIPAA, PCI-DSS, FedRAMP |
| Tenant-Scoped Incident Management | Separate incident tracking and response per affected tenant | Multi-tenant, GDPR |
| Incident Classification | Severity and impact classification driving response procedures | SOC2, NIST CSF 2.0 |
| Response Playbooks | Pre-defined procedures for common incident types | SOC2, FedRAMP |
| Breach Notification Automation | Automated compliance with notification requirements and timelines | GDPR, HIPAA, State laws |
| Post-Incident Review | Structured lessons learned and remediation tracking | SOC2, ISO 27001 |

## Validation Checklist

- [ ] Incident detection covers all security event categories
- [ ] Response procedures are documented and tested
- [ ] Tenant notification procedures meet regulatory timelines
- [ ] Incident classification criteria are defined
- [ ] Response playbooks exist for common scenarios
- [ ] Communication templates are prepared
- [ ] Post-incident review process is established
- [ ] Incident response team roles are assigned and trained

## Application Guidelines

When implementing incident response:

1. **Define incident classification**: Establish severity levels and impact criteria
2. **Create response playbooks**: Document procedures for common incident types
3. **Establish communication protocols**: Define internal and external notification procedures
4. **Set up detection automation**: Deploy SIEM and alerting for security events
5. **Conduct tabletop exercises**: Regularly practice incident response procedures

When handling incidents in multi-tenant environments:

1. **Isolate affected tenants**: Quickly determine which tenants are impacted
2. **Scope tenant notification**: Notify affected tenants according to regulatory timelines
3. **Preserve tenant evidence**: Maintain forensic data separated by tenant for investigations
4. **Provide tenant-specific remediation**: Tailor recovery actions to each affected tenant

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SOC2 incident response requirements {date}"
- Search: "GDPR 72-hour breach notification {date}"
- Search: "multi-tenant incident management {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How do you handle multi-tenant breach notification? | Implement tenant-scoped incident tracking with parallel notification workflows | GDPR requires 72-hour notification; affected tenants must be identified and notified individually |
| Should incident response differ by tenant tier? | Provide dedicated incident response channels for enterprise tenants | Enterprise SLAs often include faster response times and dedicated communication |
| How do you preserve forensic evidence per tenant? | Implement tenant-isolated log retention with legal hold capability | Investigations require tenant-specific evidence without exposing other tenants' data |
| What automation should trigger on incident detection? | Auto-isolate affected systems; auto-notify on-call; auto-preserve logs | Rapid automated response reduces blast radius while human responders are alerted |
| How do you conduct post-incident reviews? | Schedule mandatory review within 5 days with documented action items | Continuous improvement requires systematic learning from every significant incident |

## Related Workflows

- `bmad-bam-disaster-recovery-design` - Design incident recovery procedures
- `bmad-bam-security-review` - Review incident detection and response controls
- `bmad-bam-tenant-aware-observability` - Configure tenant-scoped incident alerting

## References

- `audit-logging-patterns` - Security event logging for detection
- `all-security-patterns` - Comprehensive security controls
- `compliance` - General compliance pattern from bam-patterns.csv
- `observability` - Monitoring patterns from bam-patterns.csv
- `disaster-recovery` - Recovery patterns from bam-patterns.csv
