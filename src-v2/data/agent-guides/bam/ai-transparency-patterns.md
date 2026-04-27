# AI Transparency Patterns

**When to load:** When implementing AI explainability requirements, user notification obligations, or transparency features for AI-powered multi-tenant SaaS

**Integrates with:** Architect (Nova persona), UX agent, Tech Writer agent

---

## Core Concepts

### AI Interaction Disclosure

AI interaction disclosure ensures users are clearly informed when they are interacting with AI systems rather than humans, or when content has been generated or modified by AI.

| Disclosure Type | When Required | Implementation |
|-----------------|---------------|----------------|
| Real-time Indicator | During live AI interactions | Visual badge, chat indicator |
| Content Attribution | AI-generated or AI-assisted content | Inline label, metadata tag |
| Decision Notification | AI-influenced recommendations | Explanation link, confidence display |

### Explainability Levels

Explainability requires providing AI decision explanations at appropriate detail levels for different audiences, from simple user-facing summaries to detailed technical traces for auditors.

- **User Level**: Plain language explanations suitable for non-technical end users
- **Admin Level**: Technical summaries with key factors and model confidence for tenant administrators
- **Audit Level**: Complete decision traces including inputs, model versions, and reasoning chains for compliance

### Tenant Transparency Configuration

Multi-tenant platforms must support configurable transparency features that allow tenants to customize disclosure messaging while maintaining compliance with regulatory minimums.

| Configuration | Tenant Control | Regulatory Constraint |
|---------------|----------------|----------------------|
| Disclosure Text | Customizable wording | Must indicate AI involvement |
| Display Location | Placement preferences | Must be visible before interaction |
| Explanation Depth | Detail level selection | Must provide explanations on request |
| Language Support | Locale preferences | Must match user's language |

## Overview

AI transparency patterns address regulatory requirements for making AI system operations understandable to users, operators, and regulators. In multi-tenant environments, these patterns must scale across tenants while allowing customization of transparency features based on tenant tier and regulatory jurisdiction.

## Compliance Requirements

- **User Notification**: Clear indication when users are interacting with AI systems rather than humans
- **Explainability**: Ability to explain AI decisions in human-understandable terms appropriate to the audience
- **Disclosure**: Transparency about AI capabilities, limitations, and potential biases
- **Traceability**: Ability to trace AI outputs back to inputs, model versions, and decision logic

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| AI Interaction Disclosure | Automatic notification when content is AI-generated or AI-assisted | EU AI Act, FTC Guidelines |
| Decision Explanation API | Programmatic access to explanations for AI recommendations and decisions | EU AI Act, GDPR Art. 22 |
| Confidence Score Display | User-facing presentation of AI confidence levels with uncertainty indicators | EU AI Act, NIST AI RMF |
| Attribution Tracking | Clear attribution of AI contributions vs human contributions in outputs | EU AI Act |
| Capability Boundaries | Documented and disclosed limitations of AI system capabilities | EU AI Act, ISO 42001 |
| Tenant Transparency Dashboard | Per-tenant visibility into AI usage, decisions, and performance metrics | Multi-tenant, SOC2 |

## Validation Checklist

- [ ] AI interactions are clearly disclosed to users
- [ ] Decision explanations are available on request
- [ ] Confidence scores are displayed where appropriate
- [ ] AI vs human contributions are distinguishable
- [ ] System limitations are documented and accessible
- [ ] Tenant-specific AI usage is transparent
- [ ] Explanations are audience-appropriate (technical vs non-technical)
- [ ] Transparency features support multi-language requirements

## Application Guidelines

When implementing AI transparency features:

1. **Identify disclosure points**: Map all user interactions with AI systems that require notification
2. **Design explanation levels**: Create audience-appropriate explanations (technical for developers, simple for end users)
3. **Implement confidence indicators**: Display uncertainty metrics when AI confidence is below thresholds
4. **Enable traceability**: Ensure each AI output can be traced to inputs and model version

When building for multi-tenant transparency:

1. **Configure per-tenant disclosure**: Allow tenants to customize AI disclosure messaging within regulatory bounds
2. **Provide transparency dashboards**: Give tenants visibility into AI usage, accuracy, and decision patterns
3. **Support explanation APIs**: Enable programmatic access to decision explanations for tenant integrations
4. **Handle multi-language**: Ensure transparency features work across all supported locales

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When must AI interaction be disclosed? | Always when AI generates user-facing content or makes decisions | EU AI Act and consumer protection laws require clear disclosure |
| How technical should explanations be? | Layer explanations: simple for users, detailed for admins/regulators | Different audiences need different detail levels |
| Should confidence scores always be shown? | Show when below threshold or user-configurable display | Low confidence signals uncertainty; always-on may cause decision fatigue |
| Can tenants customize AI disclosure messaging? | Yes, within regulatory bounds with mandatory elements | Allows brand consistency while maintaining compliance |
| How to handle multi-language transparency requirements? | Translate all disclosure and explanation text to supported locales | Transparency requirements apply regardless of language |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design transparency compliance requirements
- `bmad-bam-ai-eval-safety-design` - Evaluate AI transparency and explainability measures
- `bmad-bam-tenant-onboarding-design` - Configure tenant transparency dashboard access

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ai-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI explainability requirements EU AI Act {date}"
- Search: "AI transparency user notification patterns {date}"
- Search: "GDPR Article 22 automated decision explanation {date}"

---

## References

- `ai-documentation-patterns` - Documentation for transparency support
- `human-oversight-patterns` - Human review and override capabilities
- `audit-logging-patterns` - Audit trails for AI decisions
- `compliance` - General compliance pattern from bam-patterns.csv
- `observability` - Monitoring and telemetry patterns
