# BAM Version Compatibility Matrix

> Reference document for BAM module version compatibility with BMAD ecosystem modules.

## Version Matrix

| BAM Version | BMM | TEA | WDS | CIS | Node.js | Notes |
|-------------|-----|-----|-----|-----|---------|-------|
| 1.0.0 | >= 1.0.0 | >= 1.0.0 | >= 1.0.0 | >= 1.0.0 | >= 20.0.0 | Initial release |
| 1.1.0 | >= 1.0.0 | >= 1.0.0 | >= 1.0.0 | >= 1.0.0 | >= 20.0.0 | Added new workflows |
| 1.2.0 | >= 1.1.0 | >= 1.0.0 | >= 1.1.0 | >= 1.0.0 | >= 20.0.0 | Pattern registry enhancements |

## Module Dependencies

### Required Modules

| Module | Minimum Version | Purpose |
|--------|-----------------|---------|
| core | >= 1.0.0 | Base configuration, installer variables |
| BMM | >= 1.0.0 | Lifecycle phases, primary agents |

### Recommended Modules

| Module | Minimum Version | Purpose |
|--------|-----------------|---------|
| TEA | >= 1.0.0 | Risk-based testing, tenant isolation testing |
| WDS | >= 1.0.0 | Design-first discovery, UX workflows |
| CIS | >= 1.0.0 | Creativity workflows, innovation framing |

## Breaking Changes

### BAM 1.2.0

- **Pattern Registry Schema**: Added `web_queries` column to all CSV files
  - Migration: Add empty `web_queries` column to custom pattern CSVs
- **Step File Naming**: Enforced `step-NN-mode-description.md` convention
  - Migration: Rename step files to match pattern

### BAM 1.1.0

- **Extension Structure**: Removed support for `memories:` field
  - Migration: Convert memories to agent-guides pattern
- **Template Variables**: Standardized to `{{lowercase_variable}}` format
  - Migration: Update custom templates to use lowercase

### BAM 1.0.0

- Initial release - no breaking changes from prior versions

## Migration Notes

### Migrating from Pre-1.0 BAM

1. **Update Extension Files**
   - Remove any `memories:` fields
   - Add context loader prompts referencing agent-guides
   - Ensure `extends:` field points to valid base agent

2. **Update Step Files**
   - Rename to `step-NN-mode-description.md` format
   - Add MANDATORY EXECUTION RULES section after Purpose
   - Replace inline code with pattern registry references

3. **Update Templates**
   - Convert `{{VARIABLE}}` to `{{variable}}`
   - Add Web Research Queries section before Verification

### Migrating from BAM 1.0.x to 1.1.x

1. **Pattern Registry**
   - Add `web_queries` column to custom CSV files
   - Use `{date}` placeholder for dynamic queries

2. **Agent Guides**
   - Add `### Web Research` subsection to Related Patterns

### Cross-Module Upgrade Guidelines

| Upgrading | Also Upgrade | Reason |
|-----------|--------------|--------|
| BAM to 1.2.x | BMM to 1.1.x | New agent-guide references |
| BAM to 1.2.x | WDS to 1.1.x | Enhanced extension patterns |
| TEA to 1.1.x | BAM to 1.1.x | Shared quality gate definitions |

## Compatibility Verification

Run the following to verify compatibility:

```bash
npm test
```

All 169 tests should pass for a compatible installation.

## Quality Gate Compatibility

| Quality Gate | BAM Version | TEA Integration |
|--------------|-------------|-----------------|
| QG-F1 | >= 1.0.0 | Optional |
| QG-M1 | >= 1.0.0 | Optional |
| QG-M2 | >= 1.0.0 | Recommended |
| QG-M3 | >= 1.0.0 | Recommended |
| QG-I1 | >= 1.0.0 | Required |
| QG-I2 | >= 1.0.0 | Required |
| QG-I3 | >= 1.0.0 | Required |
| QG-P1 | >= 1.0.0 | Required |

## Workflow Compatibility

### New Workflows in BAM 1.2.0

| Workflow | Requires TEA | Requires WDS |
|----------|--------------|--------------|
| ai-security-testing | Yes | No |
| compliance-continuous-verification | Yes | No |
| tenant-data-anonymization | No | No |
| tenant-feature-rollout | No | No |
| tenant-sandbox-provisioning | No | No |
| tenant-sla-monitoring | No | No |

### Deprecated Workflows

None currently deprecated.

## Support Matrix

| BAM Version | Support Status | End of Support |
|-------------|----------------|----------------|
| 1.2.x | Active | TBD |
| 1.1.x | Maintenance | 2027-01-01 |
| 1.0.x | Maintenance | 2026-07-01 |
| < 1.0.0 | Unsupported | - |
