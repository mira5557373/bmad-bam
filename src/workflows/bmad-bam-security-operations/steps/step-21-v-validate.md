# Step 21: Validate Security Operations

## Purpose

Validate the security operations artifacts against QG-S8 quality criteria.

---

## Prerequisites

- Previous step completed (step-20-v-load-artifact.md)
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S8`

---

## Actions

Execute the validation checklist below to verify security operations artifacts.

## Validation Checklist

### Threat Detection
- [ ] Detection categories defined
- [ ] Detection rules configured
- [ ] Data sources mapped
- [ ] Alert routing configured

### Correlation Rules
- [ ] Correlation scenarios defined
- [ ] Correlation rules built
- [ ] Tenant-aware correlation configured

### AI Threat Detection
- [ ] AI threat categories defined
- [ ] AI detection rules configured
- [ ] AI monitoring infrastructure set up

### Hunting Capabilities
- [ ] Hunting hypotheses defined
- [ ] Hunting playbooks created
- [ ] Hunting schedule established

### QG-S8 Security Operations Gate Verification

| Pattern | Required | Status | Evidence |
|---------|----------|--------|----------|
| threat_detection_active | **YES** | [ ] Pass / [ ] Fail | Detection rules |
| correlation_rules_set | **YES** | [ ] Pass / [ ] Fail | Correlation config |
| ai_monitoring_enabled | **YES** | [ ] Pass / [ ] Fail | AI detection |
| hunting_capability | **YES** | [ ] Pass / [ ] Fail | Hunting playbooks |

**QG-S8 Security Operations Gate:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All required patterns verified
- **CONDITIONAL**: Minor gaps documented
- **FAIL**: Critical pattern failing

---

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-22-v-generate-report.md` to generate final validation report.
