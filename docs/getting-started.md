# Getting Started with BAM

This guide walks you through installing the BAM extension module and creating your first multi-tenant SaaS architecture.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [First Workflow Execution](#first-workflow-execution)
5. [Key Concepts](#key-concepts)
6. [Next Steps](#next-steps)

---

## Prerequisites

Before installing BAM, ensure you have the following:

### Required

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 20+ | Required for BMB installer |
| BMAD Method (BMB) | 1.2+ | Base framework for extensions |
| BMM | 1.0+ | Core method agents BAM extends |

### Recommended

| Recommendation | Purpose |
|----------------|---------|
| TEA module | Tenant isolation testing |
| WDS module | UX design for tenant journeys |
| CIS module | SaaS innovation capabilities |

### Verification

Check your environment:

```bash
# Check Node.js version
node --version  # Should be v20.x or higher

# Check BMB installation
npx bmad-method --version  # Should be 1.2.x or higher

# Verify BMM is available
ls _bmad/bmm  # Should exist if BMM installed
```

---

## Installation

### Step 1: Run the BMB Installer

```bash
npx bmad-method install
```

### Step 2: Select Modules

When prompted, select the modules you want:

```
? Select modules to install:
  ◉ BMM - BMAD Method (core agents)
  ◉ BAM - Multi-Tenant Agentic AI SaaS  ← Select this
  ◯ TEA - Test Everything Architecture
  ◯ WDS - Workshop Design System
  ◯ CIS - Creative Innovation System
```

For the full BAM experience, select all modules. BAM extends BMM, TEA, WDS, and CIS agents.

### Step 3: Configure BAM Options

The installer will prompt for BAM-specific configuration:

```
? Select tenant isolation strategy for your SaaS platform:
> Row-Level Security (Recommended for most SaaS)
  Schema per Tenant (Higher isolation)
  Database per Tenant (Maximum isolation)

? Select AI agent orchestration framework:
> LangGraph (Recommended)
  CrewAI
  AutoGen
  Custom Framework

? Start with architecture design before coding?
> Yes - Design-first approach (Recommended)
  No - Start coding immediately

? Include test architecture planning?
> Yes - Plan testing with TEA integration
  No - Basic testing only
```

### Step 4: Verify Installation

After installation completes:

```bash
# Check BAM files exist
ls _bmad/bam/

# Expected output:
# extensions/
# workflows/
# data/
# templates/
# checklists/
# module.yaml
# module-help.csv
```

### Installation Output Structure

```
{project-root}/
├── _bmad/
│   ├── bam/                  # BAM module files
│   │   ├── extensions/       # Agent extensions
│   │   ├── workflows/        # Workflow definitions
│   │   ├── data/             # Pattern registry + guides
│   │   ├── templates/        # Output templates
│   │   ├── checklists/       # Quality gate checklists
│   │   └── module.yaml       # Configuration
│   │
│   ├── bmm/                  # BMM (if installed)
│   ├── tea/                  # TEA (if installed)
│   ├── wds/                  # WDS (if installed)
│   ├── cis/                  # CIS (if installed)
│   │
│   ├── config.yaml           # Shared configuration
│   └── config.user.yaml      # User-specific config
│
└── _bmad-output/             # Default output location
    ├── planning-artifacts/
    ├── implementation-artifacts/
    └── architecture-docs/
```

---

## Configuration

### Configuration Files

BAM uses two configuration files:

| File | Scope | Purpose |
|------|-------|---------|
| `_bmad/config.yaml` | Project | Shared settings, version controlled |
| `_bmad/config.user.yaml` | User | Personal preferences, git-ignored |

### Editing Configuration

```yaml
# _bmad/config.yaml

# User identification
user_name: "Your Name"

# Language settings
communication_language: "English"
document_output_language: "English"

# Output location
output_folder: "{project-root}/_bmad-output"

# BAM-specific settings
bam:
  tenant_model: "row-level-security"  # or schema-per-tenant, database-per-tenant
  ai_runtime: "langgraph"             # or crewai, autogen, custom
  design_first: true
  test_architecture: true
```

### Tenant Model Configuration

Choose based on your isolation requirements:

| Model | Best For | Characteristics |
|-------|----------|-----------------|
| **Row-Level Security** | Most SaaS (<1000 tenants) | Shared tables with RLS policies, cost-efficient, excellent query performance |
| **Schema-per-Tenant** | Regulated industries | Separate schema per tenant, moderate isolation, good for compliance |
| **Database-per-Tenant** | Enterprise tier | Maximum isolation, highest cost, per-tenant performance tuning |

### AI Runtime Configuration

Choose based on orchestration needs:

| Runtime | Best For | Characteristics |
|---------|----------|-----------------|
| **LangGraph** | Most use cases | State machines, conditional branching, checkpoints |
| **CrewAI** | Role-based agents | Hierarchical crews, task delegation |
| **AutoGen** | Conversations | Multi-agent discussions, debate/consensus |
| **Custom** | Special requirements | Bring your own orchestration |

---

## First Workflow Execution

### Meet the BAM Agents

BAM extends existing agents with multi-tenant capabilities. The primary architect extension consolidates three personas:

| Persona | Trigger | Focus Area |
|---------|---------|------------|
| Atlas | `/atlas` or menu | Platform architecture, tenant models, module boundaries |
| Nova | `/nova` or menu | AI runtime, tool contracts, memory systems |
| Kai | `/kai` or menu | Facade contracts, integration, convergence verification |

### Step 1: Load BAM Context

Before running workflows, load the BAM context into your agent:

```
/architect
> bam-context

# Agent confirms: "BAM multi-tenant context loaded."
```

### Step 2: Create Master Architecture

Run the first required workflow:

```
/architect
> CMAR

# Or use the full workflow name:
> bmad-bam-create-master-architecture
```

The workflow guides you through:

1. **Discovery** - Load existing documents, identify gaps
2. **Tenant Model Decisions** - Define isolation strategy
3. **AI Runtime Decisions** - Configure agent orchestration
4. **Module Boundary Rules** - Define separation patterns
5. **Shared Kernel Definition** - Specify common interfaces
6. **Technology Stack** - Lock technology versions
7. **Core Contracts** - Define interface templates
8. **Code Patterns** - Produce working examples
9. **Assembly** - Generate `master-architecture.md`

### Step 3: Validate Foundation

After creating the master architecture:

```
/architect
> VF

# Or: bmad-bam-validate-foundation
```

This runs the QG-F1 (Foundation Gate) checklist:

- [ ] Master architecture document exists
- [ ] Tenant model defined with hierarchy
- [ ] All modules identified with boundaries
- [ ] Shared kernel minimal (only allowed items)
- [ ] Forbidden dependencies documented
- [ ] AI runtime decisions made

### Step 4: Design First Module

Once foundation passes:

```
/architect
> CMA

# Or: bmad-bam-create-module-architecture
```

This creates a module-specific architecture that inherits from the master.

### Workflow Menu Codes

BAM workflows use short menu codes for quick access:

| Code | Workflow | Purpose |
|------|----------|---------|
| CMAR | create-master-architecture | Frozen platform architecture |
| VF | validate-foundation | Check QG-F1 |
| TMI | tenant-model-isolation | Design tenant separation |
| MBD | module-boundary-design | Define module boundaries |
| CMA | create-module-architecture | Per-module design |
| VM | validate-module | Check QG-M1/M2/M3 |
| ARA | agent-runtime-architecture | AI orchestration design |
| DFC | define-facade-contract | Cross-module contracts |
| CV | convergence-verification | Integration validation |

### Headless Mode

For automated execution without prompts:

```
/architect
> CMAR -H

# Or: bmad-bam-create-master-architecture --headless
```

Headless mode uses defaults and skips confirmation prompts.

---

## Key Concepts

### Extension Model

BAM is a **pure extension module** with zero standalone agents. All capabilities are added to existing BMAD agents through extension files.

```yaml
# Extension pattern (analyst-bam.yaml)
agent:
  metadata:
    extends: 'bmad-agent-analyst'  # Base agent
    module: 'bam'
    description: "Multi-tenant discovery capabilities"

menu:
  - trigger: bam-context
    action: "#load-bam-context-prompt"
    description: Load BAM context
```

### Pattern Registry

Instead of static knowledge files, BAM uses CSV-based pattern registries with web search queries:

```csv
pattern_id,decision_criteria,web_queries
tenant-rls,"<1000 tenants, cost-efficient","PostgreSQL RLS best practices {date}"
```

The `{date}` placeholder resolves to current year for up-to-date search results.

### Quality Gates

BAM enforces 8 gates from foundation to production:

```
QG-F1 → QG-M1 → QG-M2 → QG-M3 → QG-I1 → QG-I2 → QG-I3 → QG-P1
```

Each gate has:
- Required checks (all must pass)
- Critical checks (failure blocks progress)
- Recovery protocol (2 attempts, then escalate)

### CEV Workflow Modes

Workflows support three modes:

| Mode | Purpose | Step Prefix |
|------|---------|-------------|
| **Create** | Generate new artifacts | `step-01-c-` to `step-09-c-` |
| **Edit** | Modify existing artifacts | `step-10-e-` to `step-19-e-` |
| **Validate** | Check against criteria | `step-20-v-` to `step-29-v-` |

### Tenant Hierarchy

BAM supports multi-level tenant structures:

```
Organization (billing owner)
└── Workspace (project/team)
    └── User (individual)
        └── API Key (programmatic access)
```

Not all levels are required; configure based on your SaaS model.

### Frozen Architecture

The master architecture is "frozen" after QG-F1 passes:

- No changes without formal ADR (Architecture Decision Record)
- Emergency changes require `master-architecture-emergency-change` workflow
- All modules inherit from master; they cannot override frozen decisions

---

## Next Steps

### Recommended Learning Path

1. **Complete Foundation**
   - Run `CMAR` (Create Master Architecture)
   - Run `VF` (Validate Foundation)
   - Review generated `master-architecture.md`

2. **Design Tenant Model**
   - Run `TMI` (Tenant Model Isolation)
   - Review RLS policies or schema design
   - Run isolation tests if TEA installed

3. **Design First Module**
   - Run `MBD` (Module Boundary Design)
   - Run `CMA` (Create Module Architecture)
   - Run `VM` (Validate Module)

4. **Add AI Capabilities**
   - Run `ARA` (Agent Runtime Architecture)
   - Define tool contracts
   - Configure memory tiers

5. **Prepare for Integration**
   - Run `DFC` (Define Facade Contract)
   - Run `CV` (Convergence Verification)
   - Complete QG-I1/I2/I3 gates

### Useful Workflows by Phase

| Phase | Workflows |
|-------|-----------|
| Discovery | TRAN (Tenant Requirements Analysis) |
| Planning | RI (Requirement Ingestion), MCT (Module Complexity Triage), CME (Create Module Epics) |
| Solutioning | CMAR, TMI, MBD, CMA, ARA, DFC |
| Implementation | AVR (API Version Release), AAD (AI Agent Debug), FMR (Facade Mismatch Recovery) |
| Operations | TOD (Tenant Onboarding), TOFD (Tenant Offboarding), TAO (Tenant-Aware Observability) |

### Additional Resources

| Resource | Location |
|----------|----------|
| Architecture Overview | `docs/architecture-overview.md` |
| API Reference | `docs/api-reference.md` |
| Tutorials | `docs/tutorials/` |
| How-To Guides | `docs/how-to/` |
| Quality Gates Reference | `docs/reference/quality-gates.md` |

### Getting Help

```
# List all BAM workflows
/architect
> LT  # List Tools

# View workflow help
/architect
> help CMAR

# View pattern registry
cat _bmad/bam/data/bam-patterns.csv
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| "Module not found" | Re-run `npx bmad-method install` and select BAM |
| "Base agent not found" | Ensure BMM is installed (BAM extends BMM agents) |
| "Config missing" | Configure BAM settings in `_bmad/config.yaml` under the `bam` section, or re-run `npx bmad-method install` |
| "Gate validation fails" | Check `_bmad-output/planning-artifacts/` for gate reports |

### Verification Commands

```bash
# Verify BAM installation
ls _bmad/bam/data/extensions/

# Check configuration
cat _bmad/config.yaml | grep -A5 "bam:"

# List available workflows
grep "^bam," _bmad/bam/workflows/module-help.csv | cut -d',' -f3

# Validate pattern registry
npm test -- test/schema.test.js
```

### Support

- CLAUDE.md contains comprehensive module documentation
- Pattern registry CSVs include decision criteria
- Agent guides provide context for each domain
