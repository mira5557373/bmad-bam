# Step 2: Design Report Builder

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

Design the report builder interface and capabilities that enable tenants to create custom reports with field selection, filtering, aggregation, and visualization options per tier.

## Prerequisites

- Report types defined (Step 1)
- Tenant tier model confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: reporting
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation


---

## Inputs

- Report type definitions from Step 1
- User requirements for builder capabilities
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Builder Interface Components

Design the core builder interface components:

| Component | Description | Tier Availability |
|-----------|-------------|-------------------|
| Data Source Selector | Choose report data source | Pro, Enterprise |
| Field Picker | Select columns to include | Pro, Enterprise |
| Filter Builder | Add WHERE conditions | Pro, Enterprise |
| Aggregation Config | Sum, Count, Avg, etc. | Pro, Enterprise |
| Grouping Options | GROUP BY configuration | Pro, Enterprise |
| Sort Configuration | ORDER BY settings | Pro, Enterprise |
| Visualization Picker | Chart type selection | Enterprise only |
| Preview Pane | Live report preview | Pro, Enterprise |

Considerations:
- Progressive disclosure for complexity
- Tier-based feature gating
- Validation and error handling
- Performance guardrails

### 2. Design Field Selection Capabilities

Define field selection features per tier:

| Capability | Free | Pro | Enterprise |
|------------|------|-----|------------|
| Max Fields | N/A | 20 | 50 |
| Field Aliases | N/A | Yes | Yes |
| Calculated Fields | N/A | 3 | Unlimited |
| Field Descriptions | N/A | Yes | Yes |
| Field Type Info | N/A | Basic | Advanced |

### 3. Design Filtering Options

Define filter builder capabilities:

| Filter Type | Pro | Enterprise |
|-------------|-----|------------|
| Equals/Not Equals | Yes | Yes |
| Contains/Starts With | Yes | Yes |
| Date Range | Yes | Yes |
| Numeric Range | Yes | Yes |
| In List | Yes | Yes |
| Is Null/Not Null | Yes | Yes |
| Regex Match | No | Yes |
| Subquery Filter | No | Yes |
| Cross-field Comparison | No | Yes |

Filter Configuration:
| Setting | Pro | Enterprise |
|---------|-----|------------|
| Max Filter Conditions | 10 | 50 |
| Nested Conditions (AND/OR) | 2 levels | 5 levels |
| Saved Filter Sets | 5 | Unlimited |
| Parameter Prompts | No | Yes |

### 4. Design Aggregation Features

Define aggregation and grouping capabilities:

| Aggregation | Pro | Enterprise |
|-------------|-----|------------|
| COUNT | Yes | Yes |
| SUM | Yes | Yes |
| AVG | Yes | Yes |
| MIN/MAX | Yes | Yes |
| DISTINCT COUNT | Yes | Yes |
| PERCENTILE | No | Yes |
| MEDIAN | No | Yes |
| STDDEV/VARIANCE | No | Yes |
| Custom Expressions | No | Yes |

Grouping Options:
| Feature | Pro | Enterprise |
|---------|-----|------------|
| Max Group Columns | 3 | 10 |
| Date Grouping (Day/Week/Month) | Yes | Yes |
| Custom Date Intervals | No | Yes |
| Hierarchical Grouping | No | Yes |
| Rollup/Subtotals | No | Yes |

### 5. Design Visualization Options

Define visualization capabilities per tier:

| Visualization | Pro | Enterprise |
|---------------|-----|------------|
| Table View | Yes | Yes |
| Bar Chart | Yes | Yes |
| Line Chart | Yes | Yes |
| Pie Chart | Yes | Yes |
| Area Chart | No | Yes |
| Scatter Plot | No | Yes |
| Heatmap | No | Yes |
| Pivot Table | No | Yes |
| Dashboard Embed | No | Yes |

### 6. Define Query Performance Guardrails

Establish performance limits per tier:

| Guardrail | Pro | Enterprise |
|-----------|-----|------------|
| Query Timeout | 30 seconds | 120 seconds |
| Max Result Rows | 10,000 | 100,000 |
| Max Join Tables | 3 | 10 |
| Concurrent Queries | 2 | 10 |
| Query Cache TTL | 5 minutes | 15 minutes |
| Cost Limit (compute) | Medium | High |

**Verify current best practices with web search:**
Search the web: "report builder UI design patterns {date}"
Search the web: "multi-tenant query builder performance {date}"

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
- **A1**: Review builder interface components for usability
- **A2**: Analyze field selection limits for typical use cases
- **A3**: Evaluate filter complexity vs performance trade-offs
- **A4**: Assess aggregation features for business needs

### [P]ropose Changes
- **P1**: Propose interface component adjustments
- **P2**: Propose field selection modifications
- **P3**: Suggest filter capability enhancements
- **P4**: Recommend aggregation feature changes

### [C]ontinue
- **C1**: Accept current builder design and proceed to scheduling
- **C2**: Mark step complete and load `step-03-c-configure-scheduling.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Builder interface components defined
- [ ] Field selection capabilities per tier documented
- [ ] Filtering options specified
- [ ] Aggregation features defined
- [ ] Visualization options per tier documented
- [ ] Performance guardrails established
- [ ] Patterns align with pattern registry

## Outputs

- Report builder interface specification
- Field selection capabilities matrix
- Filter builder specification
- Aggregation and grouping features
- Visualization options per tier
- Performance guardrails documentation
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

## Next Step

Proceed to `step-03-c-configure-scheduling.md` to configure scheduled report delivery options.
