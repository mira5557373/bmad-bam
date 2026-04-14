# Step 2: Map Performance Obligations

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Map service offerings to distinct performance obligations per ASC 606 Step 2.

---

## Prerequisites

- Contract identification completed (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Service-to-Obligation Mapping

| Service Type | Performance Obligation | Recognition Pattern |
|--------------|------------------------|---------------------|
| Platform subscription | Stand-ready | Ratably over term |
| Usage-based services | Consumption | As consumed |
| Professional services | Milestone/time | As delivered |
| Support services | Stand-ready | Ratably over term |
| Training | Specific | At delivery |

### 2. Distinctness Evaluation

| Criterion | Test | Example |
|-----------|------|---------|
| Capable of being distinct | Customer can benefit on its own | API access without UI |
| Distinct in context | Not highly integrated | Support is distinct from platform |
| Not significantly modified | No significant customization | Standard features |

### 3. Performance Obligation Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| obligation_id | string | Unique identifier |
| contract_id | string | Parent contract |
| service_type | enum | Service classification |
| standalone_price | decimal | SSP for allocation |
| recognition_method | enum | Point-in-time or over-time |
| measure_of_progress | enum | Output or input method |

### 4. Recognition Method Selection

| Method | Criteria | Application |
|--------|----------|-------------|
| Over time | Customer receives benefit continuously | Subscription access |
| Point in time | Control transfers at specific point | One-time setup |
| Input method | Effort-based progress | Time & materials |
| Output method | Deliverable-based progress | Milestone delivery |

**Verify current best practices with web search:**
Search the web: "ASC 606 performance obligations SaaS subscription {date}"
Search the web: "revenue recognition over time vs point in time {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the performance obligation mapping above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into obligation mapping using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for mapping analysis
- **C (Continue)**: Accept obligation mapping and proceed to transaction price allocation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass obligation context: mappings, distinctness evaluation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into obligation summary
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review performance obligations for revenue recognition: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save obligation mapping to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-allocate-transaction-price.md`

---

## Verification

- [ ] All services mapped to performance obligations
- [ ] Distinctness evaluation documented
- [ ] Recognition methods selected with rationale
- [ ] Obligation attributes defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Performance obligation catalog
- Distinctness evaluation documentation
- Recognition method selection

---

## Next Step

Proceed to `step-03-c-allocate-transaction-price.md` to configure transaction price allocation.
