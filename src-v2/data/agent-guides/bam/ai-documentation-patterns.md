# AI Documentation Patterns

**When to load:** When implementing EU AI Act documentation requirements, AI system transparency obligations, or technical documentation for AI-powered multi-tenant SaaS

**Integrates with:** Architect (Nova persona), Tech Writer agent, Compliance/Legal teams

---

## Core Concepts

### AI System Inventory and Classification

An AI system inventory is a centralized registry that catalogs all AI components within your multi-tenant platform, including their risk classification, purpose, and regulatory status.

| Classification | Description | Documentation Level |
|----------------|-------------|---------------------|
| High-Risk AI | Systems making consequential decisions affecting users | Full technical documentation, conformity assessment |
| Limited Risk AI | Systems with transparency obligations | Model cards, user notifications |
| Minimal Risk AI | Low-impact AI features | Basic documentation, version tracking |

### Model Cards and Technical Documentation

Model cards provide standardized documentation for AI models, capturing essential information about intended use, limitations, training data, and performance characteristics that support compliance audits.

- **Intended Use**: Documented purposes and valid deployment contexts
- **Limitations**: Known constraints, failure modes, and out-of-scope applications
- **Performance Metrics**: Accuracy benchmarks, fairness evaluations, and reliability measures
- **Training Data**: Data sources, preprocessing methods, and bias assessments

### Tenant-Specific AI Documentation

In multi-tenant environments, AI documentation must account for per-tenant customizations including custom prompts, fine-tuned models, and tenant-specific feature configurations.

| Aspect | Documentation Requirement |
|--------|---------------------------|
| Custom Prompts | Record tenant-specific prompt templates and modifications |
| Model Configurations | Document any tenant-specific model parameters or restrictions |
| Feature Flags | Track which AI features are enabled/disabled per tenant |
| Usage Restrictions | Note any tenant-imposed limitations on AI capabilities |

## Overview

AI documentation patterns ensure compliance with emerging AI regulations (particularly the EU AI Act) by establishing systematic approaches to documenting AI system design, capabilities, limitations, and risk assessments. These patterns are essential for multi-tenant platforms where AI features must be documented consistently across tenant deployments while supporting conformity assessments.

## Compliance Requirements

- **Technical Documentation**: Complete documentation of AI system design, development methodology, training data characteristics, and testing procedures
- **Risk Documentation**: Systematic documentation of identified risks, risk mitigation measures, and residual risk assessments
- **Change Documentation**: Version-controlled records of all modifications to AI systems including model updates, prompt changes, and capability additions
- **Performance Documentation**: Documented metrics, benchmarks, and evaluation results demonstrating system reliability and accuracy

## Implementation Patterns

| Pattern | Description | Frameworks |
|---------|-------------|------------|
| AI System Inventory | Centralized registry of all AI components with classification, purpose, and risk level | EU AI Act, ISO 42001 |
| Model Card Generation | Automated generation of standardized model documentation including intended use, limitations, and performance metrics | EU AI Act, NIST AI RMF |
| Training Data Documentation | Records of data sources, preprocessing steps, quality measures, and bias assessments | EU AI Act, GDPR |
| Decision Logging | Structured logs of AI-assisted decisions with input context, model outputs, and confidence scores | EU AI Act, SOC2 |
| Version History Tracking | Complete audit trail of AI system versions with change justifications and impact assessments | EU AI Act, ISO 27001 |
| Tenant-Specific Documentation | Per-tenant records of AI feature configurations, customizations, and usage restrictions | EU AI Act, Multi-tenant |

## Validation Checklist

- [ ] AI system inventory is complete and current
- [ ] Each AI component has a standardized model card
- [ ] Training data sources and characteristics are documented
- [ ] Risk assessments are documented and reviewed
- [ ] Change history is maintained with justifications
- [ ] Performance metrics are documented and benchmarked
- [ ] Tenant-specific configurations are recorded
- [ ] Documentation supports conformity assessment requirements

## Application Guidelines

When implementing AI documentation for compliance:

1. **Start with AI inventory**: Create a comprehensive registry of all AI components in your system, including models, prompts, and automated decision systems
2. **Apply risk classification**: Categorize each AI component according to EU AI Act risk levels (unacceptable, high, limited, minimal)
3. **Generate documentation per classification**: High-risk systems require full technical documentation, model cards, and conformity assessments
4. **Implement version control**: Track all changes to AI systems with clear justifications and impact assessments
5. **Establish review cadence**: Schedule regular documentation reviews aligned with model update cycles

When documenting for multi-tenant environments:

1. **Create tenant-specific documentation views**: Allow tenants to access documentation relevant to their AI feature usage
2. **Track tenant customizations**: Document any tenant-specific AI configurations or restrictions
3. **Support compliance exports**: Enable tenants to export AI documentation for their own regulatory submissions

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How detailed should model cards be? | Full detail for high-risk AI, summary for minimal risk | EU AI Act requires extensive documentation only for high-risk systems |
| Should documentation be automated or manual? | Automated generation with manual review for high-risk | Automation ensures completeness; manual review catches context-specific issues |
| How to handle training data documentation for third-party models? | Document what is known, note limitations, require vendor attestations | Transparency about documentation gaps supports compliance good faith |
| When to create tenant-specific AI documentation? | When tenant customizations change AI behavior or risk profile | Custom prompts or fine-tuning require per-tenant documentation |
| How frequently to update AI documentation? | On each model update, prompt change, or capability addition | Documentation must stay current with actual system behavior |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design compliance documentation requirements
- `bmad-bam-ai-eval-safety-design` - Document AI evaluation and safety measures
- `bmad-bam-agent-runtime-architecture` - Document agent runtime configurations

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ai-*`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "EU AI Act documentation requirements {date}"
- Search: "AI system technical documentation best practices {date}"
- Search: "model card generation standards {date}"

---

## References

- `ai-transparency-patterns` - Transparency and explainability requirements
- `human-oversight-patterns` - Human control documentation
- `compliance` - General compliance pattern from bam-patterns.csv
- `agent-runtime` - Agent execution framework documentation
- `llmops` - Model lifecycle management
