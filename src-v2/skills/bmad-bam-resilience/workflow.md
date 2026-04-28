# Resilience Workflow

## Mode Selection

| Mode | Description | Step Files |
|------|-------------|------------|
| **Create** | Design new resilience strategy | `step-01-c-*` through `step-05-c-*` |
| **Edit** | Modify existing resilience artifacts | `step-10-e-*` through `step-11-e-*` |
| **Validate** | Check against QG-DR and QG-CE1 | `step-20-v-*` through `step-22-v-*` |

Default: **Create** mode unless resilience artifacts exist.

## Mode Router

### Artifact Detection

Check for existing artifacts:
- `{output_folder}/resilience/disaster-recovery-plan.md`
- `{output_folder}/resilience/chaos-engineering-strategy.md`

### Create Mode

Follow Create steps sequentially:
1. `step-01-c-select-focus.md` - Select DR or Chaos focus
2. `step-02-c-dr-rto-rpo.md` - Define RTO/RPO targets (if DR)
3. `step-03-c-dr-failover.md` - Design failover procedures (if DR)
4. `step-04-c-chaos-blast-radius.md` - Define blast radius controls (if Chaos)
5. `step-05-c-chaos-experiments.md` - Design chaos experiments (if Chaos)

### Edit Mode

Follow Edit steps:
1. `step-10-e-load.md` - Load existing artifacts
2. `step-11-e-apply.md` - Apply modifications

### Validate Mode

Follow Validate steps:
1. `step-20-v-load.md` - Load artifacts for validation
2. `step-21-v-validate.md` - Run QG-DR and QG-CE1 checks
3. `step-22-v-report.md` - Generate validation report
