# Tenant Safety - Instructions

## Purpose

Verify tenant safety controls and isolation mechanisms for multi-tenant AI platforms, ensuring complete data separation, resource isolation, and cross-tenant security. Supports Quality Gate QG-AI2 (AI Safety Gate).

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Audit data isolation
2. Test resource boundaries
3. Verify AI context separation
4. Test cross-tenant attacks
5. Generate safety report
6. Output artifact to `{output_folder}/quality-gates/`

### Edit Mode
1. Review isolation changes
2. Update affected sections
3. Regenerate report

### Validate Mode
1. Run isolation tests
2. Execute cross-tenant tests
3. Verify resource limits
4. Generate validation report

## Quality Gates

- Reference: `qg-i2-tenant-safety.md`
- Required for QG-AI2 (AI Safety Gate) passage

## Recovery Protocol

If QG-AI2 fails for tenant safety:
1. **Identify Gap:** Review specific isolation failures
2. **Implement Control:** Add missing isolation layer
3. **Re-verify:** Run tenant safety verification again

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Tenant isolation patterns
- `bmad-bam-agent-safety` - Agent safety validation
- `bmad-bam-ai-security-testing` - Security testing for AI
- `bmad-bam-tenant-network-isolation-design` - Network isolation design
