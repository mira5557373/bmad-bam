# Step 04: Define Implementation Phases

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📅 **ENSURE phases are achievable** - Validate against team capacity

## EXECUTION PROTOCOLS

- 🎯 Focus: Define implementation phases with milestones
- 💾 Track: `stepsCompleted: [1, 2, 3, 4]` when complete
- 📖 Context: Use prioritized modules from Step 03
- 🚫 Do NOT: Generate final report (that's Step 05)
- 🔍 Use web search: Verify phase planning strategies against industry practices
- ⚠️ Gate: QG-PL1 - Phases must align with quality gate requirements

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Grouping modules into implementation phases
- Defining phase milestones and deliverables
- Identifying parallel workstreams
- Planning go-live sequence

**OUT OF SCOPE:**
- Generating final triage report (Step 05)
- Detailed sprint planning
- Individual task breakdown

---

## Purpose

Define implementation phases that group prioritized modules into logical, achievable phases with clear milestones. Identify parallel workstreams and plan the go-live sequence.

---

## Prerequisites

- Step 03 completed: Modules prioritized with timeline estimates
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: phases
- **Load patterns:** `{project-root}/_bmad/bam/data/quality-gates.csv` → for gate alignment

---

## Inputs

- Prioritized module list from Step 03
- Timeline estimates and dependencies
- Quality gate requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Group modules into phases, define milestones, and plan the go-live sequence.

---

## Main Sequence

### 1. Phase Grouping Strategy

Select phase grouping approach based on project constraints:

| Strategy | Best For | Phase Boundaries |
|----------|----------|------------------|
| **Dependency-Based** | Complex dependencies | Each phase clears a dependency level |
| **Capability-Based** | User-facing features | Each phase delivers complete capability |
| **Risk-Based** | High uncertainty | Each phase reduces cumulative risk |
| **Time-Boxed** | Fixed deadlines | Each phase fits fixed duration |

**Selected Strategy:** {{strategy}}

**Rationale:** {{rationale}}

### 2. Phase Definition

Define implementation phases:

#### Phase 1: Foundation

| Module | Priority | Est. Duration | Quality Gates | Deliverables |
|--------|----------|---------------|---------------|--------------|
| {{module}} | 1 | {{weeks}} weeks | QG-F1 | {{deliverable}} |

**Phase 1 Milestone:** {{milestone_description}}
**Phase 1 Duration:** {{total_weeks}} weeks
**Phase 1 Exit Criteria:**
- [ ] All QG-F1 checks pass
- [ ] Foundation modules deployed
- [ ] Integration points verified

#### Phase 2: Core Modules

| Module | Priority | Est. Duration | Quality Gates | Deliverables |
|--------|----------|---------------|---------------|--------------|
| {{module}} | {{n}} | {{weeks}} weeks | QG-M1, QG-M2 | {{deliverable}} |

**Phase 2 Milestone:** {{milestone_description}}
**Phase 2 Duration:** {{total_weeks}} weeks
**Phase 2 Exit Criteria:**
- [ ] All QG-M1 checks pass
- [ ] QG-M2 tenant isolation verified
- [ ] Core modules functional

#### Phase 3: Integration

| Module | Priority | Est. Duration | Quality Gates | Deliverables |
|--------|----------|---------------|---------------|--------------|
| {{module}} | {{n}} | {{weeks}} weeks | QG-I1, QG-I2, QG-I3 | {{deliverable}} |

**Phase 3 Milestone:** {{milestone_description}}
**Phase 3 Duration:** {{total_weeks}} weeks
**Phase 3 Exit Criteria:**
- [ ] All QG-I1 convergence checks pass
- [ ] QG-I2 tenant safety verified
- [ ] QG-I3 agent safety verified

#### Phase 4: Production Readiness

| Module | Priority | Est. Duration | Quality Gates | Deliverables |
|--------|----------|---------------|---------------|--------------|
| {{module}} | {{n}} | {{weeks}} weeks | QG-P1 | {{deliverable}} |

**Phase 4 Milestone:** {{milestone_description}}
**Phase 4 Duration:** {{total_weeks}} weeks
**Phase 4 Exit Criteria:**
- [ ] QG-P1 production readiness verified
- [ ] All monitoring in place
- [ ] Runbooks complete

### 3. Parallel Workstream Identification

Identify modules that can be developed in parallel:

| Workstream | Modules | Team | Duration | Dependencies |
|------------|---------|------|----------|--------------|
| Platform | {{modules}} | {{team}} | {{weeks}} | None |
| Core Business | {{modules}} | {{team}} | {{weeks}} | Platform |
| AI Runtime | {{modules}} | {{team}} | {{weeks}} | Platform |
| Integration | {{modules}} | {{team}} | {{weeks}} | Core + AI |

**Parallel Execution Gantt:**

```
Week:    1  2  3  4  5  6  7  8  9  10 11 12
Platform [========]
Core     [--][========]
AI       [--][========]
Integ              [---][========]
Prod                          [---][=====]
```

### 4. Go-Live Sequence

Define the sequence of go-live events:

| Go-Live Event | Phase | Modules Included | Date Target | Rollback Plan |
|---------------|-------|------------------|-------------|---------------|
| Alpha | Phase 1 | Foundation | Week {{n}} | Full rollback |
| Beta | Phase 2 | + Core Modules | Week {{n}} | Module rollback |
| GA | Phase 3 | + Integration | Week {{n}} | Staged rollback |
| Full | Phase 4 | Complete System | Week {{n}} | Blue-green |

**Go-Live Strategy:** {{strategy}}

### 5. Risk Mitigation by Phase

| Phase | Primary Risks | Mitigation | Contingency |
|-------|---------------|------------|-------------|
| Phase 1 | {{risk}} | {{mitigation}} | {{contingency}} |
| Phase 2 | {{risk}} | {{mitigation}} | {{contingency}} |
| Phase 3 | {{risk}} | {{mitigation}} | {{contingency}} |
| Phase 4 | {{risk}} | {{mitigation}} | {{contingency}} |

---

## COLLABORATION MENUS (A/P/C):

After completing phase definition, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific phase planning
- **P (Party Mode)**: Bring PM, DevOps, and Tech Lead perspectives
- **C (Continue)**: Accept phases and proceed to compile report
- **[Phase adjustment]**: Describe specific phase changes

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: phase definitions, parallel workstreams, go-live sequence
- Process enhanced insights on phasing
- Ask user: "Accept this refined phase plan? (y/n)"
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review implementation phases: {summary}"
- Process PM, DevOps, and Tech Lead perspectives
- Present synthesized phase recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document phase definitions
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-complete.md`

---

## SUCCESS METRICS:

- [ ] All modules assigned to phases
- [ ] Phase milestones clearly defined
- [ ] Exit criteria specified for each phase
- [ ] Parallel workstreams identified
- [ ] Go-live sequence planned
- [ ] Risk mitigation documented

---

## FAILURE MODES:

| Failure | Detection | Recovery |
|---------|-----------|----------|
| Phase overload | Phase duration exceeds capacity | Split phase or reduce scope |
| Missing dependencies | Dependent module in earlier phase | Resequence phases |
| Resource conflicts | Same team in parallel workstreams | Stagger workstreams |

---

## Verification

- [ ] Phases align with quality gates
- [ ] Dependencies respected across phases
- [ ] Parallel workstreams feasible
- [ ] Go-live sequence realistic
- [ ] Risk mitigation adequate

---

## Outputs

- Phase definition documents
- Parallel workstream plan
- Go-live sequence
- Phase-wise risk assessment

---

## Next Step

Proceed to `step-05-c-complete.md` to compile the final triage report.
