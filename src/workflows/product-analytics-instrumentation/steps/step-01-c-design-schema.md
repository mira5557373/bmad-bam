# Step 1: Design Event Schema

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

Design comprehensive event schema and taxonomy for product analytics.

---

## Prerequisites

- Master architecture defined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `analytics`

---

## Actions

### 1. Event Taxonomy

| Category | Prefix | Examples |
|----------|--------|----------|
| Page | page_ | page_viewed, page_exited |
| Feature | feature_ | feature_used, feature_enabled |
| User | user_ | user_signed_up, user_logged_in |
| System | system_ | system_error, system_alert |
| AI | ai_ | ai_query, ai_response |

### 2. Base Event Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event_id | string | Yes | UUID v4 |
| event_name | string | Yes | Event identifier |
| event_version | string | Yes | Schema version |
| timestamp | datetime | Yes | ISO 8601 UTC |
| tenant_id | string | Yes | Tenant identifier |
| user_id | string | No | User identifier |
| session_id | string | No | Session context |
| properties | object | No | Event-specific data |
| context | object | Yes | Environment context |

### 3. Context Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| app_version | string | Yes | Application version |
| platform | enum | Yes | web/ios/android/api |
| locale | string | Yes | User locale |
| timezone | string | Yes | User timezone |
| device | object | No | Device information |
| page | object | No | Page context |

### 4. Naming Conventions

| Convention | Format | Example |
|------------|--------|---------|
| Events | snake_case | feature_dashboard_viewed |
| Properties | camelCase | propertyName |
| Enums | UPPER_SNAKE | STATUS_ACTIVE |
| Timestamps | ISO 8601 | 2026-01-15T10:30:00Z |

**Verify current best practices with web search:**
Search the web: "product analytics event schema design {date}"
Search the web: "analytics tracking taxonomy best practices {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing schema design, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into schema design
- **P (Party Mode)**: Bring data and product perspectives
- **C (Continue)**: Accept schema and proceed to tracking plan
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save event schema to output document
- Update frontmatter `stepsCompleted: [1]`
- Proceed to next step: `step-02-c-create-tracking-plan.md`

---

## Verification

- [ ] Event taxonomy defined
- [ ] Base schema documented
- [ ] Context schema established
- [ ] Naming conventions specified
- [ ] Patterns align with pattern registry

---

## Outputs

- Event schema specification
- Taxonomy documentation
- Naming conventions guide
- **Load template:** `{project-root}/_bmad/bam/data/templates/expansion-strategy-template.md`

---

## Next Step

Proceed to `step-02-c-create-tracking-plan.md` to create tracking plan.
