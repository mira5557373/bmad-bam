# Step 03: Prioritize Modules

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔗 **RESPECT dependencies** - Never schedule dependent module before dependency

## EXECUTION PROTOCOLS

- 🎯 Focus: Prioritize modules using risk-based ordering
- 💾 Track: `stepsCompleted: [1, 2, 3]` when complete
- 📖 Context: Use complexity scores from Step 02
- 🚫 Do NOT: Define implementation phases (that's Step 04)
- 🔍 Use web search: Verify prioritization strategies against best practices
- ⚠️ Gate: QG-PL1 - Prioritization must respect dependencies and risk

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Risk-based module prioritization
- Dependency-aware ordering
- Resource allocation recommendations
- Timeline estimation per module

**OUT OF SCOPE:**
- Defining implementation phases (Step 04)
- Generating triage report (Step 05)
- Detailed sprint planning

---

## Purpose

Prioritize modules using a risk-based approach that balances complexity, business criticality, and dependencies. Produce a recommended implementation order with resource allocation and timeline estimates.

---

## Prerequisites

- Step 02 completed: All modules scored
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: prioritization
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv` → for gate requirements

---

## Inputs

- Complexity scores from Step 02
- Module dependencies (from requirements or master architecture)
- Team capacity information (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Create a prioritized module list with dependency awareness and resource allocation.

---

## Main Sequence

### 1. Build Dependency Graph

Map module dependencies to establish ordering constraints:

| Module | Depends On | Blocks | Dependency Level |
|--------|------------|--------|------------------|
| {{module}} | {{dependencies}} | {{blocked_by}} | L0/L1/L2/L3 |

**Dependency Levels:**
- **L0**: No dependencies - can start immediately
- **L1**: Depends on L0 modules only
- **L2**: Depends on L1 modules
- **L3**: Complex multi-level dependencies

### 2. Calculate Priority Score

Combine complexity and business criticality with dependency level:

```
Priority Score = (Business Criticality * 0.4) + (Technical Risk * 0.3) + (Dependency Urgency * 0.3)
```

Where:
- **Business Criticality**: From Step 02 (scale 1-10)
- **Technical Risk**: Inverse of technical complexity confidence
- **Dependency Urgency**: Number of modules blocked by this module

| Module | Business | Risk | Blocks Count | **Priority Score** |
|--------|----------|------|--------------|-------------------|
| {{module}} | {{bc}} | {{risk}} | {{blocks}} | **{{priority}}** |

### 3. Risk-Based Prioritization

Apply risk-based ordering strategy:

| Strategy | When to Apply | Effect |
|----------|---------------|--------|
| **Fail Fast** | High uncertainty | Prioritize highest-risk modules first |
| **Quick Wins** | Need momentum | Prioritize low-complexity, high-impact first |
| **Foundation First** | Dependencies critical | Prioritize L0 modules first |
| **Revenue First** | Time pressure | Prioritize revenue-generating modules |

**Selected Strategy:** {{strategy}}

**Rationale:** {{rationale}}

### 4. Generate Priority Order

Apply selected strategy to produce ordered list:

| Priority | Module | Dependency Level | Composite Score | Est. Duration | Risk Level |
|----------|--------|------------------|-----------------|---------------|------------|
| 1 | {{module}} | L{{n}} | {{score}} | {{weeks}} weeks | High/Med/Low |
| 2 | {{module}} | L{{n}} | {{score}} | {{weeks}} weeks | High/Med/Low |
| ... | ... | ... | ... | ... | ... |

### 5. Resource Allocation Recommendations

Based on complexity and dependencies, recommend team allocation:

| Module | Recommended Team Size | Key Roles | Skills Required |
|--------|----------------------|-----------|-----------------|
| {{module}} | {{size}} | {{roles}} | {{skills}} |

**Total Resource Requirement:**
- Minimum team: {{min}} engineers
- Optimal team: {{optimal}} engineers
- Duration impact: {{duration_range}}

### 6. Timeline Estimation

Estimate implementation timeline based on priority order:

| Module | Start After | Est. Duration | Dependencies Clear | Go-Live Ready |
|--------|-------------|---------------|-------------------|---------------|
| {{module}} | {{start}} | {{duration}} | {{deps_date}} | {{go_live}} |

**Critical Path:** {{module_a}} -> {{module_b}} -> {{module_c}}

**Total Estimated Duration:** {{total_weeks}} weeks

---

## COLLABORATION MENUS (A/P/C):

After completing prioritization, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into prioritization rationale
- **P (Party Mode)**: Bring PM and Tech Lead perspectives on ordering
- **C (Continue)**: Accept prioritization and proceed to phase definition
- **[Adjustment]**: Describe specific priority adjustments

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: priority order, dependency graph, timeline
- Process enhanced insights on sequencing
- Ask user: "Accept this refined prioritization? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module prioritization: {summary}"
- Process Product Manager and Tech Lead perspectives
- Present synthesized ordering recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document prioritized module list
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## SUCCESS METRICS:

- [ ] All modules assigned priority ranking
- [ ] Dependencies respected in ordering
- [ ] Resource allocation recommendations provided
- [ ] Timeline estimates reasonable
- [ ] Risk levels assigned to each module
- [ ] Critical path identified

---

## FAILURE MODES:

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Circular dependency | Dependency graph cycles | Break cycle with user input |
| Resource overload | Timeline > capacity | Adjust team size or scope |
| Missing dependencies | Module blocks unknown | Request dependency clarification |

---

## Verification

- [ ] Priority order respects dependencies
- [ ] No circular dependencies exist
- [ ] Resource recommendations are realistic
- [ ] Timeline estimates align with capacity
- [ ] Risk assessment complete

---

## Outputs

- Prioritized module list with rankings
- Dependency graph visualization
- Resource allocation recommendations
- Timeline estimation with critical path

---

## Next Step

Proceed to `step-04-c-document.md` to define implementation phases.
