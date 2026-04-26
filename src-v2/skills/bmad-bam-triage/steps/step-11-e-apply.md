# Step 11: Apply Targeted Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **Validate consistency** after applying changes

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications to triage report
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Incremental updates preserving document integrity
- 🚫 Do NOT: Regenerate entire report; apply targeted changes only

---

## Purpose

Apply the identified changes to the existing triage report. Changes are applied incrementally while maintaining consistency across all sections (scores, priorities, phases, timeline).

---

## Prerequisites

- Step 10 (Load Existing Report) completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: triage

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Apply requested changes to the triage report while maintaining consistency.

---

## Apply Sequence

Based on the user's requested changes:

### Updating Complexity Scores

If modifying complexity scores:

1. Load current scores for target modules
2. Apply new scores with rationale
3. Recalculate composite scores
4. Update priority rankings if affected
5. Verify phase assignments still valid

| Module | Dimension | Previous | New | Rationale |
|--------|-----------|----------|-----|-----------|
| {{module}} | {{dim}} | {{prev}} | {{new}} | {{rationale}} |

**Cascade effects:**
- [ ] Composite score recalculated
- [ ] Priority ranking updated (if changed)
- [ ] Phase assignment verified

### Updating Priorities

If modifying priorities:

1. Load current priority order
2. Apply new priority assignments
3. Verify dependency constraints respected
4. Update phase assignments if needed
5. Recalculate timeline impacts

| Module | Previous Priority | New Priority | Reason |
|--------|-------------------|--------------|--------|
| {{module}} | {{prev}} | {{new}} | {{reason}} |

**Cascade effects:**
- [ ] Dependencies still respected
- [ ] Phase assignments updated
- [ ] Timeline recalculated

### Updating Phase Assignments

If reassigning modules to phases:

1. Load current phase structure
2. Move modules to new phases
3. Verify dependencies not violated
4. Recalculate phase durations
5. Update parallel workstreams

| Module | Previous Phase | New Phase | Impact |
|--------|----------------|-----------|--------|
| {{module}} | Phase {{n}} | Phase {{n}} | {{impact}} |

**Cascade effects:**
- [ ] Phase durations recalculated
- [ ] Dependencies verified
- [ ] Critical path updated

### Updating Timeline Estimates

If modifying duration estimates:

1. Load current timeline
2. Apply new estimates
3. Recalculate phase totals
4. Update go-live dates
5. Verify resource alignment

| Module | Previous Duration | New Duration | Reason |
|--------|-------------------|--------------|--------|
| {{module}} | {{prev}}w | {{new}}w | {{reason}} |

**Cascade effects:**
- [ ] Phase totals updated
- [ ] Go-live dates recalculated
- [ ] Resource peaks verified

### Adding New Modules

If adding modules:

1. Score new module across all dimensions
2. Calculate composite score
3. Assign priority based on score
4. Assign to appropriate phase
5. Update phase durations

| New Module | Composite Score | Priority | Phase | Duration |
|------------|-----------------|----------|-------|----------|
| {{module}} | {{score}} | {{priority}} | Phase {{n}} | {{weeks}}w |

**Cascade effects:**
- [ ] Phase durations increased
- [ ] Resource requirements updated
- [ ] Timeline extended

### Removing Modules

If removing modules:

1. Remove from scoring tables
2. Remove from priority list
3. Remove from phase assignments
4. Recalculate phase durations
5. Update dependency graph

| Removed Module | Was Phase | Impact |
|----------------|-----------|--------|
| {{module}} | Phase {{n}} | {{impact}} |

**Cascade effects:**
- [ ] Phase durations reduced
- [ ] Dependencies removed
- [ ] Timeline shortened

---

## Consistency Verification

After applying all changes, verify:

| Check | Status | Notes |
|-------|--------|-------|
| All modules in priority list | PASS/FAIL | {{note}} |
| All priorities in phase assignments | PASS/FAIL | {{note}} |
| Dependencies respected | PASS/FAIL | {{note}} |
| Phase durations sum correctly | PASS/FAIL | {{note}} |
| Timeline realistic | PASS/FAIL | {{note}} |

---

## Update Change Log

Add entry to triage report change log:

```
## Change Log

| Date | Author | Changes | Rationale |
|------|--------|---------|-----------|
| {{date}} | {{author}} | {{changes}} | {{rationale}} |
```

---

## Write Updated Artifact

Write the updated triage report:

```
{output_folder}/planning-artifacts/triage-report.md
```

---

## Verification

- [ ] All requested changes applied
- [ ] Consistency verified across sections
- [ ] Dependencies still respected
- [ ] Timeline updated
- [ ] Change log entry added
- [ ] Updated artifact written

---

## Outputs

- Updated triage report
- Change log entry
- Consistency verification results

---

## Next Step

Edit complete. 

**Recommended next actions:**
1. Run validation mode to verify QG-PL1 compliance: `step-20-v-load.md`
2. Review cascade effects on dependent planning artifacts
3. Communicate changes to stakeholders
