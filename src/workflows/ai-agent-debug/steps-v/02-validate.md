# Step 2: Validate Debug Report

## Validation Checklist

### Execution Context
- [ ] Agent type and ID documented
- [ ] Tenant context specified
- [ ] Time window and trace ID provided
- [ ] System prompt and tool configuration captured
- [ ] Memory tier state documented

### State History Analysis
- [ ] Execution trace parsed completely
- [ ] State transitions mapped
- [ ] Tool calls and results documented
- [ ] Memory operations tracked
- [ ] Anomalies identified and flagged

### Failure Identification
- [ ] Failure point clearly identified
- [ ] Failure type classified correctly
- [ ] Root cause distinguished from symptoms
- [ ] Severity and scope assessed
- [ ] Evidence from logs provided

### Recommendations
- [ ] Fix recommendations specific to failure type
- [ ] Recommendations are actionable
- [ ] Priority order established
- [ ] Impact of each fix estimated

### Cross-Cutting
- [ ] Report is reproducible (another engineer could verify)
- [ ] Tenant isolation not compromised during debug
- [ ] No sensitive data exposed in report

## Gate Decision

- **PASS**: All sections complete, root cause identified, actionable recommendations provided
- **CONDITIONAL**: Root cause uncertain but reasonable hypotheses documented
- **FAIL**: Missing execution context, no failure identified, or recommendations not actionable

Present validation results with specific findings for each section.
