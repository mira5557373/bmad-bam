# Step 2: Design Journey Tracking

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

Design journey event tracking and path analysis.

---

## Prerequisites

- Step 1 completed (Journeys mapped)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Event Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event_id | string | Yes | Unique event ID |
| tenant_id | string | Yes | Tenant identifier |
| user_id | string | Yes | User identifier |
| session_id | string | Yes | Session context |
| journey_id | string | Yes | Journey instance |
| touchpoint | string | Yes | Touchpoint reached |
| phase | enum | Yes | Journey phase |
| timestamp | datetime | Yes | Event time |
| properties | object | No | Event metadata |

### 2. Path Tracking

| Metric | Definition | Calculation |
|--------|------------|-------------|
| Path Length | Steps to conversion | Count(touchpoints) |
| Time in Journey | Duration to goal | Last - First timestamp |
| Drop-off Point | Where users leave | Last touchpoint |
| Conversion Path | Successful sequence | Ordered touchpoints |

### 3. Attribution Model

| Model | Description | Use Case |
|-------|-------------|----------|
| First Touch | Credit first touchpoint | Awareness |
| Last Touch | Credit last touchpoint | Conversion |
| Linear | Equal credit to all | Balanced |
| Time Decay | More to recent | Revenue |
| Position Based | First/last weighted | Full funnel |

### 4. Session Stitching

| Challenge | Solution | Implementation |
|-----------|----------|----------------|
| Cross-device | Unified ID | Auth-based linking |
| Anonymous | Session merge | Cookie + fingerprint |
| Time gaps | Session timeout | 30-min window |
| Multi-tenant | Isolation | Tenant context |

**Verify current best practices with web search:**
Search the web: "customer journey tracking implementation {date}"
Search the web: "multi-touch attribution SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into tracking architecture
- **P (Party Mode)**: Bring data and product perspectives
- **C (Continue)**: Accept tracking and proceed to optimization
```

#### If 'C' (Continue):
- Save tracking design to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design-optimization.md`

---

## Verification

- [ ] Event schema defined
- [ ] Path tracking designed
- [ ] Attribution model selected
- [ ] Session stitching planned
- [ ] Patterns align with pattern registry

---

## Outputs

- Event tracking specification
- Path analysis design
- Attribution model

---

## Next Step

Proceed to `step-03-c-design-optimization.md` to design journey optimization.
