# Change Management Patterns

**When to load:** When implementing SOX IT controls, SOC2 change management requirements, or regulated change control processes for multi-tenant SaaS

**Integrates with:** DevOps agent, Security agent, PM agent

---

## Core Concepts

### Change Classification

Change classification categorizes modifications based on risk and impact to determine appropriate approval workflows, testing requirements, and rollout strategies.

| Change Type | Description | Approval Level |
|-------------|-------------|----------------|
| Standard | Pre-approved, low-risk, routine changes | Automated approval |
| Normal | Moderate risk requiring review | Peer review + team lead |
| Significant | High impact affecting architecture or security | Change Advisory Board |
| Emergency | Critical fixes for production incidents | Expedited with retrospective review |

### Segregation of Duties

Segregation of duties ensures that no single individual can develop, approve, and deploy changes to production, providing checks and balances that support audit requirements.

- **Developer Role**: Creates and tests changes in development environment
- **Reviewer Role**: Validates code quality, security, and compliance
- **Approver Role**: Authorizes deployment based on testing evidence
- **Deployer Role**: Executes production deployment (may be automated)

### Tenant Impact Assessment

Tenant impact assessment evaluates how proposed changes affect individual tenants, enabling informed deployment decisions and tenant-specific communication.

| Assessment Area | Questions to Answer | Documentation Required |
|-----------------|---------------------|------------------------|
| Feature Impact | Which tenants use affected features? | Feature usage analytics |
| Data Impact | Does change modify tenant data schemas? | Migration plan |
| Performance Impact | Will change affect tenant response times? | Performance benchmarks |
| Compatibility | Does change require tenant-side updates? | Communication plan |

## Overview

Change management patterns establish controlled processes for implementing changes to production systems while maintaining compliance with financial controls (SOX), security controls (SOC2), and operational stability. In multi-tenant environments, these patterns must balance rapid deployment capabilities with appropriate controls and tenant-aware impact assessment.

## Compliance Requirements

- **Change Authorization**: Documented approval processes for all production changes
- **Segregation of Duties**: Separation between development, approval, and deployment roles
- **Testing Requirements**: Verified testing before production deployment
- **Rollback Capability**: Documented and tested rollback procedures
- **Change Documentation**: Complete records of what changed, when, by whom, and why

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Change Advisory Board | Formal review and approval process for significant changes | SOX, SOC2, ITIL |
| Automated Change Tracking | Integration with version control and deployment pipelines for automatic documentation | SOC2, SOX |
| Tenant Impact Assessment | Pre-deployment analysis of change impact on each tenant | Multi-tenant, SOC2 |
| Staged Rollout | Progressive deployment with tenant-aware canary releases | SOC2, Multi-tenant |
| Emergency Change Protocol | Expedited process for critical fixes with retrospective documentation | SOX, SOC2, ITIL |
| Change Audit Trail | Immutable records linking changes to approvals, tests, and deployments | SOX, SOC2 |

## Validation Checklist

- [ ] Change approval workflows are documented and enforced
- [ ] Segregation of duties is maintained in deployment pipeline
- [ ] All changes have associated test evidence
- [ ] Rollback procedures are documented and tested
- [ ] Tenant impact is assessed before deployment
- [ ] Emergency change procedures are documented
- [ ] Change audit trail is complete and accessible
- [ ] Change metrics support continuous improvement

## Application Guidelines

When implementing change management:

1. **Define change categories**: Establish standard, normal, and emergency change classifications
2. **Implement approval workflows**: Create appropriate approval chains based on change risk and impact
3. **Automate change tracking**: Integrate with CI/CD to automatically capture change metadata
4. **Build rollback capability**: Ensure every deployment can be quickly reverted
5. **Track change metrics**: Monitor change success rate, lead time, and incident correlation

When managing changes in multi-tenant environments:

1. **Assess tenant impact**: Before deployment, identify which tenants will be affected and how
2. **Implement staged rollouts**: Use canary deployments with tenant-aware routing
3. **Communicate changes**: Notify affected tenants of significant changes per their SLA requirements
4. **Support tenant-specific timing**: Allow enterprise tenants to schedule change windows

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| What level of approval for production changes? | Peer review minimum, CAB for high-risk changes | Balances velocity with risk management |
| Should tenants be notified of all changes? | Major changes with user impact; opt-in for detailed change logs | Prevents notification fatigue while maintaining transparency |
| How to handle emergency changes? | Expedited approval with mandatory post-incident documentation | Enables rapid response while maintaining audit trail |
| When to use staged rollout vs big-bang? | Staged for all changes affecting AI or tenant data | Limits blast radius for high-impact changes |
| Should enterprise tenants control change windows? | Yes, allow scheduling within SLA bounds | Respects enterprise change management processes |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design change management compliance controls
- `bmad-bam-api-version-release` - Implement versioned change releases
- `validate-foundation` - Validate change management processes

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Deployment patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `deployment-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SOC2 change management requirements {date}"
- Search: "SOX IT change control SaaS {date}"
- Search: "ITIL change management automation {date}"

---

## References

- `deployment` - Deployment patterns from bam-patterns.csv
- `audit-logging-patterns` - Change event logging
- `tenant-isolation` - Impact isolation between tenants
- `compliance` - General compliance pattern from bam-patterns.csv
- `risk-management-patterns` - Change risk assessment
