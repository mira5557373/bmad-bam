---
name: qg-ai3-governance
description: AI governance gate - compliance, audit trails, model approvals, bias monitoring
module: bam
tags: [ai, quality-gate, multi-tenant, governance, compliance]
version: 2.0.0
---

# QG-AI3: AI Governance Gate

> **Gate ID:** QG-AI3 (AI Governance)
> **Phase:** 5-quality
> **Workflow:** bmad-bam-ai-governance-design
> **Prerequisites:** QG-AI1 (AI Runtime Configuration), QG-AI2 (AI Observability)

AI governance MUST be validated before production deployment. This gate verifies compliance frameworks, audit trails, model approval workflows, bias monitoring, and responsible AI practices for multi-tenant systems.

---

## Purpose

QG-AI3 validates that AI governance meets multi-tenant compliance requirements:

1. **Compliance frameworks** are implemented per regulatory requirements
2. **Audit trails** provide complete traceability for all AI decisions
3. **Model approval workflows** ensure proper vetting before deployment
4. **Bias monitoring** detects and mitigates discriminatory outcomes
5. **Responsible AI** practices are embedded in the platform

---

## Compliance Frameworks

### Regulatory Compliance

- [ ] **CRITICAL:** Applicable AI regulations identified per jurisdiction
- [ ] **CRITICAL:** EU AI Act compliance assessed (if applicable)
- [ ] **CRITICAL:** Industry-specific AI requirements documented (healthcare, finance)
- [ ] State/regional AI regulations mapped (e.g., Colorado AI Act)
- [ ] Compliance requirements documented per tenant jurisdiction
- [ ] Compliance update monitoring active

### Data Protection Compliance

- [ ] **CRITICAL:** GDPR Article 22 (automated decision-making) addressed
- [ ] **CRITICAL:** Right to explanation implemented for AI decisions
- [ ] **CRITICAL:** Data minimization enforced in AI processing
- [ ] Consent management for AI features implemented
- [ ] Data retention policies enforced for AI data
- [ ] Cross-border data transfer compliance verified

### Industry Standards

- [ ] **CRITICAL:** NIST AI Risk Management Framework alignment documented
- [ ] ISO/IEC 42001 (AI Management System) gaps assessed
- [ ] IEEE ethics standards considered
- [ ] Industry-specific standards implemented (HIPAA, PCI-DSS AI guidance)

### Per-Tenant Compliance

- [ ] **CRITICAL:** Tenant compliance requirements configurable
- [ ] Compliance tier mapping implemented (regulated vs standard)
- [ ] Tenant-specific audit requirements supported
- [ ] Compliance reporting per tenant available
- [ ] Compliance attestation capability operational

---

## Audit Trails

### Decision Audit

- [ ] **CRITICAL:** All AI decisions logged with complete context
- [ ] **CRITICAL:** Input data captured (or reference to capture)
- [ ] **CRITICAL:** Model version recorded for each decision
- [ ] **CRITICAL:** Output and confidence score logged
- [ ] Decision rationale captured (where explainable)
- [ ] Human override decisions logged with reason

### Immutable Audit Log

- [ ] **CRITICAL:** Audit logs tamper-proof (append-only storage)
- [ ] **CRITICAL:** Audit log integrity verifiable (checksums/signatures)
- [ ] Retention period meets regulatory requirements (7+ years where required)
- [ ] Secure deletion after retention period
- [ ] Audit log backup and disaster recovery operational

### Audit Trail Accessibility

- [ ] **CRITICAL:** Audit logs queryable by request ID
- [ ] **CRITICAL:** Audit logs queryable by tenant
- [ ] Time-range queries supported
- [ ] Export capability for regulatory requests
- [ ] Audit log redaction for sensitive data (with audit of redaction)

### Tenant Audit Isolation

- [ ] **CRITICAL:** Tenant audit logs segregated
- [ ] **CRITICAL:** Tenant can access only their audit data
- [ ] Admin audit access logged separately
- [ ] Cross-tenant audit queries prevented

---

## Model Approval Workflows

### Model Registration

- [ ] **CRITICAL:** All models require registration before use
- [ ] **CRITICAL:** Model metadata captured (source, version, capabilities)
- [ ] Model risk classification assigned (low/medium/high)
- [ ] Model ownership documented
- [ ] Model purpose and intended use documented

### Approval Process

- [ ] **CRITICAL:** High-risk models require multi-stakeholder approval
- [ ] **CRITICAL:** Approval workflow enforced before production deployment
- [ ] Security review checkpoint included
- [ ] Legal/compliance review checkpoint included (high-risk)
- [ ] Ethics review checkpoint included (high-risk)
- [ ] Approval artifacts stored immutably

### Model Change Management

- [ ] **CRITICAL:** Model updates require re-approval
- [ ] **CRITICAL:** Breaking changes trigger full review
- [ ] Minor updates follow expedited path (documented criteria)
- [ ] Emergency deployment procedure with post-hoc review
- [ ] Rollback does not require new approval (pre-approved versions)

### Third-Party Model Governance

- [ ] **CRITICAL:** Third-party models assessed before use
- [ ] Provider compliance certifications verified
- [ ] Data handling agreements in place
- [ ] Provider change notifications monitored
- [ ] Alternative providers identified for critical models

---

## Bias Monitoring

### Fairness Metrics

- [ ] **CRITICAL:** Demographic parity metrics defined
- [ ] **CRITICAL:** Equal opportunity metrics tracked
- [ ] **CRITICAL:** Predictive parity monitored (where applicable)
- [ ] Intersectional fairness considered
- [ ] Metric thresholds defined per use case

### Bias Detection

- [ ] **CRITICAL:** Bias detection pipeline operational
- [ ] **CRITICAL:** Protected attribute proxies identified and monitored
- [ ] Disparate impact analysis available
- [ ] Bias alerts configured for threshold breaches
- [ ] Regular bias audits scheduled (quarterly minimum)

### Bias Mitigation

- [ ] **CRITICAL:** Bias mitigation strategies documented
- [ ] Pre-processing mitigation available (data balancing)
- [ ] In-processing mitigation available (fairness constraints)
- [ ] Post-processing mitigation available (threshold adjustment)
- [ ] Mitigation effectiveness tracking operational

### Bias Reporting

- [ ] Bias metrics included in model performance reports
- [ ] Bias incidents documented and tracked
- [ ] Stakeholder notification for significant bias detected
- [ ] Remediation tracking for bias issues

---

## Responsible AI Practices

### Transparency

- [ ] **CRITICAL:** AI use disclosed to end users
- [ ] **CRITICAL:** AI limitations communicated clearly
- [ ] Model capabilities accurately described (no overclaims)
- [ ] AI vs human assistance clearly distinguished
- [ ] Uncertainty communicated in responses

### Explainability

- [ ] **CRITICAL:** Decision explanations available (where required)
- [ ] Explanation fidelity validated (accurate to model behavior)
- [ ] User-appropriate explanation levels (technical vs layperson)
- [ ] Feature importance available for relevant models
- [ ] Counterfactual explanations available (where applicable)

### Human Oversight

- [ ] **CRITICAL:** Human-in-the-loop for high-stakes decisions
- [ ] **CRITICAL:** Escalation path to human review operational
- [ ] Human override capability always available
- [ ] Human oversight metrics tracked
- [ ] Sufficient human capacity for oversight volume

### Safety and Wellbeing

- [ ] **CRITICAL:** Harmful use cases prevented by design
- [ ] **CRITICAL:** Sensitive topics handled appropriately
- [ ] User wellbeing considerations documented
- [ ] Vulnerable user protections implemented
- [ ] Crisis response protocols for AI interactions

---

## Documentation and Training

### Policy Documentation

- [ ] **CRITICAL:** AI governance policy published
- [ ] **CRITICAL:** Acceptable use policy documented
- [ ] Data handling policy for AI documented
- [ ] Incident response procedures for AI documented
- [ ] Policy review schedule established (annual minimum)

### Stakeholder Training

- [ ] **CRITICAL:** AI users trained on governance requirements
- [ ] **CRITICAL:** Developers trained on responsible AI practices
- [ ] Compliance team trained on AI-specific regulations
- [ ] Leadership briefed on AI risks and governance
- [ ] Training records maintained

### Public Transparency

- [ ] AI system card or documentation public (where required)
- [ ] Model performance claims substantiated
- [ ] Incident disclosure policy documented
- [ ] Stakeholder feedback mechanism operational

---

## Incident Management

### AI Incident Response

- [ ] **CRITICAL:** AI incident classification defined
- [ ] **CRITICAL:** Incident response playbooks documented
- [ ] **CRITICAL:** Incident escalation path defined
- [ ] Post-incident review process established
- [ ] Lessons learned integration mechanism

### Model Quarantine

- [ ] **CRITICAL:** Model quarantine procedure documented
- [ ] **CRITICAL:** Quarantine can be activated within SLA
- [ ] Quarantine scope definable (tenant, model, use case)
- [ ] Recovery from quarantine requires approval
- [ ] Quarantine events audited

---

## Critical vs Non-Critical Classification

| Category | Classification | CONDITIONAL Threshold | FAIL Threshold |
|----------|----------------|----------------------|----------------|
| Regulatory Compliance | CRITICAL | Minor gaps documented | No compliance assessment |
| Data Protection | CRITICAL | Consent gaps | No right to explanation |
| Industry Standards | CRITICAL | Gaps documented | No NIST alignment |
| Per-Tenant Compliance | CRITICAL | Reporting incomplete | No tenant config |
| Decision Audit | CRITICAL | Rationale missing | No decision logging |
| Immutable Audit Log | CRITICAL | Backup incomplete | No tamper protection |
| Audit Accessibility | CRITICAL | Export missing | Logs not queryable |
| Tenant Audit Isolation | CRITICAL | Admin logging gaps | Cross-tenant access |
| Model Registration | CRITICAL | Metadata incomplete | No registration |
| Approval Process | CRITICAL | Ethics review missing | No approval workflow |
| Model Change Management | CRITICAL | Minor update gaps | No re-approval |
| Third-Party Governance | CRITICAL | Provider monitoring gaps | No assessment |
| Fairness Metrics | CRITICAL | Intersectional missing | No metrics defined |
| Bias Detection | CRITICAL | Proxy detection partial | No detection pipeline |
| Bias Mitigation | CRITICAL | Effectiveness unknown | No mitigation |
| Transparency | CRITICAL | Uncertainty gaps | No AI disclosure |
| Explainability | CRITICAL | Fidelity unvalidated | No explanations |
| Human Oversight | CRITICAL | Capacity concerns | No HITL for high-stakes |
| Safety and Wellbeing | CRITICAL | Vulnerable gaps | Harmful use possible |
| Policy Documentation | CRITICAL | Review schedule missing | No governance policy |
| Stakeholder Training | CRITICAL | Leadership gaps | No training program |
| AI Incident Response | CRITICAL | Playbook gaps | No incident process |
| Model Quarantine | CRITICAL | Scope incomplete | No quarantine ability |
| Bias Reporting | Non-critical | Notification gaps | N/A |
| Public Transparency | Non-critical | Model card incomplete | N/A |

---

## Gate Decision

| Classification | Criteria |
|----------------|----------|
| **PASS** | All CRITICAL items checked, >=80% standard items complete |
| **CONDITIONAL** | All CRITICAL items checked, <80% standard items + documented mitigation plan |
| **FAIL** | Any CRITICAL item unchecked - block production deployment, enter recovery protocol |
| **WAIVED** | Non-critical item explicitly waived with stakeholder sign-off and documented justification |

---

## Waiver Process

For non-critical items that cannot be addressed:

1. Document the specific item and reason for waiver
2. Identify business justification
3. Obtain stakeholder sign-off (Product Owner or Technical Lead)
4. Record waiver in gate report with expiration date (if applicable)
5. Create follow-up ticket for future remediation

**Note:** CRITICAL items cannot be waived. AI governance items may have additional legal/regulatory constraints on waivers.

---

## Recovery Protocol

**If gate triggers CONDITIONAL or FAIL status:**

### Attempt 1: Address Governance Gaps (target: 3-5 days)

- Review failed checks and identify root cause
- Complete missing compliance documentation
- Configure audit logging for missing decision points
- Establish approval workflow for unregistered models
- Implement missing bias detection metrics
- Re-run QG-AI3 validation
- **Lock passed categories**

### Attempt 2: Deeper Compliance Review (target: 1-2 weeks)

- Engage Legal, Compliance, and Ethics teams
- Conduct comprehensive compliance assessment
- Review audit trail integrity and completeness
- Audit model approval process end-to-end
- Validate bias monitoring effectiveness
- Conduct responsible AI assessment
- Re-run validation after remediation
- **Preserve locked categories**

### Attempt 3: Mandatory Course Correction

- Escalate to CISO, General Counsel, AI Ethics Board, Executive Leadership
- Document governance blockers with legal/regulatory risk assessment
- Consider feature limitation or regional restrictions if compliance infeasible
- Engage external compliance auditors if required
- Create remediation plan with legal sign-off
- Schedule follow-up validation within 2 weeks
- Consider regulatory pre-notification if required

### Category-Specific Recovery

| Category | Immediate Action | Escalation Trigger |
|----------|------------------|-------------------|
| Regulatory Compliance | Complete compliance mapping, document gaps | No compliance assessment |
| Audit Trails | Implement decision logging, configure retention | No audit capability |
| Model Approval | Establish workflow, register existing models | No approval process |
| Bias Monitoring | Implement detection pipeline, define metrics | No bias detection |
| Explainability | Add explanation generation, validate fidelity | No explanations |
| Human Oversight | Configure HITL for high-stakes, verify capacity | No human review |
| Incident Response | Document playbooks, establish escalation | No incident process |

---

## Automated Validation Script

```bash
# Run as part of QG-AI3 gate
./scripts/validate-ai-governance.sh

# Validates:
# - Compliance documentation complete
# - Audit logging operational
# - Model approval workflow enforced
# - Bias metrics collection active
# - Explanation generation functional
# - Human oversight operational
# - Incident response documented
```

---

## Related Workflows

- `bmad-bam-ai-governance-design` - Governance architecture
- `bmad-bam-compliance-assessment` - Compliance evaluation
- `bmad-bam-bias-audit` - Bias detection and mitigation
- `bmad-bam-model-approval` - Model registration workflow

## Related Templates

- `ai-governance-policy-template.md` - Governance policy documentation
- `model-card-template.md` - Model documentation
- `bias-audit-template.md` - Bias assessment documentation
- `ai-incident-template.md` - Incident documentation

## Related Patterns

- `responsible-ai.md` - Responsible AI practices
- `ai-compliance.md` - Compliance framework mapping
- `bias-mitigation.md` - Bias detection and mitigation
- `explainability-patterns.md` - AI explanation approaches

---

## Web Research Verification

- [ ] Search the web: "EU AI Act compliance requirements {date}" - Verify regulatory requirements
- [ ] Search the web: "AI audit trail best practices enterprise {date}" - Confirm audit patterns
- [ ] Search the web: "ML model bias detection techniques {date}" - Verify bias monitoring
- [ ] Search the web: "responsible AI governance framework {date}" - Confirm governance patterns
- [ ] Search the web: "AI model approval workflow enterprise {date}" - Verify approval processes
- [ ] _Source: [URL]_ citations documented for key governance decisions

---

**PASS CRITERIA:** All CRITICAL checkboxes completed, compliance documented, audit trails operational, bias monitoring active
**OWNER:** AI Ethics Lead / Chief AI Officer
**REVIEWERS:** Legal, Compliance, CISO, AI Platform Lead

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-04-27 | BAM | New V2 gate for AI governance; comprehensive compliance, bias, and responsible AI coverage |
