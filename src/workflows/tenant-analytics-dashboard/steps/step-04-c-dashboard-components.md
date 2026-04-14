# Step 4: Dashboard Components

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- REFERENCE Reference pattern registry `web_queries` for search topics


---

## Purpose

Define the dashboard component architecture including widget types, layout system, and component library for tenant analytics.

---

## Prerequisites

- Tenant data isolation defined (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: dashboard,visualization

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define dashboard components for tenant analytics:

## Dashboard Hierarchy

```
Platform Dashboards (Internal Only)
├── Executive Summary
├── Tenant Overview Matrix
├── Revenue Analytics
├── Capacity Planning
└── Operational Health

Tenant Dashboards (Per-Tenant Access)
├── Usage Overview
├── Performance Analytics
├── Cost & Billing
├── AI Agent Analytics
└── Custom Reports
```

## Widget Component Library

| Widget Type | Use Case | Data Requirements | Interactivity |
|-------------|----------|-------------------|---------------|
| KPI Card | Single metric display | Single value + trend | Drill-down |
| Time Series | Trends over time | Timestamped data | Zoom, range select |
| Bar Chart | Comparisons | Categorical + numeric | Filter, sort |
| Pie/Donut | Proportions | Categorical + percentage | Drill-down |
| Table | Detailed data | Multi-column | Sort, filter, paginate |
| Heatmap | Density patterns | 2D categorical + value | Hover details |
| Gauge | Progress/thresholds | Single value + limits | Threshold alerts |
| Map | Geographic data | Location + metric | Zoom, hover |

## Component Architecture

```yaml
dashboard_components:
  # Layout system
  layout:
    type: grid
    columns: 12
    row_height: 100px
    breakpoints:
      desktop: 1200px
      tablet: 768px
      mobile: 480px
      
  # Widget base configuration
  widget_base:
    properties:
      - id: string
      - title: string
      - type: enum
      - data_source: string
      - refresh_rate: duration
      - tenant_scoped: boolean
      
  # Data binding
  data_binding:
    mode: query
    parameters:
      - tenant_id: injected
      - date_range: user_selected
      - filters: user_defined
```

## Standard Widget Definitions

### KPI Card Widget

```yaml
widget_kpi_card:
  type: stat
  layout:
    width: 3
    height: 1
  properties:
    value_query: "SELECT metric_value FROM ..."
    trend_query: "SELECT trend_percentage FROM ..."
    format: number|currency|percentage
    trend_direction: up_good|down_good
    thresholds:
      warning: value
      critical: value
```

### Time Series Widget

```yaml
widget_time_series:
  type: timeseries
  layout:
    width: 6
    height: 3
  properties:
    query: "SELECT timestamp, value FROM ..."
    series:
      - name: string
        color: hex
        type: line|area|bar
    axes:
      x: time
      y: metric_name
    legend: bottom|right|none
    zoom: enabled
```

### Data Table Widget

```yaml
widget_data_table:
  type: table
  layout:
    width: 12
    height: 4
  properties:
    query: "SELECT columns FROM ..."
    columns:
      - field: string
        header: string
        sortable: boolean
        filterable: boolean
        format: string
    pagination:
      enabled: true
      page_size: 25
    export: csv|xlsx
```

## Dashboard Templates

| Template | Widgets | Purpose | Default Layout |
|----------|---------|---------|----------------|
| Usage Overview | 4 KPIs, 2 charts, 1 table | Quick usage summary | 2x2 KPIs, full-width charts |
| Performance | 2 KPIs, 3 charts | Performance trends | KPIs top, charts below |
| Billing | 3 KPIs, 1 chart, 1 table | Cost breakdown | KPIs, pie chart, detail table |
| AI Analytics | 4 KPIs, 2 charts | Agent performance | Grid layout |

## Widget Interaction Patterns

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| Drill-down | Click to see details | Navigation to detailed view |
| Cross-filter | Filter affects other widgets | Dashboard-level filter state |
| Hover detail | Show additional info on hover | Tooltip with context |
| Time range sync | Shared time range | Dashboard-level time picker |
| Comparison mode | Compare two periods | Overlay or side-by-side |

**Verify current best practices with web search:**
Search the web: "analytics dashboard component design patterns {date}"
Search the web: "SaaS dashboard widget best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After defining dashboard components, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific widget configurations or layout patterns
- **P (Party Mode)**: Bring UX designer and frontend architect perspectives on component design
- **C (Continue)**: Accept dashboard components and proceed to visualization design
- **[Specific refinements]**: Describe additional component requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: widget library, layout system, interaction patterns
- Process enhanced insights on component architecture
- Ask user: "Accept this detailed component analysis? (y/n)"
- If yes, integrate into component specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review dashboard component architecture for tenant analytics"
- Process UX designer and frontend architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save dashboard component specification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Proceed to next step: `step-05-c-visualization-design.md`

---

## Verification

- [ ] Dashboard hierarchy defined
- [ ] Widget component library specified
- [ ] Component architecture documented
- [ ] Standard widget definitions created
- [ ] Dashboard templates established
- [ ] Widget interaction patterns defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Dashboard component library
- Widget specification document
- Dashboard templates catalog

---

## Next Step

Proceed to `step-05-c-visualization-design.md` to define visualization design.
