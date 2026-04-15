# Step 3: Design Billing Rollup

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

Design cost aggregation and charge-back models across the tenant hierarchy.

---

## Prerequisites

- Step 2 completed (Permission inheritance defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: cost-tracking`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: usage-metering`

---

## Actions

### 1. Define Charge-Back Models

| Model | Description | Best For |
|-------|-------------|----------|
| Direct | Each tenant billed for own usage | Simple structures |
| Allocated | Parent allocates budget to children | Cost center management |
| Hybrid | Mix of direct and allocated | Complex enterprises |
| Showback | Track but don't charge internally | Internal visibility |

### 2. Cost Center Mapping

Define how costs map to organizational structure:

| Hierarchy Level | Cost Attribution | Billing Entity |
|-----------------|------------------|----------------|
| Root | Enterprise contract | Legal entity |
| BU | Cost center code | Department budget |
| Department | Sub-cost center | Project budget |
| Team | Internal allocation | Team budget |
| Project | Direct attribution | Project code |

### 3. Budget Enforcement

Specify budget controls at each level:

| Control Type | Enforcement | Action on Breach |
|--------------|-------------|------------------|
| Soft Limit | Warning only | Alert admins |
| Hard Limit | Block usage | Prevent new resources |
| Commitment | Prepaid amount | Draw from pool |
| Burst | Temporary overage | Bill at premium rate |

### 4. Usage Reporting Aggregation

Define rollup reporting:

- Real-time usage dashboards per hierarchy level
- Drill-down from root to leaf
- Cost allocation visibility
- Forecast vs actual comparison
- Anomaly detection alerts

### 5. Invoice Consolidation Options

| Option | Description | Use Case |
|--------|-------------|----------|
| Single Invoice | One invoice for root | Simple billing |
| Split by BU | Separate invoices per BU | Decentralized AP |
| Cost Center Split | Invoice sections by cost center | Detailed allocation |
| Custom | Flexible grouping | Complex requirements |

**Verify current best practices with web search:**
Search the web: "SaaS billing hierarchy charge-back {date}"
Search the web: "multi-tenant cost allocation enterprise {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the billing rollup design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into complex billing scenarios and edge cases
- **P (Party Mode)**: Bring analyst and architect perspectives for billing model review
- **C (Continue)**: Accept billing design and proceed to quota inheritance
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass billing context: charge-back models, cost centers, enforcement rules
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into billing design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review billing rollup: {summary of models and enforcement}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save billing rollup design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-design-quota-inheritance.md`

---

## Verification

- [ ] Charge-back models defined
- [ ] Cost center mapping complete
- [ ] Budget enforcement rules specified
- [ ] Reporting aggregation designed
- [ ] Invoice options documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Charge-back model specification
- Cost center mapping matrix
- Budget enforcement rules
- Invoice consolidation options

---

## Next Step

Proceed to `step-04-c-design-quota-inheritance.md` to define resource quota distribution.
