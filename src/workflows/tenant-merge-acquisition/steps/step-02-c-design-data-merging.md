# Step 2: Design Data Merging

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Design the data merging procedures for tenant consolidation, including data migration pipelines, transformation rules, and integrity verification.

---

## Prerequisites

- Step 1 completed: Merge scenario analysis
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Data Migration Pipeline

Define the data merging pipeline:

| Phase | Action | Source | Target | Duration |
|-------|--------|--------|--------|----------|
| 1. Pre-flight | Validate both tenants | Both | - | <5min |
| 2. Snapshot | Create backup of both | Both | Archive | 10-60min |
| 3. User merge | Consolidate user accounts | Source | Target | 5-30min |
| 4. Data transform | Apply transformation rules | Source | Staging | 30-120min |
| 5. Data migrate | Move transformed data | Staging | Target | 30-120min |
| 6. Reference update | Update cross-references | Target | Target | 10-30min |
| 7. Integration relink | Reconnect integrations | Both | Target | 15-30min |
| 8. Verify | Integrity verification | Target | Report | 15-30min |

### 2. Design User Account Merging

Define user consolidation strategy:

| Scenario | Detection | Action | User Experience |
|----------|-----------|--------|-----------------|
| Same email, different accounts | Email match | Prompt merge | Choose primary |
| Different email, same person | Name + context | Suggest merge | Confirm identity |
| Duplicate roles | Role comparison | Union permissions | Notify changes |
| Conflicting settings | Settings diff | Primary wins | Notify overrides |
| SSO differences | Auth config | Target SSO | Re-authenticate |

### 3. Define Data Transformation Rules

Specify data transformation during merge:

| Data Type | Transformation | Conflict Rule | Validation |
|-----------|----------------|---------------|------------|
| Records | ID remapping | Business key match | Referential integrity |
| Files/attachments | Path update | Keep both | File hash match |
| Audit logs | Merge with source tag | Append | Timestamp order |
| Analytics | Aggregate or separate | Configurable | Sum verification |
| AI training data | Combine datasets | Dedupe | Model compatibility |

### 4. Design Incremental Sync (for long migrations)

For large tenants, define incremental approach:

| Phase | Scope | Downtime | Data Freshness |
|-------|-------|----------|----------------|
| Initial bulk | Historical (T-30 days) | None | 30 days stale |
| Catch-up 1 | T-30 to T-7 | None | 7 days stale |
| Catch-up 2 | T-7 to T-1 | None | 1 day stale |
| Final sync | T-1 to cutover | Planned | Real-time |
| Cutover | Switch tenant | 15-60min | Complete |

### 5. Define Merge Events

Document system events during merge:

| Event | Trigger | Payload | Subscribers |
|-------|---------|---------|-------------|
| `merge.initiated` | Process starts | source_id, target_id | All systems |
| `merge.phase.started` | Phase begins | phase, scope | Monitoring |
| `merge.phase.completed` | Phase ends | phase, stats | Monitoring |
| `merge.conflict.detected` | Conflict found | conflict_type, records | Admin, Queue |
| `merge.completed` | All phases done | summary | All systems |
| `merge.failed` | Any failure | error, phase, recovery | Support, Ops |

**Verify current best practices with web search:**
Search the web: "data migration M&A best practices {date}"
Search the web: "tenant data consolidation patterns {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-2 complete the merge analysis and data merging design.**

Present summary of:
- Merge scenarios and requirements
- Data migration pipeline
- User consolidation strategy
- Transformation rules

Ask for confirmation before proceeding to account unification design.

---

## COLLABORATION MENUS (A/P/C):

After completing the data merging design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific migration phases
- **P (Party Mode)**: Bring data engineering and DBA perspectives
- **C (Continue)**: Accept data merging design and proceed to account unification
- **[Specific refinements]**: Describe data merging concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: migration pipeline, transformation rules, user merging
- Process enhanced insights on data integrity
- Ask user: "Accept these refined migration specs? (y/n)"
- If yes, integrate into data merging design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data merging design for M&A consolidation"
- Process data engineering and DBA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save data merging design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-account-unification.md`

---

## Verification

- [ ] Migration pipeline defined with phases
- [ ] User merging strategy documented
- [ ] Transformation rules specified
- [ ] Incremental sync designed
- [ ] Merge events documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Data migration pipeline specification
- User consolidation strategy
- Transformation rules
- Incremental sync approach
- Merge event definitions

---

## Next Step

Proceed to `step-03-c-design-account-unification.md` to design account unification procedures.
