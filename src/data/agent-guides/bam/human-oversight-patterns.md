# Human Oversight Patterns

**When to load:** When implementing EU AI Act human oversight requirements, human-in-the-loop controls, or approval workflows for AI-powered multi-tenant SaaS

**Integrates with:** Architect (Nova persona), UX agent, Security agent

---

## Core Concepts

### Human-in-the-Loop vs Human-on-the-Loop

Human oversight exists on a spectrum from active approval to passive monitoring. The appropriate level depends on AI risk classification and regulatory requirements.

| Oversight Level | Human Role | AI Autonomy | Use Case |
|-----------------|------------|-------------|----------|
| Human-in-the-Loop (HITL) | Approves every action | None until approved | High-risk AI systems, financial decisions |
| Human-on-the-Loop (HOTL) | Monitors with intervention capability | Proceeds unless stopped | Medium-risk AI, time-sensitive operations |
| Human-out-of-the-Loop | Post-hoc review only | Full autonomy | Low-risk, reversible actions |

### Kill Switch and Intervention Controls

Kill switches provide immediate shutdown capability for AI systems. Effective kill switches must be accessible within seconds, operate independently of the AI system they control, and be available to authorized personnel 24/7.

- **Scope**: System-wide, tenant-scoped, or operation-specific shutdown
- **Latency**: Maximum 30 seconds from activation to full stop
- **Recovery**: Clear procedures for safe restart after intervention
- **Testing**: Regular drills to ensure functionality under stress

### Approval Workflow Configuration

Approval workflows define which AI actions require human sign-off before execution. Multi-tenant platforms must support per-tenant workflow customization while enforcing platform minimums for high-risk operations.

- **Threshold-based**: Trigger approval based on confidence scores or impact levels
- **Role-based**: Different approval requirements by user role or permission level
- **Escalation chains**: Automatic escalation when approvers are unavailable
- **Audit integration**: Complete record of approvals, rejections, and override reasons

## Overview

Human oversight patterns establish mechanisms for human supervision, intervention, and control over AI system operations as required by the EU AI Act and responsible AI practices. In multi-tenant environments, these patterns must support configurable oversight levels per tenant while ensuring that human operators can effectively monitor and intervene in AI operations.

## Compliance Requirements

- **Human Supervision**: Ability for humans to monitor AI system operation in real-time
- **Intervention Capability**: Mechanisms to pause, override, or stop AI operations
- **Override Controls**: Human ability to reject or modify AI recommendations
- **Competency Requirements**: Ensuring human overseers have appropriate skills and authority
- **Audit of Oversight**: Documentation of human oversight activities and interventions

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| Human-in-the-Loop (HITL) | Required human approval before AI actions are executed | EU AI Act, High-risk AI |
| Human-on-the-Loop (HOTL) | Human monitoring with ability to intervene | EU AI Act, Medium-risk AI |
| Kill Switch | Immediate AI system shutdown capability | EU AI Act |
| Approval Workflows | Configurable approval chains for AI recommendations | EU AI Act, Multi-tenant |
| Oversight Dashboard | Real-time visibility into AI operations with intervention controls | EU AI Act |
| Escalation Paths | Automatic escalation when AI confidence is low or risk is high | EU AI Act, SOC2 |

## Validation Checklist

- [ ] Human oversight mechanisms are implemented for high-risk AI
- [ ] Kill switch functionality is tested and accessible
- [ ] Approval workflows are configurable per tenant
- [ ] Human overseers have adequate training and tools
- [ ] Override actions are logged and auditable
- [ ] Escalation paths are defined and functional
- [ ] Oversight dashboard provides real-time visibility
- [ ] AI confidence thresholds trigger appropriate oversight

## Application Guidelines

When implementing human oversight:

1. **Classify AI risk levels**: Determine oversight requirements based on AI system risk classification
2. **Design oversight interfaces**: Create dashboards and tools for human monitors to observe AI operations
3. **Implement intervention controls**: Build kill switches and override mechanisms accessible to authorized users
4. **Define approval workflows**: Establish which AI actions require human approval before execution
5. **Train oversight personnel**: Ensure human overseers understand AI capabilities and limitations

When building oversight for multi-tenant AI:

1. **Configure per-tenant oversight levels**: Allow tenants to define their required oversight intensity
2. **Scope oversight visibility**: Ensure overseers only see their tenant's AI operations
3. **Enable tenant escalation paths**: Allow tenants to define their own escalation procedures
4. **Provide oversight analytics**: Give tenants metrics on human intervention frequency and outcomes

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ai-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "EU AI Act human oversight requirements {date}"
- Search: "human-in-the-loop AI patterns {date}"
- Search: "AI kill switch implementation {date}"

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Is your AI system classified as high-risk under EU AI Act? | Implement mandatory human-in-the-loop (HITL) approval | High-risk AI systems require human approval before actions are executed |
| Do AI actions have significant business impact? | Design approval workflows with configurable thresholds | Actions affecting finances, data deletion, or external systems warrant human review |
| How quickly must humans be able to intervene? | Implement kill switch accessible within 30 seconds | Regulatory requirements and safety best practices demand rapid intervention capability |
| Should oversight levels vary by tenant? | Allow per-tenant oversight configuration in enterprise tier | Different industries have different oversight requirements based on risk tolerance |
| How do you train human overseers? | Provide oversight dashboard with AI decision explanations | Effective oversight requires understanding AI capabilities, limitations, and confidence levels |

## Related Workflows

- `bmad-bam-ai-eval-safety-design` - Design human oversight controls for AI systems
- `bmad-bam-agent-runtime-architecture` - Configure human-in-the-loop agent patterns
- `bmad-bam-compliance-design` - Implement EU AI Act oversight requirements

## References

- `ai-transparency-patterns` - Visibility into AI operations
- `ai-documentation-patterns` - Documentation of oversight procedures
- `tool-execution` - Tool execution controls from bam-patterns.csv
- `run-contracts` - Execution limits from bam-patterns.csv
- `audit-logging-patterns` - Logging of oversight activities
