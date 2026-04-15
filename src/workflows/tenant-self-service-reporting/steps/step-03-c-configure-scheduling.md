# Step 3: Configure Scheduling

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

Configure scheduled report delivery options including frequency settings, schedule management interface, and tier-specific quotas and limits.

## Prerequisites

- Report types defined (Step 1)
- Report builder designed (Step 2)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: reporting
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: scheduling


---

## Inputs

- Report type and builder definitions from Steps 1-2
- User requirements for scheduling capabilities
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Configuration variables from module.yaml

---

## Actions

### 1. Define Scheduling Frequency Options

Define available scheduling frequencies per tier:

| Frequency | Free | Pro | Enterprise |
|-----------|------|-----|------------|
| On-Demand | Yes | Yes | Yes |
| Daily | No | Yes | Yes |
| Weekly | No | Yes | Yes |
| Monthly | No | Yes | Yes |
| Hourly | No | No | Yes |
| Custom Cron | No | No | Yes |
| Event-Triggered | No | No | Yes |

Considerations:
- Align with data freshness requirements
- Factor in compute costs per tier
- Account for timezone handling
- Consider peak load distribution

### 2. Define Schedule Quotas per Tier

Establish schedule limits and quotas:

| Quota | Free | Pro | Enterprise |
|-------|------|-----|------------|
| Active Schedules | 0 | 3 | Unlimited |
| Min Interval | N/A | Daily | Hourly |
| Max Recipients per Schedule | N/A | 5 | 50 |
| Schedule History | N/A | 30 days | 365 days |
| Concurrent Executions | N/A | 1 | 5 |
| Monthly Execution Limit | N/A | 100 | 10,000 |

### 3. Design Schedule Configuration Interface

Define schedule configuration options:

| Configuration | Description | Pro | Enterprise |
|---------------|-------------|-----|------------|
| Schedule Name | Display name | Yes | Yes |
| Description | Schedule purpose | Yes | Yes |
| Frequency | How often to run | Yes | Yes |
| Time/Day Selection | When to run | Yes | Yes |
| Timezone | User timezone | Yes | Yes |
| Start/End Date | Schedule validity period | Yes | Yes |
| Recipients | Email addresses | Yes | Yes |
| Subject Template | Email subject | Yes | Yes |
| Message Template | Email body | No | Yes |
| Delivery Format | Export format | Yes | Yes |
| Retry Policy | On failure behavior | No | Yes |
| Pause/Resume | Schedule control | Yes | Yes |

### 4. Define Notification Settings

Configure schedule notification options:

| Notification Type | Pro | Enterprise |
|-------------------|-----|------------|
| Success Email | Yes | Yes |
| Failure Email | Yes | Yes |
| Webhook on Success | No | Yes |
| Webhook on Failure | No | Yes |
| Slack Integration | No | Yes |
| Custom Notification Channel | No | Yes |

Notification Content:
| Field | Description |
|-------|-------------|
| Schedule ID | Unique identifier |
| Execution Time | When report ran |
| Status | Success/Failure |
| Row Count | Results count |
| Execution Duration | Time to generate |
| Download Link | Temporary secure link |
| Error Details | On failure only |

### 5. Design Schedule Management Features

Define schedule management capabilities:

| Feature | Pro | Enterprise |
|---------|-----|------------|
| View Schedule List | Yes | Yes |
| Edit Schedule | Yes | Yes |
| Clone Schedule | Yes | Yes |
| Delete Schedule | Yes | Yes |
| View Execution History | Yes | Yes |
| Download Past Reports | 30 days | 365 days |
| Bulk Operations | No | Yes |
| Schedule Ownership Transfer | No | Yes |
| Team Sharing | No | Yes |

### 6. Define Execution Monitoring

Establish schedule execution monitoring:

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Queue Depth | Pending executions | > 100 |
| Execution Time | Average duration | > 2x baseline |
| Failure Rate | Failed executions % | > 5% |
| Timeout Rate | Timed out % | > 1% |
| Resource Usage | CPU/Memory per tenant | > tier limit |

**Soft Gate Checkpoint:**

**Steps 1-3 complete the core reporting design.**

Present summary of:
- Report types per tier
- Builder capabilities
- Scheduling options

Ask for confirmation before proceeding to export design.

**Verify current best practices with web search:**
Search the web: "scheduled report delivery best practices {date}"
Search the web: "multi-tenant job scheduling patterns {date}"

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
- **A1**: Review scheduling frequency options for use cases
- **A2**: Analyze quota limits against typical usage
- **A3**: Evaluate notification options for user needs
- **A4**: Assess schedule management features completeness

### [P]ropose Changes
- **P1**: Propose scheduling frequency adjustments
- **P2**: Propose quota modifications
- **P3**: Suggest notification enhancements
- **P4**: Recommend management feature changes

### [C]ontinue
- **C1**: Accept current scheduling design and proceed to export
- **C2**: Mark step complete and load `step-04-c-design-export.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Scheduling frequencies defined per tier
- [ ] Schedule quotas established
- [ ] Schedule configuration interface designed
- [ ] Notification settings defined
- [ ] Schedule management features documented
- [ ] Execution monitoring defined
- [ ] Patterns align with pattern registry

## Outputs

- Scheduling frequency options matrix
- Schedule quotas per tier
- Schedule configuration specification
- Notification settings documentation
- Schedule management features
- Execution monitoring specifications
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

## Next Step

Proceed to `step-04-c-design-export.md` to design export formats and delivery channels.
