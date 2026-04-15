# Step 1: Define Report Types

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

Define available report types per tenant tier (usage, billing, analytics, audit), establishing the foundation for tier-aware self-service reporting capabilities.

## Prerequisites

- Master architecture approved or in progress
- Tenant tier model defined (Free/Pro/Enterprise)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: reporting
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- User requirements and constraints for self-service reporting
- Master architecture document (if available)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Report Categories

Using the reporting patterns from knowledge, define report categories:

| Category | Description | Data Sources |
|----------|-------------|--------------|
| Usage Reports | Resource consumption, API calls, storage | Metrics DB, Usage Events |
| Billing Reports | Invoices, payment history, cost breakdown | Billing System, Usage DB |
| Analytics Reports | Business metrics, trends, KPIs | Analytics Warehouse |
| Audit Reports | Security events, access logs, changes | Audit Log System |
| Custom Reports | User-defined reports with builder | All accessible sources |

Considerations:
- Map categories to data sources
- Define data freshness requirements
- Account for tenant isolation at data layer
- Consider cost implications per tier

### 2. Define Report Types per Tier

Define available report types based on tier capabilities:

| Report Type | Free | Pro | Enterprise |
|-------------|------|-----|------------|
| Usage Summary | Daily | Hourly | Real-time |
| Billing Summary | Monthly | Weekly | Daily |
| API Analytics | Basic (7 days) | Standard (30 days) | Advanced (365 days) |
| Audit Logs | 7 days | 30 days | 365 days |
| Custom Reports | No | 5 templates | Unlimited |
| Scheduled Reports | No | 3 active | Unlimited |

Considerations:
- Align with tier value proposition
- Factor in data retention limits
- Account for compute costs per tier
- Consider upgrade incentives

### 3. Map Report Types to Data Access

Create data access mapping matrix:

| Report Type | Data Source | Access Pattern | Isolation Level |
|-------------|-------------|----------------|-----------------|
| Usage Summary | metrics_db | Read-only | RLS by tenant_id |
| Billing Summary | billing_db | Read-only | Schema isolation |
| API Analytics | analytics_dw | Aggregated | Tenant partition |
| Audit Logs | audit_system | Read-only | Strict RLS |
| Custom Reports | multiple | Query builder | Field-level ACL |

### 4. Define Report Specifications

Establish report specification standards:

| Attribute | Description | Required |
|-----------|-------------|----------|
| Report ID | Unique identifier | Yes |
| Report Name | Display name | Yes |
| Category | Usage/Billing/Analytics/Audit/Custom | Yes |
| Tier Availability | Free/Pro/Enterprise flags | Yes |
| Data Sources | List of source tables/APIs | Yes |
| Default Fields | Pre-selected columns | Yes |
| Available Fields | All selectable columns | Yes |
| Default Filters | Pre-applied filters | No |
| Max Rows | Row limit per tier | Yes |
| Retention | Data availability window | Yes |

### 5. Document Tier-Specific Report Paths

For each tier, document the expected report capabilities:

**Free Tier:**
- Basic usage and billing summaries
- Limited data retention (7 days)
- No custom reports or scheduling
- Export to CSV only

**Pro Tier:**
- Standard reports with extended retention
- Limited custom report templates (5)
- Basic scheduling (3 active schedules)
- Export to CSV, PDF, Excel

**Enterprise Tier:**
- Full report catalog access
- Unlimited custom reports
- Advanced scheduling with webhooks
- All export formats plus API access

**Verify current best practices with web search:**
Search the web: "SaaS self-service reporting best practices {date}"
Search the web: "multi-tenant report builder architecture {date}"

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
- **A1**: Review current report types against industry benchmarks
- **A2**: Analyze data source availability and freshness requirements
- **A3**: Evaluate tier differentiation for upsell opportunities
- **A4**: Assess compliance requirements affecting report types

### [P]ropose Changes
- **P1**: Propose adjusted report types based on data analysis
- **P2**: Propose tier modifications for better value alignment
- **P3**: Suggest additional report categories
- **P4**: Recommend data retention adjustments

### [C]ontinue
- **C1**: Accept current report type definitions and proceed to builder design
- **C2**: Mark step complete and load `step-02-c-design-builder.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Report categories defined with data sources
- [ ] Report types defined for all tiers
- [ ] Data access mapping complete
- [ ] Report specifications documented
- [ ] Tier-specific capabilities defined
- [ ] Patterns align with pattern registry

## Outputs

- Report categories and types matrix by tier
- Data access mapping documentation
- Report specification standards
- Tier-specific capability descriptions
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

## Next Step

Proceed to `step-02-c-design-builder.md` to design the report builder interface.
