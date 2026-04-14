# BAM AI Model Governance Context

**When to load:** During AI model lifecycle management, model approval processes, or bias monitoring implementation. Load when establishing model versioning, audit trails, or multi-tenant model deployment governance.

**Integrates with:** Nova (AI Runtime Architect), Atlas (Platform Architect), PM agents, Security agents

---

## Core Concepts for AI Model Governance

### Model Lifecycle Matrix

| Phase | Activities | Governance Controls | Documentation |
|-------|------------|---------------------|---------------|
| Development | Training, fine-tuning, evaluation | Approval gates, data review | Model card, training report |
| Staging | Integration testing, bias evaluation | Quality gates, security review | Test results, bias report |
| Production | Deployment, monitoring | Change management, rollback | Deployment manifest, runbook |
| Maintenance | Updates, retraining | Version control, impact assessment | Change log, performance report |
| Retirement | Deprecation, archival | Decommission approval | Archival record, migration guide |

### Model Approval Workflow

#### Approval Stages

| Stage | Reviewers | Criteria | Duration |
|-------|-----------|----------|----------|
| Technical Review | ML Engineer, Data Scientist | Model quality, performance | 2-5 days |
| Security Review | Security Team | Vulnerability scan, data privacy | 3-5 days |
| Bias Review | Ethics Committee, DEI Team | Fairness metrics, impact assessment | 3-7 days |
| Business Review | Product Owner, Legal | Business alignment, compliance | 2-3 days |
| Final Approval | ML Lead, Platform Architect | All criteria met | 1-2 days |

#### Approval Decision Matrix

| Decision | Condition | Action | Escalation |
|----------|-----------|--------|------------|
| Approved | All criteria pass | Proceed to deployment | None |
| Conditional | Minor issues, remediation plan | Proceed with conditions | Track remediation |
| Revision Required | Major issues, fixable | Return to development | None |
| Rejected | Fundamental issues, unfixable | Halt development | Executive review |

#### Model Approval Checklist

| Category | Check | Required |
|----------|-------|----------|
| Performance | Meets accuracy thresholds | Yes |
| Performance | Latency within SLA | Yes |
| Performance | Resource utilization acceptable | Yes |
| Security | No data leakage vulnerabilities | Yes |
| Security | Input validation implemented | Yes |
| Security | Output filtering enabled | Yes |
| Fairness | Bias metrics within tolerance | Yes |
| Fairness | Impact assessment completed | Yes |
| Fairness | Mitigation plan documented | Conditional |
| Compliance | Regulatory requirements met | Yes |
| Compliance | Documentation complete | Yes |
| Compliance | Audit trail enabled | Yes |

### Bias Monitoring Framework

#### Bias Types and Metrics

| Bias Type | Description | Metric | Threshold |
|-----------|-------------|--------|-----------|
| Demographic Parity | Equal positive rates across groups | Selection rate ratio | 0.8-1.2 |
| Equalized Odds | Equal TPR/FPR across groups | TPR/FPR ratio | 0.8-1.2 |
| Predictive Parity | Equal PPV across groups | PPV ratio | 0.8-1.2 |
| Calibration | Equal calibration across groups | Calibration difference | <0.05 |
| Individual Fairness | Similar individuals treated similarly | Similarity score | >0.9 |

#### Protected Attributes

| Attribute | Monitoring Level | Mitigation Priority |
|-----------|------------------|---------------------|
| Race/Ethnicity | Required | Critical |
| Gender | Required | Critical |
| Age | Required | High |
| Disability | Required | High |
| Religion | Recommended | Medium |
| National Origin | Recommended | Medium |
| Socioeconomic Status | Recommended | Medium |

#### Bias Monitoring Pipeline

| Stage | Activity | Frequency | Output |
|-------|----------|-----------|--------|
| Data Collection | Gather prediction + demographic data | Continuous | Raw logs |
| Metric Calculation | Compute fairness metrics | Hourly | Metric snapshots |
| Threshold Check | Compare against tolerances | Hourly | Alert/pass status |
| Trend Analysis | Detect metric drift | Daily | Trend report |
| Root Cause Analysis | Investigate failures | On alert | Analysis report |
| Remediation | Implement fixes | As needed | Remediation record |

### Bias Mitigation Strategies

| Strategy | Stage | Description | Effectiveness |
|----------|-------|-------------|---------------|
| Re-sampling | Pre-processing | Balance training data | Medium |
| Re-weighting | Pre-processing | Adjust sample weights | Medium |
| Adversarial Debiasing | In-processing | Train to minimize bias | High |
| Calibrated Equalized Odds | Post-processing | Adjust decision thresholds | High |
| Reject Option Classification | Post-processing | Add uncertainty handling | Medium |

### Model Versioning System

#### Version Numbering Convention

| Component | Format | Example | Increment When |
|-----------|--------|---------|----------------|
| Major | X.0.0 | 2.0.0 | Architecture change, breaking changes |
| Minor | 0.Y.0 | 2.1.0 | New capabilities, non-breaking |
| Patch | 0.0.Z | 2.1.3 | Bug fixes, performance improvements |
| Build | 0.0.0-build | 2.1.3-rc1 | Pre-release, testing |

#### Version Metadata

| Field | Description | Example |
|-------|-------------|---------|
| model_id | Unique model identifier | model-gpt4-finetune-billing |
| version | Semantic version | 2.1.3 |
| base_model | Parent model | gpt-4-0613 |
| training_data_hash | Hash of training dataset | sha256:abc123... |
| training_date | Training completion date | 2026-04-01 |
| approved_by | Approver identifier | user:alice@company.com |
| approval_date | Approval timestamp | 2026-04-05T10:30:00Z |
| deprecation_date | Scheduled retirement | 2027-04-05 |

#### Version Deployment Status

| Status | Description | Traffic Allocation |
|--------|-------------|-------------------|
| Development | In development | 0% |
| Staging | In testing | 0% (staging only) |
| Canary | Limited production | 1-5% |
| Rolling | Gradual rollout | 5-100% |
| Active | Full production | 100% (primary) |
| Shadow | Parallel evaluation | 0% (shadow traffic) |
| Deprecated | Scheduled retirement | Declining |
| Retired | No longer available | 0% |

### Model Rollback Procedures

#### Rollback Triggers

| Trigger | Severity | Auto-Rollback | Manual Approval |
|---------|----------|---------------|-----------------|
| Error rate >5% | Critical | Yes | N/A |
| Latency >2x baseline | High | Yes | N/A |
| Bias metric violation | High | No | Required |
| Security vulnerability | Critical | Yes | N/A |
| Compliance violation | Critical | No | Required |
| User complaints spike | Medium | No | Required |

#### Rollback Procedure

| Step | Action | Duration | Verification |
|------|--------|----------|--------------|
| 1 | Identify rollback target version | Minutes | Version exists, was stable |
| 2 | Update routing to previous version | Seconds | Traffic redirected |
| 3 | Verify service health | Minutes | Health checks pass |
| 4 | Notify stakeholders | Minutes | Notification sent |
| 5 | Investigate root cause | Hours | RCA initiated |
| 6 | Document incident | Hours | Incident record created |

#### Rollback Types

| Type | Scope | Speed | Data Impact |
|------|-------|-------|-------------|
| Instant | Single model | Seconds | None |
| Gradual | Single model | Minutes | None |
| Full | All models in pipeline | Minutes | None |
| Data Rollback | Model + training data | Hours | Training data reverted |

### Audit Trail Requirements

#### Audit Events

| Event Category | Events | Retention |
|----------------|--------|-----------|
| Model Lifecycle | Create, update, approve, deploy, deprecate, retire | 7 years |
| Access | View, download, invoke | 3 years |
| Configuration | Parameter change, threshold update | 7 years |
| Decisions | Prediction, recommendation | 3 years (or regulatory requirement) |
| Incidents | Alert, rollback, investigation | 7 years |

#### Audit Log Schema

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| event_id | UUID | Unique event identifier | Yes |
| timestamp | ISO8601 | Event timestamp | Yes |
| event_type | Enum | Category of event | Yes |
| model_id | String | Affected model | Yes |
| model_version | String | Model version | Yes |
| actor_id | String | User or system ID | Yes |
| actor_type | Enum | User, system, automated | Yes |
| tenant_id | UUID | Tenant context | Yes |
| action | String | Specific action taken | Yes |
| outcome | Enum | Success, failure, pending | Yes |
| details | JSON | Additional context | No |
| ip_address | String | Source IP | Yes |

#### Audit Access Controls

| Role | Access Level | Scope |
|------|--------------|-------|
| Tenant Admin | Read own tenant logs | Tenant |
| Platform Admin | Read all logs | Platform |
| Auditor | Read all logs, export | Platform |
| Security | Read + investigate | Platform |
| Regulator | Read + export (on request) | Platform |

### Multi-Tenant Model Deployment

#### Deployment Models

| Model | Description | Tenant Isolation | Resource Efficiency |
|-------|-------------|------------------|---------------------|
| Shared Base | All tenants use same base model | Low | High |
| Per-Tenant Fine-Tune | Tenant-specific fine-tuned models | High | Medium |
| Per-Tenant Deployment | Dedicated model instances | Maximum | Low |
| Hybrid | Shared base + tenant fine-tunes | Medium | Medium |

#### Tenant-Specific Model Configuration

| Configuration | Description | Tenant Controllable |
|---------------|-------------|---------------------|
| Temperature | Response creativity | Yes (within bounds) |
| Max Tokens | Response length | Yes (within tier limits) |
| System Prompt | Base instructions | Yes (additive only) |
| Tool Access | Available tools | No (tier-based) |
| Fine-Tune Data | Training data | Yes (with approval) |
| Deployment Region | Geographic location | Yes (tier-based) |

#### Cross-Tenant Model Governance

| Concern | Governance Control | Enforcement |
|---------|-------------------|-------------|
| Model Quality | Centralized approval workflow | Platform team |
| Bias Standards | Platform-wide bias thresholds | Automated monitoring |
| Version Consistency | Coordinated rollouts | Deployment orchestration |
| Security Patching | Mandatory security updates | Forced upgrade policy |
| Compliance | Tenant-specific compliance configs | Per-tenant settings |

### Model Documentation Standards

#### Model Card Requirements

| Section | Content | Required |
|---------|---------|----------|
| Model Details | Name, version, type, owner | Yes |
| Intended Use | Primary use cases, users | Yes |
| Out-of-Scope Use | Prohibited uses | Yes |
| Training Data | Data sources, characteristics | Yes |
| Evaluation Data | Test datasets, metrics | Yes |
| Performance Metrics | Accuracy, latency, throughput | Yes |
| Ethical Considerations | Bias analysis, fairness metrics | Yes |
| Caveats and Recommendations | Known limitations | Yes |
| Updates | Change history | Yes |

#### Documentation Maintenance

| Document | Update Trigger | Responsible |
|----------|----------------|-------------|
| Model Card | Any model change | ML Engineer |
| Training Report | Retraining | Data Scientist |
| Bias Report | Metric changes, quarterly | Ethics Committee |
| Deployment Runbook | Infrastructure change | DevOps |
| Incident History | Each incident | On-call team |

### Compliance Mapping

| Regulation | Governance Requirement | Implementation |
|------------|------------------------|----------------|
| EU AI Act | Risk classification | Per-model risk assessment |
| EU AI Act | Technical documentation | Model cards, training reports |
| EU AI Act | Human oversight | Approval workflows |
| GDPR | Data minimization | Training data audit |
| GDPR | Right to explanation | Explainability infrastructure |
| SOC 2 | Change management | Approval workflows, audit trails |
| ISO 27001 | Access controls | RBAC, audit logging |

---

## Application Guidelines

1. **Document everything** - Complete model cards and training reports
2. **Review before deploy** - Multi-stage approval process
3. **Monitor continuously** - Bias and performance metrics
4. **Version rigorously** - Clear versioning and rollback capability
5. **Audit comprehensively** - Full audit trail for compliance

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should model approval be automated or require human review? | Automated for patch versions with human review for minor/major | Balance velocity with risk management; major changes need human judgment |
| How frequently should bias metrics be evaluated? | Continuous monitoring with daily aggregation and weekly deep analysis | Catches drift early while managing compute costs for analysis |
| Should tenants be allowed to deploy custom fine-tuned models? | Yes for Enterprise tier with mandatory bias and security review | Enables customization while maintaining platform governance standards |
| What model version retention policy should be applied? | Retain last 5 versions per model, archive older versions for 1 year | Enables quick rollback while managing storage costs |
| How to handle model version conflicts between tenants? | Tenant-specific version pinning with mandatory upgrade windows | Allows stability while ensuring security patches are applied |

---

## Related Workflows

- `bmad-bam-agent-runtime-architecture` - Design AI runtime with model governance
- `bmad-bam-ai-eval-safety-design` - Review model safety and bias controls
- `bmad-bam-validate-tool-contract` - Verify model-tool integration governance
- `bmad-bam-tenant-aware-observability` - Model monitoring infrastructure
- `bmad-bam-api-version-release` - Model version release management

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **AI runtime patterns:** `{project-root}/_bmad/bam/data/ai-runtimes.csv` → all rows
- **Quality gates:** `{project-root}/_bmad/bam/data/quality-gates.csv` → filter: `QG-M3`, `QG-I3`
- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter for AI governance

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "AI model governance framework {date}"
- Search: "ML model bias monitoring best practices {date}"
- Search: "model versioning MLOps patterns {date}"
- Search: "multi-tenant AI model deployment governance {date}"
