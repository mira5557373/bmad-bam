# BAM AI Fairness Guide

**When to load:** During Phase 3 (Solutioning) when designing bias detection and mitigation,
or when user mentions fairness, bias, discrimination, equity, AI ethics, protected attributes.

**Integrates with:** Nova (AI Runtime Architect), Architect (Atlas persona), PM agent

---

## Core Concepts

### AI Fairness in Multi-Tenant Context

Fairness in multi-tenant AI systems requires considering bias at multiple levels:

| Level | Fairness Concern | Multi-Tenant Impact |
|-------|------------------|---------------------|
| Platform | Base model bias | Affects all tenants |
| Tenant | Fine-tuned model bias | Tenant-specific populations |
| User | Per-user treatment | Individual fairness |
| Feature | Input bias | Data source variations |

### Fairness Definitions

| Definition | Description | Use Case |
|------------|-------------|----------|
| Demographic parity | Equal positive rates across groups | Hiring, lending |
| Equalized odds | Equal TPR and FPR across groups | Criminal justice |
| Predictive parity | Equal precision across groups | Risk assessment |
| Individual fairness | Similar individuals treated similarly | Personalization |
| Counterfactual fairness | Outcome unchanged if protected attribute changed | Causal analysis |

### Protected Attributes

| Attribute | Legal Basis | Monitoring Priority |
|-----------|-------------|---------------------|
| Race/Ethnicity | Civil Rights Act | Critical |
| Gender | Title VII, EEOC | Critical |
| Age | ADEA | High |
| Disability | ADA | High |
| Religion | Title VII | High |
| National origin | Title VII | High |
| Pregnancy | PDA | High |
| Sexual orientation | Varies by jurisdiction | Medium |
| Socioeconomic status | Emerging regulations | Medium |

## Application Guidelines

When implementing AI fairness in multi-tenant systems:

1. **Define fairness metrics per use case**: No universal fairness metric
2. **Monitor bias continuously**: Model behavior can drift
3. **Allow tenant-specific thresholds**: Different contexts require different standards
4. **Document trade-offs transparently**: Accuracy vs. fairness decisions
5. **Enable human override**: Support intervention in automated decisions

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| High-stakes decisions | Strict demographic parity + human review | Legal exposure requires conservative approach |
| Personalization | Individual fairness focus | Optimize individual experience without group harm |
| Tenant with diverse population | Per-subgroup monitoring | Aggregate metrics may hide subgroup bias |
| Tenant in regulated industry | Regulatory-specific metrics + evidence | Compliance requires documented fairness |
| New model deployment | Pre-deployment bias audit + monitoring | Catch issues before production impact |
| Bias detected in production | Immediate mitigation + root cause analysis | Limit ongoing harm |

## Implementation Patterns

### Pattern 1: Bias Monitoring Pipeline

| Stage | Action | Output |
|-------|--------|--------|
| Data collection | Log predictions + demographics | Labeled dataset |
| Metric calculation | Compute fairness metrics | Metric snapshots |
| Threshold check | Compare to acceptable ranges | Pass/fail status |
| Trend analysis | Detect metric drift | Trend report |
| Alerting | Notify on violations | Alert ticket |
| Remediation | Trigger mitigation workflow | Remediation record |

### Pattern 2: Fairness Metrics Dashboard

| Metric | Calculation | Threshold |
|--------|-------------|-----------|
| Selection rate ratio | min(rate_A, rate_B) / max(rate_A, rate_B) | > 0.8 |
| Equal opportunity diff | abs(TPR_A - TPR_B) | < 0.1 |
| Predictive parity diff | abs(PPV_A - PPV_B) | < 0.1 |
| Calibration gap | abs(cal_A - cal_B) | < 0.05 |
| AUC disparity | abs(AUC_A - AUC_B) | < 0.05 |

### Pattern 3: Bias Mitigation Strategies

| Stage | Strategy | Description |
|-------|----------|-------------|
| Pre-processing | Re-sampling | Balance training data |
| Pre-processing | Re-weighting | Adjust sample weights |
| In-processing | Adversarial debiasing | Train to minimize bias |
| In-processing | Fairness constraints | Add fairness to loss function |
| Post-processing | Threshold adjustment | Equalize decision rates |
| Post-processing | Calibration | Align probabilities |

## Multi-Tenant Fairness Patterns

### Tenant-Specific Fairness Configuration

| Configuration | Scope | Default |
|---------------|-------|---------|
| Protected attributes | Per tenant | Platform standard |
| Fairness metrics | Per use case | Demographic parity |
| Thresholds | Per tenant | Platform minimum |
| Alerting | Per tenant admin | Standard notifications |
| Reporting | Per tenant | Monthly summary |

### Cross-Tenant Fairness Monitoring

| Concern | Detection | Response |
|---------|-----------|----------|
| Platform-wide bias | Aggregate monitoring | Model update |
| Tenant outlier | Per-tenant vs. platform comparison | Investigation |
| Feature-driven bias | Feature importance analysis | Feature review |
| Data quality bias | Data distribution analysis | Data remediation |

### Fairness in Shared vs. Per-Tenant Models

| Model Type | Fairness Approach | Monitoring |
|------------|-------------------|------------|
| Shared base model | Platform-enforced fairness | Aggregate + per-tenant |
| Per-tenant fine-tuned | Tenant-specific standards | Per-tenant primary |
| Federated learning | Cross-tenant fairness | Global coordination |

## Compliance and Governance

### Regulatory Fairness Requirements

| Regulation | Requirement | Implementation |
|------------|-------------|----------------|
| EU AI Act | Bias testing for high-risk AI | Pre-deployment audit |
| ECOA | Fair lending decisions | Demographic parity monitoring |
| EEOC | Non-discriminatory hiring | Adverse impact analysis |
| Local AI laws | Varies by jurisdiction | Jurisdiction-aware config |

### Fairness Documentation

| Document | Content | Update Frequency |
|----------|---------|------------------|
| Model card | Bias analysis, limitations | Every model version |
| Fairness report | Metric trends, violations | Monthly |
| Impact assessment | Population impact analysis | Pre-deployment |
| Remediation log | Bias fixes applied | Per remediation |

### Audit Trail for Fairness

| Event | Logged Data | Retention |
|-------|-------------|-----------|
| Metric calculation | Metrics, timestamp, model version | 3 years |
| Threshold violation | Metric, threshold, impact | 7 years |
| Mitigation applied | Technique, before/after metrics | 7 years |
| Human override | Decision, justification, approver | 7 years |

## Human Oversight

### Human-in-the-Loop Patterns

| Pattern | Use Case | Implementation |
|---------|----------|----------------|
| Pre-approval | High-stakes decisions | Queue for human review |
| Exception review | Low-confidence predictions | Route to specialist |
| Appeal process | User-requested review | Formal appeal workflow |
| Spot check | Random sample review | Periodic audit |

### Override Documentation

| Field | Purpose | Required |
|-------|---------|----------|
| Decision ID | Track original decision | Yes |
| Override decision | New outcome | Yes |
| Justification | Reasoning for override | Yes |
| Approver | Who made override | Yes |
| Timestamp | When override occurred | Yes |

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Fairness in AI runtime design
- `bmad-bam-ai-eval-safety-design` - AI safety including fairness
- `bmad-bam-ai-eval-safety-design` - Fairness evaluation design

## Related Patterns

Load decision criteria from pattern registry:
- **Patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `ai-runtime`, `compliance`
- **Compliance:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → AI fairness regulations

### Web Research

Use `web_queries` from pattern registry:
- Search: "AI fairness multi-tenant SaaS patterns {date}"
- Search: "machine learning bias detection techniques {date}"
- Search: "algorithmic fairness best practices {date}"
