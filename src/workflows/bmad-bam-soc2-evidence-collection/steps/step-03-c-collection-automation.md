# Step 3: Collection Automation

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design automated evidence collection pipelines that continuously gather and store audit evidence, reducing manual effort and ensuring completeness.

---

## Prerequisites

- Step 2 completed: Evidence sources mapped with query definitions
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: automation

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Collection Architecture

Define the automated collection system:

| Component | Purpose | Technology Options |
|-----------|---------|-------------------|
| Scheduler | Trigger collection jobs | Airflow, Temporal, cron |
| Collectors | Execute evidence queries | Python scripts, Lambda |
| Storage | Store collected evidence | S3, GCS, secure archive |
| Indexer | Catalog and tag evidence | Elasticsearch, database |
| Validator | Verify evidence completeness | Custom validation |
| Dashboard | Monitor collection status | Grafana, custom UI |

### 2. Define Collection Jobs

Design automated collection jobs:

| Job Name | Control(s) | Schedule | Collector | Output |
|----------|------------|----------|-----------|--------|
| daily_auth_logs | CC6.1 | Daily 2am | auth_collector | audit_logs/{date}/ |
| weekly_user_access | CC6.4 | Weekly Sun | access_collector | access_review/{week}/ |
| monthly_config_snapshot | CC6.5, CC7.1 | Monthly 1st | config_collector | config/{month}/ |
| quarterly_access_review | CC6.4 | Quarterly | review_collector | reviews/{quarter}/ |
| continuous_incidents | CC7.3 | On event | incident_collector | incidents/{id}/ |
| daily_change_logs | CC8.1 | Daily 3am | change_collector | changes/{date}/ |

### 3. Design Collection Pipelines

Define pipeline stages for each job type:

**Log Collection Pipeline:**

| Stage | Action | Validation | Output |
|-------|--------|------------|--------|
| Extract | Query source system | Connection verified | Raw data |
| Transform | Normalize format, redact PII | Schema validation | Cleaned data |
| Hash | Generate integrity hash | Hash computed | Evidence + hash |
| Store | Write to secure storage | Write confirmed | Storage path |
| Index | Update evidence catalog | Index updated | Catalog entry |
| Notify | Alert on completion/failure | Notification sent | Status |

**Configuration Snapshot Pipeline:**

| Stage | Action | Validation | Output |
|-------|--------|------------|--------|
| Connect | Authenticate to system | Auth successful | Session |
| Capture | Export configuration | Export complete | Config data |
| Screenshot | Generate visual evidence | Image captured | Screenshot |
| Compare | Diff against baseline | Changes identified | Change report |
| Store | Archive with metadata | Storage confirmed | Evidence package |
| Alert | Notify on unexpected changes | Alert evaluated | Notification |

### 4. Design Evidence Validation

Define validation rules for collected evidence:

| Validation | Rule | Failure Action |
|------------|------|----------------|
| Completeness | All required fields present | Retry collection |
| Format | Matches expected schema | Transform and retry |
| Integrity | Hash matches original | Alert + investigate |
| Timeliness | Collected within SLA | Alert + escalate |
| Coverage | All controls have evidence | Generate gap report |
| Freshness | Evidence not stale | Trigger new collection |

### 5. Design Evidence Storage

Define storage architecture:

| Tier | Purpose | Retention | Access |
|------|---------|-----------|--------|
| Active | Current audit period | 1 year | Immediate |
| Archive | Historical audits | 7 years | Within 24h |
| Legal Hold | Litigation or investigation | Indefinite | On approval |

**Storage Structure:**

```
evidence-bucket/
├── {audit-period}/
│   ├── CC6-logical-access/
│   │   ├── CC6.1-authentication/
│   │   │   ├── config/
│   │   │   ├── logs/
│   │   │   └── screenshots/
│   │   ├── CC6.4-access-review/
│   │   └── ...
│   ├── CC7-system-operations/
│   ├── CC8-change-management/
│   └── manifests/
│       ├── evidence-catalog.json
│       └── integrity-hashes.json
```

### 6. Design Monitoring and Alerting

Define collection monitoring:

| Metric | Threshold | Alert |
|--------|-----------|-------|
| Collection success rate | < 99% | PagerDuty critical |
| Collection latency | > 1 hour | Slack warning |
| Evidence gaps | Any missing | Daily digest |
| Storage usage | > 80% | Capacity planning |
| Validation failures | > 5/day | Investigate |

**Verify current best practices with web search:**
Search the web: "automated compliance evidence collection architecture {date}"
Search the web: "continuous compliance monitoring pipelines {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the automation design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific automation components
- **P (Party Mode)**: Bring DevOps and compliance perspectives
- **C (Continue)**: Accept automation and proceed to report generation
- **[Specific refinements]**: Describe automation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save automation design to output document
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-report-generation.md`

---

## Verification

- [ ] Collection architecture defined
- [ ] Collection jobs documented
- [ ] Pipelines designed
- [ ] Validation rules specified
- [ ] Storage architecture defined
- [ ] Monitoring configured
- [ ] Patterns align with pattern registry

---

## Outputs

- Collection architecture design
- Collection job definitions
- Pipeline specifications
- Validation rules
- Storage architecture
- Monitoring design

---

## Next Step

Proceed to `step-04-c-report-generation.md` to design report generation.
