# Step 5: Visualization Design

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

Define visualization design principles, chart selection guidelines, and visual styling for tenant analytics dashboards.

---

## Prerequisites

- Dashboard components defined (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: visualization,ux

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define visualization design for tenant analytics:

## Chart Selection Guide

| Data Type | Question | Recommended Chart | Alternative |
|-----------|----------|-------------------|-------------|
| Single value | What is the current value? | KPI Card | Gauge |
| Trend | How has this changed over time? | Line Chart | Area Chart |
| Comparison | How do categories compare? | Bar Chart | Column Chart |
| Proportion | What is the composition? | Pie Chart | Stacked Bar |
| Distribution | How is data distributed? | Histogram | Box Plot |
| Correlation | How are variables related? | Scatter Plot | Heatmap |
| Geographic | Where is the data located? | Map | Choropleth |
| Hierarchical | What is the structure? | Treemap | Sunburst |

## Visual Design System

```yaml
design_system:
  # Color palette
  colors:
    primary: "#2563EB"      # Brand blue
    secondary: "#7C3AED"    # Purple
    success: "#10B981"      # Green
    warning: "#F59E0B"      # Amber
    error: "#EF4444"        # Red
    neutral:
      - "#F9FAFB"  # 50
      - "#F3F4F6"  # 100
      - "#E5E7EB"  # 200
      - "#D1D5DB"  # 300
      - "#9CA3AF"  # 400
      - "#6B7280"  # 500
      - "#4B5563"  # 600
      - "#374151"  # 700
      - "#1F2937"  # 800
      - "#111827"  # 900
      
  # Data visualization colors
  chart_colors:
    categorical:
      - "#2563EB"  # Blue
      - "#7C3AED"  # Purple
      - "#EC4899"  # Pink
      - "#F59E0B"  # Amber
      - "#10B981"  # Green
      - "#06B6D4"  # Cyan
    sequential:
      start: "#DBEAFE"
      end: "#1E40AF"
    diverging:
      negative: "#EF4444"
      neutral: "#F3F4F6"
      positive: "#10B981"
```

## Typography

```yaml
typography:
  # Dashboard titles
  dashboard_title:
    font: "Inter"
    weight: 600
    size: 24px
    
  # Widget titles
  widget_title:
    font: "Inter"
    weight: 500
    size: 14px
    
  # KPI values
  kpi_value:
    font: "Inter"
    weight: 700
    size: 32px
    
  # Chart labels
  chart_label:
    font: "Inter"
    weight: 400
    size: 12px
    
  # Data values
  data_value:
    font: "JetBrains Mono"
    weight: 400
    size: 13px
```

## Accessibility Requirements

| Requirement | Implementation | WCAG Level |
|-------------|----------------|------------|
| Color contrast | Min 4.5:1 for text | AA |
| Color independence | Patterns + colors | AA |
| Keyboard navigation | All interactive elements | AA |
| Screen reader | ARIA labels on charts | AA |
| Focus indicators | Visible focus ring | AA |
| Reduced motion | Respect prefers-reduced-motion | AA |

## Responsive Design

```yaml
responsive:
  breakpoints:
    desktop:
      min_width: 1200px
      columns: 12
      widget_padding: 24px
      
    tablet:
      min_width: 768px
      columns: 8
      widget_padding: 16px
      collapse:
        - side_panels
        
    mobile:
      min_width: 320px
      columns: 4
      widget_padding: 12px
      collapse:
        - multi_column_layouts
        - secondary_charts
      stack:
        - kpi_cards
```

## Chart Best Practices

| Practice | Guideline | Example |
|----------|-----------|---------|
| Y-axis zero | Start at zero for bar charts | Prevents visual distortion |
| Label clarity | Short, descriptive labels | "API Calls" not "Number of API Calls Made" |
| Data density | Max 7 categories in pie chart | Group others into "Other" |
| Time formatting | Consistent date formats | "Jan 15" not "1/15/2026" |
| Number formatting | Use SI prefixes | "1.2M" not "1,200,000" |
| Tooltips | Show full values on hover | Include context and units |

## Dark Mode Support

```yaml
dark_mode:
  enabled: true
  auto_detect: true  # Use system preference
  
  color_overrides:
    background: "#111827"
    surface: "#1F2937"
    text_primary: "#F9FAFB"
    text_secondary: "#9CA3AF"
    border: "#374151"
    
  chart_adjustments:
    reduce_saturation: 10%
    increase_brightness: 5%
```

**Verify current best practices with web search:**
Search the web: "data visualization best practices dashboards {date}"
Search the web: "analytics dashboard design accessibility {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After defining visualization design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific visualization patterns or accessibility requirements
- **P (Party Mode)**: Bring UX designer and data visualization expert perspectives
- **C (Continue)**: Accept visualization design and proceed to real-time vs batch processing
- **[Specific refinements]**: Describe additional visualization requirements

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: chart selection, design system, accessibility
- Process enhanced insights on visualization design
- Ask user: "Accept this detailed visualization analysis? (y/n)"
- If yes, integrate into design specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review visualization design for tenant analytics dashboards"
- Process UX designer and data visualization expert perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save visualization design specification to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Proceed to next step: `step-06-c-realtime-vs-batch.md`

---

## Soft Gate Checkpoint

**Steps 1-5 complete the dashboard structure and design.**

Present summary of:
- Analytics requirements and data aggregation
- Tenant data isolation strategy
- Dashboard components and widget library
- Visualization design system

Ask for confirmation before proceeding to processing architecture.

---

## Verification

- [ ] Chart selection guide defined
- [ ] Visual design system documented
- [ ] Typography standards established
- [ ] Accessibility requirements specified
- [ ] Responsive design rules created
- [ ] Chart best practices documented
- [ ] Dark mode support configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Visualization design specification
- Design system documentation
- Accessibility compliance guide

---

## Next Step

Proceed to `step-06-c-realtime-vs-batch.md` to define real-time vs batch processing.
