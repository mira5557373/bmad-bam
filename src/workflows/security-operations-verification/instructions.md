# Security Operations Verification - Instructions

## Purpose

Verify security operations readiness for multi-tenant AI platforms including incident response capabilities, security monitoring, threat detection, and security control effectiveness. Supports Quality Gate QG-S4 (Security Gate).

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Audit security monitoring
2. Test incident response
3. Verify threat detection
4. Assess security controls
5. Generate verification report
6. Output artifact to `{output_folder}/security/`

### Edit Mode
1. Review security changes
2. Update affected sections
3. Regenerate report

### Validate Mode
1. Run security checks
2. Execute incident drill
3. Verify detection capabilities
4. Generate validation report

## Quality Gates

- Reference: `qg-security-continuous.md`
- Required for QG-S4 (Security Gate) passage

## Recovery Protocol

If QG-S4 fails for security operations:
1. **Identify Gap:** Review specific security operation failures
2. **Implement Control:** Add missing security capabilities
3. **Re-verify:** Run security operations verification again

## Related Workflows

- `bmad-bam-security-incident-response` - Incident response procedures
- `bmad-bam-security-audit-execution` - Security audit process
- `bmad-bam-continuous-security-setup` - Continuous security monitoring
- `bmad-bam-threat-modeling` - Threat modeling context
