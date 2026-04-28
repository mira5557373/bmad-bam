# Security

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Generate new artifact | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing artifact | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against QG-F1 criteria | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless artifact exists.

## Create Mode

Generate the artifact by following steps sequentially:

1. **step-01-c-start** - Initialize and gather requirements
2. **step-02-c-analyze** - Analyze options and patterns
3. **step-03-c-design** - Design core solution
4. **step-04-c-document** - Document decisions
5. **step-05-c-complete** - Compile final artifact

## Edit Mode

Modify an existing artifact:

1. **step-10-e-load** - Load existing artifact
2. **step-11-e-apply** - Apply user changes

## Validate Mode

Validate against quality gate criteria:

1. **step-20-v-load** - Load artifact and QG-F1 checklist
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
