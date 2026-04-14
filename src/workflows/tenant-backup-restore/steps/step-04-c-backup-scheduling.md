# Step 4: Backup Scheduling

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

Design backup scheduling policies and retention strategies per tenant tier.

---

## Prerequisites

- Step 3 completed (Verification procedures defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Actions

### 1. Backup Schedule Design

Define backup frequency by tenant tier:

| Tier | Full Backup | Incremental | Differential | WAL/Binlog |
|------|-------------|-------------|--------------|------------|
| Free | Weekly | Daily | N/A | N/A |
| Pro | Daily | Hourly | Daily | 6 hours |
| Enterprise | 6 hours | 15 minutes | Hourly | Real-time |
| Dedicated | Custom SLA | Custom | Custom | Real-time |

### 2. Retention Policies

| Tier | Daily | Weekly | Monthly | Yearly | Total |
|------|-------|--------|---------|--------|-------|
| Free | 7 days | 4 weeks | N/A | N/A | ~30 days |
| Pro | 14 days | 8 weeks | 6 months | N/A | ~8 months |
| Enterprise | 30 days | 12 weeks | 12 months | 3 years | ~4 years |
| Dedicated | Custom | Custom | Custom | Custom | Per SLA |

### 3. Storage Tier Mapping

| Backup Age | Storage Class | Access Time | Cost Tier |
|------------|---------------|-------------|-----------|
| 0-7 days | Hot (SSD) | Immediate | High |
| 7-30 days | Warm (HDD) | < 1 minute | Medium |
| 30-90 days | Cold (Archive) | < 1 hour | Low |
| 90+ days | Glacier/Deep Archive | < 12 hours | Minimal |

### 4. Geographic Replication

| Tier | Regions | Sync Mode | RPO |
|------|---------|-----------|-----|
| Free | Single region | N/A | 24 hours |
| Pro | 2 regions | Async | 1 hour |
| Enterprise | 3+ regions | Sync | 15 minutes |
| Dedicated | Custom | Sync | < 5 minutes |

### 5. Scheduling Coordination

| Concern | Strategy | Implementation |
|---------|----------|----------------|
| Peak hours | Avoid business hours | Off-peak windows |
| Cross-tenant impact | Stagger schedules | Round-robin distribution |
| Resource contention | Throttling | Backup priority queues |
| Maintenance windows | Coordinate | Calendar integration |

**Verify current best practices with web search:**
Search the web: "backup scheduling best practices multi-tenant SaaS {date}"
Search the web: "tiered backup retention policies cloud {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the scheduling design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tier-specific SLAs and cost optimization
- **P (Party Mode)**: Bring operations and finance perspectives for cost/SLA review
- **C (Continue)**: Accept scheduling design and proceed to assembly
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass scheduling context: tiers, retention, storage classes
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review backup scheduling: {summary of tiers and retention}"
- Process collaborative analysis from operations and finance personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Proceed to step-05-c-assembly.md

---

## Verification

- [ ] Backup schedules defined per tier
- [ ] Retention policies specified
- [ ] Storage tier mapping complete
- [ ] Geographic replication designed
- [ ] Scheduling coordination addressed
- [ ] Patterns align with pattern registry

---

## Outputs

- Backup schedule matrix
- Retention policy specifications
- Storage tier mapping
- Replication strategy

---

## Next Step

Proceed to `step-05-c-assembly.md` to assemble the complete backup/restore design document.
