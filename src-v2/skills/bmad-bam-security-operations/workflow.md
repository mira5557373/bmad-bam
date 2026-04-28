# Security Operations

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new security operations design | `step-01-c-*` through `step-07-c-*` |
| **Edit** | Modify existing artifact | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against QG-S3 and QG-IR criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless artifact exists.

## Sub-Workflow Focus Selection

Before starting Create mode, select focus area:

| Code | Focus | Steps | Output |
|------|-------|-------|--------|
| **ZSR** | Secrets Management | step-02-c, step-03-c | Secrets rotation design |
| **ZST** | Threat Modeling | step-04-c, step-05-c | STRIDE analysis, mitigations |
| **ZIR** | Incident Response | step-06-c, step-07-c | Runbooks, notification procedures |
| **ALL** | Complete Coverage | step-01-c through step-07-c | Full security operations design |

## Create Mode

Generate the artifact by following steps sequentially:

1. **step-01-c-select-focus** - Select focus area (ZSR, ZST, ZIR, or ALL)
2. **step-02-c-secrets-analysis** - Analyze secrets requirements (ZSR)
3. **step-03-c-secrets-rotation** - Design rotation policies (ZSR)
4. **step-04-c-threat-stride** - STRIDE threat analysis (ZST)
5. **step-05-c-threat-mitigations** - Design threat mitigations (ZST)
6. **step-06-c-incident-classification** - Design incident classification (ZIR)
7. **step-07-c-incident-runbooks** - Create incident runbooks (ZIR)

## Edit Mode

Modify an existing artifact:

1. **step-10-e-load** - Load existing artifact
2. **step-11-e-apply** - Apply user changes

## Validate Mode

Validate against quality gate criteria:

1. **step-20-v-load** - Load artifact and QG-S3/QG-IR checklists
2. **step-21-v-validate** - Execute validation checks
3. **step-22-v-report** - Generate validation report

## Quality Gate Outcomes

| Outcome | Description | Next Step |
|---------|-------------|-----------|
| PASS | All gates pass | Proceed to next workflow |
| CONDITIONAL | Critical pass, standard gaps | Document mitigations, proceed |
| FAIL | Critical check fails | Enter recovery protocol |

## Recovery Protocol

On FAIL outcome:
1. **Attempt 1:** Fix identified issues, re-run validation
2. **Attempt 2:** Deep review with security team
3. **Mandatory Course Correction:** Escalate to CISO/security leadership
