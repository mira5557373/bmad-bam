# Step 01: Initialize Convergence Verification

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize convergence verification scope
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load all module architectures and facade contracts
- 🚫 Do NOT: Execute validation checks (that's Steps 02-04)
- 🔍 Use web search: Verify integration patterns against current best practices
- ⚠️ Gate: QG-I1, QG-I2, QG-I3 - All must pass for convergence

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading all module architectures and facade contracts
- Establishing the convergence verification scope
- Identifying all cross-module integration points

**OUT OF SCOPE:**
- Executing validation checks (Step 02-04)
- Making PASS/FAIL decisions (Step 05)
- Applying remediation actions

---

## Purpose

Initialize convergence verification by loading all module architectures, facade contracts, and establishing the integration verification scope. This step gathers all artifacts required for cross-module convergence analysis governed by QG-I1, QG-I2, and QG-I3 quality gates.

---

## Prerequisites

- All modules have passed QG-M1, QG-M2, QG-M3 gates
- Facade contracts defined for all cross-module interfaces
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: convergence
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i1.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i2.md`
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3.md`

---

## Inputs

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Module architectures: `{output_folder}/planning-artifacts/modules/*/architecture.md`
- Facade contracts: `{output_folder}/planning-artifacts/facades/*.md`
- Event schemas: `{output_folder}/planning-artifacts/events/*.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load all required artifacts and establish the convergence verification scope.

---

## Main Sequence

### 1. Load Master Architecture

Load and parse the master architecture document:

```
{output_folder}/planning-artifacts/architecture/master-architecture.md
```

Extract:
- Module catalog (names, owners, versions)
- Tenant isolation model
- AI runtime configuration
- Global architectural constraints

If master architecture does not exist, inform user and halt workflow.

### 2. Load All Module Architectures

For each module in the master architecture:

| Module | Architecture Path | Status |
|--------|-------------------|--------|
| {{module_name}} | `modules/{{module}}/architecture.md` | Loaded/Missing |

Track loading status for each module. Missing architectures are blocking.

### 3. Load Facade Contracts

Load all published facade contracts:

| Provider Module | Consumer Module | Contract Path | Version |
|-----------------|-----------------|---------------|---------|
| {{provider}} | {{consumer}} | `facades/{{contract}}.md` | {{version}} |

Verify each facade has:
- TenantContext as first parameter
- DTO return types (no domain entity leakage)
- Versioned contract definition

### 4. Build Integration Point Matrix

Create a matrix of all cross-module integration points:

| Source Module | Target Module | Integration Type | Artifact |
|---------------|---------------|------------------|----------|
| {{source}} | {{target}} | Facade / Event / Shared Kernel | {{ref}} |

### 5. Identify Verification Scope

Define the scope for convergence verification:

**Modules in Scope:** {{count}} modules
**Facade Contracts:** {{count}} contracts
**Event Schemas:** {{count}} events
**Cross-Module Journeys:** {{count}} journeys

### 6. Load Quality Gate Checklists

Load all three quality gate checklists:

- **QG-I1 (Convergence):** Cross-module integration stability
- **QG-I2 (Tenant Safety):** Tenant isolation across boundaries
- **QG-I3 (Agent Safety):** Agent isolation and tool boundaries

---

## SUCCESS METRICS:

- [ ] Master architecture loaded successfully
- [ ] All module architectures loaded (100%)
- [ ] All facade contracts loaded and parsed
- [ ] Integration point matrix complete
- [ ] Quality gate checklists loaded
- [ ] Verification scope established

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Master architecture missing | Create master architecture first |
| Module architecture missing | Complete module architecture for missing modules |
| Facade contract missing | Run facade-contract workflow for missing contracts |
| No integration points found | Verify module design includes cross-module interactions |

---

## Verification

- [ ] Master architecture document loaded
- [ ] All module architectures present and loaded
- [ ] All facade contracts loaded
- [ ] Integration point matrix documented
- [ ] Quality gate checklists ready

---

## Outputs

- List of loaded module architectures
- Integration point matrix
- Verification scope summary
- Loaded quality gate checklists

---

## NEXT STEP:

Proceed to `step-02-c-analyze.md` to analyze cross-module integration points and begin convergence verification.
