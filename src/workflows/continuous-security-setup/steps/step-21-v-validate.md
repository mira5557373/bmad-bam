# Step 21: Validate Against Quality Criteria

## Purpose

Validate the security configuration against QG-S5 quality gate criteria.

## Actions

### 1. QG-S5 Validation Checks

#### Compliance Checks
- [ ] **CRITICAL:** Compliance policies configured
- [ ] Automated checks enabled
- [ ] Evidence collection active

#### Threat Monitoring Checks
- [ ] **CRITICAL:** Event collection active
- [ ] SIEM integrated
- [ ] Detection rules configured

#### DLP Checks
- [ ] **CRITICAL:** Data classification active
- [ ] Exfiltration prevention enabled
- [ ] Tenant isolation verified

#### Anomaly Detection Checks
- [ ] Baselines established
- [ ] Detection rules active
- [ ] Alert thresholds set

#### Incident Automation Checks
- [ ] Playbooks configured
- [ ] Escalation automated
- [ ] Recovery procedures ready

### 2. Calculate Validation Score

| Category | Critical | Passed | Failed | Score |
|----------|----------|--------|--------|-------|
| Compliance | 1 | {n} | {n} | {%} |
| Threat Monitoring | 1 | {n} | {n} | {%} |
| DLP | 1 | {n} | {n} | {%} |
| Anomaly | 0 | {n} | {n} | {%} |
| Incident | 0 | {n} | {n} | {%} |

### 3. Determine Gate Outcome

**Gate Outcome:** {PASS/CONDITIONAL/FAIL}

## COLLABORATION MENUS (A/P/C):

#### If 'C' (Continue):
- Proceed to next step: `step-22-v-generate-report.md`

## Verification

- [ ] Step actions completed successfully
- [ ] Output artifacts generated
- [ ] Quality criteria met
- [ ] Patterns align with pattern registry

## Outputs

- Updated configuration or artifact

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
