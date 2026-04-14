# Step 2: Map Stakeholder Interests

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
- Use web search to verify current best practices when mapping stakeholder interests
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Map stakeholder interests, concerns, and influence levels to understand power dynamics and establish effective engagement strategies for the multi-tenant platform initiative.

## Prerequisites

- Stakeholders identified (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: stakeholder


---

## Inputs

- Stakeholder registry from Step 1
- Organizational context
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Map Stakeholder Interests

For each stakeholder group, identify primary interests:

| Stakeholder Group | Primary Interests | Secondary Interests |
|-------------------|-------------------|---------------------|
| Engineering | Technical excellence, scalability, maintainability | Developer experience, tooling |
| Product | Feature velocity, customer value, market fit | Roadmap flexibility |
| Operations | System stability, observability, automation | On-call burden reduction |
| Security | Data protection, compliance, access control | Audit trail, threat detection |
| Enterprise Customers | Reliability, SLA guarantees, isolation | Custom integrations, support |
| Pro Customers | Value for cost, performance, features | Self-service capabilities |
| Partners | Integration ease, revenue share, co-marketing | Technical documentation |

### 2. Identify Stakeholder Concerns

Document concerns and potential objections:

| Stakeholder Group | Primary Concerns | Mitigation Approach |
|-------------------|------------------|---------------------|
| Engineering | Technical debt, complexity | Modular architecture, clear boundaries |
| Product | Time to market, scope creep | Phased delivery, MVP focus |
| Operations | Operational overhead, alert fatigue | Automation, tenant-aware observability |
| Security | Data leakage, compliance violations | Tenant isolation, audit logging |
| Enterprise Customers | Vendor lock-in, data sovereignty | Open standards, data portability |
| Pro Customers | Price increases, feature parity | Transparent pricing, tier clarity |
| Partners | API stability, breaking changes | Versioning, deprecation policy |

### 3. Assess Influence Levels

Create power/influence matrix:

| Influence Level | Definition | Engagement Strategy |
|-----------------|------------|---------------------|
| High | Can approve/block decisions, budget authority | Direct involvement, co-creation |
| Medium | Strong input, respected opinions | Regular consultation, feedback loops |
| Low | Limited decision power, end users | Information sharing, surveys |

### 4. Build Interest-Influence Matrix

| Stakeholder | Interest Level | Influence Level | Strategy |
|-------------|---------------|-----------------|----------|
| CTO | High | High | Manage Closely |
| VP Engineering | High | High | Manage Closely |
| Product Manager | High | Medium | Keep Satisfied |
| Enterprise Customer | High | High | Manage Closely |
| Pro Customer | Medium | Low | Keep Informed |
| Free User | Low | Low | Monitor |

**Quadrant Strategies:**
- **High Interest + High Influence:** Manage Closely - Key players, involve in decisions
- **High Interest + Low Influence:** Keep Informed - Address concerns, regular updates
- **Low Interest + High Influence:** Keep Satisfied - Minimal effort, monitor for changes
- **Low Interest + Low Influence:** Monitor - Periodic check-ins

### 5. Identify Conflicts of Interest

Document potential conflicts:

| Conflict | Stakeholders Involved | Impact | Resolution Approach |
|----------|----------------------|--------|---------------------|
| Feature priority | Product vs Engineering | Medium | Joint prioritization sessions |
| Cost vs features | Finance vs Product | High | ROI-based decision framework |
| Speed vs quality | Business vs Engineering | High | Quality gates with SLAs |
| Isolation vs cost | Security vs Finance | Medium | Tiered isolation model |

### 6. Document Dependencies

Map stakeholder dependencies:

| Stakeholder | Depends On | Dependency Type |
|-------------|------------|-----------------|
| Engineering | Product | Requirements, priorities |
| Operations | Engineering | Deployment artifacts, runbooks |
| Security | Engineering | Security controls implementation |
| Customers | Operations | Platform availability |
| Partners | Engineering | API stability, documentation |

**Verify current best practices with web search:**
Search the web: "stakeholder interest mapping SaaS platforms {date}"
Search the web: "power influence matrix enterprise software {date}"

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
- **A1**: Review interest mapping for completeness
- **A2**: Analyze influence assessment accuracy
- **A3**: Evaluate conflict identification coverage
- **A4**: Assess dependency mapping completeness

### [P]ropose Changes
- **P1**: Propose interest mapping refinements
- **P2**: Suggest influence level adjustments
- **P3**: Recommend additional conflict mitigations
- **P4**: Propose dependency relationship updates

### [C]ontinue
- **C1**: Accept current interest mapping and proceed to communication plan
- **C2**: Mark step complete and load `step-03-c-define-communication-plan.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Interests mapped for all stakeholder groups
- [ ] Concerns documented with mitigation approaches
- [ ] Influence levels assessed for all stakeholders
- [ ] Interest-influence matrix complete
- [ ] Conflicts of interest identified
- [ ] Dependencies documented
- [ ] Patterns align with pattern registry

## Outputs

- Stakeholder interest mapping
- Interest-influence matrix
- Conflict identification and resolution approaches
- Dependency mapping
- **Load template:** `{project-root}/_bmad/bam/templates/stakeholder-map-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/competitive-analysis-template.md`

## Next Step

Proceed to `step-03-c-define-communication-plan.md` to define communication cadence and channels per stakeholder group.
