# Resilience Workflow

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Design new resilience strategy | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing resilience artifacts | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against QG-DR and QG-CE1 | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless resilience artifacts exist.

## Sub-Workflow Focus Selection

Before starting Create mode, select focus area:

| Code | Focus | Steps | Output |
|------|-------|-------|--------|
| **ZDR** | Disaster Recovery | step-02-c, step-03-c | DR plan with RTO/RPO |
| **ZCH** | Chaos Engineering | step-04-c, step-05-c | Chaos experiment strategy |
| **BOTH** | Complete Coverage | step-01-c through step-05-c | Full resilience design |

## Mode Router

### Artifact Detection

Check for existing artifacts:
- `{output_folder}/resilience/disaster-recovery-plan.md`
- `{output_folder}/resilience/chaos-engineering-strategy.md`

### Create Mode

Follow Create steps sequentially:
1. **step-01-c-select-focus** - Select DR or Chaos focus
2. **step-02-c-dr-rto-rpo** - Define RTO/RPO targets (if DR)
3. **step-03-c-dr-failover** - Design failover procedures (if DR)
4. **step-04-c-chaos-blast-radius** - Define blast radius controls (if Chaos)
5. **step-05-c-chaos-experiments** - Design chaos experiments (if Chaos)

### Edit Mode

Follow Edit steps:
1. **step-10-e-load** - Load existing artifacts
2. **step-11-e-apply** - Apply modifications

### Validate Mode

Follow Validate steps:
1. **step-20-v-load** - Load artifacts for validation
2. **step-21-v-validate** - Run QG-DR and QG-CE1 checks
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
2. **Attempt 2:** Deep review with SRE/DevOps team
3. **Mandatory Course Correction:** Escalate to engineering leadership
