# Step 1: Define RTO/RPO Objectives

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

Define Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) for each tenant tier, establishing the foundation for tier-aware disaster recovery planning.

## Prerequisites

- Master architecture approved or in progress
- Tenant tier model defined (Free/Pro/Enterprise)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- User requirements and constraints for disaster recovery design
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define RTO per Tier

Using the recovery objectives patterns from knowledge, define Recovery Time Objectives:

| Tier | Critical Services | Standard Services | Non-Critical |
|------|-------------------|-------------------|--------------|
| Free | 4 hours | 8 hours | 24 hours |
| Pro | 1 hour | 2 hours | 4 hours |
| Enterprise | 15 minutes | 30 minutes | 1 hour |

Considerations:
- Align with SLA commitments per tier
- Factor in infrastructure complexity
- Account for manual vs automated recovery
- Consider cost implications per tier

### 2. Define RPO per Tier

Define Recovery Point Objectives based on backup capabilities:

| Tier | Critical Data | Standard Data | Archival |
|------|---------------|---------------|----------|
| Free | 24 hours | 24 hours | 7 days |
| Pro | 4 hours | 8 hours | 24 hours |
| Enterprise | 15 minutes | 1 hour | 4 hours |

Considerations:
- Map to backup frequency capabilities
- Consider data criticality per asset type
- Account for compliance requirements
- Balance cost vs recovery granularity

### 3. Map to SLA Commitments

Create SLA mapping matrix:

| Tier | SLA Uptime | Max Monthly Downtime | DR RTO | DR RPO |
|------|------------|----------------------|--------|--------|
| Free | 99.0% | 7.3 hours | 4 hours | 24 hours |
| Pro | 99.5% | 3.65 hours | 1 hour | 4 hours |
| Enterprise | 99.9% | 43 minutes | 15 minutes | 15 minutes |

### 4. Define Recovery Priorities

Establish service recovery order by criticality:

| Priority | Services | RTO Target | Dependencies |
|----------|----------|------------|--------------|
| P1 | Authentication, Core API | Per tier critical | Database, Cache |
| P2 | Tenant data access | Per tier standard | P1 services |
| P3 | AI agent runtime | Per tier standard | P1, P2 services |
| P4 | Analytics, Reporting | Per tier non-critical | P1, P2 services |
| P5 | Background jobs, Batch | Per tier non-critical | P1, P2 services |

### 5. Document Tier-Specific Recovery Paths

For each tier, document the expected recovery flow:

**Free Tier:**
- Restore from daily backup
- No guaranteed failover
- Best-effort recovery during business hours

**Pro Tier:**
- Restore from 4-hour backup or WAL replay
- Cross-region failover available
- Priority recovery support

**Enterprise Tier:**
- CDC replay to exact recovery point
- Automatic failover with minimal data loss
- Dedicated recovery resources

**Verify current best practices with web search:**
Search the web: "define rto/rpo objectives best practices {date}"
Search the web: "define rto/rpo objectives enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze Options
- **A1**: Review current RTO/RPO targets against industry benchmarks
- **A2**: Analyze cost implications of each tier's recovery objectives
- **A3**: Evaluate SLA commitments vs actual infrastructure capabilities
- **A4**: Assess compliance requirements affecting recovery targets

### [P]ropose Changes
- **P1**: Propose adjusted RTO values based on infrastructure analysis
- **P2**: Propose RPO modifications aligned with backup capabilities
- **P3**: Suggest SLA mapping adjustments for tier consistency
- **P4**: Recommend recovery priority reordering based on dependencies

### [C]ontinue
- **C1**: Accept current RTO/RPO definitions and proceed to backup strategy
- **C2**: Mark step complete and load `step-02-c-design-backup-strategy.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] RTO defined for all tiers and service criticalities
- [ ] RPO defined for all tiers and data types
- [ ] SLA mapping complete and realistic
- [ ] Recovery priorities documented
- [ ] Tier-specific recovery paths defined
- [ ] Patterns align with pattern registry

## Outputs

- RTO/RPO objectives matrix by tier
- SLA mapping documentation
- Service recovery priority list
- Tier-specific recovery path descriptions

## Next Step

Proceed to `step-02-c-design-backup-strategy.md` to define backup strategies per tier.
