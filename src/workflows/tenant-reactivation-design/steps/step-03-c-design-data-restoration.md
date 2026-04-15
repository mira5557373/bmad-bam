# Step 3: Design Data Restoration

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

Design the data restoration procedures for reactivating suspended tenants, including restoration from archives, data integrity verification, and progressive restoration strategies.

---

## Prerequisites

- Step 2 completed: Reactivation flow design
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Restoration Pipeline

Define the data restoration sequence:

| Step | Action | Source | Target | Duration |
|------|--------|--------|--------|----------|
| 1 | Locate archive | Archive registry | - | <1s |
| 2 | Validate integrity | Archive checksum | - | <30s |
| 3 | Restore user accounts | Archive | Primary DB | <5min |
| 4 | Restore application data | Archive | Primary DB | 5-60min |
| 5 | Restore AI configurations | Cold storage | AI service | <10min |
| 6 | Restore integrations | Config backup | Integration service | <5min |
| 7 | Rebuild search indices | Restored data | Search service | 10-30min |
| 8 | Verify completeness | All systems | Verification report | <5min |

### 2. Define Progressive Restoration

Design phased restoration for large datasets:

| Phase | Data Scope | Priority | Access Level |
|-------|------------|----------|--------------|
| 1 - Critical | User accounts, auth, recent data (30 days) | Immediate | Full access to recent |
| 2 - Important | Application data (31-180 days) | Within 1 hour | Read-only on request |
| 3 - Historical | Full history (>180 days) | Within 24 hours | Available after request |
| 4 - Supplementary | AI models, analytics, reports | Within 48 hours | Full restoration |

### 3. Design Integrity Verification

Specify data integrity checks:

| Check | Method | Success Criteria | Failure Action |
|-------|--------|------------------|----------------|
| Record count | Count comparison | Match archive manifest | Retry restoration |
| Checksum validation | Hash comparison | All hashes match | Re-download archive |
| Referential integrity | Foreign key check | No orphaned records | Manual reconciliation |
| User access test | Login verification | Primary admin can login | Credential reset |
| Data sampling | Random record verification | 99%+ accuracy | Detailed audit |

### 4. Design Cold Storage Restoration

Specify restoration from archived cold storage:

| Storage Tier | Retrieval Time | Cost | Use Case |
|--------------|----------------|------|----------|
| Hot (active) | Immediate | $$$ | Active tenants |
| Warm (recent suspend) | <5 minutes | $$ | <30 day suspension |
| Cold (archived) | 1-12 hours | $ | 30-90 day archive |
| Glacier (long-term) | 12-48 hours | ¢ | >90 day archive |

### 5. Define Restoration Events

Document restoration lifecycle events:

| Event | Trigger | Payload | Subscribers |
|-------|---------|---------|-------------|
| `restoration.initiated` | Request approved | tenant_id, scope | Ops, User |
| `restoration.phase.started` | Phase begins | phase, data_scope | Monitoring |
| `restoration.phase.completed` | Phase ends | phase, records_restored | User, Monitoring |
| `restoration.verification.started` | All phases done | tenant_id | QA |
| `restoration.completed` | All verified | tenant_id, summary | All systems |
| `restoration.failed` | Any failure | error, phase, recovery | Support, Ops |

**Verify current best practices with web search:**
Search the web: "cloud data restoration strategies {date}"
Search the web: "multi-tenant data recovery patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the data restoration design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into restoration pipeline or verification
- **P (Party Mode)**: Bring SRE and data engineering perspectives on restoration
- **C (Continue)**: Accept data restoration design and proceed to runbook creation
- **[Specific refinements]**: Describe data restoration concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: restoration pipeline, progressive restoration, verification
- Process enhanced insights on restoration reliability
- Ask user: "Accept these refined restoration specs? (y/n)"
- If yes, integrate into restoration design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data restoration design for tenant reactivation"
- Process SRE and data engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save data restoration design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-create-runbook.md`

---

## Verification

- [ ] Restoration pipeline defined with durations
- [ ] Progressive restoration phases documented
- [ ] Integrity verification comprehensive
- [ ] Cold storage restoration specified
- [ ] Restoration events defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Restoration pipeline specification
- Progressive restoration strategy
- Integrity verification procedures
- Cold storage restoration plan
- Restoration event definitions

---

## Next Step

Proceed to `step-04-c-create-runbook.md` to create the operational runbook.
