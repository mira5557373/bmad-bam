# Privacy Compliance

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new privacy compliance design | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing privacy design | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against QG-CC criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless artifact exists.

## Create Mode

Generate the privacy compliance design by following steps sequentially:

1. **step-01-c-select-focus** - Select compliance focus (GDPR/Export/Consent)
2. **step-02-c-gdpr-rights** - Design data subject rights implementation
3. **step-03-c-gdpr-lawful-basis** - Design lawful basis tracking
4. **step-04-c-data-export** - Design data portability implementation
5. **step-05-c-consent-management** - Design consent workflow

## Edit Mode

Modify an existing privacy compliance design:

1. **step-10-e-load** - Load existing artifact
2. **step-11-e-apply** - Apply user changes

## Validate Mode

Validate against quality gate criteria:

1. **step-20-v-load** - Load artifact and QG-CC checklist
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
2. **Attempt 2:** Deep review with stakeholders
3. **Mandatory Course Correction:** Escalate to leadership
