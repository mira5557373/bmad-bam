# Step 2: Design Engagement Tracking

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

Design a comprehensive engagement tracking system to monitor trial user behavior, identify high-intent users, and trigger appropriate conversion actions.

---

## Prerequisites

- Step 1 completed: Trial model analysis
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Define Engagement Events

Specify events to track for conversion signals:

| Event | Category | Properties | Conversion Signal |
|-------|----------|------------|-------------------|
| `trial.started` | Lifecycle | tenant_id, source, plan | Baseline |
| `feature.used` | Engagement | feature_id, duration, count | High if core feature |
| `user.invited` | Expansion | invitee_count, roles | Very High |
| `integration.connected` | Stickiness | integration_type | Very High |
| `limit.approached` | Urgency | resource_type, usage_pct | High |
| `support.contacted` | Intent | topic, resolution | Medium |
| `docs.viewed` | Education | page, duration | Low-Medium |
| `pricing.viewed` | Intent | plan_viewed, frequency | Very High |

### 2. Design Engagement Scoring Model

Create a scoring system to rank trial users:

| Factor | Points | Decay | Max Score |
|--------|--------|-------|-----------|
| Daily Active Use | +5/day | None | 70 |
| Core Feature Usage | +10/feature | None | 50 |
| Team Members Added | +15/member | None | 45 |
| Integration Setup | +20/integration | None | 40 |
| Pricing Page Visit | +10/visit | 50%/week | 30 |
| Support Interaction | +5/ticket | None | 25 |

**Score Thresholds:**
| Score Range | Classification | Action |
|-------------|----------------|--------|
| 0-30 | At Risk | Re-engagement campaign |
| 31-70 | Engaged | Nurture sequence |
| 71-120 | High Intent | Sales outreach |
| 121+ | Ready to Buy | Conversion push |

### 3. Design Data Pipeline

Specify the tracking data pipeline:

| Component | Technology | Purpose | SLA |
|-----------|------------|---------|-----|
| Event Collection | {SDK/API} | Capture user events | <100ms |
| Event Processing | {Stream processor} | Real-time scoring | <1s |
| Score Storage | {Database} | Persist engagement scores | <50ms |
| Analytics | {Warehouse} | Historical analysis | 15min delay |
| Triggers | {Event bus} | Conversion actions | <5s |

### 4. Define Tenant Isolation for Tracking

Ensure tracking respects tenant boundaries:

| Aspect | Isolation Strategy | Implementation |
|--------|-------------------|----------------|
| Event Storage | Tenant-partitioned | tenant_id in all events |
| Score Calculation | Per-tenant | Isolated scoring pipeline |
| Data Retention | Tenant-specific | Configurable retention |
| Export | Tenant-scoped | Only own events exportable |

### 5. Design Reporting Dashboard

Specify conversion analytics dashboard:

| Widget | Metrics | Visualization |
|--------|---------|---------------|
| Conversion Funnel | Trial → Activated → Engaged → Converted | Funnel chart |
| Score Distribution | Users by engagement score | Histogram |
| Time to Convert | Days from trial to paid | Line chart |
| Feature Adoption | Features used by trial users | Bar chart |
| Conversion by Source | Conversion rate by acquisition channel | Table |

**Verify current best practices with web search:**
Search the web: "SaaS user engagement tracking patterns {date}"
Search the web: "trial user behavior analytics best practices {date}"

_Source: [URL]_

---

## Soft Gate Checkpoint

**Steps 1-2 complete the trial analysis and engagement tracking design.**

Present summary of:
- Trial model configuration
- Engagement event taxonomy
- Scoring model with thresholds

Ask for confirmation before proceeding to conversion workflow design.

---

## COLLABORATION MENUS (A/P/C):

After completing the engagement tracking design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific tracking events or scoring
- **P (Party Mode)**: Bring data and product perspectives on engagement model
- **C (Continue)**: Accept engagement tracking design and proceed to conversion workflows
- **[Specific refinements]**: Describe engagement tracking concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: engagement events, scoring model, data pipeline
- Process enhanced insights on tracking completeness
- Ask user: "Accept these refined engagement tracking specs? (y/n)"
- If yes, integrate into engagement design
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review engagement tracking design for trial conversion optimization"
- Process data and product perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save engagement tracking design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-conversion-workflows.md`

---

## Verification

- [ ] Engagement events defined with properties
- [ ] Scoring model documented with thresholds
- [ ] Data pipeline specified
- [ ] Tenant isolation addressed
- [ ] Dashboard requirements defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Engagement event taxonomy
- Scoring model documentation
- Data pipeline specification
- Dashboard requirements

---

## Next Step

Proceed to `step-03-c-design-conversion-workflows.md` to design automated conversion workflows.
