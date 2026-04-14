# BAM Troubleshooting Guide

This guide provides solutions for common issues encountered when using the BAM extension module.

---

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Workflow Execution Errors](#workflow-execution-errors)
3. [Pattern Resolution Failures](#pattern-resolution-failures)
4. [Extension Loading Problems](#extension-loading-problems)
5. [Test Failures](#test-failures)
6. [Quality Gate Failures](#quality-gate-failures)
7. [Configuration Issues](#configuration-issues)
8. [Integration Problems](#integration-problems)

---

## Installation Issues

### Error: Module not found during install

**Symptom:**
```
Error: Cannot find module 'bmad-bam'
npm ERR! code ENOENT
```

**Cause:** The BAM package is not available in the npm registry or local path.

**Solution:**
1. Verify Node.js version (requires >=20.0.0):
   ```bash
   node --version
   ```
2. Clear npm cache and reinstall:
   ```bash
   npm cache clean --force
   npx bmad-method install
   ```
3. If using local development, ensure package.json is valid:
   ```bash
   npm pack --dry-run
   ```

---

### Error: Missing peer dependencies

**Symptom:**
```
WARN peer dependency bmad-method@>=1.0.0 required
WARN peer dependency bmad-bmm@>=1.0.0 recommended
```

**Cause:** BAM requires the BMAD Method core and works best with BMM.

**Solution:**
1. Install BMAD Method first:
   ```bash
   npm install -g bmad-method
   ```
2. For full functionality, install recommended modules:
   ```bash
   npx bmad-method install  # Select BMM, BAM together
   ```

---

### Error: Permission denied during install

**Symptom:**
```
Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Cause:** Insufficient permissions for global npm installation.

**Solution:**
1. Use npm prefix configuration:
   ```bash
   npm config set prefix ~/.npm-global
   export PATH=~/.npm-global/bin:$PATH
   ```
2. Or use npx without global install:
   ```bash
   npx bmad-method install
   ```

---

### Error: Invalid module.yaml configuration

**Symptom:**
```
Error: Invalid module configuration
Expected 'module' field in module.yaml
```

**Cause:** The module.yaml file is missing or malformed.

**Solution:**
1. Verify module.yaml exists in `src/workflows/module.yaml`
2. Check YAML syntax:
   ```bash
   npm run lint
   ```
3. Ensure required fields are present:
   ```yaml
   module:
     name: bam
     displayName: BAM - Multi-Tenant Agentic AI SaaS
     version: 1.0.0
   ```

---

## Workflow Execution Errors

### Error: Workflow not found

**Symptom:**
```
Error: Unknown workflow 'bmad-bam-create-master-architecture'
Workflow not found in module registry
```

**Cause:** The workflow is not registered in module-help.csv or manifest is missing.

**Solution:**
1. Verify workflow exists in `src/workflows/` directory
2. Check bmad-skill-manifest.yaml is present:
   ```bash
   ls src/workflows/foundation/create-master-architecture/
   ```
3. Ensure workflow is in module-help.csv with correct skill name
4. Reload the agent context:
   ```
   /atlas
   > bam-platform-context
   ```

---

### Error: Missing prerequisite workflow

**Symptom:**
```
Error: Prerequisite not met
QG-F1 (Foundation Gate) must pass before running module workflows
```

**Cause:** Attempting to run a workflow before completing required prerequisites.

**Solution:**
1. Check workflow dependencies in module-help.csv `after` column
2. Run prerequisite workflows first:
   ```
   /atlas
   > CMAR  # Create Master Architecture
   > VF    # Validate Foundation (QG-F1)
   ```
3. Then proceed with module workflows

---

### Error: Step file not found

**Symptom:**
```
Error: Cannot load step file
File not found: steps/step-01-c-initialize.md
```

**Cause:** Step file is missing or incorrectly named.

**Solution:**
1. Verify step naming follows convention: `step-NN-mode-description.md`
2. Check file exists:
   ```bash
   ls src/workflows/{workflow}/steps/
   ```
3. Ensure mode suffix is correct:
   - Create mode: `step-01-c-*` through `step-09-c-*`
   - Edit mode: `step-10-e-*` through `step-19-e-*`
   - Validate mode: `step-20-v-*` through `step-29-v-*`

---

### Error: Template resolution failed

**Symptom:**
```
Error: Template not found
Cannot resolve: {project-root}/_bmad/bam/templates/master-architecture-template.md
```

**Cause:** Template path placeholder not resolved or template missing.

**Solution:**
1. Verify template exists in `src/templates/`
2. Check `{project-root}` is properly configured
3. Run install to copy templates:
   ```bash
   npx bmad-method install
   ```

---

## Pattern Resolution Failures

### Error: Pattern not found in registry

**Symptom:**
```
Error: Pattern 'tenant-rls' not found
No matching row in bam-patterns.csv
```

**Cause:** Pattern ID does not exist in the pattern registry CSV.

**Solution:**
1. Check available patterns:
   ```bash
   cat src/data/bam-patterns.csv | head -20
   ```
2. Verify pattern_id column for exact match
3. Use correct filter syntax in step files:
   ```markdown
   **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
   ```

---

### Error: Invalid CSV format

**Symptom:**
```
Error: CSV parse error at line 15
Unexpected field count
```

**Cause:** CSV file has formatting issues (extra commas, unquoted fields).

**Solution:**
1. Validate CSV format:
   ```bash
   npm test -- test/schema.test.js
   ```
2. Check for:
   - Proper quoting of fields containing commas
   - Consistent column count across all rows
   - No trailing commas

---

### Error: Web search query failed

**Symptom:**
```
Warning: Web search unavailable
Proceeding with pattern registry data only
```

**Cause:** Web search feature is unavailable or `{date}` placeholder not resolved.

**Solution:**
1. This is a warning, not an error - workflow continues
2. Verify `{date}` placeholder in web_queries column:
   ```csv
   "PostgreSQL RLS best practices {date}"
   ```
3. Pattern registry data is used as fallback

---

## Extension Loading Problems

### Error: Extension target not found

**Symptom:**
```
Error: Cannot extend agent 'bmad-agent-analyst'
Base agent not installed
```

**Cause:** The extension references a base agent that is not available.

**Solution:**
1. Install the base module first:
   ```bash
   npx bmad-method install  # Select BMM
   ```
2. Verify extension configuration in YAML:
   ```yaml
   agent:
     metadata:
       extends: 'bmad-agent-analyst'
       module: 'bam'
   ```

---

### Error: Invalid extension format

**Symptom:**
```
Error: Extension validation failed
Field 'memories' is not allowed in extension files
```

**Cause:** Extension uses deprecated or non-standard fields.

**Solution:**
1. Remove `memories:` field from extension YAML
2. Use agent-guides pattern instead:
   ```yaml
   prompts:
     - id: load-domain-context-prompt
       content: |
         Read and internalize the BAM guide:
         `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
   ```

---

### Error: Context loader not found

**Symptom:**
```
Error: Menu item 'bam-platform-context' has no corresponding prompt
```

**Cause:** Extension menu item references a non-existent prompt ID.

**Solution:**
1. Verify prompt ID matches menu action:
   ```yaml
   menu:
     - trigger: bam-platform-context
       action: "#load-platform-context-prompt"  # Must match
   
   prompts:
     - id: load-platform-context-prompt  # This ID
       content: |
         ...
   ```

---

### Error: Agent guide not found

**Symptom:**
```
Error: Cannot read agent guide
File not found: data/agent-guides/bam/platform-architecture.md
```

**Cause:** Agent guide file is missing or path is incorrect.

**Solution:**
1. Verify guide exists:
   ```bash
   ls src/data/agent-guides/bam/
   ```
2. Check prompt references correct path:
   ```yaml
   content: |
     Read: `{project-root}/_bmad/bam/data/agent-guides/bam/platform-architecture.md`
   ```

---

## Test Failures

### Error: Schema validation test failed

**Symptom:**
```
FAIL test/schema.test.js
  - Extension YAML should not contain memories field
```

**Cause:** Extension file contains non-standard fields.

**Solution:**
1. Remove deprecated fields from extension YAML
2. Follow WDS pattern for context injection
3. Run tests to verify:
   ```bash
   npm test -- test/schema.test.js
   ```

---

### Error: Workflow structure test failed

**Symptom:**
```
FAIL test/workflow.test.js
  - Workflow should have SKILL.md
  - Workflow should have bmad-skill-manifest.yaml
```

**Cause:** Workflow directory is missing required files.

**Solution:**
1. Ensure workflow has all required files:
   ```
   src/workflows/{name}/
   ├── bmad-skill-manifest.yaml  # Required
   ├── SKILL.md                  # Required
   ├── workflow.md               # Required
   └── steps/                    # Required directory
   ```
2. Run workflow test:
   ```bash
   npm test -- test/workflow.test.js
   ```

---

### Error: Integration test failed

**Symptom:**
```
FAIL test/integration.test.js
  - BAM should extend BMM agents correctly
```

**Cause:** Extension configuration is incompatible with base module.

**Solution:**
1. Verify base agent names are correct
2. Check extension metadata:
   ```yaml
   agent:
     metadata:
       extends: 'bmad-agent-{correct-name}'
   ```
3. Ensure module compatibility:
   - BMM >= 1.0.0
   - TEA >= 1.0.0 (if using)
   - WDS >= 1.0.0 (if using)

---

### Error: Jest configuration error

**Symptom:**
```
Error: Cannot find module 'jest'
```

**Cause:** Development dependencies not installed.

**Solution:**
1. Install dev dependencies:
   ```bash
   npm install
   ```
2. Run tests:
   ```bash
   npm test
   ```

---

## Quality Gate Failures

### Error: QG-F1 (Foundation Gate) failed

**Symptom:**
```
FAIL: QG-F1 Foundation Gate
- [ ] Master architecture document missing
- [ ] Tenant model not defined
```

**Cause:** Foundation artifacts are incomplete.

**Solution:**
1. Run create-master-architecture workflow:
   ```
   /atlas
   > CMAR
   ```
2. Ensure all required sections are complete
3. Validate again:
   ```
   /atlas
   > VF
   ```

---

### Error: QG-M2 (Tenant Isolation) failed

**Symptom:**
```
FAIL: QG-M2 Tenant Isolation
- [ ] CRITICAL: RLS policies missing
- [ ] CRITICAL: FORCE RLS not enabled
```

**Cause:** Tenant isolation implementation is incomplete.

**Solution:**
1. Implement missing RLS policies
2. Enable FORCE RLS on all tenant tables:
   ```sql
   ALTER TABLE {table} FORCE ROW LEVEL SECURITY;
   ```
3. Verify cache isolation is tenant-prefixed
4. Re-run validation

---

### Error: QG-I3 (Agent Safety) failed

**Symptom:**
```
FAIL: QG-I3 Agent Safety
- [ ] CRITICAL: Prompt injection test failed
- [ ] Kill switch non-functional
```

**Cause:** AI agent safety measures are insufficient.

**Solution:**
1. Review agent tool permissions
2. Implement prompt injection defenses
3. Verify kill switch functionality
4. Run ai-eval-safety-design workflow

---

## Configuration Issues

### Error: Invalid tenant_model selection

**Symptom:**
```
Error: Invalid configuration
tenant_model 'custom' is not a valid option
```

**Cause:** Configuration value is not in allowed list.

**Solution:**
1. Use valid tenant model values:
   - `row-level-security`
   - `schema-per-tenant`
   - `database-per-tenant`
2. Update configuration during install or in module.yaml

---

### Error: Invalid ai_runtime selection

**Symptom:**
```
Error: Unknown AI runtime 'pytorch'
Valid options: langgraph, crewai, autogen, dspy, instructor, custom
```

**Cause:** Selected AI runtime is not supported.

**Solution:**
1. Choose from supported runtimes:
   - `langgraph` (recommended)
   - `crewai`
   - `autogen`
   - `dspy`
   - `instructor`
   - `custom`

---

## Integration Problems

### Error: Cross-module facade mismatch

**Symptom:**
```
Error: Facade contract mismatch
Expected: ProjectFacade.createProject(CreateProjectCommand)
Actual: ProjectFacade.create(ProjectInput)
```

**Cause:** Facade contract has changed without proper versioning.

**Solution:**
1. Run facade-mismatch-recovery workflow:
   ```
   /kai
   > FMR
   ```
2. Version the facade contract properly
3. Update consuming modules
4. Run convergence-verification

---

### Error: Event schema incompatibility

**Symptom:**
```
Error: Cannot deserialize event
Unknown field 'tenantData' in ProjectCreatedEvent
```

**Cause:** Event schema has changed without backward compatibility.

**Solution:**
1. Check event versioning
2. Add backward-compatible fields
3. Use optional fields for new properties
4. Run QG-I1 convergence verification

---

## Getting Help

If you cannot resolve an issue using this guide:

1. **Check documentation:**
   - [Getting Started](tutorials/getting-started.md)
   - [Reference Documentation](reference/)

2. **Run diagnostics:**
   ```bash
   npm test
   npm run validate-tsa
   ```

3. **Review CLAUDE.md:**
   The CLAUDE.md file contains comprehensive implementation details.

4. **Community support:**
   - Open an issue on GitHub
   - Include error messages, Node.js version, and steps to reproduce

---

## Related Documentation

- [Getting Started](tutorials/getting-started.md) - Initial setup guide
- [Quality Gates Reference](reference/quality-gates.md) - Gate requirements
- [Migration Guide](migration-guide.md) - Version upgrade paths
- [Changelog](changelog.md) - Version history
