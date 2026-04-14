# Step 5: Notify Affected Tenants

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOOP **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- WRITE Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array
- SEARCH Use web search to verify current best practices when making technology decisions
- CLIP Reference pattern registry `web_queries` for search topics

---

## Purpose

Execute the tenant communication plan for the model deprecation, ensuring all affected tenants receive appropriate notice through proper channels with actionable information.

---

## Prerequisites

- Step 04 (Plan Migration Timeline) completed
- Migration timeline approved
- Communication templates prepared
- Tenant contact information validated
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-communication
- **Load template:** `{project-root}/_bmad/bam/templates/tenant-notification-template.md`

---

## Actions

### 1. Prepare Communication Templates

Create tier-specific notification templates:

| Template | Audience | Tone | Key Elements | Approval Status |
|----------|----------|------|--------------|-----------------|
| Enterprise Notice | Enterprise admins | Formal, consultative | Timeline, dedicated support, migration offer | {status} |
| Pro Announcement | Pro account owners | Professional, helpful | Timeline, self-service tools, upgrade path | {status} |
| Free User Alert | Free tier users | Clear, actionable | Timeline, migration guide, FAQ link | {status} |

Template elements to include:
- Clear deprecation date
- Why the change is happening
- What action is required
- Available support resources
- Links to documentation

### 2. Define Communication Channels

Map channels to tenant segments:

| Channel | Tenant Tier | Timing | Content Type | Tracking Method |
|---------|-------------|--------|--------------|-----------------|
| Email - Executive | Enterprise | T-90 days | Formal letter | Read receipt |
| Email - Technical | Enterprise/Pro | T-60 days | Technical guide | Open tracking |
| In-app notification | All | T-60 days | Banner + modal | Dismiss tracking |
| Product changelog | All | T-60 days | Announcement | Page views |
| API response header | All | T-30 days | Deprecation warning | Log analysis |
| Status page | All | Ongoing | Timeline updates | Subscription |

### 3. Execute Enterprise Notifications

Personalized outreach for enterprise tenants:

| Tenant | Primary Contact | Notification Date | Delivery Method | Follow-up Scheduled |
|--------|-----------------|-------------------|-----------------|---------------------|
| {name} | {contact} | {date} | Email + Call | {date} |

Enterprise notification sequence:
1. Executive summary email (T-90 days)
2. Technical contact briefing (T-85 days)
3. Migration planning call (T-80 days)
4. Written migration plan delivery (T-75 days)
5. Regular check-ins (bi-weekly)

### 4. Execute Pro Tier Notifications

Standardized outreach for pro tenants:

| Notification | Send Date | Channel | Content | Response Tracking |
|--------------|-----------|---------|---------|-------------------|
| Initial notice | T-60 days | Email | Full announcement | Open/click rates |
| Reminder 1 | T-45 days | Email + In-app | Migration reminder | Engagement |
| Reminder 2 | T-30 days | Email + In-app | Urgency escalation | Migration status |
| Final notice | T-14 days | Email + In-app + Banner | Final warning | Action completion |

### 5. Execute Free Tier Notifications

Self-service focused notifications:

| Notification | Send Date | Channel | Content | Escalation Path |
|--------------|-----------|---------|---------|-----------------|
| Initial notice | T-30 days | In-app banner | Simple announcement | FAQ link |
| Reminder | T-14 days | In-app modal | Migration prompt | Support article |
| Final notice | T-7 days | In-app blocking modal | Action required | Upgrade offer |

### 6. Provide Supporting Resources

Document available resources for tenants:

| Resource | Type | Location | Audience | Update Frequency |
|----------|------|----------|----------|------------------|
| Migration guide | Documentation | Docs site | All | Weekly |
| API changelog | Technical | API docs | Developers | Per release |
| FAQ | Support | Help center | All | As needed |
| Video tutorial | Training | Learning portal | All | Once |
| Migration tool | Self-service | Developer portal | Pro/Enterprise | Per release |

### 7. Track Communication Effectiveness

Monitor notification metrics:

| Metric | Target | Current | Action if Below Target |
|--------|--------|---------|----------------------|
| Email open rate | >60% | {%} | Resend with new subject |
| In-app dismiss rate | <20% | {%} | Review message clarity |
| FAQ page visits | >1000 | {count} | Promote in notifications |
| Support tickets | <50/day | {count} | Improve self-service docs |
| Migration starts | >10%/week | {%} | Add incentives |

**Verify current best practices with web search:**
Search the web: "SaaS deprecation communication best practices {date}"
Search the web: "multi-tenant notification strategy patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into communication strategy
- **[P] Party Mode**: Collaborative messaging optimization
- **[C] Continue**: Proceed to migration support

### Menu Options

### [A]nalyze Options
- **A1**: Review template effectiveness with A/B testing
- **A2**: Analyze communication channel preferences by segment
- **A3**: Evaluate notification timing optimization
- **A4**: Assess escalation procedures for non-responsive tenants

### [P]ropose Changes
- **P1**: Propose template improvements based on engagement data
- **P2**: Suggest additional communication channels
- **P3**: Recommend incentive strategies for early migration
- **P4**: Identify high-touch tenant opportunities

### [C]ontinue
- **C1**: Confirm notifications sent and proceed
- **C2**: Mark step complete and load `06-provide-migration-support.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Communication templates approved for all tiers
- [ ] Communication channels configured and tested
- [ ] Enterprise notifications personalized and sent
- [ ] Pro tier notifications deployed
- [ ] Free tier notifications activated
- [ ] Supporting resources published
- [ ] Communication tracking operational

---

## Outputs

- Approved notification templates
- Channel distribution plan
- Enterprise notification log
- Pro/Free notification deployment record
- Resource publication checklist
- Communication effectiveness dashboard

---

## Next Step

Proceed to `step-06-c-provide-migration-support.md` to assist tenant migrations.
