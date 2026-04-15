# Runbook Creation - Instructions

## Purpose

Create comprehensive operational runbooks for multi-tenant AI platforms covering incident response, routine operations, AI-specific procedures, and emergency protocols. Supports Quality Gate QG-OC (Operational Checklist Gate).

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Assess operational needs
2. Create incident runbooks
3. Create AI operations runbooks
4. Create routine operations runbooks
5. Generate runbook collection
6. Output artifact to `{output_folder}/planning-artifacts/`

### Edit Mode
1. Review operational changes
2. Update affected runbooks
3. Regenerate collection

### Validate Mode
1. Audit runbook coverage
2. Test critical procedures
3. Verify accessibility
4. Generate validation report

## Quality Gates

- Reference: `qg-operations-continuous.md`
- Required for QG-OC (Operational Checklist Gate) passage

## Recovery Protocol

If QG-OC fails for runbooks:
1. **Identify Gap:** Review coverage audit
2. **Create Runbook:** Document missing procedure
3. **Test:** Validate runbook with dry-run

## Related Workflows

- `bmad-bam-runbook-automation` - Automated runbook execution
- `bmad-bam-incident-response-operations` - Incident response procedures
- `bmad-bam-on-call-rotation` - On-call scheduling
- `bmad-bam-postmortem-process` - Post-incident documentation
