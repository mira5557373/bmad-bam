# Step 5: Create Portal Wireframes

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
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Create the information architecture and key wireframes for the tenant portal.

---

## Prerequisites

- Billing integration designed (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `customization`

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

Create portal information architecture and wireframes:

---

## Navigation Structure

```
Tenant Portal
├── Dashboard
│   ├── Overview
│   ├── Usage Summary
│   └── Quick Actions
├── Agents
│   ├── My Agents
│   ├── Shared Agents
│   └── Agent Templates
├── Conversations
│   ├── Active
│   └── History
├── Settings
│   ├── Profile
│   ├── Security
│   └── Notifications
├── Team (Admin)
│   ├── Members
│   ├── Roles
│   └── Invitations
├── Billing (Admin)
│   ├── Plan
│   ├── Usage
│   ├── Invoices
│   └── Payment Methods
├── Integrations (Admin)
│   ├── API Keys
│   ├── Webhooks
│   └── SSO (Enterprise)
└── Audit Log (Admin/Pro+)
```

---

## Dashboard Layout

| Section | Content | Position |
|---------|---------|----------|
| Header | Logo, search, notifications, profile | Top |
| Welcome Card | User name, quick stats | Top left |
| Usage Summary | API calls, storage, agents | Top right |
| Recent Agents | Last 5 accessed agents | Middle left |
| Activity Feed | Recent actions, notifications | Middle right |
| Quick Actions | Create agent, invite user | Bottom |

---

## Settings Organization

| Category | Settings |
|----------|----------|
| Profile | Name, email, avatar, timezone, language |
| Security | Password, MFA, sessions, API keys |
| Notifications | Email, in-app, webhooks |
| Preferences | Theme, dashboard layout, default workspace |

---

## Mobile Responsiveness

| Breakpoint | Layout Changes |
|------------|----------------|
| Desktop (>1200px) | Full sidebar, 3-column dashboard |
| Tablet (768-1200px) | Collapsible sidebar, 2-column dashboard |
| Mobile (<768px) | Bottom nav, single column, simplified cards |

Mobile-specific considerations:
- Touch-friendly tap targets (44px minimum)
- Swipe gestures for navigation
- Simplified data tables
- Progressive disclosure of complex settings

---

## Key Wireframe Descriptions

### 1. Dashboard (Desktop)
- Left sidebar with navigation
- Central area with welcome card and usage graphs
- Right panel with activity feed
- Floating action button for quick actions

### 2. Team Management
- User table with search/filter
- Inline role dropdown
- Bulk action toolbar
- Invite modal overlay

### 3. Billing Overview
- Current plan card with upgrade CTA
- Usage meters with quota bars
- Invoice list with download links
- Payment method cards

---

## Documentation Deliverables

Output files to generate:
- `{output_folder}/planning-artifacts/ux/tenant-portal-design.md`
- `{output_folder}/planning-artifacts/ux/portal-information-architecture.md`

**Verify current best practices with web search:**
Search the web: "tenant portal wireframes tenant lifecycle {date}"
Search the web: "SaaS portal information architecture multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the portal wireframes above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into UX requirements and flows
- **P (Party Mode)**: Bring analyst and architect perspectives for wireframe review
- **C (Continue)**: Accept wireframes and finalize portal design
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass wireframe context: navigation, layouts, mobile
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into portal wireframes
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review portal wireframes: {summary of IA and layouts}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save portal wireframes to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final portal design documentation

---

## Verification

- [ ] Navigation structure defined
- [ ] Dashboard layout designed
- [ ] Settings organization complete
- [ ] Mobile responsiveness specified
- [ ] Key wireframes described
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant portal design document
- Information architecture diagram
- **Load template:** `{project-root}/_bmad/bam/templates/ux-design-template.md`

---

## Next Step

Proceed to validation mode to verify portal design, or continue with implementation using the design specifications.
