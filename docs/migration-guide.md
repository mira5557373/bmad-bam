# BAM Migration Guide

This guide provides instructions for upgrading between BAM versions, including breaking changes, deprecation notices, and migration steps.

---

## Table of Contents

1. [Version Compatibility Matrix](#version-compatibility-matrix)
2. [Migration from v0.x to v1.0](#migration-from-v0x-to-v10)
3. [Breaking Changes in v1.0](#breaking-changes-in-v10)
4. [Deprecation Notices](#deprecation-notices)
5. [Configuration Migration](#configuration-migration)
6. [Data Migration Considerations](#data-migration-considerations)
7. [Extension Migration](#extension-migration)
8. [Workflow Migration](#workflow-migration)
9. [Testing Your Migration](#testing-your-migration)

---

## Version Compatibility Matrix

| BAM Version | Node.js | BMAD Method | BMM | TEA | WDS | CIS |
|-------------|---------|-------------|-----|-----|-----|-----|
| 1.0.0       | >=20.0.0| >=1.0.0     | >=1.0.0 | >=1.0.0 | >=1.0.0 | >=1.0.0 |
| 0.9.x       | >=18.0.0| >=0.9.0     | >=0.9.0 | >=0.9.0 | >=0.9.0 | >=0.9.0 |
| 0.8.x       | >=18.0.0| >=0.8.0     | >=0.8.0 | N/A | N/A | N/A |

---

## Migration from v0.x to v1.0

### Overview

The v1.0 release represents the first stable version of BAM with significant architectural changes from the pre-release versions. This section covers all changes needed when upgrading from any 0.x version.

### Prerequisites

Before starting migration:

1. **Backup your project:**
   ```bash
   git commit -am "Pre-migration backup"
   git tag "pre-bam-1.0-migration"
   ```

2. **Update Node.js:**
   ```bash
   node --version  # Must be >= 20.0.0
   ```

3. **Update BMAD Method:**
   ```bash
   npm install -g bmad-method@latest
   ```

### Migration Steps

#### Step 1: Update BAM Module

```bash
# Remove old installation
rm -rf _bmad/bam

# Install v1.0
npx bmad-method install
# Select BAM when prompted
```

#### Step 2: Migrate Extension Files

If you have custom extensions, update them to the new format.

**Old format (v0.x):**
```yaml
# DEPRECATED
agent:
  name: custom-extension
  memories:
    - "Context to inject"
    - "Another memory"
  capabilities:
    - analyze
    - design
```

**New format (v1.0):**
```yaml
agent:
  metadata:
    extends: 'bmad-agent-architect'
    module: 'bam'
    description: 'Custom extension description'

menu:
  - trigger: custom-context
    action: "#load-custom-context-prompt"
    description: Load custom context

prompts:
  - id: load-custom-context-prompt
    content: |
      Read and internalize the guide:
      `{project-root}/_bmad/bam/data/agent-guides/bam/custom.md`
```

#### Step 3: Migrate Workflow Structure

Workflows now use unified `steps/` directory with mode suffixes.

**Old structure (v0.x):**
```
workflows/my-workflow/
├── manifest.yaml
├── steps-create/
│   ├── step-1.md
│   └── step-2.md
├── steps-edit/
│   └── step-1.md
└── steps-validate/
    └── step-1.md
```

**New structure (v1.0):**
```
workflows/my-workflow/
├── bmad-skill-manifest.yaml
├── SKILL.md
├── workflow.md
└── steps/
    ├── step-01-c-first-action.md
    ├── step-02-c-second-action.md
    ├── step-10-e-load-existing.md
    ├── step-11-e-apply-changes.md
    ├── step-20-v-load-artifact.md
    ├── step-21-v-validate.md
    └── step-22-v-generate-report.md
```

#### Step 4: Update Pattern References

Step files now reference the pattern registry CSV instead of static knowledge fragments.

**Old pattern (v0.x):**
```markdown
## Context

See: `knowledge/multi-tenant-patterns.md` for tenant isolation guidance.
```

**New pattern (v1.0):**
```markdown
## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
```

#### Step 5: Migrate Templates

Templates remain in `src/data/templates/` but naming conventions have changed.

**Old naming (v0.x):**
```
templates/
├── architecture/
│   └── master.md
└── module/
    └── design.md
```

**New naming (v1.0):**
```
templates/
├── master-architecture-template.md
├── module-architecture-template.md
├── sidecar-architecture-decisions.md
├── sidecar-contract-history.md
└── sidecar-runtime-preferences.md
```

#### Step 6: Update Configuration

Configuration variables are now standardized.

**Old config (v0.x):**
```yaml
config:
  tenant_isolation: rls
  ai_framework: langchain
```

**New config (v1.0):**
```yaml
config_variables:
  - tenant_model    # row-level-security | schema-per-tenant | database-per-tenant
  - ai_runtime      # langgraph | crewai | autogen | dspy | instructor | custom
  - design_first    # true | false
  - test_architecture  # true | false
```

---

## Breaking Changes in v1.0

### Agent Architecture

| Change | v0.x | v1.0 | Migration |
|--------|------|------|-----------|
| Agent consolidation | Separate Atlas, Nova, Kai agents | Consolidated into `architect-bam.yaml` | Update agent references |
| QA/SM agents | Separate extensions | Merged into `dev-bam.yaml` | Update extension imports |
| Agent count | 3 standalone agents | 0 (pure extension module) | Use persona switching via prompts |

### Extension Format

| Change | v0.x | v1.0 | Migration |
|--------|------|------|-----------|
| `memories:` field | Allowed | **Removed** | Use agent-guides pattern |
| `capabilities:` array | Allowed | String only | Convert to comma-separated |
| Context loading | Inline in extension | Via agent-guides files | Create guide files |

### Workflow Structure

| Change | v0.x | v1.0 | Migration |
|--------|------|------|-----------|
| Step directories | `steps-create/`, `steps-edit/`, `steps-validate/` | Unified `steps/` | Rename and merge directories |
| Step naming | `step-N.md` | `step-NN-mode-description.md` | Rename files |
| Manifest file | `manifest.yaml` | `bmad-skill-manifest.yaml` | Rename and update format |
| SKILL.md | Optional | **Required** | Create SKILL.md for each workflow |

### Pattern Registry

| Change | v0.x | v1.0 | Migration |
|--------|------|------|-----------|
| Knowledge format | 79 markdown files | 6 CSV files | Update references to CSV |
| Web search | Not integrated | `{date}` placeholder in CSV | Add web_queries column |
| Pattern reference | File path | CSV filter syntax | Update step file syntax |

### Quality Gates

| Change | v0.x | v1.0 | Migration |
|--------|------|------|-----------|
| Gate naming | QG-1, QG-2, etc. | QG-F1, QG-M1, QG-M2, etc. | Update gate references |
| Gate count | 5 gates | 8 gates | Add new gate checks |
| Recovery protocol | Manual | Structured 2-attempt with escalation | Implement recovery flow |

---

## Deprecation Notices

### Deprecated in v1.0 (Scheduled for removal in v2.0)

#### 1. `memories:` Field in Extensions

**Status:** Deprecated, will cause validation error in v1.1

**Reason:** Non-standard field that breaks BMB compatibility

**Migration:**
```yaml
# OLD - Deprecated
memories:
  - "Context 1"
  - "Context 2"

# NEW - Use agent-guides
prompts:
  - id: load-context-prompt
    content: |
      Read: `{project-root}/_bmad/bam/data/agent-guides/bam/guide.md`
```

#### 2. Static Knowledge Fragments

**Status:** Deprecated, not included in v1.0

**Reason:** Replaced by pattern registry with web search

**Migration:**
```markdown
# OLD - Deprecated
See knowledge/tenant-patterns.md

# NEW - Use pattern registry
**Load patterns:** bam-patterns.csv -> filter: tenant-isolation
```

#### 3. Separate Step Directories

**Status:** Deprecated, not supported in v1.0

**Reason:** Unified structure simplifies workflow management

**Migration:**
Merge all step directories into single `steps/` with mode suffixes.

#### 4. Old Manifest Format

**Status:** Deprecated, not supported in v1.0

**Reason:** Standardized manifest format across BMAD ecosystem

**Migration:**
Rename `manifest.yaml` to `bmad-skill-manifest.yaml` and update format.

---

## Configuration Migration

### Tenant Model Configuration

**v0.x configuration:**
```yaml
tenant:
  isolation: rls
  schema_mode: shared
```

**v1.0 configuration:**
```yaml
# During install, select:
# tenant_model: row-level-security
```

**Mapping table:**

| v0.x Value | v1.0 Value |
|------------|------------|
| `rls` | `row-level-security` |
| `schema` | `schema-per-tenant` |
| `database` | `database-per-tenant` |

### AI Runtime Configuration

**v0.x configuration:**
```yaml
ai:
  framework: langchain
  orchestration: custom
```

**v1.0 configuration:**
```yaml
# During install, select:
# ai_runtime: langgraph
```

**Mapping table:**

| v0.x Value | v1.0 Value |
|------------|------------|
| `langchain` | `langgraph` |
| `langchain-agents` | `langgraph` |
| `crewai` | `crewai` |
| `autogen` | `autogen` |
| `custom` | `custom` |

### Output Path Configuration

**v0.x configuration:**
```yaml
paths:
  output: ./docs/architecture
```

**v1.0 configuration:**
```yaml
# Uses {output_folder} placeholder
# Default: {project-root}/docs
# Outputs go to: {output_folder}/planning-artifacts/
```

---

## Data Migration Considerations

### Planning Artifacts

Existing planning artifacts remain compatible but may need path updates.

**Steps:**
1. Keep existing artifacts in place
2. Update any cross-references to use new paths
3. Re-run validation workflows to verify compatibility

### Sidecar Memory Files

New sidecar memory pattern in v1.0.

**Migration:**
1. Create `_bmad/_memory/architect-bam-sidecar/` directory
2. Copy relevant context from old format:
   ```bash
   mkdir -p _bmad/_memory/architect-bam-sidecar
   touch _bmad/_memory/architect-bam-sidecar/architecture-decisions.md
   touch _bmad/_memory/architect-bam-sidecar/runtime-preferences.md
   touch _bmad/_memory/architect-bam-sidecar/contract-history.md
   ```

### Quality Gate Results

Gate result format has changed.

**Old format (v0.x):**
```
QG-1: PASS
QG-2: PASS
QG-3: FAIL
```

**New format (v1.0):**
```
QG-F1: PASS (Foundation)
QG-M1: PASS (Module Architecture)
QG-M2: CONDITIONAL (Tenant Isolation) - Mitigation: [plan]
QG-M3: FAIL (Module Readiness) - Recovery: Attempt 1
```

---

## Extension Migration

### From Standalone Agent to Extension

If you created custom standalone agents in v0.x, convert them to extensions.

**v0.x standalone agent:**
```yaml
agent:
  name: my-custom-agent
  role: Custom Analyst
  instructions: |
    You are a custom analyst...
```

**v1.0 extension:**
```yaml
agent:
  metadata:
    extends: 'bmad-agent-analyst'
    module: 'bam'
    description: 'Custom analyst extension'

menu:
  - trigger: my-custom-context
    action: "#load-my-custom-context-prompt"
    description: Load custom analyst context

prompts:
  - id: load-my-custom-context-prompt
    content: |
      Read and internalize:
      `{project-root}/_bmad/bam/data/agent-guides/bam/my-custom.md`
      
      You are now enhanced with custom analyst capabilities.
```

### CIS Extension Updates

All 12 CIS extensions now include web research capabilities.

**Add to existing CIS extensions:**
```yaml
menu:
  # Add research capability
  - trigger: bam-{lens}-research
    action: "#bam-{lens}-research-prompt"
    description: Research current {lens} best practices

prompts:
  - id: bam-{lens}-research-prompt
    content: |
      Search the web: "{lens} SaaS patterns {date}"
      Search the web: "{lens} multi-tenant best practices {date}"
```

---

## Workflow Migration

### Checklist for Each Workflow

For each workflow in your v0.x installation:

- [ ] Rename `manifest.yaml` to `bmad-skill-manifest.yaml`
- [ ] Create `SKILL.md` with required frontmatter
- [ ] Create `workflow.md` mode router
- [ ] Merge step directories into unified `steps/`
- [ ] Rename steps to `step-NN-mode-description.md` format
- [ ] Update pattern references to CSV syntax
- [ ] Add web search directives to Create-mode steps
- [ ] Add entry to `module-help.csv`
- [ ] Create `bmad-manifest.json` for dependencies (optional)

### Step File Content Updates

Update step file content to use new patterns.

**Old syntax (v0.x):**
```markdown
## Context

Load the tenant isolation patterns from knowledge base.

## Implementation

Here's the code pattern:
```typescript
// Code example
```
```

**New syntax (v1.0):**
```markdown
## Prerequisites

- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

## Actions

### 1. Review Isolation Patterns

Reference patterns from tenant-models.csv:
- Decision criteria for tenant model selection
- Trade-offs between isolation levels

**Verify current best practices with web search:**
Search the web: "tenant isolation patterns {date}"

## Verification

- [ ] Pattern selected aligns with requirements
- [ ] Trade-offs documented
```

---

## Testing Your Migration

### Run Full Test Suite

```bash
npm test
```

**Expected results for v1.0:**
- 169+ tests passing
- No `memories:` field warnings
- All workflows have required files

### Validate Individual Components

```bash
# Schema validation
npm test -- test/schema.test.js

# Workflow structure
npm test -- test/workflow.test.js

# Extension format
npm test -- test/extension.test.js

# Integration with other modules
npm test -- test/integration.test.js
```

### Manual Verification

1. **Load agent context:**
   ```
   /atlas
   > bam-platform-context
   ```
   
2. **Run a workflow:**
   ```
   /atlas
   > CMAR  # Create Master Architecture
   ```

3. **Verify output:**
   - Check `{output_folder}/planning-artifacts/`
   - Validate artifact structure

---

## Rollback Procedure

If migration fails, restore from backup:

```bash
# Restore from tag
git checkout pre-bam-1.0-migration

# Reinstall old version
rm -rf _bmad/bam
npx bmad-method install  # Select older BAM version
```

---

## Getting Migration Help

If you encounter issues during migration:

1. **Check troubleshooting guide:** [Troubleshooting Guide](troubleshooting-guide.md)
2. **Review changelog:** [Changelog](changelog.md)
3. **Run diagnostics:**
   ```bash
   npm test -- --verbose
   ```
4. **Community support:** Open a GitHub issue with migration logs

---

## Related Documentation

- [Getting Started](tutorials/getting-started.md) - Fresh installation guide
- [Troubleshooting Guide](troubleshooting-guide.md) - Common issues
- [Changelog](changelog.md) - Full version history
- [Quality Gates Reference](reference/quality-gates.md) - Gate requirements
