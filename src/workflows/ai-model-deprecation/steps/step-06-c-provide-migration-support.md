# Step 6: Provide Migration Support

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

Assist tenants through the migration process by providing tools, documentation, hands-on support, and troubleshooting to ensure successful transitions to replacement models.

---

## Prerequisites

- Step 05 (Notify Affected Tenants) completed
- Tenants notified of deprecation
- Migration tooling deployed
- Support team trained
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: tenant-support
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`

---

## Actions

### 1. Deploy Migration Tooling

Ensure migration tools are available and functional:

| Tool | Purpose | Availability | Documentation | Status |
|------|---------|--------------|---------------|--------|
| Model switcher UI | Self-service model selection | All tiers | User guide | {status} |
| Config migrator | Automated config translation | Pro/Enterprise | API docs | {status} |
| Prompt adapter | Prompt optimization assistant | Pro/Enterprise | Tutorial | {status} |
| Test harness | Side-by-side comparison | Enterprise | Dev guide | {status} |
| Rollback utility | Quick reversion capability | All tiers | Runbook | {status} |

### 2. Establish Support Tiers

Define support levels by tenant tier:

| Tenant Tier | Support Level | Response SLA | Channels | Assigned Team |
|-------------|---------------|--------------|----------|---------------|
| Enterprise | White-glove | 4 hours | Dedicated Slack, Phone | Migration specialists |
| Pro | Priority | 24 hours | Email, Chat | Support engineers |
| Free | Self-service | 72 hours | Knowledge base, Forum | Community support |

### 3. Provide Migration Documentation

Ensure comprehensive documentation exists:

| Document | Audience | Location | Last Updated | Owner |
|----------|----------|----------|--------------|-------|
| Migration quickstart | All | Docs site | {date} | {owner} |
| API compatibility guide | Developers | API docs | {date} | {owner} |
| Prompt migration playbook | AI engineers | Knowledge base | {date} | {owner} |
| Troubleshooting guide | Support | Internal wiki | {date} | {owner} |
| Best practices | All | Blog | {date} | {owner} |

### 4. Execute Hands-On Migration Assistance

Track assisted migrations for complex tenants:

| Tenant | Tier | Migration Type | Assigned Engineer | Start Date | Status | Issues |
|--------|------|----------------|-------------------|------------|--------|--------|
| {name} | Enterprise | Assisted | {engineer} | {date} | {status} | {issues} |

Assistance activities:
- Configuration review and optimization
- Prompt engineering consultation
- Performance tuning
- Custom integration support
- Validation testing

### 5. Manage Migration Issues

Track and resolve migration problems:

| Issue ID | Tenant | Issue Description | Severity | Status | Resolution |
|----------|--------|-------------------|----------|--------|------------|
| {id} | {tenant} | {description} | P1/P2/P3 | {status} | {resolution} |

Common issue categories:
- API compatibility errors
- Performance regressions
- Prompt quality degradation
- Cost increases
- Feature gaps

### 6. Provide Prompt Migration Assistance

Help tenants optimize prompts for new model:

| Service | Description | Eligible Tiers | Delivery Method |
|---------|-------------|----------------|-----------------|
| Prompt audit | Review existing prompts | Pro/Enterprise | Async review |
| Prompt rewrite | Optimize for new model | Enterprise | Consultation |
| A/B testing setup | Compare prompt performance | Pro/Enterprise | Self-service + guide |
| Quality evaluation | Assess output quality | Enterprise | Report delivery |

### 7. Conduct Migration Office Hours

Schedule regular support sessions:

| Session Type | Frequency | Duration | Format | Registration |
|--------------|-----------|----------|--------|--------------|
| General Q&A | Weekly | 1 hour | Webinar | Open |
| Technical deep-dive | Bi-weekly | 2 hours | Workshop | Limited |
| 1:1 consultations | On-demand | 30 min | Video call | Scheduled |
| Drop-in support | Daily | 2 hours | Chat room | Open |

### 8. Track Support Metrics

Monitor support effectiveness:

| Metric | Target | Current | Trend | Action if Below Target |
|--------|--------|---------|-------|----------------------|
| Ticket resolution time | <24 hours | {hours} | {trend} | Add support staff |
| First-response time | <4 hours | {hours} | {trend} | Improve triage |
| Customer satisfaction | >4.5/5 | {score} | {trend} | Review feedback |
| Self-service success | >70% | {%} | {trend} | Improve docs |
| Escalation rate | <10% | {%} | {trend} | Train support team |

**Verify current best practices with web search:**
Search the web: "SaaS migration support best practices {date}"
Search the web: "AI model migration assistance patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into support strategies
- **[P] Party Mode**: Collaborative support optimization
- **[C] Continue**: Proceed to fallback routing implementation

### Menu Options

### [A]nalyze Options
- **A1**: Analyze support ticket patterns for common issues
- **A2**: Review documentation effectiveness metrics
- **A3**: Evaluate migration tooling usage
- **A4**: Assess team capacity vs. demand

### [P]ropose Changes
- **P1**: Propose additional support resources
- **P2**: Suggest documentation improvements
- **P3**: Recommend tooling enhancements
- **P4**: Identify automation opportunities

### [C]ontinue
- **C1**: Confirm support infrastructure ready and proceed
- **C2**: Mark step complete and load `07-implement-fallback-routing.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Migration tooling deployed and tested
- [ ] Support tiers established and communicated
- [ ] Documentation published and accessible
- [ ] Hands-on assistance available for complex migrations
- [ ] Issue tracking system operational
- [ ] Prompt migration assistance available
- [ ] Office hours scheduled
- [ ] Support metrics tracking active

---

## Outputs

- Migration tooling deployment record
- Support tier definition document
- Documentation inventory and status
- Assisted migration tracker
- Issue log and resolution record
- Support metrics dashboard

---

## Next Step

Proceed to `step-07-c-implement-fallback-routing.md` to route traffic to replacement models.
