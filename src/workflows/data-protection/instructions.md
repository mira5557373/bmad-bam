# Data Protection - Instructions

## Purpose

Verify data protection controls for multi-tenant AI platforms including encryption at rest and in transit, tenant data isolation, PII protection, and privacy controls. Supports Quality Gate QG-DR1 (Data Residency Gate).

## Mode Detection

| Condition | Mode | Entry Point |
|-----------|------|-------------|
| No existing artifact | Create | `step-01-c-*` |
| Existing artifact needs update | Edit | `step-10-e-*` |
| Validation requested | Validate | `step-20-v-*` |

## Execution Flow

### Create Mode
1. Audit encryption controls
2. Verify tenant data isolation
3. Test PII protection
4. Validate data lifecycle
5. Generate protection report
6. Output artifact to `{output_folder}/planning-artifacts/`

### Edit Mode
1. Review data handling changes
2. Update protection mappings
3. Regenerate affected sections

### Validate Mode
1. Run encryption tests
2. Verify isolation controls
3. Test privacy mechanisms
4. Generate validation report

## Quality Gates

- Reference: `qg-security-continuous.md`
- Required for QG-DR1 (Data Residency Gate) passage

## Recovery Protocol

If QG-DR1 fails:
1. **Identify Gap:** Review findings for specific failures
2. **Implement Control:** Add missing data protection controls
3. **Re-verify:** Run data protection verification again

## Related Workflows

- `bmad-bam-data-encryption-design` - Encryption design patterns
- `bmad-bam-tenant-model-isolation` - Tenant isolation patterns
- `bmad-bam-pii-detection-redaction` - PII detection workflows
- `bmad-bam-data-retention-policy-design` - Data lifecycle management
