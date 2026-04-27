# Step 04: Select Architecture Patterns

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 NEVER select patterns without reviewing module boundaries from Step 03
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ CRITICAL: Match patterns to requirements and boundaries before recommending
- 📋 Document pattern selections with trade-offs and integration points
- 💬 Present recommendations with A/P/C menu for user confirmation
- 🌐 Use web search to verify current pattern best practices

---

## EXECUTION PROTOCOLS

- 🎯 Present pattern recommendations organized by category
- 💾 Record selections in output document for artifact generation
- 📖 Reference `bam-patterns.csv` for pattern decision criteria
- 📖 Reference `ai-runtimes.csv` for AI runtime selection
- 🚫 DO NOT proceed without explicit user confirmation via A/P/C
- ⚠️ Flag pattern conflicts or integration concerns
- 🔍 Use web search to verify patterns work well together

---

## CONTEXT BOUNDARIES

This step operates within these boundaries:

- **Input context:** Module boundaries from Step 03, tenant model from Step 02
- **Pattern registry:** `{project-root}/_bmad/bam/data/bam-patterns.csv`
- **AI runtimes:** `{project-root}/_bmad/bam/data/ai-runtimes.csv`
- **Output:** Selected patterns for master architecture document
- **Quality gate:** Patterns inform QG-F1 (Foundation Gate) checklist

---

## YOUR TASK

Analyze the module boundaries defined in Step 03 against the pattern registry. Select appropriate architecture patterns across four categories: architecture style, data access, event patterns, and AI integration. Present selections via A/P/C menu for user confirmation.

---

## Main Sequence

### 1. Load Pattern Resources

Read the pattern decision resources:

| Resource | Location | Purpose |
|----------|----------|---------|
| Pattern registry | `{project-root}/_bmad/bam/data/bam-patterns.csv` | Pattern categories, decision criteria, web queries |
| AI runtimes | `{project-root}/_bmad/bam/data/ai-runtimes.csv` | Runtime comparison, signals, complexity |

**Action:** Confirm resources loaded before evaluating patterns.

---

### 2. Extract Key Context from Prior Steps

Pull decision factors from gathered context:

| Factor | Source | Value |
|--------|--------|-------|
| Module Count | Step 03 | `{module_count}` |
| Module Boundaries | Step 03 | `{boundary_strategy}` |
| Cross-Module Dependencies | Step 03 | `{dependency_map}` |
| Tenant Model | Step 02 | `{tenant_model}` |
| AI Agent Count | Step 01 | `{ai_agents.count}` |
| AI Orchestration | Step 01 | `{ai_agents.orchestration}` |
| State Management | Step 01 | `{ai_agents.state_management}` |
| Team Experience | Step 01 | `{technical.team_experience}` |

**Present extracted context to confirm correct inputs loaded.**

---

### 3. Select Architecture Style Pattern

Evaluate architecture style based on module boundaries:

| Style | Signals | When to Use | Complexity |
|-------|---------|-------------|------------|
| Modular Monolith | <10 modules, single team, shared deployment | Starting point, cohesive domain | Low |
| Microservices | >10 modules, multiple teams, independent scaling | Scale-out, team autonomy | High |
| Hybrid | Mixed concerns, some modules need isolation | Gradual migration, specific isolation needs | Medium |

**Decision criteria from pattern registry:**

```
IF module_count < 10 AND team_size < 20:
  → Modular Monolith
  
IF module_count >= 10 OR team_autonomy == high:
  → Microservices
  
IF specific_modules_need_isolation AND rest_cohesive:
  → Hybrid (modular core + extracted services)
```

**Evaluate fit:**

```markdown
### Architecture Style Evaluation: {style_name}

**Signals Match:**
- [ ] Module count: {module_count} → {match/mismatch}
- [ ] Team structure: {team_size} → {match/mismatch}
- [ ] Deployment strategy: {deployment} → {match/mismatch}

**Complexity Assessment:**
- Style complexity: {low/medium/high}
- Team readiness: {appropriate/stretch/risky}

**Trade-offs:**
- Pro: {advantage}
- Con: {disadvantage}
```

---

### 4. Select Data Access Patterns

Choose data access patterns based on tenant model and module boundaries:

| Pattern | Signals | When to Use | Complexity |
|---------|---------|-------------|------------|
| Repository | CRUD-heavy, domain entities | Standard data access, testability | Low |
| Unit of Work | Multi-entity transactions, consistency | Complex transactions, rollback | Medium |
| CQRS | Read/write asymmetry, event sourcing | Separate read models, scaling reads | High |
| Event Sourcing | Full audit trail, temporal queries | Compliance, state reconstruction | High |

**Reference patterns from CSV:**

```
Filter: bam-patterns.csv → category: architecture
- repository: Standard data access pattern
- cqrs: Read/write separation with projections
- event-sourcing: Full event trail with replay
```

**Evaluate fit against tenant model:**

```markdown
### Data Access Evaluation

**Tenant Model Compatibility:**
- Selected tenant model: {tenant_model}
- Repository isolation: {isolation_strategy}
- Connection management: {pool/per-tenant}

**Pattern Selection:**
| Module | Pattern | Rationale |
|--------|---------|-----------|
| {core_module} | Repository | {rationale} |
| {billing_module} | Unit of Work | {rationale} |
| {audit_module} | Event Sourcing | {rationale} |

**Cross-Cutting Concerns:**
- Tenant context propagation: {strategy}
- Transaction boundaries: {approach}
- Query isolation: {RLS/schema/both}
```

---

### 5. Select Event Patterns

Choose event patterns for cross-module communication:

| Pattern | Signals | When to Use | Complexity |
|---------|---------|-------------|------------|
| Domain Events | Internal module communication | In-process events, loose coupling | Low |
| Integration Events | Cross-module boundaries | Async communication, eventual consistency | Medium |
| Event Sourcing | Full state reconstruction | Audit, compliance, replay | High |
| Saga Orchestration | Distributed transactions | Multi-step workflows, compensation | High |
| Saga Choreography | Loose coupling, event mesh | Decentralized coordination | Medium |

**Reference patterns from CSV:**

```
Filter: bam-patterns.csv → category: integration
- event-driven: Cross-module async communication
- saga-orchestration: State machine with compensation
- saga-choreography: Event-driven coordination
```

**Evaluate fit against module boundaries:**

```markdown
### Event Pattern Evaluation

**Cross-Module Communication Needs:**
- Module dependencies: {dependency_map}
- Sync vs async tolerance: {tolerance}
- Consistency requirements: {eventual/strong}

**Pattern Selection:**
| Boundary | Pattern | Rationale |
|----------|---------|-----------|
| Module A → B | Domain Events | {rationale} |
| Module B → External | Integration Events | {rationale} |
| Multi-module workflow | Saga Orchestration | {rationale} |

**Event Infrastructure:**
- Message broker: {broker_choice}
- Schema registry: {schema_strategy}
- Dead letter handling: {dlq_strategy}
```

---

### 6. Select AI Runtime Pattern

Choose AI runtime based on agent requirements:

| Runtime | Signals | When to Use | Complexity |
|---------|---------|-------------|------------|
| LangGraph | State machines, checkpointing | Complex workflows, human-in-loop | Medium-High |
| CrewAI | Role-based teams, delegation | Autonomous crews, task delegation | Medium |
| AutoGen | Multi-agent conversations | Research, debate, dynamic agents | Medium-High |
| Instructor | Structured outputs, validation | Pydantic models, type safety | Low-Medium |
| DSPy | Prompt optimization, compilation | Reproducible outputs, optimization | Medium |
| Custom | Specific requirements | Legacy integration, unique needs | High |

**Reference ai-runtimes.csv for detailed signals:**

```
Match requirements to runtime signals:
IF state_machine AND checkpointing:
  → LangGraph
  
IF role_based_teams AND delegation:
  → CrewAI
  
IF conversation_patterns AND dynamic_agents:
  → AutoGen
  
IF structured_outputs AND validation:
  → Instructor
```

**Evaluate fit against AI requirements:**

```markdown
### AI Runtime Evaluation

**Requirements Match:**
- Agent count: {ai_agents.count}
- Orchestration style: {ai_agents.orchestration}
- State management: {ai_agents.state_management}

**Runtime Evaluation:**
| Runtime | Signals Match | Complexity | Tenant Support | Fit |
|---------|---------------|------------|----------------|-----|
| LangGraph | {match%} | Medium-High | Tenant-scoped state | {fit} |
| CrewAI | {match%} | Medium | Custom implementation | {fit} |
| {other} | {match%} | {complexity} | {tenant_support} | {fit} |

**Selected Runtime: {runtime_name}**
- Primary rationale: {rationale}
- State management: {state_approach}
- Tenant isolation: {isolation_approach}
```

---

### 7. Verify Current Best Practices

Search for current pattern guidance:

Search the web: "modular monolith patterns {date}"
Search the web: "{selected_runtime} best practices {date}"
Search the web: "multi-tenant event-driven architecture {date}"
Search the web: "CQRS event sourcing SaaS patterns {date}"

_Source: [URL]_

**Incorporate findings into recommendations.**

---

### 8. Verify Pattern Compatibility

Ensure selected patterns work together:

```markdown
### Pattern Compatibility Matrix

| Pattern A | Pattern B | Compatibility | Integration Notes |
|-----------|-----------|---------------|-------------------|
| {arch_style} | {tenant_model} | {compatible/caution/conflict} | {notes} |
| {data_access} | {tenant_model} | {compatible/caution/conflict} | {notes} |
| {event_pattern} | {arch_style} | {compatible/caution/conflict} | {notes} |
| {ai_runtime} | {data_access} | {compatible/caution/conflict} | {notes} |

**Integration Points:**
1. {Integration point 1}: {how patterns connect}
2. {Integration point 2}: {how patterns connect}
3. {Integration point 3}: {how patterns connect}

**Potential Conflicts:**
- {Conflict 1}: {mitigation strategy}
- {Conflict 2}: {mitigation strategy}
```

---

### 9. Formulate Pattern Recommendations

Synthesize analysis into clear recommendations:

```markdown
## Pattern Recommendations

### Architecture Style: {STYLE_NAME}

**Rationale:**
Based on module boundaries from Step 03:
- Module count: {module_count}
- Team structure: {team_size}
- Deployment model: {deployment}

### Data Access Patterns

| Module Category | Pattern | Rationale |
|-----------------|---------|-----------|
| Core Domain | {pattern} | {rationale} |
| Transactional | {pattern} | {rationale} |
| Audit/Compliance | {pattern} | {rationale} |

### Event Patterns

| Communication Type | Pattern | Rationale |
|--------------------|---------|-----------|
| In-module | Domain Events | {rationale} |
| Cross-module | {pattern} | {rationale} |
| Workflow | {pattern} | {rationale} |

### AI Runtime: {RUNTIME_NAME}

**Rationale:**
Based on AI requirements from Step 01:
- Orchestration: {orchestration_style}
- State needs: {state_requirements}
- Human-in-loop: {human_in_loop}

### Trade-offs Accepted

| Trade-off | Impact | Mitigation |
|-----------|--------|------------|
| {trade_off_1} | {impact_1} | {mitigation_1} |
| {trade_off_2} | {impact_2} | {mitigation_2} |

### Rejected Alternatives

| Pattern | Why Rejected |
|---------|--------------|
| {alt_1} | {rejection_reason_1} |
| {alt_2} | {rejection_reason_2} |
```

---

### 10. Present for Confirmation

Display recommendations and await user decision via A/P/C menu.

---

## COLLABORATION MENUS (A/P/C):

After presenting recommendations:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into pattern trade-offs
- **P (Party Mode)**: Bring architect, dev, and devops perspectives
- **C (Continue)**: Accept patterns and proceed to documentation

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):

Invoke `bmad-advanced-elicitation` skill to explore:

- **Architecture depth:** Modular monolith vs microservices trade-offs
- **Data access nuances:** CQRS complexity vs simplicity trade-offs
- **Event pattern details:** Orchestration vs choreography implications
- **AI runtime specifics:** State management and scaling concerns
- **Pattern interactions:** How patterns affect each other

Pass context: gathered requirements, module boundaries, current recommendations.

**After processing enhanced insights, return to A/P/C menu.**

#### If 'P' (Party Mode):

Invoke `bmad-party-mode` skill with context:

```
Review pattern selections for {project_name}:
- Architecture: {arch_style}
- Data Access: {data_patterns}
- Events: {event_patterns}
- AI Runtime: {ai_runtime}
```

Gather perspectives from:

| Persona | Focus Area | Key Questions |
|---------|------------|---------------|
| Architect | Pattern coherence | Do patterns form a cohesive whole? |
| Developer | Implementation | Can team implement these patterns effectively? |
| DevOps | Operations | How do patterns affect deployment/monitoring? |
| Security | Safety | Do patterns support security requirements? |

Process multi-perspective analysis and synthesize into refined recommendations.

**After processing perspectives, return to A/P/C menu.**

#### If 'C' (Continue):

1. Record the decisions in output document:

```yaml
# Add to master-architecture.md frontmatter
patterns:
  architecture_style: {style_name}
  data_access:
    - module: {module_name}
      pattern: {pattern_name}
  event_patterns:
    in_module: domain-events
    cross_module: {pattern_name}
    workflow: {pattern_name}
  ai_runtime:
    selected: {runtime_name}
    state_management: {state_approach}
    tenant_isolation: {isolation_approach}
  decided_at: {timestamp}
```

2. Update workflow state:

```yaml
stepsCompleted:
  - step-01-c-context
  - step-02-c-model
  - step-03-c-boundaries
  - step-04-c-patterns  # Add this
currentStep: step-05-c-document
```

3. Proceed to NEXT STEP.

---

## SUCCESS METRICS

- ✅ Pattern registry loaded and consulted for decision criteria
- ✅ AI runtimes CSV consulted for runtime selection
- ✅ Web search performed for current pattern best practices
- ✅ Architecture style selected with rationale
- ✅ Data access patterns selected per module category
- ✅ Event patterns selected for communication types
- ✅ AI runtime selected with tenant isolation approach
- ✅ Pattern compatibility verified
- ✅ Trade-offs explicitly documented
- ✅ User confirmed selections via A/P/C menu

---

## FAILURE MODES

- ❌ Selecting patterns without reviewing module boundaries - patterns won't fit structure
- ❌ Ignoring tenant model from Step 02 - patterns may not support isolation
- ❌ Choosing AI runtime without matching signals - runtime won't fit requirements
- ❌ Missing pattern compatibility check - patterns may conflict at integration
- ❌ Not documenting trade-offs - stakeholders cannot assess decisions
- ❌ Proceeding without A/P/C confirmation - user not engaged in decisions
- ❌ Skipping web search - may miss current pattern best practices
- ❌ Over-engineering patterns for team capability - implementation risk

---

## NEXT STEP

After user confirms pattern selections with 'C':

1. Record all selected patterns in master architecture document
2. Proceed to `step-05-c-document.md` to generate the complete artifact
3. The selected patterns inform:
   - Master architecture document structure
   - Module architecture designs (subsequent workflow)
   - Quality gate QG-F1 checklist (pattern compliance criteria)

**Transition to Step 05 with:**
- Architecture style: `{arch_style}`
- Data access patterns: `{data_patterns_by_module}`
- Event patterns: `{event_patterns_by_type}`
- AI runtime: `{ai_runtime}` with `{tenant_isolation_approach}`

---

## Outputs

- Documentation draft created
- Design specifications completed
- Decision records updated

