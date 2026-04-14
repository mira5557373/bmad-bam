# How to Troubleshoot Errors

This guide covers common error resolution for BAM, including test failures, pattern loading errors, extension issues, and diagnostic commands.

## Prerequisites

- BAM module installed
- Access to terminal for running diagnostic commands
- Familiarity with BAM directory structure
- Node.js >= 20.0.0

## Overview

BAM errors fall into several categories:

| Category | Common Causes | Resolution Approach |
|----------|---------------|---------------------|
| Test failures | Schema violations, missing files | Run tests, fix structure |
| Pattern loading | Invalid paths, malformed CSV | Verify paths and format |
| Extension issues | YAML syntax, WDS violations | Check extension format |
| Workflow errors | Missing steps, mode confusion | Verify CEV structure |
| Quality gate failures | Incomplete checklists | Run recovery protocols |

## Diagnostic Commands

### Run All Tests

```bash
npm test
```

This runs all 169+ BAM tests covering:
- Schema validation
- Extension compliance
- Workflow structure
- Installation compatibility
- Integration tests

### Run Specific Test Files

```bash
# Schema tests only
npm test -- test/schema.test.js

# Extension tests only
npm test -- test/extension.test.js

# Workflow tests only
npm test -- test/workflow.test.js

# Installation tests only
npm test -- test/install.test.js

# Integration tests only
npm test -- test/integration.test.js
```

### Verbose Output

```bash
npm test -- --verbose
```

### Watch Mode for Development

```bash
npm test -- --watch
```

## Test Failures

### Schema Validation Errors

**Symptom:**
```
FAIL test/schema.test.js
  Extension YAML validation
    x analyst-bam.yaml should have valid schema
```

**Cause:** Extension YAML file has invalid structure.

**Resolution:**

1. Check the extension file:
   ```bash
   cat src/extensions/analyst-bam.yaml
   ```

2. Verify required fields:
   ```yaml
   agent:
     metadata:
       extends: 'bmad-agent-analyst'  # REQUIRED
       module: 'bam'                   # REQUIRED
   
   menu:
     - trigger: bam-analyst-context
       action: "#load-analyst-context-prompt"
       description: Load BAM analyst context
   
   prompts:
     - id: load-analyst-context-prompt
       content: |
         Load context...
   ```

3. Remove invalid fields:
   ```yaml
   # WRONG - memories field not allowed
   memories:
     - "Some context"
   
   # CORRECT - no memories field
   ```

### Missing File Errors

**Symptom:**
```
FAIL test/workflow.test.js
  Workflow completeness
    x create-master-architecture should have bmad-skill-manifest.yaml
```

**Cause:** Required workflow file missing.

**Resolution:**

1. Check workflow directory:
   ```bash
   ls -la src/workflows/foundation/create-master-architecture/
   ```

2. Create missing files:
   ```bash
   touch src/workflows/foundation/create-master-architecture/bmad-skill-manifest.yaml
   ```

3. Add required content (see `add-workflow.md` guide).

### Step File Naming Errors

**Symptom:**
```
FAIL test/workflow.test.js
  Step naming convention
    x step files should match step-NN-mode-description pattern
```

**Cause:** Step files not following naming convention.

**Resolution:**

1. Check step file names:
   ```bash
   ls src/workflows/foundation/create-master-architecture/steps/
   ```

2. Rename to correct format:
   ```bash
   # WRONG
   step1-create.md
   create-step-01.md
   
   # CORRECT
   step-01-c-define-scope.md
   step-02-c-select-tenant-model.md
   step-10-e-load-existing.md
   step-20-v-validate-artifact.md
   ```

3. Follow numbering convention:
   - Create: 01-09 (or 01-10)
   - Edit: 10-19
   - Validate: 20-29

## Pattern Loading Errors

### Invalid Path References

**Symptom:**
```
Pattern file not found: /project/_bmad/bam/data/bam-patterns.csv
```

**Cause:** Incorrect path placeholder or file missing.

**Resolution:**

1. Verify path uses placeholder:
   ```markdown
   # WRONG
   Load: /project/_bmad/bam/data/bam-patterns.csv
   
   # CORRECT
   **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`
   ```

2. Check file exists:
   ```bash
   ls src/data/bam-patterns.csv
   ```

3. Verify installation:
   ```bash
   ls {project-root}/_bmad/bam/data/
   ```

### Malformed CSV Errors

**Symptom:**
```
CSV parse error: Unexpected number of columns at row 5
```

**Cause:** CSV has inconsistent column count or quoting issues.

**Resolution:**

1. Validate CSV structure:
   ```bash
   head -5 src/data/bam-patterns.csv
   ```

2. Check column count:
   ```bash
   awk -F',' '{print NF}' src/data/bam-patterns.csv | sort -u
   ```
   All rows should have the same column count.

3. Fix quoting issues:
   ```csv
   # WRONG - unescaped comma in field
   pattern-1,Description with, comma,category
   
   # CORRECT - quoted field
   pattern-1,"Description with, comma",category
   ```

4. Check for special characters:
   ```csv
   # WRONG - unescaped quotes
   pattern-1,Use "best" practices,category
   
   # CORRECT - escaped quotes
   pattern-1,"Use ""best"" practices",category
   ```

### Missing Pattern ID

**Symptom:**
```
Pattern not found: tenant-hybrid (filtered from bam-patterns.csv)
```

**Cause:** Step file references a pattern ID that does not exist.

**Resolution:**

1. List available patterns:
   ```bash
   cut -d',' -f1 src/data/bam-patterns.csv | tail -n +2
   ```

2. Update step file to use valid pattern ID.

3. Or add the missing pattern to the CSV.

## Extension Issues

### WDS Pattern Violations

**Symptom:**
```
FAIL test/extension.test.js
  WDS pattern compliance
    x analyst-bam.yaml should not have memories field
```

**Cause:** Extension uses deprecated or invalid fields.

**Resolution:**

1. Remove prohibited fields:
   ```yaml
   # REMOVE these fields
   memories:
     - "..."
   capabilities:
     - "..."
   ```

2. Use prompts for context loading:
   ```yaml
   prompts:
     - id: load-context-prompt
       content: |
         Read and internalize the BAM guide:
         `{project-root}/_bmad/bam/data/agent-guides/bam/{guide}.md`
   ```

### Missing Menu Items

**Symptom:**
```
FAIL test/extension.test.js
  Extension completeness
    x analyst-bam.yaml should have context loader menu item
```

**Cause:** Extension missing required menu structure.

**Resolution:**

1. Add context loader:
   ```yaml
   menu:
     - trigger: bam-analyst-context
       action: "#load-analyst-context-prompt"
       description: Load BAM analyst context
   ```

2. Add corresponding prompt:
   ```yaml
   prompts:
     - id: load-analyst-context-prompt
       content: |
         Load context...
   ```

### Prompt Reference Errors

**Symptom:**
```
FAIL test/extension.test.js
  Prompt references
    x menu action "#foo-prompt" has no matching prompt id
```

**Cause:** Menu action references non-existent prompt.

**Resolution:**

1. Check menu action:
   ```yaml
   menu:
     - trigger: foo
       action: "#foo-prompt"  # Must match a prompt id
   ```

2. Add matching prompt:
   ```yaml
   prompts:
     - id: foo-prompt  # Must match action reference
       content: |
         ...
   ```

## Workflow Errors

### Missing CEV Modes

**Symptom:**
```
FAIL test/workflow.test.js
  CEV completeness
    x create-master-architecture should have Create, Edit, and Validate steps
```

**Cause:** Workflow missing steps for one or more modes.

**Resolution:**

1. Check existing steps:
   ```bash
   ls src/workflows/foundation/create-master-architecture/steps/
   ```

2. Add missing mode steps:
   ```bash
   # Create mode (01-09)
   touch src/workflows/foundation/create-master-architecture/steps/step-01-c-first.md
   
   # Edit mode (10-19)
   touch src/workflows/foundation/create-master-architecture/steps/step-10-e-load.md
   
   # Validate mode (20-29)
   touch src/workflows/foundation/create-master-architecture/steps/step-20-v-check.md
   ```

### Mode Router Missing

**Symptom:**
```
FAIL test/workflow.test.js
  Workflow structure
    x create-master-architecture should have workflow.md
```

**Cause:** Missing workflow.md mode router file.

**Resolution:**

1. Create workflow.md:
   ```bash
   touch src/workflows/foundation/create-master-architecture/workflow.md
   ```

2. Add mode routing content:
   ```markdown
   # Create Master Architecture
   
   ## Mode Selection
   
   | Mode | Description | Step Files |
   |------|-------------|------------|
   | **Create** | Generate new architecture | `step-01-c-*` through `step-09-c-*` |
   | **Edit** | Modify existing | `step-10-e-*` through `step-19-e-*` |
   | **Validate** | Check criteria | `step-20-v-*` through `step-29-v-*` |
   
   Default: **Create** mode unless artifact exists.
   ```

### module-help.csv Entry Missing

**Symptom:**
```
FAIL test/workflow.test.js
  Help integration
    x create-master-architecture should have module-help.csv entry
```

**Cause:** Workflow not registered in help system.

**Resolution:**

1. Add row to module-help.csv:
   ```csv
   bam,bmad-bam-create-master-architecture,Create Master Architecture,CMAR,Create frozen master architecture,run,,3-solutioning,,,true,{output_folder}/planning-artifacts,master-architecture.md,"architecture,design"
   ```

2. Verify all 14 columns present.

## Quality Gate Failures

### Gate Checklist Incomplete

**Symptom:**
```
Gate QG-F1 FAIL: 3 CRITICAL items not checked
```

**Cause:** Required checklist items not completed.

**Resolution:**

1. Load the checklist:
   ```bash
   cat src/checklists/foundation-gate.md
   ```

2. Identify CRITICAL items:
   ```markdown
   - [ ] **CRITICAL:** Item that must pass
   ```

3. Complete the required items or enter recovery.

### Recovery Protocol

When a gate fails:

1. **Attempt 1:** Fix issues, re-run validation
2. **Attempt 2:** Fix remaining issues, re-run
3. **Escalate:** If still failing, trigger mandatory course correction

See [recover-from-gate-failure.md](recover-from-gate-failure.md) for detailed recovery procedures.

## Installation Errors

### Dependency Issues

**Symptom:**
```
Error: Required module 'core' not installed
```

**Cause:** BAM requires core module but it is missing.

**Resolution:**

1. Install required modules:
   ```bash
   npx bmad-method install
   ```

2. Select core + bam:
   ```
   [x] core (required)
   [x] bam
   ```

### Node.js Version

**Symptom:**
```
Error: Node.js version 18.x not supported
```

**Cause:** BAM requires Node.js >= 20.0.0.

**Resolution:**

1. Check version:
   ```bash
   node --version
   ```

2. Upgrade if needed:
   ```bash
   # Using nvm
   nvm install 20
   nvm use 20
   ```

### Directory Creation Failures

**Symptom:**
```
Error: Cannot create directory {output_folder}/planning-artifacts
```

**Cause:** Permission issues or invalid path.

**Resolution:**

1. Check permissions:
   ```bash
   ls -la {output_folder}
   ```

2. Create directories manually:
   ```bash
   mkdir -p {output_folder}/planning-artifacts
   mkdir -p {output_folder}/implementation-artifacts
   mkdir -p {output_folder}/architecture-docs
   ```

## Common Error Patterns

### Error: "memories field not allowed"

**Fix:** Remove `memories:` from extension YAML.

### Error: "Step file contains code"

**Fix:** Remove code blocks from step files. Reference pattern registry instead.

### Error: "Missing web search directive in Create step"

**Fix:** Add web search directives:
```markdown
**Verify current best practices with web search:**
Search the web: "{topic} best practices {date}"
```

### Error: "Hardcoded year in web search"

**Fix:** Use `{date}` placeholder:
```markdown
# WRONG
Search the web: "PostgreSQL RLS 2024"

# CORRECT
Search the web: "PostgreSQL RLS {date}"
```

### Error: "Missing CRITICAL marker format"

**Fix:** Use correct format:
```markdown
# WRONG
- [ ] CRITICAL: Important item

# CORRECT
- [ ] **CRITICAL:** Important item
```

## Quick Diagnostic Checklist

When encountering errors, check these in order:

1. [ ] Run `npm test` and note specific failures
2. [ ] Check file exists at referenced path
3. [ ] Verify YAML syntax is valid
4. [ ] Check CSV has consistent columns
5. [ ] Verify step file naming convention
6. [ ] Confirm required fields present
7. [ ] Check for prohibited fields (memories, etc.)
8. [ ] Verify module-help.csv entry exists

## Getting Help

If errors persist:

1. Check CLAUDE.md for reference documentation
2. Review existing working files as templates
3. Run tests in verbose mode for detailed output
4. Check test file source for exact validation logic

## Related

- [Run Quality Gate](run-quality-gate.md) - Gate execution
- [Recover from Gate Failure](recover-from-gate-failure.md) - Recovery procedures
- [Add Workflow](add-workflow.md) - Workflow structure requirements
- [Add Extension](add-extension.md) - Extension format requirements
- [Test Module](test-module.md) - Testing strategies
- [CLAUDE.md](../../CLAUDE.md) - Full reference documentation
