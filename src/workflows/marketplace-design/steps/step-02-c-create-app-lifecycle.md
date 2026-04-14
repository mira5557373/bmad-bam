# Step 2: Create App Lifecycle

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics


---

## Purpose

Design submission workflow, plan review process, configure installation flow, and handle updates and versioning.

## Prerequisites

- Step 1 completed: Architecture designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: app-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: versioning

---

## Actions

**Verify current best practices with web search:**
Search the web: "app store submission workflow best practices {date}"
Search the web: "marketplace app review process {date}"

_Source: [URL]_

### 1. Design Submission Workflow

| Stage | Actor | Duration | Outcome |
|-------|-------|----------|---------|
| Draft | Developer | - | App metadata |
| Submit | Developer | 1 hour | In review queue |
| Review | Platform team | 3-5 days | Approved/Rejected |
| Publish | System | Immediate | Live in marketplace |

### 2. Plan Review Process

| Check | Automated | Manual | Blocking |
|-------|-----------|--------|----------|
| Manifest validation | Yes | No | Yes |
| Security scan | Yes | No | Yes |
| API compliance | Yes | No | Yes |
| UX review | No | Yes | No |
| Content review | No | Yes | Yes |

### 3. Configure Installation Flow

| Step | Action | Tenant Control |
|------|--------|----------------|
| Discover | Browse/search | - |
| Preview | View details, screenshots | - |
| Install | One-click or OAuth | Admin approval |
| Configure | App settings | User/Admin |
| Uninstall | Remove app | Admin |

### 4. Handle Updates and Versioning

| Update Type | Review Required | Auto-update |
|-------------|-----------------|-------------|
| Patch | No | Yes |
| Minor | Expedited | Optional |
| Major | Full review | No |
| Security | Priority | Forced |

---

## Soft Gate Checkpoint

**Steps 1-2 complete the architecture and lifecycle design phase.**

Present summary and ask for confirmation before proceeding to billing integration.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

---

## Verification

- [ ] Submission workflow designed
- [ ] Review process planned
- [ ] Installation flow configured
- [ ] Versioning strategy defined
- [ ] Patterns align with pattern registry

## Outputs

- App lifecycle specification
- Review process document
- Installation flow design

## Next Step

Proceed to `step-03-c-configure-billing.md` to configure billing integration.
