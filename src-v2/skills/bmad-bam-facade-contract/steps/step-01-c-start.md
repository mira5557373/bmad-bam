# Step 1: Select Source and Target Modules for Facade Contract

## MANDATORY EXECUTION RULES

- 🛑 NEVER design a facade contract without loading master architecture first
- 📖 ALWAYS read master architecture to understand available modules and boundaries
- 🔄 ALWAYS verify module architecture exists for both source and target modules
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ PRESENT module selection menu with integration context
- 📋 CONFIRM source/target module selection before proceeding
- 💬 PAUSE after modules selected for user confirmation
- 🌐 USE web search to verify current facade contract best practices

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Select source and target modules for facade contract definition
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load master architecture and integration domain first
- 🚫 Do NOT: Skip module selection or proceed without explicit choice
- ⚠️ Gate: QG-I1 (Convergence Gate) governs this workflow
- 🔍 Use web search: Verify facade contract patterns against current best practices

---

## CONTEXT BOUNDARIES

### Primary Domain

- **Integration Domain:** `{project-root}/_bmad/bam/data/domains/integration.md`
- Contains: Facade contract pattern, integration boundaries, convergence verification

### Required Artifacts

- **Master Architecture:** `{output_folder}/planning-artifacts/master-architecture.md`
- Contains: Module inventory, bounded contexts, integration patterns
- **Module Architectures:** `{output_folder}/planning-artifacts/module-{name}-architecture.md`
- Contains: Module boundaries, public API contracts, dependencies

### Pattern Registry

- **Facade Pattern:** `{project-root}/_bmad/bam/data/patterns/facade.md`
- Contains: Contract definition patterns, versioning, evolution strategies

- **Integration Pattern:** `{project-root}/_bmad/bam/data/patterns/integration.md`
- Contains: Module-to-module communication, contract testing

---

## YOUR TASK

Select the source module (provider) and target module (consumer) for facade contract definition. Verify that both modules have architecture documents with defined boundaries. This workflow creates the formal contract between two modules for QG-I1 convergence verification.

---

## Prerequisites

- [ ] Master architecture document exists with module inventory
- [ ] Source module architecture exists with public API defined
- [ ] Target module architecture exists with dependencies documented
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] Integration style identified (sync, async, mixed)

---

## Main Sequence

### Action 1: Load Integration Domain Context

**Read and internalize:**

```
{project-root}/_bmad/bam/data/domains/integration.md
```

Key concepts to understand:
- Facade contract pattern and structure
- Contract versioning and evolution
- Tenant context propagation across module boundaries
- Convergence verification requirements (QG-I1)

### Action 2: Load Master Architecture

**Read and extract module inventory:**

```
{output_folder}/planning-artifacts/master-architecture.md
```

Extract the following information:

| Setting | Value |
|---------|-------|
| Total Modules | (count from architecture) |
| Tenant Model | (RLS / Schema / Database / Hybrid) |
| Deployment Mode | (Modular monolith / Microservices / Hybrid) |
| Integration Style | (Sync / Async / Mixed) |

### Action 3: Present Module Pairing Selection

**Display the module inventory with integration relationships:**

```
Available Module Pairs for Facade Contract:

┌─────┬──────────────────┬──────────────────┬──────────────────┬──────────────┐
│ #   │ Source (Provider)│ Target (Consumer)│ Contract Type    │ Status       │
├─────┼──────────────────┼──────────────────┼──────────────────┼──────────────┤
│ 1   │ {module_1}       │ {module_2}       │ {sync/async}     │ Undefined    │
│ 2   │ {module_2}       │ {module_3}       │ {sync/async}     │ Undefined    │
│ ... │ ...              │ ...              │ ...              │ ...          │
└─────┴──────────────────┴──────────────────┴──────────────────┴──────────────┘

Enter pair number, or specify custom: 'S' for source selection, 'T' for target:
```

Wait for user selection.

### Action 4: Verify Module Architectures Exist

**After user selects module pair, verify both architectures exist:**

Source Module Check:
```
{output_folder}/planning-artifacts/module-{source_name}-architecture.md
```

Target Module Check:
```
{output_folder}/planning-artifacts/module-{target_name}-architecture.md
```

**If either missing:**
```
================================================================================
FACADE CONTRACT ERROR: Missing Module Architecture
================================================================================
Source Module: {source_name} - {exists/MISSING}
Target Module: {target_name} - {exists/MISSING}

Missing modules must be designed first:
[M] Run bmad-bam-module-architecture for missing module(s)
[D] Select different module pair
================================================================================
```

### Action 5: Extract Module Integration Context

**From Source Module (Provider), extract:**

| Attribute | Value |
|-----------|-------|
| Module Name | {source_module} |
| Bounded Context | {context_description} |
| Public Facade | {FacadeName} |
| Operations Provided | {list of operations} |
| Events Published | {list of events} |

**From Target Module (Consumer), extract:**

| Attribute | Value |
|-----------|-------|
| Module Name | {target_module} |
| Bounded Context | {context_description} |
| Dependencies | {facade dependencies} |
| Operations Required | {list of required operations} |
| Events Consumed | {list of consumed events} |

### Action 6: Identify Contract Scope

**Determine what contract elements are needed:**

| Contract Element | Required | Notes |
|------------------|----------|-------|
| Synchronous API | {yes/no} | {operations needed} |
| Asynchronous Events | {yes/no} | {events needed} |
| Shared Data Types | {yes/no} | {DTOs to define} |
| Error Contracts | {yes/no} | {error codes needed} |
| Tenant Context | Required | All contracts must include |

### Action 7: Web Research Verification

**Verify current best practices with web search:**

Search the web: "facade contract design patterns modular monolith {date}"
Search the web: "API contract definition best practices {date}"
Search the web: "module integration contract versioning {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 1 complete: Module selection and integration context gathered.**

Present summary and ask for confirmation:

```
Facade Contract Setup Summary:

Source Module (Provider): {source_module}
  Bounded Context: {context}
  Facade: {FacadeName}
  Operations: {count} available

Target Module (Consumer): {target_module}
  Bounded Context: {context}
  Dependencies: {count} facades required
  Operations Needed: {count}

Contract Scope:
✓ Synchronous API: {yes/no}
✓ Asynchronous Events: {yes/no}
✓ Tenant Context: Required

Quality Gate: QG-I1 (Convergence)

Ready to proceed to analysis? (y/n)
```

---

## SUCCESS METRICS

- ✅ Integration domain context loaded and understood
- ✅ Master architecture reviewed, module inventory extracted
- ✅ User selected source and target modules explicitly
- ✅ Both module architectures verified to exist
- ✅ Integration context extracted from both modules
- ✅ Contract scope identified
- ✅ Web research performed for current patterns
- ✅ User confirmed module selection

---

## FAILURE MODES

- ❌ **No master architecture:** Cannot proceed without module inventory
- ❌ **No module selection:** User must explicitly choose source and target
- ❌ **Missing module architecture:** Module not designed yet
- ❌ **Same source and target:** Cannot create self-referential contract
- ❌ **No integration need:** Modules don't have defined dependency

---

## Outputs

- Source module name and facade reference
- Target module name and dependency reference
- Contract scope (sync API, async events, shared types)
- Integration context from both modules
- QG-I1 applicability confirmation

**Note:** Full facade contract document created in later steps using:
`{project-root}/_bmad/bam/data/templates/facade-contract.md`

---

## NEXT STEP

Proceed to `step-02-c-analyze.md` with:
- Source module: `{source_name}` with facade `{FacadeName}`
- Target module: `{target_name}` with dependencies
- Contract scope: sync/async/events identified
- Integration domain context loaded

The analysis step will examine the specific operations and events required to fulfill the target module's dependencies.
