# Step 2: Design Migration Strategy

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Choose the appropriate migration strategy (big bang, phased, dual-write) based on the scope assessment and design the execution approach.

---

## Prerequisites

- Step 1: Assess Migration Scope completed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Evaluate Strategy Options

Compare available migration strategies based on scope assessment:

| Strategy | Downtime | Complexity | Data Consistency | Best For |
|----------|----------|------------|------------------|----------|
| Big Bang | Hours | Low | Strong | Small tenants, maintenance windows |
| Phased | Minutes per phase | Medium | Eventual | Large data volumes, minimal downtime |
| Dual-Write | Zero | High | Eventual | Critical tenants, zero downtime requirement |

### 2. Select Primary Strategy

Based on constraints from Step 1, select the migration strategy:

**Big Bang Migration:**
- Complete migration in single maintenance window
- All-or-nothing approach
- Simplest rollback (restore from backup)
- Requires downtime acceptance

**Phased Migration:**
- Migrate data in logical phases
- Each phase independently verifiable
- Partial service during migration
- Requires careful dependency ordering

**Dual-Write Migration:**
- Write to both source and target simultaneously
- Gradual traffic shift
- Zero downtime
- Highest complexity, requires synchronization

### 3. Design Migration Phases

Define the migration phases based on selected strategy:

| Phase | Components | Duration | Rollback Point |
|-------|------------|----------|----------------|
| 0 | Pre-migration validation | 1 hour | Full rollback |
| 1 | Tenant configuration | 15 minutes | Delete target config |
| 2 | User accounts and permissions | 30 minutes | Delete target users |
| 3 | Agent configurations | 15 minutes | Delete target agents |
| 4 | Historical data (conversations, logs) | Variable | Skip or re-sync |
| 5 | Vector embeddings | Variable | Re-generate |
| 6 | File attachments | Variable | Re-sync |
| 7 | Traffic cutover | 5 minutes | Revert routing |
| 8 | Cleanup source | Post-validation | None |

### 4. Define Synchronization Approach

For phased or dual-write strategies, define synchronization:

| Sync Method | Description | Use Case |
|-------------|-------------|----------|
| Snapshot + CDC | Initial snapshot with change data capture | Large historical data |
| Event Replay | Replay events from source to target | Event-sourced systems |
| API Sync | Synchronize via API calls | External system integration |
| Direct Copy | Database-level copy | Same isolation model |

### 5. Design Verification Checkpoints

Define verification at each phase:

| Checkpoint | Verification Method | Success Criteria |
|------------|---------------------|------------------|
| Data Integrity | Hash comparison | Checksums match |
| Record Count | Count validation | Counts within tolerance |
| Referential Integrity | FK validation | No orphaned records |
| Functional Test | API smoke tests | All endpoints respond |
| User Acceptance | Sample user test | Core workflows pass |

## Soft Gate Checkpoint

**Steps 1-2 complete the migration strategy design.**

Present summary of:
- Selected migration strategy (big bang, phased, or dual-write) with rationale
- Migration phases with duration estimates and rollback points
- Synchronization approach and verification checkpoints

Ask for confirmation before proceeding to runbook creation.

---

**Verify current best practices with web search:**
Search the web: "design migration strategy best practices {date}"
Search the web: "design migration strategy enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the strategy design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into strategy trade-offs and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for strategy review
- **C (Continue)**: Accept strategy design and proceed to runbook creation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass strategy context: selected approach, phases, verification checkpoints
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into strategy design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review migration strategy design: {summary of strategy and phases}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save strategy design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-create-migration-runbook.md`

---

## Verification

- [ ] Migration strategy selected with rationale
- [ ] Phases defined with durations
- [ ] Rollback points identified for each phase
- [ ] Synchronization approach defined
- [ ] Verification checkpoints specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Migration strategy document
- Phase breakdown with dependencies
- Synchronization design

---

## Next Step

Proceed to `step-03-c-create-migration-runbook.md` to create detailed execution procedures.
