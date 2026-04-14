# Step 4: Sampling Strategies

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

Define intelligent sampling strategies that balance observability coverage with cost efficiency, providing differentiated tracing depth by tenant tier and ensuring critical traces are always captured.

---

## Prerequisites

- Step 3 completed (tenant correlation defined)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: sampling`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: cost-optimization`

---


## Inputs

- Tenant correlation design from Step 3
- Tenant tier definitions and SLAs
- Cost constraints and budget
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

- Define head-based sampling by endpoint:
  | Endpoint Category | Sample Rate | Rationale |
  |-------------------|-------------|-----------|
  | Health checks | 0.1% | High volume, low value |
  | Static assets | 0% | No tracing needed |
  | Authentication | 100% | Security-critical |
  | Payment/billing | 100% | Business-critical |
  | Standard API | Tier-based | Cost optimization |

- Design tail-based sampling rules:
  | Condition | Action | Purpose |
  |-----------|--------|---------|
  | Error status (4xx, 5xx) | Always sample | Error investigation |
  | Latency > P99 threshold | Always sample | Performance analysis |
  | Specific tenant flag | Always sample | Support investigation |
  | Manual trace flag | Always sample | Debugging support |

- Configure tier-based sampling rates:
  | Tier | Sample Rate | Retention | SLA Commitment |
  |------|-------------|-----------|----------------|
  | Enterprise | 100% | 30 days | Full trace coverage |
  | Pro | 50% | 14 days | Error + slow traces |
  | Free | 10% | 7 days | Error traces only |

- Define cost optimization strategies:
  - Dynamic rate adjustment based on volume
  - Span attribute filtering (drop verbose attributes)
  - Trace duration limits
  - Storage tier selection by age

- Design sampling decision flow:
  1. Check if error or slow trace (tail-based)
  2. Check if critical endpoint (always sample)
  3. Check tenant tier (tier-based rate)
  4. Apply head-based decision
  5. Propagate decision to all child spans

- Calculate cost projections:
  | Metric | Enterprise | Pro | Free |
  |--------|------------|-----|------|
  | Spans/day | 10M | 5M | 1M |
  | Sample rate | 100% | 50% | 10% |
  | Stored spans | 10M | 2.5M | 100K |
  | Est. cost/day | $X | $Y | $Z |

**Verify current best practices with web search:**
Search the web: "OpenTelemetry sampling strategies production {date}"
Search the web: "tail-based sampling distributed tracing {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the sampling strategies design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into sampling rate tuning and cost optimization
- **P (Party Mode)**: Bring analyst and architect perspectives for sampling review
- **C (Continue)**: Accept sampling strategies and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: sampling rates, cost projections, tier differentiation
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into sampling design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review sampling strategies: {summary of rates, rules, and costs}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save sampling strategies to output document
- Generate final distributed-tracing-design.md
- Update frontmatter `stepsCompleted: [1, 2, 3, 4]`
- Complete Create mode

---

## Verification

- [ ] Head-based sampling by endpoint defined
- [ ] Tail-based sampling rules configured
- [ ] Tier-based rates documented with SLA alignment
- [ ] Cost optimization strategies defined
- [ ] Sampling decision flow documented
- [ ] Cost projections calculated
- [ ] Patterns align with pattern registry

---

## Outputs

- Sampling strategy specification
- Tier-based rate configuration
- Cost projection model
- Sampling decision flow diagram
- **Save to:** `{output_folder}/planning-artifacts/architecture/distributed-tracing-design.md`

---

## Workflow Complete

Create mode complete. The distributed tracing design is now available at:
`{output_folder}/planning-artifacts/architecture/distributed-tracing-design.md`

Proceed to Edit mode to modify or Validate mode to check against QG-P1.
