# Step 4: Create Comprehensive DR Plan Document

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

Assemble all disaster recovery decisions into a comprehensive DR plan document using the standard template, including recovery procedures, communication plans, and testing schedules.

## Prerequisites

- RTO/RPO objectives defined (Step 1)
- Backup strategy designed (Step 2)
- Failover procedures designed (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load template:** `{project-root}/_bmad/bam/data/templates/disaster-recovery-plan-template.md`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Compile Executive Summary

Using template sections, document:

- Plan overview and purpose
- Scope (in-scope and out-of-scope systems)
- Critical services with RTO/RPO
- DR team contacts with primary and backup

### 2. Document RTO/RPO Objectives

Populate template tables with tier-specific objectives:

**RTO by Tier:**
| Tier | Critical Services | Standard Services | Non-Critical |
|------|-------------------|-------------------|--------------|
| Enterprise | 15 minutes | 30 minutes | 1 hour |
| Pro | 1 hour | 2 hours | 4 hours |
| Free | 4 hours | 8 hours | 24 hours |

**RPO by Tier:**
| Tier | Critical Data | Standard Data | Archival |
|------|---------------|---------------|----------|
| Enterprise | 15 minutes | 1 hour | 4 hours |
| Pro | 4 hours | 8 hours | 24 hours |
| Free | 24 hours | 24 hours | 7 days |

### 3. Document Recovery Procedures

For each recovery phase, detail:

**Phase 1: Initial Response (0-30 minutes)**
- Incident detection and verification
- DR team assembly
- Initial assessment
- Stakeholder notification

**Phase 2: Assessment and Triage (30-60 minutes)**
- Damage assessment
- Recovery path selection
- Resource allocation
- Timeline estimation

**Phase 3: Recovery Execution (1-4 hours)**
- Infrastructure recovery
- Data restoration
- Service restart sequence
- Health verification

**Phase 4: Validation (4-8 hours)**
- Data integrity verification
- Application testing
- Performance validation
- Tenant access verification

**Phase 5: Return to Normal**
- Failback procedures
- Post-incident review
- Documentation updates

### 4. Document Backup Strategy

Populate backup sections with:

| Data Type | Method | Frequency | Retention | Location |
|-----------|--------|-----------|-----------|----------|
| PostgreSQL | pg_basebackup + WAL | Per tier | Per tier | Multi-region S3 |
| Redis | RDB snapshots | Hourly | 7-30 days | Cross-region |
| Qdrant | Collection export | Daily | 7-30 days | Cross-region |
| S3 objects | CRR | Continuous | Indefinite | Multi-region |
| Agent memory | Mem0 export | Hourly | 30-365 days | Multi-region |

### 5. Document Failover Architecture

Detail failover configuration:

| Component | Primary | Secondary | Mode | Time |
|-----------|---------|-----------|------|------|
| PostgreSQL | us-east-1 | us-west-2 | Streaming replica | 30s-5min |
| Redis | us-east-1 | us-west-2 | Sentinel | 10-30s |
| Application | us-east-1 | us-west-2 | Active-passive | 1-5min |
| DNS | Route53 | Health-based | Automatic | TTL |

### 6. Create Testing Schedule

Define DR testing calendar:

| Quarter | Test Type | Scope | Duration | Owner |
|---------|-----------|-------|----------|-------|
| Q1 | Tabletop exercise | All tiers | 4 hours | DR Coordinator |
| Q2 | Component failover | Database | 2 hours | DBA |
| Q3 | Partial DR test | Pro tier | 8 hours | DR Team |
| Q4 | Full DR test | Enterprise tier | 24 hours | DR Team |

### 7. Define Communication Plan

Document communication procedures:

**Internal:**
| Audience | Channel | Frequency | Owner |
|----------|---------|-----------|-------|
| DR Team | Slack + Bridge | Continuous | DR Lead |
| Leadership | Email + Call | Hourly | DR Coordinator |
| All Staff | Email | On resolution | Communications |

**External:**
| Audience | Channel | Template | Trigger |
|----------|---------|----------|---------|
| Enterprise tenants | Direct call | Priority notice | DR declared |
| All tenants | Status page | Status template | Impact confirmed |
| Partners | Email | Partner notice | Major impact |

### 8. Finalize and Review

Complete document assembly:
- Fill all template placeholders
- Review for completeness
- Cross-reference with knowledge patterns
- Validate against checklist

**Verify current best practices with web search:**
Search the web: "create comprehensive dr plan document best practices {date}"
Search the web: "create comprehensive dr plan document enterprise SaaS {date}"

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
- **A1**: Review executive summary for completeness
- **A2**: Analyze RTO/RPO documentation against earlier decisions
- **A3**: Evaluate recovery procedure phase timing
- **A4**: Assess testing schedule adequacy
- **A5**: Review communication plan coverage

### [P]ropose Changes
- **P1**: Propose executive summary enhancements
- **P2**: Suggest recovery procedure refinements
- **P3**: Recommend testing schedule adjustments
- **P4**: Propose communication plan improvements
- **P5**: Suggest additional DR plan sections

### [C]ontinue
- **C1**: Accept DR plan document and complete Create mode
- **C2**: Mark step complete and finalize DR plan output

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Executive summary complete
- [ ] RTO/RPO objectives documented
- [ ] All recovery phases detailed
- [ ] Backup strategy documented
- [ ] Failover procedures included
- [ ] Testing schedule defined
- [ ] Communication plan complete
- [ ] All template sections filled
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/disaster-recovery-plan.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/disaster-recovery-template.md`

## Next Step

This completes the Create mode. Run `step-20-v-load-dr-plan.md` to enter Validate mode and verify the DR plan against quality criteria, or proceed to related workflows if validation will be performed later.

## Quality Gate Summary

This step completes the Create mode. Review the disaster recovery plan for:
- Completeness of all sections
- Alignment with tier capabilities
- Realistic RTO/RPO targets
- Actionable procedures
- Clear ownership and contacts
