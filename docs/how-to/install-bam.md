# How to Install BAM

## Prerequisites

Before installing BAM, ensure you have:

- **Node.js 20+** installed (`node --version` to verify)
- **npm** or **npx** available
- A project directory where you want to set up BMAD
- (Optional) An existing BMAD project if adding BAM to existing setup

## Steps

### 1. Run Installation Command

```bash
npx bmad-method install
```

Select **BAM - Multi-Tenant Agentic AI SaaS** when prompted.

### 2. Select Configuration Options

During installation, BAM prompts for several configuration choices:

**Tenant Model:**
```
Select tenant isolation strategy:
> row-level-security    # Recommended
  schema-per-tenant     # Higher isolation
  database-per-tenant   # Maximum isolation
```

**AI Runtime:**
```
Select AI agent orchestration framework:
> langgraph    # Recommended
  crewai
  autogen
  custom
```

**Design-First Mode:**
```
Start with architecture design before coding?
> true     # Recommended
  false
```

### 3. Verify Installation

```bash
# Check installed modules
cat _bmad/_config/config.yaml

# Verify BAM agents
ls .claude/commands/ | grep bam

# Test help system
bmad-help | grep bam
```

## Post-Install Structure

```
_bmad/
├── bam/
│   ├── agents/
│   ├── workflows/
│   ├── knowledge/
│   ├── extensions/
│   └── config.yaml
└── _config/
    └── config.yaml
```

## Troubleshooting

### Module not appearing
```bash
# Reinstall with verbose
npx bmad-method install --verbose
```

### Config not resolved
Check `_bmad/bam/config.yaml` for unresolved `{variables}`.

### Extensions not merging
Ensure BMM is installed - BAM extends BMM agents.
