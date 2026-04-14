# Compliance Verification - Instructions

## Purpose

Verify that multi-tenant AI platforms comply with regulatory frameworks including SOC2, GDPR, HIPAA, and industry-specific requirements. Supports Quality Gate QG-CP1 (Compliance Policy Gate).

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Assess compliance requirements
2. Audit data handling practices
3. Verify access controls
4. Test audit logging
5. Generate compliance report
6. Output artifact to `{output_folder}/planning-artifacts/`

### Edit Mode
1. Review changes against compliance baseline
2. Update compliance mappings
3. Regenerate affected sections

### Validate Mode
1. Run compliance checks
2. Verify control implementations
3. Test audit capabilities
4. Generate validation report

## Quality Gates

- Reference: `qg-compliance-continuous.md`
- Required for QG-CP1 (Compliance Policy Gate) passage

## Recovery Protocol

If QG-CP1 fails:
1. **Identify Gap:** Review compliance findings for specific failures
2. **Implement Control:** Add missing compliance controls
3. **Re-verify:** Run compliance verification again

## Related Workflows

- `bmad-bam-compliance-design` - Compliance architecture design
- `bmad-bam-compliance-continuous-verification` - Ongoing compliance monitoring
- `bmad-bam-soc2-evidence-collection` - SOC2 evidence gathering
- `bmad-bam-gdpr-consent-management` - GDPR consent workflows
- `bmad-bam-hipaa-compliance-design` - HIPAA compliance design
