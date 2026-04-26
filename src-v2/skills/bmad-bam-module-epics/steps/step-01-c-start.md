# Step 1: Initialize Module Epic Creation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **VERIFY module architecture exists** before proceeding

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize epic creation by loading module architecture and patterns
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load module boundaries and identify epic categories
- 🚫 Do NOT: Generate epics without first loading module architecture
- 🔍 Use web search: Verify epic decomposition best practices for multi-tenant SaaS
- ⚠️ Gate: Requires module architecture (QG-M1 passed) before epic creation

---

## Purpose

Initialize the module epic creation workflow by loading the module architecture, understanding module boundaries, and identifying epic categories (core, integration, infrastructure) for multi-tenant SaaS development.

---

## Prerequisites

- Module architecture document exists (QG-M1 passed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: epic-*
- **Load patterns:** `{project-root}/_bmad/bam/data/section-pattern-map.csv` → filter: module-epics
- Master architecture available for cross-module context

---

## Inputs

- Module architecture: `{output_folder}/planning-artifacts/modules/{module}/architecture.md`
- Master architecture: `{output_folder}/planning-artifacts/master-architecture.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK

Load the module architecture, identify the module boundaries, and establish epic categories. Prepare context for epic scope definition in the next step.

---

## Main Sequence

### Action 1: Load Module Architecture

Verify and load the module architecture document:

```
{output_folder}/planning-artifacts/modules/{module}/architecture.md
```

**If artifact does not exist:**
- Inform user: "Module architecture not found. Please run `bmad-bam-create-module-architecture` first."
- HALT workflow

**If artifact exists, extract metadata:**

| Attribute | Value |
|-----------|-------|
| Module Name | {from frontmatter} |
| Module Domain | {domain from architecture} |
| Tenant Model | {tenant_model} |
| AI Runtime | {ai_runtime} (if applicable) |
| Last Modified | {date} |

### Action 2: Identify Module Boundaries

Extract module boundaries from architecture:

| Boundary Type | Description | Epic Impact |
|---------------|-------------|-------------|
| **Domain Boundary** | {domain scope} | Core epics |
| **API Boundary** | {exposed interfaces} | Integration epics |
| **Data Boundary** | {data ownership} | Infrastructure epics |
| **Tenant Boundary** | {isolation requirements} | Cross-cutting concerns |
| **Agent Boundary** | {AI agent scope} | AI/Agent epics |

### Action 3: Identify Epic Categories

Define the epic categories for this module:

| Category | Description | Example Epics |
|----------|-------------|---------------|
| **Core** | Primary business functionality | User management, workflow engine |
| **Integration** | Cross-module dependencies | Facade contracts, event handlers |
| **Infrastructure** | Supporting capabilities | Logging, monitoring, data migrations |
| **AI/Agent** | Agent-specific functionality | Agent tools, memory, orchestration |
| **Tenant** | Multi-tenant considerations | RLS policies, tenant provisioning |

### Action 4: Load Pattern Registry

Reference epic patterns from pattern registry:

| Pattern ID | Category | When to Apply |
|------------|----------|---------------|
| epic-user-value | core | User-facing functionality |
| epic-integration | integration | Cross-module communication |
| epic-tenant-aware | tenant | Multi-tenant isolation |
| epic-agent | ai-runtime | AI agent capabilities |
| epic-infrastructure | infrastructure | System-level capabilities |

### Action 5: Establish Epic Context

Prepare context for epic definition:

```markdown
## Module Epic Creation Context

**Module:** {module_name}
**Domain:** {domain}
**Tenant Model:** {tenant_model}
**AI Runtime:** {ai_runtime}

### Module Boundaries Summary

- Domain scope: {summary}
- API surface: {summary}
- Data ownership: {summary}
- Agent capabilities: {summary}

### Epic Categories Identified

1. **Core:** {count} potential epics
2. **Integration:** {count} potential epics
3. **Infrastructure:** {count} potential epics
4. **AI/Agent:** {count} potential epics
5. **Tenant:** Cross-cutting considerations
```

### Action 6: Web Research Verification

**Verify current best practices with web search:**

Search the web: "user story epic decomposition best practices {date}"
Search the web: "multi-tenant SaaS epic planning {date}"
Search the web: "modular monolith epic organization {date}"

Document findings relevant to module epic creation:

_Source: [URL]_

---

## SUCCESS METRICS

- ✅ Module architecture loaded successfully
- ✅ Module boundaries identified
- ✅ Epic categories defined
- ✅ Pattern registry referenced
- ✅ Web research completed
- ✅ Context established for epic definition

---

## FAILURE MODES

| Failure | Recovery |
|---------|----------|
| Module architecture not found | Run `bmad-bam-create-module-architecture` first |
| Missing module boundaries | Extract from master architecture |
| Pattern registry unavailable | Verify BAM installation |

---

## Verification

- [ ] Module architecture loaded from correct path
- [ ] Module boundaries documented
- [ ] Epic categories identified
- [ ] Pattern registry loaded
- [ ] Web research completed
- [ ] Patterns align with pattern registry

---

## Outputs

- Module context summary
- Epic categories identification
- Module boundaries analysis
- Web research findings

---

## NEXT STEP

Proceed to `step-02-c-analyze.md` to define epic scope with feature decomposition, acceptance criteria, and multi-tenant considerations.
