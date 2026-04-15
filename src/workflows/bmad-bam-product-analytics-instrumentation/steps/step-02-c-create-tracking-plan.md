# Step 2: Create Tracking Plan

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions

---

## Purpose

Create comprehensive tracking plan for analytics events.

---

## Prerequisites

- Step 1 completed (Schema designed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Core Events

| Event | Trigger | Properties | Priority |
|-------|---------|------------|----------|
| user_signed_up | Registration complete | plan, source, referrer | Critical |
| user_logged_in | Auth success | method, mfa_used | Critical |
| feature_used | Feature interaction | feature_id, duration | High |
| page_viewed | Page load | page_name, referrer | High |
| ai_query_sent | AI request | model, token_count | High |

### 2. Conversion Events

| Event | Trigger | Properties | Priority |
|-------|---------|------------|----------|
| trial_started | Trial begin | plan_type, source | Critical |
| subscription_created | Payment complete | plan, amount, currency | Critical |
| upgrade_completed | Plan upgrade | from_plan, to_plan | Critical |
| feature_activated | Feature first use | feature_id, time_to_activate | High |

### 3. Engagement Events

| Event | Trigger | Properties | Priority |
|-------|---------|------------|----------|
| session_started | App open | entry_point, is_return | High |
| session_ended | App close/timeout | duration, pages_viewed | High |
| search_performed | Search query | query, results_count | Medium |
| export_requested | Data export | format, data_type | Medium |

### 4. Implementation Checklist

| Platform | SDK | Events | Status |
|----------|-----|--------|--------|
| Web | Segment/Amplitude | All | Planned |
| iOS | Native SDK | All | Planned |
| Android | Native SDK | All | Planned |
| API | Server-side | Server events | Planned |

**Verify current best practices with web search:**
Search the web: "product analytics tracking plan template {date}"
Search the web: "event instrumentation best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tracking plan
- **P (Party Mode)**: Bring product and engineering perspectives
- **C (Continue)**: Accept tracking plan and proceed to pipeline design
```

#### If 'C' (Continue):
- Save tracking plan to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-pipeline.md`

---

## Verification

- [ ] Core events defined
- [ ] Conversion events documented
- [ ] Engagement events established
- [ ] Implementation planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Tracking plan document
- Event specifications
- Implementation checklist
- **Load template:** `{project-root}/_bmad/bam/data/templates/growth-strategy-template.md`

---

## Next Step

Proceed to `step-03-c-design-pipeline.md` to design analytics pipeline.
