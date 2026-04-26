# Step 2: Define Epic Scope

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 💬 **Present epic scope with A/P/C menu** for user confirmation
- 🚫 **FORBIDDEN to create individual stories** - That's Step 3

## EXECUTION PROTOCOLS

- 🎯 Focus: Define epic scope through feature decomposition and acceptance criteria
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Multi-tenant considerations for each epic
- 🚫 Do NOT: Proceed without explicit user confirmation via A/P/C
- 🔍 Use web search: Verify epic scope best practices for multi-tenant SaaS
- ⚠️ Gate: Epic scope must address tenant isolation requirements

---

## CONTEXT BOUNDARIES

### Input Context

- **From Step 01:** Module boundaries, epic categories, module architecture
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **Template:** `{project-root}/_bmad/bam/data/templates/module-epic.md`

### Output

- Epic list with feature decomposition
- Acceptance criteria per epic
- Multi-tenant considerations documented
- AI/Agent epic identification (if applicable)

### Quality Gate

- Epic scope aligns with module architecture
- All tenant isolation concerns addressed

---

## YOUR TASK

Define epic scope through feature decomposition. Identify acceptance criteria for each epic, document multi-tenant considerations, and identify any AI/agent-specific epics. Present the complete epic scope via A/P/C menu for user confirmation.

---

## Main Sequence

### Action 1: Feature Decomposition

Decompose module functionality into epic-sized features:

**EPIC DESIGN PRINCIPLES:**

1. **User-Value First**: Each epic must enable users to accomplish something meaningful
2. **Tenant Isolation**: Each epic must respect multi-tenant boundaries
3. **Incremental Delivery**: Each epic should deliver value independently
4. **Dependency-Free Within Epic**: Stories within an epic must NOT depend on future stories

| Epic ID | Epic Title | User Value | Category | Priority |
|---------|------------|------------|----------|----------|
| E-{module}-001 | {title} | {what users accomplish} | Core/Integration/Infrastructure | P1/P2/P3 |
| E-{module}-002 | {title} | {what users accomplish} | Core/Integration/Infrastructure | P1/P2/P3 |
| E-{module}-003 | {title} | {what users accomplish} | Core/Integration/Infrastructure | P1/P2/P3 |

**Feature Grouping:**

```markdown
## Feature Decomposition

### Core Features
- {Feature 1}: Maps to E-{module}-001
- {Feature 2}: Maps to E-{module}-002

### Integration Features
- {Feature 3}: Maps to E-{module}-003

### Infrastructure Features
- {Feature 4}: Maps to E-{module}-004
```

### Action 2: Define Acceptance Criteria

For each epic, define acceptance criteria:

```markdown
## Epic: E-{module}-001 - {Epic Title}

### User Value
{What users can accomplish after this epic is complete}

### Acceptance Criteria

**Functional:**
- [ ] AC-001: {Functional acceptance criterion}
- [ ] AC-002: {Functional acceptance criterion}
- [ ] AC-003: {Functional acceptance criterion}

**Non-Functional:**
- [ ] AC-NF-001: {Performance criterion}
- [ ] AC-NF-002: {Security criterion}
- [ ] AC-NF-003: {Scalability criterion}

**Tenant Isolation:**
- [ ] AC-TI-001: {Tenant isolation criterion}
- [ ] AC-TI-002: {Data isolation criterion}

### Definition of Done
- All acceptance criteria verified
- QG checks passed for epic scope
- Tenant isolation tested
- Documentation updated
```

### Action 3: Multi-Tenant Considerations

Document multi-tenant requirements per epic:

| Epic ID | Tenant Model Impact | Isolation Requirements | Cross-Tenant Risk |
|---------|---------------------|------------------------|-------------------|
| E-{module}-001 | {RLS/Schema/DB} | {Data isolation needs} | Low/Medium/High |
| E-{module}-002 | {RLS/Schema/DB} | {Data isolation needs} | Low/Medium/High |
| E-{module}-003 | {RLS/Schema/DB} | {Data isolation needs} | Low/Medium/High |

**Tenant-Specific Considerations:**

```markdown
## Multi-Tenant Requirements by Epic

### E-{module}-001: {Epic Title}

**Isolation Strategy:**
- Tenant model: {tenant_model}
- Data scope: {tenant-scoped/global}
- RLS policy required: YES/NO

**Cross-Tenant Safeguards:**
- [ ] All queries include tenant_id filter
- [ ] No cross-tenant data access possible
- [ ] Audit logging for tenant operations

**Tier Considerations:**
| Tier | Feature Availability | Rate Limits |
|------|---------------------|-------------|
| Free | {scope} | {limits} |
| Pro | {scope} | {limits} |
| Enterprise | {scope} | {limits} |
```

### Action 4: AI/Agent Epic Identification

If the module includes AI/agent capabilities, identify agent-specific epics:

| Epic ID | Agent Involvement | Agent Type | Tool Requirements |
|---------|-------------------|------------|-------------------|
| E-{module}-AI-001 | {description} | {agent_type} | {tools needed} |
| E-{module}-AI-002 | {description} | {agent_type} | {tools needed} |

**Agent Epic Considerations:**

```markdown
## AI/Agent Epics

### E-{module}-AI-001: {Epic Title}

**Agent Requirements:**
- Agent type: {ai_runtime} agent
- LLM dependency: {model requirements}
- Tool registry: {tools to register}

**Agent Tenant Isolation:**
- [ ] Agent operations tenant-scoped
- [ ] Memory isolated per tenant
- [ ] Tool permissions per tenant

**Quality Gate:**
- QG-M3 (Agent Runtime) criteria apply
```

### Action 5: Epic Dependency Mapping

Map dependencies between epics:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Epic Dependency Graph                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   E-{module}-001 (Core)                                         │
│        │                                                        │
│        ▼                                                        │
│   E-{module}-002 (Core) ──────► E-{module}-003 (Integration)   │
│        │                                                        │
│        ▼                                                        │
│   E-{module}-AI-001 (Agent)                                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

| Epic | Depends On | Enables | Parallel With |
|------|------------|---------|---------------|
| E-{module}-001 | None | E-{module}-002 | E-{module}-004 |
| E-{module}-002 | E-{module}-001 | E-{module}-003 | None |
| E-{module}-003 | E-{module}-002 | Production | None |

### Action 6: Web Research Verification

**Verify current best practices with web search:**

Search the web: "epic acceptance criteria multi-tenant SaaS {date}"
Search the web: "feature decomposition best practices {date}"
Search the web: "AI agent epic planning {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

After presenting epic scope:

```
================================================================================
EPIC SCOPE DEFINITION COMPLETE
================================================================================

MODULE: {module_name}
EPICS DEFINED: {epic_count}
  - Core: {core_count}
  - Integration: {integration_count}
  - Infrastructure: {infrastructure_count}
  - AI/Agent: {agent_count}

MULTI-TENANT: {tenant_model} considerations documented
DEPENDENCIES: {dependency_count} mapped

================================================================================
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific epics or acceptance criteria
- **P (Party Mode)**: Gather Product Owner and Tech Lead perspectives
- **C (Continue)**: Accept epic scope and proceed to story creation

Select an option:
================================================================================
```

### If 'A' (Advanced Elicitation)

Invoke `bmad-advanced-elicitation` skill to explore:

| Topic | Questions to Explore |
|-------|---------------------|
| **Epic Granularity** | Are epics too large or too small? |
| **Acceptance Criteria** | Are criteria testable and measurable? |
| **Tenant Isolation** | Are all isolation concerns addressed? |
| **Agent Requirements** | Are agent epics properly scoped? |
| **Dependencies** | Are dependencies correctly identified? |

Pass context: Epic scope, module architecture, tenant model, specific concerns.

**After processing enhanced insights, return to A/P/C menu.**

### If 'P' (Party Mode)

Invoke `bmad-party-mode` skill with context:

```
Review epic scope for module {module_name}:
- Epics: {epic_count}
- Categories: Core ({core}), Integration ({int}), Infrastructure ({infra}), AI ({ai})
- Tenant Model: {tenant_model}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| **Product Owner** | User value | Do epics deliver meaningful user outcomes? |
| **Tech Lead** | Architecture | Are epics aligned with module boundaries? |
| **QA Lead** | Testability | Are acceptance criteria testable? |
| **Security** | Isolation | Are tenant boundaries respected? |

Process multi-perspective analysis and synthesize into refined scope.

**After processing perspectives, return to A/P/C menu.**

### If 'C' (Continue)

1. Record the epic scope in working document:

```yaml
# Add to module epics document
epics:
  module: {module_name}
  count: {epic_count}
  categories:
    core: {core_count}
    integration: {integration_count}
    infrastructure: {infrastructure_count}
    ai_agent: {agent_count}
  tenant_model: {tenant_model}
  epic_list:
    - id: E-{module}-001
      title: {title}
      category: core
      priority: P1
      acceptance_criteria: [{criteria}]
scope_completed_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-start
  - step-02-c-analyze  # Add this
currentStep: step-03-c-design
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ All features decomposed into epics
- ✅ Acceptance criteria defined for each epic
- ✅ Multi-tenant considerations documented
- ✅ AI/Agent epics identified (if applicable)
- ✅ Epic dependencies mapped
- ✅ Web research completed
- ✅ User confirmed epic scope via A/P/C menu

---

## FAILURE MODES

- ❌ **Epics organized by technical layers:** Reorganize around user value
- ❌ **Missing tenant isolation:** Add tenant considerations to each epic
- ❌ **Vague acceptance criteria:** Make criteria specific and testable
- ❌ **Dependencies not mapped:** Document all epic relationships
- ❌ **Proceeding without A/P/C:** User not engaged in epic scope decisions

---

## Verification

- [ ] Feature decomposition complete
- [ ] Acceptance criteria defined
- [ ] Multi-tenant considerations documented
- [ ] AI/Agent epics identified
- [ ] Dependencies mapped
- [ ] Web research completed
- [ ] Patterns align with pattern registry

---

## Outputs

- Epic list with feature decomposition
- Acceptance criteria per epic
- Multi-tenant requirements
- Dependency mapping
- Web research findings

---

## NEXT STEP

After user confirms epic scope with 'C':

1. Record the epic scope in working document
2. Proceed to `step-03-c-design.md` to create user stories for each epic
3. The epic scope informs:
   - Story decomposition
   - Sprint allocation
   - Quality gate requirements

**Transition to Step 03 with:**
- Epic list: `{epic_count}` epics defined
- Categories: Core, Integration, Infrastructure, AI/Agent
- Tenant model: `{tenant_model}`
