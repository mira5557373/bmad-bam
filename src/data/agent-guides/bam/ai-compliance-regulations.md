# BAM AI Compliance Regulations Context

**When to load:** During AI system design, compliance audits, or when implementing AI governance controls. Load when addressing EU AI Act, NIST AI RMF, or transparency requirements in multi-tenant AI platforms.

**Integrates with:** Atlas (Platform Architect), Nova (AI Runtime Architect), Security agents, Legal/Compliance stakeholders

---

## Core Concepts for AI Compliance

### Regulatory Landscape Matrix

| Regulation | Jurisdiction | Effective Date | Penalty Range | Multi-Tenant Impact |
|------------|--------------|----------------|---------------|---------------------|
| EU AI Act | European Union | Aug 2026 (full) | Up to 7% global revenue | High - per-tenant risk classification |
| NIST AI RMF | United States | Voluntary | N/A (best practice) | Medium - framework for governance |
| UK AI Regulation | United Kingdom | 2025+ | TBD | High - UK GDPR intersection |
| CCPA/CPRA AI | California | 2024+ | $7,500/violation | Medium - automated decision-making |
| FTC AI Guidelines | United States | Ongoing | Varies | Medium - deceptive AI practices |
| GDPR Art. 22 | European Union | Active | 4% global revenue | High - automated decision rights |

### EU AI Act Risk Classification

| Risk Level | Examples | Requirements | Multi-Tenant Consideration |
|------------|----------|--------------|---------------------------|
| Unacceptable | Social scoring, subliminal manipulation | Prohibited | Blocked at platform level |
| High-Risk | Credit scoring, hiring, medical diagnosis | Full compliance | Per-tenant assessment required |
| Limited Risk | Chatbots, emotion recognition | Transparency | Disclosure per tenant UI |
| Minimal Risk | AI-enabled games, spam filters | No requirements | Standard deployment |

#### High-Risk AI System Requirements

| Requirement | Description | Implementation |
|-------------|-------------|----------------|
| Risk Management | Continuous risk assessment | Per-tenant risk registry |
| Data Governance | Training data quality | Dataset documentation |
| Technical Documentation | System design docs | Architecture artifacts |
| Record-Keeping | Logs for audit | Tenant-isolated audit logs |
| Transparency | User information | Disclosure banners |
| Human Oversight | Override capability | Human-in-loop workflows |
| Accuracy & Robustness | Performance standards | Model evaluation metrics |
| Cybersecurity | Security measures | Tenant isolation controls |

### NIST AI Risk Management Framework

#### Core Functions

| Function | Purpose | Multi-Tenant Implementation |
|----------|---------|----------------------------|
| GOVERN | Establish AI governance | Platform-level policies, tenant-level customization |
| MAP | Understand AI context | Per-tenant use case mapping |
| MEASURE | Assess AI risks | Tenant-specific risk metrics |
| MANAGE | Mitigate AI risks | Tenant-configurable controls |

#### GOVERN Function Categories

| Category | Key Actions | Tenant Impact |
|----------|-------------|---------------|
| G.1 Policies | Document AI policies | Platform policies inherited by tenants |
| G.2 Accountability | Assign roles | Tenant admin responsibilities |
| G.3 Workforce | AI literacy training | Tenant user education |
| G.4 Culture | Foster responsible AI | Tenant-specific guidance |
| G.5 Engagement | Stakeholder input | Per-tenant feedback mechanisms |
| G.6 Processes | AI lifecycle management | Shared platform processes |

#### MAP Function Categories

| Category | Key Actions | Tenant Impact |
|----------|-------------|---------------|
| M.1 Context | Define AI context | Tenant use case documentation |
| M.2 Categorization | Classify AI system | Per-tenant risk categorization |
| M.3 Capabilities | Assess AI capabilities | Model capability disclosure |
| M.4 Mission Analysis | Align with objectives | Tenant business alignment |

#### MEASURE Function Categories

| Category | Key Actions | Tenant Impact |
|----------|-------------|---------------|
| MS.1 Risk Identification | Identify risks | Tenant-specific risk analysis |
| MS.2 Risk Analysis | Analyze risks | Per-tenant risk scoring |
| MS.3 Tracking | Monitor risks | Tenant risk dashboards |
| MS.4 Metrics | Define metrics | Tenant-customizable KPIs |

#### MANAGE Function Categories

| Category | Key Actions | Tenant Impact |
|----------|-------------|---------------|
| MN.1 Risk Treatment | Implement controls | Platform + tenant controls |
| MN.2 Risk Prioritization | Prioritize responses | Tenant-specific priorities |
| MN.3 Documentation | Document decisions | Per-tenant audit trail |
| MN.4 Continuous Improvement | Iterate processes | Platform improvement cycle |

### Transparency Requirements

#### User Disclosure Requirements

| Requirement | Regulation | Implementation |
|-------------|------------|----------------|
| AI Interaction Notice | EU AI Act Art. 52 | "You are interacting with an AI system" |
| Emotion Recognition Notice | EU AI Act Art. 52 | Inform subjects of emotion detection |
| Deepfake Labeling | EU AI Act Art. 52 | Mark AI-generated content |
| Automated Decision Notice | GDPR Art. 22 | Explain automated decision-making |
| Right to Human Review | GDPR Art. 22 | Offer human review option |

#### Multi-Tenant Disclosure Implementation

| Layer | Responsibility | Customization |
|-------|----------------|---------------|
| Platform | Base disclosure templates | None |
| Tenant Admin | Enable/customize disclosures | Wording, placement |
| End User | Receive disclosures | Acknowledgment required |

### Explainability Requirements

#### Explainability Levels

| Level | Description | Use Case | Implementation |
|-------|-------------|----------|----------------|
| Global | Overall model behavior | Model documentation | Model cards |
| Local | Individual decision explanation | User-facing | SHAP/LIME outputs |
| Counterfactual | "What would change outcome" | Appeals process | Counterfactual generation |
| Contrastive | "Why A instead of B" | Decision support | Comparative analysis |

#### Multi-Tenant Explainability Architecture

| Component | Platform Level | Tenant Level |
|-----------|----------------|--------------|
| Model Cards | Base model documentation | Tenant-specific fine-tune docs |
| Feature Importance | Global feature rankings | Tenant data feature analysis |
| Decision Logs | Platform audit infrastructure | Tenant-isolated decision records |
| Appeal Workflow | Standard appeal process | Tenant-customized escalation |

### Multi-Tenant AI Compliance Considerations

#### Shared Responsibility Model

| Compliance Area | Platform Responsibility | Tenant Responsibility |
|-----------------|------------------------|----------------------|
| Infrastructure Security | Full | None |
| Model Base Training | Full | None |
| Fine-Tuning Data Quality | Tooling, guidance | Data provision, validation |
| Use Case Risk Assessment | Templates, guidance | Assessment execution |
| User Disclosures | Templates, enforcement | Content customization |
| Audit Logs | Infrastructure | Log review, retention |
| Incident Response | Platform-level response | Tenant notification, cooperation |

#### Tenant Compliance Configuration

| Configuration | Description | Default |
|---------------|-------------|---------|
| Risk Classification | Tenant's AI use case risk level | Requires assessment |
| Disclosure Mode | Transparency disclosure settings | Standard |
| Human Oversight | Human-in-loop requirements | Per risk level |
| Audit Retention | Log retention period | 7 years (EU AI Act) |
| Geographic Restrictions | Model deployment regions | All regions |

#### Cross-Tenant Compliance Isolation

| Concern | Mitigation | Verification |
|---------|------------|--------------|
| Model contamination | Separate fine-tuning jobs | Training data audit |
| Compliance spillover | Per-tenant risk classification | Classification audit |
| Audit trail mixing | Tenant-isolated logging | Log isolation testing |
| Disclosure inconsistency | Tenant-specific disclosure configs | Disclosure audit |

### Compliance Monitoring

#### Continuous Compliance Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Disclosure Rate | % of AI interactions with disclosure | <99% |
| Human Override Rate | % of decisions with human review | Below configured minimum |
| Explanation Availability | % of decisions with explanation | <100% |
| Bias Metrics | Fairness metrics by protected class | Deviation >5% |
| Audit Log Completeness | % of decisions logged | <100% |

#### Compliance Reporting

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| Compliance Dashboard | Real-time | Tenant Admin | Key metrics, alerts |
| Regulatory Report | Quarterly | Compliance Officer | Full compliance status |
| Audit Package | On-demand | External Auditors | Complete evidence |
| Incident Report | Per incident | Regulators | Root cause, remediation |

### Incident Response for AI Compliance

#### Compliance Incident Categories

| Category | Examples | Response Time | Escalation |
|----------|----------|---------------|------------|
| Critical | Prohibited AI use detected | Immediate | Regulator notification |
| High | High-risk AI without controls | 4 hours | Executive + Legal |
| Medium | Disclosure failure | 24 hours | Compliance team |
| Low | Documentation gap | 72 hours | Standard process |

#### Incident Response Workflow

| Phase | Actions | Documentation |
|-------|---------|---------------|
| Detection | Automated monitoring, user report | Incident ticket |
| Containment | Disable affected AI, preserve evidence | Containment log |
| Analysis | Root cause investigation | Analysis report |
| Remediation | Fix compliance gap | Remediation plan |
| Reporting | Notify stakeholders, regulators if required | Notification records |
| Prevention | Implement controls | Control documentation |

---

## Application Guidelines

1. **Classify AI use cases early** - Determine risk level before deployment
2. **Implement transparency by default** - All AI interactions should include disclosures
3. **Design for audit** - Every AI decision must be logged and explainable
4. **Respect tenant jurisdiction** - Apply strictest applicable regulation per tenant
5. **Plan for regulation evolution** - Build flexible compliance controls

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should platform apply EU AI Act globally or only for EU tenants? | Apply globally with tenant opt-out for lower requirements | Simplifies implementation; highest standard protects all users |
| How should high-risk AI classification be determined per tenant? | Tenant self-assessment with platform validation and override capability | Balances tenant autonomy with platform compliance responsibility |
| Where should AI audit logs be stored for multi-tenant compliance? | Tenant-isolated storage with platform-level aggregation for oversight | Meets tenant data isolation requirements while enabling platform compliance monitoring |
| How to handle tenant request to disable AI disclosures? | Deny for regulated categories; allow for minimal-risk only | Regulatory compliance cannot be waived; flexibility for non-regulated use cases |
| Should explainability be provided for all AI decisions or only on request? | Proactive for high-risk; on-request for others | Balances user experience with compliance requirements |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design AI runtime with compliance controls
- `bmad-bam-ai-eval-safety-design` - Review AI system safety controls
- `bmad-bam-validate-tool-contract` - Verify tool governance compliance
- `bmad-bam-tenant-aware-observability` - Compliance monitoring infrastructure
- `bmad-bam-security-review` - Security controls for compliance

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → all rows
- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → filter for governance features
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-M3`, `QG-I3`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "EU AI Act compliance requirements {date}"
- Search: "NIST AI RMF implementation guide {date}"
- Search: "AI transparency explainability requirements {date}"
- Search: "multi-tenant AI governance frameworks {date}"
