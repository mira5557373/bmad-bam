# Step 5: Recommend Module Assignment

Generate implementation recommendations based on complexity classification:

## Classification Impact

| Complexity | Architecture Phases | Epic Granularity | Special Requirements |
|------------|---------------------|------------------|---------------------|
| SIMPLE | Skip phases 5-8 if not needed | 1-2 coarse epics | None |
| STANDARD | All phases | 3-5 standard epics | None |
| COMPLEX | All phases + extensions | 5+ fine-grained epics | Spike stories required |

## Recommendations by Classification

### SIMPLE Modules
- Fast-track implementation path
- Minimal documentation overhead
- Single developer can own end-to-end
- Skip optional architecture phases
- Combine related stories into larger epics

### STANDARD Modules
- Standard implementation path
- Full documentation per phase
- 1-2 developers, possible handoff points
- All architecture phases required
- Standard epic breakdown

### COMPLEX Modules
- Extended implementation path with spike stories
- Detailed documentation and ADRs
- Team effort, explicit ownership boundaries
- All phases plus risk mitigation extensions
- Fine-grained epics, frequent checkpoints
- Consider phased delivery (MVP first)

## Output Artifacts

Write complexity assessment to:
- `{output_folder}/planning-artifacts/modules/{module-name}/complexity-assessment.md`

Update sprint-status.yaml:
```yaml
modules:
  {module-name}:
    complexity: SIMPLE|STANDARD|COMPLEX
    score_breakdown:
      entity_count: 0|1|2
      business_rules: 0|1|2
      ai_involvement: 0|1|2
      data_volume: 0|1|2
      dependency_count: 0|1|2
      event_complexity: 0|1|2
      external_integrations: 0|1|2
      compliance_requirements: 0|1|2
    total_score: N
    upgrade_applied: true|false
```

**Quality gate:** Classification documented, sprint-status.yaml updated, recommendations aligned with classification.
