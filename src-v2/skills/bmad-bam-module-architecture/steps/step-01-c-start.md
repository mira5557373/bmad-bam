# Step 1: Select Target Module and Gather Requirements

## MANDATORY EXECUTION RULES

- 🛑 NEVER design a module without loading master architecture first
- 📖 ALWAYS read master architecture to understand available modules
- 🔄 ALWAYS gather module-specific requirements before proceeding
- ✅ PRESENT module selection menu with bounded context descriptions
- 📋 CONFIRM target module selection and requirements before analysis
- 💬 PAUSE after module is selected for user confirmation
- 🌐 USE web search to verify current modular monolith best practices

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Select target module and gather module-specific requirements
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load master architecture and integration domain first
- 🚫 Do NOT: Skip module selection or proceed without explicit choice
- ⚠️ Gate: QG-M1 (Module Architecture Gate) governs this workflow
- 🔍 Use web search: Verify modular monolith patterns against current best practices

---

## CONTEXT BOUNDARIES

### Primary Domain

- **Integration Domain:** `{project-root}/_bmad/bam/data/domains/integration.md`
- Contains: Facade contract pattern, integration boundaries, convergence verification

### Required Artifacts

- **Master Architecture:** `{output_folder}/planning-artifacts/master-architecture.md`
- Contains: Module inventory, bounded contexts, tenant model, deployment architecture

### Pattern Registry

- **Facade Pattern:** `{project-root}/_bmad/bam/data/patterns/facade.md`
- Contains: Module boundary patterns, contract definition, trade-offs

- **Modular Monolith Pattern:** `{project-root}/_bmad/bam/data/patterns/modular-monolith.md`
- Contains: Module decomposition, boundary rules, coupling guidelines

---

## YOUR TASK

Select the target module from master architecture's module inventory and gather requirements specific to that module. Each module has a bounded context with defined responsibilities, entities, and integration points. This workflow designs the internal architecture of ONE module at a time.

---

## Prerequisites

- [ ] Master architecture document exists with module inventory
- [ ] Bounded contexts defined for each module
- [ ] Tenant model selected (RLS, schema, database, hybrid)
- [ ] Integration patterns identified at master architecture level

---

## Main Sequence

### Action 1: Load Integration Domain Context

**Read and internalize:**

```
{project-root}/_bmad/bam/data/domains/integration.md
```

Key concepts to understand:
- Facade contract pattern
- Integration boundaries (module-to-module, service-to-service, external)
- Convergence verification requirements
- Tenant context propagation across module boundaries

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

### Action 3: Present Module Selection Menu

**Display the module inventory from master architecture:**

```
Available Modules for Architecture Design:

┌─────┬──────────────────┬────────────────────────────────────┬──────────┐
│ #   │ Module Name      │ Bounded Context                    │ Status   │
├─────┼──────────────────┼────────────────────────────────────┼──────────┤
│ 1   │ {module_1}       │ {bounded_context_1}                │ Pending  │
│ 2   │ {module_2}       │ {bounded_context_2}                │ Pending  │
│ ... │ ...              │ ...                                │ ...      │
└─────┴──────────────────┴────────────────────────────────────┴──────────┘

Enter module number to design, or 'A' to see all module details:
```

Wait for user selection.

### Action 4: Load Module Bounded Context

**After user selects a module, extract from master architecture:**

| Attribute | Value |
|-----------|-------|
| Module Name | {selected_module} |
| Bounded Context | {context_description} |
| Core Entities | {list of primary entities} |
| Key Aggregates | {aggregate roots} |
| Dependencies | {modules this module depends on} |
| Dependents | {modules that depend on this module} |
| Events Published | {outbound events} |
| Events Consumed | {inbound events} |

### Action 5: Gather Module-Specific Requirements

**Present requirements questionnaire:**

```markdown
## Module-Specific Requirements for: {selected_module}

### Responsibility Questions

1. **Single Responsibility:** What is the ONE core responsibility of this module?
   - [ ] {user input}

2. **Business Domain:** What business subdomain does this module represent?
   - [ ] {user input}

### Complexity Assessment

3. **Entity Count:** How many domain entities belong to this module?
   - [ ] 1-5 (Simple) | 6-15 (Medium) | 16+ (Complex)

4. **External Integrations:** How many external systems does this module integrate with?
   - [ ] 0 (None) | 1-2 (Low) | 3+ (High)

5. **Event Volume:** Expected event throughput for this module?
   - [ ] Low (<100/min) | Medium (100-1000/min) | High (>1000/min)

### Tenant Requirements

6. **Tenant-Specific Behavior:** Does this module have tier-specific behavior?
   - [ ] No | Yes, feature flags | Yes, different implementations

7. **Data Sensitivity:** How sensitive is the data in this module?
   - [ ] Low (public) | Medium (internal) | High (PII/financial)

### Integration Requirements

8. **Facade Consumers:** Which modules will consume this module's facade?
   - [ ] {list of consuming modules}

9. **Facade Dependencies:** Which module facades does this module depend on?
   - [ ] {list of required facades}
```

### Action 6: Web Research Verification

**Verify current best practices with web search:**

Search the web: "modular monolith module design patterns {date}"
Search the web: "bounded context module architecture {date}"
Search the web: "facade pattern module boundaries SaaS {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Step 1 complete: Module selection and requirements gathered.**

Present summary and ask for confirmation:

```
Module Architecture Setup Summary:

Selected Module: {module_name}
Bounded Context: {context_description}
Complexity: {simple/medium/complex}
Tenant Behavior: {none/flags/implementations}
Dependencies: {count} modules
Dependents: {count} modules

Requirements captured:
✓ Single responsibility defined
✓ Entity count assessed
✓ Integration points identified
✓ Tenant requirements documented

Ready to proceed to analysis? (y/n)
```

---

## SUCCESS METRICS

- ✅ Integration domain context loaded and understood
- ✅ Master architecture reviewed, module inventory extracted
- ✅ User selected target module explicitly
- ✅ Bounded context loaded for selected module
- ✅ Module-specific requirements gathered
- ✅ Web research performed for current patterns
- ✅ User confirmed module selection and requirements

---

## FAILURE MODES

- ❌ **No master architecture:** Cannot proceed without module inventory
- ❌ **No module selection:** User must explicitly choose a module
- ❌ **Missing bounded context:** Module not properly defined in master architecture
- ❌ **Incomplete requirements:** All 9 requirement questions must be addressed
- ❌ **Unidentified dependencies:** Must know which facades are consumed/provided

---

## Outputs

- Selected module name and bounded context
- Module complexity assessment (simple/medium/complex)
- Module-specific requirements (9 questions answered)
- Dependencies and dependents list
- Tenant behavior requirements

**Note:** Full module architecture document created in later steps using:
`{project-root}/_bmad/bam/data/templates/module-architecture.md`

---

## NEXT STEP

Proceed to `step-02-c-analyze.md` with:
- Selected module and bounded context
- Module requirements (responsibility, complexity, tenant behavior)
- Dependency list (consumed and provided facades)
- Integration context from domain file

The analysis step will define module responsibilities in detail and identify entities, aggregates, and facade contract needs.
