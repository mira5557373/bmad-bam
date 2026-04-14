# Step 1: Define Reconciliation Scope

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

Define data reconciliation scope and priorities for post-DR failover validation, establishing the foundation for comprehensive data integrity verification across all tenant tiers.

## Prerequisites

- Disaster recovery plan approved or in progress
- Tenant tier model defined (Free/Pro/Enterprise)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-integrity


---

## Inputs

- User requirements and constraints for data reconciliation
- Disaster recovery plan document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Identify Critical Data Assets

Using the data integrity patterns from knowledge, identify critical data assets:

| Data Asset | Description | Criticality | Tenant Impact |
|------------|-------------|-------------|---------------|
| User Accounts | Authentication and profile data | Critical | All tiers |
| Tenant Configuration | Settings, preferences, integrations | Critical | All tiers |
| Transaction Records | Financial and business transactions | Critical | Pro, Enterprise |
| API Keys/Secrets | Credentials and tokens | Critical | All tiers |
| Audit Logs | Security and compliance logs | High | Pro, Enterprise |
| Analytics Data | Usage metrics and statistics | Medium | All tiers |
| Cached Data | Performance caches | Low | All tiers |
| Session State | Active user sessions | Low | All tiers |

Considerations:
- Align with RPO objectives per tier
- Factor in data criticality for business continuity
- Account for compliance requirements
- Consider tenant isolation boundaries

### 2. Define Reconciliation Priority Tiers

Define reconciliation order based on criticality:

| Priority | Data Assets | Max Reconciliation Time | Verification Depth |
|----------|-------------|-------------------------|-------------------|
| P1 - Critical | User accounts, tenant config, secrets | 15 minutes | Full verification |
| P2 - High | Transactions, audit logs | 1 hour | Sample + critical |
| P3 - Medium | Analytics, reports | 4 hours | Sample verification |
| P4 - Low | Cache, sessions | 8 hours | Existence check |

### 3. Map Data Sources and Targets

Create data source mapping matrix:

| Data Asset | Primary Source | DR Target | Replication Method | Lag Tolerance |
|------------|----------------|-----------|-------------------|---------------|
| User Accounts | PostgreSQL Primary | PostgreSQL DR | Streaming replication | < 1 minute |
| Tenant Config | PostgreSQL Primary | PostgreSQL DR | Streaming replication | < 1 minute |
| Transactions | PostgreSQL Primary | PostgreSQL DR | Streaming replication | < 15 seconds |
| Secrets | Vault Primary | Vault DR | Raft consensus | < 30 seconds |
| Audit Logs | Audit System | Audit DR | Log shipping | < 5 minutes |
| Analytics | ClickHouse | ClickHouse DR | Async replication | < 1 hour |
| Cache | Redis Primary | Redis DR | Redis Sentinel | < 1 minute |

### 4. Define Scope Boundaries

Establish reconciliation scope boundaries:

**In Scope:**
| Category | Description |
|----------|-------------|
| Persistent Data | All database records across all tenants |
| Configuration | Tenant and system configuration |
| Credentials | API keys, secrets, tokens |
| Audit Trail | Security and compliance logs |
| Metadata | Schema versions, migration state |

**Out of Scope:**
| Category | Rationale |
|----------|-----------|
| Ephemeral Cache | Rebuilt automatically on startup |
| Active Sessions | Users will re-authenticate |
| Temp Files | System regenerates as needed |
| CDN Cache | Invalidated and refreshed |

### 5. Define Tier-Specific Reconciliation

For each tier, document the expected reconciliation requirements:

**Free Tier:**
- Basic reconciliation with existence checks
- Best-effort verification within 4 hours
- Sample-based data validation
- No priority escalation

**Pro Tier:**
- Full reconciliation within 1 hour
- Transaction-level verification
- Priority P2 escalation
- Automated notification to tenant admin

**Enterprise Tier:**
- Immediate reconciliation (15 minutes)
- Row-level verification for critical data
- Priority P1 escalation
- Dedicated support notification
- Custom reconciliation reports

**Verify current best practices with web search:**
Search the web: "data reconciliation after disaster recovery best practices {date}"
Search the web: "database integrity verification multi-tenant {date}"

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
- **A1**: Review critical data assets against business requirements
- **A2**: Analyze reconciliation priority tiers for adequacy
- **A3**: Evaluate data source mappings for completeness
- **A4**: Assess scope boundaries for edge cases

### [P]ropose Changes
- **P1**: Propose adjusted data asset priorities
- **P2**: Propose reconciliation time modifications
- **P3**: Suggest additional data sources for coverage
- **P4**: Recommend scope boundary adjustments

### [C]ontinue
- **C1**: Accept current scope definitions and proceed to verification design
- **C2**: Mark step complete and load `step-02-c-design-verification.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Critical data assets identified for all categories
- [ ] Reconciliation priority tiers defined
- [ ] Data source mappings complete
- [ ] Scope boundaries established
- [ ] Tier-specific requirements documented
- [ ] Patterns align with pattern registry

## Outputs

- Critical data assets inventory
- Reconciliation priority matrix
- Data source mapping documentation
- Scope boundary definitions
- Tier-specific reconciliation requirements
- **Load template:** `{project-root}/_bmad/bam/templates/data-reconciliation-dr-template.md`

## Next Step

Proceed to `step-02-c-design-verification.md` to design data verification procedures.
