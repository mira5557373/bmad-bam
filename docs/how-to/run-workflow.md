# How to Run BAM Workflows

This guide covers executing BAM workflows, including mode selection (Create/Edit/Validate), step navigation, prerequisite checking, and web search usage.

## Prerequisites

- BAM module installed via `npx bmad-method install`
- Access to `src/workflows/` directory
- module-help.csv for workflow discovery
- Pattern registry CSVs available in `src/data/`

## Overview

BAM workflows follow the CEV (Create/Edit/Validate) mode pattern. Each workflow supports three modes:

| Mode | Step Range | Purpose |
|------|------------|---------|
| **Create** | 01-09 (or 01-10) | Generate new artifacts from scratch |
| **Edit** | 10-19 | Modify existing artifacts |
| **Validate** | 20-29 | Verify artifacts meet criteria |

## Steps

### 1. Discover Available Workflows

Find workflows using the module-help.csv:

```bash
# View all BAM workflows
cat src/workflows/module-help.csv
```

**Key columns:**

| Column | Description | Example |
|--------|-------------|---------|
| `skill` | Full workflow name | `bmad-bam-create-master-architecture` |
| `menu-code` | Short trigger code | `CMAR` |
| `phase` | BMAD phase | `3-solutioning` |
| `after` | Prerequisites | `bmad-bam-validate-foundation` |
| `required` | Mandatory workflow | `true` |

**Find workflows by phase:**

| Phase | Workflows |
|-------|-----------|
| 1-discovery | `tenant-requirements-analysis` |
| 2-planning | `requirement-ingestion`, `triage-module-complexity`, `create-module-epics` |
| 3-solutioning | `create-master-architecture`, `tenant-model-isolation`, `module-boundary-design` |
| 4-implementation | `convergence-verification`, `facade-mismatch-recovery`, `ai-agent-debug` |
| anytime | `list-tools`, `validate-patterns` |

### 2. Check Prerequisites

Before running a workflow, verify prerequisites:

```
/atlas
> GS  -- Gate Status
```

**Prerequisite checking:**

| Workflow | Prerequisites |
|----------|---------------|
| `create-module-architecture` | `validate-foundation` (QG-F1 passed) |
| `tenant-model-isolation` | `create-master-architecture` |
| `convergence-verification` | All module gates (QG-M1, QG-M2, QG-M3) |

Check if prerequisite artifacts exist:

```bash
ls {output_folder}/planning-artifacts/
```

Required artifacts:
- `master-architecture.md` for module workflows
- `module-architecture.md` for integration workflows
- `tenant-model.md` for tenant-specific workflows

### 3. Select Execution Mode

Choose the appropriate mode based on context:

**Create Mode (Default)**

Use when the target artifact does not exist:

```
/atlas
> CMAR  -- Create Master Architecture
```

This starts at `step-01-c-*` and proceeds through Create steps.

**Edit Mode**

Use when modifying an existing artifact:

```
/atlas
> CMAR  -- Create Master Architecture
> Mode: Edit
```

This loads the existing artifact and starts at `step-10-e-*`.

**Validate Mode**

Use when verifying an artifact meets criteria:

```
/atlas
> CMAR  -- Create Master Architecture
> Mode: Validate
```

This starts at `step-20-v-*` and runs validation checks.

### 4. Navigate Through Steps

Each workflow guides you through sequential steps:

**Step File Structure:**

```markdown
# Step N: {Title}

## Purpose
{Goal of this step}

## Prerequisites
- {Previous step completed}
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `{pattern_id}`

## Actions
### 1. {Action}
{Instructions}

## Verification
- [ ] {Check item}

## Outputs
- {Artifact produced}

## Next Step
Proceed to `{next-step}.md`
```

**Step Numbering Convention:**

| Mode | Steps | Example Files |
|------|-------|---------------|
| Create | 01-09 (or 01-10) | `step-01-c-first.md`, `step-02-c-second.md` |
| Edit | 10-19 | `step-10-e-load.md`, `step-11-e-apply.md` |
| Validate | 20-29 | `step-20-v-load.md`, `step-21-v-check.md` |

### 5. Load Patterns During Execution

Step files reference the pattern registry. Load patterns as directed:

```markdown
**Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
```

**Pattern Loading Process:**

1. Open the referenced CSV file
2. Filter to the specified pattern ID
3. Read decision criteria and recommendations
4. Extract web_queries for current best practices

**Pattern Registry Files:**

| File | Contains |
|------|----------|
| `bam-patterns.csv` | Core architectural patterns |
| `tenant-models.csv` | Tenant isolation strategies |
| `ai-runtimes.csv` | AI orchestration frameworks |
| `quality-gates.csv` | Gate requirements |
| `compliance-frameworks.csv` | Regulatory requirements |

### 6. Use Web Search for Current Practices

Create-mode steps include web search directives for current best practices:

```markdown
**Verify current best practices with web search:**
Search the web: "multi-tenant isolation patterns 2026"
Search the web: "PostgreSQL RLS best practices 2026"
```

**Web Search Guidelines:**

| Mode | Web Search Usage |
|------|-----------------|
| Create | Use web search for technology verification |
| Edit | Skip web search (verify existing artifact) |
| Validate | Skip web search (check against criteria) |

**Extract queries from pattern registry:**

The `web_queries` column in pattern CSVs provides pre-defined searches:

```csv
pattern_id,name,web_queries
tenant-rls,Row-Level Security,"PostgreSQL RLS multi-tenant best practices {date};row level security patterns {date}"
```

Replace `{date}` with current year (2026).

### 7. Complete Verification Checklists

Each step includes a verification section:

```markdown
## Verification

- [ ] {Check item 1}
- [ ] {Check item 2}
- [ ] Patterns align with pattern registry
```

Complete all items before proceeding to the next step.

### 8. Handle Soft Gate Checkpoints

Some workflows include mid-workflow checkpoints:

```markdown
## Soft Gate Checkpoint

**Steps 1-N complete the {phase} design.**

Present summary and ask for confirmation before proceeding.
```

At soft gates:
1. Review completed work
2. Get user confirmation
3. Document any concerns
4. Proceed or iterate

### 9. Produce Output Artifacts

Steps specify outputs to generate:

```markdown
## Outputs

- {artifact-name}.md
- **Load template:** `{project-root}/_bmad/bam/templates/{template}.md`
```

**Output Locations:**

| Artifact Type | Location |
|--------------|----------|
| Planning docs | `{output_folder}/planning-artifacts/` |
| Implementation | `{output_folder}/implementation-artifacts/` |
| Architecture | `{output_folder}/architecture-docs/` |

### 10. Proceed to Next Step

Follow the navigation at the end of each step:

```markdown
## Next Step

Proceed to `step-02-c-design.md` with tenant model selection.
```

Continue until you reach the final step, which typically triggers validation.

## Running Specific Workflow Types

### Foundation Workflows

```bash
# 1. Create master architecture
bmad-bam-create-master-architecture

# 2. Optionally scaffold
bmad-bam-scaffold-foundation

# 3. Validate (QG-F1)
bmad-bam-validate-foundation
```

### Module Workflows

```bash
# 1. Create module architecture
bmad-bam-create-module-architecture

# 2. Design tenant isolation
bmad-bam-tenant-model-isolation

# 3. Define facades
bmad-bam-define-facade-contract

# 4. Validate (QG-M1, QG-M2, QG-M3)
bmad-bam-validate-module
```

### Integration Workflows

```bash
# 1. Verify convergence
bmad-bam-convergence-verification

# 2. Recover from issues (if needed)
bmad-bam-facade-mismatch-recovery
```

## Workflow Execution Examples

### Example: Create Master Architecture

1. **Start workflow:**
   ```
   /atlas
   > CMAR
   ```

2. **Confirm mode:**
   ```
   Mode: Create (default - no existing artifact)
   ```

3. **Execute step-01-c:**
   - Load tenant model patterns
   - Select isolation strategy
   - Document decision

4. **Execute step-02-c through step-09-c:**
   - Follow each step's instructions
   - Complete verification checklists
   - Load templates for outputs

5. **Complete workflow:**
   - Generate `master-architecture.md`
   - Proceed to validation

### Example: Edit Existing Module

1. **Start workflow in Edit mode:**
   ```
   /atlas
   > CMA
   > Mode: Edit
   ```

2. **Load existing artifact (step-10-e):**
   - Read current `module-architecture.md`
   - Identify changes needed

3. **Apply changes (step-11-e):**
   - Modify relevant sections
   - Update version/date
   - Document rationale

4. **Validate changes (step-20-v):**
   - Run validation checks
   - Ensure compliance with master architecture

## Common Workflow Sequences

### New Project Setup

```
requirement-ingestion
    -> triage-module-complexity
    -> create-master-architecture
    -> validate-foundation
    -> create-module-architecture (per module)
    -> validate-module (per module)
    -> convergence-verification
```

### Adding AI Capabilities

```
agent-runtime-architecture
    -> ai-eval-safety-design
    -> validate-module (QG-M3)
```

### Tenant Onboarding

```
tenant-onboarding-design
    -> usage-metering-design
    -> tenant-aware-observability
```

## Troubleshooting Workflow Execution

| Issue | Cause | Resolution |
|-------|-------|------------|
| Cannot find workflow | Wrong skill name | Check module-help.csv |
| Prerequisite not met | Prior gate failed | Run prerequisite workflow |
| Pattern not loading | Wrong path | Use `{project-root}` placeholder |
| Web search fails | No connectivity | Proceed with pattern registry |
| Step file missing | Incomplete workflow | Check workflow completeness |

## Quick Reference

### Menu Codes

| Code | Workflow |
|------|----------|
| CMAR | Create Master Architecture |
| CMA | Create Module Architecture |
| TMI | Tenant Model Isolation |
| VF | Validate Foundation |
| VM | Validate Module |
| CV | Convergence Verification |
| DFC | Define Facade Contract |
| ARA | Agent Runtime Architecture |

### Mode Detection

| Condition | Mode |
|-----------|------|
| No existing artifact | Create |
| Artifact exists, changes needed | Edit |
| Artifact exists, verify quality | Validate |

## Related

- [Add Workflow](add-workflow.md) - Creating new workflows
- [Run Quality Gate](run-quality-gate.md) - Gate execution
- [Use Web Research](use-web-research.md) - Web search integration
- [Debug Agent](debug-agent.md) - AI agent debugging workflow
- [CLAUDE.md](../../CLAUDE.md) - Full reference documentation
