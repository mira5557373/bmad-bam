# Step 4: Performance Verification

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics

---

## Purpose

Verify that the system meets performance requirements under realistic multi-tenant load conditions. This step ensures fair resource allocation across tenants (no noisy-neighbor problems), validates latency and throughput SLOs per subscription tier, and confirms cost projections are accurate.

## Prerequisites

- Agent safety verified (Step 3)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1-production-readiness.md`


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

**Verify current best practices with web search:**
Search the web: "performance testing API integration patterns {date}"
Search the web: "load testing SaaS contract design {date}"

_Source: [URL]_

1. **Run Load Tests with Multi-Tenant Traffic Patterns**
   - Execute load tests simulating realistic tenant distribution
   - Model traffic patterns based on expected tenant mix (free, pro, enterprise)
   - Test burst traffic scenarios from individual tenants
   - Simulate gradual tenant onboarding growth
   - Measure system behavior at 100%, 150%, and 200% expected load
   - Test geographic distribution of traffic if applicable

2. **Check Noisy-Neighbor Behavior (One Tenant's Load Doesn't Degrade Others)**
   - Run tests with one tenant generating 10x normal load
   - Measure latency impact on other tenants during burst
   - Verify rate limiting effectively isolates heavy users
   - Test resource quota enforcement per tier
   - Confirm queue isolation prevents cross-tenant delays
   - Validate connection pool fairness under contention

3. **Validate Latency SLOs Per Tier**
   - Measure P50, P95, P99 latencies for each endpoint
   - Compare against defined SLOs per subscription tier
   - Verify priority queue ordering for enterprise tenants
   - Test latency under degraded conditions (reduced capacity)
   - Validate timeout configurations per operation type
   - Document latency distribution across geographic regions

4. **Validate Cost Projections Per Tier**
   - Measure actual resource consumption per tenant tier
   - Calculate infrastructure cost per tenant at projected scale
   - Verify cost model assumptions against observed metrics
   - Identify cost optimization opportunities
   - Validate margin targets per subscription tier
   - Project costs at 2x, 5x, 10x current scale

## Outputs

- Load test results with performance metrics
- Noisy-neighbor analysis report
- SLO compliance matrix by tier
- Cost model validation document
- **Load template:** `{project-root}/_bmad/bam/data/templates/convergence-report-template.md`

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

### [A]nalyze - Deep Dive Options
| Code | Action | Description |
|------|--------|-------------|
| A1 | Analyze load patterns | Review expected traffic distribution for QG-I1/I2/I3 |
| A2 | Analyze SLO thresholds | Verify latency targets per subscription tier |
| A3 | Analyze resource utilization | Review capacity and cost projections |
| A4 | Analyze noisy-neighbor risks | Identify tenant isolation bottlenecks |

### [P]roceed - Action Options
| Code | Action | Description |
|------|--------|-------------|
| P1 | Execute load tests | Run multi-tenant load test suite |
| P2 | Execute SLO validation | Measure latencies against defined thresholds |
| P3 | Execute cost analysis | Validate cost model against actual metrics |
| P4 | Generate convergence report | Create final QG-P1 production readiness report |

### [C]ontinue - Navigation Options
| Code | Action | Description |
|------|--------|-------------|
| C1 | Complete workflow | Finish Create mode and generate reports |
| C2 | Return to Step 3 | Go back to agent safety verification |
| C3 | Jump to validation | Skip to step-20-v-load-artifact.md |

**Convergence Gate Context:** This step completes QG-I1/I2/I3 verification. On success, system is ready for QG-P1 production readiness assessment.

---

## Verification

- [ ] All SLO targets met under expected load
- [ ] Noisy-neighbor impact <10% latency degradation
- [ ] System stable at 150% expected load
- [ ] Cost per tenant within projected margins
- [ ] Rate limiting effectively enforced per tier
- [ ] Patterns align with pattern registry

**Soft Gate:** Steps 1-4 complete all verification phases. Present a summary of cross-module, tenant safety, agent safety, and performance results. Ask for confirmation before proceeding to the release recommendation.

## Next Step

On verification success: Generate QG-P1 production readiness report and proceed to production deployment.
